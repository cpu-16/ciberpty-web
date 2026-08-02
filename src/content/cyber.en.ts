export const cyberEn = {
  title: 'Cybersecurity & Automation | CiberPTY',
  description:
    'Blue Team, Red Team, digital forensics, AI automation and secure infrastructure for teams that cannot stop.',
  hero: {
    kicker: 'Cybersecurity & Automation',
    titleA: 'Active defense for',
    titleB: 'critical infrastructure',
    lead: 'Blue Team and Red Team operations, an AI-agent-assisted SOC and Zero Trust architecture on Linux, Docker and Proxmox. Defense that learns, evidence at every phase.',
    cta: 'Request assessment',
    stats: [
      { num: '24/7', label: 'Coverage' },
      { num: 'Zero Trust', label: 'Architecture' },
      { num: 'AI agents', label: 'Assisted SOC' }
    ],
    termTitle: 'soc-console@ciberpty:~$',
    termLines: [
      'Blue Team active | Coordinated response',
      'Ethical Red Team | Control validation',
      'Agent-assisted SOC | Automated triage',
      'Digital forensics | Evidence preservation'
    ],
    ticker: ['ZERO TRUST', 'WAZUH SIEM', 'BLUE TEAM', 'ETHICAL RED TEAM', 'DIGITAL FORENSICS', 'SOC + AI AGENTS', 'LINUX HARDENING', 'VERIFIED BACKUPS']
  },
  firewall: {
    head: 'posture.stack',
    live: 'ACTIVE',
    readouts: [
      { label: 'SIEM', value: 'Wazuh', ok: true },
      { label: 'Access', value: 'Zero Trust', ok: true },
      { label: 'Backups', value: 'Verified', ok: true }
    ]
  },
  services: {
    title: 'Full coverage across the security cycle',
    items: [
      { num: 'SVC.01', icon: 'shield', title: 'Blue Team Operations', desc: 'Hardening, detection and response. SIEM use cases, log ingestion, IR runbooks and continuous posture uplift.', stack: ['Wazuh', 'Hardening', 'IR Playbooks', 'SIEM'] },
      { num: 'SVC.02', icon: 'crosshair', title: 'Red Team Assessments', desc: 'Ethical offensive simulations to validate defenses and prioritize remediation with measurable impact.', stack: ['Recon', 'Exploitation', 'Reporting'] },
      { num: 'SVC.03', icon: 'fingerprint', title: 'Digital Forensics', desc: 'Evidence analysis, timeline reconstruction and incident support with full chain of custody.', stack: ['Volatility', 'Autopsy', 'Timeline'] },
      { num: 'SVC.04', icon: 'gavel', title: 'Cyber Legal', desc: 'Coordination with legal counsel: technical alignment, evidence handling and formal reporting.', stack: ['Compliance', 'Governance', 'Reporting'] },
      { num: 'SVC.05', icon: 'cpu', title: 'AI Agent Automation', desc: 'Secure workflows with agents and LLMs for SOC and IT: alert triage, enrichment and orchestration with a human in command.', stack: ['Agents', 'LLMs', 'n8n'] },
      { num: 'SVC.06', icon: 'server', title: 'Secure Infrastructure', desc: 'Architecture and operation on Linux, Docker and Proxmox with segmentation, hardening and verified backups.', stack: ['Linux', 'Docker', 'Proxmox'] }
    ]
  },
  telemetry: {
    title: 'Live visibility across the global perimeter',
    mapTitle: 'GLOBAL THREAT MAP',
    legend: 'SIMULATION · LIVE',
    meters: [
      { label: 'EPS', val: '12,840', pct: 88 },
      { label: 'CPU', val: '34%', pct: 34 },
      { label: 'MEM', val: '61%', pct: 61 },
      { label: 'NET', val: '482MB/s', pct: 78 }
    ]
  },
  method: {
    title: 'Four phases. Evidence in every one.',
    steps: [
      { n: '01', title: 'Technical discovery', desc: 'Critical asset mapping, attack surface and gaps against baseline.' },
      { n: '02', title: 'Action plan', desc: 'Prioritization by impact, KPIs and change windows.' },
      { n: '03', title: 'Implementation', desc: 'Incremental deployment with testing, evidence and documented rollback.' },
      { n: '04', title: 'Continuous operation', desc: 'Monitoring, continuous improvement and knowledge transfer.' }
    ]
  },
  stack: {
    title: 'Tools in production',
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
    title: 'Ready for your next assessment',
    lead: 'Book a conversation to map risk, secure automation and infrastructure improvements.',
    button: 'Request assessment'
  }
};
