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
  corte: "29-sep-2026",
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
    ingresos: { hist: [12.0, 12.0, 13.2, 12.5, 12.7, 12.1, 12.0, 16.2], actual: 13.94, proy: 14.42, vsLM: -11, vsU3M: 3, nota: "ACTUALIZADO 30-sep-2026 (corte 29-sep, Cargos_y_Facturas_37.xlsx): Real sube de $12.99M a $13.94M; Proyectado de $13.61M a $14.42M (piso MAX(Proyectado,Real) fila por fila en Base!F + Base!H sin cambios: GDL Farmacia $5,000 y GDL Consultas $3,000)." },
    atenciones: { hist: [2498, 2296, 2581, 2522, 2562, 2331, 2561, 3109], actual: 3461, proy: 3461, vsLM: 11, vsU3M: 30, nota: "suma CDMX+GDL+MTP, conteo de líneas de cargo (F. Cargo) hasta el 29-sep. A día 29 de 30 la curva de pacing conservadora sigue prácticamente saturada, así que Proyectado = Real en las 3 sedes." },
    pacientes: { hist: [589, 613, 735, 773, 762, 732, 741, 1003], actual: 1299, proy: 1299, vsLM: 30, vsU3M: 57, nota: "suma CDMX+GDL+MTP, pacientes ÚNICOS del mes (dedup por Historia). Proyectado = max(Real, Atenciones_proy × ratio conservador); con Atenciones ya sin margen de extrapolación, Proyectado = Real en las 3 sedes." },
    // ACTUALIZADO 30-sep-2026 con Consultas_18.xlsx (corte 29-sep): real
    // prácticamente estable (293->303 CDMX+GDL+MTP), agendado baja de 33 a
    // 19 (normal: conforme pasan los días, citas "agendadas" se vuelven
    // "real"). proy = real + agendado = 322 (antes 326, estable).
    consultas: { hist: [168, 167, 235, 220, 225, 271, 255, 316], real: 303, agendado: 19, proy: 322, vsLM: 2, vsU3M: 15, nota: "actualizado 30-sep-2026 con Consultas_18.xlsx — real 303 (1-29 sep, Terminada+Primera Vez), agendado 19 (Citado+Confirmada). proy = real + agendado." },
    // ACTUALIZADO 30-sep-2026 con la hoja "No show" de Consultas_18.xlsx
    // (día<=29-sep, mismo filtro Grupo de conceptos = "Primera Vez"). % No
    // show = no_show / (real + no_show). hist sin cambio (8 meses cerrados);
    // actual = % de septiembre MTD a corte-29; prom = promedio simple de los
    // 8 meses cerrados; deltaPts = actual - prom.
    // TODAVÍA ES MANUAL (como Highlights) — no hay hoja "No show" en vivo en
    // el Sheet; si se agrega un tab RAW_NoShow con el mismo patrón que
    // RAW_CitasAgendadas, se puede automatizar en data-live.js.
    noshow: { hist: [8.7, 6.2, 13.9, 15.7, 19.1, 14.8, 14.7, 15.3], actual: 16.5, prom: 13.6, deltaPts: 3.0 },
  },

  // ------------------------------------------------------------------------
  // POR SEDE
  // ------------------------------------------------------------------------
  sedes: {
    CDMX: {
      nombre: "Ciudad de México",
      ingresos: { hist: [10.2, 9.8, 10.3, 10.5, 10.2, 9.3, 10.0, 12.5], actual: 12.13, proy: 12.38, vsLM: -3, vsU3M: 13, nota: "ACTUALIZADO 30-sep-2026 (corte 29-sep): Real sube de $11.26M a $12.13M; Proyectado de $11.74M a $12.38M (piso MAX(Proyectado,Real) fila por fila; sin AjustePipelineComercial en Base!H para CDMX)." },
      atenciones: { hist: [2099, 1796, 1948, 2018, 1977, 1717, 1910, 2072], actual: 2605, proy: 2605, vsLM: 26, vsU3M: 37, nota: "Proyección = Real: a corte-29 la curva de pacing conservadora sigue prácticamente saturada y el techo de ticket promedio (ver SEDES_CON_TECHO_TICKET) no deja margen adicional." },
      pacientes: { hist: [455, 470, 530, 587, 566, 500, 506, 621], actual: 921, proy: 921, vsLM: 48, vsU3M: 70, nota: "pacientes únicos del mes (dedup Historia). Proyección = Real." },
      consultas: { hist: [127, 105, 144, 145, 133, 169, 141, 137], real: 137, agendado: 11, proy: 148, vsLM: 8, vsU3M: -1, top_cat: "Consulta primera vez", top_n: 50 },
      noshow: { hist: [7.3, 7.9, 11.1, 14.2, 19.9, 10.1, 13.0, 11.0], actual: 13.8, prom: 11.8, deltaPts: 2.0 },
    },
    GDL: {
      nombre: "Guadalajara",
      ingresos: { hist: [1.3, 1.5, 2.1, 1.5, 1.9, 2.4, 1.5, 2.8], actual: 1.39, proy: 1.53, vsLM: -45, vsU3M: -34, nota: "ACTUALIZADO 30-sep-2026 (corte 29-sep): Real sube de $1.32M a $1.39M; Proyectado sube de $1.43M a $1.53M (piso MAX(Proyectado,Real) fila por fila). Ajuste de pipeline comercial en Base!H sin cambios: Farmacia $5,000 + Consultas $3,000 = $8,000 total, igual que el corte anterior." },
      atenciones: { hist: [261, 311, 420, 326, 416, 507, 428, 751], actual: 643, proy: 643, vsLM: -14, vsU3M: 14, nota: "Proyección = Real (curva ya saturada a corte-29)." },
      pacientes: { hist: [103, 98, 158, 136, 163, 195, 175, 287], actual: 292, proy: 292, vsLM: 2, vsU3M: 33, nota: "pacientes únicos del mes. Proyección = Real." },
      consultas: { hist: [33, 41, 75, 55, 79, 93, 87, 133], real: 119, agendado: 3, proy: 122, vsLM: -8, vsU3M: 17, top_cat: "Check up Ginecológico", top_n: 27 },
      noshow: { hist: [13.2, 2.4, 15.7, 17.9, 16.8, 19.1, 17.1, 14.2], actual: 15.6, prom: 14.6, deltaPts: 1.0 },
    },
    MTP: {
      nombre: "Metepec",
      ingresos: { hist: [0.5, 0.7, 0.8, 0.5, 0.6, 0.4, 0.5, 0.9], actual: 0.42, proy: 0.51, vsLM: -43, vsU3M: -20, nota: "ACTUALIZADO 30-sep-2026 (corte 29-sep): Real sube de $0.41M a $0.42M; Proyectado sube de $0.44M a $0.51M (piso MAX(Proyectado,Real) fila por fila — Congelación de Gametos y Consultas subieron con fuerza este corte, ver Mezcla de servicios)." },
      atenciones: { hist: [138, 189, 213, 178, 169, 107, 223, 286], actual: 213, proy: 213, vsLM: -26, vsU3M: 4, nota: "Proyección = Real (curva ya saturada a corte-29)." },
      pacientes: { hist: [31, 45, 47, 50, 33, 37, 60, 95], actual: 86, proy: 86, vsLM: -9, vsU3M: 34, nota: "pacientes únicos del mes. Proyección = Real." },
      consultas: { hist: [8, 21, 16, 20, 13, 9, 27, 46], real: 47, agendado: 5, proy: 52, vsLM: 13, vsU3M: 90, top_cat: "Consulta primera vez", top_n: 25 },
      noshow: { hist: [11.1, 4.5, 27.3, 20.0, 23.5, 40.0, 15.6, 28.1], actual: 25.4, prom: 21.3, deltaPts: 4.1 },
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
      { nombre: "Tratamientos FIV/ICSI", valor: 4.0, vsLM: -18, vsU3M: -1 }, // corte 29-sep: era 3.5, -29, -15
      { nombre: "Congelación de Gametos", valor: 3.6, vsLM: 26, vsU3M: 41 }, // corte 29-sep: era 3.6, 24, 39
      { nombre: "Farmacia", valor: 2.5, vsLM: -24, vsU3M: -14 }, // corte 29-sep: era 2.7, -21, -11
      { nombre: "Laboratorio", valor: 2.2, vsLM: -14, vsU3M: 4 }, // corte 29-sep: era 2.3, -8, 10
      { nombre: "Consultas", valor: 0.5, vsLM: 7, vsU3M: 27 }, // corte 29-sep: era 0.5, -2, 16
      { nombre: "Subrogación", valor: 0.4, vsLM: -70, vsU3M: -48 }, // corte 29-sep: era 0.5, -66, -43
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.4, vsLM: -3, vsU3M: 27 }, // corte 29-sep: era 0.3, -15, 12
      { nombre: "Imágenes", valor: 0.1, vsLM: 131, vsU3M: 85 }, // corte 29-sep: era 0.2, 188, 130
      { nombre: "Wellness", valor: 0.0, vsLM: 173, vsU3M: 280 }, // corte 29-sep: era 0.1, 107, 190
      { nombre: "Otros", valor: 0.0, vsLM: 4, vsU3M: -19 }, // corte 29-sep: era 49, 9
    ],
    CDMX: [
      { nombre: "Tratamientos FIV/ICSI", valor: 3.6, vsLM: -10, vsU3M: 10 }, // corte 29-sep: era 3.1, -23, -6
      { nombre: "Congelación de Gametos", valor: 3.1, vsLM: 50, vsU3M: 51 }, // corte 29-sep: era 3.0, 51, 52
      { nombre: "Farmacia", valor: 2.2, vsLM: -14, vsU3M: -6 }, // corte 29-sep: era 2.3, -9, -1
      { nombre: "Laboratorio", valor: 2.0, vsLM: 16, vsU3M: 33 }, // corte 29-sep: era 17, 33
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.4, vsLM: 13, vsU3M: 46 }, // corte 29-sep: era 0.3, -13, 12
      { nombre: "Subrogación", valor: 0.4, vsLM: -71, vsU3M: -50 }, // corte 29-sep: era 0.5, -66, -43
      { nombre: "Consultas", valor: 0.3, vsLM: 11, vsU3M: 12 }, // corte 29-sep: era 0, 1
    ],
    GDL: [
      { nombre: "Congelación de Gametos", valor: 0.4, vsLM: -38, vsU3M: -6 }, // corte 29-sep: era 0.5, -30, 8
      { nombre: "Tratamientos FIV/ICSI", valor: 0.4, vsLM: -45, vsU3M: -41 }, // corte 29-sep: era 0.3, -44, -41
      { nombre: "Consultas", valor: 0.2, vsLM: -5, vsU3M: 41 }, // corte 29-sep: era -12, 31 — incluye H=$3,000 de Base
      { nombre: "Laboratorio", valor: 0.2, vsLM: -75, vsU3M: -69 }, // corte 29-sep: era -63, -53
      { nombre: "Farmacia", valor: 0.1, vsLM: -71, vsU3M: -63 }, // corte 29-sep: era -73, -65 — incluye H=$5,000 de Base
      { nombre: "Procedimientos / Quirúrgicos", valor: 0.0, vsLM: -39, vsU3M: -33 }, // corte 29-sep: era -54, -49
      { nombre: "Imágenes", valor: 0.0, vsLM: 160, vsU3M: 4 }, // corte 29-sep: era 281, 53
    ],
    MTP: [
      { nombre: "Farmacia", valor: 0.2, vsLM: -42, vsU3M: -22 }, // corte 29-sep: era -41, -21
      { nombre: "Tratamientos FIV/ICSI", valor: 0.1, vsLM: -71, vsU3M: -63 }, // corte 29-sep: era -75, -68
      { nombre: "Laboratorio", valor: 0.1, vsLM: -77, vsU3M: -55 }, // corte 29-sep: era -79, -60
      { nombre: "Congelación de Gametos", valor: 0.1, vsLM: -22, vsU3M: 57 }, // corte 29-sep: SUBE de 0.0 (era -78, -55) — Congelación casi se triplicó vs agosto en MTP
      { nombre: "Consultas", valor: 0.0, vsLM: 134, vsU3M: 135 }, // corte 29-sep: SUBE de 0.0 (era -14, -13)
      { nombre: "Imágenes", valor: 0.0, vsLM: -16, vsU3M: -14 }, // corte 29-sep: era -79, -79
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
      "Corte 29-sep-2026 — actualización con Cargos_y_Facturas_37.xlsx y Consultas_18.xlsx (mes prácticamente cerrado, día 29 de 30): Ingresos Real $13.94M / Proyección $14.42M (+$0.95M de Real y +$0.81M de Proyección vs corte-28); Atenciones 3,461 (Proyectado = Real, curva ya saturada); Pacientes únicos 1,299 (= Real); Consultas 303 reales + 19 agendadas = 322 proyectado; % No show 16.5% (prom. 8 meses cerrados 13.6%, +3.0 pts).",
      "Mezcla de servicios: el salto de Ingresos lo explican sobre todo Tratamientos FIV/ICSI (+$0.5M, de $3.5M a $4.0M, la línea de mayor ticket) y Congelación de Gametos (se mantiene como #2, $3.6M). En Metepec, Congelación de Gametos casi se triplicó vs el corte anterior (de ~$40k a ~$99k) y Consultas subió fuerte también — ambos quedan marcados en la tabla de servicios por sede para que Marite los revise si no corresponden a un patrón esperado.",
      "Subrogación: Valoración CDMX se mantiene en 91 pacientes pero el ingreso del mes baja ligeramente ($126,594.49 → $125,172.08, -$1,422 — una diferencia pequeña al recalcular contra el archivo más reciente, no se identificó una causa puntual, vale la pena revisar con el equipo de facturación si es relevante). Programa Activo CDMX SUBE de 2 a 3 pacientes / $286,206.89 a $306,034.48 (entró una transferencia de congelados de un caso de subrogación, +$19,827.59). Novedad: aparece por primera vez actividad de Subrogación en Guadalajara — 1 paciente en Valoración, $16,379.31 — se agregó como fila nueva en la hoja SubrogacionPacientes.",
      "HubSpot (pipeline Interesa2, corte 29-sep, incluye todas las sucursales no solo las 3 sedes del dashboard): Leads 2,315 (vs 1,932 al corte anterior — no es un salto de 1 día, es una ventana más completa del mes), Citas agendadas 441, Conversión 19% (vs 22% anterior — normal: los leads más recientes del mes aún no han tenido tiempo de agendar). Por sede: CDMX 19% (antes 22%), GDL 17% (antes 20%), MTP 26% (antes 32%) — mismo patrón, leads de fin de mes sin madurar todavía. Conversión acumulada 2026 también se recalculó con la ventana completa a día 29: CDMX 23% (antes 27%), GDL 18% (antes 21%), MTP 26% (antes 31%) — bajan porque la metodología usa citas agendadas ÷ leads creados en la misma ventana de fechas sin ajustar por cohortes, así que meses recientes con leads aún en proceso de conversión bajan el promedio; no es una caída real en la tasa de conversión del negocio.",
      "Ajuste de pipeline comercial de Guadalajara (Base!H) sin cambios este corte: se mantiene en $8,000 en total (Farmacia $5,000 + Consultas $3,000, resto en blanco) — Marite no lo tocó desde el corte-28.",
      "Nota sobre 'Evolutivo 2026': esa hoja es un espejo en vivo de Base (fórmulas SUMAR.SI.CONJUNTO sobre Base!F y Base!H) — sirve para verificar, no para editar. Escribir un número directo en una celda de 'Evolutivo 2026' borra su fórmula y NO cambia nada en Base ni en el dashboard. Para mover una Proyección de verdad hay que editar Base!F (Proyectado) o Base!H (ajuste de pipeline), en la hoja 'Base'.",
      "Alcance de este corte: Ingresos/Atenciones/Pacientes/Consultas (Real y Proyección), Mezcla de servicios, Subrogación y HubSpot quedaron actualizados a día 29-sep. NO se tocó este pase: Evolutivo por médico (hoja PorMedico) ni el ranking detallado de Consultas por concepto (consultas_ranking) — ambos siguen alimentándose en vivo desde sus hojas del Sheet (PorMedico, ConsultasRankingLive) y no formaban parte explícita de este encargo; si Marite los necesita actualizados en el respaldo estático, avisar para el próximo corte.",
    ],
    CDMX: [
      "Ingresos MTD $12.13M, Proyección $12.38M (-3% vs agosto, +13% vs U3M).",
      "Atenciones: Real 2,605 = Proyección (ya no congelada) — +26% vs agosto, +37% vs U3M.",
      "Pacientes únicos: Real 921 = Proyección — +48% vs agosto, +70% vs U3M. Sigue siendo la sede con mayor volumen absoluto.",
      "Consultas: 137 reales + 11 agendadas = 148 proyectado, +8% vs agosto.",
    ],
    GDL: [
      "Ingresos MTD $1.39M, Proyección $1.53M — el ajuste de pipeline comercial en Base!H se mantiene en $8,000 en total (Farmacia $5,000 + Consultas $3,000), sin cambios vs el corte anterior.",
      "Atenciones: Real 643 = Proyección — -14% vs agosto, +14% vs U3M.",
      "Pacientes únicos: Real 292 = Proyección — +2% vs agosto, +33% vs U3M.",
      "Consultas: 119 reales + 3 agendadas = 122 proyectado, -8% vs agosto.",
    ],
    MTP: [
      "Ingresos MTD $0.42M, Proyección $0.51M — sigue con caída vs agosto (-43%) aunque menos pronunciada que el corte anterior (-53%); Congelación de Gametos y Consultas subieron con fuerza este mes (ver Mezcla de servicios).",
      "Atenciones: Real 213 = Proyección — -26% vs agosto, +4% vs U3M.",
      "Pacientes únicos: Real 86 = Proyección — -9% vs agosto, +34% vs U3M.",
      "Consultas: 47 reales + 5 agendadas = 52 proyectado — +13% vs agosto, +90% vs U3M.",
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
  // ACTUALIZADO 30-sep-2026 (corte 29-sep): refresh completo con consulta
  // directa a HubSpot (mismo pipeline/metodología del 29-sep, solo se mueve
  // la ventana a día 29). leads/citas/conversion_pct = todas las sucursales
  // (incluye Unassigned/Pendiente/Puerto Vallarta/Sahuayo, no solo las 3
  // sedes del dashboard); conversion_por_sede y cohortes = mismo criterio.
  hubspot: {
    leads: { hist: [834, 1062, 1021, 1000, 1754, 1436, 1533, 1924], actual: 2315 },
    citas: { hist: [188, 230, 318, 329, 367, 315, 416, 504], actual: 441 },
    conversion_pct: { hist: [23, 22, 31, 33, 21, 22, 27, 26], actual: 19 },
    // mensual[] trae los 9 meses con dato (Ene=0..Sep=8; Oct-Dic quedan en
    // null hasta que haya datos) para que el tablero muestre el mes que el
    // selector de "mes vigente" tenga activo. En vivo esto se recalcula solo
    // desde la hoja "HubspotSedeMensual" — esto es solo el respaldo estático
    // si el fetch en vivo falla.
    conversion_por_sede: {
      CDMX: { mensual: [26,27,38,41,21,25,32,24,19,null,null,null], total2026: 23 },
      GDL: { mensual: [20,17,26,22,20,18,20,24,17,null,null,null], total2026: 18 },
      MTP: { mensual: [24,28,38,46,19,14,32,36,26,null,null,null], total2026: 26 },
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
      { mes: "Sep-26", leads: 2315, m0: 17, m1: 0, m2: 0, sin: 83 }, // corte 29-sep: leads sube de 1932 a 2315 (más días capturados), m0 baja de 20% a 17% (normal: leads de fin de mes aún no han tenido tiempo de agendar)
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
  // ACTUALIZADO 30-sep-2026 con Cargos_y_Facturas_37.xlsx (corte 29-sep):
  // Valoración CDMX baja ligeramente de 91 a 91 pacientes pero el ingreso
  // baja de $126,594.49 a $125,172.08 (una línea de $1,422 que estaba en el
  // corte anterior ya no aparece igual al recalcular desde cero contra el
  // archivo más reciente — posible corrección/cancelación, no se identificó
  // una causa puntual). Programa Activo CDMX SUBE de 2 a 3 pacientes /
  // $286,206.89 a $306,034.48 — entró una "[EX] Transferencia de congelados
  // (caso de subrogación)" nueva ($19,827.59). NOVEDAD de este corte: por
  // primera vez aparece actividad de Subrogación en GDL — 1 paciente en
  // Valoración ("Evaluación Integral de Subrogada GDL", $16,379.31) — se
  // añadió como fila nueva en la hoja SubrogacionPacientes y aquí en el
  // respaldo estático (antes GDL/MTP quedaban en cero). YTD (Ene-29sep):
  // Valoración 137 pac. combinado (136 CDMX + 1 GDL), Programa Activo 19
  // pac. (todos CDMX); ingresoYTD combinado (CDMX+GDL) $3,694,870.57.
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
        "Valoración":      { pacientes: 91, ingreso: 125172.08, ticket: 1375.52 },
        "Programa Activo": { pacientes: 3, ingreso: 306034.48, ticket: 102011.49 },
      },
      totalPacientesYTD: { "Valoración": 136, "Programa Activo": 19 },
      ingresoYTD: 3678491.26,
    };
    const gdl = {
      labels,
      hist: { "Valoración": [0,0,0,0,0,0,0,0], "Programa Activo": [0,0,0,0,0,0,0,0] },
      actual: {
        "Valoración":      { pacientes: 1, ingreso: 16379.31, ticket: 16379.31 },
        "Programa Activo": { pacientes: 0, ingreso: 0, ticket: 0 },
      },
      totalPacientesYTD: { "Valoración": 1, "Programa Activo": 0 },
      ingresoYTD: 16379.31,
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
        "Valoración":      { pacientes: 92, ingreso: 141551.39, ticket: 1538.60 },
        "Programa Activo": { pacientes: 3, ingreso: 306034.48, ticket: 102011.49 },
      },
      totalPacientesYTD: { "Valoración": 137, "Programa Activo": 19 },
      ingresoYTD: 3694870.57,
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
