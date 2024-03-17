import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Style from '../styles/navigation.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavigationProps {}

interface DropdownItem {
  title: string;
  link: string;
}

const dropdownItems: DropdownItem[] = [
  { title: 'Service 1', link: '/services/service1' },
  { title: 'Service 2', link: '/services/service2' },
  { title: 'Service 3', link: '/services/service3' },
  { title: 'Service 4', link: '/services/service4' },
  // Add more services as needed
];

const Navigation: React.FC<NavigationProps> = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // function isActive(route: string): string {
  //   if (route === router.pathname) {
  //     return `${Style.menu_active}`;
  //   } else {
  //     return "";
  //   }
  // }
  const handleClick = () => {
    // Use the router to navigate to the desired page
    router.push('/white-label-development');
  };

  const preventredirect = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const handleDropClick = () => {
    setShowDropdown(!showDropdown);
  };

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`${Style.header} py-[48px] absolute w-full top-0 left-0 z-[99] lg:py-5`}>
      <div className="container">
        <div className={`${Style.mainRow} flex items-center justify-between`}>
          <div className={`${Style.logo} max-w-[200px] max-h-[45px]`}>
            <Link
              href="/"
              className="redirect">
              .
            </Link>
            <Image
              src="/brightcode_logo.png"
              alt="logo"
              width={250}
              height={50}
              className=" w-full h-full object-contain"
            />
          </div>
          <div className={`${Style.links} ${Style.mobileMenu} lg:flex lg:justify-end`}>
            {/* Hamburger menu icon for mobile */}
            <div
              className={`${Style.mobileMenuIcon} ${showMobileMenu ? Style.active : ''} hidden lg:flex`}
              onClick={handleMobileMenuClick}>
              <span className={`${Style.bar}`}></span>
              <span className={`${Style.bar}`}></span>
              <span className={`${Style.bar}`}></span>
            </div>
            {/* Navigation links for desktop */}
            {/* <ul
              className={`flex items-center text-white ${
                showMobileMenu ? 'lg:block' : 'lg:!hidden'
              } lg:absolute border-none lg:right-[-20px] lg:top-0 lg:!w-[350px] lg:bg-white lg:mx-0 lg:flex-wrap lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray lg:!justify-start`}>
              <li
                className={`${Style.menu} ${isActive(
                  '/'
                )} mx-8  transition-color duration-300 desktop:mx-4 lg:w-full lg:mx-0 lg:p-0 lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray`}>
                <Link
                  className="inline-block lg:p-5 lg:hover:bg-grayish w-full"
                  href="/">
                  Home
                </Link>
              </li>
              <li
                className={`${Style.menu} ${isActive(
                  '/why-choose-us'
                )}  mx-8  transition-color duration-300 desktop:mx-4 lg:w-full lg:mx-0 lg:p-0 lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray`}>
                <Link
                  className="inline-block lg:p-5 lg:hover:bg-grayish w-full"
                  href="/why-choose-us">
                  Why Choose us
                </Link>
              </li>
              <li
                className={`${Style.menu} ${isActive(
                  '/white-label-development'
                )}  mx-8 transition-color duration-300 desktop:mx-4 lg:w-full lg:mx-0 lg:p-0 lg:text-spaceBlack lg:cursor-pointer lg:border-b-2 lg:border-lightGray`}>
                <Link
                  className="inline-block lg:p-5 lg:hover:bg-grayish w-full"
                  href="/white-label-development">
                  {' '}
                  What we do
                </Link>
              </li>
              <li
                className={`${Style.menu} ${isActive(
                  '/ourclients'
                )} mx-8  transition-color duration-300 relative ${
                  showDropdown ? `${Style.active}` : ''
                } desktop:mx-4 lg:w-full lg:mx-0 lg:p-0 lg:text-spaceBlack lg:border-b-2 lg:border-lightGray`}
                // onClick={handleDropClick}
              >
                <Link
                  className="inline-block lg:p-5 lg:hover:bg-grayish w-full"
                  href="/ourclients"
                  // onClick={preventredirect}
                >
                  Our clients
                </Link>
                {/* Dropdown Content */}
            {/* <ul
                  className={`absolute ${
                    showDropdown ? "block" : "hidden"
                  } w-56 left-0 top-[160%] bg-white py-3 rounded-md lg:relative lg:p-0 lg:pl-5 lg:w-full lg:mx-0 lg:left-0 lg:text-spaceBlack lg:cursor-pointer`}
                >
                  {dropdownItems.map((item, index) => (
                    <li
                      key={index}
                      className="group py-2.5 px-3 hover:bg-grayish lg:p-0"
                    >
                      <Link
                        href={item.link}
                        className="text-gray inline-block group-hover:text-blackish lg:w-full lg:p-5 lg:text-spaceBlack lg:group-hover:text-blue"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul> */}
            {/* End Dropdown Content */}
            {/* </li> */}
            {/* <li className=" transition-color duration-300 desktop:mx-2.5 lg:w-full lg:py-5 lg:mx-0 lg:cursor-pointer lg:border-b-2 lg:border-lightGray">
              </li> */}
            {/* <Link
                  href="/contact"
                  className={`${Style.btn} ml-5 gradient-btn border-btn lg:!hidden`}>
                  <span>Contact</span>
                </Link>
                <Link
                  href="/contact"
                  className={`${Style.btn} gradient-btn !hidden lg:!inline-block my-5 ml-5 !shadow-none`}>
                  <span>Contact</span>
                </Link>
            </ul> */}
            <div
              className={`header-menu ${
                showMobileMenu ? 'lg:left-0' : 'lg:!-left-[calc(100vw+500px)]'
              } relative lg:fixed border-none lg:left-0 lg:top-0 lg:!w-[calc(100vw+500px)] lg:h-[100vh] lg:bg-[#00000066] lg:transition-all lg:duration-1000`}>
              <div
                className={`navbar-wrap relative lg:absolute lg:left-0 lg:top-0 lg:!w-[350px] lg:h-[100vh] lg:overflow-y-scroll lg:scroll-smooth z-10 lg:bg-white  lg:py-5 `}>
                <div
                  className={`${Style.logo_wrapper}  hidden relative w-full py-5 px-3 mb-7 lg:!flex bg-bgBluePurple flex-wrap items-center justify-between `}>
                  <div className={`${Style.logo} relative max-w-[200px] max-h-[45px]`}>
                    <Link
                      href="/"
                      className="redirect">
                      .
                    </Link>
                    <Image
                      src="/brightcode_logo.png"
                      alt="logo"
                      width={250}
                      height={50}
                      className=" w-full h-full object-contain"
                    />
                  </div>
                  <div
                    className={`${Style.close} hidden lg:!flex`}
                    onClick={handleMobileMenuCloseClick}>
                    X
                  </div>
                </div>
                <ul
                  className={`flex items-center text-white   lg:mx-0 lg:flex-wrap lg:text-spaceBlack  lg:!justify-start lg:px-3 `}>
                  <li
                    className={`${Style.menu}  mx-[22px]  transition-color duration-300 desktop:mx-4 lg:w-full lg:mx-0 lg:py-3 lg:text-spaceBlack lg:border-b-2 lg:border-extraLightGray lg:mb-2`}
                    onClick={handleMobileMenuCloseClick}>
                    <Link
                      className="inline-block w-full text-[14px] "
                      href="/">
                      Home
                    </Link>
                  </li>
                  <li
                    className={`${Style.menu}  mx-[22px]  transition-color duration-300 desktop:mx-4 lg:w-full lg:mx-0 lg:py-3 lg:text-spaceBlack lg:border-b-2 lg:border-extraLightGray lg:mb-2`}
                    onClick={handleMobileMenuCloseClick}>
                    <Link
                      className="inline-block w-full text-[14px]"
                      href="/why-choose-us">
                      Why Choose us
                    </Link>
                  </li>
                  <li
                    className={`${Style.menu}  mx-[22px] transition-color duration-300 desktop:mx-4 lg:w-full lg:mx-0 lg:py-3 lg:text-spaceBlack lg:border-b-2 lg:border-extraLightGray lg:mb-2`}
                    onClick={handleMobileMenuCloseClick}>
                    <Link
                      className="inline-block w-full text-[14px] "
                      href="/agency-agency">
                      Agency to Agency
                    </Link>
                  </li>
                  <li
                    className={`${Style.menu}
                     mx-[22px]  transition-color duration-300 relative ${
                       showDropdown ? `${Style.active}` : ''
                     } desktop:mx-4 lg:w-full lg:mx-0 lg:py-3 lg:text-spaceBlack lg:border-b-2 lg:border-extraLightGray lg:mb-2 `}
                    // onClick={handleDropClick}
                    onClick={handleMobileMenuCloseClick}>
                    <Link
                      className="inline-block w-full text-[14px] "
                      href="/full-service"
                      // onClick={preventredirect}
                      onClick={handleMobileMenuCloseClick}>
                      Full Service
                    </Link>
                  </li>
                  <Link
                    href="/contact"
                    className={`${Style.btn} ml-[30px] gradient-btn border-btn lg:!hidden lg:ml-0 lg:my-8 `}
                    onClick={handleMobileMenuCloseClick}>
                    <span>Contact</span>
                  </Link>
                  <Link
                    href="/contact"
                    className={`${Style.btn} gradient-btn !hidden lg:!inline-block my-8 !shadow-none`}
                    onClick={handleMobileMenuCloseClick}>
                    <span>Contact</span>
                  </Link>
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
