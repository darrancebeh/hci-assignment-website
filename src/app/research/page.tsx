import Navbar from "@/components/Navbar";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Research & Iterative Process</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            From low-fidelity sketches to high-fidelity verification. A documentation of our user-centered design journey.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-16 space-y-24">
        
        {/* PHASE 1: INITIAL PROTOTYPE */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">1</span>
            <h2 className="text-3xl font-bold text-slate-800">Initial Paper Prototype</h2>
          </div>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Our initial concept validated the core user journey: <strong>Upload -&gt; Configure -&gt; Analyze -&gt; Refine</strong>. 
            The prototype was sketched on paper to allow for rapid modification. We defined two primary tasks for testing: 
            identifying ergonomic risks and refining the instrument using AI recommendations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <figure className="space-y-2">
              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <img src="/images/fig1.png" alt="Dashboard Sketch" className="w-full h-auto"/>
              </div>
              <figcaption className="text-xs text-slate-500 text-center italic">Fig 1: Initial Dashboard</figcaption>
            </figure>
            <figure className="space-y-2">
              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <img src="/images/fig2.png" alt="Upload Sketch" className="w-full h-auto"/>
              </div>
              <figcaption className="text-xs text-slate-500 text-center italic">Fig 2: Initial Upload Screen</figcaption>
            </figure>
            <figure className="space-y-2">
              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <img src="/images/fig3.png" alt="Simulation Sketch" className="w-full h-auto"/>
              </div>
              <figcaption className="text-xs text-slate-500 text-center italic">Fig 3: Simulation Configuration</figcaption>
            </figure>
          </div>
        </section>

        {/* PHASE 2: TESTING PROCESS */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">2</span>
            <h2 className="text-3xl font-bold text-slate-800">Testing Process</h2>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
            <h3 className="font-bold text-lg mb-4">Methodology</h3>
            <p className="text-slate-600 mb-6">
              We conducted a <strong>Heuristic Evaluation</strong> using Nielsen’s 10 principles, followed by <strong>Usability Testing</strong> with three participants. 
              Due to access constraints, we recruited Computer Science students as proxies for Tool Designers. While they lacked specific biomechanical knowledge, 
              their high technical literacy made them suitable for validating the software interaction flow.
            </p>
            <div className="grid grid-cols-3 gap-4">
               <img src="/images/fig4.png" alt="Testing Session 1" className="rounded-lg border border-slate-100"/>
               {/* Note: Assuming fig5 contains the testing photos collage as per your report */}
            </div>
            <p className="text-xs text-slate-400 mt-2 italic">Fig 4: Usability testing sessions conducted in-person.</p>
          </div>
        </section>

        {/* PHASE 3: RESULTS & FINDINGS */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">3</span>
            <h2 className="text-3xl font-bold text-slate-800">Critical Findings & Iteration</h2>
          </div>
          
          <div className="space-y-6">
            {/* Issue 1 */}
            <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
              <h3 className="font-bold text-red-700 text-lg mb-2">Issue 1: Invisible System Status (Severity: High)</h3>
              <p className="text-slate-700 mb-4">
                Participants were unsure if the simulation was processing or frozen after clicking &quot;Run&quot;. 
                This violated the <em>Visibility of System Status</em> heuristic.
              </p>
              
            </div>

            {/* Issue 2 */}
            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
              <h3 className="font-bold text-orange-700 text-lg mb-2">Issue 2: Upload Ambiguity (Severity: Medium)</h3>
              <p className="text-slate-700">
                The generic upload box confused users regarding file compatibility. 
                <strong><br/>Fix:</strong> We added explicit instruction text: <em>&quot;Suggested file types: .stl, .obj, .fbx, .step&quot;</em>.
              </p>
            </div>

            {/* Issue 3 */}
            <div className="border-l-4 border-sky-500 bg-sky-50 p-6 rounded-r-xl">
              <h3 className="font-bold text-sky-700 text-lg mb-2">Issue 3: Lack of Comparative Context</h3>
              <p className="text-slate-700 mb-4">
                Users struggled to quantify the improvement of their design changes.
                <strong><br/>Fix:</strong> We implemented a &quot;Before/After Comparison&quot; modal in the final prototype.
              </p>
              
            </div>
          </div>
        </section>

        {/* PHASE 4: FINAL DIGITAL MOCKUP */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">4</span>
            <h2 className="text-3xl font-bold text-slate-800">Final Digital Mockup</h2>
          </div>
          <p className="text-lg text-slate-600 mb-8">
            The final digital deliverable translates these findings into a high-fidelity React application. 
            We pivoted from a &quot;Human Hand&quot; visualization to a &quot;Performance Matrix&quot; (Radar Chart) to reduce visual clutter and provide clearer engineering data.
          </p>
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-lg">
             <img src="/images/fig5.png" alt="Final Digital Mockup" className="w-full h-auto"/>
          </div>
          <p className="text-sm text-slate-500 mt-2 text-center">Fig 5: The final simulation workspace featuring the Real-Time Matrix and Control Deck.</p>
        </section>

      </main>
    </div>
  );
}