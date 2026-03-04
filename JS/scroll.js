document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    type: "slide",
    perPage: 1,
    arrows: false,
    pagination: true,
    wheel: true,
    releaseWheel: true,
    speed: 500,
  });

  splide.mount();
});
