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
  // ACTUALIZADO 20-oct-2026: CORTE DE OCTUBRE (19-oct, 19 días de Real):
  // cargos y citas del 1 al 19 oct re-leídos completos directo de vRepro (incluye las
  // modificaciones retroactivas: líneas eliminadas y descuentos); 1-5 oct validados contra
  // Cargos_y_Facturas_41.xlsx y Consultas_21.xlsx.
  // Proyección CENTRAL de octubre (MTD + días hábiles restantes × ritmo mediano
  // feb-sep); septiembre CERRADO (Proyectado = Real) y agosto re-clasificado por
  // ConceptosHier (total agosto $16,106,074). HubSpot (Interesa2) al 1-19 oct.
  corte: "19-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], actual: 9.48, proy: 13.53, vsLM: -11, vsU3M: -6, nota: "OCTUBRE (corte 19-oct, 19 días de Real, vRepro): Real $9,483,788; Proyectado $13,533,342. Proyección por sede fijada a mano: CDMX $11,333,342 (se deja como estaba), Guadalajara $1,700,000 y Metepec $500,000 (el método central daba CDMX $12.74M, GDL $1.62M y MTP $0.62M = $14.97M); servicios repartidos con la mezcla jul-sep (U3M). Octubre 2025 cerró en $10.37M. Confianza media-alta: 19 días de Real (14.9 de 25.0 días hábiles equivalentes); el Real a la fecha cubre 70% de la proyección. El domingo 18-oct no tuvo cargos. Septiembre quedó CERRADO (Proyectado = Real = $15,216,602); agosto quedó en $16,106,074 tras re-clasificar por ConceptosHier." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3106, 3543], actual: 1855, proy: 3078, vsLM: -13, vsU3M: 0, nota: "OCTUBRE MTD al 19-oct: 1,855 líneas de cargo (suma CDMX+GDL+MTP). Proyección 3,078 (CDMX 2,264 + GDL 628 + MTP 186): promedio de (Real ÷ share mediano de atenciones al día 19) y (Real + días hábiles equivalentes restantes × ritmo por día hábil de jul-sep), escalado en GDL y Metepec para ser consistente con su proyección de ingreso manual ($1.7M y $0.5M); CDMX ajustada junto con su ingreso. Sin techo por ticket (el ticket ya no es estable: GDL cayó de ~$4.7K a $2.2K en septiembre)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1000, 1323], actual: 683, proy: 1013, vsLM: -23, vsU3M: -1, nota: "OCTUBRE MTD al 19-oct: 683 pacientes únicos (suma de sedes, dedup por Historia dentro de cada sede). Proyección = max(Real, Atenciones proy × ratio pacientes/atención promedio jul-sep): total 1,013 (CDMX 690 + GDL 260 + MTP 63)." },
    consultas: { hist: [153, 154, 224, 208, 219, 262, 249, 309, 316], real: 167, agendado: 95, proy: 262, vsLM: -17, vsU3M: -10, nota: "OCTUBRE (corte 19-oct): real 167 (Terminada + Primera Vez, 1-19 oct, vRepro) + agendado 95 (citas de primera vez ya agendadas del 20 al 31 oct en vRepro, incluye las Confirmadas/Terminadas del 20-oct) = proy 262. Poca historia del mes: la cifra crece conforme se agenden nuevas citas." },
    noshow: { hist: [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], actual: 16.9, prom: 13.9, deltaPts: 3.0 },
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], actual: 8.19, proy: 11.33, vsLM: -15, vsU3M: -5, nota: "OCTUBRE MTD al 19-oct: Real $8,194,106; Proyectado $11,333,342 (ajuste manual: se mantiene el nivel fijado en el corte 11-oct; el método daba $12.74M). Septiembre cerrado en $13,328,714 (Proy = Real)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2069, 2658], actual: 1376, proy: 2264, vsLM: -15, vsU3M: 2, nota: "1,376 líneas al 19-oct; proy 2,264 (ajuste manual junto con el ingreso); sin techo por ticket." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 618, 931], actual: 477, proy: 690, vsLM: -26, vsU3M: 1, nota: "477 pacientes únicos al 19-oct; proy 690 = Atenciones proy × 0.3046 (ratio promedio jul-sep)." },
      consultas: { hist: [112, 92, 133, 133, 127, 160, 135, 130, 141], real: 76, agendado: 58, proy: 134, vsLM: -5, vsU3M: -1, top_cat: "Consulta primera vez", top_n: 77 },
      noshow: { hist: [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], actual: 14.6, prom: 12.1, deltaPts: 2.5 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], actual: 0.9, proy: 1.7, vsLM: 17, vsU3M: -11, nota: "OCTUBRE MTD al 19-oct: Real $895,644; Proyectado $1,700,000 (ajuste manual; el método central daba $1.62M). Septiembre cerrado en $1,456,406 (Proy = Real)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751, 660], actual: 337, proy: 628, vsLM: -5, vsU3M: 2, nota: "337 líneas al 19-oct; proy 628 = proyección del método (596) escalada ×1.123 para ir con el ingreso manual; agosto cerró en 751 y septiembre en 660." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287, 299], actual: 150, proy: 260, vsLM: -13, vsU3M: 2, nota: "150 pacientes únicos al 19-oct; proy 260 = Atenciones proy × 0.4147 (ratio promedio jul-sep)." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133, 123], real: 67, agendado: 29, proy: 96, vsLM: -22, vsU3M: -16, top_cat: "Check-up SOP", top_n: 23 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], actual: 16.3, prom: 14.7, deltaPts: 1.6 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], actual: 0.39, proy: 0.5, vsLM: 16, vsU3M: -18, nota: "OCTUBRE MTD al 19-oct: Real $394,038; Proyectado $500,000 (ajuste manual; el método central daba $0.62M). Septiembre cerrado en $431,482 (Proy = Real). Sede chica: pocas líneas por día." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286, 225], actual: 142, proy: 186, vsLM: -17, vsU3M: -24, nota: "142 líneas al 19-oct; proy 186 = proyección del método (236) escalada ×0.464 para ir con el ingreso manual." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95, 93], actual: 56, proy: 63, vsLM: -32, vsU3M: -24, nota: "56 pacientes únicos al 19-oct; proy 63 = Atenciones proy (186) × 0.3382 (ratio promedio jul-sep)." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46, 52], real: 24, agendado: 8, proy: 32, vsLM: -38, vsU3M: -23, top_cat: "Consulta primera vez", top_n: 27 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], actual: 25.0, prom: 21.6, deltaPts: 3.4 },
    },
  },

  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.84, vsLM: -15, vsU3M: -12 },
      { nombre: "Congelación de Gametos", valor: 2.9, vsLM: -23, vsU3M: 0 },
      { nombre: "Farmacia", valor: 2.65, vsLM: 1, vsU3M: -11 },
      { nombre: "Laboratorio", valor: 2.19, vsLM: -6, vsU3M: -4 },
      { nombre: "Subrogación", valor: 1.15, vsLM: 31, vsU3M: 18 },
      { nombre: "Consultas", valor: 0.38, vsLM: -26, vsU3M: -12 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.29, vsLM: -23, vsU3M: -26 },
      { nombre: "Imágenes", valor: 0.07, vsLM: -52, vsU3M: -30 },
      { nombre: "Wellness", valor: 0.04, vsLM: -15, vsU3M: 58 },
      { nombre: "Otros", valor: 0.03, vsLM: -17, vsU3M: 21 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.3, vsLM: -18, vsU3M: -11 },
      { nombre: "Congelación de Gametos", valor: 2.44, vsLM: -24, vsU3M: 3 },
      { nombre: "Farmacia", valor: 2.13, vsLM: -9, vsU3M: -14 },
      { nombre: "Laboratorio", valor: 1.85, vsLM: -12, vsU3M: 6 },
      { nombre: "Subrogación", valor: 1.15, vsLM: 34, vsU3M: 19 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.21, vsLM: -38, vsU3M: -36 },
      { nombre: "Consultas", valor: 0.16, vsLM: -37, vsU3M: -28 },
      { nombre: "Imágenes", valor: 0.05, vsLM: -60, vsU3M: -38 },
      { nombre: "Wellness", valor: 0.03, vsLM: -7, vsU3M: 68 },
      { nombre: "Otros", valor: 0.01, vsLM: -57, vsU3M: -5 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.44, vsLM: -1, vsU3M: -1 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.33, vsLM: -18, vsU3M: -30 },
      { nombre: "Farmacia", valor: 0.33, vsLM: 140, vsU3M: 12 },
      { nombre: "Laboratorio", valor: 0.28, vsLM: 68, vsU3M: -34 },
      { nombre: "Consultas", valor: 0.2, vsLM: -8, vsU3M: 11 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.08, vsLM: 109, vsU3M: 40 },
      { nombre: "Imágenes", valor: 0.02, vsLM: 33, vsU3M: 54 },
      { nombre: "Otros", valor: 0.01, vsLM: null, vsU3M: 72, nuevo: true },
      { nombre: "Wellness", valor: 0.01, vsLM: -31, vsU3M: 33 },
      { nombre: "Subrogación", valor: 0.0, vsLM: -81, vsU3M: -44 },
    ],
    MTP: [
      { nombre: "Tratamientos FIV/ICSI", valor: 0.21, vsLM: 196, vsU3M: 38 },
      { nombre: "Farmacia", valor: 0.19, vsLM: 21, vsU3M: -15 },
      { nombre: "Laboratorio", valor: 0.07, vsLM: 26, vsU3M: -40 },
      { nombre: "Consultas", valor: 0.02, vsLM: -56, vsU3M: -29 },
      { nombre: "Congelación de Gametos", valor: 0.01, vsLM: -87, vsU3M: -83 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: null, vsU3M: -83, nuevo: true },
      { nombre: "Imágenes", valor: 0.0, vsLM: -81, vsU3M: -83 },
      { nombre: "Wellness", valor: 0.0, vsLM: -94, vsU3M: -83 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  highlights: {
    total: [
      "Octubre lleva 19 días de Real (corte 19-oct, leído de vRepro) y proyecta $13.53M: 11% debajo de septiembre ($15.22M), 6% debajo del promedio de los últimos 3 meses y 31% arriba de octubre 2025 ($10.37M). Confianza media-alta: 14.9 de 25.0 días hábiles equivalentes; el Real a la fecha ($9.48M) ya cubre 70% de la proyección.",
      "Los días fuertes del mes fueron el lun 12-oct ($1.26M), el mié 14-oct ($1.15M), el lun 19-oct ($1.02M, $920K en CDMX), el vie 9-oct ($912K) y el 1-oct ($848K); entre semana el resto de los días ronda $200-600K y el domingo 18-oct no tuvo cargos.",
      "Subrogación es el servicio que más crece vs septiembre (+31% proy, $1.15M) por los paquetes Fresh egg donor y Essentials en CDMX; Tratamientos FIV/ICSI ($3.84M, -15%) y Congelación ($2.90M, -23%) siguen siendo los dos servicios más grandes, pero ambos van por debajo de septiembre.",
      "Atenciones (3,078) y Pacientes (1,013) proyectan -13% y -23% vs septiembre (3,543 y 1,323) frente a -11% de Ingresos: septiembre tuvo un pico de pacientes únicos que el ratio promedio jul-sep solo recoge en parte. Sin techo por ticket.",
      "Consultas: proyección de 296 en octubre (rango 281-315, -7% vs septiembre): 167 reales + 80 de las 95 citas ya agendadas del 20 al 31 (× show rate 83%) + 49 de citas nuevas esperadas. El % de No Show de octubre es 16.9% (34 inasistencias sobre 201 citas de primera vez), arriba del promedio ene-sep de 13.9%.",
      "HubSpot (Interesa2) al 19-oct: 1,209 leads y 292 citas agendadas (24% de conversión mensual parcial); el lunes 19 sumó 65 leads y 22 citas. La cohorte M0 de octubre va en 21% de los leads con cita en el mismo mes (septiembre cerró en 20%, más 1% que agendó en octubre).",
      "Nota de datos: los cargos y citas del 1 al 19 oct se re-leyeron completos de vRepro el 20-oct (hubo 8 líneas eliminadas y 14 con descuento o cambio de precio retroactivos: -$65K vs el corte anterior), directo de vRepro (médico = Profesional Historia; medicamentos de Farmacia a nivel producto). Servicios, conceptos y consultas usan tu archivo Clasificación 4 (2026); el ranking de consultas agrupa Check-up SOMP + SOP en uno y deja Check up Integral aparte, y octubre sale de vRepro (grupo Primera Vez: Terminadas 1–19 oct + Citado/Confirmada 20–31 oct). Los conceptos de donantes de óvulos (Ovodonors en fresco, Viáticos ovodonors) se clasifican hoy en Tratamientos: pendiente de tu revisión.",
    ],
    CDMX: [
      "CDMX concentra 86% del ingreso MTD de octubre ($8.19M de $9.48M) y proyecta $11.33M (-15% vs septiembre, -5% vs U3M); el lun 19-oct facturó $920K, el mié 14-oct $1.02M y el lun 12-oct $1.19M.",
      "Subrogación CDMX lleva $892K en el mes (proy $1.15M, +34% vs LM) y Congelación $1.85M real; Atenciones proy (2,264) y Pacientes proy (690) sin techo por ticket.",
    ],
    GDL: [
      "GDL lleva $896K en 19 días y proyecta $1.70M (+17% vs septiembre, -11% vs U3M); Farmacia (proy +140% vs septiembre) y Laboratorio (+68%) crecen fuerte, mientras FIV/ICSI proyecta -18%.",
      "Atenciones proy (628) vs 337 reales y Pacientes proy (260) vs 150 reales; agosto cerró en 751 atenciones y septiembre en 660.",
    ],
    MTP: [
      "Metepec lleva $394K en 19 días y proyecta $0.50M (+16% vs septiembre, $431K; -18% vs U3M); FIV/ICSI ($180K real) y Farmacia ($153K) concentran el ingreso y el sáb 17-oct fue su mejor día ($82K).",
      "Atenciones proy (186) y Pacientes proy (63) vs 142 y 56 reales; son las cifras más chicas de la red y la sede con mayor % de No Show (25.0%).",
    ],
  },

  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 120, vsLM: -19 },
      { nombre: "Fertility Check up Mujeres", valor: 40, vsLM: -31 },
      { nombre: "Check-up SOP", valor: 29, vsLM: 32 },
      { nombre: "Check up Ginecologico", valor: 27, vsLM: -36 },
      { nombre: "Check up Integral", valor: 16, vsLM: 7 },
      { nombre: "Fertility Check up Parejas", valor: 16, vsLM: -6 },
      { nombre: "Consulta de Primera Vez IP's", valor: 6, vsLM: 50 },
      { nombre: "Fertility Check up Hombres", valor: 3, vsLM: -50 },
      { nombre: "Consulta Obstetricia", valor: 3, vsLM: -25 },
      { nombre: "Consulta obstetrica materno fetal", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Consulta ginecológica", valor: 1, vsLM: -67 },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 77, vsLM: -12 },
      { nombre: "Fertility Check up Mujeres", valor: 28, vsLM: -15 },
      { nombre: "Fertility Check up Parejas", valor: 9, vsLM: 12 },
      { nombre: "Consulta de Primera Vez IP's", valor: 6, vsLM: 50 },
      { nombre: "Check up Ginecologico", valor: 5, vsLM: -17 },
      { nombre: "Check-up SOP", valor: 4, vsLM: 300 },
      { nombre: "Check up Integral", valor: 3, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Hombres", valor: 2, vsLM: -50 },
    ],
    GDL: [
      { nombre: "Check-up SOP", valor: 23, vsLM: 10 },
      { nombre: "Check up Ginecologico", valor: 21, vsLM: -22 },
      { nombre: "Consulta primera vez", valor: 16, vsLM: -43 },
      { nombre: "Check up Integral", valor: 13, vsLM: -13 },
      { nombre: "Fertility Check up Mujeres", valor: 11, vsLM: -45 },
      { nombre: "Fertility Check up Parejas", valor: 6, vsLM: 20 },
      { nombre: "Consulta Obstetricia", valor: 3, vsLM: 0 },
      { nombre: "Consulta obstetrica materno fetal", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -50 },
      { nombre: "Consulta ginecológica", valor: 1, vsLM: -50 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 27, vsLM: -18 },
      { nombre: "Check-up SOP", valor: 2, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Parejas", valor: 1, vsLM: -75 },
      { nombre: "Check up Ginecologico", valor: 1, vsLM: -89 },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: -80 },
    ],
  },

  hubspot: {
    leads: { hist: [833, 1059, 1020, 999, 1752, 1435, 1533, 1921, 2095], actual: 1209 },
    citas: { hist: [188, 230, 318, 328, 367, 315, 418, 501, 468], actual: 292 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 24 },
    // Octubre parcial (1-19 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,26,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,24,null,null], total2026: 21 },
      MTP: { mensual: [24,28,38,46,19,14,32,36,34,32,null,null], total2026: 32 },
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
      { mes: "Oct-26", leads: 1209, m0: 21, m1: 0, m2: 0, sin: 79 }, // OCTUBRE parcial (1-19 oct): m0 = 248 de 1,209 leads con cita en el mismo mes; m1/m2 todavía no pueden existir
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
        "Programa Activo": { pacientes: 5, ingreso: 869224.2, ticket: 173844.84 },
      },
      totalPacientesYTD: { "Valoración": 145, "Programa Activo": 24 },
      ingresoYTD: 4964008.54,
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
        "Programa Activo": { pacientes: 5, ingreso: 869224.2, ticket: 173844.84 },
      },
      totalPacientesYTD: { "Valoración": 146, "Programa Activo": 25 },
      ingresoYTD: 5000215.43,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  conceptos: {},
};
