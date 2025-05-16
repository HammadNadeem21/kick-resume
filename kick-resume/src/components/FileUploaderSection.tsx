import React from "react";
import DropzoneUploader from "./FileUploader";
import AiResumeAnalyzeReort from "./AiResumeAnalyzeReort";

const FileUploaderSection = () => {
  return (
    <div className="bg-myLightBlue py-[100px] px-4 flex flex-col  gap-10">
      {/* Heading */}
      <div className="w-[90%] mx-auto text-center">
        <h1 className="lg:text-4xl sm:text-2xl text-2xl text-myDarkBlue font-semibold">
          Security & Data Protection
        </h1>
        <p className="lg:text-xl sm:text-sm text-xs text-myDarkBlue mt-2">
          Kickresume gives you full control over your data while keeping it
          safe.
        </p>
      </div>

      <DropzoneUploader />
      {/* <AiResumeAnalyzeReort/> */}
    </div>
  );
};

export default FileUploaderSection;
