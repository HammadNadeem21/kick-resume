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

import { useResumeDataContext } from "@/context/ResumeBuilderData";
import Link from "next/link";

export default function TemplateOne() {
  const { resumeData } = useResumeDataContext();

  console.log("education", resumeData?.experience[0]);

  if (!resumeData)
    return <p>No resume data found. Please fill the form first.</p>;

  return (
    <div className="bg-myWhite w-[794px] h-[1123px] rounded-xl px-7 py-7">
      <div className="flex flex-col gap-3 w-[70%]">
        <h1 className="text-4xl font-bold">{resumeData.fullName}</h1>
        <h2 className="text-2xl font-bold text-gray-700">
          {resumeData.position}
        </h2>

        <div className="flex justify-between text-gray-500">
          <div className="flex gap-2 items-center ">
            <MdEmail />
            <p>{resumeData.email}</p>
          </div>

          <div className="flex gap-2 items-center">
            <FaPhoneAlt />
            <p>{resumeData.phone}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center text-gray-500">
          <IoLocationSharp />
          <p>{resumeData.address}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

      <div className="grid grid-cols-[65%,35%]">
        {/* left-side */}
        <div className="">
          {/* Summary */}
          <div>
            <div className="px-2 py-[2px]">
              <h1 className="text-xl font-bold text-gray-800">Summary</h1>
            </div>

            <p className="text-black mt-2 text-sm">{resumeData.summary}</p>
          </div>

          {/* Divider */}
          <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

          {/* Experience */}
          <div>
            <div className="px-2 py-[2px]">
              <h1 className="text-xl font-bold text-gray-800">Experience</h1>
            </div>

            <div className=" px-5 mt-3 text-black">
              {resumeData.experience.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <ul className="list-disc">
                    <li>{item.title}</li>
                  </ul>

                  <p>
                    ({item.startDate} - {item.endDate})
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

          {/* Project */}
          <div>
            <div className="px-2 py-[2px]">
              <h1 className="text-xl font-bold text-gray-800">Projects</h1>
            </div>

            <ul className=" px-5 mt-3 text-black list-disc">
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
                        <h1 className="flex items-center gap-1">
                          <IoIosLink /> live demo
                        </h1>
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* right-side */}
        <div className=" px-1 py-[3px]">
          {/* Education */}
          <div>
            <div className=" px-2 py-[2px]">
              <h1 className="text-[15px] font-bold text-gray-800">Education</h1>
            </div>
            <div className=" px-4 ml-2 mt-3 text-gray-700 flex flex-col gap-3">
              {resumeData.education.map((item: any, i: number) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr,auto] items-center justify-between "
                >
                  <ul className="list-disc ">
                    <li>{item.degree}</li>
                  </ul>
                  <p className="text-gray-500 text-sm text-right">
                    ({item.startYear} - {item.endYear})
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

          {/* Skills */}
          <div>
            <div className=" px-2 py-[2px]">
              <h1 className="text-[15px] font-bold text-gray-800">Skills</h1>
            </div>
            <ul className="list-disc px-4 ml-2 mt-3 text-gray-700 flex flex-col gap-3">
              {resumeData.skills.map((item: string, i: number) => (
                <li className="text-[15px]" key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

          {/* Languages */}
          <div className="mt-8 mb-8">
            <h1
              className={`text-[15px] font-bold  mb-2 text-left mt-5  text-gray-800`}
            >
              Languages
            </h1>

            <ul className="list-disc text-black px-5 flex flex-col gap-3">
              {resumeData.languages.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

          {/* Certifications */}
          <div className="mt-8 mb-8">
            <h1
              className={`text-[15px] font-bold mb-2 text-left mt-5 text-gray-800`}
            >
              Certifications
            </h1>

            <ul className="list-disc text-black px-5 flex flex-col gap-3">
              {resumeData.certifications.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
