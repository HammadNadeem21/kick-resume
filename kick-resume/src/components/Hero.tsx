import Image from "next/image";
import React from "react";
import DropzoneUploader from "./FileUploader";
import AiResumeAnalyzeReort from "./AiResumeAnalyzeReort";
import { ResumeProvider } from "@/context/ReaumeContext";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 bg-primaryColor py-10">
      <div className=" flex flex-col gap-3 items-center justify-center lg:px-12 px-8 py-10">
        <h1 className="lg:text-4xl text-3xl font-semibold text-myWhite lg:text-left text-center">
          AI Resume Checker: Get Your Resume Score Now
        </h1>
        <p className="text-myWhite mt-7 lg:text-left text-center">
          Get your resume reviewed in an instant. Scan your resume for issues
          and see how it compares against other resumes in our database.
        </p>

        {/* <FileUploader/> */}
        <div className="mt-8">
          <DropzoneUploader />
        </div>
      </div>

      <div className="flex items-center md:px-12 px-7">
        <Image
          src="/hero-section.png"
          alt="picture"
          height={1000}
          width={1000}
          className="rounded-xl"
        />
      </div>

      <div className="lg:col-span-2 col-span-1">
        
        <AiResumeAnalyzeReort/>
        
      </div>

      <div className="lg:col-span-2 col-span-1 text-center mt-[100px] px-2">
        <h1 className="text-myWhite">
          Kickresume helps people get hired at the world&apos;s top companies
        </h1>
        <div className="flex sm:gap-6 gap-3 mt-5 justify-center">
          <Image
            src="/google.svg"
            alt="google"
            height={100}
            width={100}
            className="sm:h-6 h-4 sm:w-[80px] w-[60px]"
          />
          <Image
            src="/apple.svg"
            alt="google"
            height={100}
            width={100}
            className="sm:h-6 h-4 sm:w-7 w-4"
          />
          <Image
            src="/facebook.svg"
            alt="google"
            height={100}
            width={100}
            className="sm:h-6 h-4 sm:w-[100px] w-[80px]"
          />
          <Image
            src="/nasa.svg"
            alt="google"
            height={100}
            width={100}
            className="sm:h-6 h-4 sm:w-[70px] w-[50px]"
          />
          <Image
            src="/nike.svg"
            alt="google"
            height={100}
            width={100}
            className="sm:h-6 h-4 sm:w-[60px] w-[50px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
