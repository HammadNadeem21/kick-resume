"use client";

import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { featuresSection } from "@/lib/data";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const Features = () => {
  return (
    <section className="bg-[#fafbfc] py-24 px-4 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-mySkyBlue/5 via-transparent to-transparent pointer-events-none" />

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
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            An AI resume review tool{" "}
            <span
              className="bg-gradient-to-r from-mySkyBlue to-blue-600 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              designed by recruiters.
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Kickresume&apos;s online resume checker was designed by a team of
            experienced recruiters, data analysts, and software engineers.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6"
        >
          {featuresSection.map((feature: any, index: number) => (
            <motion.div key={index} variants={cardVariants}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                link={feature.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
