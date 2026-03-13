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
  card.style.transitionDelay = `${0.08 * index}s`;
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

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-ready');

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
    threshold: 0.16,
    rootMargin: '0px 0px -10% 0px'
  });

  revealables.forEach((element) => revealObserver.observe(element));
});

const ambients = document.querySelectorAll('.bg-ambient');
const heroLogo = document.querySelector('.hero-logo-wrap');

function handleScrollEffects() {
  const y = window.scrollY || 0;

  ambients.forEach((ambient, index) => {
    const factor = index === 0 ? 0.09 : -0.07;
    ambient.style.transform = `translate3d(0, ${y * factor}px, 0)`;
  });

  if (heroLogo && !reduceMotion) {
    heroLogo.style.transform = `translate3d(0, ${Math.min(y * 0.045, 12)}px, 0)`;
  }
}

handleScrollEffects();
window.addEventListener('scroll', handleScrollEffects, { passive: true });
