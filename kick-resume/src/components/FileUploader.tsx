"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoogleGenAI } from "@google/genai";
import ATSCircleChart from "./ATSCircleChart";
import AccordionSection from "./AccordianSection";
import { useResumeContext } from "@/context/ReaumeContext";

const DropzoneUploader = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // For Ai Report
  const { setSuggestions, suggestions } = useResumeContext();
  const { setScore, score } = useResumeContext();
  const { setOverall, overall } = useResumeContext();
  const { setKeywords, keywords } = useResumeContext();
  const { setFormatting, formatting } = useResumeContext();
  const { setEducation, education } = useResumeContext();
  const { setExperience, experience } = useResumeContext();
  const { setKeywordsScore, keywordsScore } = useResumeContext();
  const { setFormattingScore, formattingScore } = useResumeContext();
  const { setEducationScore, educationScore } = useResumeContext();
  const { setExperienceScore, experienceScore } = useResumeContext();
  const { setSummaryMistakes, summaryMistakes } = useResumeContext();
  const { setCoverLetter, coverLetter } = useResumeContext();

  const { setActualSummary, actualSummary } = useResumeContext();
  const { setImprovedSummary, improvedSummary } = useResumeContext();

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

**Overall Assessment:** [2–4 sentence summary of the resume's ATS compatibility]*

**Actual Summary:** *[2–4 sentence summary of the resume's content]*

**Summary Mistakes:** *[Grammatical mistakes found in the summary]*

**Improved Summary Suggestions:** *[Refined version of the summary with suggestions]*

**Cover Letter:** *(Provide a professionally written cover letter in proper Markdown format. Break it into clear paragraphs with line breaks. Add spacing for readability.)*


highlight if there is any mistake
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

      const actualSummaryMatch = text?.match(
        /\*\*Actual Summary:\*\*\s*([\s\S]*?)\n\*\*/i
      );
      const summaryMistakesMatch = text?.match(
        /\*\*Summary Mistakes:\*\*\s*([\s\S]*?)\n\*\*/i
      );
      const improvedSummaryMatch = text?.match(
        /\*\*Improved Summary Suggestions:\*\*\s*([\s\S]*?)(?=\n##|---|\*\*)/i
      );

      const coverLetterMatch = text?.match(
        /\*\*Cover Letter:\*\*\s*([\s\S]*?)(?=\n##|---|\*\*)/i
      );

      if (actualSummaryMatch && actualSummaryMatch[1]) {
        setActualSummary(actualSummaryMatch[1].trim());
      }
      if (summaryMistakesMatch && summaryMistakesMatch[1]) {
        setSummaryMistakes(summaryMistakesMatch[1].trim());
      }
      if (improvedSummaryMatch && improvedSummaryMatch[1]) {
        setImprovedSummary(improvedSummaryMatch[1].trim());
      }
      if (coverLetterMatch && coverLetterMatch[1]) {
        setCoverLetter(coverLetterMatch[1].replace(/[\r\u200b]/g, "").trim());
      }

      const cleanedText = text
        ? text
            .replace(/(\*\*ATS Score:\*\*.*)/i, "")
            .replace(/(\*\*Overall Assessment:\*\*\s*(.*))/i, "")
            .replace(/(\*\*Actual Summary:\*\*\s*(.*))/i, "")
            .replace(/(\*\*Summary Mistakes:\*\*\s*(.*))/i, "")
            .replace(/(\*\*Improved Summary Suggestions:\*\*\s*(.*))/i, "")
            .replace(/(\*\*Generated Cover Letter:\*\*\s*(.*))/i, "")
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

        console.log("actual summary", actualSummary);
      }
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
    </div>
  );
};

export default DropzoneUploader;
