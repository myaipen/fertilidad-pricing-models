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
  // ACTUALIZADO 12-oct-2026: PRUEBA CON vRepro. CORTE DE OCTUBRE (11-oct, 11 días de Real):
  // cargos y citas del 1 al 11 oct leídos directo de vRepro (1-5 oct validados contra
  // Cargos_y_Facturas_41.xlsx y Consultas_21.xlsx).
  // Proyección CENTRAL de octubre (MTD + días hábiles restantes × ritmo mediano
  // feb-sep); septiembre CERRADO (Proyectado = Real) y agosto re-clasificado por
  // ConceptosHier (total agosto $16,106,074). HubSpot (Interesa2) al 1-11 oct.
  corte: "11-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], actual: 4.63, proy: 13.59, vsLM: -11, vsU3M: -6, nota: "OCTUBRE (corte 11-oct, 11 días de Real, vRepro): Real $4,633,538; Proyectado central $13,587,775 = Real MTD + días hábiles restantes (ponderados: lun-vie 1, sáb 0.55, dom 0.07) × ritmo mediano feb-sep ($533K por día hábil equivalente), repartido a sedes y servicios con la mezcla jul-sep. Backtest ene-sep: error medio ~0%, típico ±9% (rango -18% a +15%). Octubre 2025 cerró en $10.37M. Confianza media: 11 días de Real (8.2 de 25.0 días hábiles equivalentes), con dispersión alta entre días (vie 9-oct $948K vs dom 4-oct $53K). Septiembre quedó CERRADO (Proyectado = Real = $15,216,602); agosto quedó en $16,106,074 tras re-clasificar por ConceptosHier." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3106, 3543], actual: 1038, proy: 3077, vsLM: -13, vsU3M: 0, nota: "OCTUBRE MTD al 11-oct: 1,038 líneas de cargo (suma CDMX+GDL+MTP). Proyección 3,077 (CDMX 2,264 + GDL 589 + MTP 224) = promedio de (Real ÷ share mediano de atenciones al día 11) y (Real + días hábiles equivalentes restantes × ritmo por día hábil de jul-sep). Sin techo por ticket (el ticket ya no es estable: GDL cayó de ~$4.7K a $2.2K en septiembre)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1000, 1323], actual: 466, proy: 1010, vsLM: -24, vsU3M: -1, nota: "OCTUBRE MTD al 11-oct: 466 pacientes únicos (suma de sedes, dedup por Historia dentro de cada sede). Proyección = max(Real, Atenciones proy × ratio pacientes/atención promedio jul-sep): total 1,010 (CDMX 690 + GDL 244 + MTP 76)." },
    consultas: { hist: [168, 167, 235, 220, 225, 271, 255, 316, 320], real: 84, agendado: 127, proy: 211, vsLM: -34, vsU3M: -29, nota: "OCTUBRE (corte 11-oct): real 84 (Terminada + Primera Vez: 1-5 oct de Consultas_21.xlsx + 6-10 oct de vRepro) + agendado 127 (citas de primera vez ya agendadas del 12 al 31 oct en vRepro) = proy 211. Poca historia del mes: la cifra crece conforme se agenden nuevas citas." },
    noshow: { hist: [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], actual: 14.3, prom: 13.9, deltaPts: 0.4 },
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], actual: 3.94, proy: 11.33, vsLM: -15, vsU3M: -5, nota: "OCTUBRE MTD al 11-oct: Real $3,938,513; Proyectado central $11,333,342. Septiembre cerrado en $13,328,714 (Proy = Real)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2069, 2658], actual: 781, proy: 2264, vsLM: -15, vsU3M: 2, nota: "781 líneas al 11-oct; proy 2,264 = promedio de pacing (2,240) y ritmo jul-sep por día hábil (2,289); sin techo por ticket." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 618, 931], actual: 335, proy: 690, vsLM: -26, vsU3M: 1, nota: "335 pacientes únicos al 11-oct; proy = Atenciones proy × 0.3046 (ratio promedio jul-sep)." },
      consultas: { hist: [127, 105, 144, 145, 133, 169, 141, 137, 145], real: 33, agendado: 65, proy: 98, vsLM: -32, vsU3M: -30, top_cat: "Consulta primera vez", top_n: 14 },
      noshow: { hist: [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], actual: 13.2, prom: 12.1, deltaPts: 1.1 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], actual: 0.54, proy: 1.72, vsLM: 18, vsU3M: -10, nota: "OCTUBRE MTD al 11-oct: Real $536,785; Proyectado central $1,719,331. Septiembre cerrado en $1,456,406 (Proy = Real)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751, 660], actual: 181, proy: 589, vsLM: -11, vsU3M: -4, nota: "181 líneas al 11-oct; proy 589 = promedio de pacing (578) y ritmo jul-sep por día hábil (600); sin techo por ticket (agosto 751, septiembre 660)." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287, 299], actual: 96, proy: 244, vsLM: -18, vsU3M: -4, nota: "96 pacientes únicos al 11-oct; proy = Atenciones proy × 0.4147 (ratio promedio jul-sep)." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133, 123], real: 37, agendado: 46, proy: 83, vsLM: -33, vsU3M: -27, top_cat: "Check-up SOMP", top_n: 14 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], actual: 9.8, prom: 14.7, deltaPts: -4.9 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], actual: 0.16, proy: 0.54, vsLM: 24, vsU3M: -12, nota: "OCTUBRE MTD al 11-oct: Real $158,240; Proyectado central $535,103. Septiembre cerrado en $431,482 (Proy = Real). Sede chica: pocas líneas por día, su curva es la más volátil de las 3 sedes." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286, 225], actual: 76, proy: 224, vsLM: 0, vsU3M: -8, nota: "76 líneas al 11-oct; proy 224 = promedio de pacing (204) y ritmo jul-sep por día hábil (243)." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95, 93], actual: 35, proy: 76, vsLM: -18, vsU3M: -8, nota: "35 pacientes únicos al 11-oct; proy = max(Real, Atenciones proy × 0.3382, ratio promedio jul-sep)." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46, 52], real: 14, agendado: 16, proy: 30, vsLM: -42, vsU3M: -28, top_cat: "Consulta primera vez", top_n: 10 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], actual: 26.3, prom: 21.6, deltaPts: 4.7 },
    },
  },

  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.87, vsLM: -8, vsU3M: -9 },
      { nombre: "Congelación de Gametos", valor: 3.31, vsLM: -18, vsU3M: 11 },
      { nombre: "Farmacia", valor: 2.78, vsLM: 5, vsU3M: -7 },
      { nombre: "Laboratorio", valor: 2.1, vsLM: -10, vsU3M: -8 },
      { nombre: "Subrogación", valor: 0.61, vsLM: -30, vsU3M: -37 },
      { nombre: "Consultas", valor: 0.42, vsLM: -19, vsU3M: -4 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.36, vsLM: -7, vsU3M: -10 },
      { nombre: "Imágenes", valor: 0.07, vsLM: -47, vsU3M: -23 },
      { nombre: "Wellness", valor: 0.04, vsLM: -22, vsU3M: 46 },
      { nombre: "Otros", valor: 0.03, vsLM: -29, vsU3M: -12 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.39, vsLM: -9, vsU3M: -6 },
      { nombre: "Congelación de Gametos", valor: 2.82, vsLM: -20, vsU3M: 15 },
      { nombre: "Farmacia", valor: 2.28, vsLM: -3, vsU3M: -7 },
      { nombre: "Laboratorio", valor: 1.66, vsLM: -21, vsU3M: -5 },
      { nombre: "Subrogación", valor: 0.6, vsLM: -29, vsU3M: -37 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.26, vsLM: -24, vsU3M: -21 },
      { nombre: "Consultas", valor: 0.21, vsLM: -20, vsU3M: -10 },
      { nombre: "Imágenes", valor: 0.06, vsLM: -49, vsU3M: -21 },
      { nombre: "Wellness", valor: 0.03, vsLM: -15, vsU3M: 54 },
      { nombre: "Otros", valor: 0.03, vsLM: -37, vsU3M: -4 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.45, vsLM: 0, vsU3M: 0 },
      { nombre: "Laboratorio", valor: 0.34, vsLM: 105, vsU3M: -20 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.32, vsLM: -21, vsU3M: -33 },
      { nombre: "Farmacia", valor: 0.31, vsLM: 129, vsU3M: 7 },
      { nombre: "Consultas", valor: 0.19, vsLM: -14, vsU3M: 4 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.09, vsLM: 139, vsU3M: 60 },
      { nombre: "Imágenes", valor: 0.01, vsLM: -37, vsU3M: -27 },
      { nombre: "Wellness", valor: 0.01, vsLM: -37, vsU3M: 21 },
      { nombre: "Otros", valor: 0.01, vsLM: 114, vsU3M: -38 },
      { nombre: "Subrogación", valor: 0.0, vsLM: -79, vsU3M: -38 },
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.19, vsLM: 17, vsU3M: -18 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.16, vsLM: 133, vsU3M: 9 },
      { nombre: "Laboratorio", valor: 0.11, vsLM: 92, vsU3M: -8 },
      { nombre: "Congelación de Gametos", valor: 0.05, vsLM: -54, vsU3M: -38 },
      { nombre: "Consultas", valor: 0.02, vsLM: -41, vsU3M: -5 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.01, vsLM: null, vsU3M: -38, nuevo: true },
      { nombre: "Imágenes", valor: 0.0, vsLM: -32, vsU3M: -38 },
      { nombre: "Wellness", valor: 0.0, vsLM: -79, vsU3M: -38 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  highlights: {
    total: [
      "Octubre lleva 11 días de Real (corte 11-oct, leído de vRepro), así que la proyección ($13.59M) tiene confianza media. Es una proyección CENTRAL: MTD + días hábiles restantes × ritmo mediano feb-sep por día hábil equivalente (backtest ene-sep: error medio ~0%, típico ±9%). Queda 11% debajo de septiembre ($15.22M) y 31% arriba de octubre 2025 ($10.37M). Frente al corte del 5-oct sube +$100K: el vie 9-oct ($948K) y el jue 8-oct ($430K) compensaron los días flojos (mar 6-oct $220K, dom 4-oct $53K); la dispersión diaria sigue siendo alta.",
      "Septiembre quedó CERRADO sin proyección (Proyectado = Real = $15.22M) y agosto se re-clasificó con ConceptosHier ($16.11M) — las comparaciones vs LM de octubre usan estas cifras ya cerradas.",
      "Atenciones (3,077) y Pacientes (1,010) proyectan -13% y -24% vs septiembre (3,543 y 1,323) frente a -11% de Ingresos: septiembre tuvo un pico de pacientes únicos que el ratio promedio jul-sep (pacientes/atención) solo recoge en parte. Sin techo por ticket: el ticket de GDL y MTP ya no es estable.",
      "Consultas: 84 reales (1-10 oct) más 127 ya agendadas del 12 al 31 oct — la proyección (211) crece a medida que se agenden nuevas citas, no es un techo.",
      "El % de No Show de octubre (14.3%) sale de 14 inasistencias sobre 98 citas de primera vez (84 terminadas + 14 no show): ya con muestra razonable; el promedio ene-sep es 13.9%.",
      "Prueba vRepro: del 6 al 11 oct los cargos y citas se leyeron directo de vRepro (médico = Profesional Historia; medicamentos de Farmacia a nivel producto). Servicios, conceptos y consultas usan tu archivo Clasificación 4 (2026); el ranking de consultas agrupa según la hoja 'consultas' (Check-up SOMP y Check up Integral no están en el archivo y se muestran como grupos aparte).",
    ],
    CDMX: [
      "Con 11 días de Real, CDMX concentra ~85% del ingreso MTD de octubre ($3.94M de $4.63M); proyecta $11.33M (-15% vs septiembre).",
      "Atenciones proy (2,264) = promedio de pacing (2,240) y ritmo jul-sep por día hábil (2,289); Pacientes proy (690) = Atenciones × 0.3046. Ambos sin techo por ticket.",
    ],
    GDL: [
      "GDL lleva $537K en 11 días y proyecta $1.72M (+18% vs septiembre) con la mezcla jul-sep de sedes; conviene vigilar si el ritmo real lo confirma en la segunda quincena.",
      "Atenciones proy (589) vs 181 reales: promedio entre el pacing del día 11 (578) y el ritmo jul-sep por día hábil (600); agosto cerró en 751 y septiembre en 660, así que sigue siendo una cifra prudente.",
    ],
    MTP: [
      "Metepec: pocos cargos por día y curva muy escalonada — la proyección de octubre (~$0.54M, repartida con la mezcla jul-sep de sedes) es la cifra menos confiable de las 3 sedes en este corte.",
      "Septiembre cerró en $431K; el comparativo vs LM de octubre (+24%) se vuelve informativo hasta que haya más días de Real.",
    ],
  },

  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 29, vsLM: -81 },
      { nombre: "Check-up SOMP", valor: 17, vsLM: -23 },
      { nombre: "Fertility Check up Mujeres", valor: 16, vsLM: -72 },
      { nombre: "Check up Ginecologico", valor: 11, vsLM: -74 },
      { nombre: "Fertility Check up Parejas", valor: 7, vsLM: -59 },
      { nombre: "Fertility Check up Hombres", valor: 2, vsLM: -67 },
      { nombre: "Check up Integral", valor: 2, vsLM: -87 },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 14, vsLM: -84 },
      { nombre: "Fertility Check up Mujeres", valor: 11, vsLM: -67 },
      { nombre: "Fertility Check up Parejas", valor: 4, vsLM: -50 },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -75 },
      { nombre: "Check up Ginecologico", valor: 1, vsLM: -83 },
      { nombre: "Check-up SOMP", valor: 1, vsLM: 0 },
      { nombre: "Check up Integral", valor: 1, vsLM: null, nuevo: true },
    ],
    GDL: [
      { nombre: "Check-up SOMP", valor: 14, vsLM: -33 },
      { nombre: "Check up Ginecologico", valor: 9, vsLM: -67 },
      { nombre: "Consulta primera vez", valor: 5, vsLM: -82 },
      { nombre: "Fertility Check up Mujeres", valor: 4, vsLM: -80 },
      { nombre: "Fertility Check up Parejas", valor: 3, vsLM: -40 },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -50 },
      { nombre: "Check up Integral", valor: 1, vsLM: -93 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 10, vsLM: -70 },
      { nombre: "Check-up SOMP", valor: 2, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: -80 },
      { nombre: "Check up Ginecologico", valor: 1, vsLM: -89 },
    ],
  },

  hubspot: {
    leads: { hist: [834, 1062, 1021, 1000, 1754, 1436, 1533, 1924, 2108], actual: 689 },
    citas: { hist: [188, 230, 318, 329, 367, 315, 416, 504, 458], actual: 158 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 23 },
    // Octubre parcial (1-11 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,22,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,24,null,null], total2026: 21 },
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
      { mes: "Sep-26", leads: 2108, m0: 20, m1: 0, m2: 0, sin: 80 },
      { mes: "Oct-26", leads: 689, m0: 17, m1: 0, m2: 0, sin: 83 }, // OCTUBRE parcial (1-11 oct): m0 = 117 de 689 leads con cita en el mismo mes; m1/m2 todavía no pueden existir
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
        "Programa Activo": { pacientes: 1, ingreso: 0.0, ticket: 0.0 },
      },
      totalPacientesYTD: { "Valoración": 142, "Programa Activo": 20 },
      ingresoYTD: 4090517.11,
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
        "Programa Activo": { pacientes: 1, ingreso: 0.0, ticket: 0.0 },
      },
      totalPacientesYTD: { "Valoración": 143, "Programa Activo": 21 },
      ingresoYTD: 4126724.0,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  conceptos: {},
};
