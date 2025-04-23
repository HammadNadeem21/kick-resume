"use client"
// import Link from "next/link";
// import React from "react";
// import { GiHamburgerMenu } from "react-icons/gi";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
// ];

// const MobileNav = () => {
//   return (
//     <div className=" lg:hidden block ml-auto relative">
//       <div className="dropdown dropdown-end">
//         <div tabIndex={0} role="button" className="">
//           <GiHamburgerMenu size={20} />
//         </div>
//         <ul
//           tabIndex={0}
//           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow bg-myDarkBlue"
//         >
//           <li className="relative group">
//             <span className="cursor-pointer flex items-center gap-1">
//               Features
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>

//             <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 shadow-md rounded-box mt-2 p-2 w-40 z-10 bg-myMidblue">
//               {components.map((item) => (
//                 <li key={item.title} className="flex gap-2">
//                   <Link href={item.href}>{item.title}</Link>
//                   <span>{item.description}</span>
//                 </li>
//               ))}
//             </ul>
//           </li>

//           <li className="relative group">
//             <span className="cursor-pointer flex items-center gap-1">
//               Resume
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>

//             <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 shadow-md rounded-box mt-2 p-2 w-40 z-10 bg-myMidblue">
//               <li>
//                 <Link href="/">Submenu 1</Link>
//               </li>
//               <li>
//                 <Link href="/">Submenu 2</Link>
//               </li>
//             </ul>
//           </li>

//           <li className="relative group">
//             <span className="cursor-pointer flex items-center gap-1">
//               Cover Letter
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>

//             <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 shadow-md rounded-box mt-2 p-2 w-40 z-10 bg-myMidblue">
//               <li>
//                 <Link href="/">Submenu 1</Link>
//               </li>
//               <li>
//                 <Link href="/">Submenu 2</Link>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <Link href={"/"}>Pricing</Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MobileNav;




import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="lg:hidden block ml-auto relative">
      <button onClick={() => setIsOpen(true)}>
        <GiHamburgerMenu size={24} />
      </button>

      {/* Fullscreen Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-primaryColor text-white p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <IoMdClose size={28} />
            </button>
          </div>

          <ul className="space-y-4">
            {/* Dropdown 1: Features */}
            <li className="group w-full">
              <div
                onClick={() => setActiveDropdown(activeDropdown === "features" ? null : "features")}
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
                <ul className="mt-2 bg-myDarkBlue w-full p-4 rounded-box space-y-2">
                  {components.map((item) => (
                    <li key={item.title} className=" hover:translate-x-4 duration-300 p-3 rounded-md">
                      <Link href={item.href}>
                        <div>
                          <p>{item.title}</p>
                          <p className="text-sm text-white/70">{item.description}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Dropdown 2: Resume */}
            <li className="group w-full">
              <div
                onClick={() => setActiveDropdown(activeDropdown === "resume" ? null : "resume")}
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
                <ul className="mt-2 bg-myDarkBlue w-full p-4 rounded-box space-y-2">
                  <li><Link href="/">Submenu 1</Link></li>
                  <li><Link href="/">Submenu 2</Link></li>
                </ul>
              )}
            </li>

            {/* Dropdown 3: Cover Letter */}
            <li className="group w-full">
              <div
                onClick={() => setActiveDropdown(activeDropdown === "cover" ? null : "cover")}
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
                <ul className="mt-2 bg-myDarkBlue    w-full p-4 rounded-box space-y-2">
                  <li><Link href="/">Submenu 1</Link></li>
                  <li><Link href="/">Submenu 2</Link></li>
                </ul>
              )}
            </li>

            {/* Simple Link */}
            <li>
              <Link href="/" className="text-lg">Pricing</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
