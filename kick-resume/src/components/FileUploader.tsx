'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";


const DropzoneUploader = () => {
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles:any, fileRejections:any) => {
    if (fileRejections.length > 0) {
      setError('Only PDF files are allowed');
      setFileName(null);
      return;
    }

    const file = acceptedFiles[0];
    setFileName(file.name);
    setError(null);

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false, // Only one file at a time
  });

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <div
        {...getRootProps()}
        className={`sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] border-2 border-myMidblue border-dashed rounded-xl flex flex-col gap-2 items-center justify-center text-center cursor-pointer transition ${
          isDragActive ? 'bg-blue-100 border-blue-500' : 'border-gray-400'
        }`}
      >
        <IoCloudUploadOutline size={40} className="text-myMidblue" />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the PDF here...</p>
        ) : (
          <p className="text-myMidblue sm:text-lg text-sm">Drag & drop PDF file here, or click to select</p>
        )}

{fileName && (
        <p className="text-sm text-green-600">{fileName}</p>
      )}

      {error && (
        <p className="text-sm text-red-500">❌ {error}</p>
      )}
      </div>

      
    </div>
  );
};

export default DropzoneUploader;
