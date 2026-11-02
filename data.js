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
  // ACTUALIZADO 2-nov-2026: CIERRE DE OCTUBRE (31-oct, 31 días de Real, vRepro).
  // Ya no hay proyección para octubre: Proyectado = Real en todas las métricas, sin agenda
  // pendiente de consultas y sin el supuesto de Metepec (+$50K). Los cargos y citas del 1 al 31 oct
  // se re-leyeron de vRepro (incluye las modificaciones retroactivas del 1 al 26 oct: -$360K netos
  // vs el corte del 26-oct). Septiembre CERRADO (Proyectado = Real). HubSpot (Interesa2) al 1-31 oct.
  corte: "31-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: {"hist": [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], "actual": 16.47, "proy": 16.47, "vsLM": 8, "vsU3M": 14, "nota": "OCTUBRE CERRADO (31-oct, 31 días de Real, vRepro): $16,471,134; ya no hay proyección (Proyectado = Real). CDMX $13,800,736, Guadalajara $2,004,060 y Metepec $666,338. Es el mes más alto de 2026 (agosto $16.11M, septiembre $15.22M) y +59% vs octubre 2025 ($10.37M). Servicios por Sede×Servicio según ConceptosHier. Los cargos del 1 al 26 oct se re-leyeron de vRepro al cierre (modificaciones retroactivas: -$360K netos vs el corte del 26-oct)."},
    atenciones: {"hist": [2498, 2295, 2577, 2522, 2562, 2331, 2561, 3106, 3543], "actual": 3147, "proy": 3147, "vsLM": -11, "vsU3M": 3, "nota": "OCTUBRE CERRADO: 3,147 líneas de cargo (CDMX 2,394 + GDL 555 + MTP 198). Real = Proyectado. Ingreso por atención ~$5.2K vs ~$4.3K en septiembre."},
    pacientes: {"hist": [589, 613, 735, 773, 762, 732, 741, 1000, 1323], "actual": 962, "proy": 962, "vsLM": -27, "vsU3M": -6, "nota": "OCTUBRE CERRADO: 962 pacientes únicos (suma de sedes, dedup por paciente dentro de cada sede: CDMX 669 + GDL 226 + MTP 67). Real = Proyectado. Septiembre tuvo un pico de pacientes únicos (1,323) por las valoraciones de subrogación en CDMX."},
    consultas: {"hist": [168, 167, 235, 220, 225, 271, 255, 316, 320], "real": 278, "agendado": 0, "proy": 278, "vsLM": -13, "vsU3M": -6, "nota": "OCTUBRE CERRADO: 278 consultas de primera vez (Terminada + grupo Primera Vez, vRepro, 1-31 oct): CDMX 145, GDL 108, MTP 25. Ya no hay agenda pendiente (agendado 0); la proyección es igual al real. El % de No Show (No Asiste sobre Terminada + No Asiste) cerró en 19.9%: 69 inasistencias sobre 347 citas."},
    noshow: {"hist": [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], "actual": 19.9, "prom": 13.9, "deltaPts": 6.0},
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: {"hist": [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], "actual": 13.8, "proy": 13.8, "vsLM": 4, "vsU3M": 16, "nota": "OCTUBRE CERRADO: $13,800,736 (Proyectado = Real). Septiembre cerró en $13,328,714: +4% vs LM."},
      atenciones: {"hist": [2099, 1795, 1944, 2018, 1977, 1717, 1910, 2069, 2658], "actual": 2394, "proy": 2394, "vsLM": -10, "vsU3M": 8, "nota": "2,394 líneas en el mes (cerrado); Real = Proyectado."},
      pacientes: {"hist": [455, 470, 530, 587, 566, 500, 506, 618, 931], "actual": 669, "proy": 669, "vsLM": -28, "vsU3M": -2, "nota": "669 pacientes únicos en el mes (cerrado); septiembre tuvo el pico de 931 por las valoraciones de subrogación."},
      consultas: {"hist": [127, 105, 144, 145, 133, 169, 141, 137, 145], "real": 145, "agendado": 0, "proy": 145, "vsLM": 0, "vsU3M": 3, "top_cat": "Consulta primera vez", "top_n": 81},
      noshow: {"hist": [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], "actual": 14.7, "prom": 12.1, "deltaPts": 2.6},
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: {"hist": [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], "actual": 2.0, "proy": 2.0, "vsLM": 38, "vsU3M": 5, "nota": "OCTUBRE CERRADO: $2,004,060 (Proyectado = Real). Septiembre cerró en $1,456,406: +38% vs LM."},
      atenciones: {"hist": [261, 311, 420, 326, 416, 507, 428, 751, 660], "actual": 555, "proy": 555, "vsLM": -16, "vsU3M": -9, "nota": "555 líneas en el mes (cerrado); agosto cerró en 751 y septiembre en 660."},
      pacientes: {"hist": [103, 98, 158, 136, 163, 195, 175, 287, 299], "actual": 226, "proy": 226, "vsLM": -24, "vsU3M": -11, "nota": "226 pacientes únicos en el mes (cerrado)."},
      consultas: {"hist": [33, 41, 75, 55, 79, 93, 87, 133, 123], "real": 108, "agendado": 0, "proy": 108, "vsLM": -12, "vsU3M": -6, "top_cat": "Check up Ginecologico", "top_n": 25},
      noshow: {"hist": [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], "actual": 23.4, "prom": 14.7, "deltaPts": 8.7},
    },
    MTP: {
      nombre: "Metepec",
      ingresos: {"hist": [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], "actual": 0.67, "proy": 0.67, "vsLM": 54, "vsU3M": 10, "nota": "OCTUBRE CERRADO: $666,338 (Proyectado = Real; sin el supuesto de +$50K). Septiembre cerró en $431,482. Sede chica: pocas líneas por día."},
      atenciones: {"hist": [138, 189, 213, 178, 169, 107, 223, 286, 225], "actual": 198, "proy": 198, "vsLM": -12, "vsU3M": -19, "nota": "198 líneas en el mes (cerrado)."},
      pacientes: {"hist": [31, 45, 47, 50, 33, 37, 60, 95, 93], "actual": 67, "proy": 67, "vsLM": -28, "vsU3M": -19, "nota": "67 pacientes únicos en el mes (cerrado)."},
      consultas: {"hist": [8, 21, 16, 20, 13, 9, 27, 46, 52], "real": 25, "agendado": 0, "proy": 25, "vsLM": -52, "vsU3M": -40, "top_cat": "Consulta primera vez", "top_n": 20},
      noshow: {"hist": [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], "actual": 30.6, "prom": 21.6, "deltaPts": 9.0},
    },
  },

  servicios: {
    total: [
      {"nombre": "Tratamientos FIV/ICSI", "valor": 4.46, "vsLM": -1, "vsU3M": 3},
      {"nombre": "Farmacia", "valor": 3.53, "vsLM": 34, "vsU3M": 18},
      {"nombre": "Congelación de Gametos", "valor": 3.32, "vsLM": -11, "vsU3M": 15},
      {"nombre": "Laboratorio", "valor": 2.75, "vsLM": 18, "vsU3M": 21},
      {"nombre": "Subrogación", "valor": 1.58, "vsLM": 81, "vsU3M": 63},
      {"nombre": "Consultas", "valor": 0.39, "vsLM": -24, "vsU3M": -10},
      {"nombre": "Procedimientos / Quirúrgicos", "valor": 0.31, "vsLM": -20, "vsU3M": -23},
      {"nombre": "Imágenes", "valor": 0.07, "vsLM": -53, "vsU3M": -31},
      {"nombre": "Wellness", "valor": 0.06, "vsLM": 15, "vsU3M": 114},
      {"nombre": "Otros", "valor": 0.01, "vsLM": -55, "vsU3M": -34},
    ],
    CDMX: [
      {"nombre": "Tratamientos FIV/ICSI", "valor": 3.68, "vsLM": -9, "vsU3M": -1},
      {"nombre": "Farmacia", "valor": 2.88, "vsLM": 23, "vsU3M": 17},
      {"nombre": "Congelación de Gametos", "valor": 2.72, "vsLM": -15, "vsU3M": 15},
      {"nombre": "Laboratorio", "valor": 2.41, "vsLM": 14, "vsU3M": 38},
      {"nombre": "Subrogación", "valor": 1.58, "vsLM": 85, "vsU3M": 64},
      {"nombre": "Procedimientos / Quirúrgicos", "valor": 0.25, "vsLM": -28, "vsU3M": -26},
      {"nombre": "Consultas", "valor": 0.18, "vsLM": -29, "vsU3M": -19},
      {"nombre": "Imágenes", "valor": 0.05, "vsLM": -58, "vsU3M": -33},
      {"nombre": "Wellness", "valor": 0.04, "vsLM": 19, "vsU3M": 115},
      {"nombre": "Otros", "valor": 0.01, "vsLM": -83, "vsU3M": -63},
    ],
    GDL: [
      {"nombre": "Congelación de Gametos", "valor": 0.59, "vsLM": 31, "vsU3M": 31},
      {"nombre": "Farmacia", "valor": 0.43, "vsLM": 215, "vsU3M": 48},
      {"nombre": "Tratamientos FIV/ICSI", "valor": 0.42, "vsLM": 2, "vsU3M": -13},
      {"nombre": "Laboratorio", "valor": 0.28, "vsLM": 71, "vsU3M": -33},
      {"nombre": "Consultas", "valor": 0.19, "vsLM": -11, "vsU3M": 7},
      {"nombre": "Procedimientos / Quirúrgicos", "valor": 0.06, "vsLM": 62, "vsU3M": 8},
      {"nombre": "Imágenes", "valor": 0.01, "vsLM": 6, "vsU3M": 23},
      {"nombre": "Wellness", "valor": 0.01, "vsLM": 9, "vsU3M": 111},
      {"nombre": "Otros", "valor": 0.01, "vsLM": null, "vsU3M": 20, "nuevo": true},
      {"nombre": "Subrogación", "valor": 0.0, "vsLM": -96, "vsU3M": -87},
    ],
    MTP: [
      {"nombre": "Tratamientos FIV/ICSI", "valor": 0.36, "vsLM": 415, "vsU3M": 140},
      {"nombre": "Farmacia", "valor": 0.22, "vsLM": 38, "vsU3M": -3},
      {"nombre": "Laboratorio", "valor": 0.06, "vsLM": 6, "vsU3M": -49},
      {"nombre": "Congelación de Gametos", "valor": 0.02, "vsLM": -84, "vsU3M": -79},
      {"nombre": "Consultas", "valor": 0.01, "vsLM": -67, "vsU3M": -46},
      {"nombre": "Imágenes", "valor": 0.0, "vsLM": -81, "vsU3M": -83},
      {"nombre": "Wellness", "valor": 0.0, "vsLM": -37, "vsU3M": 88},
      {"nombre": "Procedimientos / Quirúrgicos", "valor": 0.0, "vsLM": null, "vsU3M": -100},
    ],
  },
  highlights: {
    total: [
      "Octubre cerró en $16.47M (31 días de Real, vRepro): es el mes más alto de 2026, +8% vs septiembre ($15.22M), +14% vs el promedio de los últimos 3 meses cerrados y +59% vs octubre 2025 ($10.37M). Ya no hay proyección: Proyectado = Real. CDMX aportó $13.80M (84%), Guadalajara $2.00M (12%) y Metepec $0.67M (4%).",
      "Los días fuertes del mes fueron el lun 12-oct ($1.26M), el mié 14-oct ($1.14M), el vie 30-oct ($1.04M, el mejor de la última semana), el lun 19-oct ($0.97M), el jue 29-oct ($0.84M), el vie 9-oct ($0.83M) y el 1-oct ($0.81M); el domingo 18-oct no tuvo cargos y el miércoles 28-oct fue el más bajo de la semana de cierre ($0.41M). Los últimos 5 días (27-31 oct) sumaron $3.66M.",
      "Subrogación es el servicio que más crece vs septiembre (+81%, $1.58M) por los paquetes Fresh egg donor, Essentials y All Inclusive en CDMX; Farmacia ($3.53M, +34%) y Laboratorio ($2.75M, +18%) también suben, mientras Congelación de Gametos ($3.32M, -11%) y Tratamientos FIV/ICSI ($4.46M, -1%) siguen siendo los servicios más grandes pero cierran por debajo o igual que septiembre.",
      "Atenciones (3,147) y Pacientes (962) cierran -11% y -27% vs septiembre (3,543 y 1,323) frente a +8% de Ingresos: el ingreso por atención sube a ~$5.2K (vs ~$4.3K en septiembre) por los paquetes de subrogación y donación, y septiembre tuvo un pico de pacientes únicos (valoraciones de subrogación en CDMX) que octubre no repite.",
      "Consultas: 278 de primera vez terminadas en el mes (-13% vs septiembre, 320). El % de No Show de octubre cerró en 19.9% (69 inasistencias sobre 347 citas de primera vez), arriba del promedio ene-sep de 13.9%; Guadalajara (23.4%) y Metepec (30.6%) son las sedes con más inasistencia.",
      "HubSpot (Interesa2) en octubre: 2,057 leads y 514 citas agendadas (25% de conversión mensual); los leads quedan -2% vs septiembre (2,095) y las citas +10% (468). La hoja de cohortes de octubre se actualizó al 31-oct; las cohortes de agosto y septiembre siguen madurando (M1/M2).",
      "Nota de datos: los cargos y citas del 1 al 31 oct se re-leyeron de vRepro al cierre. Los cambios retroactivos del 1 al 26 oct (líneas eliminadas y ajustes de monto) restan $360K netos: el Real al 26-oct pasó de $13.17M (corte anterior) a $12.82M, con las mayores correcciones en el 26-oct (-$107K), el 21-oct (-$78K) y el 9-oct (-$43K). Médico = Profesional Historia; medicamentos de Farmacia a nivel producto. Servicios, conceptos y consultas usan tu archivo Clasificación 4 (2026); el ranking de consultas agrupa Check-up SOMP + SOP en uno y deja Check up Integral aparte. Conceptos nuevos de octubre clasificados de forma provisional y pendientes de tu revisión: donantes de óvulos (Ovodonors en fresco 0066, panel genético, Viáticos), Check colaborador, Histeroscopía diagnóstica sin anestesiólogo, Química Sanguínea 8 elementos y Subsecuente Fertilidad/Obstetricia.",
    ],
    CDMX: [
      "CDMX concentra 84% del ingreso de octubre ($13.80M de $16.47M), +4% vs septiembre ($13.33M) y +16% vs U3M; el lun 12-oct facturó $1.19M y el vie 30-oct fue el mejor día de la última semana.",
      "Subrogación CDMX cerró en $1.58M (+85% vs LM) y Congelación en $2.72M (-15%); Tratamientos FIV/ICSI $3.68M (-9%), Farmacia $2.88M (+23%) y Laboratorio $2.41M (+14%). 2,394 atenciones y 669 pacientes únicos.",
    ],
    GDL: [
      "GDL cerró en $2.00M (+38% vs septiembre, +5% vs U3M): Congelación $0.59M (+31%), Farmacia $0.43M (+215%), FIV/ICSI $0.42M (+2%) y Laboratorio $0.28M (+71%); el vie 30-oct fue su mejor día ($0.27M).",
      "555 atenciones y 226 pacientes únicos (agosto cerró en 751 atenciones y septiembre en 660); el No Show de primera vez fue 23.4%.",
    ],
    MTP: [
      "Metepec cerró en $666K (+54% vs septiembre, $431K; +10% vs U3M), sin el supuesto de +$50K de la proyección anterior. Tratamientos FIV/ICSI ($359K, 54% del ingreso de la sede) y Farmacia ($218K, 33%) explican el mes.",
      "198 atenciones y 67 pacientes únicos, las cifras más chicas de la red; es la sede con mayor % de No Show (30.6%: 11 inasistencias sobre 36 citas de primera vez).",
    ],
  },

  consultas_ranking: {
    total: [
      {"nombre": "Consulta primera vez", "valor": 119, "vsLM": -20},
      {"nombre": "Fertility Check up Mujeres", "valor": 40, "vsLM": -31},
      {"nombre": "Check up Ginecologico", "valor": 33, "vsLM": -21},
      {"nombre": "Check-up SOP", "valor": 30, "vsLM": 36},
      {"nombre": "Fertility Check up Parejas", "valor": 16, "vsLM": -6},
      {"nombre": "Check up Integral", "valor": 14, "vsLM": -7},
      {"nombre": "Consulta de Primera Vez IP's", "valor": 12, "vsLM": 200},
      {"nombre": "Consulta Obstetricia", "valor": 5, "vsLM": 25},
      {"nombre": "Consulta ginecológica", "valor": 5, "vsLM": 67},
      {"nombre": "Fertility Check up Hombres", "valor": 2, "vsLM": -67},
      {"nombre": "Asesoria catalogos", "valor": 1, "vsLM": null, "nuevo": true},
      {"nombre": "Consulta obstetrica materno fetal", "valor": 1, "vsLM": null, "nuevo": true},
    ],
    CDMX: [
      {"nombre": "Consulta primera vez", "valor": 81, "vsLM": -8},
      {"nombre": "Fertility Check up Mujeres", "valor": 27, "vsLM": -18},
      {"nombre": "Consulta de Primera Vez IP's", "valor": 12, "vsLM": 200},
      {"nombre": "Fertility Check up Parejas", "valor": 10, "vsLM": 25},
      {"nombre": "Check up Ginecologico", "valor": 7, "vsLM": 17},
      {"nombre": "Check up Integral", "valor": 3, "vsLM": null, "nuevo": true},
      {"nombre": "Check-up SOP", "valor": 3, "vsLM": 200},
      {"nombre": "Asesoria catalogos", "valor": 1, "vsLM": null, "nuevo": true},
      {"nombre": "Fertility Check up Hombres", "valor": 1, "vsLM": -75},
    ],
    GDL: [
      {"nombre": "Check up Ginecologico", "valor": 25, "vsLM": -7},
      {"nombre": "Check-up SOP", "valor": 25, "vsLM": 19},
      {"nombre": "Consulta primera vez", "valor": 18, "vsLM": -36},
      {"nombre": "Fertility Check up Mujeres", "valor": 12, "vsLM": -40},
      {"nombre": "Check up Integral", "valor": 11, "vsLM": -27},
      {"nombre": "Consulta Obstetricia", "valor": 5, "vsLM": 67},
      {"nombre": "Consulta ginecológica", "valor": 5, "vsLM": 150},
      {"nombre": "Fertility Check up Parejas", "valor": 5, "vsLM": 0},
      {"nombre": "Consulta obstetrica materno fetal", "valor": 1, "vsLM": null, "nuevo": true},
      {"nombre": "Fertility Check up Hombres", "valor": 1, "vsLM": -50},
    ],
    MTP: [
      {"nombre": "Consulta primera vez", "valor": 20, "vsLM": -39},
      {"nombre": "Check-up SOP", "valor": 2, "vsLM": null, "nuevo": true},
      {"nombre": "Check up Ginecologico", "valor": 1, "vsLM": -89},
      {"nombre": "Fertility Check up Mujeres", "valor": 1, "vsLM": -80},
      {"nombre": "Fertility Check up Parejas", "valor": 1, "vsLM": -75},
    ],
  },

  hubspot: {
    leads: { hist: [833, 1059, 1020, 999, 1752, 1435, 1533, 1921, 2095], actual: 2057 },
    citas: { hist: [188, 230, 318, 328, 367, 315, 418, 501, 468], actual: 514 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 25 },
    // Octubre completo (1-31 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,30,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,24,null,null], total2026: 21 },
      MTP: { mensual: [24,28,38,46,19,14,32,36,34,32,null,null], total2026: 31 },
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
      { mes: "Oct-26", leads: 2057, m0: 22, m1: 0, m2: 0, sin: 78 }, // OCTUBRE completo: m0 = 462 de 2,057 leads con cita en el mismo mes; m1/m2 empezarán a llenarse en noviembre y diciembre
    ],
  },

  subrogacion: (function(){
    const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct"];
    const cdmx = {
      labels,
      hist: {
        "Valoración":      [16, 4, 0, 4, 11, 4, 3, 3, 91, 15],
        "Programa Activo": [0, 1, 0, 1, 1, 2, 3, 7, 4, 10],
      },
      actual: {
        "Valoración":      { pacientes: 15, ingreso: 21336.15, ticket: 1422.41 },
        "Programa Activo": { pacientes: 10, ingreso: 1548159.87, ticket: 154815.99 },
      },
      totalPacientesYTD: { "Valoración": 151, "Programa Activo": 29 },
      ingresoYTD: 5651478.67,
    };
    const gdl = {
      labels,
      hist: {
        "Valoración":      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        "Programa Activo": [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
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
        "Valoración":      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "Programa Activo": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        "Valoración":      [16, 4, 0, 4, 11, 4, 3, 3, 92, 15],
        "Programa Activo": [0, 2, 0, 1, 1, 2, 3, 7, 4, 10],
      },
      actual: {
        "Valoración":      { pacientes: 15, ingreso: 21336.15, ticket: 1422.41 },
        "Programa Activo": { pacientes: 10, ingreso: 1548159.87, ticket: 154815.99 },
      },
      totalPacientesYTD: { "Valoración": 152, "Programa Activo": 30 },
      ingresoYTD: 5687685.56,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  conceptos: {},
};
