"use client";

import { SVGProps } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function WavyCircles(props: SVGProps<SVGSVGElement>) {
  useGSAP(() => {
    gsap.to(".wavy-circles-inner", {
      transformOrigin: "center",
      rotate: "360",
      duration: 16,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1165 1166"
      {...props}
    >

      <path
        className="wavy-circles-inner"
        fill="currentColor"
        d="M827.9 672.6c-12.4 34-55.3 46.3-75.9 68.2-20.5 22-29.2 64.9-59.5 79-30.3 14.2-68.8-6.8-98.7-5.1-30 1.6-67 26.6-101 14.2-33.9-12.3-46-55.9-68-75.8-22-20.5-65-29.2-79-59.5-14.1-30.3 6.9-68.8 5.8-98.6-1-29.7-26.4-67.6-14.2-101 12.1-33.3 55.5-46.9 76-68.8 20.6-21.8 28.6-65 59-79.2 30.2-14.1 68.7 6.9 98.4 5.8 29.8-1 67.7-26.4 101.6-14 34 12.3 46.2 55.2 68.1 75.8 21.9 20.5 65 28.6 79.2 58.9 14.1 30.3-6.9 68.8-5.2 98.8 1 29.7 25.7 67.4 13.4 101.3z"
        opacity="0.5"
      />
    </svg>
  );
}