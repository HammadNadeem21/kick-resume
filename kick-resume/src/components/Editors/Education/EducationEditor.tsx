import { Button } from "@/components/ui/button";
import React from "react";

const EducationEditor = ({
  educationData,
  setEducationData,
  setParsedData,
  setShowEditor,
  currentEducationField,
}: {
  educationData: Array<any>;
  setEducationData: React.Dispatch<React.SetStateAction<Array<any>>>;
  setParsedData: any;
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>;
  currentEducationField: string;
}) => {
  return (
    <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-black">Edit Education</h2>

      {educationData.map((edu, index) => (
        <div key={index} className="mb-6 border p-3 rounded-md bg-gray-100">
          <input
            type="text"
            value={edu.degree}
            onChange={(e) => {
              const updated = [...educationData];
              updated[index].degree = e.target.value;
              setEducationData(updated);
            }}
            placeholder="Degree"
            className="w-full p-2 mb-2 border text-black"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={edu.startDate}
              onChange={(e) => {
                const updated = [...educationData];
                updated[index].startDate = e.target.value;
                setEducationData(updated);
              }}
              placeholder="Start Date"
              className="flex-1 p-2 mb-2 border text-black"
            />
            <input
              type="text"
              value={edu.endDate}
              onChange={(e) => {
                const updated = [...educationData];
                updated[index].endDate = e.target.value;
                setEducationData(updated);
              }}
              placeholder="End Date"
              className="flex-1 p-2 mb-2 border text-black"
            />
          </div>
          <Button
            onClick={() => {
              const updated = [...educationData];
              updated.splice(index, 1);
              setEducationData(updated);
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
            ...educationData,
            {
              degree: "",
              startDate: "",
              endDate: "",
            },
          ];
          setEducationData(updated);
        }}
        className="bg-green-600 text-white mt-4"
      >
        + Add Education
      </Button>

      <div className="flex justify-end mt-4">
        <button
          className="bg-myDarkBlue text-white px-4 py-2 rounded"
          onClick={() => {
            setParsedData((prev: any) => ({
              ...prev,
              [currentEducationField as string]: educationData,
            }));

            setShowEditor(false);
          }}
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};

export default EducationEditor;
