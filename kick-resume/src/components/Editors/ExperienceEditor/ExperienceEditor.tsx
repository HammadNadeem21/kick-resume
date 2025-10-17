import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import React from "react";

const ExperienceEditor = ({
  experienceData,
  setExperienceData,
  setParsedData,
  setShowEditor,
  currentExperienceField,
}: {
  experienceData: Array<any>;
  setExperienceData: React.Dispatch<React.SetStateAction<Array<any>>>;
  setParsedData: any;
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>;
  currentExperienceField: string;
}) => {
  return (
    <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-black">Edit Experience</h2>

      {experienceData.map((exp, index) => (
        <div key={index} className="mb-6 border p-3 rounded-md bg-gray-100">
          <input
            type="text"
            value={exp.title}
            onChange={(e) => {
              const updated = [...experienceData];
              updated[index].title = e.target.value;
              setExperienceData(updated);
            }}
            placeholder="Title"
            className="w-full p-2 mb-2 border text-black"
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
            className="w-full p-2 mb-2 border text-black"
          />
          <textarea
            value={exp.description}
            onChange={(e) => {
              const updated = [...experienceData];
              updated[index].description = e.target.value;
              setExperienceData(updated);
            }}
            placeholder="Description"
            className="w-full p-2 mb-2 border text-black"
          />
          <div className="grid grid-cols-2 gap-2 mb-2">
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
              buttonClassName="p-2 border text-black"
            />
            <DatePicker
              label="End Date"
              id={`end-${index}`}
              value={
                exp.endDate && exp.endDate !== "Currently working"
                  ? new Date(exp.endDate)
                  : undefined
              }
              onChange={(date) => {
                const updated = [...experienceData];
                updated[index].endDate = date ? date.toISOString() : "";
                setExperienceData(updated);
              }}
              disabled={exp.endDate === "Currently working"}
              className=""
              buttonClassName="p-2 border text-black disabled:opacity-50"
            />
            {/* current employer */}
            <div className="flex items-center gap-2">
              <label
                htmlFor={`currentEmployer-${index}`}
                className="text-black"
              >
                Current Employer
              </label>
              <input
                type="checkbox"
                id={`currentEmployer-${index}`}
                checked={exp.endDate === "Currently Working"}
                onChange={(e) => {
                  const updated = [...experienceData];
                  if (e.target.checked) {
                    updated[index].endDate = "Currently Working";
                  } else {
                    updated[index].endDate = "";
                  }
                  setExperienceData(updated);
                }}
              />
            </div>
          </div>

          <Button
            onClick={() => {
              const updated = [...experienceData];
              updated.splice(index, 1);
              setExperienceData(updated);
            }}
            className="bg-red-500 hover:bg-red-700 text-white"
          >
            Remove
          </Button>
        </div>
      ))}

      {/* Add new experience */}
      <Button
        onClick={() => {
          const updated = [
            ...experienceData,
            {
              title: "",
              company: "",
              description: "",
              startDate: "",
              endDate: "",
            },
          ];
          setExperienceData(updated);
        }}
        className="bg-green-500 hover:bg-green-700 text-white mt-4"
      >
        + Add Experience
      </Button>

      <div className="flex justify-between mt-4">
        <button
          className="bg-myDarkBlue text-white px-4 py-2 rounded"
          onClick={() => {
            setParsedData((prev: any) => ({
              ...prev,
              [currentExperienceField as string]: experienceData,
            }));
            setShowEditor(false);
          }}
        >
          Save
        </button>

        <button
          className="bg-myDarkBlue text-white px-4 py-2 rounded"
          onClick={() => setShowEditor(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExperienceEditor;
