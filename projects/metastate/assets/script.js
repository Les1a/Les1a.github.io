(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = [...document.querySelectorAll("[data-nav-link]")];

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const closeNavigation = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const shouldOpen = toggle.getAttribute("aria-expanded") !== "true";
    nav?.classList.toggle("is-open", shouldOpen);
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    toggle.setAttribute("aria-label", shouldOpen ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("nav-open", shouldOpen);
  });

  nav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNavigation();
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle("is-active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-22% 0px -64%", threshold: [0, 0.1, 0.5] }
    );

    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  const copyButton = document.querySelector("[data-copy-citation]");
  const citation = document.getElementById("bibtex");

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  };

  copyButton?.addEventListener("click", async () => {
    if (!citation) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(citation.textContent.trim());
      } else if (!fallbackCopy(citation.textContent.trim())) {
        throw new Error("Copy command unavailable");
      }

      const label = copyButton.querySelector("span");
      copyButton.classList.add("is-copied");
      copyButton.setAttribute("aria-label", "Citation copied");
      if (label) label.textContent = "Copied";

      window.setTimeout(() => {
        copyButton.classList.remove("is-copied");
        copyButton.removeAttribute("aria-label");
        if (label) label.textContent = "Copy";
      }, 1800);
    } catch {
      copyButton.setAttribute("aria-label", "Unable to copy citation");
    }
  });
})();
