document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.stars-wrapper');

  fetch('./img/green-star.svg') // <-- путь к SVG
    .then((res) => res.text())
    .then((svgText) => {
      const template = document.createElement('div');
      template.innerHTML = svgText.trim(); // вставляем как HTML
      const baseStar = template.querySelector('svg');

      function createStar() {
        const star = baseStar.cloneNode(true);
        star.classList.add('animated-star');

        const size = 12 + Math.random() * 20;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.position = 'absolute';
        star.style.left = '50%';
        star.style.top = '50%';
        star.style.transform = 'translate(-50%, -50%)';

        const x = (Math.random() - 0.5) * 800;
        const y = (Math.random() - 0.5) * 800;
        const r = 180 + Math.random() * 360;
        const duration = 2 + Math.random() * 2;

        star.style.setProperty('--x', `${x}px`);
        star.style.setProperty('--y', `${y}px`);
        star.style.setProperty('--r', `${r}deg`);
        star.style.animation = `fly-fall ${duration}s ease-out forwards`;

        wrapper.appendChild(star);
        setTimeout(() => star.remove(), duration * 1000);
      }

      setInterval(() => {
        for (let i = 0; i < 3; i++) {
          createStar();
        }
      }, 300);
    })
    .catch((err) => {
      console.error('Ошибка загрузки SVG:', err);
    });
});

