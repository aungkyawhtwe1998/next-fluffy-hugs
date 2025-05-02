/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import humanFloating from "../../public/animation/human-floating.json";
import humanWalking from "../../public/animation/human-walking.json";

import Image from "next/image";

export default function CharacterGrid() {
  const containerRef = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  const imagesRef = useRef<HTMLDivElement[]>([]);
  const humanRef = useRef<HTMLDivElement>(null);
  const floatingLottieRef = useRef<any>(null);
  const walkingLottieRef = useRef<any>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const catMoveRef = useRef<HTMLDivElement>(null);
  const floatingContainerRef = useRef<HTMLDivElement>(null);
  const walkingContainerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLHeadingElement[]>([]);

  //text wave
  useEffect(() => {
    if (linesRef.current.length > 0) {
      gsap.to(linesRef.current, {
        y: -50, // Increased from -20 to -50 for a bigger wave
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    }
  }, []);
  //images
  useEffect(() => {
    if (imagesRef.current.length > 0) {
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
    }

    //human
    if (humanRef.current) {
      gsap.to(humanRef.current, {
        y: -20,
        duration: 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  //bubble
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

  //cat move
  useEffect(() => {
    if (typeof window === "undefined" || !catMoveRef.current) return;
    gsap.to(catMoveRef.current, {
      x: -window.innerWidth,
      duration: 10,
      ease: "none",
      repeat: -1,
      delay: 0,
    });
  }, []);

  //floating
  useEffect(() => {
    if (!floatingContainerRef.current || !floatingLottieRef.current) return;

    ScrollTrigger.create({
      trigger: floatingContainerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => floatingLottieRef.current.play(),
      onLeaveBack: () => floatingLottieRef.current.stop(),
    });
  }, []);

  //walking
  useEffect(() => {
    if (!walkingContainerRef.current || !walkingLottieRef.current) return;

    ScrollTrigger.create({
      trigger: walkingContainerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => walkingLottieRef.current.play(),
      onLeaveBack: () => walkingLottieRef.current.stop(),
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      {/* first screen */}
      <section
        ref={firstRef}
        id="first"
        className="snap-start h-screen">
        <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center">
          {/* Grid of character images */}
          <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-[-20px] gap-y-[-100px]">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) imagesRef.current[index] = el;
                }}
                className="relative w-[350px] h-[350px]">
                <Image
                  src={`/characters/img${index + 1}.webp`}
                  alt={`character ${index + 1}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ))}
          </div>

          {/* Centered Human Image, rotate it to horizontal when scroll and hide it and replace it with the lottie using gsap */}
          <div
            ref={humanRef}
            className="absolute w-[500px] h-[500px]">
            <Image
              src="/human.webp"
              alt="human"
              layout="fill"
              objectFit="contain"
              className="scale-150"
            />
          </div>
        </div>
      </section>

      {/* second screen,  to show on scroll, but not long page, just replace it on first screen on scroll  */}
      <section
        id="second"
        ref={secondRef}
        className="snap-start h-screen">
        <div className="relative w-full flex justify-center items-center h-screen overflow-hidden bg-white">
          <div
            ref={bubbleRef}
            className="absolute bottom-[-100px]  left-0 w-full h-screen opacity-60">
            <Image
              src="/bubbles.webp"
              alt="bubble"
              layout="fill"
              objectFit="contain"
              className="w-full h-full bg-cover"
            />
          </div>
          <div className="z-10">
            <Image
              src="/logo.webp"
              alt="logo"
              width={500}
              height={80}
              className="w-[70vw] h-auto bg-contain z-10"
            />
            <div
              ref={floatingContainerRef}
              className=" flex items-center justify-center">
              {/* must be shown horizontal on scroll at first screen and*/}
              <Lottie
                lottieRef={floatingLottieRef}
                animationData={humanFloating}
                loop
                autoplay={false}
                className="w-[400px] transform rotate-90 rotate-x-180 rotate-y-180 h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* third screen  */}
      <section
        id="third"
        ref={thirdRef}
        className="snap-start h-screen">
        <div className="relative flex flex-col p-10 w-full h-screen overflow-hidden bg-[#fbf1dc]">
          {/* Full background cats animation */}
          <div className="z-10 p-10">
            <Image
              src="/logo.webp"
              alt="logo"
              width={300}
              height={20}
              className="w-full h-[40px] z-10 max-w-[200px] aspect-[200/80] bg-contain bg-center"
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
          <div className="flex h-full justify-end items-end z-10 gap-10">
            <div
              ref={walkingContainerRef}
              className="relative z-10 flex items-end w-full h-full">
              <Lottie
                lottieRef={floatingLottieRef}
                animationData={humanWalking}
                loop
                autoplay={false}
                className="w-[400px] absolute left-10 xl:left-20 h-[400px]"
              />
            </div>
            <div className="space-y-5 pb-50 -ml-40">
              {[
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, tempora impedit vero eligendi odit,",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              ].map((text, index) => (
                <h1
                  key={index}
                  ref={(el) => {
                    if (el) linesRef.current[index] = el;
                  }}
                  className="text-2xl text-blue-800">
                  {text}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
