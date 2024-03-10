"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package


if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export default function TransitionLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container }); // we can pass in a config object as the 1st parameter to make scoping simple

  const router = useRouter();

  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  // selector text is scoped properly to the container.
  const onClickGood = contextSafe(() => {
    const animationWrapper = document.getElementById("transition-element");

    if (animationWrapper) {
      const tl = gsap.timeline();

      tl.set(animationWrapper, {
        xPercent: -100,
        borderTopRightRadius: "50vh",
        borderBottomRightRadius: "50vh",
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0",
      })
        .to(animationWrapper, {
          xPercent: 0,
          duration: 0.8,
          onComplete: () => {
            router.push(href);
          },
        })
        .to(
          animationWrapper,
          {
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
            duration: 0.4,
          },
          "<"
        );
    }
  });

  return (
    <button
      ref={container}
      className="border-[1px] border-black p-4 rounded-xl hover:bg-black hover:text-neutral-100 cursor-pointer"
      onClick={onClickGood}
    >
      {children}
    </button>
  );
}
