// Reusable components, icons, shield SVG

const Icon = ({ name }) => {
  const icons = {
    shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>,
    crosshair: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="2"/></svg>,
    fingerprint: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 12c0-3 3-6 6-6s6 3 6 6"/><path d="M9 12c0-2 1.5-3 3-3s3 1 3 3v3"/><path d="M12 9v8"/><path d="M9 16c0 2 1 4 3 5"/><path d="M15 14c0 4-1 6-3 7"/></svg>,
    gavel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m14 5 5 5"/><path d="m13 6 5 5-7 7-5-5z"/><path d="M3 21h10"/><path d="m18 4 3 3"/></svg>,
    cpu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="6" width="12" height="12" rx="1"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>,
    server: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><circle cx="7" cy="7" r="0.5" fill="currentColor"/><circle cx="7" cy="17" r="0.5" fill="currentColor"/></svg>,
    arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
    sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
    moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  };
  return icons[name] || null;
};

// Renders title arrays like ['plain ', { em: 'italic' }, ' more']
const RichTitle = ({ parts }) => (
  <>
    {parts.map((p, i) => typeof p === 'string' ? p : <em key={i}>{p.em}</em>)}
  </>
);

const BrandMark = () => (
  <svg viewBox="0 0 32 32" fill="none">
    <path d="M16 3 5 7v9c0 7 5 11 11 13 6-2 11-6 11-13V7L16 3z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 9v14M9 13l7 4 7-4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="17" r="2" fill="currentColor"/>
  </svg>
);

// Detailed 3D-ish shield SVG
const ShieldArt = () => (
  <svg viewBox="0 0 400 400" className="shield-svg">
    <defs>
      <linearGradient id="sg1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="var(--info)" stopOpacity="0.4"/>
      </linearGradient>
      <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
      </linearGradient>
      <radialGradient id="sg3">
        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
      </radialGradient>
    </defs>
    {/* outer rotating ring with ticks */}
    <g className="shield-rotate-1">
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        const r1 = 180, r2 = i % 5 === 0 ? 168 : 174;
        const x1 = 200 + Math.cos(a) * r1;
        const y1 = 200 + Math.sin(a) * r1;
        const x2 = 200 + Math.cos(a) * r2;
        const y2 = 200 + Math.sin(a) * r2;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth={i % 5 === 0 ? 1.5 : 0.5} opacity={i % 5 === 0 ? 0.7 : 0.3}/>;
      })}
      <circle cx="200" cy="200" r="180" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4"/>
    </g>
    {/* second rotating ring */}
    <g className="shield-rotate-2">
      <circle cx="200" cy="200" r="155" fill="none" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.5"/>
      <circle cx="200" cy="200" r="140" fill="none" stroke="var(--info)" strokeWidth="0.6" strokeDasharray="20 8 4 8" opacity="0.4"/>
    </g>
    {/* shield body — front */}
    <path d="M200 70 L120 100 L120 200 Q120 280 200 330 Q280 280 280 200 L280 100 Z"
      fill="url(#sg2)" stroke="url(#sg1)" strokeWidth="2"/>
    {/* facets — 3d feel */}
    <path d="M200 70 L120 100 L200 200 Z" fill="var(--accent)" opacity="0.12"/>
    <path d="M200 70 L280 100 L200 200 Z" fill="var(--accent)" opacity="0.06"/>
    <path d="M120 100 L120 200 L200 200 Z" fill="var(--info)" opacity="0.08"/>
    <path d="M280 100 L280 200 L200 200 Z" fill="var(--info)" opacity="0.04"/>
    <path d="M120 200 Q120 280 200 330 L200 200 Z" fill="var(--accent)" opacity="0.09"/>
    <path d="M280 200 Q280 280 200 330 L200 200 Z" fill="var(--accent)" opacity="0.05"/>
    {/* edges */}
    <path d="M200 70 L200 330" stroke="var(--accent)" strokeWidth="0.6" opacity="0.6"/>
    <path d="M120 100 L200 200 L280 100" stroke="var(--accent)" strokeWidth="1" opacity="0.7"/>
    <path d="M120 200 L200 200 L280 200" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5"/>
    {/* center emblem */}
    <circle cx="200" cy="200" r="36" fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
    <circle cx="200" cy="200" r="28" fill="url(#sg3)"/>
    <path d="M186 200 l10 10 l20 -22" stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* corner markers */}
    {[[120,100],[280,100],[120,200],[280,200]].map(([x,y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="3" fill="var(--accent)"/>
        <circle cx={x} cy={y} r="6" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.6"/>
      </g>
    ))}
    {/* readout text */}
    <text x="200" y="262" textAnchor="middle" fill="var(--accent)" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2" opacity="0.85">PROTECTED</text>
    <text x="200" y="278" textAnchor="middle" fill="var(--muted)" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1.5">AES-256 · TLS 1.3</text>
  </svg>
);

