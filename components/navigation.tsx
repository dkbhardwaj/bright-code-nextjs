import React, { useState, useEffect } from "react";
import Style from "../styles/header.module.css";
import Link from "next/link";

interface NavigationProps {}

interface DropdownItem {
  title: string;
  link: string;
}

const dropdownItems: DropdownItem[] = [
  { title: "Service 1", link: "/services/service1" },
  { title: "Service 2", link: "/services/service2" },
  // Add more services as needed
];

const Navigation: React.FC<NavigationProps> = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 991) {
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 991) {
      setShowDropdown(false);
    }
  };

  const handleMobileMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleResize = () => {
    if (window.innerWidth >= 991) {
      setShowMobileMenu(false);
    }
  };

  const [showMobileServicesDropdown, setShowMobileServicesDropdown] =
    useState(false);

  const handleMobileServicesDropdownToggle = () => {
    if (window.innerWidth < 991) {
      setShowMobileServicesDropdown(!showMobileServicesDropdown);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`${Style.header} bg-spaceBlack py-8 fixed w-full top-0 left-0 z-50 lg:py-5`}
    >
      <div className="container">
        <div className={`${Style.mainRow} flex items-center justify-between`}>
          <div className={`${Style.logo} max-w-[200px] max-h-[45px]`}>
            <Link href="/" className="redirect">
              .
            </Link>
            <img src="/brightcode_logo.png" alt="logo" />
          </div>
          <div className={`${Style.links} ${Style.mobileMenu}`}>
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
            <ul
              className={`flex items-center text-white ${
                showMobileMenu ? "lg:block" : "lg:hidden"
              } lg:absolute lg:left-0 lg:top-full lg:w-full lg:bg-white lg:mx-0 lg:flex-wrap lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray`}
            >
              <li className="mx-5 hover:text-blue transition-color duration-300 desktop:mx-2.5 lg:w-full lg:py-5 px-4 lg:mx-0 lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray">
                <Link href="/">Home</Link>
              </li>
              <li className="mx-5 hover:text-blue transition-color duration-300 desktop:mx-2.5 lg:w-full lg:py-5 px-4 lg:mx-0 lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray">
                <Link href="/about">Why Choose Us
                </Link>
              </li>
              <li className="mx-5 hover:text-blue transition-color duration-300 desktop:mx-2.5 lg:w-full lg:py-5 px-4 lg:mx-0 lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray">
                <Link href="/about"> What we do</Link>
              </li>
              <li
                className={`mx-5 hover:text-blue transition-color duration-300 relative ${
                  showDropdown ? "active" : ""
                } lg:w-full lg:py-5 px-4 lg:mx-0 lg:text-spaceBlack`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleMobileServicesDropdownToggle}
              >
                <Link href="#">Our clients</Link>
                {/* Dropdown Content */}
                <ul
                  className={`absolute ${showDropdown ? "block" : "hidden"} ${
                    showMobileServicesDropdown ? "block" : ""
                  } w-56 -left-5 top-full bg-white py-2 rounded-md border-t-2 border-blue`}
                >
                  {dropdownItems.map((item, index) => (
                    <li
                      key={index}
                      className="group py-2.5 px-2 hover:bg-grayish"
                    >
                      <Link
                        href={item.link}
                        className="text-gray group-hover:text-blackish"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* End Dropdown Content */}
              </li>
              <li className="mx-5 hover:text-blue transition-color duration-300 desktop:mx-2.5 lg:w-full lg:py-5 lg:mx-0 px-4 lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray">
                <Link href="#" className="blue-btn">
                Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
