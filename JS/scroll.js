document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    type: "slide", // スライド形式（'loop'にすると無限ループ）
    perPage: 1, // 1画面に表示する枚数
    arrows: false, // 矢印ボタンを表示
    pagination: true, // ページネーション（ドット）を表示
    wheel: true, // マウスホイールでの操作を有効化
    releaseWheel: true, // スライダーの端まで行ったら通常のスクロールに戻る
    speed: 500, // スライド速度
  });

  splide.mount();
});
