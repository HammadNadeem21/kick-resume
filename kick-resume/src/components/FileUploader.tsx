import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import DropzoneUploader from "./files";

const FileUploader = () => {
  return (
    <div className="h-[200px] md:w-[400px] w-[200px] md:border-2 border-dashed border-myWhite mt-7 rounded-xl flex flex-col items-center justify-center gap-2">
      {/* <IoCloudUploadOutline size={40} className="text-myMidblue" />
      <button className="py-2 px-5 bg-myMidblue rounded-xl">
        Upload Your Resume
      </button> */}
      <DropzoneUploader/>
    </div>
  );
};

export default FileUploader;
