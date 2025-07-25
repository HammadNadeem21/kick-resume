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


const Template8 = ({ data, handleStringFeildClick, handleArrayFieldClick, handleExperienceFieldClick, handleProjectFieldClick, handleEducationFieldClick, handlePhoneClickFeild, handleEmailFieldClick }: {
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
        <div className="bg-myWhite shadow-[0px_0px_46px_0px_rgba(0,_0,_0,_0.1)] px-7 py-7 lg:w-[70%] w-[100%] mx-auto">
            <div className="flex flex-col gap-2 items-start justify-center w-full">
                <div className="text-center">
                    <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-black cursor-pointer text-left"
                        onClick={() => handleStringFeildClick("name", data.name)}
                    >{data.name}</h1>
                    <h2 className=" text-left cursor-pointer md:text-xl text-lg text-black"
                        onClick={() => handleStringFeildClick("role", data.role)}
                    >
                        {data.role}
                    </h2>
                </div>

                <div className="flex md:flex-row flex-col md:gap-10  gap-5 text-black md:text-sm text-xs w-full">
                    <div className="flex gap-2 md:items-center items-start cursor-pointer"
                        onClick={() => handlePhoneClickFeild('phone', data.phone)}
                    >
                        <h1 className='font-bold'>Phone: </h1>
                        <p>{`+${data.phone}`}</p>
                    </div>

                    <div className="flex gap-2 items-center cursor-pointer"
                        onClick={() => handleEmailFieldClick('email', data.email)}
                    >
                        <h1 className='font-bold'>Email: </h1>
                        <p>{data.email}</p>
                    </div>

                    <div className="flex gap-2 items-center text-black md:text-sm text-xs cursor-pointer"
                        onClick={() => handleStringFeildClick('address', data.address)}
                    >
                        <h1 className='font-bold'>Location: </h1>
                        <p>{data.address}</p>
                    </div>
                </div>
                {/* <div className="flex gap-2 items-center text-gray-500 md:text-sm text-xs cursor-pointer"
                    onClick={() => handleStringFeildClick('address', data.address)}
                >
                    <h1 className='font-bold'>Address: </h1>
                    <p>{data.address}</p>
                </div> */}
            </div>

            {/* Divider */}
            {/* <div className="h-[2px] w-full bg-gray-400 mt-3 mb-3"></div> */}



            {/* Summary */}
            <div className='cursor-pointer mt-4'
                onClick={() => handleStringFeildClick('summary', data.summary)}
            >

                <h1 className="md:text-xl text-lg text-left font-bold text-black uppercase">Summary</h1>


                <p className="text-black mt-2 md:text-sm text-xs">
                    {data.summary}
                </p>
            </div>

            {/* Divider */}
            {/* <div className="h-[3px] w-full bg-black mt-3 mb-3"></div> */}

            {/* Experience */}
            <div className='cursor-pointer mt-4'
                onClick={() => handleExperienceFieldClick('experience', data.experience)}
            >

                <h1 className="md:text-xl text-lg font-bold text-black uppercase text-left">Experience</h1>


                <div className=" md:px-5 px-0  mt-3 text-black">
                    {data.experience.map((item: any, i: number) => (
                        <div key={i} className="flex flex-col mt-3">

                            <div className="flex justify-between">
                                <div className="md:text-[16px] text-sm flex flex-col gap-1 justify-center">
                                    <h1 className='font-bold text-black'>{item.title}</h1>
                                    <h2 className='font-medium'>{item.companyName}</h2>
                                </div>

                                <div className="flex justify-end items-center gap-2 md:text-xs text-[7px]">
                                    <span>{`(${item.startDate}`}</span>
                                    <span>{`${item.endDate})`}</span>
                                </div>
                            </div>

                            <li className="md:text-sm text-xs mt-1">
                                {item.description}
                            </li>

                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            {/* <div className="h-[3px] w-full bg-black mt-3 mb-3"></div> */}


            {/* Education */}
            <div className='cursor-pointer mt-4'
                onClick={() => handleEducationFieldClick('education', data.education)}
            >

                <h1 className="md:text-xl text-lg text-left font-bold text-black uppercase">Education</h1>

                <div className="md:px-4 px-0 ml-5 mt-3 text-black grid sm:grid-cols-2 grid-cols-1 gap-2">
                    {data.education.map((item: any, i: number) => (
                        <div
                            key={i}
                            className=" items-center justify-between "
                        >
                            <ul className="list-disc md:text-sm text-xs flex items-center gap-2">
                                <li>{item.degree}</li>
                                {(item.startDate && item.endDate) && (
                                    <div className='flex text-[10px] text-black gap-2'>
                                        <p>{`(${item.startDate}`}</p>
                                        <p>{`${item.endDate})`}</p>
                                    </div>
                                )}
                            </ul>

                        </div>
                    ))}
                </div>
            </div>


            {/* Divider */}
            {/* <div className="h-[3px] w-full bg-black mt-3 mb-3"></div> */}

            {/* Skills */}
            <div
                className="cursor-pointer mt-4"
                onClick={() => handleArrayFieldClick('skills', data.skills)}
            >
                <h1 className="md:text-xl text-lg text-left font-bold text-black uppercase">Skills</h1>
                {/* <div
                    className="
                                list-disc px-0 mt-3 text-black
                       flex
                       flex-wrap
                       ml-5
                                
                                md:text-sm
                                sm:text-xs
                                text-[10px]
                                
                            "
                >
                    {data.skills.map((item: string, i: number) => (
                        <p className="underline underline-offset-[3px]" key={i}>
                            {`${item},${" "}`}
                        </p>
                    ))}
                </div> */}
                <div
  className="
    px-0 mt-3 text-black
    ml-5
    md:text-sm
    sm:text-xs
    text-[10px]
  "
>
  <p className="">
    {data.skills.join(', ')}
  </p>
</div>

            </div>


            {/* Divider */}
            {/* <div className="h-[3px] w-full bg-black mt-3 mb-3"></div> */}



            {/* Certifications */}
            <div className=" cursor-pointer mt-4"
                onClick={() => handleArrayFieldClick('certifications', data.certifications)}
            >
                <h1
                    className="md:text-xl text-lg text-left font-bold text-black uppercase"
                >
                    Certifications
                </h1>

                <ul className="list-disc md:px-4 px-0 ml-5 text-black grid sm:grid-cols-2 grid-cols-1 gap-2 md:text-sm text-xs mt-1">
                    {data.certifications.map((item: any, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>



            {/* Languages */}
            <div className=" cursor-pointer mt-4"
                onClick={() => handleArrayFieldClick('languages', data.languages)}
            >
                <h1
                    className="md:text-xl text-lg text-left font-bold text-black uppercase"
                >
                    Languages
                </h1>

                <ul className="list-disc md:px-4 px-0 ml-5 text-black grid sm:grid-cols-3 grid-cols-1 gap-2 md:text-sm text-xs mt-1">
                    {data.languages.map((item: any, i: number) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Divider */}
            {/* <div className="h-[3px] w-full bg-black mt-3 mb-3"></div> */}

            {/* Project */}
            <div className='cursor-pointer mt-4'
                onClick={() => handleProjectFieldClick('projects', data.projects)}
            >

                <h1 className="md:text-xl text-lg text-left font-bold text-black uppercase">Projects</h1>


                <ul className="md:px-5 px-0 ml-3 mt-3 text-black list-disc md:text-lg text-sm">
                    {data.projects.map((item: any, i: number) => (
                        <li className="mt-5 mb-5" key={i}>
                            <h1 className="md:text-[16px] text-sm font-semibold">{item.name}</h1>
                            <p className="md:text-sm text-xs ">{item.description}</p>
                            {(item.github && item.live) && (
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

                                    <h1 className="flex items-center gap-1">
                                        live demo
                                    </h1>

                                </Link>
                            </div>
                            )}
                            
                        </li>
                    ))}
                </ul>
            </div>


        </div>

    )
}

export default Template8