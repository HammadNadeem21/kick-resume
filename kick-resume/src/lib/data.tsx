import Image from "next/image";
import { MdOutlineSecurity } from "react-icons/md";
import { Brain, FileText, Briefcase, Target } from "lucide-react";

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
    href: "/select-template",
    description: "Create Your Resume yet.",
    icon: (
      <Image src="/icon-cvbuilder.svg" alt="icon" height={100} width={100} />
    ),
  },
  // {
  //   title: "Cover Letter Builder",
  //   href: "/",
  //   description: "Attach a matching cover letter.",
  //   icon: (
  //     <Image
  //       src="/coverletters-icon.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}

  //     />
  //   ),
  // },
  // {
  //   title: "Website Builder",
  //   href: "/",
  //   description: "Let employers find you online.",
  //   icon: (
  //     <Image
  //       src="/websites-builder-icon.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}

  //     />
  //   ),
  // },
  // {
  //   title: "Career Map",
  //   href: "/",
  //   description: "Find you ideal career path based on data.",
  //   icon: (
  //     <Image
  //       src="/careermap-icon.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}

  //     />
  //   ),
  // },
  // {
  //   title: "Resume Checker",
  //   href: "/",
  //   description: "Get instant feedback for your resume.",
  //   icon: (
  //     <Image
  //       src="/resumechecker-icon.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}

  //     />
  //   ),
  // },
  // {
  //   title: "Ai Resume Writer",
  //   href: "/",
  //   description: "Let Ai write your resume.",
  //   icon: (
  //     <Image
  //       src="/ai_resume_writer-cion.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}

  //     />
  //   ),
  // },
  // {
  //   title: "Ai Cover Letter Writer",
  //   href: "/",
  //   description: "GPT-4 powered cover letter writer.",
  //   icon: (
  //     <Image
  //       src="/ai_resume_writer-cion.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}

  //     />
  //   ),
  // },
  // {
  //   title: "Ai Resignation Letter Generator",
  //   href: "/",
  //   description: "Ai can help you quite your job too.",
  //   icon: (
  //     <Image
  //       src="/ai_resume_writer-cion.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}

  //     />
  //   ),
  // },
  // {
  //   title: "Software Engineering",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Engineering",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Back-End Developer",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Student Internship",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Business",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Health Care",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
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
  // {
  //   title: "Ai Resume Writer",
  //   href: "/",
  //   description: "Let Ai write your resume.",
  //   icon: (
  //     <Image
  //       src="/ai_resume_writer-cion.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}
  //       className="h-[50px] w-16"
  //     />
  //   ),
  // },
  // {
  //   title: "Resume Checker",
  //   href: "/",
  //   description: "Get instant feedback for your resume.",
  //   icon: (
  //     <Image
  //       src="/resumechecker-icon.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}
  //       className="h-[50px] w-16"
  //     />
  //   ),
  // },
  // {
  //   title: "Resume Templates",
  //   href: "/",
  //   description: "Designed by typographer, approved by recruiters",
  //   icon: (
  //     <Image
  //       src="/resumetemplates-icon.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}
  //       className="h-[50px] w-16"
  //     />
  //   ),
  // },
  // {
  //   title: "Software Engineering",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Engineering",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Back-End Developer",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Student Internship",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Business",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Health Care",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "How to Write a Professional Resume Summary? [+Examples]",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "How to Describe Your Work Experience on a Resume? [+Examples]",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Resume Skills: How to Write a Skills Section in 2025? [+Examples]",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "How to List Awards Achievements on a Resume [+Examples]",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
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
  // {
  //   title: "Ai Resume Writer",
  //   href: "/",
  //   description: "Let Ai write your resume.",
  //   icon: (
  //     <Image
  //       src="/ai_resume_writer-cion.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}
  //       className="h-[50px] w-16"
  //     />
  //   ),
  // },
  // {
  //   title: "Resume Templates",
  //   href: "/",
  //   description: "Designed by typographer, approved by recruiters",
  //   icon: (
  //     <Image
  //       src="/resumetemplates-icon.svg"
  //       alt="icon"
  //       height={300}
  //       width={300}
  //       className="h-[50px] w-16"
  //     />
  //   ),
  // },
  // {
  //   title: "Software Engineering",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Engineering",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Back-End Developer",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Student Internship",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Business",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "Health Care",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "What is a Cover Letter and How to Write One? [+Examples]",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title: "How Long Shold a Cover Letter Be in 2025? [+Examples]",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title:
  //     "How to Start a Cover Letter: 7 Great Cover Letter Openings [+Examples]",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
  // {
  //   title:
  //     "How to End a Cover Letter? 8 Great Cover Letters Endings [+Examples]",
  //   href: "/",
  //   icon: <MdKeyboardArrowRight />,
  // },
];

// Footer Link
export const product = [
  // { title: "Resume Builder" },
  // { title: "Cover Letter Builder" },
  // { title: "Resume Website Builder" },
  // { title: "LinkdIn Resume Builder" },
  // { title: "AI Resume Builder" },
  // { title: "AI Cover Letter Writer" },
  // { title: "AI Resignation Letter Generator" },
  // { title: "AI Resume Rewriter" },
  // { title: "Career Summary Generator" },
  // { title: "Work Experience Generator" },
  // { title: "Resume Checker" },
  // { title: "ATS Resume Checker" },
  // { title: "Career Map" },
  // { title: "AI Interview Questions Generator" },
  // { title: "Online AI Career Coach" },
  // { title: "Profreading" },
  // { title: "Coming Soon" },
  // { title: "KickHr" },
  // { title: "Students" },
  // { title: "Pricing" },
];

