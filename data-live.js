/*
  ============================================================================
  CARGA EN VIVO — Ingresos, Servicios, Atenciones, Pacientes, Consultas y
  HubSpot, todo desde el mismo Google Sheet
  ============================================================================
  Este archivo reemplaza la necesidad de editar a mano casi todo data.js cada
  mes: lee los números directo del Google Sheet "Proyeccion_Venta_Sede_
  Servicio VF" a través de un Google Apps Script publicado como App web
  (endpoint tipo API).

  HubSpot (pipeline "Interesa2") se sube al Sheet una vez al mes vía consulta
  directa a la API de HubSpot (no hay forma segura de llamar a HubSpot desde
  el navegador del visitante sin exponer credenciales) — ver hoja "Hubspot"/
  "HubspotSede"/"HubspotCohortes" del Sheet. Solo Highlights sigue siendo
  100% manual en data.js.

  Todo lo demás (Highlights, y las series de Semana/Día en data_periods.js)
  sigue viniendo de data.js / data_periods.js tal como hasta ahora.

  CÓMO FUNCIONA (ya configurado, no requiere nada de tu parte):
    - El Google Sheet se queda 100% PRIVADO ("Restringido"). No hace falta
      compartirlo ni crear una API key en Google Cloud Console.
    - Un pequeño script (Google Apps Script, proyecto "Fertilidad Dashboard
      API", vinculado al Sheet) se publicó como App web con "Ejecutar como:
      Yo" y "Quién tiene acceso: Cualquiera". Esto expone SOLO la función
      doGet(), que lee el rango Base!A2:H y devuelve el JSON — el resto del
      Sheet nunca queda expuesto.
    - El dashboard llama a esa URL (WEB_APP_URL abajo) igual que antes
      llamaba a la API de Sheets, sin necesidad de login ni de key.

  Si quieres actualizar el propio script de Apps Script en el futuro:
    Google Sheet > Extensiones > Apps Script > editar Código.gs > Guardar >
    Implementar > Administrar las implementaciones > (lápiz) editar >
    Nueva versión > Implementar. La URL (WEB_APP_URL) no cambia al hacerlo.

  Si el fetch falla (sin internet, el script fue eliminado/despublicado,
  etc.), el dashboard usa automáticamente los últimos valores conocidos
  (guardados en data.js) y muestra un aviso discreto arriba.
  ============================================================================
*/

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbylq_y6NHrbV1Vuk2RFCENPHJ1KKcNwR3E48zY_-A41Rz_QvjR9Wq7jFtn_31GAiX5Yjg/exec";

const SEDE_CODE = {
  "Ciudad de México": "CDMX",
  "Guadalajara": "GDL",
  "Metepec": "MTP",
};
const SERVICIO_LABEL = {
  "Tratamientos de Fertilidad (FIV/ICSI)": "Tratamientos FIV/ICSI",
  "Congelación y Almacenamiento de Gametos": "Congelación de Gametos",
  "Farmacia": "Farmacia",
  "Laboratorio": "Laboratorio",
  "Subrogación": "Subrogación",
  "Consultas": "Consultas",
  "Procedimientos / Quirúrgicos": "Procedimientos / Quirúrgicos",
  "Imágenes": "Imágenes",
  "Wellness": "Wellness",
  "Otros": "Otros",
  "Sin clasificar": "Sin clasificar",
};
const MESES_12 = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

// Mes vigente: seleccionable desde la UI (selector Ene-Dic junto a Sede y
// Periodo en index.html). Arranca en 8 (Ago) como valor por default, pero
// loadLiveDataIntoDashboard() lo autodetecta al último mes con datos reales
// apenas carga (ver detectarMesVigente), y cambiar el selector dispara un
// re-render completo con el nuevo mes como "vigente" y el anterior como LM.
let MES_VIGENTE = 8;

// Año vigente SOLO para el "Ranking por agrupación de consulta" (2025/2026 —
// selector propio dentro de ese panel, ver buildConsultas() en index.html).
// No afecta Ingresos/Atenciones/Pacientes/Consultas/HubSpot/etc.: esas
// secciones no tienen fuente 2025 comparable todavía, solo el ranking de
// consultas (hojas ConsultasRankingLive / ConsultasRankingLive2025). Cuando
// ANIO_VIGENTE=2026 el ranking usa 2026 como "actual" y 2025 como base de
// "vs LY"; cuando ANIO_VIGENTE=2025, 2025 es el "actual" y no hay "vs LY"
// (no tenemos 2024).
let ANIO_VIGENTE = 2026;

// Un mes se considera "cerrado" (ya no quedan días por transcurrir que
// proyectar para Atenciones/Pacientes Únicos) si es estrictamente anterior
// al mes calendario real de hoy. Si el usuario selecciona el mes en curso
// (el mismo mes calendario que hoy), se proyecta por tendencia (ver
// diasTranscurridosEnMes/diasEnMes abajo).
function mesVigenteCerrado(mesVigente) {
  const hoy = new Date();
  return mesVigente < (hoy.getMonth() + 1);
}

// Días calendario que tiene un mes dado (1-12) en el año en curso.
function diasEnMes(mesVigente) {
  const hoy = new Date();
  return new Date(hoy.getFullYear(), mesVigente, 0).getDate();
}

// Días ya transcurridos (con datos reales) del mes vigente, cuando éste es
// el mes calendario actual. Se asume que el corte de datos del Sheet es de
// "ayer" (hoy - 1 día): si hoy es 7-sep, el Real reportado corresponde a
// 1-6 sep, es decir 6 días transcurridos.
//
// ARREGLO (sep-2026): antes se usaba una fórmula fija "Real + Real/30" que
// asumía implícitamente ~29-30 días ya transcurridos (pensada para cuando
// el mes vigente está casi cerrado). Aplicada a un mes recién iniciado
// (ej. día 6 de 30) subestimaba brutalmente la proyección (solo sumaba
// Real/30, un día de más, en vez de extrapolar los ~24 días restantes).
// Ahora se proyecta por tendencia: Proyectado = Real x (díasDelMes /
// díasTranscurridos), igual que se corrigió Ingresos en el Sheet.
function diasTranscurridosEnMes(mesVigente) {
  const hoy = new Date();
  if (mesVigente === hoy.getMonth() + 1) {
    return Math.max(hoy.getDate() - 1, 0);
  }
  // Mes vigente distinto al calendario actual (ej. seleccionado a mano) y
  // no cerrado (futuro): no hay corte de datos conocido, se asume 0 y el
  // llamador cae de vuelta a "actual" sin proyectar.
  return 0;
}

// [1, 2, ..., mesVigente-1] — el histórico de meses previos al vigente.
function rangoHist(mesVigente) {
  const arr = [];
  for (let m = 1; m < mesVigente; m++) arr.push(m);
  return arr;
}

// Promedio de los últimos 3 meses disponibles en hist (U3M). Si hay menos
// de 3 (ej. estamos viendo Febrero como vigente y solo hay 1 mes de
// histórico), promedia los que haya en vez de tronar.
function avgUlt3(hist) {
  const n = hist.length;
  if (!n) return 0;
  const k = Math.min(3, n);
  return hist.slice(n - k).reduce((a, b) => a + b, 0) / k;
}

// Último mes (1-12) con datos reales (Ingresos "total" > 0) dentro de
// conceptosMensual. Se usa como default de MES_VIGENTE apenas carga la
// data en vivo, para no quedar pegado en Agosto para siempre.
function detectarMesVigente(conceptosMensual) {
  const porConcepto = (conceptosMensual && conceptosMensual.total) || {};
  let ultimo = 0;
  for (const concepto of Object.keys(porConcepto)) {
    const ing = porConcepto[concepto].ingresos || [];
    for (let i = 0; i < ing.length; i++) {
      if (ing[i] > 0 && (i + 1) > ultimo) ultimo = i + 1;
    }
  }
  return ultimo || 8;
}

