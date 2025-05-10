"use client"
import React from "react";
import { NavigationMenuDemo } from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const {data: session} = useSession();

  const handleSignUp = () => {
    signIn()
  }

  return (
    <div>
      <header className=" bg-primaryColor body-font flex justify-center">
        <div className="container  flex items-center justify-between py-5 px-3">
          {/* Logo */}
          <Link href={"/"}>
            <div className="h-10 w-[180px] flex items-center text-myWhite">
              
              @ABC
            </div>
          </Link>

          {/* Navbar */}
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 hidden	lg:flex flex-wrap items-center text-base justify-center">
            <NavigationMenuDemo />
          </nav>

          {/* Button Side */}
          <div className="lg:flex hidden gap-4">
          
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
                className="py-1 px-4 rounded-lg text-myWhite border border-myWhite hover:bg-myWhite hover:text-primaryColor transition-all duration-300"
              >
                Sign Out
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-700 text-white font-bold">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span>{session?.user?.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>
            </>
          ) : (
            // ❌ Agar user logged in nahi hai, toh SignUp + Log In buttons show honge
            <>
              <button
                onClick={() => signIn()}
                className="py-1 px-4 rounded-lg text-myWhite border border-myWhite hover:bg-myWhite hover:text-primaryColor transition-all duration-300"
              >
                Log In
              </button>
              <button
                onClick={() => signIn("google")}
                className="py-1 px-2 rounded-lg text-myWhite hover:bg-myMidblue/30"
              >
                SignUp
              </button>
            </>
          )}
          </div>


          {/* Mobile Navbar */}
         <MobileNav/>

        </div>
      </header>
    </div>
  );
};

export default Navbar;
