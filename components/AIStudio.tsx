
import React, { useState } from 'react';
import { getDesignAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import Conceptual3DViewer from './Conceptual3DViewer';

const AIStudio: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleConsult = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await getDesignAdvice(input);
    const aiMsg: ChatMessage = { role: 'assistant', content: advice };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <section id="ai-studio" className="py-24 md:py-32 bg-stone-900 text-stone-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 Q50,0 100,100" fill="none" stroke="white" strokeWidth="0.5" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start">
          <div className="w-full">
            <h2 className="text-stone-500 uppercase tracking-widest text-xs mb-4">Digitale Innovation</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Espart <br/><span className="italic">KI-Studio.</span></h3>
            
            <div className="mb-12 aspect-square sm:aspect-video w-full">
              {isLoading ? (
                <Conceptual3DViewer />
              ) : (
                <div className="w-full h-full bg-stone-800/50 flex flex-col items-center justify-center p-8 border border-stone-700/50 rounded-lg group hover:border-stone-500 transition-all duration-700">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-white/10 blur-xl rounded-full group-hover:bg-white/20 transition-all"></div>
                    <svg className="relative w-12 h-12 text-stone-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-stone-400 text-center italic text-sm font-light tracking-wide">Bereit für Ihre architektonischen Visionen...</p>
                  <button 
                    onClick={() => setIsLoading(true)}
                    className="mt-8 text-[10px] uppercase tracking-[0.3em] font-black border border-stone-700 px-6 py-2 hover:bg-white hover:text-stone-900 transition-all"
                  >
                    Viewer Starten
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-6 hidden sm:block">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</div>
                <p className="text-stone-300 text-sm font-light">Beschreiben Sie Ihr Projekt oder eine Design-Herausforderung.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</div>
                <p className="text-stone-300 text-sm font-light">Unsere KI analysiert Materialien, Lichtführung und räumliche Qualität.</p>
              </div>
            </div>
          </div>

          <div className="bg-stone-800/80 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-2xl border border-stone-700/50 flex flex-col h-[500px] md:h-[600px] w-full">
            <div className="flex-grow overflow-y-auto mb-6 pr-4 space-y-6 scrollbar-thin">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-stone-500 italic text-center px-4">
                  <p className="mb-4 text-sm">Wie kann ich Ihnen heute bei Ihrem architektonischen Vorhaben behilflich sein?</p>
                  <div className="text-[9px] uppercase tracking-[0.4em] opacity-30 font-black">Espart Digital Consultant</div>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] md:max-w-[85%] p-4 md:p-5 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' ? 'bg-stone-700 text-stone-100' : 'bg-stone-900 border border-stone-700 text-stone-300'
                  }`}>
                    <div className="text-[8px] uppercase tracking-[0.2em] mb-2 opacity-40 font-black">
                      {msg.role === 'user' ? 'Anfrage' : 'Beratung'}
                    </div>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-stone-900 border border-stone-700 p-4 rounded-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative mt-auto">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConsult()}
                placeholder="Fragen Sie nach Design-Ideen..."
                className="w-full bg-stone-900/50 border border-stone-700 rounded-lg py-4 pl-5 pr-14 text-stone-100 focus:outline-none focus:border-stone-400 transition-all text-sm"
              />
              <button 
                onClick={handleConsult}
                disabled={isLoading}
                className="absolute right-2 top-2 p-2 rounded-md bg-stone-700 text-white hover:bg-stone-500 transition-all disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudio;
