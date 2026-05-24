// Configuración central del sitio multipágina CiberPTY (navegación, i18n, contacto)

export type Locale = 'es' | 'en';

export const PAGES = {
  home: { es: '/es/', en: '/en/' },
  assistants: { es: '/es/asistentes/', en: '/en/assistants/' },
  cyber: { es: '/es/ciberseguridad/', en: '/en/cybersecurity/' },
  blog: { es: '/es/blog/', en: '/en/blog/' },
  contact: { es: '/es/contacto/', en: '/en/contact/' }
} as const;

export type PageKey = keyof typeof PAGES;

export const pagePath = (key: PageKey, locale: Locale): string => PAGES[key][locale];

export const altPath = (key: PageKey, locale: Locale): string =>
  PAGES[key][locale === 'es' ? 'en' : 'es'];

export const NAV: Record<Locale, { key: PageKey; label: string }[]> = {
  es: [
    { key: 'home', label: 'Inicio' },
    { key: 'assistants', label: 'Asistentes IA' },
    { key: 'cyber', label: 'Ciberseguridad' },
    { key: 'blog', label: 'Blog' },
    { key: 'contact', label: 'Contacto' }
  ],
  en: [
    { key: 'home', label: 'Home' },
    { key: 'assistants', label: 'AI Assistants' },
    { key: 'cyber', label: 'Cybersecurity' },
    { key: 'blog', label: 'Blog' },
    { key: 'contact', label: 'Contact' }
  ]
};

export const LABELS: Record<Locale, { language: string; theme: string; dark: string; light: string }> = {
  es: { language: 'Idioma', theme: 'Tema', dark: 'Oscuro', light: 'Claro' },
  en: { language: 'Language', theme: 'Theme', dark: 'Dark', light: 'Light' }
};

export const SITE = {
  brand: 'CiberPTY',
  whatsapp: 'https://wa.me/50768573845',
  whatsappLabel: '+507 6857-3845',
  email: 'gilberto@ciberpty.com',
  github: 'https://github.com/cpu-16',
  domain: 'ciberpty.com',
  location: { es: 'Panamá · Veraguas', en: 'Panama · Veraguas' } as Record<Locale, string>
};
