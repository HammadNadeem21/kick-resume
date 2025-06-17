// 'use client';

// import { useState } from 'react';
// import TemplateOne from '@/components/templates/TemplateOne';
// import TemplateTwo from '@/components/templates/TemplateTwo';
// import { useResumeDataContext } from '@/context/ResumeBuilderData';
// import Image from 'next/image';

// export default function SelectTemplatePage() {
//   const { resumeData } = useResumeDataContext();
//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

//   const renderSelectedTemplate = () => {
//     if (!resumeData) return <p className="text-red-600">No resume data found. Please fill the form first.</p>;

//     if (selectedTemplate === 1) return <TemplateOne />;
//     if (selectedTemplate === 2) return <TemplateTwo />;
//     return <p>Please select a template above.</p>;
//   };

//   return (
//     <div className="px-[60px] py-[60px] mx-auto bg-myLightBlue">
//       <h1 className="text-3xl font-bold mb-6 text-primaryColor">Select Your Resume Template</h1>

//       <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 mb-10">
//         <div
//           onClick={() => setSelectedTemplate(1)}
//           className={`cursor-pointer border rounded-xl hover:border-primaryColor ${
//             selectedTemplate === 1 ? 'border-primaryColor shadow-md' : ''
//           }`}
//         >
//           <TemplateOne />
//         </div>

//         <div
//           onClick={() => setSelectedTemplate(2)}
//           className={`cursor-pointer border rounded-lg hover:border-primaryColor ${
//             selectedTemplate === 2 ? 'border-primaryColor shadow-md' : ''
//           }`}
//         >
//           <Image src='/templates/template1.png' alt='template-1' height={100} width={100} 
//           className='h-[200px] w-[150px] rounded-lg'
//           />
//         </div>
//       </div>

//       <h2 className="text-2xl font-semibold mb-4 text-primaryColor">Preview Selected Template</h2>
//       <div className="border border-primaryColor p-6 rounded-lg shadow min-h-[200px">
//         {renderSelectedTemplate()}
//       </div>

//       {selectedTemplate && (
//         <div className="mt-6">
//           <button
//             className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             onClick={() => alert(`Template ${selectedTemplate} selected!`)}
//           >
//             Download PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useRef, useState } from 'react';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import { useResumeDataContext } from '@/context/ResumeBuilderData';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TemplateThree from '@/components/templates/TemplateThree';

export default function SelectTemplatePage() {
  const { resumeData } = useResumeDataContext();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const renderSelectedTemplate = () => {
    if (!resumeData) return <p className="text-red-600">No resume data found. Please fill the form first.</p>;

    if (selectedTemplate === 1) return <TemplateOne />;
    if (selectedTemplate === 2) return <TemplateTwo />;
    if (selectedTemplate === 3) return <p>Template Three is not availabale</p>
    return <p>Please select a template above.</p>;
  };

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2, // Increase scale for better quality
      backgroundColor: null, // Transparent background
      useCORS: true, // Enable CORS for images
      logging: true, // Enable logging for debugging
    });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16, // Adjust for better quality
    });

    const imageProperties = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imageProperties.height * pdf.internal.pageSize.getWidth()) / imageProperties.width;

    // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resumeData?.fullName}_resume.pdf`);
  };

  return (
    <div className="px-[60px] py-[60px] mx-auto bg-myLightBlue">
      <h1 className="text-3xl font-bold mb-6 text-primaryColor">Select Your Resume Template</h1>

      <div className="flex flex-wrap gap-6 mb-10">
        <div
          onClick={() => setSelectedTemplate(1)}
          className={`cursor-pointer border hover:border-primaryColor ${
            selectedTemplate === 1 ? 'border-primaryColor shadow-md' : ''
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
          className={`cursor-pointer border hover:border-primaryColor ${
            selectedTemplate === 2 ? 'border-primaryColor shadow-md' : ''
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
            selectedTemplate === 3 ? 'border-primaryColor shadow-md' : ''
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

      <h2 className="text-2xl font-semibold mb-4 text-primaryColor">Preview Selected Template</h2>
      <div ref={resumeRef} className="w-[794px] h-[1123px] rounded-lg shadow min-h-[200px] bg-white text-black">
        {renderSelectedTemplate()}
      </div>

      {selectedTemplate && (
        <div className="mt-6 flex gap-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleDownloadPDF}
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}

