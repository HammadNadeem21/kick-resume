"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#fafbfc]">
      {/* Background decorative blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-mySkyBlue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-[60px] py-20 w-full grid lg:grid-cols-2 grid-cols-1 items-center gap-16">
        {/* Left: Text */}
        <motion.section
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-mySkyBlue/10 border border-mySkyBlue/20 text-mySkyBlue text-sm font-semibold px-4 py-1.5 rounded-full w-fit"
          >
            <Sparkles size={14} />
            AI-Powered Career Platform
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              AI Powered
            </span>
            <br />
            <span className="text-gray-900">Career</span>
            <br />
            <span
              className="bg-gradient-hero bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Revolution
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
            Upload your resume and get instant AI-powered analysis with
            actionable insights and automated cover letter generation.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <Link href="/ai-resume-builder">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-gradient-to-r from-mySkyBlue to-blue-600 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-mySkyBlue/30 transition-all"
              >
                Build My Resume
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-bold px-7 py-3.5 rounded-2xl shadow-sm hover:border-mySkyBlue/40 transition-all"
            >
              Learn More
            </motion.button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-4 pt-6 border-t border-gray-200">
            {[
              { value: "50K+", label: "Resumes Created" },
              { value: "95%", label: "Success Rate" },
              { value: "10+", label: "Templates" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-center"
        >
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-mySkyBlue/20 rounded-3xl blur-2xl scale-105" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-mySkyBlue/20 border border-gray-200/80">
              <Image
                src="/landing-page.png"
                alt="AI Resume Builder Preview"
                height={1000}
                width={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
