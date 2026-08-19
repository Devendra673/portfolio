import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Marquee from "./components/Marquee";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import KineticStatement from "./components/KineticStatement";
import SkillsConstellation from "./components/SkillsConstellation";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import AuroraBackground from "./components/AuroraBackground";
import BootSequence from "./components/BootSequence";
import CursorRing from "./components/CursorRing";
import CommandPalette from "./components/CommandPalette";

export default function Home() {
  return (
    <div className="noise">
      <BootSequence />
      <AuroraBackground />
      <CursorRing />
      <ScrollProgress />
      <CommandPalette />
      <Header />
      <main id="main" className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Marquee />
        <Experience />
        <Projects />
        <KineticStatement />
        <SkillsConstellation />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
