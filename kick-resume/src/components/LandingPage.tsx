import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 items-center justify-center gap-4 py-10 max-w-[1600px] mx-auto h-auto">
      <section className="py-16">
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
              AI Powered
            </span>
            <br />
            <span className="text-black">Career</span>
            <br />
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Revolution
            </span>
          </h1>
          <p className="md:text-xl lg:text-2xl text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Upload your resume and get instant AI-powered analysis with
            actionable insights and automated cover letter generation.
          </p>
        </div>
      </section>

      <div className=" flex items-center justify-center">
        <div className="shadow-lg shadow-mySkyBlue sm:h-[300px] sm:w-[480px] h-[180px] w-[310px] rounded-xl ">
          <Image
            src="/landing-page.png"
            alt="picture"
            height={1000}
            width={1000}
            className="rounded-xl h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
