import React, { useState, useEffect } from "react";
import Image from "next/image";
import Style from "../styles/navigation.module.scss";
import Link from "next/link";
import {client} from "../lib/contentful/client" 
import { UrlObject } from "url";

interface NavigationProps {}

// interface DropdownItem {
//   title: string;
//   link: string;
  
// }
interface NavigationItem {
  menuLink: any;
  cta?: {
    fields: {
      ctaLink: string;
      ctaText: string;
    };
  };
}

const Navigation: React.FC<NavigationProps> = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [menus, setMenus] = useState<NavigationItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleMobileMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  const handleMobileMenuCloseClick = () => {
    setShowMobileMenu(false);
  };

  const handleResize = () => {
    setShowDropdown(false);
    if (window.innerWidth >= 991) {
      setShowMobileMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getNav = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'navigation',
          'fields.navName': "Main Nav"
        });
        
       const navItem = response.items[0]?.fields as unknown as NavigationItem;
        setMenus(navItem || null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNav();
  }, []);
  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;
 
  return (
    <header
      className={`${Style.header} py-[48px] absolute w-full top-0 left-0 z-[99] lg:py-5`}
    >
      <div className="container">
        <div className={`${Style.mainRow} flex items-center justify-between`}>
          <div className={`${Style.logo} max-w-[200px] max-h-[45px]`}>
            <Link href="/" className="redirect">
              .
            </Link>
            <Image
              src="/brightcode_logo.png"
              alt="logo"
              width={250}
              height={50}
              className=" w-full h-full object-contain"
              priority
            />
          </div>
          <div
            className={`${Style.links} ${Style.mobileMenu} lg:flex lg:justify-end`}
          >
            {/* Hamburger menu icon for mobile */}
            <div
              className={`${Style.mobileMenuIcon} ${
                showMobileMenu ? Style.active : ""
              } hidden lg:flex`}
              onClick={handleMobileMenuClick}
            >
              <span className={`${Style.bar}`}></span>
              <span className={`${Style.bar}`}></span>
              <span className={`${Style.bar}`}></span>
            </div>
            {/* Navigation links for desktop */}
            <div
              className={`header-menu ${
                showMobileMenu ? "lg:left-0" : "lg:!-left-[calc(100vw+500px)]"
              } relative lg:fixed border-none lg:left-0 lg:top-0 lg:!w-[calc(100vw+500px)] lg:h-[100vh] lg:bg-[#00000066] lg:transition-all lg:duration-1000`}
            >
              <div
                className={`navbar-wrap relative lg:absolute lg:left-0 lg:top-0 lg:!w-[350px] lg:h-[100vh] lg:overflow-y-scroll lg:scroll-smooth z-10 lg:bg-white  lg:py-5 `}
              >
                <div
                  className={`${Style.logo_wrapper}  hidden relative w-full py-5 px-3 mb-7 lg:!flex bg-bgBluePurple flex-wrap items-center justify-between `}
                >
                  <div
                    className={`${Style.logo} relative max-w-[200px] max-h-[45px]`}
                  >
                    <Link href="/" className="redirect">
                      .
                    </Link>
                    <Image
                      src="/brightcode_logo.png"
                      alt="logo"
                      width={250}
                      height={50}
                      className=" w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <div
                    className={`${Style.close} hidden lg:!flex`}
                    onClick={handleMobileMenuCloseClick}
                  >
                    X
                  </div>
                </div>
                <ul
                  className={`flex items-center text-white   lg:mx-0 lg:flex-wrap lg:text-spaceBlack  lg:!justify-start lg:px-3 `}
                >
                  {
                    menus?.menuLink && (
                      menus?.menuLink.map((menuItem: { fields: { path: string | UrlObject; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; })=>
                        (
                          <li
                    className={`${Style.menu}  mx-[22px]  transition-color duration-300 desktop:mx-4 lg:w-full lg:mx-0 lg:py-3 lg:text-spaceBlack lg:border-b-2 lg:border-extraLightGray lg:mb-2`}
                    onClick={handleMobileMenuCloseClick}
                  >
                    <Link className="inline-block w-full text-[14px] " href= {menuItem.fields?.path}>
                      {menuItem.fields?.label}
                    </Link>
                  </li>
                        )
                      )
                    )
                  }
              
                  {menus?.cta && (
                    <>
                    <Link
                    href={menus?.cta?.fields?.ctaLink}
                    className={`${Style.btn} ml-[30px] gradient-btn border-btn lg:!hidden lg:ml-0 lg:my-8 `}
                    onClick={handleMobileMenuCloseClick}
                  >
                    <span>{menus?.cta?.fields?.ctaText}</span>
                  </Link>
                  <Link
                    href="/contact"
                    className={`${Style.btn} gradient-btn !max-w-[270px] !hidden lg:!inline-block my-8 !shadow-none`}
                    onClick={handleMobileMenuCloseClick}
                  >
                    <span>{menus?.cta?.fields?.ctaText}</span>
                  </Link>
                  </>
                  )}
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
