"use client";

import { useState, useEffect, useRef } from "react";
import { 
  CloudArrowUpIcon, 
  CpuChipIcon, 
  DocumentTextIcon, 
  HomeIcon, 
  BeakerIcon,
  CheckCircleIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  Square3Stack3DIcon,
  HandRaisedIcon,
  ChevronDownIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  ClockIcon,
  CommandLineIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

// --- Data Models ---
interface SimParams {
  dia: number;
  curve: number;
  length: number;
  gripForce: number;
  material: string;
}

interface Metrics {
  comfort: number;
  precision: number;
  stability: number;
  pressure: number;
  score: number;
}

const MATERIALS = {
  "steel": { name: "Stainless Steel 316L", friction: 0.4, density: 7.8 },
  "polymer": { name: "Medical PEEK", friction: 0.7, density: 1.3 },
  "silicone": { name: "Silicone Overmold", friction: 0.9, density: 1.1 }
};

export default function PrototypePage() {
  // --- Global State ---
  const [currentView, setCurrentView] = useState<"dashboard" | "upload" | "simulate" | "report">("dashboard");
  const [activeProject, setActiveProject] = useState("New Analysis");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  // --- Simulation State ---
  const [params, setParams] = useState<SimParams>({ dia: 12, curve: 0, length: 120, gripForce: 45, material: "steel" });
  const [baseline, setBaseline] = useState<SimParams>({ dia: 12, curve: 0, length: 120, gripForce: 45, material: "steel" }); // For comparison
  const [handSize, setHandSize] = useState<"S"|"M"|"L">("M");
  
  // --- UI Toggles ---
  const [isComparing, setIsComparing] = useState(false);
  const [isDynamic, setIsDynamic] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // --- Computed Metrics ---
  const [metrics, setMetrics] = useState<Metrics>({ comfort: 0, precision: 0, stability: 0, pressure: 0, score: 0 });

  // --- SYSTEM LOGGING ---
  const log = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    setConsoleLogs(prev => [...prev.slice(-8), `[${time}] ${msg}`]);
  };

  // Scroll log to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  // --- PHYSICS ENGINE ---
  useEffect(() => {
    const idealDia = handSize === "S" ? 25 : handSize === "M" ? 30 : 35;
    const diaDiff = Math.abs(params.dia - idealDia);
    
    // Comfort (Penalize small diameters heavily)
    let comfort = 100 - (diaDiff * 4);
    if (params.material === "silicone") comfort += 15;
    if (params.curve > 8) comfort += 10;
    
    // Precision (Steel is stable, short is precise)
    let precision = 90 - (params.dia * 1.5);
    if (params.material === "steel") precision += 10;
    if (params.length > 140) precision -= 15;

    // Stability (Thick is stable)
    let stability = (params.dia * 2) + (params.gripForce / 3);
    
    // Pressure Calculation (kPa)
    const area = params.dia * 3.14 * (params.length * 0.4);
    const pressure = Math.floor((params.gripForce * 900) / (area || 1));

    setMetrics({
      comfort: Math.max(0, Math.min(100, comfort)),
      precision: Math.max(0, Math.min(100, precision)),
      stability: Math.max(0, Math.min(100, stability)),
      pressure,
      score: Math.floor((comfort + precision + stability) / 3)
    });

  }, [params, handSize]);

  // --- ACTIONS ---

  const handleUploadSequence = () => {
    // Fake parsing
    log("Initiating upload sequence...");
    setTimeout(() => log("Reading .STL binary stream..."), 800);
    setTimeout(() => log("Verifying mesh integrity... OK"), 1600);
    setTimeout(() => {
      log("Geometry parsed. Project loaded.");
      setActiveProject("Laparoscopic_Grasper_v3.stl");
      // Set a "bad" initial state for the user to fix
      const badState = { dia: 10, curve: 0, length: 150, gripForce: 60, material: "steel" };
      setParams(badState);
      setBaseline(badState);
      setCurrentView("simulate");
    }, 2500);
  };

  const runAISolver = (strategy: "balanced" | "precision") => {
    log(`AI Solver: Optimizing for ${strategy.toUpperCase()}...`);
    
    const targetDia = handSize === "S" ? 24 : handSize === "M" ? 29 : 34;
    const targetCurve = strategy === "balanced" ? 15 : 5;
    
    let steps = 0;
    const interval = setInterval(() => {
      steps++;
      setParams(prev => ({
        ...prev,
        dia: lerp(prev.dia, targetDia, 0.2),
        curve: lerp(prev.curve, targetCurve, 0.1),
        length: lerp(prev.length, 120, 0.1) // Optimize length too
      }));

      if (steps > 25) {
        clearInterval(interval);
        // Final tweak
        setParams(prev => ({ ...prev, material: strategy === "balanced" ? "silicone" : "steel" }));
        log(`Optimization converged. Material set to ${strategy === "balanced" ? "Silicone" : "Steel"}.`);
      }
    }, 40);
  };

  const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden select-none">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-16 bg-slate-900 flex flex-col items-center py-6 gap-6 z-20 shadow-xl">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-900/50">ES</div>
        <nav className="flex flex-col gap-4 w-full">
          <NavIcon icon={<HomeIcon/>} active={currentView === "dashboard"} onClick={() => setCurrentView("dashboard")} />
          <NavIcon icon={<CloudArrowUpIcon/>} active={currentView === "upload"} onClick={() => setCurrentView("upload")} />
          <NavIcon icon={<CpuChipIcon/>} active={currentView === "simulate"} onClick={() => setCurrentView("simulate")} />
          <NavIcon icon={<DocumentTextIcon/>} active={currentView === "report"} onClick={() => setCurrentView("report")} />
        </nav>
        <div className="mt-auto mb-2 opacity-50 hover:opacity-100 cursor-pointer">
           <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300">ID</div>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* === DASHBOARD === */}
        {currentView === "dashboard" && (
          <div className="flex-1 p-10 overflow-y-auto bg-slate-50 animate-in fade-in">
             <header className="mb-10">
               <h1 className="text-3xl font-bold text-slate-900">Engineering Dashboard</h1>
               <p className="text-slate-500">Welcome back, Lead Designer.</p>
             </header>

             <div className="grid grid-cols-4 gap-6 mb-10">
                <StatCard label="Analyses Run" value="128" icon={<ClockIcon className="text-blue-500"/>} />
                <StatCard label="Avg Score" value="84%" icon={<ChartBarIcon className="text-green-500"/>} />
                <button onClick={() => setCurrentView("upload")} className="col-span-1 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition bg-white h-32">
                   <PlusIcon className="w-8 h-8 mb-2"/>
                   <span className="font-bold text-sm">New Analysis</span>
                </button>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-4 border-b border-slate-100 font-bold text-slate-700">Recent Projects</div>
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500">
                   <tr><th className="p-4">Project</th><th className="p-4">Material</th><th className="p-4">Risk</th><th className="p-4">Actions</th></tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   <tr className="hover:bg-slate-50 transition cursor-pointer" onClick={() => { setActiveProject("Endo-Grasper V1"); setCurrentView("simulate"); log("Project Endo-Grasper V1 loaded."); }}>
                     <td className="p-4 font-medium">Endo-Grasper V1</td>
                     <td className="p-4 text-slate-500">Steel</td>
                     <td className="p-4 text-red-500 font-bold">High (42/100)</td>
                     <td className="p-4 text-indigo-600">Open</td>
                   </tr>
                   <tr className="hover:bg-slate-50 transition cursor-pointer" onClick={() => { setActiveProject("Forceps Pro X"); setCurrentView("simulate"); log("Project Forceps Pro X loaded."); }}>
                     <td className="p-4 font-medium">Forceps Pro X</td>
                     <td className="p-4 text-slate-500">Silicone</td>
                     <td className="p-4 text-green-500 font-bold">Low (92/100)</td>
                     <td className="p-4 text-indigo-600">Open</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {/* === UPLOAD === */}
        {currentView === "upload" && (
          <div className="flex-1 flex items-center justify-center bg-slate-100 animate-in zoom-in-95">
             <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-200 text-center max-w-lg w-full">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CloudArrowUpIcon className="w-8 h-8"/>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Import Geometry</h2>
                <p className="text-slate-500 mb-8 text-sm">Supports .STEP, .STL, .OBJ (Max 50MB)</p>
                
                <div 
                  onClick={handleUploadSequence}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition group"
                >
                  <p className="text-slate-600 font-medium group-hover:text-indigo-700">Click to Select File</p>
                </div>
             </div>
          </div>
        )}

        {/* === SIMULATION WORKSPACE (The Core) === */}
        {currentView === "simulate" && (
          <div className="flex-1 flex flex-col h-full animate-in fade-in">
             {/* Header */}
             <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
               <div className="flex items-center gap-4">
                 <h2 className="font-bold text-slate-800">{activeProject}</h2>
                 <div className="h-4 w-px bg-slate-300"></div>
                 <button 
                   onClick={() => { setIsComparing(!isComparing); log(isComparing ? "Comparison Mode: OFF" : "Comparison Mode: ON (Overlay)"); }}
                   className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition ${isComparing ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                 >
                   <ArrowsRightLeftIcon className="w-3 h-3"/> {isComparing ? 'Active Overlay' : 'Compare Baseline'}
                 </button>
               </div>
               <div className="flex items-center gap-3">
                 <button onClick={() => setIsDynamic(!isDynamic)} className={`text-xs font-bold px-3 py-1 rounded transition ${isDynamic ? 'bg-green-100 text-green-700' : 'text-slate-400 hover:text-slate-600'}`}>
                   {isDynamic ? "● LIVE PHYSICS" : "○ STATIC VIEW"}
                 </button>
               </div>
             </header>

             {/* 3-Column Layout */}
             <div className="flex-1 grid grid-cols-12 overflow-hidden">
                
                {/* 1. CONTROLS (Left) */}
                <div className="col-span-3 bg-white border-r border-slate-200 p-5 flex flex-col gap-6 overflow-y-auto">
                   <ControlSection title="Geometry Definition" icon={<AdjustmentsHorizontalIcon/>}>
                      <SliderControl label="Diameter (mm)" val={params.dia} set={(v) => setParams({...params, dia: v})} min={5} max={45} />
                      <SliderControl label="Curvature (°)" val={params.curve} set={(v) => setParams({...params, curve: v})} min={0} max={30} />
                      <SliderControl label="Handle Len (mm)" val={params.length} set={(v) => setParams({...params, length: v})} min={80} max={200} />
                   </ControlSection>

                   <ControlSection title="Material & Physics" icon={<Square3Stack3DIcon/>}>
                      <div className="space-y-2">
                        {Object.entries(MATERIALS).map(([k, m]) => (
                          <button key={k} onClick={() => { setParams({...params, material: k}); log(`Material changed to: ${m.name}`); }} className={`w-full text-left px-3 py-2 rounded border text-xs font-medium transition ${params.material === k ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                            {m.name}
                          </button>
                        ))}
                      </div>
                   </ControlSection>

                   <ControlSection title="User Parameters" icon={<HandRaisedIcon/>}>
                      <SliderControl label="Grip Force (N)" val={params.gripForce} set={(v) => setParams({...params, gripForce: v})} min={10} max={100} />
                      <div className="flex bg-slate-100 rounded p-1 mt-2">
                         {(['S','M','L'] as const).map(s => (
                           <button key={s} onClick={() => { setHandSize(s); log(`Hand model set to Size: ${s}`); }} className={`flex-1 text-xs font-bold py-1 rounded transition ${handSize === s ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}>{s}</button>
                         ))}
                      </div>
                   </ControlSection>
                </div>

                {/* 2. VISUALIZER (Center) */}
                <div className="col-span-6 bg-slate-100 relative flex flex-col">
                   <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
                      {/* Grid Background */}
                      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* THE TOOL SVG */}
                        <svg viewBox="0 0 500 400" className="w-full h-full drop-shadow-2xl">
                           <defs>
                             <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="0%" stopColor={params.material === 'polymer' ? '#e2e8f0' : '#94a3b8'} />
                               <stop offset="100%" stopColor={params.material === 'polymer' ? '#cbd5e1' : '#475569'} />
                             </linearGradient>
                             <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                           </defs>

                           {/* GHOST OVERLAY (If Comparing) */}
                           {isComparing && (
                             <g transform={`translate(300, 200) rotate(${baseline.curve})`} className="opacity-30">
                               <path d={`M 0,-${baseline.dia/2} L ${baseline.length},-${baseline.dia/2} L ${baseline.length},${baseline.dia/2} L 0,${baseline.dia/2} Z`} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"/>
                               <circle cx={baseline.length + 10} cy={-baseline.dia/2} r={baseline.dia} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"/>
                               <circle cx={baseline.length + 10} cy={baseline.dia/2} r={baseline.dia} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"/>
                             </g>
                           )}

                           {/* ACTUAL TOOL */}
                           <g transform="translate(50, 200)">
                             <rect x="0" y="-4" width={250} height="8" fill="#64748b" rx="2" />
                             <g transform="translate(0,0)">
                               <path d="M 0,0 L -35,-15" stroke="#64748b" strokeWidth="4" className={isDynamic ? "animate-[wiggle_0.5s_ease-in-out_infinite]" : ""}/>
                               <path d="M 0,0 L -35,15" stroke="#64748b" strokeWidth="4" className={isDynamic ? "animate-[wiggle_0.5s_ease-in-out_infinite_reverse]" : ""}/>
                             </g>
                           </g>

                           <g transform={`translate(300, 200) rotate(${params.curve})`} className="transition-all duration-300 ease-out">
                              <rect x="-20" y="-10" width="20" height="20" fill="#475569" />
                              <path d={`M 0,-${params.dia/2} L ${params.length},-${params.dia/2} L ${params.length},${params.dia/2} L 0,${params.dia/2} Z`} fill="url(#bodyGrad)" stroke="#334155" strokeWidth="1"/>
                              <circle cx={params.length + 10} cy={-params.dia/2} r={params.dia} fill="none" stroke="url(#bodyGrad)" strokeWidth="6" />
                              <circle cx={params.length + 10} cy={params.dia/2} r={params.dia} fill="none" stroke="url(#bodyGrad)" strokeWidth="6" />
                              
                              {/* SENSOR DOTS (Red if bad) */}
                              {metrics.pressure > 80 && (
                                <>
                                  <circle cx={params.length + 10} cy={-params.dia/2 - params.dia} r="5" fill="#ef4444" filter="url(#glow)" className="animate-pulse"/>
                                  <circle cx={params.length + 10} cy={params.dia/2 + params.dia} r="5" fill="#ef4444" filter="url(#glow)" className="animate-pulse"/>
                                </>
                              )}
                           </g>
                        </svg>
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-slate-200 p-2 rounded text-[10px] font-mono text-slate-500">
                        <div>Polycount: 12,402</div>
                        <div>Solver: {isDynamic ? "Running" : "Idle"}</div>
                      </div>
                   </div>

                   {/* CONSOLE LOG (The Matrix) */}
                   <div className="h-40 bg-slate-900 text-green-400 p-3 font-mono text-xs overflow-y-auto border-t border-slate-700">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800 text-slate-500 uppercase tracking-widest font-bold">
                        <CommandLineIcon className="w-3 h-3"/> System Console
                      </div>
                      <div className="space-y-1">
                        {consoleLogs.length === 0 && <span className="opacity-50">System ready. Waiting for input...</span>}
                        {consoleLogs.map((l,i) => <div key={i}>{`> ${l}`}</div>)}
                        <div ref={logEndRef}></div>
                      </div>
                   </div>
                </div>

                {/* 3. ANALYTICS (Right) */}
                <div className="col-span-3 bg-white border-l border-slate-200 p-6 flex flex-col gap-8 overflow-y-auto">
                   {/* Radar Chart */}
                   <div>
                     <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6 text-sm">
                       <ChartBarIcon className="w-4 h-4 text-indigo-600"/> Performance Matrix
                     </h3>
                     <div className="relative aspect-square flex items-center justify-center bg-slate-50 rounded-full border border-slate-100">
                        {/* Simple CSS Radar Visualization */}
                        <div className="absolute inset-0 border border-slate-200 rounded-full scale-[0.25]"></div>
                        <div className="absolute inset-0 border border-slate-200 rounded-full scale-[0.50]"></div>
                        <div className="absolute inset-0 border border-slate-200 rounded-full scale-[0.75]"></div>
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible opacity-70 mix-blend-multiply">
                           <polygon 
                             points={`50,${50 - (metrics.comfort/2.2)} ${50 + (metrics.precision/2.2)},50 50,${50 + (metrics.stability/2.2)} ${50 - (metrics.score/2.2)},50`}
                             fill="rgba(79, 70, 229, 0.4)" stroke="#4338ca" strokeWidth="2" className="transition-all duration-500"
                           />
                        </svg>
                        <span className="absolute top-2 text-[10px] font-bold text-slate-400">COMFORT</span>
                        <span className="absolute right-2 text-[10px] font-bold text-slate-400">PRECISION</span>
                        <span className="absolute bottom-2 text-[10px] font-bold text-slate-400">STABILITY</span>
                        <span className="absolute left-2 text-[10px] font-bold text-slate-400">SCORE</span>
                     </div>
                   </div>

                   {/* Metrics Bars */}
                   <div className="space-y-4">
                     <MetricBar label="Contact Pressure (kPa)" value={metrics.pressure} max={120} inverse />
                     <MetricBar label="Ergonomic Score" value={metrics.score} max={100} />
                   </div>

                   {/* AI Actions */}
                   <div className="mt-auto bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-700 uppercase">
                        <BeakerIcon className="w-4 h-4 text-purple-600"/> AI Solver
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                         <button onClick={() => runAISolver('balanced')} className="py-2 bg-white border border-slate-200 hover:border-purple-400 text-slate-600 text-xs font-bold rounded shadow-sm hover:text-purple-600 transition">Balanced</button>
                         <button onClick={() => runAISolver('precision')} className="py-2 bg-white border border-slate-200 hover:border-indigo-400 text-slate-600 text-xs font-bold rounded shadow-sm hover:text-indigo-600 transition">Precision</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* === REPORT === */}
        {currentView === "report" && (
           <div className="flex-1 overflow-y-auto bg-slate-200 p-8 flex justify-center animate-in slide-in-from-bottom-4">
              <div className="bg-white shadow-2xl w-full max-w-4xl p-12 min-h-[800px] relative">
                 <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                 <div className="flex justify-between items-end border-b-2 border-slate-100 pb-8 mb-8">
                    <div>
                      <h1 className="text-4xl font-bold text-slate-900 mb-2">Technical Analysis Report</h1>
                      <div className="text-slate-500 font-mono text-sm">REF: {Math.floor(Math.random() * 100000)}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-sm font-bold text-slate-900">Project: {activeProject}</div>
                       <div className="text-xs text-slate-500">{new Date().toLocaleDateString()}</div>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-8 mb-12">
                    <div className="col-span-2 space-y-4">
                       <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Configuration Data</h3>
                       <ReportRow label="Handle Diameter" value={`${params.dia} mm`} />
                       <ReportRow label="Shaft Curvature" value={`${params.curve}°`} />
                       <ReportRow label="Material Spec" value={MATERIALS[params.material as keyof typeof MATERIALS].name} />
                       <ReportRow label="Handle Length" value={`${params.length} mm`} />
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                       <div className="text-sm font-bold text-slate-500 uppercase mb-2">Validation Score</div>
                       <div className={`text-6xl font-black mb-2 ${metrics.score > 80 ? 'text-green-500' : 'text-yellow-500'}`}>{metrics.score}</div>
                       <div className="text-xs text-slate-400">OUT OF 100</div>
                    </div>
                 </div>

                 <div className="mb-12">
                   <h3 className="font-bold text-slate-800 mb-4">Engineering Notes</h3>
                   <div className="p-6 bg-indigo-50 text-indigo-900 text-sm leading-relaxed rounded-lg border border-indigo-100">
                      Based on biomechanical simulation, the optimized geometry of <strong>{params.dia}mm</strong> diameter provides the ideal balance between tactile feedback and muscle fatigue reduction. 
                      The material selection of <strong>{MATERIALS[params.material as keyof typeof MATERIALS].name}</strong> ensures adequate friction (µ={MATERIALS[params.material as keyof typeof MATERIALS].friction}) 
                      to minimize grip force requirements.
                   </div>
                 </div>

                 <div className="flex justify-end">
                    <button onClick={() => log("Report PDF generated.")} className="bg-slate-900 text-white px-8 py-3 rounded font-bold hover:bg-slate-800 flex items-center gap-2">
                       <ArrowDownTrayIcon className="w-5 h-5"/> Export PDF
                    </button>
                 </div>
              </div>
           </div>
        )}

      </main>
    </div>
  );
}

// --- SUB COMPONENTS ---

const NavIcon = ({ icon, active, onClick }: any) => (
  <button onClick={onClick} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
    <div className="w-5 h-5">{icon}</div>
  </button>
);

const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">{icon}</div>
    <div>
       <div className="text-2xl font-bold text-slate-900">{value}</div>
       <div className="text-sm text-slate-500 font-medium">{label}</div>
    </div>
  </div>
);

const ControlSection = ({ title, icon, children }: any) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden shrink-0">
      <button onClick={() => setOpen(!open)} className="w-full bg-slate-50 p-3 flex items-center justify-between hover:bg-slate-100 transition">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase">
          <div className="w-4 h-4 text-slate-400">{icon}</div>{title}
        </div>
        <ChevronDownIcon className={`w-3 h-3 text-slate-400 transition ${open ? 'rotate-180' : ''}`}/>
      </button>
      {open && <div className="p-4 bg-white space-y-4">{children}</div>}
    </div>
  );
};

const SliderControl = ({ label, val, set, min, max }: any) => (
  <div>
    <div className="flex justify-between mb-1">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <span className="font-mono text-xs font-bold text-slate-700">{val}</span>
    </div>
    <input type="range" min={min} max={max} value={val} onChange={(e) => set(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"/>
  </div>
);

const MetricBar = ({ label, value, max, inverse }: any) => {
  const pct = Math.min(100, (value/max)*100);
  let color = 'bg-indigo-500';
  if (inverse) color = pct > 80 ? 'bg-red-500' : pct > 50 ? 'bg-orange-400' : 'bg-green-500';
  else color = pct < 50 ? 'bg-red-500' : pct < 80 ? 'bg-yellow-400' : 'bg-green-500';

  return (
    <div>
      <div className="flex justify-between text-xs mb-1"><span className="text-slate-500 font-medium">{label}</span><span className="font-bold text-slate-700">{value}</span></div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className={`h-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }}></div></div>
    </div>
  );
};

const ReportRow = ({ label, value }: any) => (
  <div className="flex justify-between py-2 border-b border-slate-50 text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);