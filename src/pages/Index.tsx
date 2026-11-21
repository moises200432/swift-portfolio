import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Demos from "@/components/Demos";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import CertificatesSection from "@/components/certificates/CertificatesSection";
import Skills from "@/components/Skills";
import Technologies from "@/components/Technologies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Demos />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <CertificatesSection />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Technologies />
      <SectionDivider />
      <Contact />
      <SectionDivider />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
