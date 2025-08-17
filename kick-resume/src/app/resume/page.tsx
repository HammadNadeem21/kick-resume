// "use client";
// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";

// const Page = () => {
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [fileName, setFileName] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [analysisResult, setAnalysisResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (file && file.type === "application/pdf") {
//       setPdfFile(file);
//       setFileName(file.name);
//     } else {
//       alert("Please upload a PDF file only.");
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [] },
//     multiple: false,
//   });

//   const handleAnalyze = async () => {
//     if (!jobDescription || !pdfFile) {
//       alert("Please enter job description and upload resume!");
//       return;
//     }

//     setLoading(true);
//     setAnalysisResult(null);

//     try {
//       const formData = new FormData();
//       formData.append("jobDescription", jobDescription);
//       formData.append("resume", pdfFile);

//       const res = await fetch("/api/resume", {
//         headers: { "Content-Type": "application/json" },
//         method: "POST",
//         body: formData,
//       });
//       console.log("Response status:", res.status);
//       console.log("Response text:", await res.text());
//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.error || "Something went wrong");
//         return;
//       }

//       setAnalysisResult(data);
//       console.log("Analysis Result:", data);
//     } catch (error) {
//       console.error("Error analyzing:", error);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-[30px] py-[60px]">
//       <div className="flex items-center justify-between px-[100px]">
//         <textarea
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//           placeholder="Type Job Dexcription"
//           className="border border-myPurple text-myPurple rounded-lg focus:outline-none w-[40%] py-2 px-3"
//           rows={7}
//         ></textarea>

//         {/* Resume Uploader */}
//         {/* <div
//           {...getRootProps()}
//           className="w-[40%] border-2 border-dashed border-myPurple rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-myPurple/10 transition-all"
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p className="text-myPurple">Drop the PDF here ...</p>
//           ) : (
//             <>
//               <p className="text-myPurple font-semibold">
//                 Drag & drop your PDF resume here, or click to select
//               </p>
//               <p className="text-gray-500 text-sm mt-2">
//                 Only PDF files are accepted
//               </p>
//             </>
//           )}
//           {fileName && (
//             <div className="mt-4 text-green-600 font-medium">
//               Uploaded: {fileName}
//             </div>
//           )}
//         </div> */}

//         <div
//           {...getRootProps()}
//           className="w-[40%] border-2 border-dashed border-myPurple rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-myPurple/10 transition-all"
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p className="text-myPurple">Drop the PDF here ...</p>
//           ) : (
//             <>
//               <p className="text-myPurple font-semibold">
//                 Drag & drop your PDF resume here, or click to select
//               </p>
//               <p className="text-gray-500 text-sm mt-2">
//                 Only PDF files are accepted
//               </p>
//             </>
//           )}
//           {fileName && (
//             <div className="mt-4 text-green-600 font-medium">
//               Uploaded: {fileName}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center justify-center py-5 mt-5">
//         <button
//           onClick={handleAnalyze}
//           disabled={loading}
//           className="py-1 px-4 rounded-lg text-white font-semibold bg-myMidPurple hover:bg-myPurple transition-all duration-300"
//         >
//           {loading ? "Analyzing..." : "Analyze"}
//         </button>
//       </div>

//       {/* Result */}
//       {analysisResult && (
//         <div className="mt-8 bg-gray-100 p-6 rounded-lg">
//           <h2 className="text-lg font-bold">Analysis Result</h2>
//           <p className="mt-2">
//             <strong>Score:</strong> {analysisResult.score}/100
//           </p>
//           <p className="mt-2">
//             <strong>Missing Skills:</strong>{" "}
//             {analysisResult.missingSkills?.join(", ") || "None"}
//           </p>
//           <div className="mt-2">
//             <strong>Suggestions:</strong>
//             <ul className="list-disc list-inside">
//               {analysisResult.suggestions?.map((s: string, i: number) => (
//                 <li key={i}>{s}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
import SectionScoreChart from "@/components/SectionScoreChart";
import { FaFileAlt } from "react-icons/fa";

// PDF.js worker set
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const Page = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

  // PDF → Text extract
  const extractTextFromPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      text += strings.join(" ") + "\n";
    }

    return text;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setFileName(file.name);
      setFile(file.name);
    } else {
      alert("Please upload a PDF file only.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!jobDescription || !pdfFile) {
      alert("Please enter job description and upload resume!");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    try {
      const resumeText = await extractTextFromPDF(pdfFile);

      const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `
Compare the following resume with the given job description. 
Provide:
1. Compatibility score out of 100
2. Missing keywords/skills
3. Specific suggestions to improve the resume to match the job.

Job Description:
${jobDescription}

Resume:
${resumeText}

Output JSON in this structure:
{
  "score": number,
  "missingSkills": ["..."],
  "suggestions": ["..."]
}
      `;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      const match = text.match(/\{[\s\S]*\}/);
      const jsonData = match ? JSON.parse(match[0]) : null;
      console.log("AI Response:", jsonData);

      if (!jsonData) {
        throw new Error("Invalid AI response");
      }

      setAnalysisResult(jsonData);
    } catch (error) {
      console.error("Error analyzing:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-[30px] py-[60px]">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Resume vs Job
            </span>
            <br />
            <span className="text-black">Analysis</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Compare your resume against specific job requirements and get
            detailed compatibility analysis.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Resume Uploader */}
        <div className="flex flex-col gap-4">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Upload & Compare
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload your resume and paste the job description
            </p>
          </div>
          <div
            {...getRootProps()}
            className=" w-[100%] h-[180px] border-2 border-dashed border-mySkyBlue rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-mySkyBlue/10 transition-all"
          >
            <div className="py-3 px-3 mb-2 flex items-center justify-center bg-mySkyBlue/30 rounded-lg">
              <FaFileAlt size={25} className="text-mySkyBlue" />
            </div>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-mySkyBlue">Drop the PDF here ...</p>
            ) : (
              <>
                <p className="text-mySkyBlue font-semibold">
                  Drag & drop your PDF resume here, or click to select
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Only PDF files are accepted
                </p>
              </>
            )}
            {fileName && (
              <div className="mt-4 text-mySkyBlue font-medium">
                Uploaded: {fileName}
              </div>
            )}
          </div>
          {file && (
            <div className="border border-mySkyBlue bg-mySkyBlue/20 rounded-lg py-3 px-3 flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <FaFileAlt size={20} className="text-mySkyBlue" />
                <span className="ml-2 text-gray-500">{file}</span>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => {
                  setPdfFile(null);
                  setFileName("");
                  setFile("");
                }}
                className="text-gray-500"
              >
                Remove
              </button>
            </div>
          )}

          {/* Job Description Textarea */}
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Type Job Description"
            className="border border-mySkyBlue text-gray-600 rounded-lg focus:outline-none w-[100%] py-2 px-3"
            rows={7}
          ></textarea>
        </div>

        <div className="">
          {analysisResult && (
            <div className="mt-8 bg-gray-100 p-6 rounded-lg">
              <h2 className="md:text-2xl font-bold text-center text-mySkyBlue">
                Analysis Result
              </h2>
              <div className="grid grid-cols-1 mt-5">
                <div className="flex flex-col justify-center">
                  <p className="mt-2 ml-5 text-mySkyBlue font-semibold">
                    Analysis Score
                  </p>
                  <SectionScoreChart
                    score={analysisResult.score}
                    textColor="#4b5563"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="mt-2 text-mySkyBlue font-semibold">
                    Missing Skills
                  </p>

                  {analysisResult.missingSkills?.join(", ") || "None"}
                </div>
              </div>
              <div className="mt-5">
                <strong className="text-mySkyBlue text-lg">Suggestions</strong>
                <ul className="list-disc list-inside">
                  {analysisResult.suggestions?.map((s: string, i: number) => (
                    <li key={i} className="text-[#4b5563] mt-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* <div className="lg:flex items-center lg:justify-between justify-center gap-2 grid grid-cols-1 px-[100px]">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Type Job Description"
          className="border border-myPurple text-myPurple rounded-lg focus:outline-none lg:w-[40%] w-[100%] py-2 px-3"
          rows={7}
        ></textarea>

        <div
          {...getRootProps()}
          className="lg:w-[40%] w-[100%] h-[180px] border-2 border-dashed border-myPurple rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-myPurple/10 transition-all"
        >
          <div className="py-3 px-3 mb-2 flex items-center justify-center bg-myLightPurple2 rounded-lg">
            <FaFileAlt size={25} className="text-myPurple" />
          </div>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-myPurple">Drop the PDF here ...</p>
          ) : (
            <>
              <p className="text-myPurple font-semibold">
                Drag & drop your PDF resume here, or click to select
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Only PDF files are accepted
              </p>
            </>
          )}
          {fileName && (
            <div className="mt-4 text-green-600 font-medium">
              Uploaded: {fileName}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center py-5 mt-5">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="py-1 px-4 rounded-lg text-white font-semibold bg-myMidPurple hover:bg-myPurple transition-all duration-300"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {analysisResult && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="md:text-2xl font-bold text-center text-myPurple">
            Analysis Result
          </h2>
          <div className="grid grid-cols-2 mt-5">
            <div className="flex flex-col justify-center">
              <p className="mt-2 ml-5 text-myMidPurple font-semibold">
                Analysis Score
              </p>
              <SectionScoreChart
                score={analysisResult.score}
                textColor="#4b5563"
              />
            </div>

            <div className="flex flex-col">
              <p className="mt-2 text-myMidPurple font-semibold">
                Missing Skills
              </p>

              {analysisResult.missingSkills?.join(", ") || "None"}
            </div>
          </div>
          <div className="mt-5">
            <strong className="text-myPurple text-lg">Suggestions</strong>
            <ul className="list-disc list-inside">
              {analysisResult.suggestions?.map((s: string, i: number) => (
                <li key={i} className="text-[#4b5563] mt-2">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Page;
