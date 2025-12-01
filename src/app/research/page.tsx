import Link from "next/link";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">ErgoSurg<span className="text-sky-600">AI</span></Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about">About</Link><Link href="/team">Team</Link><Link href="/research" className="text-sky-600">Research</Link><Link href="/gallery">Gallery</Link><Link href="/reflection">Reflection</Link><Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full">Launch</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-12 text-center">Research Methodology</h1>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          
          {/* Phase 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-sky-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              1
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-2 text-slate-800">User Research</h3>
              <p className="text-slate-600 text-sm">
                Conducted semi-structured interviews with 5 surgeons to identify common pain points.
                <br/><br/>
                <strong>Key Finding:</strong> "Power Grip" instruments (like graspers) cause the most fatigue when the handle diameter is too small for the user's hand size.
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-sky-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              2
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-2 text-slate-800">Heuristic Evaluation</h3>
              <p className="text-slate-600 text-sm">
                Evaluated the initial prototype against Nielsen's 10 Usability Heuristics.
                <br/><br/>
                <strong>Issue Found:</strong> "Visibility of System Status" was poor—users didn't know if the simulation was running or idle.
                <br/>
                <strong>Fix:</strong> Added a console log and progress bars.
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-sky-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              3
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-2 text-slate-800">Usability Testing</h3>
              <p className="text-slate-600 text-sm">
                Tested the high-fidelity prototype with 3 users simulating the role of "Tool Designers."
                <br/><br/>
                <strong>Outcome:</strong> Users completed the "Optimization Task" in avg 45 seconds. The "AI Solver" button reduced cognitive load significantly.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}