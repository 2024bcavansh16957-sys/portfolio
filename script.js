
const loader = document.getElementById("loader");
const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const scrollTopButton = document.getElementById("scrollTop");
const typedText = document.getElementById("typedText");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const typingText = "BCA Student | Cloud Intern | Salesforce Learner | Future Software Engineer";
let typingIndex = 0;

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 550);
  typeHeadline();
});

function typeHeadline() {
  if (typingIndex <= typingText.length) {
    typedText.textContent = typingText.slice(0, typingIndex);
    typingIndex += 1;
    setTimeout(typeHeadline, 42);
  }
}

function updateHeaderState() {
  const isScrolled = window.scrollY > 24;
  header.classList.toggle("scrolled", isScrolled);
  scrollTopButton.classList.toggle("visible", window.scrollY > 520);
}

window.addEventListener("scroll", updateHeaderState);
updateHeaderState();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => {
          item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => activeSectionObserver.observe(section));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio message from ${formData.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`
  );

  formStatus.textContent = "Opening your email app...";
  window.location.href = `mailto:2024bcavansh16957@poornima.edu.in?subject=${subject}&body=${body}`;
  contactForm.reset();

  setTimeout(() => {
    formStatus.textContent = "Message prepared. You can send it from your email app.";
  }, 600);
});

