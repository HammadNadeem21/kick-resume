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
  { icon: LuTwitter, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
  { icon: LuGithub, href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tighter text-gray-900">
                AI<span className="text-mySkyBlue">Resume</span>
              </h1>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering careers with state-of-the-art AI technology for resume optimization and intelligent job matching.
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="p-2.5 bg-gray-50 text-gray-400 hover:text-mySkyBlue hover:bg-mySkyBlue/10 rounded-xl transition-all duration-300"
                >
                  <item.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Features</h4>
            <ul className="flex flex-col gap-4">
              {["Resume Analyzer", "Resume Builder", "Job Matcher", "Interview Prep"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Company</h4>
            <ul className="flex flex-col gap-4">
              {["About us", "Pricing", "Blog", "Careers"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Support</h4>
            <ul className="flex flex-col gap-4">
              {["Help Center", "Privacy Policy", "Terms", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <MdOutlineMailOutline size={16} className="text-mySkyBlue" />
                <span>airesume@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <GrPhone size={14} className="text-mySkyBlue" />
                <span>+92 322 1835452</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[13px] text-gray-400 font-medium">
            © {new Date().getFullYear()} AI Resume. Built for the future of work.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-gray-400 font-medium">
             <Link href="#" className="hover:text-gray-900">Privacy</Link>
             <Link href="#" className="hover:text-gray-900">Terms</Link>
             <Link href="#" className="hover:text-gray-900">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
