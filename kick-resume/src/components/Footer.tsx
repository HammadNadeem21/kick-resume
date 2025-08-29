import Link from "next/link";
import React from "react";

// icons
import { FiFileText } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { FaBookOpen } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
// import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrPhone } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";

import { LuTwitter } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";

import Image from "next/image";
import { HoverButton } from "./HoverButton";

const socialIcons = [
  { icon: LuTwitter, href: "/" },
  { icon: FaLinkedinIn, href: "/" },
  { icon: LuGithub, href: "/" },
];

const Footer = () => {
  return (
    <div className="bg-mySkyBlue/40">
      <div className=" max-w-[1200px] mx-auto mt-10 py-5 flex flex-col lg:gap-7 gap-4 px-5">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-7">
          <div className="flex flex-col justify-center gap-2">
            <Link href={"/"}>
              <div className=" h-10 sm:w-[180px] w-auto flex items-center">
                <h1 className="md:text-2xl text-lg font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                  AI Resume{" "}
                </h1>
              </div>
            </Link>
            <p className="lg:text-[15px] sm:text-sm text-xs text-gray-500">
              Transform your career with AI-powered resume optimization and job
              matching technology.
            </p>
            <div className="flex items-center justify-start gap-2 mt-5">
              {socialIcons.map((item, index) => (
                <div
                  className="py-2 px-2 bg-gray-100/50 text-gray-500 hover:bg-mySkyBlue/40 hover:text-mySkyBlue rounded-xl hover:-translate-y-1 transition-all duration-300"
                  key={index}
                >
                  {React.createElement(item.icon)}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h1 className="lg:text-lg sm:text-[15px] text-sm font-semibold text-gray-800">
              Features
            </h1>
            {[
              "Ai Resume Analyzer",
              "Ai Resume Builder",
              "Job Matcher",
              "Resume vs Job",
            ].map((item, index) => (
              <h1
                key={index}
                className="lg:text-[15px] sm:text-sm text-xs font-normal text-gray-500 cursor-pointer hover:text-black hover:underline hover:underline-offset-2"
              >
                {item}
              </h1>
            ))}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h1 className="lg:text-lg sm:text-[15px] text-sm font-semibold text-gray-800">
              Company
            </h1>
            {["About us", "Pricing", "Blog", "Careers"].map((item, index) => (
              <h1
                key={index}
                className="lg:text-[15px] sm:text-sm text-xs font-normal text-gray-500 cursor-pointer hover:text-black hover:underline hover:underline-offset-2"
              >
                {item}
              </h1>
            ))}
          </div>
          <div className=" flex flex-col justify-center gap-2">
            <h1 className="lg:text-lg sm:text-[15px] text-sm font-semibold text-gray-800 cursor-pointer">
              Support
            </h1>
            {[
              "Help Center",
              "Contact us",
              "Privacy Policy",
              "Terms of Service",
            ].map((item, index) => (
              <h1
                key={index}
                className="lg:text-[15px] sm:text-sm text-xs font-normal text-gray-500 cursor-pointer hover:text-black hover:underline hover:underline-offset-2"
              >
                {item}
              </h1>
            ))}
          </div>
        </div>

        <div className="bg-gray-300 h-[1px] w-full"></div>
        <div className=" flex items-center justify-between flex-wrap gap-3 w-[70%]">
          {[
            { icon: MdOutlineMailOutline, value: "airesume@gmail.com" },
            { icon: GrPhone, value: "923221835452" },
            { icon: IoLocationOutline, value: "Saudia Arabia" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-5">
              <h1 className="text-mySkyBlue">
                {React.createElement(item.icon)}
              </h1>
              <h2 className="text-gray-500">{item.value}</h2>
            </div>
          ))}
        </div>
        <div className="bg-gray-300 h-[1px] w-full"></div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-sm text-gray-500">
            © 2025 AI TalentTune. All rights reserved.
          </h1>

          <div className="flex items-center justify-center gap-3 text-sm text-gray-500 flex-wrap">
            <h1>Privacy Policy</h1>
            <h1>Terms of Service</h1>
            <h1>Cookie Policy</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
