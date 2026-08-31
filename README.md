# Dashboard de Productividad — Fertilidad Integral

Este paquete tiene 6 archivos:

| Archivo | ¿Qué es? | ¿Lo edito? |
|---|---|---|
| `index.html` | La página del dashboard (estructura, diseño, gráficos, filtros) | No |
| `data.js` | Respaldo del último corte guardado (HubSpot y Highlights). Ingresos, Servicios, Atenciones, Pacientes y Consultas se cargan solos — ver sección 0 | **Sí, cada mes** (solo HubSpot y Highlights, mientras no se automatice) |
| `data-live.js` | Conecta el dashboard al Google Sheet para traer Ingresos, Servicios, Atenciones, Pacientes y Consultas en vivo | No |
| `data_periods.js` | Los mismos ingresos/pacientes/consultas/HubSpot pero día por día y semana por semana, para los filtros de Semana y Día | No a mano — se regenera (ver nota abajo) |
| `chart.min.js` | Librería de gráficos | No |
| `README.md` | Esta guía | No |

Los 5 primeros archivos van juntos siempre, en la misma carpeta.

**Filtros del dashboard:** arriba tienes dos filtros independientes — **Sede** (Todas / CDMX / Guadalajara / Metepec) y **Periodo** (Año / Trimestre / Mes / Semana / Día). Ambos afectan Ingresos, Pacientes Únicos y Consultas. Atenciones solo está disponible a nivel Mes/Trimestre/Año porque no existe una fuente día a día confiable para esa métrica (se explica en la nota dentro del propio dashboard). La sección de Servicios y Highlights siempre muestra el mes vigente (agosto), no cambia con el filtro de Periodo. HubSpot siempre es a nivel compañía completa, no cambia con el filtro de Sede.

---

## 0. Ingresos, Servicios, Atenciones, Pacientes y Consultas ya se actualizan solos

Estas cinco secciones vienen directo de tu Google Sheet **"Proyeccion_Venta_Sede_Servicio VF"** — cada vez que alguien abre el dashboard, se conecta a ese Sheet y trae los números más recientes. No hace falta tocar `data.js` para esto, ni volver a subir archivos a GitHub cada mes solo por esta parte.

**Lo único que tienes que hacer:** mantener actualizadas estas hojas del Sheet, como ya haces con "Base":
- **Base** (Sede, Servicio, MesNum, MesLabel, Real, Proyectado) → Ingresos y Servicios.
- **Atenciones** y **Pacientes** (Sede, MesNum, MesLabel, Real) → el dashboard calcula la proyección solo (Real + Real/30, un día promedio más).
- **Consultas** (Sede, MesNum, MesLabel, Real, Agendado) → proyección = Real + Agendado (usa tu agenda real de citas).
- **ConsultasRanking** (Sede, Categoria, Valor, VsLM) → el top de motivos de consulta que se ve en el ranking. Deja `VsLM` en blanco para una categoría nueva (sin dato del mes anterior); el dashboard la marca como "Nuevo" automáticamente.

El dashboard se encarga de sumar por sede, calcular vs LM / vs U3M y armar el ranking — no necesitas calcular nada a mano en estas cinco secciones.

**¿Cómo funciona por dentro?** El Sheet se queda privado — nadie puede abrirlo desde el link del dashboard. Lo que expone los datos es un pequeño script (Google Apps Script, proyecto "Fertilidad Dashboard API") publicado como "App web", vinculado a ese Sheet, que solo devuelve las hojas que el dashboard necesita (Base, Atenciones, Pacientes, Consultas, ConsultasRanking) — el resto del Sheet nunca queda expuesto. Si algún día ese script se borra o se despublica, el dashboard no se rompe: automáticamente vuelve a mostrar el último corte guardado en `data.js` y avisa con un mensaje discreto arriba de la pantalla (te dice si fue solo una parte o todo).

**Si necesitas revisar o volver a publicar ese script:** en el Google Sheet, ve a **Extensiones → Apps Script**. Ahí está el proyecto "Fertilidad Dashboard API" con la función `doGet()`. Para publicar cambios: **Implementar → Administrar las implementaciones →** ícono de lápiz **→ Nueva versión → Implementar**. La URL del dashboard no cambia al hacer esto.

**HubSpot** todavía se actualiza a mano en `data.js` (sección 7) — está en proceso de automatizarse igual que lo anterior.

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
2. Arrastra los 6 archivos (`index.html`, `data.js`, `data-live.js`, `data_periods.js`, `chart.min.js`, `README.md`) a la ventana — todos sueltos, no el .zip — o da clic en **choose your files** y selecciónalos.
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

**Ingresos, Servicios, Atenciones, Pacientes y Consultas:** no se tocan aquí — se actualizan solos en cuanto actualizas las hojas correspondientes del Google Sheet (ver sección 0). Este paso 7 ya solo aplica a **HubSpot** mientras se automatiza igual que el resto.

1. Abre `data.js` con cualquier editor de texto simple (en Windows, clic derecho → **Abrir con → Bloc de notas**; en Mac, **TextEdit**). No necesitas ningún programa especial.
2. Busca el bloque `hubspot` (tiene comentarios en español explicando qué cambiar).
3. Actualiza `leads`, `citas` y los demás campos con el nuevo corte: agrega el mes que ya cerró a `hist`, actualiza `actual` y los porcentajes.
4. Guarda el archivo.
5. Vuelve a tu repositorio en GitHub, entra a `data.js`, da clic en el ícono de lápiz (**Edit**), borra todo el contenido y pega el contenido actualizado (o usa **Add file → Upload files** para volver a subirlo, sobrescribiendo el anterior).
6. Da clic en **Commit changes**. Si tienes GitHub Pages activado, el dashboard se actualiza solo en 1–2 minutos. Si no, simplemente vuelve a compartir el archivo `index.html` + `data.js` + `data-live.js` + `chart.min.js` juntos.

### Fórmulas de referencia (por si necesitas recalcular algo)

- **vs LM** = `(Proyección ÷ Real del mes anterior) − 1`, en %.
- **vs U3M** = `(Proyección ÷ Promedio de los 3 meses cerrados anteriores) − 1`, en %.
- **vs trimestre anterior / vs semana anterior / vs día anterior** = misma lógica que vs LM, pero comparando contra el bloque de tiempo inmediato anterior.
- **% conversión HubSpot** = `Citas agendadas del periodo ÷ Leads del periodo`.
- **Pacientes Únicos proyectados**: no uses el mismo ratio que Atenciones — un paciente que regresa en el mismo mes ya fue contado. Usa un ratio histórico propio: `(pacientes únicos de todo el mes) ÷ (pacientes únicos al día del corte)`, promediado de meses anteriores ya cerrados.

### Sobre `data_periods.js` (los filtros de Semana y Día)

Este archivo no está pensado para editarse a mano — trae miles de valores día por día. Si más adelante quieres que se actualice con datos más recientes (por ejemplo, a partir de septiembre), dile a Claude "actualiza `data_periods.js` con los datos hasta [fecha]" y lo vuelve a generar desde tus archivos fuente (cargos, consultas, HubSpot), igual que la primera vez. Mientras tanto, el dashboard sigue funcionando con los datos que ya tiene — los filtros de Semana y Día simplemente no mostrarán fechas más nuevas que las que trae cargadas.

---

*Dashboard construido a partir del reporte de Cierre de Agosto 2026 (Real acumulado al 24-ago-2026 + proyección). Fertilidad Integral.*
