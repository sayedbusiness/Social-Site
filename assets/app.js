/* Kova Media · link.kovamedia.agency
   Interactions. No dependencies, no build. Everything here is an enhancement:
   the page reads, links and saves the contact with this file missing. */
(() => {
  'use strict';

  const doc = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const EXPO = 'cubic-bezier(.16,1,.3,1)';
  const SHARE = {
    title: 'Sayed Sultani · Kova Media',
    text: 'Sayed Sultani, founder of Kova Media',
    url: 'https://link.kovamedia.agency/',
  };

  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  /* ── top bar: frosted once the page leaves the top (observer, not scroll) */
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:40px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => doc.classList.toggle('scrolled', !e.isIntersecting)).observe(sentinel);

  /* ── accounts: tabs on phones, two columns from 900px ───────────────── */
  const seg = $('.seg');
  const tabs = $$('[role="tab"]', seg);
  const panels = [$('#p-biz'), $('#p-me')];
  const wrap = $('.panels');
  const wide = matchMedia('(min-width: 900px)');
  let current = 0;

  function layoutPanels() {
    panels.forEach((p, n) => {
      if (wide.matches) {
        p.hidden = false;
        p.removeAttribute('role');
        p.removeAttribute('aria-labelledby');
      } else {
        p.setAttribute('role', 'tabpanel');
        p.setAttribute('aria-labelledby', tabs[n].id);
        p.hidden = n !== current;
      }
    });
  }

  function select(i, focus) {
    if (i === current) { if (focus) tabs[i].focus(); return; }
    const from = panels[current];
    const to = panels[i];
    const dir = i > current ? 1 : -1;
    current = i;
    seg.dataset.on = String(i);
    tabs.forEach((t, n) => {
      t.setAttribute('aria-selected', String(n === i));
      t.tabIndex = n === i ? 0 : -1;
    });
    if (focus) tabs[i].focus();
    if (wide.matches) return;

    const h0 = wrap.offsetHeight;
    from.hidden = true;
    to.hidden = false;
    const h1 = wrap.offsetHeight;
    if (reduce.matches || !wrap.animate) return;

    wrap.style.overflow = 'clip';
    const grow = wrap.animate([{ height: `${h0}px` }, { height: `${h1}px` }], { duration: 420, easing: EXPO });
    grow.onfinish = grow.oncancel = () => { wrap.style.overflow = ''; };
    to.animate(
      [
        { opacity: 0, transform: `translate3d(${dir * 28}px,0,0)`, filter: 'blur(4px)' },
        { opacity: 1, transform: 'none', filter: 'blur(0)' },
      ],
      { duration: 460, easing: EXPO },
    );
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i, false));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      let n = -1;
      if (k === 'ArrowRight' || k === 'ArrowLeft') n = 1 - i;
      else if (k === 'Home') n = 0;
      else if (k === 'End') n = tabs.length - 1;
      if (n < 0) return;
      e.preventDefault();
      select(n, true);
    });
  });
  wide.addEventListener('change', layoutPanels);
  layoutPanels();

  /* ── Save contact: acknowledge the tap; the browser opens the card ─────── */
  const save = $('[data-save]');
  if (save) {
    let t = 0;
    save.addEventListener('click', () => {
      save.classList.add('is-done');
      if (navigator.vibrate) navigator.vibrate(8);
      clearTimeout(t);
      t = setTimeout(() => save.classList.remove('is-done'), 2400);
    });
  }

  /* ── entrances: three authored ones, not one effect on every block.
        The link rows deal in, the audience lines rise like the name, the pull
        quote's rule draws. Only content still below the fold is armed, so
        nothing already on screen can blink out. */
  if ('IntersectionObserver' in window && !reduce.matches) {
    const settle = (el) => {
      const kids = el.querySelectorAll('.row, li').length;
      setTimeout(() => {
        el.classList.remove('will-reveal', 'is-in');
      }, 1500 + kids * 90);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting && e.boundingClientRect.top >= 0) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
        settle(e.target);
      });
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0 });

    const fold = innerHeight * 0.92;
    $$('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return;
      $$('.panel', el).forEach((panel) => {
        $$('.row', panel).forEach((row, n) => row.style.setProperty('--n', String(n)));
      });
      $$('li', el).forEach((li, n) => li.style.setProperty('--n', String(n)));
      el.classList.add('will-reveal');
      io.observe(el);
    });

    const tail = document.createElement('div');
    tail.setAttribute('aria-hidden', 'true');
    tail.style.cssText = 'height:1px';
    document.body.appendChild(tail);
    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting) return;
      $$('.will-reveal:not(.is-in)').forEach((el) => { el.classList.add('is-in'); io.unobserve(el); settle(el); });
      obs.disconnect();
    }).observe(tail);
  }

  /* ── share sheet: bottom sheet on phones, popover on desktop ──────────── */
  const dlg = $('#share');
  const sheet = $('[data-sheet-panel]');
  const native = $('[data-native-share]');
  const copyBtn = $('[data-copy]');
  const live = $('[data-live]');
  const card = $('[data-card]');
  const popover = matchMedia('(min-width: 700px)');
  let lastFocus = null;
  let closing = false;

  if (navigator.share && (!navigator.canShare || navigator.canShare(SHARE))) native.hidden = false;

  function open(from) {
    if (!dlg || dlg.open || typeof dlg.showModal !== 'function') return;
    lastFocus = from || document.activeElement;
    closing = false;
    sheet.style.transform = '';
    dlg.showModal();
    doc.classList.add('sheet-open');
    requestAnimationFrame(() => requestAnimationFrame(() => dlg.classList.add('is-open')));
  }

  function close() {
    if (!dlg.open || closing) return;
    closing = true;
    sheet.style.transition = '';
    sheet.style.transform = '';
    dlg.classList.remove('is-open');
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      sheet.removeEventListener('transitionend', onEnd);
      dlg.close();
      closing = false;
      doc.classList.remove('sheet-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    };
    const onEnd = (e) => { if (e.target === sheet && e.propertyName === 'transform') done(); };
    sheet.addEventListener('transitionend', onEnd);
    setTimeout(done, reduce.matches ? 30 : 650);
  }

  $$('[data-share-open]').forEach((b) => b.addEventListener('click', () => open(b)));
  $$('[data-share-close]').forEach((b) => b.addEventListener('click', close));
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });

  native.addEventListener('click', async () => {
    try { await navigator.share(SHARE); } catch (_) { /* the person closed the system sheet */ }
  });

  function legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    dlg.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
    ta.remove();
    return ok;
  }

  let copyTimer = 0;
  copyBtn.addEventListener('click', async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(SHARE.url);
      ok = true;
    } catch (_) {
      ok = legacyCopy(SHARE.url);
    }
    if (!ok) {
      live.textContent = 'Could not copy. The address is link.kovamedia.agency';
      return;
    }
    copyBtn.classList.add('is-copied');
    live.textContent = 'Link copied';
    if (navigator.vibrate) navigator.vibrate(8);
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => copyBtn.classList.remove('is-copied'), 1800);
  });

  /* drag to dismiss (phones): 1:1 tracking, rubber band upward, and the
     release velocity projected forward to decide close vs. settle back */
  const project = (v, d = 0.998) => ((v / 1000) * d) / (1 - d);
  const rubber = (x, dim, c = 0.55) => (x * dim * c) / (dim + c * x);
  let drag = null;

  sheet.addEventListener('pointerdown', (e) => {
    if (popover.matches || !dlg.classList.contains('is-open') || e.button > 0) return;
    if (e.target.closest('button, a')) return;
    drag = { id: e.pointerId, y0: e.clientY, dy: 0, on: false, s: [[e.timeStamp, e.clientY]] };
  });
  sheet.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dy = e.clientY - drag.y0;
    if (!drag.on) {
      if (Math.abs(dy) < 8) return;
      drag.on = true;
      sheet.setPointerCapture(e.pointerId);
      sheet.style.transition = 'none';
    }
    drag.dy = dy;
    const y = dy >= 0 ? dy : -rubber(-dy, sheet.offsetHeight);
    sheet.style.transform = `translate3d(0,${y}px,0)`;
    drag.s.push([e.timeStamp, e.clientY]);
    if (drag.s.length > 6) drag.s.shift();
  });
  const release = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    if (!d.on) return;
    const [ta, ya] = d.s[0];
    const [tb, yb] = d.s[d.s.length - 1];
    const v = tb > ta ? ((yb - ya) / (tb - ta)) * 1000 : 0;
    if (d.dy + project(v) > sheet.offsetHeight * 0.5 || v > 1100) {
      close();
    } else {
      sheet.style.transition = '';
      sheet.style.transform = '';
    }
  };
  sheet.addEventListener('pointerup', release);
  sheet.addEventListener('pointercancel', release);

  /* the paper card leans toward the pointer; the lean is a spring (CSS) */
  if (card && fine.matches && !reduce.matches) {
    const holder = card.parentElement;
    let raf = 0;
    let px = 0;
    let py = 0;
    holder.addEventListener('pointermove', (e) => {
      const r = holder.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        card.style.transform = `rotateX(${(-py * 12).toFixed(2)}deg) rotateY(${(px * 14).toFixed(2)}deg)`;
        card.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
      });
    });
    holder.addEventListener('pointerleave', () => { card.style.transform = ''; });
  }

  /* ── the living backdrop, after first paint ──────────────────────────── */
  const boot = () => {
    import('/assets/backdrop.js')
      .then((m) => m.start({ reduce: reduce.matches }))
      .catch(() => { /* CSS backdrop stays; nothing is lost */ });
  };
  if (document.readyState === 'complete') setTimeout(boot, 80);
  else addEventListener('load', () => setTimeout(boot, 80), { once: true });
})();
