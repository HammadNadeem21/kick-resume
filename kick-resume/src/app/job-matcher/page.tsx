"use client";
import type { PageProps } from "@react-pdf/renderer";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { Briefcase, Sparkles } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { motion, AnimatePresence } from "framer-motion";
import Template1 from "@/components/Templates/Template1";
import Template2 from "@/components/Templates/Template2";
import Template3 from "@/components/Templates/Template3";
import Template4 from "@/components/Templates/Template4";
import Template4PDF from "@/components/pdf/Template4PDF";
import Template5 from "@/components/Templates/Template5";
import Template5PDF from "@/components/pdf/Template5PDF";
import Template6 from "@/components/Templates/Template6";
import Template6PDF from "@/components/pdf/Template6PDF";
import Template7 from "@/components/Templates/Template7";
import Template7PDF from "@/components/pdf/Template7PDF";
import Template8 from "@/components/Templates/Template8";
import Template8PDF from "@/components/pdf/Template8PDF";
import Template9 from "@/components/Templates/Template9";
import Template9PDF from "@/components/pdf/Template9PDF";
import Template10 from "@/components/Templates/Template10";
import Template10PDF from "@/components/pdf/Template10PDF";
import Template1PDF from "@/components/pdf/Template1PDF";
import Template2PDF from "@/components/pdf/Template2PDF";
import Template3PDF from "@/components/pdf/Template3PDF";

