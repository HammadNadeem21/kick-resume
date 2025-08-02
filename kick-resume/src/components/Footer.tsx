import Link from "next/link";
import React from "react";

// icons
import { FiFileText } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { FaBookOpen } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

import {
  articles,
  company,
  designTemplates,
  mobile,
  product,
  Resources,
} from "@/lib/data";

import Image from "next/image";
import { HoverButton } from "./HoverButton";

const Footer = () => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1  gap-3 bg-gray-200 pt-16 md:px-[100px] px-10">
      {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"> */}

      <div className="lg:col-span-4 md:col-span-3 sm:col-span-2 flex items-center justify-between px-10">
        <Link href="/">
          <h1 className="text-sm text-myPurple hover:underline">About</h1>
        </Link>

        <Link href="/">
          <h1 className="text-sm text-myPurple hover:underline">Contact us</h1>
        </Link>

        <Link href="/">
          <h1 className="text-sm text-myPurple hover:underline">Features</h1>
        </Link>

        <Link href="/">
          <h1 className="text-sm text-myPurple hover:underline">Contact</h1>
        </Link>
        {/* </div> */}
      </div>

      {/* Buttom */}
      <div className="sm:col-span-2 col-span-1">
        <div className=" border-t border-myPurple py-5 flex flex-wrap justify-center xl:gap-[50px] gap-[40px]">
          <h1 className="flex items-center gap-1 text-myPurple">
            Made with <FaHeart /> by Kickresume
          </h1>

          <HoverButton />

          <div className="flex items-center gap-5 text-myMidPurple">
            <Link href="/">
              <RiTwitterXFill size={30} className="" />
            </Link>

            <Link href="/">
              <FaFacebookF size={30} className="" />
            </Link>
            <Link href="/">
              <IoLogoInstagram size={30} className="" />
            </Link>
            <Link href="/">
              <FaLinkedinIn size={30} className="" />
            </Link>
            <Link href="/">
              <FaYoutube size={30} className="" />
            </Link>
          </div>

          <Link href="/">
            <Image
              src="/icon-app-store.svg"
              alt="app-store"
              height={100}
              width={100}
              className="h-10 w-[130px]"
            />
          </Link>

          <Link href="/">
            <Image
              src="/icon-google-play.svg"
              alt="app-store"
              height={100}
              width={100}
              className="h-10 w-[130px]"
            />
          </Link>
        </div>

        <div className="flex justify-center sm:gap-6 gap-4">
          <Image
            src="/template-1.png"
            alt="template-1"
            height={400}
            width={500}
            className="lg:h-[90px] lg:w-[190px] h-[70px] w-[160px] mt-3"
          />
          <Image
            src="/template-2.png"
            alt="template-2"
            height={400}
            width={300}
            className="h-[90px] w-[250px] mt-3 hidden xl:block"
          />
          <Image
            src="/template-3.png"
            alt="template-3"
            height={400}
            width={500}
            className="lg:h-[90px] lg:w-[180px] h-[70px] w-[150px] mt-3 hidden md:block"
          />
          <Image
            src="/template-4.png"
            alt="template-4"
            height={400}
            width={500}
            className="lg:h-[90px] lg:w-[180px] h-[70px] w-[150px] mt-3 hidden sm:block"
          />
          <Image
            src="/template-5.png"
            alt="template-5"
            height={400}
            width={500}
            className="lg:h-[90px] lg:w-[250px] mt-3 h-[70px] w-[160px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
