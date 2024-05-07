import React from "react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    setIsVisible(window.scrollY > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-4 bg-blue-500 bg-bgBluePurple rounded-full shadow-lg transition-opacity duration-300 z-50 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="block relative top-[3px] w-4 h-4 border-t-2 border-r-2 border-white transform rotate-[-45deg]"></span>
      </button>
    </>
  );
}