export const mobile = [
  // { title: "Mobile App" },
  // { title: "Mobile App for IOS" },
  // { title: "Mobile App for Android" },
];

export const Resources = [
  // { title: "Help Center" },
  // { title: "Resume Examples" },
  // { title: "Cover Letter Examples" },
  // { title: "Resume Guides" },
  // { title: "Cover Letter Guides" },
  // { title: "Resignation Letter Guides" },
  // { title: "The Job Seeker's Guide eBook" },
  // { title: "Resume Assembly Manual eBook" },
  // { title: "Beyond Report Work Report" },
  // { title: "Our Community" },
  // { title: "Blog" },
];

export const designTemplates = [
  { title: "Resume Templates" },
  // { title: "Cover Letter Templates" },
  // { title: "Persnol Website Templates" },
  // { title: "ATS Resume Templates" },
  // { title: "Free Resume Templates" },
  // { title: "Simple Resume Templates" },
  // { title: "Professional Resume Templates" },
  // { title: "Creative Resume Templates" },
];

export const articles = [
  // { title: "How to Create a Resume on an iPhone" },
  // { title: "ISIC Knowledge Base" },
  // { title: "10 Best Resume Builder" },
  // { title: "6 Best AI Resume Writer" },
  // { title: "10 Best AI Cover Letter Generators" },
  // { title: "5 best ATS Resume Checker" },
  // { title: "Best Resume Apps for iPhone & Andriod" },
  // { title: "Best Career Tools" },
  // { title: "How to Write a Resume in 2025" },
  // { title: "How to Formate a Resume?" },
  // { title: "HR Statistics 2025" },
  // { title: "Kickresume vs Zety" },
  // { title: "Kickresume vs Rezi" },
  // { title: "Kickresume vs Enhance CV" },
  // { title: "Kickresume vs Teal" },
  // { title: "Recruiter Study" },
];

export const company = [
  // { title: "About Us" },
  // { title: "Contact Us" },
  // { title: "Tearms" },
  // { title: "Privacy Policy" },
  // { title: "Cookie Settings" },
  // { title: "Media / Press" },
  // { title: "Affiliates" },
  // { title: "Feedback" },
];

// Feature Section
export const featuresSection = [
  {
    title: "AI Resume Analyzer",
    description:
      "Upload your resume and get instant AI-powered analysis with actionable insights and automated cover letter generation.",
    icon: FileText,
    link: "/ai-resume-analyzer",
    gradient: true,
  },
  {
    title: "AI Resume Builder",
    description:
      "Choose from professional templates and let AI create a stunning resume tailored to your career goals.",
    icon: Brain,
    link: "/ai-resume-builder",
  },
  {
    title: "Job-Tailored Resume",
    description:
      "Paste any job description and get a perfectly optimized resume that matches the requirements.",
    icon: Briefcase,
    link: "/job-matcher",
  },
  {
    title: "Resume vs Job Analysis",
    description:
      "Compare your resume against specific job postings and get detailed compatibility insights.",
    icon: Target,
    link: "/resume-job-analysis",
  },
];

// Security Section data
export const securitySection = [
  {
    heading1: "",
    heading2: "Privacy-First, Always",
    content:
      "We follow global privacy atandards to make sure your persnal data stays protected and in your hands.",
    icon: (
      <MdOutlineSecurity size={60} color="#ff0000" className="text-red-600" />
    ),
  },
  {
    heading1: "",
    heading2: "Loyal to our customers",
    content:
      "We believe that being loyal to you, our customers, always pays off",
    icon: <MdOutlineSecurity size={60} className="text-green-600" />,
  },
  {
    heading1: "",
    heading2: "Tested Secured. Hacker-Approved",
    content:
      "Our systems undergo regular security audits and penetration testing by certified professionals. So whether you are uploading a resume or generating a cover letter - your information is in safe hands.",
    icon: <MdOutlineSecurity size={60} color="#2563eb" />,
  },
];

// Toolbox Section
export const toolbox = [
  {
    image: "/ai-resume-builder.svg",
    heading: "AI Resume Builder",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  },
  {
    image: "/ai-cover-letter.svg",
    heading: "AI Cover Letter Builder",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  },
  {
    image: "/professional-template.svg",
    heading: "Professional Templates",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  },
  {
    image: "/ai-resignation-letter.svg",
    heading: "AI Resignation Letter Generator Builder",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  },
  // {
  //   image: "/resume-example.svg",
  //   heading: "1500+ Resume Examples",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  // },
  {
    image: "/ats-resume-checker.svg",
    heading: "ATS Resume Checker",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  },
  // {
  //   image: "/website-builder.svg",
  //   heading: "Website Builder",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  // },
  // {
  //   image: "/proofreading.svg",
  //   heading: "Proofreading",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  // },
  // {
  //   image: "/career-map.svg",
  //   heading: "Career Map",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  // },
  // {
  //   image: "/ai-rewriter.svg",
  //   heading: "AI ReWriter",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  // },
];
