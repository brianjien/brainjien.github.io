import { useEffect, useRef } from "react";

export function usePageMotion() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements =
      root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    const showAll = () =>
      elements?.forEach((element) => {
        element.dataset.reveal = "visible";
      });

    if (preference.matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "visible";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );

    elements?.forEach((element) => {
      // Keep the initial viewport and deep-linked content readable immediately.
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.dataset.reveal = "pending";
      }
      observer.observe(element);
    });

    const finish = () => {
      if (preference.matches) {
        observer.disconnect();
        showAll();
      }
    };
    preference.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", finish);
      showAll();
    };
  }, []);

  return root;
}
