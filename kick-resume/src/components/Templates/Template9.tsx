import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    startDate?: string;
    endDate?: string;
  }[];
  skills: string[];
  languages: string[];
  certifications: string[];
  experience: {
    title: string;
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
  customSection2: Array<{ title: string; value: string[] }>;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

const Template9 = ({
  data,
  handleStringFeildClick,
  handleArrayFieldClick,
  handleExperienceFieldClick,
  handleProjectFieldClick,
  handleEducationFieldClick,
  handlePhoneClickFeild,
  handleEmailFieldClick,
  imageUrl,
  imageBgColor,
  handlePersonalInformationClick,
  handleCustomSection2Click,
  isLegal,
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
  handleCustomSection2Click: (
    fieldName: string,
    data: Array<{ title: string; value: string[] }>
  ) => void;
  imageUrl?: string;
  imageBgColor?: string;
  selectedTheme?: any; // Add selectedTheme prop type here
}) => {
  return (
    <div
      className={`bg-myWhite mx-auto shadow-lg shadow-mySkyBlue px-[60px] pb-7 ${
        isLegal ? "max-w-[794px]" : "max-w-[842px]"
      }`}
    >
      <div
        className="grid grid-cols-[30%,70%] gap-3 w-[100%]  py-5"
        //  style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}
      >
        <div
          className={`flex justify-end items-center h-[180px] w-[180px] mt-4 rounded-full overflow-hidden ${
            imageBgColor || "bg-gray-300"
          }`}
        >
          <Image
            src={imageUrl ?? "/dummy.jpg"}
            alt="User"
            height={200}
            width={200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="">
          <div className="text-[#004aad]  border-b-2 border-[#004aad] py-4 mt-7">
            <h1
              className="lg:text-3xl md:text-2xl text-xl font-bold cursor-pointer "
              onClick={() => handleStringFeildClick("name", data.name)}
            >
              {data.name}
            </h1>
            <h2
              className="cursor-pointer md:text-xl text-lg font-semibold"
              onClick={() => handleStringFeildClick("role", data.role)}
            >
              {data.role}
            </h2>
          </div>

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
              <div className="mb-2 flex items-center justify-between flex-wrap gap-1 mt-2">
                {data.personalInformation.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-1 md:text-[14px] text-[10px] text-gray-600 cursor-pointer"
                  >
                    <h1 className="font-bold capitalize">{item.title}:</h1>
                    <h2 className="font-medium text-xs mt-1">{item.value}</h2>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h1 className="font-normal text-center text-sm text-gray-600 mt-4   cursor-pointer italic">
                  Click this section and set your Personal Information
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      {/* <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div> */}

      {/* Summary */}
      <div className=" grid grid-cols-[auto,1fr] gap-10">
        <div className="text-[#004aad] text-lg font-bold uppercase">
          Profile Summary
        </div>
        <div className=" flex flex-col justify-center">
          <div className="h-[2px] bg-[#004aad]"></div>
        </div>
      </div>
      <p
        className="text-gray-800 md:text-sm text-xs mt-2 leading-relaxed italic cursor-pointer"
        onClick={() => handleStringFeildClick("summary", data.summary)}
      >
        {data.summary}
      </p>

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div>
          <div className=" grid grid-cols-[auto,1fr] gap-10 mt-6">
            <div className="text-[#004aad] text-lg font-bold uppercase">
              Education
            </div>
            <div className=" flex flex-col justify-center">
              <div className="h-[2px] bg-[#004aad]"></div>
            </div>
          </div>
          <div className="md:px-4 px-0 ml-5 mt-3 flex flex-col gap-1">
            {data.education.map((item: any, i: number) => (
              <ul
                key={i}
                className="list-disc md:text-sm text-xs text-black flex justify-between items-center cursor-pointer"
                onClick={() =>
                  handleEducationFieldClick("education", data.education)
                }
              >
                <li>{item.degree}</li>
                {item.startDate && item.endDate && (
                  <p className="text-gray-500  text-[10px] text-right">
                    ({item.startDate} - {item.endDate})
                  </p>
                )}
              </ul>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div>
          <div className=" grid grid-cols-[auto,1fr] gap-10 mt-6">
            <div className="text-[#004aad] text-lg font-bold uppercase">
              Work Experience
            </div>
            <div className=" flex flex-col justify-center">
              <div className="h-[2px] bg-[#004aad]"></div>
            </div>
          </div>
          <div className=" mt-3 text-black">
            {data.experience.map((item: any, i: number) => (
              <div
                key={i}
                className="flex flex-col mt-3 cursor-pointer"
                onClick={() =>
                  handleExperienceFieldClick("experience", data.experience)
                }
              >
                <div className="flex flex-col ">
                  <ul className=" md:text-[15px] text-xs flex items-center justify-between gap-5 text-black">
                    <li className="">{`${item.title} | ${item.companyName}`}</li>

                    <div className="flex justify-start items-center gap-4 md:text-[10px] text-[7px]">
                      <span>{`(${moment(item.startDate).format("MMM YYYY")} - ${
                        item.endDate === "Currently working"
                          ? "Currently working"
                          : moment(item.endDate).isValid()
                          ? moment(item.endDate).format("MMM YYYY")
                          : ""
                      })`}</span>
                    </div>
                  </ul>
                  {/* <h1 className='md:text-xs text-[10px] font-bold text-gray-500'>{item.companyName}</h1>s */}

                  <li className="list-disc md:text-xs text-[10px] text-gray-800">
                    {item.description}
                  </li>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Certification */}

      <div className="grid grid-cols-2 gap-5">
        {/* Tech Stack */}

        {data.skills && data.skills.length > 0 && (
          <div className="">
            <div className=" grid grid-cols-[auto,1fr] gap-5 mt-6">
              <div className="text-[#004aad] text-lg font-bold uppercase">
                Professional Skill
              </div>
              <div className=" flex flex-col justify-center">
                <div className="h-[2px] bg-[#004aad]"></div>
              </div>
            </div>

            <div
              className="mt-3 grid grid-cols-3 gap-2 cursor-pointer"
              onClick={() => handleArrayFieldClick("skills", data.skills)}
            >
              {data.skills.map((item: string, index: number) => (
                <li key={index} className="text-sm text-black">
                  {item}
                </li>
              ))}
            </div>
          </div>
        )}

        {/* certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div
            className=" cursor-pointer"
            onClick={() =>
              handleArrayFieldClick("certifications", data.certifications)
            }
          >
            <div className=" grid grid-cols-[auto,1fr] gap-5 mt-6">
              <div className="text-[#004aad] text-lg font-bold uppercase">
                Certifications
              </div>
              <div className=" flex flex-col justify-center">
                <div className="h-[2px] bg-[#004aad]"></div>
              </div>
            </div>

            <div className="md:px-4 px-0 ml-5 mt-3 flex flex-col gap-1">
              {data.certifications.map((item: any, i: number) => (
                <div
                  key={i}
                  className=" items-center justify-between text-gray-800"
                >
                  <ul className="list-disc md:text-sm text-xs text-gray-800">
                    <li>{item}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project */}
      {data.projects && data.projects.length > 0 && (
        <div>
          <div className=" grid grid-cols-[auto,1fr] gap-10 mt-6">
            <div className="text-[#004aad] text-lg font-bold uppercase">
              Projects
            </div>
            <div className=" flex flex-col justify-center">
              <div className="h-[2px] bg-[#004aad]"></div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleProjectFieldClick("projects", data.projects)}
          >
            <div className=" grid grid-cols-2 gap-5">
              {data.projects.map((item: any, i: number) => (
                <div className="mt-5 mb-5" key={i}>
                  <li className=" md:text-sm text-xs font-bold text-black list-disc">
                    {item.name}
                  </li>
                  <p className="md:text-xs text-[10px] font-medium text-gray-800">
                    {item.description}
                  </p>
                  <div className="flex items-center md:gap-[100px] gap-[70px] mt-1 text-gray-800 md:text-sm text-xs">
                    <Link
                      href={"#"}
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                    >
                      <h1>GitHub</h1>
                    </Link>

                    <Link
                      href={"#"}
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                    >
                      <h1 className="flex items-center gap-1">live demo</h1>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom Section */}
      {data.customSection2 && data.customSection2.length > 0 ? (
        <div
          className={`cursor-pointer`}
          onClick={() =>
            handleCustomSection2Click("customSection2", data.customSection2)
          }
        >
          {data.customSection2.map((item, idx) => (
            <div key={idx} className="cursor-pointe mt-4">
              {/* {data.customSection2 && data.customSection2.length < 1 ? (
                <></>
              ) : (
                <div className="h-[3px] w-full bg-black mt-3 mb-3"></div>
              )} */}

              <div className=" grid grid-cols-[auto,1fr] gap-10 mt-6">
                <div className="text-[#004aad] text-lg font-bold uppercase">
                  {item.title}
                </div>
                <div className=" flex flex-col justify-center">
                  <div className="h-[2px] bg-[#004aad]"></div>
                </div>
              </div>
              <ul className="list-disc md:text-sm text-xs flex flex-col justify-center gap-2 md:px-0 px-0 ml-1 mt-3 text-black">
                {item.value.map((item: any, i: number) => (
                  <li key={i} className="">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="mt-5"
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
  );
};

export default Template9;
