import React from "react";
import FeatureCard from "./FeatureCard";
import { featureSection } from "@/lib/data";

const Features = () => {
  return (
    <div className="bg-myWhite py-[100px] px-4 grid grid-cols-2 text-center gap-10">
      {/* Heading */}
      <div className=" col-span-2 w-[90%] mx-auto">
        <h1 className="lg:text-4xl sm:text-2xl text-xl text-myDarkBlue font-semibold">
          An AI resume review tool designed by recruiters.
        </h1>
        <p className="lg:text-xl sm:text-sm text-xs text-myDarkBlue mt-2">
          Kickresume&apos;s online resume checker was designed by a team of
          experienced recruiters, data analysts, and software engineers.
        </p>
      </div>

      {/* Content */}
      {featureSection.map((feature, index) => (
        <FeatureCard
          key={index}
          heading={feature.heading}
          paragraph={feature.paragraph}
          points={feature.points}
          lastLine={feature.lastLine}
          image={feature.image}
        />
      ))}
    </div>
  );
};

export default Features;
