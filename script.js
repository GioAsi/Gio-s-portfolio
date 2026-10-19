const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Reveal sections as they enter the viewport. Respect reduced-motion preferences.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Replace the placeholder email in both the link and data-email attribute before publishing.
const copyButton = document.querySelector("#copyEmail");
const emailLink = document.querySelector("#emailLink");
const copyHint = document.querySelector("#copyHint");

copyButton.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  if (!email || email === "gioasi14@gmail.com") {
    copyHint.textContent = "gioasi14@gmail.com.";
    return;
  }
  try {
    await navigator.clipboard.writeText(email);
    copyHint.textContent = "Email address copied to clipboard.";
  } catch {
    copyHint.textContent = `Your email address is ${email}`;
  }
});

emailLink.addEventListener("click", (event) => {
  if (emailLink.href.includes("gioasi14@gmail.com")) {
    event.preventDefault();
    copyHint.textContent = "gioasi14@gmail.com";
  }
});

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll("#navLinks a").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}
