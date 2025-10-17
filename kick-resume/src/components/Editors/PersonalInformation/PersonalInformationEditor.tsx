// import { Button } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import React from "react";

const PersonalInformationEditor = ({
  personalInfoData,
  setPersonalInfoData,
  setParsedData,
  currentPersonalField,
  setShowEditor,
}: {
  personalInfoData: Array<{ title: string; value: string }>;
  setPersonalInfoData: React.Dispatch<
    React.SetStateAction<Array<{ title: string; value: string }>>
  >;
  setParsedData: any;
  currentPersonalField: string;
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-black">
        Edit Personal Information
      </h2>

      {personalInfoData.map((row, idx) => (
        <div key={idx} className="mb-3 border p-1 rounded-md bg-gray-100">
          <div className="flex flex-col justify-center gap-2">
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded text-black text-sm"
              placeholder="Title"
              value={row.title}
              required
              onChange={(e) => {
                const updated = [...personalInfoData];
                updated[idx].title = e.target.value;
                setPersonalInfoData(updated);
              }}
            />
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded text-black text-sm"
              placeholder="Value"
              value={row.value}
              required
              onChange={(e) => {
                const updated = [...personalInfoData];
                updated[idx].value = e.target.value;
                setPersonalInfoData(updated);
              }}
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button
              onClick={() => {
                const updated = [...personalInfoData];
                updated.splice(idx, 1);
                setPersonalInfoData(updated);
              }}
              className="bg-red-500 hover:bg-red-700 text-white w-full"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button
        onClick={() =>
          setPersonalInfoData([...personalInfoData, { title: "", value: "" }])
        }
        className="bg-green-600 hover:bg-green-700 text-white mt-2"
      >
        + Add Item
      </Button>

      <div className="flex justify-between mt-4">
        <button
          className="bg-myDarkBlue text-white px-4 py-2 rounded"
          onClick={() => {
            if (currentPersonalField) {
              setParsedData((prev: any) => ({
                ...prev,
                [currentPersonalField]: personalInfoData,
              }));
            }
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

export default PersonalInformationEditor;
