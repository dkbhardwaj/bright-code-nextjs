import React, { ReactNode } from "react";
// import Navigation from "./navigation";
// import Footer from "./footer";

// interface LayoutProps {
//   children: ReactNode;
// }

const CaseStudyLayout = ({ children }) => {
  return (
    <>
    <div className="case-study">
      {/* <Navigation /> */}
      {children}
      {/* <Footer /> */}
      </div>
    </>
  );
};

export default CaseStudyLayout;
