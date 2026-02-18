"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ToolboxCard = (props: {
  image: StaticImageData;
  heading: string;
  paragraph: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group max-w-[280px] flex flex-col gap-4 items-center text-center bg-white border-2 border-gray-100 hover:border-mySkyBlue/30 px-6 py-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-mySkyBlue/10 transition-all duration-300 cursor-pointer"
    >
      <div className="p-3 bg-mySkyBlue/10 group-hover:bg-mySkyBlue/20 rounded-2xl transition-colors">
        <Image
          src={props.image}
          alt={props.heading}
          height={300}
          width={300}
          className="h-[60px] w-[60px] object-contain"
        />
      </div>
      <div>
        <h3 className="text-mySkyBlue font-bold text-lg group-hover:text-blue-600 transition-colors">
          {props.heading}
        </h3>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{props.paragraph}</p>
      </div>
      <div className="flex items-center gap-1 text-mySkyBlue text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        Explore <ArrowRight size={14} />
      </div>
    </motion.div>
  );
};

export default ToolboxCard;
