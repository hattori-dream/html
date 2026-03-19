/**
 * common.js
 * 全ページ共通の処理
 *   - メニュー開閉アニメーション（GSAP）
 *   - リップルエフェクト
 *   - メニュー内リンクでスクロール後に閉じる
 *   - TOPに戻るボタン
 */

document.addEventListener("DOMContentLoaded", () => {
  /* =============================================
     メニュー開閉（GSAP）
     ============================================= */
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
    .from(".menu__panel--nav", { xPercent: -100 }, "-=0.3")
    .from(".menu__panel--contact", { xPercent: 100 }, "-=0.55")
    .to([".menu__panel--contact .menu__heading", ".menu__desc", ".menu__btn"], { opacity: 1, x: 0, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.05 }, "-=0.45")
    .to([".menu__panel--nav .menu__heading", ".menu__item"], { opacity: 1, x: 0, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.03 }, "-=0.45");

  const closeMenu = () => tl.timeScale(1.8).reverse();

  openBtn.addEventListener("click", () => tl.timeScale(1).play());
  closeBtn.addEventListener("click", closeMenu);

  /* =============================================
     リップルエフェクト（.menu__btn）
     ============================================= */
  document.querySelectorAll(".menu__btn").forEach((btn) => {
    const ripple = document.createElement("span");
    ripple.classList.add("menu__ripple");
    btn.prepend(ripple);

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
    });
  });

  /* =============================================
     メニュー内リンク: 閉じてからアンカーへスクロール
     同一ページ（#anchor）→ メニューを閉じてスクロール
     別ページ（page.html#anchor）→ メニューを閉じてから遷移
     ============================================= */
  document.querySelectorAll(".menu__item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const link = item.querySelector(".menu__link");
      const href = link ? link.getAttribute("href") : null;
      if (!href) return;

      e.preventDefault();
      tl.timeScale(1.8).reverse();

      const isAnchorOnly = href.startsWith("#");

      gsap.delayedCall(tl.duration() / 1.8, () => {
        if (isAnchorOnly) {
          // 同一ページ内スクロール
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        } else {
          // 別ページへ遷移（index.html#section 形式も含む）
          window.location.href = href;
        }
      });
    });
  });
});

/* =============================================
   TOPに戻るボタン
   ============================================= */
const backToTopBtn = document.getElementById("backToTop");
const container = document.querySelector(".container");

container.addEventListener("scroll", () => {
  backToTopBtn.classList.toggle("is-visible", container.scrollTop > 300);
});

backToTopBtn.addEventListener("click", () => {
  container.scrollTo({ top: 0, behavior: "smooth" });
});
