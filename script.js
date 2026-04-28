/* ================================================================
   FREDDY ZAPATA — JavaScript del sitio web
   ================================================================
   1. Menú hamburguesa
   2. Fade-in al scroll
   3. Formulario → WhatsApp
   4. Custom cursor
   5. Morphing nav al scroll
   6. Stat counters animados
   7. Glitch en hero
   8. Tilt en service cards
   9. Liquid scroll
   10. Ink line en scroll
   11. Blob canvas + partículas globales
   12. Si Soy — carrusel + partículas + acordeón
   ================================================================ */

'use strict';

// ── 1. MENÚ HAMBURGUESA ──
const ham  = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');
ham.addEventListener('click', () => {
  const o = menu.classList.toggle('open');
  ham.classList.toggle('open', o);
  ham.setAttribute('aria-expanded', o);
});
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => {
    menu.classList.remove('open');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
  })
);

// ── 2. FADE IN AL SCROLL ──
const obs = new IntersectionObserver(
  es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -35px 0px' }
);
document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * .08}s`;
  obs.observe(el);
});

// ── 3. FORMULARIO → WHATSAPP ──
document.getElementById('btnSend').addEventListener('click', () => {
  const n = document.getElementById('nombre').value.trim();
  const e = document.getElementById('email').value.trim();
  const s = document.getElementById('servicio').value;
  const m = document.getElementById('mensaje').value.trim();
  if (!n || !e || !m) { alert('Por favor completa nombre, correo y mensaje.'); return; }
  const t = `Hola Freddy Zapata 👋\n\n*Nombre:* ${n}\n*Email:* ${e}\n*Servicio:* ${s || 'No especificado'}\n\n*Mensaje:*\n${m}`;
  window.open(`https://wa.me/523337229584?text=${encodeURIComponent(t)}`, '_blank', 'noopener,noreferrer');
});

// ── 4. CUSTOM CURSOR (desktop only) ──
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (!isTouchDevice) {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();

    const hoverEls = 'a, button, [onclick], .sisoy-dot, .service-card, .step, .training-card, .client-card';
    document.querySelectorAll(hoverEls).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

    document.addEventListener('mousedown', () => ring.classList.add('clicked'));
    document.addEventListener('mouseup',   () => ring.classList.remove('clicked'));
  }
}

// ── 5. MORPHING NAV ──
(function () {
  const nav = document.querySelector('nav[role="banner"]');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── 6. STAT COUNTERS ──
(function () {
  const statDefs = [
    { target: 23, suffix: '+' },
    { target: 8,  suffix: ''  },
    { target: 7,  suffix: '+' },
  ];
  const statEls = document.querySelectorAll('.stat-num');

  function countUp(el, target, suffix) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    el.classList.add('counting');
    const duration = 1400;
    const start = performance.now();
    (function step(now) {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else { el.textContent = target + suffix; el.classList.remove('counting'); }
    })(start);
  }

  const statObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting && statDefs[i]) {
        countUp(e.target, statDefs[i].target, statDefs[i].suffix);
      }
    });
  }, { threshold: 0.6 });

  statEls.forEach((el, i) => { if (statDefs[i]) statObs.observe(el); });
})();

// ── 7. GLITCH ON HERO NAME ──
(function () {
  const glitch = document.querySelector('.glitch');
  if (!glitch) return;
  glitch.addEventListener('mouseenter', () => {
    glitch.classList.add('glitching');
    setTimeout(() => glitch.classList.remove('glitching'), 350);
  });
})();

// ── 8. TILT CARDS ──
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r    = card.getBoundingClientRect();
    const rotX = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -10;
    const rotY = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  10;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});



// ── 10. INK LINE ──
(function () {
  const line = document.getElementById('inkLine');
  if (!line) return;
  window.addEventListener('scroll', () => {
    const progress = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1);
    line.style.strokeDashoffset = 1000 - (1000 * progress);
  }, { passive: true });
})();

