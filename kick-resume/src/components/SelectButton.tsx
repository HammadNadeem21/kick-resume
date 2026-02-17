"use client"
import * as React from "react";
import { useState } from "react";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { PageProps } from "@react-pdf/renderer";

type selectButtonType = {
  onchange: (value: React.SetStateAction<PageProps["size"]>) => void;
}

export function SelectButton({ onchange }: selectButtonType) {
  const [selected, setSelected] = useState<string>("A4");

  const handleChange = (value: string) => {
    setSelected(value);
    onchange(value as PageProps["size"]);
  };

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="w-[120px] h-9 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-lg transition-all focus:ring-1 focus:ring-mySkyBlue focus:ring-offset-0 gap-2 shadow-sm">
        <SelectValue placeholder="Format" />
      </SelectTrigger>
      <SelectContent className="bg-white/95 backdrop-blur-md border-gray-100 shadow-2xl rounded-xl overflow-hidden min-w-[120px]">
        <SelectGroup>
          <SelectLabel className="text-[10px] uppercase text-gray-400 font-black px-3 py-2">Page Format</SelectLabel>
          <SelectItem 
            value="A4" 
            className="text-sm font-medium focus:bg-mySkyBlue/10 focus:text-mySkyBlue cursor-pointer py-2.5 px-3"
          >
            A4 
          </SelectItem>
          <SelectItem 
            value="LEGAL" 
            className="text-sm font-medium focus:bg-mySkyBlue/10 focus:text-mySkyBlue cursor-pointer py-2.5 px-3"
          >
            Legal
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
