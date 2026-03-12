import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import BuildLog from "./components/BuildLog";
import FundingCTA from "./components/FundingCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Projects />
      <BuildLog />
      <FundingCTA />
      <Footer />
    </main>
  );
}
