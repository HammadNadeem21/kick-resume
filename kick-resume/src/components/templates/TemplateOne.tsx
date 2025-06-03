// Example TemplateOne.tsx
'use client';

import { useResumeDataContext } from '@/context/ResumeBuilderData';

export default function TemplateOne() {
  const { resumeData } = useResumeDataContext();

  if (!resumeData) return <p>No resume data found. Please fill the form first.</p>;

  return (
    <div className='bg-myWhite rounded-xl px-5 py-5'>
        <h1 className='text-5xl mb-2'>Template One</h1>
      <h1 className="text-3xl font-bold mb-2">{resumeData.fullName}</h1>
      <p>Email: {resumeData.email}</p>
      <p>Phone: {resumeData.phone}</p>
      <p>Address: {resumeData.address}</p>
      <h2 className="font-semibold mt-4 mb-1">Summary</h2>
      <p>{resumeData.summary}</p>
      {/* Baaki fields bhi dikhana ho to yahan add karo */}
      
    </div>
  );
}
