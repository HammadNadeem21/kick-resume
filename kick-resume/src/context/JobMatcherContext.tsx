"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type JobMatcherContextType = {
  userName: string;
  setUserName: (name: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  selectedTemplate: number | null;
  setSelectedTemplate: (templateId: number | null) => void;
  resumeData: any;
  setResumeData: (data: any) => void;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  processedUrl: string | null;
  setProcessedUrl: (url: string | null) => void;
  selectedProcessedImage: string | null;
  setSelectedProcessedImage: (url: string | null) => void;
  selectedImageBgColor: string | undefined;
  setSelectedImageBgColor: (color: string | undefined) => void;
  // showColorPicker: boolean;
  // setShowColorPicker: (show: boolean) => void;
  color1: { r: number; g: number; b: number };
  setColor1: (color: { r: number; g: number; b: number }) => void;
  color4: { r: number; g: number; b: number };
  setColor4: (color: { r: number; g: number; b: number }) => void;
  color7: { r: number; g: number; b: number };
  setColor7: (color: { r: number; g: number; b: number }) => void;
  color10: { r: number; g: number; b: number };
  setColor10: (color: { r: number; g: number; b: number }) => void;
  promptHistory: { type: "user" | "ai"; message: string }[];
  setPromptHistory: React.Dispatch<
    React.SetStateAction<{ type: "user" | "ai"; message: string }[]>
  >;
  showTemplate: boolean;
  setShowTemplate: (show: boolean) => void;
  isChatLoading: boolean;
  setIsChatLoading: (loading: boolean) => void;
  isTemplateLoading: boolean;
  setIsTemplateLoading: (loading: boolean) => void;
  hasRenderedTemplate: boolean;
  setHasRenderedTemplate: (rendered: boolean) => void;
};

const JobMatcherContext = createContext<JobMatcherContextType | undefined>(
  undefined
);

