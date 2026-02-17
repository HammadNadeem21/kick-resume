"use client";

import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import { AnimatePresence, motion } from "framer-motion";

type EditType =
  | "string"
  | "array"
  | "experience"
  | "projects"
  | "education"
  | "phone"
  | "email"
  | "personal"
  | "customSection"
  | "customSection2";

interface ResumeEditorModalProps {
  showEditor: boolean;
  setShowEditor: (show: boolean) => void;
  editType: EditType;

  // String field props
  inputData: string | string[] | number;
  handleStringFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  // Array field props
  newItem: string;
  setNewItem: (value: string) => void;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;

  // Experience props
  currentExperienceField: string | null;
  experienceData: any[];
  setExperienceData: (data: any[]) => void;

  // Project props
  currentProjectField: string | null;
  projectData: any[];
  setProjectData: (data: any[]) => void;

  // Education props
  currentEducationField: string | null;
  educationData: any[];
  setEducationData: (data: any[]) => void;

  // Personal props
  currentPersonalField: string | null;
  personalInfoData: Array<{ title: string; value: string }>;
  setPersonalInfoData: (data: any) => void;

  // Custom section props
  customSectionData: Array<{ title: string; value: string[] }>;
  setCustomSectionData: (data: any) => void;
  customSection2Data: Array<{ title: string; value: string[] }>;
  setCustomSection2Data: (data: any) => void;

  // Common
  setParsedData: (data: any) => void;
}

const getEditorTitle = (editType: EditType): string => {
  const titles: Record<EditType, string> = {
    string: "Edit Content",
    array: "Manage Items",
    experience: "Work Experience",
    projects: "Projects",
    education: "Education",
    personal: "Personal Information",
    customSection: "Custom Section",
    customSection2: "Custom Section 2",
    phone: "Edit Phone",
    email: "Edit Email",
  };
  return titles[editType] || "Editor";
};

