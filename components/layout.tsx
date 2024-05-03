import React, { ReactNode } from "react";
import Navigation from "./navigation";
import Footer from "./footer";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900", "600"], // Font weights as strings
  display: "swap",
});
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <style jsx global>{`
        html,
        * {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