// Último mes (1-12) con datos reales (columna "Real" > 0 en alguna fila)
// dentro de la hoja "Base" (Evolutivo 2026) — la fuente de los KPIs
// principales (Ingresos/Servicios). rows[i] = [Sede, Servicio, MesNum, ...].
// Se usa para no dejar que MES_VIGENTE se adelante a Conceptos cuando esa
// hoja ya trae un mes nuevo pero Base todavía no (ver loadLiveDataIntoDashboard).
function detectarMesVigenteBase(rows, anio) {
  let ultimo = 0;
  for (const r of (rows || [])) {
    const filaAnio = Number(r[8]);
    // Filas sin Año (hojas viejas, antes de que existiera 2025 en Base) se
    // tratan como del año pedido para no romper compatibilidad; si la fila
    // sí trae Año, debe coincidir con el año que se está autodetectando.
    if (r[8] !== "" && r[8] != null && filaAnio !== anio) continue;
    const mesNum = Number(r[2]);
    const real = num(r[4]);
    if (real > 0 && mesNum > ultimo) ultimo = mesNum;
  }
  return ultimo;
}

function num(v) {
  return Number(String(v ?? "").replace(/[^0-9.-]/g, "")) || 0;
}

// Como num(), pero celda vacía -> null (en vez de 0). Se usa para Metas: una
// celda vacía significa "todavía no se captura la meta de ese mes", no "meta
// = $0" — así la línea de meta no cae a cero en la gráfica cuando falta dato.
function numOrNull(v) {
  const s = String(v ?? "").trim();
  return s === "" ? null : num(v);
}

function pctOrNull(proy, base) {
  if (!base) return null;
  return Math.round((proy / base - 1) * 100);
}

/**
 * Descarga la hoja "Base" y arma el mismo shape que data.js espera para
 * DATA.total.ingresos, DATA.sedes.{CDMX,GDL,MTP}.ingresos y DATA.servicios.
 */
async function fetchLiveIngresos() {
  if (!WEB_APP_URL) {
    throw new Error("WEB_APP_URL no configurada");
  }
  const res = await fetch(WEB_APP_URL);
  if (!res.ok) throw new Error(`Apps Script HTTP ${res.status}`);
  const json = await res.json();
  const rows = json.values || [];
  _rawCache["Base"] = rows;
  return buildIngresosMetric(rows, ANIO_VIGENTE);
}

// Extraída de fetchLiveIngresos para poder recalcular desde _rawCache["Base"]
// cuando cambia el selector de mes o de año, sin volver a pedirle nada al Sheet.
//
// ARREGLO (sep-2026): "Base" ahora trae 2025 Y 2026 en la misma hoja (columna
// Año, col. I) — antes esta función ignoraba esa columna y agrupaba solo por
// (Sede,Servicio,MesNum), así que para cualquier mes que existiera en ambos
// años (Ene-Sep) la fila de un año pisaba silenciosamente a la del otro
// (gana la que venga después en el orden de filas de la hoja). Esto causó
// que Agosto mostrara $11.4M (mezcla, en realidad casi todo 2025) en vez de
// los $16.1M reales de Agosto 2026. Ahora se filtra explícitamente por el
// año pedido (anio, default ANIO_VIGENTE) antes de agregar nada.
function buildIngresosMetric(rows, anio = ANIO_VIGENTE) {
  const meses = rangoHist(MES_VIGENTE); // [1..MES_VIGENTE-1]

  // rows[i] = [Sede, Servicio, MesNum, MesLabel, Real, Proyectado, TasaDiariaU3M, AjustePipelineComercial, Año]
  // por (sede, servicio) -> { [mesNum]: real }, y proyVigente por (sede, servicio)
  const bySedeServicio = {};
  const proyVigente = {};
  for (const r of rows) {
    const [sede, serv, mesNumRaw, , realRaw, proyRaw, , , anioRaw] = r;
    if (!sede || !serv) continue;
    // Compatibilidad: filas sin Año (hojas antiguas) se tratan como del año
    // pedido; si la fila sí trae Año, debe coincidir exactamente.
    if (anioRaw !== "" && anioRaw != null && Number(anioRaw) !== anio) continue;
    const mesNum = Number(mesNumRaw);
    const real = num(realRaw);
    const key = sede + "||" + serv;
    bySedeServicio[key] = bySedeServicio[key] || {};
    bySedeServicio[key][mesNum] = real;
    if (mesNum === MES_VIGENTE) proyVigente[key] = num(proyRaw);
  }

  function seriesFor(sedeNombre, servicio) {
    const key = sedeNombre + "||" + servicio;
    const m = bySedeServicio[key] || {};
    return {
      hist: meses.map(n => m[n] || 0),
      actual: m[MES_VIGENTE] || 0,
      proy: proyVigente[key] || 0,
    };
  }

  const sedeNombres = Object.keys(SEDE_CODE);
  const servicios = Object.keys(SERVICIO_LABEL).filter(s => s !== "Sin clasificar");

  // ---- por sede: ingresos totales + servicios ----
  const sedesOut = {};
  const serviciosOut = { total: [] };
  const companyByServ = {};

  for (const sedeNombre of sedeNombres) {
    const code = SEDE_CODE[sedeNombre];
    let hist = meses.map(() => 0), realVigente = 0, proyVig = 0;
    const servRows = [];
    for (const serv of servicios) {
      const s = seriesFor(sedeNombre, serv);
      s.hist.forEach((v, i) => hist[i] += v);
      realVigente += s.actual; proyVig += s.proy;
      const lm = s.hist[s.hist.length - 1] || 0;
      const servU3M = avgUlt3(s.hist);
      companyByServ[serv] = companyByServ[serv] || {lm:0,u3m:0,proy:0};
      companyByServ[serv].lm += lm;
      companyByServ[serv].u3m += servU3M;
      companyByServ[serv].proy += s.proy;
      if (s.proy > 0 || s.actual > 0) {
        servRows.push({
          nombre: SERVICIO_LABEL[serv],
          servKey: serv,
          valor: Math.round((s.proy/1e6)*10)/10,
          vsLM: pctOrNull(s.proy, lm),
          vsU3M: pctOrNull(s.proy, servU3M),
          nomLM: Math.round(((s.proy - lm)/1e6)*100)/100,
          nomU3M: Math.round(((s.proy - servU3M)/1e6)*100)/100,
          nuevo: lm === 0,
        });
      }
    }
    serviciosOut[code] = servRows.sort((a, b) => b.valor - a.valor).slice(0, 7);

    const lm = hist[hist.length - 1] || 0;
    const u3m = avgUlt3(hist);
    sedesOut[code] = {
      ingresos: {
        hist: hist.map(v => Math.round((v/1e6)*10)/10),
        actual: Math.round((realVigente/1e6)*10)/10,
        proy: Math.round((proyVig/1e6)*10)/10,
        vsLM: pctOrNull(proyVig, lm),
        vsU3M: pctOrNull(proyVig, u3m),
        nomLM: Math.round(((proyVig - lm)/1e6)*10)/10,
        nomU3M: Math.round(((proyVig - u3m)/1e6)*10)/10,
      },
    };
  }

  // ---- compañía (suma 3 sedes) ----
  let histTotal = meses.map(() => 0), realVigenteTotal = 0, proyVigTotal = 0;
  for (const code of Object.keys(sedesOut)) {
    sedesOut[code].ingresos.hist.forEach((v,i) => histTotal[i] += v);
    realVigenteTotal += sedesOut[code].ingresos.actual;
    proyVigTotal += sedesOut[code].ingresos.proy;
  }
  const lmTotal = histTotal[histTotal.length - 1] || 0;
  const u3mTotal = avgUlt3(histTotal);
  const totalIngresos = {
    hist: histTotal.map(v => Math.round(v*10)/10),
    actual: Math.round(realVigenteTotal*10)/10,
    proy: Math.round(proyVigTotal*10)/10,
    vsLM: pctOrNull(proyVigTotal, lmTotal),
    vsU3M: pctOrNull(proyVigTotal, u3mTotal),
    nomLM: Math.round((proyVigTotal-lmTotal)*10)/10,
    nomU3M: Math.round((proyVigTotal-u3mTotal)*10)/10,
    nota: `$${(proyVigTotal-lmTotal).toFixed(1)}M vs LM, $${(proyVigTotal-u3mTotal).toFixed(1)}M vs U3M`,
  };

  for (const serv of Object.keys(companyByServ)) {
    const c = companyByServ[serv];
    if (c.proy > 0 || c.lm > 0) {
      serviciosOut.total.push({
        nombre: SERVICIO_LABEL[serv],
        servKey: serv,
        valor: Math.round((c.proy/1e6)*10)/10,
        vsLM: pctOrNull(c.proy, c.lm),
        vsU3M: pctOrNull(c.proy, c.u3m),
        nomLM: Math.round(((c.proy - c.lm)/1e6)*100)/100,
        nomU3M: Math.round(((c.proy - c.u3m)/1e6)*100)/100,
        nuevo: c.lm === 0,
      });
    }
  }
  serviciosOut.total = serviciosOut.total.sort((a, b) => b.valor - a.valor).slice(0, 10);

  return { totalIngresos, sedesOut, serviciosOut };
}

