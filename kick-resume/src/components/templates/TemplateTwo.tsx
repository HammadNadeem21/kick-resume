// Example TemplateOne.tsx
'use client';

// Phone icon
import { FaPhoneAlt } from "react-icons/fa";
// Email icon
import { MdEmail } from "react-icons/md";
// Location icon
import { IoLocationSharp } from "react-icons/io5";
// Link icon
import { IoIosLink } from "react-icons/io";

import { useResumeDataContext } from '@/context/ResumeBuilderData';
import Link from "next/link";

export default function TemplateOne() {
  const { resumeData } = useResumeDataContext();


  console.log(resumeData);
  


  if (!resumeData) return <p>No resume data found. Please fill the form first.</p>;

  return (
    <div className='bg-myWhite rounded-xl px-5 py-5 text-gray-700'>
      {/* Divider */}
      <div className='h-[1px] w-full bg-gray-400'></div>

      <h1 className='text-5xl mb-2 font-semibold text-center mt-5'>{resumeData.fullName}</h1>

      <h1 className="text-xl text-center mb-8">{resumeData.position}</h1>

      {/* Contact Details */}

      {/* Divider */}
      <div className='h-[1px] w-full bg-gray-400'></div>


      <div className="grid grid-cols-[30%,70%]">

        {/* Contact Details */}
        <div className="px-5 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
          <h1 className="text-xl font-bold text-gray-700">Contact</h1>

          <div className="mt-5 flex flex-col gap-2">
            {/* phone */}
            <div className="flex gap-2 items-center">
              <FaPhoneAlt />
              <p>{resumeData.phone}</p>
            </div>

            {/* email */}
            <div className="flex gap-2 items-center">
              <MdEmail />
              <p>{resumeData.email}</p>
            </div>

            {/* Address */}
            <div className="flex gap-2 items-center">
              <IoLocationSharp />
              <p>{resumeData.address}</p>
            </div>
          </div>

        </div>




        {/* Summary */}
        <div className="px-5 py-3 border-b border-b-gray-400">
          <h1 className="text-xl font-bold text-gray-700">Profile Summary</h1>
          <p className="mt-3 text-gray-700">{resumeData.summary}</p>
        </div>

        <div className="flex flex-col">

          {/* Education */}
          <div className="px-5 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
            <h1 className="text-xl font-bold text-gray-700">Education</h1>
            <ul className="list-disc px-5 mt-3 text-gray-700">
              {
                resumeData.education.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))
              }
            </ul>
          </div>


          {/* Skills */}
          <div className="px-5 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
            <h1 className="text-xl font-bold text-gray-700">Skills</h1>
            <ul className="list-disc px-5 mt-3 text-gray-700">
              {
                resumeData.skills.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))
              }
            </ul>
          </div>


          {/* Language */}

          <div className="px-5 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
            <h1 className="text-xl font-bold text-gray-700">Languages</h1>
            <ul className="list-disc px-5 mt-3 text-gray-700">
              {
                resumeData.languages.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))
              }
            </ul>
          </div>


        </div>


<div className="flex flex-col border-b border-b-gray-400">
        {/* Experience */}
        <div className="px-5 py-3 border-b border-b-gray-400">
          <h1 className="text-xl font-bold text-gray-700">Work Experience</h1>

          <ul className=" px-5 mt-3 text-gray-700">
              {
                resumeData.experience.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))
              }
            </ul>
        </div>

        {/* Projects */}
         <div className="px-5 py-3">
          <h1 className="text-xl font-bold text-gray-700">Projects</h1>

          <ul className=" px-5 mt-3 text-gray-700">
              {
                resumeData.projects.map((item: any, i: number) => (
                  <div className="mt-5 mb-5" key={i}>
                    <h1 className="text-lg font-semibold">{item.name}</h1>
                    <p>{item.description}</p>
                    <div className="flex gap-[100px]">


<Link href={item.github} className="hover:underline hover:underline-offset-2 flex items-center gap-2"><IoIosLink/>  GitHub</Link>

<Link href={item.live} className="hover:underline hover:underline-offset-2 flex items-center gap-2"><IoIosLink/>  live demo</Link>


                    </div>
                  </div>
                ))
              }
            </ul>
        </div>

        </div>
            

      </div>



      {/* <h2 className="font-semibold mt-4 mb-1">Summary</h2>
      <p>{resumeData.summary}</p> */}
      {/* Baaki fields bhi dikhana ho to yahan add karo */}
    </div>
  );
}
