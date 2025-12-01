import Link from "next/link";
import { ArrowRightIcon, BeakerIcon, ChartBarIcon, CpuChipIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Standard Nav would go here */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">ErgoSurg<span className="text-sky-600">AI</span></Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about">About</Link><Link href="/team">Team</Link><Link href="/research">Research</Link><Link href="/gallery">Gallery</Link><Link href="/reflection">Reflection</Link><Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full">Launch</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-20 pb-20 overflow-hidden">
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
          </div>
        </div>
      </section>

      {/* FEATURE GRID (NEW) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why ErgoSurgAI?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Traditional user testing is slow and expensive. Our heuristic engine allows you to iterate in seconds, not weeks.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<CpuChipIcon className="w-8 h-8 text-white"/>}
              color="bg-indigo-500"
              title="Predictive Physics"
              desc="Our engine calculates grip pressure (kPa) and wrist deviation angles in real-time based on anthropometric data."
            />
            <FeatureCard 
              icon={<ChartBarIcon className="w-8 h-8 text-white"/>}
              color="bg-sky-500"
              title="ISO-Standard Reporting"
              desc="Generate PDF-ready reports that map your tool design against ISO-9241 ergonomic standards."
            />
            <FeatureCard 
              icon={<ShieldCheckIcon className="w-8 h-8 text-white"/>}
              color="bg-emerald-500"
              title="Injury Prevention"
              desc="Identify 'Red Zones' in handle design that lead to Carpal Tunnel Syndrome before production."
            />
          </div>
        </div>
      </section>

      {/* TRUST / IMPACT (NEW) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="grid grid-cols-3 divide-x divide-slate-100">
              <div>
                <div className="text-4xl font-black text-slate-900 mb-1">45%</div>
                <div className="text-sm text-slate-500 font-medium">Reduced Prototyping Time</div>
              </div>
              <div>
                <div className="text-4xl font-black text-slate-900 mb-1">100+</div>
                <div className="text-sm text-slate-500 font-medium">Design Variables</div>
              </div>
              <div>
                <div className="text-4xl font-black text-slate-900 mb-1">0</div>
                <div className="text-sm text-slate-500 font-medium">Physical Waste</div>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER (NEW - Add this to the bottom of page.tsx) */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
             <span className="text-white font-bold text-lg">ErgoSurgAI</span>
             <p className="text-sm mt-1">Human-Computer Interaction • Semester 1, 2025</p>
           </div>
           <div className="flex gap-6 text-sm">
             <Link href="/team" className="hover:text-white transition">Team</Link>
             <Link href="/research" className="hover:text-white transition">Research</Link>
             <Link href="/prototypes" className="hover:text-white transition">Prototype</Link>
           </div>
           <div className="text-sm">
             © 2025 University Project.
           </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-component for cleanliness
function FeatureCard({ icon, color, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  )
}