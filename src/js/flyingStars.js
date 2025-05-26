document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.stars-wrapper');

  fetch('./img/green-star.svg')
    .then((res) => res.text())
    .then((svgText) => {
      const template = document.createElement('div');
      template.innerHTML = svgText.trim();
      const baseStar = template.querySelector('svg');

      function createStar() {
        const star = baseStar.cloneNode(true);
        star.classList.add('animated-star');

        // Размер
        const size = 20 + Math.random() * 12; // 20–32px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Появление — из центра телефона по ширине, чуть выше центра
        star.style.position = 'absolute';
        star.style.left = `${20 + Math.random() * 60}%`; // расширено влево/вправо
        star.style.top = `0`;
        star.style.transform = 'translate(-50%, -50%)';

        // Новая "хаотичная" траектория
        const x1 = (Math.random() - 0.5) * 500;
        const x2 = (Math.random() - 0.5) * 800;
        const y = 500 + Math.random() * 300;
        const r = 180 + Math.random() * 360;
        const duration = 5 + Math.random() * 2;

        // Передаём в переменные
        star.style.setProperty('--x1', `${x1}px`);
        star.style.setProperty('--x2', `${x2}px`);
        star.style.setProperty('--y', `${y}px`);
        star.style.setProperty('--r', `${r}deg`);
        star.style.animation = `fly-wave ${duration}s ease-in-out forwards`;

        wrapper.appendChild(star);
        setTimeout(() => star.remove(), duration * 1000);
      }

      // Больше звёзд — но с замедлением
      setInterval(() => {
        for (let i = 0; i < 4; i++) {
          createStar();
        }
      }, 200);
    })
    .catch((err) => {
      console.error('Ошибка загрузки SVG:', err);
    });
});

