// 'use client';
// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { IoCloudUploadOutline } from "react-icons/io5";

// const DropzoneUploader = () => {
//   const [fileName, setFileName] = useState(null);
//   const [error, setError] = useState<any>(null);

//   const onDrop = useCallback((acceptedFiles:any, fileRejections:any) => {
//     if (fileRejections.length > 0) {
//       setError('Only PDF files are allowed');
//       setFileName(null);
//       return;
//     }

//     const file = acceptedFiles[0];
//     setFileName(file.name);
//     setError(null);

//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//     },
//     multiple: false, // Only one file at a time
//   });

//   return (
//     <div className="flex flex-col items-center gap-2 mt-8">
//       <div
//         {...getRootProps()}
//         className={`sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] border-2 border-myMidblue border-dashed rounded-xl flex flex-col gap-2 items-center justify-center text-center cursor-pointer transition ${
//           isDragActive ? 'bg-blue-100 border-blue-500' : 'border-gray-400'
//         }`}
//       >
//         <IoCloudUploadOutline size={40} className="text-myMidblue" />
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p className="text-blue-500">Drop the PDF here...</p>
//         ) : (
//           <p className="text-myMidblue sm:text-lg text-sm">Drag & drop PDF file here, or click to select</p>
//         )}

// {fileName && (
//         <p className="text-sm text-green-600">{fileName}</p>
//       )}

//       {error && (
//         <p className="text-sm text-red-500">❌ {error}</p>
//       )}
//       </div>

//       <button className="px-5 py-3 mt-5 hover:bg-myMidblue/30 rounded-xl text-myMidblue font-bold text-xl border border-myMidblue">Analyze</button>
//     </div>
//   );
// };

// export default DropzoneUploader;

// Example of a Node.js server-side proxy

// 'use client';
// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { IoCloudUploadOutline } from 'react-icons/io5';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import styles from './DropzoneUploader.module.css';

// const DropzoneUploader = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [analysisReport, setAnalysisReport] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
//     if (fileRejections.length > 0) {
//       setError('Only PDF files are allowed');
//       setFileName(null);
//       setSelectedFile(null);
//       setAnalysisReport(null);
//       return;
//     }

//     const file = acceptedFiles[0];
//     setSelectedFile(file);
//     setFileName(file.name);
//     setError(null);
//     setAnalysisReport(null);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//     },
//     multiple: false,
//   });

//   const handleAnalyze = async () => {
//     if (!selectedFile) {
//       setError('Please upload a PDF file first.');
//       return;
//     }

//     setLoading(true);
//     setAnalysisReport(null);
//     setError(null);

//     const formData = new FormData();
//     formData.append('resume', selectedFile);

//     try {
//       // Use environment variable for API key to secure it
//       const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDrjd5jEmmkMEjv1MZaCckYD7zRZSWviVs', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to analyze resume.');
//       }

//       const data = await response.json();
//       setAnalysisReport(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`flex flex-col items-center gap-4 mt-8 ${styles.container}`}>
//       <div
//         {...getRootProps()}
//         className={`sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] border-2 border-myMidblue border-dashed rounded-xl flex flex-col gap-2 items-center justify-center text-center cursor-pointer transition ${
//           isDragActive ? 'bg-blue-100 border-blue-500' : 'border-gray-400'
//         } ${styles.dropzone}`}
//       >
//         <IoCloudUploadOutline size={40} className="text-myMidblue" />
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p className="text-blue-500">Drop the PDF here...</p>
//         ) : (
//           <p className="text-myMidblue sm:text-lg text-sm">Drag & drop PDF file here, or click to select</p>
//         )}

//         {fileName && (
//           <p className="text-sm text-green-600">{fileName}</p>
//         )}

//         {error && (
//           <p className="text-sm text-red-500">❌ {error}</p>
//         )}
//       </div>

//       <button
//         onClick={handleAnalyze}
//         className={`px-5 py-3 hover:bg-myMidblue/30 rounded-xl text-myMidblue font-bold text-xl border border-myMidblue ${styles.analyzeButton}`}
//         disabled={!selectedFile || loading}
//       >
//         {loading ? 'Analyzing...' : 'Analyze'}
//       </button>

//       {analysisReport && (
//         <div className={`mt-8 flex flex-col items-center gap-4 ${styles.reportContainer}`}>
//           <h3>Analysis Report</h3>

//           {analysisReport.rating !== null && (
//             <div className={`w-40 ${styles.progressBar}`}>
//               <CircularProgressbar
//                 value={analysisReport.rating}
//                 text={`${analysisReport.rating}%`}
//                 styles={buildStyles({
//                   textColor: '#0f766e',
//                   pathColor: '#0f766e',
//                   trailColor: '#d1fae5',
//                 })}
//               />
//               <p className={`text-center mt-2 font-semibold ${styles.ratingText}`}>Overall Rating</p>
//             </div>
//           )}

