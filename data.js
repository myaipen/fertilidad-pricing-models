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
  // ACTUALIZADO 27-oct-2026: CORTE DE OCTUBRE (26-oct, 26 días de Real):
  // cargos y citas del 1 al 26 oct re-leídos directo de vRepro (incluye las modificaciones
  // retroactivas del 1 al 25 oct: 5 líneas eliminadas y 24 ajustes de monto, -$52K netos).
  // Proyección de octubre: CDMX y GDL con el método CENTRAL (MTD + días hábiles restantes ×
  // ritmo mediano feb-sep); METEPEC = Real + $50,000 (los médicos se van de vacaciones).
  // Septiembre CERRADO (Proyectado = Real) y agosto re-clasificado por ConceptosHier
  // (total agosto $16,106,074). HubSpot (Interesa2) al 1-26 oct.
  corte: "26-oct-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
  mes_actual: "Oct",

  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.8, 12.1, 12.0, 16.1, 15.2], actual: 13.17, proy: 15.55, vsLM: 2, vsU3M: 8, nota: "OCTUBRE (corte 26-oct, 26 días de Real, vRepro): Real $13,174,836; Proyectado $15,549,259. CDMX $13,205,254 y Guadalajara $1,717,590 salen del método CENTRAL (Real + días hábiles equivalentes restantes × ritmo mediano feb-sep); Metepec $626,415 = Real + $50,000 por supuesto de la dirección (los médicos se van de vacaciones; el método central daría $678,543 y el total sería $15,601,386). Servicios repartidos con la mezcla jul-sep (U3M). Octubre 2025 cerró en $10.37M. Confianza alta: 26 días de Real (20.5 de 25.0 días hábiles equivalentes); el Real a la fecha cubre 85% de la proyección. El lunes 26-oct facturó $757K. Septiembre quedó CERRADO (Proyectado = Real = $15,216,602); agosto quedó en $16,106,074 tras re-clasificar por ConceptosHier." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3106, 3543], actual: 2548, proy: 3095, vsLM: -13, vsU3M: 1, nota: "OCTUBRE MTD al 26-oct: 2,548 líneas de cargo (suma CDMX+GDL+MTP). Proyección 3,095 (CDMX 2,346 + GDL 552 + MTP 197): promedio de (Real ÷ share mediano de atenciones al día 26) y (Real + días hábiles equivalentes restantes × ritmo por día hábil de jul-sep); en Metepec el remanente se escala ×0.49 para ir en línea con Real + $50K (sin ese ajuste serían 218 y el total 3,116). Sin techo por ticket (el ticket ya no es estable)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1000, 1323], actual: 825, proy: 1010, vsLM: -24, vsU3M: -1, nota: "OCTUBRE MTD al 26-oct: 825 pacientes únicos (suma de sedes, dedup por Historia dentro de cada sede). Proyección = max(Real, Atenciones proy × ratio pacientes/atención promedio jul-sep): total 1,010 (CDMX 714 + GDL 229 + MTP 67)." },
    consultas: { hist: [153, 154, 224, 208, 219, 262, 249, 309, 316], real: 216, agendado: 66, proy: 282, vsLM: -11, vsU3M: -3, nota: "OCTUBRE (corte 26-oct): real 216 (Terminada + Primera Vez, 1-26 oct, vRepro) + agendado 66 (71 citas de primera vez ya agendadas del 27 al 31 oct, incluye las de hoy 27-oct, descontando no show, más las nuevas citas esperadas) = proyección 282 (rango 267-300; piso 276 = real + agenda × show rate; en CDMX el piso (143) supera al run-rate (133), por eso se toma el piso). Modelo: piso + nuevas citas esperadas (10.2 por día × 5 días restantes con decay), promediado con el run-rate; en Metepec se usa solo el piso (27) porque los médicos están de vacaciones. La cifra cambia conforme se agenden nuevas citas." },
    noshow: { hist: [8.8, 6.2, 14.0, 15.7, 19.1, 14.8, 14.7, 15.3, 16.4], actual: 17.6, prom: 13.9, deltaPts: 3.7 },
  },

  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.4, 13.3], actual: 11.2, proy: 13.21, vsLM: -1, vsU3M: 11, nota: "OCTUBRE MTD al 26-oct: Real $11,201,295; Proyectado $13,205,254 (método central, sin ajuste manual). Septiembre cerrado en $13,328,714 (Proy = Real)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2069, 2658], actual: 1932, proy: 2346, vsLM: -12, vsU3M: 6, nota: "1,932 líneas al 26-oct; proy 2,346 = promedio de pacing (2,351) y ritmo jul-sep (2,341); sin techo por ticket." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 618, 931], actual: 574, proy: 714, vsLM: -23, vsU3M: 4, nota: "574 pacientes únicos al 26-oct; proy 714 = Atenciones proy × 0.3046 (ratio promedio jul-sep)." },
      consultas: { hist: [112, 92, 133, 133, 127, 160, 135, 130, 141], real: 105, agendado: 38, proy: 143, vsLM: 1, vsU3M: 6, top_cat: "Consulta primera vez", top_n: 86 },
      noshow: { hist: [7.4, 7.9, 11.2, 14.2, 19.9, 10.2, 13.0, 11.0, 13.7], actual: 14.6, prom: 12.1, deltaPts: 2.5 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8, 1.5], actual: 1.4, proy: 1.72, vsLM: 18, vsU3M: -10, nota: "OCTUBRE MTD al 26-oct: Real $1,397,126; Proyectado $1,717,590 (método central). Septiembre cerrado en $1,456,406 (Proy = Real)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751, 660], actual: 438, proy: 552, vsLM: -16, vsU3M: -10, nota: "438 líneas al 26-oct; proy 552 = promedio de pacing (553) y ritmo jul-sep (552); agosto cerró en 751 y septiembre en 660." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287, 299], actual: 188, proy: 229, vsLM: -23, vsU3M: -10, nota: "188 pacientes únicos al 26-oct; proy 229 = Atenciones proy × 0.4147 (ratio promedio jul-sep)." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133, 123], real: 86, agendado: 26, proy: 112, vsLM: -9, vsU3M: -2, top_cat: "Check-up SOP", top_n: 26 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2, 15.8], actual: 16.5, prom: 14.7, deltaPts: 1.8 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9, 0.4], actual: 0.58, proy: 0.63, vsLM: 45, vsU3M: 3, nota: "OCTUBRE MTD al 26-oct: Real $576,415; Proyectado $626,415 = Real + $50,000 (supuesto por vacaciones de los médicos; el método central daría $678,543). Septiembre cerrado en $431,482 (Proy = Real). Sede chica: pocas líneas por día." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286, 225], actual: 178, proy: 197, vsLM: -12, vsU3M: -19, nota: "178 líneas al 26-oct; proy 197: el método sin ajuste da 218 (pacing 212, ritmo jul-sep 223) y el remanente se escala ×0.49 para ir con el ingreso de Real + $50K." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95, 93], actual: 63, proy: 67, vsLM: -28, vsU3M: -19, nota: "63 pacientes únicos al 26-oct; proy 67 = Atenciones proy (197) × 0.3382 (ratio promedio jul-sep)." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46, 52], real: 25, agendado: 2, proy: 27, vsLM: -48, vsU3M: -35, top_cat: "Consulta primera vez", top_n: 22 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1, 24.6], actual: 30.6, prom: 21.6, deltaPts: 9.0 },
    },
  },

  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.97, vsLM: -12, vsU3M: -9 },
      { nombre: "Congelación de Gametos", valor: 3.43, vsLM: -9, vsU3M: 19 },
      { nombre: "Farmacia", valor: 3.34, vsLM: 27, vsU3M: 12 },
      { nombre: "Laboratorio", valor: 2.48, vsLM: 7, vsU3M: 9 },
      { nombre: "Subrogación", valor: 1.54, vsLM: 75, vsU3M: 58 },
      { nombre: "Consultas", valor: 0.38, vsLM: -26, vsU3M: -12 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.27, vsLM: -30, vsU3M: -32 },
      { nombre: "Imágenes", valor: 0.07, vsLM: -48, vsU3M: -25 },
      { nombre: "Wellness", valor: 0.05, vsLM: -1, vsU3M: 84 },
      { nombre: "Otros", valor: 0.02, vsLM: -34, vsU3M: -3 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.44, vsLM: -15, vsU3M: -7 },
      { nombre: "Congelación de Gametos", valor: 2.85, vsLM: -11, vsU3M: 20 },
      { nombre: "Farmacia", valor: 2.7, vsLM: 15, vsU3M: 9 },
      { nombre: "Laboratorio", valor: 2.21, vsLM: 5, vsU3M: 27 },
      { nombre: "Subrogación", valor: 1.54, vsLM: 79, vsU3M: 59 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.2, vsLM: -42, vsU3M: -40 },
      { nombre: "Consultas", valor: 0.18, vsLM: -31, vsU3M: -22 },
      { nombre: "Imágenes", valor: 0.05, vsLM: -54, vsU3M: -28 },
      { nombre: "Wellness", valor: 0.04, vsLM: 11, vsU3M: 100 },
      { nombre: "Otros", valor: 0.01, vsLM: -67, vsU3M: -26 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.58, vsLM: 28, vsU3M: 28 },
      { nombre: "Farmacia", valor: 0.41, vsLM: 200, vsU3M: 41 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.23, vsLM: -43, vsU3M: -52 },
      { nombre: "Laboratorio", valor: 0.21, vsLM: 27, vsU3M: -50 },
      { nombre: "Consultas", valor: 0.19, vsLM: -14, vsU3M: 4 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.07, vsLM: 87, vsU3M: 25 },
      { nombre: "Imágenes", valor: 0.01, vsLM: 11, vsU3M: 28 },
      { nombre: "Otros", valor: 0.01, vsLM: null, vsU3M: 41, nuevo: true },
      { nombre: "Wellness", valor: 0.01, vsLM: -28, vsU3M: 40 },
      { nombre: "Subrogación", valor: 0.0, vsLM: -90, vsU3M: -70 },
    ],
    MTP: [
      { nombre: "Tratamientos FIV/ICSI", valor: 0.31, vsLM: 339, vsU3M: 105 },
      { nombre: "Farmacia", valor: 0.23, vsLM: 46, vsU3M: 2 },
      { nombre: "Laboratorio", valor: 0.07, vsLM: 21, vsU3M: -42 },
      { nombre: "Consultas", valor: 0.01, vsLM: -62, vsU3M: -38 },
      { nombre: "Congelación de Gametos", valor: 0.01, vsLM: -94, vsU3M: -92 },
      { nombre: "Imágenes", valor: 0.0, vsLM: -72, vsU3M: -75 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: null, vsU3M: -92, nuevo: true },
      { nombre: "Wellness", valor: 0.0, vsLM: -97, vsU3M: -92 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  highlights: {
    total: [
      "Octubre lleva 26 días de Real (corte 26-oct, leído de vRepro) y proyecta $15.55M: +2% vs septiembre ($15.22M), +8% vs el promedio de los últimos 3 meses y +50% vs octubre 2025 ($10.37M). Confianza alta: 20.5 de 25.0 días hábiles equivalentes; el Real a la fecha ($13.17M) cubre 85% de la proyección. Metepec se fija en Real + $50K ($0.63M) por las vacaciones de los médicos; con el método central sería $0.68M y el total $15.60M.",
      "Los días fuertes del mes fueron el lun 12-oct ($1.26M), el mié 14-oct ($1.14M), el lun 19-oct ($0.98M), el vie 9-oct ($0.87M), el 1-oct ($0.83M) y el vie 23-oct ($0.82M); el lun 26-oct sumó $0.76M, el domingo 25-oct apenas $22K y el domingo 18-oct no tuvo cargos.",
      "Subrogación es el servicio que más crece vs septiembre (+75% proy, $1.54M) por los paquetes Fresh egg donor, Essentials y All Inclusive en CDMX; Farmacia ($3.34M, +27%) también sube, mientras Tratamientos FIV/ICSI ($3.97M, -12%) y Congelación ($3.43M, -9%) siguen siendo los dos servicios más grandes pero van por debajo de septiembre.",
      "Atenciones (3,095) y Pacientes (1,010) proyectan -13% y -24% vs septiembre (3,543 y 1,319) frente a +2% de Ingresos: el ingreso por atención sube (~$5.0K vs ~$4.3K en septiembre) por los paquetes de subrogación y donación, y septiembre tuvo un pico de pacientes únicos que el ratio promedio jul-sep solo recoge en parte. En Metepec el remanente se escala ×0.49 para ir con Real + $50K. Sin techo por ticket.",
      "Consultas: 216 reales más 66 agendadas y esperadas del 27 al 31 oct; la proyección es 282 (rango 267-300, piso 276; -11% vs septiembre) y crece conforme se agenden nuevas citas, no es un techo. El % de No Show de octubre es 17.6% (46 inasistencias sobre 262 citas de primera vez), arriba del promedio ene-sep de 13.9%.",
      "HubSpot (Interesa2) al 26-oct: 1,719 leads y 423 citas agendadas (25% de conversión mensual parcial); el lunes 26-oct sumó 95 leads y 30 citas. La hoja de cohortes (M0) quedó en el corte 19-oct porque su definición no se puede reproducir con la consulta actual.",
      "Nota de datos: los cargos y citas del 1 al 26 oct se re-leyeron de vRepro el 27-oct (los cambios retroactivos del 1 al 25 oct, 5 líneas eliminadas y 24 ajustes de monto, restan $52K netos: el Real al 25-oct pasó de $12.47M a $12.42M); médico = Profesional Historia; medicamentos de Farmacia a nivel producto. Servicios, conceptos y consultas usan tu archivo Clasificación 4 (2026); el ranking de consultas agrupa Check-up SOMP + SOP en uno y deja Check up Integral aparte, y octubre sale de vRepro (grupo Primera Vez: Terminadas 1-26 oct + agenda 27-31 oct, repartida para sumar la proyección). Conceptos nuevos de octubre clasificados de forma provisional y pendientes de tu revisión: donantes de óvulos (Ovodonors en fresco 0066, panel genético, Viáticos), Check colaborador, Histeroscopía diagnóstica sin anestesiólogo, Química Sanguínea 8 elementos y Subsecuente Fertilidad/Obstetricia.",
    ],
    CDMX: [
      "CDMX concentra 85% del ingreso MTD de octubre ($11.20M de $13.17M) y proyecta $13.21M (-1% vs septiembre, +11% vs U3M); el lun 12-oct facturó $1.19M, el mié 14-oct $1.02M y el lun 19-oct $0.89M.",
      "Subrogación CDMX lleva $1.37M en el mes (proy $1.54M, +79% vs LM) y Congelación $2.43M real; Atenciones proy (2,346) y Pacientes proy (714) sin techo por ticket.",
    ],
    GDL: [
      "GDL lleva $1.40M en 26 días y proyecta $1.72M (+18% vs septiembre, -10% vs U3M); Farmacia (proy +200% vs septiembre) y Congelación (+28%) crecen, mientras FIV/ICSI proyecta -43%.",
      "Atenciones proy (552) vs 438 reales y Pacientes proy (229) vs 188 reales; agosto cerró en 751 atenciones y septiembre en 660.",
    ],
    MTP: [
      "Metepec lleva $576K en 26 días y proyecta $0.63M = Real + $50K (supuesto por vacaciones de los médicos; el método central daría $0.68M; +45% vs septiembre, $431K; +3% vs U3M). El mes lo explican 3 paquetes FIV con 3 transferencias ($233K, 40% del ingreso) y la Farmacia de estimulación ($212K); 88% del ingreso viene de pacientes cuya primera consulta fue en meses anteriores (dos de los paquetes, de consultas de julio).",
      "Atenciones proy (197) y Pacientes proy (67) vs 178 y 63 reales (remanente escalado ×0.49 para ir con el ingreso); son las cifras más chicas de la red y la sede con mayor % de No Show (30.6%).",
    ],
  },

  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 127, vsLM: -15 },
      { nombre: "Fertility Check up Mujeres", valor: 40, vsLM: -31 },
      { nombre: "Check up Ginecologico", valor: 31, vsLM: -26 },
      { nombre: "Check-up SOP", valor: 31, vsLM: 41 },
      { nombre: "Check up Integral", valor: 16, vsLM: 7 },
      { nombre: "Fertility Check up Parejas", valor: 16, vsLM: -6 },
      { nombre: "Consulta de Primera Vez IP's", valor: 9, vsLM: 125 },
      { nombre: "Consulta ginecológica", valor: 5, vsLM: 67 },
      { nombre: "Consulta Obstetricia", valor: 4, vsLM: 0 },
      { nombre: "Fertility Check up Hombres", valor: 2, vsLM: -67 },
      { nombre: "Consulta obstetrica materno fetal", valor: 1, vsLM: null, nuevo: true },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 86, vsLM: -2 },
      { nombre: "Fertility Check up Mujeres", valor: 27, vsLM: -18 },
      { nombre: "Consulta de Primera Vez IP's", valor: 9, vsLM: 125 },
      { nombre: "Fertility Check up Parejas", valor: 8, vsLM: 0 },
      { nombre: "Check up Ginecologico", valor: 5, vsLM: -17 },
      { nombre: "Check up Integral", valor: 3, vsLM: null, nuevo: true },
      { nombre: "Check-up SOP", valor: 3, vsLM: 200 },
      { nombre: "Consulta ginecológica", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -75 },
    ],
    GDL: [
      { nombre: "Check-up SOP", valor: 26, vsLM: 24 },
      { nombre: "Check up Ginecologico", valor: 25, vsLM: -7 },
      { nombre: "Consulta primera vez", valor: 19, vsLM: -32 },
      { nombre: "Check up Integral", valor: 13, vsLM: -13 },
      { nombre: "Fertility Check up Mujeres", valor: 12, vsLM: -40 },
      { nombre: "Fertility Check up Parejas", valor: 7, vsLM: 40 },
      { nombre: "Consulta Obstetricia", valor: 4, vsLM: 33 },
      { nombre: "Consulta ginecológica", valor: 4, vsLM: 100 },
      { nombre: "Consulta obstetrica materno fetal", valor: 1, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Hombres", valor: 1, vsLM: -50 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 22, vsLM: -33 },
      { nombre: "Check-up SOP", valor: 2, vsLM: null, nuevo: true },
      { nombre: "Check up Ginecologico", valor: 1, vsLM: -89 },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: -80 },
      { nombre: "Fertility Check up Parejas", valor: 1, vsLM: -75 },
    ],
  },

  hubspot: {
    leads: { hist: [833, 1059, 1020, 999, 1752, 1435, 1533, 1921, 2095], actual: 1719 },
    citas: { hist: [188, 230, 318, 328, 367, 315, 418, 501, 468], actual: 423 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26, 22], actual: 25 },
    // Octubre parcial (1-26 oct, rango semiabierto). Pipeline "Interesa2".
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,28,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,22,null,null], total2026: 21 },
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
      { mes: "Oct-26", leads: 1209, m0: 21, m1: 0, m2: 0, sin: 79 }, // OCTUBRE parcial: cohorte al corte 19-oct (m0 = 248 de 1,209 leads con cita en el mismo mes); la hoja HubspotCohortes no se actualizó al 26-oct
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
