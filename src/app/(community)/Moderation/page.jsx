"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Moderation() {
  const steps = useRef([]);

  useEffect(() => {
    gsap.from(steps.current, {
      x: -40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const data = [
    "Users flag inappropriate content",
    "Moderators review reports",
    "Actions are taken if needed",
    "Appeals can be submitted",
  ];

  return (
    <section className="mx-auto max-w-4xl py-24">
      <h1 className="mb-12 text-4xl font-bold">Moderation</h1>

      {data.map((text, i) => (
        <div
          key={i}
          ref={(el) => (steps.current[i] = el)}
          className="mb-4 rounded border p-6 text-white"
        >
          {text}
        </div>
      ))}
    </section>
  );
}
