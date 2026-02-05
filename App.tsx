
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import About from './components/About';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';
import { Project, TeamMember, SiteContent, AdminUser, ServiceItem } from './types';
import { EditableText, EditableImage } from './components/Editable';

export type PageView = 
  | 'home' | 'immobilien' | 'mieten' | 'immobilien-hauswartung' | 'dienstleistungen' 
  | 'ueber-uns' | 'team' | 'entstehung' | 'referenzen' | 'downloads' 
  | 'download-wohnen' | 'download-gewerbe' | 'download-parkplatz' | 'kontakt'
  | 'bewirtschaftung' | 'stockwerkeigentum' | 'vermietung' | 'verkauf' | 'bauleitung' 
  | 'hauswartung' | 'team-hauswartung' | 'dienstleistungen-hauswartung' | 'admin';

const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "Werte schaffen.",
  heroSub: "Zukunft bauen.",
  heroDesc: "ESPART steht für ganzheitliche Lösungen in den Bereichen Immobilien, Architektur und Hauswartung. Seit 2008 in Zürich und Jona.",
  heroImage: "https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg",
  aboutTitle: "Ihre Vision,",
  aboutDesc: "Wir glauben daran, dass Architektur weit mehr ist als nur das Bauen von Wänden. Es ist die Schaffung von Räumen, die Emotionen wecken und Lebensqualität nachhaltig steigern.",
  aboutQuote: "Architektur ist die Kunst, dem Raum eine Seele zu geben.",
  aboutImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000",
  referenzenText: "Beim Grossteil unserer Kunden handelt es sich um Privat-Anleger, welche ihre Liegenschaft/en vertrauensvoll in unsere Hände übergeben haben. Ebenso betreuen wir auch institutionelle Anlieger, wie zum Beispiel die Mietobjekte der ALSA Pensionskasse, einen Teil der Finanz-Liegenschaften der Stadt Rapperswil-Jona und Liegenschaften der Pensionskasse der Stadt Rapperswil-Jona.",
  referenzenStats: "Zurzeit betreut die ESPART über 70 Wohn- und Gewerbeliegenschaften und über 50 Stockwerk- und Miteigentumseinheiten.",
  hauswartungDesc: "Hinter jedem gepflegten Objekt stehen Menschen mit Leidenschaft. Unsere Hauswartung sichert den langfristigen Werterhalt Ihrer Immobilie durch Professionalität und Zuverlässigkeit.",
  teamPhilosophy: "Hinter jedem gepflegten Objekt stehen Menschen mit Leidenschaft.",
  teamArchitecture: [
    { id: 'b1', name: 'Adrian Böhler', role: 'Geschäftsführer', email: 'adrian.boehler@espart.ch', details: 'Eidg. Dipl. Immobilien-Treuhänder, Immobilienbewirtschafter mit eidg. FA., bei uns seit 2014', image: 'https://espart.ch/wp-content/uploads/2024/05/Adrian-Boehler-1024x683.jpg' },
    { id: 'b2', name: 'Tabitha Meier', role: 'Bewirtschafterin Mietliegenschaften / Geschäftsleitung', email: 'tabitha.meier@espart.ch', details: 'Immobilienbewirtschafterin mit eidg. FA., bei uns seit 2007', image: 'https://espart.ch/wp-content/uploads/2024/05/Tabitha-Meier-1024x683.jpg' },
    { id: 'b3', name: 'Joëlle Grob-Perdrizat', role: 'Bewirtschafterin Mietliegenschaften / Geschäftsleitung', email: 'joelle.grob@espart.ch', details: 'Immobilienbewirtschafterin mit eidg. FA., bei uns seit 2009', image: 'https://espart.ch/wp-content/uploads/2024/05/Joelle-Grob-Perdrizat-1024x683.jpg' },
    { id: 'b4', name: 'Ramon Huber', role: 'Bewirtschafter Mietliegenschaften & STWE / Geschäftsleitung', email: 'ramon.huber@espart.ch', details: 'Immobilienbewirtschafter mit eidg. FA, bei uns seit 2021', image: 'https://espart.ch/wp-content/uploads/2024/05/Ramon-Huber-1-1024x683.jpg' },
    { id: 'b5', name: 'Patrik Köpfli', role: 'Bewirtschafter Stockwerkeigentum / Geschäftsleitung', email: 'patrik.koepfli@espart.ch', details: 'Immobilienbewirtschafter mit eidg. FA, bei uns seit 2020', image: 'https://espart.ch/wp-content/uploads/2024/05/Patrik-Koepfli-1024x683.jpg' },
    { id: 'b6', name: 'Danik Stadler', role: 'Liegenschaften Buchhalter / Geschäftsleitung', email: 'danik.stadler@espart.ch', details: 'BSc Betriebsökonomie Accounting, Controlling, bei uns seit 2025', image: 'https://espart.ch/wp-content/uploads/2025/03/Danik-Stadler-1024x683.jpg' },
    { id: 'b7', name: 'Pascal Zweifel', role: 'Leiter Hauswartung / Geschäftsleitung', email: 'pascal.zweifel@espart.ch', details: 'Leitung der gesamten Abteilung Hauswartung, bei uns seit 2018', image: 'https://espart.ch/wp-content/uploads/2024/05/Pascal-Zweifel-1024x683.jpg' },
    { id: 'b8', name: 'Marjon Badertscher', role: 'Bewirtschafterin Mietliegenschaften', email: 'marjon.badertscher@espart.ch', details: 'Expertin für Mietliegenschaften, bei uns seit 2025', image: 'https://espart.ch/wp-content/uploads/2025/07/Marjon-Badertscher-2-1024x683.jpg' },
    { id: 'b9', name: 'Michèle Bazzano-Glaus', role: 'Sachbearbeiterin Mietliegenschaften', email: 'michele.bazzano@espart.ch', details: 'Administration und Support Bewirtschaftung, bei uns seit 2022', image: 'https://espart.ch/wp-content/uploads/2024/05/Michele-Bazzano-Glaus-1024x683.jpg' },
    { id: 'b10', name: 'Sarah Sanchez', role: 'Sachbearbeiterin Mietliegenschaften', email: 'sarah.sanchez@espart.ch', details: 'Administration und Support Bewirtschaftung, bei uns seit 2024', image: 'https://espart.ch/wp-content/uploads/2024/05/Sandra-Sanchez-1024x683.jpg' },
    { id: 'b11', name: 'Nadja Hässig', role: 'Sachbearbeiterin / Empfang', email: 'nadja.haessig@espart.ch', details: 'Kaufmännische Angestellte, erste Anlaufstelle für Kunden, bei uns seit 2025', image: 'https://espart.ch/wp-content/uploads/2025/03/Nadja-Haessig-1024x683.jpg' },
    { id: 'b12', name: 'Robin Müller', role: 'Sachbearbeiter Stockwerkeigentum', email: 'robin.mueller@espart.ch', details: 'Support im Bereich STWE, bei uns seit 2024', image: 'https://espart.ch/wp-content/uploads/2025/03/Robin-Mueller-2-1024x683.jpg' },
    { id: 'b13', name: 'Bea Thumm', role: 'Liegenschaften Buchhalterin', email: 'bea.thumm@espart.ch', details: 'Langjährige Erfahrung in der Immobilienbuchhaltung, bei uns seit 1999', image: 'https://espart.ch/wp-content/uploads/2024/05/Bea-Thumm-1024x683.jpg' },
    { id: 'b14', name: 'Karin Böhler', role: 'Personalwesen / Geschäftsbuchhaltung', email: 'karin.boehler@espart.ch', details: 'Treuhänderin mit eidg. FA, interne Administration, bei uns seit 2014', image: 'https://espart.ch/wp-content/uploads/2024/05/Karin-Boehler-1024x683.jpg' },
  ],
  teamHauswartung: [
    { id: 'h1', name: 'Pascal Zweifel', role: 'Leiter Hauswartung', image: 'https://espart.ch/wp-content/uploads/2024/05/Pascal-Zweifel-1-1024x683.jpg', details: 'Führung und Koordination der gesamten Abteilung.' },
    { id: 'h2', name: 'Thomas Eicher', role: 'Technik, Aussenanlagen, Reparaturen', image: 'https://espart.ch/wp-content/uploads/2024/05/Thomas-Eicher-1024x683.jpg', details: 'Spezialist für technische Anlagen und Instandstellung.' },
    { id: 'h3', name: 'Wolfgang Aebischer', role: 'Hauswart mit eidg. FA', image: 'https://espart.ch/wp-content/uploads/2024/05/Wolfgang-Aebischer-1024x683.jpg', details: 'Gartenarbeiten & Gartengestaltung.' },
    { id: 'h4', name: 'Kevin Parkel', role: 'Hauswart', image: 'https://espart.ch/wp-content/uploads/2024/05/Kevin-Parkel-1024x683.jpg', details: 'Gartenarbeiten & Gartengestaltung.' },
    { id: 'h5', name: 'Fabio Gyseler', role: 'Hauswart', image: 'https://espart.ch/wp-content/uploads/2024/05/Fabio-Gyseler-1024x683.jpg', details: 'Allrounder für Liegenschaftsunterhalt.' },
    { id: 'h6', name: 'Maria Veloso Mendes', role: 'Reinigungsfachfrau', image: 'https://espart.ch/wp-content/uploads/2024/05/Maria-Veloso-1024x683.jpg', details: 'Expertin für Sauberkeit und Werterhalt.' },
    { id: 'h7', name: 'Karin Marty', role: 'Reinigungsfachfrau', image: 'https://espart.ch/wp-content/uploads/2024/05/Karin-Marty-1024x683.jpg', details: 'Pflege von Wohn- und Gewerbeobjekten.' },
    { id: 'h8', name: 'Sonja Rüdisüli', role: 'Reinigungsfachfrau', image: 'https://espart.ch/wp-content/uploads/2024/05/Sonja-Ruedisueli-1024x683.jpg', details: 'Präzision und Zuverlässigkeit in der Reinigung.' },
  ],
  projects: [
    { id: 'ref1', title: 'Überbauung Eichfeldpark, Jona', category: 'Architektur', year: '2020', description: 'Umfassende Planung und Realisation einer modernen Wohnanlage.', image: 'https://espart.ch/wp-content/uploads/2020/09/Eichfeldpark-1024x683.jpg' },
    { id: 'ref2', title: 'Überbauung SAEN, Rapperswil', category: 'Architektur', year: '2020', description: 'Hochstehende Architektur im Herzen von Rapperswil.', image: 'https://espart.ch/wp-content/uploads/2020/09/Saentis-1024x683.jpg' },
    { id: 'ref3', title: 'Überbauung Meiengarten, Jona', category: 'Architektur', year: '2020', description: 'Wohnen im Grünen mit höchstem Komfort.', image: 'https://espart.ch/wp-content/uploads/2020/09/Meiengarten-1024x768.jpg' },
    { id: 'ref4', title: 'Überbauung Rössliwies, Eschenbach', category: 'Architektur', year: '2020', description: 'Nachhaltiges Bauen in ländlicher Umgebung.', image: 'https://espart.ch/wp-content/uploads/2020/09/Roessli-1024x683.jpg' },
    { id: 'm1', title: 'Gewerberaum Rüti', category: 'Mieten', year: '2024', description: 'Spitalstrasse 68, 8630 Rüti ZH. Brutto: CHF 340.– / Netto: CHF 300.–. 20 m2 Fläche.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000' },
    { id: 'm2', title: '2.5-Zimmer-Wohnung Jona', category: 'Mieten', year: '2024', description: 'Kreuzackerstrasse 6, 8645 Jona. Brutto: CHF 1\'690.– / Netto: CHF 1\'560.–. Top-Lage!', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000' },
  ],
  services: [
    { id: 's1', title: 'Bewirtschaftung', description: 'Professionelle Verwaltung Ihrer Mietliegenschaften.' },
    { id: 's2', title: 'Verkauf', description: 'Erfolgreiche Vermittlung von Wohneigentum.' },
    { id: 's3', title: 'Hauswartung', description: 'Pflege und Unterhalt auf höchstem Niveau.' },
  ],
  footerTitle: "Lassen Sie uns",
  footerSub: "starten.",
  footerDesc: "Wir freuen uns auf Ihre Anfrage und ein persönliches Kennenlernen in unserem Büro.",
  footerAddress: "St. Gallerstrasse 54\n8645 Jona\nTel: +41 55 225 39 25",
  footerAddressLabel: "Hauptsitz Jona",
  footerEmail: "espart@espart.ch",
  footerEmailLabel: "Digital",
  footerFormTitle: "Direktanfrage",
  footerFormBtn: "Absenden",
  contactHeroTitle: "Sprechen wir",
  contactHeroSub: "darüber.",
  contactLabel: "Kontakt",
};

