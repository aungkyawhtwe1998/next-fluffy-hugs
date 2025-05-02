"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Image from "next/image";

export default function WalkingWithText() {
  const containerRef = useRef(null);
  const thirdRef = useRef(null);
  const catMoveRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(wordRefs.current, {
        y: -10,
        ease: "sine.inOut",
        duration: 0.8,
        stagger: {
          each: 0.1,     // Increase this for longer wave length
          repeat: -1,
          yoyo: true,
        },
      });
    });
  
    return () => {
      ctx.revert();
      wordRefs.current = [];
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cat move
      if (catMoveRef.current) {
        gsap.to(catMoveRef.current, {
          x: -window.innerWidth,
          duration: 10,
          ease: "none",
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert(); // clean up animations
  }, []);

  return (
    <section
      id="third"
      ref={thirdRef}
      className="snap-start">
      <div className="relative w-full h-screen bg-[#fbf1dc]">
        {/* Full background cats animation */}
        <div className="z-10 p-10 absolute top-10 left-10">
          <Image
            src="/logo.webp"
            alt="logo"
            width={200}
            height={40}
            className="w-full h-[40px] z-10 max-w-[200px] aspect-[200/40] bg-contain bg-center"
          />
        </div>

        <div
          ref={catMoveRef}
          className="absolute inset-0 z-0 opacity-60">
          <Image
            src="/animals.webp"
            alt="bubble"
            layout="fill"
            objectFit="cover"
            className="w-full h-full bg-cover bg-repeat-x"
          />
        </div>

        {/* Content layer */}
        <div className="space-y-5 pb-50 absolute right-20 bottom-20 max-w-lg">
          {[
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, tempora impedit vero eligendi odit,",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          ].map((text, index) => (
            <h1
              key={index}
              className="text-2xl text-blue-800">
              {text.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-1"
                  ref={(el) => {
                    if (el) wordRefs.current.push(el);
                  }}>
                  {word}
                </span>
              ))}
            </h1>
          ))}
        </div>
      </div>
    </section>
  );
}
