"use client";
import { LuUpload } from "react-icons/lu";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoogleGenAI } from "@google/genai";

import * as pdfjsLib from "pdfjs-dist";

import { useResumeContext } from "@/context/ReaumeContext";

const DropzoneUploader = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // For Ai Report
  const { setSuggestions, suggestions } = useResumeContext();
  const { setScore, score } = useResumeContext();
  const { setOverall, overall } = useResumeContext();
  const { setKeywords, keywords } = useResumeContext();
  const { setFormatting, formatting } = useResumeContext();
  const { setEducation, education } = useResumeContext();
  const { setExperience, experience } = useResumeContext();
  const { setKeywordsScore, keywordsScore } = useResumeContext();
  const { setFormattingScore, formattingScore } = useResumeContext();
  const { setEducationScore, educationScore } = useResumeContext();
  const { setExperienceScore, experienceScore } = useResumeContext();
  const { setSummaryMistakes, summaryMistakes } = useResumeContext();
  const { setCoverLetter, coverLetter } = useResumeContext();

  const { setActualSummary, actualSummary } = useResumeContext();
  const { setImprovedSummary, improvedSummary } = useResumeContext();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      alert("Only PDF and DOCX files are accepted.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });
  if (selectedFile) {
    console.log(true);
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload a resume");
      console.log(false);

      return;
    }
    const formData = new FormData();
    formData.append("resume", selectedFile);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FLASK_RESUME_ANALYZE_API_URL ||
          "http://127.0.0.1:5000/api/analyzeResume",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      console.log("Response Dataaaa:", data.result[0]);
      const result = data.result[0];
      setSuggestions(result.overall_assessment);
      setOverall(result.overall_assessment);
      setScore(result.ats_score);
      setActualSummary(result.actual_summary);
      setSummaryMistakes(result.summary_mistakes);
      setImprovedSummary(result.improved_summary);
      setKeywords(result.keywords_suggestions);
      setKeywordsScore(result.keywords_suggestions_score);
      setFormatting(result.formatting_suggestions);
      setFormattingScore(result.formatting_suggestions_score);
      setEducation(result.education_suggestions);
      setEducationScore(result.education_suggestions_score);
      setExperience(result.experience_suggestions);
      setExperienceScore(result.experience_suggestions_score);
      setCoverLetter(result.cover_letter);
    } catch (error) {
      console.error("Error during analysis:", error);
      alert("An error occurred during analysis. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      {/* Dropzone */}

      <div
        {...getRootProps()}
        className=" w-[100%] h-[250px] border-2 border-dashed border-mySkyBlue rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-mySkyBlue/10 transition-all"
      >
        <div className="py-3 px-3 mb-2 flex items-center justify-center bg-mySkyBlue/30 rounded-lg">
          <LuUpload size={25} className="text-mySkyBlue" />
        </div>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-mySkyBlue">Drop the PDF or DOC/DOCX here ...</p>
        ) : (
          <>
            <p className="text-mySkyBlue font-semibold">
              Drag & drop your PDF or DOC/DOCX resume here, or click to select
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Only PDF and DOC/DOCX files are accepted
            </p>
          </>
        )}
      </div>
      {selectedFile && (
        <div className="border border-mySkyBlue bg-mySkyBlue/20 mt-5 rounded-lg py-3 px-3 flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <FaFileAlt size={20} className="text-mySkyBlue" />
            {/* <span className="ml-2 text-gray-500">{file}</span> */}
          </div>
          {/* Remove Button */}
          <button
            onClick={() => {
              setSelectedFile(null);
              setFileName("");
            }}
            className="text-gray-500 mt-2 hover:text-red-500"
          >
            {`Remove file.`}
          </button>
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        className=" mt-5 py-2 px-5 rounded-lg text-white font-semibold bg-mySkyBlue transition-all duration-300 text-xl cursor-pointer"
        disabled={loading || !session}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* ATS Score Circle and Text */}
    </div>
  );
};

export default DropzoneUploader;
