"use client";

import { useState, useCallback } from "react";
import React from "react";
import { 
  TrendingUp, 
  Sparkles, 
  Briefcase, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  FileText
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { LuUpload } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";
import { TableDemo } from "@/components/Table";
import { motion, AnimatePresence } from "framer-motion";

const AiResumeScreenersPage = () => {
  const [pdfFiles, setPdfFiles] = useState<any[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>();

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const newPdfFiles = acceptedFiles.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
    );

    if (newPdfFiles.length > 0) {
      setPdfFiles((prev) => [...prev, ...newPdfFiles]);
      setFileNames((prev) => [
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
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
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
      setAnalysisResult(result);
    } catch (error: any) {
      console.error("Error analyzing resumes:", error);
      setAnalysisResult(null);
      alert(`Failed to analyze resumes: ${error.message || "Unknown error"}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index: number) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
    setFileNames((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] relative overflow-hidden pb-20 pt-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />
      
      {/* Floating accents */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-[10%] text-mySkyBlue/10 pointer-events-none -z-10"
      >
        <Layers size={120} />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-mySkyBlue/10 border border-mySkyBlue/20 text-mySkyBlue text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles size={14} />
              AI Talent Pipeline
            </motion.span>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-mySkyBlue via-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AI Resume
              </span>
              <br />
              <span className="text-gray-900 drop-shadow-sm">Screener</span>
            </h1>
            
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Let AI instantly screen, compare, and highlight the best matches for your role.
            </p>
          </motion.div>
        </section>

        {/* Input Interface: Restored side-by-side layout */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-8">
            <div className="text-left">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Upload & Compare</h2>
              <p className="text-sm font-medium text-gray-400">Upload candidate batch and define the requirements</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            {/* Left Column: Multi-Upload */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 shadow-xl shadow-blue-500/5 rounded-[2.5rem] p-8 relative overflow-hidden h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[4rem] -mr-6 -mt-6 -z-10" />
              
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Candidate Batch</label>
                  <div
                    {...getRootProps()}
                    className={`h-[200px] border-2 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                      isDragActive ? "border-mySkyBlue bg-mySkyBlue/5" : "border-gray-200 bg-gray-50 hover:bg-white hover:border-mySkyBlue/30 hover:shadow-lg hover:shadow-mySkyBlue/5"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl mb-3 text-mySkyBlue">
                      <LuUpload size={20} />
                    </div>
                    <p className="text-sm font-bold text-gray-600 text-center">Drop Batch Resumes</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tight">PDF, DOC, DOCX supported</p>
                  </div>

                  {/* File List */}
                  <AnimatePresence>
                    {fileNames.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar"
                      >
                        {fileNames.map((name, idx) => (
                          <motion.div 
                            key={`${name}-${idx}`}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-3 flex items-center justify-between group hover:border-mySkyBlue/30 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-mySkyBlue/10 text-mySkyBlue rounded-xl">
                                <FileText size={16} />
                              </div>
                              <p className="text-xs font-black text-gray-700 truncate max-w-[200px]">{name}</p>
                            </div>
                            <button
                              onClick={() => removeFile(idx)}
                              className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </motion.div>
                        ))}
                        
                        <button
                          onClick={() => { setPdfFiles([]); setFileNames([]); }}
                          className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                        >
                          Clear All {fileNames.length} Candidates
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Right Column: JD Input */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-gray-200 shadow-xl shadow-blue-500/5 rounded-[2.5rem] p-8 relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-[4rem] -mr-6 -mt-6 -z-10" />
              <div className="space-y-2 h-full flex flex-col">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Job Description</label>
                <div className="relative group flex-1">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job requirements for screening..."
                    className="w-full h-full min-h-[200px] bg-gray-50 border-2 border-transparent focus:border-mySkyBlue/30 focus:bg-white focus:ring-4 focus:ring-mySkyBlue/5 rounded-3xl p-5 text-sm font-medium text-gray-700 transition-all outline-none resize-none"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Centered Analyze Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={loading || pdfFiles.length === 0 || !jobDescription}
              className="px-12 bg-mySkyBlue hover:bg-sky-600 text-white font-black h-16 rounded-[2rem] shadow-2xl shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 min-w-[300px]"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing candidates...</span>
                </>
              ) : (
                <>
                  <span>Analyze {pdfFiles.length > 0 ? `${pdfFiles.length} Resumes` : ""}</span>
                  <ArrowRight size={24} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section: Full Width below */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-2xl text-mySkyBlue">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Compatibility Analysis</h2>
              <p className="text-sm font-medium text-gray-400">Detailed comparison and ranking overview</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!analysisResult && !loading ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/50 backdrop-blur-md border border-dashed border-gray-200 rounded-[3rem] min-h-[400px] flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="p-8 bg-white shadow-2xl shadow-gray-200/50 rounded-[2.5rem] text-gray-300 mb-6">
                  <TrendingUp size={64} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-3">Awaiting Talent Data</h3>
                <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
                  Upload your candidate pool and paste the job details to see your comprehensive ranking report.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <TableDemo 
                  tableData={analysisResult?.resumeTexts || []} 
                  loading={loading} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Dynamic Branding Footer */}
      <div className="max-w-[1400px] mx-auto px-6 mt-20 text-center">
        <div className="inline-flex items-center gap-8 opacity-25 select-none grayscale flex-wrap justify-center border-t border-gray-200 pt-12 w-full">
          <div className="flex items-center gap-3">
            <Zap size={20} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Real-time Sorting</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={20} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">AI Match Validation</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Data Protection AES-256</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeScreenersPage;
