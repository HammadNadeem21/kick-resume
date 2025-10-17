import React from "react";
import { Button } from "@/components/ui/button";

const CustomSection = ({
  customSectionData,
  setCustomSectionData,
  setShowEditor,
  setParsedData,
  currentcustomField,
}: {
  customSectionData: Array<{ title: string; value: string[] }>;
  setCustomSectionData: React.Dispatch<
    React.SetStateAction<Array<{ title: string; value: string[] }>>
  >;
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setParsedData: any;
  currentcustomField: string;
}) => {
  return (
    <div className="fixed top-0 right-0 h-full w-[450px] bg-myWhite shadow-lg z-50 p-6 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-black">Edit Custom Section</h2>

      {customSectionData.map((row, idx) => (
        <div key={idx} className="mb-3 border p-1 rounded-md bg-gray-100">
          <div className="flex flex-col justify-center gap-2">
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded text-black text-sm"
              placeholder="Title"
              value={row.title}
              required
              onChange={(e) => {
                const updated = [...customSectionData];
                updated[idx].title = e.target.value;
                setCustomSectionData(updated);
              }}
            />
            {/* Values List */}
            <div className="flex flex-col gap-2">
              {row.value &&
                row.value.length > 0 &&
                row.value.map((val, vIdx) => (
                  <div key={vIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 px-3 py-2 rounded text-black text-sm"
                      placeholder={`Value ${vIdx + 1}`}
                      value={val}
                      onChange={(e) => {
                        const updated = [...customSectionData];
                        const values = [...(updated[idx].value || [])];
                        values[vIdx] = e.target.value;
                        updated[idx].value = values;
                        setCustomSectionData(updated);
                      }}
                    />
                    <Button
                      onClick={() => {
                        const updated = [...customSectionData];
                        const values = [...(updated[idx].value || [])];
                        values.splice(vIdx, 1);
                        updated[idx].value = values;
                        setCustomSectionData(updated);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              <Button
                onClick={() => {
                  const updated = [...customSectionData];
                  const values = [...(updated[idx].value || [])];
                  values.push("");
                  updated[idx].value = values;
                  setCustomSectionData(updated);
                }}
                className="bg-green-500 hover:bg-green-700 text-white"
              >
                + Add Value
              </Button>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button
              onClick={() => {
                const updated = [...customSectionData];
                updated.splice(idx, 1);
                setCustomSectionData(updated);
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
          setCustomSectionData([
            ...customSectionData,
            { title: "", value: [""] },
          ])
        }
        className="bg-green-600 hover:bg-green-700 text-white mt-2"
      >
        + Add Item
      </Button>

      <div className="flex justify-between mt-4">
        <button
          className="bg-myDarkBlue text-white px-4 py-2 rounded"
          onClick={() => {
            if (customSectionData) {
              setParsedData((prev: any) => ({
                ...prev,
                [currentcustomField]: customSectionData,
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

export default CustomSection;
