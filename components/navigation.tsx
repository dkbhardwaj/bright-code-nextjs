import React from "react";
import Style from "../styles/header.module.css";
import Link from "next/link";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <header
      className={`${Style.header} bg-spaceBlack py-5 fixed w-full top-0 left-0 z-50`}
    >
      <div className="container">
        <div className={`${Style.mainRow} flex items-center justify-between`}>
          <div className={`${Style.logo} relative max-w-[200px] max-h-[45px]`}>
            <Link href="/" className="redirect">
              .
            </Link>
            <img src="/brightcode_logo.png" alt="logo" />
          </div>
          <div className="links">
            <ul className="flex items-center text-white">
              <li className="mx-5 hover:text-blue transition-color duration-300">
                <Link href="#">Home</Link>
              </li>
              <li className="mx-5 hover:text-blue transition-color duration-300">
                <Link href="#">About Me</Link>
              </li>
              <li className="mx-5 hover:text-blue transition-color duration-300">
                <Link href="#">Work</Link>
              </li>
              <li className="mx-5 hover:text-blue transition-color duration-300">
                <Link href="#">Services</Link>
              </li>
              <li className="mx-5 hover:text-blue transition-color duration-300">
                <Link href="#" className="blue-btn">
                  Hire Me
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
