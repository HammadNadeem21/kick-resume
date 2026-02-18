"use client";

import React from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useAiResumeBuilder } from "@/context/AiResumeBuilder";
import { X } from "lucide-react";

interface ResumeImageUploaderProps {
  imageFile?: File | null;
  setImageFile?: (file: File | null) => void;
  previewUrl?: string | null;
  setPreviewUrl?: (url: string | null) => void;
  processedUrl?: string | null;
  setProcessedUrl?: (url: string | null) => void;
  selectedProcessedImage?: string | null;
  setSelectedProcessedImage?: (url: string | null) => void;
  selectedImageBgColor?: string | undefined;
  setSelectedImageBgColor?: (color: string | undefined) => void;
}

const ResumeImageUploader: React.FC<ResumeImageUploaderProps> = ({
  imageFile: propImageFile,
  setImageFile: propSetImageFile,
  previewUrl: propPreviewUrl,
  setPreviewUrl: propSetPreviewUrl,
  processedUrl: propProcessedUrl,
  setProcessedUrl: propSetProcessedUrl,
  selectedProcessedImage: propSelectedProcessedImage,
  setSelectedProcessedImage: propSetSelectedProcessedImage,
  selectedImageBgColor: propSelectedImageBgColor,
  setSelectedImageBgColor: propSetSelectedImageBgColor,
}) => {
  const context = useAiResumeBuilder();

  const imageFile = propImageFile ?? context.imageFile;
  const setImageFile = propSetImageFile ?? context.setImageFile;
  const previewUrl = propPreviewUrl ?? context.previewUrl;
  const setPreviewUrl = propSetPreviewUrl ?? context.setPreviewUrl;
  const processedUrl = propProcessedUrl ?? context.processedUrl;
  const setProcessedUrl = propSetProcessedUrl ?? context.setProcessedUrl;
  const selectedProcessedImage =
    propSelectedProcessedImage ?? context.selectedProcessedImage;
  const setSelectedProcessedImage =
    propSetSelectedProcessedImage ?? context.setSelectedProcessedImage;
  const selectedImageBgColor =
    propSelectedImageBgColor ?? context.selectedImageBgColor;
  const setSelectedImageBgColor =
    propSetSelectedImageBgColor ?? context.setSelectedImageBgColor;

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
    setSelectedProcessedImage(null);
    setSelectedImageBgColor(undefined);
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="lg:col-span-4 col-span-1 flex flex-col justify-center gap-2">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-[100px] h-[100px] rounded-full border-2 border-white overflow-hidden mb-3">
          {previewUrl ? (
            <Image
              width={158}
              height={158}
              src={previewUrl || "/placeholder.png"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
              No Image
            </div>
          )}
        </div>
          {previewUrl && (
            <button
              onClick={handleClearImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors z-10"
              title="Remove Image"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dropzone uploader */}
        <div
          {...getRootProps()}
          className="text-center cursor-pointer border border-dashed border-gray-400 rounded-md p-2 hover:bg-white/10 transition-all"
        >
          <input {...getInputProps()} />
          <p className="text-xs text-gray-300">
            {isDragActive
              ? "Drop the image here..."
              : "Click or drag an image to upload"}
          </p>
        </div>
      </div>

      <Button
        className="bg-mySkyBlue/60 hover:bg-mySkyBlue font-bold text-white mx-auto "
        onClick={async () => {
          if (!imageFile) return alert("Please upload an image!");

          const fd = new FormData();
          fd.append("image", imageFile);

          const res = await fetch("/api/process-image", {
            method: "POST",
            body: fd,
          });

          const json = await res.json();

          if (json.url) {
            setProcessedUrl(json.url); // set processed image (no bg + colored bg)
          } else {
            alert("Failed to process image");
          }
        }}
      >
        Remove BG
      </Button>

      {processedUrl && (
        <div className="lg:grid grid-cols-5 flex items-center justify-center gap-2 w-[100%] mx-auto flex-wrap mt-2 mb-2">
          {/* Original Image */}
          <div
            onClick={() => {
              setSelectedProcessedImage(previewUrl);
              setSelectedImageBgColor(undefined); // Reset background color on click
            }}
            className={`w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedProcessedImage === previewUrl && !selectedImageBgColor
                ? "ring-4 ring-mySkyBlue"
                : ""
            }`}
          >
            <Image
              src={previewUrl ?? "/dummy.jpg"}
              width={170}
              height={170}
              alt="Original"
              className="object-contain"
            />
          </div>
          {/* Processed Images (with colored backgrounds) */}
          {[
            "bg-blue-500",
            "bg-white",
            "bg-green-500",
            "bg-gray-500",
            "bg-yellow-600",
            "bg-black",
            "bg-purple-500",
            "bg-yellow-300",
            "bg-[#28384a]",
          ].map((bg, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedProcessedImage(processedUrl);
                setSelectedImageBgColor(bg); // Set background color on click
              }}
              className={`w-[50px] h-[50px] rounded-full ${bg} flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedProcessedImage === processedUrl &&
                selectedImageBgColor === bg
                  ? "ring-4 ring-mySkyBlue"
                  : ""
              }`}
            >
              <Image
                src={processedUrl || "/dummy.jpg"}
                width={160}
                height={160}
                alt={`Processed Image ${index}`}
                className="object-fill mt-4"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeImageUploader;
