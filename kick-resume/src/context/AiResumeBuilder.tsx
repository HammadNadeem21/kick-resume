"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AiResumeBuilderContextType = {
  parsedData: any;
  setParsedData: (data: any) => void;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  processedUrl: string | null;
  setProcessedUrl: (url: string | null) => void;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  selectedTemplate: number | null;
  setSelectedTemplate: (templateId: number | null) => void;
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
  selectedProcessedImage: string | null;
  setSelectedProcessedImage: (url: string | null) => void;
  selectedImageBgColor: string | undefined;
  setSelectedImageBgColor: (color: string | undefined) => void;
  color1: { r: number; g: number; b: number };
  setColor1: (color: { r: number; g: number; b: number }) => void;
  color4: { r: number; g: number; b: number };
  setColor4: (color: { r: number; g: number; b: number }) => void;
  color7: { r: number; g: number; b: number };
  setColor7: (color: { r: number; g: number; b: number }) => void;
  color10: { r: number; g: number; b: number };
  setColor10: (color: { r: number; g: number; b: number }) => void;
};

const AiResumeBuilderContext = createContext<
  AiResumeBuilderContextType | undefined
>(undefined);

export const AiResumeBuilderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //   const [parsedData, setParsedData] = useState<any>(null);
  const [parsedData, setParsedData] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("parsedData");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  //   const [imageFile, setImageFile] = useState<File | null>(() => {
  //     return localStorage.getItem("imageFile");
  //   });
  //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedUrl = localStorage.getItem("previewUrl");
      return storedUrl && storedUrl !== "null" ? storedUrl : null;
    }
    return null;
  });
  //   const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedUrl = localStorage.getItem("processedUrl");
      return storedUrl && storedUrl !== "null" ? storedUrl : null;
    }
    return null;
  });

  const [userPrompt, setUserPrompt] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userPrompt") || "";
    }
    return "";
  });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const storedTemplate = localStorage.getItem("selectedTemplate");
      return storedTemplate ? parseInt(storedTemplate) : null;
    }
    return null;
  });
  const [promptHistory, setPromptHistory] = useState<
    { type: "user" | "ai"; message: string }[]
  >(() => {
    if (typeof window !== "undefined") {
      const storedHistory = localStorage.getItem("promptHistory");
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
    return [];
  });
  const [showTemplate, setShowTemplate] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedShowTemplate = localStorage.getItem("showTemplate");
      return storedShowTemplate ? JSON.parse(storedShowTemplate) : false;
    }
    return false;
  });
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState<boolean>(false);
  const [hasRenderedTemplate, setHasRenderedTemplate] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedRendered = localStorage.getItem("hasRenderedTemplate");
      return storedRendered ? JSON.parse(storedRendered) : false;
    }
    return false;
  });

  const [selectedProcessedImage, setSelectedProcessedImage] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedProcessedImage") || null;
    }
    return null;
  });
  const [selectedImageBgColor, setSelectedImageBgColor] = useState<string | undefined>(() => {
    if (typeof window !== "undefined") {
      const storedColor = localStorage.getItem("selectedImageBgColor");
      return storedColor && storedColor !== "undefined" ? storedColor : undefined;
    }
    return undefined;
  });

  const [color1, setColor1] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = localStorage.getItem("color1");
      return storedColor ? JSON.parse(storedColor) : { r: 40, g: 56, b: 74 };
    }
    return { r: 40, g: 56, b: 74 };
  });
  const [color4, setColor4] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = localStorage.getItem("color4");
      return storedColor ? JSON.parse(storedColor) : { r: 200, g: 150, b: 35 };
    }
    return { r: 200, g: 150, b: 35 };
  });
  const [color7, setColor7] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = localStorage.getItem("color7");
      return storedColor ? JSON.parse(storedColor) : { r: 131, g: 123, b: 106 };
    }
    return { r: 131, g: 123, b: 106 };
  });
  const [color10, setColor10] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = localStorage.getItem("color10");
      return storedColor ? JSON.parse(storedColor) : { r: 131, g: 123, b: 106 };
    }
    return { r: 131, g: 123, b: 106 };
  });

  useEffect(() => {
    localStorage.setItem("parsedData", JSON.stringify(parsedData));
  }, [parsedData]);

  //   useEffect(() => {
  //     if (imageFile) {
  //       localStorage.setItem("imageFile", imageFile);
  //     } else {
  //       localStorage.removeItem("imageFile");
  //     }
  //   }, [imageFile]);

  useEffect(() => {
    if (previewUrl) {
      localStorage.setItem("previewUrl", previewUrl);
    } else {
      localStorage.removeItem("previewUrl");
    }
  }, [previewUrl]);

  useEffect(() => {
    if (processedUrl) {
      localStorage.setItem("processedUrl", processedUrl);
    } else {
      localStorage.removeItem("processedUrl");
    }
  }, [processedUrl]);

  useEffect(() => {
    localStorage.setItem("userPrompt", userPrompt);
  }, [userPrompt]);

  useEffect(() => {
    if (selectedTemplate !== null) {
      localStorage.setItem("selectedTemplate", selectedTemplate.toString());
    } else {
      localStorage.removeItem("selectedTemplate");
    }
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem("promptHistory", JSON.stringify(promptHistory));
  }, [promptHistory]);

  useEffect(() => {
    localStorage.setItem("showTemplate", JSON.stringify(showTemplate));
  }, [showTemplate]);

  useEffect(() => {
    localStorage.setItem("hasRenderedTemplate", JSON.stringify(hasRenderedTemplate));
  }, [hasRenderedTemplate]);

  useEffect(() => {
    if (selectedProcessedImage) {
      localStorage.setItem("selectedProcessedImage", selectedProcessedImage);
    } else {
      localStorage.removeItem("selectedProcessedImage");
    }
  }, [selectedProcessedImage]);

  useEffect(() => {
    if (selectedImageBgColor) {
      localStorage.setItem("selectedImageBgColor", selectedImageBgColor);
    } else {
      localStorage.removeItem("selectedImageBgColor");
    }
  }, [selectedImageBgColor]);

  useEffect(() => {
    localStorage.setItem("color1", JSON.stringify(color1));
  }, [color1]);

  useEffect(() => {
    localStorage.setItem("color4", JSON.stringify(color4));
  }, [color4]);

  useEffect(() => {
    localStorage.setItem("color7", JSON.stringify(color7));
  }, [color7]);

  useEffect(() => {
    localStorage.setItem("color10", JSON.stringify(color10));
  }, [color10]);

  return (
    <AiResumeBuilderContext.Provider
      value={{
        parsedData,
        setParsedData,
        imageFile,
        setImageFile,
        previewUrl,
        setPreviewUrl,
        processedUrl,
        setProcessedUrl,
        userPrompt,
        setUserPrompt,
        selectedTemplate,
        setSelectedTemplate,
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
        selectedProcessedImage,
        setSelectedProcessedImage,
        selectedImageBgColor,
        setSelectedImageBgColor,
        color1,
        setColor1,
        color4,
        setColor4,
        color7,
        setColor7,
        color10,
        setColor10,
      }}
    >
      {children}
    </AiResumeBuilderContext.Provider>
  );
};

export const useAiResumeBuilder = () => {
  const context = useContext(AiResumeBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useAiResumeBuilder must be used within an AiResumeBuilderProvider"
    );
  }
  return context;
};
