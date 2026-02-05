
import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  isEditing: boolean;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({ isEditing, value, onChange, className, multiline }) => {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      // Optional: auto-focus could be annoying if multiple items exist, 
      // but let's keep it responsive to clicks.
    }
  }, [isEditing]);

  if (!isEditing) return <span className={className}>{value}</span>;

  const baseStyles = "w-full bg-stone-100/30 border-b-2 border-[#D4AF37] focus:border-stone-900 focus:bg-white outline-none transition-all duration-300 px-1";

  return multiline ? (
    <textarea
      ref={inputRef as any}
      className={`${className} ${baseStyles} min-h-[1.5em] resize-none overflow-hidden`}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        // Auto-resize textarea
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      rows={1}
    />
  ) : (
    <input
      ref={inputRef as any}
      className={`${className} ${baseStyles}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

interface EditableImageProps {
  isEditing: boolean;
  src: string;
  onUpload: (base64: string) => void;
  className?: string;
  alt?: string;
  onRemove?: () => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({ isEditing, src, onUpload, className, alt, onRemove }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group w-full h-full">
      <img src={src} alt={alt} className={className} />
      {isEditing && (
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 transition-opacity">
          <label className="bg-white text-stone-900 px-6 py-3 text-[10px] font-black uppercase tracking-widest shadow-2xl cursor-pointer hover:bg-[#D4AF37] hover:text-white transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Bild ändern
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
          
          {onRemove && (
            <button 
              onClick={(e) => { e.preventDefault(); onRemove(); }}
              className="bg-red-500/80 text-white px-4 py-2 text-[8px] font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Entfernen
            </button>
          )}
        </div>
      )}
    </div>
  );
};
