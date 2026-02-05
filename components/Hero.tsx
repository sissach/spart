
import React from 'react';
import { PageView } from '../App';

interface HeroProps {
  onNavigate: (page: PageView) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative h-[90vh] flex items-center overflow-hidden bg-stone-50">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070" 
          alt="ESPART Architektur" 
          className="w-full h-full object-cover grayscale-[30%]"
        />
        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-4xl">
          <div className="overflow-hidden mb-6">
             <h2 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold fade-in drop-shadow-md" style={{animationDelay: '0.2s'}}>
               Ihr Partner für Architektur & Liegenschaften
             </h2>
          </div>
          <h1 className="text-6xl md:text-9xl font-serif text-white leading-[0.9] mb-10 tracking-tighter fade-in drop-shadow-2xl" style={{animationDelay: '0.4s'}}>
            Werte schaffen. <br />
            <span className="italic">Zukunft bauen.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-xl leading-relaxed fade-in font-light drop-shadow-lg" style={{animationDelay: '0.6s'}}>
            ESPART steht für ganzheitliche Lösungen in den Bereichen Immobilien, Architektur und Hauswartung. Seit 2008 in Zürich.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 fade-in" style={{animationDelay: '0.8s'}}>
            <button 
              onClick={() => onNavigate('immobilien')} 
              className="group flex items-center justify-center gap-4 px-10 py-5 bg-white text-stone-900 hover:bg-[#D4AF37] hover:text-white transition-all uppercase tracking-[0.2em] text-[10px] font-black shadow-2xl"
            >
              Zu den Immobilien
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button 
              onClick={() => onNavigate('kontakt')}
              className="px-10 py-5 border-2 border-white/40 text-white hover:border-white transition-all uppercase tracking-[0.2em] text-[10px] font-black flex justify-center items-center backdrop-blur-sm"
            >
              Kontakt aufnehmen
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:block rotate-90 origin-right">
        <span className="text-[10px] uppercase tracking-[0.8em] text-[#D4AF37] font-black drop-shadow-sm">EST. 2008 • Jona & Zürich</span>
      </div>
    </section>
  );
};

export default Hero;
