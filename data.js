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
  corte: "21-sep-2026",
  meses_hist: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"],
  mes_actual: "Sep",

  // ------------------------------------------------------------------------
  // TOTAL COMPAÑÍA (Ingresos = dato oficial del corte; Atenciones y
  // Pacientes Únicos = suma de las 3 sedes, ya que se proyectan sede por
  // sede en el reporte fuente)
  // ------------------------------------------------------------------------
  // ARREGLO (21-sep-2026, 3ª pasada — METODOLOGÍA CONSERVADORA): la curva de
  // pacing pasó de promedio ponderado por recencia a el MÁXIMO share diario
  // observado en los 8 meses cerrados (ene-ago 2026) por sede — esto reduce
  // el multiplicador de "mes restante" y por tanto la proyección. Ratios
  // derivados también al extremo conservador: RATIO_PACIENTES_POR_ATENCION
  // usa el MÍNIMO mensual observado, RATIO_TICKET_PROMEDIO_ATENCION usa el
  // MÁXIMO (ver comentarios en data-live.js). Este bloque es SOLO el
  // respaldo que se muestra mientras carga el Sheet en vivo o si el fetch
  // falla — no tiene que ser exacto al peso.
  total: {
    nombre: "Todas las sedes",
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.7, 12.1, 12.0, 16.2], actual: 10.44, proy: 14.16, vsLM: -13, vsU3M: 5, nota: "Real a la fecha (corte 21-sep) $10.4M, proyección $14.2M a cierre — sube de $14.07M por un ajuste de pipeline comercial de +$91k en Guadalajara (Base!H, confirmado por Marite 22-sep); Atenciones/Pacientes sí se mantienen congelados, ver nota Highlights" },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3109], actual: 2517, proy: 2677, vsLM: -14, vsU3M: 0, nota: "suma CDMX+GDL+MTP, conteo de líneas de cargo (F. Cargo). Proyección CONGELADA al valor ya comunicado (2057/439/163 por sede), con piso en el real donde el real ya la superó (solo GDL: 439→457) — ver PROY_CONGELADA_SEP2026 en data-live.js" },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1003], actual: 992, proy: 992, vsLM: -1, vsU3M: 20, nota: "suma CDMX+GDL+MTP. Proyección CONGELADA al valor ya comunicado (683/215/55 por sede); el real a corte-21 ya superó ese piso en las 3 sedes, así que proy = real (ver PROY_CONGELADA_SEP2026 en data-live.js)" },
    // CORREGIDO 22-sep-2026: el corte anterior contaba TODAS las citas de la
    // base (lab, quirófano, admin, seguimiento) en vez de solo consultas de
    // Primera Vez — inflaba real/agendado ~4-5x. Filtro correcto: Grupo de
    // conceptos = "Primera Vez" (consistente con Ene-Ago, que ya venían así
    // filtrados de origen). ACTUALIZADO 22-sep-2026 (3ª pasada): Agendado =
    // TODAS las citas de "Citas agendadas" (Citado + Confirmada), no solo
    // Confirmada — decisión explícita de Marite tras preguntar por qué el
    // dashboard mostraba 23 cuando la hoja tiene 125 citas para después del
    // 21-sep (119 visibles por un filtro previo en la hoja, sin relación
    // con Estado). "Citado" = agendada pero aún sin confirmar por
    // paciente/staff — Marite prefiere la lectura más optimista aunque
    // pueda incluir citas que se cancelen o reagenden. proy = real + agendado.
    consultas: { hist: [166, 167, 233, 220, 225, 270, 255, 316], real: 223, agendado: 125, proy: 348, vsLM: 10, vsU3M: 24, nota: "actualizado 22-sep-2026 con Consultas_15.xlsx ('limpio') — real sin cambio (223); agendado redefinido a Citado+Confirmada (antes solo Confirmada) por instrucción de Marite: 21→125. hist Ene/Mar/Jun bajan levemente por depurar filas extra en CDMX" },
  },

  // ------------------------------------------------------------------------
  // POR SEDE
  // ------------------------------------------------------------------------
  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.5], actual: 9.18, proy: 12.36, vsLM: -1, vsU3M: 17 },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2072], actual: 1917, proy: 2057, vsLM: -1, vsU3M: 8, nota: "topado por techo de ticket promedio (Ingresos CDMX proyectado no sostiene más atenciones este mes) — ver SEDES_CON_TECHO_TICKET en data-live.js. Proyección CONGELADA (no cambia con este corte)" },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 621], actual: 714, proy: 714, vsLM: 15, vsU3M: 32, nota: "Proyección CONGELADA en 683 (valor ya comunicado); el real a corte-21 (714) ya la superó, así que proy = real (piso)" },
      consultas: { hist: [125, 105, 142, 145, 133, 168, 141, 137], real: 104, agendado: 56, proy: 160, vsLM: 17, vsU3M: 8, top_cat: "Consulta primera vez", top_n: 69 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8], actual: 0.96, proy: 1.50, vsLM: -46, vsU3M: -33, nota: "incluye ajuste de pipeline comercial +$91k (Base!H, confirmado por Marite 22-sep) sobre el Proyectado base de $1.41M" },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751], actual: 457, proy: 457, vsLM: -39, vsU3M: -19, nota: "Proyección CONGELADA en 439 (valor ya comunicado); el real a corte-21 (457) ya la superó, así que proy = real (piso) — ver PROY_CONGELADA_SEP2026 en data-live.js" },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287], actual: 221, proy: 221, vsLM: -23, vsU3M: 1, nota: "Proyección CONGELADA en 215 (valor ya comunicado); el real a corte-21 (221) ya la superó, así que proy = real (piso)" },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133], real: 94, agendado: 40, proy: 134, vsLM: 1, vsU3M: 28, top_cat: "Check up Ginecológico", top_n: 29 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9], actual: 0.30, proy: 0.30, vsLM: -66, vsU3M: -50 },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286], actual: 143, proy: 163, vsLM: -43, vsU3M: -21, nota: "Proyección CONGELADA (no cambia con este corte)" },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95], actual: 57, proy: 57, vsLM: -40, vsU3M: -11, nota: "Proyección CONGELADA en 55 (valor ya comunicado); el real a corte-21 (57) ya la superó, así que proy = real (piso)" },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46], real: 25, agendado: 29, proy: 54, vsLM: 17, vsU3M: 98, top_cat: "Consulta primera vez", top_n: 33 },
    },
  },

  // ------------------------------------------------------------------------
  // SERVICIOS — Ingresos por servicio, proyectado (MDP), vs LM y vs U3M
  // ------------------------------------------------------------------------
  servicios: {
    // Resincronizado 21-sep-2026 (3ª pasada — METODOLOGÍA CONSERVADORA, ver
    // ingresos_projection_rows_v3_conservador en la sesión que generó este
    // corte; vsLM = vs. agosto cerrado, vsU3M = vs. promedio jun/jul/ago
    // cerrados). Misma curaduría de servicios por sede que la pasada
    // anterior, solo con los valores recalculados al extremo conservador.
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.7, vsLM: -25, vsU3M: -10 },
      { nombre: "Congelación de Gametos", valor: 3.7, vsLM: 29, vsU3M: 45 },
      { nombre: "Farmacia", valor: 2.8, vsLM: -17, vsU3M: -6 },
      { nombre: "Laboratorio", valor: 2.4, vsLM: -5, vsU3M: 14 },
      { nombre: "Subrogación", valor: 0.5, vsLM: -65, vsU3M: -41 },
      { nombre: "Consultas", valor: 0.5, vsLM: 0, vsU3M: 19 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.2, vsLM: -44, vsU3M: -26 },
      { nombre: "Imágenes", valor: 0.2, vsLM: 218, vsU3M: 154 },
      { nombre: "Wellness", valor: 0.1, vsLM: 262, vsU3M: 405 },
      { nombre: "Otros", valor: 0.0, vsLM: 49, vsU3M: 9 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.3, vsLM: -17, vsU3M: 1 },
      { nombre: "Congelación de Gametos", valor: 3.1, vsLM: 54, vsU3M: 55 },
      { nombre: "Farmacia", valor: 2.5, vsLM: -3, vsU3M: 6 },
      { nombre: "Laboratorio", valor: 2.2, vsLM: 26, vsU3M: 43 },
      { nombre: "Subrogación", valor: 0.5, vsLM: -65, vsU3M: -41 },
      { nombre: "Consultas", valor: 0.3, vsLM: 17, vsU3M: 18 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.2, vsLM: -37, vsU3M: -18 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.5, vsLM: -27, vsU3M: 12 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.3, vsLM: -51, vsU3M: -48 },
      { nombre: "Laboratorio", valor: 0.2, vsLM: -65, vsU3M: -56 },
      { nombre: "Consultas", valor: 0.2, vsLM: -17, vsU3M: 24 },
      { nombre: "Farmacia", valor: 0.1, vsLM: -77, vsU3M: -71 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: -54, vsU3M: -49 },
      { nombre: "Imágenes", valor: 0.0, vsLM: 281, vsU3M: 53 },
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.2, vsLM: -43, vsU3M: -24 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.1, vsLM: -74, vsU3M: -67 },
      { nombre: "Laboratorio", valor: 0.0, vsLM: -79, vsU3M: -60 },
      { nombre: "Congelación de Gametos", valor: 0.0, vsLM: -78, vsU3M: -56 },
      { nombre: "Consultas", valor: 0.0, vsLM: -15, vsU3M: -14 },
      { nombre: "Imágenes", valor: 0.0, vsLM: -79, vsU3M: -79 },
    ],
  },

  // ------------------------------------------------------------------------
  // HIGHLIGHTS — hallazgos cualitativos del corte (texto libre, editable)
  // ------------------------------------------------------------------------
  // Reescrito 21-sep-2026 (corte 19→21): Marite pidió explícitamente "no
  // cambien la proyección" al mover el corte. La Proyección a cierre de mes
  // (Atenciones 2,677, Pacientes 992) se mantiene igual a la ya comunicada,
  // salvo el piso mínimo en las sedes donde el Real ya la superó (ver nota
  // en cada tarjeta y PROY_CONGELADA_SEP2026 en data-live.js).
  // ACTUALIZADO 22-sep-2026: Ingresos SÍ cambia este corte — de $14.07M a
  // $14.2M (14.16 exacto) — por un ajuste de pipeline comercial de +$91k
  // que Marite cargó a mano en Base!H (columna AjustePipelineComercial)
  // para Guadalajara; confirmado explícitamente por Marite como intencional
  // (no es drift de fórmula ni error). CDMX y MTP no tienen ajuste en H
  // (siguen exactos: $12.36M / $0.30M). buildIngresosMetric() en
  // data-live.js ya sumaba Base!F + Base!H desde antes, así que el
  // dashboard en vivo no necesitó ningún cambio de código — solo se
  // actualizan aquí los valores estáticos de respaldo.
  highlights: {
    total: [
      "Proyección de cierre: Ingresos $14.2M (sube de $14.07M por un ajuste de pipeline comercial de +$91k en Guadalajara, confirmado por Marite), Atenciones 2,677, Pacientes 992 — estos dos se mantienen en el valor ya comunicado (con ajuste de piso en Atenciones GDL 439→457 y en Pacientes de las 3 sedes, donde el Real a corte-21 ya lo superó). Consultas SÍ cambia este corte: proyección corregida a 348 (antes 1,658 — combina el error de filtro corregido con la decisión de Marite de contar también las citas \"Citado\" sin confirmar, no solo \"Confirmada\"; ver detalle abajo).",
      "Ingresos: Real acumulado a corte-21 $10.44M (vs $9.81M a corte-19), Ratio a cierre 1.36x — el avance del Real no mueve la Proyección (Base!F es un valor fijo por Sede×Servicio, no recalculado por corte); el único movimiento de este corte es el ajuste de pipeline comercial +$91k en GDL (Base!H), que Marite confirmó como intencional.",
      "Pacientes: el Real (992) ya IGUALA a la Proyección congelada en las 3 sedes — es decir, septiembre alcanzó con 9 días de anticipación el nivel de pacientes que se había proyectado para el cierre del mes completo. Vale la pena revisar si el piso congelado sigue siendo conservador o si conviene reabrir la proyección el próximo corte.",
      "Consultas: CORREGIDO este corte — la cifra anterior (1,036 real / 1,658 proyectado) contaba TODAS las citas de la base (laboratorio, quirófano, administrativo, seguimiento), no solo consultas de Primera Vez. Filtrando correctamente con el archivo limpio que Marite subió (Consultas_15.xlsx): 223 reales (1-21 sep) + 125 agendadas (Citado + Confirmada) = 348 proyectado, +10% vs agosto (316) — Marite pidió explícitamente contar también las citas \"Citado\" (agendadas pero aún sin confirmar por paciente/staff), no solo las 23 ya \"Confirmada\"; es una lectura más optimista que puede incluir citas que se cancelen o reagenden.",
      "Subrogación: resuelto el desglose Valoración/Programa Activo con una metodología de clasificación por Concepto de cargo (Valoración subrogada vs. paquetes Surrogacy) — Programa Activo Sep reproduce EXACTO el valor ya publicado antes de este corte (2 pacientes, $286,207), lo que valida la metodología. Valoración sube a 54 pacientes ($75,388), casi el doble de las 28 del corte anterior.",
      "HubSpot: 1,365 leads y 328 citas agendadas a corte-21 (24% conversión), ritmo consistente con el mes cerrado de agosto (1,958 leads / 482 citas al cierre completo) — sin señales de desviación en el embudo.",
    ],
    CDMX: [
      "Ingresos MTD $9.18M (88% del Real total de la compañía), Proyección sin cambio en $12.36M.",
      "Atenciones: Real 1,917, Proyección se mantiene en 2,057 (aún no alcanza el piso, a diferencia de GDL) — sigue topada por el techo de ticket promedio (ver SEDES_CON_TECHO_TICKET en data-live.js).",
      "Pacientes: Real 714 ya superó el piso congelado (683) — Proyección = Real. Es la sede con el mayor volumen absoluto de pacientes nuevos del mes.",
      "Consultas: CORREGIDO — 104 reales + 56 agendadas (Citado + Confirmada) = 160 proyectado, +17% vs agosto (137). La cifra previamente reportada (699/1,185) incluía citas que no son consultas de Primera Vez; el agendado ahora cuenta también las \"Citado\" sin confirmar (antes solo 12 Confirmada).",
    ],
    GDL: [
      "Ingresos MTD $0.96M, Proyección sube a $1.50M (antes $1.41M) por un ajuste de pipeline comercial de +$91k que Marite cargó en Base!H para septiembre — sigue siendo la sede con mayor brecha vs su propio Real (Ratio 1.56x).",
      "Atenciones: Real 457 YA SUPERÓ el piso congelado (439) — único ajuste de Proyección de Atenciones este corte (439→457, +18). Vale la pena revisar en el próximo corte si el pipeline comercial de GDL ya sostiene ese nivel o si el techo por ticket promedio debería reactivarse (ver nota histórica en data-live.js).",
      "Pacientes: Real 221 también superó su piso (215) — Proyección = Real.",
      "Consultas: CORREGIDO — 94 reales + 40 agendadas (Citado + Confirmada) = 134 proyectado, +1% vs agosto (133). La cifra previamente reportada (252/343) incluía citas que no son consultas de Primera Vez; el agendado ahora cuenta también las \"Citado\" sin confirmar (antes solo 6 Confirmada).",
    ],
    MTP: [
      "Ingresos MTD $0.30M, Proyección prácticamente alcanzada ($301,852 vs. Real $300,805 — margen de apenas ~$1,000) — es la sede más cerca de agotar su Proyección antes de fin de mes; vigilar de cerca el próximo corte.",
      "Atenciones: Real 143, todavía por debajo del piso congelado (163) — es la única sede donde la Proyección de Atenciones no tuvo que ajustarse este corte.",
      "Pacientes: Real 57 superó su piso (55) — Proyección = Real.",
      "Consultas: CORREGIDO — 25 reales + 29 agendadas (Citado + Confirmada) = 54 proyectado, +17% vs agosto (46). La cifra previamente reportada (85/130) incluía citas que no son consultas de Primera Vez; el agendado ahora cuenta también las \"Citado\" sin confirmar (antes solo 5 Confirmada).",
    ],
  },

  // ------------------------------------------------------------------------
  // RANKING DE CONSULTAS POR AGRUPACIÓN (Sep = real + agendado), vs LM (Ago
  // cerrado). CORREGIDO 22-sep-2026: filtrado a Grupo de conceptos =
  // "Primera Vez" (antes incluía laboratorio/quirófano/administrativo).
  // ACTUALIZADO 22-sep-2026 (3ª pasada): recalculado con Consultas_15.xlsx
  // Y con Agendado redefinido a Citado+Confirmada (ver nota en
  // total.consultas) — real Sep total (223) y por sede no cambian.
  // ------------------------------------------------------------------------
  consultas_ranking: {
    total: [
      { nombre: "Consulta primera vez", valor: 121, vsLM: 25 },
      { nombre: "Consulta primera vez online", valor: 55, vsLM: 72 },
      { nombre: "Fertility Check up Mujeres", valor: 54, vsLM: 12 },
      { nombre: "Check up Ginecológico", valor: 41, vsLM: -23 },
      { nombre: "Check-up SOMP", valor: 24, vsLM: null, nuevo: true },
      { nombre: "Check up Integral", valor: 17, vsLM: 750 },
      { nombre: "Fertility Check up Parejas", valor: 17, vsLM: -37 },
    ],
    CDMX: [
      { nombre: "Consulta primera vez", valor: 69, vsLM: 33 },
      { nombre: "Consulta primera vez online", valor: 33, vsLM: 43 },
      { nombre: "Fertility Check up Mujeres", valor: 32, vsLM: 23 },
      { nombre: "Fertility Check up Parejas", valor: 8, vsLM: -27 },
      { nombre: "Check up Ginecológico", valor: 6, vsLM: -45 },
    ],
    GDL: [
      { nombre: "Check up Ginecológico", valor: 29, vsLM: 0 },
      { nombre: "Check-up SOMP", valor: 22, vsLM: null, nuevo: true },
      { nombre: "Fertility Check up Mujeres", valor: 19, vsLM: -10 },
      { nombre: "Consulta primera vez", valor: 19, vsLM: -27 },
      { nombre: "Check up Integral", valor: 17, vsLM: 750 },
    ],
    MTP: [
      { nombre: "Consulta primera vez", valor: 33, vsLM: 74 },
      { nombre: "Check up Ginecológico", valor: 6, vsLM: -54 },
      { nombre: "Consulta primera vez online", valor: 6, vsLM: 100 },
      { nombre: "Fertility Check up Parejas", valor: 4, vsLM: 33 },
      { nombre: "Fertility Check up Mujeres", valor: 3, vsLM: 200 },
    ],
  },

  // ------------------------------------------------------------------------
  // HUBSPOT — Pipeline "Interesa2". Leads por fecha de creación, citas por
  // Fecha_CitaAgendada_Int2. ESTOS VALORES YA SE CARGAN EN VIVO (ver
  // data-live.js y la hoja "Hubspot"/"HubspotSede"/"HubspotCohortes" del
  // Sheet) — lo de aquí es solo el respaldo si el fetch en vivo falla.
  // Corte de este respaldo: 21-sep-2026 (mes en curso; leads/citas de sep son
  // MTD 1-21, conversion_por_sede.total2026 es acumulado Ene-21sep).
  // ------------------------------------------------------------------------
  hubspot: {
    leads: { hist: [836, 1068, 1023, 1015, 1759, 1438, 1538, 1958], actual: 1365 },
    citas: { hist: [188, 230, 319, 334, 367, 314, 415, 482], actual: 328 },
    conversion_pct: { hist: [22, 22, 31, 33, 21, 22, 27, 25], actual: 24 },
    conversion_por_sede: {
      // Agosto (cerrado) vs Total acumulado 2026 (Ene-21sep)
      CDMX: { agosto: 23, total2026: 28 },
      GDL: { agosto: 23, total2026: 21 },
      MTP: { agosto: 34, total2026: 31 },
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
      { mes: "Sep-26", leads: 1365, m0: 266, m1: 0, m2: 0, sin: 1099 },
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
  // en cero (el live fetch trae el desglose real por sede). Corte: 21-sep-2026
  // (Ago ya cerrado y pasa a "hist"; "actual" = Sep, corte-21). Resincronizado
  // 21-sep-2026: Valoración/Programa Activo derivados de los Conceptos
  // "Valoración subrogada" y "*Surrogacy Package*" en Cargos_y_Facturas_33
  // (metodología validada: Programa Activo Sep reproduce EXACTO el valor ya
  // publicado antes de este corte, 2 pacientes/$286,206.89 — confirma que la
  // clasificación por Concepto es correcta).
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
        "Valoración":      { pacientes: 54, ingreso: 75387.73, ticket: 1396.07 },
        "Programa Activo": { pacientes: 2, ingreso: 286206.89, ticket: 143103.45 },
      },
      totalPacientesYTD: { "Valoración": 99, "Programa Activo": 17 },
      ingresoYTD: 3592068.98,
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
