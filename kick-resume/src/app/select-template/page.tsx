'use client';

import { useState } from 'react';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import { useResumeDataContext } from '@/context/ResumeBuilderData';

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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Select Your Resume Template</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div
          onClick={() => setSelectedTemplate(1)}
          className={`cursor-pointer border p-4 rounded-lg hover:border-blue-500 ${
            selectedTemplate === 1 ? 'border-blue-600 shadow-md' : ''
          }`}
        >
          <TemplateOne />
        </div>

        <div
          onClick={() => setSelectedTemplate(2)}
          className={`cursor-pointer border p-4 rounded-lg hover:border-blue-500 ${
            selectedTemplate === 2 ? 'border-blue-600 shadow-md' : ''
          }`}
        >
          <TemplateTwo />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Preview Selected Template</h2>
      <div className="border p-6 rounded-lg shadow min-h-[200px] bg-white">
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
