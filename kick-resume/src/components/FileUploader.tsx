// 'use client';
// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { IoCloudUploadOutline } from "react-icons/io5";


// const DropzoneUploader = () => {
//   const [fileName, setFileName] = useState(null);
//   const [error, setError] = useState<any>(null);

//   const onDrop = useCallback((acceptedFiles:any, fileRejections:any) => {
//     if (fileRejections.length > 0) {
//       setError('Only PDF files are allowed');
//       setFileName(null);
//       return;
//     }

//     const file = acceptedFiles[0];
//     setFileName(file.name);
//     setError(null);

//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//     },
//     multiple: false, // Only one file at a time
//   });

//   return (
//     <div className="flex flex-col items-center gap-2 mt-8">
//       <div
//         {...getRootProps()}
//         className={`sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] border-2 border-myMidblue border-dashed rounded-xl flex flex-col gap-2 items-center justify-center text-center cursor-pointer transition ${
//           isDragActive ? 'bg-blue-100 border-blue-500' : 'border-gray-400'
//         }`}
//       >
//         <IoCloudUploadOutline size={40} className="text-myMidblue" />
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p className="text-blue-500">Drop the PDF here...</p>
//         ) : (
//           <p className="text-myMidblue sm:text-lg text-sm">Drag & drop PDF file here, or click to select</p>
//         )}

// {fileName && (
//         <p className="text-sm text-green-600">{fileName}</p>
//       )}

//       {error && (
//         <p className="text-sm text-red-500">❌ {error}</p>
//       )}
//       </div>

//       <button className="px-5 py-3 mt-5 hover:bg-myMidblue/30 rounded-xl text-myMidblue font-bold text-xl border border-myMidblue">Analyze</button>
//     </div>
//   );
// };

// export default DropzoneUploader;



// Example of a Node.js server-side proxy



'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from './DropzoneUploader.module.css';

const DropzoneUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisReport, setAnalysisReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
    if (fileRejections.length > 0) {
      setError('Only PDF files are allowed');
      setFileName(null);
      setSelectedFile(null);
      setAnalysisReport(null);
      return;
    }

    const file = acceptedFiles[0];
    setSelectedFile(file);
    setFileName(file.name);
    setError(null);
    setAnalysisReport(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please upload a PDF file first.');
      return;
    }

    setLoading(true);
    setAnalysisReport(null);
    setError(null);

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      // Use environment variable for API key to secure it
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDrjd5jEmmkMEjv1MZaCckYD7zRZSWviVs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze resume.');
      }

      const data = await response.json();
      setAnalysisReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 mt-8 ${styles.container}`}>
      <div
        {...getRootProps()}
        className={`sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] border-2 border-myMidblue border-dashed rounded-xl flex flex-col gap-2 items-center justify-center text-center cursor-pointer transition ${
          isDragActive ? 'bg-blue-100 border-blue-500' : 'border-gray-400'
        } ${styles.dropzone}`}
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

      <button
        onClick={handleAnalyze}
        className={`px-5 py-3 hover:bg-myMidblue/30 rounded-xl text-myMidblue font-bold text-xl border border-myMidblue ${styles.analyzeButton}`}
        disabled={!selectedFile || loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {analysisReport && (
        <div className={`mt-8 flex flex-col items-center gap-4 ${styles.reportContainer}`}>
          <h3>Analysis Report</h3>

          {analysisReport.rating !== null && (
            <div className={`w-40 ${styles.progressBar}`}>
              <CircularProgressbar
                value={analysisReport.rating}
                text={`${analysisReport.rating}%`}
                styles={buildStyles({
                  textColor: '#0f766e',
                  pathColor: '#0f766e',
                  trailColor: '#d1fae5',
                })}
              />
              <p className={`text-center mt-2 font-semibold ${styles.ratingText}`}>Overall Rating</p>
            </div>
          )}

          {analysisReport.weaknesses?.length > 0 && (
            <div className={`w-full sm:w-[400px] ${styles.weaknessesContainer}`}>
              <h4 className="font-semibold">Weaknesses:</h4>
              <ul className="list-disc pl-5">
                {analysisReport.weaknesses.map((weakness: string, index: number) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
          )}

          {analysisReport.suggestions?.length > 0 && (
            <div className={`w-full sm:w-[400px] ${styles.suggestionsContainer}`}>
              <h4 className="font-semibold">Improvement Suggestions:</h4>
              <ul className="list-decimal pl-5">
                {analysisReport.suggestions.map((suggestion: string, index: number) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {analysisReport.rawAnalysis && (
            <details className={`mt-4 ${styles.rawAnalysis}`}>
              <summary className="cursor-pointer font-semibold">Raw Analysis Output</summary>
              <pre className="text-sm mt-2 whitespace-pre-wrap">{analysisReport.rawAnalysis}</pre>
            </details>
          )}
        </div>
      )}

      {loading && <p className="mt-4">Analyzing your resume, please wait...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default DropzoneUploader;

