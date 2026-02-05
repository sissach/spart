
import React, { useState, useEffect, useRef } from 'react';
import { PageView } from '../App';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  isAdminMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, isAdminMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const GOLD = "#D4AF37";

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsScrolled(scrolled > 20);
      
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalDocScrollLength = docHeight - winHeight;
      setScrollProgress(totalDocScrollLength > 0 ? Math.floor((scrolled / totalDocScrollLength) * 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: { id: PageView; label: string; icon?: React.ReactNode; subItems?: {id: PageView; label: string}[] }[] = [
    { 
      id: 'home', 
      label: 'Home',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: 'immobilien', 
      label: 'Immobilien',
      subItems: [
        { id: 'immobilien', label: 'Übersicht' },
        { id: 'mieten', label: 'Mieten' },
        { id: 'immobilien-hauswartung', label: 'Kaufen' },
      ]
    },
    { 
      id: 'dienstleistungen', 
      label: 'Dienstleistungen',
      subItems: [
        { id: 'dienstleistungen', label: 'Übersicht' },
        { id: 'bewirtschaftung', label: 'Bewirtschaftung' },
        { id: 'stockwerkeigentum', label: 'Stockwerkeigentum' },
        { id: 'vermietung', label: 'Vermietung' },
        { id: 'verkauf', label: 'Verkauf' },
        { id: 'bauleitung', label: 'Bauleitung' },
      ]
    },
    { 
      id: 'ueber-uns', 
      label: 'Über uns',
      subItems: [
        { id: 'ueber-uns', label: 'Team Übersicht' },
        { id: 'entstehung', label: 'Entstehung' },
        { id: 'referenzen', label: 'Referenzen' },
      ]
    },
    { 
      id: 'hauswartung', 
      label: 'Hauswartung',
      subItems: [
        { id: 'hauswartung', label: 'Übersicht' },
        { id: 'team-hauswartung', label: 'Team HW' },
        { id: 'dienstleistungen-hauswartung', label: 'Leistungen' },
      ]
    },
    { id: 'downloads', label: 'Downloads' },
    { 
      id: 'kontakt', 
      label: 'Kontakt',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
  ];

  const handleLogoClick = () => {
    if (isLogoAnimating) return;
    setIsLogoAnimating(true);
    onNavigate('home');
    setActiveDropdown(null);
    
    // Die Animation dauert 1.8s (siehe index.html CSS)
    setTimeout(() => {
      setIsLogoAnimating(false);
    }, 1850);
  };

  const handleNavClick = (page: PageView, hasSubItems: boolean) => {
    // Wenn es Untermenüs gibt, navigiert der Hauptbutton nicht mehr direkt, 
    // sondern dient nur als Anker/Label (wie vom User gewünscht).
    if (!hasSubItems) {
      onNavigate(page);
      setActiveDropdown(null);
    }
  };

  const handleSubNavClick = (page: PageView) => {
    onNavigate(page);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (itemId: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const isHome = currentPage === 'home';
  
  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 no-print flex flex-col items-center ${isScrolled ? 'bg-white/80 backdrop-blur-xl pt-4 pb-4 shadow-xl shadow-stone-200/30' : 'bg-transparent pt-8 pb-6'}`}>
      <div className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ease-out z-[1001]" style={{ width: `${scrollProgress}%`, backgroundColor: GOLD }}></div>

      <div className="max-w-[1800px] w-full mx-auto px-8 flex flex-col items-center gap-6 md:gap-8">
        <div className="flex items-center justify-center w-full h-24 flex-shrink-0">
          <button 
            onClick={handleLogoClick} 
            className={`flex flex-col items-center gap-3 group outline-none ${isLogoAnimating ? 'animate-logo-journey' : ''}`}
            style={{ zIndex: 1002 }}
          >
            <div 
              className="relative flex items-center justify-center font-black transition-all duration-500 border-2 w-10 h-10 text-xl" 
              style={{ 
                backgroundColor: isHome ? 'transparent' : '#1c1917', 
                color: isHome ? (isScrolled ? '#1c1917' : GOLD) : '#fff', 
                borderColor: isHome ? (isScrolled ? '#1c1917' : GOLD) : 'transparent' 
              }}
            >
              E
            </div>
            <span className={`font-black tracking-tighter uppercase text-xl leading-none transition-colors duration-500 ${isHome && !isScrolled ? 'text-[#D4AF37]' : 'text-stone-900'}`}>Espart</span>
          </button>
        </div>
        
        <nav className="w-full relative">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {menuItems.map((item) => {
              const isActive = item.id === currentPage || item.subItems?.some(sub => sub.id === currentPage);
              const isSpecial = item.id === 'home';
              const hasSub = !!item.subItems;
              const isDropdownOpen = activeDropdown === item.id;
              
              return (
                <div 
                  key={item.id} 
                  className="relative"
                  onMouseEnter={() => hasSub && handleMouseEnter(item.id)}
                  onMouseLeave={() => hasSub && handleMouseLeave()}
                >
                  <button 
                    onClick={() => handleNavClick(item.id, hasSub)}
                    className={`group relative py-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] outline-none ${hasSub ? 'cursor-default' : 'cursor-pointer'}`}
                    style={{
                      transform: isActive ? 'scale(1.1) translateY(0)' : 'scale(1) translateY(0)',
                      willChange: 'transform',
                      opacity: isActive || isDropdownOpen ? 1 : (isScrolled ? 0.6 : 0.8),
                      zIndex: isActive ? 10 : 1
                    }}
                  >
                    <span 
                      className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-2 whitespace-nowrap ${
                        isActive 
                          ? 'text-[#D4AF37]' 
                          : (isScrolled 
                              ? 'text-stone-500 group-hover:text-stone-900 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]' 
                              : 'text-stone-400 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)]')
                      }`}
                    >
                      {item.icon ? (
                        <span className="opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          {item.icon}
                        </span>
                      ) : null}
                      {!(isSpecial && item.icon) && item.label}
                      {hasSub && (
                        <svg className={`w-2.5 h-2.5 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {hasSub && (
                    <div 
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-500 origin-top ${
                        isDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
                      }`}
                      style={{ zIndex: 1100 }}
                    >
                      {/* Pyramid Style Dropdown Container */}
                      <div className="flex flex-col items-center gap-1.5 min-w-[340px]">
                        {item.subItems?.map((sub, idx) => {
                          const isSubActive = currentPage === sub.id;
                          const total = item.subItems!.length;
                          const widthPercent = 60 + (idx * (40 / (total - 1 || 1)));
                          
                          return (
                            <button 
                              key={sub.id}
                              onClick={() => handleSubNavClick(sub.id)}
                              className={`relative py-4 px-8 text-center transition-all duration-500 hover:z-20 group/step border border-white/5 backdrop-blur-2xl ${
                                isSubActive 
                                  ? 'bg-[#D4AF37] text-white shadow-xl border-[#D4AF37]' 
                                  : 'bg-white/10 hover:bg-[#D4AF37] text-stone-900 hover:text-white shadow-lg'
                              }`}
                              style={{ 
                                width: `${widthPercent}%`,
                                transitionDelay: isDropdownOpen ? `${idx * 50}ms` : '0ms',
                                transform: isDropdownOpen ? 'scaleY(1) translateY(0)' : 'scaleY(0) translateY(-20px)',
                                opacity: isDropdownOpen ? 1 : 0
                              }}
                            >
                              <span className={`text-[9px] uppercase tracking-[0.3em] font-black block transition-all duration-300 group-hover/step:scale-110 group-hover/step:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] ${isSubActive ? 'drop-shadow-sm' : ''}`}>
                                {sub.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
