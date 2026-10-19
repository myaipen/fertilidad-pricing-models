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
  // ACTUALIZADO 19-oct-2026: CORTE DE OCTUBRE (18-oct, 18 días de Real):
  // cargos y citas del 6 al 18 oct leídos directo de vRepro (1-5 oct validados contra
  // Cargos_y_Facturas_41.xlsx y Consultas_21.xlsx).
  // Proyección CENTRAL de octubre (MTD + días hábiles restantes × ritmo mediano
  // feb-sep); septiembre CERRADO (Proyectado = Real) y agosto re-clasificado por
  // ConceptosHier (total agosto $16,106,074). HubSpot (Interesa2) al 1-18 oct.
  corte: "18-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], actual: 8.53, proy: 13.57, vsLM: -11, vsU3M: -6, nota: "OCTUBRE (corte 18-oct, 18 días de Real, vRepro): Real $8,533,679; Proyectado $13,567,933. GDL y Metepec: Real MTD + días hábiles restantes (ponderados: lun-vie 1, sáb 0.55, dom 0.07) × ritmo mediano feb-sep ($533K por día hábil equivalente), repartido a sedes y servicios con la mezcla jul-sep (backtest ene-sep: error medio ~0%, típico ±9%). CDMX queda fijada a mano en $11,333,342 (ajuste manual; el método daba $12.26M y el total habría sido $14.49M); el tope manual de Metepec ($0.30M) se retiró porque quedó por debajo de su Real MTD ($353K). Octubre 2025 cerró en $10.37M. Confianza media-alta: 18 días de Real (13.9 de 25.0 días hábiles equivalentes). El domingo 18-oct no tuvo cargos. Septiembre quedó CERRADO (Proyectado = Real = $15,216,602); agosto quedó en $16,106,074 tras re-clasificar por ConceptosHier." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3106, 3543], actual: 1701, proy: 3069, vsLM: -13, vsU3M: 0, nota: "OCTUBRE MTD al 18-oct: 1,701 líneas de cargo (suma CDMX+GDL+MTP). Proyección 3,069 (CDMX 2,264 + GDL 587 + MTP 218) = promedio de (Real ÷ share mediano de atenciones al día 18) y (Real + días hábiles equivalentes restantes × ritmo por día hábil de jul-sep). CDMX: atenciones proyectadas ajustadas manualmente junto con su ingreso (el método daba 2,242). Sin techo por ticket (el ticket ya no es estable: GDL cayó de ~$4.7K a $2.2K en septiembre)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1000, 1323], actual: 646, proy: 1007, vsLM: -24, vsU3M: -1, nota: "OCTUBRE MTD al 18-oct: 646 pacientes únicos (suma de sedes, dedup por Historia dentro de cada sede). Proyección = max(Real, Atenciones proy × ratio pacientes/atención promedio jul-sep): total 1,007 (CDMX 690 + GDL 243 + MTP 74; Atenciones proy × ratio pacientes/atención jul-sep)." },
    consultas: { hist: [153, 154, 224, 208, 219, 262, 249, 309, 316], real: 154, agendado: 147, proy: 301, vsLM: -5, vsU3M: 3, nota: "OCTUBRE (corte 18-oct): proyección 301 consultas (rango 285-320). Real 154 (Terminada + Primera Vez, 1-18 oct, vRepro) + 147 esperadas = agenda pendiente de 115 citas × show rate 84% (≈97) + citas nuevas por agendar (≈50). Piso (solo lo ya agendado) ≈ 251. Método: promedio del modelo Piso + incremental (velocidad de agenda calibrada a vRepro 10.2 citas/día × 13 días × decay 0.52 × show rate) y del blend run-rate + HubSpot (backtest Abr-Sep, error ~3.5% al corte día 18)." },
    noshow: { hist: [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], actual: 15.8, prom: 13.9, deltaPts: 1.9 },
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], actual: 7.34, proy: 11.33, vsLM: -15, vsU3M: -5, nota: "OCTUBRE MTD al 18-oct: Real $7,336,526; Proyectado $11,333,342 (ajuste manual: se mantiene el nivel fijado en el corte 11-oct; el método daba $12.26M). Septiembre cerrado en $13,328,714 (Proy = Real)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2069, 2658], actual: 1268, proy: 2264, vsLM: -15, vsU3M: 2, nota: "1,268 líneas al 18-oct; proy 2,264 (ajuste manual; el método daba 2,242); sin techo por ticket." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 618, 931], actual: 459, proy: 690, vsLM: -26, vsU3M: 1, nota: "459 pacientes únicos al 18-oct; proy 690 = Atenciones proy × 0.3046 (ratio promedio jul-sep)." },
      consultas: { hist: [112, 92, 133, 133, 127, 160, 135, 130, 141], real: 70, agendado: 67, proy: 137, vsLM: -3, vsU3M: 1, top_cat: "Consulta primera vez", top_n: 82 },
      noshow: { hist: [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], actual: 15.7, prom: 12.1, deltaPts: 3.6 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], actual: 0.84, proy: 1.63, vsLM: 12, vsU3M: -14, nota: "OCTUBRE MTD al 18-oct: Real $844,142; Proyectado central $1,630,863. Septiembre cerrado en $1,456,406 (Proy = Real)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751, 660], actual: 311, proy: 587, vsLM: -11, vsU3M: -4, nota: "311 líneas al 18-oct; proy 587 = promedio de pacing (585) y ritmo jul-sep por día hábil (590); sin techo por ticket (agosto 751, septiembre 660)." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287, 299], actual: 138, proy: 243, vsLM: -19, vsU3M: -4, nota: "138 pacientes únicos al 18-oct; proy 243 = Atenciones proy × 0.4147 (ratio promedio jul-sep)." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133, 123], real: 63, agendado: 53, proy: 116, vsLM: -6, vsU3M: 1, top_cat: "Check-up SOP", top_n: 23 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], actual: 13.7, prom: 14.7, deltaPts: -1.0 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], actual: 0.35, proy: 0.6, vsLM: 40, vsU3M: -1, nota: "OCTUBRE MTD al 18-oct: Real $353,010; Proyectado central $603,728 (método central; se retiró el tope manual de $0.30M). Septiembre cerrado en $431,482 (Proy = Real). Sede chica: pocas líneas por día." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286, 225], actual: 122, proy: 218, vsLM: -3, vsU3M: -11, nota: "122 líneas al 18-oct; proy 218 = promedio de pacing (204) y ritmo jul-sep por día hábil (233); sin techo por ticket." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95, 93], actual: 49, proy: 74, vsLM: -20, vsU3M: -10, nota: "49 pacientes únicos al 18-oct; proy 74 = Atenciones proy (218) × 0.3382 (ratio promedio jul-sep)." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46, 52], real: 21, agendado: 27, proy: 48, vsLM: -8, vsU3M: 15, top_cat: "Consulta primera vez", top_n: 30 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], actual: 22.2, prom: 21.6, deltaPts: 0.6 },
    },
  },

  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.77, vsLM: -16, vsU3M: -13 },
      { nombre: "Congelación de Gametos", valor: 3.06, vsLM: -19, vsU3M: 6 },
      { nombre: "Farmacia", valor: 2.61, vsLM: -1, vsU3M: -12 },
      { nombre: "Laboratorio", valor: 2.1, vsLM: -10, vsU3M: -8 },
      { nombre: "Subrogación", valor: 1.2, vsLM: 37, vsU3M: 23 },
      { nombre: "Consultas", valor: 0.38, vsLM: -24, vsU3M: -10 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.32, vsLM: -17, vsU3M: -20 },
      { nombre: "Imágenes", valor: 0.07, vsLM: -51, vsU3M: -28 },
      { nombre: "Wellness", valor: 0.04, vsLM: -19, vsU3M: 51 },
      { nombre: "Otros", valor: 0.02, vsLM: -38, vsU3M: -10 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.2, vsLM: -21, vsU3M: -14 },
      { nombre: "Congelación de Gametos", valor: 2.61, vsLM: -18, vsU3M: 10 },
      { nombre: "Farmacia", valor: 2.08, vsLM: -11, vsU3M: -16 },
      { nombre: "Laboratorio", valor: 1.74, vsLM: -18, vsU3M: 0 },
      { nombre: "Subrogación", valor: 1.19, vsLM: 39, vsU3M: 24 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.24, vsLM: -31, vsU3M: -29 },
      { nombre: "Consultas", valor: 0.18, vsLM: -32, vsU3M: -23 },
      { nombre: "Imágenes", valor: 0.05, vsLM: -59, vsU3M: -36 },
      { nombre: "Wellness", valor: 0.03, vsLM: -13, vsU3M: 58 },
      { nombre: "Otros", valor: 0.02, vsLM: -50, vsU3M: 11 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.42, vsLM: -7, vsU3M: -7 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.33, vsLM: -19, vsU3M: -31 },
      { nombre: "Farmacia", valor: 0.32, vsLM: 132, vsU3M: 9 },
      { nombre: "Laboratorio", valor: 0.27, vsLM: 65, vsU3M: -36 },
      { nombre: "Consultas", valor: 0.19, vsLM: -13, vsU3M: 5 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.08, vsLM: 108, vsU3M: 39 },
      { nombre: "Imágenes", valor: 0.02, vsLM: 22, vsU3M: 42 },
      { nombre: "Wellness", valor: 0.01, vsLM: -32, vsU3M: 32 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: -49, nuevo: true },
      { nombre: "Subrogación", valor: 0.0, vsLM: -86, vsU3M: -59 },
    ],
    MTP: [
      { nombre: "Tratamientos FIV/ICSI", valor: 0.24, vsLM: 247, vsU3M: 62 },
      { nombre: "Farmacia", valor: 0.21, vsLM: 33, vsU3M: -7 },
      { nombre: "Laboratorio", valor: 0.09, vsLM: 65, vsU3M: -21 },
      { nombre: "Congelación de Gametos", valor: 0.03, vsLM: -69, vsU3M: -59 },
      { nombre: "Consultas", valor: 0.02, vsLM: -41, vsU3M: -5 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: null, vsU3M: -59, nuevo: true },
      { nombre: "Imágenes", valor: 0.0, vsLM: -54, vsU3M: -59 },
      { nombre: "Wellness", valor: 0.0, vsLM: -86, vsU3M: -59 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  highlights: {
    total: [
      "Octubre lleva 18 días de Real (corte 18-oct, leído de vRepro) y proyecta $13.57M: 11% debajo de septiembre ($15.22M), 6% debajo del promedio de los últimos 3 meses y 31% arriba de octubre 2025 ($10.37M). Confianza media-alta: 13.9 de 25.0 días hábiles equivalentes; el Real a la fecha ($8.53M) ya cubre 63% de la proyección.",
      "Los días fuertes del mes fueron el lun 12-oct ($1.26M), el mié 14-oct ($1.15M, FIV/ICSI $438K y Subrogación $205K en CDMX), el vie 9-oct ($913K) y el 1-oct ($901K); entre semana el resto de los días ronda $200-600K y el domingo 18-oct no tuvo cargos.",
      "Subrogación es el servicio que más crece vs septiembre (+37% proy, $1.20M) por los paquetes Fresh egg donor y Essentials en CDMX; Tratamientos FIV/ICSI ($3.77M, -16%) y Congelación ($3.06M, -19%) siguen siendo los dos servicios más grandes, pero ambos van por debajo de septiembre.",
      "Atenciones (3,069) y Pacientes (1,007) proyectan -13% y -24% vs septiembre (3,543 y 1,319) frente a -11% de Ingresos: septiembre tuvo un pico de pacientes únicos que el ratio promedio jul-sep solo recoge en parte. Sin techo por ticket.",
      "Consultas: 154 reales más 115 ya agendadas del 19 al 31 oct = 269 proyectadas (-15% vs septiembre); la cifra crece conforme se agenden nuevas citas, no es un techo. El % de No Show de octubre es 15.8% (29 inasistencias sobre 183 citas de primera vez), arriba del promedio ene-sep de 13.9%.",
      "HubSpot (Interesa2) al 18-oct: 1,144 leads y 269 citas agendadas (24% de conversión mensual parcial); el domingo 18 sumó 44 leads y 6 citas. La cohorte M0 de octubre va en 21% de los leads con cita en el mismo mes (septiembre cerró en 20%).",
      "Vigilar: CDMX se mantiene fija en $11.33M por ajuste manual; sin ese ajuste el método daría $12.26M y el total habría sido $14.49M (-5% vs septiembre). El tope de Metepec ($0.30M) se retiró porque ya estaba por debajo de su Real.",
      "Nota de datos: del 6 al 18 oct los cargos y citas se leyeron directo de vRepro (médico = Profesional Historia; medicamentos de Farmacia a nivel producto). Servicios, conceptos y consultas usan tu archivo Clasificación 4 (2026); el ranking de consultas agrupa Check-up SOMP + SOP en uno y deja Check up Integral aparte, y octubre sale de vRepro (grupo Primera Vez: Terminadas 1–18 oct + Citado/Confirmada 19–31 oct). Cargos de los días 9, 10 y 12 oct bajaron $110K frente al corte del 12-oct por descuentos aplicados después en vRepro.",
    ],
    CDMX: [
      "CDMX concentra 86% del ingreso MTD de octubre ($7.34M de $8.53M) y proyecta $11.33M (-15% vs septiembre, -5% vs U3M); el mié 14-oct facturó $1.02M y el lun 12-oct $1.19M.",
      "Subrogación CDMX ya lleva $871K en el mes (proy $1.19M, +39% vs LM) y Congelación $1.79M real; Atenciones proy (2,264) y Pacientes proy (690) sin techo por ticket.",
    ],
    GDL: [
      "GDL lleva $844K en 18 días y proyecta $1.63M (+12% vs septiembre, -14% vs U3M); Farmacia (proy +132% vs septiembre) y Laboratorio (+65%) crecen fuerte, mientras FIV/ICSI proyecta -19%.",
      "Atenciones proy (587) vs 311 reales: promedio entre el pacing del día 18 (585) y el ritmo jul-sep por día hábil (590); agosto cerró en 751 y septiembre en 660.",
    ],
    MTP: [
      "Metepec lleva $353K en 18 días y proyecta $0.60M (+40% vs septiembre, $431K); FIV/ICSI ($180K real) y Farmacia ($117K) concentran el ingreso y el sáb 17-oct fue su mejor día ($82K).",
      "Atenciones proy (218) y Pacientes proy (74) vs 122 y 49 reales; son las cifras más chicas de la red y la sede con mayor % de No Show (22.2%).",
    ],
  },

  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 129, vsLM: -13 },
      { nombre: "Fertility Check up Mujeres", valor: 38, vsLM: -34 },
      { nombre: "Check-up SOP", valor: 29, vsLM: 32 },
      { nombre: "Check up Ginecologico", valor: 27, vsLM: -36 },
      { nombre: "Fertility Check up Parejas", valor: 18, vsLM: 6 },
      { nombre: "Check up Integral", valor: 15, vsLM: 0 },
      { nombre: "Consulta de Primera Vez IP's", valor: 7, vsLM: 75 },
      { nombre: "Fertility Check up Hombres", valor: 3, vsLM: -50 },
      { nombre: "Consulta Obstetricia", valor: 2, vsLM: -50 },
      { nombre: "Consulta obstetrica materno fetal", valor: 1, vsLM: null, nuevo: true },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 82, vsLM: -7 },
      { nombre: "Fertility Check up Mujeres", valor: 26, vsLM: -21 },
      { nombre: "Fertility Check up Parejas", valor: 10, vsLM: 25 },
      { nombre: "Consulta de Primera Vez IP's", valor: 7, vsLM: 75 },
      { nombre: "Check up Ginecologico", valor: 5, vsLM: -17 },
      { nombre: "Check-up SOP", valor: 4, vsLM: 300 },
      { nombre: "Check up Integral", valor: 3, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Hombres", valor: 2, vsLM: -50 },
    ],
    GDL: [
      { nombre: "Check-up SOP", valor: 23, vsLM: 10 },
      { nombre: "Check up Ginecologico", valor: 21, vsLM: -22 },
      { nombre: "Consulta primera vez", valor: 17, vsLM: -39 },
      { nombre: "Check up Integral", valor: 12, vsLM: -20 },
      { nombre: "Fertility Check up Mujeres", valor: 11, vsLM: -45 },
      { nombre: "Fertility Check up Parejas", valor: 7, vsLM: 40 },
      { nombre: "Consulta Obstetricia", valor: 2, vsLM: -33 },
      { nombre: "Consulta obstetrica materno fetal", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -50 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 30, vsLM: -9 },
      { nombre: "Check-up SOP", valor: 2, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Parejas", valor: 1, vsLM: -75 },
      { nombre: "Check up Ginecologico", valor: 1, vsLM: -89 },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: -80 },
    ],
  },

  hubspot: {
    leads: { hist: [834, 1062, 1021, 1000, 1754, 1436, 1533, 1924, 2108], actual: 1144 },
    citas: { hist: [188, 230, 318, 329, 367, 315, 416, 504, 458], actual: 269 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 24 },
    // Octubre parcial (1-18 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,26,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,23,null,null], total2026: 21 },
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
      { mes: "Sep-26", leads: 2108, m0: 20, m1: 0, m2: 0, sin: 80 },
      { mes: "Oct-26", leads: 1144, m0: 21, m1: 0, m2: 0, sin: 79 }, // OCTUBRE parcial (1-18 oct): m0 = 235 de 1,144 leads con cita en el mismo mes; m1/m2 todavía no pueden existir
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
        "Valoración":      { pacientes: 9, ingreso: 12801.69, ticket: 1422.41 },
        "Programa Activo": { pacientes: 4, ingreso: 849396.61, ticket: 212349.15 },
      },
      totalPacientesYTD: { "Valoración": 145, "Programa Activo": 23 },
      ingresoYTD: 4944180.95,
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
        "Valoración":      { pacientes: 9, ingreso: 12801.69, ticket: 1422.41 },
        "Programa Activo": { pacientes: 4, ingreso: 849396.61, ticket: 212349.15 },
      },
      totalPacientesYTD: { "Valoración": 146, "Programa Activo": 24 },
      ingresoYTD: 4980387.84,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  conceptos: {},
};
