"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package

export default function Template({ children }: { children: React.ReactNode }) {
  const container = useRef();

  useGSAP(() => {
    // ✅ safe, created during execution, selector text scoped
    const transitionElement = document.getElementById("transition-element");

    if (transitionElement) {
      const tl = gsap.timeline();

      tl.set(transitionElement, {
        xPercent: 0,
      })
        .to(transitionElement, {
          xPercent: 100,
          duration: 0.8,
        })
        .to(
          transitionElement,
          {
            borderTopLeftRadius: "50vh",
            borderBottomLeftRadius: "50vh",
            duration: 0.4,
          },
          "<"
        );
    }
  }, { scope: container })
  
  return (
    <div>
      <div
        ref={container}
        id="transition-element"
        className="w-screen h-screen bg-black z-100 fixed top-0 left-0"
      ></div>
      {children}
    </div>
  );
}
