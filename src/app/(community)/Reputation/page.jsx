"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Reputation() {
  const items = useRef([]);

  useEffect(() => {
    gsap.from(items.current, {
      scale: 0.95,
      opacity: 0,
      stagger: 0.2,
      duration: 0.4,
    });
  }, []);

  const rules = [
    "+10 points for accepted answer",
    "+5 points for upvote",
    "-2 points for downvote",
    "Higher reputation unlocks moderation tools",
  ];

  return (
    <section className="mx-auto mt-5 max-w-4xl py-24 text-white">
      <h1 className="mb-12 text-4xl font-bold">Reputation System</h1>

      {rules.map((rule, i) => (
        <div
          key={i}
          ref={(el) => (items.current[i] = el)}
          className="mb-4 rounded border p-4 text-white"
        >
          {rule}
        </div>
      ))}
    </section>
  );
}
