"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";

import { User, Mail, Lock, ArrowRight, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AuthDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // credentials handler
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      
      if (!res.ok && data.error !== "User already exists.") {
        throw new Error(data.error || "Authentication failed.");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signIn("google", {
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden">Trigger</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-mySkyBlue via-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 -z-10" />
              
              <div className="bg-white/95 backdrop-blur-2xl py-10 px-8 sm:px-12 rounded-[2.5rem] flex flex-col gap-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[5rem] -mr-8 -mt-8 -z-10" />
                
                <DialogClose className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-900 transition-colors">
                  <X size={20} />
                </DialogClose>

                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 bg-mySkyBlue/10 text-mySkyBlue text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                    <Sparkles size={10} />
                    Secure Access
                  </div>
                  <DialogTitle className="text-3xl font-black tracking-tight text-gray-900">
                    Get Started
                  </DialogTitle>
                  <DialogDescription className="text-gray-500 text-sm font-medium">
                    Create an account or sign in to continue
                  </DialogDescription>
                </div>

                <form onSubmit={handleAuth} className="grid gap-5">
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-gray-900 font-bold text-xs ml-1 flex items-center gap-2">
                        <User size={12} className="text-mySkyBlue" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Hammad Nadeem"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-gray-50 border-gray-200 focus:border-mySkyBlue focus:ring-4 focus:ring-mySkyBlue/5 rounded-xl h-12 transition-all font-medium placeholder:text-gray-400"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-gray-900 font-bold text-xs ml-1 flex items-center gap-2">
                        <Mail size={12} className="text-mySkyBlue" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="hello@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-gray-50 border-gray-200 focus:border-mySkyBlue focus:ring-4 focus:ring-mySkyBlue/5 rounded-xl h-12 transition-all font-medium placeholder:text-gray-400"
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
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-gray-50 border-gray-200 focus:border-mySkyBlue focus:ring-4 focus:ring-mySkyBlue/5 rounded-xl h-12 transition-all font-medium placeholder:text-gray-400"
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
                        <span>Continue with Email</span>
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
                  onClick={handleGoogleAuth}
                  variant="outline"
                  className="w-full bg-white hover:bg-gray-50 border-gray-200 text-gray-700 font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <Image
                    src="/GoogleLogo.png"
                    alt="Google"
                    height={20}
                    width={20}
                    className="w-5 h-5"
                  />
                  Continue with Google
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
