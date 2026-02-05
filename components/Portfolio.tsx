
import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface PortfolioProps {
  isEditing: boolean;
  projects: Project[];
  onUpdateProject: (id: string, field: keyof Project, val: any) => void;
  onAddProject: () => void;
  onRemoveProject: (id: string) => void;
  initialFilter?: string;
  showFilters?: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ 
  isEditing, projects, onUpdateProject, onAddProject, onRemoveProject, initialFilter = 'Alle', showFilters = true
}) => {
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const filteredProjects = projects.filter(p => filter === 'Alle' || p.category === filter);

  return (
    <section className="bg-stone-50 min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Portfolio & Immobilien</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">Ausgewählte <br /><span className="italic">Objekte.</span></h3>
          </div>
          {showFilters && (
            <div className="flex flex-wrap gap-6 md:gap-10 text-[10px] uppercase tracking-[0.25em] font-bold text-stone-400">
              {['Alle', 'Mieten', 'Architektur', 'Innenarchitektur', 'Baumanagement', 'Hauswartung'].map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`pb-2 border-b-2 transition-all ${filter === cat ? 'border-stone-900 text-stone-900' : 'border-transparent'}`}>{cat}</button>
              ))}
              {isEditing && <button onClick={onAddProject} className="pb-2 text-[#D4AF37] border-b-2 border-transparent hover:border-[#D4AF37]">+ NEUES OBJEKT</button>}
            </div>
          )}
          {!showFilters && isEditing && (
            <div className="flex gap-10 text-[10px] uppercase tracking-[0.25em] font-bold">
               <button onClick={onAddProject} className="pb-2 text-[#D4AF37] border-b-2 border-transparent hover:border-[#D4AF37]">+ NEUES OBJEKT HINZUFÜGEN</button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-1">
          {filteredProjects.map(project => (
            <div key={project.id} className="relative group">
              <ProjectCard project={project} isEditing={isEditing} onUpdate={(f, v) => onUpdateProject(project.id, f, v)} />
              {isEditing && (
                <button 
                  onClick={() => onRemoveProject(project.id)}
                  className="absolute top-4 left-4 z-[50] bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 opacity-0 group-hover:opacity-100 transition-all"
                >
                  Objekt löschen
                </button>
              )}
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-stone-200 rounded-xl">
              <p className="text-stone-400 font-serif italic text-xl">Zurzeit keine Objekte in dieser Kategorie verfügbar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
