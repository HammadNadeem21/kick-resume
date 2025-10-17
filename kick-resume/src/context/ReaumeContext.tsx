import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ResumeContextType {
  suggestions: string | null;
  score: number | null;
  overall: string | null;
  keywords: string[];
  formatting: string[];
  education: string[];
  experience: string[];
  keywordsScore: number | null;
  formattingScore: number | null;
  educationScore: number | null;
  experienceScore: number | null;
  actualSummary: string | null;
  summaryMistakes: string | null;
  improvedSummary: string | null;
  coverLetter: string | null;
  setSuggestions: (val: string | null) => void;
  setScore: (val: number | null) => void;
  setOverall: (val: string | null) => void;
  setKeywords: (val: string[]) => void;
  setFormatting: (val: string[]) => void;
  setEducation: (val: string[]) => void;
  setExperience: (val: string[]) => void;
  setKeywordsScore: (val: number | null) => void;
  setFormattingScore: (val: number | null) => void;
  setEducationScore: (val: number | null) => void;
  setExperienceScore: (val: number | null) => void;
  setActualSummary: (val: string | null) => void;
  setSummaryMistakes: (val: string | null) => void;
  setImprovedSummary: (val: string | null) => void;
  setCoverLetter: (val: string | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [overall, setOverall] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [formatting, setFormatting] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [keywordsScore, setKeywordsScore] = useState<number | null>(null);
  const [formattingScore, setFormattingScore] = useState<number | null>(null);
  const [educationScore, setEducationScore] = useState<number | null>(null);
  const [experienceScore, setExperienceScore] = useState<number | null>(null);
  const [actualSummary, setActualSummary] = useState<string | null>(null);
  const [summaryMistakes, setSummaryMistakes] = useState<string | null>(null);
  const [improvedSummary, setImprovedSummary] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    console.log("Context Updated:", {
      actualSummary,
      improvedSummary,
      coverLetter,
    });
  }, [actualSummary, improvedSummary, coverLetter]);

  return (
    <ResumeContext.Provider
      value={{
        suggestions,
        score,
        overall,
        keywords,
        formatting,
        education,
        experience,
        keywordsScore,
        formattingScore,
        educationScore,
        experienceScore,
        actualSummary,
        summaryMistakes,
        improvedSummary,
        coverLetter,
        setSuggestions,
        setScore,
        setOverall,
        setKeywords,
        setFormatting,
        setEducation,
        setExperience,
        setKeywordsScore,
        setFormattingScore,
        setEducationScore,
        setExperienceScore,
        setActualSummary,
        setSummaryMistakes,
        setImprovedSummary,
        setCoverLetter,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context)
    throw new Error("useResumeContext must be used inside ResumeProvider");
  return context;
};
