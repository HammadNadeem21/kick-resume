import Hero from "@/components/Hero";
import Features from "../components/Features";
import Security from "@/components/Security";
// import FileUploaderSection from "@/components/FileUploaderSection";
import ToolBoxSection from "@/components/ToolBoxSection";
import QuestionSection from "@/components/QuestionSection";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <div className="">
      {/* <Hero /> */}
      <LandingPage />
      <Features />
      <Security />
      {/* <FileUploaderSection /> */}
      <ToolBoxSection />
      {/* <QuestionSection /> */}
    </div>
  );
}