import { useSession } from "next-auth/react";
import { useCredits } from "@/context/CreditsContext";
import { JobMatcherProvider, useJobMatcher } from "@/context/JobMatcherContext";
import { ColorPickerDropdown } from "@/components/ColorPicker";
import { SelectButton } from "@/components/SelectButton";
import ResumeBuilderSidebar from "@/components/ResumeBuilderSidebar";
import ResumeEditorModal from "@/components/ResumeEditorModal";
import { IoMdArrowDropleftCircle } from "react-icons/io";

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

  const [inputData, setInputData] = useState<string | string[] | number>([]);
  const [newItem, setNewItem] = useState("");
  const [currentStringField, setCurrentStringField] = useState<string | null>(
    null
  );
  const [currentArrayField, setCurrentArrayField] = useState<string | null>(
    null
  );

  const tailwindColorMap: { [key: string]: string } = {
    "bg-blue-500": "#3B82F6",
    "bg-white": "#FFFFFF",
    "bg-green-500": "#22C55E",
    "bg-gray-500": "#6B7280",
    "bg-yellow-500": "#F59E0B",
  };

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

  // For credits
  const { credit, setCredit } = useCredits();

  const { data: session } = useSession();
  const user = session?.user;

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

  const handleExperienceFieldClick = (fieldName: string, arrayData: any[]) => {
    setExperienceData(arrayData);
    setCurrentExperienceField(fieldName);
    setEditType("experience");
    setShowEditor(true);
  };

  const handleProjectFieldClick = (fieldName: string, arrayData: any[]) => {
    setProjectData(arrayData);
    setCurrentProjectField(fieldName);
    setEditType("projects");
    setShowEditor(true);
  };

  const handleEducationFieldClick = (fieldName: string, arrayData: any[]) => {
    setEducationData(arrayData);
    setCurrentEducationField(fieldName);
    setEditType("education");
    setShowEditor(true);
  };

  const handlePhoneClickFeild = (fieldName: string, data: number) => {
    setSelectedField(fieldName);
    setSelectedNumber(data);
    setEditType("phone");
    setShowEditor(true);
  };

  const handleEmailClickFeild = (fieldName: string, data: string) => {
    setEmailField(fieldName);
    setSelectedEmail(data);
    setEditType("email");
    setShowEditor(true);
  };

  // Personal Information field (array of { title, value })
  const [personalInfoData, setPersonalInfoData] = useState<
    Array<{ title: string; value: string }>
  >([]);
  const [currentPersonalField, setCurrentPersonalField] = useState<
    string | null
  >(null);

  const handlePersonalInformationClick = (
    fieldName: string,
    arrayData: Array<{ title: string; value: string }>
  ) => {
    setPersonalInfoData(arrayData ?? []);
    setCurrentPersonalField(fieldName);
    setEditType("personal");
    setShowEditor(true);
  };

  const handleCustomFieldClick = (
    fieldName: string,
    arrayData: Array<{ title: string; value: string[] }>
  ) => {
    setCustomSectionData(arrayData ?? []);
    setCurrentCustomField(fieldName);
    setEditType("customSection");
    setShowEditor(true);
  };

  const handleCustom2FieldClick = (
    fieldName: string,
    arrayData: Array<{ title: string; value: string[] }>
  ) => {
    setCustomSection2Data(arrayData ?? []);
    setCurrentCustom2Field(fieldName);
    setEditType("customSection2");
    setShowEditor(true);
  };

  const [height, setHeight] = useState(0);
  const [pageSize, setPageSize] = useState<PageProps["size"]>("A4");
  const boxRef = useRef<HTMLDivElement>(null);
  const [showPageBreak, setShowPageBreak] = useState(false);

  useEffect(() => {
    if (!boxRef.current) return;
    const element = boxRef.current;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const h = entry.contentRect.height;
        setShowPageBreak(h > 1150);
      }
    });
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          color={color1}
          isLegal={pageSize === "A4"}
          onHeightChange={setHeight}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          isLegal={pageSize === "A4"}
          handleCustomSection2Click={handleCustom2FieldClick}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          isLegal={pageSize === "A4"}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          handleEmailFieldClick={handleEmailClickFeild}
          handlePhoneClickFeild={handlePhoneClickFeild}
          imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
          isLegal={pageSize === "A4"}
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
          handleCustomSection2Click={handleCustom2FieldClick}
          handlePersonalInformationClick={handlePersonalInformationClick}
          isLegal={pageSize === "A4"}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          isLegal={pageSize === "A4"}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSectionClick={handleCustomFieldClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
          imageBgColor={selectedImageBgColor}
          color={color7}
          isLegal={pageSize === "A4"}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          isLegal={pageSize === "A4"}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          imageUrl={selectedProcessedImage ?? previewUrl ?? "/dummy.jpg"}
          imageBgColor={selectedImageBgColor}
          isLegal={pageSize === "A4"}
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
          handlePersonalInformationClick={handlePersonalInformationClick}
          handleCustomSection2Click={handleCustom2FieldClick}
          isLegal={pageSize === "A4"}
          color={color10}
        />
      );

    return <p>Please select a template above.</p>;
  };

  useEffect(() => {
    if (
      !resumeData &&
      !userName &&
      !jobDescription &&
      promptHistory.length === 0
    ) {
      setShowTemplate(false);
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

  // for sending prompt
  const handleSendPrompt = async () => {
    if (!userName || !jobDescription || !selectedTemplate) {
      alert("Please enter your name, job description, and select a template!");
      return;
    }
    setIsTemplateLoading(true);
    setIsChatLoading(true);
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

      const data = await res.json();
      setResumeData(data);
      setIsTemplateLoading(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setShowTemplate(true);
      setIsChatLoading(false);
      setIsTemplateLoading(false);
      if (!hasRenderedTemplate) setHasRenderedTemplate(true);
    }
  };

  // for download button
  const handleDownloadPDF = async () => {
    if (!resumeData || !selectedTemplate) return;

    let DocumentComponent;

    switch (selectedTemplate) {
      case 1:
        DocumentComponent = (
          <Template1PDF size={pageSize} data={resumeData} color={color1} />
        );
        break;
      case 2:
        DocumentComponent = <Template2PDF size={pageSize} data={resumeData} />;
        break;
      case 3:
        DocumentComponent = <Template3PDF size={pageSize} data={resumeData} />;
        break;
      case 4:
        DocumentComponent = (
          <Template4PDF
            size={pageSize}
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
        DocumentComponent = <Template5PDF size={pageSize} data={resumeData} />;
        break;
      case 6:
        DocumentComponent = <Template6PDF size={pageSize} data={resumeData} />;
        break;
      case 7:
        DocumentComponent = (
          <Template7PDF
            size={pageSize}
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
        DocumentComponent = <Template8PDF size={pageSize} data={resumeData} />;
        break;
      case 9:
        DocumentComponent = (
          <Template9PDF
            size={pageSize}
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
        DocumentComponent = (
          <Template10PDF size={pageSize} data={resumeData} color={color10} />
        );
        break;
      default:
        alert("Invalid template selected");
        return;
    }

    try {
      const blob = await pdf(DocumentComponent).toBlob();
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
      const creditData = await res.json();
      setCredit(creditData.credits);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed");
    }
  };

  return (
    <div className="px-[30px] py-[60px] max-w-[1600px] mx-auto min-h-screen bg-[#fafbfc] transition-colors duration-500 overflow-x-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />

      {/* ── Hero Section ── */}
      <section className="pt-8 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-mySkyBlue/10 border border-mySkyBlue/20 text-mySkyBlue text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles size={14} />
              AI Powered
            </motion.span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
              <span
                className="bg-gradient-to-r from-mySkyBlue via-blue-600 to-indigo-600 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Job-Tailored
              </span>
              <br />
              <span className="text-gray-900 drop-shadow-sm">
                Resume Generator
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Paste any job description and get a perfectly tailored resume that
              matches the requirements — in seconds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Sidebar (Template & Image) ── */}
      <ResumeBuilderSidebar
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        imageFile={imageFile}
        setImageFile={setImageFile}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        processedUrl={processedUrl}
        setProcessedUrl={setProcessedUrl}
        selectedProcessedImage={selectedProcessedImage}
        setSelectedProcessedImage={setSelectedProcessedImage}
        selectedImageBgColor={selectedImageBgColor}
        setSelectedImageBgColor={setSelectedImageBgColor}
      />

      {/* ── Main Content: Input + Preview ── */}
      <div className="py-2 grid lg:grid-cols-[32%,68%] grid-cols-1 lg:gap-5 gap-10">

        {/* Left: Job Description Input */}
        <div className="col-span-1 sticky top-8 h-fit">
          <div className="bg-white border border-gray-200 shadow-sm py-6 px-6 rounded-2xl flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="p-2 text-mySkyBlue bg-blue-50 rounded-lg">
                <Briefcase size={18} />
              </div>
              <div>
                <h2 className="text-gray-800 text-lg font-bold">
                  Job Description
                </h2>
                <p className="text-gray-500 text-xs">
                  Paste the complete job posting for optimal results
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. John Smith"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mySkyBlue/30 focus:border-mySkyBlue transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Job Description
                </label>
                <textarea
                  placeholder="Paste the full job posting here..."
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-[280px] border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mySkyBlue/30 focus:border-mySkyBlue transition-all resize-none text-sm leading-relaxed"
                  rows={4}
                />
              </div>

              <Button
                onClick={handleSendPrompt}
                disabled={isTemplateLoading}
                className="w-full bg-mySkyBlue hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-mySkyBlue/20 transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isTemplateLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Resume Preview */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Sticky Toolbar */}
          <div className="bg-white/80 backdrop-blur-md sticky top-8 z-30 py-4 px-6 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4 w-[97%]">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Live Preview
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </h2>
              <p className="text-xs text-gray-500 font-medium tracking-tight">
                AI-Tailored Resume Visualizer
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Page Size */}
              <div className="hidden sm:block">
                <SelectButton onchange={setPageSize} />
              </div>

              {/* Color Picker */}
              {(selectedTemplate === 4 ||
                selectedTemplate === 1 ||
                selectedTemplate === 7 ||
                selectedTemplate === 10) && (
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowColorPicker((prev) => !prev)}
                    className="h-10 px-4 rounded-xl border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold transition-all flex items-center gap-2 shadow-sm"
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200 ring-2 ring-white shadow-sm"
                      style={{
                        backgroundColor:
                          selectedTemplate === 1
                            ? `rgb(${color1.r}, ${color1.g}, ${color1.b})`
                            : selectedTemplate === 4
                            ? `rgb(${color4.r}, ${color4.g}, ${color4.b})`
                            : selectedTemplate === 7
                            ? `rgb(${color7.r}, ${color7.g}, ${color7.b})`
                            : `rgb(${color10.r}, ${color10.g}, ${color10.b})`,
                      }}
                    />
                    <span className="hidden sm:inline">Customize Theme</span>
                    <span className="sm:hidden text-xs">Theme</span>
                  </Button>

                  <AnimatePresence>
                    {showColorPicker && (
                      <div className="absolute top-5 mt-2 right-44 z-[60]">
                        <ColorPickerDropdown
                          selectedTemplate={selectedTemplate}
                          color1={color1}
                          setColor1={setColor1}
                          color4={color4}
                          setColor4={setColor4}
                          color7={color7}
                          setColor7={setColor7}
                          color10={color10}
                          setColor10={setColor10}
                          setShowColorPicker={setShowColorPicker}
                        />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Export PDF */}
              <Button
                onClick={handleDownloadPDF}
                className="bg-mySkyBlue hover:bg-sky-600 text-white font-bold h-9 px-5 rounded-xl shadow-lg shadow-mySkyBlue/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                <span>Export PDF</span>
              </Button>
            </div>
          </div>

          {/* Template Preview Area */}
          <div className="rounded-[2.5rem] overflow-hidden min-h-[850px] relative transition-all duration-300">
            {!isTemplateLoading && !hasRenderedTemplate ? (
              /* Empty State */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-gray-50/50 to-white">
                <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl shadow-gray-200 flex items-center justify-center mb-8 transform rotate-12 transition-transform hover:rotate-0 duration-500">
                  <Briefcase size={48} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-3 tracking-tight">
                  Your Resume Awaits
                </h3>
                <p className="text-gray-400 text-center max-w-sm leading-relaxed font-medium">
                  Select a template from the sidebar, enter your name and job
                  description, then hit Generate.
                </p>
              </div>
            ) : isTemplateLoading && !hasRenderedTemplate ? (
              /* Loading State */
              <div className="absolute inset-0 flex flex-col gap-6 justify-center items-center bg-white/90 backdrop-blur-md z-20 animate-in fade-in duration-500">
                <div className="relative">
                  <svg
                    className="animate-spin"
                    width="72"
                    height="72"
                    viewBox="0 0 50 50"
                  >
                    <circle
                      className="opacity-5"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <circle
                      className="opacity-100"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#55CEF6"
                      strokeWidth="3"
                      strokeDasharray="90"
                      strokeDashoffset="30"
                      strokeLinecap="round"
                    />
                  </svg>
                  <Sparkles
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-mySkyBlue animate-pulse"
                    size={28}
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-black text-gray-900 mb-1">
                    Tailoring Your Resume
                  </h4>
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-1 h-1 bg-mySkyBlue rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 bg-mySkyBlue rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 bg-mySkyBlue rounded-full animate-bounce" />
                    <span className="text-[12px] font-bold text-gray-400 ml-2 uppercase tracking-widest">
                      AI Matching
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              showTemplate &&
              resumeData && (
                <div
                  ref={boxRef}
                  className="relative flex flex-col items-center py-6 px-2 min-h-[900px] group/preview"
                >
                  <div className="transition-all duration-1000 ease-out transform animate-in fade-in zoom-in-95 slide-in-from-bottom-5">
                    {renderSelectedTemplate()}
                  </div>

                  {showPageBreak && (
                    <div
                      className="absolute w-full px-12 pointer-events-none transition-opacity duration-300 group-hover/preview:opacity-100 opacity-40"
                      style={{ top: "1100px" }}
                    >
                      <div className="flex items-center gap-2 text-gray-400 border-t border-dashed border-gray-300 pt-3">
                        <IoMdArrowDropleftCircle
                          size={24}
                          className="text-mySkyBlue"
                        />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-black text-gray-500">
                          Section Break • Auto Overflow
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          {height > 1150 && (
            <div className="flex justify-end p-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-xl border border-red-100 flex items-center gap-2 font-bold shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Content Overflow Warning
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* ── Mock Interview Q&A ── */}
      {showTemplate && resumeData && resumeData.mockInterview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 text-mySkyBlue bg-blue-50 rounded-lg">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Mock Interview Prep
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                AI-generated Q&A tailored to this role
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {resumeData.mockInterview.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-mySkyBlue/10 text-mySkyBlue text-xs font-black flex items-center justify-center border border-mySkyBlue/20">
                    Q{index + 1}
                  </span>
                  <h3 className="text-sm font-bold text-gray-800 leading-snug">
                    {item.question}
                  </h3>
                </div>
                <div className="pl-10">
                  <p className="text-xs font-bold text-mySkyBlue uppercase tracking-wide mb-1">
                    Answer
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Editor Modal (Reused from ai-resume-builder) ── */}
      <ResumeEditorModal
        showEditor={showEditor}
        setShowEditor={setShowEditor}
        editType={editType}
        inputData={inputData}
        handleStringFieldChange={handleStringFieldChange}
        newItem={newItem}
        setNewItem={setNewItem}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        currentExperienceField={currentExperienceField}
        experienceData={experienceData}
        setExperienceData={setExperienceData}
        currentProjectField={currentProjectField}
        projectData={projectData}
        setProjectData={setProjectData}
        currentEducationField={currentEducationField}
        educationData={educationData}
        setEducationData={setEducationData}
        currentPersonalField={currentPersonalField}
        personalInfoData={personalInfoData}
        setPersonalInfoData={setPersonalInfoData}
        customSectionData={customSectionData}
        setCustomSectionData={setCustomSectionData}
        customSection2Data={customSection2Data}
        setCustomSection2Data={setCustomSection2Data}
        setParsedData={setResumeData}
      />
    </div>
  );
};

export default AiPromptPage;