/*
  ============================================================================
  CARGA EN VIVO DE ATENCIONES, PACIENTES ÚNICOS, CONSULTAS Y SU RANKING
  ============================================================================
  Mismo mecanismo que Ingresos (arriba), pero leyendo 4 hojas nuevas del
  mismo Google Sheet: "Atenciones", "Pacientes", "Consultas" y
  "ConsultasRanking". Cada hoja trae Sede/MesNum/MesLabel/Real (y Agendado
  para Consultas), un renglón por sede y mes (MesNum 1-8, Ene-Ago).

  Fórmulas de proyección (mismas que ya usaba Revenue Management a mano):
    - Atenciones / Pacientes Únicos: Proyectado = Real + Real/30
      (equivale a sumar un día promedio más — NO se usa agenda para estas
      dos métricas, son de facturación).
    - Consultas: Proyectado = Real + Agendado (usa la agenda real de citas
      para lo que falta del mes).
  ============================================================================
*/

// Cache de las filas crudas de cada hoja ya descargada, para poder
// recalcular todo el tablero cuando cambia el selector de mes (Ene-Dic) sin
// tener que volver a pedirle nada a Google Sheets — ver changeMesVigente().
let _rawCache = {};

async function fetchSheetJson(sheetName) {
  const res = await fetch(`${WEB_APP_URL}?sheet=${encodeURIComponent(sheetName)}`);
  if (!res.ok) throw new Error(`Apps Script HTTP ${res.status} (${sheetName})`);
  const json = await res.json();
  if (json.error) throw new Error(`Apps Script error (${sheetName}): ${json.error}`);
  const rows = json.values || [];
  _rawCache[sheetName] = rows;
  return rows;
}

const SEDES = ["CDMX", "GDL", "MTP"];

/**
 * Atenciones / Pacientes comparten forma: filas [Sede, MesNum, MesLabel, Real].
 * Regresa { CDMX:{hist,actual,proy,vsLM,vsU3M}, GDL:{...}, MTP:{...}, total:{...} }
 */
function buildMonthlyRealMetric(rows) {
  const bySede = {};
  for (const [sede, mesNumRaw, , realRaw] of rows) {
    const mesNum = Number(mesNumRaw);
    const real = num(realRaw);
    bySede[sede] = bySede[sede] || {};
    bySede[sede][mesNum] = real;
  }
  const meses = rangoHist(MES_VIGENTE);
  const cerrado = mesVigenteCerrado(MES_VIGENTE);
  const diasTot = diasEnMes(MES_VIGENTE);
  const diasTr = diasTranscurridosEnMes(MES_VIGENTE);
  // proyectarPorTendencia(actual): si hay días transcurridos conocidos,
  // Proyectado = Real x (díasDelMes / díasTranscurridos); si no (mes
  // recién seleccionado sin corte de datos, o actual=0), se deja el real
  // tal cual en vez de inventar una proyección.
  function proyectarPorTendencia(actual) {
    if (cerrado || diasTr <= 0 || actual <= 0) return actual;
    return actual * (diasTot / diasTr);
  }
  const out = {};
  let histTotal = meses.map(() => 0), actualTotal = 0;
  for (const sede of SEDES) {
    const m = bySede[sede] || {};
    const hist = meses.map(n => m[n] || 0);
    const actual = m[MES_VIGENTE] || 0;
    const proy = proyectarPorTendencia(actual);
    hist.forEach((v,i) => histTotal[i] += v);
    actualTotal += actual;
    const lm = hist[hist.length-1] || 0;
    out[sede] = { hist, actual, proy: Math.round(proy), vsLM: pctOrNull(proy, lm), vsU3M: pctOrNull(proy, avgUlt3(hist)) };
  }
  const proyTotal = proyectarPorTendencia(actualTotal);
  const lmTotal = histTotal[histTotal.length-1] || 0;
  out.total = { hist: histTotal, actual: actualTotal, proy: Math.round(proyTotal), vsLM: pctOrNull(proyTotal, lmTotal), vsU3M: pctOrNull(proyTotal, avgUlt3(histTotal)) };
  return out;
}

/**
 * Consultas: filas [Sede, MesNum, MesLabel, Real, Agendado].
 * Regresa { CDMX:{hist,real,agendado,vsLM,vsU3M}, ..., total:{...} }
 */
function buildConsultasMetric(rows) {
  const bySede = {};
  for (const [sede, mesNumRaw, , realRaw, agendadoRaw] of rows) {
    const mesNum = Number(mesNumRaw);
    bySede[sede] = bySede[sede] || {};
    bySede[sede][mesNum] = { real: num(realRaw), agendado: num(agendadoRaw) };
  }
  const meses = rangoHist(MES_VIGENTE);
  const out = {};
  let histTotal = meses.map(() => 0), realVigTotal = 0, agenVigTotal = 0;
  for (const sede of SEDES) {
    const m = bySede[sede] || {};
    const hist = meses.map(n => (m[n] && m[n].real) || 0);
    const realVig = (m[MES_VIGENTE] && m[MES_VIGENTE].real) || 0;
    const agendadoVig = (m[MES_VIGENTE] && m[MES_VIGENTE].agendado) || 0;
    const proy = realVig + agendadoVig;
    hist.forEach((v,i) => histTotal[i] += v);
    realVigTotal += realVig; agenVigTotal += agendadoVig;
    const lm = hist[hist.length-1] || 0;
    out[sede] = { hist, real: realVig, agendado: agendadoVig, vsLM: pctOrNull(proy, lm), vsU3M: pctOrNull(proy, avgUlt3(hist)) };
  }
  const proyTotal = realVigTotal + agenVigTotal;
  const lmTotal = histTotal[histTotal.length-1] || 0;
  out.total = { hist: histTotal, real: realVigTotal, agendado: agenVigTotal, vsLM: pctOrNull(proyTotal, lmTotal), vsU3M: pctOrNull(proyTotal, avgUlt3(histTotal)) };
  return out;
}

/**
 * ConsultasRankingLive / ConsultasRankingLive2025: filas crudas tal como las
 * regresa el Apps Script (fila 0 = nota, fila 1 = encabezado de meses, filas
 * siguientes = Delegación, Concepto, mes1..mes12 — pivot en vivo de
 * RAW_Consultas + RAW_CitasAgendadas, ver Código.gs). Reemplaza la vieja
 * hoja estática "ConsultasRanking" (fija a Ago/Jul, sin selector de mes).
 * Regresa { CDMX:{concepto:[v1..v12]}, GDL:{...}, MTP:{...} }, ignorando
 * cualquier fila sin Delegación reconocida (nota, encabezado, o algún
 * renglón con Delegación en blanco en la fuente).
 */
