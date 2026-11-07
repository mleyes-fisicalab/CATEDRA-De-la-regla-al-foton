/* ============================================================
   Simuladores visuales — De la regla al fotón
   Cada simulador: SIMS.nombre(contenedor) → función de limpieza
   ============================================================ */
window.SIMS = (function () {
  const SIMS = {};
  const GOLD = '#e8b84b', BLUE = '#2f7df6', CYAN = '#38d5ff', GREEN = '#7bd34a', RED = '#ff6b6b', MUTED = '#9aa5bf';

  /* ---------- utilidades ---------- */
  function h(tag, attrs, html) {
    const e = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => { if (k === 'class') e.className = v; else e.setAttribute(k, v); });
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function canvas(container, height) {
    const c = h('canvas');
    container.appendChild(c);
    const ctx = c.getContext('2d');
    function resize() {
      const w = c.clientWidth || container.clientWidth || 800;
      const dpr = window.devicePixelRatio || 1;
      c.width = Math.round(w * dpr); c.height = Math.round(height * dpr);
      c.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    return { c, ctx, W: () => c.clientWidth, H: () => height, off: () => window.removeEventListener('resize', resize) };
  }
  function slider(controls, label, min, max, step, value, onInput, fmt) {
    const wrap = h('label');
    const span = h('span', null, label);
    const inp = h('input', { type: 'range', min, max, step, value });
    const out = h('span', { class: 'v', style: 'font-family:var(--font-mono);color:var(--gold)' });
    const f = fmt || ((v) => v);
    out.textContent = f(Number(value));
    inp.addEventListener('input', () => { out.textContent = f(Number(inp.value)); onInput(Number(inp.value)); });
    wrap.append(span, inp, out); controls.appendChild(wrap);
    return inp;
  }
  function readout(container, keys) {
    const r = h('div', { class: 'readout' });
    const map = {};
    keys.forEach(([k, label]) => { const d = h('div', { class: 'r' }, `<div class="k">${label}</div><div class="v">—</div>`); r.appendChild(d); map[k] = d.querySelector('.v'); });
    container.appendChild(r);
    return (k, v) => { if (map[k]) map[k].textContent = v; };
  }
  function title(container, text, badge) {
    container.appendChild(h('div', { class: 'sim-title' }, `${text}<span class="badge gold">${badge || 'simulador'}</span>`));
  }
  function loop(fn) { let id, on = true; function step(t) { if (!on) return; fn(t); id = requestAnimationFrame(step); } id = requestAnimationFrame(step); return () => { on = false; cancelAnimationFrame(id); }; }
  function gauss() { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function poisson(lambda) { if (lambda > 60) return Math.max(0, Math.round(lambda + Math.sqrt(lambda) * gauss())); let L = Math.exp(-lambda), k = 0, p = 1; do { k++; p *= Math.random(); } while (p > L); return k - 1; }
  function stats(arr) { const n = arr.length; if (!n) return { n: 0, mean: NaN, sd: NaN }; const mean = arr.reduce((a, b) => a + b, 0) / n; const sd = n > 1 ? Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1)) : 0; return { n, mean, sd }; }

  /* ============================================================
     1. DIANA: exactitud vs precisión + dispersión de medidas
     ============================================================ */
  SIMS.diana = function (el) {
    title(el, '🎯 Diana de exactitud y precisión + tus medidas', 'Bloque 1');
    const grid = h('div', { class: 'grid2' }); el.appendChild(grid);
    const left = h('div'), right = h('div'); grid.append(left, right);
    const cv = canvas(left, 300);
    const ctrl = h('div', { class: 'controls' }); left.appendChild(ctrl);
    const modes = [['ep', 'Exacto y preciso'], ['p', 'Preciso, no exacto'], ['e', 'Exacto, no preciso'], ['n', 'Ni exacto ni preciso']];
    let mode = 'ep', shots = [];
    function reshoot() {
      shots = [];
      const bias = (mode === 'p' || mode === 'n') ? { x: 55, y: -40 } : { x: 0, y: 0 };
      const spread = (mode === 'e' || mode === 'n') ? 45 : 9;
      for (let i = 0; i < 12; i++) shots.push({ x: bias.x + gauss() * spread, y: bias.y + gauss() * spread });
      drawDiana();
    }
    const btns = modes.map(([k, lab]) => { const b = h('button', { class: 'btn small' + (k === mode ? ' active' : '') }, lab); b.addEventListener('click', () => { mode = k; btns.forEach((x) => x.classList.remove('active')); b.classList.add('active'); reshoot(); }); ctrl.appendChild(b); return b; });
    function drawDiana() {
      const { ctx } = cv, W = cv.W(), H = cv.H(), cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      [120, 95, 70, 45, 20].forEach((r, i) => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = i % 2 ? '#1c2a4d' : '#132040'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.stroke(); });
      ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = MUTED; ctx.font = '12px JetBrains Mono, monospace'; ctx.fillText('valor verdadero', cx + 10, cy - 10);
      shots.forEach((s) => { ctx.beginPath(); ctx.arc(cx + s.x, cy + s.y, 5, 0, Math.PI * 2); ctx.fillStyle = CYAN; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke(); });
      const m = { x: shots.reduce((a, s) => a + s.x, 0) / shots.length, y: shots.reduce((a, s) => a + s.y, 0) / shots.length };
      ctx.strokeStyle = RED; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + m.x - 8, cy + m.y); ctx.lineTo(cx + m.x + 8, cy + m.y); ctx.moveTo(cx + m.x, cy + m.y - 8); ctx.lineTo(cx + m.x, cy + m.y + 8); ctx.stroke();
      ctx.fillStyle = RED; ctx.fillText('promedio', cx + m.x + 10, cy + m.y + 14);
    }
    reshoot();

    // Dispersión de medidas propias
    right.appendChild(h('p', { class: 'hint' }, 'Escribe las medidas de las mesas (mm), separadas por coma:'));
    const ta = h('textarea', { rows: 3 }, '52.0, 51.5, 53, 52.4, 51.8, 52.1, 54, 52.3');
    right.appendChild(ta);
    const cv2 = canvas(right, 150);
    const out = readout(right, [['n', 'medidas'], ['mean', 'promedio'], ['sd', 'desv. estándar'], ['res', 'resultado']]);
    function drawDots() {
      const vals = ta.value.split(/[,;\s]+/).map(Number).filter((v) => !isNaN(v) && v !== 0 && ta.value.trim() !== '');
      const { ctx } = cv2, W = cv2.W(), H = cv2.H();
      ctx.clearRect(0, 0, W, H);
      const s = stats(vals);
      out('n', s.n); out('mean', isNaN(s.mean) ? '—' : s.mean.toFixed(2)); out('sd', isNaN(s.sd) ? '—' : s.sd.toFixed(2));
      out('res', s.n > 1 ? `${s.mean.toFixed(1)} ± ${(s.sd / Math.sqrt(s.n)).toFixed(1)} mm` : '—');
      if (s.n < 2) return;
      const lo = Math.min(...vals), hi = Math.max(...vals), pad = (hi - lo) * 0.15 || 1;
      const X = (v) => 30 + ((v - (lo - pad)) / ((hi + pad) - (lo - pad))) * (W - 60);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.beginPath(); ctx.moveTo(20, H - 40); ctx.lineTo(W - 20, H - 40); ctx.stroke();
      ctx.fillStyle = 'rgba(232,184,75,0.18)'; ctx.fillRect(X(s.mean - s.sd), 30, X(s.mean + s.sd) - X(s.mean - s.sd), H - 70);
      vals.forEach((v) => { ctx.beginPath(); ctx.arc(X(v), H - 60, 6, 0, Math.PI * 2); ctx.fillStyle = CYAN; ctx.fill(); });
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(s.mean), 25); ctx.lineTo(X(s.mean), H - 35); ctx.stroke();
      ctx.fillStyle = MUTED; ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(lo.toFixed(1), X(lo) - 10, H - 20); ctx.fillText(hi.toFixed(1), X(hi) - 10, H - 20);
      ctx.fillStyle = GOLD; ctx.fillText('promedio ± 1σ', X(s.mean) + 6, 22);
    }
    ta.addEventListener('input', drawDots); drawDots();
    el.appendChild(h('p', { class: 'hint' }, 'Pregunta: ¿cuál de las cuatro dianas describe mejor las medidas de tu mesa? La franja dorada es la zona de incertidumbre.'));
    return () => { cv.off(); cv2.off(); };
  };

  /* ============================================================
     2. ONDAS: interferencia de dos fuentes (tanque de ondas)
     ============================================================ */
  SIMS.ondas = function (el) {
    title(el, '🌊 Dos fuentes, un patrón: interferencia', 'Bloque 2');
    const cv = canvas(el, 320);
    const ctrl = h('div', { class: 'controls' }); el.appendChild(ctrl);
    let lambda = 28, sep = 120, t = 0;
    slider(ctrl, 'Longitud de onda (px)', 10, 60, 1, lambda, (v) => (lambda = v));
    slider(ctrl, 'Separación de fuentes (px)', 40, 260, 2, sep, (v) => (sep = v));
    const { ctx } = cv;
    let img = null;
    const stop = loop(() => {
      const W = cv.W(), H = cv.H();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.floor(W / 2), hh = Math.floor(H / 2); // baja resolución para velocidad
      if (!img || img.width !== w) img = ctx.createImageData(w, hh);
      const d = img.data;
      const s1x = w / 2 - sep / 4, s2x = w / 2 + sep / 4, sy = hh * 0.85;
      const k = (2 * Math.PI) / (lambda / 2);
      t += 0.18;
      for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) {
        const r1 = Math.hypot(x - s1x, y - sy), r2 = Math.hypot(x - s2x, y - sy);
        const a = (Math.sin(k * r1 - t) / Math.sqrt(r1 + 8) + Math.sin(k * r2 - t) / Math.sqrt(r2 + 8)) * 2.2;
        const i = (y * w + x) * 4; const v = Math.max(-1, Math.min(1, a));
        d[i] = 20 + (v > 0 ? v * 40 : 0); d[i + 1] = 40 + v * 70 + 70; d[i + 2] = 110 + v * 110; d[i + 3] = 255;
      }
      const off = document.createElement('canvas'); off.width = w; off.height = hh; off.getContext('2d').putImageData(img, 0, 0);
      ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = true; ctx.drawImage(off, 0, 0, W, H); ctx.restore();
      ctx.fillStyle = GOLD; [s1x, s2x].forEach((x) => { ctx.beginPath(); ctx.arc(x * 2, sy * 2, 5, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = '#fff'; ctx.font = '12px JetBrains Mono, monospace'; ctx.fillText('franjas claras = ondas sumadas · oscuras = canceladas', 12, 18);
    });
    el.appendChild(h('p', { class: 'hint' }, 'Reduce la longitud de onda a la mitad: las franjas se juntan. La distancia entre franjas es la "regla" que la luz trae incorporada.'));
    return () => { stop(); cv.off(); };
  };

  /* ============================================================
     3. MICHELSON: interferómetro con espejo móvil y ruido
     ============================================================ */
  SIMS.michelson = function (el) {
    title(el, '🔦 Interferómetro de Michelson: cuenta franjas', 'Bloques 2 y 3');
    const cv = canvas(el, 360);
    const ctrl = h('div', { class: 'controls' }); el.appendChild(ctrl);
    const lambda = 632.8; // nm (He-Ne)
    let disp = 0, intensity = 60, noise = false, lastFringe = 0, count = 0;
    const out = readout(el, [['d', 'desplazamiento del espejo'], ['f', 'franjas contadas'], ['lam', 'λ del láser'], ['noise', 'temblor (ruido)']]);
    slider(ctrl, 'Desplazar espejo (nm)', 0, 4000, 1, 0, (v) => { disp = v; const fr = Math.floor((2 * disp) / lambda); if (fr !== lastFringe) { count += Math.abs(fr - lastFringe); lastFringe = fr; } });
    slider(ctrl, 'Intensidad de luz (fotones/u)', 4, 400, 1, intensity, (v) => (intensity = v));
    const nb = h('button', { class: 'btn small' }, 'Ruido realista: apagado'); nb.addEventListener('click', () => { noise = !noise; nb.textContent = 'Ruido realista: ' + (noise ? 'encendido' : 'apagado'); nb.classList.toggle('active', noise); }); ctrl.appendChild(nb);
    const rb = h('button', { class: 'btn small' }, 'Reiniciar conteo'); rb.addEventListener('click', () => { count = 0; }); ctrl.appendChild(rb);
    const { ctx } = cv;
    let ph = 0;
    const stop = loop((tm) => {
      const W = cv.W(), H = cv.H(); ctx.clearRect(0, 0, W, H);
      // esquema
      const ox = 60, oy = H / 2 + 30, bs = { x: ox + 150, y: oy }, m1 = { x: ox + 150, y: 60 }, m2 = { x: W * 0.6, y: oy }, det = { x: ox + 150, y: H - 30 };
      ctx.lineWidth = 3; ctx.strokeStyle = RED;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(m2.x, oy); ctx.moveTo(bs.x, m1.y); ctx.lineTo(bs.x, det.y); ctx.stroke();
      ctx.fillStyle = '#334'; ctx.fillRect(ox - 40, oy - 12, 40, 24); ctx.fillStyle = '#fff'; ctx.font = '11px JetBrains Mono, monospace'; ctx.fillText('láser', ox - 38, oy + 4);
      ctx.save(); ctx.translate(bs.x, bs.y); ctx.rotate(Math.PI / 4); ctx.fillStyle = 'rgba(56,213,255,0.6)'; ctx.fillRect(-2, -26, 4, 52); ctx.restore();
      ctx.fillStyle = '#ccd'; ctx.fillRect(m1.x - 26, m1.y - 5, 52, 8); ctx.fillText('espejo fijo', m1.x - 30, m1.y - 10);
      const mx = m2.x + (disp / 4000) * 60; ctx.fillStyle = GOLD; ctx.fillRect(mx, m2.y - 26, 8, 52); ctx.fillText('espejo móvil ⟷', mx + 12, m2.y + 4);
      ctx.fillStyle = '#556'; ctx.fillRect(det.x - 22, det.y - 6, 44, 12); ctx.fillStyle = '#fff'; ctx.fillText('detector', det.x + 28, det.y + 4);
      // patrón de franjas (derecha)
      const px = W * 0.72, py = 40, pw = W - px - 20, phh = H - 80;
      ctx.fillStyle = '#000'; ctx.fillRect(px, py, pw, phh);
      const phase = (2 * Math.PI * 2 * disp) / lambda;
      const jitter = noise ? (1 / Math.sqrt(intensity)) * 2.5 : 0;
      ph += (gauss() * jitter - ph) * 0.4;
      for (let y = 0; y < phh; y++) {
        const r = (y / phh) * 14 - 7;
        let I = 0.5 + 0.5 * Math.cos(phase + ph + (r * r) * 0.35);
        if (noise) I = Math.max(0, Math.min(1, I + gauss() * jitter * 0.25));
        ctx.fillStyle = `rgb(${Math.round(I * 255)},${Math.round(I * 40)},${Math.round(I * 40)})`; ctx.fillRect(px, py + y, pw, 1);
      }
      ctx.strokeStyle = GOLD; ctx.strokeRect(px, py, pw, phh); ctx.fillStyle = GOLD; ctx.fillText('franjas en el detector', px, py - 8);
      out('d', `${disp} nm = ${(disp / 1000).toFixed(3)} µm`); out('f', `${count}`); out('lam', `${lambda} nm`); out('noise', noise ? `±${(jitter * 100).toFixed(0)} % · baja con más luz` : 'apagado');
    });
    el.appendChild(h('p', { class: 'hint' }, 'Cada franja que pasa = el espejo se movió media longitud de onda (316 nm). Cuenta 10 franjas y mira cuánto se movió. Luego enciende el ruido y baja la intensidad: las franjas tiemblan. ¿Por qué?'));
    return () => { stop(); cv.off(); };
  };

  /* ============================================================
     4. LLUVIA: ruido de disparo con gotas sobre un paraguas
     ============================================================ */
  SIMS.lluvia = function (el) {
    title(el, '☔ Lluvia sobre el paraguas: el ruido de disparo', 'Bloque 3');
    const cv = canvas(el, 340);
    const ctrl = h('div', { class: 'controls' }); el.appendChild(ctrl);
    let rate = 20, ordered = false;
    const out = readout(el, [['mean', 'gotas por intervalo (promedio)'], ['sd', 'fluctuación (σ)'], ['rel', 'ruido relativo σ/N'], ['sqrt', '√N (predicción)']]);
    slider(ctrl, 'Intensidad de la lluvia (gotas / intervalo)', 0.3, 3.3, 0.01, Math.log10(rate), (v) => { rate = Math.round(Math.pow(10, v)); counts.length = 0; }, (v) => String(Math.round(Math.pow(10, v))));
    const ob = h('button', { class: 'btn small' }, 'Lluvia ordenada (anticipo del Bloque 4): no'); ob.addEventListener('click', () => { ordered = !ordered; ob.textContent = 'Lluvia ordenada (anticipo del Bloque 4): ' + (ordered ? 'sí' : 'no'); ob.classList.toggle('active', ordered); counts.length = 0; }); ctrl.appendChild(ob);
    const counts = []; const drops = []; let acc = 0, lastT = 0;
    const { ctx } = cv;
    const stop = loop((tm) => {
      const W = cv.W(), H = cv.H(); const dt = lastT ? Math.min(0.05, (tm - lastT) / 1000) : 0.016; lastT = tm;
      // generar gotas (visual, limitado) y conteo estadístico por intervalo (0.5 s)
      acc += dt;
      const visualRate = Math.min(rate, 120);
      const nNew = ordered ? Math.round(visualRate * dt * 2) / 2 : poisson(visualRate * dt * 2);
      for (let i = 0; i < nNew; i++) drops.push({ x: 40 + Math.random() * (W * 0.55 - 80), y: -10, v: 220 + Math.random() * 80 });
      if (acc >= 0.5) {
        acc = 0;
        const n = ordered ? Math.round(rate + gauss() * Math.sqrt(rate) * 0.3) : poisson(rate);
        counts.push(n); if (counts.length > 40) counts.shift();
      }
      ctx.clearRect(0, 0, W, H);
      // paraguas
      const ux = W * 0.28, uy = H * 0.55, ur = W * 0.22;
      ctx.beginPath(); ctx.arc(ux, uy, ur, Math.PI, 0); ctx.fillStyle = '#c0392b'; ctx.fill();
      ctx.strokeStyle = '#222'; ctx.lineWidth = 2; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(ux, uy); ctx.lineTo(ux + Math.cos(Math.PI + (i + 3.5) * Math.PI / 7) * ur, uy + Math.sin(Math.PI + (i + 3.5) * Math.PI / 7) * ur); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(ux, uy); ctx.lineTo(ux, uy + 110); ctx.strokeStyle = '#999'; ctx.lineWidth = 4; ctx.stroke();
      // gotas
      ctx.fillStyle = CYAN;
      for (let i = drops.length - 1; i >= 0; i--) { const d = drops[i]; d.y += d.v * dt; const r = Math.hypot(d.x - ux, d.y - uy); if ((d.y >= uy - Math.sqrt(Math.max(0, ur * ur - (d.x - ux) ** 2)) && Math.abs(d.x - ux) < ur) || d.y > H) { drops.splice(i, 1); continue; } ctx.beginPath(); ctx.ellipse(d.x, d.y, 2, 5, 0, 0, Math.PI * 2); ctx.fill(); }
      // gráfica de conteos
      const gx = W * 0.58, gy = 30, gw = W - gx - 20, gh = H - 70;
      ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fillRect(gx, gy, gw, gh);
      ctx.fillStyle = MUTED; ctx.font = '11px JetBrains Mono, monospace'; ctx.fillText('gotas contadas en cada intervalo', gx, gy - 8);
      const s = stats(counts);
      if (counts.length) {
        const maxV = Math.max(rate * 1.6, ...counts) || 1;
        ctx.strokeStyle = GOLD; ctx.setLineDash([4, 4]); const ym = gy + gh - (s.mean / maxV) * gh; ctx.beginPath(); ctx.moveTo(gx, ym); ctx.lineTo(gx + gw, ym); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(232,184,75,0.15)'; const y1 = gy + gh - ((s.mean + s.sd) / maxV) * gh, y2 = gy + gh - ((s.mean - s.sd) / maxV) * gh; ctx.fillRect(gx, y1, gw, y2 - y1);
        ctx.strokeStyle = CYAN; ctx.lineWidth = 2; ctx.beginPath();
        counts.forEach((c, i) => { const x = gx + (i / 39) * gw, y = gy + gh - (c / maxV) * gh; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }); ctx.stroke();
      }
      out('mean', isNaN(s.mean) ? '—' : s.mean.toFixed(1)); out('sd', isNaN(s.sd) ? '—' : s.sd.toFixed(1)); out('rel', s.n > 2 ? (100 * s.sd / s.mean).toFixed(1) + ' %' : '—'); out('sqrt', `${Math.sqrt(rate).toFixed(1)} → ${(100 / Math.sqrt(rate)).toFixed(1)} %`);
    });
    el.appendChild(h('p', { class: 'hint' }, 'Con pocas gotas el conteo salta mucho; con muchas, el ruido relativo baja como 1/√N pero nunca llega a cero. Activa "lluvia ordenada": mismo número de gotas, menos ruido. Eso es, en esencia, la luz comprimida.'));
    return () => { stop(); cv.off(); };
  };

  /* ============================================================
     5. GLOBO: incertidumbre comprimida (squeezing)
     ============================================================ */
  SIMS.globo = function (el) {
    title(el, '🎈 El globo de incertidumbre: luz comprimida', 'Bloque 4');
    const cv = canvas(el, 320);
    const ctrl = h('div', { class: 'controls' }); el.appendChild(ctrl);
    let r = 0, angle = 0;
    const out = readout(el, [['a', 'área del globo'], ['x', 'incertidumbre que medimos'], ['p', 'incertidumbre que no nos importa'], ['g', 'ganancia']]);
    slider(ctrl, 'Apretar el globo (dB)', 0, 12, 0.5, 0, (v) => (r = v), (v) => v + ' dB');
    slider(ctrl, 'Girar el eje de medida (°)', 0, 90, 1, 0, (v) => (angle = v), (v) => v + '°');
    const { ctx } = cv; let t = 0;
    const stop = loop(() => {
      const W = cv.W(), H = cv.H(); ctx.clearRect(0, 0, W, H); t += 0.03;
      const cx = W * 0.3, cy = H / 2, R = 70;
      const s = Math.pow(10, r / 20); // factor lineal
      const ax = R / s, ay = R * s; // área constante
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.beginPath(); ctx.moveTo(cx - 120, cy); ctx.lineTo(cx + 120, cy); ctx.moveTo(cx, cy - 120); ctx.lineTo(cx, cy + 120); ctx.stroke();
      ctx.fillStyle = MUTED; ctx.font = '11px JetBrains Mono, monospace'; ctx.fillText('eje de medida', cx + 60, cy - 6);
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-angle * Math.PI / 180);
      ctx.beginPath(); ctx.ellipse(0, 0, ax, ay, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(56,213,255,0.25)'; ctx.fill(); ctx.strokeStyle = CYAN; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
      // círculo de referencia (límite cuántico estándar)
      ctx.setLineDash([5, 5]); ctx.strokeStyle = GOLD; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = GOLD; ctx.fillText('límite cuántico estándar', cx - 70, cy + R + 18);
      // proyección sobre eje de medida
      const th = angle * Math.PI / 180; const projX = Math.sqrt((ax * Math.cos(th)) ** 2 + (ay * Math.sin(th)) ** 2);
      ctx.strokeStyle = RED; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - projX, cy + 125); ctx.lineTo(cx + projX, cy + 125); ctx.stroke(); ctx.fillStyle = RED; ctx.fillText('lo que tiembla la franja', cx - 60, cy + 142);
      // franja temblorosa a la derecha
      const px = W * 0.62, py = 30, pw = W - px - 20, ph = H - 60;
      ctx.fillStyle = '#000'; ctx.fillRect(px, py, pw, ph);
      const jit = Math.sin(t * 7) * (projX / R) * 0.9;
      for (let y = 0; y < ph; y++) { const I = 0.5 + 0.5 * Math.cos((y / ph) * 6 * Math.PI + jit); ctx.fillStyle = `rgb(${Math.round(I * 255)},${Math.round(I * 40)},${Math.round(I * 40)})`; ctx.fillRect(px, py + y, pw, 1); }
      ctx.strokeStyle = GOLD; ctx.strokeRect(px, py, pw, ph); ctx.fillStyle = GOLD; ctx.fillText('franjas con luz comprimida', px, py - 8);
      out('a', 'constante'); out('x', (projX / R).toFixed(2) + ' × LCE'); out('p', (Math.sqrt((ax * Math.sin(th)) ** 2 + (ay * Math.cos(th)) ** 2) / R).toFixed(2) + ' × LCE'); out('g', (R / projX).toFixed(2) + '×');
    });
    el.appendChild(h('p', { class: 'hint' }, 'Aprieta el globo: la incertidumbre no desaparece, se muda al otro eje. Si el interferómetro mide a lo largo del eje apretado, las franjas tiemblan menos. Gira el eje y verás que la ganancia se pierde. LIGO usa unos 3 dB de compresión desde 2019.'));
    return () => { stop(); cv.off(); };
  };

  /* ============================================================
     6. COMPARADOR: 1/√N (LCE) vs 1/N (Heisenberg)
     ============================================================ */
  SIMS.comparador = function (el) {
    title(el, '📉 Dos caminos hacia la precisión: 1/√N vs 1/N', 'Bloque 4');
    const cv = canvas(el, 320);
    const ctrl = h('div', { class: 'controls' }); el.appendChild(ctrl);
    let N = 100;
    const out = readout(el, [['sql', 'error con N independientes (1/√N)'], ['hl', 'error con N entrelazados (1/N)'], ['need', 'N necesarios para igualar']]);
    slider(ctrl, 'Número de partículas N', 1, 6, 0.01, 2, (v) => (N = Math.pow(10, v)), (v) => '10^' + v.toFixed(2));
    const { ctx } = cv;
    function draw() {
      const W = cv.W(), H = cv.H(); ctx.clearRect(0, 0, W, H);
      const gx = 60, gy = 20, gw = W - 80, gh = H - 60;
      const X = (n) => gx + (Math.log10(n) / 6) * gw, Y = (e) => gy + (-Math.log10(e) / 6) * gh;
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      for (let i = 0; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(X(10 ** i), gy); ctx.lineTo(X(10 ** i), gy + gh); ctx.stroke(); ctx.beginPath(); ctx.moveTo(gx, Y(10 ** -i)); ctx.lineTo(gx + gw, Y(10 ** -i)); ctx.stroke(); ctx.fillStyle = MUTED; ctx.font = '11px JetBrains Mono, monospace'; ctx.fillText('10^' + i, X(10 ** i) - 12, gy + gh + 16); ctx.fillText('10^-' + i, 10, Y(10 ** -i) + 4); }
      ctx.fillText('N (partículas o fotones)', gx + gw / 2 - 60, H - 4);
      ctx.lineWidth = 3; ctx.strokeStyle = GOLD; ctx.beginPath(); for (let i = 0; i <= 6; i += 0.05) { const n = 10 ** i; const x = X(n), y = Y(1 / Math.sqrt(n)); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
      ctx.strokeStyle = CYAN; ctx.beginPath(); for (let i = 0; i <= 6; i += 0.05) { const n = 10 ** i; const x = X(n), y = Y(1 / n); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
      ctx.fillStyle = GOLD; ctx.fillText('límite cuántico estándar 1/√N', X(2000), Y(1 / Math.sqrt(2000)) - 10);
      ctx.fillStyle = CYAN; ctx.fillText('límite de Heisenberg 1/N', X(200), Y(1 / 200) + 16);
      ctx.fillStyle = '#fff'; [[1 / Math.sqrt(N), GOLD], [1 / N, CYAN]].forEach(([e, c]) => { ctx.beginPath(); ctx.arc(X(N), Y(e), 6, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.stroke(); });
      out('sql', (1 / Math.sqrt(N)).toExponential(2)); out('hl', (1 / N).toExponential(2)); out('need', `N² = ${(N * N).toExponential(1)} independientes`);
    }
    ctrl.querySelector('input').addEventListener('input', draw); draw();
    window.addEventListener('resize', draw);
    el.appendChild(h('p', { class: 'hint' }, 'Encuesta vs coro: con N personas independientes el error baja como 1/√N; si las N partículas están entrelazadas puede bajar como 1/N. Para igualar lo que logran 1000 partículas entrelazadas harían falta un millón de independientes.'));
    return () => { cv.off(); window.removeEventListener('resize', draw); };
  };

  /* ============================================================
     7. RELOJ: péndulo vs átomo
     ============================================================ */
  SIMS.reloj = function (el) {
    title(el, '⏱️ El péndulo que se desgasta vs el átomo que nunca cambia', 'Bloque 4');
    const cv = canvas(el, 300);
    const ctrl = h('div', { class: 'controls' }); el.appendChild(ctrl);
    let temp = 20, wear = 0;
    const out = readout(el, [['tp', 'periodo del péndulo'], ['drift', 'atraso acumulado (péndulo)'], ['atom', 'frecuencia del cesio'], ['adrift', 'atraso acumulado (átomo)']]);
    slider(ctrl, 'Temperatura del salón (°C)', -10, 45, 1, temp, (v) => (temp = v), (v) => v + ' °C');
    slider(ctrl, 'Desgaste / fricción (años)', 0, 50, 1, 0, (v) => (wear = v), (v) => v + ' años');
    const { ctx } = cv; let tPend = 0, tAtom = 0, drift = 0, simDays = 0, last = 0, phase = 0;
    const stop = loop((tm) => {
      const dt = last ? Math.min(0.05, (tm - last) / 1000) : 0.016; last = tm;
      const W = cv.W(), H = cv.H(); ctx.clearRect(0, 0, W, H);
      const T0 = 2.0, alpha = 1.9e-5; // dilatación lineal del latón
      const T = T0 * Math.sqrt(1 + alpha * (temp - 20)) * (1 + wear * 2e-5);
      // simulación acelerada: 1 s real = 1 día simulado
      simDays += dt; drift += dt * 86400 * (T - T0) / T0;
      phase += dt * 2 * Math.PI / 1.2;
      // péndulo
      const px = W * 0.25, py = 40, L = 170, th = 0.5 * Math.sin(phase * (T0 / T));
      ctx.strokeStyle = '#ccc'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + L * Math.sin(th), py + L * Math.cos(th)); ctx.stroke();
      ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(px + L * Math.sin(th), py + L * Math.cos(th), 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = MUTED; ctx.font = '12px JetBrains Mono, monospace'; ctx.fillText('péndulo de latón', px - 50, H - 12);
      // átomo
      const ax = W * 0.72, ay = H / 2;
      ctx.strokeStyle = 'rgba(56,213,255,0.5)'; ctx.lineWidth = 1.5; [0, Math.PI / 3, -Math.PI / 3].forEach((a) => { ctx.save(); ctx.translate(ax, ay); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0, 0, 90, 32, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); });
      const glow = 0.5 + 0.5 * Math.sin(phase * 4);
      ctx.fillStyle = `rgba(56,213,255,${0.4 + glow * 0.6})`; ctx.beginPath(); ctx.arc(ax, ay, 14 + glow * 4, 0, Math.PI * 2); ctx.fill();
      [0, Math.PI / 3, -Math.PI / 3].forEach((a, i) => { const t2 = phase * (1 + i * 0.3); ctx.save(); ctx.translate(ax, ay); ctx.rotate(a); ctx.fillStyle = CYAN; ctx.beginPath(); ctx.arc(90 * Math.cos(t2), 32 * Math.sin(t2), 4, 0, Math.PI * 2); ctx.fill(); ctx.restore(); });
      ctx.fillStyle = MUTED; ctx.fillText('átomo de cesio-133', ax - 60, H - 12);
      ctx.fillStyle = '#fff'; ctx.fillText(`días simulados: ${simDays.toFixed(0)}`, 12, 18);
      out('tp', T.toFixed(6) + ' s'); out('drift', Math.abs(drift) < 1 ? (drift * 1000).toFixed(1) + ' ms' : drift.toFixed(2) + ' s');
      out('atom', '9 192 631 770 Hz'); out('adrift', (simDays * 86400 * 1e-16).toExponential(1) + ' s');
    });
    el.appendChild(h('p', { class: 'hint' }, 'Sube la temperatura: el péndulo se alarga y se atrasa. Pasa los años: la fricción lo cambia. El átomo de cesio no sabe en qué salón está ni cuántos años tiene: oscila igual en Bogotá, en París o en Marte. Por eso es el patrón.'));
    return () => { stop(); cv.off(); };
  };

  /* ============================================================
     8. HOJA DE RUTA: plantilla que completa el asistente
     ============================================================ */
  SIMS.hojaRuta = function (el) {
    const KEY = 'reglaFoton.hoja';
    const estaciones = [
      { ic: '📏', nombre: 'El objeto', yr: '1799 / 1889', obj: 'Metro y kilogramo de platino-iridio', lim: 'El patrón se desgasta y existe en un solo lugar' },
      { ic: '🌊', nombre: 'La onda', yr: '1960 / 1983', obj: 'El metro definido por la luz', lim: 'Las franjas tiemblan: hay un ruido que no se va' },
      { ic: '💧', nombre: 'El fotón', yr: 'Siglo XX', obj: 'Detectores que cuentan fotones', lim: 'Más luz cuesta: límite cuántico estándar' },
      { ic: '🌀', nombre: 'La lluvia domada', yr: '2019', obj: 'Luz comprimida en LIGO, entrelazamiento', lim: 'Hacia el límite de Heisenberg' },
      { ic: '⚛️', nombre: 'El átomo', yr: '1967 / 2019', obj: 'Reloj de cesio, relojes ópticos, SI sin objetos', lim: 'Un átomo es idéntico en todo el universo' },
    ];
    const banco = {
      yr: ['1799 / 1889', '1960 / 1983', 'Siglo XX', '2019', '1967 / 2019'],
      obj: ['Metro y kilogramo de platino-iridio', 'El metro definido por la luz', 'Detectores que cuentan fotones', 'Luz comprimida en LIGO, entrelazamiento', 'Reloj de cesio, relojes ópticos, SI sin objetos'],
    };
    const shuffle = (a) => a.slice().sort(() => Math.random() - 0.5);
    let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
    const wrap = h('div', { class: 'hoja' }); el.appendChild(wrap);
    wrap.appendChild(h('p', { class: 'hint' }, 'Completa cada estación: elige el año y el objeto del banco de etiquetas, y escribe el límite en tus propias palabras. Tu avance se guarda en este navegador.'));
    const sels = [];
    estaciones.forEach((e, i) => {
      const d = h('div', { class: 'estacion' });
      const optY = ['— año —', ...shuffle(banco.yr)].map((o) => `<option ${saved['y' + i] === o ? 'selected' : ''}>${o}</option>`).join('');
      const optO = ['— objeto emblemático —', ...shuffle(banco.obj)].map((o) => `<option ${saved['o' + i] === o ? 'selected' : ''}>${o}</option>`).join('');
      d.innerHTML = `<div class="icono">${e.ic}</div><div><h4>Estación ${i + 1}: ${e.nombre}</h4>
        <div class="fila"><select data-k="y${i}">${optY}</select><select data-k="o${i}">${optO}</select></div>
        <input type="text" data-k="l${i}" placeholder="¿Qué límite empuja a la siguiente estación? (en tus palabras)" value="${(saved['l' + i] || '').replace(/"/g, '&quot;')}">
        <div class="check" data-c="${i}"></div></div>`;
      wrap.appendChild(d);
    });
    const extra = h('div', { class: 'card gold' }, `<div class="label">Tu aporte</div>
      <p>Una analogía propia para el ruido de disparo (distinta de la lluvia):</p><textarea rows="2" data-k="analogia">${saved.analogia || ''}</textarea>
      <p>Una aplicación de la metrología cuántica que te interese:</p><textarea rows="2" data-k="aplicacion">${saved.aplicacion || ''}</textarea>
      <p>Tu nombre (para la hoja impresa):</p><input type="text" data-k="nombre" value="${(saved.nombre || '').replace(/"/g, '&quot;')}">`);
    wrap.appendChild(extra);
    const acts = h('div', { class: 'controls no-print' }); wrap.appendChild(acts);
    const bCheck = h('button', { class: 'btn primary small' }, 'Revisar mis respuestas'); const bPrint = h('button', { class: 'btn small' }, 'Imprimir / guardar PDF'); const bReset = h('button', { class: 'btn small' }, 'Borrar todo');
    acts.append(bCheck, bPrint, bReset);
    const result = h('p', { class: 'hint' }); wrap.appendChild(result);
    function collect() { const o = {}; wrap.querySelectorAll('[data-k]').forEach((x) => (o[x.dataset.k] = x.value)); return o; }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(collect())); } catch (e) {} }
    wrap.addEventListener('input', save); wrap.addEventListener('change', save);
    bCheck.addEventListener('click', () => {
      const o = collect(); let ok = 0;
      estaciones.forEach((e, i) => { const c = wrap.querySelector(`[data-c="${i}"]`); const y = o['y' + i] === e.yr, ob = o['o' + i] === e.obj, l = (o['l' + i] || '').trim().length > 8; if (y && ob) ok++; c.innerHTML = `<span class="${y ? 'ok' : 'bad'}">año ${y ? '✓' : '✗'}</span> · <span class="${ob ? 'ok' : 'bad'}">objeto ${ob ? '✓' : '✗'}</span> · <span class="${l ? 'ok' : 'bad'}">límite ${l ? '✓ escrito' : '— falta'}</span>`; });
      result.textContent = ok === 5 ? '¡Hoja de Ruta completa! Las cinco estaciones están en su lugar. Ahora imprímela o guárdala como PDF.' : `${ok} de 5 estaciones correctas. Revisa las marcadas con ✗.`;
    });
    bPrint.addEventListener('click', () => window.print());
    bReset.addEventListener('click', () => { try { localStorage.removeItem(KEY); } catch (e) {} wrap.querySelectorAll('[data-k]').forEach((x) => { if (x.tagName === 'SELECT') x.selectedIndex = 0; else x.value = ''; }); wrap.querySelectorAll('.check').forEach((c) => (c.innerHTML = '')); result.textContent = ''; });
    return () => {};
  };

  return SIMS;
})();
