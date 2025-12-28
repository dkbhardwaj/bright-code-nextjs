import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import style from "../styles/Timeline.module.css";
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

  useEffect(() => {
    const handleResize = () => {
      const pinkBarLeftOffset = document
        .querySelector(".scroll_line_one")
        .getBoundingClientRect().left;
      if (window.innerWidth < 992 && window.innerWidth > 595) {
        setLeftPosition(pinkBarLeftOffset + 23);
      } else if (window.innerWidth < 596 && window.innerWidth > 375) {
        setLeftPosition(pinkBarLeftOffset - 3);
      } else if (window.innerWidth < 376) {
        setLeftPosition(pinkBarLeftOffset + 23);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const leftOffest = {
    left: `-${leftPosition}px`,
  };

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

  const getLottieAnimation = (animationName, index) => {
    const name =
      animationName ||
      data[index]?.animationLottie ||
      data[index]?.lottieAnimation;

    if (!name) return null;

    // Make sure we always have a state object
    const state = animationsState[index] || {
      isVisible: false,
      animationData: null,
    };

    const animationClasses = {
      // NOTE: you have BulbLottie twice above, keep only one key
      SuperCollArrowLottie:
        "SuperCollArrowLottie left-[23.2rem] top-[-6rem] w-[30rem] h-[7rem] lg:left-[30%] lg:rotate-[10deg] lg:top-[-1rem] sm:w-[16rem] sm:h-[6rem]",
      Firework:
        "Firework sm:left-[unset] sm:right-[-8%] sm:w-[8rem] sm:h-[6.6rem] w-[10rem] h-[7.6rem] left-[23rem] top-[-8rem]",
      Smallheart:
        "Smallheart sm:left-[unset] sm:right-[-8%] sm:w-[8rem] w-[10rem] h-[8rem] left-[24rem] top-[-4rem]",
      Puzzle:
        "Puzzle w-[10rem] h-[8rem] left-[24rem] top-[-3rem] sm:left-[unset] sm:right-[-8%] sm:w-[8rem] sm:h-[6.6rem]",
      Bubble:
        "Bubble w-[15.5rem] h-[9rem] lg:w-[14rem] lg:h-[8rem] left-[24rem] top-[-7rem]",
      CurvedBottomLeftArrow:
        "w-[15.5rem] h-[9rem] left-[4rem] bottom-[-12rem] lg:bottom-[-9rem] sm:w-[12.2rem] sm:h-[8rem] sm:bottom-[-8rem]",
      Trophy:
        "Trophy w-[9rem] h-[10rem] lg:w-[8rem] lg:h-[9rem] lg:top-[-2rem] left-[24rem] top-[-6rem]",
      Drink:
        "Drink lg:w-[8rem] lg:h-[9rem] lg:top-[-5rem] w-[9rem] h-[10rem] left-[24rem] top-[-7rem]",
      Pin: "Pin w-[9rem] h-[10rem] left-[22rem] lg:top-[-4rem] lg:w-[8rem] lg:h-[9rem] top-[-6rem]",
      BulbLottie:
        "BulbLottie lg:top-[-6rem] w-[15rem] h-[15rem] lg:w-[12rem] lg:h-[12rem] sm:w-[10rem] sm:h-[10rem] left-[24rem] top-[-9rem]",
      Book: "Book w-[10rem] h-[8rem] left-[24rem] top-[-4rem]",
      Teambuilding: "Teambuilding w-[36rem] h-[7rem] left-[22rem] top-[-5rem]",
      Bullseye: "Bullseye w-[9rem] h-[9rem] left-[24rem] top-[-7rem]",
      LoopedArrowLottie:
        "LoopedArrowLottie w-[19rem] h-[7.5rem] left-[24rem] top-[-3rem]",
      Plane: "Plane w-[11rem] h-[7rem] left-[24rem] lg:top-[-5rem] top-[-8rem]",
      Debut:
        "absolute w-full h-[2.7rem] bottom-[-1.7rem] right-0 z-[2] sm:bottom-[-2rem]",
      Circle:
        "Circle absolute w-[195%] h-[132%] bottom-[-0.7rem] right-[-4rem] z-[2]",
      Brush: "absolute w-full h-[1.5rem] bottom-[-0.7rem] right-0 z-[2]",
      Underline: "absolute w-full h-[6rem] bottom-[-4.7rem] right-0 z-[2]",
      Circletwo:
        " absolute Circletwo w-[14.5rem] h-[10.2rem] bottom-[-2.7rem] right-[-3rem] z-[2]",
      Sparkles:
        "absolute w-[10.5rem] h-[8.7rem] top-[-2.7rem] right-[45%] z-[2] sm:right-[0%]",
    };

    const className = animationClasses[name] || "";
    const hasData = !!state.animationData;

    return (
      <div
        ref={(el) => (animationRefs.current[index] = el)}
        data-index={index}
        className={`lottieWrap absolute ${className}`}
      >
        {hasData && (
          <Lottie
            options={{
              loop: false,
              autoplay: state.isVisible,
              animationData: state.animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            isStopped={!state.isVisible}
            isPaused={!state.isVisible}
          />
        )}
      </div>
    );
  };

  return (
<section
  className={`timeline grid__parallax padding-medium ${
    theme === "dark" ? "darkMode" : ""
  }`}
>

      <div className={`container !max-w-[1340px]`}>
        <div className={`relative w-full lg:pl-[10rem] xs:pl-[5rem]  z-10 `}>
          <div
            className={`absolute top-0 left-[50%] translate-x-[-50%] w-[10rem] h-full tablet:right-[0] phablet:right-0 xs:w-[7rem] lg:left-[0] tablet:left-[5rem] phablet:left-[5rem] xs:left-[1rem] sm:translate-x-unset`}
          >
            <div className="relative w-full h-full">
              <div className="scroll_line_one absolute top-0 left-[50%] translate-x-[-50%] w-[10px] rounded-[10px] h-[calc(100%+50px)] bg-gray-300 lg:left-auto tablet:right-[calc(6rem+3px)] phablet:right-[calc(6rem+3px)] phone:right-0 xs:right-[calc(3rem+3px)] lg:-translate-x-0"></div>
              <div
                className={`${style.line} ${style.lineOne} absolute top-0 left-[50%] translate-x-[-50%] w-[8px] h-[calc(100%+50px)] overflow-hidden lg:w-[6px] lg:left-auto tablet:right-[6rem] phablet:right-[6rem] phone:right-[-3px] xs:right-[3rem] lg:-translate-x-0 `}
              >
                <div className={`pinkline`}></div>
              </div>
            </div>
          </div>
          {data.map((item, index) => (
            <div
              className={`row relative w-full flex flex-wrap items-center mb-[50px] last:mb-0`}
              key={index}
            >
              <div
                className={`${style.circle} circle circleOne absolute lg-up:!left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-[50%] lg:right-auto lg:translate-x-0`}
                style={leftOffest}
              />
              <div
                className={`w-1/2 lg:w-[75%] xs:w-[80%] relative pr-[100px]`}
              >
                <div
                  className={`left_content_wrap relative w-full p-[24px] border-[1px] border-[#D1D1D6] rounded-[8px]`}
                >
                  <p className={`text-[16px] text-black font-[500]`}>
                    {item.leftText}
                  </p>
                </div>
                {/* <div className={`left_content_wrap ${theme === "dark" ? "bg-[#000d20] border-[#222b59a1]" : "bg-white border-[#D1D1D6]"}`}>
  <p className={`${theme === "dark" ? "text-white" : "text-black"}`}>{item.leftText}</p>
</div> */}

              </div>
              <div className="w-1/2 lg:w-[75%] xs:w-[80%] relative pl-[100px]">
                <div
                  className={`right_content_wrap relative w-full p-[24px] border-[1px] border-[#D1D1D6] rounded-[8px]`}
                >
                  <p className="text-[16px] text-black font-[500]">
                    {item.rightText}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
