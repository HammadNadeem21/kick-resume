// // Example TemplateOne.tsx
// "use client";



// import { useResumeDataContext } from "@/context/ResumeBuilderData";
// import Link from "next/link";

// export default function TemplateOne() {
//   const { resumeData } = useResumeDataContext();

//   console.log("education", resumeData?.experience[0]);

//   if (!resumeData)
//     return <p>No resume data found. Please fill the form first.</p>;

//   return (
    // <div className="bg-myWhite md:px-5 px-2 py-5 text-gray-700">
    //   {/* Divider */}
    //   <div className="h-[1px] w-full bg-gray-400"></div>

    //   <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl mb-2 font-semibold text-center mt-5">
    //     {resumeData.fullName}
    //   </h1>

    //   <h1 className="md:text-xl text-lg text-center mb-8">{resumeData.position}</h1>

    //   {/* Contact Details */}

    //   {/* Divider */}
    //   <div className="h-[1px] w-full bg-gray-400"></div>

    //   <div className="grid grid-cols-[35%,65%]">
    //     {/* Contact Details */}
    //     <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
    //       <h1 className="md:text-xl text-sm font-bold text-gray-700">Contact</h1>

    //       <div className="mt-5 flex flex-col gap-3 md:text-[15px] text-xs text-wrap">
    //         {/* phone */}
    //         <div className="flex gap-2 items-center">
          
    //           <p>{resumeData.phone}</p>
    //         </div>

    //         {/* email */}
    //         <div className="flex gap-2 items-center text-[10px]">
        
    //           <p>{resumeData.email}</p>
    //         </div>

    //         {/* Address */}
    //         <div className="flex gap-2 items-center">
            
    //           <p>{resumeData.address}</p>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Summary */}
    //     <div className="md:px-5 px-2 py-3 border-b border-b-gray-400">
    //       <h1 className="md:text-xl text-sm font-bold text-gray-700">Profile Summary</h1>
    //       <p className="mt-3 text-gray-700  md:text-[15px] text-xs">{resumeData.summary}</p>
    //     </div>

    //     <div className="flex flex-col">
    //       {/* Education */}
    //       <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400 text-[15px]">
    //         <h1 className="md:text-xl text-sm font-bold text-gray-700">Education</h1>
    //         <div className="md:px-3 px-0 ml-3 mt-3 text-gray-700  md:text-[15px] text-[10px]">
    //           {resumeData.education.map((item: any, i: number) => (
    //             <div
    //               key={i}
    //               className="grid grid-cols-[1fr,auto] items-center justify-between "
    //             >
    //               <ul className="list-disc ">
    //                 <li>{item.degree}</li>
    //               </ul>
    //               <p className="text-gray-500 md:text-sm text-[8px] text-right">
    //                 ({item.startYear} - {item.endYear})
    //               </p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Skills */}
    //       <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
    //         <h1 className="md:text-xl text-sm font-bold text-gray-700">Skills</h1>
    //         <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
    //           {resumeData.skills.map((item: string, i: number) => (
    //             <li className="md:text-[15px] text-xs" key={i}>
    //               {item}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //       {/* Language */}

    //       <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
    //         <h1 className="md:text-xl text-sm font-bold text-gray-700">Languages</h1>
    //         <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
    //           {resumeData.languages.map((item: string, i: number) => (
    //             <li className="md:text-[15px] text-xs" key={i}>{item}</li>
    //           ))}
    //         </ul>
    //       </div>

    //       {/* Certification */}
    //       <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
    //         <h1 className="md:text-xl text-xs font-bold text-gray-700">Certifications</h1>
    //         <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
    //           {resumeData.certifications.map((item: string, i: number) => (
    //             <li className="md:text-[15px] text-xs" key={i}>{item}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>

    //     <div className="flex flex-col border-b border-b-gray-400">
    //       {/* Experience */}
    //       <div className="md:px-5 px-2 py-3 border-b border-b-gray-400">
    //         <h1 className="md:text-xl text-sm font-bold text-gray-700">Work Experience</h1>

    //         <div className=" md:px-5 px-0 ml-5 mt-3 text-gray-700">
    //           {resumeData.experience.map((item: any, i: number) => (
    //             <div key={i} className="flex items-center justify-between">
    //               <ul className="list-disc md:text-sm text-xs font-semibold">
    //                 <li>{item.title}</li>
    //               </ul>

    //               <p className="md:text-xs text-[8px]">
    //                 ({item.startDate} - {item.endDate})
    //               </p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Projects */}
    //       <div className="md:px-5 px-2 py-3">
    //         <h1 className="md:text-xl text-sm font-bold text-gray-700">Projects</h1>

    //         <ul className="md:px-5 px-0 ml-4 mt-3 md:text-sm text-xs text-gray-700 list-disc">
    //           {resumeData.projects.map((item: any, i: number) => (
    //             <li className="mt-5 mb-5" key={i}>
    //               <h1 className="md:text-lg text-sm font-semibold">{item.name}</h1>
    //               <p className="md:text-sm text-xs">{item.description}</p>
    //               <div className="flex items-center gap-[100px] mt-3">
                    
    //                 <Link
    //                   href={item.github}
    //                   className="hover:underline hover:underline-offset-2 flex items-center gap-2 md:text-sm text-xs"
    //                 >
                      
                     
    //                   <h1>GitHub</h1> 
                     
    //                 </Link>
                    

                    
    //                 <Link
    //                   href={item.live}
    //                   className="hover:underline hover:underline-offset-2 flex items-center gap-2"
    //                 >
    //                   <div className="flex items-center justify-center gap-1">
                      
    //                   <h1 className="flex items-center gap-1">live demo</h1>
    //                   </div>
    //                 </Link>
                    
    //               </div>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>

    //   {/* <h2 className="font-semibold mt-4 mb-1">Summary</h2>
    //   <p>{resumeData.summary}</p> */}
    //   {/* Baaki fields bhi dikhana ho to yahan add karo */}
    // </div>
