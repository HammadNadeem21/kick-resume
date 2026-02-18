"use client";

import React, { useState } from "react";
import { Copy, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeTemplateList from "@/components/ResumeTemplateList";
import ResumeImageUploader from "@/components/ResumeImageUploader";
import { Button } from "@/components/ui/button";

interface ResumeBuilderSidebarProps {
  selectedTemplate?: number | null;
  setSelectedTemplate?: (id: number | null) => void;
  imageFile?: File | null;
  setImageFile?: (file: File | null) => void;
  previewUrl?: string | null;
  setPreviewUrl?: (url: string | null) => void;
  processedUrl?: string | null;
  setProcessedUrl?: (url: string | null) => void;
  selectedProcessedImage?: string | null;
  setSelectedProcessedImage?: (url: string | null) => void;
  selectedImageBgColor?: string | undefined;
  setSelectedImageBgColor?: (color: string | undefined) => void;
}

const ResumeBuilderSidebar: React.FC<ResumeBuilderSidebarProps> = (props) => {
  const [activePanel, setActivePanel] = useState<"none" | "template" | "image">(
    "none"
  );

  const togglePanel = (panel: "template" | "image") => {
    setActivePanel(activePanel === panel ? "none" : panel);
  };

  return (
    <>
      {/* Sidebar Icons */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-white shadow-xl p-2 rounded-l-xl z-50 border border-gray-200">
        <button
          onClick={() => togglePanel("template")}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 w-16 ${
            activePanel === "template"
              ? "bg-mySkyBlue text-white shadow-lg scale-105"
              : "text-gray-500 hover:bg-gray-100 hover:text-mySkyBlue"
          }`}
          title="Select Template"
        >
          <Copy size={20} />
          <span className="text-[10px] font-medium">Template</span>
        </button>
        <button
          onClick={() => togglePanel("image")}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 w-16 ${
            activePanel === "image"
              ? "bg-mySkyBlue text-white shadow-lg scale-105"
              : "text-gray-500 hover:bg-gray-100 hover:text-mySkyBlue"
          }`}
          title="Upload Image"
        >
          <ImageIcon size={20} />
          <span className="text-[10px] font-medium">Upload</span>
        </button>
      </div>

      {/* Sliding Panels */}
      <AnimatePresence>
        {activePanel !== "none" && (
          <>
            {/* Backdrop for mobile/smaller screens to close panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePanel("none")}
              className="fixed inset-0 bg-black/40 z-[110]"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[350px] bg-white shadow-2xl z-[120] border-l border-gray-200 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                <h3 className="font-bold text-lg text-gray-800">
                  {activePanel === "template" ? "Choose Template" : "Upload Image"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActivePanel("none")}
                  className="hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="flex-1 overflow-hidden relative">
                {activePanel === "template" && (
                  <ResumeTemplateList
                    selectedTemplate={props.selectedTemplate}
                    setSelectedTemplate={props.setSelectedTemplate}
                  />
                )}
                {activePanel === "image" && (
                  <div className="p-6 h-full overflow-y-auto">
                    <ResumeImageUploader
                      imageFile={props.imageFile}
                      setImageFile={props.setImageFile}
                      previewUrl={props.previewUrl}
                      setPreviewUrl={props.setPreviewUrl}
                      processedUrl={props.processedUrl}
                      setProcessedUrl={props.setProcessedUrl}
                      selectedProcessedImage={props.selectedProcessedImage}
                      setSelectedProcessedImage={props.setSelectedProcessedImage}
                      selectedImageBgColor={props.selectedImageBgColor}
                      setSelectedImageBgColor={props.setSelectedImageBgColor}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeBuilderSidebar;
