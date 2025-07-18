import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "../lib/contentful/client";
import { UrlObject } from "url";

interface NavigationItem {
  menuLink: any;
  cta?: {
    fields: {
      ctaLink: string;
      ctaText: string;
    };
  };
}

const Footer: React.FC = () => {
  const [menus, setMenus] = useState<NavigationItem | null>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const getNav = async () => {
      try {
        const response = await client.getEntries({
          content_type: "navigation",
          "fields.navName": "Footer Menu",
        });

        const navItem = response.items[0]?.fields as unknown as NavigationItem;
        setMenus(navItem || null);
      } catch (err) {
        console.log(err);
        console.error(err);
      }
    };

    getNav();
  }, []);

  return (
    <footer className="footer py-[90px] bg-darkBlue bg-[url('/footer-bg-image.png')] bg-no-repeat bg-cover md:py-16 ">
      <div className="container">
        <div className="w-full text-white flex justify-between md:flex-col md:items-center">
          <div className=" relative w-full max-w-[250px] pr-4 md:max-w-full ">
            <div className={`logo relative max-w-[207px] h-[57px] md:mx-auto `}>
              <Link href="/" className="redirect">
                .
              </Link>
              <Image
                src="/brightcode_logo.png"
                width={300}
                height={100}
                loading="lazy"
                alt="logo"
                className=" w-full h-full object-contain"
              />
            </div>
            <p className=" text-[14px] text-white md:text-center">
              2450 Colorado Ave, Suite 100E Santa Monica, CA 90404
            </p>
          </div>
          <div className="hidden footer-link relative w-full max-w-[190px] pr-4  md:text-center  md:max-w-full md:mt-5 ">
            {/* <h6 className=" font-medium mb-4">About</h6> */}
            {/* <ul>
              {menus?.menuLink &&
                menus?.menuLink.map(
                  (
                    menuItem: {
                      fields: {
                        path: string | UrlObject;
                        label:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | React.PromiseLikeOfReactNode
                          | null
                          | undefined;
                      };
                    },
                    index: number
                  ) => (
                    <li key={index} className="relative mb-2">
                      <Link
                        href={menuItem.fields?.path}
                        className="text-[14px] text-white hover:text-mediumGray transition-colors duration-300 ease-in-out"
                      >
                        {menuItem.fields?.label}
                      </Link>
                    </li>
                  )
                )}
            </ul> */}
          </div>
          <div className="textWrap relative w-full max-w-[400px] md:mt-4   md:mx-auto">
            <ul className=" relative flex flex-wrap  justify-end sm:block">
              <li className=" relative w-full justify-end md:justify-center flex items-center   rounded-[9px]  mb-1 md:mx-auto ">
                <Link href="mailto:contact@bright-code.io" className="redirect">
                  .
                </Link>
                <div className="icon-img hidden max-w-[21px] h-[21px] mr-5">
                  {/* <Image
                    src="/mail-icon-white.svg"
                    width={25}
                    height={25}
                    loading="lazy"
                    alt="img"
                    className=" w-full h-full object-contain"
                  /> */}
                </div>
                <span className="font-semibold">contact@bright-code.io</span>
              </li>
              <li className=" relative w-full justify-end md:justify-center flex items-center  rounded-[9px] ml-4  mb-1 md:mx-auto ">
                <div className="icon-img hidden max-w-[21px] h-[21px] mr-5">
                  {/* <Image
                    src="/phone-icon-white.svg"
                    width={25}
                    height={25}
                    loading="lazy"
                    alt="img"
                    className=" w-full h-full object-contain"
                  /> */}
                </div>
                <span className="font-semibold">‪805-215-0549‬</span>
              </li>
            </ul>
            <div className="socialWrap relative w-full flex justify-end  md:justify-center md:hidden">
              {/* <div className="icon relative max-w-[33px] h-[33px] ">
                <Link
                  href={"https://twitter.com/brightcodeio"}
                  className="redirect"
                  target="_blank"
                >
                  .
                </Link>
                <Image
                  src="/twitter-white.svg"
                  width={40}
                  height={40}
                  loading="lazy"
                  alt="icon"
                  className=" w-full h-full object-contain"
                />
              </div> */}
              <div className="icon relative ml-3  max-w-[33px] h-[33px]">
                <Link
                  href={"https://www.linkedin.com/company/bright-codeio/"}
                  className="redirect"
                  target="_blank"
                >
                  .
                </Link>
                <Image
                  src="/linkedin-white.svg"
                  width={40}
                  height={40}
                  loading="lazy"
                  alt="icon"
                  className=" w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          <div className="hidden socialWrap mt-4 md:flex md:justify-center">
            {/* <div className="icon relative max-w-[33px] h-[33px]">
              <Link
                href={"https://www.linkedin.com/in/bright-code-71120724a/"}
                className="redirect"
                target="_blank"
              >
                .
              </Link>
              <Image
                src="/twitter-white.svg"
                width={40}
                height={40}
                loading="lazy"
                alt="icon"
                className=" w-full h-full object-contain"
              />
            </div> */}
            <div className="icon relative ml-2  max-w-[33px] h-[33px]">
              <Link
                href={"https://www.linkedin.com/in/bright-code-71120724a/"}
                className="redirect"
                target="_blank"
              >
                .
              </Link>
              <Image
                src="/linkedin-white.svg"
                width={40}
                height={40}
                loading="lazy"
                alt="icon"
                className=" w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className=" relative w-full mt-16 flex justify-between items-center flex-wrap md:mt-10">
          <div className="copyright w-full flex justify-center md:justify-center sm:block sm:text-center ">
            <p className="text-white">© {year} Bright Code Technologies Inc</p>
            <ul className=" relative w-fit flex sm:w-full sm:justify-center ">
              <li className=" ml-4 pl-4 relative before:content-[''] before:absolute before:top-[7px] before:left-0 before:w-[1px] before:h-[18px] before:bg-white md:ml-3 md:pl-3 md:before:top-[9px] md:before:h-[15px] sm:before:hidden sm:!ml-0 sm:!pl-0 ">
                <Link
                  href="https://www.bright-code.io/privacy-policy"
                  className="text-white hover:text-mediumGray transition-colors duration-300 ease-in-out md:text-[14px] md:leading-[24px] "
                >
                  Privacy Policy
                </Link>
              </li>
              <li className=" ml-4 pl-4 relative before:content-[''] before:absolute before:top-[7px] before:left-0 before:w-[1px] before:h-[18px] before:bg-white md:ml-3 md:pl-3 md:before:top-[9px] md:before:h-[15px] ">
                <Link
                  href="https://www.bright-code.io/sitemap.xml"
                  className="text-white hover:text-mediumGray transition-colors duration-300 ease-in-out md:text-[14px] md:leading-[24px] "
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
