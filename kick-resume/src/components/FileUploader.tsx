
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
//       const { GoogleGenAI } = await import("@google/genai");
//       const ai = new GoogleGenAI({
//         apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
//       });
//       const result = await ai.models.generateContent({
//         model: "gemini-1.5-flash",
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `You are an expert in Applicant Tracking Systems (ATS) and resume optimization.
      
//       Analyze the following resume *strictly* for ATS compatibility and provide your response in the exact structured format below:
      
//       ---
//       ATS Score: [Score out of 100]
      
//       Overall Assessment: [A one-sentence judgment of the resume's ATS-friendliness]
      
//       Summary: [2-4 sentence summary of the resume's content and structure from an ATS perspective]
      
//       Top Improvement Areas:
//       - [Improvement Area 1: Clear and actionable]
//       - [Improvement Area 2: Clear and actionable]
//       - [Improvement Area 3: Clear and actionable]
//       - ...
      
//       Only consider ATS-related factors such as:
//       - Section presence and clarity (Contact Info, Summary, Experience, Skills, Education)
//       - Proper file formatting (PDF or DOCX, no images, no tables or columns)
//       - Use of standard fonts and font sizes
//       - Use of keywords relevant to the target job role(s)
//       - Chronological and reverse-chronological structure
//       - Readability by parsing engines (no graphics, text embedded in images, etc.)
      
//       DO NOT evaluate writing style, career performance, or visual design. Focus solely on machine readability and ATS compliance.
      
//       Resume:
      
//       ${pdfText}
//       `,
//               },
//             ],
//           },
//         ],
//       });
      

//       const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

//       console.log("Gemini raw response:", text); // ✅ Helpful for debugging

//       // ✅ More flexible ATS score extraction
//       let extractedScore = null;
//       const patterns = [
//         /ATS\s*Score\s*[:\-]?\s*(\d{1,3})/i,
//         /Score\s*is\s*(\d{1,3})/i,
//         /Score\s*[:\-]?\s*(\d{1,3})/i,
//         /(\d{1,3})\s*\/\s*100/, // e.g. 85/100
//         /(\d{1,3})\s*out\s*of\s*100/i,
//       ];

//       for (const pattern of patterns) {
//         const match = text?.match(pattern);
//         if (match) {
//           extractedScore = Number(match[1]);
//           break;
//         }
//       }

//       if (extractedScore !== null) {
//         setScore(extractedScore);
//       } else {
//         console.warn("⚠️ Could not extract ATS score from response.");
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
//       {/* Dropzone */}
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

//       {/* Analyze Button */}
//       <button
//         onClick={handleAnalyze}
//         className="px-5 py-3 mt-5 hover:bg-myMidblue/30 rounded-xl text-myMidblue font-bold text-xl border border-myMidblue"
//         disabled={loading}
//       >
//         {loading ? "Analyzing..." : "Analyze"}
//       </button>

//       {/* ATS Score Circle and Text */}
//       {score !== null && (
//         <div className="mt-6 flex flex-col items-center w-full">
//           <div className="flex justify-between w-full">
//             <div className="flex items-center">
//               <ATSCircleChart score={score} />
//               {/* <p className="ml-4 text-xl font-bold text-myLightBlue">{score} / 100</p> */}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Suggestions from AI */}
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
import rehypeRaw from "rehype-raw";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoogleGenAI } from "@google/genai";
import ATSCircleChart from "./ATSCircleChart";

const DropzoneUploader = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
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
      const pdfText = await extractTextFromPDF(file);
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
      });

      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an expert in Applicant Tracking Systems (ATS) and resume optimization.

Analyze the following resume *strictly* for ATS compatibility and provide your response in the exact structured format below, using Markdown for styling:

---
**ATS Score:** **[Score out of 100]**

**Overall Assessment:** *[A one-sentence judgment of the resume's ATS-friendliness]*

**Summary:** *[2-4 sentence summary of the resume's content and structure from an ATS perspective]*

**Top Improvement Areas:**
- **[Improvement Area 1: Clear and actionable]**
- **[Improvement Area 2: Clear and actionable]**
- **[Improvement Area 3: Clear and actionable]**
- ...

Only consider ATS-related factors such as:
- **Section presence and clarity** (Contact Info, Summary, Experience, Skills, Education)
- **Proper file formatting** (PDF or DOCX, no images, no tables or columns)
- **Use of standard fonts and font sizes**
- **Use of keywords relevant to the target job role(s)**
- **Chronological and reverse-chronological structure**
- **Readability by parsing engines** (no graphics, text embedded in images, etc.)

**DO NOT** evaluate writing style, career performance, or visual design. Focus solely on machine readability and ATS compliance.

Resume:

${pdfText}`,
              },
            ],
          },
        ],
      });

      console.log("result",result);

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

      let extractedScore = null;
      const patterns = [
        /ATS\s*Score\s*[:\-]?\s*(\d{1,3})/i,
        /Score\s*is\s*(\d{1,3})/i,
        /Score\s*[:\-]?\s*(\d{1,3})/i,
        /(\d{1,3})\s*\/\s*100/,
        /(\d{1,3})\s*out\s*of\s*100/i,
      ];

      for (const pattern of patterns) {
        const match = text?.match(pattern);
        if (match) {
          extractedScore = Number(match[1]);
          break;
        }
      }

      if (extractedScore !== null) {
        setScore(extractedScore);
      } else {
        console.warn("⚠️ Could not extract ATS score from response.");
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




  const markdownComponents = {
    h1: ({ node, ...props }: { node: any; [key: string]: any }) => <h1 className="text-3xl font-bold text-blue-600" {...props} />,
    h2: ({ node, ...props }: { node: any; [key: string]: any }) => <h2 className="text-2xl font-semibold text-blue-500" {...props} />,
    h3: ({ node, ...props }: { node: any; [key: string]: any }) => <h3 className="text-xl font-medium text-blue-400" {...props} />,
    strong: ({ node, ...props }: { node: any; [key: string]: any }) => <strong className="text-red-500" {...props} />,
    ul: ({ node, ...props }: { node: any; [key: string]: any }) => <ul className="list-disc pl-5 text-gray-700" {...props} />,
  };


  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      {/* Dropzone */}
      <div
         {...getRootProps({
          onClick: (e) => {
            if (!session) {
              e.preventDefault();
              e.stopPropagation();
              router.push("/api/auth/signin");
            }
          },
        })}
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
        disabled={loading || !session}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* ATS Score Circle and Text */}
      {score !== null && (
        <div className="mt-6 flex flex-col items-center w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <ATSCircleChart score={score} />
            </div>
          </div>
        </div>
      )}

      {/* Suggestions from AI */}
      {suggestions && (
        <div className="mt-6 border rounded-xl p-4 bg-gray-50 w-full max-w-xl prose">
          <h3 className="font-bold text-lg mb-2">Suggestions:</h3>
          <ReactMarkdown components={markdownComponents as any} rehypePlugins={[rehypeRaw]}>{suggestions}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default DropzoneUploader;
