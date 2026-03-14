const meetings = [
  {
    title: 'Encontro 1 - Alinhando Expectativas',
    description: 'Apresentação do grupo, organização dos encontros e definição da dinâmica de estudos em Matemática e Física.',
    date: '12 de março de 2026',
    href: '#'
  },
  {
    title: 'Encontro 2 - Fundamentos e Organização',
    description: 'Estruturação das primeiras frentes de estudo, divisão dos conteúdos e alinhamento dos materiais.',
    date: '19 de março de 2026',
    href: '#'
  },
  {
    title: 'Encontro 3 - Funções e Conceitos Fundamentais',
    description: 'Início do aprofundamento em Matemática e Física com resolução guiada de exercícios e revisão teórica.',
    date: '26 de março de 2026',
    href: '#'
  }
];

const meetingList = document.getElementById('meeting-list');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

meetings.forEach((meeting, index) => {
  const card = document.createElement('a');
  card.className = 'meeting-card reveal';
  card.href = meeting.href;
  card.style.setProperty('--delay', `${0.12 * index}s`);
  card.innerHTML = `
    <div class="meeting-content">
      <h2>${meeting.title}</h2>
      <p>${meeting.description}</p>
      <span class="meeting-date">${meeting.date}</span>
    </div>
    <span class="arrow">›</span>
  `;
  meetingList.appendChild(card);
});

function initializeReveal() {
  const revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('reveal-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.22,
    rootMargin: '0px 0px -8% 0px'
  });

  revealables.forEach((element) => revealObserver.observe(element));
}

function initializeHoverTilt() {
  if (reduceMotion) return;

  const cards = document.querySelectorAll('.meeting-card');

  cards.forEach((card) => {
    let raf = null;

    const update = (x, y) => {
      const rect = card.getBoundingClientRect();
      const px = (x - rect.left) / rect.width;
      const py = (y - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 8;
      const rotateX = (0.5 - py) * 8;
      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
      raf = null;
    };

    card.addEventListener('mousemove', (event) => {
      if (raf) return;
      raf = requestAnimationFrame(() => update(event.clientX, event.clientY));
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  });
}

function initializeSmoothScrollEffects() {
  const ambients = document.querySelectorAll('.bg-ambient');
  const heroLogo = document.querySelector('.hero-logo-wrap');
  const hero = document.querySelector('.hero');

  if (reduceMotion) return;

  let currentY = window.scrollY || 0;
  let targetY = currentY;
  let ticking = false;

  const apply = () => {
    currentY += (targetY - currentY) * 0.085;

    ambients.forEach((ambient, index) => {
      const factor = index === 0 ? 0.11 : -0.09;
      ambient.style.transform = `translate3d(0, ${currentY * factor}px, 0)`;
    });

    if (heroLogo) {
      heroLogo.style.transform = `translate3d(0, ${Math.min(currentY * 0.045, 16)}px, 0)`;
    }

    if (hero) {
      const heroProgress = Math.max(0, Math.min(1, currentY / 360));
      hero.style.setProperty('--hero-fade', (1 - heroProgress * 0.28).toFixed(3));
      hero.style.setProperty('--hero-lift', `${(heroProgress * -12).toFixed(2)}px`);
    }

    if (Math.abs(targetY - currentY) > 0.12) {
      requestAnimationFrame(apply);
    } else {
      ticking = false;
      currentY = targetY;
    }
  };

  const onScroll = () => {
    targetY = window.scrollY || 0;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('is-ready'));
  initializeReveal();
  initializeHoverTilt();
  initializeSmoothScrollEffects();
});
