"use client";
import React, { useState } from "react";
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

function Navbar() {
  const [active, setActive] = useState(null);
  const { user, logout } = useAuthStore();
  return (
    <div className={cn("fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl")}>
      <Menu setActive={setActive}>
        <HoveredLink href="/">Home</HoveredLink>
        <HoveredLink href="/ask-questions">Questions</HoveredLink>
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
