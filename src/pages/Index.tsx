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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Demos />
      <Projects />
      <Education />
      <CertificatesSection />
      <Skills />
      <Technologies />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;