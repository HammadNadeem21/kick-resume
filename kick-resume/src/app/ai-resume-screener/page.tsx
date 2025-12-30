"use client";
import { useState, useCallback } from "react";
import React from "react";
import { TrendingUp } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { LuUpload } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";
import { TableDemo } from "@/components/Table";

const AiResumeScreenersPage = () => {
  const [pdfFiles, setPdfFiles] = useState<any[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(); // New state for analysis result

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const newPdfFiles = acceptedFiles.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
    );

    if (newPdfFiles.length > 0) {
      setPdfFiles((prev) => [...prev, ...newPdfFiles]);
      setFileNames((prev) => [
        ...prev,
        ...newPdfFiles.map((file: { name: any }) => file.name),
      ]);
      setFiles((prev) => [
        ...prev,
        ...newPdfFiles.map((file: { name: any }) => file.name),
      ]);
    } else {
      alert("Only PDF, DOC, and DOCX files are accepted.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: true,
  });

  const handleAnalyze = async () => {
    if (pdfFiles.length === 0 || !jobDescription) {
      alert("Please upload at least one resume and provide a job description.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    pdfFiles.forEach((file) => {
      formData.append("resumes", file);
    });
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("/api/bulk-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysisResult(result); // Store the analysis result
      console.log("Analysis Result:", result);
    } catch (error: any) {
      console.error("Error analyzing resumes:", error);
      setAnalysisResult(null); // Clear previous results on error
      alert(
        `Failed to analyze resumes: ${error.message || "Unknown error"
        }. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index: number) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
    setFileNames((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="px-[30px] py-[60px] max-w-[1600px] mx-auto min-h-screen">
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
              AI Resume
            </span>
            <br />
            <span className="text-black">Screener</span>
          </h1>
          <p className="md:text-xl lg:text-2xl text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            let AI instantly screen, compare, and highlight the best matches for
            your role.
          </p>
        </div>
      </section>

      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-4 text-mySkyBlue">
          Upload & Compare
        </h2>
        <p className="text-lg text-gray-500">
          Upload your files and paste the job description
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 mt-5 gap-4 ">
        <div className=" w-full">
          <div
            {...getRootProps()}
            className=" w-[100%] h-[250px] border-2 border-dashed border-mySkyBlue rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-mySkyBlue/10 transition-all"
          >
            <div className="py-3 px-3 mb-2 flex items-center justify-center bg-mySkyBlue/30 rounded-lg">
              <LuUpload size={25} className="text-mySkyBlue" />
            </div>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-mySkyBlue">
                Drop the PDF or DOC/DOCX here ...
              </p>
            ) : (
              <>
                <p className="text-mySkyBlue font-semibold">
                  Drag & drop your PDF or DOC/DOCX resume here, or click to
                  select
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Only PDF and DOC/DOCX files are accepted
                </p>
              </>
            )}
          </div>
          {fileNames.length > 0 && (
            <div className="border border-mySkyBlue bg-mySkyBlue/20 mt-5 rounded-lg py-3 px-3 flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <FaFileAlt size={20} className="text-mySkyBlue" />
                {/* <span className="ml-2 text-gray-500">{file}</span> */}
              </div>
              {/* Remove Button */}
              <button
                onClick={() => {
                  setPdfFiles([]);
                  setFileNames([]);
                  setFiles([]);
                }}
                className="text-gray-500 mt-2 hover:text-red-500"
              >
                {`Remove all ${fileNames.length} files.`}
              </button>
            </div>
          )}
        </div>

        {/* Job Description Textarea */}
        <div className="w-full">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Type Job Description"
            className="h-[250px] border border-mySkyBlue text-gray-600 rounded-lg focus:outline-none w-[100%] py-2 px-3"
          ></textarea>
        </div>
      </div>
      <div className="flex items-center justify-center py-5 mt-1">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="py-1 px-5 mx-auto rounded-lg text-white font-semibold bg-mySkyBlue hover:shadow-lg transition-all duration-300"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      <section className="py-8 px-4">
        {/* Resume Uploader */}

        <div className="">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4 text-mySkyBlue">
              Compatibility Analysis
            </h2>
            <p className="text-lg text-gray-500">
              Detailed comparison and recommendations
            </p>
          </div>

          {loading ? (
            <TableDemo tableData={[]} loading={true} />
          ) : analysisResult &&
            analysisResult.resumeTexts &&
            analysisResult.resumeTexts.length > 0 ? (
            <TableDemo tableData={analysisResult.resumeTexts} loading={false} />
          ) : (
            <div className="flex flex-col bg-gray-200 items-center justify-center h-[550px] mt-5 rounded-lg">
              <TrendingUp size={40} className="text-gray-500" />
              <p className="text-gray-500 text-center">
                Upload your resume and job description to see the analysis
                results here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AiResumeScreenersPage;
