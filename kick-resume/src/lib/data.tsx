import Image from "next/image";
import { MdOutlineSecurity } from "react-icons/md";
import {
  Brain,
  FileText,
  Briefcase,
  Target,
  Rocket,
  Zap,
  Crown,
} from "lucide-react";

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

  {
    image: "/ats-resume-checker.svg",
    heading: "ATS Resume Checker",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit expedita atque facilis impedit.",
  },
];

export const pricingPlans = [
  // {
  //   name: "Free",
  //   description: "Perfect for getting started with basic resume optimization",
  //   price: { monthly: 0, annual: 0 },
  //   icon: Zap,
  //   badge: null,
  //   features: [
  //     "3 resume analyses per month",
  //     "Basic resume builder",
  //     "Standard templates",
  //     "Email support",
  //     "Basic job matching",
  //   ],
  //   limitations: ["Limited AI insights", "Watermarked downloads"],
  //   cta: "Get Started Free",
  //   popular: false,
  // },
  {
    name: "Student (free)",
    description: "Ideal for active job seekers and career changers",
    price: { monthly: 19, annual: 15 },
    icon: Crown,
    // badge: "Most Popular",
    features: [
      "Unlimited resume analyses",
      "Advanced AI insights",
      "Premium templates",
      "Cover letter generation",
      "Advanced job matching",
      "Priority support",
      "Resume optimization tips",
      "ATS compatibility check",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Pro",
    description: "For teams and organizations scaling their hiring",
    price: { monthly: 49, annual: 39 },
    icon: Rocket,
    badge: "Best Value",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Bulk resume processing",
      "Custom templates",
      "API access",
      "Dedicated account manager",
      "Advanced analytics",
      "White-label options",
      // "Custom integrations",
      // "24/7 phone support",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

export const reviews = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    content:
      "AI TalentTune helped me land my dream job at Google. The AI insights were incredibly accurate!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    content:
      "The job matching feature is amazing. It saved me hours of searching and applying.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Marketing Director",
    company: "Meta",
    content:
      "Professional templates and AI optimization gave me the edge I needed in competitive market.",
    rating: 5,
  },
];
