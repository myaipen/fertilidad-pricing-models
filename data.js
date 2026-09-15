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
  corte: "14-sep-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"],
  mes_actual: "Sep",

  // ------------------------------------------------------------------------
  // TOTAL COMPAÑÍA (Ingresos = dato oficial del corte; Atenciones y
  // Pacientes Únicos = suma de las 3 sedes, ya que se proyectan sede por
  // sede en el reporte fuente)
  // ------------------------------------------------------------------------
  // ARREGLO (15-sep-2026): este bloque numérico (total/sedes de Ingresos,
  // Atenciones, Pacientes, Consultas) es SOLO el respaldo que se muestra
  // mientras carga el Sheet en vivo, o si el fetch en vivo falla (ver
  // fetchLiveOperativos()/buildIngresosMetric() en data-live.js). Se había
  // quedado con cifras de un corte de AGOSTO a medio mes (hist de 7 meses,
  // "actual" no correspondía a ningún corte real de septiembre) — cualquiera
  // que viera el tablero durante esos 1-2 segundos de carga (o si el Sheet
  // fallaba) veía números de otro mes. Resincronizado al corte real 14-sep
  // vigente (mismo que ya corregido en data-live.js: shares de Atenciones/
  // Pacientes recalibrados a corte-14 en vez de corte-12 heredado). IMPORTANTE:
  // resincronizar este bloque cada vez que cierre un mes o cuando la
  // proyección en vivo cambie de forma relevante — no tiene que ser exacto al
  // peso, es solo el respaldo de mientras carga.
  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.7, 12.1, 12.0, 16.2], actual: 7.8, proy: 13.5, vsLM: -17, vsU3M: 0, nota: "$-2.7M vs LM, $0.1M vs U3M" },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3109], actual: 1757, proy: 3263, vsLM: 5, vsU3M: 22, nota: "suma CDMX+GDL+MTP, conteo de líneas de cargo (F. Cargo)" },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1003], actual: 733, proy: 989, vsLM: -1, vsU3M: 20, nota: "suma CDMX+GDL+MTP" },
    consultas: { hist: [168, 167, 235, 220, 225, 271, 255, 316], real: 160, agendado: 149, proy: 340, vsLM: -2, vsU3M: 10 },
  },

  // ------------------------------------------------------------------------
  // POR SEDE
  // ------------------------------------------------------------------------
  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.5], actual: 6.8, proy: 11.7, vsLM: -6, vsU3M: 10 },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2072], actual: 1292, proy: 2195, vsLM: 6, vsU3M: 16 },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 621], actual: 505, proy: 598, vsLM: -4, vsU3M: 10 },
      consultas: { hist: [127, 105, 144, 145, 133, 169, 141, 137], real: 72, agendado: 77, proy: 149, vsLM: 9, vsU3M: 0, top_cat: "Consulta primera vez", top_n: 82 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8], actual: 0.8, proy: 1.5, vsLM: -47, vsU3M: -33 },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751], actual: 383, proy: 896, vsLM: 19, vsU3M: 59 },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287], actual: 186, proy: 345, vsLM: 20, vsU3M: 57 },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133], real: 68, agendado: 42, proy: 138, vsLM: -17, vsU3M: 5, top_cat: "Consulta primera vez", top_n: 32 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9], actual: 0.2, proy: 0.3, vsLM: -63, vsU3M: -43 },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286], actual: 82, proy: 172, vsLM: -40, vsU3M: -16 },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95], actual: 42, proy: 46, vsLM: -52, vsU3M: -29 },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46], real: 20, agendado: 30, proy: 53, vsLM: 9, vsU3M: 83, top_cat: "Consulta primera vez", top_n: 32 },
    },
  },

  // ------------------------------------------------------------------------
  // SERVICIOS — Ingresos por servicio, proyectado (MDP), vs LM y vs U3M
  // ------------------------------------------------------------------------
  servicios: {
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 4.3, vsLM: 18, vsU3M: 12 },
      { nombre: "Farmacia", valor: 2.9, vsLM: -2, vsU3M: 3 },
      { nombre: "Congelación de Gametos", valor: 2.6, vsLM: 26, vsU3M: 0 },
      { nombre: "Laboratorio", valor: 2.7, vsLM: 42, vsU3M: 43 },
      { nombre: "Subrogación", valor: 1.3, vsLM: 135, vsU3M: 205 },
      { nombre: "Consultas", valor: 0.4, vsLM: 38, vsU3M: 30 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.3, vsLM: -14, vsU3M: 20 },
      { nombre: "Imágenes", valor: 0.0, vsLM: -43, vsU3M: -34 },
      { nombre: "Wellness", valor: 0.0, vsLM: 24, vsU3M: 31 },
      { nombre: "Otros", valor: 0.0, vsLM: -30, vsU3M: -26 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.5, vsLM: 9, vsU3M: 15 },
      { nombre: "Congelación de Gametos", valor: 1.9, vsLM: 4, vsU3M: -14 },
      { nombre: "Farmacia", valor: 2.4, vsLM: -5, vsU3M: 1 },
      { nombre: "Subrogación", valor: 1.3, vsLM: 135, vsU3M: 205 },
      { nombre: "Laboratorio", valor: 2.1, vsLM: 49, vsU3M: 48 },
      { nombre: "Consultas", valor: 0.2, vsLM: 5, vsU3M: -1 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.3, vsLM: -20, vsU3M: 22 },
      { nombre: "Imágenes", valor: 0.0, vsLM: -37, vsU3M: -28 },
      { nombre: "Otros", valor: 0.0, vsLM: 57, vsU3M: 73 },
      { nombre: "Wellness", valor: 0.0, vsLM: 17, vsU3M: 12 },
    ],
    GDL: [
      { nombre: "Tratamientos FIV/ICSI", valor: 0.6, vsLM: 79, vsU3M: -12 },
      { nombre: "Congelación de Gametos", valor: 0.6, vsLM: 164, vsU3M: 73 },
      { nombre: "Farmacia", valor: 0.4, vsLM: 31, vsU3M: 22 },
      { nombre: "Laboratorio", valor: 0.5, vsLM: 2, vsU3M: 7 },
      { nombre: "Consultas", valor: 0.2, vsLM: 112, vsU3M: 89 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: -44, vsU3M: -45 },
      { nombre: "Wellness", valor: 0.0, vsLM: 55, vsU3M: 196 },
      { nombre: "Imágenes", valor: 0.0, vsLM: -66, vsU3M: -57 },
      { nombre: "Otros", valor: 0.0, vsLM: -77, vsU3M: -77 },
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.2, vsLM: -11, vsU3M: -6 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.2, vsLM: 72, vsU3M: 68 },
      { nombre: "Laboratorio", valor: 0.2, vsLM: 172, vsU3M: 180 },
      { nombre: "Congelación de Gametos", valor: 0.1, vsLM: 1088, vsU3M: 161 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
      { nombre: "Consultas", valor: 0.0, vsLM: 1, vsU3M: -4 },
      { nombre: "Imágenes", valor: 0.0, vsLM: -49, vsU3M: -32 },
      { nombre: "Otros", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
      { nombre: "Wellness", valor: 0.0, vsLM: null, vsU3M: null, nuevo: true },
    ],
  },

  // ------------------------------------------------------------------------
  // HIGHLIGHTS — hallazgos cualitativos del corte (texto libre, editable)
  // ------------------------------------------------------------------------
  highlights: {
    total: [
      "Ingresos: $13.5M proyectado a cierre de septiembre (Real acumulado al 14-sep: $7.8M, Ratio a cierre 1.73x), -16% vs LM, +1% vs U3M, +27% vs LY — la caída vs agosto no es una señal de alarma generalizada: el crecimiento interanual se mantiene fuerte (agosto cerrado fue +42% vs LY).",
      "Tratamientos de Fertilidad (FIV/ICSI): $3.45M proyectado, -29% vs LM (-$1.44M) — el mayor movimiento en pesos del mes dentro de Ingresos por servicio, y está repartido en las 3 sedes (no es un fenómeno aislado de una sola sede).",
      "Subrogación: $324,612 acumulado al 14-sep (28 valoraciones $38,405 + 2 programas activos nuevos $286,207), 100% CDMX. Proyectado a cierre $788,587, -47% vs LM, -9% vs U3M — segundo corte consecutivo a la baja tras el pico de agosto; dar seguimiento al pipeline.",
      "Guadalajara y Metepec explican casi toda la caída vs LM: GDL -47% ($1.48M proy. vs $2.78M en agosto) y MTP -63% ($0.34M vs $0.90M), mientras CDMX solo -6% (+10% vs U3M). Evolutivo 2026 señala que el ajuste de pipeline comercial de estas 2 sedes podría no estar actualizado a septiembre — validar con comercial antes de dar la baja por buena.",
      "Vs año anterior (mismo mes, cifra proyectada a cierre): compañía +27%, CDMX +31%, GDL +65%, MTP -58% — Metepec es la única sede que retrocede en términos interanuales este corte.",
      "Atenciones y Pacientes (Real acumulado al 14-sep, conteo de Cargos, sin proyectar en este texto): 1,757 atenciones y 730 pacientes únicos — ver tarjetas de Atenciones/Pacientes para la proyección a cierre de mes.",
    ],
    CDMX: [
      "Farmacia (+16% vs LM, $3.00M proy., +27% vs U3M) y Laboratorio (+26% vs LM, $2.20M proy., +44% vs U3M) son los motores de crecimiento del mes en CDMX — compensan la baja de FIV/ICSI.",
      "Tratamientos FIV/ICSI: $2.96M proyectado, -25% vs LM (-8% vs U3M) — el servicio de mayor peso de la sede retrocede este corte; validar si es estacionalidad o requiere atención comercial.",
      "Imágenes (+98% vs LM, $90.8k proy.) y Wellness (+129% vs LM, $30.4k proy.) crecen fuerte pero sobre base chica.",
      "Otros cae a $0 proyectado (-100% vs LM) — revisar si hay cargos de septiembre pendientes de clasificar en este concepto.",
    ],
    GDL: [
      "Imágenes +622% vs LM ($37.3k proy.) es el mayor salto porcentual de la sede, pero sobre base pequeña ($5.2k en agosto) — validar si es recurrente.",
      "Congelación (-55% vs LM, $304k proy.) y Laboratorio (-58% vs LM, $266k proy.) caen fuerte — junto con FIV/ICSI (-46%, $386k) explican la baja de -47% de la sede vs agosto. GDL no tiene Subrogación.",
      "Consultas +28% vs LM ($281k proy., +91% vs U3M) es la única línea de negocio con crecimiento sólido y consistente en GDL este corte.",
      "Vs año anterior: GDL +65% en septiembre proyectado y +121% en agosto cerrado — el retroceso vs agosto es secuencial, no interanual; la sede sigue creciendo con fuerza vs 2025.",
    ],
    MTP: [
      "Laboratorio cae -76% vs LM ($53.4k proy. vs $222k en agosto, -54% vs U3M) — el mayor retroceso porcentual de la sede este corte, aunque sobre volumen bajo.",
      "Congelación de Gametos -88% vs LM ($15.3k proy.) y Procedimientos sin proyección este corte (-79% vs LM) — sede pequeña, alta volatilidad mes a mes.",
      "Consultas es la línea más estable: $15.5k proyectado, +11% vs LM y vs U3M.",
      "Vs año anterior: Metepec -58% en septiembre proyectado y -9% en agosto cerrado — es la única sede con retroceso interanual este corte; dar seguimiento cercano.",
    ],
  },

  // ------------------------------------------------------------------------
  // RANKING DE CONSULTAS POR AGRUPACIÓN (Agosto = real + agendado), vs LM
  // ------------------------------------------------------------------------
  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 146, vsLM: 5 },
      { nombre: "Fertility Check up Mujeres", valor: 59, vsLM: 69 },
      { nombre: "Check up Ginecológico", valor: 54, vsLM: 26 },
      { nombre: "Check-up SOP", valor: 33, vsLM: 267 },
      { nombre: "Fertility Check up Parejas", valor: 26, vsLM: 117 },
      { nombre: "Consulta 1a Vez IP's", valor: 7, vsLM: 17 },
      { nombre: "Consulta ginecológica", valor: 4, vsLM: 100 },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 82, vsLM: -7 },
      { nombre: "Fertility Check up Mujeres", valor: 33, vsLM: 74 },
      { nombre: "Check up Ginecológico", valor: 12, vsLM: -25 },
      { nombre: "Fertility Check up Parejas", valor: 9, vsLM: 12 },
      { nombre: "Consulta 1a Vez IP's", valor: 7, vsLM: 17 },
    ],
    GDL: [
      { nombre: "Consulta primera vez", valor: 32, vsLM: 10 },
      { nombre: "Check-up SOP", valor: 30, vsLM: 233 },
      { nombre: "Check up Ginecológico", valor: 29, vsLM: 16 },
      { nombre: "Fertility Check up Mujeres", valor: 25, vsLM: 79 },
      { nombre: "Fertility Check up Parejas", valor: 13, vsLM: 225 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 32, vsLM: 46 },
      { nombre: "Check up Ginecológico", valor: 13, vsLM: 550 },
      { nombre: "Fertility Check up Parejas", valor: 4, vsLM: null, nuevo: true },
      { nombre: "Consulta ginecológica", valor: 3, vsLM: 200 },
      { nombre: "Fertility Check up Mujeres", valor: 1, vsLM: -50 },
    ],
  },

  // ------------------------------------------------------------------------
  // HUBSPOT — Pipeline "Interesa2". Leads por fecha de creación, citas por
  // Fecha_CitaAgendada_Int2. ESTOS VALORES YA SE CARGAN EN VIVO (ver
  // data-live.js y la hoja "Hubspot"/"HubspotSede"/"HubspotCohortes" del
  // Sheet) — lo de aquí es solo el respaldo si el fetch en vivo falla.
  // Corte de este respaldo: 31-ago-2026 (mes cerrado).
  // ------------------------------------------------------------------------
  hubspot: {
    leads: { hist: [836, 1068, 1023, 1015, 1759, 1438, 1538], actual: 1958 },
    citas: { hist: [188, 230, 319, 334, 367, 314, 415], actual: 482 },
    conversion_pct: { hist: [22, 22, 31, 33, 21, 22, 27], actual: 25 },
    conversion_por_sede: {
      // Agosto (cerrado) vs Total acumulado 2026
      CDMX: { agosto: 23, total2026: 28 },
      GDL: { agosto: 23, total2026: 21 },
      MTP: { agosto: 34, total2026: 30 },
    },
    cohortes: [
      { mes: "Ene-26", leads: 836, m0: 21, m1: 1, m2: 1, sin: 77 },
      { mes: "Feb-26", leads: 1068, m0: 19, m1: 2, m2: 0, sin: 79 },
      { mes: "Mar-26", leads: 1023, m0: 28, m1: 1, m2: 1, sin: 70 },
      { mes: "Abr-26", leads: 1015, m0: 31, m1: 3, m2: 1, sin: 65 },
      { mes: "May-26", leads: 1759, m0: 19, m1: 1, m2: 1, sin: 79 },
      { mes: "Jun-26", leads: 1438, m0: 20, m1: 2, m2: 0, sin: 78 },
      { mes: "Jul-26", leads: 1538, m0: 24, m1: 2, m2: 0, sin: 74 },
      { mes: "Ago-26", leads: 1958, m0: 22, m1: 0, m2: 0, sin: 78 },
    ],
  },

  // ------------------------------------------------------------------------
  // SUBROGACIÓN — pacientes por etapa (agregado, sin nombres), por sede.
  // ESTOS VALORES YA SE CARGAN EN VIVO (ver data-live.js y la hoja
  // "SubrogacionPacientes" del Sheet) — lo de aquí es solo el respaldo si el
  // fetch en vivo falla. "Valoración" = candidatas gestantes evaluadas;
  // "Programa Activo" = padres intencionales con paquete contratado — son
  // poblaciones distintas. Forma nueva: {total, CDMX, GDL, MTP}, cada una con
  // hist de 7 meses (Ene-Jul; Ago vive aparte en "actual") — igual forma que
  // arma buildSubrogacionForScope() en data-live.js, para que el filtro de
  // Sede no rompa aunque el fetch en vivo falle. Subrogación es ~100% CDMX,
  // así que este respaldo estático replica el total en CDMX y deja GDL/MTP
  // en cero (el live fetch trae el desglose real por sede). Corte: 30-ago-2026.
  // ------------------------------------------------------------------------
  subrogacion: (function(){
    const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul"];
    const cdmx = {
      labels,
      hist: {
        "Valoración":      [16, 4, 0, 4, 11, 4, 3],
        "Programa Activo": [0, 2, 0, 1, 1, 2, 3],
      },
      actual: {
        "Valoración":      { pacientes: 3, ingreso: 2844.82, ticket: 948.27 },
        "Programa Activo": { pacientes: 6, ingreso: 1460258.98, ticket: 243376.50 },
      },
      totalPacientesYTD: { "Valoración": 45, "Programa Activo": 15 },
      ingresoYTD: 3230474.36,
    };
    const vacio = {
      labels,
      hist: { "Valoración": [0,0,0,0,0,0,0], "Programa Activo": [0,0,0,0,0,0,0] },
      actual: {
        "Valoración":      { pacientes: 0, ingreso: 0, ticket: 0 },
        "Programa Activo": { pacientes: 0, ingreso: 0, ticket: 0 },
      },
      totalPacientesYTD: { "Valoración": 0, "Programa Activo": 0 },
      ingresoYTD: 0,
    };
    return { total: cdmx, CDMX: cdmx, GDL: vacio, MTP: vacio };
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
