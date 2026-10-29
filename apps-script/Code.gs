const SHEET_NAME = "Hoja 1";

function doPost(event) {
  const data = JSON.parse(event.postData.contents || "{}");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`No existe la hoja "${SHEET_NAME}".`);
  }

  sheet.appendRow([
    cleanCell(data.nombre),
    cleanCell(data.tipo),
    cleanCell(data.confirmacion),
    Number(data.asistentes) || 0,
    cleanCell(data.metodo),
    new Date(),
    cleanCell(data.comentarios),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput("RSVP activo");
}

function cleanCell(value) {
  const text = String(value || "").trim().slice(0, 500);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}
