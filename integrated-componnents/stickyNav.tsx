import React, { useState, useEffect } from "react";
import StickyStyle from "../styles/sticky.module.css";
import Style from "../styles/stickyNav.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";

// interface StickyItem {
// 	id: string;
// 	title: string;
// 	url: string;
//   }
// const [clickedId, setClickedId] = useState<string | null>(null);

interface StickyProps {
  ribbonVisible?: boolean;
  data?: { fields :{id: any; label: string; path: string}  }[];
  // clickedId: string | null;
  // setClickedId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Sticky: React.FC<StickyProps> = ({
  ribbonVisible,
  data = [],
  // clickedId,
  // setClickedId,
}) => {


  const [isArrowDownClicked, setIsArrowDownClicked] = useState(false);
  const [clickedId, setClickedId] = useState()
  const handleArrowClick = () => {
    setIsArrowDownClicked(!isArrowDownClicked);
  };

  const router = useRouter();

  useEffect(() => {
   
    const currentUrlData = data.find(
      (item) => router.asPath === `${item?.fields?.path}`
    );
    if (currentUrlData) {
      setClickedId(currentUrlData?.fields?.id);
    }
  }, [router.asPath, data, setClickedId]);

  const [isSticky, setSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [winWidth, setWinWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let lastScrollTop = 0;
      const sticky = document.querySelector("#stickyNav");
      var topp = sticky?.getBoundingClientRect().top;
      const headr = document.querySelector("header")?.offsetHeight || 0;
      setHeaderHeight((prevHeight) => {
        return headr;
      });
      const handleNavScroll = () => {
        topp = sticky?.getBoundingClientRect().top;
        const currentScrollTop = window.scrollY;
        if (topp) {
          if (topp !== null && topp < headr) {
            sticky?.classList.add(`${StickyStyle.fix}`);
          } else {
            sticky?.classList.remove(`${StickyStyle.fix}`);
          }
        }
        lastScrollTop = currentScrollTop;
      };

      window.addEventListener("scroll", handleNavScroll);

      return () => {
        window.removeEventListener("scroll", handleNavScroll);
      };
    }, 100);
  }, []);

  const headheight = {
    top: headerHeight,
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => entry.target.id);

    setVisibleSections(visibleSections);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5,
    });

    const sectionElements = document.querySelectorAll("section:not(.sticky");

    sectionElements.forEach((sectionElement) => {
      observer.observe(sectionElement);
    });

    return () => {
      observer.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      {winWidth > 991 ? (
        <section
          className={`sticky top-[116px] ${StickyStyle.mainSticky} z-50 bg-bgBluePurple  transition-all duration-300 ease-in-out shadow-bottom-white-shadow`}
          style={isSticky ? headheight : { top: 0 }}
          id="stickyNav"
          data-aos="fade-in"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div className="container">
            <ul className="flex relative w-fit mx-auto sm:justify-between">
              {data?.map((dataItem, index) => {
                return (
                  <li
                    key={dataItem?.fields?.id}
                    className={`px-5 py-[27px] sm:px-1 relative tablet-mid:px-[6px] bg-transparent transition-colors duration-500 hover:bg-[#00000042] ${
                      clickedId === dataItem?.fields?.id ? "activated" : ""
                    }`}
                    onClick={() => setClickedId(dataItem?.fields?.id)}
                  >
                    <Link
                      href={`${dataItem?.fields?.path}`}
                      aria-label={`Navigate to ${dataItem?.fields?.label}`}
                      className={`text-[19px] font-[600] transition-all text-white hover:text-white duration-300 ease-in-out xl:text-[16px]`}
                    >
                      {dataItem?.fields?.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <style jsx>
            {`
              .activated {
                color: #ffffff;
                border: none;
                background-color: #00000042;
              }
            `}
          </style>
        </section>
      ) : (
        ""
      )}

      {winWidth <= 991 ? (
        <section
          className={`sticky top-[116px] ${StickyStyle.mainSticky} z-50 min-h-[80px] bg-bgBluePurple  transition-all duration-300 ease-in-out shadow-bottom-white-shadow sm:min-h-[70px] `}
          style={isSticky ? headheight : { top: 0 }}
          id="stickyNav"
          data-aos="fade-in"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <div className="container">
            <div
              className={`${Style.mobile_stickyNav}  w-full block ${
                isArrowDownClicked ? Style.toggleClass : ""
              }`}
            >
              <div
                className={`${Style.down_arrow}`}
                onClick={handleArrowClick}
              ></div>
              <ul className={` relative w-full block pr-5 `}>
                {data?.map((dataItem, index) => {
                  return (
                    <li
                      key={index}
                      datatype={dataItem?.fields?.id}
                      className={` py-[25px] relative w-full bg-transparent sm:py-[20px] ${
                        visibleSections[0] === dataItem?.fields?.path ? "activated" : ""
                      }`}
                    >
                      <Link
                        href={`${dataItem?.fields?.path}`}
                        aria-label={`Navigate to ${dataItem?.fields?.label}`}
                        className={` text-[19px] font-[600] text-white transition duration-500 ease-in-out sm:text-[16px]`}
                      >
                        {dataItem?.fields?.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Sticky;
