
import React from 'react';
import { Project } from '../types';
import { EditableText, EditableImage } from './Editable';

interface ProjectCardProps {
  project: Project;
  isEditing?: boolean;
  onUpdate?: (field: keyof Project, val: any) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEditing, onUpdate }) => {
  return (
    <div className="group relative overflow-hidden bg-white aspect-[4/5] cursor-pointer shadow-md">
      <EditableImage 
        isEditing={!!isEditing} 
        src={project.image} 
        onUpload={(img) => onUpdate?.('image', img)} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-stone-900/70 flex flex-col justify-end p-8 transition-opacity duration-500 backdrop-blur-[1px] ${isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <span className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2 font-black drop-shadow-sm">
          {isEditing ? (
            <select 
              value={project.category} 
              onChange={(e) => onUpdate?.('category', e.target.value as any)}
              className="bg-transparent text-[#D4AF37] border-b border-[#D4AF37]/30 outline-none"
            >
              <option value="Architektur">Architektur</option>
              <option value="Innenarchitektur">Innenarchitektur</option>
              <option value="Baumanagement">Baumanagement</option>
              <option value="Hauswartung">Hauswartung</option>
              <option value="Mieten">Mieten</option>
            </select>
          ) : project.category}
        </span>
        <h3 className="text-white text-3xl font-serif mb-4 drop-shadow-lg">
          <EditableText isEditing={!!isEditing} value={project.title} onChange={(v) => onUpdate?.('title', v)} className="text-white border-white/50" />
        </h3>
        <div className="text-white/90 text-sm mb-6 leading-relaxed font-light drop-shadow-md">
          <EditableText isEditing={!!isEditing} value={project.description} onChange={(v) => onUpdate?.('description', v)} multiline className="text-white border-white/30" />
        </div>
        
        <div className="flex justify-between items-center text-white/70 text-[10px] uppercase tracking-widest font-black">
           <span className="drop-shadow-sm">Jahr: <EditableText isEditing={!!isEditing} value={project.year} onChange={(v) => onUpdate?.('year', v)} className="text-white border-white/30 w-12" /></span>
           <span className="text-[#D4AF37] group-hover:translate-x-2 transition-transform duration-500">{project.category === 'Mieten' ? 'DETAILS ANSEHEN →' : 'PROJEKT ERKUNDEN →'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
