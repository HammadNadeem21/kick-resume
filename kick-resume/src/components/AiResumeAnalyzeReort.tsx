"use client";

import { useResumeContext } from "../context/ReaumeContext";
import React, { useEffect, useRef, useState } from "react";
import ATSCircleChart from "./ATSCircleChart";
import { 
  Key, 
  Info, 
  GraduationCap, 
  Briefcase, 
  AlertTriangle, 
  Sparkles, 
  FileDown,
  Layout
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState } from "draft-js";
import { Button } from "@/components/ui/button";
// @ts-ignore
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { pdf } from "@react-pdf/renderer";
import CoverLetterPDF from "./pdf/CoverLetterPDF";
import SectionScoreChart from "./SectionScoreChart";

const formatBackendText = (text: string | undefined | null) => {
  if (!text) return "";
  return text
    .replace(/,([^\s])/g, ", $1")          // Space after comma
    .replace(/([a-z])([A-Z])/g, "$1 $2")   // Space between CamelCase
    .replace(/([a-zA-Z])([0-9])/g, "$1 $2") // Space between letter and digit
    .replace(/([0-9])([a-zA-Z])/g, "$1 $2"); // Space between digit and letter
};

const AiResumeAnalyzeReort = () => {
  const {
    actualSummary,
    summaryMistakes,
    improvedSummary,
    coverLetter,
    suggestions,
    score,
    overall,
    keywords,
    formatting,
    education,
    experience,
    keywordsScore,
    formattingScore,
    educationScore,
    experienceScore,
  } = useResumeContext();

  const editorRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (coverLetter) {
      const contentState = ContentState.createFromText(coverLetter);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [coverLetter]);

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const downloadPDF = async () => {
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    if (!plainText.trim()) return;
    const blob = await pdf(<CoverLetterPDF coverLetter={plainText} />).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cover_letter.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!suggestions) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-md rounded-3xl border border-dashed border-gray-200">
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-mySkyBlue animate-pulse">
          <Layout size={40} />
        </div>
        <h3 className="text-xl font-black text-gray-800 mb-2">Analysis Results</h3>
        <p className="text-gray-400 text-center max-w-xs font-medium leading-relaxed">
          Upload your resume in the panel on the left to see your AI-powered analysis report here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-10 duration-700">
      
      {/* ── ATS Score & Summary ── */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-blue-500/5">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2.5 text-mySkyBlue bg-blue-50 rounded-xl">
            <Sparkles size={22} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Report Overview</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex flex-col items-center gap-5 bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
            <div className="w-full flex justify-between items-center mb-2 px-2">
               <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Overall ATS Score</h4>
               <span className="text-[10px] font-black text-mySkyBlue bg-mySkyBlue/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Live Analysis</span>
            </div>
            <ATSCircleChart score={score ?? 0} />
          </div>
          
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-mySkyBlue via-blue-400 to-transparent rounded-full opacity-50" />
              <div className="pl-6">
                <h4 className="text-xs font-black text-mySkyBlue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Info size={14} className="stroke-[2.5px]" />
                  AI Assessment
                </h4>
                <p className="text-gray-600 text-[15px] leading-[1.8] font-medium">
                  {overall}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary & Improvements ── */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Actual Summary */}
        {actualSummary && (
          <div className="bg-white border border-gray-200 rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-gray-200/20 relative overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <div className="p-1.5 bg-gray-50 rounded-lg">
                <Layout size={14} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Actual Summary</h4>
            </div>
            <p className="text-gray-600 text-[15px] leading-[1.8] font-medium break-all relative z-10">
              {formatBackendText(actualSummary)}
            </p>
          </div>
        )}

        {/* Improved Summary */}
        {improvedSummary && (
          <div className="bg-white border border-gray-200 rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-gray-200/20 relative overflow-hidden flex flex-col group">
            <div className="absolute top-0 right-0 p-4 text-mySkyBlue/10 group-hover:text-mySkyBlue/20 transition-colors -mr-2 -mt-2">
              <Sparkles size={80} />
            </div>
            <div className="flex items-center gap-2 mb-6 text-mySkyBlue">
              <div className="p-1.5 bg-mySkyBlue/10 rounded-lg">
                <Sparkles size={14} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Improved by AI</h4>
            </div>
            <p className="text-gray-600 text-[15px] leading-[1.8] font-medium break-all relative z-10">
              {formatBackendText(improvedSummary)}
            </p>
          </div>
        )}
      </div>

      {/* Mistakes List */}
      {summaryMistakes && summaryMistakes.length > 0 && (
        <div className="bg-red-50/30 border border-red-100 rounded-[2.5rem] p-8 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <AlertTriangle size={18} />
              Identified Weaknesses
            </h4>
            <span className="text-[10px] font-black text-red-400 bg-red-100 px-3 py-1 rounded-full uppercase tracking-widest">Action Required</span>
          </div>
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-5">
            {summaryMistakes.map((mistake, index) => (
              <li key={index} className="flex gap-4 text-[14px] text-gray-600 font-medium group">
                <span className="shrink-0 w-2 h-2 bg-red-400 rounded-full mt-1.5 group-hover:scale-125 transition-transform" />
                <span className="break-all">{formatBackendText(mistake)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Scoring Sections ── */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Section Cards Utility */}
        {[
          { icon: <Key size={22} />, title: "Keywords", data: keywords, score: keywordsScore },
          { icon: <Info size={22} />, title: "Formatting", data: formatting, score: formattingScore },
          { icon: <GraduationCap size={22} />, title: "Education", data: education, score: educationScore },
          { icon: <Briefcase size={22} />, title: "Experience", data: experience, score: experienceScore },
        ].map((section, idx) => (
          section.data && section.data.length > 0 && (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white border border-gray-100 rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-gray-200/40 h-full flex flex-col"
            >
              <div className="flex justify-between items-start mb-8 border-b border-gray-50 pb-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 text-gray-800">
                    <span className="text-mySkyBlue p-2 bg-blue-50 rounded-xl">{section.icon}</span>
                    <h3 className="text-2xl font-black tracking-tight">{section.title}</h3>
                  </div>
                </div>
                <div className="scale-90 sm:scale-100 origin-top-right">
                  <SectionScoreChart 
                    score={section.score ?? 0} 
                    textColor="#94a3b8" 
                    scoreText="Score" 
                  />
                </div>
              </div>

              <ul className="flex flex-col gap-5">
                {section.data.map((item, i) => (
                    <li key={i} className="flex gap-4 text-[14px] text-gray-500 font-medium group">
                      <span className="shrink-0 w-6 h-6 bg-blue-50 text-mySkyBlue rounded-full flex items-center justify-center text-[10px] font-black group-hover:bg-mySkyBlue group-hover:text-white transition-colors">
                        {i + 1}
                      </span>
                      <span className="break-all leading-relaxed">{formatBackendText(item)}</span>
                    </li>
                ))}
              </ul>
            </motion.div>
          )
        ))}
      </div>

      {/* ── AI Cover Letter ── */}
      {coverLetter && (
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-blue-500/5 mt-4">
          <div className="flex items-center justify-between gap-3 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 text-mySkyBlue bg-blue-50 rounded-lg">
                <FileDown size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">AI Cover Letter</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Generated Draft</p>
              </div>
            </div>
            
            <Button
              onClick={downloadPDF}
              className="bg-mySkyBlue hover:bg-sky-600 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-mySkyBlue/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <FileDown size={18} />
              Export PDF
            </Button>
          </div>

          <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-inner min-h-[400px]">
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                toolbarClassName="custom-toolbar !border-0 !border-b !bg-gray-50/80 !backdrop-blur"
                wrapperClassName="cover-letter-wrapper"
                editorClassName="cover-letter-editor !p-8 text-gray-700 leading-relaxed font-medium"
                toolbar={{
                  options: ["inline", "list", "textAlign", "link", "history"],
                  inline: {
                    options: ["italic", "underline", "strikethrough"],
                  },
                }}
              />
            </div>
          </div>
          
          <style jsx global>{`
            .custom-toolbar {
              padding: 0.75rem 1rem !important;
            }
            .rdw-option-wrapper {
              border-radius: 8px !important;
              border: 1px solid #f1f5f9 !important;
              padding: 6px !important;
              margin: 2px !important;
              background: white !important;
              transition: all 0.2s !important;
            }
            .rdw-option-wrapper:hover {
              box-shadow: 0 2px 8px -2px rgba(0,0,0,0.1) !important;
              background-color: #f8fafc !important;
              border-color: #55cef6 !important;
            }
            .rdw-option-active {
              background-color: #55cef6 !important;
              border-color: #55cef6 !important;
              box-shadow: 0 2px 10px -2px rgba(85,206,246,0.3) !important;
            }
            .rdw-option-active img {
              filter: brightness(0) invert(1) !important;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default AiResumeAnalyzeReort;
