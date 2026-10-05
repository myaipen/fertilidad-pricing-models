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
  // ACTUALIZADO 5-oct-2026: CORTE DE OCTUBRE (4-oct, 4 días de Real) con
  // Cargos_y_Facturas_40.xlsx y Consultas_20.xlsx. Octubre pasa a ser el mes
  // vigente con proyección conservadora (curvas recalibradas feb-sep);
  // septiembre queda CERRADO (Proyectado = Real, sin proyección) y agosto se
  // re-clasificó por ConceptosHier (total agosto $16,106,074).
  corte: "4-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], actual: 1.38, proy: 13.33, vsLM: -12, vsU3M: -8, nota: "OCTUBRE (corte 4-oct, 4 días de Real, Cargos_y_Facturas_40.xlsx): Real $1,376,128; Proyectado central $13,327,555 = Real MTD + días hábiles restantes (ponderados: lun-vie 1, sáb 0.55, dom 0.07) × ritmo mediano feb-sep ($533K por día hábil equivalente), repartido a sedes y servicios con la mezcla jul-sep. Backtest ene-sep al día 4: error medio ~0%, típico ±9% (rango -18% a +15%). El piso conservador por pacing máximo era $10.79M; octubre 2025 cerró en $10.37M. Confianza media-baja: solo 4 días de Real. Septiembre quedó CERRADO (Proyectado = Real = $15,216,602); agosto quedó en $16,106,074 tras re-clasificar por ConceptosHier." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3106, 3543], actual: 330, proy: 2985, vsLM: -16, vsU3M: -3, nota: "OCTUBRE MTD al 4-oct: 330 líneas de cargo (suma CDMX+GDL+MTP). Proyección 2,985 (CDMX 2,202 + GDL 554 + MTP 229) = promedio de (Real ÷ share mediano de atenciones al día 4) y (Real + días hábiles equivalentes restantes × ritmo por día hábil de jul-sep). Sin techo por ticket (el ticket ya no es estable: GDL cayó de ~$4.7K a $2.2K en septiembre)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1000, 1323], actual: 221, proy: 978, vsLM: -26, vsU3M: -4, nota: "OCTUBRE MTD al 4-oct: 221 pacientes únicos (suma de sedes, dedup por Historia dentro de cada sede). Proyección = max(Real, Atenciones proy × ratio pacientes/atención promedio jul-sep): total 978 (CDMX 671 + GDL 230 + MTP 77)." },
    consultas: { hist: [168, 167, 235, 220, 225, 271, 255, 316, 320], real: 16, agendado: 135, proy: 151, vsLM: -53, vsU3M: -49, nota: "OCTUBRE con Consultas_20.xlsx (corte 4-oct): real 16 (Terminada + Primera Vez, 1-4 oct) + agendado 135 (hoja Citas agendadas, citas futuras de octubre) = proy 151. Poca historia del mes: la cifra se llenará conforme avancen las citas." },
    noshow: { hist: [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], actual: 20.0, prom: 13.9, deltaPts: 6.1 },
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], actual: 1.14, proy: 11.01, vsLM: -17, vsU3M: -8, nota: "OCTUBRE MTD al 4-oct: Real $1,135,372; Proyectado central $11,005,420. Septiembre cerrado en $13,328,714 (Proy = Real)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2069, 2658], actual: 261, proy: 2202, vsLM: -17, vsU3M: 0, nota: "261 líneas al 4-oct; proy 2,202 = promedio de pacing (2,131) y ritmo jul-sep por día hábil (2,273); sin techo por ticket." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 618, 931], actual: 178, proy: 671, vsLM: -28, vsU3M: -2, nota: "178 pacientes únicos al 4-oct; proy = Atenciones proy × 0.3046 (ratio promedio jul-sep)." },
      consultas: { hist: [127, 105, 144, 145, 133, 169, 141, 137, 145], real: 5, agendado: 67, proy: 72, vsLM: -50, vsU3M: -49, top_cat: "Fertility Check up Parejas", top_n: 1 },
      noshow: { hist: [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], actual: 0.0, prom: 12.1, deltaPts: -12.1 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], actual: 0.15, proy: 1.73, vsLM: 19, vsU3M: -9, nota: "OCTUBRE MTD al 4-oct: Real $151,348; Proyectado central $1,729,719. Septiembre cerrado en $1,456,406 (Proy = Real)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751, 660], actual: 45, proy: 554, vsLM: -16, vsU3M: -10, nota: "45 líneas al 4-oct; proy 554 = promedio de pacing (504) y ritmo jul-sep por día hábil (605); sin techo por ticket (agosto 751, septiembre 660)." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287, 299], actual: 30, proy: 230, vsLM: -23, vsU3M: -9, nota: "30 pacientes únicos al 4-oct; proy = Atenciones proy × 0.4147 (ratio promedio jul-sep)." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133, 123], real: 8, agendado: 40, proy: 48, vsLM: -61, vsU3M: -58, top_cat: "Check up Ginecológico", top_n: 4 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], actual: 20.0, prom: 14.7, deltaPts: 5.3 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], actual: 0.09, proy: 0.59, vsLM: 37, vsU3M: -3, nota: "OCTUBRE MTD al 4-oct: Real $89,409; Proyectado central $592,416. Septiembre cerrado en $431,482 (Proy = Real). Sede chica: pocas líneas por día, su curva es la más volátil de las 3 sedes." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286, 225], actual: 24, proy: 229, vsLM: 2, vsU3M: -6, nota: "24 líneas al 4-oct; proy 229 = promedio de pacing (212) y ritmo jul-sep por día hábil (247)." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95, 93], actual: 13, proy: 77, vsLM: -17, vsU3M: -7, nota: "13 pacientes únicos al 4-oct; proy = max(Real, Atenciones proy × 0.3382, ratio promedio jul-sep)." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46, 52], real: 3, agendado: 28, proy: 31, vsLM: -40, vsU3M: -26, top_cat: "Consulta primera vez", top_n: 3 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], actual: 40.0, prom: 21.6, deltaPts: 18.4 },
    },
  },

  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.75, vsLM: -11, vsU3M: -11 },
      { nombre: "Congelación de Gametos", valor: 3.18, vsLM: -22, vsU3M: 6 },
      { nombre: "Farmacia", valor: 2.65, vsLM: 0, vsU3M: -11 },
      { nombre: "Laboratorio", valor: 2.02, vsLM: -13, vsU3M: -11 },
      { nombre: "Subrogación", valor: 0.8, vsLM: -8, vsU3M: -17 },
      { nombre: "Consultas", valor: 0.4, vsLM: -22, vsU3M: -7 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.4, vsLM: 3, vsU3M: -3 },
      { nombre: "Imágenes", valor: 0.08, vsLM: -41, vsU3M: -13 },
      { nombre: "Wellness", valor: 0.03, vsLM: -44, vsU3M: 5 },
      { nombre: "Otros", valor: 0.03, vsLM: -19, vsU3M: 4 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.16, vsLM: -15, vsU3M: -12 },
      { nombre: "Congelación de Gametos", valor: 2.73, vsLM: -22, vsU3M: 11 },
      { nombre: "Farmacia", valor: 2.21, vsLM: -6, vsU3M: -10 },
      { nombre: "Laboratorio", valor: 1.51, vsLM: -28, vsU3M: -13 },
      { nombre: "Subrogación", valor: 0.79, vsLM: -7, vsU3M: -17 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.28, vsLM: -19, vsU3M: -17 },
      { nombre: "Consultas", valor: 0.22, vsLM: -18, vsU3M: -7 },
      { nombre: "Imágenes", valor: 0.06, vsLM: -45, vsU3M: -14 },
      { nombre: "Wellness", valor: 0.02, vsLM: -41, vsU3M: 7 },
      { nombre: "Otros", valor: 0.02, vsLM: -41, vsU3M: 16 },
    ],
    GDL: [
      { nombre: "Laboratorio", valor: 0.4, vsLM: 153, vsU3M: -4 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.39, vsLM: -4, vsU3M: -17 },
      { nombre: "Congelación de Gametos", valor: 0.38, vsLM: -16, vsU3M: -16 },
      { nombre: "Farmacia", valor: 0.25, vsLM: 83, vsU3M: -14 },
      { nombre: "Consultas", valor: 0.17, vsLM: -22, vsU3M: -6 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.11, vsLM: 159, vsU3M: 76 },
      { nombre: "Imágenes", valor: 0.01, vsLM: -19, vsU3M: -6 },
      { nombre: "Otros", valor: 0.01, vsLM: null, vsU3M: -17, nuevo: true },
      { nombre: "Subrogación", valor: 0.01, vsLM: -72, vsU3M: -17 },
      { nombre: "Wellness", valor: 0.01, vsLM: -53, vsU3M: -2 },
    ],
    MTP: [
      { nombre: "Tratamientos FIV/ICSI", valor: 0.19, vsLM: 178, vsU3M: 29 },
      { nombre: "Farmacia", valor: 0.19, vsLM: 21, vsU3M: -15 },
      { nombre: "Laboratorio", valor: 0.11, vsLM: 88, vsU3M: -10 },
      { nombre: "Congelación de Gametos", valor: 0.07, vsLM: -33, vsU3M: -9 },
      { nombre: "Consultas", valor: 0.02, vsLM: -49, vsU3M: -17 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.01, vsLM: null, vsU3M: -17, nuevo: true },
      { nombre: "Imágenes", valor: 0.01, vsLM: -9, vsU3M: -17 },
      { nombre: "Wellness", valor: 0.0, vsLM: -72, vsU3M: -17 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  highlights: {
    total: [
      "Octubre arranca con solo 4 días de Real (corte 4-oct), así que la proyección ($13.33M) tiene confianza media-baja. Es una proyección CENTRAL: MTD + días hábiles restantes × ritmo mediano feb-sep por día hábil equivalente (backtest ene-sep: error medio ~0%, típico ±9%). Queda 12% debajo de septiembre ($15.22M) y 28% arriba de octubre 2025 ($10.37M); el piso conservador por pacing máximo era $10.79M, y con el ritmo de ago-sep sería ~$15-16M.",
      "Septiembre quedó CERRADO sin proyección (Proyectado = Real = $15.22M) y agosto se re-clasificó con ConceptosHier ($16.11M) — las comparaciones vs LM de octubre usan estas cifras ya cerradas.",
      "Atenciones (2,985) y Pacientes (978) proyectan -16% y -26% vs septiembre (3,543 y 1,323) frente a -12% de Ingresos: septiembre tuvo más líneas de bajo valor por paciente (ticket promedio total ~$4.3K vs ~$5.1K mediano) y un salto de pacientes únicos que el ritmo de jul-sep solo recoge en parte. Sin techo por ticket: el ticket de GDL y MTP ya no es estable.",
      "Consultas: 16 reales (1-4 oct) más 135 agendadas para el resto del mes — la proyección (151) crece a medida que se agenden nuevas citas, no es un techo.",
      "El % de No Show de octubre (20%) sale de solo 4 inasistencias sobre 20 citas de primera vez: muestra demasiado chica para sacar conclusiones todavía.",
    ],
    CDMX: [
      "Con 4 días de Real, CDMX concentra ~83% del ingreso MTD de octubre ($1.14M de $1.38M) — todavía sin lectura de mezcla confiable; proyecta $11.0M.",
      "El techo de ticket es la restricción activa de Atenciones y Pacientes proyectados; si el ritmo diario de cargos acelera, Ingresos proy sube y el techo se relaja solo.",
    ],
    GDL: [
      "GDL arranca octubre con un Real muy bajo en los primeros 4 días ($151K) pero proyecta $1.73M (+19% vs septiembre) por la mezcla jul-sep de sedes; conviene vigilar si el ritmo real lo confirma en la segunda semana.",
      "Atenciones proy (554) vs 45 reales: promedio entre el pacing del día 4 (504) y el ritmo jul-sep por día hábil (605); agosto cerró en 751 y septiembre en 660, así que sigue siendo una cifra prudente.",
    ],
    MTP: [
      "Metepec: pocos cargos por día y curva muy escalonada — la proyección de octubre (~$0.59M, repartida con la mezcla jul-sep de sedes) es la cifra menos confiable de las 3 sedes en este corte.",
      "Septiembre cerró en $431K; el comparativo vs LM de octubre se vuelve informativo hasta que haya más días de Real.",
    ],
  },

  consultas_ranking: {
    // Octubre parcial (4 días, solo consultas Terminadas): vsLM = null porque compararía 4 días vs un mes completo.
    total: [
      { nombre: "Consulta primera vez", valor: 5, vsLM: null },
      { nombre: "Check up Ginecologico", valor: 4, vsLM: null },
      { nombre: "Check-up SOMP", valor: 3, vsLM: null },
      { nombre: "Fertility Check up Parejas", valor: 1, vsLM: null },
      { nombre: "Check up Integral", valor: 1, vsLM: null },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: null },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: null },
    ],
    CDMX: [
      { nombre: "Fertility Check up Parejas", valor: 1, vsLM: null },
      { nombre: "Check up Integral", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: null },
      { nombre: "Check-up SOMP", valor: 1, vsLM: null },
      { nombre: "Consulta primera vez", valor: 1, vsLM: null },
    ],
    GDL: [
      { nombre: "Check up Ginecologico", valor: 4, vsLM: null },
      { nombre: "Check-up SOMP", valor: 2, vsLM: null },
      { nombre: "Consulta primera vez", valor: 1, vsLM: null },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: null },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 3, vsLM: null },
    ],
  },

  hubspot: {
    leads: { hist: [834, 1062, 1021, 1000, 1754, 1436, 1533, 1924, 2108], actual: 237 },
    citas: { hist: [188, 230, 318, 329, 367, 315, 416, 504, 458], actual: 62 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 26 },
    // Octubre parcial (1-4 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,29,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,19,null,null], total2026: 21 },
      MTP: { mensual: [24,28,38,46,19,14,32,36,34,46,null,null], total2026: 32 },
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
      { mes: "Oct-26", leads: 237, m0: 14, m1: 0, m2: 0, sin: 86 }, // OCTUBRE parcial (1-4 oct): m0 = 14 de 237 leads con cita en el mismo mes; m1/m2 todavía no pueden existir
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
        "Valoración":      { pacientes: 0, ingreso: 0, ticket: 0 },
        "Programa Activo": { pacientes: 1, ingreso: 0.0, ticket: 0.0 },
      },
      totalPacientesYTD: { "Valoración": 136, "Programa Activo": 20 },
      ingresoYTD: 4081982.65,
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
        "Valoración":      { pacientes: 0, ingreso: 0, ticket: 0 },
        "Programa Activo": { pacientes: 1, ingreso: 0.0, ticket: 0.0 },
      },
      totalPacientesYTD: { "Valoración": 137, "Programa Activo": 21 },
      ingresoYTD: 4118189.54,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  conceptos: {},
};
