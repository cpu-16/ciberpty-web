export const cyberEs = {
  title: 'Ciberseguridad & Automatización | CiberPTY',
  description:
    'Blue Team, Red Team, forense digital, automatización con IA e infraestructura segura para equipos que no pueden parar.',
  hero: {
    kicker: 'Ciberseguridad & Automatización',
    titleA: 'Defensa activa para',
    titleB: 'infraestructura crítica',
    lead: 'Operaciones Blue Team y Red Team, SOC asistido por agentes de IA y arquitectura Zero Trust sobre Linux, Docker y Proxmox. Defensa que aprende, evidencia en cada fase.',
    cta: 'Solicitar diagnóstico',
    stats: [
      { num: '24/7', label: 'Cobertura' },
      { num: 'Zero Trust', label: 'Arquitectura' },
      { num: 'Agentes IA', label: 'SOC asistido' }
    ],
    termTitle: 'soc-console@ciberpty:~$',
    termLines: [
      'Blue Team activo | Respuesta coordinada',
      'Red Team ético | Validación de controles',
      'SOC asistido por agentes | Triage automático',
      'Forense digital | Preservación de evidencia'
    ],
    ticker: ['ZERO TRUST', 'WAZUH SIEM', 'BLUE TEAM', 'RED TEAM ÉTICO', 'FORENSE DIGITAL', 'SOC + AGENTES IA', 'HARDENING LINUX', 'BACKUPS VERIFICADOS']
  },
  firewall: {
    head: 'postura.stack',
    live: 'ACTIVO',
    readouts: [
      { label: 'SIEM', value: 'Wazuh', ok: true },
      { label: 'Acceso', value: 'Zero Trust', ok: true },
      { label: 'Backups', value: 'Verificados', ok: true }
    ]
  },
  services: {
    title: 'Cobertura completa del ciclo de seguridad',
    items: [
      { num: 'SVC.01', icon: 'shield', title: 'Blue Team Operations', desc: 'Hardening, detección y respuesta. Casos SIEM, ingestión de logs, runbooks de IR y mejora continua de la postura.', stack: ['Wazuh', 'Hardening', 'IR Playbooks', 'SIEM'] },
      { num: 'SVC.02', icon: 'crosshair', title: 'Red Team Assessments', desc: 'Simulaciones ofensivas éticas para validar defensas y priorizar remediación con impacto medible.', stack: ['Recon', 'Exploitation', 'Reporting'] },
      { num: 'SVC.03', icon: 'fingerprint', title: 'Forense Digital', desc: 'Análisis de evidencia, reconstrucción de timelines y soporte en incidentes con cadena de custodia.', stack: ['Volatility', 'Autopsy', 'Timeline'] },
      { num: 'SVC.04', icon: 'gavel', title: 'Ciber Legal', desc: 'Coordinación con asesoría legal: alineación técnica, manejo de evidencia y reporte formal.', stack: ['Compliance', 'Governance', 'Reporting'] },
      { num: 'SVC.05', icon: 'cpu', title: 'Automatización con agentes de IA', desc: 'Flujos seguros con agentes y LLMs para SOC e IT: triage de alertas, enriquecimiento y orquestación con humano al mando.', stack: ['Agentes', 'LLMs', 'n8n'] },
      { num: 'SVC.06', icon: 'server', title: 'Infraestructura Segura', desc: 'Arquitectura y operación sobre Linux, Docker y Proxmox con segmentación, hardening y backups verificados.', stack: ['Linux', 'Docker', 'Proxmox'] }
    ]
  },
  telemetry: {
    title: 'Visibilidad en vivo sobre el perímetro global',
    mapTitle: 'GLOBAL THREAT MAP',
    legend: 'SIMULACIÓN · EN VIVO',
    meters: [
      { label: 'EPS', val: '12,840', pct: 88 },
      { label: 'CPU', val: '34%', pct: 34 },
      { label: 'MEM', val: '61%', pct: 61 },
      { label: 'NET', val: '482MB/s', pct: 78 }
    ]
  },
  method: {
    title: 'Cuatro fases. Evidencia en cada una.',
    steps: [
      { n: '01', title: 'Discovery técnico', desc: 'Mapeo de activos críticos, superficie de ataque y gaps contra baseline.' },
      { n: '02', title: 'Plan de acción', desc: 'Priorización por impacto, KPIs y ventanas de cambio.' },
      { n: '03', title: 'Implementación', desc: 'Despliegue incremental con pruebas, evidencia y rollback documentado.' },
      { n: '04', title: 'Operación continua', desc: 'Monitoreo, mejora continua y transferencia de conocimiento.' }
    ]
  },
  stack: {
    title: 'Herramientas en producción',
    items: [
      { name: 'Linux', icon: '/icons/linux.svg' },
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'Docker', icon: '/icons/docker.svg' },
      { name: 'Ansible', icon: '/icons/ansible.svg' },
      { name: 'MariaDB', icon: '/icons/mariadb.svg' },
      { name: 'n8n', icon: '/icons/n8n.svg' },
      { name: 'Proxmox', icon: '/icons/proxmox.svg' },
      { name: 'Wazuh', icon: '/icons/wazuh.svg' }
    ]
  },
  cta: {
    title: 'Listos para tu próximo diagnóstico',
    lead: 'Agenda una conversación para mapear riesgos, automatización segura y mejoras de infraestructura.',
    button: 'Solicitar diagnóstico'
  }
};
