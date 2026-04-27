// Visual effects: matrix rain, attack globe, crosshair cursor

function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, cols, drops;
  const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃ#$%&*+=<>?@/\\|';

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.floor(w / 18);
    drops = Array(cols).fill(0).map(() => Math.random() * h / 18);
  }
  resize();
  window.addEventListener('resize', resize);

  function getAccent() {
    const root = document.documentElement;
    const v = getComputedStyle(root).getPropertyValue('--accent').trim();
    return v || '#00ff9c';
  }

  let frame = 0;
  function draw() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    // slower, deeper trails
    ctx.fillStyle = isLight ? 'rgba(244,246,248,0.045)' : 'rgba(5,6,8,0.035)';
    ctx.fillRect(0, 0, w, h);
    const accent = getAccent();
    ctx.font = '15px JetBrains Mono, monospace';
    for (let i = 0; i < cols; i++) {
      // skip many columns each frame so movement is slow & sparse
      if ((i + frame) % 3 !== 0) continue;
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 18;
      const y = drops[i] * 18;
      ctx.fillStyle = accent;
      ctx.fillText(ch, x, y);
      ctx.fillStyle = isLight ? 'rgba(0,135,92,0.18)' : 'rgba(0,255,156,0.22)';
      ctx.fillText(ch, x, y - 18);

      if (y > h && Math.random() > 0.985) drops[i] = 0;
      drops[i] += 0.18;
    }
    frame++;
  }
  let raf;
  let last = 0;
  function tick(t) {
    // throttle to ~22fps for that classic Matrix cadence
    if (t - last > 45) { draw(); last = t; }
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
}

