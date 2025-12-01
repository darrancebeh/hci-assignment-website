import Link from "next/link";
import { ArrowRightIcon, BeakerIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="font-bold text-xl tracking-tight text-slate-800">
              ErgoSurg<span className="text-sky-600">AI</span>
            </Link>
            <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
              <Link href="/about" className="hover:text-sky-600 transition">About Product</Link>
              <Link href="/team" className="hover:text-sky-600 transition">Team</Link>
              <Link href="/research" className="hover:text-sky-600 transition">Research</Link>
              <Link href="/gallery" className="hover:text-sky-600 transition">Gallery</Link>
              <Link href="/reflection" className="hover:text-sky-600 transition">Reflection</Link>
              <Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition">
                Launch Prototype
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-600 mb-6 border border-sky-100">
            HCI Assignment • Practical Group 10 | Group 4
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Surgical Precision.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
              Designed by AI.
            </span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminating ergonomic risk in the operating room through predictive AI simulation. 
            Empowering tool designers to save surgeons' hands.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/prototypes" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-xl hover:-translate-y-1">
              Try the Simulator <BeakerIcon className="w-5 h-5"/>
            </Link>
            <Link href="/about" className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl text-lg font-medium transition">
              Read the Case Study <ArrowRightIcon className="w-5 h-5"/>
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </section>
    </div>
  );
}