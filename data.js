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
  corte: "27-sep-2026",
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
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.7, 12.1, 12.0, 16.2], actual: 12.38, proy: 13.46, vsLM: -22, vsU3M: -6, nota: "CORREGIDO 28-sep-2026: se detectó que el 'máximo histórico' de la curva de pacing estaba determinado en las 3 sedes por febrero, un mes de 28 días — su día 27 equivale al 96% del mes vs. 90% en septiembre (30 días), lo que sesgaba el techo conservador y dejaba una proyección artificialmente baja para el cierre (antes $12.65M). Se recalculó excluyendo febrero de la calibración del pacing por día-calendario (Ene, Mar-Ago); Real y Proyectado por Sede×Servicio recalculados en Base con el factor sede-nivel resultante (no se recategorizó Concepto→Servicio). Incluye el ajuste de pipeline comercial +$91k de GDL (Base!H)." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3109], actual: 3212, proy: 3212, vsLM: 3, vsU3M: 20, nota: "suma CDMX+GDL+MTP, conteo de líneas de cargo (F. Cargo) hasta el 27-sep. DEJA DE ESTAR CONGELADA desde este corte (instrucción explícita de Marite) — se recalcula con la curva de pacing conservadora; a estas alturas del mes (día 27 de 30) la curva ya casi satura en 1.0, así que Proyectado = Real en las 3 sedes (no queda margen de extrapolación conservador)." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1003], actual: 1240, proy: 1240, vsLM: 24, vsU3M: 50, nota: "suma CDMX+GDL+MTP, pacientes ÚNICOS del mes (dedup por Historia). DEJA DE ESTAR CONGELADA desde este corte — Proyectado = max(Real, Atenciones_proy × ratio conservador); con Atenciones ya sin margen de extrapolación, Proyectado = Real en las 3 sedes." },
    // ACTUALIZADO 27-sep-2026 con Consultas_16.xlsx: real Sep sube de 223 a
    // 281 (crece con el corte, normal). Agendado se recalculó corrigiendo la
    // fórmula en vivo de la hoja "Consultas" (columnas E26:E28), que seguía
    // contando SOLO "Confirmada" pese a la decisión ya tomada de incluir
    // también "Citado" — quedó en 48 (26+11+11). proy = real + agendado.
    consultas: { hist: [168, 167, 235, 220, 225, 271, 255, 316], real: 281, agendado: 48, proy: 329, vsLM: 4, vsU3M: 17, nota: "actualizado 27-sep-2026 con Consultas_16.xlsx — real 281 (1-26 sep aprox.), agendado 48 (Citado+Confirmada, corrigiendo la fórmula en vivo que solo contaba Confirmada). hist sube levemente en Ene/Mar/Jun por datos más completos del archivo nuevo." },
  },

  // ------------------------------------------------------------------------
  // POR SEDE
  // ------------------------------------------------------------------------
  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.5], actual: 10.67, proy: 11.59, vsLM: -13, vsU3M: 2, nota: "CORREGIDO 28-sep-2026: proyección recalculada excluyendo febrero (mes de 28 días) del máximo histórico de la curva de pacing — antes $10.83M." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2072], actual: 2404, proy: 2404, vsLM: 16, vsU3M: 27, nota: "Proyección = Real: a corte-27 la curva de pacing conservadora ya está casi saturada (día 27 de 30) y el techo de ticket promedio (ver SEDES_CON_TECHO_TICKET) no deja margen adicional. Ya no está congelada." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 621], actual: 886, proy: 886, vsLM: 43, vsU3M: 63, nota: "pacientes únicos del mes (dedup Historia). Proyección = Real, ya no congelada." },
      consultas: { hist: [127, 105, 144, 145, 133, 169, 141, 137], real: 129, agendado: 26, proy: 155, vsLM: 13, vsU3M: 4, top_cat: "Consulta primera vez", top_n: 69 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8], actual: 1.30, proy: 1.46, vsLM: -50, vsU3M: -37, nota: "CORREGIDO 28-sep-2026: proyección base recalculada excluyendo febrero del máximo histórico de la curva de pacing ($1.37M, antes $1.32M), más el ajuste de pipeline comercial +$91k (Base!H) = $1.46M (antes $1.41M)." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751], actual: 613, proy: 613, vsLM: -18, vsU3M: 9, nota: "Proyección = Real (curva ya saturada a corte-27). Ya no está congelada." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287], actual: 279, proy: 279, vsLM: -3, vsU3M: 27, nota: "pacientes únicos del mes. Proyección = Real, ya no congelada." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133], real: 112, agendado: 11, proy: 123, vsLM: -8, vsU3M: 18, top_cat: "Check up Ginecológico", top_n: 29 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9], actual: 0.41, proy: 0.41, vsLM: -54, vsU3M: -32, nota: "sin cambio material tras excluir febrero: en MTP el máximo histórico del pacing lo pone junio (98.6%), no febrero, así que casi no hay margen de mes restante de cualquier forma." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286], actual: 195, proy: 195, vsLM: -32, vsU3M: -5, nota: "Proyección = Real (curva ya saturada a corte-27). Ya no está congelada." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95], actual: 75, proy: 75, vsLM: -21, vsU3M: 17, nota: "pacientes únicos del mes. Proyección = Real, ya no congelada." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46], real: 40, agendado: 11, proy: 51, vsLM: 11, vsU3M: 87, top_cat: "Consulta primera vez", top_n: 33 },
    },
  },

  // ------------------------------------------------------------------------
  // SERVICIOS — Ingresos por servicio, proyectado (MDP), vs LM y vs U3M
  // ------------------------------------------------------------------------
  servicios: {
    // CORREGIDO 28-sep-2026: la curva de pacing conservadora usaba febrero
    // (28 días) como "máximo histórico" en las 3 sedes, lo que subestimaba
    // la proyección de Ingresos por el sesgo de calendario (día 27 = 96%
    // del mes en febrero vs. 90% en septiembre). Se recalculó excluyendo
    // febrero de la calibración; los valores de esta tabla vienen de
    // Base!F ya corregido, propagando el mismo factor sede-nivel a cada
    // servicio (misma curaduría de servicios por sede que la pasada
    // anterior). vsLM = vs. agosto cerrado, vsU3M = vs. promedio jun/jul/ago
    // cerrados.
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.5, vsLM: -29, vsU3M: -15 },
      { nombre: "Congelación de Gametos", valor: 3.5, vsLM: 21, vsU3M: 36 },
      { nombre: "Farmacia", valor: 2.7, vsLM: -21, vsU3M: -11 },
      { nombre: "Laboratorio", valor: 2.3, vsLM: -8, vsU3M: 10 },
      { nombre: "Subrogación", valor: 0.5, vsLM: -66, vsU3M: -43 },
      { nombre: "Consultas", valor: 0.4, vsLM: -10, vsU3M: 7 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.2, vsLM: -36, vsU3M: -15 },
      { nombre: "Imágenes", valor: 0.2, vsLM: 183, vsU3M: 126 },
      { nombre: "Wellness", valor: 0.1, vsLM: 107, vsU3M: 188 },
      { nombre: "Otros", valor: 0.0, vsLM: 49, vsU3M: 9 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.1, vsLM: -23, vsU3M: -6 },
      { nombre: "Congelación de Gametos", valor: 3.0, vsLM: 47, vsU3M: 48 },
      { nombre: "Farmacia", valor: 2.3, vsLM: -9, vsU3M: -1 },
      { nombre: "Laboratorio", valor: 2.0, vsLM: 17, vsU3M: 33 },
      { nombre: "Subrogación", valor: 0.5, vsLM: -66, vsU3M: -43 },
      { nombre: "Consultas", valor: 0.3, vsLM: 0, vsU3M: 1 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.2, vsLM: -37, vsU3M: -18 },
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.5, vsLM: -30, vsU3M: 8 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.3, vsLM: -45, vsU3M: -42 },
      { nombre: "Laboratorio", valor: 0.2, vsLM: -63, vsU3M: -53 },
      { nombre: "Consultas", valor: 0.2, vsLM: -27, vsU3M: 10 },
      { nombre: "Farmacia", valor: 0.1, vsLM: -76, vsU3M: -70 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: -54, vsU3M: -49 },
      { nombre: "Imágenes", valor: 0.0, vsLM: 281, vsU3M: 53 },
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.2, vsLM: -41, vsU3M: -21 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.1, vsLM: -78, vsU3M: -72 },
      { nombre: "Laboratorio", valor: 0.1, vsLM: -79, vsU3M: -60 },
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
      "Corte 27-sep-2026 — cambio de metodología: Atenciones y Pacientes YA NO ESTÁN CONGELADAS. Desde este corte se recalculan cada vez con la curva de pacing conservadora (máximo histórico Ene-Ago), igual que Ingresos. A día 27 la curva ya está prácticamente saturada (~1.0 de share acumulado), así que en las 3 sedes Proyectado = Real: Atenciones 3,212 (+3% vs agosto, +20% vs prom. últimos 3 meses cerrados) y Pacientes ÚNICOS del mes 1,240 (+24% vs agosto, +50% vs U3M) — no queda margen de extrapolación conservador este mes.",
      "Ingresos: Real acumulado a corte-27 $12.38M, Proyección $13.46M (Ratio a cierre 1.09x) — incluye el ajuste de pipeline comercial +$91k de Guadalajara (Base!H). CORREGIDO: la primera versión de este corte daba $12.65M porque el 'máximo histórico' de la curva de pacing estaba determinado en las 3 sedes por febrero (mes de 28 días — su día 27 ya es 96% del mes vs. 90% en septiembre), dejando casi sin margen los últimos 3 días. Se recalculó excluyendo febrero de la calibración por día-calendario. El Real/Proyectado por Sede×Servicio se recalculó propagando un factor a nivel sede a cada fila existente (no se rehizo la categorización Concepto→Servicio completa de los ~3,200 nuevos cargos de septiembre — ver nota de alcance).",
      "Consultas: se corrigió un bug real en la fórmula en vivo de \"Agendado\" (RAW_CitasAgendadas) — solo contaba citas \"Confirmada\" y excluía \"Citado\", pese a que esa política ya se había decidido en cortes previos. Con la fórmula corregida: 281 reales + 48 agendadas = 329 proyectado (+4% vs agosto, +17% vs U3M).",
      "Alcance de este corte: se actualizaron Ingresos/Atenciones/Pacientes/Consultas (Real y Proyección) y Mezcla de servicios (con propagación de factor por sede, sin recategorización). NO se refrescaron este pase: Subrogación, Evolutivo por médico, HubSpot ni el detalle de Consultas por concepto (consultas_ranking) — quedan con los valores del corte anterior.",
    ],
    CDMX: [
      "Ingresos MTD $10.67M, Proyección $11.59M (+9% vs agosto) — corregida por el sesgo de febrero en la curva de pacing (antes $10.83M).",
      "Atenciones: Real 2,404 = Proyección (ya no congelada) — +16% vs agosto, +27% vs U3M.",
      "Pacientes únicos: Real 886 = Proyección — +43% vs agosto, +63% vs U3M. Es la sede con mayor volumen absoluto.",
      "Consultas: 129 reales + 26 agendadas = 155 proyectado, +13% vs agosto.",
    ],
    GDL: [
      "Ingresos MTD $1.30M, Proyección $1.46M — incluye el ajuste de pipeline comercial +$91k en Base!H (sobre un Proyectado base de $1.37M, corregido por el sesgo de febrero; antes $1.41M).",
      "Atenciones: Real 613 = Proyección — -18% vs agosto, +9% vs U3M.",
      "Pacientes únicos: Real 279 = Proyección — -3% vs agosto, +27% vs U3M.",
      "Consultas: 112 reales + 11 agendadas = 123 proyectado, -8% vs agosto.",
    ],
    MTP: [
      "Ingresos MTD $0.41M, Proyección $0.41M — la sede con mayor caída relativa vs agosto (-54%) y vs U3M (-32%).",
      "Atenciones: Real 195 = Proyección — -32% vs agosto.",
      "Pacientes únicos: Real 75 = Proyección — -21% vs agosto, +17% vs U3M.",
      "Consultas: 40 reales + 11 agendadas = 51 proyectado, +11% vs agosto, +87% vs U3M — el mayor repunte relativo de las 3 sedes.",
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