function initAttackGlobe(canvasEl) {
  if (!canvasEl) return () => {};
  const ctx = canvasEl.getContext('2d');
  let w, h, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvasEl.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvasEl.width = w * dpr;
    canvasEl.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvasEl);

  // World point cloud — simplified continent sketches via lat/lon
  // We'll generate procedural dot map for landmasses using a low-res mask drawn from rectangles approximating continents.
  // Cleaner approach: random stars across mapped continents.
  const points = [];
  // approximate continent regions [latMin, latMax, lonMin, lonMax, density]
  const regions = [
    [10, 70, -130, -65, 220],   // North America
    [-55, 12, -82, -34, 180],   // South America
    [35, 70, -10, 40, 200],     // Europe
    [-35, 35, -18, 52, 260],    // Africa
    [10, 70, 30, 145, 320],     // Asia
    [-45, -10, 110, 155, 90],   // Australia
  ];
  regions.forEach(([lat0, lat1, lon0, lon1, n]) => {
    for (let i = 0; i < n; i++) {
      const lat = lat0 + Math.random() * (lat1 - lat0);
      const lon = lon0 + Math.random() * (lon1 - lon0);
      points.push({ lat, lon });
    }
  });

  // Hubs & cities (rough lat/lon)
  const cities = [
    { name: 'PA', lat: 9, lon: -79, home: true },
    { name: 'NYC', lat: 40.7, lon: -74 },
    { name: 'LDN', lat: 51.5, lon: -0.1 },
    { name: 'BER', lat: 52.5, lon: 13.4 },
    { name: 'MAD', lat: 40.4, lon: -3.7 },
    { name: 'SAO', lat: -23.5, lon: -46.6 },
    { name: 'BOG', lat: 4.7, lon: -74 },
    { name: 'LAX', lat: 34, lon: -118 },
    { name: 'TYO', lat: 35.6, lon: 139.7 },
    { name: 'SIN', lat: 1.35, lon: 103.8 },
    { name: 'SYD', lat: -33.9, lon: 151.2 },
    { name: 'JNB', lat: -26.2, lon: 28 },
    { name: 'MOS', lat: 55.7, lon: 37.6 },
    { name: 'DXB', lat: 25.2, lon: 55.3 }
  ];

  // Project equirectangular
  function project(lat, lon) {
    const x = ((lon + 180) / 360) * w;
    const y = ((90 - lat) / 180) * h;
    return [x, y];
  }

  const home = cities.find(c => c.home);
  const arcs = [];

  function spawnArc() {
    const candidates = cities.filter(c => !c.home);
    const from = candidates[Math.floor(Math.random() * candidates.length)];
    const to = home;
    const isCrit = Math.random() < 0.25;
    arcs.push({ from, to, t: 0, dur: 60 + Math.random() * 80, crit: isCrit });
    if (arcs.length > 20) arcs.shift();
  }

  const arcTimer = setInterval(spawnArc, 700);

  function getColor(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function draw() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const accent = getColor('--accent') || '#00ff9c';
    const crit = getColor('--crit') || '#ff4d6d';
    const dim = isLight ? 'rgba(74,85,104,0.5)' : 'rgba(125,138,154,0.4)';
    const bgFill = isLight ? '#eaeef2' : '#0a0d12';

    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, w, h);

    // grid
    ctx.strokeStyle = isLight ? 'rgba(0,135,92,0.06)' : 'rgba(0,255,156,0.05)';
    ctx.lineWidth = 1;
    for (let lat = -60; lat <= 60; lat += 30) {
      const [, y] = project(lat, 0);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    for (let lon = -180; lon <= 180; lon += 30) {
      const [x] = project(0, lon);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }

    // continents as point cloud
    ctx.fillStyle = dim;
    points.forEach(p => {
      const [x, y] = project(p.lat, p.lon);
      ctx.fillRect(x, y, 1.2, 1.2);
    });

    // home pulse
    const [hx, hy] = project(home.lat, home.lon);
    const t = (Date.now() % 2000) / 2000;
    ctx.beginPath();
    ctx.arc(hx, hy, 2 + t * 14, 0, Math.PI * 2);
    ctx.strokeStyle = accent + '88';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(hx, hy, 3, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();

    // arcs
    arcs.forEach(a => {
      const [x1, y1] = project(a.from.lat, a.from.lon);
      const [x2, y2] = project(a.to.lat, a.to.lon);
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.25;

      // full path faint
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(mx, my, x2, y2);
      ctx.strokeStyle = (a.crit ? crit : accent) + (isLight ? '40' : '30');
      ctx.lineWidth = 1;
      ctx.stroke();

      // animated head
      const p = Math.min(1, a.t / a.dur);
      // sample
      const px = (1-p)*(1-p)*x1 + 2*(1-p)*p*mx + p*p*x2;
      const py = (1-p)*(1-p)*y1 + 2*(1-p)*p*my + p*p*y2;
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = a.crit ? crit : accent;
      ctx.shadowColor = a.crit ? crit : accent;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // origin marker
      ctx.beginPath();
      ctx.arc(x1, y1, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = (a.crit ? crit : accent) + 'cc';
      ctx.fill();

      a.t += 1;
    });

    for (let i = arcs.length - 1; i >= 0; i--) {
      if (arcs[i].t >= arcs[i].dur) arcs.splice(i, 1);
    }
  }

  let raf;
  function tick() {
    draw();
    raf = requestAnimationFrame(tick);
  }
  tick();
  return () => { cancelAnimationFrame(raf); clearInterval(arcTimer); ro.disconnect(); };
}

function initCrosshair() {
  const ring = document.getElementById('ch-ring');
  const dot = document.getElementById('ch-dot');
  const th = document.getElementById('ch-th');
  const tv = document.getElementById('ch-tv');
  if (!ring || !dot) return;
  let mx = -100, my = -100, rx = -100, ry = -100;
  function move(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  }
  window.addEventListener('mousemove', move);
  function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    if (th) { th.style.left = (rx - 7) + 'px'; th.style.top = ry + 'px'; }
    if (tv) { tv.style.left = rx + 'px'; tv.style.top = (ry - 7) + 'px'; tv.style.height = '14px'; tv.style.width = '1px'; }
    requestAnimationFrame(tick);
  }
  tick();

  document.addEventListener('mouseover', e => {
    const t = e.target;
    if (t && t.closest && t.closest('a, button, [data-hover]')) {
      document.body.classList.add('is-hovering');
    }
  });
  document.addEventListener('mouseout', e => {
    const t = e.target;
    if (t && t.closest && t.closest('a, button, [data-hover]')) {
      document.body.classList.remove('is-hovering');
    }
  });
}

function initRevealOnScroll() {
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  const reveal = el => el.classList.add('visible');

  if (!('IntersectionObserver' in window)) {
    els.forEach(reveal);
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        reveal(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) reveal(el);
    else obs.observe(el);
  });
}

window.initMatrixRain = initMatrixRain;
window.initAttackGlobe = initAttackGlobe;
window.initCrosshair = initCrosshair;
window.initRevealOnScroll = initRevealOnScroll;
