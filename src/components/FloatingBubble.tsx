"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";

export default function FloatingBubble() {
  const secondRef = useRef(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !bubbleRef.current) return;

    gsap.to(bubbleRef.current, {
      y: -window.innerHeight,
      duration: 10,
      ease: "none",
      repeat: -1,
      delay: 0,
    });
  }, []);

  return (
    <section
      id="second"
      ref={secondRef}
      className="snap-start h-screen">
      <div className="relative w-full flex justify-center h-screen overflow-hidden bg-white">
        <div
          ref={bubbleRef}
          className="absolute bottom-[-100px] left-0 w-full h-screen opacity-60">
          <Image
            src="/bubbles.webp"
            alt="bubble"
            layout="fill"
            objectFit="contain"
            className="w-full h-full bg-cover"
          />
        </div>
        <div className="z-10 pt-36">
          <Image
            src="/logo.webp"
            alt="logo"
            width={500}
            height={80}
            className="w-[75vw] h-auto bg-contain z-10"
          />
        </div>
      </div>
    </section>
  );
}
