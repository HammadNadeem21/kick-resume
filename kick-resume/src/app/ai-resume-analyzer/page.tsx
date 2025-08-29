import Hero from "@/components/Hero";
import React from "react";

const page = () => {
  return (
    <div className="max-w-[1200px] mx-auto h-auto flex flex-col justify-center sm:gap-5 gap-2 mt-[60px]">
      <section className="">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="md:text-5xl lg:text-6xl text-3xl font-black mb-6 tracking-tight">
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              AI Resume
            </span>
            <br />
            <span className="text-black">Analyzer</span>
          </h1>
          <p className="md:text-xl lg:text-2xl text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Upload your resume and get instant AI-powered analysis with
            actionable insights and automated cover letter generation.
          </p>
        </div>
      </section>

      <Hero />
    </div>
  );
};

export default page;
