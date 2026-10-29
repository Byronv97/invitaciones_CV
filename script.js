const targetDate = new Date("2026-11-12T00:00:00-06:00");

const guestName = new URLSearchParams(window.location.search).get("invitado");
const guestNameElement = document.querySelector("#guest-name");

if (guestName?.trim()) {
  guestNameElement.textContent = guestName.trim();
}

const countdownElements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
};

function updateCountdown() {
  const remaining = targetDate.getTime() - Date.now();

  if (remaining <= 0) {
    countdownElements.days.textContent = "00";
    countdownElements.hours.textContent = "00";
    countdownElements.minutes.textContent = "00";
    return;
  }

  const totalMinutes = Math.floor(remaining / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  countdownElements.days.textContent = String(days).padStart(2, "0");
  countdownElements.hours.textContent = String(hours).padStart(2, "0");
  countdownElements.minutes.textContent = String(minutes).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 30000);

document.querySelector("#print-invitation").addEventListener("click", () => {
  window.print();
});

const seal = document.querySelector("#institution-seal");
const fallback = document.querySelector(".seal-fallback");

seal.addEventListener("error", () => {
  seal.hidden = true;
  fallback.classList.add("visible");
});
