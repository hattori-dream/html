document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    type: "slide",
    perPage: 1,
    arrows: false,
    pagination: true,
    wheel: false,
    releaseWheel: true,
    speed: 1200,
  });

  splide.mount();

  const container = document.querySelector(".container");
  const cards = Array.from(document.querySelectorAll(".fiveStrengths__list li"));

  function equalizeCardHeights() {
    cards.forEach((c) => (c.style.height = ""));
    const maxH = Math.max(...cards.map((c) => c.offsetHeight));
    cards.forEach((c) => (c.style.height = maxH + "px"));
  }

  equalizeCardHeights();
  window.addEventListener("resize", equalizeCardHeights);

  // ===== パララックス■（ループ対応） =====
  const SPEED_MAP = { "sq--fast": 1.5, "sq--normal": 1.0, "sq--slow": 0.4 };
  const allSquares = document.querySelectorAll(".sq");

  const sqData = Array.from(allSquares).map((el) => {
    const baseTop = parseFloat(el.style.top);
    const cls = ["sq--fast", "sq--normal", "sq--slow"].find((c) => el.classList.contains(c));
    const speed = SPEED_MAP[cls] ?? 1.0;
    return { el, baseTop, speed };
  });

  const PAGE_H = 10000;
  const VIEW_H = () => container.clientHeight;

  function updateParallax() {
    const scrollY = container.scrollTop;
    const vh = VIEW_H();

    sqData.forEach(({ el, baseTop, speed }) => {
      let y = baseTop - scrollY * speed;
      const loopRange = PAGE_H;
      y = ((y % loopRange) + loopRange) % loopRange;
      const visible = y < vh + 100 && y > -100;
      el.style.transform = `translateY(${y - baseTop}px)`;
      el.style.visibility = visible ? "visible" : "hidden";
    });
  }

  container.addEventListener("scroll", updateParallax, { passive: true });
  updateParallax();
});
