
import Link from 'next/link'
import React from 'react'

const educationData = [
  { degree: "Matric ( Science )" },
  { degree: "Intermediate ( Science )" },
  { degree: "BS Software Engineering " }
]

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
  "GitHub"
]

const languageData = [
  "English",
  "Urdu",
]

const certificationData = [
  "Certified JavaScript Developer",
  "Certified React Developer",
]

const experienceData = [
  {
    title: "Frontend Developer at XYZ Company",
    startDate: "Jan 2022",
    endDate: "June 2022"
  },
  {
    title: "Intern at ABC Tech",
    startDate: "Jun 2021",
    endDate: "Dec 2021"
  }
]

const projectsData = [
  {
    name: "Portfolio Website",
    description: "A personal portfolio website to showcase my projects and skills.",
    github: "https://github.com/HammadNadeem21",
    live: "https://github.com/HammadNadeem21"
  },
  {
    name: "E-commerce Website",
    description: "An e-commerce website built with React and Node.js.",
    github: "https://github.com/HammadNadeem21",
    live: "https://github.com/HammadNadeem21"
  }
]
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
  projects: { name: string; description: string; github?: string; live?: string }[];
}

const Template2 = ({
  data,
  handleStringFeildClick,
  handleArrayFieldClick,
  handleExperienceFieldClick,
  handleProjectFieldClick,
  handleEducationFieldClick,
  handlePhoneClickFeild,
  handleEmailFieldClick
}: {
  data: Data,
  handleStringFeildClick: (fieldName: string, value: string) => void,
  handleArrayFieldClick: (fieldName: string, data: string[]) => void,
  handleExperienceFieldClick: (fieldName: string, data: any[]) => void,
  handleProjectFieldClick: (fieldName: string, data: any[]) => void,
  handleEducationFieldClick: (fieldName: string, data: any[]) => void,
  handlePhoneClickFeild: (feildName: string, data: number) => void,
  handleEmailFieldClick: (fieldName: string, data: string) => void
}) => {
  return (
    <div className="bg-myWhite md:px-5 px-2 py-5 text-gray-700 md:w-[70%] w-[100%]">
      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-400"></div>

      <h1 className="lg:text-5xl md:text-4xl sm:text-3xl cursor-pointer text-2xl mb-2 font-semibold text-center mt-5"
        onClick={() => handleStringFeildClick("name", data.name)}
      >
        {data.name}
      </h1>

      <h1 className="md:text-xl text-lg text-center mb-8 cursor-pointer"
        onClick={() => handleStringFeildClick("role", data.role)}
      >{data.role}</h1>

      {/* Contact Details */}

      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-400"></div>

      <div className="grid grid-cols-[35%,65%]">
        {/* Contact Details */}
        <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
          <h1 className="md:text-xl text-sm font-bold text-gray-700">Contact</h1>

          <div className="mt-5 flex flex-col gap-3 md:text-xs text-[10px] text-wrap">
            {/* phone */}
            <div className="flex gap-2 items-center cursor-pointer"
              onClick={() => handlePhoneClickFeild('phone', data.phone)}
            >
              <h1 className='font-bold'>Phone: </h1>
              <p>{`+${data.phone}`}</p>
            </div>

            {/* email */}
            <div className="flex gap-2 items-center ">
              <h1 className='font-bold'>Email: </h1>
              <p
                className='cursor-pointer'
                onClick={() => handleEmailFieldClick("email", data.email)}>{data.email}</p>
            </div>

            {/* Address */}
            <div className="flex gap-2 items-start">
              <h1 className='font-bold'>Address: </h1>
              <p
                className='cursor-pointer'
                onClick={() => handleStringFeildClick("address", data.address)}
              >{data.address}</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="md:px-5 px-2 py-3 border-b border-b-gray-400">
          <h1 className="md:text-xl text-sm font-bold text-gray-700">Profile Summary</h1>
          <p className="mt-3 text-gray-700  md:text-[15px] text-xs leading-5 cursor-pointer"
            onClick={() => handleStringFeildClick("summary", data.summary)}
          >
            {data.summary}
          </p>
        </div>

        <div className="flex flex-col">
          {/* Education */}
          <div
            onClick={() => handleEducationFieldClick("education", data.education)}
            className="cursor-pointer md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400 text-[15px]">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Education</h1>
            <div className="md:px-3 px-0 ml-3 mt-3 text-gray-700  md:text-[15px] text-[10px]">
              {data.education.map((item: any, i: number) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr,auto] items-center justify-between "
                >
                  <ul className="list-disc ">
                    <li>{item.degree}</li>
                  </ul>
                  {/* {(item.startDate && item.endDate) && (

                    <p className="text-gray-500 md:text-sm text-[8px] text-right">
                      ({item.startYear} - {item.endYear})
                    </p>
                  )} */}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div
            onClick={() => handleArrayFieldClick("skills", data.skills)}
            className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400 cursor-pointer">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Skills</h1>
            <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
              {data.skills.map((item: string, i: number) => (
                <li className="md:text-[15px] text-xs mt-1" key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Language */}

          <div
            onClick={() => handleArrayFieldClick("languages", data.languages)}
            className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400 cursor-pointer">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Languages</h1>
            <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
              {data.languages.map((item: string, i: number) => (
                <li className="md:text-[15px] text-xs mt-1" key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Certification */}
          <div
            onClick={() => handleArrayFieldClick("certifications", data.certifications)}
            className="md:px-3 px-0 py-3 border-r  border-r-gray-400 border-b-gray-400 cursor-pointer">
            <h1 className="md:text-xl text-xs font-bold text-gray-700">Certifications</h1>
            <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
              {data.certifications.map((item: string, i: number) => (
                <li className="md:text-[15px] text-xs mt-1" key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col ">
          {/* Experience */}
          <div
            onClick={() => handleExperienceFieldClick("experience", data.experience)}
            className="md:px-5 px-2 py-3 border-b border-b-gray-400 cursor-pointer">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Work Experience</h1>

            <div className=" md:px-5 px-0 ml-5 mt-3 text-gray-700">
              {data.experience.map((item: any, i: number) => (
                <div className="mt-2 mb-2" key={i}>
                  <div className="flex items-center justify-between">

                    <ul className="list-disc md:text-sm text-xs font-semibold">
                      <li>{item.title}</li>
                    </ul>

                    <div className="flex items-center gap-2 md:text-xs text-[7px]">
                      <span>{`(${item.startDate}`}</span>
                      <span>{`${item.endDate})`}</span>
                    </div>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="md:px-5 px-2 py-3 cursor-pointer"
            onClick={() => handleProjectFieldClick("projects", data.projects)}
          >
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Projects</h1>

            <ul className="md:px-5 px-0 ml-4 mt-3 md:text-sm text-xs text-gray-700 list-disc">
              {data.projects.map((item: any, i: number) => (
                <li className="mt-5 mb-5" key={i}>
                  <h1 className="md:text-lg text-sm font-semibold">{item.name}</h1>
                  <p className="md:text-sm text-xs">{item.description}</p>
                  <div className="flex items-center gap-[100px] mt-3">

                    <Link
                      href={"/aiprompt"}
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2 md:text-sm text-xs"
                    >


                      <h1>GitHub</h1>

                    </Link>



                    <Link
                      href={'/aiprompt'}
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
        </div>
      </div>

      {/* <h2 className="font-semibold mt-4 mb-1">Summary</h2>
      <p>{resumeData.summary}</p> */}
      {/* Baaki fields bhi dikhana ho to yahan add karo */}
    </div>
  )
}

export default Template2
