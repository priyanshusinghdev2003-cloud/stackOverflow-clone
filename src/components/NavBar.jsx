"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  MenuItem,
  ProductItem,
  HoveredLink,
  HoverButton,
} from "./ui/navbar-menu";
import { useAuthStore } from "@/store/Auth";
import { Button } from "./ui/button";
import { gsap } from "gsap";
function Navbar() {
  const [active, setActive] = useState(null);
  const { user, logout } = useAuthStore();
  const [scrolled, setScrolled] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    const scrollHandler = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > scrolled) {
        gsap.to(navRef.current, {
          y: -200,
          opacity: 0,
          duration: 0.8,
          ease: "easeInOut",
        });
      } else {
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "easeInOut",
        });
      }
      setScrolled(scrollPosition);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [scrolled]);
  return (
    <div
      className={cn("fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl")}
      ref={navRef}
    >
      <Menu setActive={setActive}>
        <HoveredLink href="/">Home</HoveredLink>
        <HoveredLink href="/questions">Questions</HoveredLink>
        {user ? (
          <MenuItem setActive={setActive} active={active} item="Profile">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/profile">Profile</HoveredLink>
              <HoverButton onClick={logout}>Logout</HoverButton>
            </div>
          </MenuItem>
        ) : (
          <HoveredLink href="/login">Login</HoveredLink>
        )}
      </Menu>
    </div>
  );
}

export default Navbar;
