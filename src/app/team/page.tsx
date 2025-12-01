import Link from "next/link";

export default function TeamPage() {
  const team = [
    { name: "Darrance Beh Heng Shek", id: "23094907", role: "Website & Prototype Developer", bio: "Led the implementation of the Next.js interface and interactive SVG simulations." },
    { name: "Chua Kay Chun", id: "23046782", role: "UX Researcher", bio: "Conducted surgeon interviews and defined the heuristic evaluation criteria." },
    { name: "Ng Wei Quan", id: "22062616", role: "Data Analyst", bio: "Researched biomechanical parameters for the ergonomic risk algorithms." },
    { name: "Chai Yi Xiang", id: "22042493", role: "Interaction Designer", bio: "Created the low-fidelity sketches and user flow diagrams." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* NAV (Same as above) */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-slate-800">ErgoSurg<span className="text-sky-600">AI</span></Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
             <Link href="/about">About</Link><Link href="/team" className="text-sky-600">Team</Link><Link href="/research">Research</Link><Link href="/gallery">Gallery</Link><Link href="/reflection">Reflection</Link><Link href="/prototypes" className="bg-slate-900 text-white px-4 py-2 rounded-full">Launch</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Meet the Team</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">The collaborative minds bridging the gap between medical engineering and human-computer interaction.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-200 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-slate-400">
                {/* Replace with <img src="/photo.jpg" /> later */}
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
              <p className="text-xs font-mono text-slate-400 mb-2">{member.id}</p>
              <p className="text-sky-600 font-medium text-sm mb-4">{member.role}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}