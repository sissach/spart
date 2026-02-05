
import React from 'react';
import { SiteContent, TeamMember } from '../types';
import { EditableText, EditableImage } from './Editable';

interface AboutProps {
  isEditing: boolean;
  content: SiteContent;
  onUpdateContent: (key: keyof SiteContent, val: any) => void;
  onUpdateTeam: (id: string, field: keyof TeamMember, val: any, isArch: boolean) => void;
  onAddTeam: (isArch: boolean) => void;
  onRemoveTeam: (id: string, isArch: boolean) => void;
  onUpdateService: (id: string, field: string, val: any) => void;
}

const About: React.FC<AboutProps> = ({ 
  isEditing, content, onUpdateTeam, onAddTeam, onRemoveTeam
}) => {
  return (
    <section className="py-48 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Team bewirtschaftung - Dieser Teil bleibt bestehen */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <h2 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-2">Liegenschaften</h2>
              <h3 className="text-4xl font-serif text-stone-900">Team Bewirtschaftung</h3>
            </div>
            {isEditing && (
              <button 
                onClick={() => onAddTeam(true)} 
                className="text-[10px] uppercase tracking-widest font-black bg-stone-900 text-white px-6 py-2 rounded-full hover:bg-black transition-colors"
              >
                + Hinzufügen
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {content.teamArchitecture.map((member) => (
              <div key={member.id} className="group relative">
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-stone-100">
                  <EditableImage 
                    isEditing={isEditing} 
                    src={member.image} 
                    onUpload={(img) => onUpdateTeam(member.id, 'image', img, true)} 
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                  />
                  
                  {/* Hover Info Box */}
                  <div className={`absolute inset-0 bg-stone-900/80 backdrop-blur-md p-6 flex flex-col justify-end transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 ${isEditing ? 'pointer-events-none' : ''}`}>
                    <div className="space-y-4">
                      <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
                      {member.email && (
                        <div className="space-y-1">
                          <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-black">Kontakt</span>
                          <a href={`mailto:${member.email}`} className="text-white text-[10px] font-bold hover:text-[#D4AF37] transition-colors break-all">
                            <EditableText isEditing={isEditing} value={member.email} onChange={(v) => onUpdateTeam(member.id, 'email', v, true)} />
                          </a>
                        </div>
                      )}
                      {member.details && (
                        <div className="space-y-1">
                          <span className="block text-[8px] uppercase tracking-widest text-stone-400 font-black">Expertise & Erfahrung</span>
                          <p className="text-stone-200 text-[10px] leading-relaxed font-light italic">
                            <EditableText isEditing={isEditing} value={member.details} onChange={(v) => onUpdateTeam(member.id, 'details', v, true)} multiline />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="transition-transform duration-500 group-hover:-translate-y-2">
                  <h4 className="text-xl font-serif text-stone-900 mb-2">
                    <EditableText isEditing={isEditing} value={member.name} onChange={(v) => onUpdateTeam(member.id, 'name', v, true)} />
                  </h4>
                  <div className="text-stone-400 uppercase tracking-[0.2em] text-[8px] font-bold leading-relaxed">
                    <EditableText isEditing={isEditing} value={member.role} onChange={(v) => onUpdateTeam(member.id, 'role', v, true)} multiline />
                  </div>
                </div>
                
                {isEditing && (
                  <button 
                    onClick={() => onRemoveTeam(member.id, true)} 
                    className="mt-4 text-[9px] text-red-500 font-bold uppercase tracking-widest hover:underline"
                  >
                    Entfernen
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
