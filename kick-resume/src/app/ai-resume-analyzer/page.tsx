"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, BarChart2, ShieldCheck, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import DropzoneUploader from "@/components/FileUploader";

const AiResumeAnalyzeReort = dynamic(
  () => import("@/components/AiResumeAnalyzeReort"),
  { ssr: false }
);

const AnalyzerPage = () => {
  return (
    <div className="min-h-screen bg-[#fafbfc] transition-colors duration-500 overflow-x-hidden pt-[80px] pb-20">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />

      {/* Hero Section (Text) */}
      <section className="pt-8 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-mySkyBlue/10 border border-mySkyBlue/20 text-mySkyBlue text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles size={14} />
              AI Resume Analyzer
            </motion.span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
              <span
                className="bg-gradient-to-r from-mySkyBlue via-blue-600 to-indigo-600 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Instant Insights
              </span>
              <br />
              <span className="text-gray-900 drop-shadow-sm">
                for Your Career
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
              Upload your resume and get an instant AI-powered analysis with ATS scoring, 
              formatting suggestions, and automated cover letter generation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Flow - Single Column */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Step 1: Resume Uploader Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="bg-white border border-gray-200 shadow-xl shadow-blue-500/5 rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[5rem] -mr-8 -mt-8 -z-10" />
            
            <div className="flex flex-col items-center mb-8">
              <div className="p-4 text-mySkyBlue bg-blue-50 rounded-2xl mb-4">
                <Zap size={32} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Upload Your Resume</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">PDF and DOCX formats supported</p>
            </div>
            
            <DropzoneUploader />
            
            {/* Quick Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 justify-center">
                <div className="p-1.5 text-mySkyBlue bg-blue-50 rounded-lg">
                  <BarChart2 size={16} />
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">ATS Optimized</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="p-1.5 text-mySkyBlue bg-blue-50 rounded-lg">
                  <ShieldCheck size={16} />
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Privacy Secured</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 2: Analysis Report Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full"
        >
          <AiResumeAnalyzeReort />
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="inline-block bg-white/80 backdrop-blur-md border border-gray-100 px-10 py-5 rounded-[2rem] shadow-sm">
            <h3 className="text-mySkyBlue font-black text-lg">
              Built to help your resume shine — worldwide.
            </h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyzerPage;
