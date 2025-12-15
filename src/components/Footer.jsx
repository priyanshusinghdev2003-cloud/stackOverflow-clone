"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);
  return (
    <footer className="bg-neutral-950 text-neutral-400" ref={footerRef}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top Section */}
        <div className="mb-12 max-w-xl">
          <h2 className="text-xl font-semibold text-white">
            Built by developers. Powered by community knowledge.
          </h2>
          <p className="mt-4 text-sm">
            Ask questions, share solutions, and help others solve real-world
            problems. Every contribution makes the community stronger.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>Ask a Question</li>
              <li>Browse Questions</li>
              <li>Tags</li>
              <li>Users</li>
              <li>Leaderboard</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/HowItWorks">How It Works</Link>
              </li>
              <li>
                <Link href="/Reputation">Reputation System</Link>
              </li>
              <li>
                <Link href="/Guidelines">Guidelines</Link>
              </li>
              <li>
                <Link href="/CodeOfConduct">Code of Conduct</Link>
              </li>
              <li>
                <Link href="/Moderation">Moderation</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Documentation</li>
              <li>API</li>
              <li>Blog</li>
              <li>Changelog</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 md:flex-row">
          <p className="text-xs">
            © {new Date().getFullYear()} DevQ&A. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <span>GitHub</span>
            <span>Twitter</span>
            <span>Discord</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
