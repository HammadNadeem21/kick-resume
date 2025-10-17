"use client";
import React, { useEffect, useState, useRef } from "react";

// for motion library
import { motion, AnimatePresence } from "framer-motion";
import { RgbColorPicker } from "react-colorful";

interface ColorPickerDropdownProps {
  selectedTemplate: number;
  color1: any;
  setColor1: any;
  color4: any;
  setColor4: any;
  color7: any;
  setColor7: any;
  color10: any;
  setColor10: any;
  setShowColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ColorPickerDropdown: React.FC<ColorPickerDropdownProps> = ({
  selectedTemplate,
  color1,
  setColor1,
  color4,
  setColor4,
  color7,
  setColor7,
  color10,
  setColor10,
  setShowColorPicker,
}) => {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowColorPicker]);

  return (
    <motion.div
      ref={colorPickerRef}
      initial={{ opacity: 0, y: -10 }} // shuru main halka upar aur hidden
      animate={{ opacity: 1, y: 0 }} // show hote waqt neeche slide + fade in
      exit={{ opacity: 0, y: -10 }} // hide hote waqt upar slide + fade out
      transition={{ duration: 0.3 }}
      className="absolute top-[30px]  w-60 rounded-xl z-50 "
    >
      {/* <ColorPicker/> */}
      <RgbColorPicker
        color={
          selectedTemplate === 1
            ? color1
            : selectedTemplate === 4
            ? color4
            : selectedTemplate === 7
            ? color7
            : selectedTemplate === 10
            ? color10
            : color1 // fallback
        }
        onChange={
          selectedTemplate === 1
            ? setColor1
            : selectedTemplate === 4
            ? setColor4
            : selectedTemplate === 7
            ? setColor7
            : selectedTemplate === 10
            ? setColor10
            : setColor1 // fallback
        }
      />
      {/* <div className="value">{JSON.stringify(color)}</div> */}
    </motion.div>
  );
};
