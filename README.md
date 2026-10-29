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
  whatsappNumber: "50259242192",
  sheetsEndpoint: "https://script.google.com/macros/s/TU_ID/exec",
  responseDeadline: "2026-11-08",
  responseDeadlineLabel: "8 de noviembre de 2026",
};
```

La URL de edición de Google Sheets (`docs.google.com/spreadsheets/...`) no debe ir en
`sheetsEndpoint`. Esa URL solo abre la hoja; el formulario necesita la URL `/exec` de la
aplicación web de Apps Script.

### Google Sheets

1. Abre la hoja y entra a `Extensiones > Apps Script`.
2. Reemplaza el contenido de `Code.gs` por el contenido de `apps-script/Code.gs`.
3. Guarda el proyecto.
4. Selecciona `Implementar > Nueva implementación`.
5. En tipo de implementación elige `Aplicación web`.
6. Selecciona `Ejecutar como: Yo` y `Quién tiene acceso: Cualquier persona`.
7. Presiona `Implementar`, autoriza los permisos y copia la URL que termina en `/exec`.
8. Pega esa URL en `sheetsEndpoint` dentro de `script.js`.
9. Publica el cambio del proyecto para que la invitación use la conexión.

La hoja debe conservar estas columnas:

```text
Nombre | Tipo de invitación | Confirmación | Asistentes | Método | Fecha | Comentarios
```
