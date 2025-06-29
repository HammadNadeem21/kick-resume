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
//     <div className="bg-myWhite px-7 py-7">
//       <div className="flex flex-col gap-3 md:w-[70%] w-[100%]">
//         <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-black">{resumeData.fullName}</h1>
//         <h2 className="md:text-2xl text-xl md:font-bold font-semibold text-gray-700">
//           {resumeData.position}
//         </h2>

//         <div className="flex justify-between text-gray-500 md:text-sm text-xs">
//           <div className="flex gap-2 items-center ">
           
//             <p>{resumeData.email}</p>
//           </div>

//           <div className="flex gap-2 items-center">
           
//             <p>{resumeData.phone}</p>
//           </div>
//         </div>
//         <div className="flex gap-2 items-center text-gray-500 md:text-sm text-xs">
        
//           <p>{resumeData.address}</p>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

//       <div className="grid grid-cols-[65%,35%]">
//         {/* left-side */}
//         <div className="">
//           {/* Summary */}
//           <div>
//             <div className="md:px-2 px-1 py-[2px]">
//               <h1 className="md:text-xl text-lg font-bold text-gray-800">Summary</h1>
//             </div>

//             <p className="text-black mt-2 md:text-sm text-xs">{resumeData.summary}</p>
//           </div>

//           {/* Divider */}
//           <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

//           {/* Experience */}
//           <div>
//             <div className="md:px-2 px-1 py-[2px]">
//               <h1 className="md:text-xl text-lg font-bold text-gray-800">Experience</h1>
//             </div>

//             <div className=" md:px-5 px-0 ml-3 mt-3 text-black">
//               {resumeData.experience.map((item: any, i: number) => (
//                 <div key={i} className="flex items-center justify-between">
//                   <ul className="list-disc md:text-sm text-xs font-semibold">
//                     <li>{item.title}</li>
//                   </ul>

//                   <p className="md:text-xs text-[8px]">
//                     ({item.startDate} - {item.endDate})
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

//           {/* Project */}
//           <div>
//             <div className="md:px-2 px-1 py-[2px]">
//               <h1 className="md:text-xl text-lg font-bold text-gray-800">Projects</h1>
//             </div>

//             <ul className="md:px-5 px-0 ml-3 mt-3 text-black list-disc md:text-lg text-sm font-semibold">
//               {resumeData.projects.map((item: any, i: number) => (
//                 <li className="mt-5 mb-5" key={i}>
//                   <h1 className="md:text-lg text-sm font-semibold">{item.name}</h1>
//                   <p className="md:text-sm text-xs font-medium">{item.description}</p>
//                   <div className="flex items-center md:gap-[100px] gap-[70px] mt-3 md:text-sm text-xs">
//                     <Link
//                       href={item.github}
//                       className="hover:underline hover:underline-offset-2 flex items-center gap-2"
//                     >
                      
                        
//                         <h1>GitHub</h1>
                 
//                     </Link>

//                     <Link
//                       href={item.live}
//                       className="hover:underline hover:underline-offset-2 flex items-center gap-2"
//                     >
                    
//                         <h1 className="flex items-center gap-1">
//                            live demo
//                         </h1>
                    
//                     </Link>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* right-side */}
//         <div className=" px-1 py-[3px]">
//           {/* Education */}
//           <div>
//             <div className="md:px-2 px-1 py-[2px]">
//               <h1 className="text-sm font-bold text-black">Education</h1>
//             </div>
//             <div className="md:px-4 px-0 ml-5 mt-3 text-black flex flex-col gap-3">
//               {resumeData.education.map((item: any, i: number) => (
//                 <div
//                   key={i}
//                   className=" items-center justify-between "
//                 >
//                   <ul className="list-disc md:text-sm text-xs">
//                     <li>{item.degree}</li>
//                   </ul>
//                   <p className="text-gray-500 md:text-sm text-[9px] text-right">
//                     ({item.startYear} - {item.endYear})
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

//           {/* Skills */}
//           <div>
//             <div className="md:px-2 px-1 py-[2px]">
//               <h1 className="text-[15px] font-bold text-black">Skills</h1>
//             </div>
//             <ul className="list-disc md:px-4 px-0 ml-5 mt-3 text-black flex flex-col gap-2 md:text-sm text-xs">
//               {resumeData.skills.map((item: string, i: number) => (
//                 <li className="" key={i}>
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Divider */}
//           <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

//           {/* Languages */}
//           <div className="mt-8 mb-8">
//             <h1
//               className={`text-[15px] font-bold  mb-2 text-left mt-5  text-gray-800`}
//             >
//               Languages
//             </h1>

