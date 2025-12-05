"use client";

import { useState, useMemo } from "react";
import { 
  CloudArrowUpIcon, 
  CpuChipIcon, 
  DocumentTextIcon, 
  HomeIcon, 
  BeakerIcon,
  ChartBarIcon,
  XMarkIcon,
  InformationCircleIcon,
  HandRaisedIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

// --- Data Models ---
interface SimParams {
  dia: number;
  curve: number;
  gripType: "Power" | "Pinch";
  handSize: "S" | "M" | "L";
  position: "Standing" | "Seated";
  orientation: "Left" | "Right";
}

interface Metrics {
  comfort: number;
  precision: number;
  stability: number;
  pressure: number; // kPa
  score: number; // 0-100
}

export default function PrototypePage() {
  // --- Global State ---
  const [currentView, setCurrentView] = useState<"dashboard" | "upload" | "simulate" | "report">("dashboard");
  const [activeProject, setActiveProject] = useState("New Project 3");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  // --- Simulation Parameters (Default: Sub-optimal "Bad" Design) ---
  const [params, setParams] = useState<SimParams>({ 
    dia: 14, 
    curve: 0, 
    gripType: "Power", 
    handSize: "M", 
    position: "Standing", 
    orientation: "Right" 
  });

  // --- System State ---
  const [simStatus, setSimStatus] = useState<"idle" | "loading" | "complete">("idle");
  const [showCompare, setShowCompare] = useState(false);

  // --- LOGGING SYSTEM ---
  const log = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    setConsoleLogs(prev => [...prev.slice(-3), `[${time}] ${msg}`]);
  };

  // --- PHYSICS ENGINE (Real-Time Logic) ---
  const metrics = useMemo<Metrics>(() => {
    // 1. Define Anthropometric Baseline
    let idealDia = params.handSize === "S" ? 28 : params.handSize === "M" ? 33 : 38;
    if (params.gripType === "Pinch") idealDia = 12; 

    // 2. Calculate Deviation
    const diaDiff = Math.abs(params.dia - idealDia);
    
    // 3. Compute Core Metrics
    // Comfort: Penalize size deviation & bad wrist angles
    let comfort = 100 - (diaDiff * 4);
    if (params.curve >= 5 && params.curve <= 15) comfort += 15; // Neutral zone bonus
    if (params.position === "Seated" && params.curve > 20) comfort -= 15; // Awkward seated angle
    
    // Precision: Inverse of diameter (thinner = more control)
    let precision = 90 - (params.dia * 1.2);
    if (params.gripType === "Pinch") precision += 20;
    if (params.dia < 8) precision -= 30; // Too thin to hold

    // Stability: Proportional to diameter (thicker = more contact)
    let stability = (params.dia * 2.5);
    if (params.gripType === "Power") stability += 15;

    // Pressure: Force / Area proxy (High pressure = Pain)
    const pressure = Math.floor(1200 / (params.dia + 2)); 

    const clamp = (n: number) => Math.max(0, Math.min(100, n));

    return {
      comfort: clamp(comfort),
      precision: clamp(precision),
      stability: clamp(stability),
      pressure: pressure,
      score: clamp((comfort + precision + stability) / 3)
    };
  }, [params]);

  // --- VISUALIZATION HELPERS ---
  const getHeatColor = (p: number) => {
    // Continuous Gradient: Green -> Yellow -> Red
    if (p < 40) return "#22c55e"; // Green
    if (p < 80) return "#eab308"; // Yellow
    return "#ef4444"; // Red
  };

  const getHeatOpacity = (p: number) => {
    // Higher pressure = More opaque
    return Math.min(0.8, 0.2 + (p / 200));
  };

  // --- ACTIONS ---
  const handleRunSimulation = () => {
    setSimStatus("loading");
    log("Initializing Biomechanical Solver...");
    setTimeout(() => {
      setSimStatus("complete");
      log("Analysis Complete. Matrix Updated.");
    }, 1500);
  };

  const applyAI = (target: "dia" | "curve" | "all") => {
    log("AI: Optimizing parameters for bio-fit...");
    if (target === "dia" || target === "all") setParams(p => ({ ...p, dia: 32 }));
    if (target === "curve" || target === "all") setParams(p => ({ ...p, curve: 10 }));
  };

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden select-none">
      
      {/* --- SIDEBAR (Sketch 1) --- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <span className="font-bold text-lg tracking-tight text-slate-800">
            ErgoSurg<span className="text-sky-600">AI</span> Hub
          </span>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <SidebarItem active={currentView === "dashboard"} icon={<HomeIcon className="w-5 h-5"/>} label="Dashboard" onClick={() => setCurrentView("dashboard")}/>
          <SidebarItem active={currentView === "upload"} icon={<CloudArrowUpIcon className="w-5 h-5"/>} label="Upload Model" onClick={() => setCurrentView("upload")}/>
          <SidebarItem active={currentView === "simulate"} icon={<CpuChipIcon className="w-5 h-5"/>} label="Simulate & Review" onClick={() => setCurrentView("simulate")}/>
          <SidebarItem active={currentView === "report"} icon={<DocumentTextIcon className="w-5 h-5"/>} label="Report" onClick={() => setCurrentView("report")}/>
        </nav>
        {/* Research Note */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          <strong className="block text-slate-700 mb-2 uppercase">Research-backed rationale</strong>
          <ul className="list-disc pl-4 space-y-1">
            <li>Test ergonomics early on digital models</li>
            <li>Real-time Matrix Visualization</li>
            <li>Actionable parameter recommendations</li>
          </ul>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white relative">
        
        {/* === DASHBOARD === */}
        {currentView === "dashboard" && (
          <div className="p-10 max-w-6xl mx-auto w-full animate-in fade-in">
             <div className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-light text-slate-800">Projects</h1>
               <button onClick={() => setCurrentView("upload")} className="border border-slate-300 px-4 py-2 rounded shadow-sm hover:bg-slate-50">+ New Project</button>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                <ProjectCard name="Laparoscopic Grasper" date="21 Sept 2025" risk="Medium" issue="Handle design flaw, poor force transmission" onClick={() => setCurrentView("simulate")}/>
                <ProjectCard name="Endoscopic Scissors" date="27 Sept 2025" risk="Low" issue="Front-heavy balance, loop discomfort" onClick={() => setCurrentView("simulate")}/>
             </div>
          </div>
        )}

        {/* === UPLOAD === */}
        {currentView === "upload" && (
          <div className="p-10 max-w-6xl mx-auto w-full animate-in fade-in">
            <h1 className="text-3xl font-light text-slate-800 mb-2">Upload Model</h1>
            <p className="text-slate-500 mb-8">Project: {activeProject}</p>
            <div className="grid grid-cols-2 gap-12">
               <div className="border-2 border-dashed border-slate-300 rounded-xl h-80 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                  <CloudArrowUpIcon className="w-16 h-16 mb-4"/>
                  <p>Drag & Drop or click to browse</p>
                  <p className="text-xs mt-2">(.stl / .obj / .fbx / .step)</p>
               </div>
               <div className="space-y-6">
                 <h3 className="font-bold text-slate-700">Model Metadata</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <Field label="Instrument Name" placeholder="e.g. Laparoscopic Grasper"/>
                    <Field label="Category" placeholder="e.g. Forceps"/>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <Field label="Dimensions" placeholder="L x W x Handle Ø"/>
                    <Field label="Weight" placeholder="g / kg"/>
                 </div>
                 <button onClick={() => setCurrentView("simulate")} className="w-full bg-slate-900 text-white py-3 rounded mt-4 hover:bg-slate-800">Continue to Simulation</button>
               </div>
            </div>
          </div>
        )}

        {/* === SIMULATE (Core Interface) === */}
        {currentView === "simulate" && (
          <div className="flex flex-col h-full animate-in fade-in">
             {/* Header */}
             <div className="h-14 border-b border-slate-200 flex items-center px-6 gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setCurrentView("dashboard")} className="text-slate-500 hover:text-slate-800">← Back</button>
                  <div className="h-4 w-px bg-slate-300"></div>
                  <h2 className="font-bold text-slate-700">Simulate & Review</h2>
                </div>
                {/* Live Data Badge */}
                <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-1 rounded border border-slate-200 text-slate-500">
                  <HandRaisedIcon className="w-4 h-4"/>
                  <span>Subject Model: <strong>{params.handSize === 'S' ? '5th %ile' : params.handSize === 'M' ? '50th %ile' : '95th %ile'}</strong></span>
                </div>
             </div>

             {/* Main Workspace (Split View) */}
             <div className="flex-1 flex overflow-hidden">
                
                {/* LEFT: 3D Viewer (Sketch 8 Viewer) */}
                <div className="w-2/3 bg-slate-50 relative flex items-center justify-center border-r border-slate-200 overflow-hidden">
                   
                   {/* Tool SVG */}
                   <svg viewBox="0 0 500 300" className="w-full h-full p-10 drop-shadow-lg transition-all duration-300 ease-out">
                      {/* Shaft */}
                      <rect x="50" y="148" width="250" height="4" fill="#64748b" />
                      <path d="M 50,150 L 20,130" stroke="#64748b" strokeWidth="3" />
                      <path d="M 50,150 L 20,170" stroke="#64748b" strokeWidth="3" />
                      
                      {/* Handle Group */}
                      <g transform={`translate(300, 150) rotate(${params.curve})`} className="transition-all duration-300 ease-out">
                         {/* Body */}
                         <path d={`M 0,-10 L 100,-10 L 100,10 L 0,10 Z`} fill="#94a3b8" stroke="#475569" strokeWidth={params.dia/4} />
                         
                         {/* GRIP LOOPS - PERMANENT HEATMAP */}
                         <g>
                           <circle cx="110" cy="-15" r={params.dia} fill="none" stroke="#475569" strokeWidth="4" />
                           <circle cx="110" cy="15" r={params.dia} fill="none" stroke="#475569" strokeWidth="4" />
                           {/* Heatmap Layer */}
                           <circle cx="110" cy="-15" r={params.dia} fill={getHeatColor(metrics.pressure)} fillOpacity={getHeatOpacity(metrics.pressure)} style={{ mixBlendMode: 'multiply' }} className="transition-colors duration-500"/>
                           <circle cx="110" cy="15" r={params.dia} fill={getHeatColor(metrics.pressure)} fillOpacity={getHeatOpacity(metrics.pressure)} style={{ mixBlendMode: 'multiply' }} className="transition-colors duration-500"/>
                         </g>
                         
                         {/* Hover Tooltip trigger (Title tag works in SVG) */}
                         <title>Pressure: {metrics.pressure} kPa</title>
                      </g>
                   </svg>
                   
                   {/* Heatmap Legend */}
                   <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded border border-slate-200 text-[10px] flex items-center gap-2 shadow-sm">
                      <span className="text-slate-500">Strain:</span>
                      <div className="flex gap-1">
                         <div className="w-3 h-3 rounded-full bg-green-500"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                         <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      </div>
                      <span className="text-slate-500">{metrics.pressure} kPa</span>
                   </div>

                   {/* Comparison Overlay */}
                   {showCompare && (
                     <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center z-20">
                        <div className="bg-white p-6 rounded shadow-xl border border-slate-200 max-w-lg w-full">
                           <div className="flex justify-between items-center mb-4">
                             <h3 className="font-bold">Before / After Comparison</h3>
                             <button onClick={() => setShowCompare(false)} className="border px-2 rounded hover:bg-slate-50"><XMarkIcon className="w-4 h-4"/></button>
                           </div>
                           <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="p-3 bg-red-50 border border-red-100 rounded">
                                 <strong className="block text-red-600 mb-2">Original</strong>
                                 <div>Risk Score: 72 (High)</div>
                                 <div>Handle Ø: 14mm</div>
                              </div>
                              <div className="p-3 bg-green-50 border border-green-100 rounded">
                                 <strong className="block text-green-600 mb-2">Current</strong>
                                 <div>Risk Score: {100 - metrics.score} (Optimized)</div>
                                 <div>Handle Ø: {params.dia}mm</div>
                              </div>
                           </div>
                        </div>
                     </div>
                   )}
                </div>

                {/* RIGHT: Results Matrix (Sketch 8 + Real Time) */}
                <div className="w-1/3 bg-white p-6 overflow-y-auto flex flex-col gap-6">
                   {/* RADAR CHART - ALWAYS ACTIVE */}
                   <div className="border border-slate-300 rounded p-4 bg-slate-50">
                      <div className="flex justify-between items-center mb-4">
                         <h3 className="font-bold text-slate-800">Performance Matrix</h3>
                         <div className={`font-bold text-xl ${metrics.score > 75 ? 'text-green-600' : 'text-orange-600'}`}>
                           {metrics.score}/100
                         </div>
                      </div>
                      
                      <div className="relative aspect-square max-h-48 mx-auto mb-4">
                         <div className="absolute inset-0 border border-slate-200 rounded-full scale-50"></div>
                         <div className="absolute inset-0 border border-slate-200 rounded-full"></div>
                         <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-slate-200"></div></div>
                         <div className="absolute inset-0 flex items-center justify-center"><div className="h-full w-px bg-slate-200"></div></div>
                         
                         <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible opacity-70 mix-blend-multiply">
                            <polygon 
                              points={`50,${50 - (metrics.comfort/2.2)} ${50 + (metrics.precision/2.2)},50 50,${50 + (metrics.stability/2.2)} ${50 - (metrics.score/2.2)},50`}
                              fill={metrics.score > 75 ? "rgba(34, 197, 94, 0.4)" : "rgba(249, 115, 22, 0.4)"}
                              stroke={metrics.score > 75 ? "#16a34a" : "#ea580c"}
                              strokeWidth="2"
                              className="transition-all duration-300 ease-linear"
                            />
                         </svg>
                         
                         <span className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 text-[10px] font-bold text-slate-500">COMFORT</span>
                         <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-4 text-[10px] font-bold text-slate-500">STABILITY</span>
                         <span className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 text-[10px] font-bold text-slate-500">SCORE</span>
                         <span className="absolute right-0 top-1/2 -translate-y-1/2 -mr-10 text-[10px] font-bold text-slate-500">PRECISION</span>
                      </div>
                   </div>

                   {/* Design Insights */}
                   <div className="border border-slate-300 rounded p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <InformationCircleIcon className="w-4 h-4 text-sky-500"/>
                        <h4 className="font-bold text-sm text-slate-700">Live Insights</h4>
                      </div>
                      <ul className="list-disc pl-4 text-xs text-slate-600 space-y-2">
                         <li className={metrics.pressure > 80 ? "text-red-600 font-bold" : ""}>
                           Pressure: {metrics.pressure} kPa {metrics.pressure > 80 && "(Trauma Risk!)"}
                         </li>
                         <li>
                           Diameter: {params.dia}mm {Math.abs(params.dia - 32) > 5 ? "(Adjust for Hand M)" : "(Optimal)"}
                         </li>
                      </ul>
                   </div>

                   {/* AI Recommendations (Only if score is low) */}
                   {metrics.score < 80 && (
                     <div className="border border-slate-300 rounded p-4 bg-sky-50">
                        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><BeakerIcon className="w-4 h-4"/> AI Auto-Refine</h3>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center bg-white p-2 rounded border border-sky-100 shadow-sm">
                              <div className="text-xs">
                                <div className="font-bold">Optimize Diameter</div>
                                <div className="text-slate-500">Target: 32mm</div>
                              </div>
                              <button onClick={() => applyAI("dia")} className="text-xs bg-sky-100 hover:bg-sky-200 text-sky-700 px-3 py-1 rounded font-bold transition">Apply</button>
                           </div>
                           <button onClick={() => applyAI("all")} className="w-full text-center text-xs font-bold text-sky-700 hover:underline mt-1">Apply All Suggestions</button>
                        </div>
                     </div>
                   )}
                   
                   {/* Bottom Actions */}
                   <div className="flex gap-2 mt-auto">
                      <button onClick={() => setShowCompare(true)} className="flex-1 border border-slate-300 bg-white py-2 text-xs font-bold hover:bg-slate-50">Compare</button>
                      <button onClick={() => setCurrentView("report")} className="flex-1 border border-slate-300 bg-white py-2 text-xs font-bold hover:bg-slate-50">Export Report</button>
                   </div>
                </div>
             </div>

             {/* BOTTOM CONTROL DECK (Sketch 5) */}
             <div className="h-48 bg-white border-t border-slate-300 p-6 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-10">
                <div className="flex gap-8 h-full">
                   {/* Col 1 */}
                   <div className="flex flex-col justify-between w-1/4">
                      <div>
                        <Label>Grip Selection</Label>
                        <div className="flex gap-2">
                           <Toggle active={params.gripType === "Power"} onClick={() => setParams({...params, gripType: "Power"})}>Power</Toggle>
                           <Toggle active={params.gripType === "Pinch"} onClick={() => setParams({...params, gripType: "Pinch"})}>Pinch</Toggle>
                        </div>
                      </div>
                      <div>
                         <Label>Surgeon Position</Label>
                         <div className="flex gap-2">
                           <Toggle active={params.position === "Standing"} onClick={() => setParams({...params, position: "Standing"})}>Stand</Toggle>
                           <Toggle active={params.position === "Seated"} onClick={() => setParams({...params, position: "Seated"})}>Seat</Toggle>
                        </div>
                      </div>
                   </div>

                   {/* Col 2 */}
                   <div className="flex flex-col justify-between w-1/4">
                      <div>
                        <Label>Hand Size</Label>
                        <div className="flex gap-2">
                           {(['S', 'M', 'L'] as const).map(s => (
                             <Toggle key={s} active={params.handSize === s} onClick={() => setParams({...params, handSize: s})}>{s}</Toggle>
                           ))}
                        </div>
                      </div>
                      <div>
                         <Label>Hand Orientation</Label>
                         <div className="flex gap-2">
                           <Toggle active={params.orientation === "Right"} onClick={() => setParams({...params, orientation: "Right"})}>Right</Toggle>
                           <Toggle active={params.orientation === "Left"} onClick={() => setParams({...params, orientation: "Left"})}>Left</Toggle>
                        </div>
                      </div>
                   </div>

                   {/* Col 3: Real-Time Sliders */}
                   <div className="flex flex-col justify-between w-1/3 border-l border-slate-200 pl-8">
                      <div className="space-y-4">
                         <div>
                            <div className="flex justify-between"><Label>Handle Ø (mm)</Label> <span className="text-xs border px-1 bg-slate-50 font-mono">{params.dia}</span></div>
                            <input type="range" min={5} max={45} value={params.dia} onChange={(e) => setParams({...params, dia: Number(e.target.value)})} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"/>
                         </div>
                         <div>
                            <div className="flex justify-between"><Label>Curvature (°)</Label> <span className="text-xs border px-1 bg-slate-50 font-mono">{params.curve}</span></div>
                            <input type="range" min={0} max={30} value={params.curve} onChange={(e) => setParams({...params, curve: Number(e.target.value)})} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"/>
                         </div>
                      </div>
                   </div>

                   {/* Col 4: Run Button */}
                   <div className="flex items-end flex-1">
                      <button 
                        onClick={handleRunSimulation}
                        disabled={simStatus === "loading"}
                        className="w-full h-12 bg-white border-2 border-slate-800 text-slate-800 font-bold hover:bg-slate-800 hover:text-white transition disabled:opacity-50"
                      >
                         {simStatus === "loading" ? "Analyzing..." : simStatus === "idle" ? "Initialize Sim" : "Update Model"}
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* === REPORT VIEW (Sketch 11) === */}
        {currentView === "report" && (
          <div className="p-10 max-w-5xl mx-auto w-full animate-in slide-in-from-bottom-4 bg-white min-h-full border border-slate-200 shadow-xl m-8">
             <div className="flex justify-between border-b border-slate-300 pb-4 mb-8">
                <button onClick={() => setCurrentView("simulate")} className="text-slate-500 border px-3 py-1 hover:bg-slate-50">← Back</button>
                <div className="text-center"><h1 className="text-xl font-bold text-slate-800">Report - {activeProject}</h1></div>
                <div className="text-right text-sm text-slate-500">21 Oct 2025</div>
             </div>
             <div className="border border-slate-400 p-6 mb-8">
                <div className="mb-4 flex justify-between">
                  <div>
                    <div>Hand Size: <strong>{params.handSize}</strong></div>
                    <div>Grip Type: <strong>{params.gripType}</strong></div>
                  </div>
                  <div className="text-right">
                    <div>Validation Score: <strong className={metrics.score > 80 ? "text-green-600" : "text-orange-600"}>{metrics.score}/100</strong></div>
                    <div>Status: <strong>{metrics.score > 80 ? "PASS" : "REVIEW NEEDED"}</strong></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 border-t border-slate-300 pt-4">
                   <div>
                      <h3 className="font-bold mb-2">Ergonomic Analysis</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                         <li>Comfort Index: {metrics.comfort.toFixed(0)}/100</li>
                         <li>Precision Index: {metrics.precision.toFixed(0)}/100</li>
                         <li>Calculated Pressure: {metrics.pressure} kPa</li>
                      </ul>
                   </div>
                   <div>
                      <h3 className="font-bold mb-2">Refinements Applied</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                         <li>Handle Diameter adjusted to {params.dia}mm.</li>
                         <li>Curvature set to {params.curve}°.</li>
                         <li>Material friction verified for {params.gripType} grip.</li>
                      </ul>
                   </div>
                </div>
             </div>
             <div className="flex justify-end"><button className="border border-slate-400 px-6 py-2 text-sm font-bold hover:bg-slate-50">Download JSON</button></div>
          </div>
        )}

      </main>

      {/* --- LOADING OVERLAY --- */}
      {simStatus === "loading" && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
           <div className="bg-white p-8 border border-slate-300 shadow-xl rounded max-w-sm w-full text-center">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-light text-slate-800 mb-2">Running Simulation</h2>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200"><div className="bg-slate-400 h-full w-1/2 animate-pulse"></div></div>
              <p className="mt-2 text-slate-500 text-sm">Processing Biomechanics...</p>
           </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${active ? "text-slate-900 font-bold border-l-2 border-slate-900 bg-slate-50" : "text-slate-500 hover:text-slate-900"}`}>{icon}{label}</button>;
}

interface ProjectCardProps {
  name: string;
  date: string;
  risk: string;
  issue: string;
  onClick: () => void;
}

function ProjectCard({ name, date, risk, issue, onClick }: ProjectCardProps) {
  return <div onClick={onClick} className="border border-slate-300 p-4 cursor-pointer hover:shadow-md transition bg-white"><div className="flex items-center gap-2 mb-2"><DocumentTextIcon className="w-5 h-5 text-slate-400"/><span className="font-bold text-slate-800">{name}</span><span className="text-xs text-slate-400 ml-auto">{date}</span></div><div className="text-sm space-y-1"><div>• Risk: <span className={risk === "Medium" ? "text-orange-600 font-bold" : "text-green-600 font-bold"}>{risk}</span></div><div className="text-slate-600">• {issue}</div></div><div className="mt-4 text-right"><span className="border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50">Open</span></div></div>;
}

interface FieldProps {
  label: string;
  placeholder: string;
}

function Field({ label, placeholder }: FieldProps) {
  return <div><label className="block text-sm font-bold text-slate-700 mb-1">{label}</label><input type="text" placeholder={placeholder} className="w-full border border-slate-300 px-3 py-2 text-sm rounded"/></div>;
}

interface LabelProps {
  children: React.ReactNode;
}

function Label({ children }: LabelProps) {
  return <span className="block text-xs font-bold text-slate-500 uppercase mb-2">{children}</span>;
}

interface ToggleProps {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

function Toggle({ active, children, onClick }: ToggleProps) {
  return <button onClick={onClick} className={`border px-3 py-1 text-sm ${active ? "border-slate-800 font-bold bg-white" : "border-slate-300 text-slate-500 bg-slate-50"}`}>{children}</button>;
}