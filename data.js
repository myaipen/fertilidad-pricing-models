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
  corte: "28-sep-2026",
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
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.7, 12.1, 12.0, 16.2], actual: 12.99, proy: 13.61, vsLM: -22, vsU3M: -6, nota: "ACTUALIZADO 29-sep-2026 (2ª sync, mismo corte 28-sep): Marite volvió a ajustar el pipeline comercial de GDL en Base!H (bajó de $31k a $8,000 — ver detalle en highlight de GDL). Proyectado total baja de $13.63M a $13.61M (Base!F no cambió, solo H). Real se mantiene en $12.99M." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3109], actual: 3327, proy: 3327, vsLM: 7, vsU3M: 25, nota: "suma CDMX+GDL+MTP, conteo de líneas de cargo (F. Cargo) hasta el 28-sep. Se recalcula con la curva de pacing conservadora (ya no congelada); a día 28 de 30 la curva sigue prácticamente saturada, así que Proyectado = Real en las 3 sedes." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1003], actual: 1270, proy: 1270, vsLM: 27, vsU3M: 54, nota: "suma CDMX+GDL+MTP, pacientes ÚNICOS del mes (dedup por Historia). Proyectado = max(Real, Atenciones_proy × ratio conservador); con Atenciones ya sin margen de extrapolación, Proyectado = Real en las 3 sedes." },
    // ACTUALIZADO 29-sep-2026 con Consultas_17.xlsx (corte 28-sep): real sube
    // de 281 a 293, agendado baja de 48 a 33 (18+9+6 — normal: conforme pasan
    // los días, citas "agendadas" se vuelven "real"). proy = real + agendado
    // = 326 (antes 329, prácticamente estable).
    consultas: { hist: [168, 167, 235, 220, 225, 271, 255, 316], real: 293, agendado: 33, proy: 326, vsLM: 3, vsU3M: 16, nota: "actualizado 29-sep-2026 con Consultas_17.xlsx — real 293 (1-28 sep), agendado 33 (Citado+Confirmada). proy = real + agendado." },
    // ACTUALIZADO 29-sep-2026 con la hoja "No show" de Consultas_17.xlsx
    // (día<=28-sep, mismo filtro Grupo de conceptos = "Primera Vez"). % No
    // show = no_show / (real + no_show). hist sin cambio (8 meses cerrados);
    // actual = % de septiembre MTD a corte-28; prom = promedio simple de los
    // 8 meses cerrados; deltaPts = actual - prom.
    // TODAVÍA ES MANUAL (como Highlights) — no hay hoja "No show" en vivo en
    // el Sheet; si se agrega un tab RAW_NoShow con el mismo patrón que
    // RAW_CitasAgendadas, se puede automatizar en data-live.js.
    noshow: { hist: [8.7, 6.2, 13.9, 15.7, 19.1, 14.8, 14.7, 15.3], actual: 16.8, prom: 13.5, deltaPts: 3.3 },
  },

  // ------------------------------------------------------------------------
  // POR SEDE
  // ------------------------------------------------------------------------
  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.5], actual: 11.26, proy: 11.74, vsLM: -12, vsU3M: 3, nota: "ACTUALIZADO 29-sep-2026 (corte 28-sep): Real sube de $10.67M a $11.26M; Proyectado de $11.65M a $11.74M (piso MAX(Proyectado,Real) fila por fila, sin violaciones)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2072], actual: 2492, proy: 2492, vsLM: 20, vsU3M: 31, nota: "Proyección = Real: a corte-28 la curva de pacing conservadora sigue prácticamente saturada y el techo de ticket promedio (ver SEDES_CON_TECHO_TICKET) no deja margen adicional." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 621], actual: 900, proy: 900, vsLM: 45, vsU3M: 66, nota: "pacientes únicos del mes (dedup Historia). Proyección = Real." },
      consultas: { hist: [127, 105, 144, 145, 133, 169, 141, 137], real: 132, agendado: 18, proy: 150, vsLM: 9, vsU3M: 1, top_cat: "Consulta primera vez", top_n: 69 },
      noshow: { hist: [7.3, 7.9, 11.1, 14.2, 19.9, 10.1, 13.0, 11.0], actual: 14.3, prom: 11.8, deltaPts: 2.5 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8], actual: 1.32, proy: 1.43, vsLM: -52, vsU3M: -40, nota: "ACTUALIZADO 29-sep-2026 (2ª sync, mismo corte 28-sep): Marite volvió a mover el ajuste de pipeline comercial de GDL en Base!H — ya no es $91k ni $31k, ahora es $8,000 en total (Farmacia $5,000 + Consultas $3,000, resto en blanco). Proyectado baja de $1.46M a $1.43M. El Proyectado base sin H (Base!F, con el piso MAX(Proyectado,Real) ya aplicado) no cambió: $1.42M." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751], actual: 627, proy: 627, vsLM: -17, vsU3M: 12, nota: "Proyección = Real (curva ya saturada a corte-28)." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287], actual: 286, proy: 286, vsLM: 0, vsU3M: 31, nota: "pacientes únicos del mes. Proyección = Real." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133], real: 116, agendado: 9, proy: 125, vsLM: -6, vsU3M: 20, top_cat: "Check up Ginecológico", top_n: 29 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2], actual: 15.3, prom: 14.6, deltaPts: 0.7 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9], actual: 0.41, proy: 0.44, vsLM: -53, vsU3M: -31, nota: "ACTUALIZADO 29-sep-2026 (corte 28-sep): Real se mantiene en $0.41M; Proyectado sube de $0.43M a $0.44M (piso MAX(Proyectado,Real) fila por fila)." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286], actual: 208, proy: 208, vsLM: -27, vsU3M: 1, nota: "Proyección = Real (curva ya saturada a corte-28)." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95], actual: 84, proy: 84, vsLM: -12, vsU3M: 31, nota: "pacientes únicos del mes. Proyección = Real." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46], real: 45, agendado: 6, proy: 51, vsLM: 11, vsU3M: 87, top_cat: "Consulta primera vez", top_n: 33 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1], actual: 26.2, prom: 21.3, deltaPts: 4.9 },
    },
  },

  // ------------------------------------------------------------------------
  // SERVICIOS — Ingresos por servicio, proyectado (MDP), vs LM y vs U3M
  // ------------------------------------------------------------------------
  servicios: {
    // CORREGIDO 29-sep-2026 (2ª corrección, ver nota en total.ingresos): 10
    // de las 30 filas Sede×Servicio de Base tenían Real > Proyectado (Marite
    // lo detectó en GDL·Consultas) — se aplicó un piso Proyectado =
    // MAX(Proyectado, Real) fila por fila en Base, lo que sube el valor de
    // varios servicios de esta tabla (marcados abajo). vsLM = vs. agosto
    // cerrado, vsU3M = vs. promedio jun/jul/ago cerrados.
    total: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.5, vsLM: -29, vsU3M: -15 },
      { nombre: "Congelación de Gametos", valor: 3.6, vsLM: 24, vsU3M: 39 }, // corte 28-sep: era 3.5, 21, 36
      { nombre: "Farmacia", valor: 2.7, vsLM: -21, vsU3M: -11 },
      { nombre: "Laboratorio", valor: 2.3, vsLM: -8, vsU3M: 10 },
      { nombre: "Subrogación", valor: 0.5, vsLM: -66, vsU3M: -43 },
      { nombre: "Consultas", valor: 0.5, vsLM: -2, vsU3M: 16 }, // corte 28-sep (2ª sync): era -3, 15 — incluye el H de GDL·Consultas ($3,000)
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.3, vsLM: -15, vsU3M: 12 }, // corte 28-sep: era -19, 7
      { nombre: "Imágenes", valor: 0.2, vsLM: 188, vsU3M: 130 },
      { nombre: "Wellness", valor: 0.1, vsLM: 107, vsU3M: 190 }, // corte 28-sep: era vsU3M 189
      { nombre: "Otros", valor: 0.0, vsLM: 49, vsU3M: 9 },
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.1, vsLM: -23, vsU3M: -6 },
      { nombre: "Congelación de Gametos", valor: 3.0, vsLM: 51, vsU3M: 52 }, // corte 28-sep: era 47, 48
      { nombre: "Farmacia", valor: 2.3, vsLM: -9, vsU3M: -1 },
      { nombre: "Laboratorio", valor: 2.0, vsLM: 17, vsU3M: 33 },
      { nombre: "Subrogación", valor: 0.5, vsLM: -66, vsU3M: -43 },
      { nombre: "Consultas", valor: 0.3, vsLM: 0, vsU3M: 1 },
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.3, vsLM: -13, vsU3M: 12 }, // corte 28-sep: era -18, 6
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.5, vsLM: -30, vsU3M: 8 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.3, vsLM: -44, vsU3M: -41 }, // corte 28-sep: era -45, -42
      { nombre: "Laboratorio", valor: 0.2, vsLM: -63, vsU3M: -53 },
      { nombre: "Consultas", valor: 0.2, vsLM: -12, vsU3M: 31 }, // corte 28-sep (2ª sync): era -13, 29 — incluye H=$3,000 de Base
      { nombre: "Farmacia", valor: 0.1, vsLM: -73, vsU3M: -65 }, // corte 28-sep (2ª sync): era -74, -66 — incluye H=$5,000 de Base
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: -54, vsU3M: -49 },
      { nombre: "Imágenes", valor: 0.0, vsLM: 281, vsU3M: 53 },
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.2, vsLM: -41, vsU3M: -21 },
      { nombre: "Tratamientos FIV/ICSI", valor: 0.1, vsLM: -75, vsU3M: -68 }, // corte 28-sep: era vsU3M -69
      { nombre: "Laboratorio", valor: 0.1, vsLM: -79, vsU3M: -60 },
      { nombre: "Congelación de Gametos", valor: 0.0, vsLM: -78, vsU3M: -55 }, // corte 28-sep: era -56
      { nombre: "Consultas", valor: 0.0, vsLM: -14, vsU3M: -13 }, // corte 28-sep: era -15, -14
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
      "Corte 28-sep-2026 — actualización con Cargos_y_Facturas_36.xlsx y Consultas_17.xlsx (un día más de Real, sin tocar la metodología de proyección): Ingresos Real $12.99M / Proyección $13.61M; Atenciones 3,327 (Proyectado = Real, curva ya saturada); Pacientes únicos 1,270 (= Real); Consultas 293 reales + 33 agendadas = 326 proyectado; % No show 16.8% (prom. 8 meses cerrados 13.5%, +3.3 pts).",
      "Este corte SÍ incluye Subrogación (a diferencia del corte-27, que no la había refrescado): Valoración sube de 54 a 91 pacientes / $75,387.73 a $126,594.49 en el mes — es un catch-up de 7 días (el corte-27 se había quedado en el dato de corte-21), no un salto de un día. Programa Activo se mantiene en 2 pacientes / $286,206.89 (sin nuevos paquetes vendidos).",
      "Ajuste de pipeline comercial de Guadalajara (Base!H): Marite lo volvió a mover — de $91k (antes del corte-27) a $31k (corte-27) y ahora a $8,000 en total (Farmacia $5,000 + Consultas $3,000, resto en blanco). Es un valor 100% manual suyo, así que solo se refleja tal cual está en el Sheet — Proyección GDL/Total ya quedan sincronizados con este último valor ($1.43M / $13.61M).",
      "Nota sobre 'Evolutivo 2026': esa hoja es un espejo en vivo de Base (fórmulas SUMAR.SI.CONJUNTO sobre Base!F y Base!H) — sirve para verificar, no para editar. Escribir un número directo en una celda de 'Evolutivo 2026' borra su fórmula y NO cambia nada en Base ni en el dashboard. Para mover una Proyección de verdad hay que editar Base!F (Proyectado) o Base!H (ajuste de pipeline), en la hoja 'Base'.",
      "Alcance de este corte: Ingresos/Atenciones/Pacientes/Consultas (Real y Proyección), Mezcla de servicios y Subrogación quedaron actualizados a día 28-sep. NO se pudo refrescar este pase: Evolutivo por médico (hoja PorMedico) ni HubSpot — el endpoint de Apps Script que las sirve estuvo repetidamente caído/con timeout durante este corte (mismo problema de cuota de ejecuciones concurrentes ya diagnosticado el 28-sep, ver data-live.js); PorMedico en particular es una tabla de ~680 filas que no se puede reescribir a mano de forma segura sin una lectura confiable. Quedan con los valores del corte anterior — reintentar en cuanto el Apps Script se estabilice.",
    ],
    CDMX: [
      "Ingresos MTD $11.26M, Proyección $11.74M (+20% vs agosto).",
      "Atenciones: Real 2,492 = Proyección (ya no congelada) — +20% vs agosto, +31% vs U3M.",
      "Pacientes únicos: Real 900 = Proyección — +45% vs agosto, +66% vs U3M. Es la sede con mayor volumen absoluto.",
      "Consultas: 132 reales + 18 agendadas = 150 proyectado, +9% vs agosto.",
    ],
    GDL: [
      "Ingresos MTD $1.32M, Proyección $1.43M — el ajuste de pipeline comercial en Base!H bajó otra vez, ahora a $8,000 en total (Farmacia $5,000 + Consultas $3,000). El Proyectado base sin H (Base!F) es $1.42M — casi todo el Proyectado de GDL ya viene de ahí, el ajuste manual pesa poco este corte.",
      "Atenciones: Real 627 = Proyección — -17% vs agosto, +12% vs U3M.",
      "Pacientes únicos: Real 286 = Proyección — 0% vs agosto, +31% vs U3M.",
      "Consultas: 116 reales + 9 agendadas = 125 proyectado, -6% vs agosto.",
    ],
    MTP: [
      "Ingresos MTD $0.41M, Proyección $0.44M — sigue siendo la sede con mayor caída relativa vs agosto (-53%) y vs U3M (-31%).",
      "Atenciones: Real 208 = Proyección — -27% vs agosto, +1% vs U3M.",
      "Pacientes únicos: Real 84 = Proyección — -12% vs agosto, +31% vs U3M.",
      "Consultas: 45 reales + 6 agendadas = 51 proyectado (mismo total que el corte anterior, solo se redistribuyó real/agendado) — +11% vs agosto, +87% vs U3M.",
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
  // Corte de este respaldo: 28-sep-2026 para leads/citas/conversion_pct (mes
  // en curso, MTD 1-28). conversion_por_sede y cohortes siguen a corte-21sep
  // (ver nota de metodología pendiente más abajo).
  // ------------------------------------------------------------------------
  // ACTUALIZADO 29-sep-2026 con consulta directa a HubSpot (pipeline
  // "Interesa2", id 100207220): Leads = deals creados por mes (createdate);
  // Citas = deals con Fecha_CitaAgendada_Int2 en ese mes. Todo el bloque
  // (leads/citas/conversion_pct, conversion_por_sede y cohortes) queda a
  // corte-28sep. Marite confirmó la metodología: conversion_por_sede =
  // citas agendadas del mes ÷ deals creados el mismo mes, por sede (campo
  // "sucursal" del DEAL — Clínica), con filtro de mes. Los valores viejos de
  // la hoja HubspotSede (CDMX 380/97, etc.) eran simplemente datos
  // desactualizados/incorrectos, no una metodología distinta — ya se
  // corrigieron ahí (tab HubspotSede) y aquí. Cohortes = por cada mes de
  // alta (createdate), qué % agenda cita (Fecha_CitaAgendada_Int2) ese mismo
  // mes (M0), al mes siguiente (M1) y dos meses después (M2, bucket exacto,
  // no acumulado) — recalculado con crosstab createdate×fecha_citaagendada
  // para los 9 meses y ya escrito también en la hoja HubspotCohortes.
  hubspot: {
    leads: { hist: [834, 1062, 1021, 1000, 1754, 1436, 1533, 1924], actual: 1932 },
    citas: { hist: [188, 230, 318, 329, 367, 315, 416, 504], actual: 427 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26], actual: 22 },
    conversion_por_sede: {
      // Agosto (cerrado) vs Total acumulado 2026 (Ene-28sep), por "sucursal"
      // del DEAL. Recalculado y confirmado a corte-28sep.
      CDMX: { agosto: 24, total2026: 27 },
      GDL: { agosto: 24, total2026: 21 },
      MTP: { agosto: 36, total2026: 31 },
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
      { mes: "Sep-26", leads: 1932, m0: 20, m1: 0, m2: 0, sin: 80 },
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
  // ACTUALIZADO 29-sep-2026 con Cargos_y_Facturas_36.xlsx (corte 28-sep): el
  // corte anterior (27-sep) NO había refrescado Subrogación — el valor que
  // traía (54 pac./$75,387.73 en Valoración) seguía siendo el de corte-21.
  // Con día<=28: Valoración sube a 91 pacientes/$126,594.49 (7 días más de
  // acumulado, no un salto de 1 día) y Programa Activo se mantiene en 2
  // pacientes/$286,206.89 (sin nuevos paquetes vendidos entre el 21 y el
  // 28-sep). YTD (Ene-28sep): Valoración 132 pac./$187,758.12 acumulado del
  // año en esa categoría, Programa Activo 16 pac.; ingresoYTD combinado
  // $3,626,465.40.
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
        "Valoración":      { pacientes: 91, ingreso: 126594.49, ticket: 1391.15 },
        "Programa Activo": { pacientes: 2, ingreso: 286206.89, ticket: 143103.45 },
      },
      totalPacientesYTD: { "Valoración": 132, "Programa Activo": 16 },
      ingresoYTD: 3626465.40,
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
