import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-purple py-20">
      <div className="container">
        <div className="w-full text-white flex justify-between">
          <div className={`logo max-w-[200px] max-h-[45px]`}>
            <Link href="/" className="redirect">
              .
            </Link>
            <img src="/brightcode_logo.png" alt="logo" />
          </div>
          <div className="textWrap">
            <h5 className="mb-2">Contact</h5>
            <p className="mb-2">
              <a href="mailto:contact@bright-code.io">contact@bright-code.io</a>
            </p>
            <p className="">+ ‪(925) 315-5061‬</p>
          </div>
        </div>
        <div className="copyright w-full text-white text-center pt-5 mt-16 border-t border-white/[0.5]">
          <p>© 2023 Bright Code Solution</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
