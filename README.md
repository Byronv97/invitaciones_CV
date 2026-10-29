# Invitación de graduación

## Personalizar un invitado

Usa estos enlaces:

```text
?invitado=Ana%20López
?invitado=Ana%20López&familia=1
```

El segundo muestra `Ana López y familia`.

## Activar confirmaciones

En `script.js`, completa `INVITATION_CONFIG`:

```js
const INVITATION_CONFIG = {
  whatsappNumber: "50255555555",
  sheetsEndpoint: "https://script.google.com/macros/s/TU_ID/exec",
  responseDeadline: "2026-10-31",
  responseDeadlineLabel: "31 de octubre de 2026",
};
```

### Google Sheets

1. Abre la hoja y entra a `Extensiones > Apps Script`.
2. Copia el contenido de `apps-script/Code.gs`.
3. Publícalo como `Aplicación web` ejecutada como tú y accesible para cualquier persona.
4. Copia la URL que termina en `/exec` en `sheetsEndpoint`.

La hoja debe conservar estas columnas:

```text
Nombre | Tipo de invitación | Confirmación | Asistentes | Método | Fecha | Comentarios
```
