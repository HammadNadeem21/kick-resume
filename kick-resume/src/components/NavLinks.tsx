"use client";

import * as React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { coverLetter, features, resume } from "@/lib/data";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Features */}

        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className="active:text-myDarkBlue">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-primaryColor">
            <ul className="flex w-[400px] gap-5 py-5 px-2 md:w-[500px] md:grid-rows-2 lg:w-[750px]">
              <div className="flex flex-col gap-6 ">
                {features.slice(0, 4).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex gap-2 hover:translate-x-4 duration-300"
                  >
                    <span className="text-myMidblue h-[20px] w-[40px]  flex items-center">
                      {component.icon}
                    </span>

                    <div className="leading-tight">
                      <h2 className="text-xs text-myMidblue">
                        {component.title}
                      </h2>
                      <p className="text-[10px] text-myWhite">
                        {component.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-6 border-l border-myMidblue border-opacity-20 px-1">
                {features.slice(4, 8).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex gap-2 hover:translate-x-4 duration-300"
                  >
                    <span className="text-myMidblue h-[20px] w-[40px]  flex items-center">
                      {component.icon}
                    </span>

                    <div className="leading-tight">
                      <h2 className="text-xs text-myMidblue">
                        {component.title}
                      </h2>
                      <p className="text-[10px] text-myWhite">
                        {component.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-l border-myMidblue border-opacity-20 px-5 text-myWhite">
                Resume Examples
                {features.slice(8).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex items-center justify-between gap-2 hover:translate-x-4 duration-300"
                  >
                    <h2 className="text-myMidblue text-sm">
                      {component.title}
                    </h2>

                    <span className="text-xl text-myMidblue">
                      {component.icon}
                    </span>
                  </Link>
                ))}
                <Link
                  href={"/"}
                  className="text-sm text-myWhite hover:underline "
                >
                  View all Examples
                </Link>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        {/* Resume */}
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Resume</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-primaryColor">
            <ul className="flex w-[400px] gap-5 py-5 px-2 md:w-[500px] md:grid-rows-2 lg:w-[750px]">
              <div className="flex flex-col gap-6 ">
                {resume.slice(0, 4).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex gap-2 hover:translate-x-4 duration-300"
                  >
                    <span className="text-myMidblue h-[20px] w-[40px]  flex items-center">
                      {component.icon}
                    </span>

                    <div className="leading-tight">
                      <h2 className="text-xs text-myMidblue">
                        {component.title}
                      </h2>
                      <p className="text-[10px] text-myWhite">
                        {component.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-l border-myMidblue border-opacity-20 px-5 text-myWhite">
                Resume Examples
                {resume.slice(4, 10).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex items-center justify-between gap-2 hover:translate-x-4 duration-300"
                  >
                    <h2 className="text-myMidblue text-sm">
                      {component.title}
                    </h2>

                    <span className="text-xl text-myMidblue">
                      {component.icon}
                    </span>
                  </Link>
                ))}
                <Link
                  href={"/"}
                  className="text-sm text-myWhite hover:underline "
                >
                  View all Examples
                </Link>
              </div>

              <div className="flex flex-col gap-2 border-l border-myMidblue border-opacity-20 px-2 text-myWhite">
                Guides
                {resume.slice(10).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex items-center justify-between gap-2 hover:translate-x-4 duration-300 w-[180px] "
                  >
                    <h2 className="text-myMidblue text-xs">
                      {component.title}
                    </h2>

                    <span className="text-xl text-myMidblue">
                      {component.icon}
                    </span>
                  </Link>
                ))}
                <Link
                  href={"/"}
                  className="text-sm text-myWhite hover:underline "
                >
                  View all Guides
                </Link>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        {/* Cover Letter */}
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Cover Letter</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-primaryColor">
            <ul className="flex w-[400px] gap-5 py-5 px-2 md:w-[500px] md:grid-rows-2 lg:w-[750px]">
              <div className="flex flex-col gap-6 ">
                {coverLetter.slice(0, 3).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex gap-3 hover:translate-x-4 duration-300"
                  >
                    <span className="text-myMidblue h-[20px] w-[40px]  flex items-center">
                      {component.icon}
                    </span>

                    <div className="leading-tight">
                      <h2 className="text-xs text-myMidblue">
                        {component.title}
                      </h2>
                      <p className="text-[10px] text-myWhite">
                        {component.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-5 border-l border-myMidblue border-opacity-20 px-5 text-myWhite">
                Cover Letter Examples
                {coverLetter.slice(3, 9).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex items-center justify-between gap-2 hover:translate-x-4 duration-300"
                  >
                    <h2 className="text-myMidblue text-sm">
                      {component.title}
                    </h2>

                    <span className="text-xl text-myMidblue">
                      {component.icon}
                    </span>
                  </Link>
                ))}
                <Link
                  href={"/"}
                  className="text-sm text-myWhite hover:underline "
                >
                  View all Examples
                </Link>
              </div>

              <div className="flex flex-col gap-2 border-l border-myMidblue border-opacity-20 px-2 text-myWhite">
                Guides
                {coverLetter.slice(9).map((component) => (
                  <Link
                    href={component.href}
                    key={component.title}
                    className="flex items-center justify-between gap-2 hover:translate-x-4 duration-300 w-[180px] "
                  >
                    <h2 className="text-myMidblue text-xs">
                      {component.title}
                    </h2>

                    <span className="text-xl text-myMidblue">
                      {component.icon}
                    </span>
                  </Link>
                ))}
                <Link
                  href={"/"}
                  className="text-sm text-myWhite hover:underline "
                >
                  View all Guides
                </Link>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

        {/* Pricing */}
        <NavigationMenuItem>
          <Link
            href="/"
            className="text-lg text-myWhite hover:text-myMidblue font-semibold"
          >
            {/* <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} text-[18px]`}
            >
              Ai Resume Analyzer
            </NavigationMenuLink> */}
            Ai Resume Analyzer
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/ai-resume-builder"
            className="text-lg text-myWhite hover:text-myMidblue font-semibold"
          >
            {/* <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} text-[18px]`}
            >
              Ai Resume Builder
            </NavigationMenuLink> */}
            Ai Resume Builder
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
