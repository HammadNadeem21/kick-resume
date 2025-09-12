import Link from "next/link";
import React from "react";
import CustomSection from "../CustomSection/CustomSection";
import moment from "moment";

const educationData = [
  { degree: "Matric ( Science )" },
  { degree: "Intermediate ( Science )" },
  { degree: "BS Software Engineering " },
];

const SkillsData = [
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "GitHub",
];

const languageData = ["English", "Urdu"];

const certificationData = [
  "Certified JavaScript Developer",
  "Certified React Developer",
];

const experienceData = [
  {
    title: "Frontend Developer at XYZ Company",
    startDate: "Jan 2022",
    endDate: "June 2022",
  },
  {
    title: "Intern at ABC Tech",
    startDate: "Jun 2021",
    endDate: "Dec 2021",
  },
];

const projectsData = [
  {
    name: "Portfolio Website",
    description:
      "A personal portfolio website to showcase my projects and skills.",
    github: "https://github.com/HammadNadeem21",
    live: "https://github.com/HammadNadeem21",
  },
  {
    name: "E-commerce Website",
    description: "An e-commerce website built with React and Node.js.",
    github: "https://github.com/HammadNadeem21",
    live: "https://github.com/HammadNadeem21",
  },
];
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
  customSection: Array<{ title: string; value: string[] }>;
  customSection2: Array<{ title: string; value: string[] }>;
}

