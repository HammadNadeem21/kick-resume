"use client";

import AuthForm from "../AuthForm";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] relative overflow-hidden flex items-center justify-center p-4 pt-20 pb-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none" />
      
      {/* Floating Sparkles for depth */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 text-mySkyBlue/20 pointer-events-none"
      >
        <Sparkles size={40} />
      </motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 text-mySkyBlue/20 pointer-events-none"
      >
        <Zap size={40} />
      </motion.div>

      <AuthForm mode="login" />

      {/* Trust badges footer (optional, keeps it premium) */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 opacity-30 pointer-events-none select-none px-4 flex-wrap">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-gray-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure AES-256</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-gray-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fast AI Processing</span>
        </div>
      </div>
    </div>
  );
}
