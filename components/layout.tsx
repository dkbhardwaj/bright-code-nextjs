import React, { ReactNode, useState } from "react";
import Navigation from "./navigation";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
  navigationData: any;
}

const Layout: React.FC<LayoutProps> = ({ children, navigationData }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <>
      {/* Theme Switch */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="px-4 mt-[140px] py-2 rounded-full text-sm font-medium border transition
                     bg-white text-black dark:bg-black dark:text-white"
        >
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      {/* Theme Wrapper */}
      <div className={darkMode ? "darkMode" : ""}>
        <Navigation navigationData={navigationData} />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
