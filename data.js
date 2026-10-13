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
  // ACTUALIZADO 13-oct-2026: CORTE DE OCTUBRE (12-oct, 12 días de Real):
  // cargos y citas del 6 al 12 oct leídos directo de vRepro (1-5 oct validados contra
  // Cargos_y_Facturas_41.xlsx y Consultas_21.xlsx).
  // Proyección CENTRAL de octubre (MTD + días hábiles restantes × ritmo mediano
  // feb-sep); septiembre CERRADO (Proyectado = Real) y agosto re-clasificado por
  // ConceptosHier (total agosto $16,106,074). HubSpot (Interesa2) al 1-12 oct.
  corte: "12-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], actual: 5.97, proy: 13.3, vsLM: -13, vsU3M: -8, nota: "OCTUBRE (corte 12-oct, 12 días de Real, vRepro): Real $5,966,078; Proyectado $13,304,354. GDL: Real MTD + días hábiles restantes (ponderados: lun-vie 1, sáb 0.55, dom 0.07) × ritmo mediano feb-sep ($533K por día hábil equivalente), repartido a sedes y servicios con la mezcla jul-sep (backtest ene-sep: error medio ~0%, típico ±9%). CDMX ($11,333,342, la proyección del corte 11-oct) y Metepec ($300,000) están fijados manualmente (ajuste manual, no salen del método). Octubre 2025 cerró en $10.37M. Confianza media: 12 días de Real (9.2 de 25.0 días hábiles equivalentes), con dispersión alta entre días (lun 12-oct $1.33M vs dom 4-oct $53K). Septiembre quedó CERRADO (Proyectado = Real = $15,216,602); agosto quedó en $16,106,074 tras re-clasificar por ConceptosHier." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3106, 3543], actual: 1186, proy: 2959, vsLM: -16, vsU3M: -4, nota: "OCTUBRE MTD al 12-oct: 1,186 líneas de cargo (suma CDMX+GDL+MTP). Proyección 2,959 (CDMX 2,264 + GDL 568 + MTP 127) = promedio de (Real ÷ share mediano de atenciones al día 12) y (Real + días hábiles equivalentes restantes × ritmo por día hábil de jul-sep). CDMX (corte 11-oct) y Metepec: atenciones proyectadas ajustadas manualmente junto con su ingreso. Sin techo por ticket (el ticket ya no es estable: GDL cayó de ~$4.7K a $2.2K en septiembre)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1000, 1323], actual: 501, proy: 969, vsLM: -27, vsU3M: -5, nota: "OCTUBRE MTD al 12-oct: 501 pacientes únicos (suma de sedes, dedup por Historia dentro de cada sede). Proyección = max(Real, Atenciones proy × ratio pacientes/atención promedio jul-sep): total 969 (CDMX 690 + GDL 236 + MTP 43; Atenciones proy × ratio pacientes/atención jul-sep)." },
    consultas: { hist: [153, 154, 224, 208, 219, 262, 249, 309, 316], real: 95, agendado: 128, proy: 223, vsLM: -29, vsU3M: -23, nota: "OCTUBRE (corte 12-oct): real 95 (Terminada + Primera Vez: 1-5 oct de Consultas_21.xlsx + 6-10 y 12 oct de vRepro) + agendado 128 (citas de primera vez ya agendadas del 13 al 31 oct en vRepro) = proy 223. Poca historia del mes: la cifra crece conforme se agenden nuevas citas." },
    noshow: { hist: [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], actual: 12.8, prom: 13.9, deltaPts: -1.1 },
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], actual: 5.2, proy: 11.33, vsLM: -15, vsU3M: -5, nota: "OCTUBRE MTD al 12-oct: Real $5,201,381; Proyectado $11,333,342 (ajuste manual: se mantiene la proyección del corte 11-oct). Septiembre cerrado en $13,328,714 (Proy = Real)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2069, 2658], actual: 903, proy: 2264, vsLM: -15, vsU3M: 2, nota: "903 líneas al 12-oct; proy 2,264 (ajuste manual: se mantiene la proyección del corte 11-oct; el método daba 2,319); sin techo por ticket." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 618, 931], actual: 362, proy: 690, vsLM: -26, vsU3M: 1, nota: "362 pacientes únicos al 12-oct; proy 690 = Atenciones proy × 0.3046 (ratio promedio jul-sep)." },
      consultas: { hist: [112, 92, 133, 133, 127, 160, 135, 130, 141], real: 39, agendado: 66, proy: 105, vsLM: -26, vsU3M: -22, top_cat: "Consulta primera vez", top_n: 62 },
      noshow: { hist: [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], actual: 11.4, prom: 12.1, deltaPts: -0.7 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], actual: 0.56, proy: 1.67, vsLM: 15, vsU3M: -12, nota: "OCTUBRE MTD al 12-oct: Real $558,897; Proyectado central $1,671,012. Septiembre cerrado en $1,456,406 (Proy = Real)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751, 660], actual: 194, proy: 568, vsLM: -14, vsU3M: -7, nota: "194 líneas al 12-oct; proy 568 = promedio de pacing (547) y ritmo jul-sep por día hábil (588); sin techo por ticket (agosto 751, septiembre 660)." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287, 299], actual: 100, proy: 236, vsLM: -21, vsU3M: -7, nota: "100 pacientes únicos al 12-oct; proy = Atenciones proy × 0.4147 (ratio promedio jul-sep)." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133, 123], real: 40, agendado: 46, proy: 86, vsLM: -30, vsU3M: -25, top_cat: "Check-up SOP", top_n: 24 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], actual: 9.1, prom: 14.7, deltaPts: -5.6 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], actual: 0.21, proy: 0.3, vsLM: -30, vsU3M: -51, nota: "OCTUBRE MTD al 12-oct: Real $205,799; Proyectado $300,000 (ajuste manual: el método central daba $560K). Septiembre cerrado en $431,482 (Proy = Real). Sede chica: pocas líneas por día." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286, 225], actual: 89, proy: 127, vsLM: -44, vsU3M: -48, nota: "89 líneas al 12-oct; proy 127 = atenciones reales + remanente del método (233) escalado proporcionalmente al ingreso ajustado." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95, 93], actual: 39, proy: 43, vsLM: -54, vsU3M: -48, nota: "39 pacientes únicos al 12-oct; proy 43 = Atenciones proy (127) × 0.3382 (ratio promedio jul-sep)." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46, 52], real: 16, agendado: 16, proy: 32, vsLM: -38, vsU3M: -23, top_cat: "Consulta primera vez", top_n: 28 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], actual: 23.8, prom: 21.6, deltaPts: 2.2 },
    },
  },

  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.51, vsLM: -16, vsU3M: -17 },
      { nombre: "Congelación de Gametos", valor: 3.19, vsLM: -21, vsU3M: 7 },
      { nombre: "Farmacia", valor: 2.59, vsLM: -2, vsU3M: -13 },
      { nombre: "Laboratorio", valor: 1.98, vsLM: -15, vsU3M: -13 },
      { nombre: "Subrogación", valor: 1.19, vsLM: 35, vsU3M: 22 },
      { nombre: "Consultas", valor: 0.38, vsLM: -25, vsU3M: -11 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.33, vsLM: -14, vsU3M: -17 },
      { nombre: "Imágenes", valor: 0.07, vsLM: -50, vsU3M: -27 },
      { nombre: "Wellness", valor: 0.04, vsLM: -27, vsU3M: 36 },
      { nombre: "Otros", valor: 0.03, vsLM: -31, vsU3M: -14 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.11, vsLM: -16, vsU3M: -14 },
      { nombre: "Congelación de Gametos", valor: 2.75, vsLM: -22, vsU3M: 12 },
      { nombre: "Farmacia", valor: 2.15, vsLM: -8, vsU3M: -13 },
      { nombre: "Laboratorio", valor: 1.61, vsLM: -24, vsU3M: -8 },
      { nombre: "Subrogación", valor: 1.18, vsLM: 38, vsU3M: 23 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.24, vsLM: -30, vsU3M: -27 },
      { nombre: "Consultas", valor: 0.18, vsLM: -28, vsU3M: -19 },
      { nombre: "Imágenes", valor: 0.05, vsLM: -55, vsU3M: -30 },
      { nombre: "Wellness", valor: 0.03, vsLM: -21, vsU3M: 44 },
      { nombre: "Otros", valor: 0.03, vsLM: -38, vsU3M: -6 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.43, vsLM: -4, vsU3M: -4 },
      { nombre: "Laboratorio", valor: 0.32, vsLM: 95, vsU3M: -23 },
      { nombre: "Farmacia", valor: 0.31, vsLM: 129, vsU3M: 7 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.31, vsLM: -25, vsU3M: -36 },
      { nombre: "Consultas", valor: 0.18, vsLM: -15, vsU3M: 3 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.09, vsLM: 134, vsU3M: 57 },
      { nombre: "Imágenes", valor: 0.01, vsLM: 8, vsU3M: 25 },
      { nombre: "Wellness", valor: 0.01, vsLM: -39, vsU3M: 18 },
      { nombre: "Otros", valor: 0.01, vsLM: 101, vsU3M: -42 },
      { nombre: "Subrogación", valor: 0.0, vsLM: -81, vsU3M: -42 },
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.12, vsLM: -21, vsU3M: -45 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.09, vsLM: 33, vsU3M: -38 },
      { nombre: "Laboratorio", valor: 0.05, vsLM: -2, vsU3M: -53 },
      { nombre: "Consultas", valor: 0.01, vsLM: -62, vsU3M: -39 },
      { nombre: "Congelación de Gametos", valor: 0.01, vsLM: -88, vsU3M: -84 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: null, vsU3M: -84, nuevo: true },
      { nombre: "Imágenes", valor: 0.0, vsLM: -83, vsU3M: -84 },
      { nombre: "Wellness", valor: 0.0, vsLM: -95, vsU3M: -84 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  highlights: {
    total: [
      "Octubre lleva 12 días de Real (corte 12-oct, leído de vRepro) y proyecta $13.30M: 13% debajo de septiembre ($15.22M) y 28% arriba de octubre 2025 ($10.37M). Confianza media: solo 9.2 de 25.0 días hábiles equivalentes y alta dispersión diaria (lun 12-oct $1.33M, vie 9-oct $948K, dom 11-oct $191K).",
      "El lunes 12-oct dejó $1.33M de venta, empujado por Subrogación (paquetes Fresh egg donor $569K y Essentials $105K en CDMX) y Congelación ($191K), así que el Real a la fecha ($5.97M) ya cubre 45% de la proyección.",
      "Subrogación es el servicio que más crece vs septiembre (+35% proy, $1.19M) por esos dos paquetes; Tratamientos FIV/ICSI ($3.51M, -16%) y Congelación ($3.19M, -21%) siguen siendo los dos servicios más grandes, pero ambos van por debajo de septiembre.",
      "Atenciones (2,959) y Pacientes (969) proyectan -16% y -27% vs septiembre (3,543 y 1,323) frente a -13% de Ingresos: septiembre tuvo un pico de pacientes únicos que el ratio promedio jul-sep solo recoge en parte. Sin techo por ticket.",
      "Consultas: 95 reales más 128 ya agendadas del 13 al 31 oct = 223 proyectadas (-29% vs septiembre); la cifra crece conforme se agenden nuevas citas, no es un techo. El % de No Show de octubre es 12.8% (14 inasistencias sobre 109 citas de primera vez), debajo del promedio ene-sep de 13.9%.",
      "HubSpot (Interesa2) al 12-oct: 758 leads y 177 citas agendadas (23% de conversión mensual parcial); el día 12 sumó 69 leads y 18 citas. La cohorte M0 de octubre va en 18% de los leads con cita en el mismo mes (septiembre cerró en 20%).",
      "Prueba vRepro: del 6 al 12 oct los cargos y citas se leyeron directo de vRepro (médico = Profesional Historia; medicamentos de Farmacia a nivel producto). Servicios, conceptos y consultas usan tu archivo Clasificación 4 (2026); el ranking de consultas agrupa Check-up SOMP + SOP en uno y deja Check up Integral aparte, y octubre sale de vRepro (grupo Primera Vez: Terminadas 1–12 oct + Citado/Confirmada 13–31 oct).",
    ],
    CDMX: [
      "CDMX concentra 87% del ingreso MTD de octubre ($5.20M de $5.97M) y proyecta $11.33M (-15% vs septiembre, -5% vs U3M); solo el lunes 12-oct facturó $1.26M.",
      "Subrogación CDMX ya lleva $688K en el mes (proy $1.18M, +38% vs LM) y Congelación $1.48M real; Atenciones proy (2,264) y Pacientes proy (690) sin techo por ticket.",
    ],
    GDL: [
      "GDL lleva $559K en 12 días y proyecta $1.67M (+15% vs septiembre, -12% vs U3M); el 12-oct solo facturó $22K, por eso su proyección baja $48K frente al corte del 11-oct.",
      "Atenciones proy (568) vs 194 reales: promedio entre el pacing del día 12 (547) y el ritmo jul-sep por día hábil (588); agosto cerró en 751 y septiembre en 660.",
    ],
    MTP: [
      "Metepec lleva $206K en 12 días y proyecta $0.30M (-30% vs septiembre, $431K); el 12-oct facturó $48K, casi todo Farmacia ($44K).",
      "Atenciones proy (127) y Pacientes proy (43) vs 89 y 39 reales; son las cifras más chicas de la red y la sede con mayor % de No Show (23.8%).",
    ],
  },

  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 106, vsLM: -29 },
      { nombre: "Fertility Check up Mujeres", valor: 33, vsLM: -43 },
      { nombre: "Check-up SOP", valor: 29, vsLM: 32 },
      { nombre: "Check up Ginecologico", valor: 21, vsLM: -50 },
      { nombre: "Fertility Check up Parejas", valor: 18, vsLM: 6 },
      { nombre: "Check up Integral", valor: 12, vsLM: -20 },
      { nombre: "Fertility Check up Hombres", valor: 4, vsLM: -33 },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 62, vsLM: -30 },
      { nombre: "Fertility Check up Mujeres", valor: 22, vsLM: -33 },
      { nombre: "Fertility Check up Parejas", valor: 11, vsLM: 38 },
      { nombre: "Check up Integral", valor: 3, vsLM: null, nuevo: true },
      { nombre: "Check-up SOP", valor: 3, vsLM: 200 },
      { nombre: "Check up Ginecologico", valor: 3, vsLM: -50 },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -75 },
    ],
    GDL: [
      { nombre: "Check-up SOP", valor: 24, vsLM: 14 },
      { nombre: "Check up Ginecologico", valor: 17, vsLM: -37 },
      { nombre: "Consulta primera vez", valor: 16, vsLM: -43 },
      { nombre: "Fertility Check up Mujeres", valor: 10, vsLM: -50 },
      { nombre: "Check up Integral", valor: 9, vsLM: -40 },
      { nombre: "Fertility Check up Parejas", valor: 7, vsLM: 40 },
      { nombre: "Fertility Check up Hombres", valor: 3, vsLM: 50 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 28, vsLM: -15 },
      { nombre: "Check-up SOP", valor: 2, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: -80 },
      { nombre: "Check up Ginecologico", valor: 1, vsLM: -89 },
    ],
  },

  hubspot: {
    leads: { hist: [834, 1062, 1021, 1000, 1754, 1436, 1533, 1924, 2108], actual: 758 },
    citas: { hist: [188, 230, 318, 329, 367, 315, 416, 504, 458], actual: 177 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 23 },
    // Octubre parcial (1-12 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,22,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,25,null,null], total2026: 21 },
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
      { mes: "Oct-26", leads: 758, m0: 18, m1: 0, m2: 0, sin: 82 }, // OCTUBRE parcial (1-12 oct): m0 = 140 de 758 leads con cita en el mismo mes; m1/m2 todavía no pueden existir
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
        "Valoración":      { pacientes: 6, ingreso: 8534.46, ticket: 1422.41 },
        "Programa Activo": { pacientes: 3, ingreso: 674137.93, ticket: 224712.64 },
      },
      totalPacientesYTD: { "Valoración": 142, "Programa Activo": 22 },
      ingresoYTD: 4764655.04,
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
        "Valoración":      { pacientes: 6, ingreso: 8534.46, ticket: 1422.41 },
        "Programa Activo": { pacientes: 3, ingreso: 674137.93, ticket: 224712.64 },
      },
      totalPacientesYTD: { "Valoración": 143, "Programa Activo": 23 },
      ingresoYTD: 4800861.93,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  conceptos: {},
};
