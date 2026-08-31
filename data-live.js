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

function num(v) {
  return Number(String(v ?? "").replace(/[^0-9.-]/g, "")) || 0;
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
        servRows.push({
          nombre: SERVICIO_LABEL[serv],
          servKey: serv,
          valor: Math.round((s.proy/1e6)*10)/10,
          vsLM: pctOrNull(s.proy, s.m7),
          vsU3M: pctOrNull(s.proy, (s.m5+s.m6+s.m7)/3),
          nuevo: s.m7 === 0,
        });
      }
    }
    servRows.sort((a,b) => b.valor - a.valor);
    serviciosOut[code] = servRows.slice(0, 7);

    const jul = hist[6];
    const u3m = (hist[4]+hist[5]+hist[6])/3;
    sedesOut[code] = {
      ingresos: {
        hist: hist.map(v => Math.round((v/1e6)*10)/10),
        actual: Math.round((real8/1e6)*10)/10,
        proy: Math.round((proy8/1e6)*10)/10,
        vsLM: pctOrNull(proy8, jul),
        vsU3M: pctOrNull(proy8, u3m),
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
        nuevo: c.jul === 0,
      });
    }
  }
  serviciosOut.total.sort((a,b) => b.valor - a.valor);
  serviciosOut.total = serviciosOut.total.slice(0, 10);

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
    const proy = actual + actual / 30;
    hist.forEach((v,i) => histTotal[i] += v);
    actualTotal += actual;
    out[sede] = { hist, actual, proy: Math.round(proy), vsLM: pctOrNull(proy, hist[6]), vsU3M: pctOrNull(proy, avg3(hist)) };
  }
  const proyTotal = actualTotal + actualTotal / 30;
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
 * ConsultasRanking: filas [Sede, Categoria, Valor, VsLM]. Sede ya viene como
 * "total"/"CDMX"/"GDL"/"MTP" (coincide con las llaves de currentScope) y el
 * orden de las filas ya viene de mayor a menor valor.
 */
function buildConsultasRanking(rows) {
  const out = { total: [], CDMX: [], GDL: [], MTP: [] };
  for (const [scope, nombre, valorRaw, vsLMRaw] of rows) {
    if (!out[scope]) continue;
    const vsLMStr = String(vsLMRaw ?? "").trim();
    const nuevo = vsLMStr === "";
    out[scope].push({ nombre, valor: num(valorRaw), vsLM: nuevo ? null : Math.round(num(vsLMRaw)), ...(nuevo ? { nuevo: true } : {}) });
  }
  return out;
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

  "SubrogacionPacientes" trae, mes a mes, cuántos PACIENTES (sin nombres —
  solo el conteo) pasaron por cada etapa del embudo de Subrogación:
  "Valoración" (candidatas gestantes que se hacen la valoración médica) y
  "Programa Activo" (padres intencionales con un paquete de subrogación
  contratado). Son dos poblaciones de personas distintas, no una tasa de
  conversión de la misma persona — el dashboard lo aclara en el texto.
  Filas: [MesNum, MesLabel, Etapa, Pacientes, Ingreso, TicketProm].
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

function buildSubrogacionMetric(rows) {
  const byMes = {};
  for (const [mesNumRaw, mesLabel, etapa, pacientesRaw, ingresoRaw, ticketRaw] of rows) {
    const mesNum = Number(mesNumRaw);
    byMes[mesNum] = byMes[mesNum] || { mesLabel };
    byMes[mesNum][etapa] = { pacientes: num(pacientesRaw), ingreso: num(ingresoRaw), ticket: num(ticketRaw) };
  }
  const meses = Object.keys(byMes).map(Number).sort((a, b) => a - b);
  const hist = {};
  for (const etapa of SUBROGACION_ETAPAS) {
    hist[etapa] = meses.map(m => (byMes[m][etapa] && byMes[m][etapa].pacientes) || 0);
  }
  const mesActual = meses[meses.length - 1];
  const actual = {};
  for (const etapa of SUBROGACION_ETAPAS) {
    actual[etapa] = byMes[mesActual][etapa] || { pacientes: 0, ingreso: 0, ticket: 0 };
  }
  return {
    labels: meses.map(m => byMes[m].mesLabel),
    hist,
    actual,
    totalPacientesYTD: {
      "Valoración": meses.reduce((a, m) => a + ((byMes[m]["Valoración"] && byMes[m]["Valoración"].pacientes) || 0), 0),
      "Programa Activo": meses.reduce((a, m) => a + ((byMes[m]["Programa Activo"] && byMes[m]["Programa Activo"].pacientes) || 0), 0),
    },
    ingresoYTD: meses.reduce((a, m) => a + SUBROGACION_ETAPAS.reduce((b, e) => b + ((byMes[m][e] && byMes[m][e].ingreso) || 0), 0), 0),
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
}
