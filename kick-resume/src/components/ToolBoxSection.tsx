"use client";

import React from "react";
import { motion } from "framer-motion";
import ToolboxCard from "./ToolboxCard";
import { toolbox } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ToolBoxSection = () => {
  return (
    <section className="bg-[#fafbfc] py-24 px-4 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mySkyBlue/5 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-[60px] relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-mySkyBlue/10 border border-mySkyBlue/20 text-mySkyBlue text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Toolbox
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            The only career toolbox{" "}
            <span
              className="bg-gradient-to-r from-mySkyBlue to-blue-600 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              you&apos;ll ever need.
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed font-medium">
            Everything you need to land your dream job, all in one place.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {toolbox.map((item: any, index: number) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <ToolboxCard
                image={item.image}
                heading={item.heading}
                paragraph={item.content}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link href="/ai-resume-builder">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-mySkyBlue to-blue-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-mySkyBlue/30 transition-all"
            >
              Start Building Your Resume
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolBoxSection;
