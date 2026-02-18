"use client";
import React, { useState, useEffect } from "react";
import { NavigationMenuDemo } from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { signIn, signOut, useSession } from "next-auth/react";

import { useCredits } from "@/context/CreditsContext";

import AuthDialog from "./LogIn";
import { RiArrowDropDownLine } from "react-icons/ri";
import { DropdownMenuRadioGroupDemo } from "./DropdownMenu";
import { CreditCard, Rocket, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const { credit } = useCredits();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled 
        ? "bg-white/70 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="p-2 bg-mySkyBlue rounded-xl group-hover:rotate-12 transition-transform duration-300">
               <Rocket className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-gray-900">
              AI<span className="text-mySkyBlue">Resume</span>
            </h1>
          </Link>

          {/* Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            <DropdownMenuRadioGroupDemo />
            <Link
              href="/pricing"
              className={`px-4 py-2 text-sm font-bold transition-all duration-200 rounded-xl ${
                pathname === "/pricing" 
                  ? "text-mySkyBlue bg-mySkyBlue/5" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              {/* Credits Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-black shadow-lg shadow-gray-900/10">
                <CreditCard size={12} className="text-mySkyBlue" />
                <span>{credit.toFixed(1)} Credits</span>
              </div>

              {/* User Avatar Dropdown */}
              <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-50 transition-all active:scale-95 group">
                      <div className="h-9 w-9 rounded-full ring-2 ring-mySkyBlue/20 p-0.5 overflow-hidden relative transition-all group-hover:ring-mySkyBlue/40">
                        <div className="absolute inset-0 bg-mySkyBlue/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        {session?.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt="User"
                            width={36}
                            height={36}
                            className="rounded-full object-cover relative z-10"
                          />
                        ) : (
                          <div className="w-full h-full bg-mySkyBlue/10 flex items-center justify-center text-mySkyBlue font-black text-xs relative z-10">
                            {session?.user?.email?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <ChevronDown size={14} className="text-gray-400 group-hover:text-mySkyBlue transition-colors" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 mt-2 p-2 bg-white/90 backdrop-blur-2xl border border-white/40 rounded-[1.5rem] shadow-2xl shadow-blue-500/10 animate-in fade-in zoom-in-95 duration-200" align="end">
                    <DropdownMenuLabel className="p-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-black text-gray-900 tracking-tight leading-none">
                          {session?.user?.name || "User Account"}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 truncate">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-50" />
                    
                    <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer rounded-xl focus:bg-mySkyBlue/5 focus:text-mySkyBlue group transition-all">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-mySkyBlue/10 group-hover:text-mySkyBlue transition-colors">
                        <User size={16} />
                      </div>
                      <span className="font-bold text-sm tracking-tight text-gray-700 group-focus:text-mySkyBlue">Profile Settings</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer rounded-xl focus:bg-mySkyBlue/5 focus:text-mySkyBlue group transition-all">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-mySkyBlue/10 group-hover:text-mySkyBlue transition-colors">
                        <CreditCard size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm tracking-tight text-gray-700 group-focus:text-mySkyBlue">Subscription</span>
                        <span className="text-[10px] font-bold text-gray-400">{credit.toFixed(1)} Credits left</span>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-50" />
                    
                    <DropdownMenuItem 
                      onClick={() => signOut()}
                      className="flex items-center gap-3 p-3 cursor-pointer rounded-xl focus:bg-red-50 focus:text-red-500 group transition-all"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
                        <LogOut size={16} />
                      </div>
                      <span className="font-bold text-sm tracking-tight text-gray-700 group-focus:text-red-500">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/auth/login" 
                className="px-5 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/auth/signup" 
                className="px-5 py-2 text-sm font-bold text-white bg-mySkyBlue rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
