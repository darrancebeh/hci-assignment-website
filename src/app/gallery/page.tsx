import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function GalleryPage() {
  // In a real app, replace these with actual <img src> tags
  const milestones = [
    { title: "Initial Sketch", date: "Week 2", desc: "Low-fidelity paper prototype showing the Dashboard layout.", color: "bg-slate-200" },
    { title: "Wireframe v1", date: "Week 4", desc: "Digital wireframe focusing on the navigation structure.", color: "bg-slate-300" },
    { title: "Interaction Model", date: "Week 6", desc: "Defining the slider inputs and svg response logic.", color: "bg-indigo-100" },
    { title: "High-Fidelity Mockup", date: "Week 8", desc: "Applying the 'Clinical Precision' visual identity.", color: "bg-sky-100" },
    { title: "Final Prototype", date: "Week 12", desc: "Fully interactive React application with AI simulation.", color: "bg-sky-500" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">ErgoSurg<span className="text-sky-600">AI</span></Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about">About</Link><Link href="/team">Team</Link><Link href="/research">Research</Link><Link href="/gallery" className="text-sky-600">Gallery</Link><Link href="/reflection">Reflection</Link><Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full">Launch</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4 text-center">Design Milestones</h1>
        <p className="text-center text-slate-500 mb-16">The visual evolution of ErgoSurgAI from concept to code.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {milestones.map((m, i) => (
             <div key={i} className="group relative">
                <div className={`aspect-video w-full rounded-2xl ${m.color} flex items-center justify-center mb-4 shadow-sm border border-slate-100 group-hover:shadow-md transition`}>
                   <PhotoIcon className="w-12 h-12 text-slate-400 opacity-50"/>
                   {/* <img src="/path-to-image.jpg" className="w-full h-full object-cover rounded-2xl"/> */}
                </div>
                <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-bold text-slate-900">{m.title}</h3>
                     <p className="text-sm text-slate-500 mt-1">{m.desc}</p>
                   </div>
                   <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{m.date}</span>
                </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}