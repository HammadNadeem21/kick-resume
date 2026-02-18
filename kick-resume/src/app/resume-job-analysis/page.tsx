"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SectionScoreChart from "@/components/SectionScoreChart";
import { FaFileAlt } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { 
  TrendingUp, 
  Sparkles, 
  Briefcase, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setPdfFile(file);
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
    if (!jobDescription || !pdfFile) {
      alert("Please enter job description and upload resume!");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("resume", pdfFile);
    formData.append("jobDescription", jobDescription);
    
    try {
      const response = await fetch("/api/resume-job-analysis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Analysis failed");
      
      const data = await response.json();
      setAnalysisResult(data.result);
    } catch (error) {
      console.error("Error analyzing:", error);
      alert("Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const getMatchStyles = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500/10 text-green-600 border-green-200";
    if (percentage >= 60) return "bg-orange-500/10 text-orange-600 border-orange-200";
    return "bg-red-500/10 text-red-600 border-red-200";
  };

  const getStatusBadge = (match: string) => {
    const isMatched = match === "Matched";
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
        isMatched ? "bg-green-500/10 text-green-600 border-green-200" : "bg-red-500/10 text-red-600 border-red-200"
      }`}>
        {isMatched ? <CheckCircle size={12} /> : <XCircle size={12} />}
        {match}
      </span>
    );
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
        <Sparkles size={120} />
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
              AI Compatibility Engine
            </motion.span>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-mySkyBlue via-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Resume vs Job
              </span>
              <br />
              <span className="text-gray-900 drop-shadow-sm">Match Analysis</span>
            </h1>
            
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover how well your resume aligns with any job posting. Get instant ATS scores, 
              missing skill detection, and strategic improvement suggestions.
            </p>
          </motion.div>
        </section>

        {/* Main Interface Grid */}
        <div className="grid lg:grid-cols-[450px,1fr] grid-cols-1 gap-8 mt-4">
          
          {/* Left Column: Upload & Inputs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white border border-gray-200 shadow-xl shadow-blue-500/5 rounded-[2.5rem] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[4rem] -mr-6 -mt-6 -z-10" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 text-mySkyBlue rounded-2xl">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Setup Analysis</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Step 1: Provided Details</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Uploader */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Resume</label>
                  {!pdfFile ? (
                    <div
                      {...getRootProps()}
                      className={`h-[180px] border-2 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        isDragActive ? "border-mySkyBlue bg-mySkyBlue/5" : "border-gray-200 bg-gray-50 hover:bg-white hover:border-mySkyBlue/30 hover:shadow-lg hover:shadow-mySkyBlue/5"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl mb-3 text-mySkyBlue">
                        <LuUpload size={20} />
                      </div>
                      <p className="text-sm font-bold text-gray-600">Drop PDF or DOCX</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tight">Click to browse your files</p>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white border border-mySkyBlue/30 shadow-md shadow-mySkyBlue/5 rounded-2xl p-4 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-mySkyBlue text-white rounded-xl">
                          <FaFileAlt size={18} />
                        </div>
                        <div className="max-w-[200px]">
                          <p className="text-sm font-black text-gray-900 truncate">{fileName}</p>
                          <p className="text-[10px] text-mySkyBlue font-bold uppercase tracking-tight">Resume Ready</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { setPdfFile(null); setFileName(""); }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* JD Input */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Job Description</label>
                  <div className="relative group">
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the target job description here..."
                      className="w-full h-[220px] bg-gray-50 border-2 border-transparent focus:border-mySkyBlue/30 focus:bg-white focus:ring-4 focus:ring-mySkyBlue/5 rounded-3xl p-5 text-sm font-medium text-gray-700 transition-all outline-none resize-none"
                    />
                    <div className="absolute bottom-4 right-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      {jobDescription.length} characters
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !pdfFile || !jobDescription}
                  className="w-full bg-mySkyBlue hover:bg-sky-600 text-white font-black h-14 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Deep Scanning...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Comparison Analysis</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-gradient-to-br from-mySkyBlue to-blue-600 rounded-[2rem] p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative flex items-start gap-4">
                <div className="p-2 bg-white/20 rounded-xl">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest mb-1">Pro Tip</h3>
                  <p className="text-xs text-white/90 leading-relaxed font-medium">
                    Analysis is most accurate when the full job description, including requirements and responsibilities, is provided.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Results Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1"
          >
            <AnimatePresence mode="wait">
              {!analysisResult ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/50 backdrop-blur-md border border-dashed border-gray-200 rounded-[2.5rem] h-full min-h-[600px] flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="p-6 bg-white shadow-xl shadow-gray-200/50 rounded-3xl text-gray-400 mb-6">
                    <TrendingUp size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-3">Awaiting Analysis</h3>
                  <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
                    Upload your resume and paste the job details to see your comprehensive compatibility report.
                  </p>
                  
                  {/* Visual placeholders for excitement */}
                  <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-md">
                    <div className="h-2 bg-gray-200 rounded-full opacity-50" />
                    <div className="h-2 bg-gray-200 rounded-full opacity-30" />
                    <div className="h-2 bg-gray-200 rounded-full opacity-20 col-span-2" />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* Analysis Summary Header */}
                  <div className="bg-white border border-gray-200 shadow-xl shadow-blue-500/5 rounded-[2.5rem] p-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-green-50/50 rounded-bl-[5rem] -mr-12 -mt-12 -z-10" />
                    
                    <div className="flex flex-wrap items-center justify-between gap-8">
                      {/* Score Chart */}
                      <div className="flex flex-col items-center bg-gray-50 rounded-[2rem] p-6 border border-gray-100 min-w-[200px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-mySkyBlue mb-2">Overall Score</p>
                        <SectionScoreChart
                          score={analysisResult.compatibility_score}
                          textColor="#111827"
                        />
                      </div>

                      {/* Match Breakdowns */}
                      <div className="flex-1 min-w-[280px] grid gap-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-mySkyBlue/30 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-mySkyBlue">
                              <Zap size={16} />
                            </div>
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">Skills Matching</span>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-sm font-black ${getMatchStyles(analysisResult.skills_match_percentage)}`}>
                            {analysisResult.skills_match_percentage}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-mySkyBlue/30 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-mySkyBlue">
                              <ShieldCheck size={16} />
                            </div>
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">Education Background</span>
                          </div>
                          {getStatusBadge(analysisResult.education_match)}
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-mySkyBlue/30 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-mySkyBlue">
                              <Briefcase size={16} />
                            </div>
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">Experience Alignment</span>
                          </div>
                          {getStatusBadge(analysisResult.experience_match)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Missing Skills & Suggestions Grid */}
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    {/* Missing Skills */}
                    <div className="bg-white border border-gray-200 shadow-xl shadow-blue-500/5 rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                          <AlertCircle size={20} />
                        </div>
                        <h3 className="font-black text-gray-900  uppercase text-sm tracking-widest">Keyword Gaps</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missing_keywords_skills?.length > 0 ? (
                          analysisResult.missing_keywords_skills.map((skill: string, idx: number) => (
                            <span key={idx} className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <div className="text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                            Excellent! No critical skill gaps detected.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats/Summary */}
                    <div className="bg-gradient-to-br from-gray-900 to-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12" />
                      <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Strategic Summary</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-mySkyBlue rounded-full mt-1.5" />
                          <p className="text-xs font-medium text-gray-300 leading-relaxed">
                            {analysisResult.compatibility_score > 75 
                              ? "Your profile is highly competitive for this role. Consider subtle polishing."
                              : "Strategic adjustments in keywords and experience framing will significantly improve your odds."}
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-mySkyBlue rounded-full mt-1.5" />
                          <p className="text-xs font-medium text-gray-300 leading-relaxed">
                            The system identified <span className="text-white font-black">{analysisResult.suggestions?.length || 0}</span> areas for targeted improvement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Suggestions Section */}
                  <div className="bg-white border border-gray-200 shadow-xl shadow-blue-500/5 rounded-[2.5rem] p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-blue-50 text-mySkyBlue rounded-2xl">
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Optimization Roadmap</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Personalized Improvements</p>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {analysisResult.suggestions?.map((suggestion: any, i: number) => (
                        <div key={i} className="group p-6 bg-gray-50 hover:bg-white border border-gray-100 hover:border-mySkyBlue/30 hover:shadow-lg hover:shadow-mySkyBlue/5 rounded-3xl transition-all">
                          <div className="flex items-start gap-4">
                            <div className="bg-white px-3 py-1 rounded-full border border-gray-200 text-[10px] font-black text-gray-400 group-hover:text-mySkyBlue group-hover:border-mySkyBlue/30 transition-colors">
                              {i + 1 < 10 ? `0${i + 1}` : i + 1}
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 mb-1 group-hover:text-mySkyBlue transition-colors">{suggestion.heading}</h4>
                              <p className="text-sm font-medium text-gray-500 leading-relaxed">{suggestion.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {/* Footer Badge */}
      <div className="max-w-[1400px] mx-auto px-6 mt-16 text-center">
        <div className="inline-flex items-center gap-6 opacity-30 select-none grayscale flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Secure AES-256</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Fast AI Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Powered by Gemini 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* External Button Component if not already available globally, but using raw button style to match premium feel if needed */
const Button = ({ children, className, ...props }: any) => (
  <button className={className} {...props}>
    {children}
  </button>
);

export default Page;
