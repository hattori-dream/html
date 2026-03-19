document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const openBtn = document.getElementById("header__menu--ic");
  const closeBtn = document.getElementById("closeBtn");

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power4.out", duration: 0.55 },
  });

  tl.to(menu, {
    right: 0,
    duration: 0.4,
    onStart: () => menu.classList.add("is-open"),
    onReverseComplete: () => menu.classList.remove("is-open"),
  })
    // 1. パネル自体のスライドイン
    .from(".menu-left", { xPercent: -100 }, "-=0.3")
    .from(".menu-right", { xPercent: 100 }, "-=0.55")
    // 2. 右パネルの中身（右から出現）
    .to(
      [".menu-right .menu-ttl", ".menu-right__text", ".menu-right__btn"],
      {
        opacity: 1,
        x: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 0.05,
      },
      "-=0.45",
    )
    // 3. 左パネルの中身（右から出現：CONTACTと統一）
    .to(
      [".menu-left .menu-ttl", ".menu-left__list li"],
      {
        opacity: 1,
        x: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 0.03,
      },
      "-=0.45",
    );

  const closeMenu = () => tl.timeScale(1.8).reverse();

  openBtn.addEventListener("click", () => tl.timeScale(1).play());
  closeBtn.addEventListener("click", closeMenu);

  // .menu-right__btn にリップルエフェクト用 span を挿入
  document.querySelectorAll(".menu-right__btn").forEach((btn) => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    btn.prepend(ripple);

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";
    });
  });

  // メニューのliをクリックした時もCloseと同じ動作で閉じ、
  // アニメーション完了後にアンカー先へスクロール
  document.querySelectorAll(".menu-left__list li").forEach((li) => {
    li.addEventListener("click", (e) => {
      e.preventDefault();
      const link = li.querySelector("a");
      const href = link ? link.getAttribute("href") : null;

      tl.timeScale(1.8).reverse();

      gsap.delayedCall(tl.duration() / 1.8, () => {
        if (href) {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });
});

// TOPに戻るボタン
const backToTopBtn = document.getElementById("backToTop");
const container = document.querySelector(".container");

container.addEventListener("scroll", () => {
  if (container.scrollTop > 300) {
    backToTopBtn.classList.add("is-visible");
  } else {
    backToTopBtn.classList.remove("is-visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  container.scrollTo({ top: 0, behavior: "smooth" });
});

// Swiper
const swiper = new Swiper(".swiper", {
  centeredSlides: true,
  loop: true,
  speed: 1000,
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
  slidesPerView: 1.1,
  breakpoints: {
    426: {
      slidesPerView: 1.5,
    },
    769: {
      slidesPerView: 3,
    },
  },
});
