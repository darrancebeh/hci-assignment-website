"use client"; // Needs client for the modal interaction

import { useState } from "react";
import Link from "next/link";
import { PhotoIcon, XMarkIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

// Mock Data moved outside component
const milestones = [
  { id: 1, title: "Initial Sketching", date: "Week 2", desc: "Low-fidelity paper prototypes focusing on the layout hierarchy.", longDesc: "We started with pen and paper to rapidly iterate on the dashboard layout. We realized early on that the 'Risk Score' needed to be prominent.", color: "bg-slate-200" },
  { id: 2, title: "Wireframe Iteration", date: "Week 4", desc: "Digital wireframes defining the navigation structure.", longDesc: "Moving to Figma, we defined the user flow from Upload -> Simulation -> Report. We stripped away unnecessary menus to focus on the task.", color: "bg-slate-300" },
  { id: 3, title: "Interaction Logic", date: "Week 6", desc: "Defining the slider inputs and svg response logic.", longDesc: "We mapped the mathematical relationship between handle diameter and pressure (kPa). This logic formed the basis of our React 'Physics Engine'.", color: "bg-indigo-100" },
  { id: 4, title: "High-Fidelity UI", date: "Week 8", desc: "Applying the 'Clinical Precision' visual identity.", longDesc: "We chose a 'Medical Blue' and 'Slate' palette to evoke cleanliness, precision, and trust—essential for medical software.", color: "bg-sky-100" },
  { id: 5, title: "Final Integration", date: "Week 12", desc: "Fully interactive React application with AI simulation.", longDesc: "The final build integrates the physics engine, the SVG visualizer, and the report generator into a cohesive Next.js app.", color: "bg-sky-500", highlight: true },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof milestones[0] | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- Standard Nav (Condensed for brevity) --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">ErgoSurg<span className="text-sky-600">AI</span></Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about">About</Link><Link href="/team">Team</Link><Link href="/research">Research</Link><Link href="/gallery" className="text-sky-600">Gallery</Link><Link href="/reflection">Reflection</Link><Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full">Launch</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Design Artifacts</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Explore the evolution of ErgoSurgAI. Click on any milestone to view details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {milestones.map((m) => (
             <div 
               key={m.id} 
               onClick={() => setSelectedImage(m)}
               className="group cursor-pointer relative"
             >
                {/* Image Placeholder */}
                <div className={`aspect-video w-full rounded-2xl ${m.color} flex items-center justify-center mb-4 shadow-sm border border-slate-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}>
                   <PhotoIcon className={`w-12 h-12 text-slate-400 opacity-50 transition duration-500 group-hover:scale-110 ${m.highlight ? 'text-white opacity-80' : ''}`}/>
                   
                   {/* Overlay Icon */}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ArrowsPointingOutIcon className="w-8 h-8 text-white drop-shadow-md"/>
                   </div>
                </div>
                
                <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition">{m.title}</h3>
                     <p className="text-sm text-slate-500 mt-1 line-clamp-2">{m.desc}</p>
                   </div>
                   <span className="text-xs font-mono bg-slate-50 px-2 py-1 rounded text-slate-500 border border-slate-100">{m.date}</span>
                </div>
             </div>
           ))}
        </div>
      </main>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedImage(null)}>
           <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition z-10">
                <XMarkIcon className="w-6 h-6 text-slate-900"/>
              </button>

              <div className="grid md:grid-cols-2">
                 {/* Visual Side */}
                 <div className={`${selectedImage.color} min-h-[300px] flex items-center justify-center`}>
                    <PhotoIcon className="w-24 h-24 text-slate-900/20"/>
                 </div>
                 
                 {/* Content Side */}
                 <div className="p-10 flex flex-col justify-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{selectedImage.date}</div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{selectedImage.title}</h2>
                    <p className="text-slate-600 leading-relaxed text-lg mb-8">
                      {selectedImage.longDesc}
                    </p>
                    
                    <div className="flex gap-4">
                       <button onClick={() => setSelectedImage(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-lg font-bold transition">
                         Close
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}