const DELEGACION_CODE = {
  "FERTILIDAD INTEGRAL Ciudad de México": "CDMX",
  "FERTILIDAD INTEGRAL Guadalajara": "GDL",
  "FERTILIDAD INTEGRAL Metepec": "MTP",
};
function parseConsultasRankingRows(rows) {
  const out = { CDMX: {}, GDL: {}, MTP: {} };
  for (const r of (rows || [])) {
    const code = DELEGACION_CODE[r[0]];
    const concepto = r[1];
    if (!code || !concepto) continue;
    const meses = [];
    for (let m = 1; m <= 12; m++) meses.push(num(r[m + 1]));
    out[code][concepto] = meses;
  }
  return out;
}

/**
 * Ranking "en vivo" por agrupación de consulta, por Delegación y Concepto,
 * para el mes vigente (mesVigente, 1-12). rowsActual/rowsLY = filas crudas
 * de la hoja "actual" (según ANIO_VIGENTE) y la de "año anterior" (para vs
 * LY) — rowsLY puede venir null si no hay año anterior disponible (ej.
 * viendo 2025, no existe 2024). vs LM sale de mesVigente-1 dentro de la
 * misma hoja "actual"; nuevo = true si ese mes anterior fue 0 (igual que
 * antes). "total" suma las 3 delegaciones concepto por concepto.
 */
function buildConsultasRankingLive(rowsActual, rowsLY, mesVigente) {
  const actual = parseConsultasRankingRows(rowsActual);
  const ly = rowsLY ? parseConsultasRankingRows(rowsLY) : { CDMX: {}, GDL: {}, MTP: {} };
  const out = { total: [], CDMX: [], GDL: [], MTP: [] };
  const totalMap = {};
  for (const code of SEDES) {
    for (const concepto of Object.keys(actual[code])) {
      const serie = actual[code][concepto];
      const valor = serie[mesVigente - 1] || 0;
      const valorLM = mesVigente > 1 ? (serie[mesVigente - 2] || 0) : 0;
      const nuevo = valorLM === 0;
      const serieLY = ly[code][concepto];
      const valorLY = serieLY ? (serieLY[mesVigente - 1] || 0) : 0;
      out[code].push({
        nombre: concepto, valor, valorLM,
        vsLM: nuevo ? null : pctOrNull(valor, valorLM),
        nomLM: valor - valorLM,
        vsLY: valorLY ? pctOrNull(valor, valorLY) : null,
        nomLY: valorLY ? (valor - valorLY) : null,
        ...(nuevo ? { nuevo: true } : {}),
      });
      const t = totalMap[concepto] = totalMap[concepto] || { valor: 0, valorLM: 0, valorLY: 0, tieneLY: false };
      t.valor += valor;
      t.valorLM += valorLM;
      if (valorLY) { t.valorLY += valorLY; t.tieneLY = true; }
    }
  }
  out.total = Object.keys(totalMap).map(concepto => {
    const t = totalMap[concepto];
    const nuevo = t.valorLM === 0;
    return {
      nombre: concepto, valor: t.valor, valorLM: t.valorLM,
      vsLM: nuevo ? null : pctOrNull(t.valor, t.valorLM),
      nomLM: t.valor - t.valorLM,
      vsLY: t.tieneLY ? pctOrNull(t.valor, t.valorLY) : null,
      nomLY: t.tieneLY ? (t.valor - t.valorLY) : null,
      ...(nuevo ? { nuevo: true } : {}),
    };
  });
  for (const scope of Object.keys(out)) out[scope].sort((a, b) => b.valor - a.valor);
  return out;
}

// Arma el ranking según ANIO_VIGENTE (2026: 2026=actual, 2025=LY · 2025:
// 2025=actual, sin LY) a partir de lo que ya esté en _rawCache — la usan
// tanto fetchLiveOperativos() (primera carga) como rebuildAllFromCache()
// (cambio de selector de mes o de año) para no duplicar esta lógica.
function buildRankingFromCache() {
  const rows2026 = _rawCache["ConsultasRankingLive"] || [];
  const rows2025 = _rawCache["ConsultasRankingLive2025"] || [];
  if (ANIO_VIGENTE === 2025) return buildConsultasRankingLive(rows2025, null, MES_VIGENTE);
  return buildConsultasRankingLive(rows2026, rows2025, MES_VIGENTE);
}

/**
 * Metas: filas [Sede, MesNum, MesLabel, Meta] — Sede en códigos CDMX/GDL/MTP
 * (igual que Atenciones/Pacientes/Consultas), Meta en pesos MXN (se convierte
 * a MDP aquí mismo, igual que Ingresos). Una celda de Meta vacía = todavía no
 * se captura ese mes -> null, no se dibuja ese punto de la línea.
 * Regresa { CDMX:{hist:[7 MDP|null], actual MDP|null}, GDL:{...}, MTP:{...},
 *           total:{...}, _hasData: bool }
 */
function buildMonthlyMetaMetric(rows) {
  const bySede = {};
  let anyData = false;
  for (const [sede, mesNumRaw, , metaRaw] of rows) {
    const mesNum = Number(mesNumRaw);
    if (!sede || !mesNum) continue;
    bySede[sede] = bySede[sede] || {};
    const v = numOrNull(metaRaw);
    bySede[sede][mesNum] = v;
    if (v != null) anyData = true;
  }
  const toMDP = v => (v == null ? null : Math.round((v / 1e6) * 10) / 10);
  const meses = rangoHist(MES_VIGENTE);
  const out = {};
  const histTotal = meses.map(() => null);
  let actualTotal = null;
  for (const sede of SEDES) {
    const m = bySede[sede] || {};
    const hist = meses.map(n => (m[n] == null ? null : m[n]));
    const actual = m[MES_VIGENTE] == null ? null : m[MES_VIGENTE];
    hist.forEach((v, i) => { if (v != null) histTotal[i] = (histTotal[i] || 0) + v; });
    if (actual != null) actualTotal = (actualTotal || 0) + actual;
    out[sede] = { hist: hist.map(toMDP), actual: toMDP(actual) };
  }
  out.total = { hist: histTotal.map(toMDP), actual: toMDP(actualTotal) };
  out._hasData = anyData;
  return out;
}

async function fetchLiveMetas() {
  const rows = await fetchSheetJson("Metas");
  return buildMonthlyMetaMetric(rows);
}

async function fetchLiveOperativos() {
  const [atRows, puRows, consRows] = await Promise.all([
    fetchSheetJson("Atenciones"),
    fetchSheetJson("Pacientes"),
    fetchSheetJson("Consultas"),
  ]);
  // ConsultasRankingLive (2026) y ConsultasRankingLive2025 se piden siempre
  // los dos (aunque ANIO_VIGENTE arranque en 2026): el selector de año del
  // panel de ranking cambia de vista sin volver a pedirle nada a Sheets (ver
  // buildRankingFromCache/changeAnioVigente), igual que ya hace el selector
  // de mes.
  await Promise.all([
    fetchSheetJson("ConsultasRankingLive"),
    fetchSheetJson("ConsultasRankingLive2025"),
  ]);
  return {
    atenciones: buildMonthlyRealMetric(atRows),
    pacientes: buildMonthlyRealMetric(puRows),
    consultas: buildConsultasMetric(consRows),
    ranking: buildRankingFromCache(),
  };
}

/*
  ============================================================================
  CARGA EN VIVO DE HUBSPOT (pipeline "Interesa2")
  ============================================================================
  Hojas: "Hubspot" (MesNum, MesLabel, Leads, Citas — compañía completa),
  "HubspotSede" (Sede, LeadsAgo, CitasAgo, LeadsYTD, CitasYTD) y
  "HubspotCohortes" (MesNum, MesLabel, Leads, M0, M1, M2 — conteos, el
  dashboard calcula el % aquí mismo). Leads = deals creados en el mes
  (createdate); Citas = deals con Fecha_CitaAgendada_Int2 en el mes.
  ============================================================================
*/

