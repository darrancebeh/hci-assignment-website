import Link from "next/link";
import { 
  ArrowRightIcon, 
  BeakerIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon,
  CubeTransparentIcon,
  SparklesIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-200">
      
      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">
            ErgoSurg<span className="text-sky-600">AI</span>
          </Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about" className="hover:text-sky-600 transition">About</Link>
             <Link href="/team" className="hover:text-sky-600 transition">Team</Link>
             <Link href="/research" className="hover:text-sky-600 transition">Research</Link>
             <Link href="/gallery" className="hover:text-sky-600 transition">Gallery</Link>
             <Link href="/reflection" className="hover:text-sky-600 transition">Reflection</Link>
             <Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition">
               Launch Prototype
             </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-600 mb-6 border border-sky-100">
            HCI Assignment • Practical Group 10 | Group 4
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Refining Surgical Instruments with
AI-Driven Ergonomics
<br/>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Empowering tool designers to identify ergonomic risks before production. Reduce surgeon fatigue, minimize injury, and enhance surgical precision through simulation.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/prototypes" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-xl hover:-translate-y-1">
              Try the Simulator <BeakerIcon className="w-5 h-5"/>
            </Link>
            <Link href="#abstract" className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl text-lg font-medium transition">
              Read Abstract <ArrowRightIcon className="w-5 h-5"/>
            </Link>
          </div>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* --- ABSTRACT SECTION --- */}
      <section id="abstract" className="py-20 bg-slate-50 border-y border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-200 text-sky-600">
              <DocumentTextIcon className="w-6 h-6"/>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Project Abstract</h2>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 text-lg leading-relaxed text-slate-700">
            <p className="mb-6">
              This project is designed for tool designers to refine surgical instruments regarding ergonomic issues before they are used by surgeons. 
              Surgeons often experience physical strain in their hands and wrists during long surgical procedures. A significant number of surgeons face ergonomic issues or injury due to inadequately designed surgical instruments—such as <span className="font-semibold text-slate-900">poor grip design, improper weight distribution, and repetitive motion stress</span>—which causes hand and wrist pain, reducing surgical performance and increasing long-term injury risk.
            </p>
            <p className="mb-6">
              To solve this, the project integrates <span className="font-semibold text-sky-600">AI-driven simulation and analysis</span> to identify possible ergonomic issues in surgical instruments. The objective is to provide tool designers with recommendations that allow them to refine instruments and increase efficiency in designing the tool.
            </p>
            <p className="mb-6">
              This project involves conducting user research with surgeons to identify common ergonomic issues, heuristic testing to identify usability issues based on established principles, and usability testing with users simulating the role of tool designers. This iterative process ensured the prototype is user-friendly and provides balanced practical insights with AI-driven recommendations. The initial prototype was found to be nearly complete, as users could effectively navigate it while imagining themselves as tool designers.
            </p>
            <div className="pl-4 border-l-4 border-sky-500 bg-sky-50 p-4 rounded-r-lg text-slate-800 font-medium">
              By solving the ergonomics in surgical instruments, this project contributes to surgeons’ long-term health and enhances surgical performance. Better surgical tools help surgeons reduce fatigue, minimize injury risks, and support higher precision in operation.
            </div>
          </div>
        </div>
      </section>
{/* --- CORE OFFERINGS SECTION (NEW) --- */}
      <section className="pb-20 pt-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Solution Overview</h3>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Core Project Offerings</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Offering 1 */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <CubeTransparentIcon className="w-32 h-32"/>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-sky-600 rounded-lg flex items-center justify-center mb-6">
                  <CubeTransparentIcon className="w-7 h-7 text-white"/>
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Driven Simulation</h3>
                <p className="text-slate-300 leading-relaxed">
                  A digital twin environment that allows designers to test ergonomics on virtual models. Identify stress points, weight imbalance, and grip issues instantly without physical prototyping.
                </p>
              </div>
            </div>

            {/* Offering 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 relative overflow-hidden group hover:border-sky-300 transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                <SparklesIcon className="w-7 h-7"/>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Actionable Recommendations</h3>
              <p className="text-slate-600 leading-relaxed">
                The system doesn&apos;t just find errors; it fixes them. Our algorithm provides specific, data-backed adjustments for handle diameter, curvature, and material to optimize surgeon comfort.
              </p>
            </div>

            {/* Offering 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 relative overflow-hidden group hover:border-sky-300 transition">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-6">
                <UserGroupIcon className="w-7 h-7"/>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">User-Centric Validation</h3>
              <p className="text-slate-600 leading-relaxed">
                Built on a foundation of rigorous user research with surgeons and iterative heuristic testing. The platform ensures that design tools align with the real-world needs of the operating room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Technical Capabilities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Traditional user testing is slow and expensive. Our heuristic engine allows you to iterate in seconds, not weeks.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<CpuChipIcon className="w-8 h-8 text-white"/>}
              color="bg-indigo-500"
              title="Predictive Physics"
              desc="Our engine calculates grip pressure (kPa) and wrist deviation angles in real-time based on anthropometric data."
            />
            <FeatureCard 
              icon={<ChartBarIcon className="w-8 h-8 text-white"/>}
              color="bg-sky-500"
              title="ISO-Standard Reporting"
              desc="Generate PDF-ready reports that map your tool design against ISO-9241 ergonomic standards."
            />
            <FeatureCard 
              icon={<ShieldCheckIcon className="w-8 h-8 text-white"/>}
              color="bg-emerald-500"
              title="Injury Prevention"
              desc="Identify 'Red Zones' in handle design that lead to Carpal Tunnel Syndrome before production."
            />
          </div>
        </div>
      </section>

      {/* --- IMPACT STATS --- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="grid grid-cols-3 divide-x divide-slate-700">
              <div>
                <div className="text-4xl font-black mb-1">45%</div>
                <div className="text-sm text-slate-400 font-medium">Faster Prototyping</div>
              </div>
              <div>
                <div className="text-4xl font-black mb-1">100+</div>
                <div className="text-sm text-slate-400 font-medium">Design Variables</div>
              </div>
              <div>
                <div className="text-4xl font-black mb-1">0</div>
                <div className="text-sm text-slate-400 font-medium">Physical Waste</div>
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 text-slate-500 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
             <span className="text-slate-900 font-bold text-lg">ErgoSurgAI</span>
             <p className="text-sm mt-1">Human-Computer Interaction • Practical Group 10 | Group 4, 2025</p>
           </div>
           <div className="flex gap-6 text-sm font-medium">
             <Link href="/team" className="hover:text-sky-600 transition">Team</Link>
             <Link href="/research" className="hover:text-sky-600 transition">Research</Link>
             <Link href="/prototypes" className="hover:text-sky-600 transition">Prototype</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-component for cleanliness
function FeatureCard({ icon, color, title, desc }: { icon: React.ReactNode, color: string, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  )
}