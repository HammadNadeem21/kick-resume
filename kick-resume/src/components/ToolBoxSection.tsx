import React from "react";
import ToolboxCard from "./ToolboxCard";
import { toolbox } from "@/lib/data";
import Link from "next/link";

const ToolBoxSection = () => {
  return (
    <div className="bg-mySkyBlue/20 py-[100px] px-4 text-center">
      {/* Heading */}
      <div className=" col-span-2 w-[80%] mx-auto">
        <h1 className="lg:text-4xl sm:text-2xl text-xl text-mySkyBlue font-semibold">
          The only career toolbox you&apos;ll ever need.
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-3 mt-[60px] sm:px-8 px-3">
        {toolbox.map((item: any, index) => (
          <ToolboxCard
            key={index}
            image={item.image}
            heading={item.heading}
            paragraph={item.content}
          />
        ))}
      </div>

      <button className="mt-[100px] py-1 px-5 rounded-lg text-white font-semibold bg-mySkyBlue/60 hover:bg-mySkyBlue transition-all duration-300">
        Try
        <Link href="ai-resume-builder"></Link>
      </button>
    </div>
  );
};

export default ToolBoxSection;