function pct(n, base) {
  return base ? Math.round((n / base) * 100) : 0;
}

function buildHubspotMetric(rows) {
  const hist = [], leadsArr = [], citasArr = [];
  for (const [, , leadsRaw, citasRaw] of rows) {
    leadsArr.push(num(leadsRaw));
    citasArr.push(num(citasRaw));
  }
  // rows[i] = mes i+1 (Ene=0, ..., Dic=11). El mes vigente es el que haya
  // cargado HubSpot más recientemente — si ese pull todavía no llega al mes
  // que el selector tiene seleccionado, esta vista simplemente muestra 0
  // (HubSpot se refresca manual y por separado, no viene del pipeline de Cargos).
  const leadsHist = leadsArr.slice(0, MES_VIGENTE - 1), citasHist = citasArr.slice(0, MES_VIGENTE - 1);
  const leadsActual = leadsArr[MES_VIGENTE - 1] || 0, citasActual = citasArr[MES_VIGENTE - 1] || 0;
  const convHist = leadsHist.map((l, i) => pct(citasHist[i], l));
  return {
    leads: { hist: leadsHist, actual: leadsActual },
    citas: { hist: citasHist, actual: citasActual },
    conversion_pct: { hist: convHist, actual: pct(citasActual, leadsActual) },
  };
}

function buildHubspotSedeMetric(rows) {
  // Nota: esta hoja trae una sola foto (mes vigente + YTD), no un valor por
  // cada uno de los 12 meses — así que "agosto" aquí es un nombre heredado,
  // en realidad significa "el mes vigente al momento del último refresh de
  // HubSpot" y no se mueve solo con el selector de mes del tablero.
  const out = {};
  for (const [sede, leadsAgoRaw, citasAgoRaw, leadsYtdRaw, citasYtdRaw] of rows) {
    if (!SEDES.includes(sede)) continue;
    out[sede] = {
      agosto: pct(num(citasAgoRaw), num(leadsAgoRaw)),
      total2026: pct(num(citasYtdRaw), num(leadsYtdRaw)),
    };
  }
  return out;
}

function buildHubspotCohortes(rows) {
  return rows.map(([, mesLabel, leadsRaw, m0Raw, m1Raw, m2Raw]) => {
    const leads = num(leadsRaw);
    const m0 = pct(num(m0Raw), leads), m1 = pct(num(m1Raw), leads), m2 = pct(num(m2Raw), leads);
    return { mes: `${mesLabel}-26`, leads, m0, m1, m2, sin: Math.max(0, 100 - m0 - m1 - m2) };
  });
}

async function fetchLiveHubspot() {
  const [hsRows, sedeRows, cohortRows] = await Promise.all([
    fetchSheetJson("Hubspot"),
    fetchSheetJson("HubspotSede"),
    fetchSheetJson("HubspotCohortes"),
  ]);
  const base = buildHubspotMetric(hsRows);
  return {
    ...base,
    conversion_por_sede: buildHubspotSedeMetric(sedeRows),
    cohortes: buildHubspotCohortes(cohortRows),
  };
}

/*
  ============================================================================
  CARGA EN VIVO DE CONCEPTOS (drill-down por servicio) Y SUBROGACIÓN
  ============================================================================
  "Conceptos" trae, para el mes vigente (agosto), el desglose de cada
  servicio en sus líneas de cargo reales, con jerarquía de hasta 3 niveles
  (ej. dentro de "Laboratorio": Subclas "Laboratorio Clínico" > Subclas2
  "Hormonas, Sangre y Perfiles" > Concepto). Filas: [Sede, Servicio, Subclas,
  Subclas2, Concepto, Ago, Jul] donde Sede es "CDMX"/"GDL"/"MTP"/"total",
  Servicio es el nombre completo original (la misma llave que trae "servKey"
  en cada fila de DATA.servicios), Subclas/Subclas2 vienen vacíos cuando ese
  servicio no tiene ese nivel de clasificación (ej. Farmacia no tiene
  Subclas, así que salta directo a Concepto), y Ago/Jul son los montos en
  pesos del mes vigente y del mes anterior — el dashboard calcula "vs LM" al
  vuelo en cualquier nivel de agrupación sumando Ago y Jul de ese grupo
  (nunca promediando porcentajes). El dashboard usa esto para armar el
  drill-down dinámico al hacer clic en un servicio de "Mezcla de servicios".

  "SubrogacionPacientes" trae, mes a mes y por sede, cuántos PACIENTES (sin
  nombres — solo el conteo) pasaron por cada etapa del embudo de Subrogación:
  "Valoración" (candidatas gestantes que se hacen la valoración médica) y
  "Programa Activo" (padres intencionales con un paquete de subrogación
  contratado). Son dos poblaciones de personas distintas, no una tasa de
  conversión de la misma persona — el dashboard lo aclara en el texto.
  Filas: [MesNum, MesLabel, Sede, Etapa, Pacientes, Ingreso] — Sede en
  códigos CDMX/GDL/MTP (Subrogación es ~100% CDMX, pero se guarda por sede
  para que el filtro de Sede funcione igual que en el resto del dashboard;
  el ticket promedio se calcula aquí mismo, no se guarda en el Sheet).
  ============================================================================
*/

// (La vieja buildConceptosMetric, que leía una hoja "Conceptos" con columnas
// fijas Ago/Jul, se retiró — la vista se deriva ahora con computeConceptosView
// a partir de conceptosMensual + conceptosHier, reactiva al selector de mes.)

/*
  "ConceptosMensual" trae, por Sede ("CDMX"/"GDL"/"MTP"/"total") y Concepto
  (mismo texto exacto que en "ConceptosHier"/"ConceptosPorMedico" — la
  combinación Sede+Concepto es única), el histórico Ene-Dic de
  Ingresos/Atenciones/UDS de esa línea de cargo (12 casillas siempre, se van
  llenando conforme se cargan más meses — los que no tienen datos todavía
  quedan en 0). Se usa para el detalle "evolutivo por concepto" Y para
  derivar la vista "Mezcla de servicios" (antes venía de una hoja "Conceptos"
  separada con columnas fijas Ago/Jul — ahora ambas vistas se calculan aquí
  mismo según el mes que elija el selector, ver computeConceptosView).
  Filas: [Sede, Concepto, MesNum, Ingresos, Atenciones, Uds].
*/
function buildConceptosMensualMetric(rows) {
  const out = {};
  for (const [sede, concepto, mesNumRaw, ingresosRaw, atRaw, udsRaw] of rows) {
    if (!concepto) continue;
    out[sede] = out[sede] || {};
    out[sede][concepto] = out[sede][concepto] || {
      labels: MESES_12, ingresos: Array(12).fill(0), atenciones: Array(12).fill(0), uds: Array(12).fill(0),
    };
    const idx = Number(mesNumRaw) - 1;
    if (idx < 0 || idx > 11) continue;
    out[sede][concepto].ingresos[idx] = num(ingresosRaw);
    out[sede][concepto].atenciones[idx] = num(atRaw);
    out[sede][concepto].uds[idx] = num(udsRaw);
  }
  return out;
}

/*
  "ConceptosHier" es la jerarquía ESTÁTICA Concepto -> Servicio/Subclas/
  Subclas2 (no cambia mes a mes, solo cuando aparece un concepto nuevo).
  Reemplaza a la vieja hoja "Conceptos" (que traía una foto fija de Ago/Jul):
  ahora la vista "Mezcla de servicios" se arma en vivo combinando esta
  jerarquía con conceptosMensual + el mes que el selector tenga activo.
  Filas: [Concepto, Servicio, Subclas, Subclas2].
*/
function buildConceptosHierMetric(rows) {
  const out = {};
  for (const [concepto, servicio, subclas, subclas2] of rows) {
    if (!concepto || !servicio) continue;
    out[concepto] = {
      servicio,
      subclas: String(subclas ?? "").trim() || null,
      subclas2: String(subclas2 ?? "").trim() || null,
    };
  }
  return out;
}

