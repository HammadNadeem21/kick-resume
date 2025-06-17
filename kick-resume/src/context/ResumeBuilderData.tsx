import {createContext, useContext, useState, ReactNode  } from "react";


interface Project {
    name: string;
    description: string;
    github: string;
    live: string;
  }
  
  interface Education {
    degree: string;
    startYear: string;
    endYear: string;
  }
  
  interface Experience {
    title: string;
    startDate: string;
    endDate: string;
  }
  
  interface resumeForm {
    fullName: string;
    email: string;
    phone: number;
    address: string;
    languages: string[];
    summary:string;
    position:string;
    education: Education[];
    skills: string[];
    certifications: string[];
    experience: Experience[];
    projects: Project[];
    linkdinUrl: string;
  }

interface ResumeContextType {
    resumeData: resumeForm | null;
    setResumeData: (date: resumeForm | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeDataProvider = ({ children }: { children: ReactNode }) => {

    const [resumeData, setResumeData] = useState<resumeForm | null>(null);

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData }}>
            {children}  
        </ResumeContext.Provider>
    )
};

export const useResumeDataContext = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error("useResumeContext must be used within a ResumeProvider");
    }
    return context;
}