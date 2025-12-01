import Link from "next/link";
import { ExclamationTriangleIcon, LightBulbIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">ErgoSurg<span className="text-sky-600">AI</span></Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about" className="text-sky-600">About</Link><Link href="/team">Team</Link><Link href="/research">Research</Link><Link href="/gallery">Gallery</Link><Link href="/reflection">Reflection</Link><Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full">Launch</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-20">
        {/* Problem Section */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500"/>
            <h2 className="text-3xl font-bold">The Ergonomic Crisis</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Surgeons often experience physical strain in hands and wrist during long surgical procedures. 
            A significant number of surgeons face ergonomic issues or injury due to inadequately designed surgical instruments. 
            Poor grip design, improper weight distribution, and repetitive motion stress cause hand and wrist pain, 
            reducing surgical performance and increasing long-term injury risk.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
             <div className="p-4 bg-red-50 rounded-lg border border-red-100">
               <div className="font-bold text-red-700 text-xl mb-1">80%</div>
               <div className="text-sm text-slate-600">Surgeons report pain</div>
             </div>
             <div className="p-4 bg-red-50 rounded-lg border border-red-100">
               <div className="font-bold text-red-700 text-xl mb-1">High</div>
               <div className="text-sm text-slate-600">Risk of MSD Injury</div>
             </div>
             <div className="p-4 bg-red-50 rounded-lg border border-red-100">
               <div className="font-bold text-red-700 text-xl mb-1">Low</div>
               <div className="text-sm text-slate-600">Design Efficiency</div>
             </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="bg-slate-900 text-white p-10 rounded-3xl mb-20">
          <div className="flex items-center gap-2 mb-4">
            <LightBulbIcon className="w-8 h-8 text-yellow-400"/>
            <h2 className="text-3xl font-bold">Our AI-Driven Solution</h2>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            ErgoSurgAI integrates AI-driven simulation to identify ergonomic issues in digital prototypes before they are manufactured. 
            Our system provides tool designers with real-time recommendations to refine instruments, optimize grip geometry, 
            and minimize biomechanical strain.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="font-bold text-white mb-2">Predictive Analysis</h3>
              <p className="text-sm text-slate-300">Detects pressure points and wrist deviations instantly.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="font-bold text-white mb-2">Automated Optimization</h3>
              <p className="text-sm text-slate-300">AI suggests optimal handle diameters and curvatures.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}