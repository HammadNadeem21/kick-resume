import Hero from "@/components/Hero";
import Features from "../components/Features";
import Security from "@/components/Security";
import FileUploaderSection from "@/components/FileUploaderSection";
import ToolBoxSection from "@/components/ToolBoxSection";


export default function Home() {
  return (
    <div>
      <Hero/>
      <Features/>
      <Security/>
      <FileUploaderSection/>
      <ToolBoxSection/>
    </div>
  );
}
