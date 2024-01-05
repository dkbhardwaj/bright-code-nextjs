import React, { useState, useEffect } from "react";
import StickyStyle from "../styles/sticky.module.css";
import Style from "../styles/stickyNav.module.scss";
import { log } from "console";
import Link from "next/link";

interface stickyItme {
  id: string,
  title: string,
  url: string
}

interface StickyProps {
  ribbonVisible?: boolean;
  data?: stickyItme[];
}

// const Sticky: React.FC<StickyProps> = ({ ribbonVisible, data }) => {
const Sticky: React.FC<StickyProps> = ({ ribbonVisible, data = [] }) => {
   console.log(data);
   const stickyData = data;
   
   console.log(ribbonVisible);

  const [isArrowDownClicked, setArrowDownClicked] = useState(false);
  const handleArrowClick = () => {
    setArrowDownClicked(!isArrowDownClicked);
  };


  // const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

  // const [clickedId, setClickedId] = useState<string | null>(null);

  // useEffect(() => {
  //   // Initialize clickedId from local storage on the client side
  //   if (isLocalStorageAvailable) {
  //     const storedId = localStorage.getItem("clickedId") || null;
  //     setClickedId(storedId);
  //   }
  // }, [isLocalStorageAvailable]);

  // const handleStickyClick = (
  //   e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  //   id: string
  // ) => {
  //   e.preventDefault();
  //   setClickedId(id);
  //   isLocalStorageAvailable && localStorage.setItem("clickedId", id);
  // };

  // const sortedStickyData = clickedId
  //   ? [
  //       stickyData.find(item => item.id === clickedId) || stickyData[0],
  //       ...stickyData.filter(item => item.id !== clickedId),
  //     ]
  //   : stickyData;

  const [isSticky, setSticky] = useState(false);
  const [headerHeight, setheaderHeight] = useState(0);
  const [stick, setstick] = useState<number>(0);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [winWidth, isWinWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let lastScrollTop = 0;
      const sticky = document.querySelector("#stickyNav");
      var topp = sticky?.getBoundingClientRect().top;
      const headr = document.querySelector("header")?.offsetHeight || 0;
      setheaderHeight((prevHeight) => {
        // console.log(prevHeight);
        return headr;
      });
      const handleNavScroll = () => {
        topp = sticky?.getBoundingClientRect().top;
        const currentScrollTop = window.scrollY;
        const isScrolledDown = currentScrollTop < lastScrollTop;
        // console.log(topp);
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
  // useEffect(() => {
  //   console.log(headerHeight);
  // }, [headerHeight]);
  const auto = {
    top: `auto`,
  };
  const headheight = {
    top: headerHeight,
  };
  // const handleStickyClick = (
  //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  //   id: string,
  //   borderActive: number,
  //   sectionId: string,
  //   offset: number
  // ) => {
  //   const x = document.querySelectorAll("section");
  //   // e.preventDefault();
  //   const headrHeight = document.querySelector("header")?.offsetHeight || 0;
  //   const stickyHeight =
  //     document.getElementById("stickyNav")?.offsetHeight || 0;
  //   // console.log("stick", stickyHeight);

  //   x.forEach((item) => {
  //     const attr = item.getAttribute("id");
  //     const scrollPosition =
  //       window.pageYOffset ||
  //       document.documentElement.scrollTop ||
  //       document.body.scrollTop ||
  //       0;
  //     if (attr === id) {
  //       const topp = item.getBoundingClientRect().top;
  //       // console.log(topp);
  //       const d = scrollPosition + topp - 116 - stickyHeight;
  //       if (topp < 0) {
  //         // d = d - headrHeight;
  //         d - headrHeight;
  //       }

  //       window.scrollTo({
  //         top: d,
  //         behavior: "smooth",
  //       });
  //     }
  //   });
  // };

  // const handleStickyClick = (
  //   e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  //   id: string,
  //   borderActive: number,
  //   sectionId: string,
  //   offset: number
  // ) => {
  //   const x = document.querySelectorAll("section");
  //   const headrHeight = document.querySelector("header")?.offsetHeight || 0;
  //   const stickyHeight = document.getElementById("stickyNav")?.offsetHeight || 0;

  //   x.forEach((item) => {
  //     const attr = item.getAttribute("id");
  //     const scrollPosition =
  //       window.pageYOffset ||
  //       document.documentElement.scrollTop ||
  //       document.body.scrollTop ||
  //       0;
  //     if (attr === id) {
  //       const topp = item.getBoundingClientRect().top;
  //       const d = scrollPosition + topp - 116 - stickyHeight;
  //       if (topp < 0) {
  //         d - headrHeight;
  //       }

  //       window.scrollTo({
  //         top: d,
  //         behavior: "smooth",
  //       });

  //       // Add the "activated" class to the clicked li
  //       item.parentElement?.querySelectorAll("li").forEach((li) => {
  //         li.classList.remove("activated");
  //       });
  //       item.classList.add("activated");
  //     }
  //   });
  // };

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
      isWinWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    // Initial call to set window size
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
              {data.map((data, index) => {
                return (
                  // <li
                  //   key={index}
                  //   datatype={data.id}
                  //   className="px-5 py-[27px] sm:px-1 relative tablet-mid:px-[6px] bg-transparent transition-colors duration-500 hover:bg-[#00000042] "
                  // >
                  //   <Link
                  //     href={`/${data.url}`}
                  //     aria-label={`Navigate to ${data.title}`}
                  //     className={`text-black ${
                  //       visibleSections[0] === data.url
                  //         ? "border-b-4 border-white activated"
                  //         : ""
                  //     } text-[19px] font-[600] transition-all text-white hover:border-b-4 hover:border-white hover:text-white ease-in-out`}
                  //     onClick={(e) =>
                  //       handleStickyClick(e, data.url, index, data.url, 50)
                  //     }
                  //   >
                  //     {data.title}
                  //   </Link>
                  // </li>
                  <li
                    key={index}
                    datatype={data.id}
                    className={`px-5 py-[27px] sm:px-1 relative tablet-mid:px-[6px] bg-transparent transition-colors duration-500 hover:bg-[#00000042] ${
                      visibleSections[0] === data.url ? "activated" : ""
                    }`}
                    // onClick={(e) =>
                    //   handleStickyClick(e, data.url, index, data.url, 50)
                    // }
                  >
                    <Link
                      href={`/${data.url}`}
                      aria-label={`Navigate to ${data.title}`}
                      className={` text-[19px] font-[600] transition-all text-white hover:text-white duration-300 ease-in-out xl:text-[16px]`}
                    >
                      {data.title}
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
      {/* <style jsx>
        {`
          @media (min-width: 991px) {
            .activated {
              color: #ffffff;
              border: none;
              background-color: #00000042;
            }
          }
        `}
      </style> */}

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
              className={`${
                Style.mobile_stickyNav
              }  w-full block ${isArrowDownClicked ? Style.toggleClass : ''}`}
            >
              <div
                className={`${Style.down_arrow}`}
                onClick={handleArrowClick}
              >
              </div>
              <ul className={` relative w-full block pr-5 `}>
                {data.map((data, index) => {
                  return (
                    <li
                      key={index}
                      datatype={data.id}
                      className={` py-[25px] relative w-full bg-transparent sm:py-[20px] ${
                        visibleSections[0] === data.url ? "activated" : ""
                      }`}
                    >
                      <Link
                        href={`/${data.url}`}
                        aria-label={`Navigate to ${data.title}`}
                        className={` text-[19px] font-[600] text-white transition duration-500 ease-in-out sm:text-[16px]`}
                      >
                        {data.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* <ul className={`relative w-full block pr-5`}>
                {sortedStickyData.map((data) => (
                  <li
                    key={data.id}
                    datatype={data.id}
                    className={`py-[25px] relative w-full bg-transparent sm:py-[20px] ${
                      visibleSections.includes(data.title) ? "activated" : ""
                    }`}
                    onClick={(e) => handleStickyClick(e, data.id)}
                  >
                    <Link
                      href={`/${data.url}`}
                      aria-label={`Navigate to ${data.title}`}
                      className={`text-[19px] font-[600] text-white transition duration-500 ease-in-out sm:text-[16px]`}
                    >
                      {data.title}
                    </Link>
                  </li>
                ))}
              </ul> */}
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
