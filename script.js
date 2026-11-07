document.addEventListener("DOMContentLoaded", () => {
  // Без анимаций секции остаются обычным статичным потоком
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    // Первая секция видна сразу, поэтому не поворачивается
    if (index > 0) {
      gsap.fromTo(
        section.querySelector(".container"),
        { rotation: 30 },
        {
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    }

    if (index === sections.length - 1) return;

    ScrollTrigger.create({
      trigger: section,
      start: "bottom bottom",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
  });
});
