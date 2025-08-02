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

const Template10 = ({
  data,
  handleStringFeildClick,
  handleArrayFieldClick,
  handleExperienceFieldClick,
  handleProjectFieldClick,
  handleEducationFieldClick,
  handlePhoneClickFeild,
  handleEmailFieldClick,
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
  color: Color;
}) => {
  return (
    <div className="bg-myWhite shadow-lg shadow-myMidPurple/70 px-7 py-7 lg:w-[70%] w-[100%] mx-auto">
      <div className="flex flex-col gap-2 items-start justify-center w-full">
        <div className="text-center w-full">
          <h1
            className="lg:text-4xl md:text-3xl text-2xl font-bold text-gray-800 cursor-pointer text-center"
            onClick={() => handleStringFeildClick("name", data.name)}
          >
            {data.name}
          </h1>
          <h2
            className=" text-center cursor-pointer md:text-xl text-lg text-black font-bold"
            onClick={() => handleStringFeildClick("role", data.role)}
          >
            {data.role}
          </h2>
        </div>

        <div className="flex items-center justify-between text-black md:text-sm text-xs w-full">
          <div
            className="flex gap-2 md:items-center items-start cursor-pointer"
            onClick={() => handlePhoneClickFeild("phone", data.phone)}
          >
            <h1 className="font-bold">Phone: </h1>
            <p>{`+${data.phone}`}</p>
          </div>

          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => handleEmailFieldClick("email", data.email)}
          >
            <h1 className="font-bold">Email: </h1>
            <p>{data.email}</p>
          </div>

          <div
            className="flex gap-2 items-center text-black md:text-sm text-xs cursor-pointer"
            onClick={() => handleStringFeildClick("address", data.address)}
          >
            <h1 className="font-bold">Location: </h1>
            <p>{data.address}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div
        className="cursor-pointer mt-4"
        onClick={() => handleStringFeildClick("summary", data.summary)}
      >
        <h1
          className=" py-[2px] rounded-full px-3 italic md:text-xl text-lg text-left font-bold  uppercase"
          style={{
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
          }}
        >
          Summary
        </h1>

        <p className="text-black mt-2 md:text-sm text-xs">{data.summary}</p>
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <div
          className="cursor-pointer mt-4"
          onClick={() => handleArrayFieldClick("skills", data.skills)}
        >
          <h1
            className=" py-[2px] rounded-full px-3 italic md:text-xl text-lg text-left font-bold  uppercase"
            style={{
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
              color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
            }}
          >
            technical skills
          </h1>

          <ul
            className="px-0 mt-3 text-black    ml-5
md:text-sm
    sm:text-xs
    text-[10px]
    grid grid-cols-3
  "
          >
            {data.skills.map((item, index) => (
              <li key={index} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div
          className="cursor-pointer mt-4"
          onClick={() =>
            handleExperienceFieldClick("experience", data.experience)
          }
        >
          <h1
            className=" py-[2px] rounded-full px-3 italic md:text-xl text-lg text-left font-bold  uppercase"
            style={{
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
              color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
            }}
          >
            Experience
          </h1>

          <div className=" md:px-5 px-0  mt-3 text-black grid grid-cols-2 gap-6">
            {data.experience.map((item: any, i: number) => (
              <div key={i} className="flex flex-col mt-3">
                <div className="flex justify-between">
                  <div className="md:text-[16px] text-sm flex flex-col gap-1 justify-center">
                    <h1 className="font-bold text-black">{item.title}</h1>
                    <h2 className="font-medium">{item.companyName}</h2>
                  </div>

                  <div className="flex justify-end items-center gap-2 md:text-xs text-[7px]">
                    <span>{`(${item.startDate}`}</span>
                    <span>{`${item.endDate})`}</span>
                  </div>
                </div>

                <li className="md:text-sm text-xs mt-1">{item.description}</li>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div
          className="cursor-pointer mt-4"
          onClick={() => handleEducationFieldClick("education", data.education)}
        >
          <h1
            className=" py-[2px] rounded-full px-3 italic md:text-xl text-lg text-left font-bold  uppercase"
            style={{
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
              color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
            }}
          >
            education
          </h1>

          <div className="md:px-4 px-0 ml-5 mt-3 text-black grid sm:grid-cols-2 grid-cols-1 gap-2">
            {data.education.map((item: any, i: number) => (
              <div key={i} className=" items-center justify-between ">
                <ul className="list-disc md:text-sm text-xs flex items-center gap-2">
                  <li>{item.degree}</li>
                  {item.startDate && item.endDate && (
                    <div className="flex text-[10px] text-black gap-2">
                      <p>{`(${item.startDate}`}</p>
                      <p>{`${item.endDate})`}</p>
                    </div>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.languages.length > 0 && data.certifications.length > 0 && (
        <div className=" mt-4">
          <h1
            className=" py-[2px] rounded-full px-3 italic md:text-xl text-lg text-left font-bold  uppercase"
            style={{
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
              color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
            }}
          >
            additional information
          </h1>

          <div className="md:px-4 px-0 text-black md:text-sm text-xs mt-1 grid grid-cols-2 gap-3">
            {data.languages.length > 0 && (
              <div
                className="font-bold cursor-pointer mt-2"
                onClick={() =>
                  handleArrayFieldClick("languages", data.languages)
                }
              >
                Languages:
                <ul className="list-disc ml-5 font-normal">
                  {data.languages.map((lang: string, i: number) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>
            )}

            {data.certifications.length > 0 && (
              <div
                className="font-bold cursor-pointer"
                onClick={() =>
                  handleArrayFieldClick("certifications", data.certifications)
                }
              >
                Certifications:
                <ul className="list-disc ml-5 font-normal">
                  {data.certifications.map((cert: string, i: number) => (
                    <li key={i}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Project */}
      {data.projects.length > 0 && (
        <div
          className="cursor-pointer mt-4"
          onClick={() => handleProjectFieldClick("projects", data.projects)}
        >
          <h1
            className=" py-[2px] rounded-full px-3 italic md:text-xl text-lg text-left font-bold  uppercase"
            style={{
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`,
              color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
            }}
          >
            projects
          </h1>

          <ul className="md:px-5 px-0 ml-3 mt-3 text-black list-disc md:text-lg text-sm">
            {data.projects.map((item: any, i: number) => (
              <li className="mt-5 mb-5" key={i}>
                <h1 className="md:text-[16px] text-sm font-semibold">
                  {item.name}
                </h1>
                <p className="md:text-sm text-xs ">{item.description}</p>
                {item.github && item.live && (
                  <div className="flex items-center md:gap-[100px] gap-[70px] mt-1 md:text-sm text-xs text-black">
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
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Template10;
