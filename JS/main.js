document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const openBtn = document.getElementById("header__menu--ic");
  const closeBtn = document.getElementById("closeBtn");

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power4.out", duration: 1.0 },
  });

  tl.to(menu, {
    right: 0,
    duration: 0.7,
    onStart: () => menu.classList.add("is-open"),
    onReverseComplete: () => menu.classList.remove("is-open"),
  })
    // 1. パネル自体のスライドイン
    .from(".menu-left", { xPercent: -100 }, "-=0.5")
    .from(".menu-right", { xPercent: 100 }, "-=1.0")
    // 2. 右パネルの中身（右から出現）
    .to(
      [".menu-right .menu-ttl", ".menu-right__text", ".menu-right__btn"],
      {
        opacity: 1,
        x: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 0.08,
      },
      "-=0.8",
    )
    // 3. 左パネルの中身（右から出現：CONTACTと統一）
    .to(
      [".menu-left .menu-ttl", ".menu-left__list li"],
      {
        opacity: 1,
        x: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 0.05,
      },
      "-=0.8",
    );

  openBtn.addEventListener("click", () => tl.timeScale(1).play());
  closeBtn.addEventListener("click", () => tl.timeScale(1.8).reverse());
});

// Swiper
const swiper = new Swiper(".swiper", {
  centeredSlides: true,
  loop: true,
  speed: 1000,
  slidesPerView: 3,
  autoplay: false,
  slideToClickedSlide: true,
  grabCursor: true,
  // ページネーション
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // 前後の矢印
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
