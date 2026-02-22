export type Locale = 'es' | 'en';

export type NavItem = {
  href: string;
  label: string;
};

export type ProfileContent = {
  locale: Locale;
  siteTitle: string;
  seoDescription: string;
  name: string;
  role: string;
  location: string;
  github: string;
  heroTagline: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  skillsTitle: string;
  skills: string[];
  educationTitle: string;
  education: string[];
  experienceTitle: string;
  experience: string[];
  certsTitle: string;
  certifications: string[];
  interestsTitle: string;
  interests: string[];
  contactTitle: string;
  contactBody: string;
  contactCta: string;
  contactDetails: string[];
  nav: NavItem[];
  labels: {
    language: string;
    theme: string;
    dark: string;
    light: string;
    revealEmail: string;
    viewProject: string;
    githubProfile: string;
  };
};

export type ProjectItem = {
  title: string;
  description: string;
  stack: string[];
  href: string;
};

export const oppositeLocale = (locale: Locale): Locale =>
  locale === 'es' ? 'en' : 'es';

export const localePath = (locale: Locale): string =>
  locale === 'es' ? '/es/' : '/en/';
