"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Briefcase, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { pdf } from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";

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
import { DatePicker } from "@/components/DatePicker";
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
import { useAiResumeBuilder } from "@/context/AiResumeBuilder";
import { calculateCreditFromTokens } from "../../../utils/commonHelpers";
import { SelectButton } from "@/components/SelectButton";
import CustomSection from "@/components/CustomSection/CustomSection";

const AiPromptPage = () => {
  const {
    parsedData,
    setParsedData,
    imageFile,
    setImageFile,
    previewUrl,
    setPreviewUrl,
    processedUrl,
    setProcessedUrl,
    userPrompt,
    setUserPrompt,
    selectedTemplate,
    setSelectedTemplate,
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
    selectedProcessedImage,
    setSelectedProcessedImage,
    selectedImageBgColor,
    setSelectedImageBgColor,
    color1,
    setColor1,
    color4,
    setColor4,
    color7,
    setColor7,
    color10,
    setColor10,
  } = useAiResumeBuilder();

  const [showEditor, setShowEditor] = useState(false);

  const [editType, setEditType] = useState<
    | "string"
    | "array"
    | "experience"
    | "projects"
    | "education"
    | "phone"
    | "email"
    | "personal"
    | "customSection"
    | "customSection2"
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
  const [showColorPicker, setShowColorPicker] = useState(false);
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

  //Personal Information field (array of { title, value })
  const [personalInfoData, setPersonalInfoData] = useState<
    Array<{ title: string; value: string }>
  >([]);
  const [currentPersonalField, setCurrentPersonalField] = useState<
    string | null
  >(null);

  // Custom Section field (array of { title, value })
  const [customSectionData, setCustomSectionData] = useState<
    Array<{ title: string; value: string[] }>
  >([]);
  const [currentcustomField, setCurrentCustomField] = useState<string | null>(
    null
  );

  // Custom Section 2 field (array of { title, value })
  const [customSection2Data, setCustomSection2Data] = useState<
    Array<{ title: string; value: string[] }>
  >([]);
  const [currentcustom2Field, setCurrentCustom2Field] = useState<string | null>(
    null
  );

  const { credit, setCredit } = useCredits();

  const { data: session } = useSession();
  const user = session?.user;

  const handleGenerate = async () => {
    if (!userPrompt || !selectedTemplate) {
      alert("Please write a prompt and select a template!");
      return;
    }

    try {
      setIsChatLoading(true);
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userPrompt,
          existingResume: parsedData || {}, // ✅ ye zaroor hona chahiye
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Something went wrong");
        setIsChatLoading(false);
        return;
      }

      const data = await res.json();

      // Ensure certifications is always an array of strings
      if (data.certifications && Array.isArray(data.certifications)) {
        data.certifications = data.certifications.map((item: any) =>
          typeof item === "string"
            ? item
            : [item.name, item.authority, item.date].filter(Boolean).join(" - ")
        );
      }

      // ✅ Add both user and AI messages to chat
      setPromptHistory((prev) => [
        ...prev,
        { type: "user", message: userPrompt },
        { type: "ai", message: "✅ Resume created successfully!" },
      ]);

      setParsedData(data);
      setShowTemplate(true);
      setUserPrompt(""); // Clear field
      setIsChatLoading(false);
    } catch (error) {
      setIsChatLoading(false);
      console.log("Error", error);
    }
  };

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

    setParsedData((prev: any) => ({
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

    setParsedData((prev: any) => ({
      ...prev,
      [currentArrayField as string]: updated,
    }));
  };

  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    const updated = [...(inputData as string[]), newItem.trim()];
    setInputData(updated);
    setNewItem("");

    setParsedData((prev: any) => ({
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

  // Personal Information click
  const handlePersonalInformationClick = (
    fieldName: string,
    arrayData: Array<{ title: string; value: string }>
  ) => {
    setPersonalInfoData(arrayData ?? []);
    setCurrentPersonalField(fieldName);
    setEditType("personal");
    setShowEditor(true);
  };

  // Custom Section click
  const handleCustomFieldClick = (
    fieldName: string,
    arrayData: Array<{ title: string; value: string[] }>
  ) => {
    setCustomSectionData(arrayData ?? []);
    setCurrentCustomField(fieldName);
    setEditType("customSection");
    setShowEditor(true);
  };

  // Custom Section click
  const handleCustom2FieldClick = (
    fieldName: string,
    arrayData: Array<{ title: string; value: string[] }>
  ) => {
    setCustomSection2Data(arrayData ?? []);
    setCurrentCustom2Field(fieldName);
    setEditType("customSection2");
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
    if (parsedData) {
      console.log("Parsed Data:", parsedData);
    }
  }, [parsedData]);

  // for sending prompt
  const handleSendPrompt = async () => {
    if (!userPrompt || !selectedTemplate) {
      alert("Please enter a prompt and select a template!");
      return;
    }
    setIsChatLoading(true);
    setIsTemplateLoading(true); // <-- start spinner

    setPromptHistory((prev) => [
      ...prev,
      { type: "user", message: userPrompt },
    ]);

    const res = await fetch("/api/generate-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: userPrompt,
        existingResume: parsedData || {},
      }),
    });

    console.log("response received from /api/generate-resume", res.body);

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Something went wrong");
      setIsChatLoading(false);
      setIsTemplateLoading(false); // <-- stop spinner
      return;
    }

    const data = await res.json();
    console.log("Response Data:", data);

    // Ensure certifications is always an array of strings
    if (data.certifications && Array.isArray(data.certifications)) {
      data.certifications = data.certifications.map((item: any) =>
        typeof item === "string"
          ? item
          : [item.name, item.authority, item.date].filter(Boolean).join(" - ")
      );
    }

    const { totalTokenCount } = data?.tokensUsed;

    const creditRes = await fetch("/api/credits/deduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session?.user?.email,
        amount: calculateCreditFromTokens(totalTokenCount),
      }),
    });

    if (!creditRes.ok) {
      const creditErr = await creditRes.json();
      alert("Resume sent, but failed to deduct credits: " + creditErr.error);
    } else {
      const creditData = await creditRes.json();
      setCredit(creditData.credits); // 👈 Update credits state
    }

    setShowTemplate(true);
    setUserPrompt(""); // Clear input

    // 2. AI response message
    setPromptHistory((prev) => [
      ...prev,
      { type: "ai", message: "Resume updated successfully!" },
    ]);
    setParsedData(data);
    setIsChatLoading(false);
    setIsTemplateLoading(false); // <-- stop spinner
    if (!hasRenderedTemplate) setHasRenderedTemplate(true);
  };

  const getTemplateId = (image: number) => {
    setSelectedTemplate(image);
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
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          color={color1}
        />
      );
    if (selectedTemplate === 2)
      return (
        <Template2
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          handleCustomSection2Click={handleCustom2FieldClick}
        />
      );
    if (selectedTemplate === 3)
      return (
        <Template3
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          handleCustomSection2Click={handleCustom2FieldClick}
        />
      );
    if (selectedTemplate === 4)
      return (
        <Template4
          data={parsedData}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
        />
      );
    if (selectedTemplate === 5)
      return (
        <Template5
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
        />
      );
    if (selectedTemplate === 6)
      return (
        <Template6
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
        />
      );
    if (selectedTemplate === 7)
      return (
        <Template7
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
          imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
          imageBgColor={selectedImageBgColor}
          color={color7}
        />
      );
    if (selectedTemplate === 8)
      return (
        <Template8
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
        />
      );
    if (selectedTemplate === 9)
      return (
        <Template9
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
          imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
          imageBgColor={selectedImageBgColor}
        />
      );
    if (selectedTemplate === 10)
      return (
        <Template10
          data={parsedData}
          handleStringFeildClick={handleStringFieldClick}
          handleArrayFieldClick={handleArrayFieldClick}
          handleExperienceFieldClick={handleExperienceFieldClick}
          handleProjectFieldClick={handleProjectFieldClick}
          handleEducationFieldClick={handleEducationFieldClick}
          handlePhoneClickFeild={handlePhoneClickFeild}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePersonalInformationClick={handlePersonalInformationClick}
          color={color10}
        />
      );

    return <p>Please select a template above.</p>;
  };

  // const [showTemplate, setShowTemplate] = useState(false);
  useEffect(() => {
    // setShowTemplate(false); // Reset jab prompt ya template change ho
    if (!parsedData && !userPrompt && promptHistory.length === 0) {
      setShowTemplate(false); // Only reset if no data at all
      setHasRenderedTemplate(false);
    }
  }, [
    parsedData,
    userPrompt,
    promptHistory,
    setShowTemplate,
    setHasRenderedTemplate,
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [promptHistory]);

  // List Change
  const handleListChange = (data: string[]) => {
    const newList = data;
    setInputData(newList);
  };

  console.log("Preview URL:", previewUrl);
  // console.log("phone", parsedData.phone);

  // for download button
  const handleDownloadPDF = async () => {
    if (!parsedData || !selectedTemplate) return;

    if (credit < 5) {
      alert("Not enough credits.");
      return;
    }

    let DocumentComponent;

    switch (selectedTemplate) {
      case 1:
        DocumentComponent = (
          <Template1PDF size={pageSize} data={parsedData} color={color1} />
        );
        break;
      case 2:
        DocumentComponent = <Template2PDF size={pageSize} data={parsedData} />;
        break;
      case 3:
        DocumentComponent = <Template3PDF size={pageSize} data={parsedData} />;
        break;
      case 4:
        DocumentComponent = (
          <Template4PDF
            data={parsedData}
            imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
            imageBgColor={
              selectedImageBgColor
                ? tailwindColorMap[selectedImageBgColor]
                : undefined
            }
            color={color4}
            size={pageSize}
          />
        );
        break;
      case 5:
        DocumentComponent = <Template5PDF data={parsedData} size={pageSize} />;
        break;
      case 6:
        DocumentComponent = <Template6PDF data={parsedData} size={pageSize} />;
        break;
      case 7:
        DocumentComponent = (
          <Template7PDF
            data={parsedData}
            imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
            imageBgColor={
              selectedImageBgColor
                ? tailwindColorMap[selectedImageBgColor]
                : undefined
            }
            color={color7}
            size={pageSize}
          />
        );
        break;
      case 8:
        DocumentComponent = <Template8PDF data={parsedData} size={pageSize} />;
        break;
      case 9:
        DocumentComponent = (
          <Template9PDF
            data={parsedData}
            imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
            imageBgColor={
              selectedImageBgColor
                ? tailwindColorMap[selectedImageBgColor]
                : undefined
            }
            size={pageSize}
          />
        );
        break;
      case 10:
        DocumentComponent = (
          <Template10PDF data={parsedData} color={color10} size={pageSize} />
        );
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
        body: JSON.stringify({ email: user?.email, amount: 5 }),
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

  const [pageSize, setPageSize] = useState<PageProps["size"]>("A4");

  // console.log("Page size", pageSize);

  return (
    <div
      className="px-[30px] py-[60px] max-w-[1600px] mx-auto min-h-screen"
      // style={{ background: "linear-gradient(to right, #f3f4f6, #e5e7eb)" }}
    >
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="md:text-5xl lg:text-6xl text-3xl font-black mb-6 tracking-tight">
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              AI Resume
            </span>
            <br />
            <span className="text-black">Builder</span>
          </h1>
          <p className="md:text-xl lg:text-2xl text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Choose a template and let AI create a professional resume tailored
            to your career goals.
          </p>
        </div>
      </section>

      {/* Select Template */}
      <div className="grid lg:grid-cols-12 grid-cols-1  lg:h-[350px]  mb-10">
        {/* Upload Image */}

        <div className="lg:col-span-4 col-span-1 flex flex-col justify-center gap-2">
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full border-2 border-white overflow-hidden mb-3">
              {previewUrl ? (
                <Image
                  width={158}
                  height={158}
                  src={previewUrl || "/placeholder.png"}
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
                    src={processedUrl || "/dummy.jpg"}
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

        <div className="lg:col-span-8 col-span-1 flex items-center justify-center lg:mt-0 mt-5">
          <CarouselSize
            array={templateData}
            getTemplateId={(id) => setSelectedTemplate(id)}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </div>

      <div className="py-8 grid lg:grid-cols-12 grid-cols-1 lg:gap-[40px] gap-0">
        <div className="lg:col-span-4 col-span-1">
          {/* Chat Box */}

          <div className="bg-gray-100 mt-3  py-2 sm:px-3 px-2 mb-2 rounded-xl flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="py-2 px-2 text-mySkyBlue bg-mySkyBlue/30 rounded-xl">
                  <Sparkles size={15} />
                </div>
                <h1 className="text-mySkyBlue text-xl font-semibold">
                  AI Instructions
                </h1>
              </div>
              <h2 className="text-gray-500 sm:text-[15px] text-[12px]">
                Describe your background, skills, and career goals
              </h2>
            </div>

            {promptHistory.length > 0 && (
              <div className=" mx-auto w-[100%] p-4 h-[300px] overflow-y-auto chat-container custom-scrollbar">
                {promptHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex items-end mb-2 max-w-[100%] text-xs ${
                      entry.type === "user"
                        ? "flex-row-reverse ml-auto"
                        : "flex-row mr-auto"
                    } animate-fade-in-up`}
                  >
                    {/* Avatar */}
                    <div
                      className={`shrink-0 h-[30px] w-[30px] rounded-full flex items-center justify-center font-bold text-xs select-none ${
                        entry.type === "user"
                          ? "bg-mySkyBlue text-white ml-2"
                          : "bg-gray-300 text-gray-700 mr-2"
                      }`}
                    >
                      {entry.type === "user" ? "You" : "Ai"}
                    </div>
                    {/* Chat bubble */}
                    <div
                      className={`px-2 py-2 rounded-xl ${
                        entry.type === "user"
                          ? "bg-mySkyBlue text-white text-xs"
                          : "bg-gray-300 text-gray-700 text-xs"
                      }`}
                    >
                      {entry.message}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center mb-2 max-w-[80%] flex-row mr-auto">
                    {/* Avatar for AI */}
                    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm select-none bg-gray-300 text-gray-700 mr-2 mb-2">
                      Ai
                    </div>
                    {/* Loading bubble */}
                    <div className="flex items-center mb-1 px-4 py-2 rounded-xl bg-gray-300 text-gray-700">
                      <div className="flex gap-1 items-end">
                        <span className="dot-bounce"></span>
                        <span className="dot-bounce animation-delay-200"></span>
                        <span className="dot-bounce animation-delay-400"></span>
                      </div>
                    </div>
                  </div>
                )}
                <style jsx>{`
                  .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #374151 #f3f4f6;
                    margin-top: 5px; /* thumb color, then track color */
                  }
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    background: #c084fc; /* scrollbar track background color */
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #a855f7;
                    border-radius: 8px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-button {
                    display: none;
                  }
                  .dot-bounce {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: #374151;
                    border-radius: 50%;
                    margin: 0 2px;
                    animation: bounce 1s infinite;
                  }
                  .animation-delay-200 {
                    animation-delay: 0.2s;
                  }
                  .animation-delay-400 {
                    animation-delay: 0.4s;
                  }
                  @keyframes bounce {
                    0%,
                    80%,
                    100% {
                      transform: scale(0.8);
                      opacity: 0.7;
                    }
                    40% {
                      transform: scale(1.2);
                      opacity: 1;
                    }
                  }
                `}</style>
              </div>
            )}

            {/* Input Field */}
            <div className=" w-[100%] mx-auto border border-[#a9adb5] rounded-xl px-4 py-2 custom-scrollbar">
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder={
                  credit < 3
                    ? "You have no credits left. Please upgrade."
                    : "Type your prompt here..."
                }
                className=" p-3 w-[100%]  text-gray-500 resize-none focus:outline-none bg-transparent"
                rows={3}
                disabled={credit < 3} // Disable if no credits
              />
              <button
                className="w-[100%] border border-[#a9adb5]  text-gray-800 mt-2 px-4 py-2 rounded-xl flex items-center justify-center gap-1"
                onClick={handleSendPrompt}
              >
                Send <IoSend />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 col-span-1 lg:mt-0 mt-10">
          <div className="flex sm:flex-row flex-col sm:items-center justify-between items-start ">
            <div className="text-left">
              <h2 className="md:text-3xl text-xl font-bold mb-4 text-mySkyBlue">
                Resume Preview
              </h2>
              <p className="md:text-lg text-sm text-gray-500">
                See your AI-generated resume in real-time
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
                    className="bg-mySkyBlue/50 hover:bg-mySkyBlue md:text-lg sm:text-sm text-[12px] font-bold text-white sm:px-5 px-3 sm:py-2 py-1 rounded-lg"
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
                className="bg-mySkyBlue/50 mt-5 hover:bg-mySkyBlue text-white md:text-lg sm:text-sm text-[12px] font-bold sm:px-5 px-3 sm:py-2 py-1 rounded-lg disabled:opacity-50 cursor-pointer"
              >
                Download PDF
              </button>
              {/* )} */}
            </div>
          </div>

          <SelectButton onchange={setPageSize} />

          {!isTemplateLoading && !hasRenderedTemplate ? (
            <div className="w-[100%] bg-gray-200 mt-2 h-[350px] flex flex-col items-center justify-center rounded-lg px-2">
              <Briefcase size={40} className="text-gray-500" />
              <p className="sm:text-lg text-sm text-gray-500 text-center  ">
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
            parsedData && (
              <div className=" flex items-center justify-center">
                <div className="mt-5 mx-auto">{renderSelectedTemplate()}</div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Editor Modal */}

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

            {/* Skills, language and certifications Badge UI */}
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
                    <input
                      type="text"
                      value={exp.companyName || ""}
                      onChange={(e) => {
                        const updated = [...experienceData];
                        updated[index].companyName = e.target.value;
                        setExperienceData(updated);
                      }}
                      placeholder="Company Name"
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
                      <DatePicker
                        label="Start Date"
                        id={`start-${index}`}
                        value={
                          exp.startDate ? new Date(exp.startDate) : undefined
                        }
                        onChange={(date) => {
                          const updated = [...experienceData];
                          updated[index].startDate = date
                            ? date.toISOString()
                            : "";
                          setExperienceData(updated);
                        }}
                        className=""
                        buttonClassName="p-2 border text-black"
                      />
                      <DatePicker
                        label="End Date"
                        id={`end-${index}`}
                        value={
                          exp.endDate && exp.endDate !== "Currently working"
                            ? new Date(exp.endDate)
                            : undefined
                        }
                        onChange={(date) => {
                          const updated = [...experienceData];
                          updated[index].endDate = date
                            ? date.toISOString()
                            : "";
                          setExperienceData(updated);
                        }}
                        disabled={exp.endDate === "Currently working"}
                        className=""
                        buttonClassName="p-2 border text-black disabled:opacity-50"
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
                      className="bg-red-500 hover:bg-red-700 text-white"
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
                        company: "",
                        description: "",
                        startDate: "",
                        endDate: "",
                      },
                    ];
                    setExperienceData(updated);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white mt-4"
                >
                  + Add Experience
                </Button>

                <div className="flex justify-between mt-4">
                  <button
                    className="bg-myDarkBlue text-white px-4 py-2 rounded"
                    onClick={() => {
                      setParsedData((prev: any) => ({
                        ...prev,
                        [currentExperienceField as string]: experienceData,
                      }));
                      setShowEditor(false);
                    }}
                  >
                    Save
                  </button>

                  <button
                    className="bg-myDarkBlue text-white px-4 py-2 rounded"
                    onClick={() => setShowEditor(false)}
                  >
                    Close
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
                      setParsedData((prev: any) => ({
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
                      setParsedData((prev: any) => ({
                        ...prev,
                        [currentEducationField as string]: educationData,
                      }));

                      setShowEditor(false);
                    }}
                  >
                    Save & Close
                  </button>
                </div>
              </div>
            )}

            {/* Personal Information Editor */}
            {editType === "personal" && (
              <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 text-black">
                  Edit Personal Information
                </h2>

                {personalInfoData.map((row, idx) => (
                  <div
                    key={idx}
                    className="mb-3 border p-1 rounded-md bg-gray-100"
                  >
                    <div className="flex flex-col justify-center gap-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 px-3 py-2 rounded text-black text-sm"
                        placeholder="Title"
                        value={row.title}
                        required
                        onChange={(e) => {
                          const updated = [...personalInfoData];
                          updated[idx].title = e.target.value;
                          setPersonalInfoData(updated);
                        }}
                      />
                      <input
                        type="text"
                        className="w-full border border-gray-300 px-3 py-2 rounded text-black text-sm"
                        placeholder="Value"
                        value={row.value}
                        required
                        onChange={(e) => {
                          const updated = [...personalInfoData];
                          updated[idx].value = e.target.value;
                          setPersonalInfoData(updated);
                        }}
                      />
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button
                        onClick={() => {
                          const updated = [...personalInfoData];
                          updated.splice(idx, 1);
                          setPersonalInfoData(updated);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white w-full"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() =>
                    setPersonalInfoData([
                      ...personalInfoData,
                      { title: "", value: "" },
                    ])
                  }
                  className="bg-green-600 hover:bg-green-700 text-white mt-2"
                >
                  + Add Item
                </Button>

                <div className="flex justify-between mt-4">
                  <button
                    className="bg-myDarkBlue text-white px-4 py-2 rounded"
                    onClick={() => {
                      if (currentPersonalField) {
                        setParsedData((prev: any) => ({
                          ...prev,
                          [currentPersonalField]: personalInfoData,
                        }));
                      }
                      setShowEditor(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-myDarkBlue text-white px-4 py-2 rounded"
                    onClick={() => setShowEditor(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Custom Section */}
            {editType === "customSection" && (
              <CustomSection
                customSectionData={customSectionData}
                setCustomSectionData={setCustomSectionData}
                currentcustomField="customSection"
                setParsedData={setParsedData}
                setShowEditor={setShowEditor}
              />
            )}

            {/* Custom Section 2 */}
            {editType === "customSection2" && (
              <CustomSection
                customSectionData={customSection2Data}
                setCustomSectionData={setCustomSection2Data}
                currentcustomField="customSection2"
                setParsedData={setParsedData}
                setShowEditor={setShowEditor}
              />
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
