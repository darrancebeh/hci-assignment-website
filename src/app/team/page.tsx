import Navbar from "@/components/Navbar";

export default function TeamPage() {
  const team = [
    { 
      name: "Darrance Beh Heng Shek", 
      id: "23094907", 
      role: "Lead Developer & UI Designer", 
      bio: "Focuses on bridging the gap between complex engineering data and intuitive user interfaces.",
      contribution: "Developed the core Next.js framework and the interactive SVG visualization engine. Implemented the real-time 'Physics Matrix' algorithm based on anthropometric variables."
    },
    { 
      name: "Chua Kay Chun", 
      id: "23046782", 
      role: "UX Researcher", 
      bio: "Specializes in qualitative research methods and heuristic analysis.",
      contribution: "Led the user research phase, conducting interviews with surgeons to define the 'Pain Points'. Created the low-fidelity paper prototypes and conducted the Heuristic Evaluation (Nielsen's 10)."
    },
    { 
      name: "Ng Wei Quan", 
      id: "22062616", 
      role: "Data Analyst & Logic Architect", 
      bio: "Interested in the application of AI heuristics in mechanical engineering.",
      contribution: "Defined the mathematical logic for the 'Risk Score'. Researched the friction coefficients and pressure thresholds (kPa) used in the simulation engine."
    },
    { 
      name: "Chai Yi Xiang", 
      id: "22042493", 
      role: "Interaction Designer", 
      bio: "Passionate about micro-interactions and accessibility in design.",
      contribution: "Designed the 'Bottom Control Deck' layout based on physical industrial panels. Created the high-fidelity mockups for the 'Report' and 'Dashboard' views."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Meet the Team</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A multidisciplinary team combining computer science, design, and biomechanics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex gap-6 hover:shadow-lg transition group">
              <div className="shrink-0">
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold text-slate-400 group-hover:bg-sky-100 group-hover:text-sky-600 transition">
                  {/* Real Photo Placeholder */}
                  {member.name.charAt(0)}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">{member.id}</span>
                   <span className="text-sm font-medium text-sky-600">{member.role}</span>
                </div>
                <p className="text-sm text-slate-600 mb-4 italic">&quot;{member.bio}&quot;</p>
                <div className="pt-4 border-t border-slate-100">
                   <strong className="text-xs uppercase text-slate-400 tracking-wider">Contribution</strong>
                   <p className="text-sm text-slate-700 mt-1">{member.contribution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}