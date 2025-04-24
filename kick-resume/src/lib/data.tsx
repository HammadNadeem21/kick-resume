import Image from "next/image";
import { title } from "process";
import { MdKeyboardArrowRight } from "react-icons/md";

// Nav-Links
export const features: {
  title: string;
  href: string;
  description?: string;
  icon: JSX.Element | string;
}[] = [
  {
    title: "Resume Builder",
    href: "/",
    description: "Create Your Resume yet.",
    icon: (
      <Image
        src="/icon-cvbuilder.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Cover Letter Builder",
    href: "/",
    description: "Attach a matching cover letter.",
    icon: (
      <Image
        src="/coverletters-icon.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Website Builder",
    href: "/",
    description: "Let employers find you online.",
    icon: (
      <Image
        src="/websites-builder-icon.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Career Map",
    href: "/",
    description: "Find you ideal career path based on data.",
    icon: (
      <Image
        src="/careermap-icon.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Resume Checker",
    href: "/",
    description: "Get instant feedback for your resume.",
    icon: (
      <Image
        src="/resumechecker-icon.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Ai Resume Writer",
    href: "/",
    description: "Let Ai write your resume.",
    icon: (
      <Image
        src="/ai_resume_writer-cion.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Ai Cover Letter Writer",
    href: "/",
    description: "GPT-4 powered cover letter writer.",
    icon: (
      <Image
        src="/ai_resume_writer-cion.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Ai Resignation Letter Generator",
    href: "/",
    description: "Ai can help you quite your job too.",
    icon: (
      <Image
        src="/ai_resume_writer-cion.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Software Engineering",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Engineering",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Back-End Developer",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Student Internship",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Business",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Health Care",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
];

export const resume: {
  title: string;
  href: string;
  description?: string;
  icon: JSX.Element | string;
}[] = [
  {
    title: "Resume Builder",
    href: "/",
    description: "Create Your Resume yet.",
    icon: (
      <Image
        src="/icon-cvbuilder.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Ai Resume Writer",
    href: "/",
    description: "Let Ai write your resume.",
    icon: (
      <Image
        src="/ai_resume_writer-cion.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Resume Checker",
    href: "/",
    description: "Get instant feedback for your resume.",
    icon: (
      <Image
        src="/resumechecker-icon.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Resume Templates",
    href: "/",
    description: "Designed by typographer, approved by recruiters",
    icon: (
      <Image
        src="/resumetemplates-icon.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Software Engineering",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Engineering",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Back-End Developer",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Student Internship",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Business",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Health Care",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "How to Write a Professional Resume Summary? [+Examples]",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "How to Describe Your Work Experience on a Resume? [+Examples]",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Resume Skills: How to Write a Skills Section in 2025? [+Examples]",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "How to List Awards Achievements on a Resume [+Examples]",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
];

export const coverLetter: {
  title: string;
  href: string;
  description?: string;
  icon: JSX.Element | string;
}[] = [
  {
    title: "Resume Builder",
    href: "/",
    description: "Create Your Resume yet.",
    icon: (
      <Image
        src="/icon-cvbuilder.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Ai Resume Writer",
    href: "/",
    description: "Let Ai write your resume.",
    icon: (
      <Image
        src="/ai_resume_writer-cion.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Resume Templates",
    href: "/",
    description: "Designed by typographer, approved by recruiters",
    icon: (
      <Image
        src="/resumetemplates-icon.svg"
        alt="icon"
        height={300}
        width={300}
        className="h-[50px] w-16"
      />
    ),
  },
  {
    title: "Software Engineering",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Engineering",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Back-End Developer",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Student Internship",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Business",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "Health Care",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "What is a Cover Letter and How to Write One? [+Examples]",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title: "How Long Shold a Cover Letter Be in 2025? [+Examples]",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title:
      "How to Start a Cover Letter: 7 Great Cover Letter Openings [+Examples]",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
  {
    title:
      "How to End a Cover Letter? 8 Great Cover Letters Endings [+Examples]",
    href: "/",
    icon: <MdKeyboardArrowRight />,
  },
];

// Footer Link
export const product = [
  { title: "Resume Builder" },
  { title: "Cover Letter Builder" },
  { title: "Resume Website Builder" },
  { title: "LinkdIn Resume Builder" },
  { title: "AI Resume Builder" },
  { title: "AI Cover Letter Writer" },
  { title: "AI Resignation Letter Generator" },
  { title: "AI Resume Rewriter" },
  { title: "Career Summary Generator" },
  { title: "Work Experience Generator" },
  { title: "Resume Checker" },
  { title: "ATS Resume Checker" },
  { title: "Career Map" },
  { title: "AI Interview Questions Generator" },
  { title: "Online AI Career Coach" },
  { title: "Profreading" },
  { title: "Coming Soon" },
  { title: "KickHr" },
  { title: "Students" },
  { title: "Pricing" },
];

export const mobile = [
  { title: "Mobile App" },
  { title: "Mobile App for IOS" },
  { title: "Mobile App for Android" },
];

export const Resources = [
  { title: "Help Center" },
  { title: "Resume Examples" },
  { title: "Cover Letter Examples" },
  { title: "Resume Guides" },
  { title: "Cover Letter Guides" },
  { title: "Resignation Letter Guides" },
  { title: "The Job Seeker's Guide eBook" },
  { title: "Resume Assembly Manual eBook" },
  { title: "Beyond Report Work Report" },
  { title: "Our Community" },
  { title: "Blog" },

];

export const designTemplates = [
  { title: "Resume Templates" },
  { title: "Cover Letter Templates" },
  { title: "Persnol Website Templates" },
  { title: "ATS Resume Templates" },
  { title: "Free Resume Templates" },
  { title: "Simple Resume Templates" },
  { title: "Professional Resume Templates" },
  { title: "Creative Resume Templates" },

]


export const articles = [
  { title: "How to Create a Resume on an iPhone" },
  { title: "ISIC Knowledge Base" },
  { title: "10 Best Resume Builder" },
  { title: "6 Best AI Resume Writer" },
  { title: "10 Best AI Cover Letter Generators" },
  { title: "5 best ATS Resume Checker" },
  { title: "Best Resume Apps for iPhone & Andriod" },
  { title: "Best Career Tools" },
  { title: "How to Write a Resume in 2025" },
  { title: "How to Formate a Resume?" },
  { title: "HR Statistics 2025" },
  { title: "Kickresume vs Zety" },
  { title: "Kickresume vs Rezi" },
  { title: "Kickresume vs Enhance CV" },
  { title: "Kickresume vs Teal" },
  { title: "Recruiter Study" },

]

export const company = [
  {title: "About Us"},
  {title: "Contact Us"},
  {title: "Tearms"},
  {title: "Privacy Policy"},
  {title: "Cookie Settings"},
  {title: "Media / Press"},
  {title: "Affiliates"},
  {title: "Feedback"},
]