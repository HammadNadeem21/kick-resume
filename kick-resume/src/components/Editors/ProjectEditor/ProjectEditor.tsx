import { Button } from "@/components/ui/button";
import React from "react";

const ProjectEditor = ({
  projectData,
  setProjectData,
  setParsedData,
  setShowEditor,
  currentProjectField,
}: {
  projectData: Array<any>;
  setProjectData: React.Dispatch<React.SetStateAction<Array<any>>>;
  setParsedData: any;
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>;
  currentProjectField: string;
}) => {
  return (
    <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-black">Edit Projects</h2>

      {projectData.map((proj, index) => (
        <div key={index} className="mb-6 border p-3 rounded-md bg-gray-100">
          <input
            type="text"
            value={proj.name}
            onChange={(e) => {
              const updated = [...projectData];
              updated[index].name = e.target.value;
              setProjectData(updated);
            }}
            placeholder="Project Name"
            className="w-full p-2 mb-2 border text-black"
          />
          <textarea
            value={proj.description}
            onChange={(e) => {
              const updated = [...projectData];
              updated[index].description = e.target.value;
              setProjectData(updated);
            }}
            placeholder="Description"
            className="w-full p-2 mb-2 border text-black"
          />
          <input
            type="text"
            value={proj.github}
            onChange={(e) => {
              const updated = [...projectData];
              updated[index].github = e.target.value;
              setProjectData(updated);
            }}
            placeholder="GitHub Link"
            className="w-full p-2 mb-2 border text-black"
          />
          <input
            type="text"
            value={proj.live}
            onChange={(e) => {
              const updated = [...projectData];
              updated[index].live = e.target.value;
              setProjectData(updated);
            }}
            placeholder="Live Link"
            className="w-full p-2 mb-2 border text-black"
          />
          <Button
            onClick={() => {
              const updated = [...projectData];
              updated.splice(index, 1);
              setProjectData(updated);
            }}
            className="bg-red-600 text-white"
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        onClick={() => {
          const updated = [
            ...projectData,
            {
              name: "",
              description: "",
              github: "",
              live: "",
            },
          ];
          setProjectData(updated);
        }}
        className="bg-green-600 text-white mt-4"
      >
        + Add Project
      </Button>

      <div className="flex justify-end mt-4">
        <button
          className="bg-myDarkBlue text-white px-4 py-2 rounded"
          onClick={() => {
            setParsedData((prev: any) => ({
              ...prev,
              [currentProjectField as string]: projectData,
            }));
            setShowEditor(false);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProjectEditor;