//           {analysisReport.weaknesses?.length > 0 && (
//             <div className={`w-full sm:w-[400px] ${styles.weaknessesContainer}`}>
//               <h4 className="font-semibold">Weaknesses:</h4>
//               <ul className="list-disc pl-5">
//                 {analysisReport.weaknesses.map((weakness: string, index: number) => (
//                   <li key={index}>{weakness}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {analysisReport.suggestions?.length > 0 && (
//             <div className={`w-full sm:w-[400px] ${styles.suggestionsContainer}`}>
//               <h4 className="font-semibold">Improvement Suggestions:</h4>
//               <ul className="list-decimal pl-5">
//                 {analysisReport.suggestions.map((suggestion: string, index: number) => (
//                   <li key={index}>{suggestion}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {analysisReport.rawAnalysis && (
//             <details className={`mt-4 ${styles.rawAnalysis}`}>
//               <summary className="cursor-pointer font-semibold">Raw Analysis Output</summary>
//               <pre className="text-sm mt-2 whitespace-pre-wrap">{analysisReport.rawAnalysis}</pre>
//             </details>
//           )}
//         </div>
//       )}

//       {loading && <p className="mt-4">Analyzing your resume, please wait...</p>}
//       {error && <p className="mt-4 text-red-500">{error}</p>}
//     </div>
//   );
// };

// export default DropzoneUploader;

// "use client";

// import ReactMarkdown from "react-markdown";
// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { GoogleGenAI } from "@google/genai";
// import ATSCircleChart from "./ATSCircleChart";

// const DropzoneUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState<string | null>(null);

//   // For ATS Score
//   const [score, setScore] = useState<number | null>(null);


//   const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
//     if (fileRejections.length > 0) {
//       setError("Only PDF files are allowed");
//       setFile(null);
//       setFileName(null);
//       return;
//     }

//     const uploadedFile = acceptedFiles[0];
//     setFile(uploadedFile);
//     setFileName(uploadedFile.name);
//     setError(null);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"] },
//     multiple: false,
//   });



//   const handleAnalyze = async () => {
//     if (!file) return;
//     setLoading(true);
//     setSuggestions(null);
//     setError(null);

//     try {
//       // Step 1: Extract text from PDF
//       const pdfText = await extractTextFromPDF(file);

//       // Step 2: Call Gemini API using @google/genai
//       const { GoogleGenAI } = await import("@google/genai"); // dynamic import for Next.js
//       const ai = new GoogleGenAI({
//         apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!, // 👈 env var must start with NEXT_PUBLIC_
//       });

//       const result = await ai.models.generateContent({
//         model: "gemini-1.5-flash",
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `Please analyze the following resume text and provide:
// 1. A short summary of the candidate’s profile.
// 2. An ATS Score out of 100.
// 3. Suggestions for improvement.

// Resume Text:
// \n\n${pdfText}`,
//               },
//             ],
//           },
//         ],
//       });

//       // const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
//       // setSuggestions(text || 'No suggestions found.');
//       const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

//       // ✅ ATS Score extract karo from AI response
//       const match = text?.match(/ATS Score[:\-]?\s*(\d+)/i);
//       if (match) {
//         setScore(Number(match[1]));
//       }

//       setSuggestions(text || "No suggestions found.");
//     } catch (err) {
//       setError("Something went wrong while analyzing.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const extractTextFromPDF = async (file: File): Promise<string> => {
//     const pdfjsLib = await import("pdfjs-dist/build/pdf");
//     const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
//     pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

//     const reader = new FileReader();
//     return new Promise((resolve, reject) => {
//       reader.onload = async () => {
//         const typedArray = new Uint8Array(reader.result as ArrayBuffer);
//         const pdf = await pdfjsLib.getDocument(typedArray).promise;
//         let text = "";
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           const pageText = content.items.map((item: any) => item.str).join(" ");
//           text += pageText + "\n";
//         }
//         resolve(text);
//       };
//       reader.onerror = reject;
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   return (
//     <div className="flex flex-col items-center gap-2 mt-8">
//       <div
//         {...getRootProps()}
//         className={`sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] border-2 border-dashed rounded-xl flex flex-col gap-2 items-center justify-center text-center cursor-pointer transition ${
//           isDragActive ? "bg-blue-100 border-blue-500" : "border-gray-400"
//         }`}
//       >
//         <IoCloudUploadOutline size={40} className="text-myMidblue" />
//         <input {...getInputProps()} />
//         <p className="text-myMidblue sm:text-lg text-sm">
//           {isDragActive
//             ? "Drop the PDF here..."
//             : "Drag & drop PDF file here, or click to select"}
//         </p>
//         {fileName && <p className="text-sm text-green-600">{fileName}</p>}
//         {error && <p className="text-sm text-red-500">❌ {error}</p>}
//       </div>

//       <button
//         onClick={handleAnalyze}
//         className="px-5 py-3 mt-5 hover:bg-myMidblue/30 rounded-xl text-myMidblue font-bold text-xl border border-myMidblue"
//         disabled={loading}
//       >
//         {loading ? "Analyzing..." : "Analyze"}
//       </button>

//       {score !== null && (
//         <div className="mt-6 flex flex-col items-center">
//           <ATSCircleChart score={score} />
//           <p className="mt-2 text-center font-medium text-myLightBlue">
//             ATS Score
//           </p>
//         </div>
//       )}
//       {suggestions && (
        
//         <div className="mt-6 border rounded-xl p-4 bg-gray-50 w-full max-w-xl prose">
//           <h3 className="font-bold text-lg mb-2">Suggestions:</h3>
//           <ReactMarkdown>{suggestions}</ReactMarkdown>
//         </div>
//       )}

      
//     </div>
//   );
// };

// export default DropzoneUploader;





"use client";

import ReactMarkdown from "react-markdown";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GoogleGenAI } from "@google/genai";
import ATSCircleChart from "./ATSCircleChart";

const DropzoneUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);

  // For ATS Score
  const [score, setScore] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      setError("Only PDF files are allowed");
      setFile(null);
      setFileName(null);
      return;
    }

    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setSuggestions(null);
    setError(null);

    try {
      // Step 1: Extract text from PDF
      const pdfText = await extractTextFromPDF(file);

      // Step 2: Call Gemini API using @google/genai
      const { GoogleGenAI } = await import("@google/genai"); // dynamic import for Next.js
      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!, // 👈 env var must start with NEXT_PUBLIC_
      });

      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Please analyze the following resume text and provide:
1. A short summary of the candidate’s profile.
2. An ATS Score out of 100.
3. Suggestions for improvement.

Resume Text:
\n\n${pdfText}`,
              },
            ],
          },
        ],
      });

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

      // ✅ ATS Score extract karo from AI response
      const match = text?.match(/ATS Score[:\-]?\s*(\d+)/i);
      if (match) {
        setScore(Number(match[1]));
      }

      setSuggestions(text || "No suggestions found.");
    } catch (err) {
      setError("Something went wrong while analyzing.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfjsLib = await import("pdfjs-dist/build/pdf");
    const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(" ");
          text += pageText + "\n";
        }
        resolve(text);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] border-2 border-dashed rounded-xl flex flex-col gap-2 items-center justify-center text-center cursor-pointer transition ${
          isDragActive ? "bg-blue-100 border-blue-500" : "border-gray-400"
        }`}
      >
        <IoCloudUploadOutline size={40} className="text-myMidblue" />
        <input {...getInputProps()} />
        <p className="text-myMidblue sm:text-lg text-sm">
          {isDragActive
            ? "Drop the PDF here..."
            : "Drag & drop PDF file here, or click to select"}
        </p>
        {fileName && <p className="text-sm text-green-600">{fileName}</p>}
        {error && <p className="text-sm text-red-500">❌ {error}</p>}
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        className="px-5 py-3 mt-5 hover:bg-myMidblue/30 rounded-xl text-myMidblue font-bold text-xl border border-myMidblue"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* ATS Score Circle and Text */}
      {/* {score !== null && (
        <div className="mt-6 flex flex-col items-center w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <ATSCircleChart score={score} />
              <p className="ml-4 text-xl font-bold text-myLightBlue">{score} / 100</p>
            </div>
            
          </div>
        </div>
      )} */}

      {/* Suggestions from AI */}
      {/* {suggestions && (
        <div className="mt-6 border rounded-xl p-4 bg-gray-50 w-full max-w-xl prose">
          <h3 className="font-bold text-lg mb-2">Suggestions:</h3>
          <ReactMarkdown>{suggestions}</ReactMarkdown>
        </div>
      )} */}
{suggestions && (
  <div className="mt-6 border rounded-xl p-4 bg-gray-50 w-full max-w-xl prose">
    {/* ATS Score Chart and Summary side by side */}
    {score !== null && (
      <div className="mt-4 flex justify-between items-center w-full">
        {/* ATS Score Chart */}
        <div className="flex items-center">
          <ATSCircleChart score={score} />
        </div>

        {/* Summary */}
        {/* <div className="ml-4 flex flex-col justify-center">
          <h3 className="font-bold text-lg text-myMidblue">Summary</h3>
          <p className="text-sm text-gray-600">{suggestions}</p> 
        </div> */}
      </div>
    )}

    <h3 className="font-bold text-lg mb-2">Suggestions:</h3>
    <ReactMarkdown>{suggestions}</ReactMarkdown> {/* Display AI suggestions here */}
  </div>
)}


    </div>
  );
};

export default DropzoneUploader;
