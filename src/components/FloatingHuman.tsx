/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { act, useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import floatingHuman from "../../public/animation/human-floating.json";
import walkingHuman from "../../public/animation/human-walking.json";

interface FloatingHumanProps {
  active: number;
}

const FloatingHuman = ({ active }: FloatingHumanProps) => {
  const humanRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (!lottieRef.current) return;

    if (active > 0) {
      lottieRef.current.play();
    } else {
      lottieRef.current.stop();
    }
  }, [active]);

  useEffect(() => {
    if (!humanRef.current) return;

    if (active === 0) {
      gsap.to(humanRef.current, {
        y: -20,
        duration: 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    } else {
      gsap.killTweensOf(humanRef.current);
      gsap.to(humanRef.current, { y: 0, duration: 0.3 });
    }
  }, [active]);

  // Rotation animation for active === 1
  useEffect(() => {
    if (!humanRef.current) return;

    gsap.to(humanRef.current, {
      rotateZ: active === 1 ? -90 : 0,
      transformOrigin: "center center",
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, [active]);

  return (
    <div
      ref={humanRef}
      className={`absolute z-30 w-[300px] h-[300px] xl:w-[600px] xl:h-[600px] transform
        ${
          active < 2
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            : "bottom-0 top-1/2 -translate-y-1/2 left-1/4"
        }`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={active === 2 ? walkingHuman : floatingHuman}
        loop
        autoplay={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default FloatingHuman;
