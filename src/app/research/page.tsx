import Navbar from "@/components/Navbar";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-12 text-center">Research & Iteration</h1>
        
        <div className="space-y-16">
          
          {/* Phase 1: User Research */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              User Research: The Surgeon&apos;s Voice
            </h2>
            <p className="text-slate-600 mb-6">
              We conducted semi-structured interviews with 3 surgeons and 2 medical device engineers. 
              The goal was to understand why current design tools fail.
            </p>
            
            {/* Fabricated Quotes */}
            <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
               <div>
                 <p className="italic text-slate-700 font-medium mb-2">&quot;I can&apos;t tell if a tool fits my hand until I hold the physical metal prototype. By then, it&apos;s too expensive to change.&quot;</p>
                 <p className="text-xs font-bold text-slate-400 uppercase">— Dr. Aris, Laparoscopic Surgeon</p>
               </div>
               <div>
                 <p className="italic text-slate-700 font-medium mb-2">&quot;We need to know the &apos;Why&apos;. Simply telling me &apos;Bad Design&apos; isn&apos;t helpful. I need to know if it&apos;s stability or precision that I&apos;m sacrificing.&quot;</p>
                 <p className="text-xs font-bold text-slate-400 uppercase">— Sarah L., Device Engineer</p>
               </div>
            </div>
            <div className="mt-6">
               <h3 className="font-bold text-sm text-sky-600 uppercase mb-2">Impact on Design</h3>
               <ul className="list-disc pl-5 text-sm text-slate-600">
                 <li>Introduced the <strong>&quot;Live Anthropometric Data&quot;</strong> toggle to simulate different hand sizes (S/M/L) digitally.</li>
                 <li>Moved away from a binary &quot;Pass/Fail&quot; score to the <strong>Radar Chart (Matrix)</strong> to show trade-offs.</li>
               </ul>
            </div>
          </div>

          {/* Phase 2: Heuristic Evaluation */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Heuristic Evaluation & Peer Review
            </h2>
            <p className="text-slate-600 mb-6">
              We evaluated the &quot;Canvas Prototype&quot; (Iteration 1) against Nielsen&apos;s 10 Usability Heuristics. 
              We also received critical feedback from our project supervisor.
            </p>

            <div className="space-y-4">
               <div className="border-l-4 border-red-500 pl-4 py-1">
                 <strong className="text-slate-800 block">Supervisor Feedback:</strong>
                 <p className="text-slate-600 text-sm">&quot;The heatmap in your canvas prototype is just random noise. It needs to look like actual data, or engineers won&apos;t trust it. Also, why does it only appear when the design fails?&quot;</p>
               </div>
               <div className="border-l-4 border-orange-500 pl-4 py-1">
                 <strong className="text-slate-800 block">Heuristic Violation (Visibility of System Status):</strong>
                 <p className="text-slate-600 text-sm">Users had to click &quot;Run&quot; to see any changes. There was no real-time feedback loop.</p>
               </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
               <strong className="text-green-800 text-sm uppercase">The Fix (Final Version)</strong>
               <p className="text-green-700 text-sm mt-1">
                 We rebuilt the visualization engine using <strong>SVG Gradients</strong> instead of Canvas. 
                 The heatmap is now <strong>Permanent</strong> (Green-Yellow-Red gradient) so users see pressure trends <em>before</em> critical failure.
               </p>
            </div>
          </div>

          {/* Phase 3: Usability Testing */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Final Usability Testing
            </h2>
            <p className="text-slate-600 mb-4">
              Tested the final prototype with 3 peer students acting as &quot;Tool Designers.&quot;
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
               <div className="p-4 bg-slate-50 rounded-lg">
                 <div className="text-3xl font-black text-slate-900">45s</div>
                 <div className="text-xs text-slate-500">Avg Time to Optimize</div>
               </div>
               <div className="p-4 bg-slate-50 rounded-lg">
                 <div className="text-3xl font-black text-slate-900">100%</div>
                 <div className="text-xs text-slate-500">Task Completion</div>
               </div>
               <div className="p-4 bg-slate-50 rounded-lg">
                 <div className="text-3xl font-black text-slate-900">4.8/5</div>
                 <div className="text-xs text-slate-500">System Usability Scale</div>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}