//             <ul className="list-disc text-black px-5 flex flex-col gap-2 md:text-sm text-xs">
//               {resumeData.languages.map((item: any, i: number) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Divider */}
//           <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

//           {/* Certifications */}
//           <div className="mt-8 mb-8">
//             <h1
//               className={`text-[15px] font-bold mb-2 text-left mt-5 text-gray-800`}
//             >
//               Certifications
//             </h1>

//             <ul className="list-disc text-black px-5 flex flex-col gap-2 md:text-sm text-xs">
//               {resumeData.certifications.map((item: any, i: number) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
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


const TemplateThree = () => {
  return (
    <div className="bg-myWhite px-7 py-7">
      <div className="flex flex-col gap-3 md:w-[70%] w-[100%]">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-black">Hammad</h1>
        <h2 className="md:text-2xl text-xl md:font-bold font-semibold text-gray-700">
          Full Stack Developer
        </h2>

        <div className="flex justify-between text-gray-500 md:text-sm text-xs">
          <div className="flex gap-2 items-center ">
           
            <p>hammad@gmail.com</p>
          </div>

          <div className="flex gap-2 items-center">
           
            <p>+92221835452</p>
          </div>
        </div>
        <div className="flex gap-2 items-center text-gray-500 md:text-sm text-xs">
        
          <p>House# 234, Street# 9, Karachi, Pakistan</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

      <div className="grid grid-cols-[65%,35%]">
        {/* left-side */}
        <div className="">
          {/* Summary */}
          <div>
            <div className="md:px-2 px-1 py-[2px]">
              <h1 className="md:text-xl text-lg font-bold text-gray-800">Summary</h1>
            </div>

            <p className="text-black mt-2 md:text-sm text-xs">
               I am a passionate web developer with experience in frontend technologies like HTML, CSS, JavaScript, TypeScript, React, and Next.js. I enjoy building modern, responsive websites and web apps. I also explore backend tools and databases to become a full-stack developer and solve real-world problems with clean code.
            </p>
          </div>

          {/* Divider */}
          <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

          {/* Experience */}
          <div>
            <div className="md:px-2 px-1 py-[2px]">
              <h1 className="md:text-xl text-lg font-bold text-gray-800">Experience</h1>
            </div>

            <div className=" md:px-5 px-0 ml-3 mt-3 text-black">
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

          {/* Divider */}
          <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

          {/* Project */}
          <div>
            <div className="md:px-2 px-1 py-[2px]">
              <h1 className="md:text-xl text-lg font-bold text-gray-800">Projects</h1>
            </div>

            <ul className="md:px-5 px-0 ml-3 mt-3 text-black list-disc md:text-lg text-sm font-semibold">
              {projectsData.map((item: any, i: number) => (
                <li className="mt-5 mb-5" key={i}>
                  <h1 className="md:text-lg text-sm font-semibold">{item.name}</h1>
                  <p className="md:text-sm text-xs font-medium">{item.description}</p>
                  <div className="flex items-center md:gap-[100px] gap-[70px] mt-3 md:text-sm text-xs">
                    <Link
                      href={item.github}
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                    >
                      
                        
                        <h1>GitHub</h1>
                 
                    </Link>

                    <Link
                      href={item.live}
                      className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                    >
                    
                        <h1 className="flex items-center gap-1">
                           live demo
                        </h1>
                    
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
            <div className="md:px-2 px-1 py-[2px]">
              <h1 className="text-sm font-bold text-black">Education</h1>
            </div>
            <div className="md:px-4 px-0 ml-5 mt-3 text-black flex flex-col gap-3">
              {educationData.map((item: any, i: number) => (
                <div
                  key={i}
                  className=" items-center justify-between "
                >
                  <ul className="list-disc md:text-sm text-xs">
                    <li>{item.degree}</li>
                  </ul>
                  <p className="text-gray-500 md:text-sm text-[9px] text-right">
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
            <div className="md:px-2 px-1 py-[2px]">
              <h1 className="text-[15px] font-bold text-black">Skills</h1>
            </div>
            <ul className="list-disc md:px-4 px-0 ml-5 mt-3 text-black flex flex-col gap-2 md:text-sm text-xs">
              {SkillsData.map((item: string, i: number) => (
                <li className="" key={i}>
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

            <ul className="list-disc text-black px-5 flex flex-col gap-2 md:text-sm text-xs">
              {languageData.map((item: any, i: number) => (
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

            <ul className="list-disc text-black px-5 flex flex-col gap-2 md:text-sm text-xs">
              {certificationData.map((item: any, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateThree
