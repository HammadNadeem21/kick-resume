"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';
import Template1 from '@/components/Template1';


const templateData = [
  { image: '/templates/template1.png', name: 'Template 1', id: 1 },
  // { image: '/templates/template2.png', name: 'Template 2', id: 2 },
  // { image: '/templates/template3.png', name: 'Template 3', id: 3 },
]

const AiPromptPage = () => {

    const [userPrompt, setUserPrompt] = useState<string>('');
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [parsedData, setParsedData] = useState<any>(null);

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
