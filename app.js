// ====== DOM refs ======
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const header = document.querySelector(".site-header");

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

// ====== Event 1: Mobile menu toggle (click) ======
menuBtn.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Κλείνει το menu όταν πατήσεις link (mobile UX)
mainNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    if (mainNav.classList.contains("is-open")) {
      mainNav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
});

// ====== Event 2: Header hide/show on scroll (scroll) ======
let lastY = window.scrollY;

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const goingDown = y > lastY;

  if (y > 120 && goingDown) {
    header.classList.add("is-hidden");
  } else {
    header.classList.remove("is-hidden");
  }

  lastY = y;
});

// ====== Event 3: Form validation (submit) ======
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg").value.trim();

  if (!name || !email || !msg) {
    statusEl.textContent = "⚠️ Παρακαλούμε συμπληρώστε όλα τα υποχρεωτικά πεδία (Όνομα, Email και Μήνυμα).";
    statusEl.style.color = "crimson";
    return;
  }

  statusEl.textContent = `✅ Ευχαριστούμε, ${name}! Θα σας απαντήσουμε σύντομα στο ${email}.`;
  statusEl.style.color = "green";

  // προαιρετικά: καθάρισμα φόρμας
  // form.reset();
});

// ====== (Optional όπως στο Lab06) χαρακτήρες μετρητής ======
const msgField = document.getElementById("msg");
const maxLen = 200;
const counter = document.createElement("p");
counter.textContent = `Χαρακτήρες: 0 / ${maxLen}`;
counter.style.marginTop = "0.25rem";
msgField.parentNode.appendChild(counter);

msgField.addEventListener("input", () => {
  const len = msgField.value.length;
  counter.textContent = `Χαρακτήρες: ${len} / ${maxLen}`;
});
