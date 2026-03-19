/**
 * index.js
 * トップページ専用の処理
 *   - Splide（カリキュラムスライダー）
 *   - strengths カードの高さ均等化
 *   - パララックス■
 *   - Swiper（利用者の声スライダー）
 */

document.addEventListener("DOMContentLoaded", () => {
  /* =============================================
     Splide: カリキュラムスライダー
     ============================================= */
  const splideEl = document.querySelector(".splide");
  if (splideEl) {
    const splide = new Splide(splideEl, {
      type: "slide",
      perPage: 1,
      arrows: false,
      pagination: true,
      wheel: false,
      releaseWheel: true,
      speed: 1200,
    });
    splide.mount();
  }

  /* =============================================
     strengths カード高さ均等化
     ============================================= */
  const container = document.querySelector(".container");
  const cards = Array.from(document.querySelectorAll(".strengths__item"));

  function equalizeCardHeights() {
    cards.forEach((c) => (c.style.height = ""));
    if (cards.length === 0) return;
    const maxH = Math.max(...cards.map((c) => c.offsetHeight));
    cards.forEach((c) => (c.style.height = `${maxH}px`));
  }

  equalizeCardHeights();
  window.addEventListener("resize", equalizeCardHeights);

  /* =============================================
     パララックス■
     ============================================= */
  const SPEED_MAP = {
    "parallax__sq--fast": 1.5,
    "parallax__sq--normal": 1.0,
    "parallax__sq--slow": 0.4,
  };

  const allSquares = document.querySelectorAll(".parallax__sq");
  const sqData = Array.from(allSquares).map((el) => {
    const baseTop = parseFloat(el.style.top);
    const cls = Object.keys(SPEED_MAP).find((c) => el.classList.contains(c));
    const speed = SPEED_MAP[cls] ?? 1.0;
    return { el, baseTop, speed };
  });

  const PAGE_H = 10000;
  const getViewH = () => container.clientHeight;

  function updateParallax() {
    const scrollY = container.scrollTop;
    const vh = getViewH();

    sqData.forEach(({ el, baseTop, speed }) => {
      let y = baseTop - scrollY * speed;
      y = ((y % PAGE_H) + PAGE_H) % PAGE_H;
      el.style.transform = `translateY(${y - baseTop}px)`;
      el.style.visibility = y < vh + 100 && y > -100 ? "visible" : "hidden";
    });
  }

  if (container && sqData.length > 0) {
    container.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();
  }

  /* =============================================
     Swiper: 利用者の声スライダー
     ============================================= */
  const swiperEl = document.querySelector(".swiper");
  if (swiperEl) {
    new Swiper(swiperEl, {
      centeredSlides: true,
      loop: true,
      speed: 1000,
      autoplay: false,
      slideToClickedSlide: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 1.1,
      breakpoints: {
        426: { slidesPerView: 1.5 },
        769: { slidesPerView: 3 },
      },
    });
  }
});
