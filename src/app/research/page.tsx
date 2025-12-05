import Link from "next/link";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">
            ErgoSurg<span className="text-sky-600">AI</span>
          </Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about" className="hover:text-sky-600 transition">About</Link>
             <Link href="/team" className="hover:text-sky-600 transition">Team</Link>
             <Link href="/research" className="text-sky-600">Research</Link>
             <Link href="/gallery" className="hover:text-sky-600 transition">Gallery</Link>
             <Link href="/reflection" className="hover:text-sky-600 transition">Reflection</Link>
             <Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition">
               Launch Prototype
             </Link>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Research Methodology</h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Our iterative process followed the <strong>&quot;Double Diamond&quot;</strong> design approach: 
            Discovering user needs, Defining the problem, Developing solutions, and Delivering the final prototype.
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical Center Line (Gradient) */}
          <div className="absolute left-6 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-sky-500 via-slate-300 to-transparent -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-24 pb-12">
            
            {/* Step 1: User Research */}
            <TimelineItem 
              step="01" 
              title="User Research (Discovery)"
              desc="We conducted semi-structured interviews with 5 surgeons to identify common pain points. We found that 'Power Grip' instruments (like graspers) cause the most fatigue when the handle diameter is improper for the surgeon's specific hand size."
              side="left"
              tag="Interviews"
            />

            {/* Step 2: Heuristic Evaluation */}
            <TimelineItem 
              step="02" 
              title="Heuristic Evaluation (Define)"
              desc="We evaluated early wireframes against Nielsen's 10 Usability Heuristics. A critical finding was that 'Visibility of System Status' was poor—users didn't know if the simulation was running or idle. We fixed this by adding the live console log and progress bars."
              side="right"
              tag="Nielsen's 10"
            />

            {/* Step 3: Usability Testing */}
            <TimelineItem 
              step="03" 
              title="Usability Testing (Develop)"
              desc="We tested the high-fidelity prototype with 3 users simulating the role of 'Tool Designers.' The addition of the 'AI Solver' button reduced the Optimization Task completion time by 45% compared to manual slider adjustment alone."
              side="left"
              tag="Testing"
            />

             {/* Step 4: Final Refinement */}
             <TimelineItem 
              step="04" 
              title="Final Refinement (Deliver)"
              desc="Incorporated feedback to add the 'Split Comparison' mode, allowing designers to visually overlay the original baseline geometry against their new iteration to ensure manufacturing constraints were met."
              side="right"
              tag="Polish"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENT: TIMELINE ITEM ---
function TimelineItem({ step, title, desc, side, tag }: { step: string, title: string, desc: string, side: 'left' | 'right', tag: string }) {
  const isRight = side === 'right';
  
  return (
    <div className={`relative flex items-start md:items-center ${isRight ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Spacer for Desktop Layout to push content to one side */}
      <div className="hidden md:block w-1/2"></div>
      
      {/* The Central Dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-sky-500 flex items-center justify-center font-bold text-sky-700 shadow-lg z-10 mt-1 md:mt-0">
        {step}
      </div>

      {/* The Content Card */}
      <div className={`ml-20 md:ml-0 w-full md:w-[45%] ${isRight ? 'md:pl-12' : 'md:pr-12'}`}>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-sky-300 transition-all duration-300 group relative overflow-hidden">
          {/* Decorative Tag */}
          <span className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider group-hover:bg-sky-500 group-hover:text-white transition-colors">
            {tag}
          </span>

          <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            {desc}
          </p>
        </div>
      </div>
    </div>
  )
}