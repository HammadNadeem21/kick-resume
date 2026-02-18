import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, ChevronDown, Rocket, Sparkles, Layout, PenTool, Search, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const MobileNav = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const featureLinks = [
    { title: "Resume Analyzer", href: "/ai-resume-analyzer", icon: Search },
    { title: "Resume Builder", href: "/ai-resume-builder", icon: PenTool },
    { title: "Job Matcher", href: "/job-matcher", icon: Rocket },
    { title: "Resume vs Job", href: "/resume-job-analysis", icon: Layout },
    { title: "Resume Screener", href: "/ai-resume-screener", icon: Sparkles },
  ];

  return (
    <div className="lg:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-600 hover:text-mySkyBlue transition-colors"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
               <div className="flex items-center gap-2">
                <div className="p-1.5 bg-mySkyBlue rounded-lg">
                  <Rocket className="text-white w-4 h-4" />
                </div>
                <h2 className="text-lg font-black tracking-tight text-gray-900">AI<span className="text-mySkyBlue">Resume</span></h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              {session && (
                <div className="mb-8 p-4 bg-gray-50 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full ring-4 ring-white shadow-sm overflow-hidden bg-mySkyBlue/10 flex items-center justify-center">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="User"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-mySkyBlue font-black text-sm">
                        {session.user?.email?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-gray-900 truncate tracking-tight">
                      {session.user?.name || "User Account"}
                    </p>
                    <p className="text-xs font-bold text-gray-400 truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              )}
              <ul className="flex flex-col gap-2">
                <li>
                  <button 
                    onClick={() => setShowFeatures(!showFeatures)}
                    className="w-full flex items-center justify-between py-4 text-xl font-bold text-gray-900 border-b border-gray-50"
                  >
                    Features
                    <ChevronDown size={20} className={`transition-transform duration-300 ${showFeatures ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showFeatures && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="py-2 pl-4 flex flex-col gap-1">
                          {featureLinks.map((item) => (
                            <li key={item.title}>
                              <Link 
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 py-3 text-gray-500 hover:text-mySkyBlue font-bold transition-colors"
                              >
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                  <item.icon size={18} />
                                </div>
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <Link 
                    href="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-xl font-bold text-gray-900 border-b border-gray-50"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-xl font-bold text-gray-900 border-b border-gray-50"
                  >
                    Log In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100">
              <Link 
                href="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-4 bg-mySkyBlue text-white font-black rounded-2xl shadow-xl shadow-blue-500/20"
              >
                Get Started for Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
