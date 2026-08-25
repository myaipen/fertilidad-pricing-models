# Dashboard de Productividad — Fertilidad Integral

Este paquete tiene 4 archivos:

| Archivo | ¿Qué es? | ¿Lo edito? |
|---|---|---|
| `index.html` | La página del dashboard (estructura, diseño, gráficos) | No |
| `data.js` | Todos los números (ingresos, atenciones, pacientes, consultas, HubSpot, etc.) | **Sí, cada mes** |
| `chart.min.js` | Librería de gráficos | No |
| `README.md` | Esta guía | No |

Los 3 primeros archivos van juntos siempre, en la misma carpeta.

---

## 1. Verlo ahora mismo, sin GitHub

Antes de subir nada, comprueba que funciona: en la carpeta que te compartí, haz doble clic en `index.html`. Se abre en tu navegador y ya está — puedes moverte entre "Todas las sedes", "CDMX", "Guadalajara" y "Metepec". Este archivo funciona así, localmente, para siempre, aunque nunca lo subas a GitHub.

## 2. ¿Para qué usar GitHub entonces?

Dos razones: (a) tener respaldo con historial de versiones (qué cambió cada mes), y (b) opcionalmente publicarlo como página web con un link para verlo desde cualquier dispositivo sin mandar el archivo por correo cada vez.

**Importante sobre privacidad:** tus cifras de ingresos, pacientes y leads son información sensible del negocio. Un repositorio **privado** en GitHub (gratis) sirve perfecto para el respaldo con historial. Pero para publicarlo como página web (GitHub Pages) y que ese link privado solo lo vean quienes tú decidas, GitHub pide un plan de paga (GitHub Pro, ~$4 USD/mes, o Team si es cuenta de la organización). Si no quieres pagar por ahora, usa GitHub solo como respaldo (pasos 3–5) y comparte el archivo `index.html` directamente cuando alguien más lo necesite ver — sigue funcionando con doble clic.

---

## 3. Crear tu cuenta de GitHub

1. Entra a **github.com** y da clic en **Sign up**.
2. Pon tu correo (`myaipen@fertilidad.com`), crea una contraseña y un nombre de usuario.
3. Confirma tu correo cuando te llegue el email de verificación.

## 4. Crear el repositorio (la "carpeta" del proyecto en GitHub)

1. Ya con sesión iniciada, da clic en el botón verde **New** (o el ícono **+** arriba a la derecha → **New repository**).
2. **Repository name:** por ejemplo `dashboard-productividad-fi`.
3. Marca la opción **Private** (para que nadie más lo vea).
4. No marques ninguna otra casilla ("Add a README", etc.) — vamos a subir nuestros propios archivos.
5. Da clic en **Create repository**.

## 5. Subir los archivos (sin usar comandos)

1. En la página del repositorio recién creado, busca el link que dice **uploading an existing file** (o ve al botón **Add file → Upload files**).
2. Arrastra los 4 archivos (`index.html`, `data.js`, `chart.min.js`, `README.md`) a la ventana, o da clic en **choose your files** y selecciónalos.
3. Abajo, en **Commit changes**, escribe un mensaje corto como `Primera versión del dashboard` y da clic en **Commit changes**.
4. Listo — tus archivos ya están respaldados en GitHub con historial.

## 6. (Opcional, requiere plan de paga para repos privados) Publicarlo como página web

Si decides pagar GitHub Pro/Team para tener Pages en un repo privado:

1. En tu repositorio, ve a **Settings** (pestaña arriba).
2. En el menú de la izquierda, busca **Pages**.
3. En **Branch**, selecciona `main` y la carpeta `/ (root)`, luego **Save**.
4. Espera 1–2 minutos y GitHub te dará un link como `https://tu-usuario.github.io/dashboard-productividad-fi/` — ese es tu dashboard en vivo.
5. Solo tú (y quien invites como colaborador del repositorio, en **Settings → Collaborators**) puede verlo.

Si tu repo es público en vez de privado, este mismo proceso es gratis — pero cualquiera con el link vería tus cifras, así que solo hazlo así si el contenido deja de ser sensible.

---

## 7. Actualizar los datos cada mes (lo único que vas a hacer seguido)

1. Abre `data.js` con cualquier editor de texto simple (en Windows, clic derecho → **Abrir con → Bloc de notas**; en Mac, **TextEdit**). No necesitas ningún programa especial.
2. Cada bloque tiene comentarios en español explicando qué cambiar (busca el bloque grande de instrucciones hasta arriba del archivo).
3. En resumen, para cada métrica (`ingresos`, `atenciones`, `pacientes`, `consultas`):
   - Agrega el mes que ya cerró al final de la lista `hist`.
   - Cambia `actual` por el número real acumulado a la nueva fecha de corte.
   - Cambia `proy` por la nueva proyección a cierre de mes.
   - Cambia `vsLM` y `vsU3M` por los nuevos porcentajes (solo el número, ej. `22` para +22%).
4. Guarda el archivo.
5. Vuelve a tu repositorio en GitHub, entra a `data.js`, da clic en el ícono de lápiz (**Edit**), borra todo el contenido y pega el contenido actualizado (o usa **Add file → Upload files** para volver a subirlo, sobrescribiendo el anterior).
6. Da clic en **Commit changes**. Si tienes GitHub Pages activado, el dashboard se actualiza solo en 1–2 minutos. Si no, simplemente vuelve a compartir el archivo `index.html` + `data.js` + `chart.min.js` juntos.

### Fórmulas de referencia (por si necesitas recalcular algo)

- **vs LM** = `(Proyección ÷ Real del mes anterior) − 1`, en %.
- **vs U3M** = `(Proyección ÷ Promedio de los 3 meses cerrados anteriores) − 1`, en %.
- **% conversión HubSpot** = `Citas agendadas del mes ÷ Leads del mes`.
- **Pacientes Únicos proyectados**: no uses el mismo ratio que Atenciones — un paciente que regresa en el mismo mes ya fue contado. Usa un ratio histórico propio: `(pacientes únicos de todo el mes) ÷ (pacientes únicos al día del corte)`, promediado de meses anteriores ya cerrados.

---

*Dashboard construido a partir del reporte de Cierre de Agosto 2026 (Real acumulado al 24-ago-2026 + proyección). Fertilidad Integral.*
