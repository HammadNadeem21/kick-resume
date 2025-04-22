import React from "react";
import { NavigationMenuDemo } from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <div>
      <header className=" bg-primaryColor body-font flex justify-center">
        <div className="container  flex items-center justify-between py-5 px-6">
          {/* Logo */}
          <Link href={"/"}>
            <div className="h-10 w-[180px] flex items-center">
              <Image
                src="/kickresume-logo-white.svg"
                alt="logo"
                height={300}
                width={300}
              />
            </div>
          </Link>

          {/* Navbar */}
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 hidden	lg:flex flex-wrap items-center text-base justify-center">
            <NavigationMenuDemo />
          </nav>

          {/* Button Side */}
          <div className="lg:flex hidden gap-4">
            <button className=" py-1 px-4 focus:outline-none  rounded-lg text-base mt-4 md:mt-0 text-myWhite border border-myWhite">
              Log In
            </button>
            <button className="py-1 focus:outline-none  rounded text-base mt-4 md:mt-0 text-myWhite">
              Create My resume
            </button>
          </div>


          {/* Mobile Navbar */}
         <MobileNav/>

        </div>
      </header>
    </div>
  );
};

export default Navbar;
