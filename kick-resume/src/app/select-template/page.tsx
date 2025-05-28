'use client';

import { useState } from 'react';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import { useResumeDataContext } from '@/context/ResumeBuilderData';
import Image from 'next/image';

export default function SelectTemplatePage() {
  const { resumeData } = useResumeDataContext();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const renderSelectedTemplate = () => {
    if (!resumeData) return <p className="text-red-600">No resume data found. Please fill the form first.</p>;

    if (selectedTemplate === 1) return <TemplateOne />;
    if (selectedTemplate === 2) return <TemplateTwo />;
    return <p>Please select a template above.</p>;
  };

  return (
    <div className="px-[60px] py-[60px] mx-auto bg-myLightBlue">
      <h1 className="text-3xl font-bold mb-6 text-primaryColor">Select Your Resume Template</h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 mb-10">
        <div
          onClick={() => setSelectedTemplate(1)}
          className={`cursor-pointer border rounded-xl hover:border-primaryColor ${
            selectedTemplate === 1 ? 'border-primaryColor shadow-md' : ''
          }`}
        >
          <TemplateOne />
        </div>

        <div
          onClick={() => setSelectedTemplate(2)}
          className={`cursor-pointer border rounded-lg hover:border-primaryColor ${
            selectedTemplate === 2 ? 'border-primaryColor shadow-md' : ''
          }`}
        >
          <Image src='/templates/template1.png' alt='template-1' height={100} width={100} 
          className='h-[200px] w-[150px] rounded-lg'
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-primaryColor">Preview Selected Template</h2>
      <div className="border border-primaryColor p-6 rounded-lg shadow min-h-[200px">
        {renderSelectedTemplate()}
      </div>

      {selectedTemplate && (
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => alert(`Template ${selectedTemplate} selected!`)}
          >
            Use This Template
          </button>
        </div>
      )}
    </div>
  );
}
