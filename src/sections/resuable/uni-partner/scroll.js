"use client";
import React, { useEffect } from "react";
import "./uni-partner.css";
const uni1 = "https://cms.skillang.com/uploads/uni_1_1fd6ae85ea.png";
const uni2 = "https://cms.skillang.com/uploads/uni_2_29b43a56a9.png";
const uni3 = "https://cms.skillang.com/uploads/uni_3_b97c1e0e36.png";
const uni4 = "https://cms.skillang.com/uploads/uni_4_a8b9812d20.png";
const uni5 = "https://cms.skillang.com/uploads/uni_5_368c6f1c01.png";
const uni6 = "https://cms.skillang.com/uploads/uni_6_777cd29e1e.png";
const uni7 = "https://cms.skillang.com/uploads/uni_7_edc4d32ee7.png";
const uni8 = "https://cms.skillang.com/uploads/uni_8_567e07f445.png";
const uni9 = "https://cms.skillang.com/uploads/uni_9_981818ce51.png";
const uni10 = "https://cms.skillang.com/uploads/uni_10_1a4614ea56.png";
const uni11 = "https://cms.skillang.com/uploads/uni_11_13055aab21.png";
const uni12 = "https://cms.skillang.com/uploads/uni_12_83873c92ab.png";
const uni13 = "https://cms.skillang.com/uploads/uni_13_49d1b8fef5.png";
const uni14 = "https://cms.skillang.com/uploads/uni_14_c2431ba219.png";
const uni15 = "https://cms.skillang.com/uploads/uni_15_ad8832ecde.png";
const uni16 = "https://cms.skillang.com/uploads/uni_16_fbf09ac6cd.png";

const ScrollEle = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  // Split images into two rows
  const firstRowImages = [uni1, uni2, uni3, uni4, uni5, uni6, uni7, uni8];
  const secondRowImages = [
    uni9,
    uni10,
    uni11,
    uni12,
    uni13,
    uni14,
    uni15,
    uni16,
  ];

  return (
    <div className="scroll-container d-flex flex-column align-items-center justify-content-center">
      {/* First row - Right to Left */}
      <div className="scroller w-100" data-direction="left" data-speed="slow">
        <div className="scroller__inner">
          {firstRowImages.map((img, index) => (
            <img
              key={`row1-${index}`}
              src={img}
              alt={`partner-row1-${index + 1}`}
              className="scroller-img"
            />
          ))}
        </div>
      </div>

      {/* Second row - Left to Right */}
      <div className="scroller w-100" data-direction="right" data-speed="slow">
        <div className="scroller__inner">
          {secondRowImages.map((img, index) => (
            <img
              key={`row2-${index}`}
              src={img}
              alt={`partner-row2-${index + 1}`}
              className="scroller-img"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollEle;