/**
 * Deriva la vista "Mezcla de servicios" (D.conceptos[scope][servKey] = [{
 * subclas, subclas2, concepto, ago, jul, count, uds }]) directamente de
 * conceptosMensual + conceptosHier, para el mes que MES_VIGENTE tenga en ese
 * momento — "ago"/"jul" son nombres heredados de cuando Agosto era el mes
 * fijo, pero ya significan simplemente "mes vigente" / "mes anterior".
 * Se recalcula cada vez que cambia el selector de mes (no requiere volver a
 * pedir nada al Sheet).
 */
function computeConceptosView(conceptosMensual, conceptosHier) {
  const out = { total: {}, CDMX: {}, GDL: {}, MTP: {} };
  const idxVig = MES_VIGENTE - 1, idxLM = MES_VIGENTE - 2;
  for (const scope of Object.keys(out)) {
    const porConcepto = (conceptosMensual && conceptosMensual[scope]) || {};
    for (const concepto of Object.keys(porConcepto)) {
      const serie = porConcepto[concepto];
      const ago = serie.ingresos[idxVig] || 0;
      const jul = idxLM >= 0 ? (serie.ingresos[idxLM] || 0) : 0;
      const count = serie.atenciones[idxVig] || 0;
      const uds = serie.uds[idxVig] || 0;
      // si ni el mes vigente ni ningún mes anterior tienen dato, no tiene
      // caso listar el concepto en este scope (ej. concepto que solo vende
      // en otra sede) — pero si tuvo venta en CUALQUIER mes ya cargado, se
      // incluye aunque el mes vigente esté en 0 (esa es la alerta de "sin venta").
      const tuvoAlgunaVenta = serie.ingresos.some(v => v > 0);
      if (!tuvoAlgunaVenta) continue;
      const hier = (conceptosHier && conceptosHier[concepto]) || { servicio: "Otros", subclas: null, subclas2: null };
      out[scope][hier.servicio] = out[scope][hier.servicio] || [];
      out[scope][hier.servicio].push({ subclas: hier.subclas, subclas2: hier.subclas2, concepto, ago, jul, count, uds });
    }
    for (const serv of Object.keys(out[scope])) {
      out[scope][serv].sort((a, b) => b.ago - a.ago);
    }
  }
  return out;
}

/*
  "ConceptosPorMedico" trae, por Sede ("CDMX"/"GDL"/"MTP"/"total") y Concepto
  (mismo texto exacto que en "Conceptos"/"ConceptosMensual"), el desglose por
  Profesional Historia (médico que atendió/recetó) acumulado Ene-Ago 2026:
  Ingresos, Atenciones (# líneas de cargo) y Uds. Se usa en el detalle
  "evolutivo por concepto" para mostrar qué médico usa más cada producto/
  servicio (tabla "Por médico"). Filas: [Sede, Concepto, Medico, Ingresos,
  Atenciones, Uds].
*/
function buildConceptosPorMedicoMetric(rows) {
  const out = {};
  for (const [sede, concepto, medico, ingresosRaw, atRaw, udsRaw] of rows) {
    if (!concepto || !medico) continue;
    out[sede] = out[sede] || {};
    out[sede][concepto] = out[sede][concepto] || [];
    out[sede][concepto].push({ medico, ingresos: num(ingresosRaw), atenciones: num(atRaw), uds: num(udsRaw) });
  }
  return out;
}

const SUBROGACION_ETAPAS = ["Valoración", "Programa Activo"];

/**
 * Arma la métrica de Subrogación para UN scope (total/CDMX/GDL/MTP), con los
 * 8 meses (Ene-Ago) siempre presentes (rellenando con 0 los que no traigan
 * fila) para que el filtro de Sede nunca rompa la alineación de meses aunque
 * una sede no tenga nada ese mes (ej. GDL/MTP la mayoría de meses).
 */
function buildSubrogacionForScope(rows, scope) {
  const byMes = {};
  for (let m = 1; m <= 12; m++) {
    byMes[m] = { "Valoración": { pacientes: 0, ingreso: 0 }, "Programa Activo": { pacientes: 0, ingreso: 0 } };
  }
  for (const [mesNumRaw, , sede, etapa, pacientesRaw, ingresoRaw] of rows) {
    if (scope !== "total" && sede !== scope) continue;
    const mesNum = Number(mesNumRaw);
    if (!byMes[mesNum] || !SUBROGACION_ETAPAS.includes(etapa)) continue;
    byMes[mesNum][etapa].pacientes += num(pacientesRaw);
    byMes[mesNum][etapa].ingreso += num(ingresoRaw);
  }
  const meses = rangoHist(MES_VIGENTE);
  const hist = {};
  for (const etapa of SUBROGACION_ETAPAS) hist[etapa] = meses.map(m => byMes[m][etapa].pacientes);
  const actual = {};
  for (const etapa of SUBROGACION_ETAPAS) {
    const a = byMes[MES_VIGENTE][etapa];
    actual[etapa] = { pacientes: a.pacientes, ingreso: a.ingreso, ticket: a.pacientes ? Math.round(a.ingreso / a.pacientes) : 0 };
  }
  const totalPacientesYTD = {}, ingresoYTDByEtapa = {};
  let ingresoYTD = 0;
  for (const etapa of SUBROGACION_ETAPAS) {
    totalPacientesYTD[etapa] = hist[etapa].reduce((a,b)=>a+b,0) + actual[etapa].pacientes;
    const ingEtapa = [...meses, MES_VIGENTE].reduce((a,m)=>a+byMes[m][etapa].ingreso, 0);
    ingresoYTDByEtapa[etapa] = ingEtapa;
    ingresoYTD += ingEtapa;
  }
  return { labels: MESES_12.slice(0, meses.length), hist, actual, totalPacientesYTD, ingresoYTD, byMes };
}

// El cálculo de vs LM / vs U3M / nominal por periodo para Subrogación se
// hace en index.html con el helper genérico periodStats(hist, actual,
// periodo) — mismo patrón que usa la nueva sección "Evolutivo por médico" —
// ya que sub.hist[etapa] (7 valores) + sub.actual[etapa].pacientes tienen
// exactamente esa forma.

function buildSubrogacionMetric(rows) {
  return {
    total: buildSubrogacionForScope(rows, "total"),
    CDMX: buildSubrogacionForScope(rows, "CDMX"),
    GDL: buildSubrogacionForScope(rows, "GDL"),
    MTP: buildSubrogacionForScope(rows, "MTP"),
  };
}

async function fetchLiveConceptosYSubrogacion() {
  const [hierRows, subRows, concMensualRows, concPorMedicoRows] = await Promise.all([
    fetchSheetJson("ConceptosHier"),
    fetchSheetJson("SubrogacionPacientes"),
    fetchSheetJson("ConceptosMensual"),
    fetchSheetJson("ConceptosPorMedico"),
  ]);
  const conceptosHier = buildConceptosHierMetric(hierRows);
  const conceptosMensual = buildConceptosMensualMetric(concMensualRows);
  // OJO: MES_VIGENTE NO se reasigna aquí — ya se autodetectó (con el clamp
  // contra la hoja "Base", ver loadLiveDataIntoDashboard) antes de que
  // corra cualquier fetch, incluido este. Reasignarlo aquí sin el clamp
  // adelantaría el mes vigente en cuanto Conceptos tenga un mes que Base
  // todavía no, rompiendo los KPIs principales (quedarían en $0).
  return {
    conceptosHier,
    conceptosMensual,
    conceptos: computeConceptosView(conceptosMensual, conceptosHier),
    subrogacion: buildSubrogacionMetric(subRows),
    conceptosPorMedico: buildConceptosPorMedicoMetric(concPorMedicoRows),
  };
}

