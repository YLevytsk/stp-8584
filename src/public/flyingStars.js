document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.stars-wrapper');
  console.log('🎯 wrapper найден:', wrapper);

  if (!wrapper) {
    console.warn('⚠️ .stars-wrapper не найден');
    return;
  }

  // Автоматическое определение base path
  const repo = window.location.hostname === 'localhost' ? '' : `/${window.location.pathname.split('/')[1]}`;
  const svgPath = `${repo}/img/green-star.svg`;

  fetch(svgPath)
    .then((res) => {
      console.log('📦 fetch статус:', res.status);
      if (!res.ok) {
        throw new Error(`HTTP ошибка: ${res.status}`);
      }
      return res.text();
    })
    .then((svgText) => {
      console.log('✅ SVG загружен успешно');
      const template = document.createElement('div');
      template.innerHTML = svgText.trim();
      const baseStar = template.querySelector('svg');

      if (!baseStar) {
        console.warn('⚠️ SVG не содержит <svg>');
        return;
      }

      function createStar() {
        const star = baseStar.cloneNode(true);
        star.classList.add('animated-star');

        // Размер
        const size = 20 + Math.random() * 12; // 20–32px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.setAttribute('width', size);
        star.setAttribute('height', size);

        // Появление — из центра телефона по ширине
        star.style.position = 'absolute';
        star.style.left = `${20 + Math.random() * 60}%`;
        star.style.top = `0`;
        star.style.transform = 'translate(-50%, -50%)';

        // Анимация
        const x1 = (Math.random() - 0.5) * 500;
        const x2 = (Math.random() - 0.5) * 800;
        const y = 500 + Math.random() * 300;
        const r = 180 + Math.random() * 360;
        const duration = 5 + Math.random() * 2;

        star.style.setProperty('--x1', `${x1}px`);
        star.style.setProperty('--x2', `${x2}px`);
        star.style.setProperty('--y', `${y}px`);
        star.style.setProperty('--r', `${r}deg`);
        star.style.animation = `fly-wave ${duration}s ease-in-out forwards`;

        wrapper.appendChild(star);
        setTimeout(() => star.remove(), duration * 1000);
      }

      console.log('⏱ setInterval стартовал');
      setInterval(() => {
        for (let i = 0; i < 4; i++) {
          createStar();
        }
      }, 200);
    })
    .catch((err) => {
      console.error('❌ Ошибка загрузки SVG:', err);
    });
});