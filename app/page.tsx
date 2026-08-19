import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Marquee from "./components/Marquee";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import AuroraBackground from "./components/AuroraBackground";

export default function Home() {
  return (
    <div className="noise">
      <AuroraBackground />
      <ScrollProgress />
      <Header />
      <main id="main" className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Marquee />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
