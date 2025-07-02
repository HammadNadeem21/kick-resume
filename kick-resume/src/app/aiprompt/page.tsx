"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';
import Template1 from '@/components/Template1';
import { useDropzone } from 'react-dropzone';
import LinkdinInfo from '@/components/LinkdinInfo';



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

    const handleGenerate = async () => {
        if(!userPrompt || !selectedTemplate) {
            alert('Please write a prompt and select a template!');
            return;
        }

        try{
            const res = await fetch('/api/generate-resume', {
                method:'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({prompt:userPrompt})
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
        catch(error){
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

    if (selectedTemplate === 1) return <Template1 data={parsedData} />;
    if (selectedTemplate === 2) return <TemplateTwo />;
    if (selectedTemplate === 3) return <TemplateThree />;
    return <p>Please select a template above.</p>;
  };

  const [showTemplate, setShowTemplate] = useState(false);
useEffect(() => {
  setShowTemplate(false); // Reset jab prompt ya template change ho
}, [userPrompt, selectedTemplate]);



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
      setPreviewUrl(json.url);
    } else {
      alert("Failed to process image");
    }
  }}
>
  Remove BG
</Button>







<div className='flex items-center justify-center gap-5 flex-wrap mt-5 mb-5'>
{previewUrl && (
  <div className="w-[200px] h-[200px] rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
    <Image
      src={previewUrl}
      width={158}
      height={158}
      alt="Preview"
      className="object-contain"
    />
  </div>
)}

{previewUrl && (
  <div className="w-[200px] h-[200px] rounded-full bg-white flex items-center justify-center overflow-hidden">
    <Image
      src={previewUrl}
      width={158}
      height={158}
      alt="Preview"
      className="object-contain"
    />
  </div>
)}

{previewUrl && (
  <div className="w-[200px] h-[200px] rounded-full bg-green-500 flex items-center justify-center overflow-hidden">
    <Image
      src={previewUrl}
      width={158}
      height={158}
      alt="Preview"
      className="object-contain"
    />
  </div>
)}

{previewUrl && (
  <div className="w-[200px] h-[200px] rounded-full bg-gray-500 flex items-center justify-center overflow-hidden">
    <Image
      src={previewUrl}
      width={158}
      height={158}
      alt="Preview"
      className="object-contain"
    />
  </div>
)}

{previewUrl && (
  <div className="w-[200px] h-[200px] rounded-full bg-yellow-500 flex items-center justify-center overflow-hidden">
    <Image
      src={previewUrl}
      width={158}
      height={158}
      alt="Preview"
      className="object-contain"
    />
  </div>
)}
</div>


<LinkdinInfo/>


      <div className="flex flex-wrap gap-6 mb-10">
        {templateData.map((template) => (
          <div key={template.id}
      
          onClick={() => getTemplateId(template.id)}
          className={`cursor-pointer border-4 rounded-md transition-all duration-300 ${
              selectedTemplate === template.id ? 'border-primaryColor' : 'border-transparent'
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

         {showTemplate &&  parsedData && showTemplate && (
          <div className='mt-5 w-[70%] mx-auto'>{renderSelectedTemplate()}</div>
         )}

    </div>
  )
}

export default AiPromptPage
