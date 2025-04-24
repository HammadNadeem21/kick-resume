import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeatureCard = (props: {
  heading: string;
  paragraph: string;
  points: string[];
  lastLine?: string;
  image: string;
}) => {
  return (
    <div className=" col-span-2 flex flex-wrap items-center justify-center gap-2 mt-10">
      {/* left-side */}

      <div className="flex flex-col text-left gap-4 px-3 sm:w-1/2 w-full">
        <h4 className="lg:text-xl text-lg font-semibold text-myDarkBlue">
          {props.heading}
        </h4>

        <p className="lg:text-lg text-sm text-myDarkBlue">{props.paragraph}</p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-myDarkBlue lg:text-lg text-sm">
          {props.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        <h3 className="text-red-500 hover:underline lg:text-lg text-sm">
          <Link href="/">{props.lastLine}</Link>
        </h3>
      </div>

      {/* right-side */}

      <div>
        <Image
          src={props.image}
          alt="feature-1"
          height={500}
          width={500}
          className="lg:h-[270px] lg:w-[350px] h-[200px] w-[280px]"
        />
      </div>
    </div>
  );
};

export default FeatureCard;
