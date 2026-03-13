import Link from "next/link";
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#111111]">
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#8b857b] hover:text-[#111111] transition-colors"
        >
          ← Back
        </Link>
      </div>
      <About />
      <Footer />
    </main>
  );
}
