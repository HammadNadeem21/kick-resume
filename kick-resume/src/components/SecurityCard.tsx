"use client";

import React from "react";
import { motion } from "framer-motion";

const SecurityCard = (props: {
  heading1: string;
  heading2: string;
  content: string;
  icon: JSX.Element;
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 px-6 py-7 flex flex-col gap-4 rounded-2xl cursor-pointer transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/20 group-hover:bg-white/30 rounded-xl transition-colors">
          {props.icon}
        </div>
        <div>
          <span className="text-xs text-white/70 font-medium uppercase tracking-wider">
            {props.heading1}
          </span>
          <h3 className="text-lg font-bold text-white leading-tight">
            {props.heading2}
          </h3>
        </div>
      </div>
      <p className="text-sm text-white/80 leading-relaxed">{props.content}</p>
    </motion.div>
  );
};

export default SecurityCard;
