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
      <div className="container">
        <div className="flex items-center justify-between py-6">

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
                className={`${Style.menuItem} relative`}
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
                            <li key={link.title}>
                              <Link href={link.link} className={Style.megaItem}>
                                <span className={Style.iconBox} />
                                <div>
                                  <p className={Style.megaTitle}>
                                    {link.title}
                                  </p>
                                  <span className={Style.megaDesc}>
                                    {link.desc}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ))}

                      {/* SOCIAL COLUMN */}
                      <div className={Style.socialColumn}>
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

                        <div className="footer-socials">
                          <Link href="#">
                            <Image src="/linkedin-light.svg" width={18} height={18} alt="" className="social-light" />
                            <Image src="/linkedin-dark.svg" width={18} height={18} alt="" className="social-dark" />
                          </Link>

                          <Link href="#">
                            <Image src="/instagram-light.svg" width={18} height={18} alt="" className="social-light" />
                            <Image src="/instagram-dark.svg" width={18} height={18} alt="" className="social-dark" />
                          </Link>

                          <Link href="#">
                            <Image src="/x-light.svg" width={18} height={18} alt="" className="social-light" />
                            <Image src="/x-dark.svg" width={18} height={18} alt="" className="social-dark" />
                          </Link>

                          <Link href="#">
                            <Image src="/github-light.svg" width={18} height={18} alt="" className="social-light" />
                            <Image src="/github-dark.svg" width={18} height={18} alt="" className="social-dark" />
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
          <Link
            href="/contact"
            className={`mt-[20px] text-white no-arrow rounded-btn blue no-arrow`}
          >
            Contact us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
