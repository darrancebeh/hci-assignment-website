"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { XMarkIcon, ArrowsPointingOutIcon, PhotoIcon } from "@heroicons/react/24/outline";

// --- TYPE DEFINITIONS ---
interface GalleryImage {
  src: string;
  title: string;
  desc: string;
}

interface GallerySectionProps {
  title: string;
  desc: string;
  badge: string;
  badgeColor: string;
  children: React.ReactNode;
}

interface GalleryCardProps {
  img: GalleryImage;
  onClick: () => void;
}

// --- DATA STRUCTURE ---
const galleryData = {
  initial: [
    { src: "images/g1.png", title: "Dashboard (Initial)", desc: "Original concept for project management." },
    { src: "images/g2.png", title: "Upload Screen", desc: "Basic dropzone without file guidance." },
    { src: "images/g3.png", title: "Simulation Config", desc: "Early parameter inputs before running sim." },
    { src: "images/g4.png", title: "Post-Simulation", desc: "Early parameter inputs before running sim." },
    { src: "images/g5.png", title: "AI Recommendations ", desc: "Early parameter inputs before running sim." },
    { src: "images/g6.png", title: "Report", desc: "Early parameter inputs before running sim." },
  ],
  final: [
    { src: "images/g7.png", title: "Dashboard (Refined)", desc: "Organized layout reducing visual clutter." },
    { src: "images/g8.png", title: "Loading State", desc: "Added to address 'Invisible System Status'." },
    { src: "images/g9.png", title: "Risk Analysis", desc: "Post-simulation view with initial risk score." },
    { src: "images/g10.png", title: "AI Recommendations", desc: "Visualizing the 'Apply' workflow." },
    { src: "images/g11.png", title: "Comparison Modal", desc: "The 'Before/After' concept requested by users." },
    { src: "images/g12.png", title: "Comparison Modal", desc: "The 'Before/After' concept requested by users." },
    { src: "images/g13.png", title: "Comparison Modal", desc: "The 'Before/After' concept requested by users." },
  ],
  digital: [
    { src: "images/g14.png", title: "Hi-Fi Dashboard", desc: "Final React implementation of project list." },
    { src: "images/g15.png", title: "Upload Interface", desc: "With explicit file type instructions (.stl/.obj)." },
    { src: "images/g16.png", title: "Process Feedback", desc: "Digital implementation of the loading bar." },
    { src: "images/g17.png", title: "Simulation Workspace", desc: "The core UI with SVG Tool & Radar Chart." },
    { src: "images/g18.png", title: "Optimized State", desc: "Visual feedback after applying AI fixes." },
    { src: "images/g19.png", title: "Ghost Comparison", desc: "Overlays original geometry for verification." },
    { src: "images/g20.png", title: "Technical Report", desc: "Automated PDF generation view." },
  ]
};

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState<{src: string, title: string, desc: string} | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Design Artifacts</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A comprehensive archive of our design journey, documenting every interface screen from low-fidelity sketches to the final high-fidelity product.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        
        {/* SECTION 1: INITIAL PAPER PROTOTYPE */}
        <GallerySection 
          title="Phase 1: Initial Paper Prototype" 
          desc="The first iteration focused on validating the core user journey. These sketches were used in our initial Heuristic Evaluation."
          badge="Low-Fidelity"
          badgeColor="bg-slate-200 text-slate-700"
        >
          {galleryData.initial.map((img, i) => (
            <GalleryCard key={i} img={img} onClick={() => setSelectedImg(img)} />
          ))}
        </GallerySection>

        {/* SECTION 2: FINAL PAPER PROTOTYPE */}
        <GallerySection 
          title="Phase 2: Final Paper Prototype" 
          desc="Refined sketches incorporating feedback from Usability Testing. Key additions included the Loading State and Comparison Modal to fix visibility issues."
          badge="Mid-Fidelity"
          badgeColor="bg-indigo-100 text-indigo-700"
        >
          {galleryData.final.map((img, i) => (
            <GalleryCard key={i} img={img} onClick={() => setSelectedImg(img)} />
          ))}
        </GallerySection>

        {/* SECTION 3: DIGITAL MOCKUP */}
        <GallerySection 
          title="Phase 3: Digital Mockup (Final)" 
          desc="The fully interactive React application. We pivoted to a 'Performance Matrix' visualization and implemented a 'Ghost Overlay' for precise manufacturing verification."
          badge="High-Fidelity"
          badgeColor="bg-emerald-100 text-emerald-700"
        >
          {galleryData.digital.map((img, i) => (
            <GalleryCard key={i} img={img} onClick={() => setSelectedImg(img)} />
          ))}
        </GallerySection>

      </main>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImg(null)}
        >
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
             {/* Image Container */}
             <div className="relative bg-black rounded-t-lg overflow-hidden flex-1 flex items-center justify-center min-h-[400px]">
                <img src={selectedImg.src} alt={selectedImg.title} className="max-w-full max-h-[80vh] object-contain"/>
                <button 
                  onClick={() => setSelectedImg(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition"
                >
                  <XMarkIcon className="w-6 h-6"/>
                </button>
             </div>
             {/* Caption */}
             <div className="bg-white p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-slate-900">{selectedImg.title}</h3>
                <p className="text-slate-600 mt-1">{selectedImg.desc}</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function GallerySection({ title, desc, badge, badgeColor, children }: GallerySectionProps) {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>{badge}</span>
          </div>
          <p className="text-slate-500 max-w-3xl">{desc}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  )
}

function GalleryCard({ img, onClick }: GalleryCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
        {/* Placeholder Icon if image fails, but mainly displays image */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
           <PhotoIcon className="w-12 h-12"/>
        </div>
        <img 
          src={img.src} 
          alt={img.title} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
           <ArrowsPointingOutIcon className="w-8 h-8 text-white drop-shadow-md"/>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-sm">{img.title}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{img.desc}</p>
      </div>
    </div>
  )
}