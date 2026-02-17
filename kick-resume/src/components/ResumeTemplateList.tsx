"use client";

import React from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { useAiResumeBuilder } from "@/context/AiResumeBuilder";

const templateData = [
  { image: "/templates/template1.png", name: "Template 1", id: 1 },
  { image: "/templates/template2.png", name: "Template 2", id: 2 },
  { image: "/templates/template3.png", name: "Template 3", id: 3 },
  { image: "/templates/template4.png", name: "Template 4", id: 4 },
  { image: "/templates/template5.png", name: "Template 5", id: 5 },
  { image: "/templates/template6.png", name: "Template 6", id: 6 },
  { image: "/templates/template7.png", name: "Template 7", id: 7 },
  { image: "/templates/template8.png", name: "Template 8", id: 8 },
  { image: "/templates/template9.png", name: "Template 9", id: 9 },
  { image: "/templates/template10.png", name: "Template 10", id: 10 },
];

const ResumeTemplateList = () => {
  const { selectedTemplate, setSelectedTemplate } = useAiResumeBuilder();

  return (
    <div className="grid grid-cols-1 gap-4 px-10 py-4 h-full overflow-y-auto custom-scrollbar">
      {templateData.map((template) => (
        <div
          key={template.id}
          className="relative cursor-pointer rounded-md transition-all duration-300 transform hover:scale-105"
          onClick={() => setSelectedTemplate(template.id)}
        >
          <div className="w-full shadow-md shadow-mySkyBlue/20 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={template.image}
              alt={template.name}
              height={500}
              width={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {selectedTemplate === template.id && (
            <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center rounded-lg animate-in fade-in duration-200">
              <div className="bg-mySkyBlue text-white rounded-full p-2 shadow-lg">
                <TiTick size={30} />
              </div>
            </div>
          )}
          <p className="mt-2 text-center text-sm font-medium text-gray-600">
            {template.name}
          </p>
        </div>
      ))}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default ResumeTemplateList;
