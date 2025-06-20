"use client";
import { LuDownload } from "react-icons/lu";
import { useRef, useState } from "react";
import TemplateOne from "@/components/templates/TemplateOne";
import TemplateTwo from "@/components/templates/TemplateTwo";
import { useResumeDataContext } from "@/context/ResumeBuilderData";
import Image from "next/image";
import TemplateThree from "@/components/templates/TemplateThree";
import { pdf } from '@react-pdf/renderer';
import Template1PDF from '@/components/pdf/Template1PDF';
import Template2PDF from '@/components/pdf/Template2PDF';
import Template3PDF from '@/components/pdf/Template3PDF';

export default function SelectTemplatePage() {
  const { resumeData } = useResumeDataContext();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const renderSelectedTemplate = () => {
    if (!resumeData)
      return (
        <p className="text-red-600">
          No resume data found. Please fill the form first.
        </p>
      );

    if (selectedTemplate === 1) return <TemplateOne />;
    if (selectedTemplate === 2) return <TemplateTwo />;
    if (selectedTemplate === 3) return <TemplateThree />;
    return <p>Please select a template above.</p>;
  };

  const handleDownloadPDF = async () => {
    if (!resumeData) return;

    let blob: Blob | null = null;

    if (selectedTemplate === 1) {
      blob = await pdf(<Template1PDF data={resumeData} />).toBlob();
    } else if (selectedTemplate === 2) {
      blob = await pdf(<Template2PDF data={resumeData} />).toBlob();
    } else if (selectedTemplate === 3) {
      blob = await pdf(<Template3PDF data={resumeData} />).toBlob();
    } else {
      alert('PDF download is only available for Template 1, 2, and 3 using the new PDF engine.');
      return;
    }

    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData?.fullName || 'resume'}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="px-[30px] py-[60px] mx-auto bg-myDarkBlue text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-myWhite">
        Select Your Resume Template
      </h1>

      <div className="flex flex-wrap gap-6 mb-10">
        <div
          onClick={() => setSelectedTemplate(1)}
          className={`cursor-pointer border hover:border-primaryColor ${
            selectedTemplate === 1 ? "border-primaryColor shadow-md" : ""
          }`}
        >
          <Image
            src="/templates/template1.png"
            alt="template-1"
            height={100}
            width={100}
            className="h-[200px] w-[150px]"
          />
        </div>

        <div
          onClick={() => setSelectedTemplate(2)}
          className={`cursor-pointer border hover:border-myLightBlue ${
            selectedTemplate === 2 ? "border-myLightBlue shadow-md" : ""
          }`}
        >
          <Image
            src="/templates/template2.png"
            alt="template-2"
            height={100}
            width={100}
            className="h-[200px] w-[150px]"
          />
        </div>

        <div
          onClick={() => setSelectedTemplate(3)}
          className={`cursor-pointer border hover:border-primaryColor ${
            selectedTemplate === 3 ? "border-primaryColor shadow-md" : ""
          }`}
        >
          <Image
            src="/templates/template3.png"
            alt="template-3"
            height={100}
            width={100}
            className="h-[200px] w-[150px]"
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-myWhite">
        Preview Selected Template
      </h2>

      <div className="lg:w-[794px] sm:w-[580px] min-w-[300px]   min-h-[200px] mx-auto">
      <div
        ref={resumeRef}
        className="shadow"
      >
        {renderSelectedTemplate()}
      </div>
      {selectedTemplate && (
        <div className="mt-6 flex gap-4">
          <button
            className="px-6 py-2 bg-myLightBlue text-primaryColor rounded hover:bg-myMidblue flex items-center gap-1 md:text-sm text-xs"
            onClick={handleDownloadPDF}
          >
           <LuDownload/> Download as PDF
          </button>
        </div>
      )}
      </div>

      
    </div>
  );
}
