"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { useAiResumeBuilder } from "@/context/AiResumeBuilder";
import { useCredits } from "@/context/CreditsContext";
import { useSession } from "next-auth/react";
import { calculateCreditFromTokens } from "../../utils/commonHelpers";
import { Button } from "@/components/ui/button";

const ResumeChatBox = () => {
  const {
    promptHistory,
    setPromptHistory,
    userPrompt,
    setUserPrompt,
    isChatLoading,
    setIsChatLoading,
    setIsTemplateLoading,
    setParsedData,
    setShowTemplate,
    setHasRenderedTemplate,
    selectedTemplate,
    parsedData,
    hasRenderedTemplate,
  } = useAiResumeBuilder();

  const { credit, setCredit } = useCredits();
  const { data: session } = useSession();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [promptHistory, isChatLoading]);

  const handleSendPrompt = async () => {
    if (!userPrompt || !selectedTemplate) {
      alert("Please enter a prompt and select a template!");
      return;
    }
    setIsChatLoading(true);
    setIsTemplateLoading(true);

    setPromptHistory((prev) => [
      ...prev,
      { type: "user", message: userPrompt },
    ]);
    
    // Clear input immediately for better UX
    const currentPrompt = userPrompt;
    setUserPrompt("");

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: currentPrompt,
          existingResume: parsedData || {},
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Something went wrong");
        setIsChatLoading(false);
        setIsTemplateLoading(false);
        return;
      }

      const data = await res.json();

      // Ensure certifications is always an array of strings
      if (data.certifications && Array.isArray(data.certifications)) {
        data.certifications = data.certifications.map((item: any) =>
          typeof item === "string"
            ? item
            : [item.name, item.authority, item.date].filter(Boolean).join(" - ")
        );
      }

      const { totalTokenCount } = data?.tokensUsed;

      const creditRes = await fetch("/api/credits/deduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          amount: calculateCreditFromTokens(totalTokenCount),
        }),
      });

      if (!creditRes.ok) {
        const creditErr = await creditRes.json();
        alert("Resume sent, but failed to deduct credits: " + creditErr.error);
      } else {
        const creditData = await creditRes.json();
        setCredit(creditData.credits);
      }

      setShowTemplate(true);
      
      setPromptHistory((prev) => [
        ...prev,
        { type: "ai", message: "Resume updated successfully!" },
      ]);
      setParsedData(data);
      if (!hasRenderedTemplate) setHasRenderedTemplate(true);
      
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("An error occurred while generating the resume.");
    } finally {
      setIsChatLoading(false);
      setIsTemplateLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm py-4 sm:px-4 px-3 mb-2 rounded-2xl flex flex-col gap-4 h-[600px] lg:h-[calc(100vh-200px)] min-h-[500px]">
      <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 text-mySkyBlue bg-blue-50 rounded-lg">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">
              AI Assistant
            </h1>
            <p className="text-gray-500 text-xs">
              Powered by advanced AI
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4"
      >
        {promptHistory.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-4 opacity-60">
            <Bot size={48} className="mb-2" />
            <p className="text-sm">Start a conversation to build your resume.</p>
          
          </div>
        )}

        {promptHistory.map((entry, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 max-w-[90%] ${
              entry.type === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                entry.type === "user"
                  ? "bg-mySkyBlue text-white"
                  : "bg-white border border-gray-200 text-mySkyBlue"
              }`}
            >
              {entry.type === "user" ? <User size={14} /> : <Bot size={16} />}
            </div>
            
            <div
              className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                entry.type === "user"
                  ? "bg-mySkyBlue text-white rounded-tr-none"
                  : "bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none"
              }`}
            >
              {entry.message}
            </div>
          </div>
        ))}

        {isChatLoading && (
          <div className="flex items-start gap-3 max-w-[80%] mr-auto">
             <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white border border-gray-200 text-mySkyBlue shadow-sm">
               <Bot size={16} />
             </div>
             <div className="px-5 py-4 rounded-2xl rounded-tl-none bg-gray-50 border border-gray-100 shadow-sm flex items-center">
               <div className="flex gap-1.5">
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex gap-2 items-end pt-2 border-t border-gray-100">
        <div className="relative flex-1">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              credit < 3
                ? "You have no credits left. Please upgrade."
                : "Describe your experience, skills, or ask for changes..."
            }
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-mySkyBlue/20 focus:border-mySkyBlue transition-all resize-none custom-scrollbar"
            rows={2}
            disabled={credit < 3}
          />
        </div>
        
        <Button
          onClick={handleSendPrompt}
          disabled={!userPrompt.trim() || credit < 3 || isChatLoading}
          className={`h-[46px] w-[46px] rounded-xl p-0 shrink-0 shadow-sm transition-all duration-200 ${
            !userPrompt.trim() || credit < 3
              ? "bg-gray-200 text-gray-400" 
              : "bg-mySkyBlue hover:bg-sky-600 text-white shadow-mySkyBlue/30 hover:shadow-lg hover:-translate-y-0.5"
          }`}
        >
          <Send size={18} className={userPrompt.trim() ? "ml-0.5" : ""} />
        </Button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default ResumeChatBox;
