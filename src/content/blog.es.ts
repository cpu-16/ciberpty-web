export const blogEs = {
  title: 'Blog | CiberPTY',
  description: 'Notas técnicas de ciberseguridad, agentes de IA e infraestructura.',
  kicker: 'Blog',
  heading: 'Notas técnicas del campo',
  lead: 'Apuntes prácticos de agentes de IA, detección y automatización segura.',
  readMore: 'Leer artículo',
  posts: [
    { cat: 'Agentes IA', date: '2026.07.28', read: '9 min', title: 'Agentes personales de IA en 2026: del chatbot al compañero que ejecuta', excerpt: 'Qué cambió este año: memoria persistente, uso de herramientas y voz. Qué pedirle a un agente personal y qué exigir en privacidad antes de contratar uno.', href: '/blog/agentes-2026.html', cover: '/img/blog/agentes-2026.webp', featured: true },
    { cat: 'Blue Team', date: '2026.04.18', read: '8 min', title: 'Detección de living-off-the-land binaries con Wazuh', excerpt: 'Reglas custom para detectar abuso de utilidades nativas (certutil, mshta, rundll32) sin generar ruido en endpoints administrativos.', href: '/blog/wazuh-lolbins.html', cover: '/img/blog/wazuh-lolbins.webp' },
    { cat: 'Automatización', date: '2026.04.02', read: '12 min', title: 'Triage de alertas con LLMs sin filtrar datos sensibles', excerpt: 'Patrón de redacción y enriquecimiento local antes de enviar contexto a un modelo. Compatible con n8n y guardrails open source.', href: '/blog/llm-triage.html', cover: '/img/blog/llm-triage.webp' },
    { cat: 'Infraestructura', date: '2026.03.21', read: '15 min', title: 'Proxmox + Tailscale: cluster privado sobre red pública', excerpt: 'Arquitectura para nodos remotos con cifrado en tránsito, sin exponer puertos públicos. Failover y backups verificados.', href: '/blog/proxmox-tailscale.html', cover: '/img/blog/proxmox-tailscale.webp' }
  ]
};
