import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRightIcon, BeakerIcon, PlayCircleIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-sky-100">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-600 mb-6 border border-sky-100">
            HCI Project 2025 • Group 4-10
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Surgical Precision.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
              Designed by AI.
            </span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A predictive biomechanical simulation framework for medical device engineering.
            Optimizing surgical tools before physical production.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/prototypes" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-xl hover:-translate-y-1">
              Launch Simulator <BeakerIcon className="w-5 h-5"/>
            </Link>
            <Link href="#abstract" className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl text-lg font-medium transition">
              Read Abstract <ArrowRightIcon className="w-5 h-5"/>
            </Link>
          </div>
        </div>
        
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* ABSTRACT (Problem & Solution Overview) */}
      <section id="abstract" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Project Overview</h2>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">Problem & Solution</h3>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 prose prose-lg text-slate-700 leading-relaxed">
            <p>
              <strong>The Problem:</strong> Work-Related Musculoskeletal Disorders (WMSDs) represent a systemic crisis in modern healthcare, affecting <strong>35% to 60% of surgeons</strong>. This occupational hazard is driven largely by reliance on instruments with poor micro-ergonomics, such as traditional laparoscopic pinch-grip handles known to induce hand paraesthesia. While the industry uses risk standards like RULA and REBA, these are <em>reactive</em> interventions that train surgeons to adapt to poor tools rather than addressing root design flaws.
            </p>
            <hr className="my-6 border-slate-100"/>
            <p>
              <strong>The Solution:</strong> To bridge the gap between reactive training and the prohibitive costs of late-stage physical prototyping, we propose <strong>ErgoSurgAI</strong>. This predictive design evaluation platform empowers medical tool engineers to upload 3D CAD models and simulate interactions against virtual hand populations. By providing quantitative risk assessments, visualizing pressure points via heatmaps, and offering generative AI-driven geometry recommendations, ErgoSurgAI shifts the ergonomic workflow from physical trial-and-error to <strong>proactive digital validation</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* MEDIA SHOWCASE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Project Deliverables</h2>
            <p className="text-slate-500">Visual summary and demonstration of the ErgoSurgAI system.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Video */}
            <div className="space-y-4">
              <div className="aspect-video bg-slate-900 rounded-2xl shadow-2xl overflow-hidden relative group">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/6cKWT9kvE70" 
                  title="Project Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-xl font-bold text-slate-900">System Walkthrough (Video)</h3>
              <p className="text-slate-600 text-sm">A comprehensive demonstration of the Upload, Simulation, and AI Refinement workflows.</p>
            </div>

            {/* Poster */}
            <div className="space-y-4">
              <div className="aspect-[1/1.414] bg-slate-100 rounded-2xl shadow-xl border border-slate-200 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:ring-4 ring-sky-500/20 transition">
                 {/* POSTER IMAGE */}
                 <img src="images/poster.png" alt="A0 Project Poster" className="w-full h-full object-cover"/>
                 
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition flex items-center justify-center">
                    <span className="bg-white px-4 py-2 rounded-full shadow-lg font-bold text-sm opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0 text-slate-900">View A0 Poster</span>
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