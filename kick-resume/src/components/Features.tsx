import React from "react";
import FeatureCard from "./FeatureCard";
import { featuresSection } from "@/lib/data";

const Features = () => {
  return (
    <div className="bg-[linear-gradient(to_right,#fff,#8bcadf,#fff)] flex flex-col items-center py-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className=" w-[90%] mx-auto text-center">
          <h1 className="lg:text-4xl sm:text-2xl text-xl text-gray-500 font-semibold">
            An AI resume review tool designed by recruiters.
          </h1>
          <p className="lg:text-xl sm:text-sm text-xs text-gray-500 mt-2">
            Kickresume&apos;s online resume checker was designed by a team of
            experienced recruiters, data analysts, and software engineers.
          </p>
        </div>
        <div className=" py-[10px] px-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 text-center justify-center gap-5 mt-6">
          {/* Content */}
          {featuresSection.map((feature: any, index: number) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
