import { LatestQuestions } from "@/components/LatestQuestions";
import { HeroParallaxCard } from "@/components/Products";
import TopContributers from "@/components/TopContributers";
import React from "react";

function page() {
  return (
    <div>
      <HeroParallaxCard />
      <div className="flex justify-around gap-5">
        <LatestQuestions />
        <TopContributers />
      </div>
    </div>
  );
}

export default page;
