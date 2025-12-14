import Navbar from "@/components/Navbar";

export default function TeamPage() {
  const team = [
    { 
      name: "Chai Yi Xiang", 
      id: "22042493", 
      role: "Interaction Designer",
      image: "/images/cyx.jpeg", 
      contribution: "(25%) Defined the project title and problem scope. Assigned team roles and prepared the usability test scripts and scenarios. Designed the high-fidelity UI assets, specifically the 'Industrial Control Deck' aesthetic and the A0 Poster layout."
    },
    { 
      name: "Chua Kay Chun", 
      id: "23046782", 
      role: "UX Researcher", 
      image: "/images/ckc.jpeg",
      contribution: "(25%)Directed the qualitative research phase. Conducted the three usability testing sessions, documented critical incidents (e.g., Upload Ambiguity), and refined the paper prototype based on participant feedback regarding system visibility."
    },
    { 
      name: "Darrance Beh Heng Shek", 
      id: "23094907", 
      role: "Lead Developer & Architect", 
      image: "/images/darrance.png",
      contribution: "(25%) Architected the full-stack Next.js application and the custom SVG vector manipulation engine. Engineered the client-side physics logic that translates slider inputs into real-time biomechanical risk metrics and the dynamic 'Matrix' visualization."
    },
    { 
      name: "Ng Wei Quan", 
      id: "22062616", 
      role: "Domain Analyst & Logic Architect", 
      image: "/images/nwq.jpeg",
      contribution: "(25%) Synthesized ISO-9241 ergonomic standards into programmable algorithms. Defined the mathematical relationships between anthropometric data and tool geometry to ensure engineering validity in the simulation logic."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Meet the Team</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Group 4-10: Bridging medical engineering and human-computer interaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition group items-center sm:items-start text-center sm:text-left">
              <div className="shrink-0 relative">
                <div className="w-24 h-24 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-sky-500 transition">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover"/>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-3 mt-1">
                   <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500 border border-slate-200">{member.id}</span>
                   <span className="text-sm font-medium text-sky-600">{member.role}</span>
                </div>
                <div className="pt-4 border-t border-slate-100">
                   <strong className="text-xs uppercase text-slate-400 tracking-wider">Contribution</strong>
                   <p className="text-sm text-slate-700 mt-1 leading-relaxed">{member.contribution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}