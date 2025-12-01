import Link from "next/link";
import { 
  BeakerIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

export default function LandingPage() {
  
  const teamMembers = [
    { name: "Darrance Beh Heng Shek", id: "23094907", initials: "DB" },
    { name: "Chua Kay Chun", id: "23046782", initials: "CK" },
    { name: "Ng Wei Quan", id: "22062616", initials: "NW" },
    { name: "Chai Yi Xiang", id: "22042493", initials: "CY" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-medical-500 selection:text-white">
      
      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                ErgoSurg<span className="text-medical-600">AI</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="#problem" className="text-sm font-medium text-slate-600 hover:text-medical-600 transition">
                The Problem
              </Link>
              <Link href="#solution" className="text-sm font-medium text-slate-600 hover:text-medical-600 transition">
                Solution
              </Link>
              <Link href="#process" className="text-sm font-medium text-slate-600 hover:text-medical-600 transition">
                Process
              </Link>
              <Link 
                href="/prototypes" 
                className="bg-medical-600 hover:bg-medical-700 text-white px-4 py-2 rounded-full text-sm font-medium transition shadow-md hover:shadow-lg"
              >
                View Prototypes
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center rounded-full bg-medical-50 px-3 py-1 text-sm font-medium text-medical-600 ring-1 ring-inset ring-medical-500/10 mb-6">
            HCI Project 2025
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto">
            Refining Surgical Instruments with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-teal-500">
              AI-Driven Ergonomics
            </span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Empowering tool designers to identify ergonomic risks before production. 
            Reduce surgeon fatigue, minimize injury, and enhance surgical precision through simulation.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/prototypes" 
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition shadow-xl"
            >
              Explore the Prototype <ArrowRightIcon className="w-5 h-5"/>
            </Link>
            <Link 
              href="#problem" 
              className="px-8 py-3.5 rounded-lg text-lg font-medium text-slate-700 hover:bg-slate-100 transition border border-slate-200"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-medical-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Project Team</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-medical-50 rounded-full flex items-center justify-center text-medical-700 font-bold border border-medical-100">
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">ID: {member.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- The Problem Section --- */}
      <section id="problem" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">The Hidden Cost of Surgery</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Surgeons often endure long hours of repetitive motion and poor grip design. 
                This leads to physical strain, long-term wrist injuries, and reduced performance 
                in the operating room.
              </p>
              <ul className="space-y-4">
                {[
                  "Improper weight distribution in tools",
                  "Repetitive motion stress injuries",
                  "Decreased surgical precision over time",
                  "Risk of long-term career-ending injury"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-4xl font-bold text-medical-600 mb-2">High</div>
                <div className="text-sm text-slate-500">Incidence of hand/wrist pain in surgeons</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 mt-8">
                <div className="text-4xl font-bold text-teal-600 mb-2">Ergo</div>
                <div className="text-sm text-slate-500">Issues caused by inadequate design</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-4xl font-bold text-slate-800 mb-2">AI</div>
                <div className="text-sm text-slate-500">Analysis needed to prevent strain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- The Solution Section --- */}
      <section id="solution" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">AI-Driven Simulation & Analysis</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our tool allows designers to refine instruments digitally before physical production.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Digital Simulation",
              desc: "Simulates the role of tool designers to identify possible ergonomic issues virtually.",
              icon: <ChartBarIcon className="w-8 h-8 text-white"/>,
              color: "bg-blue-500"
            },
            {
              title: "AI Recommendations",
              desc: "Provides actionable insights to refine grip, weight, and balance.",
              icon: <ShieldCheckIcon className="w-8 h-8 text-white"/>,
              color: "bg-teal-500"
            },
            {
              title: "User-Centric Design",
              desc: "Iterative feedback loop ensuring tools fit the real-world needs of surgeons.",
              icon: <UserGroupIcon className="w-8 h-8 text-white"/>,
              color: "bg-indigo-500"
            }
          ].map((feature, idx) => (
            <div key={idx} className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Methodology / Process Timeline --- */}
      <section id="process" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Research Methodology</h2>
            <p className="mt-4 text-slate-400">An iterative process ensuring validity and usability.</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  step: "01",
                  title: "User Research",
                  desc: "Conducted with surgeons to identify common pain points and ergonomic failures."
                },
                {
                  step: "02",
                  title: "Heuristic Testing",
                  desc: "Evaluated by experts against established usability principles to find interface issues."
                },
                {
                  step: "03",
                  title: "Usability Testing",
                  desc: "Simulated tasks with 3 users acting as tool designers to refine the prototype."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-medical-500 transition">
                  <div className="text-5xl font-bold text-slate-700 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 bg-medical-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to see the solution?
          </h2>
          <p className="text-medical-100 text-lg mb-10 max-w-2xl mx-auto">
            Explore the interactive prototypes, review the use cases, and see how our AI recommendations transform tool design.
          </p>
          <Link 
            href="/prototypes" 
            className="inline-flex items-center gap-2 bg-white text-medical-600 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition shadow-xl"
          >
            Launch Prototype <BeakerIcon className="w-5 h-5"/>
          </Link>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-900">HCI Subject Project</p>
            <p className="text-sm text-slate-500">Human Computer Interaction • Semester 1, 2025</p>
          </div>
          <div className="flex gap-6 text-slate-400 text-sm">
            <span>© ErgoSurgAI Team</span>
            <span>University Name</span>
          </div>
        </div>
      </footer>
    </div>
  );
}