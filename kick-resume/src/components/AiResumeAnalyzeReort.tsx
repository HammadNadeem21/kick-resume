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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ContentState,
  convertFromRaw,
  EditorState,
  convertToRaw,
} from "draft-js";
import { pdf } from "@react-pdf/renderer";
import CoverLetterPDF from "./pdf/CoverLetterPDF";
import { MdFileDownload } from "react-icons/md";
import SectionScoreChart from "./sectionScoreChart";
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
    h1: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <h1
        className="text-xl font-bold text-primaryColor mt-4 mb-2"
        {...props}
      />
    ),

    h2: ({ node, ...props }: { node: any; [key: string]: any }) => {
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

    h3: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <h3
        className="text-2xl font-medium text-primaryColor mt-4 mb-2"
        {...props}
      />
    ),

    strong: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <strong className="text-myMidblue text-lg font-[400]" {...props} />
    ),

    ul: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <ul className="list-disc pl-5 text-myMidblue space-y-1" {...props} />
    ),

    li: ({ node, ...props }: { node: any; [key: string]: any }) => {
      const content = props.children[0];
      const isImportant =
        typeof content === "string" &&
        content.toLowerCase().includes("missing");

      return (
        <li
          className={`text-myMidblue ${
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
          <div className="mt-6 p-6 bg-myMidblue rounded-xl w-full">
            <h3 className="text-3xl font-bold mb-4 text-primaryColor text-center">
              Resume Analysis
            </h3>

            {/* ATS Score Chart and Summary */}
            {score !== null && overall && (
              <div className="mb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between px-6">
                <div className="sm:w-1/2 w-full flex flex-col">
                  <h4 className="text-xl font-bold text-primaryColor mb-1">
                    Overall ATS Score
                  </h4>
                  <ATSCircleChart score={score} />
                </div>
                <div className="sm:w-1/2 w-full text-primaryColor">
                  <h4 className="text-xl font-bold mb-2">Summary</h4>
                  <p className="">{overall}</p>
                </div>
              </div>
            )}
            <div className="h-[1px] w-full bg-primaryColor mb-5"></div>

            <h4 className="text-2xl font-bold text-primaryColor mb-4">
              AI Suggested Updates
            </h4>

            {/* Suggestion */}
            {actualSummary && (
              <div className="mb-8 text-primaryColor">
                <h4 className="text-xl font-bold mb-4">Actual Summary</h4>
                <div>{actualSummary}</div>
              </div>
            )}

            {/* summary mistakes  */}
            {summaryMistakes && (
              <div className="mb-8 text-primaryColor">
                <h4 className="text-xl font-bold  mb-4">Mistakes:</h4>
                <div>{summaryMistakes}</div>
              </div>
            )}

            {/* improved summary */}
            {improvedSummary && (
              <div className="mb-8 text-primaryColor">
                <h4 className="text-xl font-bold mb-4">Improvements:</h4>
                <div>{improvedSummary}</div>
              </div>
            )}

            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              {/* Keywords Section */}
              <div className="bg-primaryColor p-6 rounded-xl shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-primaryColor">
                {keywords && (
                  <div className="mb-6 text-myMidblue">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-2xl font-bold  mb-2 flex items-center">
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
                        <SectionScoreChart score={keywordsScore}/>

                    </div>

                    <div>
                      <ReactMarkdown
                        components={markdownComponents as any}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {keywords}
                      </ReactMarkdown>
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
              <div className="bg-primaryColor p-6 rounded-xl shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-primaryColor">
                {formatting && (
                  <div className="mb-6 text-myMidblue">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold  mb-2 flex items-center">
                        <IoIosInformationCircle className="inline mr-2" />
                        Formating
                      </h4>
                      <div className="relative w-[70px] h-[70px]">
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
                      </div>
                    </div>

                    <div className="">
                      <ReactMarkdown
                        components={markdownComponents as any}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {formatting}
                      </ReactMarkdown>
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
              <div className="bg-primaryColor p-6 rounded-xl shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-primaryColor">
                {education && (
                  <div className="mb-6 text-myMidblue">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold  mb-2 flex items-center">
                        <IoSchoolSharp className="inline mr-2" />
                        Education
                      </h4>
                      <div className="relative w-[70px] h-[70px]">
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
                              educationScore !== null &&
                              educationScore !== undefined
                                ? educationScore <= 50
                                  ? "text-red-500"
                                  : educationScore < 70
                                  ? "text-yellow-500"
                                  : "text-green-500"
                                : "text-gray-400"
                            }
                            strokeWidth="4"
                            strokeDasharray={`${educationScore}, 100`}
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-myMidblue">
                          {educationScore}/100
                        </span>
                      </div>
                    </div>

                    <div className="">
                      <ReactMarkdown
                        components={markdownComponents as any}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {education}
                      </ReactMarkdown>
                    </div>
                    {/* <AccordionSection title="">
                  <ReactMarkdown
                    components={markdownComponents as any}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {education}
                  </ReactMarkdown>
                </AccordionSection> */}
                  </div>
                )}
              </div>

              {/* <div className="h-[1px] w-full bg-myMidblue mb-5"></div> */}

              {/* Experience Section */}
              <div className="bg-primaryColor p-6 rounded-xl shadow-[0px_0px_20px_5px_rgba(66,_220,_219,_0.5)] shadow-primaryColor">
                {experience && (
                  <div className="mb-6 text-myMidblue">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold  mb-2 flex items-center">
                        <GrUserExpert className="inline mr-2" />
                        Experience
                      </h4>
                      <div className="relative w-[70px] h-[70px]">
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
                              experienceScore !== null &&
                              experienceScore !== undefined
                                ? experienceScore <= 50
                                  ? "text-red-500"
                                  : experienceScore < 70
                                  ? "text-yellow-500"
                                  : "text-green-500"
                                : "text-gray-400"
                            }
                            strokeWidth="4"
                            strokeDasharray={`${experienceScore}, 100`}
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-myMidblue">
                          {experienceScore}/100
                        </span>
                      </div>
                    </div>

                    <div className="">
                      <ReactMarkdown
                        components={markdownComponents as any}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {experience}
                      </ReactMarkdown>
                    </div>
                    {/* <AccordionSection title="">
                  <ReactMarkdown
                    components={markdownComponents as any}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {experience}
                  </ReactMarkdown>
                </AccordionSection> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl">
        {coverLetter && suggestions && (
          <div>
            <h3 className="text-3xl font-bold mb-4 text-myMidblue text-center">
              AI Suggested Cover Letter
            </h3>
            {/* Separate div for the editable cover letter */}
            <div className="bg-myMidblue p-4 rounded-xl shadow mt-8 text-xl">
              <div
                ref={editorRef}
                className="mb-6 p-4 bg-myDarkBlue rounded-lg text-myLightBlue"
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
                    background-color: #022c3a !important; /* Editbar background */
                    border-radius: 0.5rem;
                    border: none !important; /* Remove border */
                  }
                  .custom-toolbar-bg .rdw-option-wrapper {
                    background-color: #225566 !important; /* Editbar option background */
                    border-radius: 0.375rem;
                    border: none !important;
                  }
                  .custom-toolbar-bg .rdw-option-wrapper:hover,
                  .custom-toolbar-bg .rdw-option-active {
                    background-color: #5191a7 !important; /* Option hover/active */
                  }
                  .custom-toolbar-bg,
                  .custom-toolbar-bg .rdw-editor-toolbar {
                    border: none !important; /* Remove border from toolbar and its container */
                    box-shadow: none !important;
                  }
                `}</style>
              </div>
            </div>
            <button
              onClick={downloadPDF}
              className="px-5 py-3 mt-5 hover:bg-myMidblue/30 rounded-xl text-myMidblue font-bold text-xl border border-myMidblue transition duration-300 ease-in-out flex items-center gap-2"
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
