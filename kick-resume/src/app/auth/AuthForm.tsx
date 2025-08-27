"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";

import React from "react";
import { useAiResumeBuilder } from "@/context/AiResumeBuilder";

const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
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
  } = useAiResumeBuilder();

  // credentials handler
  const handleCredentialsSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true, // agar redirect chahiye
        callbackUrl: "/", // kis page pr redirect karna hai
      });
      setParsedData(null);
      sessionStorage.removeItem("parsedData");
      setPromptHistory([]);
      sessionStorage.removeItem("promptHistory");
    } catch (error) {
      console.error("Error signing in with credentials:", error);
    }
  };

  // google handler
  const handleGoogleSignUp = async () => {
    try {
      await signIn("google", {
        redirect: true,
        callbackUrl: "/",
      });
      setParsedData(null);
      sessionStorage.removeItem("parsedData");
      setPromptHistory([]);
      sessionStorage.removeItem("promptHistory");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-200 py-3 px-3 rounded-xl w-[400px] min-w-[260px] flex flex-col gap-4 shadow-lg shadow-gray-400">
        <div className="">
          <h1 className="text-xl uppercase text-center  font-black tracking-tight">
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {mode === "login" ? "Wellcome Back" : "Create Account"}
            </span>
          </h1>

          <h1 className="text-lg text-gray-500 text-center font-semibold">
            {mode === "login" ? "Log in with email" : "Sign Up with email"}
          </h1>
        </div>

        <form onSubmit={handleCredentialsSignUp} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-gray-500">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-300 text-gray-600 border-0 focus:ring-0 focus:bg-gray-300"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-gray-500">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-300 text-gray-600 border-0 focus:ring-0 focus:bg-gray-300"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-300 hover:bg-mySkyBlue/30 mt-1"
          >
            Sign Up with Email
          </Button>
        </form>

        <div className="flex items-center gap-2 justify-center">
          <div className="h-[1px] w-[40%] bg-mySkyBlue"></div>
          <div className="text-center text-lg text-gray-700 mb-1">or</div>

          <div className="h-[1px] w-[40%] bg-mySkyBlue"></div>
        </div>

        {/* Google SignUp */}
        <Button
          onClick={handleGoogleSignUp}
          className="w-full bg-gray-300 hover:bg-mySkyBlue/30 flex items-center justify-center gap-3"
        >
          <div className="h-8 w-8">
            <Image
              src="/GoogleLogo.png"
              alt="Google-logo"
              height={100}
              width={100}
              className="w-full h-full"
            />
          </div>
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
