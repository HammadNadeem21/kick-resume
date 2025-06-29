// // Example TemplateOne.tsx
// "use client";



// import { useResumeDataContext } from "@/context/ResumeBuilderData";
// import Link from "next/link";



// import { Poppins } from "next/font/google";
// const poppins700 = Poppins({
//   subsets: ["latin"],
//   weight: ["700"],
//   display: "swap",
// });
// const poppins600 = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
//   display: "swap",
// });
// const poppins400 = Poppins({
//   subsets: ["latin"],
//   weight: ["400"],
//   display: "swap",
// });

// export default function TemplateOne() {
//   const { resumeData } = useResumeDataContext();

//   console.log("education", resumeData?.experience[0]);

//   if (!resumeData)
//     return <p>No resume data found. Please fill the form first.</p>;

//   return (
//     <div className="bg-myWhite grid grid-cols-[35%,65%] text-gray-700">
//       {/* left-side */}
//       <div className="bg-[#193042] py-2 md:px-3 px-1">
//         <h1
//           className={`md:text-2xl text-lg mb-5 font-semibold text-center mt-5 ${poppins700.className} text-white`}
//         >
//           {resumeData.fullName}
//         </h1>

//         {/* Divider */}
//         <div className="h-[1px] w-full bg-[#385b77] mt-2"></div>

//         {/* Education */}
//         <div className="mt-8 mb-8">
//           <h1
//             className={`md:text-xl text-sm mb-2 text-left mt-5 ${poppins600.className} text-white`}
//           >
//             Education
//           </h1>

//           <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
//             {resumeData.education.map((item: any, i: number) => (
//               <li key={i}>{item.degree}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Divider */}
//         <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

//         {/* Skills */}
//         <div className="mt-8 mb-8">
//           <h1
//             className={`md:text-xl text-sm mb-2 text-left mt-5 ${poppins600.className} text-white`}
//           >
//             Skills
//           </h1>

//           <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
//             {resumeData.skills.map((item: any, i: number) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Divider */}
//         <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

//         {/* languages */}
//         <div className="mt-8 mb-8">
//           <h1
//             className={`md:text-xl text-sm mb-2 text-left mt-5 ${poppins600.className} text-white`}
//           >
//             Languages
//           </h1>

//           <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
//             {resumeData.languages.map((item: any, i: number) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Divider */}
//         <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

//         {/* Certifications */}
//         <div className="mt-8 mb-8">
//           <h1
//             className={`md:text-xl text-sm mb-2 text-left mt-5 ${poppins600.className} text-white`}
//           >
//             Certifications
//           </h1>

//           <ul className="list-disc text-white md:text-sm text-xs  px-5 flex flex-col gap-3">
//             {resumeData.certifications.map((item: any, i: number) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       {/* Right-side */}
//       <div className="py-3 md:px-5 px-2">
//         <h1
//           className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-[#193042]`}
//         >
//           {resumeData.position}
//         </h1>
//         {/* Contact */}
//         {/* <div className="flex flex-col gap-4 mb-2">
//           <div className="flex flex-col item-start w-full">
            
//           </div>
//         </div> */}
//             {/* phone */}
//             <div className="flex md:text-[15px] text-xs text-[#193042] items-center gap-1">

//               <h2 className={` ${poppins400.className}`}>{resumeData.phone}</h2>
//             </div>
//             {/* email */}
//             <div className="flex md:text-[15px] text-xs text-[#193042] mt-1 mb-1">

//               <h2 className={` ${poppins400.className}`}>{resumeData.email}</h2>
//             </div>

//         <div className="flex items-center mb-2 gap-1 text-[#193042] md:text-[15px] text-xs">

//           <h2 className={` ${poppins400.className}`}>{resumeData.address}</h2>
//         </div>

//         {/* Divider */}
//         <div className="h-[1px] w-full bg-[#193042] mt-2"></div>

//         {/* Summary */}
//         <div>
//           <h1
//             className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-[#193042]`}
//           >
//             Summary
//           </h1>
//           <p className={`${poppins400.className} text-[#193042] md:text-[15px] text-xs leading-6`}>
//             {resumeData.summary}
//           </p>
//         </div>

//         {/* Divider */}
//         <div className="h-[1px] w-full bg-[#193042] mt-3"></div>

//         {/* Experience */}
//         <div>
//           <h1
//             className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-[#193042]`}
//           >
//             Experience
//           </h1>

//           <div className=" px-5 mt-3 text-gray-700">
//             {resumeData.experience.map((item: any, i: number) => (
//               <div
//                 key={i}
//                 className={`flex items-center justify-between ${poppins400.className} text-[#193042]`}
//               >
//                 <ul className="list-disc md:text-[15px] text-xs">
//                   <li>{item.title}</li>
//                 </ul>

//                 <div className="flex items-center gap-2 md:text-xs text-[8px]">
//                   <span>{`(${item.startDate}`}</span>
//                   <span>{`${item.endDate})`}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="h-[1px] w-full bg-[#193042] mt-5"></div>

