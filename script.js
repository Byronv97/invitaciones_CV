const targetDate = new Date("2026-11-12T00:00:00-06:00");

const INVITATION_CONFIG = {
  whatsappNumber: "50259242192",
  sheetsEndpoint: "https://script.google.com/macros/s/AKfycbxya6yqtYLCGAGyolXDFkpWjRfO7eiiv52Szpogkm6TkU5UMybF_MkbQGSwtvK12yFjLQ/exec",
  responseDeadline: "2026-11-08",
  responseDeadlineLabel: "8 de noviembre de 2026",
};

const query = new URLSearchParams(window.location.search);
const guestName = query.get("invitado");
const includesFamily = ["1", "true", "si", "sí"].includes(
  query.get("familia")?.trim().toLowerCase(),
);
const guestNameElement = document.querySelector("#guest-name");
const formGuestNameElement = document.querySelector("#form-guest-name");
const normalizedGuestName = guestName?.trim() || "Familia y amigos";
const displayGuestName = guestName?.trim() && includesFamily
  ? `${normalizedGuestName} y familia`
  : normalizedGuestName;

guestNameElement.textContent = displayGuestName;
formGuestNameElement.textContent = displayGuestName;

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

const whatsappButton = document.querySelector("#whatsapp-confirm");
const sheetToggle = document.querySelector("#sheet-toggle");
const rsvpForm = document.querySelector("#rsvp-form");
const attendanceField = document.querySelector("#rsvp-attendance");
const attendeesField = document.querySelector("#rsvp-attendees");
const commentsField = document.querySelector("#rsvp-comments");
const rsvpStatus = document.querySelector("#rsvp-status");
const deadline = document.querySelector("#rsvp-deadline");
const deadlineLabel = document.querySelector("#rsvp-deadline-label");

if (INVITATION_CONFIG.whatsappNumber) {
  const whatsappMessage = includesFamily
    ? `Hola, soy ${normalizedGuestName}. Confirmo mi asistencia junto con mi familia a la graduación de Cristian Wilfredo Ventura Sac.`
    : `Hola, soy ${normalizedGuestName}. Confirmo mi asistencia a la graduación de Cristian Wilfredo Ventura Sac.`;
  whatsappButton.href = `https://wa.me/${INVITATION_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  whatsappButton.hidden = false;
}

const formattedDeadline = INVITATION_CONFIG.responseDeadlineLabel || (
  INVITATION_CONFIG.responseDeadline
    ? new Intl.DateTimeFormat("es-GT", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Guatemala",
      }).format(new Date(`${INVITATION_CONFIG.responseDeadline}T12:00:00-06:00`))
    : ""
);

if (formattedDeadline) {
  deadlineLabel.textContent = formattedDeadline;
  deadline.hidden = false;
}

const responseDeadlineDate = INVITATION_CONFIG.responseDeadline
  ? new Date(`${INVITATION_CONFIG.responseDeadline}T23:59:59-06:00`)
  : null;
const isResponseClosed = responseDeadlineDate && Date.now() >= responseDeadlineDate.getTime();

if (isResponseClosed) {
  sheetToggle.disabled = true;
  sheetToggle.textContent = "Confirmaciones cerradas";
  whatsappButton.hidden = true;
}

function syncAttendeesField() {
  const isAttending = attendanceField.value === "Sí";
  attendeesField.disabled = !isAttending || !includesFamily;
  attendeesField.value = isAttending ? (includesFamily ? Math.max(1, Number(attendeesField.value) || 1) : 1) : 0;
}

sheetToggle.addEventListener("click", () => {
  rsvpForm.hidden = !rsvpForm.hidden;
  if (!rsvpForm.hidden) {
    syncAttendeesField();
    attendanceField.focus();
  }
});

attendanceField.addEventListener("change", syncAttendeesField);

rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!INVITATION_CONFIG.sheetsEndpoint) {
    rsvpStatus.textContent = "El registro todavía no está conectado a Google Sheets.";
    return;
  }

  const submitButton = rsvpForm.querySelector(".rsvp-submit");
  const isAttending = attendanceField.value === "Sí";
  const payload = {
    nombre: normalizedGuestName,
    tipo: includesFamily ? "Familia" : "Individual",
    confirmacion: attendanceField.value,
    asistentes: isAttending ? Number(attendeesField.value) || 1 : 0,
    metodo: "Formulario web",
    comentarios: commentsField.value.trim(),
  };

  submitButton.disabled = true;
  rsvpStatus.textContent = "Enviando confirmación...";

  try {
    await fetch(INVITATION_CONFIG.sheetsEndpoint, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    });
    rsvpStatus.textContent = "Gracias. Tu confirmación fue registrada.";
    rsvpForm.reset();
    syncAttendeesField();
  } catch (error) {
    rsvpStatus.textContent = "No se pudo registrar. Intenta nuevamente o usa WhatsApp.";
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector("#print-invitation").addEventListener("click", () => {
  window.print();
});

const seal = document.querySelector("#institution-seal");
const fallback = document.querySelector(".seal-fallback");

seal.addEventListener("error", () => {
  seal.hidden = true;
  fallback.classList.add("visible");
});
