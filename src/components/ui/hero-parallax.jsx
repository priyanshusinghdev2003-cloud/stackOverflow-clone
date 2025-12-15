"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../ProductCard";

gsap.registerPlugin(ScrollTrigger);

export function HeroParallax({ products }) {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
        },
      });

      // 3D entrance
      tl.fromTo(
        rowsRef.current,
        {
          rotateX: 15,
          rotateZ: 20,
          y: -700,
          opacity: 0.2,
        },
        {
          rotateX: 0,
          rotateZ: 0,
          y: 0,
          opacity: 1,
          ease: "none",
        },
      );
      // infinite motion
      gsap.to(".row-1", {
        x: 1000,
        repeat: -1,
        duration: 15,
        ease: "linear",
        transition: {
          repeat: -1,
          duration: 15,
          ease: "linear",
        },
      });
      gsap.to(".row-2", {
        x: -1000,
        repeat: -1,
        duration: 15,
        ease: "linear",
        transition: {
          repeat: -1,
          duration: 15,
          ease: "linear",
        },
      });

      // Horizontal parallax per row
      gsap.to(".row-1", {
        x: 1000,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
        },
      });

      gsap.to(".row-2", {
        x: -1000,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
        },
      });

      gsap.to(".row-3", {
        x: 1000,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[300vh] flex-col overflow-hidden [perspective:1000px]"
    >
      <Header />

      <div
        ref={(el) => (rowsRef.current = el)}
        className="transform-gpu space-y-20"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="row-1 flex flex-row-reverse space-x-20 space-x-reverse">
          {firstRow.map((p) => (
            <ProductCard product={p} key={p.title} />
          ))}
        </div>

        <div className="row-2 flex flex-row space-x-20">
          {secondRow.map((p) => (
            <ProductCard product={p} key={p.title} />
          ))}
        </div>

        <div className="row-3 flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((p) => (
            <ProductCard product={p} key={p.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Header = () => {
  return (
    <div className="relative top-0 left-0 mx-auto w-full max-w-7xl px-4 py-20 md:py-40">
      {" "}
      <h1 className="text-2xl font-bold md:text-7xl dark:text-white">
        {" "}
        Where Developers Ask, Answer, & Learn Together
      </h1>{" "}
      <p className="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
        {" "}
        Ask technical questions, share real-world solutions, and help other
        developers solve problems faster — powered by community knowledge.
      </p>{" "}
    </div>
  );
};
