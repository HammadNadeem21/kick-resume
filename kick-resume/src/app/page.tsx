import Hero from "@/components/Hero";
import Features from "../components/Features";
import Security from "@/components/Security";
import FileUploaderSection from "@/components/FileUploaderSection";
import ToolBoxSection from "@/components/ToolBoxSection";
import QuestionSection from "@/components/QuestionSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Security />
      {/* <FileUploaderSection /> */}
      <ToolBoxSection />
      <QuestionSection />
    </>
  );
}
