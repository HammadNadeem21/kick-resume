import React from "react";
import SecurityCard from "./SecurityCard";
import { securitySection } from "@/lib/data";

const Security = () => {
  return (
    <div className="bg-[#b66cfa] py-[100px] px-4 flex flex-col  gap-10">
      {/* Heading */}
      <div className="w-[90%] mx-auto text-center">
        <h1 className="lg:text-4xl sm:text-2xl text-2xl text-myPurple font-semibold">
          An AI resume review tool designed by recruiters.
        </h1>
        <p className="lg:text-xl sm:text-sm text-xs text-myPurple mt-2">
          Kickresume&apos;s online resume checker was designed by a team of
          experienced recruiters, data analysts, and software engineers.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-[60px] sm:px-8 lg:px[100px] px-2">
        {securitySection.map((item, index) => (
          <SecurityCard
            key={index}
            heading1={item.heading1}
            heading2={item.heading2}
            content={item.content}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Security;
