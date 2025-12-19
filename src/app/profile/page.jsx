"use client";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/Auth";
import { getFormatDate, GetIntialNameofUser, getRandomColor } from "@/utils";
import React, { useState } from "react";

function page() {
  const { user } = useAuthStore();
  const initialName = GetIntialNameofUser(user?.name);
  const [randomColor, setRandomColor] = useState(getRandomColor(user?.name));

  return (
    <div className="mt-30 mb-30">
      <div className="mt-16 flex items-center gap-5 px-20">
        <div className="flex w-fit flex-col gap-2">
          <div
            className={cn(
              `flex h-40 w-40 items-center justify-center rounded-lg bg-[${randomColor}]`,
            )}
          >
            <p className="text-4xl font-bold text-gray-700">{initialName}</p>
          </div>
          <div className="mt-3 flex flex-col items-start gap-2">
            <div className="w-full cursor-pointer rounded-md px-2 py-1 text-xl font-bold text-white hover:bg-gray-600 hover:text-gray-300">
              Summary
            </div>
            <div className="w-full cursor-pointer rounded-md px-2 py-1 text-xl font-bold text-white hover:bg-gray-600 hover:text-gray-300">
              Questions
            </div>
            <div className="w-full cursor-pointer rounded-md px-2 py-1 text-xl font-bold text-white hover:bg-gray-600 hover:text-gray-300">
              Answers
            </div>
            <div className="w-full cursor-pointer rounded-md px-2 py-1 text-xl font-bold text-white hover:bg-gray-600 hover:text-gray-300">
              Votes
            </div>
          </div>
        </div>
        <div className="flex w-full flex-2/3 flex-col">
          <div className="flex h-40 w-full flex-col">
            <p className="text-xl font-bold text-white">{user?.name}</p>
            <p className="text-lg font-bold">{user?.email}</p>
            <p className="font-semibold">
              Dropped{getFormatDate(user?.$createdAt)}
            </p>
            <p className="font-medium">
              Last activity{getFormatDate(user?.accessedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
