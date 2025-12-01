import Link from "next/link";

export default function ReflectionPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">ErgoSurg<span className="text-sky-600">AI</span></Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about">About</Link><Link href="/team">Team</Link><Link href="/research">Research</Link><Link href="/gallery">Gallery</Link><Link href="/reflection" className="text-sky-600">Reflection</Link><Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full">Launch</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Project Reflection</h1>
          
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Outcomes & Impact</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              The iterative design process revealed that while surgeons are aware of ergonomic pain, they rarely have input into the tool design process. ErgoSurgAI bridges this gap. By empowering designers with immediate biomechanical feedback, we contribute to a future where surgical instruments are "born safe," reducing the career-ending injury rates among medical professionals.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mb-3">Challenges Faced</h3>
            <ul className="list-disc pl-5 text-slate-600 mb-8 space-y-2">
              <li><strong>Balancing Complexity:</strong> Translating complex biomechanical data (pressure kPa, friction coefficients) into a simple "Risk Score" required multiple iterations of the dashboard UI.</li>
              <li><strong>Technical Implementation:</strong> Simulating the tool bending (SVG manipulation) in React without a heavy 3D engine was a significant technical hurdle.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mb-3">Future Improvements</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
                <div className="font-bold text-sky-800 mb-1">VR Integration</div>
                <div className="text-sm text-slate-600">Allowing designers to "feel" the grip using haptic feedback gloves.</div>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="font-bold text-indigo-800 mb-1">Real Material Data</div>
                <div className="text-sm text-slate-600">Integrating an API for real-time cost estimation of materials.</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}