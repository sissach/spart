
import React, { useState } from 'react';

type LightingScenario = 'day' | 'twilight' | 'night';

const Conceptual3DViewer: React.FC = () => {
  const [zoom, setZoom] = useState(1.25);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scenario, setScenario] = useState<LightingScenario>('night');
  const [showControls, setShowControls] = useState(true);

  // Styles based on lighting scenario
  const getScenarioStyles = () => {
    switch (scenario) {
      case 'day':
        return {
          container: 'bg-stone-100',
          grid: 'opacity-20 bg-[linear-gradient(stone-400_1px,transparent_1px),linear-gradient(90deg,stone-400_1px,transparent_1px)]',
          coreGlow: 'bg-stone-900/10 shadow-[0_0_100px_rgba(0,0,0,0.1)]',
          core: 'bg-stone-900 shadow-[0_0_30px_rgba(0,0,0,0.2)]',
          hud: 'bg-white/60 text-stone-900 border-stone-200',
          lines: 'via-stone-400',
          indicators: 'text-stone-400'
        };
      case 'twilight':
        return {
          container: 'bg-gradient-to-br from-indigo-950 via-stone-900 to-orange-900/40',
          grid: 'opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]',
          coreGlow: 'bg-orange-500/10 shadow-[0_0_100px_rgba(249,115,22,0.2)]',
          core: 'bg-orange-50 shadow-[0_0_40px_rgba(255,255,255,0.8)]',
          hud: 'bg-stone-900/60 text-white border-white/10',
          lines: 'via-orange-400/30',
          indicators: 'text-orange-200/50'
        };
      case 'night':
      default:
        return {
          container: 'bg-stone-950',
          grid: 'opacity-10 bg-[linear-gradient(stone-700_1px,transparent_1px),linear-gradient(90deg,stone-700_1px,transparent_1px)]',
          coreGlow: 'bg-stone-100/10 blur-3xl',
          core: 'bg-white shadow-[0_0_50px_rgba(255,255,255,1)]',
          hud: 'bg-stone-900/60 text-white border-white/10',
          lines: 'via-white',
          indicators: 'text-stone-500'
        };
    }
  };

  const s = getScenarioStyles();

  return (
    <div className={`relative w-full h-full ${s.container} flex items-center justify-center overflow-hidden rounded-xl border border-stone-800/50 transition-all duration-1000 min-h-[400px]`}>
      
      {/* 3D Scene Wrapper */}
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
        style={{ 
          transform: `scale(${zoom}) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
          perspective: '1500px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Dynamic Grid Background */}
        <div 
          className={`absolute inset-0 ${s.grid} animate-[pulse_6s_ease-in-out_infinite]`}
          style={{ 
            backgroundSize: '30px 30px',
            transform: 'rotateX(75deg) scale(3) translateY(-10%)',
            transformOrigin: 'top center'
          }}
        ></div>

        {/* Central Neural Sphere */}
        <div className="relative flex items-center justify-center" style={{ transform: 'translateZ(100px)' }}>
          <div className={`absolute w-32 md:w-48 h-32 md:h-48 ${s.coreGlow} rounded-full animate-pulse`}></div>
          <div className="absolute w-40 md:w-56 h-40 md:h-56 border border-stone-800/80 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute w-24 md:w-40 h-24 md:h-40 border border-stone-700/60 rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
          
          <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
             <div className={`absolute inset-0 ${scenario === 'day' ? 'bg-stone-900' : 'bg-white'} rounded-full animate-[pulse_2s_ease-in-out_infinite] blur-[2px]`}></div>
             <div className={`w-4 h-4 md:w-6 md:h-6 ${s.core} rounded-full z-20`}></div>
          </div>

          <div className="absolute w-full h-full animate-[spin_4s_linear_infinite]">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 md:w-1.5 h-1 md:h-1.5 ${scenario === 'day' ? 'bg-stone-900' : 'bg-white'} rounded-full shadow-[0_0_10px_white]`}></div>
          </div>
        </div>
      </div>

      {/* Toggle Controls Button (Mobile Optimized) */}
      <button 
        onClick={() => setShowControls(!showControls)}
        className={`absolute top-4 left-4 p-2 rounded-lg ${s.hud} backdrop-blur-md border z-[40] md:hidden`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showControls ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
        </svg>
      </button>

      {/* Lighting Scenario Controls */}
      <div className={`absolute top-4 right-4 md:top-6 md:right-6 p-1 rounded-full ${s.hud} backdrop-blur-md border flex gap-1 z-30 transition-all duration-500 scale-90 md:scale-100`}>
        {(['day', 'twilight', 'night'] as LightingScenario[]).map((scen) => (
          <button
            key={scen}
            onClick={() => setScenario(scen)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[8px] md:text-[9px] uppercase tracking-widest font-black transition-all ${
              scenario === scen 
                ? 'bg-stone-900 text-white shadow-lg' 
                : 'hover:bg-black/5'
            }`}
          >
            {scen === 'day' ? 'Tag' : scen === 'twilight' ? 'Dämmerung' : 'Nacht'}
          </button>
        ))}
      </div>

      {/* Camera Navigation HUD */}
      <div className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 p-4 md:p-6 rounded-2xl ${s.hud} backdrop-blur-md border space-y-3 md:space-y-4 z-30 transition-all duration-500 w-[calc(100%-2rem)] max-w-[180px] md:max-w-[200px] ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none md:opacity-100 md:translate-y-0'}`}>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-[7px] md:text-[8px] uppercase tracking-widest font-bold opacity-60">Zoom</span>
            <span className="text-[9px] md:text-[10px] font-mono">{Math.round(zoom * 100)}%</span>
          </div>
          <input 
            type="range" min="0.5" max="2" step="0.1" 
            value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-[7px] md:text-[8px] uppercase tracking-widest font-bold opacity-60">Neigung</span>
            <span className="text-[9px] md:text-[10px] font-mono">{rotationX}°</span>
          </div>
          <input 
            type="range" min="-45" max="45" step="1" 
            value={rotationX} onChange={(e) => setRotationX(parseInt(e.target.value))}
            className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-[7px] md:text-[8px] uppercase tracking-widest font-bold opacity-60">Schwenken</span>
            <span className="text-[9px] md:text-[10px] font-mono">{rotationY}°</span>
          </div>
          <input 
            type="range" min="-45" max="45" step="1" 
            value={rotationY} onChange={(e) => setRotationY(parseInt(e.target.value))}
            className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <button 
          onClick={() => { setZoom(1.25); setRotationX(0); setRotationY(0); }}
          className="w-full py-2 text-[7px] md:text-[8px] uppercase tracking-widest font-black border border-current rounded hover:bg-white/10 transition-colors"
        >
          Reset View
        </button>
      </div>

      {/* Floating Geometric Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className={`absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${s.lines} to-transparent animate-[scan_5s_linear_infinite]`}></div>
        <div className={`absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${s.lines} to-transparent animate-[scan_5s_linear_infinite_delay-2s]`}></div>
      </div>

      {/* Architectural Text Indicators (Responsive Hide) */}
      <div className="absolute top-16 md:top-8 left-4 md:left-8 space-y-1 md:space-y-2 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-[1px] w-4 md:w-8 bg-current opacity-30"></div>
          <span className={`text-[7px] md:text-[9px] uppercase tracking-[0.4em] ${s.indicators} font-bold`}>Neural Core Active</span>
        </div>
        <div className={`text-[8px] md:text-[10px] ${s.indicators} font-serif italic opacity-70`}>Analyzing Spatial Harmonics...</div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(500%); opacity: 0; }
        }
        .animate-scan-delay-2s {
          animation-delay: 2.5s;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          background: #1c1917;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
        }
        @media (min-width: 768px) {
          input[type='range']::-webkit-slider-thumb {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Conceptual3DViewer;
