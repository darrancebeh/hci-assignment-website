import Navbar from "@/components/Navbar";

export default function ReflectionPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Reflection & Impact</h1>
          
          <div className="prose prose-slate max-w-none">
            
            <h3 className="text-xl font-bold text-slate-800">Contribution to Human-Centered AI</h3>
            <p>
              ErgoSurgAI demonstrates that AI shouldn&apos;t just &quot;solve&quot; problems; it should <strong>augment human decision-making</strong>. 
              By providing the &quot;Matrix&quot; visualization, we don&apos;t just tell the designer the answer; we help them understand the <em>why</em>. 
              This builds trust between the user and the algorithm, a core tenet of Human-Centered AI.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8">Lessons from Iteration</h3>
            <p>
              The biggest lesson was that <strong>accuracy isn&apos;t enough; clarity matters more.</strong> 
              Our first prototype was technically accurate but confusing. It took the Paper Prototype phase to realize that designers think in terms of &quot;Controls&quot; vs &quot;Results,&quot; which led to the split-screen layout.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8">Future Work</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Haptic Feedback:</strong> Integrating VR gloves so designers can &quot;feel&quot; the pressure points physically.</li>
              <li><strong>Cost Analysis:</strong> Adding a module to estimate manufacturing costs based on the chosen material (Steel vs Titanium).</li>
            </ul>

          </div>
        </div>
      </main>
    </div>
  );
}