/*
  ============================================================================
  CARGA EN VIVO POR MÉDICO (Profesional Historia)
  ============================================================================
  "PorMedico" trae, mes a mes, sede y médico ("Profesional Historia" del
  archivo de cargos — misma fuente y misma definición de línea de cargo =
  atención, Historia = paciente, que Ingresos/Atenciones/Pacientes Únicos),
  cuánto ingreso, cuántas atenciones y cuántos pacientes únicos generó cada
  médico ese mes. Filas: [Sede, Profesional, MesNum, MesLabel, Ingreso,
  Atenciones, Pacientes]. El scope "total" se arma sumando, para el mismo
  nombre de médico, sus 3 posibles sedes (igual criterio que Pacientes
  Únicos total: suma simple, no dedup de paciente cruzando sede).
  ============================================================================
*/

function buildDoctoresMetric(rows) {
  const bySedeDoc = {};
  for (const [sede, prof, mesNumRaw, , ingresoRaw, atRaw, pacRaw] of rows) {
    if (!SEDES.includes(sede) || !prof) continue;
    const mesNum = Number(mesNumRaw);
    if (mesNum < 1 || mesNum > 12) continue;
    const key = sede + "||" + prof;
    bySedeDoc[key] = bySedeDoc[key] || { sede, prof, ingreso: Array(12).fill(0), atenciones: Array(12).fill(0), pacientes: Array(12).fill(0) };
    bySedeDoc[key].ingreso[mesNum-1] += num(ingresoRaw);
    bySedeDoc[key].atenciones[mesNum-1] += num(atRaw);
    bySedeDoc[key].pacientes[mesNum-1] += num(pacRaw);
  }
  const nHist = MES_VIGENTE - 1;
  function mk(){ return { ingreso:{hist:Array(nHist).fill(0),actual:0}, atenciones:{hist:Array(nHist).fill(0),actual:0}, pacientes:{hist:Array(nHist).fill(0),actual:0} }; }
  const out = { total: {}, CDMX: {}, GDL: {}, MTP: {} };
  for (const key of Object.keys(bySedeDoc)) {
    const d = bySedeDoc[key];
    const entry = {
      ingreso: { hist: d.ingreso.slice(0,nHist).map(v=>Math.round(v)), actual: Math.round(d.ingreso[MES_VIGENTE-1]) },
      atenciones: { hist: d.atenciones.slice(0,nHist), actual: d.atenciones[MES_VIGENTE-1] },
      pacientes: { hist: d.pacientes.slice(0,nHist), actual: d.pacientes[MES_VIGENTE-1] },
    };
    out[d.sede][d.prof] = entry;
    out.total[d.prof] = out.total[d.prof] || mk();
    for (const metric of ["ingreso","atenciones","pacientes"]) {
      for (let i=0;i<nHist;i++) out.total[d.prof][metric].hist[i] += entry[metric].hist[i];
      out.total[d.prof][metric].actual += entry[metric].actual;
    }
  }
  return out;
}

async function fetchLiveDoctores() {
  const rows = await fetchSheetJson("PorMedico");
  return buildDoctoresMetric(rows);
}

/**
 * Mezcla los datos en vivo (si el fetch funciona) sobre window.DATA, que ya
 * trae los valores del último corte como respaldo (fallback).
 */
async function loadLiveDataIntoDashboard() {
  // Se autodetecta MES_VIGENTE ANTES que cualquier otro fetch (todos los
  // builders de abajo lo leen como variable global), para que el primer
  // render ya arranque en el último mes con datos reales y no en el default
  // de Agosto. Si falla (sin conexión), se queda en el default y el selector
  // de mes de la UI lo puede corregir a mano.
  try {
    const [preRows, baseRows] = await Promise.all([
      fetchSheetJson("ConceptosMensual"),
      fetchSheetJson("Base"),
    ]);
    const mesConceptos = detectarMesVigente(buildConceptosMensualMetric(preRows));
    const mesBase = detectarMesVigenteBase(baseRows, ANIO_VIGENTE);
    // Nunca adelantar el mes vigente más allá de lo que "Base" (Evolutivo
    // 2026, fuente de los KPIs principales de Ingresos/Servicios) ya tiene
    // real. Si Conceptos ya trae un mes nuevo pero Base todavía no se
    // actualizó ese mes, nos quedamos en el último mes que Base sí tiene,
    // para no mostrar $0 en los KPIs mientras Marite termina de actualizar
    // Base. El selector de mes de la UI siempre permite adelantarlo a mano.
    MES_VIGENTE = mesBase > 0 ? Math.min(mesConceptos, mesBase) : mesConceptos;
  } catch (e) {
    console.warn("No se pudo autodetectar el mes vigente, usando default:", e);
  }
  // Se guarda UNA sola vez el mes con el que arrancó el tablero (autodetectado
  // arriba, o el default si falló) — es el mes al que corresponden los
  // Highlights redactados a mano en data.js. buildServicios() en index.html
  // lo compara contra el mes que el selector tenga elegido en cada momento:
  // si coinciden, muestra los Highlights curados; si no, arma unos
  // automáticos a partir de los datos de ese otro mes (ver buildHighlightsAuto).
  window.MES_CORTE_ORIGINAL = MES_VIGENTE;
  syncMesesHistYActual();

  try {
    const live = await fetchLiveIngresos();
    window.DATA.total.ingresos = live.totalIngresos;
    for (const code of Object.keys(live.sedesOut)) {
      window.DATA.sedes[code].ingresos = live.sedesOut[code].ingresos;
    }
    window.DATA.servicios = live.serviciosOut;
    window.DATA._liveOk = true;
  } catch (e) {
    window.DATA._liveOk = false;
    window.DATA._liveError = String(e.message || e);
    console.warn("No se pudo cargar Ingresos/Servicios en vivo desde Sheets, usando último valor guardado:", e);
  }

  try {
    const op = await fetchLiveOperativos();
    window.DATA.total.atenciones = { ...window.DATA.total.atenciones, ...op.atenciones.total };
    window.DATA.total.pacientes = { ...window.DATA.total.pacientes, ...op.pacientes.total };
    window.DATA.total.consultas = { ...window.DATA.total.consultas, ...op.consultas.total };
    for (const code of SEDES) {
      window.DATA.sedes[code].atenciones = { ...window.DATA.sedes[code].atenciones, ...op.atenciones[code] };
      window.DATA.sedes[code].pacientes = { ...window.DATA.sedes[code].pacientes, ...op.pacientes[code] };
      window.DATA.sedes[code].consultas = { ...window.DATA.sedes[code].consultas, ...op.consultas[code] };
    }
    window.DATA.consultas_ranking = op.ranking;
    window.DATA._liveOkOperativos = true;
  } catch (e) {
    window.DATA._liveOkOperativos = false;
    window.DATA._liveErrorOperativos = String(e.message || e);
    console.warn("No se pudo cargar Atenciones/Pacientes/Consultas en vivo desde Sheets, usando último valor guardado:", e);
  }

  try {
    const hs = await fetchLiveHubspot();
    window.DATA.hubspot = { ...window.DATA.hubspot, ...hs };
    window.DATA._liveOkHubspot = true;
  } catch (e) {
    window.DATA._liveOkHubspot = false;
    window.DATA._liveErrorHubspot = String(e.message || e);
    console.warn("No se pudo cargar HubSpot en vivo desde Sheets, usando último valor guardado:", e);
  }

  try {
    const cs = await fetchLiveConceptosYSubrogacion();
    window.DATA.conceptos = cs.conceptos;
    window.DATA.subrogacion = cs.subrogacion;
    window.DATA.conceptosMensual = cs.conceptosMensual;
    window.DATA.conceptosHier = cs.conceptosHier;
    window.DATA.conceptosPorMedico = cs.conceptosPorMedico;
    window.DATA._liveOkConceptos = true;
  } catch (e) {
    window.DATA._liveOkConceptos = false;
    window.DATA._liveErrorConceptos = String(e.message || e);
    console.warn("No se pudo cargar Conceptos/Subrogación en vivo desde Sheets, usando último valor guardado:", e);
  }

  try {
    window.DATA.doctores = await fetchLiveDoctores();
    window.DATA._liveOkDoctores = true;
  } catch (e) {
    window.DATA._liveOkDoctores = false;
    window.DATA._liveErrorDoctores = String(e.message || e);
    console.warn("No se pudo cargar Por médico en vivo desde Sheets:", e);
  }

  // Metas es opcional (hoja nueva, se llena poco a poco por sede/mes): si
  // falla o todavía no tiene datos, la gráfica de Ingresos simplemente no
  // dibuja la línea de meta — no rompe nada más del dashboard.
  try {
    const metas = await fetchLiveMetas();
    if (metas._hasData) {
      window.DATA.total.meta = metas.total;
      for (const code of SEDES) window.DATA.sedes[code].meta = metas[code];
    }
  } catch (e) {
    console.warn("No se pudo cargar Metas en vivo desde Sheets (opcional, sin fallback):", e);
  }
}

