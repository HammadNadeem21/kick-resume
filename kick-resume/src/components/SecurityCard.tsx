import React from "react";

const SecurityCard = (props: {
  heading1: string;
  heading2: string;
  content: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="hover:bg-myLightBlue transition-all duration-300 hover:-translate-y-3 px-4 py-5 flex flex-col gap-5 rounded-lg cursor-pointer">
      <div className="flex items-center sm:gap-4 gap-2">
        {props.icon}

        <div className="text-myDarkBlue">
          <span className="text-xs">{props.heading1}</span>
          <h1 className="text-lg">{props.heading2}</h1>
        </div>
      </div>

      <p className="text-sm text-myDarkBlue">{props.content}</p>
    </div>
  );
};

export default SecurityCard;
