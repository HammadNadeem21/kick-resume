// Example TemplateOne.tsx
"use client";

import { useResumeDataContext } from "@/context/ResumeBuilderData";
import Link from "next/link";
import moment from "moment";

interface Data {
  name: string;
  role: string;
  phone: number;
  email: string;
  address: string;
  summary: string;
  personalInformation: Array<{ title: string; value: string }>;
  education: {
    degree: string;
    // startDate?: string;
    // endDate?: string;
  }[];
  skills: string[];
  languages: string[];
  certifications: string[];
  experience: {
    title: string;
    companyName: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }[];
  projects: {
    name: string;
    description: string;
    github?: string;
    live?: string;
  }[];
  customSection: Array<{ title: string; value: string[] }>;
  customSection2: Array<{ title: string; value: string[] }>;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

export default function Template1({
  data,
  handleStringFeildClick,
  handleArrayFieldClick,
  handleExperienceFieldClick,
  handleProjectFieldClick,
  handleEducationFieldClick,
  handlePhoneClickFeild,
  handleEmailFieldClick,
  handlePersonalInformationClick,
  handleCustomSectionClick,
  handleCustomSection2Click,
  isLegal,
  color,
}: {
  data: Data;
  handleStringFeildClick: (fieldName: string, value: string) => void;
  handleArrayFieldClick: (fieldName: string, data: string[]) => void;
  handleExperienceFieldClick: (fieldName: string, data: any[]) => void;
  handleProjectFieldClick: (fieldName: string, data: any[]) => void;
  handleEducationFieldClick: (fieldName: string, data: any[]) => void;
  handlePhoneClickFeild: (feildName: string, data: number) => void;
  handleEmailFieldClick: (fieldName: string, data: string) => void;
  isLegal: boolean;
  handlePersonalInformationClick: (
    fieldName: string,
    data: Array<{ title: string; value: string }>
  ) => void;
  handleCustomSectionClick: (
    fieldName: string,
    data: Array<{ title: string; value: string[] }>
  ) => void;
  handleCustomSection2Click: (
    fieldName: string,
    data: Array<{ title: string; value: string[] }>
  ) => void;
  color: Color;
}) {
  console.log("jkkjk", data.personalInformation);
  return (
    <div
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      className={`bg-myWhite grid grid-cols-[35%,65%] text-gray-700 shadow-lg shadow-mySkyBlue ${isLegal ? "max-w-[794px]" : "max-w-[842px]"}`}
    >
      {/* left-side */}
      <div
        className="md:px-3 px-2"
        style={{
          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
        }}
      >
        <h1
          className={`md:text-2xl sm:text-xl text-sm mb-5 font-semibold text-center mt-5 text-white`}
          onClick={() => handleStringFeildClick("name", data.name)}
        >
          {data.name}
        </h1>

        {/* Divider */}
        {data.education && data.education.length > 0 && (
          <div className="h-[1px] w-full mt-2 bg-white"></div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div
            className="mt-5 mb-5 cursor-pointer"
            onClick={() =>
              handleEducationFieldClick("education", data.education)
            }
          >
            <h1
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
              className={`md:text-lg text-sm mb-2 text-left  text-white`}
            >
              Education
            </h1>

            <ul className="list-disc text-white md:text-sm text-xs  ml-5 flex flex-col gap-3">
              {data.education.map((item: any, i: number) => (
                <li key={i} className="md:text-sm sm:text-[11px] text-[10px]">
                  {item.degree}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        {data.skills && data.skills.length > 0 && (
          <div className="h-[1px] w-full bg-white mt-5"></div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div
            className="mt-5 mb-5 cursor-pointer"
            onClick={() => handleArrayFieldClick("skills", data.skills)}
          >
            <h1 className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}>
              Skills
            </h1>

            <ul className="list-disc text-white md:text-sm sm:text-[11px] text-[10px] ml-5 flex flex-col gap-3">
              {data.skills.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        {data.languages && data.languages.length > 0 && (
          <div className="h-[1px] w-full bg-white mt-5"></div>
        )}

        {/* languages */}
        {data.languages && data.languages.length > 0 && (
          <div
            className="mt-5 mb-5 cursor-pointer"
            onClick={() => handleArrayFieldClick("languages", data.languages)}
          >
            <h1 className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}>
              Languages
            </h1>

            <ul className="list-disc text-white md:text-sm sm:text-[11px] text-[10px] ml-5 flex flex-col gap-3">
              {data.languages.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="h-[1px] w-full bg-white mt-5"></div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div
            className="mt-5 mb-5 cursor-pointer"
            onClick={() =>
              handleArrayFieldClick("certifications", data.certifications)
            }
          >
            <h1 className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}>
              Certifications
            </h1>

            <ul className="list-disc text-white md:text-sm sm:text-[11px] text-[10px] ml-5 flex flex-col gap-3">
              {data.certifications.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Custom Section */}

        <div
          className="mt-5"
          onClick={() =>
            handleCustomSectionClick("customSection", data.customSection)
          }
        >
          {data.customSection && data.customSection.length > 0 ? (
            <div className="">
              {data.customSection.map((item, idx) => (
                <div key={idx}>
                  {data.customSection.length < 1 ? (
                    <></>
                  ) : (
                    <div className="h-[1px] w-full bg-white mt-5"></div>
                  )}
                  <div key={idx} className="mt-5 mb-5 cursor-pointer">
                    <h1
                      className={`md:text-xl text-sm mb-2 text-left mt-5 text-white capitalize`}
                    >
                      {item.title}
                    </h1>
                    <ul className="list-disc text-white capitalize md:text-sm sm:text-[11px] text-[10px] ml-5 flex flex-col gap-3">
                      {item.value.map((item: any, i: number) => (
                        <li key={i} className="capitalize">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-[50px] mb-[50px]"
            onClick={() =>
              handleCustomSectionClick("customSection", data.customSection)
            }
            >
              <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">
                Click here and add custom section
              </h1>
            </div>
          )}
        </div>
      </div>
      {/* Right-side */}
      <div className="py-3 sm:px-5 px-3  flex flex-col gap-2">
        <h1
          className={`md:text-xl sm:text-lg text-sm mb-2 text-left mt-5 font-bold text-gray-700`}
          onClick={() => handleStringFeildClick("role", data.role)}
        >
          {data.role}
        </h1>

        {/* personal information */}
        <div
          className=""
          onClick={() =>
            handlePersonalInformationClick(
              "personalInformation",
              data.personalInformation
            )
          }
        >
          {data.personalInformation && data.personalInformation.length > 0 ? (
            <div className="">
              {data.personalInformation.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1  text-gray-700 cursor-pointer"
                >
                  <h1 className="font-bold capitalize md:text-[14px] sm:text-sm text-xs">
                    {item.title}:
                  </h1>
                  <h2 className="font-normal md:text-xs sm:text-xs text-[10px]">
                    {item.value}
                  </h2>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">
                Personal Information
              </h1>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-700 mt-2"></div>

        {/* Summary */}
        <div
          onClick={() => handleStringFeildClick("summary", data.summary)}
          className="cursor-pointer"
        >
          <h1
            className={`md:text-xl text-sm  text-left  font-bold text-gray-700`}
          >
            Summary
          </h1>
          <p className="text-gray-700 md:text-[15px] sm:text-[11px] text-[10px] md:leading-6 sm:leading-4 leading-3">
            {data.summary}
          </p>
        </div>

        {/* Divider */}
       
          <div className="h-[1px] w-full bg-gray-700 mt-3"></div>
       

        {/* Experience */}
        
          <div
            
            className="cursor-pointer"
          >
            <h1
              className={`md:text-xl text-sm  text-left  font-bold text-gray-700`}
            >
              Experience
            </h1>

            {data.experience && data.experience.length > 0 
            ? (
<div className=" ml-5 mt-3 flex flex-col justify-center gap-3 text-gray-700"
onClick={() =>
  handleExperienceFieldClick("experience", data.experience)
}
>
              {data.experience.map((item: any, i: number) => (
                <div key={i} className={`flex flex-col justify-between`}>
                  <ul className=" list-disc   flex items-center sm:gap-5 gap-2">
                    <li className=" font-bold md:text-[15px] sm:text-xs text-[10px]">
                      {item.companyName}
                    </li>
                    <h1 className="font-bold md:text-xs sm:text-[10px] text-[8px] sm:mt-0 mt-[3px]">
                      {item.title}
                    </h1>
                  </ul>
                  <p className=" md:text-[15px] sm:text-[11px] text-[10px] md:leading-5 sm:leading-4 leading-3">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 md:text-xs text-[8px] italic">
                    <span>{`(${moment(item.startDate).format(
                      "MMM YYYY"
                    )}`}</span>
                    <span>
                      {item.endDate === "Currently working"
                        ? "Currently working"
                        : moment(item.endDate).isValid()
                        ? moment(item.endDate).format("MMM YYYY")
                        : ""}
                      {")"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            )
          :(
            <div 
            onClick={() =>
              handleExperienceFieldClick("experience", data.experience)
            }
            >
              <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">Click here to add experience</h1>
            </div>
          )
          }

            
          </div>
        

        {/* Divider */}
        
          <div className="h-[1px] w-full bg-gray-700 mt-3"></div>
      

        {/* Projects */}
        
          <div
            
            className="cursor-pointer"
          >
            <h1
              className={`md:text-xl text-sm text-left  font-bold text-gray-700`}
            >
              Projects
            </h1>
            {data.projects && data.projects.length > 0 
            ? (
              <ul className=" px-5 mt-3 text-gray-700 list-disc"
              onClick={() => handleProjectFieldClick("projects", data.projects)}
              >
              {data.projects.map((item: any, i: number) => (
                <li className="mt-2 md:text-lg sm:text-xs text-[10px]" key={i}>
                  <h1 className=" font-bold md:text-[15px] sm:text-xs text-[10px]">
                    {item.name}
                  </h1>
                  <p className="md:text-[15px] sm:text-[11px] text-[10px] md:leading-5 sm:leading-4 leading-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between md:text-sm sm:text-[10px] text-[8px]">
                    <Link
                      href="/aiprompt"
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                    >
                      <h1>GitHub</h1>
                    </Link>

                    <Link
                      href="/aiprompt"
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <h1 className="flex items-center gap-1">live demo</h1>
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            )
          :(
            <div className="mb-10"
            onClick={() => handleProjectFieldClick("projects", data.projects)}
            >
              <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">Click here to add projects</h1>
            </div>
          )
          }
           
          </div>
        

        {/* Custom Section */}
        {data.customSection2 && data.customSection2.length > 0 ? (
          <div
            className=""
            onClick={() =>
              handleCustomSection2Click("customSection2", data.customSection2)
            }
          >
            {data.customSection2.map((item, idx) => (
              <div className="" key={idx}>
                {data.customSection.length < 1 ? (
                  <></>
                ) : (
                  <div className="h-[1px] w-full bg-gray-700 mt-3"></div>
                )}
                <div className="mt-5 mb-5 cursor-pointer">
                  <h1 className="md:text-xl text-sm text-left  font-bold text-gray-700 capitalize">
                    {item.title}
                  </h1>
                  <ul className="list-disc md:text-[15px] sm:text-[11px] text-[10px] md:leading-6 sm:leading-4 leading-3">
                    {item.value.map((item: any, i: number) => (
                      <li
                        key={i}
                        className="ml-5 md:text-[15px] sm:text-[11px] text-[10px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div  
          className="mt-[70px]"
          onClick={() =>
            handleCustomSection2Click("customSection2", data.customSection2)
          }
          >
            <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">
              Click here and add custom section
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
