"use client";
import React, { useEffect } from "react";
import "./uni-partner.css";
const uni1 = "/assets/images/home/uni-1.png";
const uni2 = "/assets/images/home/uni-2.png";
const uni3 = "/assets/images/home/uni-3.png";
const uni4 = "/assets/images/home/uni-4.png";
const uni5 = "/assets/images/home/uni-5.png";
const uni6 = "/assets/images/home/uni-6.png";
const uni7 = "/assets/images/home/uni-7.png";
const uni8 = "/assets/images/home/uni-8.png";
const uni9 = "/assets/images/home/uni-9.png";
const uni10 = "/assets/images/home/uni-10.png";
const uni11 = "/assets/images/home/uni-11.png";
const uni12 = "/assets/images/home/uni-12.png";
const uni13 = "/assets/images/home/uni-13.png";
const uni14 = "/assets/images/home/uni-14.png";
const uni15 = "/assets/images/home/uni-15.png";
const uni16 = "/assets/images/home/uni-16.png";

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
