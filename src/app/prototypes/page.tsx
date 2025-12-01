"use client";

import { useState, useEffect, useRef } from "react";
import { 
  CloudArrowUpIcon, 
  CpuChipIcon, 
  DocumentTextIcon, 
  HomeIcon, 
  BeakerIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  CursorArrowRaysIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  Square3Stack3DIcon,
  HandRaisedIcon,
  WrenchScrewdriverIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

// --- Types & Constants ---
type ViewState = "dashboard" | "upload" | "simulate" | "report";
type SimMode = "static" | "dynamic"; // New: Dynamic mode animates grip

// Mock coefficients for material friction
const MATERIALS = {
  "steel": { name: "Stainless Steel 316L", friction: 0.4, density: 7.8 },
  "polymer": { name: "Medical Polymer (PEEK)", friction: 0.7, density: 1.3 },
  "silicone": { name: "Silicone Overmold", friction: 0.9, density: 1.1 }
};

export default function PrototypePage() {
  // --- Global State ---
  const [currentView, setCurrentView] = useState<ViewState>("simulate"); // Default to sim for demo
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  // --- Simulation Inputs ---
  const [handleDia, setHandleDia] = useState(10); // mm (Start very thin)
  const [handleCurve, setHandleCurve] = useState(0); // degrees
  const [handleLength, setHandleLength] = useState(100); // mm
  const [handSize, setHandSize] = useState<"S"|"M"|"L">("M");
  const [material, setMaterial] = useState<keyof typeof MATERIALS>("steel");
  const [gripForce, setGripForce] = useState(50); // N (Force applied by surgeon)

  // --- Analysis Outputs (Computed) ---
  const [metrics, setMetrics] = useState({
    comfort: 0,
    precision: 0,
    fatigue: 0, // Lower is better, but for chart we might invert
    stability: 0,
    pressure: 0 // Localized pressure (kPa)
  });

  const [activeSensors, setActiveSensors] = useState<number[]>([]); // Which nodes light up
  const [simMode, setSimMode] = useState<SimMode>("static");
  const logEndRef = useRef<HTMLDivElement>(null);

  // --- Helper: Add to System Log ---
  const log = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
    setConsoleLogs(prev => [...prev.slice(-4), `[${timestamp}] ${msg}`]);
  };

  // --- THE "PHYSICS" ENGINE ---
  // This effect calculates nuanced metrics whenever inputs change.
  useEffect(() => {
    // 1. Determine Ideal Diameter based on Hand Size
    const idealDia = handSize === "S" ? 25 : handSize === "M" ? 30 : 35;
    
    // 2. Calculate Deviation
    const diaDiff = Math.abs(handleDia - idealDia);
    
    // 3. Compute Metrics
    // Comfort: Penalty for being too far from ideal size + bonus for friction (silicone is comfy)
    let comfortVal = 100 - (diaDiff * 4);
    if (material === "silicone") comfortVal += 10;
    if (handleCurve > 5 && handleCurve < 20) comfortVal += 15; // Natural curve bonus
    comfortVal = Math.max(0, Math.min(100, comfortVal));

    // Precision: Thinner handles are often more precise, but too thin is unstable
    // Heavier materials (Steel) dampen tremor -> better precision
    let precisionVal = 80 - (handleDia * 1.5); 
    if (handleDia < 15) precisionVal -= 20; // Too thin penalty
    if (material === "steel") precisionVal += 10;
    if (handleLength > 120) precisionVal -= 10; // Too long = unwieldy
    precisionVal = Math.max(0, Math.min(100, precisionVal));

    // Stability: Increases with Diameter (up to a point) and Grip Force
    let stabilityVal = (handleDia * 2) + (gripForce / 5);
    if (handleCurve > 10) stabilityVal += 10;
    stabilityVal = Math.max(0, Math.min(100, stabilityVal));

    // Pressure (The "Bad" Metric): Force / Area. Small Area = High Pressure.
    // We treat diameter as a proxy for contact area.
    const contactArea = handleDia * 3.14 * (handleLength * 0.5); // Mock area
    const pressureKPa = Math.floor((gripForce * 1000) / contactArea);

    setMetrics({
      comfort: Math.floor(comfortVal),
      precision: Math.floor(precisionVal),
      fatigue: Math.floor(100 - comfortVal), // Inverse of comfort roughly
      stability: Math.floor(stabilityVal),
      pressure: pressureKPa
    });

    // 4. Update Sensor Nodes (Hotspots)
    // If pressure is high, sensors 0 & 1 (thumb/index) light up
    // If wrist angle (curve) is bad, sensor 2 (wrist) lights up
    const newSensors = [];
    if (pressureKPa > 80) newSensors.push(0, 1); // Finger sensors
    if (handleCurve < 5 && comfortVal < 50) newSensors.push(2); // Wrist sensor
    setActiveSensors(newSensors);

  }, [handleDia, handleCurve, handleLength, handSize, material, gripForce]);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);


  // --- INTERACTION HANDLERS ---

  const optimizeDesign = (strategy: "balanced" | "precision") => {
    log(`AI Optimization Routine Started: Strategy=${strategy.toUpperCase()}...`);
    
    const targetDia = handSize === "S" ? 24 : handSize === "M" ? 28 : 32;
    const targetCurve = 12;

    // Use a timer to animate the "solving"
    let step = 0;
    const interval = setInterval(() => {
      step++;
      
      // Gradually move Diameter
      setHandleDia(prev => {
        const diff = targetDia - prev;
        return Math.abs(diff) < 1 ? targetDia : prev + (diff > 0 ? 1 : -1);
      });

      // Gradually move Curve
      setHandleCurve(prev => {
        const diff = targetCurve - prev;
        return Math.abs(diff) < 1 ? targetCurve : prev + (diff > 0 ? 1 : -1);
      });

      // Random jitter to grip force to simulate testing
      setGripForce(prev => 40 + Math.floor(Math.random() * 20));

      if (step > 20) {
        clearInterval(interval);
        log("Optimization Complete. Pareto frontier reached.");
        if (strategy === "precision") {
          // If precision, sacrifice some comfort for stability
          setMaterial("steel");
          log("Material switched to Steel for mass damping.");
        } else {
          setMaterial("silicone");
          log("Material switched to Silicone for pressure distribution.");
        }
      }
    }, 50);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden select-none">
      
      {/* --- SIDEBAR (Compact) --- */}
      <aside className="w-16 bg-slate-900 flex flex-col items-center py-6 gap-6 z-20">
        <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">ES</div>
        <nav className="flex flex-col gap-4 w-full">
          <NavIcon icon={<HomeIcon/>} active={currentView === "dashboard"} onClick={() => setCurrentView("dashboard")} />
          <NavIcon icon={<CloudArrowUpIcon/>} active={currentView === "upload"} onClick={() => setCurrentView("upload")} />
          <NavIcon icon={<CpuChipIcon/>} active={currentView === "simulate"} onClick={() => setCurrentView("simulate")} />
          <NavIcon icon={<DocumentTextIcon/>} active={currentView === "report"} onClick={() => setCurrentView("report")} />
        </nav>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-slate-700">Simulation Environment</h1>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500 font-mono">Project: LG_Pro_v3.step</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
               <span className={`w-2 h-2 rounded-full ${simMode === 'static' ? 'bg-orange-400' : 'bg-green-500 animate-pulse'}`}></span>
               <span className="text-slate-600 font-medium text-xs uppercase">{simMode} Analysis</span>
             </div>
             <button onClick={() => setSimMode(s => s === 'static' ? 'dynamic' : 'static')} className="text-sky-600 hover:underline">
               {simMode === 'static' ? 'Run Dynamic Test' : 'Stop Test'}
             </button>
          </div>
        </header>

        {/* --- 3-COLUMN LAYOUT --- */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          
          {/* COLUMN 1: CONTROLS (Scrollable) */}
          <div className="col-span-3 bg-white border-r border-slate-200 overflow-y-auto p-4 flex flex-col gap-6">
             
             {/* Section: Geometry */}
             <ControlSection title="Geometry Definition" icon={<AdjustmentsHorizontalIcon/>}>
                <SliderControl label="Handle Diameter" val={handleDia} set={setHandleDia} min={5} max={45} unit="mm" />
                <SliderControl label="Shaft Curvature" val={handleCurve} set={setHandleCurve} min={0} max={30} unit="°" />
                <SliderControl label="Handle Length" val={handleLength} set={setHandleLength} min={80} max={200} unit="mm" />
             </ControlSection>

             {/* Section: User & Physics */}
             <ControlSection title="User Profile & Physics" icon={<HandRaisedIcon/>}>
                <div className="mb-4">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Glove Size</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L'].map(s => (
                      <button key={s} onClick={() => { setHandSize(s as any); log(`User profile updated: Size ${s}`); }} 
                        className={`flex-1 py-1 text-xs font-bold border rounded ${handSize === s ? 'bg-slate-800 text-white border-slate-800' : 'text-slate-500 border-slate-200'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <SliderControl label="Avg. Grip Force" val={gripForce} set={setGripForce} min={10} max={100} unit="N" />
             </ControlSection>

             {/* Section: Material */}
             <ControlSection title="Material Properties" icon={<Square3Stack3DIcon/>}>
                <div className="space-y-2">
                  {Object.entries(MATERIALS).map(([key, mat]) => (
                    <button 
                      key={key}
                      onClick={() => { setMaterial(key as any); log(`Material changed to ${mat.name}`); }}
                      className={`w-full text-left p-2 rounded border text-xs flex justify-between items-center ${material === key ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500' : 'border-slate-200 hover:bg-slate-50'}`}
                    >
                      <span className="font-medium text-slate-700">{mat.name}</span>
                      {material === key && <CheckCircleIcon className="w-4 h-4 text-sky-600"/>}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-[10px] text-slate-400 grid grid-cols-2 gap-2">
                   <div>Friction: µ={MATERIALS[material].friction}</div>
                   <div>Density: {MATERIALS[material].density} g/cm³</div>
                </div>
             </ControlSection>
          </div>

          {/* COLUMN 2: VISUALIZATION (Central) */}
          <div className="col-span-6 bg-slate-100 relative flex flex-col">
             
             {/* 3D Viewport Area */}
             <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
                {/* Grid */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Dynamic SVG Tool */}
                <svg viewBox="0 0 500 400" className="w-full h-full drop-shadow-2xl transition-all duration-300">
                   <defs>
                     <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor={material === 'polymer' ? '#e2e8f0' : '#94a3b8'} />
                       <stop offset="100%" stopColor={material === 'polymer' ? '#cbd5e1' : '#475569'} />
                     </linearGradient>
                     <filter id="glow">
                       <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                       <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                     </filter>
                   </defs>

                   {/* Shaft & Jaws */}
                   <g transform="translate(50, 200)">
                     <rect x="0" y="-3" width={250} height="6" fill="#64748b" rx="2" />
                     {/* Jaws animate in dynamic mode */}
                     <path d="M 0,0 L -30,-15" stroke="#64748b" strokeWidth="4" className={simMode === 'dynamic' ? 'animate-[wiggle_1s_ease-in-out_infinite]' : ''} />
                     <path d="M 0,0 L -30,15" stroke="#64748b" strokeWidth="4" className={simMode === 'dynamic' ? 'animate-[wiggle_1s_ease-in-out_infinite_reverse]' : ''}/>
                   </g>

                   {/* Handle Group */}
                   <g transform={`translate(300, 200) rotate(${handleCurve})`}>
                      {/* Connection */}
                      <rect x="-20" y="-8" width="20" height="16" fill="#475569" />
                      
                      {/* Main Handle Body - Scales with Length and Dia */}
                      <path 
                        d={`M 0,-${handleDia/2} L ${handleLength},- ${handleDia/2} L ${handleLength},${handleDia/2} L 0,${handleDia/2} Z`}
                        fill="url(#bodyGrad)"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      
                      {/* Loops / Grips */}
                      <circle cx={handleLength + 10} cy={-handleDia/2} r={handleDia} fill="none" stroke="url(#bodyGrad)" strokeWidth="6" />
                      <circle cx={handleLength + 10} cy={handleDia/2} r={handleDia} fill="none" stroke="url(#bodyGrad)" strokeWidth="6" />

                      {/* --- SENSOR NODES (Visual Feedback) --- */}
                      
                      {/* Sensor 0: Top Finger Loop */}
                      <circle cx={handleLength + 10} cy={-handleDia/2 - handleDia} r="6" 
                        fill={activeSensors.includes(0) ? "#ef4444" : "#22c55e"} 
                        className="transition-colors duration-300" 
                        filter="url(#glow)"
                      />
                      
                      {/* Sensor 1: Bottom Finger Loop */}
                      <circle cx={handleLength + 10} cy={handleDia/2 + handleDia} r="6" 
                        fill={activeSensors.includes(1) ? "#ef4444" : "#22c55e"} 
                        className="transition-colors duration-300"
                        filter="url(#glow)"
                      />

                      {/* Sensor 2: Wrist Joint / Base */}
                      <circle cx="0" cy="0" r="6" 
                        fill={activeSensors.includes(2) ? "#f59e0b" : "#22c55e"} 
                        className="transition-colors duration-300"
                        filter="url(#glow)"
                      />
                   </g>
                </svg>

                {/* Overlays */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg border border-slate-200 shadow-sm text-xs space-y-1">
                   <div className="flex justify-between w-32"><span>Polygons:</span> <span className="font-mono">12.4k</span></div>
                   <div className="flex justify-between w-32"><span>Solver:</span> <span className="font-mono text-green-600">Converged</span></div>
                </div>
             </div>

             {/* Bottom: System Log (The "Matrix" feel) */}
             <div className="h-40 bg-slate-900 border-t border-slate-700 p-3 font-mono text-xs overflow-y-auto">
                <div className="text-slate-400 mb-1 opacity-50 border-b border-slate-700 pb-1">SYSTEM CONSOLE [AI-CORE-01]</div>
                {consoleLogs.length === 0 && <div className="text-slate-600 italic">Waiting for input...</div>}
                {consoleLogs.map((l, i) => (
                  <div key={i} className="text-green-500/80 mb-0.5 whitespace-nowrap">&gt; {l}</div>
                ))}
                <div ref={logEndRef}></div>
             </div>
          </div>

          {/* COLUMN 3: ANALYTICS (Deep Data) */}
          <div className="col-span-3 bg-white border-l border-slate-200 p-6 flex flex-col gap-8 overflow-y-auto">
             
             {/* Radar Chart Visualization */}
             <div>
               <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                 <ChartBarIcon className="w-5 h-5 text-sky-600"/> Performance Matrix
               </h3>
               
               <div className="relative w-full aspect-square bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
                 {/* Background Webs */}
                 <div className="absolute inset-0 border rounded-full border-slate-200 scale-[0.25]"></div>
                 <div className="absolute inset-0 border rounded-full border-slate-200 scale-[0.5]"></div>
                 <div className="absolute inset-0 border rounded-full border-slate-200 scale-[0.75]"></div>
                 
                 {/* The "Radar" Blob - Computed from metrics */}
                 <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible opacity-80 mix-blend-multiply">
                   <polygon 
                     points={`
                       50,${50 - (metrics.comfort/2)} 
                       ${50 + (metrics.precision/2.5)},50 
                       50,${50 + (metrics.stability/2)} 
                       ${50 - (metrics.fatigue/2.5)},50
                     `}
                     fill="rgba(14, 165, 233, 0.4)"
                     stroke="#0284c7"
                     strokeWidth="2"
                     className="transition-all duration-500 ease-out"
                   />
                 </svg>

                 {/* Labels */}
                 <span className="absolute top-2 text-[10px] font-bold text-slate-500">COMFORT</span>
                 <span className="absolute right-2 text-[10px] font-bold text-slate-500">PRECISION</span>
                 <span className="absolute bottom-2 text-[10px] font-bold text-slate-500">STABILITY</span>
                 <span className="absolute left-2 text-[10px] font-bold text-slate-500">FATIGUE</span>
               </div>
             </div>

             {/* Detailed Metrics List */}
             <div className="space-y-4">
                <MetricBar label="Contact Pressure (kPa)" value={metrics.pressure} max={150} inverse />
                <MetricBar label="Grip Comfort Index" value={metrics.comfort} max={100} />
                <MetricBar label="Mechanical Stability" value={metrics.stability} max={100} />
             </div>

             {/* AI Optimization Panel */}
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
               <div className="flex items-center gap-2 mb-3">
                 <BeakerIcon className="w-5 h-5 text-purple-600"/>
                 <h4 className="font-bold text-slate-800 text-sm">AI Solver</h4>
               </div>
               <p className="text-xs text-slate-500 mb-4">Select an optimization strategy to auto-tune geometry.</p>
               
               <div className="grid grid-cols-2 gap-2">
                 <button onClick={() => optimizeDesign("balanced")} className="px-3 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:border-purple-400 hover:text-purple-600 transition">
                   Balanced
                 </button>
                 <button onClick={() => optimizeDesign("precision")} className="px-3 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:border-sky-400 hover:text-sky-600 transition">
                   Max Precision
                 </button>
               </div>
             </div>

             {/* Export Button */}
             <button onClick={() => log("Generating PDF report...")} className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-bold shadow hover:bg-slate-800 transition">
               Export Analysis
             </button>

          </div>

        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavIcon({ icon, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}
    >
      <div className="w-5 h-5">{icon}</div>
    </button>
  )
}

function ControlSection({ title, icon, children }: any) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full bg-slate-50 p-3 flex items-center justify-between hover:bg-slate-100 transition">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase">
          <div className="w-4 h-4 text-slate-500">{icon}</div>
          {title}
        </div>
        <ChevronDownIcon className={`w-3 h-3 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}/>
      </button>
      {open && <div className="p-4 bg-white space-y-5 animate-in slide-in-from-top-2 duration-200">{children}</div>}
    </div>
  )
}

function SliderControl({ label, val, set, min, max, unit }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-xs font-medium text-slate-600">{label}</label>
        <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{val}{unit}</span>
      </div>
      <input 
        type="range" min={min} max={max} value={val} onChange={(e) => set(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600 hover:accent-sky-500"
      />
    </div>
  )
}

function MetricBar({ label, value, max, inverse }: any) {
  // Inverse means Higher is Bad (e.g. Pressure)
  const percent = Math.min(100, (value / max) * 100);
  let color = 'bg-sky-500';
  if (inverse) {
    color = percent > 80 ? 'bg-red-500' : percent > 50 ? 'bg-orange-400' : 'bg-green-500';
  } else {
    color = percent < 30 ? 'bg-red-500' : percent < 70 ? 'bg-yellow-400' : 'bg-green-500';
  }

  return (
    <div>
      <div className="flex justify-between mb-1 text-xs">
        <span className="text-slate-500 font-medium">{label}</span>
        <span className="font-bold text-slate-700">{value}</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-500 ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  )
}