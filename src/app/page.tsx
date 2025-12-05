import Navbar from "@/components/Navbar"; // Adjust path if needed
import Link from "next/link";
import { ArrowRightIcon, BeakerIcon, PlayCircleIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-sky-100">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-600 mb-6 border border-sky-100">
            HCI Assignment • Practical Group 10 | Group 4
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Refining Surgical Instruments with
AI-Driven Ergonomics
<br/>
          </h1> 
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Empowering tool designers to identify ergonomic risks before production. Reduce surgeon fatigue, minimize injury, and enhance surgical precision through simulation.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/prototypes" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-xl hover:-translate-y-1">
              Try the Simulator <BeakerIcon className="w-5 h-5"/>
            </Link>
            <Link href="#media" className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl text-lg font-medium transition">
              Watch Video <PlayCircleIcon className="w-5 h-5"/>
            </Link>
          </div>
        </div>
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* ABSTRACT */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Project Abstract</h2>
          <div className="prose prose-lg text-slate-700">
            <p>
              This project is designed for tool designers to refine surgical instruments from ergonomic issues before they are used by surgeons. 
              Surgeons often experience physical strain in hands and wrist during long surgical procedures. A significant number of surgeons face ergonomic issues due to inadequately designed instruments—such as <span className="font-bold text-slate-900">poor grip design and improper weight distribution</span>.
            </p>
            <p>
              To solve this, the project integrates <span className="font-bold text-sky-600">AI-driven simulation</span> to identify ergonomic issues. 
              Our iterative process involved user research with surgeons, heuristic testing, and usability testing with designers. 
              The initial prototype was found to be nearly complete, allowing users to effectively navigate it while imagining themselves as tool designers. 
              Feedback was provided and used to refine the prototype (moving from static lists to real-time matrices) to ensure it aligns with real-world design needs.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECT MEDIA (POSTER & VIDEO) */}
      <section id="media" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Project Showcase</h2>
            <p className="text-slate-500">Visual summary and demonstration of the ErgoSurgAI system.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* VIDEO SECTION */}
            <div className="space-y-4">
              <div className="aspect-video bg-slate-900 rounded-2xl shadow-2xl overflow-hidden relative group">
                {/* Replace src with your actual video link/file */}
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?mute=1" 
                  title="Project Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-xl font-bold text-slate-900">System Walkthrough</h3>
              <p className="text-slate-600 text-sm">A 2-minute demonstration of the Upload, Simulation, and AI Refinement workflows.</p>
            </div>

            {/* POSTER SECTION */}
            <div className="space-y-4">
              <div className="aspect-[1/1.414] bg-slate-100 rounded-2xl shadow-xl border border-slate-200 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:ring-4 ring-sky-500/20 transition">
                 {/* Replace with <img src="/poster.png" /> */}
                 <DocumentChartBarIcon className="w-24 h-24 text-slate-300"/>
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition flex items-center justify-center">
                    <span className="bg-white px-4 py-2 rounded-full shadow-lg font-bold text-sm opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">View A0 Poster</span>
                 </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Research Poster (A0)</h3>
              <p className="text-slate-600 text-sm">High-resolution breakdown of our methodology, data flow, and final results.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}