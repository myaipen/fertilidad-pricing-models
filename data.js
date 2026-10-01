/*
  ============================================================================
  DATOS DEL DASHBOARD — Fertilidad Integral
  ============================================================================
  ESTE ES EL ÚNICO ARCHIVO QUE DEBES EDITAR CADA MES.
  No toques index.html ni chart.min.js.

  Cómo actualizar (cada corte de mes, ej. cierre de septiembre):
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
  // Atenciones, Pacientes y Consultas ya vienen en vivo desde el Sheet (ver
  // sección 0 del README); HubSpot y Highlights siguen siendo manuales aquí
  // y quedan al corte que se indica abajo hasta que también se automaticen.
  // ACTUALIZADO 1-oct-2026: CIERRE DE SEPTIEMBRE (corte 30-sep, mes
  // completo). Marite pidió explícitamente quitar la proyección porque el
  // mes ya cerró — en todos los bloques de abajo Proyectado = Real. El
  // mecanismo ya existe en el código (mesVigenteCerrado() en data-live.js,
  // basado en la fecha real del calendario) y revierte solo el próximo mes
  // conforme avance el calendario — no requiere ningún flag manual.
  // CORRECCIÓN 1-oct-2026 (mismo día, con Cargos_y_Facturas_39.xlsx): Marite
  // subió un re-extracto más fino del mismo septiembre ya cerrado. Cambia
  // sólo CDMX: -$314,655.03 en Ingresos, -53 Atenciones, -51 Pacientes
  // únicos, por 53 líneas de cargo canceladas (52 Congelación/Almacenamiento
  // de gametos 1 año + 1 Cita primera vez IPS). GDL y MTP, Subrogación y
  // Consultas/Agenda quedan exactamente iguales (reverificado contra el
  // archivo nuevo). Además se reasignó el médico ("Profesional Historia") en
  // varias líneas de GDL/MTP — no cambia ingresos, sólo el Evolutivo por
  // médico (ese dato se carga en vivo desde la hoja "PorMedico", ya
  // actualizado ahí).
  corte: "30-sep-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"],
  mes_actual: "Sep",

  // ------------------------------------------------------------------------
  // TOTAL COMPAÑÍA (Ingresos = dato oficial del corte; Atenciones y
  // Pacientes Únicos = suma de las 3 sedes, ya que se proyectan sede por
  // sede en el reporte fuente)
  // ------------------------------------------------------------------------
  // ACTUALIZADO 1-oct-2026 — CIERRE DE SEPTIEMBRE con Cargos_y_Facturas_38 y
  // Consultas_19 (mes completo, 1-30 sep). Real = Proyectado en todo: ya no
  // hay "resto del mes" que proyectar. vsLM = vs. agosto cerrado; vsU3M =
  // vs. promedio jun/jul/ago cerrados. Este bloque es SOLO el respaldo que
  // se muestra mientras carga el Sheet en vivo o si el fetch falla.
  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.7, 12.1, 12.0, 16.2], actual: 15.22, proy: 15.22, vsLM: -6, vsU3M: 13, nota: "CORREGIDO 1-oct-2026 con Cargos_y_Facturas_39.xlsx (re-extracto más fino de septiembre, el mes sigue cerrado): Real = Proyectado = $15,216,602.38 (baja ~$314,655 vs la cifra publicada con el archivo 38, por 53 líneas de cargo canceladas, todas en CDMX — ver nota de Congelación en Mezcla de servicios). Agosto fue un mes atípicamente alto (pico puntual de Congelación en Metepec), por eso el vsLM negativo no debe leerse como caída del negocio — vs. el promedio de los últimos 3 meses cerrados (vsU3M) el total sigue positivo." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3109], actual: 3543, proy: 3543, vsLM: 14, vsU3M: 33, nota: "CORREGIDO con Cargos_39 (-53 líneas canceladas, todas CDMX). suma CDMX+GDL+MTP, conteo de líneas de cargo (F. Cargo), mes de septiembre completo (1-30). Mes cerrado: Proyectado = Real." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1003], actual: 1323, proy: 1323, vsLM: 32, vsU3M: 60, nota: "CORREGIDO con Cargos_39 (-51 pacientes únicos, todos CDMX, por las líneas canceladas). suma CDMX+GDL+MTP, pacientes ÚNICOS del mes (dedup por Historia), septiembre completo. Mes cerrado: Proyectado = Real." },
    consultas: { hist: [168, 167, 235, 220, 225, 271, 255, 316], real: 320, agendado: 0, proy: 320, vsLM: 1, vsU3M: 14, nota: "CIERRE DE SEPTIEMBRE con Consultas_19.xlsx — real 320 (1-30 sep, Terminada+Primera Vez), agendado 0 (la hoja 'Citas agendadas' quedó vacía: no hay nada pendiente por agendar en un mes ya cerrado). proy = real + agendado = real." },
    // ACTUALIZADO 1-oct-2026 con la hoja "No show" de Consultas_19.xlsx
    // (mes completo 1-30 sep, mismo filtro Grupo de conceptos = "Primera
    // Vez"). % No show = no_show / (real + no_show). hist sin cambio (8
    // meses cerrados); actual = % de septiembre completo; prom = promedio
    // simple de los 8 meses cerrados; deltaPts = actual - prom.
    // TODAVÍA ES MANUAL (como Highlights) — no hay hoja "No show" en vivo en
    // el Sheet; si se agrega un tab RAW_NoShow con el mismo patrón que
    // RAW_CitasAgendadas, se puede automatizar en data-live.js.
    noshow: { hist: [8.7, 6.2, 13.9, 15.7, 19.1, 14.8, 14.7, 15.3], actual: 16.4, prom: 13.6, deltaPts: 2.8 },
  },

  // ------------------------------------------------------------------------
  // POR SEDE
  // ------------------------------------------------------------------------
  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.5], actual: 13.33, proy: 13.33, vsLM: 7, vsU3M: 26, nota: "CORREGIDO 1-oct-2026 con Cargos_y_Facturas_39.xlsx: Real = Proyectado = $13,328,714.19 (baja ~$314,655 vs el corte anterior — 53 líneas de cargo canceladas: 52 de Congelación/Almacenamiento de gametos 1 año y 1 de Cita primera vez IPS; ver Evolutivo por médico para el efecto en la atribución por doctor). Sigue siendo el principal motor de crecimiento del mes, con el ingreso acelerando tanto vs agosto como vs el trimestre." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2072], actual: 2658, proy: 2658, vsLM: 28, vsU3M: 40, nota: "CORREGIDO con Cargos_39 (-53 líneas canceladas). Mes cerrado: Proyectado = Real. Mejor momentum de volumen de las 3 sedes." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 621], actual: 931, proy: 931, vsLM: 50, vsU3M: 72, nota: "CORREGIDO con Cargos_39 (-51 pacientes únicos). pacientes únicos del mes (dedup Historia), septiembre completo. Proyectado = Real." },
      consultas: { hist: [127, 105, 144, 145, 133, 169, 141, 137], real: 145, agendado: 0, proy: 145, vsLM: 6, vsU3M: -3, top_cat: "Consulta primera vez", top_n: 53 },
      noshow: { hist: [7.3, 7.9, 11.1, 14.2, 19.9, 10.1, 13.0, 11.0], actual: 13.7, prom: 11.8, deltaPts: 1.9 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8], actual: 1.46, proy: 1.46, vsLM: -48, vsU3M: -34, nota: "CIERRE DE SEPTIEMBRE: Real = Proyectado = $1,456,405.90. Es la sede con la caída más marcada vs agosto y vs el trimestre — amerita revisión de mezcla (Congelación y FIV ambos a la baja, ver Mezcla de servicios)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751], actual: 660, proy: 660, vsLM: -12, vsU3M: 17, nota: "Mes cerrado: Proyectado = Real." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287], actual: 299, proy: 299, vsLM: 4, vsU3M: 37, nota: "pacientes únicos del mes, septiembre completo. Proyectado = Real." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133], real: 123, agendado: 0, proy: 123, vsLM: -8, vsU3M: 18, top_cat: "Check up Ginecológico", top_n: 27 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2], actual: 15.8, prom: 14.6, deltaPts: 1.2 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9], actual: 0.43, proy: 0.43, vsLM: -52, vsU3M: -28, nota: "CIERRE DE SEPTIEMBRE: Real = Proyectado = $431,482.29. La caída vs agosto es en gran parte un efecto de base: agosto fue el mes más alto del año en Metepec por un pico puntual de Congelación que no se repitió. El ingreso cae más rápido que el volumen de atención (ver highlight de ticket promedio)." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286], actual: 225, proy: 225, vsLM: -21, vsU3M: 10, nota: "Mes cerrado: Proyectado = Real." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95], actual: 93, proy: 93, vsLM: -2, vsU3M: 45, nota: "pacientes únicos del mes, septiembre completo. Proyectado = Real." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46], real: 52, agendado: 0, proy: 52, vsLM: 13, vsU3M: 90, top_cat: "Consulta primera vez", top_n: 27 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1], actual: 24.6, prom: 21.3, deltaPts: 3.3 },
    },
  },

  // ------------------------------------------------------------------------
  // SERVICIOS — Ingresos por servicio, proyectado (MDP), vs LM y vs U3M
  // ------------------------------------------------------------------------
  // ACTUALIZADO 1-oct-2026 — CIERRE DE SEPTIEMBRE (mes completo 1-30 sep).
  // vsLM = vs. agosto cerrado, vsU3M = vs. promedio jun/jul/ago cerrados.
  // Incluye la nueva línea MTP·Wellness (primera vez que aparece ingreso en
  // este servicio en Metepec) y GDL·Subrogación (primer paciente de
  // Valoración fuera de CDMX).
  servicios: {
    total: [
      { nombre: "Congelación de Gametos", valor: 4.1, vsLM: 43, vsU3M: 60 },
      { nombre: "Tratamientos FIV/ICSI", valor: 4.2, vsLM: -14, vsU3M: 3 },
      { nombre: "Farmacia", valor: 2.6, vsLM: -21, vsU3M: -10 },
      { nombre: "Laboratorio", valor: 2.3, vsLM: -11, vsU3M: 8 },
      { nombre: "Subrogación", valor: 0.9, vsLM: -41, vsU3M: 1 },
      { nombre: "Consultas", valor: 0.5, vsLM: 10, vsU3M: 30 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.4, vsLM: -11, vsU3M: 17 },
      { nombre: "Imágenes", valor: 0.1, vsLM: 133, vsU3M: 87 },
      { nombre: "Wellness", valor: 0.0, vsLM: 193, vsU3M: 309 },
      { nombre: "Otros", valor: 0.0, vsLM: -1, vsU3M: -23 },
    ],
    CDMX: [
      { nombre: "Congelación de Gametos", valor: 3.5, vsLM: 72, vsU3M: 73 },
      { nombre: "Tratamientos FIV/ICSI", valor: 3.7, vsLM: -6, vsU3M: 15 },
      { nombre: "Farmacia", valor: 2.3, vsLM: -10, vsU3M: -1 },
      { nombre: "Laboratorio", valor: 2.1, vsLM: 21, vsU3M: 38 },
      { nombre: "Subrogación", valor: 0.9, vsLM: -42, vsU3M: -1 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.3, vsLM: 3, vsU3M: 34 },
      { nombre: "Consultas", valor: 0.3, vsLM: 13, vsU3M: 13 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.5, vsLM: -34, vsU3M: 1 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.4, vsLM: -42, vsU3M: -38 },
      { nombre: "Consultas", valor: 0.2, vsLM: -2, vsU3M: 47 },
      { nombre: "Laboratorio", valor: 0.2, vsLM: -75, vsU3M: -68 },
      { nombre: "Farmacia", valor: 0.1, vsLM: -71, vsU3M: -63 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: -39, vsU3M: -33 },
      { nombre: "Subrogación", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true }, // NOVEDAD: primer paciente de Valoración en GDL (ver Subrogación)
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.2, vsLM: -40, vsU3M: -21 },
      { nombre: "Congelación de Gametos", valor: 0.1, vsLM: -17, vsU3M: 67 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.1, vsLM: -71, vsU3M: -63 },
      { nombre: "Laboratorio", valor: 0.1, vsLM: -75, vsU3M: -52 },
      { nombre: "Consultas", valor: 0.0, vsLM: 148, vsU3M: 149 },
      { nombre: "Wellness", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true }, // NOVEDAD: primer ingreso de Wellness en Metepec ($1,379.31)
    ],
  },

  // ------------------------------------------------------------------------
  // HIGHLIGHTS — hallazgos cualitativos del corte (texto libre, editable)
  // ------------------------------------------------------------------------
  // REESCRITO 1-oct-2026 — CIERRE DE SEPTIEMBRE. A partir de este corte el
  // mes ya está cerrado (Real = Proyectado), así que los highlights dejan
  // de hablar de "proyección a cierre" y pasan a ser una lectura del mes ya
  // consumado. Mismo estilo que los cortes anteriores: solo insights,
  // ningún cálculo expuesto.
  highlights: {
    total: [
      "Corrección de corte (1-oct-2026): un re-extracto más fino de septiembre (Cargos_y_Facturas_39) bajó Ingresos/Atenciones/Pacientes únicos de CDMX por 53 líneas de cargo canceladas (52 de Congelación/Almacenamiento de gametos, 1 de Cita primera vez) — no es una caída real del mes, es una corrección de datos sobre el mismo septiembre ya cerrado; las demás sedes no cambiaron.",
      "Septiembre cierra con Congelación de Gametos y Tratamientos FIV/ICSI como los dos motores de ingreso de la compañía, muy por encima del resto de servicios — la prioridad de pricing y paquetes combinados sigue siendo la misma.",
      "Los números de HubSpot de este corte son más bajos que los que se habían comunicado antes, pero es una corrección de metodología de medición, no una caída real de captación — conviene tomar esta cifra como la nueva línea base de comparación hacia adelante.",
      "Subrogación abre su primera paciente de Valoración fuera de Ciudad de México, en Guadalajara — una señal temprana de que la propuesta puede replicarse en otras sedes y vale la pena dar seguimiento comercial cercano.",
      "Metepec registra su primer ingreso en Wellness — un servicio nuevo para esa sede que vale la pena monitorear el próximo corte para ver si se consolida.",
      "El % de No Show del mes queda otra vez por encima del promedio histórico de la compañía, con Metepec como la sede más afectada — reforzar confirmación de citas ahí sigue siendo la palanca de mayor impacto disponible.",
    ],
    CDMX: [
      "Cierra el mes como la sede con mejor momentum: Ingresos, Atenciones y Pacientes únicos crecen con fuerza tanto vs agosto como vs el trimestre.",
      "El ingreso crece menos que el volumen de atención — vale la pena revisar si el ticket promedio se está diluyendo por una mezcla con más peso en servicios de menor valor.",
    ],
    GDL: [
      "Es la sede que más retrocede este cierre de mes, con Congelación y Tratamientos FIV/ICSI — sus dos categorías más grandes — a la baja tanto vs agosto como vs el trimestre; es la sede a vigilar más de cerca de cara al siguiente corte.",
      "Pacientes únicos se mantiene prácticamente estable pese a la caída de Atenciones — sugiere que el retroceso es más de frecuencia de visita por paciente que de pérdida de captación, vale la pena revisar retención/recompra.",
    ],
    MTP: [
      "El ingreso cae con más fuerza que el volumen de atención este cierre de mes — agosto fue un mes atípicamente alto en Metepec por un pico puntual que no se repitió, así que la comparación vs agosto exagera la caída; aun así vale la pena confirmar con el equipo local si hay también un componente de ticket promedio a la baja.",
      "Sigue siendo la sede más pequeña y con mayor variabilidad relativa entre sedes — el ingreso nuevo de Wellness es un primer paso de diversificación a observar el próximo corte.",
    ],
  },

  // ------------------------------------------------------------------------
  // RANKING DE CONSULTAS POR AGRUPACIÓN (cierre de septiembre: real = total
  // del mes, ya no hay agendado pendiente), vs LM (Ago cerrado). Filtrado a
  // Grupo de conceptos = "Primera Vez". ACTUALIZADO 1-oct-2026 con
  // Consultas_19.xlsx (mes completo 1-30 sep).
  // ------------------------------------------------------------------------
  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 96, vsLM: -1 },
      { nombre: "Fertility Check up Mujeres", valor: 58, vsLM: 21 },
      { nombre: "Consulta primera vez online", valor: 47, vsLM: 47 },
      { nombre: "Check up Ginecológico", valor: 42, vsLM: -21 },
      { nombre: "Check-up SOMP", valor: 22, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Parejas", valor: 17, vsLM: -37 },
      { nombre: "Check up Integral", valor: 15, vsLM: 650 },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 53, vsLM: 2 },
      { nombre: "Consulta primera vez online", valor: 34, vsLM: 48 },
      { nombre: "Fertility Check up Mujeres", valor: 33, vsLM: 27 },
      { nombre: "Fertility Check up Parejas", valor: 8, vsLM: -27 },
      { nombre: "Check up Ginecológico", valor: 6, vsLM: -45 },
    ],
    GDL: [
      { nombre: "Check up Ginecológico", valor: 27, vsLM: -7 },
      { nombre: "Check-up SOMP", valor: 21, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Mujeres", valor: 20, vsLM: -5 },
      { nombre: "Consulta primera vez", valor: 16, vsLM: -38 },
      { nombre: "Check up Integral", valor: 15, vsLM: 650 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 27, vsLM: 42 },
      { nombre: "Check up Ginecológico", valor: 9, vsLM: -31 },
      { nombre: "Fertility Check up Mujeres", valor: 5, vsLM: 400 },
      { nombre: "Consulta primera vez online gratis", valor: 4, vsLM: 100 },
      { nombre: "Fertility Check up Parejas", valor: 4, vsLM: 33 },
    ],
  },

  // ------------------------------------------------------------------------
  // HUBSPOT — Pipeline "Interesa2". Leads por fecha de creación, citas por
  // Fecha_CitaAgendada_Int2. ESTOS VALORES YA SE CARGAN EN VIVO (ver
  // data-live.js y la hoja "Hubspot"/"HubspotSedeMensual"/"HubspotCohortes"
  // del Sheet) — lo de aquí es solo el respaldo si el fetch en vivo falla.
  // ------------------------------------------------------------------------
  // ACTUALIZADO 1-oct-2026 — CIERRE DE SEPTIEMBRE, con consulta directa a
  // HubSpot (pipeline "Interesa2", id 100207220), mes completo 1-30 sep.
  // CORRECCIÓN DE METODOLOGÍA (importante): se confirmó que el filtro
  // "BETWEEN fecha1 AND fecha2" con literales de solo-fecha es poco
  // confiable para el último día del rango según la forma de la consulta —
  // en algunas formas subcuenta el día 30, en otras lo cuenta bien. A
  // partir de este corte TODA consulta de rango de fechas a HubSpot usa
  // rango semiabierto explícito (col >= 'primer día' AND col < 'primer día
  // del mes siguiente') y, como verificación cruzada, también
  // GROUP BY DATE_TRUNC(col,'MONTH'). Con esta corrección: Leads de
  // septiembre quedan en 2,108 (antes se había reportado 2,315 en el corte
  // anterior — esa cifra estaba inflada por el bug, no refleja una caída
  // real de captación) y Citas quedan en 458. conversion_por_sede: citas
  // agendadas del mes ÷ deals creados el mismo mes, por sede (campo
  // "sucursal" del DEAL). Cohortes: por cada mes de alta (createdate), qué
  // % agenda cita (Fecha_CitaAgendada_Int2) ese mismo mes (M0), al mes
  // siguiente (M1) y dos meses después (M2, bucket exacto, no acumulado).
  hubspot: {
    leads: { hist: [834, 1062, 1021, 1000, 1754, 1436, 1533, 1924], actual: 2108 },
    citas: { hist: [188, 230, 318, 329, 367, 315, 416, 504], actual: 458 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26], actual: 22 },
    // mensual[] trae los 9 meses con dato (Ene=0..Sep=8; Oct-Dic quedan en
    // null hasta que haya datos) para que el tablero muestre el mes que el
    // selector de "mes vigente" tenga activo. En vivo esto se recalcula solo
    // desde la hoja "HubspotSedeMensual" — esto es solo el respaldo estático
    // si el fetch en vivo falla. Solo se actualiza el índice de septiembre
    // (8) y total2026 este corte; los meses 0-7 ya estaban publicados.
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,21,null,null,null], total2026: 27 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,19,null,null,null], total2026: 21 },
      MTP: { mensual: [24,28,38,46,19,14,32,36,34,null,null,null], total2026: 31 },
    },
    // m0/m1/m2/sin en % del total de leads del mes (m2 = bucket exacto "2
    // meses después", no acumulado); sin = 100 - m0 - m1 - m2.
    cohortes: [
      { mes: "Ene-26", leads: 834, m0: 21, m1: 1, m2: 0, sin: 78 },
      { mes: "Feb-26", leads: 1062, m0: 20, m1: 2, m2: 0, sin: 78 },
      { mes: "Mar-26", leads: 1021, m0: 28, m1: 1, m2: 0, sin: 71 },
      { mes: "Abr-26", leads: 1000, m0: 31, m1: 3, m2: 0, sin: 66 },
      { mes: "May-26", leads: 1754, m0: 19, m1: 1, m2: 1, sin: 79 },
      { mes: "Jun-26", leads: 1436, m0: 20, m1: 2, m2: 0, sin: 78 },
      { mes: "Jul-26", leads: 1533, m0: 24, m1: 2, m2: 0, sin: 74 },
      { mes: "Ago-26", leads: 1924, m0: 24, m1: 1, m2: 0, sin: 75 },
      { mes: "Sep-26", leads: 2108, m0: 20, m1: 0, m2: 0, sin: 80 }, // CIERRE DE SEPTIEMBRE, recalculado con rango semiabierto: leads baja de 2315 (cifra inflada por el bug de BETWEEN) a 2108 (cifra correcta); m0 sube de 17% a 20%
    ],
  },

  // ------------------------------------------------------------------------
  // SUBROGACIÓN — pacientes por etapa (agregado, sin nombres), por sede.
  // ESTOS VALORES YA SE CARGAN EN VIVO (ver data-live.js y la hoja
  // "SubrogacionPacientes" del Sheet) — lo de aquí es solo el respaldo si el
  // fetch en vivo falla. "Valoración" = candidatas gestantes evaluadas;
  // "Programa Activo" = padres intencionales con paquete contratado — son
  // poblaciones distintas.
  // ACTUALIZADO 1-oct-2026 con Cargos_y_Facturas_38.xlsx — CIERRE DE
  // SEPTIEMBRE (mes completo 1-30 sep): Valoración CDMX se mantiene en 91
  // pacientes (el ingreso baja ligeramente de $125,172.08 a $122,327.26 —
  // una línea que aparecía en el corte anterior ya no se sostiene al
  // recalcular desde cero contra el archivo más reciente, posible
  // corrección/cancelación). Programa Activo CDMX SUBE de 3 a 4 pacientes /
  // $306,034.48 a $729,181.03 — entra un contrato nuevo de alto ticket.
  // Guadalajara mantiene su primera paciente de Valoración (1 pac,
  // $19,396.55), sin cambio vs el corte anterior.
  // ------------------------------------------------------------------------
  subrogacion: (function(){
    const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago"];
    const cdmx = {
      labels,
      hist: {
        "Valoración":      [16, 4, 0, 4, 11, 4, 3, 3],
        "Programa Activo": [0, 1, 0, 1, 1, 2, 3, 7],
      },
      actual: {
        "Valoración":      { pacientes: 91, ingreso: 122327.26, ticket: 1344.26 },
        "Programa Activo": { pacientes: 4, ingreso: 729181.03, ticket: 182295.26 },
      },
      totalPacientesYTD: { "Valoración": 136, "Programa Activo": 20 },
      ingresoYTD: 4098792.99,
    };
    const gdl = {
      labels,
      hist: { "Valoración": [0,0,0,0,0,0,0,0], "Programa Activo": [0,0,0,0,0,0,0,0] },
      actual: {
        "Valoración":      { pacientes: 1, ingreso: 19396.55, ticket: 19396.55 },
        "Programa Activo": { pacientes: 0, ingreso: 0, ticket: 0 },
      },
      totalPacientesYTD: { "Valoración": 1, "Programa Activo": 0 },
      ingresoYTD: 19396.55,
    };
    const vacio = {
      labels,
      hist: { "Valoración": [0,0,0,0,0,0,0,0], "Programa Activo": [0,0,0,0,0,0,0,0] },
      actual: {
        "Valoración":      { pacientes: 0, ingreso: 0, ticket: 0 },
        "Programa Activo": { pacientes: 0, ingreso: 0, ticket: 0 },
      },
      totalPacientesYTD: { "Valoración": 0, "Programa Activo": 0 },
      ingresoYTD: 0,
    };
    const total = {
      labels,
      hist: cdmx.hist, // GDL/MTP hist son 0 en todos los meses cerrados
      actual: {
        "Valoración":      { pacientes: 92, ingreso: 141723.81, ticket: 1540.48 },
        "Programa Activo": { pacientes: 4, ingreso: 729181.03, ticket: 182295.26 },
      },
      totalPacientesYTD: { "Valoración": 137, "Programa Activo": 20 },
      ingresoYTD: 4118189.54,
    };
    return { total, CDMX: cdmx, GDL: gdl, MTP: vacio };
  })(),

  // ------------------------------------------------------------------------
  // CONCEPTOS — desglose por línea de cargo dentro de cada servicio, usado
  // por el clic en "Mezcla de servicios". SE CARGA SOLO EN VIVO (ver
  // data-live.js y la hoja "Conceptos" del Sheet) — no hay respaldo estático
  // aquí por su tamaño; si el fetch en vivo falla, el clic muestra "no
  // disponible" en vez de romper el dashboard.
  // ------------------------------------------------------------------------
  conceptos: {},
};
