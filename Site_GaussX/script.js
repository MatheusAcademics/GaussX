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
const scrollButton = document.querySelector('.scroll-indicator');

function buildMeetings() {
  if (!meetingList) return;

  meetings.forEach((meeting, index) => {
    const card = document.createElement('a');
    card.className = 'meeting-card reveal';
    card.href = meeting.href;
    card.style.transitionDelay = `${0.09 * index}s`;
    card.innerHTML = `
      <div class="meeting-content">
        <h3>${meeting.title}</h3>
        <p>${meeting.description}</p>
        <span class="meeting-date">${meeting.date}</span>
      </div>
      <span class="arrow">›</span>
    `;
    meetingList.appendChild(card);
  });
}

function setupReveal() {
  const revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealables.forEach((element) => element.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -10% 0px'
  });

  revealables.forEach((element) => observer.observe(element));
}

function setupScrollButton() {
  if (!scrollButton) return;

  scrollButton.addEventListener('click', () => {
    const target = document.querySelector('.meetings-wrap');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function setupParallax() {
  const ambients = document.querySelectorAll('.ambient');
  const shell = document.querySelector('.logo-shell');

  const update = () => {
    const y = window.scrollY || 0;

    ambients.forEach((ambient, index) => {
      const factor = index === 0 ? 0.06 : index === 1 ? -0.05 : 0.03;
      ambient.style.transform = `translate3d(0, ${y * factor}px, 0)`;
    });

    if (shell) {
      shell.style.transform = `translate3d(0, ${Math.min(y * 0.03, 10)}px, 0)`;
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function boot() {
  buildMeetings();
  requestAnimationFrame(() => {
    document.body.classList.add('ready');
    setupReveal();
    setupScrollButton();
    setupParallax();
  });
}

boot();
