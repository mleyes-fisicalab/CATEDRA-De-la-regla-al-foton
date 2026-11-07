/* ============================================================
   Motor del cuaderno — navegación, índice, tema, progreso
   ============================================================ */
(function () {
  const STORAGE_KEY = 'reglaFoton.page';
  const THEME_KEY = 'reglaFoton.theme';
  let current = 0;
  let activeSimCleanup = null;

  const $ = (sel) => document.querySelector(sel);
  const cover = $('#cover');
  const pageEl = $('#page');
  const tocEl = $('#toc');
  const sidebar = $('#sidebar');

  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }

  /* ---------- Índice ---------- */
  function buildToc() {
    tocEl.innerHTML = '';
    let lastSection = null;
    BOOK_DATA.forEach((p, i) => {
      if (p.section !== lastSection) {
        const s = document.createElement('div');
        s.className = 'section';
        s.innerHTML = `<div class="section-title">${p.section}</div>`;
        tocEl.appendChild(s);
        lastSection = p.section;
      }
      const b = document.createElement('button');
      b.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span>${p.title}`;
      b.addEventListener('click', () => { goToPage(i); sidebar.classList.remove('open'); });
      b.dataset.index = i;
      tocEl.lastElementChild.appendChild(b);
    });
  }

  /* ---------- Render de página ---------- */
  function goToPage(i) {
    if (i < 0 || i >= BOOK_DATA.length) return;
    if (activeSimCleanup) { try { activeSimCleanup(); } catch (e) {} activeSimCleanup = null; }
    current = i;
    const p = BOOK_DATA[i];
    pageEl.innerHTML = `<div class="section-tag">${p.section}</div><h1>${p.title}</h1>${p.html}`;
    // simuladores embebidos: <div class="sim" data-sim="nombre"></div>
    const cleanups = [];
    pageEl.querySelectorAll('[data-sim]').forEach((el) => {
      const name = el.dataset.sim;
      if (window.SIMS && typeof window.SIMS[name] === 'function') {
        try { const c = window.SIMS[name](el); if (typeof c === 'function') cleanups.push(c); }
        catch (err) { el.innerHTML = `<p class="hint">No se pudo cargar el simulador "${name}": ${err.message}</p>`; }
      }
    });
    activeSimCleanup = () => cleanups.forEach((c) => c());

    if (window.MathJax && MathJax.typesetPromise) { MathJax.typesetPromise([pageEl]).catch(() => {}); }

    tocEl.querySelectorAll('button').forEach((b) => b.classList.toggle('current', Number(b.dataset.index) === i));
    $('#progress-bar').style.width = `${((i + 1) / BOOK_DATA.length) * 100}%`;
    $('#page-indicator').textContent = `${i + 1} / ${BOOK_DATA.length}`;
    $('#prev-btn').disabled = i === 0;
    $('#next-btn').textContent = i === BOOK_DATA.length - 1 ? 'Fin del viaje ✓' : 'Siguiente →';
    safeSet(STORAGE_KEY, String(i));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.goToPage = goToPage;

  /* ---------- Portada ---------- */
  function openBook(i) { cover.classList.add('hidden'); goToPage(i); }
  $('#btn-start').addEventListener('click', () => openBook(0));
  $('#btn-continue').addEventListener('click', () => openBook(Number(safeGet(STORAGE_KEY)) || 0));
  $('#btn-cover').addEventListener('click', () => { cover.classList.remove('hidden'); window.scrollTo(0, 0); });
  $('#brand').addEventListener('click', () => { cover.classList.remove('hidden'); window.scrollTo(0, 0); });
  const saved = safeGet(STORAGE_KEY);
  if (saved !== null && Number(saved) > 0) $('#btn-continue').style.display = 'inline-block';

  /* ---------- Navegación ---------- */
  $('#prev-btn').addEventListener('click', () => goToPage(current - 1));
  $('#next-btn').addEventListener('click', () => { if (current < BOOK_DATA.length - 1) goToPage(current + 1); });
  $('#menu-btn').addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('keydown', (e) => {
    if (cover.classList.contains('hidden') === false) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (e.key === 'ArrowRight') goToPage(current + 1);
    if (e.key === 'ArrowLeft') goToPage(current - 1);
  });

  /* ---------- Tema ---------- */
  const themeBtn = $('#theme-btn');
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    themeBtn.textContent = t === 'dark' ? '🌙' : '☀️';
    safeSet(THEME_KEY, t);
  }
  applyTheme(safeGet(THEME_KEY) || 'dark');
  themeBtn.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

  buildToc();
  goToPage(0);
})();
