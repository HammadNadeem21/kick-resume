import Image from 'next/image';
import Link from 'next/link'
import React from 'react'



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

interface Color {
    r: number;
    g: number;
    b: number
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
    imageUrl,
    imageBgColor,
    selectedTheme, // Add selectedTheme prop here
    color
}: {
    data: Data,
    handleStringFeildClick: (fieldName: string, value: string) => void,
    handleArrayFieldClick: (fieldName: string, data: string[]) => void,
    handleExperienceFieldClick: (fieldName: string, data: any[]) => void,
    handleProjectFieldClick: (fieldName: string, data: any[]) => void,
    handleEducationFieldClick: (fieldName: string, data: any[]) => void,
    handlePhoneClickFeild: (feildName: string, data: number) => void,
    handleEmailFieldClick: (fieldName: string, data: string) => void,
    imageUrl?: string,
    imageBgColor?: string,
    selectedTheme?: any // Add selectedTheme prop type here
    color: Color
}) => {
    return (
        // <div className="bg-myWhite lg:w-[70%] w-[100%] mx-auto shadow-[0px_0px_46px_0px_rgba(0,_0,_0,_0.1)]">

        //     <div className="grid grid-cols-[70%,30%] gap-3 w-[100%] px-5 py-5" style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>
        //         <div className="">
        //             <div className=''>
        //                 <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold cursor-pointer text-white" 
        //                     onClick={() => handleStringFeildClick("name", data.name)}
        //                 >{data.name}</h1>
        //                 <h2 className="cursor-pointer md:text-2xl text-xl md:font-bold font-semibold text-white"
        //                     onClick={() => handleStringFeildClick("role", data.role)}
        //                 >
        //                     {data.role}
        //                 </h2>
        //             </div>

        //             <div className='w-[70%]'>
        //                 <div className="flex justify-between" >
        //                     <div className="flex gap-2 items-center cursor-pointer text-white"
        //                         onClick={() => handleEmailFieldClick("email", data.email)}
        //                     >
        //                         <h1 className='font-bold'>Email: </h1>
        //                         <p>{data.email}</p>
        //                     </div>

        //                     <div className="flex gap-2 items-center cursor-pointer text-white"
        //                         onClick={() => handlePhoneClickFeild('phone', data.phone)}
        //                     >
        //                         <h1 className='font-bold'>Phone: </h1>
        //                         <p>{`+${data.phone}`}</p>
        //                     </div>
        //                 </div>
        //                 <div className="flex gap-2 items-center md:text-sm text-xs text-white cursor-pointer mt-1" style={{ color: selectedTheme?.headerText }}
        //                     onClick={() => handleStringFeildClick('address', data.address)}
        //                 >
        //                     <h1 className='font-bold'>Address: </h1>
        //                     <p>{data.address}</p>
        //                 </div>
        //             </div>
        //         </div>

        // <div className={`flex justify-end items-center h-[150px] w-[150px] mt-4 rounded-full overflow-hidden ${imageBgColor || 'bg-gray-300'}`}>
        //     <Image src={imageUrl ?? '/dummy.jpg'} alt='User' height={100} width={100} className='w-full h-full object-cover' />
        // </div>

        //     </div>

        //     {/* Divider */}
        //     {/* <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div> */}

        //     <div className="grid grid-cols-[60%,40%] px-5 py-7">
        //         {/* left-side */}
        //         <div className="">
        //             {/* Experience */}
        //             <div className='cursor-pointer'
        //                 onClick={() => handleExperienceFieldClick('experience', data.experience)}
        //             >
        //                 <div className="md:px-2 px-1 py-[2px] border-b-2" style={{ borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>
        //                     <h1 className="md:text-xl text-lg font-bold"
        //                     style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}
        //                     >Experience</h1>
        //                 </div>

        //                 <div className=" md:px-5 px-0 ml-3 mt-3 text-black">
        //                     {data.experience.map((item: any, i: number) => (
        //                         <div key={i} className="flex flex-col mt-3">
        //                             <div className="flex flex-col gap-[2px]">
        //                                 <ul className="list-disc md:text-sm text-xs flex items-center gap-5">
        //                                     <li className='font-bold'
        //                                     style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`}}
        //                                     >{item.title}</li>
        //                                 </ul>
        //                                 <h1 className='md:text-xs text-[10px] font-bold text-gray-500'>{item.companyName}</h1>

        //                                 <div className="flex justify-start items-center gap-4 md:text-[10px] text-[7px]">
        //                                     <span>{`(${item.startDate}`}</span>
        //                                     <span>{`${item.endDate})`}</span>
        //                                 </div>
        //                                 <p className="md:text-xs text-[10px] text-gray-800">
        //                                     {item.description}
        //                                 </p>
        //                             </div>

        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>

        //             {/* Divider */}
        //             {/* <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div> */}

        //             {/* Experience */}
        //             {/* <div className='cursor-pointer'
        //                 onClick={() => handleExperienceFieldClick('experience', data.experience)}
        //             >
        //                 <div className="md:px-2 px-1 py-[2px]">
        //                     <h1 className="md:text-xl text-lg font-bold text-gray-800">Experience</h1>
        //                 </div>

        //                 <div className=" md:px-5 px-0 ml-3 mt-3 text-black">
        //                     {data.experience.map((item: any, i: number) => (
        //                         <div key={i} className="flex flex-col">
        //                             <ul className="list-disc md:text-sm text-xs flex items-center gap-5">
        //                                 <li className='font-bold'>{item.companyName}</li>
        //                                 <h1 className='md:text-xs text-[10px] font-semibold'>{item.title}</h1>
        //                             </ul>

        //                             <p className="md:text-sm text-xs font-medium">
        //                                 {item.description}
        //                             </p>
        //                             <div className="flex justify-end items-center gap-2 md:text-xs text-[7px]">
        //                                 <span>{`(${item.startDate}`}</span>
        //                                 <span>{`${item.endDate})`}</span>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div> */}

        //             {/* Divider */}
        //             {/* <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div> */}

        //             {/* Project */}
        //             <div className='cursor-pointer mt-4'
        //                 onClick={() => handleProjectFieldClick('projects', data.projects)}
        //             >
        //                 <div className="md:px-2 px-1 py-[2px] border-b-2 "
        //                 style={{ borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}
        //                 >
        //                     <h1 className="md:text-xl text-lg font-bold"
        //                     style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}
        //                     >Projects</h1>
        //                 </div>

        //                 <ul className="md:px-5 px-0 ml-3 mt-2 list-disc md:text-lg text-sm font-semibold">
        //                     {data.projects.map((item: any, i: number) => (
        //                         <li className="mt-5 mb-5" key={i}
        //                         style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`}}
        //                         >
        //                             <h1 className=" md:text-sm text-xs font-bold"
        //                             style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`}}
        //                             >{item.name}</h1>
        //                             <p className="md:text-xs text-[10px] font-medium text-gray-800">{item.description}</p>
        //                             <div className="flex items-center md:gap-[100px] gap-[70px] mt-1 text-gray-800 md:text-sm text-xs">
        //                                 <Link
        //                                     href={"#"}
        //                                     className="hover:underline hover:underline-offset-2 flex items-center gap-2"
        //                                 >


        //                                     <h1>GitHub</h1>

        //                                 </Link>

        //                                 <Link
        //                                     href={"#"}
        //                                     className="hover:underline hover:underline-offset-2 flex items-center gap-2"
        //                                 >

        //                                     <h1 className="flex items-center gap-1">live demo</h1>

        //                                 </Link>
        //                             </div>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>


        //         </div>

        //         {/* right-side */}
        //         <div className=" px-2 py-[3px]">
        //             {/* Summary */}
        //             <div className='cursor-pointer'
        //                 onClick={() => handleStringFeildClick('summary', data.summary)}
        //             >
        //                 <div className=" mt-[1px] px-1 border-b-2"
        //                 style={{ borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}
        //                 >
        //                     <h1 className="md:text-xl text-lg font-bold"
        //                     style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}
        //                     >Summary</h1>
        //                 </div>
        //                 {/* <div className="md:px-4 px-0 ml-5 mt-3 text-black flex flex-col gap-3">
        //                     {data.education.map((item: any, i: number) => (
        //                         <div
        //                             key={i}
        //                             className=" items-center justify-between "
        //                         >
        //                             <ul className="list-disc md:text-sm text-xs">
        //                                 <li>{item.degree}</li>
        //                             </ul>
        //                             <p className="text-gray-500 md:text-sm text-[9px] text-right">
        //             ({item.startYear} - {item.endYear})
        //           </p>
        //                         </div>
        //                     ))}
        //                 </div> */}
        //                 <p className='text-gray-800 md:text-sm text-xs mt-2 leading-relaxed'>{data.summary}</p>
        //             </div>


        //             {/* Education */}
        //             {/* Education */}
        //             <div className='cursor-pointer mt-4'
        //                 onClick={() => handleEducationFieldClick('education', data.education)}
        //             >
        //                 <div className=" mt-[1px] px-1 border-b-2"
        //                 style={{ borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}
        //                 >
        //                     <h1 className="md:text-xl text-lg font-bold"
        //                     style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}
        //                     >Education</h1>
        //                 </div>
        //                 <div className="md:px-4 px-0 ml-5 mt-3 flex flex-col gap-1">
        //                     {data.education.map((item: any, i: number) => (
        //                         <div
        //                             key={i}
        //                             className=" items-center justify-between text-gray-800"
        //                         >
        //                             <ul className="list-disc md:text-sm text-xs text-gray-800">
        //                                 <li>{item.degree}</li>
        //                             </ul>
        //                             {/* <p className="text-gray-500 md:text-sm text-[9px] text-right">
        //                                 ({item.startYear} - {item.endYear})
        //                             </p> */}
        //                         </div>
        //                     ))}
        //                 </div>
        //                 {/* <p className='text-gray-800 md:text-xs text-[10px] mt-2'>{data.summary}</p> */}
        //             </div>

        //             {/* Divider */}
        //             {/* <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div> */}

        //             {/* Skills */}
        //             {/* <div className='cursor-pointer'
        //                 onClick={() => handleArrayFieldClick('skills', data.skills)}
        //             >
        //                 <div className="md:px-2 px-1 py-[2px]">
        //                     <h1 className="text-[15px] font-bold text-black">Skills</h1>
        //                 </div>
        //                 <ul className="list-disc md:px-4 px-0 ml-5 mt-3 text-black flex flex-col gap-2 md:text-sm text-xs">
        //                     {data.skills.map((item: string, i: number) => (
        //                         <li className="" key={i}>
        //                             {item}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div> */}

        //             {/* Divider */}
        //             {/* <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div> */}

        //             {/* Languages */}

        //             <div className="mt-4 cursor-pointer"
        //                 onClick={() => handleArrayFieldClick('languages', data.languages)}
        //             >
        //                 <div className="mt-[1px] px-1 border-b-2"
        //                 style={{ borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}
        //                 >
        //                     <h1
        //                         className={`md:text-xl text-lg font-bold`}
        //                         style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}
        //                     >
        //                         Languages
        //                     </h1>
        //                 </div>

        //                 <div className="md:px-4 px-0 ml-5 mt-3 flex flex-col gap-1">
        //                     {data.languages.map((item: any, i: number) => (
        //                         <div
        //                             key={i}
        //                             className=" items-center justify-between text-gray-800"
        //                         >
        //                             <ul className="list-disc md:text-sm text-xs text-gray-800">
        //                                 <li>{item}</li>
        //                             </ul>
        //                             {/* <p className="text-gray-500 md:text-sm text-[9px] text-right">
        //                                 ({item.startYear} - {item.endYear})
        //                             </p> */}
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>

        //             {/* Divider */}
        //             {/* <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div> */}

        //             {/* Certifications */}
        //             {/* <div className="mt-8 mb-8 cursor-pointer"
        //                 onClick={() => handleArrayFieldClick('certifications', data.certifications)}
        //             >
        //                 <h1
        //                     className={`text-[15px] font-bold mb-2 text-left mt-5 text-gray-800`}
        //                 >
        //                     Certifications
        //                 </h1>

        //                 <ul className="list-disc text-black px-5 flex flex-col gap-2 md:text-sm text-xs">
        //                     {data.certifications.map((item: any, i: number) => (
        //                         <li key={i}>{item}</li>
        //                     ))}
        //                 </ul>
        //             </div> */}
        //             <div className="mt-4 cursor-pointer"
        //                 onClick={() => handleArrayFieldClick('certifications', data.certifications)}
        //             >
        //                 <div className="mt-[1px] px-1 border-b-2"
        //                 style={{ borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}
        //                 >
        //                     <h1
        //                         className={`md:text-xl text-lg font-bold `}
        //                         style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}
        //                     >
        //                         Certifications
        //                     </h1>
        //                 </div>

        //                 <div className="md:px-4 px-0 ml-5 mt-3 flex flex-col gap-1">
        //                     {data.certifications.map((item: any, i: number) => (
        //                         <div
        //                             key={i}
        //                             className=" items-center justify-between text-gray-800"
        //                         >
        //                             <ul className="list-disc md:text-sm text-xs text-gray-800">
        //                                 <li >{item}</li>
        //                             </ul>
        //                             {/* <p className="text-gray-500 md:text-sm text-[9px] text-right">
        //                                 ({item.startYear} - {item.endYear})
        //                             </p> */}
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>


        //             {/* Tech Stack */}
        //             <div className="cursor-pointer mt-4"
        //                 onClick={() => handleArrayFieldClick('skills', data.skills)}
        //             >

        //                 <div className="md:px-2 px-1 py-[2px] border-b-2"
        //                 style={{ borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}
        //                 >
        //                     <h1 className="md:text-xl text-lg font-bold "
        //                     style={{color:`rgba(${color.r}, ${color.g}, ${color.b}, 1)`}}
        //                     >Tech Stack</h1>
        //                 </div>

        //                 <div className="mt-3 flex gap-2 flex-wrap">
        //                     {data.skills.map((item: string, index: number) => (
        //                         <div className=" rounded-full px-2 py-1" key={index}
        //                         style={{backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`}}
        //                         >
        //                             <h1 className='md:text-sm text-xs'>{item}</h1>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>


        //         </div>
        //     </div>
        // </div>
        <div className="bg-myWhite grid grid-cols-[65%,35%] text-gray-700  lg:w-[70%] w-[100%] mx-auto shadow-[0px_0px_46px_0px_rgba(0,_0,_0,_0.1)]">

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
                    
                    onClick={() => handleStringFeildClick('role', data.role)}
                >
                    {data.role}
                </h1>


                <div className="flex md:text-[14px] text-[10px] text-gray-700 items-center gap-1 cursor-pointer"
                    onClick={() => handlePhoneClickFeild("phone", data.phone)}
                >
                    <h1 className="font-bold">Phone: </h1>
                    <h2 className="">{`+${data.phone}`}</h2>
                </div>

                {/* email */}
                <div className="flex gap-1 md:text-[14px] text-[10px] text-gray-700 mt-1 mb-1 cursor-pointer"
                    onClick={() => handleEmailFieldClick("email", data.email)}
                >
                    <h1 className="font-bold">Email: </h1>
                    <h2 className="">{data.email}</h2>
                </div>


                {/* Address */}
                <div className="flex items-center mb-2 gap-1 text-gray-700 md:text-[14px] text-[10px] cursor-pointer"
                    onClick={() => handleStringFeildClick("address", data.address)}
                >
                    <h1 className="font-bold">Address: </h1>
                    <h2 className="">{data.address}</h2>
                </div>


                {/* Divider */}
                <div className="h-[1px] w-full bg-gray-700 mt-2"></div>

                {/* Summary */}
                <div onClick={() => handleStringFeildClick('summary', data.summary)} className="cursor-pointer">
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
                        onClick={() => handleExperienceFieldClick("experience", data.experience)}
                        className="cursor-pointer"
                    >
                        <h1
                            className={`md:text-xl text-sm mb-2 text-left mt-5 font-bold text-gray-700`}
                        >
                            Experience
                        </h1>

                        <div className=" px-5 mt-3 text-gray-700">
                            {data.experience.map((item: any, i: number) => (
                                <div
                                    key={i}
                                    className={`flex flex-col justify-between`}
                                >
                                    <ul className="mt-3 list-disc  md:text-[15px] text-xs flex gap-5">
                                        <li className=" font-bold">{item.companyName}</li>
                                        <h1 className="font-bold md:text-xs text-[10px]">{item.title}</h1>
                                    </ul>
                                    <p>{item.description}</p>

                                    <div className="flex items-center gap-2 md:text-xs text-[7px]">
                                        <span>{`(${item.startDate}`}</span>
                                        <span>{item.endDate === "Currently working" ? "Currently working" : item.endDate}{")"}</span>
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
                                    <h1 className="md:text-lg text-xs md:font-medium font-bold">{item.name}</h1>
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

            </div>

            {/* left-side */}
            <div className=" py-2 md:px-3 px-1" style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>

                <div className={`flex justify-center items-center sm:ml-[65px] ml-[25px] mb-2 sm:h-[150px] sm:w-[150px] h-[90px] w-[90px] mt-4 rounded-full overflow-hidden ${imageBgColor || 'bg-gray-300'}`}>
                    <Image src={imageUrl ?? '/dummy.jpg'} alt='User' height={100} width={100} className='w-full h-full object-cover' />
                </div>
                
                {/* Divider */}
                {/* {data.education.length > 0 && (
  <div className="h-[1px] w-full mt-2 bg-white"></div>

)} */}

                {/* Education */}
                {data.education.length > 0 && (
                    <div className="mt-8 mb-8 sm:ml-0 ml-1 cursor-pointer"
                        onClick={() => handleEducationFieldClick("education", data.education)}
                    >
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
                )}


                {/* Divider */}
                {data.skills.length > 0 && (
                    <div className="h-[1px] w-full bg-white mt-5"></div>

                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <div className="mt-8 mb-8 sm:ml-0 ml-1 cursor-pointer"
                        onClick={() => handleArrayFieldClick("skills", data.skills)}
                    >
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
                )}

                {/* Divider */}
                {data.languages.length > 0 && (
                    <div className="h-[1px] w-full bg-white mt-5"></div>
                )}




                {/* languages */}
                {data.languages.length > 0 && (
                    <div className="mt-8 mb-8 sm:ml-0 ml-1 cursor-pointer"
                        onClick={() => handleArrayFieldClick("languages", data.languages)}
                    >
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
                )}


                {/* Divider */}
                {data.certifications.length > 0 && (
                    <div className="h-[1px] w-full bg-white mt-5"></div>

                )}

                {/* Certifications */}
                {data.certifications.length > 0 && (
                    <div className="mt-8 mb-8 sm:ml-0 ml-1 cursor-pointer"
                        onClick={() => handleArrayFieldClick("certifications", data.certifications)}
                    >
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
                )}

            </div>


        </div>
    )
}

export default Template7