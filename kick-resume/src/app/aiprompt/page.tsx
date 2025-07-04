"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';
import Template1 from '@/components/Template1';
import { useDropzone } from 'react-dropzone';



const templateData = [
  { image: '/templates/template1.png', name: 'Template 1', id: 1 },
  // { image: '/templates/template2.png', name: 'Template 2', id: 2 },
  // { image: '/templates/template3.png', name: 'Template 3', id: 3 },
]

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
  const [editType, setEditType] = useState<"string" | "array">("string");
  const [editField, setEditField] = useState<"skills" | "languages" | "certifications" | null>(null);
  const [inputData, setInputData] = useState<string | string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [currentStringField, setCurrentStringField] = useState<string | null>(null);
  const [currentArrayField, setCurrentArrayField] = useState<string | null>(null);



  const handleGenerate = async () => {
    if (!userPrompt || !selectedTemplate) {
      alert('Please write a prompt and select a template!');
      return;
    }

    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      })
      if (!res.ok) {
        const err = await res.json();
        console.error("API Error:", err); // show actual error
        alert(err.error || "Something went wrong");
        return;
      }

      const data = await res.json();
      setParsedData(data)
      setShowTemplate(true);
    }
    catch (error) {
      console.log("Error", error);

    }
  }






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

  // const handleSummaryClick = (data: string | string[]) => {
  //   setInputData(data);
  //   setEditType("string");
  //   setShowEditor(true);
  // };

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

  // const handleRemoveItem = (index: number) => {
  //   const updated = [...(inputData as string[])];
  //   updated.splice(index, 1);
  //   setInputData(updated);

  //   setParsedData((prev: any) => ({
  //     ...prev,
  //     [editField!]: updated,
  //   }));
  // };

  // const handleAddItem = () => {
  //   if (newItem.trim() === "") return;
  //   const updated = [...(inputData as string[]), newItem.trim()];
  //   setInputData(updated);
  //   setNewItem("");

  //   setParsedData((prev: any) => ({
  //     ...prev,
  //     [editField!]: updated,
  //   }));
  // };




  // const handleGenerate = async () => {
  //   if (!userPrompt || !selectedTemplate ) {
  //     alert("Please write a prompt, select a template, and upload a picture!");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("prompt", userPrompt);
  //     // formData.append("image", imageFile); // 🆕

  //     const res = await fetch("/api/generate-resume", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       const err = await res.json();
  //       console.error("API Error:", err);
  //       alert(err.error || "Something went wrong");
  //       return;
  //     }

  //     const data = await res.json();
  //     setParsedData(data);
  //     setShowTemplate(true);
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };




  useEffect(() => {
    if (parsedData) {
      console.log("Parsed Data:", parsedData);
    }
  }, [parsedData]);



  const getTemplateId = (image: number) => {
    setSelectedTemplate(image);
  }



  const renderSelectedTemplate = () => {

    if (selectedTemplate === 1) return <Template1 data={parsedData}
      handleStringFeildClick={handleStringFieldClick}
      handleArrayFieldClick={handleArrayFieldClick}

    />;
    if (selectedTemplate === 2) return <TemplateTwo />;
    if (selectedTemplate === 3) return <TemplateThree />;
    return <p>Please select a template above.</p>;
  };

  const [showTemplate, setShowTemplate] = useState(false);
  useEffect(() => {
    setShowTemplate(false); // Reset jab prompt ya template change ho
  }, [userPrompt, selectedTemplate]);



  // Summary Edit
  // const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

  //   const newSummary = e.target.value;
  //   setInputData(newSummary);

  //   setParsedData((prev: any) => ({
  //     ...prev,
  //     summary: newSummary
  //   }))

  // }


  // const handleEditorSave = () => {
  //   if (editMode === 'summary') {
  //     setParsedData((prev: any) => ({
  //       ...prev,
  //       summary: inputData,
  //     }));
  //   } else if (editMode === 'skills') {
  //     const updatedSkills = typeof inputData === 'string'
  //       ? inputData.split(',').map(item => item.trim())
  //       : [];
  //     setParsedData((prev: any) => ({
  //       ...prev,
  //       skills: updatedSkills,
  //     }));
  //   }

  //   setShowEditor(false);
  //   setEditMode(null);
  // };



  // List Change
  const handleListChange = (data: string[]) => {
    const newList = data
    setInputData(newList)

  }


  console.log("Preview URL:", previewUrl);

  return (
    <div className="px-[30px] py-[60px] mx-auto bg-myDarkBlue text-white min-h-screen">

      <h1 className="text-3xl font-bold mb-6 text-myWhite">
        Build Your AI-Powered Resume in Seconds
      </h1>

      <textarea
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Type your prompt here..."
        className="w-full h-40 p-4 text-black rounded-md mb-6"
      />

      {/* Image Preview + Dropzone Uploader */}
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
          <div className="w-[170px] h-[170px] rounded-full flex items-center justify-center overflow-hidden border border-white">
            <Image
              src={previewUrl ? previewUrl : processedUrl}
              width={170}
              height={170}
              alt={`Original`}
              className="object-contain"
            />
          </div>
          {['bg-blue-500', 'bg-white', 'bg-green-500', 'bg-gray-500', 'bg-yellow-500'].map((bg, index) => (
            <div key={index} className={`w-[170px] h-[170px] rounded-full ${bg} flex items-center justify-center overflow-hidden`}>
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



      <div className="flex flex-wrap gap-6 mb-10">
        {templateData.map((template) => (
          <div key={template.id}

            onClick={() => getTemplateId(template.id)}
            className={`cursor-pointer border-4 rounded-md transition-all duration-300 ${selectedTemplate === template.id ? 'border-primaryColor' : 'border-transparent'
              } hover:border-primaryColor`}
          >
            <Image src={template.image} alt={template.name} height={150} width={150} />
          </div>
        ))}
      </div>



      <Button
        variant='secondary'
        className='bg-myMidblue hover:bg-myMidblue/60'
        onClick={handleGenerate}
      >Create</Button>


      <div className="grid grid-cols-[66%,34%]">
        <div>
          {showTemplate && parsedData && showTemplate && (
            <div className='mt-5 w-[100%]  '>{renderSelectedTemplate()}</div>
          )}
        </div>

        {/* {
          showEditor && (
            <p className="bg-blue-500 h-[17%] mt-5">

              <textarea value={inputData || ""}
                onChange={handleSummaryChange} className='w-full h-[150px] text-black p-5' />
              <Button variant={'outline'}
                onClick={() => setShowEditor(false)}
              >Save</Button>
            </p>
          )
        } */}


        {/* {showEditor && (
          <div className="fixed inset-0 flex items-center justify-center bg-primaryColor bg-opacity-70 z-50">
            <div className="bg-myMidblue p-6 rounded-md w-[400px]">
              <h2 className="text-lg font-bold mb-4 text-black">Edit Summary</h2>
              <textarea
                value={inputData}
                onChange={handleSummaryChange}
                className="w-full h-32 resize-none border border-primaryColor rounded-md p-2 text-black bg-transparent"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-myDarkBlue text-white px-4 py-2 rounded"
                  onClick={() => setShowEditor(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )} */}





        {/* Slide-in Side Drawer Editor */}
        {/* <div className={`fixed top-0 right-0 h-full w-[400px] bg-myWhite shadow-lg z-50 transition-transform duration-500 ease-in-out transform ${showEditor ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black">
              {editMode === 'summary' ? 'Edit Summary' : 'Edit Skills'}
            </h2>
            <textarea
              value={inputData}
              onChange={handleSummaryChange}
              className="w-full h-32 resize-none border border-primaryColor rounded-md p-2 text-black bg-transparent"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-myDarkBlue text-white px-4 py-2 rounded"
                onClick={handleEditorSave}
              >
                Save
              </button>
            </div>
          </div>
        </div> */}


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

              <div className="flex justify-end mt-4">
                <button
                  className="bg-myDarkBlue text-white px-4 py-2 rounded"
                  onClick={() => setShowEditor(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}


      </div>

    </div>
  )
}

export default AiPromptPage