//         {/* Projects */}
//         <div>
//           <h1
//             className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-[#193042]`}
//           >
//             Projects
//           </h1>
//           <ul className=" px-5 mt-3 text-[#193042] list-disc">
//             {resumeData.projects.map((item: any, i: number) => (
//               <li className="mt-5 mb-5" key={i}>
//                 <h1 className="md:text-lg text-xs md:font-medium font-bold">{item.name}</h1>
//                 <p className="md:text-sm text-xs">{item.description}</p>
//                 <div className="flex items-center gap-[100px] mt-3 md:text-sm text-xs">
//                   <Link
//                     href={item.github}
//                     className="hover:underline hover:underline-offset-2 flex items-center gap-2"
//                   >
                    
                   
//                       <h1>GitHub</h1>
                    
//                   </Link>

//                   <Link
//                     href={item.live}
//                     className="hover:underline hover:underline-offset-2 flex items-center gap-2"
//                   >
//                     <div className="flex items-center justify-center gap-1">
//                       <h1 className="flex items-center gap-1">
//                          live demo
//                       </h1>
//                     </div>
//                   </Link>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import Link from 'next/link'
import React from 'react'
import { start } from 'repl'

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

const TemplateOne = () => {
  return (
<div className="bg-myWhite grid grid-cols-[35%,65%] text-gray-700">
      {/* left-side */}
      <div className="bg-[#193042] py-2 md:px-3 px-1">
        <h1
          className={`md:text-2xl text-lg mb-5 font-semibold text-center mt-5 text-white`}
        >
          John Doe
        </h1>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#385b77] mt-2"></div>

        {/* Education */}
        <div className="mt-8 mb-8">
          <h1
            className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}
          >
            Education
          </h1>

          <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
            {educationData.map((item: any, i: number) => (
              <li key={i}>{item.degree}</li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

        {/* Skills */}
        <div className="mt-8 mb-8">
          <h1
            className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}
          >
            Skills
          </h1>

          <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
            {SkillsData.map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

        {/* languages */}
        <div className="mt-8 mb-8">
          <h1
            className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}
          >
            Languages
          </h1>

          <ul className="list-disc text-white md:text-sm text-xs px-5 flex flex-col gap-3">
            {languageData.map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#385b77] mt-5"></div>

        {/* Certifications */}
        <div className="mt-8 mb-8">
          <h1
            className={`md:text-xl text-sm mb-2 text-left mt-5 text-white`}
          >
            Certifications
          </h1>

          <ul className="list-disc text-white md:text-sm text-xs  px-5 flex flex-col gap-3">
            {certificationData.map((item: any, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Right-side */}
      <div className="py-3 md:px-5 px-2">
        <h1
          className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-[#193042]`}
        >
          Web Developer
        </h1>
        {/* Contact */}
        {/* <div className="flex flex-col gap-4 mb-2">
          <div className="flex flex-col item-start w-full">
            
          </div>
        </div> */}
            {/* phone */}
            <div className="flex md:text-[15px] text-xs text-[#193042] items-center gap-1">

              <h2 className="">+923328765423</h2>
            </div>
            {/* email */}
            <div className="flex md:text-[15px] text-xs text-[#193042] mt-1 mb-1">

              <h2 className="">johndoe@gmail.com</h2>
            </div>

        <div className="flex items-center mb-2 gap-1 text-[#193042] md:text-[15px] text-xs">

          <h2 className="">House# 34, Street# 45, Washngton, America</h2>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#193042] mt-2"></div>

        {/* Summary */}
        <div>
          <h1
            className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-[#193042]`}
          >
            Summary
          </h1>
          <p className=" text-[#193042] md:text-[15px] text-xs leading-6">
            I am a passionate web developer with experience in frontend technologies like HTML, CSS, JavaScript, TypeScript, React, and Next.js. I enjoy building modern, responsive websites and web apps. I also explore backend tools and databases to become a full-stack developer and solve real-world problems with clean code.
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#193042] mt-3"></div>

        {/* Experience */}
        <div>
          <h1
            className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-[#193042]`}
          >
            Experience
          </h1>

          <div className=" px-5 mt-3 text-gray-700">
            {experienceData.map((item: any, i: number) => (
              <div
                key={i}
                className={`flex items-center justify-between text-[#193042]`}
              >
                <ul className="list-disc md:text-[15px] text-xs">
                  <li>{item.title}</li>
                </ul>

                <div className="flex items-center gap-2 md:text-xs text-[8px]">
                  <span>{`(${item.startDate}`}</span>
                  <span>{`${item.endDate})`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#193042] mt-5"></div>

        {/* Projects */}
        <div>
          <h1
            className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-[#193042]`}
          >
            Projects
          </h1>
          <ul className=" px-5 mt-3 text-[#193042] list-disc">
            {projectsData.map((item: any, i: number) => (
              <li className="mt-5 mb-5" key={i}>
                <h1 className="md:text-lg text-xs md:font-medium font-bold">{item.name}</h1>
                <p className="md:text-sm text-xs">{item.description}</p>
                <div className="flex items-center gap-[100px] mt-3 md:text-sm text-xs">
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
      </div>
    </div>
  )
}

export default TemplateOne
