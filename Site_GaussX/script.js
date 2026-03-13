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
  if (meetingList) {
    meetings.forEach((meeting, index) => {
      const card = document.createElement('a');
      card.className = 'meeting-card reveal reveal-card';
      card.href = meeting.href;
      card.style.setProperty('--delay', `${index * 120}ms`);
      card.innerHTML = `
        <div class="meeting-card__beam"></div>
        <div class="meeting-content">
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

  const showElement = (element) => {
    element.classList.add('is-visible');
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    });

    revealables.forEach((element) => observer.observe(element));
  } else {
    revealables.forEach(showElement);
  }

  requestAnimationFrame(() => {
    document.body.classList.add('is-loaded');
  });

  const progressBar = document.querySelector('.top-progress span');
  const orbs = document.querySelectorAll('.bg-orb');
  const hero = document.getElementById('hero');
  const logoShell = document.querySelector('.logo-shell');
  const mouseLight = document.querySelector('.mouse-light');
  const cards = document.querySelectorAll('.meeting-card');

  const updateScrollEffects = () => {
    const y = window.scrollY || 0;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? Math.min(y / height, 1) : 0;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    orbs.forEach((orb, index) => {
      const speed = [0.14, -0.1, 0.06][index] ?? 0.08;
      orb.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });

    if (logoShell) {
      const drift = Math.min(y * 0.045, 22);
      logoShell.style.setProperty('--scroll-drift', `${drift}px`);
    }
  };

  updateScrollEffects();
  window.addEventListener('scroll', updateScrollEffects, { passive: true });

  if (hero) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 18;
      const py = (y / rect.height - 0.5) * 18;

      hero.style.setProperty('--mx', `${x}px`);
      hero.style.setProperty('--my', `${y}px`);

      if (logoShell) {
        logoShell.style.setProperty('--tilt-x', `${-py}deg`);
        logoShell.style.setProperty('--tilt-y', `${px}deg`);
      }

      if (mouseLight) {
        mouseLight.style.opacity = '1';
        mouseLight.style.transform = `translate(${event.clientX - 180}px, ${event.clientY - 180}px)`;
      }
    });

    hero.addEventListener('pointerleave', () => {
      if (logoShell) {
        logoShell.style.setProperty('--tilt-x', '0deg');
        logoShell.style.setProperty('--tilt-y', '0deg');
      }

      if (mouseLight) {
        mouseLight.style.opacity = '0';
      }
    });
  }

  document.querySelectorAll('.meeting-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 14;
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--gx', `${glowX}%`);
      card.style.setProperty('--gy', `${glowY}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--gx', '50%');
      card.style.setProperty('--gy', '50%');
    });
  });
});