// Header
const Header = ({ lang, setLang, theme, setTheme }) => {
  const c = window.CONTENT[lang];
  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#top" className="brand" data-hover>
          <span className="brand-mark"><BrandMark/></span>
          <span className="brand-name">CiberPTY<span className="brand-suffix">.com</span></span>
        </a>
        <nav className="nav-links">
          {c.nav.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="pill-btn" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label="Toggle language">
            {c.langCode}<span style={{opacity: 0.4}}>/</span><span style={{color: 'var(--accent)'}}>{c.altLang}</span>
          </button>
          <button className="pill-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            <span style={{display: 'inline-flex', width: 14, height: 14}}>
              <Icon name={theme === 'dark' ? 'moon' : 'sun'}/>
            </span>
          </button>
          <span className="pill-btn" style={{borderColor: 'var(--accent)', color: 'var(--accent)'}}>
            <span className="status-dot"></span>{c.statusLabel}
          </span>
        </div>
      </div>
    </header>
  );
};

// Interactive Terminal
const TerminalBlock = ({ lang }) => {
  const c = window.CONTENT[lang].terminal;
  const [lines, setLines] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [booted, setBooted] = React.useState(false);
  const [uptime, setUptime] = React.useState(0);
  const startRef = React.useRef(Date.now());
  const inputRef = React.useRef(null);
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    const id = setInterval(() => setUptime(Math.floor((Date.now() - startRef.current)/1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const fmtUp = (s) => {
    const h = String(Math.floor(s/3600)).padStart(2,'0');
    const m = String(Math.floor((s%3600)/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    return `${h}:${m}:${ss}`;
  };

  // boot sequence
  React.useEffect(() => {
    let mounted = true;
    const bootLines = lang === 'es' ? [
      { cls: 'term-out', text: '[INIT] Iniciando ciberpty-os v2.4.0...' },
      { cls: 'term-out', text: '[BOOT] Cargando módulos: wazuh, n8n, suricata, falco...' },
      { cls: 'term-ok', text: '[ OK ] Conectado a SIEM · 12,840 EPS' },
      { cls: 'term-ok', text: '[ OK ] Firewall activo · 0 brechas detectadas' },
      { cls: 'term-warn', text: '[WARN] 2 alertas en triage automatizado' },
      { cls: 'term-out', text: '' },
      { cls: 'term-out', text: `Bienvenido. ${c.hint}` }
    ] : [
      { cls: 'term-out', text: '[INIT] Booting ciberpty-os v2.4.0...' },
      { cls: 'term-out', text: '[BOOT] Loading modules: wazuh, n8n, suricata, falco...' },
      { cls: 'term-ok', text: '[ OK ] SIEM connected · 12,840 EPS' },
      { cls: 'term-ok', text: '[ OK ] Firewall active · 0 breaches detected' },
      { cls: 'term-warn', text: '[WARN] 2 alerts in automated triage' },
      { cls: 'term-out', text: '' },
      { cls: 'term-out', text: `Welcome. ${c.hint}` }
    ];
    let i = 0;
    function next() {
      if (!mounted) return;
      if (i >= bootLines.length) { setBooted(true); return; }
      const line = bootLines[i];
      if (line) setLines(prev => [...prev, line]);
      i++;
      setTimeout(next, 280 + Math.random() * 180);
    }
    setTimeout(next, 400);
    return () => { mounted = false; };
  }, [lang]);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  function runCmd(cmd) {
    const cmdLine = { cls: 'term-cmd', text: cmd, prompt: true };
    const args = cmd.trim().split(/\s+/);
    const c0 = (args[0] || '').toLowerCase();
    let out = [];
    if (c0 === '') {
      out = [];
    } else if (c0 === 'help' || c0 === '?') {
      out = lang === 'es' ? [
        { cls: 'term-out', text: 'Comandos disponibles:' },
        { cls: 'term-dim', text: '  status      Estado del SOC y servicios' },
        { cls: 'term-dim', text: '  scan <ip>   Escaneo de puertos simulado' },
        { cls: 'term-dim', text: '  ls          Listar capacidades' },
        { cls: 'term-dim', text: '  services    Servicios ofrecidos' },
        { cls: 'term-dim', text: '  contact     Datos de contacto' },
        { cls: 'term-dim', text: '  whoami      Identidad actual' },
        { cls: 'term-dim', text: '  uptime      Tiempo en línea' },
        { cls: 'term-dim', text: '  clear       Limpiar terminal' }
      ] : [
        { cls: 'term-out', text: 'Available commands:' },
        { cls: 'term-dim', text: '  status      SOC and services status' },
        { cls: 'term-dim', text: '  scan <ip>   Simulated port scan' },
        { cls: 'term-dim', text: '  ls          List capabilities' },
        { cls: 'term-dim', text: '  services    Offered services' },
        { cls: 'term-dim', text: '  contact     Contact details' },
        { cls: 'term-dim', text: '  whoami      Current identity' },
        { cls: 'term-dim', text: '  uptime      Time online' },
        { cls: 'term-dim', text: '  clear       Clear terminal' }
      ];
    } else if (c0 === 'status') {
      out = [
        { cls: 'term-ok', text: '● SIEM       online   12,840 EPS' },
        { cls: 'term-ok', text: '● Firewall   online   14,237 blocks/24h' },
        { cls: 'term-ok', text: '● n8n        online   42 workflows · 0 errors' },
        { cls: 'term-ok', text: '● Proxmox    online   3 nodes · HA' },
        { cls: 'term-warn', text: '● Backup     pending  next: 02:00 UTC-5' }
      ];
    } else if (c0 === 'scan') {
      const ip = args[1] || '10.0.0.1';
      out = [
        { cls: 'term-out', text: `Scanning ${ip}...` },
        { cls: 'term-dim', text: 'PORT    STATE  SERVICE' },
        { cls: 'term-ok',  text: '22/tcp  open   ssh      OpenSSH 9.2 (hardened)' },
        { cls: 'term-ok',  text: '443/tcp open   https    nginx 1.25 (TLS 1.3)' },
        { cls: 'term-dim', text: '80/tcp  closed http' },
        { cls: 'term-dim', text: '21/tcp  closed ftp' },
        { cls: 'term-out', text: `Done. ${ip} · 2 open · firewall enforced` }
      ];
    } else if (c0 === 'ls') {
      out = [
        { cls: 'term-info', text: 'capabilities/' },
        { cls: 'term-out',  text: '  blue-team/      red-team/      forensics/' },
        { cls: 'term-out',  text: '  cyber-legal/    ai-automation/ infra/' }
      ];
    } else if (c0 === 'services') {
      const svc = window.CONTENT[lang].services.items;
      out = svc.map(s => ({ cls: 'term-out', text: `${s.num.padEnd(8)} ${s.title}` }));
    } else if (c0 === 'contact') {
      out = [
        { cls: 'term-out', text: 'gilberto@ciberpty.com' },
        { cls: 'term-out', text: 'wa.me/50768573845' },
        { cls: 'term-out', text: 'github.com/cpu-16' }
      ];
    } else if (c0 === 'whoami') {
      out = [{ cls: 'term-ok', text: 'guest@ciberpty (read-only · no privileges)' }];
    } else if (c0 === 'uptime') {
      out = [{ cls: 'term-out', text: `up ${fmtUp(uptime)} · load: 0.42 0.38 0.31` }];
    } else if (c0 === 'clear') {
      setLines([]);
      return;
    } else if (c0 === 'sudo') {
      out = [{ cls: 'term-crit', text: `${args[0]}: nice try ;) — guest cannot escalate` }];
    } else if (c0 === 'rm') {
      out = [{ cls: 'term-crit', text: 'rm: operation not permitted (read-only sandbox)' }];
    } else {
      out = [{ cls: 'term-crit', text: `${c0}: command not found · try 'help'` }];
    }
    setLines(prev => [...prev, cmdLine, ...out]);
  }

  function onSubmit(e) {
    e.preventDefault();
    runCmd(input);
    setInput('');
  }

  return (
    <div className="terminal" data-hover onClick={() => inputRef.current && inputRef.current.focus()}>
      <div className="terminal-bar">
        <div className="terminal-dots">
          <span className="terminal-dot r"></span>
          <span className="terminal-dot y"></span>
          <span className="terminal-dot g"></span>
        </div>
        <div className="terminal-title">{c.title}</div>
        <div className="terminal-status">
          <span className="status-dot"></span>{c.status} · {fmtUp(uptime)}
        </div>
      </div>
      <div className="terminal-body" ref={bodyRef} style={{maxHeight: 380, overflowY: 'auto'}}>
        {lines.filter(Boolean).map((l, i) => (
          <div key={i} className="terminal-line">
            {l && l.prompt && <span className="term-prompt">guest@ciberpty:~$ </span>}
            <span className={l && l.cls}>{l && l.text}</span>
          </div>
        ))}
        {booted && (
          <form onSubmit={onSubmit} className="terminal-input">
            <span className="term-prompt">guest@ciberpty:~$</span>
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} autoFocus spellCheck={false} autoComplete="off"/>
            <span className="blink-cursor"></span>
          </form>
        )}
      </div>
    </div>
  );
};

// Hero
const Hero = ({ lang }) => {
  const h = window.CONTENT[lang].hero;
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div data-reveal>
          <div className="hero-meta-line">
            <span className="bracket">[</span>
            {h.meta.map((m, i) => (
              <React.Fragment key={i}>
                <span>{m}</span>
                {i < h.meta.length - 1 && <span className="sep">·</span>}
              </React.Fragment>
            ))}
            <span className="bracket">]</span>
          </div>
          <h1 className="hero-title">
            {h.titleA} <span className="glitch">{h.titleB}</span><br/>
            {h.titleC} <span className="strike">{h.titleD}</span>
          </h1>
          <p className="hero-tagline">{h.tagline}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary" data-hover>
              {h.ctaPrimary} <span className="btn-arrow"><Icon name="arrow"/></span>
            </a>
            <a href="#services" className="btn btn-secondary" data-hover>{h.ctaSecondary}</a>
          </div>
          <div className="hero-stats">
            {h.stats.map((s, i) => (
              <div key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal>
          <TerminalBlock lang={lang}/>
        </div>
      </div>
    </section>
  );
};

// About + Shield
const AboutSection = ({ lang }) => {
  const a = window.CONTENT[lang].about;
  const s = window.CONTENT[lang].shieldPanel;
  const [readouts, setReadouts] = React.useState(s.readouts);
  React.useEffect(() => {
    const id = setInterval(() => {
      setReadouts(prev => prev.map((r, i) => {
        if (i === 0) {
          const n = parseInt(r.value.replace(/,/g,'')) + Math.floor(Math.random()*4);
          return { ...r, value: n.toLocaleString() };
        }
        if (i === 1) {
          const ms = (10 + Math.random()*6).toFixed(1);
          return { ...r, value: `${ms}ms` };
        }
        return r;
      }));
    }, 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <div className="section-eyebrow">{a.eyebrow}</div>
            <h2 className="section-title"><RichTitle parts={a.title}/></h2>
          </div>
          <div className="section-meta">{a.meta}</div>
        </div>
        <div className="about-grid">
          <div className="about-text" data-reveal>
            {a.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="shield-panel" data-reveal>
            <div className="shield-panel-head">
              <span>{s.head}</span>
              <span style={{color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6}}>
                <span className="status-dot"></span>{s.live}
              </span>
            </div>
            <div className="shield-panel-stage">
              <div className="shield-svg-wrap">
                <div className="shield-pulse-ring"></div>
                <div className="shield-pulse-ring"></div>
                <div className="shield-pulse-ring"></div>
                <ShieldArt/>
              </div>
            </div>
            <div className="shield-readout">
              {readouts.map((r, i) => (
                <div key={i} className="readout-cell">
                  <div className="readout-label">{r.label}</div>
                  <div className={`readout-value ${r.cls}`}>{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services
const ServicesSection = ({ lang }) => {
  const s = window.CONTENT[lang].services;
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <div className="section-eyebrow">{s.eyebrow}</div>
            <h2 className="section-title"><RichTitle parts={s.title}/></h2>
          </div>
          <div className="section-meta">{s.meta}</div>
        </div>
        <div className="services-grid" data-reveal>
          {s.items.map((it, i) => (
            <article key={i} className="service-card" data-hover>
              <div className="service-num">
                <span>{it.num}</span>
                <span style={{color: 'var(--dim)'}}>0{i+1}/{s.items.length}</span>
              </div>
              <div className="service-icon"><Icon name={it.icon}/></div>
              <h3 className="service-title service-glitch">{it.title}</h3>
              <p className="service-desc">{it.desc}</p>
              <div className="service-stack">
                {it.stack.map((tag, j) => <span key={j} className="stack-tag">{tag}</span>)}
              </div>
              <a href="#contact" className="service-link">{s.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Ops / Globe
const OpsSection = ({ lang }) => {
  const o = window.CONTENT[lang].ops;
  const canvasRef = React.useRef(null);
  const [feed, setFeed] = React.useState([]);
  const [meters, setMeters] = React.useState(o.meters);

  React.useEffect(() => {
    const cleanup = window.initAttackGlobe(canvasRef.current);
    return cleanup;
  }, []);

  React.useEffect(() => {
    const messages = [
      { tag: 'BLOCK', cls: 'ok', msg: 'SSH brute-force from 185.117.x.x — IP banned' },
      { tag: 'TRIAGE', cls: 'warn', msg: 'Anomalous outbound to TOR exit node — quarantined' },
      { tag: 'BLOCK', cls: 'ok', msg: 'WAF: SQLi attempt on /api/login — 403' },
      { tag: 'CRIT', cls: 'crit', msg: 'Privilege escalation attempt — host isolated' },
      { tag: 'OK', cls: 'ok', msg: 'IDS rules updated — 14,237 indicators loaded' },
      { tag: 'WARN', cls: 'warn', msg: 'Cert expiring in 14d — auto-renewal queued' },
      { tag: 'BLOCK', cls: 'ok', msg: 'Phishing payload caught at gateway — sandboxed' },
      { tag: 'OK', cls: 'ok', msg: 'Backup verified — 1.2TB · sha256 match' },
      { tag: 'TRIAGE', cls: 'warn', msg: 'Unusual user-agent on /admin — challenge issued' },
      { tag: 'BLOCK', cls: 'ok', msg: 'XSS reflected attempt — sanitized + logged' },
      { tag: 'OK', cls: 'ok', msg: 'n8n workflow #042 — alert enriched in 1.4s' },
      { tag: 'CRIT', cls: 'crit', msg: 'Lateral movement detected on subnet 10.0.20/24' }
    ];
    function now() {
      const d = new Date();
      return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
    }
    function spawn() {
      const m = messages[Math.floor(Math.random() * messages.length)];
      setFeed(prev => {
        const next = [{ ...m, time: now(), id: Math.random() }, ...prev];
        return next.slice(0, 8);
      });
    }
    spawn();
    const id = setInterval(spawn, 1700);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => {
      setMeters(prev => prev.map((m, i) => {
        if (i === 0) {
          const n = 12000 + Math.floor(Math.random()*1500);
          return { ...m, val: n.toLocaleString(), max: 60 + Math.random()*30 };
        }
        if (i === 1) return { ...m, val: `${20 + Math.floor(Math.random()*30)}%`, max: 20 + Math.random()*30 };
        if (i === 2) return { ...m, val: `${55 + Math.floor(Math.random()*15)}%`, max: 55 + Math.random()*15 };
        if (i === 3) return { ...m, val: `${300 + Math.floor(Math.random()*250)}MB/s`, max: 50 + Math.random()*40 };
        return m;
      }));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section" id="ops">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <div className="section-eyebrow">{o.eyebrow}</div>
            <h2 className="section-title"><RichTitle parts={o.title}/></h2>
          </div>
          <div className="section-meta">{o.meta}</div>
        </div>
        <div className="ops-grid" data-reveal>
          <div className="ops-cell">
            <div className="ops-cell-head">
              <span>{o.globeTitle}</span>
              <span className="live-tag"><span className="status-dot"></span>LIVE</span>
            </div>
            <div className="globe-stage">
              <canvas ref={canvasRef} id="globe-canvas"></canvas>
              <span className="globe-corner tl"></span>
              <span className="globe-corner tr"></span>
              <span className="globe-corner bl"></span>
              <span className="globe-corner br"></span>
              <div className="globe-overlay">{o.legend}</div>
            </div>
            <div className="meter-grid">
              {meters.map((m, i) => (
                <div key={i} className="meter">
                  <div className="meter-label">{m.label}</div>
                  <div className="meter-val">{m.val}</div>
                  <div className="meter-bar"><div className="meter-bar-fill" style={{width: `${m.max}%`}}></div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="ops-cell">
            <div className="ops-cell-head">
              <span>{o.feedTitle}</span>
              <span className="live-tag"><span className="status-dot"></span>STREAM</span>
            </div>
            <ul className="feed-list">
              {feed.map(f => (
                <li key={f.id} className={`feed-row ${f.cls}`}>
                  <span className="feed-time">{f.time}</span>
                  <span className="feed-msg">{f.msg}</span>
                  <span className={`feed-tag ${f.cls}`}>{f.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stack bento
const StackSection = ({ lang }) => {
  const s = window.CONTENT[lang].stack;
  return (
    <section className="section" id="stack">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <div className="section-eyebrow">{s.eyebrow}</div>
            <h2 className="section-title"><RichTitle parts={s.title}/></h2>
          </div>
          <div className="section-meta">{s.meta}</div>
        </div>
        <div className="bento" data-reveal>
          <div className="bento-card featured span-2 row-2">
            <div>
              <div className="bento-eyebrow">{s.featured.eyebrow}</div>
              <div className="bento-big">{s.featured.big}</div>
            </div>
            <div className="bento-desc">{s.featured.desc}</div>
          </div>
          {s.items.map((it, i) => (
            <div key={i} className="bento-card" data-hover>
              <div className="bento-icon">
                <img src={`icons/${it.name.toLowerCase()}.svg`} alt={`${it.name} logo`}/>
              </div>
              <div>
                <div className="bento-name">{it.name}</div>
                <div className="bento-desc">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Method timeline
const MethodSection = ({ lang }) => {
  const m = window.CONTENT[lang].method;
  return (
    <section className="section" id="method">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <div className="section-eyebrow">{m.eyebrow}</div>
            <h2 className="section-title"><RichTitle parts={m.title}/></h2>
          </div>
          <div className="section-meta">{m.meta}</div>
        </div>
        <div className="timeline" data-reveal>
          {m.steps.map((step, i) => (
            <div key={i} className="timeline-row">
              <div className="timeline-step">{step.step}</div>
              <div>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-desc">{step.desc}</p>
              </div>
              <div className="timeline-output">
                <strong>{step.output[0]}</strong>
                {step.output[1]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Insights
const InsightsSection = ({ lang }) => {
  const ins = window.CONTENT[lang].insights;
  return (
    <section className="section" id="insights">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <div className="section-eyebrow">{ins.eyebrow}</div>
            <h2 className="section-title"><RichTitle parts={ins.title}/></h2>
          </div>
          <div className="section-meta">{ins.meta}</div>
        </div>
        <div className="insights" data-reveal>
          {ins.posts.map((p, i) => (
            <a key={i} className="insight" data-hover href={p.slug || '#'}>
              <div className="insight-meta">
                <span className="insight-cat">{p.cat}</span>
                <span>{p.date}</span>
              </div>
              <h3 className="insight-title">{p.title}</h3>
              <p className="insight-excerpt">{p.excerpt}</p>
              <div className="insight-readtime">→ {ins.cta} · {p.read}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact
const ContactSection = ({ lang }) => {
  const c = window.CONTENT[lang].contact;
  return (
    <section className="section" id="contact">
      <div className="container" data-reveal>
        <div className="contact-block">
          <div className="contact-grid">
            <div>
              <div className="section-eyebrow" style={{marginBottom: '1rem'}}>{c.eyebrow}</div>
              <h2 className="contact-title"><RichTitle parts={c.title}/></h2>
              <p className="contact-body">{c.body}</p>
              <div className="hero-cta">
                <a href="mailto:gilberto@ciberpty.com" className="btn btn-primary" data-hover>
                  {c.cta} <span className="btn-arrow"><Icon name="arrow"/></span>
                </a>
                <a href="https://wa.me/50768573845" target="_blank" rel="noopener" className="btn btn-secondary" data-hover>{c.whatsapp}</a>
              </div>
            </div>
            <div className="contact-details">
              {c.details.map((d, i) => (
                <div key={i} className="contact-row">
                  <span className="label">{d.label}</span>
                  <span className="val">
                    {d.isLink ? <a href={d.isLink} target={d.isLink.startsWith('http') ? '_blank' : undefined} rel="noopener" data-hover>{d.val}</a> : d.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }) => {
  const f = window.CONTENT[lang].footer;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>{f.copyright}</div>
        <div style={{color: 'var(--accent)'}}>{f.tagline}</div>
        <div>
          <a href="https://github.com/cpu-16" target="_blank" rel="noopener" data-hover>github.com/cpu-16</a>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, {
  Header, Hero, AboutSection, ServicesSection, OpsSection,
  StackSection, MethodSection, InsightsSection, ContactSection, Footer,
  Icon, RichTitle
});