// ── 11. BLOB CANVAS + PARTÍCULAS GLOBALES ──
(function () {
  const blobMain = document.getElementById('blobMain');
  if (blobMain) blobMain.style.cssText += 'width:560px;height:560px;top:5%;left:2%;';

  const blobCanvas = document.getElementById('blobCanvas');
  let lastBlob = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastBlob < 1800 || !blobCanvas) return;
    lastBlob = now;
    const mini = document.createElement('div');
    mini.className = 'blob-mini';
    const size  = Math.random() * 200 + 80;
    const left  = Math.random() * 85;
    const dur   = Math.random() * 10 + 12;
    mini.style.cssText = `width:${size}px;height:${size}px;left:${left}%;bottom:0;animation-duration:${Math.random()*4+6}s,${dur}s;`;
    blobCanvas.appendChild(mini);
    setTimeout(() => mini.remove(), (dur + 2) * 1000);
  }, { passive: true });

  const gpc = document.getElementById('globalParticles');
  if (gpc) {
    const colors = ['rgba(12,193,177,.6)','rgba(31,129,153,.5)','rgba(105,219,239,.5)','rgba(12,193,177,.3)'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'gp';
      const size = Math.random() * 5 + 2;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*4)]};animation-duration:${Math.random()*12+8}s;animation-delay:${Math.random()*12}s;`;
      gpc.appendChild(p);
    }
  }
})();

// ── 12. SI SOY — CARRUSEL + PARTÍCULAS + ACORDEÓN ──
document.addEventListener('DOMContentLoaded', function () {

  // Partículas locales de la sección
  const pc = document.getElementById('sisoyParticles');
  if (pc) {
    const colors = ['rgba(12,193,177,.5)','rgba(31,129,153,.4)','rgba(105,219,239,.4)'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'sisoy-p';
      const size = Math.random() * 4 + 2;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:0;background:${colors[Math.floor(Math.random()*3)]};animation-duration:${Math.random()*8+6}s;animation-delay:${Math.random()*8}s;`;
      pc.appendChild(p);
    }
  }

  // Carrusel
  const slides = document.querySelectorAll('.sisoy-slide');
  const dots   = document.querySelectorAll('.sisoy-dot');
  if (!slides.length) return;

  let cur = 0, timer;

  window.sisoyGoTo = function (n) {
    slides[cur].classList.remove('active');
    slides[cur].classList.add('exit');
    const prev = cur;
    setTimeout(() => slides[prev].classList.remove('exit'), 500);
    cur = n;
    slides[cur].classList.add('active');
    dots.forEach((d, i) => d.classList.toggle('active', i === n));
    clearInterval(timer);
    timer = setInterval(next, 3200);
  };

  function next() { window.sisoyGoTo((cur + 1) % slides.length); }
  timer = setInterval(next, 3200);

  // Acordeón
  window.sisoyToggleR = function () {
    document.getElementById('sisoyReality').classList.toggle('open');
  };
});


// ── HERO CONSTELLATION ──
(function () {
  const canvas = document.getElementById('heroConstellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const NODE_COUNT = 55;
  const nodes = [];

  function initNodes() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - .5) * .45,
        vy:    (Math.random() - .5) * .45,
        r:     Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }
  initNodes();
  window.addEventListener('resize', initNodes, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const alpha = (1 - dist / 110) * .4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(12,193,177,${alpha})`;
          ctx.lineWidth   = .8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // nodes
    nodes.forEach(n => {
      n.pulse += .025;
      const glow   = (Math.sin(n.pulse) + 1) / 2;
      const alpha  = .35 + glow * .65;
      const radius = n.r + glow * 1.8;

      // halo
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 5);
      grad.addColorStop(0, `rgba(12,193,177,${alpha * .4})`);
      grad.addColorStop(1, 'rgba(12,193,177,0)');
      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(n.x, n.y, radius * 5, 0, Math.PI * 2);
      ctx.fill();

      // core
      ctx.beginPath();
      ctx.fillStyle = `rgba(12,193,177,${alpha})`;
      ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // move
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();