//   );
// }



import Link from 'next/link'
import React from 'react'

const educationData = [
  { degree: "Matric ( Science )"},
  { degree: "Intermediate ( Science )"},
  { degree: "BS Software Engineering "}
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


const TemplateTwo = () => {
  return (
    <div className="bg-myWhite md:px-5 px-2 py-5 text-gray-700">
      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-400"></div>

      <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl mb-2 font-semibold text-center mt-5">
        Locus Resume
      </h1>

      <h1 className="md:text-xl text-lg text-center mb-8">Frontend Developer</h1>

      {/* Contact Details */}

      {/* Divider */}
      <div className="h-[1px] w-full bg-gray-400"></div>

      <div className="grid grid-cols-[35%,65%]">
        {/* Contact Details */}
        <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
          <h1 className="md:text-xl text-sm font-bold text-gray-700">Contact</h1>

          <div className="mt-5 flex flex-col gap-3 md:text-[15px] text-xs text-wrap">
            {/* phone */}
            <div className="flex gap-2 items-center">
          
              <p>+923221835452</p>
            </div>

            {/* email */}
            <div className="flex gap-2 items-center text-[10px]">
        
              <p>locus@gmail.com</p>
            </div>

            {/* Address */}
            <div className="flex gap-2 items-center">
            
              <p>House# 56, street#76, Karachi, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="md:px-5 px-2 py-3 border-b border-b-gray-400">
          <h1 className="md:text-xl text-sm font-bold text-gray-700">Profile Summary</h1>
          <p className="mt-3 text-gray-700  md:text-[15px] text-xs">
            
                        I am a passionate web developer with experience in frontend technologies like HTML, CSS, JavaScript, TypeScript, React, and Next.js. I enjoy building modern, responsive websites and web apps. I also explore backend tools and databases to become a full-stack developer and solve real-world problems with clean code.
          </p>
        </div>

        <div className="flex flex-col">
          {/* Education */}
          <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400 text-[15px]">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Education</h1>
            <div className="md:px-3 px-0 ml-3 mt-3 text-gray-700  md:text-[15px] text-[10px]">
              {educationData.map((item: any, i: number) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr,auto] items-center justify-between "
                >
                  <ul className="list-disc ">
                    <li>{item.degree}</li>
                  </ul>
                  <p className="text-gray-500 md:text-sm text-[8px] text-right">
                    ({item.startYear} - {item.endYear})
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Skills</h1>
            <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
              {SkillsData.map((item: string, i: number) => (
                <li className="md:text-[15px] text-xs" key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Language */}

          <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Languages</h1>
            <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
              {languageData.map((item: string, i: number) => (
                <li className="md:text-[15px] text-xs" key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Certification */}
          <div className="md:px-3 px-0 py-3 border-r border-b border-r-gray-400 border-b-gray-400">
            <h1 className="md:text-xl text-xs font-bold text-gray-700">Certifications</h1>
            <ul className="list-disc md:px-5 px-0 ml-3 mt-3 text-gray-700">
              {certificationData.map((item: string, i: number) => (
                <li className="md:text-[15px] text-xs" key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col border-b border-b-gray-400">
          {/* Experience */}
          <div className="md:px-5 px-2 py-3 border-b border-b-gray-400">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Work Experience</h1>

            <div className=" md:px-5 px-0 ml-5 mt-3 text-gray-700">
              {experienceData.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <ul className="list-disc md:text-sm text-xs font-semibold">
                    <li>{item.title}</li>
                  </ul>

                  <p className="md:text-xs text-[8px]">
                    ({item.startDate} - {item.endDate})
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="md:px-5 px-2 py-3">
            <h1 className="md:text-xl text-sm font-bold text-gray-700">Projects</h1>

            <ul className="md:px-5 px-0 ml-4 mt-3 md:text-sm text-xs text-gray-700 list-disc">
              {projectsData.map((item: any, i: number) => (
                <li className="mt-5 mb-5" key={i}>
                  <h1 className="md:text-lg text-sm font-semibold">{item.name}</h1>
                  <p className="md:text-sm text-xs">{item.description}</p>
                  <div className="flex items-center gap-[100px] mt-3">
                    
                    <Link
                      href={item.github}
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2 md:text-sm text-xs"
                    >
                      
                     
                      <h1>GitHub</h1> 
                     
                    </Link>
                    

                    
                    <Link
                      href={item.live}
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

export default TemplateTwo
