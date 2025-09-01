import { LucideIcon } from "lucide-react";
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
    <div className="bg-gray-200 flex flex-col justify-center gap-4 h-[250px] px-2 shadow-xl rounded-lg hover:scale-105 hover:shadow-mySkyBlue/50 transition-all duration-300 ">
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
