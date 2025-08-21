"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const ToolboxCard = (props: {
  image: StaticImageData;
  heading: string;
  paragraph: string;
}) => {
  return (
    <Link href="/">
      <div className="flex flex-col gap-3 justify-center items-center text-center mt-10 px-2 py-3 hover:bg-mySkyBlue/20 transition-all duration-300 hover:-translate-y-3 rounded-lg">
        <Image
          src={props.image}
          alt="icon"
          height={300}
          width={300}
          className="h-[80px] w-[150px]"
        />
        <h1 className="text-mySkyBlue sm:text-xl font-bold text-xl">
          {props.heading}
        </h1>
        <p className="text-gray-500 sm:text-lg text-sm">{props.paragraph}</p>
      </div>
    </Link>
  );
};

export default ToolboxCard;
