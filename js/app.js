/**
 * WordPress Security Guide - Main Application
 *
 * Features:
 * - Mobile menu toggle
 * - Troubleshooting accordion
 * - Checklist with localStorage persistence
 * - Progress bar updates
 * - Scroll animations (IntersectionObserver)
 * - Sticky header shadow
 * - Nav background on scroll
 */

const STORAGE_KEY = "wp-security-checklist";

/* ==============================
   Mobile Nav Toggle
   ============================== */
function toggleNav() {
  document.getElementById("navLinks").classList.toggle("open");
}

/* ==============================
   Troubleshooting Accordion
   ============================== */
function toggleTrouble(card) {
  card.classList.toggle("open");
}

/* ==============================
   Checklist Toggle
   ============================== */
function toggleCheck(item, phaseId) {
  item.classList.toggle("checked");
  saveChecklist();
  updateProgress(phaseId);
}

function updateProgress(phaseId) {
  const phase = document.getElementById(phaseId);
  if (!phase) return;

  const items = phase.querySelectorAll(".check-item");
  const checked = phase.querySelectorAll(".check-item.checked");
  const pct = (checked.length / items.length) * 100;

  const progressBar = document.getElementById(phaseId + "-progress");
  if (progressBar) progressBar.style.width = pct + "%";

  const countEl = document.getElementById(phaseId + "-count");
  if (countEl) countEl.textContent = checked.length;
}

/* ==============================
   localStorage Persistence
   ============================== */
function loadChecklist() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    const saved = JSON.parse(data);

    Object.keys(saved).forEach(function (phaseId) {
      const phase = document.getElementById(phaseId);
      if (!phase) return;

      const items = phase.querySelectorAll(".check-item");
      const indices = saved[phaseId];

      indices.forEach(function (index) {
        if (items[index]) {
          items[index].classList.add("checked");
        }
      });

      updateProgress(phaseId);
    });
  } catch (e) {
    // localStorage unavailable - silently fail
  }
}

function saveChecklist() {
  try {
    var state = {};

    ["phase1", "phase2"].forEach(function (phaseId) {
      var phase = document.getElementById(phaseId);
      if (!phase) return;

      var items = phase.querySelectorAll(".check-item");
      var checkedIndices = [];

      items.forEach(function (item, index) {
        if (item.classList.contains("checked")) {
          checkedIndices.push(index);
        }
      });

      state[phaseId] = checkedIndices;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage unavailable - silently fail
  }
}

/* ==============================
   DOM Ready
   ============================== */
document.addEventListener("DOMContentLoaded", function () {
  // Load saved checklist state
  loadChecklist();

  // Close mobile nav on link click
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.getElementById("navLinks").classList.remove("open");
    });
  });

  // Sticky header shadow when stuck
  function updateStickyHeaders() {
    document.querySelectorAll(".checklist-sticky-header").forEach(function (header) {
      var rect = header.getBoundingClientRect();
      if (Math.abs(rect.top - 64) < 2) {
        header.classList.add("stuck");
      } else {
        header.classList.remove("stuck");
      }
    });
  }

  window.addEventListener("scroll", updateStickyHeaders, { passive: true });

  // Scroll animations
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".animate-in").forEach(function (el) {
    observer.observe(el);
  });

  // Nav background on scroll
  window.addEventListener("scroll", function () {
    var nav = document.getElementById("nav");
    if (!nav) return;

    if (window.scrollY > 50) {
      nav.style.borderBottomColor = "rgba(15,23,42,0.1)";
      nav.style.boxShadow = "0 1px 8px rgba(0,0,0,0.04)";
    } else {
      nav.style.borderBottomColor = "rgba(15,23,42,0.08)";
      nav.style.boxShadow = "none";
    }
  });
});
