import Image from "next/image";
import { MdOutlineSecurity } from "react-icons/md";

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
        height={100}
        width={100}
        
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
];

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
];

export const company = [
  { title: "About Us" },
  { title: "Contact Us" },
  { title: "Tearms" },
  { title: "Privacy Policy" },
  { title: "Cookie Settings" },
  { title: "Media / Press" },
  { title: "Affiliates" },
  { title: "Feedback" },
];

// Feature Section
export const featureSection = [
  {
    heading: "Find out your resume score, see how you compare.",
    paragraph:
      "Our resume checker puts your resume up against other resumes from our database that were written by people who got hired at the world’s top companies.",
    points: [
      "Check how your resume score compares against the best",
      "Get a detailed resume review report",
      "Improve your CV with personalized tips",
    ],
    lastLine: "Check my resume score now",
    image: "/feature1.png",
  },
  {
    heading: "How do we calculate your resume score?",
    paragraph:
      "Our online resume checker grades your resume based on three different types of criteria. These were chosen based on what recruiters usually look for in a resume.",
    points: [
      "Does the resume contain everything it should?",
      "Are you using the space effectively?",
      "Any overused expressions? Action verbs?",
    ],
    lastLine: "Review my resume score now",
    image: "/feature2.png",
  },
  {
    heading: "Improve your resume’s quality with a single click.",
    paragraph:
      "Each resume metric comes with a set of suggested resume revision tips that will help you quickly improve your resume and its overall strength.",
    points: [
      "Accept suggested revisions with a single click",
      "Custom-tailored resume tips",
      "Increase your resume score & get hired faster",
    ],
    lastLine: "Make my resume better now",
    image: "/feature3.png",
  },
  {
    heading: "Get instant resume feedback from our AI recruiter.",
    paragraph:
      "Let our GPT-4-powered analyzer review your resume and go over its strongest and weakest points. The AI is meant to simulate a real recruiter’s resume feedback and will give you additional tips on how to make your CV stand out.",
    points: [
      "Detailed analysis of your CV’s strongest and weakest points",
      "Simulates resume feedback from a real recruiter with AI",
      "Get tailored feedback for each version of your resume",
    ],

    image: "/feature4.png",
  },
];



// Security Section data
export const securitySection = [
  {
    heading1: "Hosted in the",
    heading2: "European Union",
    content: "We’re based in the EU, which means that you’re being protected by the world’s toughest privacy and security law (GDPR). This gives you a complete control over your data and ensures maximum transparency.",
    icon: <MdOutlineSecurity size={60} color="#ff0000" className='text-red-600'/>
    
  },
  {
    heading1: "Trust",
    heading2: "Loyal to our customers",
    content: "We believe that being loyal to you, our customers, always pays off. Kickresume was built on your trust and we don’t want to lose it. We don’t share your data with third parties unless you tell us to.",
    icon: <MdOutlineSecurity size={60} className='text-green-600'/>
    
  },
  {
    heading1: "Bulletproof",
    heading2: "Pentested by ethical hackers",
    content: "Thanks to our partnership with a leading IT security company whose name is subject to confidentiality, we are able to do regular penetration testing of our infrastructure and ensure that your data stays safe with us.",
    icon: <MdOutlineSecurity size={60} color="#2563eb"/>
    
  }
]