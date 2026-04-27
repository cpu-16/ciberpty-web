// Bilingual content for CiberPTY
const CONTENT = {
  es: {
    nav: [
      { href: '#about', label: 'Empresa' },
      { href: '#services', label: 'Servicios' },
      { href: '#ops', label: 'Operaciones' },
      { href: '#stack', label: 'Stack' },
      { href: '#method', label: 'Método' },
      { href: '#insights', label: 'Insights' },
      { href: '#contact', label: 'Contacto' }
    ],
    statusLabel: 'SOC ACTIVO',
    langCode: 'ES',
    altLang: 'EN',
    hero: {
      meta: ['v2.4.0', 'PANAMÁ · VERAGUAS', 'SOC 24/7'],
      titleA: 'Defensa',
      titleB: 'activa',
      titleC: 'para infraestructura',
      titleD: 'crítica.',
      tagline: 'Operaciones Blue Team y Red Team con telemetría en vivo, automatización con IA y arquitectura resiliente sobre Linux, Docker y Proxmox. Reducción medible de superficie de ataque.',
      ctaPrimary: 'Solicitar diagnóstico',
      ctaSecondary: 'Ver capacidades',
      stats: [
        { num: '99.98%', label: 'Uptime SOC' },
        { num: '< 4 min', label: 'MTTD promedio' },
        { num: '24/7', label: 'Cobertura' }
      ]
    },
    terminal: {
      title: 'gilberto@ciberpty:~',
      status: 'CONNECTED',
      hint: 'Prueba: status, scan, ls, services, contact, clear, help'
    },
    about: {
      eyebrow: '01 · Empresa',
      title: ['Operaciones de seguridad para equipos que ', { em: 'no pueden parar' }, '.'],
      meta: '/about',
      paragraphs: [
        'CiberPTY es una unidad técnica especializada en seguridad ofensiva, defensiva, continuidad operativa y arquitectura resiliente. Trabajamos con homelabs, pymes y equipos en crecimiento que necesitan postura de seguridad real, no checklists vacíos.',
        'Combinamos prácticas Blue Team y Red Team con automatización mediante n8n, LLMs y orquestación sobre Linux/Docker/Proxmox. Cada engagement entrega evidencia técnica, documentación auditable y reducción medible del riesgo.'
      ]
    },
    shieldPanel: {
      head: 'firewall.status',
      live: 'LIVE',
      readouts: [
        { label: 'Threats blocked', value: '14,237', cls: 'ok' },
        { label: 'Latency', value: '12.4ms', cls: '' },
        { label: 'Posture', value: 'STRONG', cls: 'ok' }
      ]
    },
    services: {
      eyebrow: '02 · Servicios',
      title: ['Cobertura ', { em: 'completa' }, ' del ciclo de seguridad.'],
      meta: '/services [6]',
      items: [
        { num: 'SVC.01', icon: 'shield', title: 'Blue Team Operations', desc: 'Hardening, detección y respuesta. Diseño de casos SIEM, ingestión de logs, runbooks de IR y mejora continua de la postura defensiva.', stack: ['Wazuh', 'Hardening', 'IR Playbooks', 'SIEM'] },
        { num: 'SVC.02', icon: 'crosshair', title: 'Red Team Assessments', desc: 'Simulaciones ofensivas éticas para validar defensas, descubrir brechas reales y priorizar remediación con impacto medible al negocio.', stack: ['Recon', 'Exploitation', 'Reporting'] },
        { num: 'SVC.03', icon: 'fingerprint', title: 'Forense Digital', desc: 'Análisis técnico de evidencia, reconstrucción de timelines y soporte en investigación de incidentes con cadena de custodia.', stack: ['Volatility', 'Autopsy', 'Timeline'] },
        { num: 'SVC.04', icon: 'gavel', title: 'Ciber Legal', desc: 'Coordinación con asesoría legal: alineación técnica, manejo de evidencia, reporte formal y cumplimiento normativo.', stack: ['Compliance', 'Governance', 'Reporting'] },
        { num: 'SVC.05', icon: 'cpu', title: 'Automatización IA', desc: 'Flujos seguros con n8n y LLMs para SOC e IT. Triage automatizado, enriquecimiento de alertas y orquestación de respuesta.', stack: ['n8n', 'LLMs', 'Workflows'] },
        { num: 'SVC.06', icon: 'server', title: 'Infraestructura Segura', desc: 'Arquitectura y operación sobre Linux, Docker y Proxmox. Diseño con segmentación, hardening y backups verificados.', stack: ['Linux', 'Docker', 'Proxmox'] }
      ],
      cta: 'Solicitar servicio'
    },
    ops: {
      eyebrow: '03 · Telemetría',
      title: ['Visibilidad ', { em: 'en vivo' }, ' sobre el perímetro global.'],
      meta: '/ops/telemetry',
      globeTitle: 'GLOBAL THREAT MAP',
      feedTitle: 'EVENT FEED',
      meters: [
        { label: 'EPS', val: '12,840', max: 100 },
        { label: 'CPU', val: '34%', max: 34 },
        { label: 'MEM', val: '61%', max: 61 },
        { label: 'NET', val: '482MB/s', max: 78 }
      ],
      legend: 'NODOS · 14 · ACTIVOS'
    },
    stack: {
      eyebrow: '04 · Stack',
      title: ['Herramientas que ', { em: 'usamos' }, ' en producción.'],
      meta: '/stack',
      items: [
        { name: 'Linux', desc: 'Hardening, kernel tuning, sysctl, AppArmor', span: 1 },
        { name: 'Docker', desc: 'Aislamiento, imágenes mínimas, escaneo CVE', span: 1 },
        { name: 'Proxmox', desc: 'Virtualización, snapshots, alta disponibilidad', span: 1 },
        { name: 'Wazuh', desc: 'SIEM/XDR, detección de amenazas, FIM', span: 1 },
        { name: 'n8n', desc: 'Orquestación de workflows con guardrails', span: 1 },
        { name: 'Python', desc: 'Automatización, análisis, parsers custom', span: 1 },
        { name: 'Ansible', desc: 'Infraestructura como código, idempotencia', span: 1 },
        { name: 'MariaDB', desc: 'Persistencia, replicación, backups verificados', span: 1 }
      ],
      featured: { eyebrow: 'NÚCLEO', big: '8 herramientas', desc: 'integradas, hardenizadas y monitoreadas continuamente. Cada una con runbooks documentados y pruebas de recuperación.' }
    },
    method: {
      eyebrow: '05 · Método',
      title: ['Cuatro fases. ', { em: 'Evidencia' }, ' en cada una.'],
      meta: '/method',
      steps: [
        { step: 'PHASE 01', title: 'Discovery técnico', desc: 'Mapeo de activos críticos, superficie de ataque y dependencias. Identificación de gaps contra baseline definido.', output: ['ENTREGABLE', 'Mapa de riesgo · Inventario · Baseline gap analysis'] },
        { step: 'PHASE 02', title: 'Plan de acción', desc: 'Priorización por impacto al negocio. Definición de KPIs, ventanas de cambio y dependencias entre tareas.', output: ['ENTREGABLE', 'Roadmap priorizado · KPIs · RACI técnico'] },
        { step: 'PHASE 03', title: 'Implementación', desc: 'Despliegue incremental con pruebas, evidencia de configuración y rollback documentado para cada cambio.', output: ['ENTREGABLE', 'Configuraciones IaC · Logs · Evidencia firmada'] },
        { step: 'PHASE 04', title: 'Operación continua', desc: 'Monitoreo activo, mejora continua y transferencia de conocimiento al equipo interno con documentación viva.', output: ['ENTREGABLE', 'Dashboards · Runbooks · Sesiones de transferencia'] }
      ]
    },
    insights: {
      eyebrow: '06 · Insights',
      title: ['Notas técnicas del ', { em: 'campo' }, '.'],
      meta: '/blog',
      posts: [
        { cat: 'BLUE TEAM', date: '2026.04.18', title: 'Detección de living-off-the-land binaries con Wazuh', excerpt: 'Reglas custom para detectar abuso de utilidades nativas (certutil, mshta, rundll32) sin generar ruido en endpoints administrativos.', read: '8 min', slug: 'blog/wazuh-lolbins.html' },
        { cat: 'AUTOMATION', date: '2026.04.02', title: 'Triage de alertas con LLMs sin filtrar datos sensibles', excerpt: 'Patrón de redacción y enriquecimiento local antes de enviar contexto a un modelo. Compatible con n8n y guardrails opensource.', read: '12 min', slug: 'blog/llm-triage.html' },
        { cat: 'INFRASTRUCTURE', date: '2026.03.21', title: 'Proxmox + Tailscale: cluster privado sobre red pública', excerpt: 'Arquitectura para nodos remotos con cifrado en tránsito, sin exponer puertos públicos. Failover y backups verificados.', read: '15 min', slug: 'blog/proxmox-tailscale.html' }
      ],
      cta: 'Leer más'
    },
    contact: {
      eyebrow: '07 · Contacto',
      title: ['Listos para tu ', { em: 'próximo' }, ' diagnóstico.'],
      body: 'Agenda una conversación de 30 minutos para mapear riesgos, automatización segura y mejoras de infraestructura. Confidencial bajo NDA.',
      cta: 'Solicitar diagnóstico',
      whatsapp: 'Iniciar WhatsApp',
      details: [
        { label: 'Contacto', val: 'Gilberto Ramos' },
        { label: 'Email', val: 'gilberto@ciberpty.com', isLink: 'mailto:gilberto@ciberpty.com' },
        { label: 'WhatsApp', val: '+507 6857-3845', isLink: 'https://wa.me/50768573845' },
        { label: 'GitHub', val: 'github.com/cpu-16', isLink: 'https://github.com/cpu-16' },
        { label: 'Ubicación', val: 'Panamá · Veraguas' }
      ]
    },
    footer: {
      copyright: '© 2026 CiberPTY · Todos los derechos reservados',
      tagline: 'BUILT FOR DEFENDERS'
    }
  },
  en: {
    nav: [
      { href: '#about', label: 'Company' },
      { href: '#services', label: 'Services' },
      { href: '#ops', label: 'Operations' },
      { href: '#stack', label: 'Stack' },
      { href: '#method', label: 'Method' },
      { href: '#insights', label: 'Insights' },
      { href: '#contact', label: 'Contact' }
    ],
    statusLabel: 'SOC ONLINE',
    langCode: 'EN',
    altLang: 'ES',
    hero: {
      meta: ['v2.4.0', 'PANAMA · VERAGUAS', 'SOC 24/7'],
      titleA: 'Active',
      titleB: 'defense',
      titleC: 'for critical',
      titleD: 'infrastructure.',
      tagline: 'Blue Team and Red Team operations with live telemetry, AI-driven automation, and resilient architecture on Linux, Docker, and Proxmox. Measurable attack surface reduction.',
      ctaPrimary: 'Request assessment',
      ctaSecondary: 'View capabilities',
      stats: [
        { num: '99.98%', label: 'SOC uptime' },
        { num: '< 4 min', label: 'Avg MTTD' },
        { num: '24/7', label: 'Coverage' }
      ]
    },
    terminal: {
      title: 'gilberto@ciberpty:~',
      status: 'CONNECTED',
      hint: 'Try: status, scan, ls, services, contact, clear, help'
    },
    about: {
      eyebrow: '01 · Company',
      title: ['Security operations for teams that ', { em: 'cannot stop' }, '.'],
      meta: '/about',
      paragraphs: [
        'CiberPTY is a technical unit specialized in offensive security, defense, operational continuity, and resilient architecture. We work with homelabs, SMBs, and growing teams that need real security posture, not empty checklists.',
        'We combine Blue Team and Red Team practices with automation through n8n, LLMs, and orchestration on Linux/Docker/Proxmox. Every engagement delivers technical evidence, auditable documentation, and measurable risk reduction.'
      ]
    },
    shieldPanel: {
      head: 'firewall.status',
      live: 'LIVE',
      readouts: [
        { label: 'Threats blocked', value: '14,237', cls: 'ok' },
        { label: 'Latency', value: '12.4ms', cls: '' },
        { label: 'Posture', value: 'STRONG', cls: 'ok' }
      ]
    },
    services: {
      eyebrow: '02 · Services',
      title: ['Full ', { em: 'coverage' }, ' across the security cycle.'],
      meta: '/services [6]',
      items: [
        { num: 'SVC.01', icon: 'shield', title: 'Blue Team Operations', desc: 'Hardening, detection, and response. SIEM use case design, log ingestion, IR runbooks, and continuous defensive posture uplift.', stack: ['Wazuh', 'Hardening', 'IR Playbooks', 'SIEM'] },
        { num: 'SVC.02', icon: 'crosshair', title: 'Red Team Assessments', desc: 'Ethical offensive simulations to validate defenses, surface real gaps, and prioritize remediation with measurable business impact.', stack: ['Recon', 'Exploitation', 'Reporting'] },
        { num: 'SVC.03', icon: 'fingerprint', title: 'Digital Forensics', desc: 'Technical evidence analysis, timeline reconstruction, and incident investigation support with full chain of custody.', stack: ['Volatility', 'Autopsy', 'Timeline'] },
        { num: 'SVC.04', icon: 'gavel', title: 'Cyber Legal', desc: 'Coordination with legal counsel: technical alignment, evidence handling, formal reporting, and regulatory compliance.', stack: ['Compliance', 'Governance', 'Reporting'] },
        { num: 'SVC.05', icon: 'cpu', title: 'AI Automation', desc: 'Secure workflows with n8n and LLMs for SOC and IT. Automated triage, alert enrichment, and response orchestration.', stack: ['n8n', 'LLMs', 'Workflows'] },
        { num: 'SVC.06', icon: 'server', title: 'Secure Infrastructure', desc: 'Architecture and operation on Linux, Docker, and Proxmox. Design with segmentation, hardening, and verified backups.', stack: ['Linux', 'Docker', 'Proxmox'] }
      ],
      cta: 'Request service'
    },
    ops: {
      eyebrow: '03 · Telemetry',
      title: ['Live ', { em: 'visibility' }, ' across the global perimeter.'],
      meta: '/ops/telemetry',
      globeTitle: 'GLOBAL THREAT MAP',
      feedTitle: 'EVENT FEED',
      meters: [
        { label: 'EPS', val: '12,840', max: 100 },
        { label: 'CPU', val: '34%', max: 34 },
        { label: 'MEM', val: '61%', max: 61 },
        { label: 'NET', val: '482MB/s', max: 78 }
      ],
      legend: 'NODES · 14 · ACTIVE'
    },
    stack: {
      eyebrow: '04 · Stack',
      title: ['Tools we ', { em: 'run' }, ' in production.'],
      meta: '/stack',
      items: [
        { name: 'Linux', desc: 'Hardening, kernel tuning, sysctl, AppArmor', span: 1 },
        { name: 'Docker', desc: 'Isolation, minimal images, CVE scanning', span: 1 },
        { name: 'Proxmox', desc: 'Virtualization, snapshots, high availability', span: 1 },
        { name: 'Wazuh', desc: 'SIEM/XDR, threat detection, file integrity', span: 1 },
        { name: 'n8n', desc: 'Workflow orchestration with guardrails', span: 1 },
        { name: 'Python', desc: 'Automation, analysis, custom parsers', span: 1 },
        { name: 'Ansible', desc: 'Infrastructure as code, idempotent', span: 1 },
        { name: 'MariaDB', desc: 'Persistence, replication, verified backups', span: 1 }
      ],
      featured: { eyebrow: 'CORE', big: '8 tools', desc: 'integrated, hardened, and continuously monitored. Each one with documented runbooks and recovery drills.' }
    },
    method: {
      eyebrow: '05 · Method',
      title: ['Four phases. ', { em: 'Evidence' }, ' in every one.'],
      meta: '/method',
      steps: [
        { step: 'PHASE 01', title: 'Technical discovery', desc: 'Critical asset mapping, attack surface, and dependencies. Gap identification against defined baseline.', output: ['DELIVERABLE', 'Risk map · Inventory · Baseline gap analysis'] },
        { step: 'PHASE 02', title: 'Action plan', desc: 'Prioritization by business impact. Definition of KPIs, change windows, and inter-task dependencies.', output: ['DELIVERABLE', 'Prioritized roadmap · KPIs · Technical RACI'] },
        { step: 'PHASE 03', title: 'Implementation', desc: 'Incremental deployment with testing, configuration evidence, and documented rollback for every change.', output: ['DELIVERABLE', 'IaC configs · Logs · Signed evidence'] },
        { step: 'PHASE 04', title: 'Continuous operation', desc: 'Active monitoring, continuous improvement, and knowledge transfer to the internal team with living documentation.', output: ['DELIVERABLE', 'Dashboards · Runbooks · Transfer sessions'] }
      ]
    },
    insights: {
      eyebrow: '06 · Insights',
      title: ['Field ', { em: 'notes' }, ' from the trenches.'],
      meta: '/blog',
      posts: [
        { cat: 'BLUE TEAM', date: '2026.04.18', title: 'Detecting living-off-the-land binaries with Wazuh', excerpt: 'Custom rules to detect abuse of native utilities (certutil, mshta, rundll32) without generating noise on admin endpoints.', read: '8 min', slug: 'blog/wazuh-lolbins.html' },
        { cat: 'AUTOMATION', date: '2026.04.02', title: 'Alert triage with LLMs without leaking sensitive data', excerpt: 'Local redaction and enrichment pattern before sending context to a model. Compatible with n8n and open-source guardrails.', read: '12 min', slug: 'blog/llm-triage.html' },
        { cat: 'INFRASTRUCTURE', date: '2026.03.21', title: 'Proxmox + Tailscale: private cluster over public network', excerpt: 'Architecture for remote nodes with encryption in transit, no public ports exposed. Failover and verified backups.', read: '15 min', slug: 'blog/proxmox-tailscale.html' }
      ],
      cta: 'Read more'
    },
    contact: {
      eyebrow: '07 · Contact',
      title: ['Ready for your ', { em: 'next' }, ' assessment.'],
      body: 'Book a 30-minute conversation to map risk, secure automation, and infrastructure improvements. Confidential under NDA.',
      cta: 'Request assessment',
      whatsapp: 'Start WhatsApp',
      details: [
        { label: 'Contact', val: 'Gilberto Ramos' },
        { label: 'Email', val: 'gilberto@ciberpty.com', isLink: 'mailto:gilberto@ciberpty.com' },
        { label: 'WhatsApp', val: '+507 6857-3845', isLink: 'https://wa.me/50768573845' },
        { label: 'GitHub', val: 'github.com/cpu-16', isLink: 'https://github.com/cpu-16' },
        { label: 'Location', val: 'Panama · Veraguas' }
      ]
    },
    footer: {
      copyright: '© 2026 CiberPTY · All rights reserved',
      tagline: 'BUILT FOR DEFENDERS'
    }
  }
};

window.CONTENT = CONTENT;
