import React, { ReactNode } from "react";
import Navigation from "./navigation";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
  navigationData: any;
}

const Layout: React.FC<LayoutProps> = ({ children, navigationData }) => {
  return (
    <>
      <Navigation navigationData={navigationData} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
