// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const FeatureCard = (props: {
//   heading: string;
//   paragraph: string;
//   points: string[];
//   lastLine?: string;
//   image: string;
// }) => {
//   return (
//     <div className=" col-span-2 flex flex-wrap items-center justify-center gap-2 mt-10">
//       {/* left-side */}

//       <div className="flex flex-col text-left gap-4 px-3 sm:w-1/2 w-full">
//         <h4 className="lg:text-xl text-lg font-semibold text-myDarkBlue">
//           {props.heading}
//         </h4>

//         <p className="lg:text-lg text-sm text-myDarkBlue">{props.paragraph}</p>

//         <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-myDarkBlue lg:text-lg text-sm">
//           {props.points.map((point, index) => (
//             <li key={index}>{point}</li>
//           ))}
//         </ul>

//         <h3 className="text-red-500 hover:underline lg:text-lg text-sm">
//           <Link href="/">{props.lastLine}</Link>
//         </h3>
//       </div>

//       {/* right-side */}

//       <div>
//         <Image
//           src={props.image}
//           alt="feature-1"
//           height={500}
//           width={500}
//           className="lg:h-[270px] lg:w-[350px] h-[200px] w-[280px]"
//         />
//       </div>
//     </div>
//   );
// };

// export default FeatureCard;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  gradient?: boolean;
}

const ToolCard = ({ title, description, icon: Icon, link }: ToolCardProps) => {
  return (
    // <div
    //   className={`group bg-white relative overflow-hidden backdrop-blur-xl hover:scale-[1.02] hover:-translate-y-4 hover:shadow-2xl rounded-lg`}
    // >
    //   {/* <div className="absolute inset-0  opacity-20 group-hover:opacity-40"></div> */}

    //   {/* Hover Glow Effect */}
    //   <div className="absolute -inset-2  opacity-0 group-hover:opacity-20 blur-2xl transition-smooth rounded-3xl"></div>

    //   <CardHeader className="relative space-y-8 p-10">
    //     <div className=" flex items-center justify-center bg-blue-300">
    //       <div
    //         className={`w-12 h-12 rounded-xl flex items-center justify-center relative text-mySkyBlue bg-mySkyBlue/30${
    //           gradient ? "" : " "
    //         }  group-hover:scale-110`}
    //       >
    //         <Icon
    //           className={`h-5 w-5 ${
    //             gradient ? "text-white" : "text-primary"
    //           } group-hover:scale-110 transition-elastic`}
    //         />

    //         {/* Icon Glow Effect */}
    //         {/* <div className="absolute inset-0  rounded-3xl blur-xl"></div> */}
    //       </div>

    //       <h1 className="text-xl font-bold bg-red-500 group-hover:text-primary bg-gradient-to-r from-foreground to-foreground/90">
    //         {title}
    //       </h1>
    //     </div>

    //     <div className="space-y-4">
    //       <CardDescription className="text-muted-foreground leading-relaxed text-base font-medium">
    //         {description}
    //       </CardDescription>
    //     </div>
    //   </CardHeader>

    //   <CardContent className="relative p-10 pt-0">
    //     <button
    //       type="button"
    //       className="w-full h-14 text-base font-semibold group-hover:bg-primary/15 group-hover:border-primary/60 group-hover:shadow-button transition-elastic group-hover:scale-105"
    //     >
    //       <Link href={link} className="flex items-center justify-center">
    //         Get Started
    //         <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-3 transition-elastic" />
    //       </Link>
    //     </button>
    //   </CardContent>
    // </div>
    <div className="bg-gray-200 flex flex-col justify-center gap-4 py-3 px-2 shadow-xl rounded-lg hover:scale-105 hover:shadow-mySkyBlue/50 transition-all duration-300 ">
      <div className="flex items-center justify-center gap-1">
        <div className="py-2 px-2 bg-mySkyBlue/30 rounded-lg">
          <Icon className="h-5 w-5" color="#55cef6" />
        </div>
        <h1 className="text-xl font-bold group-hover:text-primary text-mySkyBlue">
          {title}{" "}
        </h1>
      </div>
      <p className="text-gray-500 text-xs">{description}</p>
      <Link href={link}>
        <button className=" text-white font-bold bg-gradient-hero rounded-lg py-1 px-2 w-full">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default ToolCard;
