"use client";

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const layout = ({ children }) => {
  const { session } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
