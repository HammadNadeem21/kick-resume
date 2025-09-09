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
}

interface Color {
  r: number;
  g: number;
  b: number;
}

const Template7 = ({
  data,
  handleStringFeildClick,
  handleArrayFieldClick,
  handleExperienceFieldClick,
  handleProjectFieldClick,
  handleEducationFieldClick,
  handlePhoneClickFeild,
  handleEmailFieldClick,
  handlePersonalInformationClick,
  imageUrl,
  imageBgColor,
  selectedTheme, // Add selectedTheme prop here
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
  handlePersonalInformationClick: (
    fieldName: string,
    data: Array<{ title: string; value: string }>
  ) => void;
  imageUrl?: string;
  imageBgColor?: string;
  selectedTheme?: any; // Add selectedTheme prop type here
  color: Color;
}) => {
  return (
    <div className="bg-myWhite grid grid-cols-[65%,35%] text-gray-700  max-w-[794px] mx-auto shadow-lg shadow-mySkyBlue">
      {/* Right-side */}
      <div className="py-3 md:px-5 px-2 flex flex-col gap-2">
        <h1
          className={`md:text-3xl mt-2 text-lg  font-bold text-left  text-gray-700 cursor-pointer`}
          onClick={() => handleStringFeildClick("name", data.name)}
        >
          {data.name}
        </h1>
        <h1
          className="md:text-xl text-sm  text-left  font-bold text-gray-700 cursor-pointer"
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
            <div className="mb-2">
              {data.personalInformation.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 md:text-[14px] text-[10px] text-gray-700 cursor-pointer"
                >
                  <h1 className="font-bold capitalize">{item.title}:</h1>
                  <h2 className="font-normal text-xs">{item.value}</h2>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1 className="font-normal text-center text-sm text-gray-400 cursor-pointer italic">
                Click this section and set your Personal Information
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
            className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-gray-700`}
          >
            Summary
          </h1>
          <p className="text-gray-700 md:text-[15px] text-xs leading-6">
            {data.summary}
          </p>
        </div>

        {/* Divider */}
        {data.experience.length > 0 && (
          <div className="h-[1px] w-full bg-gray-700 mt-3"></div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div
            onClick={() =>
              handleExperienceFieldClick("experience", data.experience)
            }
            className="cursor-pointer"
          >
            <h1
              className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-gray-700`}
            >
              Experience
            </h1>

            <div className=" px-5 mt-3 text-gray-700">
              {data.experience.map((item: any, i: number) => (
                <div key={i} className={`flex flex-col justify-between`}>
                  <ul className="mt-3 list-disc  md:text-[15px] text-xs flex gap-5">
                    <li className=" font-bold">{item.companyName}</li>
                    <h1 className="font-bold md:text-xs text-[10px]">
                      {item.title}
                    </h1>
                  </ul>
                  <p>{item.description}</p>

                  <div className="flex items-center gap-2 md:text-xs text-[7px]">
                    <span>{`(${item.startDate}`}</span>
                    <span>
                      {item.endDate === "Currently working"
                        ? "Currently working"
                        : item.endDate}
                      {")"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {data.projects.length > 0 && (
          <div className="h-[1px] w-full bg-gray-700 mt-5"></div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div
            onClick={() => handleProjectFieldClick("projects", data.projects)}
            className="cursor-pointer"
          >
            <h1
              className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-gray-700`}
            >
              Projects
            </h1>
            <ul className=" px-5 mt-3 text-gray-700 list-disc">
              {data.projects.map((item: any, i: number) => (
                <li className="mt-5 mb-5" key={i}>
                  <h1 className="md:text-lg text-xs md:font-medium font-bold">
                    {item.name}
                  </h1>
                  <p className="md:text-sm text-xs">{item.description}</p>
                  <div className="flex items-center gap-[100px] mt-3 md:text-sm text-xs">
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
          </div>
        )}
      </div>

      {/* left-side */}
      <div
        className=" py-2 md:px-3 px-1"
        style={{
          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
        }}
      >
        <div
          className={`flex justify-center items-center sm:ml-[65px] ml-[25px] mb-2 sm:h-[150px] sm:w-[150px] h-[90px] w-[90px] mt-4 rounded-full overflow-hidden ${
            imageBgColor || "bg-gray-300"
          }`}
        >
          <Image
            src={imageUrl ?? "/dummy.jpg"}
            alt="User"
            height={100}
            width={100}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Divider */}
        {/* {data.education.length > 0 && (
  <div className="h-[1px] w-full mt-2 bg-white"></div>

)} */}

        {/* Education */}
        {data.education.length > 0 && (
          <div
            className="mt-8 mb-8 sm:ml-0 ml-1 cursor-pointer"
            onClick={() =>
              handleEducationFieldClick("education", data.education)
            }
          >
            <h1 className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}>
              Education
            </h1>

            <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
              {data.education.map((item: any, i: number) => (
                <li key={i}>{item.degree}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        {data.skills.length > 0 && (
          <div className="h-[1px] w-full bg-white mt-5"></div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div
            className="mt-8 mb-8 sm:ml-0 ml-1 cursor-pointer"
            onClick={() => handleArrayFieldClick("skills", data.skills)}
          >
            <h1 className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}>
              Skills
            </h1>

            <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
              {data.skills.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        {data.languages.length > 0 && (
          <div className="h-[1px] w-full bg-white mt-5"></div>
        )}

        {/* languages */}
        {data.languages.length > 0 && (
          <div
            className="mt-8 mb-8 sm:ml-0 ml-1 cursor-pointer"
            onClick={() => handleArrayFieldClick("languages", data.languages)}
          >
            <h1 className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}>
              Languages
            </h1>

            <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
              {data.languages.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        {data.certifications.length > 0 && (
          <div className="h-[1px] w-full bg-white mt-5"></div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div
            className="mt-8 mb-8 sm:ml-0 ml-1 cursor-pointer"
            onClick={() =>
              handleArrayFieldClick("certifications", data.certifications)
            }
          >
            <h1 className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}>
              Certifications
            </h1>

            <ul className="list-disc text-white md:text-sm text-xs  px-5 flex flex-col gap-3">
              {data.certifications.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template7;
