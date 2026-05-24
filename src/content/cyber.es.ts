export const cyberEs = {
  title: 'Ciberseguridad & Automatización | CiberPTY',
  description:
    'Blue Team, Red Team, forense digital, automatización con IA e infraestructura segura para equipos que no pueden parar.',
  hero: {
    kicker: 'Ciberseguridad & Automatización',
    titleA: 'Operaciones de seguridad para equipos que',
    titleB: 'no pueden parar',
    lead: 'Seguridad ofensiva y defensiva, continuidad operativa y arquitectura resiliente. Cada engagement entrega evidencia técnica, documentación auditable y reducción medible del riesgo.',
    cta: 'Solicitar diagnóstico'
  },
  services: {
    title: 'Cobertura completa del ciclo de seguridad',
    items: [
      { num: 'SVC.01', title: 'Blue Team Operations', desc: 'Hardening, detección y respuesta. Casos SIEM, ingestión de logs, runbooks de IR y mejora continua de la postura.', stack: ['Wazuh', 'Hardening', 'IR Playbooks', 'SIEM'] },
      { num: 'SVC.02', title: 'Red Team Assessments', desc: 'Simulaciones ofensivas éticas para validar defensas y priorizar remediación con impacto medible.', stack: ['Recon', 'Exploitation', 'Reporting'] },
      { num: 'SVC.03', title: 'Forense Digital', desc: 'Análisis de evidencia, reconstrucción de timelines y soporte en incidentes con cadena de custodia.', stack: ['Volatility', 'Autopsy', 'Timeline'] },
      { num: 'SVC.04', title: 'Ciber Legal', desc: 'Coordinación con asesoría legal: alineación técnica, manejo de evidencia y reporte formal.', stack: ['Compliance', 'Governance', 'Reporting'] },
      { num: 'SVC.05', title: 'Automatización IA', desc: 'Flujos seguros con n8n y LLMs para SOC e IT. Triage, enriquecimiento de alertas y orquestación.', stack: ['n8n', 'LLMs', 'Workflows'] },
      { num: 'SVC.06', title: 'Infraestructura Segura', desc: 'Arquitectura y operación sobre Linux, Docker y Proxmox con segmentación, hardening y backups verificados.', stack: ['Linux', 'Docker', 'Proxmox'] }
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
    items: ['Linux', 'Python', 'Docker', 'Ansible', 'MariaDB', 'n8n', 'Proxmox', 'Wazuh']
  },
  cta: {
    title: 'Listos para tu próximo diagnóstico',
    lead: 'Agenda una conversación para mapear riesgos, automatización segura y mejoras de infraestructura.',
    button: 'Solicitar diagnóstico'
  }
};
