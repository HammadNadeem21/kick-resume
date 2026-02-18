"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  gradient?: boolean;
}

const ToolCard = ({ title, description, icon: Icon, link }: ToolCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group bg-white border-2 border-gray-100 hover:border-mySkyBlue/30 flex flex-col justify-between gap-4 h-[260px] p-6 shadow-sm hover:shadow-xl hover:shadow-mySkyBlue/10 rounded-2xl transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-mySkyBlue/10 group-hover:bg-mySkyBlue/20 rounded-xl transition-colors">
            <Icon className="h-5 w-5 text-mySkyBlue" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-mySkyBlue transition-colors">
            {title}
          </h2>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
      <Link href={link}>
        <button className="w-full text-white font-bold bg-gradient-to-r from-mySkyBlue to-blue-600 rounded-xl py-2.5 px-4 shadow-md shadow-mySkyBlue/20 hover:shadow-lg hover:shadow-mySkyBlue/30 transition-all duration-200 active:scale-95">
          Get Started
        </button>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
