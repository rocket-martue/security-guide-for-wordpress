/**
 * WordPress Security Guide - Main Application
 *
 * Features:
 * - Mobile menu toggle
 * - Scroll spy navigation
 * - Accordion (accessible)
 * - Checklist with localStorage persistence
 * - Progress bar updates
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollSpy();
  initAccordions();
  initChecklist();
});

/* ==============================
   Mobile Menu
   ============================== */
function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  const links = menu.querySelectorAll(".mobile-menu__link");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    toggleMobileMenu(!isOpen);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMobileMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      toggleMobileMenu(false);
      btn.focus();
    }
  });

  function toggleMobileMenu(open) {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }
}

/* ==============================
   Scroll Spy
   ============================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll(".nav__link[data-section]");
  const sections = document.querySelectorAll("section[id]");

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("data-section") === id,
            );
          });
        }
      });
    },
    {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==============================
   Accordion
   ============================== */
function initAccordions() {
  const accordions = document.querySelectorAll("[data-accordion]");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion__header");
    const content = accordion.querySelector(".accordion__content");

    if (!header || !content) return;

    // Generate unique ID for aria
    const id = "accordion-" + Math.random().toString(36).substring(2, 9);
    content.id = id;
    header.setAttribute("aria-controls", id);

    header.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("is-open");
      toggle(!isOpen);
    });

    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const isOpen = accordion.classList.contains("is-open");
        toggle(!isOpen);
      }
    });

    function toggle(open) {
      accordion.classList.toggle("is-open", open);
      header.setAttribute("aria-expanded", String(open));
      content.setAttribute("aria-hidden", String(!open));
    }
  });
}

/* ==============================
   Checklist with localStorage
   ============================== */
const STORAGE_KEY = "wp-security-checklist";

function initChecklist() {
  const checkboxes = document.querySelectorAll(".checklist-item__input");

  if (!checkboxes.length) return;

  // Load saved state
  const saved = loadChecklist();
  checkboxes.forEach((checkbox) => {
    if (saved[checkbox.name]) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", () => {
      saveChecklist();
      updateProgress();
    });
  });

  updateProgress();
}

function loadChecklist() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveChecklist() {
  const checkboxes = document.querySelectorAll(".checklist-item__input");
  const state = {};

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      state[checkbox.name] = true;
    }
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable - silently fail
  }
}

function updateProgress() {
  updatePhaseProgress(1);
  updatePhaseProgress(2);
}

function updatePhaseProgress(phase) {
  const checkboxes = document.querySelectorAll(
    `.checklist-item__input[data-phase="${phase}"]`,
  );
  const progressEl = document.getElementById(`progressPhase${phase}`);

  if (!progressEl || !checkboxes.length) return;

  const total = checkboxes.length;
  const completed = Array.from(checkboxes).filter((cb) => cb.checked).length;
  const percentage = (completed / total) * 100;

  const fill = progressEl.querySelector(".progress__fill");
  const text = progressEl.querySelector(".progress__text");

  if (fill) fill.style.width = `${percentage}%`;
  if (text) text.textContent = `${completed} / ${total} 完了`;
}
