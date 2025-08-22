"use client";

import { coverLetter, features, resume } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

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

  return (
    <div className="lg:hidden block ml-auto relative">
      <button onClick={() => setIsOpen(true)}>
        <GiHamburgerMenu size={24} className="text-mySkyBlue" />
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

          <ul className="">
            {/* Dropdown 1: Features */}
            {/* <li className="group w-full">
              <div
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "features" ? null : "features"
                  )
                }
                className="cursor-pointer flex justify-between items-center w-full text-lg"
              >
                <span>Features</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "features" ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {activeDropdown === "features" && (
                <ul className="mt-2 bg-myDarkBlue rounded-xl w-full p-4 rounded-box space-y-2 ">
                  {features.slice(0, 8).map((item) => (
                    <li
                      key={item.title}
                      className=" hover:translate-x-3 duration-300 p-3 rounded-md "
                    >
                      <Link href={item.href} className="flex gap-3">
                        <span className="h-[20px] w-[40px]">{item.icon}</span>
                        <div>
                          <p>{item.title}</p>
                          <p className="text-sm text-white/70">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li> */}

            {/* Dropdown 2: Resume */}
            {/* <li className="group w-full">
              <div
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "resume" ? null : "resume"
                  )
                }
                className="cursor-pointer flex justify-between items-center w-full text-lg"
              >
                <span>Resume</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "resume" ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {activeDropdown === "resume" && (
                <ul className="mt-2 bg-myDarkBlue rounded-xl w-full p-4 rounded-box space-y-2 ">
                  {resume.slice(0, 4).map((item) => (
                    <li
                      key={item.title}
                      className=" hover:translate-x-3 duration-300 p-3 rounded-md "
                    >
                      <Link href={item.href} className="flex gap-3">
                        <span className="h-[20px] w-[40px]">{item.icon}</span>
                        <div>
                          <p>{item.title}</p>
                          <p className="text-sm text-white/70">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li> */}

            {/* Dropdown 3: Cover Letter */}
            {/* <li className="group w-full">
              <div
                onClick={() =>
                  setActiveDropdown(activeDropdown === "cover" ? null : "cover")
                }
                className="cursor-pointer flex justify-between items-center w-full text-lg"
              >
                <span>Cover Letter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "cover" ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {activeDropdown === "cover" && (
                <ul className="mt-2 bg-myDarkBlue rounded-xl w-full p-4 rounded-box space-y-2 ">
                  {coverLetter.slice(0, 3).map((item) => (
                    <li
                      key={item.title}
                      className=" hover:translate-x-3 duration-300 p-3 rounded-md "
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3"
                      >
                        <div className="h-[20px] w-[40px] flex items-center ">
                          {item.icon}
                        </div>
                        <div className="">
                          <p>{item.title}</p>
                          <p className="text-sm text-white/70">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li> */}

            {/* Simple Link */}
            <li className="w-full hover:text-gray-500 text-white transition-all py-1 px-3 rounded-md">
              <Link href="/ai-resume-analyzer" className="text-lg">
                Ai Resume Analyzer
              </Link>
            </li>

            <li className="w-full hover:text-gray-500 text-white transition-all py-1 px-3 rounded-md">
              <Link href="/ai-resume-builder" className="text-lg">
                Ai Resume Builder
              </Link>
            </li>

            <li className="w-full hover:text-gray-500 text-white transition-all py-1 px-3 rounded-md">
              <Link href="/job-matcher" className="text-lg">
                Job Matcher
              </Link>
            </li>

            <li className="w-full hover:text-gray-500 text-white transition-all py-1 px-3 rounded-md">
              <Link href="/resume-job-analysis" className="text-lg">
                Resume Job Analysis
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
