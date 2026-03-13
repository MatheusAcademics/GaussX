document.addEventListener('DOMContentLoaded', () => {
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
  if (!meetingList) return;

  meetings.forEach((meeting, index) => {
    const card = document.createElement('a');
    card.className = 'meeting-card reveal reveal-up';
    card.href = meeting.href;
    card.style.setProperty('--delay', `${index * 90}ms`);
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

  const revealables = Array.from(document.querySelectorAll('.reveal'));

  function revealElement(element) {
    if (!element.classList.contains('reveal-visible')) {
      element.classList.add('reveal-visible');
    }
  }

  function isElementNearViewport(element) {
    const rect = element.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.88;
    return rect.top <= triggerPoint;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0.08) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -10% 0px'
    });

    revealables.forEach((element) => observer.observe(element));
  } else {
    const revealOnScroll = () => {
      revealables.forEach((element) => {
        if (isElementNearViewport(element)) revealElement(element);
      });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });
  }

  // Fallback extra para navegadores/caches mais chatos
  requestAnimationFrame(() => {
    revealables.forEach((element) => {
      if (isElementNearViewport(element)) revealElement(element);
    });
  });

  const orbs = document.querySelectorAll('.bg-orb');
  const logoShell = document.querySelector('.logo-shell');

  function handleScrollEffects() {
    const y = window.scrollY || 0;

    orbs.forEach((orb, index) => {
      const factor = index === 0 ? 0.09 : -0.07;
      orb.style.transform = `translate3d(0, ${y * factor}px, 0)`;
    });

    if (logoShell) {
      logoShell.style.transform = `translate3d(0, ${Math.min(y * 0.05, 12)}px, 0)`;
    }
  }

  handleScrollEffects();
  window.addEventListener('scroll', handleScrollEffects, { passive: true });
});
