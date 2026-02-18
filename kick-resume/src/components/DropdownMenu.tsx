"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, PenTool, Rocket, Layout, Sparkles } from "lucide-react";
import Link from "next/link";

export function DropdownMenuRadioGroupDemo() {
  const menuItems = [
    { title: "Resume Analyzer", href: "/ai-resume-analyzer", icon: Search },
    { title: "Resume Builder", href: "/ai-resume-builder", icon: PenTool },
    { title: "Job Matcher", href: "/job-matcher", icon: Rocket },
    { title: "Resume vs Job", href: "/resume-job-analysis", icon: Layout },
    { title: "Resume Screener", href: "/ai-resume-screener", icon: Sparkles },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-900 border-none hover:bg-gray-50 rounded-xl px-4 py-2">
          Features <ChevronDown size={14} className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/50">
        {menuItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer rounded-xl focus:bg-mySkyBlue/5 focus:text-mySkyBlue group transition-all">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-mySkyBlue/10 group-hover:text-mySkyBlue transition-colors">
                <item.icon size={18} />
              </div>
              <span className="font-bold text-sm tracking-tight">{item.title}</span>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
