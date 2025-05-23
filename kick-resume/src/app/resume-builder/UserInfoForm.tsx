"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useResumeDataContext } from "@/context/ResumeBuilderData";
import { resume } from "@/lib/data";
import { set } from "mongoose";

interface Project {
  name: string;
  description: string;
  github: string;
  live: string;
}

interface resumeForm {
  fullName: string;
  email: string;
  phone: number;
  address: string;
  languages: string[];
  summary:string;
  education: string[];
  skills: string[];
  certifications: string[];
  experience: string[];
  projects: Project[];
  linkdinUrl: string;
}

export function TabsDemo() {
  const [languages, setLanguages] = useState([""]);
  const [education, setEducation] = useState([""]);
  const [skills, setSkills] = useState([""]);
  const [certifications, setCertifications] = useState([""]);
  const [experience, setExperience] = useState([""]);
  const [projects, setProjects] = useState([
    { name: "", description: "", github: "", live: "" },
  ]);

  const addLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    setLanguages(newLanguages);
  };

  // Education
  const addEducation = () => setEducation([...education, ""]);
  const handleEducationChange = (index: number, value: string) => {
    const updated = [...education];
    updated[index] = value;
    setEducation(updated);
  };

  // Skills
  const addSkill = () => setSkills([...skills, ""]);
  const handleSkillChange = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  // Certifications
  const addCertification = () => setCertifications([...certifications, ""]);
  const handleCertificationChange = (index: number, value: string) => {
    const updated = [...certifications];
    updated[index] = value;
    setCertifications(updated);
  };

  // Experience
  const addExperience = () => setExperience([...experience, ""]);
  const handleExperienceChange = (index: number, value: string) => {
    const updated = [...experience];
    updated[index] = value;
    setExperience(updated);
  };

  // Projects
  type ProjectField = "name" | "description" | "github" | "live";
  const addProject = () => {
    setProjects([
      ...projects,
      { name: "", description: "", github: "", live: "" },
    ]);
  };
  const handleProjectChange = (
    index: number,
    field: ProjectField,
    value: string
  ) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };
  // Form handling

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<resumeForm>();
  const { resumeData,setResumeData } = useResumeDataContext();

  const submit = (data: resumeForm) => {
    // console.log("Data", data);
    setResumeData(data)
    console.log("Resume Data", resumeData);
  };


  const [activeTab, setActiveTab] = useState("Personal Details");
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid items-center px-3 py-3 gap-1"
    >
      <Tabs
        className="sm:w-[500px] w-[350px]"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="Personal Details"
            className="data-[state=active]:bg-primaryColor data-[state=active]:text-myLightBlue"
          >
            Personal Details
          </TabsTrigger>
          <TabsTrigger
            value="Skills & Education"
            className="data-[state=active]:bg-primaryColor data-[state=active]:text-myLightBlue"
          >
            Skills & Education
          </TabsTrigger>
          <TabsTrigger
            value="Experience & Projects"
            className="data-[state=active]:bg-primaryColor data-[state=active]:text-myLightBlue"
          >
            Experience & Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Personal Details">
          <Card className="px-4 py-4 flex flex-col gap-3 border-2 border-myDarkBlue">
            <div className="text-myMidblue">
              <Label>Full Name</Label>
              <Input
                {...register("fullName", {
                  required: "Full Name is required",
                })}
                type="text"
                placeholder="Full Name"
                className="bg-transparent focus:outline-none focus:bg-transparent"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="text-myMidblue">
              <Label>Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Email"
                className="bg-transparent focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="text-myMidblue">
              <Label>Phone</Label>
              <Input
                {...register("phone", {
                  required: "Phone Number is required",
                })}
                type="number"
                placeholder="Phone"
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="text-myMidblue flex flex-col">
              <Label>Address</Label>
              <textarea
                {...register("address")}
                className="bg-transparent border border-myMidblue rounded-lg mt-1 focus:outline-none px-2 py-1"
              ></textarea>
            </div>

            <div className="text-myMidblue">
              <Label>Language</Label>
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center mb-2 space-x-2 mt-1"
                >
                  <input
                    {...register(`languages.${idx}`)}
                    type="text"
                    value={lang}
                    onChange={(e) => handleLanguageChange(idx, e.target.value)}
                    className="bg-transparent border border-myMidblue rounded-lg px-3 py-2 flex-grow focus:outline-none"
                  />
                  {idx === languages.length - 1 && (
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="text-primaryColor rounded px-3 py-3 font-bold  cursor-pointer bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="text-myMidblue flex flex-col">
              <Label>Summary</Label>
              <textarea
                {...register("summary")}
                className="bg-transparent border border-myMidblue rounded-lg mt-1 focus:outline-none px-2 py-1"
              ></textarea>
            </div>

            <div className="flex justify-end items-center">
              <Button
                type="button"
                onClick={handleSubmit(() => setActiveTab("Skills & Education"))}
                className="text-primaryColor  w-[30%] bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
              >
                Next
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Skills & Education */}
        <TabsContent value="Skills & Education">
          <Card className="px-4 py-4 flex flex-col gap-3 border-2 border-myDarkBlue">
            {/* Education */}
            <div className="text-myMidblue">
              <Label>Education</Label>
              {education.map((lang, idx) => (
                <div key={idx} className="flex items-center mb-2 space-x-2">
                  <input
                    {...register(`education.${idx}`)}
                    type="text"
                    value={lang}
                    onChange={(e) => handleEducationChange(idx, e.target.value)}
                    className="bg-transparent border border-myMidblue rounded-lg px-3 py-2 flex-grow focus:outline-none"
                  />
                  {idx === education.length - 1 && (
                    <button
                      type="button"
                      onClick={addEducation}
                      className="text-primaryColor rounded px-3 py-3 font-bold  cursor-pointer bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="text-myMidblue">
              <Label>Skills</Label>
              {skills.map((lang, idx) => (
                <div key={idx} className="flex items-center mb-2 space-x-2">
                  <input
                    {...register(`skills.${idx}`)}
                    type="text"
                    value={lang}
                    onChange={(e) => handleSkillChange(idx, e.target.value)}
                    className="bg-transparent border border-myMidblue rounded-lg px-3 py-2 flex-grow focus:outline-none"
                  />
                  {idx === skills.length - 1 && (
                    <button
                      type="button"
                      onClick={addSkill}
                      className="text-primaryColor rounded px-3 py-3 font-bold  cursor-pointer bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Certification */}
            <div className="text-myMidblue">
              <Label>Certifications</Label>
              {certifications.map((lang, idx) => (
                <div key={idx} className="flex items-center mb-2 space-x-2">
                  <input
                    {...register(`certifications.${idx}`)}
                    type="text"
                    value={lang}
                    onChange={(e) =>
                      handleCertificationChange(idx, e.target.value)
                    }
                    className="bg-transparent border border-myMidblue rounded-lg px-3 py-2 flex-grow focus:outline-none"
                  />
                  {idx === certifications.length - 1 && (
                    <button
                      type="button"
                      onClick={addCertification}
                      className="text-primaryColor rounded px-3 py-3 font-bold  cursor-pointer bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                onClick={() => setActiveTab("Personal Details")}
                className="text-primaryColor  w-[30%] bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
              >
                Previous
              </Button>

              <Button
                type="button"
                onClick={() => setActiveTab("Experience & Projects")}
                className="text-primaryColor  w-[30%] bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
              >
                Next
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="Experience & Projects">
          <Card className="px-4 py-4 flex flex-col gap-3 border-2 border-myDarkBlue">
            {/* Experience */}
            <div className="text-myMidblue">
              <Label>Experience</Label>
              {experience.map((lang, idx) => (
                <div key={idx} className="flex items-center mb-2 space-x-2">
                  <input
                    {...register(`experience.${idx}`)}
                    type="text"
                    value={lang}
                    onChange={(e) =>
                      handleExperienceChange(idx, e.target.value)
                    }
                    className="bg-transparent border border-myMidblue rounded-lg px-3 py-2 flex-grow focus:outline-none"
                  />
                  {idx === experience.length - 1 && (
                    <button
                      type="button"
                      onClick={addExperience}
                      className="text-primaryColor rounded px-3 py-3 font-bold  cursor-pointer bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* projects */}
            <div className="text-myMidblue">
              <Label className="mb-2">Projects</Label>
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="mb-4 border border-myMidblue p-4 rounded-lg space-y-2"
                >
                  <input
                    {...register(`projects.${idx}.name`)}
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      handleProjectChange(idx, "name", e.target.value)
                    }
                    placeholder="Project Name"
                    className="w-full bg-transparent border border-myMidblue rounded-lg px-3 py-2 focus:outline-none"
                  />

                  <textarea
                    {...register(`projects.${idx}.description`)}
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(idx, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="w-full bg-transparent border border-myMidblue rounded-lg px-3 py-2 focus:outline-none"
                  />

                  <input
                    {...register(`projects.${idx}.github`)}
                    type="url"
                    value={project.github}
                    onChange={(e) =>
                      handleProjectChange(idx, "github", e.target.value)
                    }
                    placeholder="GitHub URL"
                    className="w-full bg-transparent border border-myMidblue rounded-lg px-3 py-2 focus:outline-none"
                  />

                  <input
                    {...register(`projects.${idx}.live`)}
                    type="url"
                    value={project.live}
                    onChange={(e) =>
                      handleProjectChange(idx, "live", e.target.value)
                    }
                    placeholder="Live URL"
                    className="w-full bg-transparent border border-myMidblue rounded-lg px-3 py-2 focus:outline-none text-myMidblue"
                  />

                  {idx === projects.length - 1 && (
                    <button
                      type="button"
                      onClick={addProject}
                      className="mt-2 text-primaryColor rounded px-3 py-2 font-medium  cursor-pointer bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
                    >
                      <FaPlus className="inline mr-2" /> Add Project
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="text-myMidblue">
              <Label>Linkdin Url</Label>
              <Input
                {...register("linkdinUrl")}
                type="url"
                className="bg-transparent focus:outline-none focus:bg-transparent"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                onClick={() => setActiveTab("Skills & Education")}
                className="text-primaryColor  w-[30%] bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
              >
                Previous
              </Button>

              <Button
                type="submit"
                className="text-primaryColor  w-[30%] bg-myMidblue hover:bg-myMidblue/80 transition duration-300 ease-in-out"
              >
                Submit
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
