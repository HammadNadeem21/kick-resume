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


const Template3 = ({ data, handleStringFeildClick, handleArrayFieldClick, handleExperienceFieldClick, handleProjectFieldClick, handleEducationFieldClick, handlePhoneClickFeild, handleEmailFieldClick }: {
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
        <div className="bg-myWhite px-7 py-7  lg:w-[70%] w-[100%] mx-auto shadow-[0px_0px_46px_0px_rgba(0,_0,_0,_0.1)]">
            <div className="flex flex-col gap-3 md:w-[70%] w-[100%]">
                <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-black cursor-pointer"
                    onClick={() => handleStringFeildClick("name", data.name)}
                >{data.name}</h1>
                <h2 className="cursor-pointer md:text-2xl text-xl md:font-bold font-semibold text-gray-700 cu"
                    onClick={() => handleStringFeildClick("role", data.role)}
                >
                    {data.role}
                </h2>

                <div className="flex justify-between text-gray-500 md:text-sm text-xs">
                    <div className="flex gap-2 items-center cursor-pointer"
                        onClick={() => handleEmailFieldClick("email", data.email)}
                    >
                        <h1 className='font-bold'>Email: </h1>
                        <p>{data.email}</p>
                    </div>

                    <div className="flex gap-2 items-center cursor-pointer"
                        onClick={() => handlePhoneClickFeild('phone', data.phone)}
                    >
                        <h1 className='font-bold'>Phone: </h1>
                        <p>{`+${data.phone}`}</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center text-gray-500 md:text-sm text-xs cursor-pointer"
                    onClick={() => handleStringFeildClick('address', data.address)}
                >
                    <h1 className='font-bold'>Address: </h1>
                    <p>{data.address}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

            <div className="grid grid-cols-[65%,35%]">
                {/* left-side */}
                <div className="">
                    {/* Summary */}
                    <div className='cursor-pointer'
                        onClick={() => handleStringFeildClick('summary', data.summary)}
                    >
                        <div className="md:px-2 px-1 py-[2px]">
                            <h1 className="md:text-xl text-lg font-bold text-gray-800">Summary</h1>
                        </div>

                        <p className="text-black mt-2 md:text-sm text-xs">
                            {data.summary}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

                    {/* Experience */}
                    <div className='cursor-pointer'
                        onClick={() => handleExperienceFieldClick('experience', data.experience)}
                    >
                        <div className="md:px-2 px-1 py-[2px]">
                            <h1 className="md:text-xl text-lg font-bold text-gray-800">Experience</h1>
                        </div>

                        <div className=" md:px-5 px-0 ml-3 mt-3 text-black">
                            {data.experience.map((item: any, i: number) => (
                                <div key={i} className="flex flex-col">
                                    <ul className="list-disc md:text-sm text-xs flex items-center gap-5">
                                        <li className='font-bold'>{item.companyName}</li>
                                        <h1 className='md:text-xs text-[10px] font-semibold'>{item.title}</h1>
                                    </ul>

                                    <p className="md:text-sm text-xs font-medium">
                                        {item.description}
                                    </p>
                                    <div className="flex justify-end items-center gap-2 md:text-xs text-[7px]">
                                        <span>{`(${item.startDate}`}</span>
                                        <span>{`${item.endDate})`}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

                    {/* Project */}
                    <div className='cursor-pointer'
                        onClick={() => handleProjectFieldClick('projects', data.projects)}
                    >
                        <div className="md:px-2 px-1 py-[2px]">
                            <h1 className="md:text-xl text-lg font-bold text-gray-800">Projects</h1>
                        </div>

                        <ul className="md:px-5 px-0 ml-3 mt-3 text-black list-disc md:text-lg text-sm font-semibold">
                            {data.projects.map((item: any, i: number) => (
                                <li className="mt-5 mb-5" key={i}>
                                    <h1 className="md:text-lg text-sm font-semibold">{item.name}</h1>
                                    <p className="md:text-sm text-xs font-medium">{item.description}</p>
                                    <div className="flex items-center md:gap-[100px] gap-[70px] mt-3 md:text-sm text-xs">
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
                    <div className='cursor-pointer'
                        onClick={() => handleEducationFieldClick('education', data.education)}
                    >
                        <div className="md:px-2 px-1 py-[2px]">
                            <h1 className="text-sm font-bold text-black">Education</h1>
                        </div>
                        <div className="md:px-4 px-0 ml-5 mt-3 text-black flex flex-col gap-3">
                            {data.education.map((item: any, i: number) => (
                                <div
                                    key={i}
                                    className=" items-center justify-between "
                                >
                                    <ul className="list-disc md:text-sm text-xs">
                                        <li>{item.degree}</li>
                                    </ul>
                                    {/* <p className="text-gray-500 md:text-sm text-[9px] text-right">
                    ({item.startYear} - {item.endYear})
                  </p> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

                    {/* Skills */}
                    <div className='cursor-pointer'
                        onClick={() => handleArrayFieldClick('skills', data.skills)}
                    >
                        <div className="md:px-2 px-1 py-[2px]">
                            <h1 className="text-[15px] font-bold text-black">Skills</h1>
                        </div>
                        <ul className="list-disc md:px-4 px-0 ml-5 mt-3 text-black flex flex-col gap-2 md:text-sm text-xs">
                            {data.skills.map((item: string, i: number) => (
                                <li className="" key={i}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Divider */}
                    <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

                    {/* Languages */}
                    <div className="mt-8 mb-8 cursor-pointer"
                        onClick={() => handleArrayFieldClick('languages', data.languages)}
                    >
                        <h1
                            className={`text-[15px] font-bold  mb-2 text-left mt-5  text-gray-800`}
                        >
                            Languages
                        </h1>

                        <ul className="list-disc text-black px-5 flex flex-col gap-2 md:text-sm text-xs">
                            {data.languages.map((item: any, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Divider */}
                    <div className="h-[2px] w-full bg-gray-400 mt-5 mb-5"></div>

                    {/* Certifications */}
                    <div className="mt-8 mb-8 cursor-pointer"
                        onClick={() => handleArrayFieldClick('certifications', data.certifications)}
                    >
                        <h1
                            className={`text-[15px] font-bold mb-2 text-left mt-5 text-gray-800`}
                        >
                            Certifications
                        </h1>

                        <ul className="list-disc text-black px-5 flex flex-col gap-2 md:text-sm text-xs">
                            {data.certifications.map((item: any, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template3