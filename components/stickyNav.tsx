import React, { useState } from "react";
import Style from "../styles/stickyNav.module.css";

const StickyNav: React.FC = () => {
  const [activeLink, setActiveLink] = useState("intro");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <section className={`stickyNav overflow-visible`}>
      <div className="container">
        <div className="w-full">
          <ul className="w-full relative z-5 flex text-center rounded-lg shadow-lg -mt-[30px] bg-white overflow-hidden text-blue">
            <li
              className={`${Style.link} w-1/4 border-r-2 border-lightGray ${
                activeLink === "intro"
                  ? "bg-orange text-white hover:text-white"
                  : ""
              } hover:text-orange transition-color duration-300`}
            >
              <a
                className="p-5 w-full inline-block"
                href="#intro"
                onClick={() => handleLinkClick("intro")}
              >
                Intro
              </a>
            </li>
            <li
              className={`${Style.link} w-1/4 border-r-2 border-lightGray ${
                activeLink === "colthree"
                  ? "bg-orange text-white hover:text-white"
                  : ""
              } hover:text-orange transition-color duration-300`}
            >
              <a
                className="p-5 w-full inline-block"
                href="#colthree"
                onClick={() => handleLinkClick("colthree")}
              >
                Colthree
              </a>
            </li>
            <li
              className={`${Style.link} w-1/4 border-r-2 border-lightGray ${
                activeLink === "team"
                  ? "bg-orange text-white hover:text-white"
                  : ""
              } hover:text-orange transition-color duration-300`}
            >
              <a
                className="p-5 w-full inline-block"
                href="#team"
                onClick={() => handleLinkClick("team")}
              >
                Team
              </a>
            </li>
            <li
              className={`${Style.link} w-1/4 ${
                activeLink === "work"
                  ? "bg-orange text-white hover:text-white"
                  : ""
              } hover:text-orange transition-color duration-300`}
            >
              <a
                className="p-5 w-full inline-block"
                href="#work"
                onClick={() => handleLinkClick("work")}
              >
                Work
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StickyNav;