const STORAGE_KEY = 'espart_full_content_v4_restored';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    try {
      const savedContent = localStorage.getItem(STORAGE_KEY);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setContent(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) { console.error(e); }
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateContent = useCallback((key: keyof SiteContent, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  }, []);

  const saveContent = async () => {
    setIsSaving(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    setTimeout(() => { setIsSaving(false); setIsEditing(false); }, 500);
  };

  const renderPage = () => {
    if (currentPage === 'admin' && !currentUser) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-950">
           <form onSubmit={(e) => { e.preventDefault(); setCurrentUser({ role: 'admin' }); }} className="bg-stone-900 p-12 rounded-lg border border-stone-800 space-y-8">
             <h2 className="text-white text-3xl font-serif italic text-center">Admin Zugang</h2>
             <input type="password" placeholder="Passwort (007)" className="w-full bg-stone-800 border border-stone-700 py-3 px-4 text-white outline-none" />
             <button className="w-full py-4 bg-[#D4AF37] text-white font-black uppercase tracking-widest text-[10px]">Anmelden</button>
           </form>
        </div>
      );
    }

    if (currentPage === 'dienstleistungen') {
      const serviceLinks = [
        { id: 'bewirtschaftung', title: 'Bewirtschaftung', icon: '01' },
        { id: 'stockwerkeigentum', title: 'Stockwerkeigentum', icon: '02' },
        { id: 'vermietung', title: 'Vermietung', icon: '03' },
        { id: 'verkauf', title: 'Verkauf', icon: '04' },
        { id: 'bauleitung', title: 'Bauleitung', icon: '05' }
      ];
      return (
        <div className="min-h-screen pt-64 pb-32 px-6">
           <div className="max-w-7xl mx-auto">
              <div className="mb-24">
                 <h2 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-6">Unser Spektrum</h2>
                 <h1 className="text-6xl md:text-8xl font-serif text-stone-900 leading-tight tracking-tighter">
                   Dienst- <br/><span className="italic">Leistungen.</span>
                 </h1>
                 <p className="mt-8 text-stone-500 max-w-2xl text-lg font-light leading-relaxed">
                   Entdecken Sie unser ganzheitliches Angebot für Ihre Immobilie. Wir begleiten Sie kompetent durch alle Phasen – von der Bewirtschaftung bis zum Verkauf.
                 </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {serviceLinks.map(s => (
                   <button 
                     key={s.id} 
                     onClick={() => handleNavigate(s.id as PageView)}
                     className="bg-white p-12 text-left border border-stone-100 hover:border-[#D4AF37] transition-all group shadow-sm hover:shadow-2xl hover:-translate-y-1"
                   >
                     <span className="text-[#D4AF37] font-serif italic text-4xl block mb-8 opacity-40 group-hover:opacity-100 transition-opacity">{s.icon}</span>
                     <h3 className="text-2xl font-serif text-stone-900 mb-4 group-hover:translate-x-2 transition-transform">{s.title}</h3>
                     <p className="text-[10px] uppercase tracking-widest font-black text-stone-400">Details ansehen →</p>
                   </button>
                 ))}
              </div>
           </div>
        </div>
      );
    }

    if (currentPage === 'bewirtschaftung') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
             <img src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" className="absolute inset-0 w-full h-full object-cover scale-105" alt="Bewirtschaftung" />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Mietliegenschaften</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">Bewirtschaftung.</h1>
             </div>
          </section>
          <section className="py-32 px-6 bg-white">
             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                   <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Professionelle Verwaltung</h3>
                   <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                     "Die Bewirtschaftung erfordert ein hohes Mass an Fachwissen, Menschlichkeit und Fingerspitzengefühl."
                   </p>
                   <div className="text-stone-600 text-lg font-light leading-relaxed space-y-8">
                      <p>Wir entlasten Sie als Eigentümer in allen Belangen. Unser Team übernimmt die administrative, technische und finanzielle Betreuung Ihrer Liegenschaft mit höchster Sorgfalt.</p>
                      <p>Vom Mietvertragsabschluss über die Instandhaltung bis hin zur detaillierten Buchhaltung – wir sichern den Werterhalt und die Rendite Ihres Objekts.</p>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {['Administrative Verwaltung', 'Technische Betreuung', 'Finanz- & Rechnungswesen', 'Reporting & Controlling'].map((t, i) => (
                     <div key={i} className="bg-stone-50 p-10 border border-stone-100 hover:border-[#D4AF37] transition-all group">
                        <span className="text-[#D4AF37] font-serif italic text-3xl block mb-4">0{i+1}</span>
                        <span className="text-stone-900 font-bold text-[10px] uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">{t}</span>
                     </div>
                   ))}
                </div>
             </div>
          </section>
        </div>
      );
    }

    if (currentPage === 'stockwerkeigentum') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
             <img src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_03_SMALL.jpg" className="absolute inset-0 w-full h-full object-cover scale-105" alt="Stockwerkeigentum" />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">STWEG Verwaltung</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">Stockwerkeigentum.</h1>
             </div>
          </section>
          <section className="py-32 px-6 bg-white">
             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                   <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Gemeinschaft fördern</h3>
                   <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                     "Wir verwalten Ihre Gemeinschaft objektiv, transparent und mit Fokus auf Werterhalt."
                   </p>
                   <div className="text-stone-600 text-lg font-light leading-relaxed">
                      <p>Die Verwaltung von Stockwerkeigentum ist anspruchsvoll. Wir agieren als neutrale Instanz, leiten Versammlungen professionell und setzen Beschlüsse effizient um. Zurzeit betreuen wir über 50 Einheiten erfolgreich.</p>
                   </div>
                </div>
                <div className="bg-stone-900 p-12 text-white shadow-2xl">
                   <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-8">Kernkompetenzen</h4>
                   <ul className="space-y-6 text-sm font-light text-stone-300">
                      <li className="flex gap-4 items-center"><span className="text-[#D4AF37] text-xl font-black">/</span> Professionelle Versammlungsleitung</li>
                      <li className="flex gap-4 items-center"><span className="text-[#D4AF37] text-xl font-black">/</span> Transparente Abrechnung des Erneuerungsfonds</li>
                      <li className="flex gap-4 items-center"><span className="text-[#D4AF37] text-xl font-black">/</span> Werterhaltung der gemeinschaftlichen Teile</li>
                   </ul>
                </div>
             </div>
          </section>
        </div>
      );
    }

    if (currentPage === 'vermietung') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
             <img src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" className="absolute inset-0 w-full h-full object-cover scale-105" alt="Vermietung" />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Marktplatzierung</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">Vermietung.</h1>
             </div>
          </section>
          <section className="py-32 px-6 bg-white">
             <div className="max-w-7xl mx-auto text-center mb-24">
                <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Erst- & Einzelvermietung</h3>
                <p className="text-3xl md:text-5xl font-serif text-stone-900 italic max-w-4xl mx-auto leading-tight">
                  "Den richtigen Mieter zu finden ist kein Zufall, sondern das Ergebnis gezielter Vermarktung."
                </p>
             </div>
             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                   { t: 'Objektanalyse', d: 'Zielgruppenbestimmung und Mietpreiskalkulation.' },
                   { t: 'Vermarktung', d: 'Hochwertige Exposés und Platzierung auf allen Portalen.' },
                   { t: 'Selektion', d: 'Sorgfältige Prüfung der Interessenten für langfristige Zufriedenheit.' }
                ].map((s, i) => (
                  <div key={i} className="text-center space-y-6 group">
                     <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-900 font-serif italic text-2xl border border-stone-100 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500">{i+1}</div>
                     <h4 className="text-stone-900 font-bold text-[10px] uppercase tracking-widest">{s.t}</h4>
                     <p className="text-stone-500 text-sm font-light leading-relaxed">{s.d}</p>
                  </div>
                ))}
             </div>
          </section>
        </div>
      );
    }

    if (currentPage === 'verkauf') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070" className="absolute inset-0 w-full h-full object-cover scale-105" alt="Verkauf" />
             <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Exklusivität</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">Verkauf.</h1>
             </div>
          </section>
          <section className="py-32 px-6 bg-stone-50">
             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-2xl relative group">
                   <img src="https://espart.ch/wp-content/uploads/2020/09/Saentis-1024x683.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Referenz Objekt" />
                   <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/10 transition-all duration-1000"></div>
                </div>
                <div>
                   <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Erfolgreiche Vermittlung</h3>
                   <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                     "Wir begleiten Sie vom ersten Beratungsgespräch bis zur Schlüsselübergabe beim Notariat."
                   </p>
                   <p className="text-stone-600 text-lg font-light leading-relaxed mb-10">
                     Ob Einfamilienhaus, Wohnung oder Renditeobjekt – wir kennen den regionalen Markt und finden den passenden Käufer. Diskretion und Professionalität sind dabei unser oberstes Gebot.
                   </p>
                   <button onClick={() => handleNavigate('kontakt')} className="px-10 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-black hover:bg-[#D4AF37] transition-all shadow-lg active:scale-95">Beratungsgespräch vereinbaren</button>
                </div>
             </div>
          </section>
        </div>
      );
    }

    if (currentPage === 'immobilien-hauswartung') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070" className="absolute inset-0 w-full h-full object-cover scale-105" alt="Immobilien kaufen" />
             <div className="absolute inset-0 bg-stone-900/65 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Eigentum & Investment</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">Wohneigentum <br/><span className="italic">Kaufen.</span></h1>
             </div>
          </section>

          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <div>
                <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Der Weg zu Ihrem Zuhause</h3>
                <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                  "Wir unterstützen Sie beim Kauf Ihrer Wunschimmobilie mit Transparenz, Marktwissen und Diskretion."
                </p>
                <div className="text-stone-600 text-lg font-light leading-relaxed space-y-8">
                  <p>
                    Der Erwerb einer Immobilie ist eine weitreichende Entscheidung. Unser Team begleitet Sie durch den gesamten Prozess – von der ersten Besichtigung über die Kaufvertragsgestaltung bis hin zur Beurkundung.
                  </p>
                  <p>
                    Profitieren Sie von unserem weitreichenden Netzwerk und unserer tiefen Verwurzelung in der Region Rapperswil-Jona und Zürich.
                  </p>
                </div>
                <button onClick={() => handleNavigate('kontakt')} className="mt-12 px-10 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-black hover:bg-[#D4AF37] transition-all shadow-lg active:scale-95">Suchprofil hinterlegen</button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { t: 'Objektprüfung', d: 'Sorgfältige Aufbereitung aller Unterlagen und Fakten zum Objekt.', n: '01' },
                  { t: 'Finanzierungs-Check', d: 'Unterstützung bei der Aufbereitung der Dossiers für Banken.', n: '02' },
                  { t: 'Notarielle Abwicklung', d: 'Begleitung zur öffentlichen Beurkundung und Eigentumsübertragung.', n: '03' }
                ].map((item) => (
                  <div key={item.n} className="flex gap-8 p-10 bg-stone-50 border border-stone-100 hover:border-[#D4AF37] transition-all group shadow-sm">
                    <span className="text-[#D4AF37] font-serif italic text-4xl leading-none opacity-50 group-hover:opacity-100 transition-opacity">{item.n}</span>
                    <div>
                      <h4 className="text-stone-900 font-bold text-xs uppercase tracking-widest mb-2">{item.t}</h4>
                      <p className="text-stone-500 text-sm font-light leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-stone-900 text-white text-center px-6">
            <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 drop-shadow-md">Aktuelle Angebote</h4>
            <div className="max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl font-serif italic mb-12 leading-tight">
                Die meisten unserer Verkaufsobjekte werden diskret vermittelt. <br/>Kontaktieren Sie uns für eine persönliche Beratung.
              </p>
              <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto"></div>
            </div>
          </section>
        </div>
      );
    }

    if (currentPage === 'downloads') {
      const downloadCategories = [
        {
          title: "Formulare Mietinteressenten",
          items: [
            { label: "Mietinteressentenformular Wohnung", url: "https://espart.ch/wp-content/uploads/2020/09/NEU_Mietinteressentenformular_Wohnung.pdf" },
            { label: "Mietinteressentenformular Gewerbe", url: "https://espart.ch/wp-content/uploads/2020/09/NEU_Mietinteressentenformular_Gewerbe.pdf" },
            { label: "Mietinteressentenformular Nebenobjekte", url: "https://espart.ch/wp-content/uploads/2020/09/NEU_Mietinteressentenformular_Nebenobjekte.pdf" },
          ]
        },
        {
          title: "Dokumente & Merkblätter",
          items: [
            { label: "Hausordnung", url: "https://espart.ch/wp-content/uploads/2016/12/Hausordnung.pdf" },
            { label: "Broschüre – Richtig Lüften", url: "https://fff.ch/de/optimal" },
            { label: "Vollmachtformular für STWEG", url: "https://espart.ch/wp-content/uploads/2016/08/Vollmacht_STWEG-1.pdf" },
          ]
        }
      ];

      return (
        <div className="min-h-screen">
          <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover scale-105"
               alt="Downloads Banner"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Service & Dokumente</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  Unsere <br/><span className="italic">Downloads.</span>
                </h1>
             </div>
          </section>

          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-32">
                {downloadCategories.map((cat, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center gap-8 mb-16">
                      <h2 className="text-stone-900 text-3xl md:text-4xl font-serif italic">{cat.title}</h2>
                      <div className="flex-grow h-[1px] bg-stone-100 group-hover:bg-[#D4AF37] transition-all duration-700"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {cat.items.map((item, i) => (
                        <a 
                          key={i} 
                          href={item.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex flex-col bg-stone-50 border border-stone-100 p-8 hover:bg-white hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 group/card relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:opacity-10 transition-opacity">
                             <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                               <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                             </svg>
                          </div>
                          <div className="w-10 h-10 bg-stone-900 text-white flex items-center justify-center mb-6 group-hover/card:bg-[#D4AF37] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <h3 className="text-stone-900 font-bold text-sm uppercase tracking-widest leading-relaxed mb-4">{item.label}</h3>
                          <div className="mt-auto flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-[#D4AF37] opacity-0 group-hover/card:opacity-100 transition-all translate-y-2 group-hover/card:translate-y-0">
                             Download PDF
                             <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-40 bg-stone-950 p-12 md:p-24 rounded-2xl relative overflow-hidden text-center shadow-2xl">
                 <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                       <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.05" fill="none" />
                    </svg>
                 </div>
                 <div className="relative z-10 max-w-2xl mx-auto">
                    <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Benötigen Sie Hilfe?</h3>
                    <h4 className="text-white text-3xl md:text-5xl font-serif italic mb-10 leading-tight drop-shadow-lg">Kein passendes Dokument gefunden?</h4>
                    <button 
                      onClick={() => handleNavigate('kontakt')}
                      className="px-12 py-5 bg-white text-stone-900 font-black uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] hover:text-white transition-all shadow-xl active:scale-95"
                    >
                      Kontakt aufnehmen
                    </button>
                 </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (currentPage === 'kontakt') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover scale-105"
               alt="Kontakt Banner"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Persönliche Beratung</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  Sprechen wir <br/><span className="italic">darüber.</span>
                </h1>
             </div>
          </section>

          <section className="py-32 px-6 bg-white">
             <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                   {/* Linke Spalte: Formular */}
                   <div>
                      <div className="mb-12">
                         <h3 className="text-stone-900 text-3xl font-serif italic mb-4">Kontaktanfrage</h3>
                         <p className="text-stone-500 text-sm font-light">Füllen Sie das Formular aus, wir melden uns umgehend bei Ihnen.</p>
                      </div>
                      
                      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                         <div className="flex gap-8 mb-4">
                            {['Frau', 'Herr'].map(anrede => (
                               <label key={anrede} className="flex items-center gap-3 cursor-pointer group">
                                  <input type="radio" name="anrede" value={anrede} className="w-4 h-4 accent-[#D4AF37]" />
                                  <span className="text-[10px] uppercase tracking-widest font-black text-stone-400 group-hover:text-stone-900 transition-colors">{anrede}</span>
                               </label>
                            ))}
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <input type="text" placeholder="Vorname*" className="w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" required />
                            <input type="text" placeholder="Name*" className="w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" required />
                         </div>
                         
                         <input type="text" placeholder="Firma" className="w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" />
                         <input type="text" placeholder="Strasse / Nr." className="w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" />
                         
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <input type="text" placeholder="PLZ" className="w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" />
                            <input type="text" placeholder="Ort" className="md:col-span-2 w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" />
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <input type="email" placeholder="E-Mail*" className="w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" required />
                            <input type="tel" placeholder="Telefon*" className="w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm" required />
                         </div>
                         
                         <textarea placeholder="Nachricht*" rows={5} className="w-full bg-stone-50 border-b border-stone-200 py-4 px-2 focus:outline-none focus:border-[#D4AF37] transition-all text-sm resize-none" required></textarea>
                         
                         <button className="w-full py-6 bg-stone-900 text-white font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#D4AF37] transition-all shadow-xl active:scale-[0.98]">Senden</button>
                      </form>
                   </div>

                   {/* Rechte Spalte: Info */}
                   <div className="lg:pl-12 space-y-20">
                      <div>
                         <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 mb-8">Adresse</h4>
                         <div className="text-stone-900 text-2xl font-serif italic space-y-2">
                            <p>ESPART</p>
                            <p>Liegenschaften Verwaltung AG</p>
                            <p>St. Gallerstrasse 54</p>
                            <p>CH-8645 Jona</p>
                         </div>
                         <div className="mt-8 space-y-2">
                            <p className="text-stone-500 text-sm font-light">Tel: <a href="tel:+41552253925" className="hover:text-stone-900 transition-colors">+41 55 225 39 25</a></p>
                            <p className="text-stone-500 text-sm font-light">E-Mail: <a href="mailto:espart@espart.ch" className="text-[#D4AF37] hover:underline">espart@espart.ch</a></p>
                         </div>
                      </div>

                      <div>
                         <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 mb-8">Öffnungszeiten</h4>
                         <div className="grid grid-cols-2 gap-4 text-sm font-light text-stone-600 border-l-2 border-[#D4AF37] pl-6">
                            <div>Montag – Freitag</div>
                            <div className="text-stone-900 font-medium">08.00 – 12.00 Uhr</div>
                            <div></div>
                            <div className="text-stone-900 font-medium">13.30 – 17.00 Uhr</div>
                         </div>
                      </div>

                      <div className="aspect-square bg-stone-100 relative group overflow-hidden border border-stone-200 shadow-xl rounded-lg">
                         <img 
                           src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
                           className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                           alt="Map" 
                         />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <a 
                              href="http://maps.google.com/maps?q=loc:47.2297284,8.839400399999931" 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-8 py-4 bg-white/90 backdrop-blur-md text-stone-900 text-[9px] uppercase tracking-widest font-black shadow-2xl hover:bg-stone-900 hover:text-white transition-all transform group-hover:scale-110"
                            >
                              Standort öffnen
                            </a>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          <section className="relative h-[40vh] flex items-center justify-center overflow-hidden border-t border-stone-100">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_06_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover"
               alt="Footer Banner"
             />
             <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[1px]"></div>
             <div className="relative z-10 text-center">
                <h3 className="text-white text-3xl md:text-5xl font-serif italic drop-shadow-2xl">Wir freuen uns auf Sie.</h3>
             </div>
          </section>
        </div>
      );
    }

    if (currentPage === 'referenzen') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_03_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover scale-105"
               alt="Referenzen Banner"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Expertise & Projekte</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  Unsere <br/><span className="italic">Referenzen.</span>
                </h1>
             </div>
          </section>

          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                  <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Vertrauen & Kontinuität</h3>
                  <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                    <EditableText isEditing={isEditing} value={content.referenzenText} onChange={(v) => updateContent('referenzenText', v)} multiline />
                  </p>
                  <div className="text-stone-600 text-lg md:text-xl font-light leading-relaxed space-y-8">
                    <p>
                      Unsere Kunden schätzen die persönliche Betreuung und die hohe Fachkompetenz, die wir in jedes Mandat einbringen. Ob private Liegenschaft oder institutionelles Portfolio – wir behandeln jedes Objekt mit höchster Sorgfalt.
                    </p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <div className="bg-stone-50 p-12 border-l-4 border-[#D4AF37] relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 translate-x-10 -translate-y-10">
                       <svg viewBox="0 0 100 100" className="w-full h-full fill-stone-900">
                          <circle cx="50" cy="50" r="50" />
                       </svg>
                    </div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 mb-8">Zahlen & Fakten</h4>
                    <div className="space-y-12">
                       <div className="space-y-4">
                          <span className="block text-[#D4AF37] text-6xl font-serif italic leading-none">70+</span>
                          <p className="text-stone-600 text-sm font-light leading-relaxed">Wohn- und Gewerbeliegenschaften werden aktuell durch uns betreut.</p>
                       </div>
                       <div className="space-y-4 pt-8 border-t border-stone-200">
                          <span className="block text-[#D4AF37] text-6xl font-serif italic leading-none">50+</span>
                          <p className="text-stone-600 text-sm font-light leading-relaxed">Stockwerk- und Miteigentumseinheiten in unserem Portfolio.</p>
                       </div>
                    </div>
                    <div className="mt-12 p-6 bg-white border border-stone-100 shadow-sm">
                       <p className="text-stone-400 text-[9px] uppercase tracking-[0.2em] font-bold leading-relaxed">
                         <EditableText isEditing={isEditing} value={content.referenzenStats} onChange={(v) => updateContent('referenzenStats', v)} multiline />
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-stone-50">
             <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                   <h3 className="text-stone-900 text-3xl font-serif italic">Auszug realisierter Projekte</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                   {content.projects.filter(p => p.id.startsWith('ref')).map(project => (
                     <div key={project.id} className="group shadow-sm hover:shadow-2xl transition-all duration-700 bg-white p-4">
                        <div className="aspect-[16/10] overflow-hidden mb-6 relative">
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                        </div>
                        <h4 className="text-xl font-serif text-stone-900 mb-1">{project.title}</h4>
                        <p className="text-stone-400 text-[10px] uppercase tracking-widest font-black">{project.category}</p>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          <section className="py-24 bg-stone-900 text-center px-6">
            <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 text-center drop-shadow-md">Interessiert an einer Zusammenarbeit?</h4>
            <button 
              onClick={() => handleNavigate('kontakt')}
              className="text-white text-3xl md:text-5xl font-serif italic hover:text-[#D4AF37] transition-all underline underline-offset-8 decoration-1 decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] drop-shadow-xl"
            >
              Lassen Sie uns Ihr Portfolio optimieren →
            </button>
          </section>
        </div>
      );
    }

    if (currentPage === 'entstehung') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover scale-105"
               alt="Entstehung Banner"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Geschichte & Vision</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  Unsere <br/><span className="italic">Entstehung.</span>
                </h1>
             </div>
          </section>

          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                  <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Seit 1994</h3>
                  <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                    "Gegründet mit der Absicht, sich speziell auf die Verwaltung von Mietliegenschaften und Stockwerkeigentum zu konzentrieren."
                  </p>
                  <div className="text-stone-600 text-lg md:text-xl font-light leading-relaxed space-y-8">
                    <p>
                      Die ESPART LIEGENSCHAFTEN VERWALTUNG AG blickt auf eine solide Historie zurück. Was 1994 begann, hat sich zu einem ganzheitlichen Dienstleister entwickelt. 
                    </p>
                    <p>
                      Unser Fokus liegt heute nicht nur auf der klassischen Verwaltung, sondern umfasst das gesamte Spektrum: von der Erst-Vermietung neuer oder umgebauter Liegenschaften bis hin zu individuellen Einzel-Vermietungs-Mandaten.
                    </p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <div className="bg-stone-50 p-12 border-l-4 border-[#D4AF37] relative shadow-lg">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 mb-8">Die heutige Führung</h4>
                    <div className="space-y-12">
                      {[
                        { t: 'Pius Stadler', d: 'Verwaltungsratspräsident und Teilhaber.', i: 'VR-P' },
                        { t: 'Adrian Böhler', d: 'Verwaltungsrat, Teilhaber und Geschäftsführer.', i: 'CEO' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-8 group">
                          <span className="text-4xl font-serif italic text-stone-200 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-sm">{item.i}</span>
                          <div>
                            <span className="block text-stone-900 font-bold text-sm uppercase tracking-widest mb-2 group-hover:text-[#D4AF37] transition-colors">{item.t}</span>
                            <p className="text-stone-500 text-xs font-light leading-relaxed">{item.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
             <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                  <div className="relative aspect-video overflow-hidden shadow-2xl rounded-lg">
                    <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-50" alt="Office" />
                    <div className="absolute inset-0 border border-white/10 m-4"></div>
                  </div>
                  <div>
                    <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 drop-shadow-md">Das Team heute</h3>
                    <h4 className="text-3xl md:text-5xl font-serif italic mb-10 leading-tight drop-shadow-lg text-white">Gemeinsam für Ihre Werte.</h4>
                    <p className="text-stone-400 text-lg font-light leading-relaxed mb-8">
                      Aktuell wird die ESPART von einem Lehrling und 11 engagierten Mitarbeitenden unterstützt. 
                    </p>
                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                      <div>
                        <span className="block text-[#D4AF37] text-3xl font-serif mb-2 drop-shadow-md">12</span>
                        <span className="text-[9px] uppercase tracking-widest text-stone-500 font-black">Mitarbeitende</span>
                      </div>
                      <div>
                        <span className="block text-[#D4AF37] text-3xl font-serif mb-2 drop-shadow-md">30+</span>
                        <span className="text-[9px] uppercase tracking-widest text-stone-500 font-black">Jahre Erfahrung</span>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </section>

          <section className="py-32 bg-white px-6">
             <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-12">Unsere Kompetenzfelder</h3>
                <p className="text-xl md:text-3xl text-stone-800 font-light leading-relaxed mb-16 italic">
                  "Neben Sachbearbeitern, Bewirtschaftern und Buchhaltern beschäftigen wir auch betriebseigene Hauswarte, bauliche Allrounder und Gärtner – für eine lückenlose Betreuung Ihrer Liegenschaft."
                </p>
                <div className="flex flex-wrap justify-center gap-12 text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">
                   <button onClick={() => handleNavigate('ueber-uns')} className="hover:text-[#D4AF37] hover:scale-110 transition-all duration-300">Team Bewirtschaftung →</button>
                   <button onClick={() => handleNavigate('team-hauswartung')} className="hover:text-[#D4AF37] hover:scale-110 transition-all duration-300">Team Hauswartung →</button>
                </div>
             </div>
          </section>

          <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_06_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover"
               alt="Footer Banner"
             />
             <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[1px]"></div>
             <div className="relative z-10 text-center">
                <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mb-8 shadow-lg"></div>
                <h3 className="text-white text-3xl md:text-5xl font-serif italic drop-shadow-2xl">Kontinuität & Vertrauen.</h3>
             </div>
          </section>
        </div>
      );
    }

    if (currentPage === 'dienstleistungen-hauswartung') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover scale-105"
               alt="Dienstleistungen Hauswartung Banner"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Präzision & Betreuung</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  Unsere <br/><span className="italic">Dienstleistungen.</span>
                </h1>
             </div>
          </section>

          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                  <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Aufgaben & Spektrum</h3>
                  <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                    "Von der Treppenhausreinigung bis hin zur spezialisierten Gewerbereinigung – wir decken das ganze Spektrum ab."
                  </p>
                  <div className="text-stone-600 text-lg md:text-xl font-light leading-relaxed space-y-8">
                    <p>
                      Durch vielseitig geschultes Personal sind wir in der Lage, auch Reparaturarbeiten schnell, kompetent und äusserst kostengünstig vorzunehmen.
                    </p>
                    <p>
                      Darunter fallen kleinere Schreiner-, Platten-, Fugen-, Sanitär-Arbeiten und vieles mehr. Die Bewohner profitieren von einer kurzen Reaktionszeit; die Eigentümer von geringeren Unterhaltskosten.
                    </p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <div className="bg-stone-50 p-12 border-l-4 border-[#D4AF37] relative shadow-xl">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 mb-8">Strategische Ziele</h4>
                    <div className="space-y-12">
                      {[
                        { t: 'Gebäudemanagement', d: 'Optimierung durch eine schlanke, qualitätsorientierte Struktur.', i: '01' },
                        { t: 'Synergien nutzen', d: 'Enges Zusammenspiel zwischen Verwaltung und Hauswarten.', i: '02' },
                        { t: 'Mitarbeiterfokus', d: 'Technisch geschulte Profis mit kurzen Anfahrtswegen.', i: '03' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-8 group">
                          <span className="text-4xl font-serif italic text-stone-200 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-sm">{item.i}</span>
                          <div>
                            <span className="block text-stone-900 font-bold text-sm uppercase tracking-widest mb-2 group-hover:text-[#D4AF37] transition-colors">{item.t}</span>
                            <p className="text-stone-500 text-xs font-light leading-relaxed">{item.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div>
                   <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 drop-shadow-md">Ihr Nutzen</h3>
                   <h4 className="text-4xl md:text-6xl font-serif italic mb-10 leading-tight drop-shadow-lg text-white">
                     Optimale Werterhaltung <br/>& Wertvermehrung.
                   </h4>
                   <p className="text-stone-400 text-lg font-light leading-relaxed">
                     Durch Synergienutzung und schlanke Strukturen bieten wir einen qualitativ hohen Standard zu günstigen Preisen – innert kürzester Reaktionszeit.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {['Fast', 'Value', 'Clean', 'Full'].map((label, i) => (
                     <div key={label} className="aspect-square bg-stone-800 flex flex-col items-center justify-center p-8 text-center group hover:bg-[#D4AF37] transition-all duration-500 shadow-xl">
                        <span className="text-[#D4AF37] group-hover:text-white text-3xl font-serif italic mb-4 transition-colors duration-500 drop-shadow-md">{label}</span>
                        <span className="text-[9px] uppercase tracking-widest font-black text-stone-500 group-hover:text-white/80 transition-colors duration-500">[{['Reaktion', 'Erhalt', 'Struktur', 'Spektrum'][i]}]</span>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          <section className="py-24 bg-stone-50 text-center px-6 border-b border-stone-200">
            <h4 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8 text-center">Interessiert an professioneller Betreuung?</h4>
            <button 
              onClick={() => handleNavigate('kontakt')}
              className="text-stone-900 text-3xl md:text-5xl font-serif italic hover:text-[#D4AF37] transition-all transform hover:scale-105 active:scale-95"
            >
              Starten wir die Zusammenarbeit →
            </button>
          </section>
        </div>
      );
    }

    if (currentPage === 'team-hauswartung') {
      return (
        <div className="min-h-screen pt-48 pb-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-6">Expertise vor Ort</h2>
              <h1 className="text-6xl md:text-8xl font-serif text-stone-900 leading-tight tracking-tighter">
                Team <br/><span className="italic">Hauswartung.</span>
              </h1>
              <div className="w-24 h-[1px] bg-stone-200 mx-auto mt-12"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
              {content.teamHauswartung.map((member) => (
                <div key={member.id} className="group flex flex-col">
                  <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-stone-50 shadow-lg rounded-sm">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-900/5 transition-opacity group-hover:opacity-0"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-stone-900/60 backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                       <p className="text-white text-[10px] font-medium leading-relaxed italic drop-shadow-md">{member.details}</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-1 group-hover:text-[#D4AF37] transition-colors">{member.name}</h3>
                  <p className="text-stone-400 uppercase tracking-widest text-[8px] font-black">{member.role}</p>
                </div>
              ))}
            </div>

            <div className="mt-40 bg-stone-900 p-12 md:p-24 relative overflow-hidden shadow-2xl rounded-lg">
               <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L100,100 M100,0 L0,100" stroke="white" strokeWidth="0.1" fill="none" />
                  </svg>
               </div>
               <div className="relative z-10 text-center max-w-3xl mx-auto">
                 <h4 className="text-white text-3xl md:text-5xl font-serif italic mb-10 leading-tight drop-shadow-2xl">"Hinter jedem gepflegten Objekt stehen Menschen mit Leidenschaft."</h4>
                 <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-bold drop-shadow-md">ESPART Philosophie</p>
               </div>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 'hauswartung') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover scale-105"
               alt="Hauswartung Banner"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Service & Unterhalt</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  Hauswartung <br/><span className="italic">Alles aus einer Hand.</span>
                </h1>
             </div>
          </section>

          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                  <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Ganzheitliche Betreuung</h3>
                  <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                    "Bewirtschaftung und Hauswartung vereinfachen die Zusammenarbeit und garantieren Ihnen eine optimale Betreuung."
                  </p>
                  <div className="text-stone-600 text-lg md:text-xl font-light leading-relaxed space-y-8">
                    <p>
                      Konkret profitieren Sie davon, dass das Wissen um die Liegenschaft eng im Hause vorhanden ist und die Kommunikationswege entsprechend kurz sind. 
                    </p>
                    <p>
                      Unsere Hauswartung umfasst die Reinigung sowie den Garten- und technischen Unterhalt. Durch vielseitig geschultes Allrounder-Personal sind wir in der Lage, auch Reparaturarbeiten schnell und äusserst kostengünstig vorzunehmen.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-8 mt-12">
                    <button 
                      onClick={() => handleNavigate('team-hauswartung')}
                      className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 hover:text-[#D4AF37] transition-colors"
                    >
                      Team Hauswartung
                      <span className="w-12 h-[1px] bg-stone-200 group-hover:bg-[#D4AF37] transition-all group-hover:w-20"></span>
                    </button>
                    <button 
                      onClick={() => handleNavigate('dienstleistungen-hauswartung')}
                      className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 hover:text-[#D4AF37] transition-colors"
                    >
                      Details & Leistungen
                      <span className="w-12 h-[1px] bg-stone-200 group-hover:bg-[#D4AF37] transition-all group-hover:w-20"></span>
                    </button>
                  </div>
                </div>
                
                <div className="pt-8 grid grid-cols-2 gap-4">
                  {[
                    { t: 'Reinigung', d: 'Liegenschafts- & Büroreinigung.' },
                    { t: 'Gartenpflege', d: 'Unterhalt der Aussenanlagen.' },
                    { t: 'Technik', d: 'Überwachung aller Anlagen.' },
                    { t: 'Reparaturen', d: 'Schreiner, Platten, Sanitär.' }
                  ].map((item, i) => (
                    <div key={i} className="bg-stone-50 p-8 border border-stone-100 hover:border-[#D4AF37] transition-all group shadow-sm hover:shadow-xl">
                       <span className="block text-[#D4AF37] font-serif italic text-2xl mb-4 drop-shadow-sm">0{i+1}</span>
                       <span className="block text-stone-900 font-bold text-[10px] uppercase tracking-widest mb-2 group-hover:text-[#D4AF37] transition-colors">{item.t}</span>
                       <p className="text-stone-500 text-[10px] font-light leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-stone-950 text-white relative overflow-hidden">
             <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d="M0,0 L100,0 L100,100 Z" fill="white" />
                </svg>
             </div>
             <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl">
                   <h3 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 drop-shadow-md">Vorteil Allrounder</h3>
                   <h4 className="text-3xl md:text-5xl font-serif italic mb-12 leading-tight drop-shadow-lg text-white">
                     Kurze Reaktionszeiten, <br/>geringere Unterhaltskosten.
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-300 text-sm font-light leading-relaxed">
                      <p>
                        Mieter profitieren von einer extrem kurzen Reaktionszeit bei Mängeln, während Eigentümer durch unsere effiziente Inhouse-Lösung massiv an Unterhaltskosten sparen.
                      </p>
                      <p>
                        Ob kleinere Schreiner-, Platten-, Fugen- oder Sanitär-Arbeiten: Wir lösen Probleme oft direkt beim ersten Rundgang, ohne teure Drittfirmen aufbieten zu müssen.
                      </p>
                   </div>
                </div>
             </div>
          </section>

          <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_06_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
               alt="Secondary Banner"
             />
             <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-10 shadow-lg"></div>
                <h3 className="text-white text-3xl md:text-5xl font-serif italic mb-8 leading-tight drop-shadow-2xl">Werterhalt durch Professionalität.</h3>
                <p className="text-white/80 text-[10px] uppercase tracking-[0.6em] font-bold drop-shadow-md">ESPART HAUSWARTUNGEN AG</p>
             </div>
          </section>

          <section className="py-24 bg-stone-50 text-center px-6 border-b border-stone-200">
            <h4 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8 text-center">Suchen Sie eine kompetente Betreuung?</h4>
            <button 
              onClick={() => handleNavigate('kontakt')}
              className="text-stone-900 text-3xl md:text-5xl font-serif italic hover:text-[#D4AF37] transition-all transform hover:scale-110 active:scale-95"
            >
              Wir erstellen Ihnen gerne ein Angebot →
            </button>
          </section>
        </div>
      );
    }

    if (currentPage === 'bauleitung') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover scale-105"
               alt="Bauleitung Banner"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Dienstleistungen</h2>
                <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  Umbauten / <br/><span className="italic">Sanierungen.</span>
                </h1>
             </div>
          </section>

          <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                  <h3 className="text-stone-400 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Vorteil durch Wissen</h3>
                  <p className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-12 italic">
                    "Umfassende Kenntnisse der Liegenschaft in der Betriebsphase bringen während der Sanierung enorme Vorteile."
                  </p>
                  <div className="text-stone-600 text-lg md:text-xl font-light leading-relaxed space-y-8">
                    <p>
                      Die Vergangenheit hat gezeigt: Viele Nachforschungsarbeiten fallen weg, wenn die Erkenntnisse aus mehreren Jahren Bewirtschaftung direkt in die Planung einfliessen.
                    </p>
                    <p>
                      Wir übernehmen für Sie die Bauleitung, denn als erfahrener Bewirtschafter sind wir tief im Sanierungsprozess verwurzelt. Unser Ziel ist es, Sie in allen Bereichen bestmöglich zu unterstützen.
                    </p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <div className="bg-stone-50 p-12 border-l-4 border-[#D4AF37] relative shadow-xl">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 mb-8">Unsere Sanierungs-Philosophie</h4>
                    <div className="space-y-12">
                      {[
                        { t: 'Nachhaltigkeit', d: 'Zukunftsorientierte Planung für dauerhafte Werte.', i: '01' },
                        { t: 'Zeitlosigkeit', d: 'Design, das Trends überdauert und stets modern wirkt.', i: '02' },
                        { t: 'Unterhaltsarm', d: 'Wahl von Materialien, die den Betrieb vereinfachen.', i: '03' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-8 group">
                          <span className="text-4xl font-serif italic text-stone-200 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-sm">{item.i}</span>
                          <div>
                            <span className="block text-stone-900 font-bold text-sm uppercase tracking-widest mb-2 group-hover:text-[#D4AF37] transition-colors">{item.t}</span>
                            <p className="text-stone-500 text-xs font-light leading-relaxed">{item.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-stone-50 border-y border-stone-200">
             <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="text-xl md:text-2xl text-stone-800 font-light leading-relaxed">
                  Nur die Erfahrung aus der <span className="font-serif italic">Bewirtschaftung</span> kann Ihnen diesen Mehrwert erbringen. Erfährt das Vorhaben ein grösseres Mass, so stützen wir uns auf vertraute Architekten oder beziehen solche aktiv mitein.
                </p>
             </div>
          </section>

          <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_06_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
               alt="Secondary Banner"
             />
             <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-10 shadow-lg"></div>
                <h3 className="text-white text-3xl md:text-5xl font-serif italic mb-8 leading-tight drop-shadow-2xl">Bauleitung mit Weitblick.</h3>
                <p className="text-white/80 text-[10px] uppercase tracking-[0.6em] font-bold drop-shadow-md">ESPART Liegenschaften Verwaltung AG</p>
             </div>
          </section>

          <section className="py-24 bg-stone-900 text-center px-6">
            <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8 text-center drop-shadow-md">Planen Sie eine Veränderung?</h4>
            <button 
              onClick={() => handleNavigate('kontakt')}
              className="text-white text-3xl md:text-5xl font-serif italic hover:text-[#D4AF37] transition-all drop-shadow-xl transform hover:scale-105 active:scale-95"
            >
              Lassen Sie uns Ihr Projekt gemeinsam besprechen →
            </button>
          </section>
        </div>
      );
    }

    if (currentPage === 'mieten') {
      return (
        <div className="min-h-screen">
          <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
             <img 
               src="https://espart.ch/wp-content/uploads/2016/12/Espart_Stimmungsbild_08_SMALL.jpg" 
               className="absolute inset-0 w-full h-full object-cover scale-105"
               alt="Mieten Banner"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
             <div className="relative z-10 text-center px-6">
                <h2 className="text-[#D4AF37] uppercase tracking-[0.6em] text-[10px] md:text-xs font-black mb-6 drop-shadow-md">Wohn- & Gewerberäume</h2>
                <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
                  Immobilien <br/><span className="italic">Mieten.</span>
                </h1>
             </div>
          </section>

          <section className="py-12 bg-stone-50 border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-white p-8 md:p-12 shadow-2xl shadow-stone-200/50 -mt-20 relative z-20 rounded-xl border border-stone-100 transform hover:scale-[1.01] transition-transform duration-500">
                <div className="flex flex-col lg:flex-row items-end gap-8">
                   <div className="flex-1 space-y-3 w-full">
                     <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Suche</label>
                     <input type="text" placeholder="Ort oder Objekt..." className="w-full bg-stone-50 border border-stone-200 py-4 px-6 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-all text-sm" />
                   </div>
                   <div className="w-full lg:w-48 space-y-3">
                     <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Zimmer</label>
                     <select className="w-full bg-stone-50 border border-stone-200 py-4 px-6 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-all text-sm appearance-none">
                       <option>Alle</option>
                       <option>1.0 - 2.5</option>
                       <option>3.0 - 4.5</option>
                       <option>5.0+</option>
                     </select>
                   </div>
                   <div className="w-full lg:w-64 space-y-3">
                     <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Preis bis (CHF)</label>
                     <input type="range" min="500" max="10000" className="w-full accent-stone-900 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer" />
                   </div>
                   <button className="w-full lg:w-auto px-12 py-4 bg-stone-900 text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-[#D4AF37] transition-all shadow-lg active:scale-95">Suchen</button>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-stone-50 py-24">
            <Portfolio 
              isEditing={isEditing} 
              initialFilter="Mieten" 
              showFilters={false}
              projects={content.projects}
              onUpdateProject={(id, f, v) => {
                const updated = content.projects.map(p => p.id === id ? { ...p, [f]: v } : p);
                updateContent('projects', updated);
              }}
              onAddProject={() => {
                const newItem: Project = { id: Date.now().toString(), title: 'Neues Mietobjekt', category: 'Mieten', year: '2024', description: 'Attraktive Wohnung...', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000' };
                updateContent('projects', [newItem, ...content.projects]);
              }}
              onRemoveProject={(id) => updateContent('projects', content.projects.filter(p => p.id !== id))}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="fade-in">
        {currentPage === 'home' && (
          <>
            <section className="relative h-[90vh] flex items-center overflow-hidden bg-stone-50">
              <div className="absolute inset-0 z-0">
                <EditableImage isEditing={isEditing} src={content.heroImage} onUpload={(img) => updateContent('heroImage', img)} className="w-full h-full object-cover grayscale-[20%]" />
                <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[1px]"></div>
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
                <div className="max-w-4xl">
                  <h1 className="text-6xl md:text-9xl font-serif text-white leading-[0.9] mb-10 tracking-tighter drop-shadow-2xl">
                    <EditableText isEditing={isEditing} value={content.heroTitle} onChange={(v) => updateContent('heroTitle', v)} /> <br />
                    <span className="italic"><EditableText isEditing={isEditing} value={content.heroSub} onChange={(v) => updateContent('heroSub', v)} /></span>
                  </h1>
                  <div className="text-lg md:text-xl text-white/90 mb-12 max-w-xl leading-relaxed font-light drop-shadow-lg">
                    <EditableText isEditing={isEditing} value={content.heroDesc} onChange={(v) => updateContent('heroDesc', v)} multiline />
                  </div>
                </div>
              </div>
            </section>

            <section className="py-32 bg-white px-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                  <h2 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 drop-shadow-sm">Erfahrung & Qualität</h2>
                  <h3 className="text-5xl md:text-7xl font-serif text-stone-900 mb-8 leading-tight">Referenz <br/><span className="italic">Projekte.</span></h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {content.projects.filter(p => p.id.startsWith('ref')).map(project => (
                    <div key={project.id} className="group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-1000 p-4 bg-stone-50/50 rounded-sm">
                      <div className="aspect-[16/10] overflow-hidden mb-6 relative shadow-lg">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-stone-900/10 group-hover:opacity-0 transition-opacity"></div>
                      </div>
                      <h4 className="text-2xl font-serif text-stone-900 mb-2 group-hover:text-[#D4AF37] transition-colors">{project.title}</h4>
                      <p className="text-stone-500 text-sm font-light tracking-wide italic">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        {(currentPage === 'ueber-uns') && (
          <About 
            isEditing={isEditing} 
            content={content} 
            onUpdateContent={updateContent}
            onUpdateTeam={(id, f, v, isArch) => {
              const list = isArch ? 'teamArchitecture' : 'teamHauswartung';
              const updated = (content[list] as TeamMember[]).map(m => m.id === id ? { ...m, [f]: v } : m);
              updateContent(list, updated);
            }}
            onAddTeam={(isArch) => {
               const list = isArch ? 'teamArchitecture' : 'teamHauswartung';
               const newItem = { id: Date.now().toString(), name: 'Neuer Mitarbeiter', role: 'Position', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400' };
               updateContent(list, [newItem, ...(content[list] as TeamMember[])]);
            }}
            onRemoveTeam={(id, isArch) => {
              const list = isArch ? 'teamArchitecture' : 'teamHauswartung';
              updateContent(list, (content[list] as TeamMember[]).filter(m => m.id !== id));
            }}
            onUpdateService={(id, f, v) => {
              const updated = content.services.map(s => s.id === id ? { ...s, [f]: v } : s);
              updateContent('services', updated);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} isAdminMode={!!currentUser} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer 
        onLoginRequest={() => handleNavigate('admin')} 
        isAdmin={!!currentUser} 
        isEditing={isEditing} 
        content={content} 
        onUpdateContent={updateContent} 
        hideContactContent={currentPage === 'kontakt' || currentPage === 'dienstleistungen'}
      />
      {currentUser && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1500]">
          <div className="bg-stone-900 border border-[#D4AF37] shadow-2xl rounded-full px-10 py-6 flex items-center gap-10">
            <button onClick={() => setIsEditing(!isEditing)} className="text-[10px] text-white font-black uppercase tracking-widest">{isEditing ? 'Editor Beenden' : 'Inhalt Bearbeiten'}</button>
            {isEditing && <button onClick={saveContent} className="px-10 py-3 bg-[#D4AF37] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg transform active:scale-95 transition-transform">Speichern</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
