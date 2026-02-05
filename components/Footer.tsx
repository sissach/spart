
import React from 'react';
import { SiteContent } from '../types';
import { EditableText } from './Editable';

interface FooterProps {
  onLoginRequest: () => void;
  isAdmin: boolean;
  isEditing?: boolean;
  content?: SiteContent;
  onUpdateContent?: (key: keyof SiteContent, val: any) => void;
  hideContactContent?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onLoginRequest, isAdmin, isEditing = false, content, onUpdateContent, hideContactContent = false }) => {
  if (!content) return null;

  return (
    <footer 
      id="contact" 
      className={`bg-stone-50 pt-32 pb-16 border-t border-stone-200 transition-all duration-1000 ease-in-out group ${hideContactContent ? 'hover:bg-stone-50' : 'hover:bg-stone-900'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {!hideContactContent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
            <div className="transition-all duration-1000">
              <h2 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black mb-6">
                <EditableText isEditing={isEditing} value={content.contactLabel} onChange={(v) => onUpdateContent?.('contactLabel', v)} />
              </h2>
              <h3 className="text-5xl md:text-6xl font-serif text-stone-900 mb-10 leading-tight transition-colors duration-1000 group-hover:text-white">
                <EditableText isEditing={isEditing} value={content.footerTitle} onChange={(v) => onUpdateContent?.('footerTitle', v)} /> <br />
                <span className="italic"><EditableText isEditing={isEditing} value={content.footerSub} onChange={(v) => onUpdateContent?.('footerSub', v)} /></span>
              </h3>
              <div className="text-stone-600 text-lg mb-12 max-w-md font-light leading-relaxed transition-colors duration-1000 group-hover:text-stone-400">
                <EditableText isEditing={isEditing} value={content.footerDesc} onChange={(v) => onUpdateContent?.('footerDesc', v)} multiline />
              </div>
              <div className="space-y-8">
                <div className="group/item cursor-default">
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black mb-3 transition-colors duration-1000 group-hover:text-stone-500 group-hover/item:text-[#D4AF37]">
                    <EditableText isEditing={isEditing} value={content.footerAddressLabel} onChange={(v) => onUpdateContent?.('footerAddressLabel', v)} />
                  </p>
                  <div className="text-stone-900 font-serif text-2xl italic leading-none transition-colors duration-1000 group-hover:text-white">
                    <EditableText isEditing={isEditing} value={content.footerAddress} onChange={(v) => onUpdateContent?.('footerAddress', v)} multiline />
                  </div>
                </div>
                <div className="flex flex-col gap-2 group/item">
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black mb-1 transition-colors duration-1000 group-hover:text-stone-500 group-hover/item:text-[#D4AF37]">
                    <EditableText isEditing={isEditing} value={content.footerEmailLabel} onChange={(v) => onUpdateContent?.('footerEmailLabel', v)} />
                  </p>
                  <div className="text-stone-900 font-bold hover:text-[#D4AF37] transition-colors text-lg group-hover:text-stone-100">
                    <EditableText isEditing={isEditing} value={content.footerEmail} onChange={(v) => onUpdateContent?.('footerEmail', v)} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-stone-100 rounded-lg transition-all duration-1000 group-hover:bg-stone-800 group-hover:border-stone-700">
              <h4 className="text-stone-900 font-serif text-2xl mb-10 italic transition-colors duration-1000 group-hover:text-white">
                <EditableText isEditing={isEditing} value={content.footerFormTitle} onChange={(v) => onUpdateContent?.('footerFormTitle', v)} />
              </h4>
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest font-black text-stone-400 transition-colors duration-1000 group-hover:text-stone-500">Vollständiger Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-stone-100 py-3 focus:outline-none focus:border-stone-900 transition-all duration-1000 group-hover:border-stone-700 group-hover:text-white focus:group-hover:border-[#D4AF37] text-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-widest font-black text-stone-400 transition-colors duration-1000 group-hover:text-stone-500">E-Mail Adresse</label>
                    <input type="email" className="w-full bg-transparent border-b border-stone-100 py-3 focus:outline-none focus:border-stone-900 transition-all duration-1000 group-hover:border-stone-700 group-hover:text-white focus:group-hover:border-[#D4AF37] text-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-widest font-black text-stone-400 transition-colors duration-1000 group-hover:text-stone-500">Ihre Nachricht</label>
                  <textarea rows={3} className="w-full bg-transparent border-b border-stone-100 py-3 focus:outline-none focus:border-stone-900 transition-all duration-1000 group-hover:border-stone-700 group-hover:text-white focus:group-hover:border-[#D4AF37] text-lg"></textarea>
                </div>
                <button className="w-full py-6 bg-stone-900 text-white uppercase tracking-[0.4em] text-[10px] font-black hover:bg-black transition-all shadow-xl active:scale-[0.98] group-hover:bg-[#D4AF37]">
                  <EditableText isEditing={isEditing} value={content.footerFormBtn} onChange={(v) => onUpdateContent?.('footerFormBtn', v)} />
                </button>
              </form>
            </div>
          </div>
        )}
        
        <div className={`pt-20 border-t border-stone-100 transition-all duration-1000 flex flex-col md:flex-row justify-between items-center gap-12 ${hideContactContent ? '' : 'group-hover:border-stone-800'}`}>
          <div className="flex items-center gap-4 group/logo cursor-pointer">
            <div className={`w-10 h-10 flex items-center justify-center transition-all duration-1000 group-hover/logo:rotate-12 ${hideContactContent ? 'bg-stone-900' : 'bg-stone-900 group-hover:bg-white'}`}>
              <span className={`font-black text-lg ${hideContactContent ? 'text-white' : 'text-white group-hover:text-stone-900'}`}>E</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-[11px] font-black uppercase tracking-widest leading-none mb-1 transition-colors duration-1000 ${hideContactContent ? 'text-stone-900' : 'text-stone-900 group-hover:text-white'}`}>Espart</span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-stone-400 font-bold">Liegenschaften AG</span>
            </div>
          </div>
          
          <div className="flex gap-16 text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">
            <a href="#" className={`hover:text-stone-900 transition-colors ${hideContactContent ? '' : 'group-hover:hover:text-[#D4AF37]'}`}>Instagram</a>
            <a href="#" className={`hover:text-stone-900 transition-colors ${hideContactContent ? '' : 'group-hover:hover:text-[#D4AF37]'}`}>LinkedIn</a>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className={`text-[10px] font-medium transition-colors duration-1000 ${hideContactContent ? 'text-stone-300' : 'text-stone-300 group-hover:text-stone-600'}`}>© 2025 ESPART Liegenschaften Verwaltung AG.</p>
            <div className="flex items-center gap-4">
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-[8px] uppercase tracking-widest font-black text-stone-400">Verifiziertes Konto</span>
                </div>
              ) : (
                <button 
                  onClick={onLoginRequest}
                  className={`text-[8px] uppercase tracking-widest font-black transition-colors flex items-center gap-2 ${hideContactContent ? 'text-stone-300 hover:text-stone-900' : 'text-stone-300 hover:text-stone-900 group-hover:text-stone-600 group-hover:hover:text-white'}`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2h2m2 4l2 2 2-2m-2-2v6" /></svg>
                  Admin Zugang
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
