"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CharacterGrid, { CharacterGridRef } from "./CharacterGrid";
import FloatingBubble from "./FloatingBubble";
import LoadingScreen from "./LoadingScreen";
import WalkingWithText from "./WalkingWithText";
import FloatingHuman from "./FloatingHuman";

const components = [CharacterGrid, FloatingBubble, WalkingWithText];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrolling = useRef(false);
  const characterGridRef = useRef<CharacterGridRef>(null);

  useEffect(() => {
    let delta = 0;
    const threshold = 50;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = async (e: WheelEvent) => {
      if (scrolling.current) return;

      delta += e.deltaY;

      if (Math.abs(delta) >= threshold) {
        scrolling.current = true;

        if (delta > 0 && activeIndex < components.length - 1) {
          if (activeIndex === 0 && characterGridRef.current) {
            await characterGridRef.current.animateExit();
          }
          setActiveIndex((prev) => prev + 1);
        } else if (delta < 0 && activeIndex > 0) {
          setActiveIndex((prev) => prev - 1);
        }

        delta = 0;
        setTimeout(() => {
          scrolling.current = false;
        }, 1000);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = async () => {
      if (scrolling.current) return;

      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > threshold) {
        scrolling.current = true;

        if (diff > 0 && activeIndex < components.length - 1) {
          if (activeIndex === 0 && characterGridRef.current) {
            await characterGridRef.current.animateExit();
          }
          setActiveIndex((prev) => prev + 1);
        } else if (diff < 0 && activeIndex > 0) {
          setActiveIndex((prev) => prev - 1);
        }

        setTimeout(() => {
          scrolling.current = false;
        }, 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex]);

  // useEffect(() => {
  //   let delta = 0;
  //   const threshold = 50;

  //   const handleWheel = async (e: WheelEvent) => {
  //     if (scrolling.current) return;

  //     delta += e.deltaY;

  //     if (Math.abs(delta) >= threshold) {
  //       scrolling.current = true;

  //       if (delta > 0 && activeIndex < components.length - 1) {
  //         if (activeIndex === 0 && characterGridRef.current) {
  //           await characterGridRef.current.animateExit();
  //         }
  //         setActiveIndex((prev) => prev + 1);
  //       } else if (delta < 0 && activeIndex > 0) {
  //         setActiveIndex((prev) => prev - 1);
  //       }

  //       delta = 0;
  //       setTimeout(() => {
  //         scrolling.current = false;
  //       }, 1000);
  //     }
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: false });
  //   return () => window.removeEventListener("wheel", handleWheel);
  // }, [activeIndex]);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [activeIndex]);

  const ActiveComponent = components[activeIndex];

  return (
    <div className="relative overflow-hidden w-full h-full">
      <FloatingHuman active={activeIndex} />
      <div
        ref={containerRef}
        className="h-screen w-screen relative">
        <LoadingScreen />
        {activeIndex === 0 ? (
          <CharacterGrid ref={characterGridRef} />
        ) : (
          <ActiveComponent />
        )}
      </div>
    </div>
  );
}
