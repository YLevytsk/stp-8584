document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".stars-wrapper");

  function createStar() {
    // Создаём SVG-элемент вручную
    const xmlns = "http://www.w3.org/2000/svg";
    const star = document.createElementNS(xmlns, "svg");
    const path = document.createElementNS(xmlns, "path");

    // Устанавливаем атрибуты SVG
    star.setAttribute("viewBox", "0 0 100 100");
    star.setAttribute("class", "animated-star");

    // Путь — форма 4-конечной зелёной звезды
    path.setAttribute("d", "M50 0 C65 40 100 50 C65 60 50 100 C35 60 0 50 C35 40 50 0 Z");
    path.setAttribute("fill", "#00ff66");

    star.appendChild(path);

    // Размер и позиция
    const size = 12 + Math.random() * 20;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    const wrapperRect = wrapper.getBoundingClientRect();
    star.style.position = "absolute";
    star.style.left = `${wrapperRect.width / 2}px`;
    star.style.top = `${wrapperRect.height / 2}px`;

    // Траектория и вращение
    const x = (Math.random() - 0.5) * 300;
    const y = 100 + Math.random() * 200;
    const r = 180 + Math.random() * 360;

    star.style.setProperty("--x", `${x}px`);
    star.style.setProperty("--y", `${y}px`);
    star.style.setProperty("--r", `${r}deg`);

    const duration = 2 + Math.random() * 2;
    star.style.animation = `fly-fall ${duration}s ease-in forwards`;

    // Добавляем в DOM
    wrapper.appendChild(star);

    // Удаляем после окончания
    setTimeout(() => star.remove(), duration * 1000);
  }

  // Запуск: создаём несколько звёзд каждые 300мс
  setInterval(() => {
    for (let i = 0; i < 3; i++) createStar();
  }, 300);
});

