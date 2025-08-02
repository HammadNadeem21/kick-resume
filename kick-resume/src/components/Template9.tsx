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
}: {
  data: Data;
  handleStringFeildClick: (fieldName: string, value: string) => void;
  handleArrayFieldClick: (fieldName: string, data: string[]) => void;
  handleExperienceFieldClick: (fieldName: string, data: any[]) => void;
  handleProjectFieldClick: (fieldName: string, data: any[]) => void;
  handleEducationFieldClick: (fieldName: string, data: any[]) => void;
  handlePhoneClickFeild: (feildName: string, data: number) => void;
  handleEmailFieldClick: (fieldName: string, data: string) => void;
  imageUrl?: string;
  imageBgColor?: string;
  selectedTheme?: any; // Add selectedTheme prop type here
}) => {
  return (
    <div className="bg-myWhite lg:w-[70%] w-[100%] mx-auto shadow-lg shadow-myMidPurple/70 px-[60px]">
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

          <div className="grid grid-cols-3 mt-2 text-xs text-black">
            <div
              className="border-r-2 border-[#004aad] h-10 flex items-center justify-center cursor-pointer"
              onClick={() => handleEmailFieldClick("email", data.email)}
            >
              {data.email !== "" ? data.email : "Email"}
            </div>
            <div
              className="border-r-2 border-[#004aad] h-10 flex items-center justify-center cursor-pointer"
              onClick={() => handlePhoneClickFeild("phone", data.phone)}
            >
              {data.phone && data.phone !== 0 ? `+${data.phone}` : "Phone"}
            </div>
            <div
              className=" h-10 flex items-center justify-center text-center   cursor-pointer"
              onClick={() => handleStringFeildClick("address", data.address)}
            >
              {data.address !== "" ? data.address : "Address"}
            </div>
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
      {data.education.length > 0 && (
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
      {data.experience.length > 0 && (
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
                      <span>{`(${item.startDate}`}</span>
                      <span>{`${item.endDate})`}</span>
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

        {data.skills.length > 0 && (
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
        {data.certifications.length > 0 && (
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
      {data.projects.length > 0 && (
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
    </div>
  );
};

export default Template9;
