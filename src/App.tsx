import { SmoothScroll } from "./lib/SmoothScroll";
import { useReveals } from "./lib/useReveals";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ScrollStage from "./components/ScrollStage";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Closing from "./components/Closing";
import Footer from "./components/Footer";

export default function App() {
  useReveals();
  return (
    <SmoothScroll>
      <Nav />
      <main id="top">
        <Hero />
        <ScrollStage />
        <Skills />
        <Projects />
        <Closing />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
