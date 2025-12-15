"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HowItWorks() {
  const steps = useRef([]);

  useEffect(() => {
    gsap.from(steps.current, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  const data = [
    "Ask a clear and detailed question",
    "Community members post answers",
    "Vote and accept the best answer",
    "Earn reputation and unlock features",
  ];

  return (
    <section className="mx-auto mt-5 max-w-4xl py-24">
      <h1 className="mb-12 text-4xl font-bold">How It Works</h1>

      {data.map((text, i) => (
        <div
          key={i}
          ref={(el) => (steps.current[i] = el)}
          className="mb-6 rounded-lg border p-6"
        >
          {text}
        </div>
      ))}
    </section>
  );
}
