// Example TemplateOne.tsx
"use client";



import { useResumeDataContext } from "@/context/ResumeBuilderData";
import Link from "next/link";



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


interface Data {
    name: string;
    role: string;
    phone: string;
    email: string;
    address: string;
    summary: string;
    education:  {
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


export default function Template1({data}: {data: Data}) {
//   const { resumeData } = useResumeDataContext();

//   console.log("education", resumeData?.experience[0]);

//   if (!resumeData)
//     return <p>No resume data found. Please fill the form first.</p>;


  return (
    <div className="bg-myWhite grid grid-cols-[35%,65%] text-gray-700">
      {/* left-side */}
      <div className="bg-[#193042] py-2 md:px-3 px-1">
        <h1
          className={`md:text-2xl text-lg mb-5 font-semibold text-center mt-5 text-white`}
        >
          {data.name}
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
            {data.education.map((item: any, i: number) => (
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
            {data.skills.map((item: any, i: number) => (
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
            {data.languages.map((item: any, i: number) => (
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
            {data.certifications.map((item: any, i: number) => (
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
          {data.role}
        </h1>
        {/* Contact */}
        {/* <div className="flex flex-col gap-4 mb-2">
          <div className="flex flex-col item-start w-full">
            
          </div>
        </div> */}
            {/* phone */}
            <div className="flex md:text-[15px] text-xs text-[#193042] items-center gap-1">

              <h2 className="">{data.phone}</h2>
            </div>
            {/* email */}
            <div className="flex md:text-[15px] text-xs text-[#193042] mt-1 mb-1">

              <h2 className="">{data.email}</h2>
            </div>

        <div className="flex items-center mb-2 gap-1 text-[#193042] md:text-[15px] text-xs">

          <h2 className="">{data.address}</h2>
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
          <p className="text-[#193042] md:text-[15px] text-xs leading-6">
            {data.summary}
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
            {data.experience.map((item: any, i: number) => (
              <div
                key={i}
                className={`flex flex-col justify-between text-[#193042]`}
              >
                <ul className="list-disc md:text-[15px] text-xs">
                  <li className=" font-bold">{item.title}</li>
                </ul>
                <p>{item.description}</p>

                {/* <div className="flex items-center gap-2 md:text-xs text-[8px]">
                  <span>{`(${item.startDate}`}</span>
                  <span>{`${item.endDate})`}</span>
                </div> */}
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
            {data.projects.map((item: any, i: number) => (
              <li className="mt-5 mb-5" key={i}>
                <h1 className="md:text-lg text-xs md:font-medium font-bold">{item.name}</h1>
                <p className="md:text-sm text-xs">{item.description}</p>
                <div className="flex items-center gap-[100px] mt-3 md:text-sm text-xs">
                  <Link
                    href="#"
                    className="hover:underline hover:underline-offset-2 flex items-center gap-2"
                  >
                    
                   
                      <h1>GitHub</h1>
                    
                  </Link>

                  <Link
                    href="#"
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
  );
}
