"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { motion, AnimatePresence } from "framer-motion";
import Template1 from "@/components/Template1";
import { useDropzone } from "react-dropzone";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Template1PDF from "@/components/pdf/Template1PDF";
import Template2PDF from "@/components/pdf/Template2PDF";
import Template3PDF from "@/components/pdf/Template3PDF";

import { IoSend } from "react-icons/io5";
import Template2 from "@/components/Template2";
import Template3 from "@/components/Template3";
import Template4 from "@/components/Template4";
import Template4PDF from "@/components/pdf/Template4PDF";

import { RgbColorPicker } from "react-colorful";

import { TiTick } from "react-icons/ti";
import Template5 from "@/components/Template5";
import Template5PDF from "@/components/pdf/Template5PDF";

import { Roboto } from "next/font/google";
import Template6 from "@/components/Template6";
import Template6PDF from "@/components/pdf/Template6PDF";
import Template7 from "@/components/Template7";
import Template7PDF from "@/components/pdf/Template7PDF";
import Template8 from "@/components/Template8";
import Template8PDF from "@/components/pdf/Template8PDF";
import Template9 from "@/components/Template9";
import Template9PDF from "@/components/pdf/Template9PDF";
import Template10 from "@/components/Template10";
import Template10PDF from "@/components/pdf/Template10PDF";
import { CarouselSize } from "@/components/Carousel";
// import user from "../../../models/user"; // Remove this line
const robot700 = Roboto({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const templateData = [
  { image: "/templates/template1.png", name: "Template 1", id: 1 },
  { image: "/templates/template2.png", name: "Template 2", id: 2 },
  { image: "/templates/template3.png", name: "Template 3", id: 3 },
  { image: "/templates/template4.png", name: "Template 4", id: 4 },
  { image: "/templates/template5.png", name: "Template 5", id: 5 },
  { image: "/templates/template6.png", name: "Template 6", id: 6 },
  { image: "/templates/template7.png", name: "Template 7", id: 7 },
  { image: "/templates/template8.png", name: "Template 8", id: 8 },
  { image: "/templates/template9.png", name: "Template 9", id: 9 },
  { image: "/templates/template10.png", name: "Template 10", id: 10 },
];

// for credits
import { useSession } from "next-auth/react";
import { useCredits } from "@/context/CreditsContext";
import { JobMatcherProvider, useJobMatcher } from "@/context/JobMatcherContext";

const AiPromptPage = () => {
  const {
    userName,
    setUserName,
    jobDescription,
    setJobDescription,
    selectedTemplate,
    setSelectedTemplate,
    resumeData,
    setResumeData,
    imageFile,
    setImageFile,
    previewUrl,
    setPreviewUrl,
    processedUrl,
    setProcessedUrl,
    selectedProcessedImage,
    setSelectedProcessedImage,
    selectedImageBgColor,
    setSelectedImageBgColor,
    // showColorPicker,
    // setShowColorPicker,
    color1,
    setColor1,
    color4,
    setColor4,
    color7,
    setColor7,
    color10,
    setColor10,
    promptHistory,
    setPromptHistory,
    showTemplate,
    setShowTemplate,
    isChatLoading,
    setIsChatLoading,
    isTemplateLoading,
    setIsTemplateLoading,
    hasRenderedTemplate,
    setHasRenderedTemplate,
  } = useJobMatcher();

  const [showColorPicker, setShowColorPicker] = useState(false);

  //   for generating Resume
  // const [userName, setUserName] = useState("");
  // const [jobDescription, setJobDescription] = useState("");
  // const [resumeData, setResumeData] = useState<any>(null);

  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [processedUrl, setProcessedUrl] = useState<string | null>(null);

  const [showEditor, setShowEditor] = useState(false);

  const [editType, setEditType] = useState<
    | "string"
    | "array"
    | "experience"
    | "projects"
    | "education"
    | "phone"
    | "email"
  >("string");
  const [editField, setEditField] = useState<
    "skills" | "languages" | "certifications" | null
  >(null);
  const [inputData, setInputData] = useState<string | string[] | number>([]);
  const [newItem, setNewItem] = useState("");
  const [currentStringField, setCurrentStringField] = useState<string | null>(
    null
  );
  const [currentArrayField, setCurrentArrayField] = useState<string | null>(
    null
  );

  // selected image state
  // const [selectedProcessedImage, setSelectedProcessedImage] = useState<
  //   string | null
  // >(null);
  // selected background color state
  // const [selectedImageBgColor, setSelectedImageBgColor] = useState<
  //   string | undefined
  // >(undefined);
  // selected theme state

  const tailwindColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3B82F6",
    "bg-white": "#FFFFFF",
    "bg-green-500": "#22C55E",
    "bg-gray-500": "#6B7280",
    "bg-yellow-500": "#F59E0B",
  };

  // for color picker
  // const [showColorPicker, setShowColorPicker] = useState(false);
  // const [color1, setColor1] = useState({ r: 40, g: 56, b: 74 }); // Default for Template 1
  // const [color4, setColor4] = useState({ r: 200, g: 150, b: 35 });
  // const [color7, setColor7] = useState({ r: 131, g: 123, b: 106 }); // Default for Template 4
  // const [color10, setColor10] = useState({ r: 131, g: 123, b: 106 });

  // for phone number
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  // for email
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [emailField, setEmailField] = useState<string | null>(null);

  // for experience field
  const [experienceData, setExperienceData] = useState<any[]>([]);
  const [currentExperienceField, setCurrentExperienceField] = useState<
    string | null
  >(null);

  // Project field
  const [projectData, setProjectData] = useState<any[]>([]);
  const [currentProjectField, setCurrentProjectField] = useState<string | null>(
    null
  );

  // Education field
  const [educationData, setEducationData] = useState<any[]>([]);
  const [currentEducationField, setCurrentEducationField] = useState<
    string | null
  >(null);

  // For multiple prompt
  // const [promptHistory, setPromptHistory] = useState<
  //   { type: "user" | "ai"; message: string }[]
  // >([]);

  // for loader
  // const [isChatLoading, setIsChatLoading] = useState(false);
  // const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  // const [hasRenderedTemplate, setHasRenderedTemplate] = useState(false);

  // For credits
  // const [credits, setCredits] = useState<number | null>(0);
  const { credit, setCredit } = useCredits();

  const { data: session } = useSession();
  const user = session?.user;

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleStringFieldClick = (fieldName: string, value: string) => {
    setInputData(value);
    setEditType("string");
    setShowEditor(true);
    setCurrentStringField(fieldName);
  };

  const handleStringFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setInputData(newValue);

    setResumeData((prev: any) => ({
      ...prev,
      [currentStringField as string]: newValue,
    }));
  };

  const handleArrayFieldClick = (fieldName: string, arrayData: string[]) => {
    setInputData(arrayData);
    setEditType("array");
    setShowEditor(true);
    setCurrentArrayField(fieldName);
  };
  const handleRemoveItem = (index: number) => {
    const updated = [...(inputData as string[])];
    updated.splice(index, 1);
    setInputData(updated);

    setResumeData((prev: any) => ({
      ...prev,
      [currentArrayField as string]: updated,
    }));
  };

  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    const updated = [...(inputData as string[]), newItem.trim()];
    setInputData(updated);
    setNewItem("");

    setResumeData((prev: any) => ({
      ...prev,
      [currentArrayField as string]: updated,
    }));
  };
  // for experience feild
  const handleExperienceFieldClick = (fieldName: string, arrayData: any[]) => {
    setExperienceData(arrayData);
    setCurrentExperienceField(fieldName);

    setEditType("experience");
    setShowEditor(true);
  };
  // for project field
  const handleProjectFieldClick = (fieldName: string, arrayData: any[]) => {
    setProjectData(arrayData);
    setCurrentProjectField(fieldName);
    // setCurrentExperienceField(null);    // 🧼 Reset
    // setCurrentEducationField(null);
    setEditType("projects");
    setShowEditor(true);
  };
  // Education field
  const handleEducationFieldClick = (fieldName: string, arrayData: any[]) => {
    setEducationData(arrayData);
    setCurrentEducationField(fieldName);
    // setCurrentExperienceField(null);    // 🧼 Reset
    // setCurrentProjectField(null);
    setEditType("education");
    setShowEditor(true);
  };

  // for phone number

  const handlePhoneClickFeild = (fieldName: string, data: number) => {
    setSelectedField(fieldName);
    setSelectedNumber(data);
    setEditType("phone");
    setShowEditor(true); // show modal
  };

  const handleEmailClickFeild = (fieldName: string, data: string) => {
    setEmailField(fieldName);
    setSelectedEmail(data);
    setEditType("email");
    setShowEditor(true); // show modal
  };

  useEffect(() => {
    if (resumeData) {
      //   console.log("Parsed Data:", resumeData);
    }
  }, [resumeData]);

  // for sending prompt
  const handleSendPrompt = async () => {
    if (!userName || !jobDescription || !selectedTemplate) {
      alert("Please enter your name and job description!");
      return;
    }
    setIsTemplateLoading(true);

    setIsChatLoading(true); // optional loader
    try {
      const res = await fetch("/api/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          jobDescription,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Something went wrong");
        return;
      }

      const data = await res.json(); // 👈 result yahan mil gaya
      console.log("API Response:", data);
      setResumeData(data); // Set the resume data
      setIsTemplateLoading(false);
      // You can store this in a state if needed
      // setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setShowTemplate(true); // Show template after fetching data
      setIsChatLoading(false);
      setIsTemplateLoading(false);
      if (!hasRenderedTemplate) setHasRenderedTemplate(true);
    }
  };

  const getTemplateId = (image: number) => {
    setSelectedTemplate(image);
    // setParsedData(dummyData);       // dummy data show karo
    // setShowTemplate(true);          // template ko show karo
    // setPromptHistory([]);           // optional: clear chat
  };

  const scrollToBottom = () => {
    const container = document.querySelector(".chat-container"); // add class below
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const renderSelectedTemplate = () => {
    if (selectedTemplate === 1)
      return (
        <Template1
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          color={color1}
        />
      );
    if (selectedTemplate === 2)
      return (
        <Template2
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
        />
      );
    if (selectedTemplate === 3)
      return (
        <Template3
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
        />
      );
    if (selectedTemplate === 4)
      return (
        <Template4
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
          imageBgColor={selectedImageBgColor}
          color={color4}
        />
      );
    if (selectedTemplate === 5)
      return (
        <Template5
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
        />
      );
    if (selectedTemplate === 6)
      return (
        <Template6
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
        />
      );
    if (selectedTemplate === 7)
      return (
        <Template7
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
          imageBgColor={selectedImageBgColor}
          color={color7}
        />
      );
    if (selectedTemplate === 8)
      return (
        <Template8
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
        />
      );
    if (selectedTemplate === 9)
      return (
        <Template9
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
          imageBgColor={selectedImageBgColor}
        />
      );
    if (selectedTemplate === 10)
      return (
        <Template10
          data={resumeData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          color={color10}
        />
      );

    return <p>Please select a template above.</p>;
  };

  // const [showTemplate, setShowTemplate] = useState(false);
  useEffect(() => {
    if (
      !resumeData &&
      !userName &&
      !jobDescription &&
      promptHistory.length === 0
    ) {
      setShowTemplate(false); // Only reset if no data at all
      setHasRenderedTemplate(false);
    }
  }, [
    resumeData,
    userName,
    jobDescription,
    promptHistory,
    setShowTemplate,
    setHasRenderedTemplate,
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [promptHistory]);

  console.log("Preview URL:", previewUrl);
  // console.log("phone", parsedData.phone);

  // for download button
  const handleDownloadPDF = async () => {
    if (!resumeData || !selectedTemplate) return;

    if (credit < 5) {
      alert("Not enough credits.");
      return;
    }

    let DocumentComponent;

    switch (selectedTemplate) {
      case 1:
        DocumentComponent = <Template1PDF data={resumeData} color={color1} />;
        break;
      case 2:
        DocumentComponent = <Template2PDF data={resumeData} />;
        break;
      case 3:
        DocumentComponent = <Template3PDF data={resumeData} />;
        break;
      case 4:
        DocumentComponent = (
          <Template4PDF
            data={resumeData}
            imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
            imageBgColor={
              selectedImageBgColor
                ? tailwindColorMap[selectedImageBgColor]
                : undefined
            }
            color={color4}
          />
        );
        break;
      case 5:
        DocumentComponent = <Template5PDF data={resumeData} />;
        break;
      case 6:
        DocumentComponent = <Template6PDF data={resumeData} />;
        break;
      case 7:
        DocumentComponent = (
          <Template7PDF
            data={resumeData}
            imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
            imageBgColor={
              selectedImageBgColor
                ? tailwindColorMap[selectedImageBgColor]
                : undefined
            }
            color={color7}
          />
        );
        break;
      case 8:
        DocumentComponent = <Template8PDF data={resumeData} />;
        break;
      case 9:
        DocumentComponent = (
          <Template9PDF
            data={resumeData}
            imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
            imageBgColor={
              selectedImageBgColor
                ? tailwindColorMap[selectedImageBgColor]
                : undefined
            }
          />
        );
        break;
      case 10:
        DocumentComponent = <Template10PDF data={resumeData} color={color10} />;
        break;
      default:
        alert("Invalid template selected");
        return;
    }

    try {
      const blob = await pdf(DocumentComponent).toBlob();

      // Download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      // Deduct credits
      const res = await fetch("/api/credits/deduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, amount: -5 }),
      });

      if (!res.ok) throw new Error("Failed to deduct credits");

      // Update local credit state
      const creditData = await res.json();
      setCredit(creditData.credits);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed");
    }
  };

  return (
    <div
      className="px-[30px] py-[60px] mx-auto min-h-screen"
      // style={{ background: "linear-gradient(to right, #f3f4f6, #e5e7eb)" }}
    >
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
              Job-Tailored
            </span>
            <br />
            <span className="text-black">Resume Generator</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Paste any job description and get a perfectly tailored resume that
            matches the requirements.
          </p>
        </div>
      </section>

      {/* Select Template */}
      <div className="grid lg:grid-cols-12 grid-cols-1  lg:h-[350px]  mb-10">
        {/* Upload Image */}

        <div className="col-span-4 flex flex-col justify-center gap-2">
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full border-2 border-white overflow-hidden mb-3">
              {previewUrl ? (
                <Image
                  width={158}
                  height={158}
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                  No Image
                </div>
              )}
            </div>

            {/* Dropzone uploader */}
            <div
              {...getRootProps()}
              className="text-center cursor-pointer border border-dashed border-gray-400 rounded-md p-2 hover:bg-white/10 transition-all"
            >
              <input {...getInputProps()} />
              <p className="text-xs text-gray-300">
                {isDragActive
                  ? "Drop the image here..."
                  : "Click or drag an image to upload"}
              </p>
            </div>
          </div>

          <Button
            className="bg-mySkyBlue/60 hover:bg-mySkyBlue font-bold text-white mx-auto "
            onClick={async () => {
              if (!imageFile) return alert("Please upload an image!");

              const fd = new FormData();
              fd.append("image", imageFile);

              const res = await fetch("/api/process-image", {
                method: "POST",
                body: fd,
              });

              const json = await res.json();

              if (json.url) {
                setProcessedUrl(json.url); // set processed image (no bg + colored bg)
              } else {
                alert("Failed to process image");
              }
            }}
          >
            Remove BG
          </Button>

          {processedUrl && (
            <div className="lg:grid grid-cols-5 flex items-center justify-center gap-2 w-[100%] mx-auto flex-wrap mt-2 mb-2">
              {/* Original Image */}
              <div
                onClick={() => {
                  setSelectedProcessedImage(previewUrl);
                  setSelectedImageBgColor(undefined); // Reset background color on click
                }}
                className={`w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedProcessedImage === previewUrl && !selectedImageBgColor
                    ? "ring-4 ring-mySkyBlue"
                    : ""
                }`}
              >
                <Image
                  src={previewUrl ?? "/dummy.jpg"}
                  width={170}
                  height={170}
                  alt="Original"
                  className="object-contain"
                />
              </div>
              {/* Processed Images (with colored backgrounds) */}
              {[
                "bg-blue-500",
                "bg-white",
                "bg-green-500",
                "bg-gray-500",
                "bg-yellow-600",
                "bg-black",
                "bg-purple-500",
                "bg-yellow-300",
                "bg-[#28384a]",
              ].map((bg, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedProcessedImage(processedUrl);
                    setSelectedImageBgColor(bg); // Set background color on click
                  }}
                  className={`w-[50px] h-[50px] rounded-full ${bg} flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedProcessedImage === processedUrl &&
                    selectedImageBgColor === bg
                      ? "ring-4 ring-mySkyBlue"
                      : ""
                  }`}
                >
                  <Image
                    src={processedUrl}
                    width={160}
                    height={160}
                    alt={`Processed Image ${index}`}
                    className="object-fill mt-4"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-8 flex items-center justify-center lg:mt-0 mt-5">
          <CarouselSize
            array={templateData}
            getTemplateId={(id) => setSelectedTemplate(id)}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </div>

      <div className="py-8 px-4 grid lg:grid-cols-12 grid-cols-1 gap-[40px]">
        <div className="col-span-4">
          <div className="text-center lg:text-left mb-5">
            <h2 className="text-3xl font-bold mb-4 text-mySkyBlue">
              Job Description
            </h2>
            <p className="text-lg text-gray-500">
              Paste the complete job posting for optimal results
            </p>
          </div>

          {/* <h1 className="text-mySkyBlue font-bold text-lg text-center mt-5 mb-5">
            Please fill the details
          </h1> */}

          <div className="flex flex-col gap-4 justify-center items-center mt-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              required
              className="text-gray-500 w-[100%] border border-mySkyBlue py-1 px-2 rounded-xl focus:outline-none"
            />
            <textarea
              placeholder="Job Description"
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="text-gray-500 w-[100%] h-[220px] border border-mySkyBlue py-1 px-2 rounded-xl focus:outline-none resize-none"
              rows={4}
            ></textarea>

            <button
              className="bg-mySkyBlue/50 hover:bg-mySkyBlue w-[100%] text-white font-bold py-1 px-5 rounded-lg"
              onClick={handleSendPrompt}
              disabled={isTemplateLoading}
            >
              {isTemplateLoading ? "Generating..." : "Create"}
            </button>
          </div>
        </div>

        <div className="col-span-8">
          <div className="flex items-center justify-between">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4 text-mySkyBlue">
                Tailored Resume
              </h2>
              <p className="text-lg text-gray-500">
                AI-optimized to match job requirements
              </p>
            </div>

            <div className="flex items-end justify-center gap-2">
              <div className="relative mt-10 flex flex-col items-center">
                {/* Theme Selection Section */}
                {(selectedTemplate === 4 ||
                  selectedTemplate === 1 ||
                  selectedTemplate === 7 ||
                  selectedTemplate === 10) && (
                  <button
                    className="bg-mySkyBlue/50 hover:bg-mySkyBlue font-bold text-white px-5 py-2 rounded-lg"
                    onClick={() => setShowColorPicker((prev) => !prev)}
                  >
                    Choose Color
                  </button>
                )}

                <AnimatePresence>
                  {showColorPicker &&
                    (selectedTemplate === 4 ||
                      selectedTemplate === 1 ||
                      selectedTemplate === 7 ||
                      selectedTemplate === 10) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }} // shuru main halka upar aur hidden
                        animate={{ opacity: 1, y: 0 }} // show hote waqt neeche slide + fade in
                        exit={{ opacity: 0, y: -10 }} // hide hote waqt upar slide + fade out
                        transition={{ duration: 0.3 }}
                        className="absolute top-[30px]  w-60 rounded-xl p-4"
                      >
                        {/* <ColorPicker/> */}
                        <RgbColorPicker
                          color={
                            selectedTemplate === 1
                              ? color1
                              : selectedTemplate === 4
                              ? color4
                              : selectedTemplate === 7
                              ? color7
                              : selectedTemplate === 10
                              ? color10
                              : color1 // fallback
                          }
                          onChange={
                            selectedTemplate === 1
                              ? setColor1
                              : selectedTemplate === 4
                              ? setColor4
                              : selectedTemplate === 7
                              ? setColor7
                              : selectedTemplate === 10
                              ? setColor10
                              : setColor1 // fallback
                          }
                        />
                        {/* <div className="value">{JSON.stringify(color)}</div> */}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              {/* {showTemplate && parsedData && ( */}
              <button
                onClick={handleDownloadPDF}
                disabled={credit < 5}
                className="bg-mySkyBlue/50 mt-5 hover:bg-mySkyBlue text-white font-bold px-5 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
              >
                Download PDF
              </button>
              {/* )} */}
            </div>
          </div>

          {!isTemplateLoading && !hasRenderedTemplate ? (
            <div className="w-[100%] bg-gray-200 mt-2 h-[350px] flex flex-col items-center justify-center rounded-lg">
              <Briefcase size={40} className="text-gray-500" />
              <p className="text-lg text-gray-500">
                Paste a job description to generate a tailored resume
              </p>
            </div>
          ) : isTemplateLoading && !hasRenderedTemplate ? (
            <div className="flex flex-col gap-1 justify-center items-center h-[350px]">
              <svg
                className="animate-spin"
                width="48"
                height="48"
                viewBox="0 0 50 50"
              >
                <circle
                  className="opacity-20"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="8"
                />
                <circle
                  className="opacity-100"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke="#55CEF6"
                  strokeWidth="8"
                  strokeDasharray="90"
                  strokeDashoffset="30"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-sm text-mySkyBlue">Generating Resume...</p>
            </div>
          ) : (
            showTemplate &&
            resumeData && (
              <div>
                <div className="mt-5">{renderSelectedTemplate()}</div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mock Interview Q & A */}
      {showTemplate && resumeData && (
        <div className="mt-5">
          {resumeData.mockInterview.map((item: any, index: number) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
              <h3 className="text-lg font-semibold text-mySkyBlue">
                {`Q${index}: ${item.question}`}
              </h3>
              <p className="text-gray-700">
                <span className="text-lg font-semibold text-mySkyBlue">
                  Ans:{" "}
                </span>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      )}

      {showEditor && (
        <div
          className={`fixed top-0 right-0 h-full w-[400px] bg-myWhite shadow-lg z-50 transition-transform duration-500 ease-in-out transform ${
            showEditor ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black">
              {/* {editType === "summary" ? "Edit Summary" : "Edit Skills"} */}
              Editor
            </h2>

            {/* Summary Textarea */}
            {editType === "string" && (
              <>
                <textarea
                  value={inputData as string}
                  onChange={handleStringFieldChange}
                  className="w-full h-[100px] resize-none border border-primaryColor rounded-md p-2 text-black bg-transparent"
                />
              </>
            )}

            {/* Skills Badge UI */}
            {editType === "array" && (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(inputData as string[]).map((item, i) => (
                    <span
                      key={i}
                      className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {item}
                      <button
                        onClick={() => handleRemoveItem(i)}
                        className="ml-2 text-gray-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new"
                    className="flex-1 p-2 border border-primaryColor rounded text-black"
                  />
                  <Button
                    onClick={handleAddItem}
                    className="bg-myDarkBlue text-white hover:bg-myDarkBlue"
                  >
                    Add
                  </Button>
                </div>
              </>
            )}

            {/* Experience */}
            {editType === "experience" && (
              <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 text-black">
                  Edit Experience
                </h2>

                {experienceData.map((exp, index) => (
                  <div
                    key={index}
                    className="mb-6 border p-3 rounded-md bg-gray-100"
                  >
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => {
                        const updated = [...experienceData];
                        updated[index].title = e.target.value;
                        setExperienceData(updated);
                      }}
                      placeholder="Title"
                      className="w-full p-2 mb-2 border text-black"
                    />
                    <textarea
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...experienceData];
                        updated[index].description = e.target.value;
                        setExperienceData(updated);
                      }}
                      placeholder="Description"
                      className="w-full p-2 mb-2 border text-black"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => {
                          const updated = [...experienceData];
                          updated[index].startDate = e.target.value;
                          setExperienceData(updated);
                        }}
                        placeholder="Start Date"
                        className=" p-2 border text-black"
                      />
                      <input
                        type="text"
                        value={
                          exp.endDate === "Currently working" ? "" : exp.endDate
                        }
                        onChange={(e) => {
                          const updated = [...experienceData];
                          updated[index].endDate = e.target.value;
                          setExperienceData(updated);
                        }}
                        placeholder="End Date"
                        className="p-2 border text-black"
                        disabled={exp.endDate === "Currently working"}
                      />
                      {/* current employer */}
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`currentEmployer-${index}`}
                          className="text-black"
                        >
                          Current Employer
                        </label>
                        <input
                          type="checkbox"
                          id={`currentEmployer-${index}`}
                          checked={exp.endDate === "Currently working"}
                          onChange={(e) => {
                            const updated = [...experienceData];
                            if (e.target.checked) {
                              updated[index].endDate = "Currently working";
                            } else {
                              updated[index].endDate = "";
                            }
                            setExperienceData(updated);
                          }}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        const updated = [...experienceData];
                        updated.splice(index, 1);
                        setExperienceData(updated);
                      }}
                      className="bg-red-600 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                {/* Add new experience */}
                <Button
                  onClick={() => {
                    const updated = [
                      ...experienceData,
                      {
                        title: "",
                        description: "",
                        startDate: "",
                        endDate: "",
                      },
                    ];
                    setExperienceData(updated);
                  }}
                  className="bg-green-600 text-white mt-4"
                >
                  + Add Experience
                </Button>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-myDarkBlue text-white px-4 py-2 rounded"
                    onClick={() => {
                      setResumeData((prev: any) => ({
                        ...prev,
                        [currentExperienceField as string]: experienceData,
                      }));
                      setShowEditor(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Project */}
            {editType === "projects" && (
              <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 text-black">
                  Edit Projects
                </h2>

                {projectData.map((proj, index) => (
                  <div
                    key={index}
                    className="mb-6 border p-3 rounded-md bg-gray-100"
                  >
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => {
                        const updated = [...projectData];
                        updated[index].name = e.target.value;
                        setProjectData(updated);
                      }}
                      placeholder="Project Name"
                      className="w-full p-2 mb-2 border text-black"
                    />
                    <textarea
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...projectData];
                        updated[index].description = e.target.value;
                        setProjectData(updated);
                      }}
                      placeholder="Description"
                      className="w-full p-2 mb-2 border text-black"
                    />
                    <input
                      type="text"
                      value={proj.github}
                      onChange={(e) => {
                        const updated = [...projectData];
                        updated[index].github = e.target.value;
                        setProjectData(updated);
                      }}
                      placeholder="GitHub Link"
                      className="w-full p-2 mb-2 border text-black"
                    />
                    <input
                      type="text"
                      value={proj.live}
                      onChange={(e) => {
                        const updated = [...projectData];
                        updated[index].live = e.target.value;
                        setProjectData(updated);
                      }}
                      placeholder="Live Link"
                      className="w-full p-2 mb-2 border text-black"
                    />
                    <Button
                      onClick={() => {
                        const updated = [...projectData];
                        updated.splice(index, 1);
                        setProjectData(updated);
                      }}
                      className="bg-red-600 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  onClick={() => {
                    const updated = [
                      ...projectData,
                      {
                        name: "",
                        description: "",
                        github: "",
                        live: "",
                      },
                    ];
                    setProjectData(updated);
                  }}
                  className="bg-green-600 text-white mt-4"
                >
                  + Add Project
                </Button>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-myDarkBlue text-white px-4 py-2 rounded"
                    onClick={() => {
                      setResumeData((prev: any) => ({
                        ...prev,
                        [currentProjectField as string]: projectData,
                      }));
                      setShowEditor(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Education */}
            {editType === "education" && (
              <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 text-black">
                  Edit Education
                </h2>

                {educationData.map((edu, index) => (
                  <div
                    key={index}
                    className="mb-6 border p-3 rounded-md bg-gray-100"
                  >
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...educationData];
                        updated[index].degree = e.target.value;
                        setEducationData(updated);
                      }}
                      placeholder="Degree"
                      className="w-full p-2 mb-2 border text-black"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => {
                          const updated = [...educationData];
                          updated[index].startDate = e.target.value;
                          setEducationData(updated);
                        }}
                        placeholder="Start Date"
                        className="flex-1 p-2 mb-2 border text-black"
                      />
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => {
                          const updated = [...educationData];
                          updated[index].endDate = e.target.value;
                          setEducationData(updated);
                        }}
                        placeholder="End Date"
                        className="flex-1 p-2 mb-2 border text-black"
                      />
                    </div>
                    <Button
                      onClick={() => {
                        const updated = [...educationData];
                        updated.splice(index, 1);
                        setEducationData(updated);
                      }}
                      className="bg-red-600 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  onClick={() => {
                    const updated = [
                      ...educationData,
                      {
                        degree: "",
                        startDate: "",
                        endDate: "",
                      },
                    ];
                    setEducationData(updated);
                  }}
                  className="bg-green-600 text-white mt-4"
                >
                  + Add Education
                </Button>

                <div className="flex justify-end mt-4">
                  <button
                    className="bg-myDarkBlue text-white px-4 py-2 rounded"
                    onClick={() => {
                      setResumeData((prev: any) => ({
                        ...prev,
                        [currentEducationField as string]: educationData,
                      }));
                      // setCurrentEducationField(null);
                      // setCurrentProjectField(null);
                      // setCurrentExperienceField(null)
                      setShowEditor(false);
                    }}
                  >
                    Save & Close
                  </button>
                </div>
              </div>
            )}
            {/* Phone Number Editor */}
            {/* Email Editor */}
            {editType === "email" && (
              <div className="p-6">
                <h2 className="text-lg font-bold mb-4 text-black">
                  Edit Email
                </h2>

                <input
                  type="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded mb-4 text-black"
                  value={selectedEmail ?? ""}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  placeholder="Enter your Email"
                />

                <div className="flex justify-end gap-2">
                  {/* <button
                      className="px-4 py-2 bg-gray-300 rounded text-black"
                      onClick={() => setShowEditor(false)}
                    >
                      Cancel
                    </button> */}
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => {
                      if (emailField && selectedEmail !== null) {
                        setResumeData((prev: any) => ({
                          ...prev,
                          [emailField]: selectedEmail,
                        }));
                      }
                      setShowEditor(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* Phone Editor */}
            {editType === "phone" && (
              <div className="p-6">
                <h2 className="text-lg font-bold mb-4 text-black">
                  Edit Phone Number
                </h2>

                <input
                  type="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded mb-4 text-black"
                  value={selectedNumber ?? ""}
                  onChange={(e) => setSelectedNumber(Number(e.target.value))}
                  placeholder="Enter your number"
                />

                <div className="flex justify-end gap-2">
                  {/* <button
                      className="px-4 py-2 bg-gray-300 rounded text-black"
                      onClick={() => setShowEditor(false)}
                    >
                      Cancel
                    </button> */}
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => {
                      if (selectedField && selectedNumber !== null) {
                        setResumeData((prev: any) => ({
                          ...prev,
                          [selectedField]: selectedNumber,
                        }));
                      }
                      setShowEditor(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="bg-myDarkBlue text-white px-4 py-2 rounded"
                onClick={() => setShowEditor(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Button */}
    </div>
  );
};

export default AiPromptPage;
