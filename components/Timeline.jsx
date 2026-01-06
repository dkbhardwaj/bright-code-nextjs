import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";
import Link from "next/link";
import style from "../styles/timeline.module.css";
// import Lottie from 'react-lottie';
import dynamic from "next/dynamic";
// import { getLottieUrl } from './services/LottieServiceV2';
// const Lottie = dynamic(() => import('react-lottie'), { ssr: false }); // Dynamic import

const data = [  
  {
    id: 1,
    leftText: "We believe dev should calm a room. not stress it.",
    rightText:
      "You feel it as clear communication, early warnings, and no disappearing acts when things get hard.",
  },
  {
    id: 2,
    leftText: "We believe shipping fast shouldn’t mean breaking things",
    rightText:
      "You feel it as momentum without mess - features that land clean and stay stable",
  },
  {
    id: 3,
    leftText: "We believe your codebase should outlive the project",
    rightText:
      "You feel it as confidence in handoffs, easy onboarding, and no tech debt suprises",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDownColTwo({ theme = "dark" }) {
  const [leftPosition, setLeftPosition] = useState(0);
  const [animationsState, setAnimationsState] = useState(
    data.map(() => ({ isVisible: false })) // Initialize visibility state
  );
  const animationRefs = useRef([]); // Ref array for each animation container
  const loadedRef = useRef({});

  useEffect(() => {
    const pinkLine = document.querySelector(`.pinkline`);
    const circles = document.querySelectorAll(".circle");

    const middleOfViewport = window.innerHeight / 2 + 100;

    gsap.to(pinkLine, {
      height: () =>
        `${ScrollTrigger.maxScroll(window) - ScrollTrigger.start}px`,
      ease: "none",
      scrollTrigger: {
        trigger: pinkLine,
        start: `top ${middleOfViewport}`,
        end: () => `+=${ScrollTrigger.maxScroll(window)}`,
        onUpdate: (self) => {
          const scrollDistance = self.scroll() - self.start;
          pinkLine.style.height = `${scrollDistance}px`;

          // Check each circle's position relative to the viewport's middle
          circles.forEach((circle) => {
            const rect = circle.getBoundingClientRect();
            if (rect.top < middleOfViewport) {
              circle.classList.add("!bg-[#0044FF]");
              circle.closest(".row").classList.add("inview");
            } else {
              circle.classList.remove("!bg-[#0044FF]");
              circle.closest(".row").classList.remove("inview");
            }
          });
        },
        scrub: true,
      },
    });
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const pinkBarLeftOffset = document
  //       .querySelector(".scroll_line_one")
  //       .getBoundingClientRect().left;
  //     if (window.innerWidth < 992 && window.innerWidth > 595) {
  //       setLeftPosition(pinkBarLeftOffset + 23);
  //     } else if (window.innerWidth < 596 && window.innerWidth > 375) {
  //       setLeftPosition(pinkBarLeftOffset - 3);
  //     } else if (window.innerWidth < 376) {
  //       setLeftPosition(pinkBarLeftOffset + 23);
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // });

  // const leftOffest = {
  //   left: `-${leftPosition}px`,
  // };

  const getKeyForIndex = (index) => {
    const item = data[index];
    if (!item) return null;
    return item.animationLottie || item.lottieAnimation || null;
  };

  const loadAnimationData = async (name, index) => {
    if (!name) return;
    if (loadedRef.current[index]) return; // already fetched

    // const url = getLottieUrl(name);
    if (!url) {
      console.warn("No Lottie URL for key:", name);
      return;
    }

    loadedRef.current[index] = true;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error("Failed to fetch lottie", name, url);
        return;
      }
      const json = await res.json();
      console.log("Lootie JSON: " + json);

      setAnimationsState((prev) => {
        const newState = [...prev];
        newState[index] = {
          ...(newState[index] || { isVisible: false, animationData: null }),
          animationData: json,
        };
        return newState;
      });
    } catch (err) {
      console.error("Error fetching lottie", name, err);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          console.log("Intersect index", index);
          if (Number.isNaN(index)) return;

          if (entry.isIntersecting) {
            const key = getKeyForIndex(index);
            if (key) {
              loadAnimationData(key, index);
            }
            setAnimationsState((prev) => {
              const newState = [...prev];
              const current = newState[index] || {
                isVisible: false,
                animationData: null,
              };
              newState[index] = { ...current, isVisible: true };
              return newState;
            });
          } else {
            setAnimationsState((prev) => {
              const newState = [...prev];
              const current = newState[index] || {
                isVisible: false,
                animationData: null,
              };
              newState[index] = { ...current, isVisible: false };
              return newState;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    animationRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`timeline grid__parallax padding-medium ${
        theme === "dark" ? "darkMode" : ""
      }`}
    >
      <div className={`container !max-w-[1340px]`}>
        <div
          className={`relative w-full z-10 desktop-mid-down:flex desktop-mid-down:flex-col`}
        >
          <div
            className={`absolute top-0 left-[50%] w-[10rem] h-full lg:left-[0] lg-up:translate-x-[-50%] desktop-mid-down:hidden desktop-mid-down:w-[1rem] desktop-mid-down:top-1/2 desktop-mid-down:left-[0.4rem] desktop-mid-down:-translate-y-1/2`}
          >
            <div className="relative w-full h-full">
              <div className="scroll_line_one absolute top-0 left-[50%] translate-x-[-50%] w-[10px] rounded-[10px] h-[calc(100%+50px)] bg-gray-300 desktop-mid-down:-top-[25px]"></div>
              <div
                className={`${style.line} ${style.lineOne} absolute top-0 left-[50%] translate-x-[-50%] w-[8px] h-[calc(100%+50px)] overflow-hidden lg:w-[6px]`}
              >
                <div className={`pinkline`}></div>
              </div>
            </div>
          </div>
          {data.map((item, index) => (
            <div
              className={`row relative w-full flex flex-wrap items-center mb-[50px] last:mb-0 border-spacing-0 desktop-mid-down:pb-[50px] desktop-mid-down:border-b-[2px] last:pb-0 last:border-none`}
              key={index}
            >
              <div
                className={`${style.circle} desktop-mid-down:hidden circle circleOne absolute left-1/2 top-1/2 desktop-mid-down:left-0 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-[50%] lg:right-auto lg:translate-x-0`}
                // style={leftOffest}
              >
                <span className="circleTopline2 hidden relative desktop-mid-down:inline-block text-[0] w-[90px] h-[2px] top-[-51px] transition-all duration-300 rounded-tl-xl left-[15px]">
                  line
                </span>
                <span className="circleTopline hidden relative desktop-mid-down:inline-block text-[0] w-[2px] h-[50px] top-[-76px] transition-all duration-300 rounded-tl-xl left-[14px]">
                  line
                </span>
                <span className="circleBottomline hidden relative desktop-mid-down:inline-block text-[0] w-[2px] h-[50px] bottom-[33px] transition-all duration-300 rounded-bl-xl left-[13px]">
                  line
                </span>
                <span className="circleBottomline2 hidden relative desktop-mid-down:inline-block text-[0] w-[90px] h-[2px] bottom-[53px] transition-all duration-300 rounded-bl-xl left-[15px]">
                  line
                </span>
              </div>
              <div
                className={`w-1/2 lg:w-[75%] relative pr-[100px] desktop-mid-down:pr-[0] desktop-mid-down:mb-[20px] desktop-mid-down:w-[100%]`}
              >
                <div
                  className={`left_content_wrap relative w-full p-[24px] desktop-mid-down:p-[18px] border-[1px] border-[#D1D1D6] rounded-[8px]`}
                >
                  <p
                    className={`text-[16px] text-black font-[500] desktop-mid-down:text-[14px]`}
                  >
                    {item.leftText}
                  </p>
                </div>
                {/* <div className={`left_content_wrap ${theme === "dark" ? "bg-[#000d20] border-[#222b59a1]" : "bg-white border-[#D1D1D6]"}`}>
  <p className={`${theme === "dark" ? "text-white" : "text-black"}`}>{item.leftText}</p>
</div> */}
              </div>
              <div className="w-1/2 lg:w-[75%] relative pl-[100px] desktop-mid-down:pl-[0] desktop-mid-down:w-[100%]">
                <div
                  className={`right_content_wrap relative w-full p-[24px] desktop-mid-down:p-[18px] border-[1px] border-[#D1D1D6] rounded-[8px]`}
                >
                  <p className="text-[16px] text-black font-[500] desktop-mid-down:text-[14px]">
                    {item.rightText}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btn-wrap w-full text-center mt-[70px] desktop-mid-down:mt-[40px]">
          <Link href="/" className="gradient-btn-blue">
            {`Learn more`}
          </Link>
        </div>
      </div>
    </section>
  );
}
