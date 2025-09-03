import Image from "next/image";
import React from "react";
import DropzoneUploader from "./FileUploader";
import dynamic from "next/dynamic";
const AiResumeAnalyzeReort = dynamic(
  () => import("@/components/AiResumeAnalyzeReort"),
  {
    ssr: false,
  }
);
const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1  mx-w-[1600px] mx-auto">
      <div className=" flex flex-col gap-3 items-center justify-center lg:px-[100px] px-8 py-10">
        {/* <h1 className="lg:text-4xl text-3xl font-semibold text-myPurple lg:text-left text-center">
          Let AI Score & Improve Your Resume in Seconds
        </h1>
        <p className="text-myPurple mt-7 lg:text-left text-center">
          Upload your resume for a quick AI review - get actionable suggestions
          to improve formatting, content and impact.
        </p> */}

        {/* <FileUploader/> */}
        <div className="mt-8">
          <DropzoneUploader />
        </div>
      </div>

      <div className=" flex items-center justify-center">
        <div className="shadow-lg shadow-mySkyBlue sm:h-[300px] sm:w-[480px] h-[180px] w-[310px] rounded-xl ">
          <Image
            src="/hero-section.png"
            alt="picture"
            height={1000}
            width={1000}
            className="rounded-xl h-full w-full"
          />
        </div>
      </div>

      <div className="lg:col-span-2 col-span-1">
        <AiResumeAnalyzeReort />
      </div>

      <div className="lg:col-span-2 col-span-1 text-center px-2">
        <h1 className="text-mySkyBlue font-semibold">
          Built to help your your resume shine - whether you are applying
          locally or globally.
        </h1>
        {/* <div className="flex sm:gap-6 gap-3 mt-5 justify-center">
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
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
