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
  const hero = document.querySelector('.hero');
  const logoShell = document.querySelector('.logo-shell');
  const orbs = Array.from(document.querySelectorAll('.bg-orb'));

  if (meetingList) {
    meetings.forEach((meeting, index) => {
      const card = document.createElement('a');
      card.className = 'meeting-card reveal reveal-up';
      card.href = meeting.href;
      card.style.setProperty('--delay', `${index * 120}ms`);
      card.innerHTML = `
        <div class="meeting-content">
          <span class="meeting-index">0${index + 1}</span>
          <h2>${meeting.title}</h2>
          <p>${meeting.description}</p>
          <span class="meeting-date">${meeting.date}</span>
        </div>
        <span class="arrow">›</span>
      `;
      meetingList.appendChild(card);
    });
  }

  const revealables = Array.from(document.querySelectorAll('.reveal'));

  const revealNow = (element) => {
    element.classList.add('reveal-visible');
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0.08) {
        revealNow(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -10% 0px'
  });

  revealables.forEach((element) => revealObserver.observe(element));

  let ticking = false;

  const handleFrame = () => {
    const y = window.scrollY || 0;
    const height = window.innerHeight || 1;
    const progress = Math.min(y / (height * 0.9), 1);

    orbs.forEach((orb, index) => {
      const baseFactor = [0.16, -0.11, 0.09][index] || 0.07;
      const driftX = [18, -14, 10][index] || 0;
      orb.style.transform = `translate3d(${progress * driftX}px, ${y * baseFactor}px, 0) scale(${1 + progress * 0.08})`;
    });

    if (hero) {
      hero.style.transform = `translate3d(0, ${Math.min(y * 0.06, 18)}px, 0)`;
      hero.style.opacity = `${Math.max(1 - progress * 0.18, 0.82)}`;
    }

    if (logoShell) {
      const rotate = Math.min(progress * 8, 8);
      logoShell.style.transform = `translate3d(0, ${Math.min(y * 0.05, 14)}px, 0) rotateX(${rotate}deg) scale(${1 - progress * 0.03})`;
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(handleFrame);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  handleFrame();
});
