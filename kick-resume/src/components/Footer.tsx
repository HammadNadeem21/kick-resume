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
    <div className="grid sm:grid-cols-2 grid-cols-1  gap-3 bg-primaryColor pt-16 md:px-[100px] px-10">
      {/* left-side */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 ">
        <div className=" flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <FiFileText size={20} className="text-myMidblue" />
            <h1 className="text-sm text-myMidblue">Product</h1>
          </div>

          {product.map((item) => (
            <Link
              href="/"
              key={item.title}
              className="text-sm text-myWhite hover:underline duration-300"
            >
              {item.title}
            </Link>
          ))}

          <div className="flex items-center gap-3 mt-5">
            <FiFileText size={20} className="text-myMidblue" />
            <h1 className="text-sm text-myMidblue">Product</h1>
          </div>

          {mobile.map((item) => (
            <Link
              href="/"
              key={item.title}
              className="text-sm text-myWhite hover:underline duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className=" flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <IoEye size={20} className="text-myMidblue" />
            <h1 className="text-sm text-myMidblue">Resources</h1>
          </div>

          {Resources.map((item) => (
            <Link
              href="/"
              key={item.title}
              className="text-sm text-myWhite hover:underline duration-300"
            >
              {item.title}
            </Link>
          ))}

          <div className="flex items-center gap-3 mt-5">
            <LuLayoutTemplate size={20} className="text-myMidblue" />
            <h1 className="text-sm text-myMidblue">Design Templates</h1>
          </div>

          {designTemplates.map((item) => (
            <Link
              href="/"
              key={item.title}
              className="text-sm text-myWhite hover:underline duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* right-side */}
      <div className="grid lg:grid-cols-2 grid-cols-1 grid-rows-3 gap-5 ">
        <div className=" flex flex-col gap-2 row-span-2">
          <div className="flex items-center gap-3">
            <FaBookOpen size={20} className="text-myMidblue" />
            <h1 className="text-sm text-myMidblue">Articles & Reports</h1>
          </div>

          {articles.map((item) => (
            <Link
              href="/"
              key={item.title}
              className="text-sm text-myWhite hover:underline duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className=" flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Image
              src="/kickresume-icon.svg"
              alt="icon"
              height={20}
              width={20}
            />
            <h1 className="text-sm text-myMidblue">Company</h1>
          </div>

          {company.map((item) => (
            <Link
              href="/"
              key={item.title}
              className="text-sm text-myWhite hover:underline duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className=" mt-[100px] row-span-2 flex flex-col gap-5 py-10">
          <div>
            <Image
              src="/google.svg"
              alt="image"
              height={100}
              width={200}
              className="h-8 w-[100px]"
            />
            <div className="flex gap-2 mt-4">
              <FaStar size={25} className="text-yellow-400" />
              <FaStar size={25} className="text-yellow-400" />
              <FaStar size={25} className="text-yellow-400" />
              <FaStar size={25} className="text-yellow-400" />
              <FaStarHalfAlt size={25} className="text-yellow-400" />
            </div>
            <div className="h-[1px] w-full bg-myMidblue mt-5"></div>
          </div>

          <div>
            <Image
              src="/logo-app-store.svg"
              alt="image"
              height={100}
              width={200}
              className="h-8 w-[100px]"
            />
            <div className="flex gap-2 mt-4">
              <FaStar size={25} className="text-yellow-400" />
              <FaStar size={25} className="text-yellow-400" />
              <FaStar size={25} className="text-yellow-400" />
              <FaStar size={25} className="text-yellow-400" />
              <FaStarHalfAlt size={25} className="text-yellow-400" />
            </div>
            <div className="h-[1px] w-full bg-myMidblue mt-5"></div>
          </div>

          <div className="flex gap-1 items-center">
            <MdStar size={40} className=" text-green-400" />
            <h1 className="text-xl text-myWhite font-extrabold">Trustpilot</h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between items-center">
          <Image
            src="/cprw.svg"
            alt="image"
            height={10}
            width={90}
            className="xl:h-16 xl:w-24 lg:h-10 lg:w-16 sm:h-16 sm:w-24 h-[70px] w-[100px] "
          />
          <Image
            src="/parwcc.svg"
            alt="image"
            height={80}
            width={170}
            className="xl:h-24 xl:w-[150px] lg:h-16 lg:w-[120px] sm:h-24 sm:w-[150px] h-[80px] w-[180px]"
          />
        </div>
      </div>

{/* Buttom */}
      <div className="sm:col-span-2 col-span-1">
        <div className=" border-t border-myMidblue py-5 flex flex-wrap justify-center xl:gap-[50px] gap-[40px]">
          <h1 className="flex items-center gap-1 text-myWhite">
            Made with <FaHeart /> by Kickresume
          </h1>

          <HoverButton />

          <div className="flex items-center gap-5">
            <Link href="/">
              <RiTwitterXFill size={30} className="text-myWhite" />
            </Link>

            <Link href="/">
              <FaFacebookF size={30} className="text-myWhite" />
            </Link>
            <Link href="/">
              <IoLogoInstagram size={30} className="text-myWhite" />
            </Link>
            <Link href="/">
              <FaLinkedinIn size={30} className="text-myWhite" />
            </Link>
            <Link href="/">
              <FaYoutube size={30} className="text-myWhite" />
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
