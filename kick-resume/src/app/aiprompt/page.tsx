"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';
import Template1 from '@/components/Template1';
import { useDropzone } from 'react-dropzone';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Template1PDF from '@/components/pdf/Template1PDF';
import Template2PDF from '@/components/pdf/Template2PDF';
import Template3PDF from '@/components/pdf/Template3PDF';

import { IoSend } from "react-icons/io5";
import Template2 from '@/components/Template2';
import Template3 from '@/components/Template3';
import Template4 from '@/components/Template4';
import Template4PDF from '@/components/pdf/Template4PDF';

import { RgbColorPicker } from "react-colorful";

import { TiTick } from "react-icons/ti";


const templateData = [
  { image: '/templates/template1.png', name: 'Template 1', id: 1 },
  { image: '/templates/template2.png', name: 'Template 2', id: 2 },
  { image: '/templates/template3.png', name: 'Template 3', id: 3 },
  { image: '/templates/template4.png', name: 'Template 4', id: 4 },
]

const themes = [
  {
    name: 'Orange Theme',
    headerBg: '#f96b07',
    headerText: '#FFFFFF',
    headerAccent: '#fcb583',
    sectionTitle: '#f96b07',
    sectionBorder: '#f96b07',
    bullet: '#f5b35d',
    expTitle: '#f5b35d',
    projTitle: '#f5b35d',
    techStackBg: '#f5b35d',
    bodyText: '#222222',
  },
  {
    name: 'Blue Theme',
    headerBg: '#3B82F6',
    headerText: '#FFFFFF',
    headerAccent: '#93C5FD',
    sectionTitle: '#3B82F6',
    sectionBorder: '#3B82F6',
    bullet: '#60A5FA',
    expTitle: '#60A5FA',
    projTitle: '#60A5FA',
    techStackBg: '#60A5FA',
    bodyText: '#222222',
  },
  {
    name: 'Green Theme',
    headerBg: '#16A34A',
    headerText: '#FFFFFF',
    headerAccent: '#86EFAC',
    sectionTitle: '#16A34A',
    sectionBorder: '#16A34A',
    bullet: '#4ADE80',
    expTitle: '#4ADE80',
    projTitle: '#4ADE80',
    techStackBg: '#4ADE80',
    bodyText: '#222222',
  },
];

