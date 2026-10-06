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
  // ACTUALIZADO 6-oct-2026: CORTE DE OCTUBRE (5-oct, 5 días de Real) con
  // Cargos_y_Facturas_41.xlsx, Consultas_21.xlsx y Cargos_y_consultas_2025_1.xlsx.
  // Proyección CENTRAL de octubre (MTD + días hábiles restantes × ritmo mediano
  // feb-sep); septiembre CERRADO (Proyectado = Real) y agosto re-clasificado por
  // ConceptosHier (total agosto $16,106,074). HubSpot (Interesa2) al 1-5 oct.
  corte: "5-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], actual: 2.07, proy: 13.49, vsLM: -11, vsU3M: -7, nota: "OCTUBRE (corte 5-oct, 5 días de Real, Cargos_y_Facturas_41.xlsx): Real $2,069,512; Proyectado central $13,487,632 = Real MTD + días hábiles restantes (ponderados: lun-vie 1, sáb 0.55, dom 0.07) × ritmo mediano feb-sep ($533K por día hábil equivalente), repartido a sedes y servicios con la mezcla jul-sep. Backtest ene-sep: error medio ~0%, típico ±9% (rango -18% a +15%). Octubre 2025 cerró en $10.37M. Confianza media-baja: solo 5 días de Real, con dispersión alta entre días (lun 5-oct $694K vs vie 2-oct $175K). Septiembre quedó CERRADO (Proyectado = Real = $15,216,602); agosto quedó en $16,106,074 tras re-clasificar por ConceptosHier." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3106, 3543], actual: 487, proy: 3186, vsLM: -10, vsU3M: 4, nota: "OCTUBRE MTD al 5-oct: 487 líneas de cargo (suma CDMX+GDL+MTP). Proyección 3,186 (CDMX 2,295 + GDL 597 + MTP 294) = promedio de (Real ÷ share mediano de atenciones al día 5) y (Real + días hábiles equivalentes restantes × ritmo por día hábil de jul-sep). Sin techo por ticket (el ticket ya no es estable: GDL cayó de ~$4.7K a $2.2K en septiembre)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1000, 1323], actual: 290, proy: 1046, vsLM: -21, vsU3M: 2, nota: "OCTUBRE MTD al 5-oct: 290 pacientes únicos (suma de sedes, dedup por Historia dentro de cada sede). Proyección = max(Real, Atenciones proy × ratio pacientes/atención promedio jul-sep): total 1,046 (CDMX 699 + GDL 248 + MTP 99)." },
    consultas: { hist: [168, 167, 235, 220, 225, 271, 255, 316, 320], real: 30, agendado: 135, proy: 165, vsLM: -48, vsU3M: -44, nota: "OCTUBRE con Consultas_21.xlsx (corte 5-oct): real 30 (Terminada + Primera Vez, 1-5 oct) + agendado 135 (hoja Citas agendadas, citas futuras de octubre) = proy 165. Poca historia del mes: la cifra se llenará conforme avancen las citas." },
    noshow: { hist: [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], actual: 14.3, prom: 13.9, deltaPts: 0.4 },
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], actual: 1.68, proy: 11.11, vsLM: -17, vsU3M: -7, nota: "OCTUBRE MTD al 5-oct: Real $1,678,853; Proyectado central $11,108,471. Septiembre cerrado en $13,328,714 (Proy = Real)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2069, 2658], actual: 367, proy: 2295, vsLM: -14, vsU3M: 4, nota: "367 líneas al 5-oct; proy 2,295 = promedio de pacing (2,300) y ritmo jul-sep por día hábil (2,290); sin techo por ticket." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 618, 931], actual: 219, proy: 699, vsLM: -25, vsU3M: 2, nota: "219 pacientes únicos al 5-oct; proy = Atenciones proy × 0.3046 (ratio promedio jul-sep)." },
      consultas: { hist: [127, 105, 144, 145, 133, 169, 141, 137, 145], real: 10, agendado: 68, proy: 78, vsLM: -46, vsU3M: -45, top_cat: "Consulta primera vez", top_n: 3 },
      noshow: { hist: [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], actual: 0.0, prom: 12.1, deltaPts: -12.1 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], actual: 0.27, proy: 1.78, vsLM: 22, vsU3M: -7, nota: "OCTUBRE MTD al 5-oct: Real $272,561; Proyectado central $1,780,501. Septiembre cerrado en $1,456,406 (Proy = Real)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751, 660], actual: 75, proy: 597, vsLM: -10, vsU3M: -3, nota: "75 líneas al 5-oct; proy 597 = promedio de pacing (584) y ritmo jul-sep por día hábil (610); sin techo por ticket (agosto 751, septiembre 660)." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287, 299], actual: 50, proy: 248, vsLM: -17, vsU3M: -2, nota: "50 pacientes únicos al 5-oct; proy = Atenciones proy × 0.4147 (ratio promedio jul-sep)." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133, 123], real: 13, agendado: 47, proy: 60, vsLM: -51, vsU3M: -48, top_cat: "Check-up SOMP", top_n: 5 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], actual: 13.3, prom: 14.7, deltaPts: -1.4 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], actual: 0.12, proy: 0.6, vsLM: 39, vsU3M: -1, nota: "OCTUBRE MTD al 5-oct: Real $118,098; Proyectado central $598,660. Septiembre cerrado en $431,482 (Proy = Real). Sede chica: pocas líneas por día, su curva es la más volátil de las 3 sedes." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286, 225], actual: 45, proy: 294, vsLM: 31, vsU3M: 20, nota: "45 líneas al 5-oct; proy 294 = promedio de pacing (331) y ritmo jul-sep por día hábil (258)." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95, 93], actual: 21, proy: 99, vsLM: 6, vsU3M: 20, nota: "21 pacientes únicos al 5-oct; proy = max(Real, Atenciones proy × 0.3382, ratio promedio jul-sep)." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46, 52], real: 7, agendado: 20, proy: 27, vsLM: -48, vsU3M: -35, top_cat: "Consulta primera vez", top_n: 6 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], actual: 30.0, prom: 21.6, deltaPts: 8.4 },
    },
  },

  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.76, vsLM: -10, vsU3M: -11 },
      { nombre: "Congelación de Gametos", valor: 3.18, vsLM: -22, vsU3M: 6 },
      { nombre: "Farmacia", valor: 2.71, vsLM: 3, vsU3M: -9 },
      { nombre: "Laboratorio", valor: 2.16, vsLM: -7, vsU3M: -5 },
      { nombre: "Subrogación", valor: 0.77, vsLM: -12, vsU3M: -21 },
      { nombre: "Consultas", valor: 0.41, vsLM: -21, vsU3M: -6 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.38, vsLM: -2, vsU3M: -7 },
      { nombre: "Imágenes", valor: 0.08, vsLM: -41, vsU3M: -14 },
      { nombre: "Wellness", valor: 0.03, vsLM: -46, vsU3M: 1 },
      { nombre: "Otros", valor: 0.02, vsLM: -22, vsU3M: 1 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.19, vsLM: -14, vsU3M: -12 },
      { nombre: "Congelación de Gametos", valor: 2.67, vsLM: -24, vsU3M: 8 },
      { nombre: "Farmacia", valor: 2.24, vsLM: -4, vsU3M: -9 },
      { nombre: "Laboratorio", valor: 1.66, vsLM: -21, vsU3M: -4 },
      { nombre: "Subrogación", valor: 0.76, vsLM: -11, vsU3M: -21 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.27, vsLM: -22, vsU3M: -20 },
      { nombre: "Consultas", valor: 0.22, vsLM: -18, vsU3M: -8 },
      { nombre: "Imágenes", valor: 0.06, vsLM: -46, vsU3M: -16 },
      { nombre: "Wellness", valor: 0.02, vsLM: -43, vsU3M: 4 },
      { nombre: "Otros", valor: 0.02, vsLM: -43, vsU3M: 12 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.44, vsLM: -3, vsU3M: -2 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.39, vsLM: -5, vsU3M: -18 },
      { nombre: "Laboratorio", valor: 0.39, vsLM: 143, vsU3M: -7 },
      { nombre: "Farmacia", valor: 0.26, vsLM: 92, vsU3M: -10 },
      { nombre: "Consultas", valor: 0.17, vsLM: -20, vsU3M: -4 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.1, vsLM: 144, vsU3M: 66 },
      { nombre: "Imágenes", valor: 0.01, vsLM: -12, vsU3M: 1 },
      { nombre: "Otros", valor: 0.01, vsLM: null, vsU3M: -21, nuevo: true },
      { nombre: "Subrogación", valor: 0.01, vsLM: -74, vsU3M: -21 },
      { nombre: "Wellness", valor: 0.0, vsLM: -54, vsU3M: -6 },
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.2, vsLM: 29, vsU3M: -9 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.19, vsLM: 170, vsU3M: 26 },
      { nombre: "Laboratorio", valor: 0.11, vsLM: 91, vsU3M: -8 },
      { nombre: "Congelación de Gametos", valor: 0.07, vsLM: -36, vsU3M: -13 },
      { nombre: "Consultas", valor: 0.02, vsLM: -46, vsU3M: -12 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.01, vsLM: null, vsU3M: -21, nuevo: true },
      { nombre: "Imágenes", valor: 0.01, vsLM: -13, vsU3M: -21 },
      { nombre: "Wellness", valor: 0.0, vsLM: -74, vsU3M: -21 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  highlights: {
    total: [
      "Octubre lleva 5 días de Real (corte 5-oct), así que la proyección ($13.49M) tiene confianza media-baja. Es una proyección CENTRAL: MTD + días hábiles restantes × ritmo mediano feb-sep por día hábil equivalente (backtest ene-sep: error medio ~0%, típico ±9%). Queda 11% debajo de septiembre ($15.22M) y 30% arriba de octubre 2025 ($10.37M). Frente al corte del 4-oct sube +$160K porque el lunes 5-oct fue un día fuerte ($694K) mientras el vie 2-oct ($175K) y el dom 4-oct ($55K) fueron bajos: la dispersión diaria es alta con tan pocos días.",
      "Septiembre quedó CERRADO sin proyección (Proyectado = Real = $15.22M) y agosto se re-clasificó con ConceptosHier ($16.11M) — las comparaciones vs LM de octubre usan estas cifras ya cerradas.",
      "Atenciones (3,186) y Pacientes (1,046) proyectan -10% y -21% vs septiembre (3,543 y 1,323) frente a -11% de Ingresos: septiembre tuvo un pico de pacientes únicos que el ratio promedio jul-sep (pacientes/atención) solo recoge en parte. Sin techo por ticket: el ticket de GDL y MTP ya no es estable.",
      "Consultas: 30 reales (1-5 oct) más 135 agendadas para el resto del mes — la proyección (165) crece a medida que se agenden nuevas citas, no es un techo.",
      "El % de No Show de octubre (14.3%) sale de 5 inasistencias sobre 35 citas de primera vez (30 terminadas + 5 no show): muestra todavía chica; el promedio ene-sep es 13.9%.",
    ],
    CDMX: [
      "Con 5 días de Real, CDMX concentra ~81% del ingreso MTD de octubre ($1.68M de $2.07M) — todavía sin lectura de mezcla confiable; proyecta $11.1M.",
      "Atenciones proy (2,295) = promedio de pacing (2,300) y ritmo jul-sep por día hábil (2,290); Pacientes proy (699) = Atenciones × 0.3046. Ambos sin techo por ticket.",
    ],
    GDL: [
      "GDL arranca octubre con un Real bajo en los primeros 5 días ($273K) pero proyecta $1.78M (+22% vs septiembre) por la mezcla jul-sep de sedes; conviene vigilar si el ritmo real lo confirma en la segunda semana.",
      "Atenciones proy (597) vs 75 reales: promedio entre el pacing del día 5 (584) y el ritmo jul-sep por día hábil (610); agosto cerró en 751 y septiembre en 660, así que sigue siendo una cifra prudente.",
    ],
    MTP: [
      "Metepec: pocos cargos por día y curva muy escalonada — la proyección de octubre (~$0.60M, repartida con la mezcla jul-sep de sedes) es la cifra menos confiable de las 3 sedes en este corte.",
      "Septiembre cerró en $431K; el comparativo vs LM de octubre (+39%) se vuelve informativo hasta que haya más días de Real.",
    ],
  },

  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 11, vsLM: -93 },
      { nombre: "Check-up SOMP", valor: 6, vsLM: -73 },
      { nombre: "Check up Ginecologico", valor: 5, vsLM: -88 },
      { nombre: "Fertility Check up Mujeres", valor: 4, vsLM: -93 },
      { nombre: "Fertility Check up Hombres", valor: 2, vsLM: -67 },
      { nombre: "Fertility Check up Parejas", valor: 1, vsLM: -94 },
      { nombre: "Check up Integral", valor: 1, vsLM: -93 },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 3, vsLM: -97 },
      { nombre: "Fertility Check up Mujeres", valor: 3, vsLM: -91 },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -75 },
      { nombre: "Fertility Check up Parejas", valor: 1, vsLM: -88 },
      { nombre: "Check up Integral", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Check-up SOMP", valor: 1, vsLM: 0 },
    ],
    GDL: [
      { nombre: "Check-up SOMP", valor: 5, vsLM: -76 },
      { nombre: "Check up Ginecologico", valor: 5, vsLM: -81 },
      { nombre: "Consulta primera vez", valor: 2, vsLM: -93 },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -50 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 6, vsLM: -82 },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: -80 },
    ],
  },

  hubspot: {
    leads: { hist: [834, 1062, 1021, 1000, 1754, 1436, 1533, 1924, 2108], actual: 305 },
    citas: { hist: [188, 230, 318, 329, 367, 315, 416, 504, 458], actual: 85 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 28 },
    // Octubre parcial (1-5 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,28,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,28,null,null], total2026: 21 },
      MTP: { mensual: [24,28,38,46,19,14,32,36,34,36,null,null], total2026: 32 },
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
      { mes: "Oct-26", leads: 305, m0: 16, m1: 0, m2: 0, sin: 84 }, // OCTUBRE parcial (1-5 oct): m0 = 48 de 305 leads con cita en el mismo mes; m1/m2 todavía no pueden existir
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
        "Valoración":      { pacientes: 1, ingreso: 1422.41, ticket: 1422.41 },
        "Programa Activo": { pacientes: 1, ingreso: 0.0, ticket: 0.0 },
      },
      totalPacientesYTD: { "Valoración": 137, "Programa Activo": 20 },
      ingresoYTD: 4083405.06,
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
        "Valoración":      { pacientes: 1, ingreso: 1422.41, ticket: 1422.41 },
        "Programa Activo": { pacientes: 1, ingreso: 0.0, ticket: 0.0 },
      },
      totalPacientesYTD: { "Valoración": 138, "Programa Activo": 21 },
      ingresoYTD: 4119611.95,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  conceptos: {},
};
