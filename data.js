/*
  ============================================================================
  DATOS DEL DASHBOARD — Fertilidad Integral
  ============================================================================
  ESTE ES EL ÚNICO ARCHIVO QUE DEBES EDITAR CADA MES.
  No toques index.html ni chart.min.js.

  Cómo actualizar (cada corte de mes, ej. cierre de mes):
    1. Añade el nuevo mes real al final de cada arreglo "hist" (histórico).
    2. Actualiza "ago" -> renómbralo mentalmente como "mes actual" y cambia
       su valor por el real acumulado a la fecha de corte.
    3. Actualiza "proy" con la nueva proyección a cierre de mes.
    4. Actualiza vsLM (vs. mes anterior) y vsU3M (vs. promedio de los
       últimos 3 meses cerrados) — ambos en % (ej. 22 significa +22%).
    5. Actualiza servicios[], highlights[], hubspot y consultas_ranking
       con los nuevos hallazgos del mes.
    6. Guarda el archivo y vuelve a subirlo a GitHub (ver README.md).

  Formato de números: usa punto decimal (12.7, no 12,7). Sin comas de miles.
  ============================================================================
*/

window.DATA = {
  // "corte" se muestra en el encabezado del dashboard. Ingresos, Servicios,
  // Atenciones, Pacientes, Consultas y HubSpot ya vienen en vivo desde el Sheet
  // (ver sección 0 del README); Highlights siguen siendo manuales aquí. Este
  // archivo es solo el RESPALDO ESTÁTICO si el fetch en vivo falla.
  // ACTUALIZADO 26-oct-2026: CORTE DE OCTUBRE (25-oct, 25 días de Real; el 27-oct pedido no existe todavía):
  // cargos y citas del 1 al 25 oct re-leídos completos directo de vRepro (incluye las
  // modificaciones retroactivas del 1 al 19 oct: líneas eliminadas y descuentos).
  // Proyección CENTRAL de octubre por sede (MTD + días hábiles restantes × ritmo mediano
  // feb-sep), sin ajustes manuales; septiembre CERRADO (Proyectado = Real) y agosto re-clasificado por
  // ConceptosHier (total agosto $16,106,074). HubSpot (Interesa2) al 1-25 oct.
  corte: "25-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], actual: 12.47, proy: 15.43, vsLM: 1, vsU3M: 7, nota: "OCTUBRE (corte 25-oct, 25 días de Real, vRepro): Real $12,470,503; Proyectado $15,430,361. Proyección CENTRAL por sede, sin ajustes manuales: CDMX $13,041,218, Guadalajara $1,692,452 y Metepec $696,691 (Real + días hábiles equivalentes restantes × ritmo mediano feb-sep; los topes manuales anteriores de $11.33M / $1.70M / $0.50M ya no aplican porque el Real de CDMX y Metepec estaba por encima); servicios repartidos con la mezcla jul-sep (U3M). Octubre 2025 cerró en $10.37M. Confianza alta: 25 días de Real (19.5 de 25.0 días hábiles equivalentes); el Real a la fecha cubre 81% de la proyección. El domingo 25-oct apenas sumó $22K de cargos. Septiembre quedó CERRADO (Proyectado = Real = $15,216,602); agosto quedó en $16,106,074 tras re-clasificar por ConceptosHier." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3106, 3543], actual: 2412, proy: 3104, vsLM: -12, vsU3M: 1, nota: "OCTUBRE MTD al 25-oct: 2,412 líneas de cargo (suma CDMX+GDL+MTP). Proyección 3,104 (CDMX 2,327 + GDL 559 + MTP 218): promedio de (Real ÷ share mediano de atenciones al día 25) y (Real + días hábiles equivalentes restantes × ritmo por día hábil de jul-sep), sin escalar a ninguna proyección manual de ingreso. Sin techo por ticket (el ticket ya no es estable: GDL cayó de ~$4.7K a $2.2K en septiembre)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1000, 1323], actual: 803, proy: 1015, vsLM: -23, vsU3M: -1, nota: "OCTUBRE MTD al 25-oct: 803 pacientes únicos (suma de sedes, dedup por Historia dentro de cada sede). Proyección = max(Real, Atenciones proy × ratio pacientes/atención promedio jul-sep): total 1,015 (CDMX 709 + GDL 232 + MTP 74)." },
    consultas: { hist: [153, 154, 224, 208, 219, 262, 249, 309, 316], real: 204, agendado: 75, proy: 279, vsLM: -12, vsU3M: -4, nota: "OCTUBRE (corte 25-oct): real 204 (Terminada + Primera Vez, 1-25 oct, vRepro) + agendado 75 (65 citas de primera vez ya agendadas del 26 al 31 oct, incluye las de hoy 26-oct, más 10 citas nuevas esperadas) = proyección 279 (rango 264-296; piso 259 = real + agenda × show rate 82.6%). Modelo: piso + nuevas citas esperadas (10.2 por día × 6 días restantes con decay), promediado con el run-rate; la cifra cambia conforme se agenden nuevas citas." },
    noshow: { hist: [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], actual: 17.4, prom: 13.9, deltaPts: 3.5 },
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], actual: 10.6, proy: 13.04, vsLM: -2, vsU3M: 9, nota: "OCTUBRE MTD al 25-oct: Real $10,596,829; Proyectado $13,041,218 (método central, sin ajuste manual; antes de este corte se mantenía fijo en $11.33M). Septiembre cerrado en $13,328,714 (Proy = Real)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2069, 2658], actual: 1824, proy: 2327, vsLM: -12, vsU3M: 5, nota: "1,824 líneas al 25-oct; proy 2,327 = promedio de pacing (2,332) y ritmo jul-sep (2,322); sin techo por ticket." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 618, 931], actual: 561, proy: 709, vsLM: -24, vsU3M: 4, nota: "561 pacientes únicos al 25-oct; proy 709 = Atenciones proy × 0.3046 (ratio promedio jul-sep)." },
      consultas: { hist: [112, 92, 133, 133, 127, 160, 135, 130, 141], real: 96, agendado: 37, proy: 133, vsLM: -6, vsU3M: -2, top_cat: "Consulta primera vez", top_n: 77 },
      noshow: { hist: [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], actual: 14.3, prom: 12.1, deltaPts: 2.2 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], actual: 1.3, proy: 1.69, vsLM: 16, vsU3M: -11, nota: "OCTUBRE MTD al 25-oct: Real $1,301,556; Proyectado $1,692,452 (método central; el ajuste manual de $1.70M ya no se usa). Septiembre cerrado en $1,456,406 (Proy = Real)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751, 660], actual: 418, proy: 559, vsLM: -15, vsU3M: -9, nota: "418 líneas al 25-oct; proy 559 = promedio de pacing (561) y ritmo jul-sep (557); agosto cerró en 751 y septiembre en 660." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287, 299], actual: 179, proy: 232, vsLM: -22, vsU3M: -9, nota: "179 pacientes únicos al 25-oct; proy 232 = Atenciones proy × 0.4147 (ratio promedio jul-sep)." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133, 123], real: 83, agendado: 28, proy: 111, vsLM: -10, vsU3M: -3, top_cat: "Check-up SOP", top_n: 27 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], actual: 16.2, prom: 14.7, deltaPts: 1.5 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], actual: 0.57, proy: 0.7, vsLM: 61, vsU3M: 15, nota: "OCTUBRE MTD al 25-oct: Real $572,118; Proyectado $696,691 (método central; el ajuste manual de $0.50M quedó por debajo del Real y se retira). Septiembre cerrado en $431,482 (Proy = Real). Sede chica: pocas líneas por día." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286, 225], actual: 170, proy: 218, vsLM: -3, vsU3M: -11, nota: "170 líneas al 25-oct; proy 218 = promedio de pacing (211) y ritmo jul-sep (225)." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95, 93], actual: 63, proy: 74, vsLM: -20, vsU3M: -10, nota: "63 pacientes únicos al 25-oct; proy 74 = Atenciones proy (218) × 0.3382 (ratio promedio jul-sep)." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46, 52], real: 25, agendado: 10, proy: 35, vsLM: -33, vsU3M: -16, top_cat: "Consulta primera vez", top_n: 29 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], actual: 30.6, prom: 21.6, deltaPts: 9.0 },
    },
  },

  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 4.04, vsLM: -10, vsU3M: -7 },
      { nombre: "Congelación de Gametos", valor: 3.32, vsLM: -12, vsU3M: 15 },
      { nombre: "Farmacia", valor: 3.23, vsLM: 23, vsU3M: 8 },
      { nombre: "Laboratorio", valor: 2.45, vsLM: 5, vsU3M: 7 },
      { nombre: "Subrogación", valor: 1.57, vsLM: 79, vsU3M: 62 },
      { nombre: "Consultas", valor: 0.39, vsLM: -23, vsU3M: -9 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.28, vsLM: -26, vsU3M: -28 },
      { nombre: "Imágenes", valor: 0.07, vsLM: -49, vsU3M: -26 },
      { nombre: "Wellness", valor: 0.05, vsLM: -1, vsU3M: 84 },
      { nombre: "Otros", valor: 0.02, vsLM: -29, vsU3M: 4 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.48, vsLM: -14, vsU3M: -6 },
      { nombre: "Congelación de Gametos", valor: 2.75, vsLM: -14, vsU3M: 16 },
      { nombre: "Farmacia", valor: 2.58, vsLM: 10, vsU3M: 5 },
      { nombre: "Laboratorio", valor: 2.16, vsLM: 2, vsU3M: 24 },
      { nombre: "Subrogación", valor: 1.57, vsLM: 83, vsU3M: 63 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.21, vsLM: -39, vsU3M: -36 },
      { nombre: "Consultas", valor: 0.18, vsLM: -30, vsU3M: -20 },
      { nombre: "Imágenes", valor: 0.05, vsLM: -56, vsU3M: -31 },
      { nombre: "Wellness", valor: 0.04, vsLM: 13, vsU3M: 104 },
      { nombre: "Otros", valor: 0.01, vsLM: -63, vsU3M: -18 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.55, vsLM: 23, vsU3M: 23 },
      { nombre: "Farmacia", valor: 0.39, vsLM: 186, vsU3M: 34 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.24, vsLM: -42, vsU3M: -51 },
      { nombre: "Laboratorio", valor: 0.21, vsLM: 30, vsU3M: -49 },
      { nombre: "Consultas", valor: 0.19, vsLM: -11, vsU3M: 8 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.07, vsLM: 92, vsU3M: 29 },
      { nombre: "Imágenes", valor: 0.02, vsLM: 14, vsU3M: 32 },
      { nombre: "Otros", valor: 0.01, vsLM: null, vsU3M: 45, nuevo: true },
      { nombre: "Wellness", valor: 0.01, vsLM: -35, vsU3M: 25 },
      { nombre: "Subrogación", valor: 0.0, vsLM: -89, vsU3M: -66 },
    ],
    MTP: [
      { nombre: "Tratamientos FIV/ICSI", valor: 0.32, vsLM: 365, vsU3M: 117 },
      { nombre: "Farmacia", valor: 0.26, vsLM: 63, vsU3M: 15 },
      { nombre: "Laboratorio", valor: 0.08, vsLM: 39, vsU3M: -33 },
      { nombre: "Congelación de Gametos", valor: 0.02, vsLM: -85, vsU3M: -79 },
      { nombre: "Consultas", valor: 0.02, vsLM: -54, vsU3M: -26 },
      { nombre: "Imágenes", valor: 0.0, vsLM: -59, vsU3M: -63 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: null, vsU3M: -79, nuevo: true },
      { nombre: "Wellness", valor: 0.0, vsLM: -93, vsU3M: -80 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  highlights: {
    total: [
      "Octubre lleva 25 días de Real (corte 25-oct, leído de vRepro) y proyecta $15.43M: +1% vs septiembre ($15.22M), +7% vs el promedio de los últimos 3 meses y +49% vs octubre 2025 ($10.37M). Confianza alta: 19.5 de 25.0 días hábiles equivalentes; el Real a la fecha ($12.47M) ya cubre 81% de la proyección.",
      "Los días fuertes del mes fueron el lun 12-oct ($1.26M), el mié 14-oct ($1.14M), el lun 19-oct ($0.98M), el vie 9-oct ($0.87M), el 1-oct ($0.86M) y el vie 23-oct ($0.83M); entre semana el resto de los días ronda $200-800K, el domingo 18-oct no tuvo cargos y el domingo 25-oct sumó $22K.",
      "Subrogación es el servicio que más crece vs septiembre (+79% proy, $1.57M) por los paquetes Fresh egg donor, Essentials y All Inclusive en CDMX; Farmacia ($3.23M, +23%) también sube, mientras Tratamientos FIV/ICSI ($4.04M, -10%) y Congelación ($3.32M, -12%) siguen siendo los dos servicios más grandes pero van por debajo de septiembre.",
      "Atenciones (3,104) y Pacientes (1,015) proyectan -12% y -23% vs septiembre (3,543 y 1,319) frente a +1% de Ingresos: el ingreso por atención sube (~$5.0K vs ~$4.3K en septiembre) por los paquetes de subrogación y donación, y septiembre tuvo un pico de pacientes únicos que el ratio promedio jul-sep solo recoge en parte. Sin techo por ticket.",
      "Consultas: 204 reales más 65 ya agendadas del 26 al 31 oct; la proyección es 279 (rango 264-296, piso 259; -12% vs septiembre) y crece conforme se agenden nuevas citas, no es un techo. El % de No Show de octubre es 17.4% (43 inasistencias sobre 247 citas de primera vez), arriba del promedio ene-sep de 13.9%.",
      "HubSpot (Interesa2) al 25-oct: 1,625 leads y 390 citas agendadas (24% de conversión mensual parcial); el domingo 25-oct sumó 64 leads y 13 citas. La hoja de cohortes (M0) quedó en el corte 19-oct porque su definición no se puede reproducir con la consulta actual.",
      "Nota de datos: los cargos y citas del 1 al 25 oct se re-leyeron completos de vRepro el 26-oct (los cambios retroactivos del 1 al 19 oct restan $158K netos vs el corte anterior), directo de vRepro (médico = Profesional Historia; medicamentos de Farmacia a nivel producto). Servicios, conceptos y consultas usan tu archivo Clasificación 4 (2026); el ranking de consultas agrupa Check-up SOMP + SOP en uno y deja Check up Integral aparte, y octubre sale de vRepro (grupo Primera Vez: Terminadas 1-25 oct + agenda 26-31 oct, repartida para sumar la proyección). Conceptos nuevos de octubre clasificados de forma provisional y pendientes de tu revisión: donantes de óvulos (Ovodonors en fresco 0066, panel genético, Viáticos), Check colaborador, Histeroscopía diagnóstica sin anestesiólogo, Química Sanguínea 8 elementos y Subsecuente Fertilidad/Obstetricia.",
    ],
    CDMX: [
      "CDMX concentra 85% del ingreso MTD de octubre ($10.60M de $12.47M) y proyecta $13.04M (-2% vs septiembre, +9% vs U3M); el lun 12-oct facturó $1.19M, el mié 14-oct $1.02M y el lun 19-oct $0.89M.",
      "Subrogación CDMX lleva $1.37M en el mes (proy $1.57M, +83% vs LM) y Congelación $2.25M real; Atenciones proy (2,327) y Pacientes proy (709) sin techo por ticket.",
    ],
    GDL: [
      "GDL lleva $1.30M en 25 días y proyecta $1.69M (+16% vs septiembre, -11% vs U3M); Farmacia (proy +186% vs septiembre) y Congelación (+23%) crecen, mientras FIV/ICSI proyecta -42%.",
      "Atenciones proy (559) vs 418 reales y Pacientes proy (232) vs 179 reales; agosto cerró en 751 atenciones y septiembre en 660.",
    ],
    MTP: [
      "Metepec lleva $572K en 25 días y proyecta $0.70M (+61% vs septiembre, $431K; +15% vs U3M); FIV/ICSI ($293K real) y Farmacia ($212K) concentran el ingreso y el mié 21-oct fue su mejor día ($92K).",
      "Atenciones proy (218) y Pacientes proy (74) vs 170 y 63 reales; son las cifras más chicas de la red y la sede con mayor % de No Show (30.6%).",
    ],
  },

  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 125, vsLM: -16 },
      { nombre: "Fertility Check up Mujeres", valor: 40, vsLM: -31 },
      { nombre: "Check-up SOP", valor: 32, vsLM: 45 },
      { nombre: "Check up Ginecologico", valor: 31, vsLM: -26 },
      { nombre: "Fertility Check up Parejas", valor: 17, vsLM: 0 },
      { nombre: "Check up Integral", valor: 14, vsLM: -7 },
      { nombre: "Consulta de Primera Vez IP's", valor: 9, vsLM: 125 },
      { nombre: "Consulta ginecológica", valor: 5, vsLM: 67 },
      { nombre: "Consulta Obstetricia", valor: 3, vsLM: -25 },
      { nombre: "Fertility Check up Hombres", valor: 2, vsLM: -67 },
      { nombre: "Consulta obstetrica materno fetal", valor: 1, vsLM: null, nuevo: true },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 77, vsLM: -12 },
      { nombre: "Fertility Check up Mujeres", valor: 27, vsLM: -18 },
      { nombre: "Consulta de Primera Vez IP's", valor: 9, vsLM: 125 },
      { nombre: "Fertility Check up Parejas", valor: 8, vsLM: 0 },
      { nombre: "Check up Ginecologico", valor: 5, vsLM: -17 },
      { nombre: "Check up Integral", valor: 3, vsLM: null, nuevo: true },
      { nombre: "Check-up SOP", valor: 2, vsLM: 100 },
      { nombre: "Consulta ginecológica", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -75 },
    ],
    GDL: [
      { nombre: "Check-up SOP", valor: 27, vsLM: 29 },
      { nombre: "Check up Ginecologico", valor: 25, vsLM: -7 },
      { nombre: "Consulta primera vez", valor: 19, vsLM: -32 },
      { nombre: "Fertility Check up Mujeres", valor: 12, vsLM: -40 },
      { nombre: "Check up Integral", valor: 11, vsLM: -27 },
      { nombre: "Fertility Check up Parejas", valor: 8, vsLM: 60 },
      { nombre: "Consulta ginecológica", valor: 4, vsLM: 100 },
      { nombre: "Consulta Obstetricia", valor: 3, vsLM: 0 },
      { nombre: "Consulta obstetrica materno fetal", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -50 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 29, vsLM: -12 },
      { nombre: "Check-up SOP", valor: 3, vsLM: null, nuevo: true },
      { nombre: "Check up Ginecologico", valor: 1, vsLM: -89 },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: -80 },
      { nombre: "Fertility Check up Parejas", valor: 1, vsLM: -75 },
    ],
  },

  hubspot: {
    leads: { hist: [833, 1059, 1020, 999, 1752, 1435, 1533, 1921, 2095], actual: 1625 },
    citas: { hist: [188, 230, 318, 328, 367, 315, 418, 501, 468], actual: 390 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 24 },
    // Octubre parcial (1-25 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,28,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,21,null,null], total2026: 21 },
      MTP: { mensual: [24,28,38,46,19,14,32,36,34,31,null,null], total2026: 31 },
    },
    cohortes: [
      { mes: "Ene-26", leads: 834, m0: 21, m1: 1, m2: 0, sin: 78 },
      { mes: "Feb-26", leads: 1062, m0: 20, m1: 2, m2: 0, sin: 78 },
      { mes: "Mar-26", leads: 1021, m0: 28, m1: 1, m2: 0, sin: 71 },
      { mes: "Abr-26", leads: 1000, m0: 31, m1: 3, m2: 0, sin: 66 },
      { mes: "May-26", leads: 1754, m0: 19, m1: 1, m2: 1, sin: 79 },
      { mes: "Jun-26", leads: 1436, m0: 20, m1: 2, m2: 0, sin: 78 },
      { mes: "Jul-26", leads: 1533, m0: 24, m1: 2, m2: 0, sin: 74 },
      { mes: "Ago-26", leads: 1924, m0: 24, m1: 1, m2: 0, sin: 75 },
      { mes: "Sep-26", leads: 2108, m0: 20, m1: 1, m2: 0, sin: 79 },
      { mes: "Oct-26", leads: 1209, m0: 21, m1: 0, m2: 0, sin: 79 }, // OCTUBRE parcial: cohorte al corte 19-oct (m0 = 248 de 1,209 leads con cita en el mismo mes); la hoja HubspotCohortes no se actualizó al 25-oct
    ],
  },

  subrogacion: (function(){
    const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep"];
    const cdmx = {
      labels,
      hist: {
        "Valoración":      [16, 4, 0, 4, 11, 4, 3, 3, 91],
        "Programa Activo": [0, 1, 0, 1, 1, 2, 3, 7, 4],
      },
      actual: {
        "Valoración":      { pacientes: 10, ingreso: 14224.1, ticket: 1422.41 },
        "Programa Activo": { pacientes: 7, ingreso: 1347297.8, ticket: 192471.11 },
      },
      totalPacientesYTD: { "Valoración": 146, "Programa Activo": 26 },
      ingresoYTD: 5443504.55,
    };
    const gdl = {
      labels,
      hist: {
        "Valoración":      [0, 0, 0, 0, 0, 0, 0, 0, 1],
        "Programa Activo": [0, 1, 0, 0, 0, 0, 0, 0, 0],
      },
      actual: {
        "Valoración":      { pacientes: 0, ingreso: 0, ticket: 0 },
        "Programa Activo": { pacientes: 0, ingreso: 0, ticket: 0 },
      },
      totalPacientesYTD: { "Valoración": 1, "Programa Activo": 1 },
      ingresoYTD: 36206.89,
    };
    const vacio = {
      labels,
      hist: {
        "Valoración":      [0, 0, 0, 0, 0, 0, 0, 0, 0],
        "Programa Activo": [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      actual: {
        "Valoración":      { pacientes: 0, ingreso: 0, ticket: 0 },
        "Programa Activo": { pacientes: 0, ingreso: 0, ticket: 0 },
      },
      totalPacientesYTD: { "Valoración": 0, "Programa Activo": 0 },
      ingresoYTD: 0,
    };
    const total = {
      labels,
      hist: {
        "Valoración":      [16, 4, 0, 4, 11, 4, 3, 3, 92],
        "Programa Activo": [0, 2, 0, 1, 1, 2, 3, 7, 4],
      },
      actual: {
        "Valoración":      { pacientes: 10, ingreso: 14224.1, ticket: 1422.41 },
        "Programa Activo": { pacientes: 7, ingreso: 1347297.8, ticket: 192471.11 },
      },
      totalPacientesYTD: { "Valoración": 147, "Programa Activo": 27 },
      ingresoYTD: 5479711.44,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  conceptos: {},
};