const AiPromptPage = () => {

  const [userPrompt, setUserPrompt] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  // const [inputData, setInputData] = useState<string | string[]>()
  const [showEditor, setShowEditor] = useState(false)
  // const [editMode, setEditMode] = useState<'summary' | 'skills' | null>(null)
  const [editType, setEditType] = useState<"string" | "array" | "experience" | "projects" | "education" | "phone" | "email">("string");
  const [editField, setEditField] = useState<"skills" | "languages" | "certifications" | null>(null);
  const [inputData, setInputData] = useState<string | string[] | number>([]);
  const [newItem, setNewItem] = useState("");
  const [currentStringField, setCurrentStringField] = useState<string | null>(null);
  const [currentArrayField, setCurrentArrayField] = useState<string | null>(null);

  // selected image state
  const [selectedProcessedImage, setSelectedProcessedImage] = useState<string | null>(null);
  // selected background color state
  const [selectedImageBgColor, setSelectedImageBgColor] = useState<string | undefined>(undefined);
  // selected theme state
  const [selectedTheme, setSelectedTheme] = useState(themes[0]); // Default to the first theme

  const tailwindColorMap: { [key: string]: string } = {
    'bg-blue-500': '#3B82F6',
    'bg-white': '#FFFFFF',
    'bg-green-500': '#22C55E',
    'bg-gray-500': '#6B7280',
    'bg-yellow-500': '#F59E0B',
  };

  // for color picker
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [color, setColor] = useState({ r: 200, g: 150, b: 35 });

  // for phone number
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);

  // for email
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [emailField, setEmailField] = useState<string | null>(null);


  // for experience field
  const [experienceData, setExperienceData] = useState<any[]>([]);
  const [currentExperienceField, setCurrentExperienceField] = useState<string | null>(null);

  // Project field
  const [projectData, setProjectData] = useState<any[]>([]);
  const [currentProjectField, setCurrentProjectField] = useState<string | null>(null);

  // Education field
  const [educationData, setEducationData] = useState<any[]>([]);
  const [currentEducationField, setCurrentEducationField] = useState<string | null>(null);

  // For multiple prompt
  const [promptHistory, setPromptHistory] = useState<
    { type: "user" | "ai"; message: string }[]
  >([])



  const handleGenerate = async () => {
    if (!userPrompt || !selectedTemplate) {
      alert('Please write a prompt and select a template!');
      return;
    }

    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          existingResume: parsedData || {} // ✅ ye zaroor hona chahiye
        })
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Something went wrong");
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
    } catch (error) {
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
    accept: { 'image/*': [] },
    multiple: false,
  });


  const handleStringFieldClick = (fieldName: string, value: string) => {
    setInputData(value);
    setEditType("string");
    setShowEditor(true);
    setCurrentStringField(fieldName);
  };

  const handleStringFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputData(newValue);

    setParsedData((prev: any) => ({
      ...prev,
      [currentStringField as string]: newValue
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
    // setCurrentProjectField(null);       // 🧼 Reset
    // setCurrentEducationField(null);
    setEditType("experience")
    setShowEditor(true);
  };
  // for project field
  const handleProjectFieldClick = (fieldName: string, arrayData: any[]) => {
    setProjectData(arrayData);
    setCurrentProjectField(fieldName);
    // setCurrentExperienceField(null);    // 🧼 Reset
    // setCurrentEducationField(null);
    setEditType("projects")
    setShowEditor(true);
  };
  // Education field
  const handleEducationFieldClick = (fieldName: string, arrayData: any[]) => {
    setEducationData(arrayData);
    setCurrentEducationField(fieldName);
    // setCurrentExperienceField(null);    // 🧼 Reset
    // setCurrentProjectField(null);
    setEditType("education")
    setShowEditor(true);
  };


  const handleSkillsClick = (skills: string[]) => {
    setInputData(skills);
    setEditType("array");
    setShowEditor(true);
  };

  const handleLanguagesClick = (languages: string[]) => {
    setInputData(languages);
    setEditType("array");
    setEditField("languages");
    setShowEditor(true);
  };

  const handlePhoneClickFeild = (fieldName: string, data: number) => {
    setSelectedField(fieldName);
    setSelectedNumber(data);
    setEditType("phone")
    setShowEditor(true); // show modal
  };

  const handleEmailClickFeild = (fieldName: string, data: string) => {
    setEmailField(fieldName);
    setSelectedEmail(data);
    setEditType("email")
    setShowEditor(true); // show modal
  };

  useEffect(() => {
    if (parsedData) {
      console.log("Parsed Data:", parsedData);
    }
  }, [parsedData]);



  const getTemplateId = (image: number) => {
    setSelectedTemplate(image);
  }



  const scrollToBottom = () => {
    const container = document.querySelector('.chat-container'); // add class below
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const renderSelectedTemplate = () => {

    if (selectedTemplate === 1) return <Template1 data={parsedData}
      handleStringFeildClick={handleStringFieldClick}
      handleArrayFieldClick={handleArrayFieldClick}
      handleExperienceFieldClick={handleExperienceFieldClick}
      handleProjectFieldClick={handleProjectFieldClick}
      handleEducationFieldClick={handleEducationFieldClick}
      handlePhoneClickFeild={handlePhoneClickFeild}
      handleEmailFieldClick={handleEmailClickFeild}

    />;
    if (selectedTemplate === 2) return <Template2 data={parsedData}
      handleStringFeildClick={handleStringFieldClick}
      handleArrayFieldClick={handleArrayFieldClick}
      handleExperienceFieldClick={handleExperienceFieldClick}
      handleProjectFieldClick={handleProjectFieldClick}
      handleEducationFieldClick={handleEducationFieldClick}
      handlePhoneClickFeild={handlePhoneClickFeild}
      handleEmailFieldClick={handleEmailClickFeild}
    />;
    if (selectedTemplate === 3) return <Template3 data={parsedData}
      handleStringFeildClick={handleStringFieldClick}
      handleArrayFieldClick={handleArrayFieldClick}
      handleExperienceFieldClick={handleExperienceFieldClick}
      handleProjectFieldClick={handleProjectFieldClick}
      handleEducationFieldClick={handleEducationFieldClick}
      handlePhoneClickFeild={handlePhoneClickFeild}
      handleEmailFieldClick={handleEmailClickFeild}
    />;
    if (selectedTemplate === 4) return <Template4 data={parsedData}
      handleStringFeildClick={handleStringFieldClick}
      handleArrayFieldClick={handleArrayFieldClick}
      handleExperienceFieldClick={handleExperienceFieldClick}
      handleProjectFieldClick={handleProjectFieldClick}
      handleEducationFieldClick={handleEducationFieldClick}
      handlePhoneClickFeild={handlePhoneClickFeild}
      handleEmailFieldClick={handleEmailClickFeild}
      imageUrl={selectedProcessedImage ?? previewUrl ?? '/dummy.jpg'}
      imageBgColor={selectedImageBgColor}
      selectedTheme={selectedTheme}
      color={color}
    />;
    return <p>Please select a template above.</p>;
  };

  const [showTemplate, setShowTemplate] = useState(false);
  useEffect(() => {
    setShowTemplate(false); // Reset jab prompt ya template change ho
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [promptHistory]);



  // List Change
  const handleListChange = (data: string[]) => {
    const newList = data
    setInputData(newList)

  }


  console.log("Preview URL:", previewUrl);
  // console.log("phone", parsedData.phone);


  return (
    <div className="px-[30px] py-[60px] mx-auto bg-myDarkBlue text-white min-h-screen">


      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-myWhite">
          Build Your Resume Chat-Wise
        </h1>

        {/* Select Template */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {templateData.map((template) => (
            <div
              key={template.id}
              onClick={() => getTemplateId(template.id)}
              className={`relative cursor-pointer rounded-md transition-all duration-300 `}
            >
              <div className='h-[280px] w-[200px]'>
                <Image src={template.image} alt={template.name} height={150} width={150} className='h-full w-full' />
              </div>
              {selectedTemplate === template.id && (
                <div
                  className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center pointer-events-none"
                  style={{ zIndex: 10 }}
                >
                  <div className="border border-white text-white rounded-full px-1 py-1 z-20">
                    <TiTick size={50} />
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upload Image */}
        {selectedTemplate === 4 && (
          <div>
            <div className="flex flex-col items-center mb-6">
              <div className="w-[200px] h-[200px] rounded-full border-2 border-white overflow-hidden mb-3">
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
              <div {...getRootProps()} className="text-center cursor-pointer border border-dashed border-gray-400 rounded-md p-2 hover:bg-white/10 transition-all">
                <input {...getInputProps()} />
                <p className="text-sm text-gray-300">
                  {isDragActive ? 'Drop the image here...' : 'Click or drag an image to upload'}
                </p>
              </div>
            </div>



            <Button
              className="bg-blue-600 hover:bg-blue-700 mt-4 mb-4"
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
              <div className='flex items-center justify-start gap-5 flex-wrap mt-5 mb-5'>
                {/* Original Image */}
                <div
                  onClick={() => {
                    setSelectedProcessedImage(previewUrl);
                    setSelectedImageBgColor(undefined); // Reset background color on click
                  }}
                  className={`w-[170px] h-[170px] rounded-full flex items-center justify-center overflow-hidden cursor-pointer border-4 transition-all duration-300 ${selectedProcessedImage === previewUrl && !selectedImageBgColor ? 'border-primaryColor' : 'border-none'}`}
                >
                  <Image
                    src={previewUrl ?? '/dummy.jpg'}
                    width={170}
                    height={170}
                    alt="Original"
                    className="object-contain"
                  />
                </div>
                {/* Processed Images (with colored backgrounds) */}
                {['bg-blue-500', 'bg-white', 'bg-green-500', 'bg-gray-500', 'bg-yellow-500'].map((bg, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedProcessedImage(processedUrl);
                      setSelectedImageBgColor(bg); // Set background color on click
                    }}
                    className={`w-[170px] h-[170px] rounded-full ${bg} flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 ${selectedProcessedImage === processedUrl && selectedImageBgColor === bg ? 'ring-4 ring-primaryColor' : ''}`}
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
        )}


        {/* Chat Box */}
        <div className="bg-gray-800 rounded-lg mx-auto w-[60%] p-4 h-[300px] overflow-y-auto chat-container">
          {promptHistory.map((entry, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg mb-2 max-w-[80%] ${entry.type === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-green-600 text-white mr-auto"
                }`}
            >
              {entry.message}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-2 w-[60%] mx-auto border-2 border-primaryColor px-4 py-2">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Type your prompt..."
            className="flex-1 p-3  text-black rounded-md resize-none focus:outline-none bg-transparent"
            rows={2}
          />
          <Button
            className="bg-green-600 hover:bg-green-700 "
            onClick={async () => {
              if (!userPrompt || !selectedTemplate) {
                alert("Please enter a prompt and select a template!");
                return;
              }

              // 1. User message
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

              if (!res.ok) {
                const err = await res.json();
                alert(err.error || "Something went wrong");
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

              setShowTemplate(true);
              setUserPrompt(""); // Clear input

              // 2. AI response message
              setPromptHistory((prev) => [
                ...prev,
                { type: "ai", message: "✅ Resume updated successfully!" },
              ]);
              setParsedData(data);

            }}
          >
            Send <IoSend />
          </Button>
        </div>
      </div>


      {/* Image Preview + Dropzone Uploader */}





      <div className="flex items-center gap-10">
        {/* <Button
        variant='secondary'
        className='bg-myMidblue hover:bg-myMidblue/60'
        onClick={handleGenerate}
      >Create</Button> */}

        {/* Theme Selection Section */}
        {selectedTemplate === 4 && (
          // <div className="mb-8 mt-5">
          //   <h2 className="text-xl font-bold mb-3 text-myWhite">Choose Theme</h2>
          //   <div className="flex gap-4">
          //     {themes.map((theme, index) => (
          //       <div
          //         key={index}
          //         className={`flex items-center gap-2 cursor-pointer p-2 rounded-md border-2 transition-all duration-300
          //           ${selectedTheme.name === theme.name ? 'border-primaryColor' : 'border-gray-700'}
          //         `}
          //         onClick={() => setSelectedTheme(theme)}
          //       >
          //         <span
          //           className="w-6 h-6 rounded-full inline-block"
          //           style={{ backgroundColor: theme.headerBg }}
          //         ></span>
          //         <span className="text-sm text-myWhite">{theme.name}</span>
          //       </div>
          //     ))}
          //   </div>
          // </div>
          <Button
            variant={"outline"}
            onClick={() => setShowColorPicker(prev => !prev)}
          >
            Choose Color
          </Button>
        )}
      </div>

      {showColorPicker && (<div className="mt-10">
        {/* <ColorPicker/> */}
        <RgbColorPicker color={color} onChange={setColor} />
        {/* <div className="value">{JSON.stringify(color)}</div> */}

      </div>
      )}

      <div className="grid grid-cols-1">
        <div>
          {showTemplate && parsedData && (
            <div>
              <div className='mt-5 w-[100%]'>{renderSelectedTemplate()}</div>
              <div className="flex justify-end mt-4">
                {selectedTemplate === 1 && (
                  <PDFDownloadLink
                    document={<Template1PDF data={parsedData} />}
                    fileName="resume.pdf"
                    className="bg-myDarkBlue text-white px-4 py-2 rounded outline"
                  >
                    {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
                  </PDFDownloadLink>
                )}
                {selectedTemplate === 2 && (
                  <PDFDownloadLink
                    document={<Template2PDF data={parsedData} />}
                    fileName="resume.pdf"
                    className="bg-myDarkBlue text-white px-4 py-2 rounded outline"
                  >
                    {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
                  </PDFDownloadLink>
                )}
                {selectedTemplate === 3 && (
                  <PDFDownloadLink
                    document={<Template3PDF data={parsedData} />}
                    fileName="resume.pdf"
                    className="bg-myDarkBlue text-white px-4 py-2 rounded outline"
                  >
                    {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
                  </PDFDownloadLink>
                )}
                {selectedTemplate === 4 && (
                  <PDFDownloadLink
                    document={<Template4PDF data={parsedData} imageUrl={selectedProcessedImage ?? previewUrl ?? '/dummy.jpg'} imageBgColor={selectedImageBgColor ? tailwindColorMap[selectedImageBgColor] : undefined} color={color} />}
                    fileName="resume.pdf"
                    className="bg-myDarkBlue text-white px-4 py-2 rounded outline"
                  >
                    {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
                  </PDFDownloadLink>
                )}
              </div>
            </div>
          )}
        </div>


        {showEditor && (
          <div className={`fixed top-0 right-0 h-full w-[400px] bg-myWhite shadow-lg z-50 transition-transform duration-500 ease-in-out transform ${showEditor ? 'translate-x-0' : 'translate-x-full'}`}>
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
                      <span key={i} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center">
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
                  <h2 className="text-lg font-bold mb-4 text-black">Edit Experience</h2>

                  {experienceData.map((exp, index) => (
                    <div key={index} className="mb-6 border p-3 rounded-md bg-gray-100">
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
                          value={exp.endDate === "Currently working" ? "" : exp.endDate}
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
                        <div className='flex items-center gap-2'>
                          <label htmlFor={`currentEmployer-${index}`} className='text-black'>Current Employer</label>
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
                      const updated = [...experienceData, {
                        title: "",
                        description: "",
                        startDate: "",
                        endDate: ""
                      }];
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
                        setParsedData((prev: any) => ({
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
                  <h2 className="text-lg font-bold mb-4 text-black">Edit Projects</h2>

                  {projectData.map((proj, index) => (
                    <div key={index} className="mb-6 border p-3 rounded-md bg-gray-100">
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
                          live: ""
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
                  <h2 className="text-lg font-bold mb-4 text-black">Edit Education</h2>

                  {educationData.map((edu, index) => (
                    <div key={index} className="mb-6 border p-3 rounded-md bg-gray-100">
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
              {/* Phone Number Editor */}
              {editType === "email" && (
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4 text-black">Edit Email</h2>

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
                          setParsedData((prev: any) => ({
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
                  <h2 className="text-lg font-bold mb-4 text-black">Edit Phone Number</h2>

                  <input
                    type="email"
                    className="w-full border border-gray-300 px-3 py-2 rounded mb-4 text-black"
                    value={selectedNumber ?? ""}
                    onChange={(e) => setSelectedNumber(Number(e.target.value))}
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
                        if (selectedField && selectedNumber !== null) {
                          setParsedData((prev: any) => ({
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

    </div>
  )
}

export default AiPromptPage

