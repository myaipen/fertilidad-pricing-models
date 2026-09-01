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
const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul"];

// El mes vigente (agosto) ya cerró (llegó a su último día): Real = cierre
// final, no queda ningún día pendiente que proyectar para Atenciones ni
// Pacientes Únicos (Ingresos y Consultas ya reflejan esto solos, porque su
// "Proyectado"/"Agendado" vienen directo del Sheet). Cambiar a false en el
// próximo corte, en cuanto vuelva a haber un mes en curso con días por
// transcurrir.
const MES_VIGENTE_CERRADO = true;

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

  // rows[i] = [Sede, Servicio, MesNum, MesLabel, Real, Proyectado, TasaDiariaU3M, AjustePipelineComercial]
  // por (sede, servicio) -> { [mesNum]: real }, y proyAgo por (sede, servicio)
  const bySedeServicio = {};
  const proyAgo = {};
  for (const r of rows) {
    const [sede, serv, mesNumRaw, , realRaw, proyRaw] = r;
    if (!sede || !serv) continue;
    const mesNum = Number(mesNumRaw);
    const real = num(realRaw);
    const key = sede + "||" + serv;
    bySedeServicio[key] = bySedeServicio[key] || {};
    bySedeServicio[key][mesNum] = real;
    if (mesNum === 8) proyAgo[key] = num(proyRaw);
  }

  function seriesFor(sedeNombre, servicio) {
    const key = sedeNombre + "||" + servicio;
    const m = bySedeServicio[key] || {};
    return { m1: m[1]||0, m2: m[2]||0, m3: m[3]||0, m4: m[4]||0, m5: m[5]||0, m6: m[6]||0, m7: m[7]||0, m8: m[8]||0,
              proy: proyAgo[key] || 0 };
  }

  const sedeNombres = Object.keys(SEDE_CODE);
  const servicios = Object.keys(SERVICIO_LABEL).filter(s => s !== "Sin clasificar");

  // ---- por sede: ingresos totales + servicios ----
  const sedesOut = {};
  const serviciosOut = { total: [] };
  const companyByServ = {};

  for (const sedeNombre of sedeNombres) {
    const code = SEDE_CODE[sedeNombre];
    let hist = [0,0,0,0,0,0,0], real8 = 0, proy8 = 0;
    const servRows = [];
    for (const serv of servicios) {
      const s = seriesFor(sedeNombre, serv);
      for (let i = 0; i < 7; i++) hist[i] += [s.m1,s.m2,s.m3,s.m4,s.m5,s.m6,s.m7][i];
      real8 += s.m8; proy8 += s.proy;
      companyByServ[serv] = companyByServ[serv] || {jul:0,u3m:0,proy:0};
      companyByServ[serv].jul += s.m7;
      companyByServ[serv].u3m += (s.m5+s.m6+s.m7)/3;
      companyByServ[serv].proy += s.proy;
      if (s.proy > 0 || s.m8 > 0) {
        const servU3M = (s.m5+s.m6+s.m7)/3;
        servRows.push({
          nombre: SERVICIO_LABEL[serv],
          servKey: serv,
          valor: Math.round((s.proy/1e6)*10)/10,
          vsLM: pctOrNull(s.proy, s.m7),
          vsU3M: pctOrNull(s.proy, servU3M),
          nomLM: Math.round(((s.proy - s.m7)/1e6)*100)/100,
          nomU3M: Math.round(((s.proy - servU3M)/1e6)*100)/100,
          nuevo: s.m7 === 0,
        });
      }
    }
    serviciosOut[code] = servRows.sort((a, b) => b.valor - a.valor).slice(0, 7);

    const jul = hist[6];
    const u3m = (hist[4]+hist[5]+hist[6])/3;
    sedesOut[code] = {
      ingresos: {
        hist: hist.map(v => Math.round((v/1e6)*10)/10),
        actual: Math.round((real8/1e6)*10)/10,
        proy: Math.round((proy8/1e6)*10)/10,
        vsLM: pctOrNull(proy8, jul),
        vsU3M: pctOrNull(proy8, u3m),
        nomLM: Math.round(((proy8 - jul)/1e6)*10)/10,
        nomU3M: Math.round(((proy8 - u3m)/1e6)*10)/10,
      },
    };
  }

  // ---- compañía (suma 3 sedes) ----
  let histTotal = [0,0,0,0,0,0,0], real8Total = 0, proy8Total = 0;
  for (const code of Object.keys(sedesOut)) {
    sedesOut[code].ingresos.hist.forEach((v,i) => histTotal[i] += v);
    real8Total += sedesOut[code].ingresos.actual;
    proy8Total += sedesOut[code].ingresos.proy;
  }
  const julTotal = histTotal[6];
  const u3mTotal = (histTotal[4]+histTotal[5]+histTotal[6])/3;
  const totalIngresos = {
    hist: histTotal.map(v => Math.round(v*10)/10),
    actual: Math.round(real8Total*10)/10,
    proy: Math.round(proy8Total*10)/10,
    vsLM: pctOrNull(proy8Total, julTotal),
    vsU3M: pctOrNull(proy8Total, u3mTotal),
    nomLM: Math.round((proy8Total-julTotal)*10)/10,
    nomU3M: Math.round((proy8Total-u3mTotal)*10)/10,
    nota: `$${(proy8Total-julTotal).toFixed(1)}M vs LM, $${(proy8Total-u3mTotal).toFixed(1)}M vs U3M`,
  };

  for (const serv of Object.keys(companyByServ)) {
    const c = companyByServ[serv];
    if (c.proy > 0 || c.jul > 0) {
      serviciosOut.total.push({
        nombre: SERVICIO_LABEL[serv],
        servKey: serv,
        valor: Math.round((c.proy/1e6)*10)/10,
        vsLM: pctOrNull(c.proy, c.jul),
        vsU3M: pctOrNull(c.proy, c.u3m),
        nomLM: Math.round(((c.proy - c.jul)/1e6)*100)/100,
        nomU3M: Math.round(((c.proy - c.u3m)/1e6)*100)/100,
        nuevo: c.jul === 0,
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

async function fetchSheetJson(sheetName) {
  const res = await fetch(`${WEB_APP_URL}?sheet=${encodeURIComponent(sheetName)}`);
  if (!res.ok) throw new Error(`Apps Script HTTP ${res.status} (${sheetName})`);
  const json = await res.json();
  if (json.error) throw new Error(`Apps Script error (${sheetName}): ${json.error}`);
  return json.values || [];
}

const SEDES = ["CDMX", "GDL", "MTP"];

function avg3(hist) {
  return (hist[4] + hist[5] + hist[6]) / 3;
}

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
  const out = {};
  let histTotal = [0,0,0,0,0,0,0], actualTotal = 0;
  for (const sede of SEDES) {
    const m = bySede[sede] || {};
    const hist = [1,2,3,4,5,6,7].map(n => m[n] || 0);
    const actual = m[8] || 0;
    const proy = MES_VIGENTE_CERRADO ? actual : actual + actual / 30;
    hist.forEach((v,i) => histTotal[i] += v);
    actualTotal += actual;
    out[sede] = { hist, actual, proy: Math.round(proy), vsLM: pctOrNull(proy, hist[6]), vsU3M: pctOrNull(proy, avg3(hist)) };
  }
  const proyTotal = MES_VIGENTE_CERRADO ? actualTotal : actualTotal + actualTotal / 30;
  out.total = { hist: histTotal, actual: actualTotal, proy: Math.round(proyTotal), vsLM: pctOrNull(proyTotal, histTotal[6]), vsU3M: pctOrNull(proyTotal, avg3(histTotal)) };
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
  const out = {};
  let histTotal = [0,0,0,0,0,0,0], real8Total = 0, agen8Total = 0;
  for (const sede of SEDES) {
    const m = bySede[sede] || {};
    const hist = [1,2,3,4,5,6,7].map(n => (m[n] && m[n].real) || 0);
    const real8 = (m[8] && m[8].real) || 0;
    const agendado8 = (m[8] && m[8].agendado) || 0;
    const proy = real8 + agendado8;
    hist.forEach((v,i) => histTotal[i] += v);
    real8Total += real8; agen8Total += agendado8;
    out[sede] = { hist, real: real8, agendado: agendado8, vsLM: pctOrNull(proy, hist[6]), vsU3M: pctOrNull(proy, avg3(hist)) };
  }
  const proyTotal = real8Total + agen8Total;
  out.total = { hist: histTotal, real: real8Total, agendado: agen8Total, vsLM: pctOrNull(proyTotal, histTotal[6]), vsU3M: pctOrNull(proyTotal, avg3(histTotal)) };
  return out;
}

/**
 * ConsultasRanking: filas [Sede, Categoria, Ago, Jul]. Sede ya viene como
 * "total"/"CDMX"/"GDL"/"MTP" (coincide con las llaves de currentScope).
 * Categoria = Concepto de agenda tal cual (sin agrupar) para no dejar fuera
 * ninguna categoría real. vs LM y el nominal se calculan aquí mismo a partir
 * de Ago y Jul (Jul=0 -> "Nuevo", sin vs LM). Se ordena de mayor a menor Ago.
 */
function buildConsultasRanking(rows) {
  const out = { total: [], CDMX: [], GDL: [], MTP: [] };
  for (const [scope, nombre, agoRaw, julRaw] of rows) {
    if (!out[scope]) continue;
    const ago = num(agoRaw), jul = num(julRaw);
    const nuevo = jul === 0;
    out[scope].push({
      nombre, valor: ago, valorLM: jul,
      vsLM: nuevo ? null : pctOrNull(ago, jul),
      nomLM: ago - jul,
      ...(nuevo ? { nuevo: true } : {}),
    });
  }
  for (const scope of Object.keys(out)) out[scope].sort((a, b) => b.valor - a.valor);
  return out;
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
  const out = {};
  const histTotal = [null, null, null, null, null, null, null];
  let actualTotal = null;
  for (const sede of SEDES) {
    const m = bySede[sede] || {};
    const hist = [1, 2, 3, 4, 5, 6, 7].map(n => (m[n] == null ? null : m[n]));
    const actual = m[8] == null ? null : m[8];
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
  const [atRows, puRows, consRows, rankRows] = await Promise.all([
    fetchSheetJson("Atenciones"),
    fetchSheetJson("Pacientes"),
    fetchSheetJson("Consultas"),
    fetchSheetJson("ConsultasRanking"),
  ]);
  return {
    atenciones: buildMonthlyRealMetric(atRows),
    pacientes: buildMonthlyRealMetric(puRows),
    consultas: buildConsultasMetric(consRows),
    ranking: buildConsultasRanking(rankRows),
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
  const leadsHist = leadsArr.slice(0, 7), citasHist = citasArr.slice(0, 7);
  const leadsActual = leadsArr[7] || 0, citasActual = citasArr[7] || 0;
  const convHist = leadsHist.map((l, i) => pct(citasHist[i], l));
  return {
    leads: { hist: leadsHist, actual: leadsActual },
    citas: { hist: citasHist, actual: citasActual },
    conversion_pct: { hist: convHist, actual: pct(citasActual, leadsActual) },
  };
}

function buildHubspotSedeMetric(rows) {
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

function buildConceptosMetric(rows) {
  const out = { total: {}, CDMX: {}, GDL: {}, MTP: {} };
  for (const [scope, serv, subclasRaw, subclas2Raw, concepto, agoRaw, julRaw] of rows) {
    if (!out[scope] || !serv || !concepto) continue;
    out[scope][serv] = out[scope][serv] || [];
    const subclas = String(subclasRaw ?? "").trim() || null;
    const subclas2 = String(subclas2Raw ?? "").trim() || null;
    out[scope][serv].push({ subclas, subclas2, concepto, ago: num(agoRaw), jul: num(julRaw) });
  }
  for (const scope of Object.keys(out)) {
    for (const serv of Object.keys(out[scope])) {
      out[scope][serv].sort((a, b) => b.ago - a.ago);
    }
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
  for (let m = 1; m <= 8; m++) {
    byMes[m] = { "Valoración": { pacientes: 0, ingreso: 0 }, "Programa Activo": { pacientes: 0, ingreso: 0 } };
  }
  for (const [mesNumRaw, , sede, etapa, pacientesRaw, ingresoRaw] of rows) {
    if (scope !== "total" && sede !== scope) continue;
    const mesNum = Number(mesNumRaw);
    if (!byMes[mesNum] || !SUBROGACION_ETAPAS.includes(etapa)) continue;
    byMes[mesNum][etapa].pacientes += num(pacientesRaw);
    byMes[mesNum][etapa].ingreso += num(ingresoRaw);
  }
  const hist = {};
  for (const etapa of SUBROGACION_ETAPAS) hist[etapa] = [1,2,3,4,5,6,7].map(m => byMes[m][etapa].pacientes);
  const actual = {};
  for (const etapa of SUBROGACION_ETAPAS) {
    const a = byMes[8][etapa];
    actual[etapa] = { pacientes: a.pacientes, ingreso: a.ingreso, ticket: a.pacientes ? Math.round(a.ingreso / a.pacientes) : 0 };
  }
  const totalPacientesYTD = {}, ingresoYTDByEtapa = {};
  let ingresoYTD = 0;
  for (const etapa of SUBROGACION_ETAPAS) {
    totalPacientesYTD[etapa] = hist[etapa].reduce((a,b)=>a+b,0) + actual[etapa].pacientes;
    const ingEtapa = [1,2,3,4,5,6,7,8].reduce((a,m)=>a+byMes[m][etapa].ingreso, 0);
    ingresoYTDByEtapa[etapa] = ingEtapa;
    ingresoYTD += ingEtapa;
  }
  return { labels: MESES, hist, actual, totalPacientesYTD, ingresoYTD, byMes };
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
  const [concRows, subRows] = await Promise.all([
    fetchSheetJson("Conceptos"),
    fetchSheetJson("SubrogacionPacientes"),
  ]);
  return {
    conceptos: buildConceptosMetric(concRows),
    subrogacion: buildSubrogacionMetric(subRows),
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
    if (mesNum < 1 || mesNum > 8) continue;
    const key = sede + "||" + prof;
    bySedeDoc[key] = bySedeDoc[key] || { sede, prof, ingreso: Array(8).fill(0), atenciones: Array(8).fill(0), pacientes: Array(8).fill(0) };
    bySedeDoc[key].ingreso[mesNum-1] += num(ingresoRaw);
    bySedeDoc[key].atenciones[mesNum-1] += num(atRaw);
    bySedeDoc[key].pacientes[mesNum-1] += num(pacRaw);
  }
  function mk(){ return { ingreso:{hist:Array(7).fill(0),actual:0}, atenciones:{hist:Array(7).fill(0),actual:0}, pacientes:{hist:Array(7).fill(0),actual:0} }; }
  const out = { total: {}, CDMX: {}, GDL: {}, MTP: {} };
  for (const key of Object.keys(bySedeDoc)) {
    const d = bySedeDoc[key];
    const entry = {
      ingreso: { hist: d.ingreso.slice(0,7).map(v=>Math.round(v)), actual: Math.round(d.ingreso[7]) },
      atenciones: { hist: d.atenciones.slice(0,7), actual: d.atenciones[7] },
      pacientes: { hist: d.pacientes.slice(0,7), actual: d.pacientes[7] },
    };
    out[d.sede][d.prof] = entry;
    out.total[d.prof] = out.total[d.prof] || mk();
    for (const metric of ["ingreso","atenciones","pacientes"]) {
      for (let i=0;i<7;i++) out.total[d.prof][metric].hist[i] += entry[metric].hist[i];
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
