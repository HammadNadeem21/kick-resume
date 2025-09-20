"use client";

import { coverLetter, features, resume } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="lg:hidden block ml-auto relative">
      <button onClick={() => setIsOpen(true)}>
        <GiHamburgerMenu className="text-mySkyBlue sm:text-[20px] text-[15px]" />
      </button>

      {/* Fullscreen Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-mySkyBlue  p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <IoMdClose size={28} className="text-white" />
            </button>
          </div>

          <ul className="relative">
            {/* Dropdown 1: Features */}


            {/* Simple Link */}
            <li
              className="w-full hover:text-gray-500 text-white transition-all py-1 px-3 flex items-center justify-between rounded-md cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              Features
              <RiArrowDropDownLine size={20} />
            </li>
            {showDropdown && (
              <ul className="absolute w-full  py-1 px-3 rounded-md bg-gray-100">
                <li className="hover:text-gray-500 text-gray-400 transition-all">
                  <Link href="/ai-resume-analyzer">Ai Resume Analyzer</Link>
                </li>
                <li className="hover:text-gray-500 text-gray-400 transition-all">
                  <Link href="/ai-resume-builder">Ai Resume Builder</Link>
                </li>
                <li className="hover:text-gray-500 text-gray-400 transition-all">
                  <Link href="/job-matcher">Job Matcher</Link>
                </li>
                <li className="hover:text-gray-500 text-gray-400 transition-all">
                  <Link href="/resume-job-analysisi ">Resume vs Job</Link>
                </li>
                <li className="hover:text-gray-500 text-gray-400 transition-all">
                  <Link href="/ai-resume-screener">Ai Resume Screener</Link>
                </li>
              </ul>
            )}

            <li className="w-full hover:text-gray-500 text-white transition-all py-1 px-3 rounded-md">
              <Link href="/pricing" className="text-lg">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
