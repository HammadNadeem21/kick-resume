// Example TemplateOne.tsx
"use client";

// Phone icon
import { FaPhoneAlt } from "react-icons/fa";
// Email icon
import { MdEmail } from "react-icons/md";
// Location icon
import { IoLocationSharp } from "react-icons/io5";
// Link icon
import { IoIosLink } from "react-icons/io";
// linkdin icon
import { FaLinkedin } from "react-icons/fa";

import { useResumeDataContext } from "@/context/ResumeBuilderData";
import Link from "next/link";

import { Poppins } from "next/font/google";
const poppins700 = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});
const poppins600 = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});
const poppins400 = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function TemplateOne() {
  const { resumeData } = useResumeDataContext();

  console.log("education", resumeData?.experience[0]);

  if (!resumeData)
    return <p>No resume data found. Please fill the form first.</p>;

  return (

    <div className="bg-myWhite w-[794px] h-[1123px] grid grid-cols-[35%,65%] text-gray-700">
      {/* left-side */}
      <div className="bg-[#193042] py-2 px-3">
        <h1
          className={`text-2xl mb-5 font-semibold text-center mt-5 ${poppins700.className} text-white`}
        >
          {resumeData.fullName}
        </h1>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#385b77] mt-2"></div>

        {/* Education */}
        <div className="mt-8 mb-8">
          <h1
            className={`text-xl mb-2 text-left mt-5 ${poppins600.className} text-white`}
          >
            Education
          </h1>

          <ul className="list-disc text-white px-5 flex flex-col gap-3">
            {resumeData.education.map((item: any, i: number) => (
              <li key={i}>{item.degree}</li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

        {/* Skills */}
        <div className="mt-8 mb-8">
          <h1
            className={`text-xl mb-2 text-left mt-5 ${poppins600.className} text-white`}
          >
            Skills
          </h1>

          <ul className="list-disc text-white px-5 flex flex-col gap-3">
            {resumeData.skills.map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

        {/* languages */}
        <div className="mt-8 mb-8">
          <h1
            className={`text-xl mb-2 text-left mt-5 ${poppins600.className} text-white`}
          >
            Languages
          </h1>

          <ul className="list-disc text-white px-5 flex flex-col gap-3">
            {resumeData.languages.map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

        {/* Certifications */}
        <div className="mt-8 mb-8">
          <h1
            className={`text-xl mb-2 text-left mt-5 ${poppins600.className} text-white`}
          >
            Certifications
          </h1>

          <ul className="list-disc text-white px-5 flex flex-col gap-3">
            {resumeData.certifications.map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Right-side */}
      <div className="py-3 px-5">
        <h1
          className={`text-xl mb-2 text-left mt-5 ${poppins600.className} text-[#193042]`}
        >
          {resumeData.position}
        </h1>
        {/* Contact */}
        <div className="flex flex-col gap-4 items-start mb-2">
          <div className="flex items-center justify-between w-full">
            {/* phone */}
            <div className="flex text-[15px] text-[#193042] items-center justify-center gap-1">
              <FaPhoneAlt />
              <h2 className={` ${poppins400.className}`}>{resumeData.phone}</h2>
            </div>

            {/* email */}
            <div className="flex text-[15px] text-[#193042] items-center justify-center gap-1">
              <MdEmail />
              <h2 className={` ${poppins400.className}`}>{resumeData.email}</h2>
            </div>

            {/* linkdin account */}
            <div className="flex text-[15px] text-[#193042] items-center justify-center gap-1">
              <FaLinkedin />
              <Link
                href={resumeData.linkdinUrl}
                className={` ${poppins400.className}`}
              >
                Linkdin
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-2 gap-1 text-[#193042] text-[15px]">
          <IoLocationSharp />
          <h2 className={` ${poppins400.className}`}>{resumeData.address}</h2>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#193042] mt-2"></div>

        {/* Summary */}
        <div>
          <h1
            className={`text-xl mb-2 text-left mt-5 ${poppins600.className} text-[#193042]`}
          >
            Summary
          </h1>
          <p className={`${poppins400.className} text-[#193042]`}>
            {resumeData.summary}
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#193042] mt-3"></div>

        {/* Experience */}
        <div>
          <h1
            className={`text-xl mb-2 text-left mt-5 ${poppins600.className} text-[#193042]`}
          >
            Experience
          </h1>

          <div className=" px-5 mt-3 text-gray-700">
            {resumeData.experience.map((item: any, i: number) => (
              <div
                key={i}
                className={`flex items-center justify-between ${poppins400.className} text-[#193042]`}
              >
                <ul className="list-disc">
                  <li>{item.title}</li>
                </ul>

                <div className="flex items-center gap-2 text-xs">
                  <span>{`(${item.startDate}`}</span>
                  <span>{`${item.endDate})`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

{/* Divider */}
        <div className="h-[1px] w-full bg-[#193042] mt-5"></div>

        {/* Projects */}
        <div>
           <h1
            className={`text-xl mb-2 text-left mt-5 ${poppins600.className} text-[#193042]`}
          >
            Projects
          </h1>
                      <ul className=" px-5 mt-3 text-[#193042] list-disc">
              {resumeData.projects.map((item: any, i: number) => (
                <li className="mt-5 mb-5" key={i}>
                  <h1 className="text-lg font-semibold">{item.name}</h1>
                  <p>{item.description}</p>
                  <div className="flex items-center gap-[100px] mt-3">

                    <Link
                      href={item.github}
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                    >
                      <div className="flex items-center justify-center gap-1">
                      <IoIosLink />
                      <h1>GitHub</h1>
                      </div>
                    </Link>

                    <Link
                      href={item.live}
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                    >
                      <div className="flex items-center justify-center gap-1">

                      <h1 className="flex items-center gap-1"><IoIosLink /> live demo</h1>
                      </div>
                    </Link>

                  </div>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
}
