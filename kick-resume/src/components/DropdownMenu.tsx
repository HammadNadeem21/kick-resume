"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";

export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center justify-center gap-1 text-[15px] text-gray-600 active:outline-none border-none shadow-none">
          Features <RiArrowDropDownLine />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuRadioGroup value={position} onValueChange={setPosition}> */}
        <Link href="/ai-resume-analyzer">
          <DropdownMenuRadioItem value="top">
            Ai Resume Analyzer
          </DropdownMenuRadioItem>
        </Link>

        <Link href="/ai-resume-builder">
          <DropdownMenuRadioItem value="bottom">
            Ai Resume Builder
          </DropdownMenuRadioItem>
        </Link>

        <Link href="/job-matcher">
          <DropdownMenuRadioItem value="right">
            Job Matcher
          </DropdownMenuRadioItem>
        </Link>
        <Link href="/resume-job-analysis">
          <DropdownMenuRadioItem value="right">
            Resume vs Job
          </DropdownMenuRadioItem>
        </Link>

        {/* </DropdownMenuRadioGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