export const JobMatcherProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("jobMatcherUserName") || "";
    }
    return "";
  });
  const [jobDescription, setJobDescription] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("jobMatcherJobDescription") || "";
    }
    return "";
  });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(
    () => {
      if (typeof window !== "undefined") {
        const storedTemplate = sessionStorage.getItem(
          "jobMatcherSelectedTemplate"
        );
        return storedTemplate ? parseInt(storedTemplate) : null;
      }
      return null;
    }
  );
  const [resumeData, setResumeData] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("jobMatcherResumeData");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // File objects cannot be stored in sessionStorage
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedUrl = sessionStorage.getItem("jobMatcherPreviewUrl");
      return storedUrl && storedUrl !== "null" ? storedUrl : null;
    }
    return null;
  });
  const [processedUrl, setProcessedUrl] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedUrl = sessionStorage.getItem("jobMatcherProcessedUrl");
      return storedUrl && storedUrl !== "null" ? storedUrl : null;
    }
    return null;
  });
  const [selectedProcessedImage, setSelectedProcessedImage] = useState<
    string | null
  >(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("jobMatcherSelectedProcessedImage") || null;
    }
    return null;
  });
  const [selectedImageBgColor, setSelectedImageBgColor] = useState<
    string | undefined
  >(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem(
        "jobMatcherSelectedImageBgColor"
      );
      return storedColor && storedColor !== "undefined"
        ? storedColor
        : undefined;
    }
    return undefined;
  });
  // const [showColorPicker, setShowColorPicker] = useState<boolean>(false); // Not persisting, usually transient
  const [color1, setColor1] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("jobMatcherColor1");
      return storedColor ? JSON.parse(storedColor) : { r: 40, g: 56, b: 74 };
    }
    return { r: 40, g: 56, b: 74 };
  });
  const [color4, setColor4] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("jobMatcherColor4");
      return storedColor ? JSON.parse(storedColor) : { r: 200, g: 150, b: 35 };
    }
    return { r: 200, g: 150, b: 35 };
  });
  const [color7, setColor7] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("jobMatcherColor7");
      return storedColor ? JSON.parse(storedColor) : { r: 131, g: 123, b: 106 };
    }
    return { r: 131, g: 123, b: 106 };
  });
  const [color10, setColor10] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("jobMatcherColor10");
      return storedColor ? JSON.parse(storedColor) : { r: 131, g: 123, b: 106 };
    }
    return { r: 131, g: 123, b: 106 };
  });
  const [promptHistory, setPromptHistory] = useState<
    { type: "user" | "ai"; message: string }[]
  >(() => {
    if (typeof window !== "undefined") {
      const storedHistory = sessionStorage.getItem("jobMatcherPromptHistory");
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
    return [];
  });
  const [showTemplate, setShowTemplate] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedShowTemplate = sessionStorage.getItem(
        "jobMatcherShowTemplate"
      );
      return storedShowTemplate ? JSON.parse(storedShowTemplate) : false;
    }
    return false;
  });
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState<boolean>(false);
  const [hasRenderedTemplate, setHasRenderedTemplate] = useState<boolean>(
    () => {
      if (typeof window !== "undefined") {
        const storedRendered = sessionStorage.getItem(
          "jobMatcherHasRenderedTemplate"
        );
        return storedRendered ? JSON.parse(storedRendered) : false;
      }
      return false;
    }
  );

  useEffect(() => {
    sessionStorage.setItem("jobMatcherUserName", userName);
  }, [userName]);

  useEffect(() => {
    sessionStorage.setItem("jobMatcherJobDescription", jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    if (selectedTemplate !== null) {
      sessionStorage.setItem(
        "jobMatcherSelectedTemplate",
        selectedTemplate.toString()
      );
    } else {
      sessionStorage.removeItem("jobMatcherSelectedTemplate");
    }
  }, [selectedTemplate]);

  useEffect(() => {
    sessionStorage.setItem("jobMatcherResumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    if (previewUrl) {
      sessionStorage.setItem("jobMatcherPreviewUrl", previewUrl);
    } else {
      sessionStorage.removeItem("jobMatcherPreviewUrl");
    }
  }, [previewUrl]);

  useEffect(() => {
    if (processedUrl) {
      sessionStorage.setItem("jobMatcherProcessedUrl", processedUrl);
    } else {
      sessionStorage.removeItem("jobMatcherProcessedUrl");
    }
  }, [processedUrl]);

  useEffect(() => {
    if (selectedProcessedImage) {
      sessionStorage.setItem(
        "jobMatcherSelectedProcessedImage",
        selectedProcessedImage
      );
    } else {
      sessionStorage.removeItem("jobMatcherSelectedProcessedImage");
    }
  }, [selectedProcessedImage]);

  useEffect(() => {
    if (selectedImageBgColor) {
      sessionStorage.setItem(
        "jobMatcherSelectedImageBgColor",
        selectedImageBgColor
      );
    } else {
      sessionStorage.removeItem("jobMatcherSelectedImageBgColor");
    }
  }, [selectedImageBgColor]);

  // For color states
  useEffect(() => {
    sessionStorage.setItem("jobMatcherColor1", JSON.stringify(color1));
  }, [color1]);

  useEffect(() => {
    sessionStorage.setItem("jobMatcherColor4", JSON.stringify(color4));
  }, [color4]);

  useEffect(() => {
    sessionStorage.setItem("jobMatcherColor7", JSON.stringify(color7));
  }, [color7]);

  useEffect(() => {
    sessionStorage.setItem("jobMatcherColor10", JSON.stringify(color10));
  }, [color10]);

  useEffect(() => {
    sessionStorage.setItem(
      "jobMatcherPromptHistory",
      JSON.stringify(promptHistory)
    );
  }, [promptHistory]);

  useEffect(() => {
    sessionStorage.setItem(
      "jobMatcherShowTemplate",
      JSON.stringify(showTemplate)
    );
  }, [showTemplate]);

  useEffect(() => {
    sessionStorage.setItem(
      "jobMatcherHasRenderedTemplate",
      JSON.stringify(hasRenderedTemplate)
    );
  }, [hasRenderedTemplate]);

  return (
    <JobMatcherContext.Provider
      value={{
        userName,
        setUserName,
        jobDescription,
        setJobDescription,
        selectedTemplate,
        setSelectedTemplate,
        resumeData,
        setResumeData,
        imageFile,
        setImageFile,
        previewUrl,
        setPreviewUrl,
        processedUrl,
        setProcessedUrl,
        selectedProcessedImage,
        setSelectedProcessedImage,
        selectedImageBgColor,
        setSelectedImageBgColor,
        // showColorPicker,
        // setShowColorPicker,
        color1,
        setColor1,
        color4,
        setColor4,
        color7,
        setColor7,
        color10,
        setColor10,
        promptHistory,
        setPromptHistory,
        showTemplate,
        setShowTemplate,
        isChatLoading,
        setIsChatLoading,
        isTemplateLoading,
        setIsTemplateLoading,
        hasRenderedTemplate,
        setHasRenderedTemplate,
      }}
    >
      {children}
    </JobMatcherContext.Provider>
  );
};

export const useJobMatcher = () => {
  const context = useContext(JobMatcherContext);
  if (context === undefined) {
    throw new Error("useJobMatcher must be used within a JobMatcherProvider");
  }
  return context;
};
