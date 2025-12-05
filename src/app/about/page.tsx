import Navbar from "@/components/Navbar";
import { ExclamationTriangleIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        {/* Problem */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg"><ExclamationTriangleIcon className="w-6 h-6"/></div>
            <h2 className="text-3xl font-bold">The Ergonomic Crisis</h2>
          </div>
          <div className="prose prose-lg text-slate-600">
            <p>
              Surgeons are the athletes of the medical world, yet their equipment often fails them. 
              Studies show that <strong>80% of surgeons</strong> experience physical discomfort during their careers, with many facing career-ending Repetitive Strain Injuries (RSI).
            </p>
            <p>
              The root cause? <strong>Static Tool Design.</strong> Surgical instruments are often designed as &quot;one-size-fits-all,&quot; ignoring the vast anthropometric differences between a 5th-percentile female hand and a 95th-percentile male hand.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="bg-slate-900 text-white p-12 rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-sky-500/20 text-sky-400 rounded-lg"><LightBulbIcon className="w-6 h-6"/></div>
              <h2 className="text-3xl font-bold">The ErgoSurgAI Solution</h2>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              We shift the paradigm from &quot;Physical Prototyping&quot; to &quot;Predictive Digital Analysis.&quot;
              Our platform uses a rule-based AI engine to simulate the biomechanical interaction between the tool and the hand.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                 <h3 className="font-bold text-white mb-2">Real-Time Matrix</h3>
                 <p className="text-sm text-slate-300">Visualizes the trade-off between Comfort, Precision, and Stability instantly.</p>
               </div>
               <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                 <h3 className="font-bold text-white mb-2">Heatmap Gradient</h3>
                 <p className="text-sm text-slate-300">A continuous visualization of contact pressure (kPa) to identify &quot;Hotspots&quot; before they cause pain.</p>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}