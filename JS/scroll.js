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

  // ===== 5 Strengths スタッキングカード =====
  // CSSのposition:stickyのみで制御（JSは高さ統一のみ担当）
  const container = document.querySelector(".container");
  const cards = Array.from(document.querySelectorAll(".fiveStrengths__list li"));

  // 全カードの中で最大の高さを取得して全カードに適用→高さが揃い重なりがぴったりになる
  // SP（768px以下）では高さを統一しない（縦並びのため不要、かつレイアウト崩れの原因）
  function equalizeCardHeights() {
    cards.forEach((c) => (c.style.height = "")); // リセット
    if (window.innerWidth <= 768) return; // SP時はここで終了
    const maxH = Math.max(...cards.map((c) => c.offsetHeight));
    cards.forEach((c) => (c.style.height = maxH + "px"));
  }

  equalizeCardHeights();
  window.addEventListener("resize", equalizeCardHeights);

  // ===== パララックス■（ループ対応） =====
  // fast:スクロールより速く流れる / normal:同速 / slow:遅く流れる
  const SPEED_MAP = { "sq--fast": 1.5, "sq--normal": 1.0, "sq--slow": 0.4 };
  const allSquares = document.querySelectorAll(".sq");

  // 各■の初期top値・速度をキャッシュ
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
