"use client";

import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export type CharacterGridRef = {
  animateExit: () => Promise<void>;
  animateEnter: () => Promise<void>;
};

const CharacterGrid = forwardRef<CharacterGridRef>((_, ref) => {
  const firstRef = useRef(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  // Exit animation
  const animateExit = (): Promise<void> => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: resolve,
      });

      tl.to(
        imagesRef.current,
        {
          x: 100,
          y: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
        },
        0
      );
    });
  };

  // Enter animation (reverse of exit)
  const animateEnter = (): Promise<void> => {
    return new Promise((resolve) => {
      gsap.set(imagesRef.current, { x: 100, y: 100, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: resolve,
      });

      tl.to(
        imagesRef.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
        },
        0
      );
    });
  };

  useImperativeHandle(ref, () => ({
    animateExit,
    animateEnter,
  }));

  useEffect(() => {
    // Floating idle animation on mount
    imagesRef.current.forEach((el, i) => {
      gsap.to(el, {
        y: -20,
        duration: 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.1,
      });
    });
  }, []);

  return (
    <section
      ref={firstRef}
      id="first"
      className="relative snap-start h-screen">
      <div className="absolute inset-0 w-full h-screen bg-white overflow-hidden flex items-center justify-center">
        <div className="z-10 p-10 absolute top-10 left-10">
          <Image
            src="/logo.webp"
            alt="logo"
            width={350}
            height={50}
            className="w-full z-10 max-w-[350px] aspect-[300/50] bg-contain bg-center"
          />
        </div>
        <div className="grid grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) imagesRef.current[index] = el;
              }}
              className="relative  w-[400px] h-[400px] xl:w-[800px] xl:h-[800px] 2xl:w-[900px] 2xl:h-[900px]">
              <Image
                src={`/characters/img${index + 1}.webp`}
                alt={`character ${index + 1}`}
                width={800}
                height={800}
                className={`absolute object-cover bg-center transform`}
                style={{
                  left: -300,
                  top: -index * 50,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

CharacterGrid.displayName = "CharacterGrid";

export default CharacterGrid;
