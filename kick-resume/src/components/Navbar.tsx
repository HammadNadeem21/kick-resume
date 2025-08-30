"use client";
import React from "react";
import { NavigationMenuDemo } from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { signIn, signOut, useSession } from "next-auth/react";

import { useCredits } from "@/context/CreditsContext";

import { useEffect, useRef, useState } from "react";
// import { signIn } from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";
import { SignUp } from "./SignUp";
import { LogIn } from "lucide-react";
import AuthDialog from "./LogIn";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  // const [mode, setMode] = useState<'login' | 'signup' | null>(null);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const router = useRouter();

  //   const handleSignUpSubmit = async () => {
  //   setError('');
  //   const res = await fetch('/api/signup', {
  //     method: 'POST',
  //     body: JSON.stringify({ email, password }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   if (res.status === 201) {
  //     alert('Account created! Please login.');
  //     setMode(null);
  //   } else {
  //     const data = await res.json();
  //     setError(data.error);
  //   }
  // };

  // const handleLoginSubmit = async () => {
  //   setError('');
  //   const result = await signIn('credentials', {
  //     redirect: false,
  //     email,
  //     password,
  //   });

  //   if (result?.error) {
  //     setError(result.error);
  //   } else {
  //     router.push('/dashboard'); // change as needed
  //   }
  // };

  const { data: session } = useSession();
  const { credit } = useCredits();
  // const pathname = usePathname();

  const handleSignUp = () => {
    signIn();
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();
  // Outside click listener
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setShowDropdown(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  return (
    <div className="bg-mySkyBlue/30 shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.1)]  shadow-mySkyBlue">
      <header className="  max-w-[1200px] mx-auto  body-font  ">
        <div className="flex items-center justify-between py-5 px-4">
          {/* Logo */}
          <Link href={"/"}>
            <div className=" h-10 sm:w-[180px] w-auto flex items-center">
              <h1 className="sm:text-xl text-lg font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                AI Resume{" "}
              </h1>
            </div>
          </Link>

          {/* Navbar */}
          <nav className="lg:flex  hidden relative ">
            {/* <NavigationMenuDemo /> */}
            {/* <div className="flex items-center justify-center gap-8"> */}
            <ul className="flex items-center justify-center gap-5  font-semibold ">
              <li
                className="text-[15px] flex items-center justify-center gap-1 text-gray-600 hover:bg-mySkyBlue py-1 px-3 cursor-pointer rounded-xl"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Features
                <RiArrowDropDownLine size={20} />
              </li>

              <li>
                <Link
                  href="/pricing"
                  className={`text-[15px] text-gray-600 hover:bg-mySkyBlue py-1 px-3 rounded-xl ${
                    pathname === "/pricing" ? "bg-mySkyBlue" : ""
                  }`}
                >
                  Pricing
                </Link>
              </li>
            </ul>

            {showDropdown && (
              <ul className="absolute transition-all duration-500 top-[40px] bg-mySkyBlue rounded-lg py-1 px-2 text-[15px] text-gray-600 flex flex-col justify-center gap-2">
                <li className="hover:bg-gray-200/50 rounded-lg py-1 px-2">
                  <Link href="/ai-resume-analyzer">Ai Resume Analyzer</Link>
                </li>
                <li className="hover:bg-gray-200/50 rounded-lg py-1 px-2">
                  <Link href="/ai-resume-builder">Ai Resume Builder</Link>
                </li>

                <li className="hover:bg-gray-200/50 rounded-lg py-1 px-2">
                  <Link href="/job-matcher">Job Matcher</Link>
                </li>
                <li className="hover:bg-gray-200/50 rounded-lg py-1 px-2">
                  <Link href="/resume-job-analysis">Resume vs Job</Link>
                </li>
              </ul>
            )}

            {/* <Link
              href="/job-matcher"
              className={`text-[15px] text-gray-600 hover:bg-mySkyBlue py-1 px-3 rounded-xl ${
                pathname === "/job-matcher" ? "bg-mySkyBlue" : ""
              }`}
            >
              Job
            </Link>

            <Link
              href="/resume-job-analysis"
              className={`text-[15px] text-gray-600 hover:bg-mySkyBlue py-1 px-3 rounded-xl ${
                pathname === "/resume-job-analysis" ? "bg-mySkyBlue" : ""
              }`}
            >
              Resume
            </Link> */}
            {/* </div> */}
          </nav>

          <div className="flex items-center  sm:gap-4 gap-2 ">
            {/* <button className=" py-1 px-4 focus:outline-none  rounded-lg text-base mt-4 md:mt-0 text-myWhite border border-myWhite hover:bg-myWhite hover:text-primaryColor transition-all duration-300">
              Log In
            </button>
            <button
            onClick={handleSignUp}
            className="py-1 px-2 focus:outline-none  rounded-lg text-base mt-4 md:mt-0 text-myWhite hover:bg-myMidblue/30">
              SignUp
            </button> */}

            {session ? (
              // ✅ Agar user logged in hai, toh SignOut + Avatar show hoga
              <>
                <button
                  onClick={() => signOut()}
                  className="py-1 sm:px-4 px-2 sm:text-[15px] text-[12px] rounded-lg text-white sm:font-semibold font-bold bg-mySkyBlue transition-all duration-300"
                >
                  Sign Out
                </button>
                <div className="sm:h-10 sm:w-10 h-7 w-7 rounded-full overflow-hidden flex items-center justify-center bg-mySkyBlue text-white font-bold">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="">
                      {session?.user?.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <h1 className="py-1 sm:px-4 px-2 sm:text-[15px] text-[12px] rounded-lg text-white sm:font-semibold font-bold bg-mySkyBlue transition-all duration-300">
                  Credits: {credit.toFixed(1)}
                </h1>
              </>
            ) : (
              // ❌ Agar user logged in nahi hai, toh SignUp + Log In buttons show honge
              <>
                {/* <button
                  onClick={() => signIn()}
                  className="py-1 px-4 rounded-lg text-white font-semibold bg-mySkyBlue/50 hover:bg-mySkyBlue transition-all duration-300"
                >
                  Log In
                </button> */}
                <button className="py-1 sm:px-4 px-2 sm:text-[15px] text-[12px] rounded-lg text-white sm:font-semibold font-bold bg-mySkyBlue transition-all duration-300">
                  <Link href="/auth/login">logIn</Link>
                </button>

                {/* <button
                  onClick={() => signIn()}
                  className="py-1 px-2 rounded-lg text-white font-semibold bg-mySkyBlue/50 hover:bg-mySkyBlue"
                >
                  SignUp
                </button> */}
                <button className="py-1 sm:px-4 px-2 sm:text-[15px] text-[12px] rounded-lg text-white sm:font-semibold font-bold bg-mySkyBlue transition-all duration-300">
                  <Link href="/auth/signup">SignUp</Link>
                </button>
              </>
            )}

            {/* <Link href="/login">
<button className=" py-1 px-4 focus:outline-none  rounded-lg text-base mt-4 md:mt-0 text-myWhite border border-myWhite hover:bg-myWhite hover:text-primaryColor transition-all duration-300">
              Log In
            </button></Link>
            <Link href="/signup">
<button
            
            className="py-1 px-2 focus:outline-none  rounded-lg text-base mt-4 md:mt-0 text-myWhite hover:bg-myMidblue/30">
              SignUp
            </button>
            </Link> */}
            {/* <SignUp/>

<Login/> */}
            <div className="lg:hidden flex">
              <MobileNav />
            </div>
          </div>

          {/* Button Side */}

          {/* Mobile Navbar */}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
