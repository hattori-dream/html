const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");
const menuItems = document.querySelectorAll(".menu-left li");

// GSAP Timeline（停止状態）
const tl = gsap.timeline({ paused: true });

// 初期位置を100%右に設定（GSAPが管理）
gsap.set(".menu-overlay", { xPercent: 100 });

// 右からメニューをスライドイン
tl.to(".menu-overlay", {
  xPercent: 0,
  duration: 0.6,
  ease: "power3.out",
});

// メニュー項目をフェードアップ
tl.to(
  menuItems,
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1,
  },
  "-=0.3",
);

let isOpen = false;

hamburger.addEventListener("click", () => {
  if (!isOpen) tl.play();
  isOpen = true;
});

closeBtn.addEventListener("click", () => {
  if (isOpen) tl.reverse();
  isOpen = false;
});

// Swiper
const swiper = new Swiper(".swiper", {
  centeredSlides: true,
  loop: true,
  speed: 1500,
  slidesPerView: 3,
  autoplay: false,
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