const Template2 = ({
  data,
  handleStringFeildClick,
  handleArrayFieldClick,
  handleExperienceFieldClick,
  handleProjectFieldClick,
  handleEducationFieldClick,

  handlePersonalInformationClick,
  handleCustomSectionClick,
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
  handleCustomSectionClick: (
    fieldName: string,
    data: Array<{ title: string; value: string[] }>
  ) => void;
  handleCustomSection2Click: (
    fieldName: string,
    data: Array<{ title: string; value: string[] }>
  ) => void;
}) => {
  return (
    <div
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      className={`bg-myWhite md:px-5 px-2 py-5 text-gray-700 mx-auto shadow-lg shadow-mySkyBlue ${
        isLegal ? "max-w-[794px]" : "max-w-[842px]"
      }`}
    >
      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-400"></div>

      <h1
        className="lg:text-5xl md:text-4xl sm:text-3xl cursor-pointer text-2xl mb-2 font-semibold text-center mt-5"
        onClick={() => handleStringFeildClick("name", data.name)}
      >
        {data.name}
      </h1>

      <h1
        className="md:text-xl text-lg text-center mb-8 cursor-pointer"
        onClick={() => handleStringFeildClick("role", data.role)}
      >
        {data.role}
      </h1>

      {/* Contact Details */}

      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-400"></div>

      <div className="grid grid-cols-[35%,65%] ">
        {/* Contact Details */}

        <div className="border-b border-b-gray-400 border-r border-r-gray-400">
          <div className="md:px-3 px-0 py-3  border-b  border-b-gray-400 ">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">
              Contact
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
              {data.personalInformation &&
              data.personalInformation.length > 0 ? (
                <div className="mb-2 flex flex-col gap-1 mt-2">
                  {data.personalInformation.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-1 md:text-[14px] text-[10px] text-gray-700 cursor-pointer"
                    >
                      <h1 className="font-bold capitalize">{item.title}:</h1>
                      <h2 className="font-medium text-xs mt-1">{item.value}</h2>
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
          </div>

          <div className="flex flex-col">
            {/* Education */}

            {data.education && data.education.length > 0 && (
              <div
                onClick={() =>
                  handleEducationFieldClick("education", data.education)
                }
                className="cursor-pointer md:px-3 px-0 py-3  border-b  border-b-gray-400 text-[15px]"
              >
                <h1 className="md:text-xl text-sm font-bold text-gray-700">
                  Education
                </h1>
                <div className="md:px-3 px-0 ml-2 mt-3 text-gray-700  md:text-[15px] text-[10px]">
                  {data.education.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr,auto] items-center justify-between "
                    >
                      <ul className="list-disc ">
                        <li>{item.degree}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <div
                onClick={() => handleArrayFieldClick("skills", data.skills)}
                className="md:px-3 px-0 py-3  border-b  border-b-gray-400 cursor-pointer"
              >
                <h1 className="md:text-xl text-sm font-bold text-gray-700">
                  Skills
                </h1>
                <ul className="list-disc md:px-5 px-0 mt-3 text-gray-700">
                  {data.skills.map((item: string, i: number) => (
                    <li className="md:text-[15px] text-xs mt-1" key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Language */}

            {data.languages && data.languages.length > 0 && (
              <div
                onClick={() =>
                  handleArrayFieldClick("languages", data.languages)
                }
                className="md:px-3 px-0 py-3  border-b  border-b-gray-400 cursor-pointer"
              >
                <h1 className="md:text-xl text-sm font-bold text-gray-700">
                  Languages
                </h1>
                <ul className="list-disc md:px-5 px-0 mt-3 text-gray-700">
                  {data.languages.map((item: string, i: number) => (
                    <li className="md:text-[15px] text-xs mt-1" key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certification */}

            {data.certifications && data.certifications.length > 0 && (
              <div
                onClick={() =>
                  handleArrayFieldClick("certifications", data.certifications)
                }
                className={`md:px-3 px-0 py-3 cursor-pointer ${
                  data.customSection && data.customSection.length > 0
                    ? "border-b  border-b-gray-400"
                    : "border-none"
                }`}
              >
                <h1 className="md:text-xl text-xs font-bold text-gray-700">
                  Certifications
                </h1>
                <ul className="list-disc md:px-5 px-0 mt-3 text-gray-700">
                  {data.certifications.map((item: string, i: number) => (
                    <li className="md:text-[15px] text-xs mt-1" key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Custom Section */}
            <div
              className="md:px-3 px-0 py-3 cursor-pointer"
              onClick={() =>
                handleCustomSectionClick("customSection", data.customSection)
              }
            >
              {data.customSection && data.customSection.length > 0 ? (
                <div className="">
                  {data.customSection.map((item, idx) => (
                    <div key={idx}>
                      <div key={idx} className=" cursor-pointer">
                        <h1
                          className={`md:text-xl text-xs font-bold text-gray-700`}
                        >
                          {item.title}
                        </h1>
                        <ul className="list-disc md:px-5 px-0 mt-3 text-gray-700">
                          {item.value.map((item: any, i: number) => (
                            <li
                              key={i}
                              className="capitalize md:text-[15px] text-xs mt-1"
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
                <div>
                  <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">
                    Click here and add custom section
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border-b border-b-gray-400">
          <div className="md:px-5 px-2 py-3 border-b border-b-gray-400">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">
              Profile Summary
            </h1>
            <p
              className="mt-3 text-gray-700  md:text-[15px] text-xs leading-5 cursor-pointer"
              onClick={() => handleStringFeildClick("summary", data.summary)}
            >
              {data.summary}
            </p>
          </div>
          <div className="flex flex-col ">
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <div
                onClick={() =>
                  handleExperienceFieldClick("experience", data.experience)
                }
                className="md:px-1 px-2 py-3 border-b border-b-gray-400 cursor-pointer"
              >
                <h1 className="md:text-xl ml-2 text-sm font-bold text-gray-700">
                  Work Experience
                </h1>

                <div className=" md:px-4 px-0 mt-3 text-gray-700">
                  {data.experience.map((item: any, i: number) => (
                    <div className="mt-2 mb-2" key={i}>
                      <div className="flex flex-col items-start gap-1">
                        <ul className="list-disc ml-4 md:text-sm text-xs font-semibold">
                          <li>{item.title}</li>
                        </ul>
                        <p className="text-sm">{item.description}</p>

                        <div className="flex items-center gap-2 md:text-xs text-[7px] italic ml-2">
                          <span>{`(${moment(item.startDate).format(
                            "MMM YYYY"
                          )}`}</span>
                          <span>
                            {" "}
                            {item.endDate === "Currently working"
                              ? "Currently working"
                              : moment(item.endDate).isValid()
                              ? moment(item.endDate).format("MMM YYYY")
                              : ""}
                            {")"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <div
                className={`md:px-1 px-2 py-3 cursor-pointer ${
                  data.customSection2 && data.customSection2.length > 0
                    ? "border-b border-b-gray-400"
                    : "border-none"
                }`}
                onClick={() =>
                  handleProjectFieldClick("projects", data.projects)
                }
              >
                <h1 className="md:text-xl ml-2 text-sm font-bold text-gray-700">
                  Projects
                </h1>

                <ul className="md:px-4 px-0 mt-3 md:text-sm text-xs text-gray-700">
                  {data.projects.map((item: any, i: number) => (
                    <li className="mt-5 mb-5" key={i}>
                      <h1 className="md:text-lg text-sm font-semibold">
                        {item.name}
                      </h1>
                      <p className="md:text-sm text-xs">{item.description}</p>
                      <div className="flex items-center gap-[100px] mt-3">
                        <Link
                          href={"/aiprompt"}
                          className="hover:underline hover:underline-offset-2 flex items-center gap-2 md:text-sm text-xs"
                        >
                          <h1>GitHub</h1>
                        </Link>

                        <Link
                          href={"/aiprompt"}
                          className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <h1 className="flex items-center gap-1">
                              live demo
                            </h1>
                          </div>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Custom Section */}
            <div
              className={`md:px-1 px-2 py-3 cursor-pointer`}
              onClick={() =>
                handleCustomSection2Click("customSection2", data.customSection2)
              }
            >
              {data.customSection2 && data.customSection2.length > 0 ? (
                <div className="">
                  {data.customSection2.map((item, idx) => (
                    <div key={idx} className="mt-2">
                      <h1 className="md:text-xl ml-2 text-sm font-bold text-gray-700 capitalize">
                        {item.title}
                      </h1>
                      <ul className="list-disc ml-8 md:text-[15px] sm:text-[11px] text-[10px] md:leading-6 sm:leading-4 leading-3">
                        {item.value.map((item: any, i: number) => (
                          <li key={i} className="md:text-sm text-xs">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">
                    Click here and add custom section
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;
