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

export function SelectButton({onchange}: selectButtonType) {
  const [selected, setSelected] = useState<string>("A4");

  const handleChange = (value: string) => {
    setSelected(value);
    onchange(value as PageProps["size"]);
  }

  
  return (
    <Select value={selected} onValueChange={handleChange}>
     <label htmlFor="select-page-size" className="mt-1 text-gray-500 text-sm">Select page size</label>
      <SelectTrigger className="w-[180px] border border-gray-400 text-gray-500">
        <SelectValue placeholder="Select page size" />
      </SelectTrigger>
      <SelectContent className="bg-gray-200 text-gray-500">
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="A4">A4</SelectItem>
          <SelectItem value="LEGAL">Legal</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
