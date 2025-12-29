"use client";

import { useResumeContext } from "../context/ReaumeContext";
import React, { useEffect, useRef, useState } from "react";
import ATSCircleChart from "./ATSCircleChart";
import AccordionSection from "./AccordianSection";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
import { FaKey } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { IoSchoolSharp } from "react-icons/io5";
import { GrUserExpert } from "react-icons/gr";

import { Editor } from "react-draft-wysiwyg";
import {
  ContentState,
  convertFromRaw,
  EditorState,
  convertToRaw,
} from "draft-js";
// @ts-ignore
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { pdf } from "@react-pdf/renderer";
import CoverLetterPDF from "./pdf/CoverLetterPDF";
import { MdFileDownload } from "react-icons/md";
import SectionScoreChart from "./SectionScoreChart";
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

  const markdownComponents = {
    h1: ({ node, ...props }: { node: any;[key: string]: any }) => (
      <h1
        className="text-xl font-bold text-primaryColor mt-4 mb-2"
        {...props}
      />
    ),

    h2: ({ node, ...props }: { node: any;[key: string]: any }) => {
      const headingText = props.children[0];
      const text =
        typeof headingText === "string" ? headingText.toLowerCase() : "";

      let style = "text-primaryColor";
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

    h3: ({ node, ...props }: { node: any;[key: string]: any }) => (
      <h3
        className="text-2xl font-medium text-primaryColor mt-4 mb-2"
        {...props}
      />
    ),

    strong: ({ node, ...props }: { node: any;[key: string]: any }) => (
      <strong className="text-gray-600 text-lg font-[400]" {...props} />
    ),

    ul: ({ node, ...props }: { node: any;[key: string]: any }) => (
      <ul className="list-disc pl-5 text-gray-600 space-y-1" {...props} />
    ),

    li: ({ node, ...props }: { node: any;[key: string]: any }) => {
      const content = props.children[0];
      const isImportant =
        typeof content === "string" &&
        content.toLowerCase().includes("missing");

      return (
        <li
          className={`text-gray-600 ${isImportant ? "text-red-600 font-semibold" : ""
            }`}
          {...props}
        />
      );
    },

    p: ({ node, ...props }: { node: any;[key: string]: any }) => (
      <p className="text-gray-800 hidden  mb-2" {...props} />
    ),
  };

  return (
    <div className="p-5">
      <div>
        {suggestions && (
          <div className="mt-6 p-6 bg-gray-200 rounded-xl w-full">
            <h3 className="text-3xl font-bold mb-4 text-mySkyBlue text-center">
              Resume Analysis
            </h3>

            {/* ATS Score Chart and Summary */}
            {score !== null && overall && (
              <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between px-6">
                <div className="sm:w-1/2 w-full flex flex-col">
                  <h4 className="text-xl font-bold text-mySkyBlue mb-1">
                    Overall ATS Score
                  </h4>
                  <ATSCircleChart score={score} />
                </div>
                <div className="sm:w-1/2 w-full">
                  <h4 className="text-xl font-bold mb-2 text-mySkyBlue">
                    Summary
                  </h4>
                  <p className="text-gray-600">{overall}</p>
                </div>
              </div>
            )}
            <div className="h-[1px] w-full bg-gray-500 mb-5"></div>

            <h4 className="text-2xl font-bold text-mySkyBlue mb-4">
              AI Suggested Updates
            </h4>

            {/* Suggestion */}
            {actualSummary && (
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 text-mySkyBlue">
                  Actual Summary
                </h4>
                <div className="text-gray-600">{actualSummary}</div>
              </div>
            )}

            {/* summary mistakes  */}
            {summaryMistakes && (
              <div className="mb-8">
                <h4 className="text-xl text-mySkyBlue font-bold  mb-4">
                  Mistakes:
                </h4>
                <div className="text-gray-600">
                  {summaryMistakes.map((mistake, index) => (
                    <ul key={index} className="list-disc pl-5 mb-1">
                      <li>{mistake}</li>
                    </ul>
                  ))}
                </div>
              </div>
            )}

            {/* improved summary */}
            {improvedSummary && (
              <div className="mb-8 ">
                <h4 className="text-xl text-mySkyBlue font-bold mb-4">
                  Improvements:
                </h4>
                <div className="text-gray-600">{improvedSummary}</div>
              </div>
            )}

            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 ">
              {/* Keywords Section */}
              <div className="bg-mySkyBlue/10 p-6 rounded-xl shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-gray-300">
                {keywords && (
                  <div className="mb-6 text-gray-500">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-2xl font-bold  mb-2 flex items-center ">
                        <FaKey className="inline mr-2" />
                        Keywords
                      </h4>
                      {/* <div className="relative w-[100px] h-[100px]">
                        <svg
                          className="transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
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
                            className={
                              keywordsScore !== null &&
                              keywordsScore !== undefined
                                ? keywordsScore <= 50
                                  ? "text-red-500"
                                  : keywordsScore < 70
                                  ? "text-yellow-500"
                                  : "text-green-500"
                                : "text-gray-400"
                            }
                            strokeWidth="4"
                            strokeDasharray={`${keywordsScore}, 100`}
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-myMidblue">
                          {keywordsScore}/100
                        </span>
                      </div> */}
                      <SectionScoreChart
                        score={keywordsScore}
                        textColor="#6b7280"
                        scoreText="ATS Score"
                      />
                    </div>

                    <div>
                      {keywords.map((item, index) => (
                        <ul key={index} className="mb-2 list-disc pl-5">
                          <li>{item}</li>
                        </ul>
                      ))}
                    </div>
                    {/* <AccordionSection title="" >
                  <ReactMarkdown
                    components={markdownComponents as any}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {keywords}
                  </ReactMarkdown>
                </AccordionSection> */}
                  </div>
                )}
              </div>

              {/* Formatting Section */}
              <div className="bg-mySkyBlue/10 p-6 rounded-xl shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-gray-300">
                {formatting && (
                  <div className="mb-6 text-gray-500">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold  mb-2 flex items-center">
                        <IoIosInformationCircle className="inline mr-2" />
                        Formating
                      </h4>
                      {/* <div className="relative w-[70px] h-[70px]">
                        <svg
                          className="transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
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
                            className={
                              formattingScore !== null &&
                              formattingScore !== undefined
                                ? formattingScore <= 50
                                  ? "text-red-500"
                                  : formattingScore < 70
                                  ? "text-yellow-500"
                                  : "text-green-500"
                                : "text-gray-400"
                            }
                            strokeWidth="4"
                            strokeDasharray={`${formattingScore}, 100`}
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-myMidblue">
                          {formattingScore}/100
                        </span>
                      </div> */}

                      <SectionScoreChart
                        score={formattingScore}
                        textColor="#6b7280"
                        scoreText="ATS Score"
                      />
                    </div>

                    <div className="">
                      {formatting.map((item, index) => (
                        <ul key={index} className="mb-2 list-disc pl-5">
                          <li>{item}</li>
                        </ul>
                      ))}
                    </div>

                    {/* <AccordionSection title="">
                  <ReactMarkdown
                    components={markdownComponents as any}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {formatting}
                  </ReactMarkdown>
                </AccordionSection> */}
                  </div>
                )}
              </div>
              {/* <div className="h-[1px] w-full bg-myMidblue mb-5"></div> */}

              {/* Education Section */}
              <div className="bg-mySkyBlue/10 p-6 rounded-xl shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-gray-300">
                {education && (
                  <div className="mb-6 text-gray-500">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold  mb-2 flex items-center">
                        <IoSchoolSharp className="inline mr-2" />
                        Education
                      </h4>

                      <SectionScoreChart
                        score={educationScore}
                        textColor="#6b7280 "
                        scoreText="ATS Score"
                      />
                    </div>

                    <div className="">
                      {education.map((item, index) => (
                        <ul key={index} className="mb-2 list-disc pl-5">
                          <li>{item}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Experience Section */}
              <div className="bg-mySkyBlue/10 p-6 rounded-xl shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-gray-300">
                {experience && (
                  <div className="mb-6 text-gray-500">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold  mb-2 flex items-center">
                        <GrUserExpert className="inline mr-2" />
                        Experience
                      </h4>

                      <SectionScoreChart
                        score={experienceScore}
                        textColor="#6b7280"
                        scoreText="ATS Score"
                      />
                    </div>

                    <div className="">
                      {experience.map((item, index) => (
                        <ul key={index} className="mb-2 list-disc pl-5">
                          <li>{item}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl w-[80%] mx-auto">
        {coverLetter && suggestions && (
          <div>
            <h3 className="text-3xl font-bold mb-4 text-mySkyBlue text-center">
              AI Suggested Cover Letter
            </h3>
            {/* Separate div for the editable cover letter */}
            <div className="bg-gray-100 p-4 rounded-xl shadow mt-8 text-sm">
              <div
                ref={editorRef}
                className="mb-6 p-4 bg-myWhite shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-mySkyBlue/40 rounded-lg text-gray-500"
              >
                <Editor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  toolbarClassName="toolbarClassName custom-toolbar-bg"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={{
                    options: [
                      "inline",
                      "list",
                      "textAlign",
                      "link",
                      "history",
                      "emoji",
                      "image",
                      "remove",
                      "colorPicker",
                    ],
                    inline: {
                      options: [
                        "italic",
                        "underline",
                        "strikethrough",
                        "monospace",
                        "superscript",
                        "subscript",
                      ],
                      bold: false,
                    },
                  }}
                />
                <style jsx global>{`
                  .custom-toolbar-bg {
                    background-color: #e5e7eb !important; /* Editbar background */
                    border-radius: 0.5rem;
                    border: none !important; /* Remove border */
                    display: flex;
                    gap: 0.5rem;
                    padding: 0.5rem;
                  }
                  .custom-toolbar-bg .rdw-option-wrapper {
                    background-color: #55cef6 !important; /* Editbar option background */
                    border-radius: 0.375rem;
                    border: none !important;
                    display: flex;
                    gap: 0.5rem;
                    padding: 0.5rem;
                  }
                  .custom-toolbar-bg .rdw-option-wrapper:hover,
                  .custom-toolbar-bg .rdw-option-active {
                    background-color: #5191a7 !important; /* Option hover/active */
                    display: flex;
                    gap: 0.5rem;
                    padding: 0.5rem;
                  }
                  .custom-toolbar-bg,
                  .custom-toolbar-bg .rdw-editor-toolbar {
                    border: none !important; /* Remove border from toolbar and its container */
                    box-shadow: none !important;
                    display: flex;
                    gap: 0.5rem;
                    padding: 0.5rem;
                  }
                `}</style>
              </div>
            </div>
            <button
              onClick={downloadPDF}
              className="mt-5 text-xl  flex items-center gap-2 py-1 px-4 rounded-lg text-white font-semibold bg-mySkyBlue/60 hover:bg-mySkyBlue  transition-all duration-300"
            >
              <MdFileDownload />
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiResumeAnalyzeReort;
