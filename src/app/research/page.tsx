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
            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
              <h3 className="font-bold text-orange-700 text-lg mb-2">1. Ambiguity in File Upload Requirements (Severity: 2)</h3>
              <p className="text-slate-700 mb-2">
                In the initial prototype, the upload box was generic. Participants were unsure which 3D file formats were compatible, asking &quot;What files does this accept?&quot;
              </p>
              <p className="text-slate-700">
                <strong>Fix:</strong> We added explicit instructional text to the upload area specifying <em>&quot;Suggested file types: .stl, .obj, .fbx, .step&quot;</em>.
              </p>
            </div>

            {/* Issue 2 */}
            <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
              <h3 className="font-bold text-red-700 text-lg mb-2">2. Invisible System Status (Severity: 3)</h3>
              <p className="text-slate-700 mb-2">
                During the &quot;Simulation&quot; phase, participants were unsure if the system was frozen or actually working, as there was no feedback after clicking &quot;Run.&quot;
              </p>
              <p className="text-slate-700">
                <strong>Fix:</strong> We introduced a real-time loading and analysis progress indicator to adhere to the &quot;Visibility of System Status&quot; heuristic.
              </p>
            </div>

            {/* Issue 3 */}
            <div className="border-l-4 border-rose-500 bg-rose-50 p-6 rounded-r-xl">
              <h3 className="font-bold text-rose-700 text-lg mb-2">3. Cluttered Information (Severity: 4)</h3>
              <p className="text-slate-700 mb-2">
                The initial report and dashboard were text-heavy and disorganized, making it difficult to scan for &quot;High Risk&quot; items quickly.
              </p>
              <p className="text-slate-700">
                <strong>Fix:</strong> We reorganized the information hierarchy to group related data (e.g., separating &quot;Identified Issues&quot; from &quot;Usage Guide&quot;).
              </p>
            </div>

            {/* Issue 4 */}
            <div className="border-l-4 border-amber-500 bg-amber-50 p-6 rounded-r-xl">
              <h3 className="font-bold text-amber-700 text-lg mb-2">4. Lack of Visual Context (Severity: 3)</h3>
              <p className="text-slate-700 mb-2">
                Users struggled to visualize where the ergonomic issues were occurring on the tool.
              </p>
              <p className="text-slate-700">
                <strong>Fix:</strong> We proposed adding a human model visualization to the paper prototype to mimic real ergonomic issues.
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