import Navbar from "@/components/Navbar";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function GalleryPage() {
  const milestones = [
    { 
      title: "Milestone 1: Paper Prototypes", 
      date: "Week 4", 
      desc: "Low-fidelity sketches focusing on layout. We established the 'Split View' (Viewer Left, Data Right) here.",
      tag: "Lo-Fi",
      color: "bg-slate-200"
    },
    { 
      title: "Milestone 2: Canvas Prototype", 
      date: "Week 8", 
      desc: "First digital iteration using HTML5 Canvas. It worked, but the feedback was 'batch-based' (click run -> wait). The heatmap was static noise.",
      tag: "Mid-Fi",
      color: "bg-indigo-100"
    },
    { 
      title: "Milestone 3: SVG Interactive", 
      date: "Week 12 (Final)", 
      desc: "The current version. Switched to SVG for crisp, scalable graphics. Implemented the 'Real-Time Matrix' and permanent heatmap gradients.",
      tag: "Hi-Fi",
      color: "bg-sky-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-12 text-center">Design Evolution</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
           {milestones.map((m, i) => (
             <div key={i} className="group">
                <div className={`aspect-[4/3] w-full rounded-2xl ${m.color} flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:shadow-md transition relative overflow-hidden`}>
                   <PhotoIcon className="w-16 h-16 text-slate-400 opacity-50"/>
                   {/* In real app, put <img src="..." /> here */}
                   <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm">{m.tag}</span>
                </div>
                <div className="px-2">
                   <div className="text-xs font-mono text-sky-600 mb-2">{m.date}</div>
                   <h3 className="font-bold text-xl text-slate-900 mb-3">{m.title}</h3>
                   <p className="text-slate-600 text-sm leading-relaxed">{m.desc}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Comparison Section */}
        <div className="mt-24 bg-slate-50 p-10 rounded-3xl border border-slate-200">
           <h2 className="text-2xl font-bold mb-8 text-center">Critical Design Changes</h2>
           <div className="grid md:grid-cols-2 gap-12">
              <div>
                 <h3 className="font-bold text-red-500 mb-2">Previous Version (Canvas)</h3>
                 <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                    <li>Result layout was a simple text list.</li>
                    <li>Controls looked like a standard web form.</li>
                    <li>Heatmap was random dots (poor system visibility).</li>
                 </ul>
              </div>
              <div>
                 <h3 className="font-bold text-green-600 mb-2">Final Version (SVG)</h3>
                 <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                    <li>Result layout is a <strong>Radar Chart</strong> (visualizing trade-offs).</li>
                    <li>Controls mimic an <strong>Industrial Control Deck</strong>.</li>
                    <li>Heatmap is a <strong>Dynamic Gradient</strong> reacting to slider movement.</li>
                 </ul>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}