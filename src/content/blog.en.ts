export const blogEn = {
  title: 'Blog | CiberPTY',
  description: 'Technical notes on cybersecurity, automation and infrastructure.',
  kicker: 'Blog',
  heading: 'Field notes from the trenches',
  lead: 'Practical notes on detection, secure automation and infrastructure.',
  readMore: 'Read article',
  posts: [
    { cat: 'Blue Team', date: '2026.04.18', read: '8 min', title: 'Detecting living-off-the-land binaries with Wazuh', excerpt: 'Custom rules to detect abuse of native utilities (certutil, mshta, rundll32) without generating noise on admin endpoints.', href: '/blog/wazuh-lolbins.html' },
    { cat: 'Automation', date: '2026.04.02', read: '12 min', title: 'Alert triage with LLMs without leaking sensitive data', excerpt: 'Local redaction and enrichment pattern before sending context to a model. Compatible with n8n and open-source guardrails.', href: '/blog/llm-triage.html' },
    { cat: 'Infrastructure', date: '2026.03.21', read: '15 min', title: 'Proxmox + Tailscale: private cluster over public network', excerpt: 'Architecture for remote nodes with encryption in transit, no public ports exposed. Failover and verified backups.', href: '/blog/proxmox-tailscale.html' }
  ]
};
