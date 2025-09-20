import moment from "moment";
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
  customSection: Array<{ title: string; value: string[] }>;
  customSection2: Array<{ title: string; value: string[] }>;
}

const Template5 = ({
  data,
  handleStringFeildClick,
  handleArrayFieldClick,
  handleExperienceFieldClick,
  handleProjectFieldClick,
  handleEducationFieldClick,
  handleCustomSection2Click,
  handlePersonalInformationClick,
  isLegal,
}: {
  data: Data;
  handleStringFeildClick: (fieldName: string, value: string) => void;
  handleArrayFieldClick: (fieldName: string, data: string[]) => void;
  handleExperienceFieldClick: (fieldName: string, data: any[]) => void;
  handleProjectFieldClick: (fieldName: string, data: any[]) => void;
  handleEducationFieldClick: (fieldName: string, data: any[]) => void;
  isLegal: boolean;
  handlePersonalInformationClick: (
    fieldName: string,
    data: Array<{ title: string; value: string }>
  ) => void;

  handleCustomSection2Click: (
    fieldName: string,
    data: Array<{ title: string; value: string[] }>
  ) => void;
}) => {
  return (
    <div
      className={`bg-myWhite shadow-lg shadow-mySkyBlue px-7 py-7  mx-auto ${isLegal ? "max-w-[794px]" : "max-w-[842px]"
        }`}
    >
      <div className="flex flex-col gap-2 md:items-center items-start justify-center">
        <div className="text-center">
          <h1
            className="lg:text-4xl md:text-3xl text-2xl font-bold text-gray-800 cursor-pointer text-center"
            onClick={() => handleStringFeildClick("name", data.name)}
          >
            {data.name}
          </h1>
          <h2
            className=" text-center cursor-pointer md:text-2xl text-xl md:font-bold font-semibold text-gray-700"
            onClick={() => handleStringFeildClick("role", data.role)}
          >
            {data.role}
          </h2>
        </div>

        {/* personal information */}
        <div
          className="px-5"
          onClick={() =>
            handlePersonalInformationClick(
              "personalInformation",
              data.personalInformation
            )
          }
        >
          {data.personalInformation && data.personalInformation.length > 0 ? (
            <div className="mb-2 flex items-center justify-between flex-wrap gap-3 mt-2">
              {data.personalInformation.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-1 md:text-[14px] text-[10px] text-gray-500 cursor-pointer"
                >
                  <h1 className="font-bold capitalize">{item.title}:</h1>
                  <h2 className="font-medium text-xs mt-1">{item.value}</h2>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1 className="font-normal text-center text-sm text-gray-500 mt-6 cursor-pointer italic">
                Click this section and set your Personal Information
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-gray-400 mt-3 mb-3"></div>

      {/* Summary */}
      <div
        className="cursor-pointer"
        onClick={() => handleStringFeildClick("summary", data.summary)}
      >
        <h1 className="md:text-xl text-lg text-center font-bold text-gray-800">
          Summary
        </h1>

        <p className="text-black mt-2 md:text-sm text-xs">{data.summary}</p>
      </div>

      {/* Divider */}

      <div className="h-[2px] w-full bg-gray-400 mt-3 mb-3"></div>

      {/* Experience */}

      <div
        className="cursor-pointer"
        onClick={() =>
          handleExperienceFieldClick("experience", data.experience)
        }
      >
        <h1 className="md:text-xl text-lg font-bold text-gray-800 text-center">
          Experience
        </h1>

        {data.experience && data.experience.length > 0 ? (
          <div className=" md:px-5 px-0 ml-3 mt-3 text-black">
            {data.experience.map((item: any, i: number) => (
              <div key={i} className="flex flex-col mt-3">
                <div className="flex justify-between">
                  <div className="md:text-[16px] text-sm flex flex-col gap-1 justify-center">
                    <h1 className="font-bold">{item.companyName}</h1>
                    <h2 className="">{item.title}</h2>
                  </div>

                  <div className="flex justify-end items-center gap-2 md:text-xs text-[7px]">
                    <span>{`(${moment(item.startDate).format("MMM YYYY")} - ${item.endDate === "Currently working"
                      ? "Currently working"
                      : moment(item.endDate).isValid()
                        ? moment(item.endDate).format("MMM YYYY")
                        : ""
                      })`}</span>
                    {/* <span>{`${item.endDate})`}</span> */}
                  </div>
                </div>

                <li className="md:text-sm text-xs mt-1">{item.description}</li>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="mb-5 mt-5"
            onClick={() =>
              handleExperienceFieldClick("experience", data.experience)
            }
          >
            <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">
              Click here to add experience
            </h1>
          </div>
        )}
      </div>

      {/* Divider */}
      {data.education && data.education.length > 0 && (
        <div className="h-[2px] w-full bg-gray-400 mt-3 mb-3"></div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div
          className="cursor-pointer"
          onClick={() => handleEducationFieldClick("education", data.education)}
        >
          <h1 className="md:text-xl text-lg text-center font-bold text-gray-800">
            Education
          </h1>

          <div className="md:px-4 px-0 ml-5 mt-3 text-black grid sm:grid-cols-2 grid-cols-1 gap-2">
            {data.education.map((item: any, i: number) => (
              <div key={i} className=" items-center justify-between ">
                <ul className="list-disc md:text-sm text-xs">
                  <li>{item.degree}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {data.skills && data.skills.length > 0 && (
        <div className="h-[2px] w-full bg-gray-400 mt-3 mb-3"></div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div
          className="cursor-pointer md:px-4 px-0"
          onClick={() => handleArrayFieldClick("skills", data.skills)}
        >
          <h1 className="md:text-xl text-lg text-center font-bold text-gray-800">
            Skills
          </h1>
          <div className=" ml-5 list-disc mt-3 text-black flex flex-wrap items-center justify-center lg:gap-7 sm:gap-2 md:text-sm sm:text-xs text-[10px] gap-1">
            {data.skills.map((item: string, i: number) => (
              <li className="" key={i}>
                {item}
              </li>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="h-[2px] w-full bg-gray-400 mt-3 mb-3"></div>
      )}
      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div
          className=" cursor-pointer"
          onClick={() =>
            handleArrayFieldClick("certifications", data.certifications)
          }
        >
          <h1 className="md:text-xl text-lg text-center font-bold text-gray-800">
            Certifications
          </h1>

          <ul className="list-disc md:px-4 px-0 ml-5 text-black grid sm:grid-cols-2 grid-cols-1 gap-2 md:text-sm text-xs mt-1">
            {data.certifications.map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Divider */}

      <div className="h-[2px] w-full bg-gray-400 mt-3 mb-3"></div>


      {/* Project */}

      <div
        className="cursor-pointer"
        onClick={() => handleProjectFieldClick("projects", data.projects)}
      >
        <h1 className="md:text-xl text-lg text-center font-bold text-gray-800">
          Projects
        </h1>

        {data.projects && data.projects.length > 0 ? (
          < ul className="md:px-5 px-0 ml-3 mt-3 text-black list-disc md:text-lg text-sm">
            {data.projects.map((item: any, i: number) => (
              <li className="mt-5 mb-5" key={i}>
                <h1 className="md:text-[16px] text-sm font-semibold">
                  {item.name}
                </h1>
                <p className="md:text-sm text-xs ">{item.description}</p>
                <div className="flex items-center md:gap-[100px] gap-[70px] mt-1 md:text-sm text-xs">
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
              </li>
            ))}
          </ul>
        ) : (
          <div className="mb-5 mt-5"
            onClick={() => handleProjectFieldClick("projects", data.projects)}
          >
            <h1 className="font-normal text-center text-gray-400 cursor-pointer italic">Click here to add projects</h1>
          </div>
        )}

      </div>


      {/* Custom Section */}
      {
        data.customSection2 && data.customSection2.length > 0 ? (
          <div
            className={`cursor-pointer`}
            onClick={() =>
              handleCustomSection2Click("customSection2", data.customSection2)
            }
          >
            {data.customSection2.map((item, idx) => (
              <div key={idx} className="cursor-pointer">
                {data.customSection2 && data.customSection2.length < 1 ? (
                  <></>
                ) : (
                  <div className="h-[2px] w-full bg-gray-400 mt-3 mb-3"></div>
                )}

                <h1 className="md:text-xl text-lg text-center font-bold text-gray-800 capitalize">
                  {item.title}
                </h1>
                <ul className="md:px-5 px-0 ml-3 mt-2 text-black list-disc">
                  {item.value.map((item: any, i: number) => (
                    <li key={i} className="md:text-sm text-xs ">
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
        )
      }
    </div >
  );
};

export default Template5;
