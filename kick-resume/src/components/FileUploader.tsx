"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, Loader2, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useResumeContext } from "@/context/ReaumeContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const DropzoneUploader = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Context setters
  const { 
    setSuggestions, setScore, setOverall, setKeywords, setFormatting, 
    setEducation, setExperience, setKeywordsScore, setFormattingScore, 
    setEducationScore, setExperienceScore, setSummaryMistakes, 
    setCoverLetter, setActualSummary, setImprovedSummary 
  } = useResumeContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
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
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload a resume");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", selectedFile);
    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      const result = data.result;

      setSuggestions(result.overall_assessment);
      setOverall(result.overall_assessment);
      setScore(result.ats_score);
      setActualSummary(result.actual_summary);
      setSummaryMistakes(result.summary_mistakes || []);
      setImprovedSummary(result.improved_summary);
      setKeywords(result.keywords_suggestions || []);
      setKeywordsScore(result.keywords_suggestions_score);
      setFormatting(result.formatting_suggestions || []);
      setFormattingScore(result.formatting_suggestions_score);
      setEducation(result.education_suggestions || []);
      setEducationScore(result.education_suggestions_score);
      setExperience(result.experience_suggestions || []);
      setExperienceScore(result.experience_suggestions_score);
      setCoverLetter(result.cover_letter);
    } catch (error) {
      console.error("Error during analysis:", error);
      alert("An error occurred during analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`group relative w-full h-[220px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? "border-mySkyBlue bg-mySkyBlue/5 scale-[0.99]" 
            : "border-gray-200 hover:border-mySkyBlue/50 hover:bg-gray-50 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        
        <div className={`p-4 rounded-2xl transition-all duration-300 mb-4 ${
          isDragActive ? "bg-mySkyBlue text-white" : "bg-blue-50 text-mySkyBlue group-hover:scale-110"
        }`}>
          <Upload size={28} />
        </div>

        <div className="text-center px-6">
          <p className="text-gray-900 font-bold mb-1">
            {isDragActive ? "Drop your resume now" : "Select or drag your resume"}
          </p>
          <p className="text-gray-400 text-sm font-medium">
            PDF or DOCX (max. 10MB)
          </p>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-mySkyBlue/30 transition-colors" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-mySkyBlue/30 transition-colors" />
      </div>

      {/* Selected File Card */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-blue-50/50 border border-mySkyBlue/20 rounded-2xl p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-mySkyBlue">
                <FileText size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 line-clamp-1">
                  {fileName}
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={10} className="text-green-500" />
                  Ready to analyze
                </span>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                setFileName("");
              }}
              className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-gray-400"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      <Button
        onClick={handleAnalyze}
        disabled={loading || !selectedFile || !session}
        className="w-full h-14 bg-mySkyBlue hover:bg-sky-600 text-white text-lg font-black rounded-2xl shadow-lg shadow-mySkyBlue/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={22} className="animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            Analyze Expertise
          </>
        )}
      </Button>

      {!session && (
        <p className="text-xs text-center text-gray-400 font-medium">
          Please sign in to analyze your resume
        </p>
      )}
    </div>
  );
};

export default DropzoneUploader;
