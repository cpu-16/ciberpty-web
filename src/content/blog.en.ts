export const blogEn = {
  title: 'Blog | CiberPTY',
  description: 'Technical notes on cybersecurity, AI agents and infrastructure.',
  kicker: 'Blog',
  heading: 'Field notes from the trenches',
  lead: 'Practical notes on AI agents, detection and secure automation.',
  readMore: 'Read article',
  note: 'Article in Spanish',
  posts: [
    { cat: 'AI Agents', date: '2026.07.28', read: '9 min', title: 'Personal AI agents in 2026: from chatbot to a companion that gets things done', excerpt: 'What changed this year: persistent memory, tool use and voice. What to ask of a personal agent — and what to demand on privacy before hiring one.', href: '/blog/agentes-2026.html', cover: '/img/blog/agentes-2026.webp', featured: true },
    { cat: 'Blue Team', date: '2026.04.18', read: '8 min', title: 'Detecting living-off-the-land binaries with Wazuh', excerpt: 'Custom rules to detect abuse of native utilities (certutil, mshta, rundll32) without generating noise on admin endpoints.', href: '/blog/wazuh-lolbins.html', cover: '/img/blog/wazuh-lolbins.webp' },
    { cat: 'Automation', date: '2026.04.02', read: '12 min', title: 'Alert triage with LLMs without leaking sensitive data', excerpt: 'Local redaction and enrichment pattern before sending context to a model. Compatible with n8n and open-source guardrails.', href: '/blog/llm-triage.html', cover: '/img/blog/llm-triage.webp' },
    { cat: 'Infrastructure', date: '2026.03.21', read: '15 min', title: 'Proxmox + Tailscale: private cluster over public network', excerpt: 'Architecture for remote nodes with encryption in transit, no public ports exposed. Failover and verified backups.', href: '/blog/proxmox-tailscale.html', cover: '/img/blog/proxmox-tailscale.webp' }
  ]
};
