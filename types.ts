
export interface Project {
  id: string;
  title: string;
  category: 'Architektur' | 'Innenarchitektur' | 'Baumanagement' | 'Hauswartung' | 'Mieten' | 'Kaufen';
  description: string;
  image: string;
  year: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  isLocked: boolean;
  role: 'superadmin' | 'editor';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  email?: string;
  details?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSub: string;
  heroDesc: string;
  heroImage: string;
  aboutTitle: string;
  aboutDesc: string;
  aboutQuote: string;
  aboutImage: string;
  referenzenText: string;
  referenzenStats: string;
  hauswartungDesc: string;
  teamPhilosophy: string;
  teamArchitecture: TeamMember[];
  teamHauswartung: TeamMember[];
  projects: Project[];
  services: ServiceItem[];
  footerTitle: string;
  footerSub: string;
  footerDesc: string;
  footerAddress: string;
  footerAddressLabel: string;
  footerEmail: string;
  footerEmailLabel: string;
  footerFormTitle: string;
  footerFormBtn: string;
  contactHeroTitle: string;
  contactHeroSub: string;
  contactLabel: string;
}