/**
 * Recalcula TODO el tablero a partir de las filas ya cacheadas en _rawCache
 * (sin volver a llamar a Google Sheets) para el MES_VIGENTE actual. La usa
 * changeMesVigente() cuando el selector de mes (Ene-Dic) cambia — cada hoja
 * que no se haya podido cargar todavía simplemente se salta (deja lo que ya
 * había en window.DATA), igual que loadLiveDataIntoDashboard.
 */
function rebuildAllFromCache() {
  syncMesesHistYActual();
  if (_rawCache["Base"]) {
    const live = buildIngresosMetric(_rawCache["Base"], ANIO_VIGENTE);
    window.DATA.total.ingresos = live.totalIngresos;
    for (const code of Object.keys(live.sedesOut)) {
      window.DATA.sedes[code].ingresos = live.sedesOut[code].ingresos;
    }
    window.DATA.servicios = live.serviciosOut;
  }

  if (_rawCache["Atenciones"] || _rawCache["Pacientes"] || _rawCache["Consultas"]) {
    const atenciones = buildMonthlyRealMetric(_rawCache["Atenciones"] || []);
    const pacientes = buildMonthlyRealMetric(_rawCache["Pacientes"] || []);
    const consultas = buildConsultasMetric(_rawCache["Consultas"] || []);
    window.DATA.total.atenciones = { ...window.DATA.total.atenciones, ...atenciones.total };
    window.DATA.total.pacientes = { ...window.DATA.total.pacientes, ...pacientes.total };
    window.DATA.total.consultas = { ...window.DATA.total.consultas, ...consultas.total };
    for (const code of SEDES) {
      window.DATA.sedes[code].atenciones = { ...window.DATA.sedes[code].atenciones, ...atenciones[code] };
      window.DATA.sedes[code].pacientes = { ...window.DATA.sedes[code].pacientes, ...pacientes[code] };
      window.DATA.sedes[code].consultas = { ...window.DATA.sedes[code].consultas, ...consultas[code] };
    }
  }
  if (_rawCache["ConsultasRankingLive"]) {
    window.DATA.consultas_ranking = buildRankingFromCache();
  }

  if (_rawCache["Hubspot"]) {
    const base = buildHubspotMetric(_rawCache["Hubspot"]);
    window.DATA.hubspot = {
      ...window.DATA.hubspot, ...base,
      conversion_por_sede: _rawCache["HubspotSede"] ? buildHubspotSedeMetric(_rawCache["HubspotSede"]) : (window.DATA.hubspot || {}).conversion_por_sede,
      cohortes: _rawCache["HubspotCohortes"] ? buildHubspotCohortes(_rawCache["HubspotCohortes"]) : (window.DATA.hubspot || {}).cohortes,
    };
  }

  if (_rawCache["ConceptosMensual"]) {
    const conceptosMensual = buildConceptosMensualMetric(_rawCache["ConceptosMensual"]);
    const conceptosHier = _rawCache["ConceptosHier"] ? buildConceptosHierMetric(_rawCache["ConceptosHier"]) : window.DATA.conceptosHier;
    window.DATA.conceptosMensual = conceptosMensual;
    window.DATA.conceptosHier = conceptosHier;
    window.DATA.conceptos = computeConceptosView(conceptosMensual, conceptosHier);
  }
  if (_rawCache["SubrogacionPacientes"]) {
    window.DATA.subrogacion = buildSubrogacionMetric(_rawCache["SubrogacionPacientes"]);
  }
  if (_rawCache["ConceptosPorMedico"]) {
    window.DATA.conceptosPorMedico = buildConceptosPorMedicoMetric(_rawCache["ConceptosPorMedico"]);
  }
  if (_rawCache["PorMedico"]) {
    window.DATA.doctores = buildDoctoresMetric(_rawCache["PorMedico"]);
  }
  if (_rawCache["Metas"]) {
    const metas = buildMonthlyMetaMetric(_rawCache["Metas"]);
    if (metas._hasData) {
      window.DATA.total.meta = metas.total;
      for (const code of SEDES) window.DATA.sedes[code].meta = metas[code];
    }
  }
}

/**
 * Punto de entrada del selector de mes (Ene-Dic) en index.html. Cambia
 * MES_VIGENTE, recalcula todo desde la cache y vuelve a dibujar el tablero.
 * Ningún panel cuya hoja fuente todavía no tenga ese mes cargado va a
 * tronar — simplemente muestra 0 / "sin venta" para ese mes, como cualquier
 * otro mes sin datos.
 */
function changeMesVigente(nuevoMes) {
  MES_VIGENTE = nuevoMes;
  rebuildAllFromCache();
  if (typeof renderAll === "function") renderAll();
}
window.changeMesVigente = changeMesVigente;
window.getMesVigente = () => MES_VIGENTE;
window.MESES_12 = MESES_12;

/**
 * Punto de entrada del selector de año (2025/2026) del panel "Ranking por
 * agrupación de consulta". Solo afecta ese panel (ver nota junto a
 * ANIO_VIGENTE arriba) — recalcula el ranking desde _rawCache (ya tiene
 * ConsultasRankingLive y ConsultasRankingLive2025 descargados desde el
 * primer load, no vuelve a pedirle nada a Sheets) y vuelve a dibujar todo el
 * tablero, igual que changeMesVigente.
 */
function changeAnioVigente(nuevoAnio) {
  ANIO_VIGENTE = Number(nuevoAnio);
  rebuildAllFromCache();
  if (typeof renderAll === "function") renderAll();
}
window.changeAnioVigente = changeAnioVigente;
window.getAnioVigente = () => ANIO_VIGENTE;

/**
 * Las gráficas "Evolutivo con proyección" (buildSeries() en index.html)
 * arman sus labels con [...D.meses_hist, D.mes_actual, "Proy."] — esos dos
 * campos venían fijos en data.js (Ene-Jul / "Ago") y nunca se recalculaban
 * al cambiar MES_VIGENTE, por lo que al pasar a septiembre las labels (9)
 * dejaban de cuadrar con los values (10) y Chart.js recortaba la última
 * barra: la etiqueta "Proy." terminaba mostrando el valor REAL del mes en
 * vez de la proyección. Se recalculan aquí para que labels y values de
 * buildSeries() siempre queden alineados, sin importar el mes vigente.
 */
function syncMesesHistYActual() {
  window.DATA.meses_hist = MESES_12.slice(0, MES_VIGENTE - 1);
  window.DATA.mes_actual = MESES_12[MES_VIGENTE - 1];
}
window.syncMesesHistYActual = syncMesesHistYActual;
