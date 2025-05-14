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
  const [overall, setOverall] = useState<string | null>(null);

  const [keywords, setKeywords] = useState<string | null>(null);
  const [formatting, setFormatting] = useState<string | null>(null);
  const [education, setEducation] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [keywordsScore, setKeywordsScore] = useState<number | null>(null);
  const [formattingScore, setFormattingScore] = useState<number | null>(null);
  const [educationScore, setEducationScore] = useState<number | null>(null);
  const [experienceScore, setExperienceScore] = useState<number | null>(null);
  const [sectionSuggestions, setSectionSuggestions] = useState<{ [key: string]: string }>({});

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

Your task is to analyze the following resume *strictly* for ATS compatibility and return your response in **exactly** the Markdown structure provided below. Use **emojis** to enhance readability. DO NOT add anything outside the structure. pick the summary from the provided resume and check for any grammaticaly mistakes, and also provide suggestions on how I can improve my summary according to my expertise.

Return your response in this format:

---

**ATS Score:** **[Score out of 100]**

**Overall Assessment:** *[2–4 sentence summary of the resume's ATS compatibility]*

**Summary:** *[summary suggestions and highlight if there is any mistake]*

---

## 🗝️ Keywords Suggestions (Score: [out of 100])

- ✅ **[Keyword Suggestion 1]**
- ✅ **[Keyword Suggestion 2]**
- ✅ **[Keyword Suggestion 3]**

---

## 🖋️ Formatting Suggestions (Score: [out of 100])

- ✅ **[Formatting Suggestion 1]**
- ✅ **[Formatting Suggestion 2]**

---
 
## 🎓 Education Suggestions (Score: [out of 100])

- ✅ **[Education Suggestion 1]**
- ✅ **[Education Suggestion 2]**

---

## 💼 Experience Suggestions (Score: [out of 100])

- ✅ **[Experience Suggestion 1]**
- ✅ **[Experience Suggestion 2]**

---

✅ *Only consider the following ATS-related factors:*
- Section presence (Contact Info, Summary, Experience, Skills, Education)
- File formatting (PDF/DOCX, no tables, columns, images)
- Standard fonts/sizes
- Keyword relevance
- Structure (chronological)
- Parsing readability

🚫 *DO NOT evaluate job performance or design.*



---

Resume to analyze:

${pdfText}`,
              },
            ],
          },
        ],
      });

      console.log("result", result);

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
      const overallMatch = text?.match(/\*\*Overall Assessment:\*\*\s*(.*)/i);
      if (overallMatch && overallMatch[1]) {
        setOverall(overallMatch[1].trim());
      }

      const cleanedText = text
        ? text
            .replace(/(\*\*ATS Score:\*\*.*)/i, "")
            .replace(/(\*\*Overall Assessment:\*\*\s*(.*))/i, "")
        : "";
      setSuggestions(cleanedText.trim());
      if (text) {
        const keywordsMatch = text.match(
          /## 🗝️ Keywords Suggestions([\s\S]*?)---/
        );
        const formattingMatch = text.match(
          /## 🖋️ Formatting Suggestions([\s\S]*?)---/
        );
        const educationMatch = text.match(
          /## 🎓 Education Suggestions([\s\S]*?)---/
        );
        const experienceMatch = text.match(
          /## 💼 Experience Suggestions([\s\S]*?)---/
        );

        if (keywordsMatch) setKeywords(keywordsMatch[1].trim());
        if (formattingMatch) setFormatting(formattingMatch[1].trim());
        if (educationMatch) setEducation(educationMatch[1].trim());
        if (experienceMatch) setExperience(experienceMatch[1].trim());

        const keywordsScoreMatch = text?.match(
          /## 🗝️ Keywords Suggestions.*Score: (\d+)/
        );
        if (keywordsScoreMatch) setKeywordsScore(Number(keywordsScoreMatch[1]));

        const formattingScoreMatch = text?.match(
          /## 🖋️ Formatting Suggestions.*Score: (\d+)/
        );
        if (formattingScoreMatch)
          setFormattingScore(Number(formattingScoreMatch[1]));

        const educationScoreMatch = text?.match(
          /## 🎓 Education Suggestions.*Score: (\d+)/
        );
        if (educationScoreMatch)
          setEducationScore(Number(educationScoreMatch[1]));

        const experienceScoreMatch = text?.match(
          /## 💼 Experience Suggestions.*Score: (\d+)/
        );
        if (experienceScoreMatch)
          setExperienceScore(Number(experienceScoreMatch[1]));

        
      }
    } catch (err) {
      setError("Something went wrong while analyzing.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  
  // Sample function to get AI's suggestion for a specific section
  const getAISectionSuggestion = (sectionText: string, sectionName: string) => {
    // You'd call AI's API here and get the updated version of the section
    // Example prompt to AI: "Please analyze this [section] and provide suggestions for improvement."
    return `Updated ${sectionName}: [Updated section text here based on AI's analysis]`;
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
    h1: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <h1 className="text-xl font-bold text-myDarkblue mt-4 mb-2" {...props} />
    ),

    h2: ({ node, ...props }: { node: any; [key: string]: any }) => {
      const headingText = props.children[0];
      const text =
        typeof headingText === "string" ? headingText.toLowerCase() : "";

      let style = "text-myDarkblue";
      let icon = "";

      if (text.includes("keywords")) {
        style = "text-yellow-600 border-l-4 border-yellow-400 pl-3";
        icon = "🗝️ ";
      } else if (text.includes("formatting")) {
        style = "text-purple-600 border-l-4 border-purple-400 pl-3";
        icon = "🖋️ ";
      } else if (text.includes("experience")) {
        style = "text-green-600 border-l-4 border-green-400 pl-3";
        icon = "💼 ";
      } else if (text.includes("education")) {
        style = "text-blue-600 border-l-4 border-blue-400 pl-3";
        icon = "🎓 ";
      }

      return (
        <h2 className={`text-xl font-semibold mt-4 mb-2 ${style}`} {...props}>
          {icon}
          {headingText}
        </h2>
      );
    },

    h3: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <h3
        className="text-xl font-medium text-myDarkblue mt-4 mb-2"
        {...props}
      />
    ),

    strong: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <strong className="text-myMidblue text-lg font-[400]" {...props} />
    ),

    ul: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <ul className="list-disc pl-5 text-gray-700 space-y-1" {...props} />
    ),

    li: ({ node, ...props }: { node: any; [key: string]: any }) => {
      const content = props.children[0];
      const isImportant =
        typeof content === "string" &&
        content.toLowerCase().includes("missing");

      return (
        <li
          className={`text-gray-700 ${
            isImportant ? "text-red-600 font-semibold" : ""
          }`}
          {...props}
        />
      );
    },

    p: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <p className="text-gray-800 hidden  mb-2" {...props} />
    ),
  };

  // console.log("h1", markdownComponents.h1);

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
      {suggestions && (
        <div className="mt-6 p-6 bg-white border rounded-xl shadow-md w-full">
          <h3 className="text-3xl font-bold mb-4 text-primaryColor text-center">
            Resume Analysis
          </h3>

          {/* ATS Score Chart and Summary */}
          {score !== null && overall && (
            <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="sm:w-1/2 w-full flex flex-col items-center">
                <h4 className="text-xl font-bold text-myDarkBlue mb-2">
                  Overall ATS Score
                </h4>
                <ATSCircleChart score={score} />
              </div>
              <div className="sm:w-1/2 w-full">
                <h4 className="text-xl font-bold text-myDarkBlue mb-2">
                  Summary
                </h4>
                <p className="text-gray-700">{overall}</p>
              </div>
            </div>
          )}
          <div className="h-[1px] w-full bg-myMidblue mb-5"></div>

          {/* Suggestion */}
          {suggestions && (
            <div className="mb-8">
            <h4 className="text-2xl font-bold text-myDarkBlue mb-4">AI Suggested Updates</h4>
            <p className="text-lg text-myDarkGray">{suggestions}</p>
          </div>
          )}
          {/* Keywords Section */}
          {keywords && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold text-myDarkBlue mb-2">
                  Keywords
                </h4>
                <div className="relative w-12 h-12">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-myDarkBlue"
                      strokeWidth="4"
                      strokeDasharray={`${keywordsScore}, 100`}
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-myDarkBlue">
                    {keywordsScore}/100
                  </span>
                </div>
              </div>

              <ReactMarkdown
                components={markdownComponents as any}
                rehypePlugins={[rehypeRaw]}
              >
                {keywords}
              </ReactMarkdown>
            </div>
          )}
          <div className="h-[1px] w-full bg-myMidblue mb-5"></div>

          {/* Formatting Section */}
          {formatting && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold text-myDarkBlue mb-2">
                  Formating
                </h4>
                <div className="relative w-12 h-12">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-myDarkBlue"
                      strokeWidth="4"
                      strokeDasharray={`${formattingScore}, 100`}
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-myDarkBlue">
                    {formattingScore}/100
                  </span>
                </div>
              </div>
              <ReactMarkdown
                components={markdownComponents as any}
                rehypePlugins={[rehypeRaw]}
              >
                {formatting}
              </ReactMarkdown>
            </div>
          )}
          <div className="h-[1px] w-full bg-myMidblue mb-5"></div>

          {/* Education Section */}
          {education && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold text-myDarkBlue mb-2">
                  Education
                </h4>
                <div className="relative w-12 h-12">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-myDarkBlue"
                      strokeWidth="4"
                      strokeDasharray={`${educationScore}, 100`}
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-myDarkBlue">
                    {educationScore}/100
                  </span>
                </div>
              </div>
              <ReactMarkdown
                components={markdownComponents as any}
                rehypePlugins={[rehypeRaw]}
              >
                {education}
              </ReactMarkdown>
            </div>
          )}
          <div className="h-[1px] w-full bg-myMidblue mb-5"></div>

          {/* Experience Section */}
          {experience && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold text-myDarkBlue mb-2">
                  Experience
                </h4>
                <div className="relative w-12 h-12">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-myDarkBlue"
                      strokeWidth="4"
                      strokeDasharray={`${experienceScore}, 100`}
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-myDarkBlue">
                    {experienceScore}/100
                  </span>
                </div>
              </div>
              <ReactMarkdown
                components={markdownComponents as any}
                rehypePlugins={[rehypeRaw]}
              >
                {experience}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropzoneUploader;
