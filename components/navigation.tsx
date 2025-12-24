import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "../styles/navigation.module.scss";
import { NAV_DATA } from "./navigation.data";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  /* =======================
     HANDLERS
  ======================= */

  const handleMouseEnter = (label: string) => {
    if (window.innerWidth > 991) {
      setActiveMenu(label);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 991) {
      setActiveMenu(null);
    }
  };


  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 991) {
        setActiveMenu(null);
      }
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const HEADER_THEME: "light" | "dark" = "light";

  return (
    <header className={`${Style.header} ${Style[HEADER_THEME]} absolute w-full top-0 z-[99]`}>
      <div className="container relative">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className={Style.logoLink}>
            <Image
              src="/brightcode_logo_light.svg"
              width={220}
              height={50}
              alt="Bright Code"
              className={Style.logoLight}
              priority
            />
            <Image
              src="/brightcode_logo.svg"
              width={220}
              height={50}
              alt="Bright Code"
              className={Style.logoDark}
              priority
            />
          </Link>


          {/* NAV */}
          <ul className={Style.navList}>
            {NAV_DATA.menus.map((item) => (
              <li
                key={item.label}
                className={Style.menuItem}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >

                <span className={Style.menuLink}>
                  {item.label}
                  {item.mega && <span className={Style.chevron} />}
                </span>

                {/* MEGA MENU */}
                {item.mega && activeMenu === item.label && (
                  <div className={Style.megaMenu}>
                    <div className={Style.megaGrid}>

                      {/* LEFT COLUMNS */}
                      {item.mega.columns.map((column, colIndex) => (
                        <ul key={colIndex} className={Style.megaColumn}>
                          {column.map((link) => (
                            <li key={link.title} className=" list-none flex align-top ">
                              <div className={` ${Style.iconBox} icon-wrap w-[40px] h-[40px] mr-[10px]`}>
                                {link.imageLight && link.imageDark && (
                                  <>
                                    <Image
                                      src={link.imageLight}
                                      alt={link.alt || link.title}
                                      width={40}
                                      height={40}
                                      className={`${Style.icon} ${Style.iconLight}`}
                                    />
                                    <Image
                                      src={link.imageDark}
                                      alt={link.alt || link.title}
                                      width={40}
                                      height={40}
                                      className={`${Style.icon} ${Style.iconDark}`}
                                    />
                                  </>
                                )}
                              </div>
                              <div className={` ${Style.megaItem}`}>
                                <Link href={link.link} className={`${Style.megaLink} block`}>
                                  {link.title}
                                </Link>
                                <span className={Style.megaDesc}>
                                  {link.desc}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ))}

                      {/* SOCIAL COLUMN */}
                      <div className={` ${Style.socialColumn}  `} >
                        <Link
                          href="mailto:contact@bright-code.io"
                          className={Style.iconLink}
                        >
                          <Image
                            src="/footer-icon-light.svg"
                            width={44}
                            height={44}
                            alt="Contact"
                            className={Style.iconLight}
                          />
                          <Image
                            src="/footer-icon-dark.svg"
                            width={44}
                            height={44}
                            alt="Contact"
                            className={Style.iconDark}
                          />
                        </Link>


                        <p>
                          Follow us on our{" "}
                          <span>Social Media</span>, to get Latest News and Updates
                        </p>

                        <div className={` ${Style.socialLinks} footer-socials`}>
                          <Link href="#">
                            <Image src="/linkedin-light.svg" width={24} height={24} alt="linkedin" className={` ${Style.socialLight} `} />
                            <Image src="/linkedin-dark.svg" width={24} height={24} alt="linkedin" className={` ${Style.socialDark} `} />
                          </Link>

                          <Link href="#">
                            <Image src="/instagram-light.svg" width={24} height={24} alt="instagram" className="social-light" />
                            <Image src="/instagram-dark.svg" width={24} height={24} alt="instagram" className={` ${Style.socialDark} `} />
                          </Link>

                          <Link href="#">
                            <Image src="/x-light.svg" width={24} height={24} alt="x" className="social-light" />
                            <Image src="/x-dark.svg" width={24} height={24} alt="x" className={` ${Style.socialDark} `} />
                          </Link>

                          <Link href="#">
                            <Image src="/github-light.svg" width={24} height={24} alt="github" className="social-light" />
                            <Image src="/github-dark.svg" width={24} height={24} alt="github" className={` ${Style.socialDark} `} />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>


          {/* CTA */}
          <div className="btn-wrap">
            <Link
              href="/contact"
              className={`my-[10px] text-white no-arrow rounded-btn blue no-arrow `}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
