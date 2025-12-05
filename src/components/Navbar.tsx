import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href="/" className="font-bold text-xl text-slate-800 tracking-tight">
          ErgoSurg<span className="text-sky-600">AI</span>
        </Link>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
           <Link href="/" className="hover:text-sky-600 transition">Home</Link>
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
  );
}