const ResumeEditorModal: React.FC<ResumeEditorModalProps> = ({
  showEditor,
  setShowEditor,
  editType,
  inputData,
  handleStringFieldChange,
  newItem,
  setNewItem,
  handleAddItem,
  handleRemoveItem,
  currentExperienceField,
  experienceData,
  setExperienceData,
  currentProjectField,
  projectData,
  setProjectData,
  currentEducationField,
  educationData,
  setEducationData,
  currentPersonalField,
  personalInfoData,
  setPersonalInfoData,
  customSectionData,
  setCustomSectionData,
  customSection2Data,
  setCustomSection2Data,
  setParsedData,
}) => {
  const handleSaveAndClose = () => {
    // Save data based on edit type
    if (editType === "experience" && currentExperienceField) {
      setParsedData((prev: any) => ({
        ...prev,
        [currentExperienceField]: experienceData,
      }));
    } else if (editType === "projects" && currentProjectField) {
      setParsedData((prev: any) => ({
        ...prev,
        [currentProjectField]: projectData,
      }));
    } else if (editType === "education" && currentEducationField) {
      setParsedData((prev: any) => ({
        ...prev,
        [currentEducationField]: educationData,
      }));
    } else if (editType === "personal" && currentPersonalField) {
      setParsedData((prev: any) => ({
        ...prev,
        [currentPersonalField]: personalInfoData,
      }));
    } else if (editType === "customSection") {
      setParsedData((prev: any) => ({
        ...prev,
        customSection: customSectionData,
      }));
    } else if (editType === "customSection2") {
      setParsedData((prev: any) => ({
        ...prev,
        customSection2: customSection2Data,
      }));
    }
    setShowEditor(false);
  };

  const renderDynamicFields = () => {
    // Experience Editor
    if (editType === "experience") {
      return (
        <div className="space-y-4">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-3"
            >
              <input
                type="text"
                value={exp.title || ""}
                onChange={(e) => {
                  const updated = [...experienceData];
                  updated[index].title = e.target.value;
                  setExperienceData(updated);
                }}
                placeholder="Job Title"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all font-medium"
              />
              <input
                type="text"
                value={exp.companyName || ""}
                onChange={(e) => {
                  const updated = [...experienceData];
                  updated[index].companyName = e.target.value;
                  setExperienceData(updated);
                }}
                placeholder="Company Name"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
              />
              <textarea
                value={exp.description || ""}
                onChange={(e) => {
                  const updated = [...experienceData];
                  updated[index].description = e.target.value;
                  setExperienceData(updated);
                }}
                placeholder="Job Description"
                rows={3}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <DatePicker
                  label="Start Date"
                  id={`start-${index}`}
                  value={exp.startDate ? new Date(exp.startDate) : undefined}
                  onChange={(date) => {
                    const updated = [...experienceData];
                    updated[index].startDate = date ? date.toISOString() : "";
                    setExperienceData(updated);
                  }}
                  className=""
                  buttonClassName="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-white"
                />
                <DatePicker
                  label="End Date"
                  id={`end-${index}`}
                  value={
                    exp.endDate && exp.endDate !== "Currently Working"
                      ? new Date(exp.endDate)
                      : undefined
                  }
                  onChange={(date) => {
                    const updated = [...experienceData];
                    updated[index].endDate = date ? date.toISOString() : "";
                    setExperienceData(updated);
                  }}
                  disabled={exp.endDate === "Currently Working"}
                  className=""
                  buttonClassName="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-white disabled:opacity-50"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={exp.endDate === "Currently Working"}
                  onChange={(e) => {
                    const updated = [...experienceData];
                    updated[index].endDate = e.target.checked
                      ? "Currently Working"
                      : "";
                    setExperienceData(updated);
                  }}
                  className="w-4 h-4 text-mySkyBlue rounded focus:ring-mySkyBlue"
                />
                <label
                  htmlFor={`current-${index}`}
                  className="text-sm font-medium text-gray-700"
                >
                  Currently Working Here
                </label>
              </div>
              <Button
                onClick={() => {
                  const updated = [...experienceData];
                  updated.splice(index, 1);
                  setExperienceData(updated);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl"
              >
                <Trash2 size={16} className="mr-2" />
                Remove Experience
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              setExperienceData([
                ...experienceData,
                {
                  title: "",
                  companyName: "",
                  description: "",
                  startDate: "",
                  endDate: "",
                },
              ]);
            }}
            className="w-full bg-mySkyBlue hover:bg-sky-600 text-white rounded-xl font-bold"
          >
            <Plus size={18} className="mr-2" />
            Add Experience
          </Button>
        </div>
      );
    }

    // Projects Editor
    if (editType === "projects") {
      return (
        <div className="space-y-4">
          {projectData.map((proj, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-3"
            >
              <input
                type="text"
                value={proj.name || ""}
                onChange={(e) => {
                  const updated = [...projectData];
                  updated[index].name = e.target.value;
                  setProjectData(updated);
                }}
                placeholder="Project Name"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all font-medium"
              />
              <textarea
                value={proj.description || ""}
                onChange={(e) => {
                  const updated = [...projectData];
                  updated[index].description = e.target.value;
                  setProjectData(updated);
                }}
                placeholder="Project Description"
                rows={3}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all resize-none"
              />
              <input
                type="text"
                value={proj.github || ""}
                onChange={(e) => {
                  const updated = [...projectData];
                  updated[index].github = e.target.value;
                  setProjectData(updated);
                }}
                placeholder="GitHub Link"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
              />
              <input
                type="text"
                value={proj.live || ""}
                onChange={(e) => {
                  const updated = [...projectData];
                  updated[index].live = e.target.value;
                  setProjectData(updated);
                }}
                placeholder="Live Link"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
              />
              <Button
                onClick={() => {
                  const updated = [...projectData];
                  updated.splice(index, 1);
                  setProjectData(updated);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl"
              >
                <Trash2 size={16} className="mr-2" />
                Remove Project
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              setProjectData([
                ...projectData,
                {
                  name: "",
                  description: "",
                  github: "",
                  live: "",
                },
              ]);
            }}
            className="w-full bg-mySkyBlue hover:bg-sky-600 text-white rounded-xl font-bold"
          >
            <Plus size={18} className="mr-2" />
            Add Project
          </Button>
        </div>
      );
    }

    // Education Editor
    if (editType === "education") {
      return (
        <div className="space-y-4">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-3"
            >
              <input
                type="text"
                value={edu.degree || ""}
                onChange={(e) => {
                  const updated = [...educationData];
                  updated[index].degree = e.target.value;
                  setEducationData(updated);
                }}
                placeholder="Degree / Certification"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all font-medium"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={edu.startDate || ""}
                  onChange={(e) => {
                    const updated = [...educationData];
                    updated[index].startDate = e.target.value;
                    setEducationData(updated);
                  }}
                  placeholder="Start Date"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  value={edu.endDate || ""}
                  onChange={(e) => {
                    const updated = [...educationData];
                    updated[index].endDate = e.target.value;
                    setEducationData(updated);
                  }}
                  placeholder="End Date"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
                />
              </div>
              <Button
                onClick={() => {
                  const updated = [...educationData];
                  updated.splice(index, 1);
                  setEducationData(updated);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl"
              >
                <Trash2 size={16} className="mr-2" />
                Remove Education
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              setEducationData([
                ...educationData,
                {
                  degree: "",
                  startDate: "",
                  endDate: "",
                },
              ]);
            }}
            className="w-full bg-mySkyBlue hover:bg-sky-600 text-white rounded-xl font-bold"
          >
            <Plus size={18} className="mr-2" />
            Add Education
          </Button>
        </div>
      );
    }

// Personal Information Editor
    if (editType === "personal") {
      return (
        <div className="space-y-4">
          {personalInfoData.map((item, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-3"
            >
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) => {
                  const updated = [...personalInfoData];
                  updated[index].title = e.target.value;
                  setPersonalInfoData(updated);
                }}
                placeholder="Title (e.g., Phone, LinkedIn)"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all font-medium"
              />
              <input
                type="text"
                value={item.value || ""}
                onChange={(e) => {
                  const updated = [...personalInfoData];
                  updated[index].value = e.target.value;
                  setPersonalInfoData(updated);
                }}
                placeholder="Value"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
              />
              <Button
                onClick={() => {
                  const updated = [...personalInfoData];
                  updated.splice(index, 1);
                  setPersonalInfoData(updated);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl"
              >
                <Trash2 size={16} className="mr-2" />
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              setPersonalInfoData([...personalInfoData, { title: "", value: "" }]);
            }}
            className="w-full bg-mySkyBlue hover:bg-sky-600 text-white rounded-xl font-bold"
          >
            <Plus size={18} className="mr-2" />
            Add Field
          </Button>
        </div>
      );
    }

    // Custom Section Editor
    if (editType === "customSection" || editType === "customSection2") {
      const data = editType === "customSection" ? customSectionData : customSection2Data;
      const setData = editType === "customSection" ? setCustomSectionData : setCustomSection2Data;

      return (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-3"
            >
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) => {
                  const updated = [...data];
                  updated[index].title = e.target.value;
                  setData(updated);
                }}
                placeholder="Section Title"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all font-medium"
              />
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Values
                </label>
                {item.value && item.value.map((val, vIdx) => (
                  <div key={vIdx} className="flex gap-2">
                    <input
                      type="text"
                      value={val || ""}
                      onChange={(e) => {
                        const updated = [...data];
                        const values = [...updated[index].value];
                        values[vIdx] = e.target.value;
                        updated[index].value = values;
                        setData(updated);
                      }}
                      placeholder={`Value ${vIdx + 1}`}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
                    />
                    <Button
                      onClick={() => {
                        const updated = [...data];
                        const values = [...updated[index].value];
                        values.splice(vIdx, 1);
                        updated[index].value = values;
                        setData(updated);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-3"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    const updated = [...data];
                    updated[index].value = [...(updated[index].value || []), ""];
                    setData(updated);
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-sm"
                >
                  <Plus size={14} className="mr-1" />
                  Add Value
                </Button>
              </div>
              <Button
                onClick={() => {
                  const updated = [...data];
                  updated.splice(index, 1);
                  setData(updated);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl"
              >
                <Trash2 size={16} className="mr-2" />
                Remove Section
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              setData([...data, { title: "", value: [""] }]);
            }}
            className="w-full bg-mySkyBlue hover:bg-sky-600 text-white rounded-xl font-bold"
          >
            <Plus size={18} className="mr-2" />
            Add Section
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {showEditor && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setShowEditor(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl z-50"
          >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-mySkyBlue/5 to-transparent">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {getEditorTitle(editType)}
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                Make changes to your resume
              </p>
            </div>
            <button
              onClick={() => setShowEditor(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* String Field Editor */}
            {editType === "string" && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">
                  Content
                </label>
                <textarea
                  value={inputData as string}
                  onChange={handleStringFieldChange}
                  className="w-full min-h-[150px] resize-none border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
                  placeholder="Enter your content here..."
                />
              </div>
            )}

            {/* Array Field Editor */}
            {editType === "array" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Current Items
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(inputData as string[]).length === 0 ? (
                      <p className="text-sm text-gray-400 italic">
                        No items added yet
                      </p>
                    ) : (
                      (inputData as string[]).map((item, i) => (
                        <span
                          key={i}
                          className="bg-mySkyBlue/10 text-mySkyBlue px-4 py-2 rounded-full flex items-center gap-2 font-medium text-sm border border-mySkyBlue/20 hover:bg-mySkyBlue/20 transition-colors"
                        >
                          {item}
                          <button
                            onClick={() => handleRemoveItem(i)}
                            className="hover:bg-mySkyBlue/30 rounded-full p-0.5 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">
                    Add New Item
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                      placeholder="Type and press Enter or click Add"
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mySkyBlue focus:border-transparent transition-all"
                    />
                    <Button
                      onClick={handleAddItem}
                      className="bg-mySkyBlue hover:bg-sky-600 text-white font-bold px-6 rounded-xl shadow-lg shadow-mySkyBlue/20 transition-all"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Complex Fields */}
            {renderDynamicFields()}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleSaveAndClose}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95"
            >
              Save & Close
            </button>
          </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeEditorModal;
