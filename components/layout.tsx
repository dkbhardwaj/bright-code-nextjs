import React, { ReactNode } from "react";
// import Navigation from "./navigation";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Navigation /> */}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
