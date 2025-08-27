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
      const storedData = sessionStorage.getItem("parsedData");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  //   const [imageFile, setImageFile] = useState<File | null>(() => {
  //     return sessionStorage.getItem("imageFile");
  //   });
  //   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedUrl = sessionStorage.getItem("previewUrl");
      return storedUrl && storedUrl !== "null" ? storedUrl : null;
    }
    return null;
  });
  //   const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedUrl = sessionStorage.getItem("processedUrl");
      return storedUrl && storedUrl !== "null" ? storedUrl : null;
    }
    return null;
  });

  const [userPrompt, setUserPrompt] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("userPrompt") || "";
    }
    return "";
  });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(
    () => {
      if (typeof window !== "undefined") {
        const storedTemplate = sessionStorage.getItem("selectedTemplate");
        return storedTemplate ? parseInt(storedTemplate) : null;
      }
      return null;
    }
  );
  const [promptHistory, setPromptHistory] = useState<
    { type: "user" | "ai"; message: string }[]
  >(() => {
    if (typeof window !== "undefined") {
      const storedHistory = sessionStorage.getItem("promptHistory");
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
    return [];
  });
  const [showTemplate, setShowTemplate] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedShowTemplate = sessionStorage.getItem("showTemplate");
      return storedShowTemplate ? JSON.parse(storedShowTemplate) : false;
    }
    return false;
  });
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState<boolean>(false);
  const [hasRenderedTemplate, setHasRenderedTemplate] = useState<boolean>(
    () => {
      if (typeof window !== "undefined") {
        const storedRendered = sessionStorage.getItem("hasRenderedTemplate");
        return storedRendered ? JSON.parse(storedRendered) : false;
      }
      return false;
    }
  );

  const [selectedProcessedImage, setSelectedProcessedImage] = useState<
    string | null
  >(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("selectedProcessedImage") || null;
    }
    return null;
  });
  const [selectedImageBgColor, setSelectedImageBgColor] = useState<
    string | undefined
  >(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("selectedImageBgColor");
      return storedColor && storedColor !== "undefined"
        ? storedColor
        : undefined;
    }
    return undefined;
  });

  const [color1, setColor1] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("color1");
      return storedColor ? JSON.parse(storedColor) : { r: 40, g: 56, b: 74 };
    }
    return { r: 40, g: 56, b: 74 };
  });
  const [color4, setColor4] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("color4");
      return storedColor ? JSON.parse(storedColor) : { r: 200, g: 150, b: 35 };
    }
    return { r: 200, g: 150, b: 35 };
  });
  const [color7, setColor7] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("color7");
      return storedColor ? JSON.parse(storedColor) : { r: 131, g: 123, b: 106 };
    }
    return { r: 131, g: 123, b: 106 };
  });
  const [color10, setColor10] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColor = sessionStorage.getItem("color10");
      return storedColor ? JSON.parse(storedColor) : { r: 131, g: 123, b: 106 };
    }
    return { r: 131, g: 123, b: 106 };
  });

  useEffect(() => {
    sessionStorage.setItem("parsedData", JSON.stringify(parsedData));
  }, [parsedData]);

  //   useEffect(() => {
  //     if (imageFile) {
  //       sessionStorage.setItem("imageFile", imageFile);
  //     } else {
  //       sessionStorage.removeItem("imageFile");
  //     }
  //   }, [imageFile]);

  useEffect(() => {
    if (previewUrl) {
      sessionStorage.setItem("previewUrl", previewUrl);
    } else {
      sessionStorage.removeItem("previewUrl");
    }
  }, [previewUrl]);

  useEffect(() => {
    if (processedUrl) {
      sessionStorage.setItem("processedUrl", processedUrl);
    } else {
      sessionStorage.removeItem("processedUrl");
    }
  }, [processedUrl]);

  useEffect(() => {
    sessionStorage.setItem("userPrompt", userPrompt);
  }, [userPrompt]);

  useEffect(() => {
    if (selectedTemplate !== null) {
      sessionStorage.setItem("selectedTemplate", selectedTemplate.toString());
    } else {
      sessionStorage.removeItem("selectedTemplate");
    }
  }, [selectedTemplate]);

  useEffect(() => {
    sessionStorage.setItem("promptHistory", JSON.stringify(promptHistory));
  }, [promptHistory]);

  useEffect(() => {
    sessionStorage.setItem("showTemplate", JSON.stringify(showTemplate));
  }, [showTemplate]);

  useEffect(() => {
    sessionStorage.setItem(
      "hasRenderedTemplate",
      JSON.stringify(hasRenderedTemplate)
    );
  }, [hasRenderedTemplate]);

  useEffect(() => {
    if (selectedProcessedImage) {
      sessionStorage.setItem("selectedProcessedImage", selectedProcessedImage);
    } else {
      sessionStorage.removeItem("selectedProcessedImage");
    }
  }, [selectedProcessedImage]);

  useEffect(() => {
    if (selectedImageBgColor) {
      sessionStorage.setItem("selectedImageBgColor", selectedImageBgColor);
    } else {
      sessionStorage.removeItem("selectedImageBgColor");
    }
  }, [selectedImageBgColor]);

  useEffect(() => {
    sessionStorage.setItem("color1", JSON.stringify(color1));
  }, [color1]);

  useEffect(() => {
    sessionStorage.setItem("color4", JSON.stringify(color4));
  }, [color4]);

  useEffect(() => {
    sessionStorage.setItem("color7", JSON.stringify(color7));
  }, [color7]);

  useEffect(() => {
    sessionStorage.setItem("color10", JSON.stringify(color10));
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
