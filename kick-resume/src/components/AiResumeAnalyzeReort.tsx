"use client";

import { useResumeContext } from "../context/ReaumeContext"; 
import React, { useEffect } from "react";
import ATSCircleChart from "./ATSCircleChart";
import AccordionSection from "./AccordianSection";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";

const AiResumeAnalyzeReort = () => {
  const { actualSummary, summaryMistakes, improvedSummary, coverLetter, suggestions,
    score,
    overall,
    keywords,
    formatting,
    education,
    experience,
    keywordsScore,
    formattingScore,
    educationScore,
    experienceScore
   } = useResumeContext();

  useEffect(() => {
    console.log("Component received context:", { actualSummary, improvedSummary });
  }, [actualSummary, improvedSummary]);

  if (!actualSummary) return <div>Loading...</div>; // Prevent rendering if null


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
        className="text-2xl font-medium text-myDarkblue mt-4 mb-2"
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


  return (
    <div className="p-5">
            <div>
        {suggestions && (
        <div className="mt-6 p-6 bg-white border rounded-xl shadow-md w-full">
          <h3 className="text-3xl font-bold mb-4 text-primaryColor text-center">
            Resume Analysis
          </h3>

          {/* ATS Score Chart and Summary */}
          {score !== null && overall && (
            <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="sm:w-1/2 w-full flex flex-col">
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

          <h4 className="text-2xl font-bold text-myDarkBlue mb-4">
            AI Suggested Updates
          </h4>

          {/* Suggestion */}
          {actualSummary && (
            <div className="mb-8">
              <h4 className="text-xl font-bold text-myDarkBlue mb-4">
                Actual Summary
              </h4>
              <div>{actualSummary}</div>
            </div>
          )}

          {/* summary mistakes  */}
          {summaryMistakes && (
            <div className="mb-8">
              <h4 className="text-xl font-bold text-myDarkBlue mb-4">
                Mistakes:
              </h4>
              <div>{summaryMistakes}</div>
            </div>
          )}

          {/* improved summary */}
          {improvedSummary && (
            <div className="mb-8">
              <h4 className="text-xl font-bold text-myDarkBlue mb-4">
                Improvements:
              </h4>
              <div>{improvedSummary}</div>
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

              <AccordionSection title="">
                <ReactMarkdown
                  components={markdownComponents as any}
                  rehypePlugins={[rehypeRaw]}
                >
                  {keywords}
                </ReactMarkdown>
              </AccordionSection>
            </div>
          )}
          {/* <div className="h-[1px] w-full bg-myMidblue mb-5"></div> */}

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

              <AccordionSection title="">
                <ReactMarkdown
                  components={markdownComponents as any}
                  rehypePlugins={[rehypeRaw]}
                >
                  {formatting}
                </ReactMarkdown>
              </AccordionSection>
            </div>
          )}
          {/* <div className="h-[1px] w-full bg-myMidblue mb-5"></div> */}

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
              <AccordionSection title="">
                <ReactMarkdown
                  components={markdownComponents as any}
                  rehypePlugins={[rehypeRaw]}
                >
                  {education}
                </ReactMarkdown>
              </AccordionSection>
            </div>
          )}
          {/* <div className="h-[1px] w-full bg-myMidblue mb-5"></div> */}

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

              <AccordionSection title="">
                <ReactMarkdown
                  components={markdownComponents as any}
                  rehypePlugins={[rehypeRaw]}
                >
                  {experience}
                </ReactMarkdown>
              </AccordionSection>
            </div>
          )}
        </div>
      )}
    </div>

    <div>{
      coverLetter && suggestions && (
        <div className="mt-6 p-6 bg-white border rounded-xl shadow-md w-full">
          <h3 className="text-2xl font-bold text-primaryColor mb-4">Cover Letter</h3>
          <pre className="whitespace-pre-wrap bg-myLightestBlue p-4 rounded-xl text-gray-800 border border-gray-200 leading-relaxed font-sans sm:text-base text-sm shadow-sm">{coverLetter}</pre>
          
        </div>
      )
      }</div>
    </div>
  );
};

export default AiResumeAnalyzeReort;
