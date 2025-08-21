import Hero from "@/components/Hero";
import React from "react";

const page = () => {
  return (
    <div>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight">
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
          <p className="text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
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
