"use client";

import React from "react";
import { motion } from "framer-motion";
import SecurityCard from "./SecurityCard";
import { securitySection } from "@/lib/data";

const Security = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mySkyBlue via-blue-500 to-indigo-600" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.3),transparent_60%)]" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-[60px] relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white/20 border border-white/30 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Built by professionals who know{" "}
            <br className="hidden md:block" />
            what recruiters look for.
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
            Created by a team of hiring professionals, data experts and
            engineers — so your resume meets real-world expectations.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
        >
          {securitySection.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <SecurityCard
                heading1={item.heading1}
                heading2={item.heading2}
                content={item.content}
                icon={item.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
