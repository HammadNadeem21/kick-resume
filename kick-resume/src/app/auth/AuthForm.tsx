"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { useAiResumeBuilder } from "@/context/AiResumeBuilder";
import { useJobMatcher } from "@/context/JobMatcherContext";

import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setParsedData, setPromptHistory } = useAiResumeBuilder();
  const { setResumeData, setUserName, setJobDescription } = useJobMatcher();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!name) {
          setError("Name is required for sign-up.");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to create account.");
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setParsedData(null);
      sessionStorage.removeItem("parsedData");
      setPromptHistory([]);
      sessionStorage.removeItem("promptHistory");
      setResumeData(null);
      sessionStorage.removeItem("resumeData");
      setUserName("");
      sessionStorage.removeItem("userName");
      setJobDescription("");
      sessionStorage.removeItem("jobDescription");

      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
      setResumeData(null);
      sessionStorage.removeItem("resumeData");
      setUserName("");
      sessionStorage.removeItem("userName");
      setJobDescription("");
      sessionStorage.removeItem("jobDescription");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-mySkyBlue via-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 -z-10" />
      
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 py-8 px-6 sm:px-10 rounded-[2.5rem] sm:w-[450px] w-full flex flex-col gap-6 shadow-2xl shadow-blue-500/10 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[5rem] -mr-8 -mt-8 -z-10" />
        
        <div className="text-center space-y-2">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-mySkyBlue/10 text-mySkyBlue text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2"
          >
            <Sparkles size={10} />
            {mode === "login" ? "Welcome back" : "Start your journey"}
          </motion.div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 leading-tight">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            {mode === "login" 
              ? "Access your dashboard and resumes" 
              : "Join thousands of successful job seekers"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="grid gap-5">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="space-y-4">
            {mode === "signup" && (
              <div className="grid gap-2 relative">
                <Label htmlFor="name" className="text-gray-900 font-bold text-xs ml-1 flex items-center gap-2">
                  <User size={12} className="text-mySkyBlue" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/50 border-gray-200 focus:border-mySkyBlue focus:ring-4 focus:ring-mySkyBlue/5 rounded-xl h-12 transition-all font-medium placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-900 font-bold text-xs ml-1 flex items-center gap-2">
                <Mail size={12} className="text-mySkyBlue" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/50 border-gray-200 focus:border-mySkyBlue focus:ring-4 focus:ring-mySkyBlue/5 rounded-xl h-12 transition-all font-medium placeholder:text-gray-400"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-900 font-bold text-xs ml-1 flex items-center gap-2">
                <Lock size={12} className="text-mySkyBlue" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50 border-gray-200 focus:border-mySkyBlue focus:ring-4 focus:ring-mySkyBlue/5 rounded-xl h-12 transition-all font-medium placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-mySkyBlue hover:bg-sky-600 text-white font-black h-12 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <span>{mode === "login" ? "Sign In" : "Get Started"}</span>
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-gray-400">
            <span className="bg-white px-4">OR</span>
          </div>
        </div>

        <Button
          onClick={handleGoogleSignUp}
          variant="outline"
          className="w-full bg-white hover:bg-gray-50 border-gray-200 text-gray-700 font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <Image
            src="/GoogleLogo.png"
            alt="Google Logo"
            height={20}
            width={20}
            className="w-5 h-5"
          />
          Continue with Google
        </Button>

        <p className="text-center text-sm font-medium text-gray-500">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link 
            href={mode === "login" ? "/auth/signup" : "/auth/login"}
            className="text-mySkyBlue font-black hover:underline underline-offset-4"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthForm;
