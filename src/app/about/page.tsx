import Navbar from "@/components/Navbar";
import { ExclamationTriangleIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Problem & Solution Overview</h1>
          <p className="text-lg text-slate-600">Understanding the ergonomic crisis and our digital solution</p>
        </div>

        {/* Problem */}
        <section className="mb-12">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg"><ExclamationTriangleIcon className="w-6 h-6"/></div>
              <h2 className="text-3xl font-bold text-slate-900">The Problem</h2>
            </div>
            <div className="prose prose-lg text-slate-700">
              <p>
                Work-Related Musculoskeletal Disorders (WMSDs) represent a systemic crisis in modern healthcare, affecting <strong>35% to 60% of surgeons</strong>. This occupational hazard is driven largely by reliance on instruments with poor micro-ergonomics, such as traditional laparoscopic pinch-grip handles known to induce hand paraesthesia. While the industry uses risk standards like RULA and REBA, these are <em>reactive</em> interventions that train surgeons to adapt to poor tools rather than addressing root design flaws.
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="bg-slate-900 text-white p-12 rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-sky-500/20 text-sky-400 rounded-lg"><LightBulbIcon className="w-6 h-6"/></div>
              <h2 className="text-3xl font-bold">The Solution</h2>
            </div>
            <div className="prose prose-lg text-slate-300">
              <p>
                To bridge the gap between reactive training and the prohibitive costs of late-stage physical prototyping, we propose <strong>ErgoSurgAI</strong>. This predictive design evaluation platform empowers medical tool engineers to upload 3D CAD models and simulate interactions against virtual hand populations. By providing quantitative risk assessments, visualizing pressure points via heatmaps, and offering generative AI-driven geometry recommendations, ErgoSurgAI shifts the ergonomic workflow from physical trial-and-error to <strong>proactive digital validation</strong>.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
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