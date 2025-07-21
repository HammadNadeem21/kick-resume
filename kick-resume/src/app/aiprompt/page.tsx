"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
import Template5 from '@/components/Template5';
import Template5PDF from '@/components/pdf/Template5PDF';

import { Roboto } from 'next/font/google'
import Template6 from '@/components/Template6';
import Template6PDF from '@/components/pdf/Template6PDF';
import Template7 from '@/components/Template7';
import Template7PDF from '@/components/pdf/Template7PDF';
const robot700 = Roboto({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const templateData = [
  { image: '/templates/template1.png', name: 'Template 1', id: 1 },
  { image: '/templates/template2.png', name: 'Template 2', id: 2 },
  { image: '/templates/template3.png', name: 'Template 3', id: 3 },
  { image: '/templates/template4.png', name: 'Template 4', id: 4 },
  { image: '/templates/template5.png', name: 'Template 5', id: 5 },
  { image: '/templates/template6.png', name: 'Template 6', id: 6 },
  { image: '/templates/template7.png', name: 'Template 7', id: 7 },

]

// const dummyData = {
//   name: "John Doe",
//   role: "Software Engineer",
//   phone: 1234567890,
//   email: "john.doe@example.com",
//   address: "123 Main St, Anytown, USA",
//   summary: "Highly motivated software engineer with 5+ years of experience in developing and deploying scalable web applications. Proficient in front-end and back-end technologies, with a strong focus on clean code and user experience.",
//   education: [
//     { degree: "Master of Science in Computer Science", startDate: "Sept 2020", endDate: "May 2022" },
//     { degree: "Bachelor of Science in Software Engineering", startDate: "Sept 2016", endDate: "May 2020" }
//   ],
//   skills: ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS"],
//   languages: ["English", "Spanish"],
//   certifications: ["AWS Certified Developer", "Google Cloud Professional Architect"],
//   experience: [
//     {
//       title: "Senior Frontend Developer",
//       companyName: "Tech Solutions Inc.",
//       description: "Led the development of a new customer-facing portal using React and Redux, resulting in a 20% increase in user engagement. Implemented responsive UI designs and optimized application performance.",
//       startDate: "Jan 2022",
//       endDate: "Currently working"
//     },
//     {
//       title: "Junior Software Engineer",
//       companyName: "Innovate Corp.",
//       description: "Contributed to the development of a microservices-based architecture. Developed RESTful APIs using Node.js and Express, and managed MongoDB databases.",
//       startDate: "June 2020",
//       endDate: "Dec 2021"
//     }
//   ],
//   projects: [
//     {
//       name: "E-commerce Platform",
//       description: "Developed a full-stack e-commerce platform with user authentication, product catalog, and payment integration. Utilized Stripe API for secure transactions.",
//       github: "https://github.com/john-doe/ecommerce",
//       live: "https://ecommerce.example.com"
//     },
//     {
//       name: "Portfolio Website",
//       description: "Designed and developed a personal portfolio website to showcase projects and skills. Implemented modern UI/UX principles and ensured mobile responsiveness.",
//       github: "https://github.com/john-doe/portfolio",
//       live: "https://portfolio.example.com"
//     }
//   ],
// };


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


  const tailwindColorMap: { [key: string]: string } = {
    'bg-blue-500': '#3B82F6',
    'bg-white': '#FFFFFF',
    'bg-green-500': '#22C55E',
    'bg-gray-500': '#6B7280',
    'bg-yellow-500': '#F59E0B',
  };

  // for color picker
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [color1, setColor1] = useState({ r: 40, g: 56, b: 74 }); // Default for Template 1
  const [color4, setColor4] = useState({ r: 200, g: 150, b: 35});
  const [color7, setColor7] = useState({ r: 131, g: 123, b: 106})  // Default for Template 4

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

  // for loader
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  const [hasRenderedTemplate, setHasRenderedTemplate] = useState(false);


  const handleGenerate = async () => {
    if (!userPrompt || !selectedTemplate) {
      alert('Please write a prompt and select a template!');
      return;
    }

    try {
      setIsChatLoading(true);
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
    // setParsedData(dummyData);       // dummy data show karo
    // setShowTemplate(true);          // template ko show karo
    // setPromptHistory([]);           // optional: clear chat
  };



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
    color={color1}
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
     
      color={color4}
    />;
    if (selectedTemplate === 5) return <Template5 data={parsedData}
      handleStringFeildClick={handleStringFieldClick}
      handleArrayFieldClick={handleArrayFieldClick}
      handleExperienceFieldClick={handleExperienceFieldClick}
      handleProjectFieldClick={handleProjectFieldClick}
      handleEducationFieldClick={handleEducationFieldClick}
      handlePhoneClickFeild={handlePhoneClickFeild}
      handleEmailFieldClick={handleEmailClickFeild}
     
    />;
    if (selectedTemplate === 6) return <Template6 data={parsedData}
    handleStringFeildClick={handleStringFieldClick}
    handleArrayFieldClick={handleArrayFieldClick}
    handleExperienceFieldClick={handleExperienceFieldClick}
    handleProjectFieldClick={handleProjectFieldClick}
    handleEducationFieldClick={handleEducationFieldClick}
    handlePhoneClickFeild={handlePhoneClickFeild}
    handleEmailFieldClick={handleEmailClickFeild}
   
  />;
  if (selectedTemplate === 7) return <Template7 data={parsedData}
  handleStringFeildClick={handleStringFieldClick}
  handleArrayFieldClick={handleArrayFieldClick}
  handleExperienceFieldClick={handleExperienceFieldClick}
  handleProjectFieldClick={handleProjectFieldClick}
  handleEducationFieldClick={handleEducationFieldClick}
  handlePhoneClickFeild={handlePhoneClickFeild}
  handleEmailFieldClick={handleEmailClickFeild}
  imageUrl={selectedProcessedImage ?? previewUrl ?? '/dummy.jpg'}
  imageBgColor={selectedImageBgColor}
 
  color={color7}
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
    <div className="px-[30px] py-[60px] mx-auto min-h-screen" style={{background: 'linear-gradient(to right, #f3f4f6, #e5e7eb)'}}>


      <div className="mb-8">
        <h1 className={`text-3xl ${robot700.className} mb-4 text-purple-500`}>
          Build Your Resume Chat-Wise
        </h1>

        {/* Select Template */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {templateData.map((template) => (
            <div
              key={template.id}
              onClick={() => getTemplateId(template.id)}
              className={`relative cursor-pointer rounded-md transition-all duration-300 shadow-md shadow-purple-400`}
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
        {(selectedTemplate === 4 || selectedTemplate === 7) && (
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
        <div
          className="bg-[#a9adb5] mx-auto w-[60%] p-4 h-[300px] overflow-y-auto chat-container custom-scrollbar"
        >
          {promptHistory.map((entry, index) => (
            <div
              key={index}
              className={`flex items-end mb-2 max-w-[80%]  ${
                entry.type === "user"
                  ? "flex-row-reverse ml-auto"
                  : "flex-row mr-auto"
              } animate-fade-in-up`}
            >
              {/* Avatar */}
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm select-none ${
                entry.type === "user" ? "bg-myPurple600 text-white ml-2" : "bg-[#e7e6ec] text-gray-700 mr-2"
              }`}>
                {entry.type === "user" ? "You" : "Ai"}
              </div>
              {/* Chat bubble */}
              <div
                className={`px-4 py-2 rounded-xl ${
                  entry.type === "user"
                    ? "bg-myPurple600 text-white text-sm"
                    : "bg-[#e7e6ec] text-gray-700 text-sm"
                }`}
              >
                {entry.message}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex items-center mb-2 max-w-[80%] flex-row mr-auto">
              {/* Avatar for AI */}
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm select-none bg-[#e7e6ec] text-gray-700 mr-2 mb-2">
                Ai
              </div>
              {/* Loading bubble */}
              <div className="flex items-center mb-1 px-4 py-2 rounded-xl bg-[#e7e6ec] text-gray-700">
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
              scrollbar-color: #374151 #a9adb5;
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
              0%, 80%, 100% {
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

        {/* Input Field */}
        <div className=" w-[60%] mx-auto border-2 border-[#a9adb5] px-4 py-2 custom-scrollbar">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Type your prompt..."
            className=" p-3 w-[100%]  text-black resize-none focus:outline-none bg-transparent"
            rows={3}
          />
          <button
            className="border border-[#a9adb5]  text-gray-800 mt-2 px-4 py-2 rounded-xl flex items-center justify-center gap-1"
            onClick={async () => {
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

              if (!res.ok) {
                const err = await res.json();
                alert(err.error || "Something went wrong");
                setIsChatLoading(false);
                setIsTemplateLoading(false); // <-- stop spinner
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
                { type: "ai", message: "Resume updated successfully!" },
              ]);
              setParsedData(data);
              setIsChatLoading(false);
              setIsTemplateLoading(false); // <-- stop spinner
              if (!hasRenderedTemplate) setHasRenderedTemplate(true);

            }}
          >
          Send <IoSend />
          </button>
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
        {(selectedTemplate === 4 || selectedTemplate === 1 || selectedTemplate === 7) && (
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
        <RgbColorPicker
          color={
            selectedTemplate === 1
              ? color1
              : selectedTemplate === 4
              ? color4
              : selectedTemplate === 7
              ? color7
              : color1 // fallback
          }
          onChange={
            selectedTemplate === 1
              ? setColor1
              : selectedTemplate === 4
              ? setColor4
              : selectedTemplate === 7
              ? setColor7
              : setColor1 // fallback
          }
        />
        {/* <div className="value">{JSON.stringify(color)}</div> */}

      </div>
      )}

{/* Download Button */}
      {showTemplate && parsedData && (
        <div className="flex w-[70%] mx-auto justify-end mt-4 ">
        {selectedTemplate === 1 && (
          <PDFDownloadLink
            document={<Template1PDF data={parsedData} color={color1}/>}
            fileName="resume.pdf"
            className="bg-myPurple600 text-white px-4 py-2 rounded "
          >
            {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
          </PDFDownloadLink>
        )}
        {selectedTemplate === 2 && (
          <PDFDownloadLink
            document={<Template2PDF data={parsedData} />}
            fileName="resume.pdf"
            className="bg-myPurple600 text-white px-4 py-2 rounded "
          >
            {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
          </PDFDownloadLink>
        )}
        {selectedTemplate === 3 && (
          <PDFDownloadLink
            document={<Template3PDF data={parsedData} />}
            fileName="resume.pdf"
            className="bg-myPurple600 text-white px-4 py-2 rounded "
          >
            {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
          </PDFDownloadLink>
        )}
        {selectedTemplate === 4 && (
          <PDFDownloadLink
            document={<Template4PDF data={parsedData} imageUrl={selectedProcessedImage ?? previewUrl ?? '/dummy.jpg'} imageBgColor={selectedImageBgColor ? tailwindColorMap[selectedImageBgColor] : undefined} color={color4} />}
            fileName="resume.pdf"
            className="bg-myPurple600 text-white px-4 py-2 rounded "
          >
            {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
          </PDFDownloadLink>
        )}
        {selectedTemplate === 5 && (
          <PDFDownloadLink
            document={<Template5PDF data={parsedData} />}
            fileName="resume.pdf"
            className="bg-myPurple600 text-white px-4 py-2 rounded "
          >
            {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
          </PDFDownloadLink>
        )}
         {selectedTemplate === 6 && (
          <PDFDownloadLink
            document={<Template6PDF data={parsedData} />}
            fileName="resume.pdf"
            className="bg-myPurple600 text-white px-4 py-2 rounded "
          >
            {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
          </PDFDownloadLink>
        )}
         {selectedTemplate === 7 && (
          <PDFDownloadLink
            document={<Template7PDF data={parsedData} imageUrl={selectedProcessedImage ?? previewUrl ?? '/dummy.jpg'} imageBgColor={selectedImageBgColor ? tailwindColorMap[selectedImageBgColor] : undefined} color={color7} />}
            fileName="resume.pdf"
            className="bg-myPurple600 text-white px-4 py-2 rounded "
          >
            {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
          </PDFDownloadLink>
        )}
        
      </div>
      )}
    
      <div className="grid grid-cols-1">
        <div>
          {isTemplateLoading && !hasRenderedTemplate ? (
            <div className="flex flex-col gap-1 justify-center items-center h-64">
              <svg className="animate-spin" width="48" height="48" viewBox="0 0 50 50">
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
                  stroke="#9333ea"
                  strokeWidth="8"
                  strokeDasharray="90"
                  strokeDashoffset="30"
                  strokeLinecap="round"
                />
              </svg>
              <p className='text-sm text-myPurple600'>Generating Resume...</p>
            </div>
          ) : (
            showTemplate && parsedData && (
              <div>
                <div className='mt-5'>{renderSelectedTemplate()}</div>
            
              </div>
            )
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

