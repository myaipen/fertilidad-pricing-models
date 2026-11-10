/*
  ============================================================================
  DATOS DEL DASHBOARD — Fertilidad Integral
  ============================================================================
  ESTE ES EL ÚNICO ARCHIVO QUE DEBES EDITAR CADA MES.
  No toques index.html ni chart.min.js.

  Cómo actualizar (cada corte de mes, ej. cierre de mes):
    1. Añade el nuevo mes real al final de cada arreglo "hist" (histórico).
    2. Actualiza "mes actual": cambia su valor por el real acumulado a la fecha de corte.
    3. Actualiza "proy" con la nueva proyección a cierre de mes.
    4. Actualiza vsLM (vs. mes anterior) y vsU3M (vs. promedio de los
       últimos 3 meses cerrados) — ambos en % (ej. 22 significa +22%).
    5. Actualiza servicios[], highlights[], hubspot y consultas_ranking
       con los nuevos hallazgos del mes.
    6. Guarda el archivo y vuelve a subirlo a GitHub (ver README.md).

  Formato de números: usa punto decimal (12.7, no 12,7). Sin comas de miles.
  ============================================================================
*/

// ACTUALIZADO 10-nov-2026: CORTE 9-NOV-2026 (noviembre, 9 días de Real: 1 al 9 nov). Proyección de noviembre $16.46M (ajustada el 10-nov por mantenimientos y subrogación; antes $17.95M) con la agenda de Metepec bloqueada del 16 al 20-nov. Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Ingresos, Atenciones, Pacientes, Servicios y Subrogación al 9-nov (cargos de vRepro; el Drive de Cargos llega al 31-oct).
// Consultas (primera vez), No Show y ranking de consultas actualizados al 9-nov (vRepro, Primera Vez Terminada / No Asiste). HubSpot (leads, citas, cohortes, mecanismos) también al 9-nov. Conversión (data_conv.js) se refresca por separado.
window.DATA = {
  "corte": "9-nov-2026",
  "meses_hist": [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct"
  ],
  "mes_actual": "Nov",
  "total": {
    "nombre": "Todas las sedes",
    "ingresos": {
      "hist": [
        12.0,
        12.0,
        13.2,
        12.5,
        12.8,
        12.1,
        12.0,
        16.1,
        15.2,
        16.5
      ],
      "actual": 6.47,
      "proy": 16.46,
      "vsLM": 0,
      "vsU3M": 3,
      "nota": "NOVIEMBRE AL CORTE DEL 9-NOV (6.69 de 23.25 días ponderados; Real = $6,473,676: CDMX $5.48M, Guadalajara $0.87M y Metepec $0.13M). Proyección $16.46M (rango $16.02M–$16.90M): +0% vs octubre ($16.47M) y +3% vs el promedio ago-oct. Método (corregido el 10-nov): Real + días ponderados restantes × ritmo base + cola de mantenimientos + subrogación restante. El ritmo base es 40% el de los primeros 9 días y 60% el promedio ago-oct (mezcla con k=10; base del backtest abr–oct, error medio ~7%), pero ahora SIN los almacenamientos/renovaciones de gametos (cobrados sobre todo los primeros días: $0.98M al día 9 vs ~$0.70M en octubre a esa fecha; ~$1.1M al mes) y SIN la subrogación. Antes se contaban dos veces: el real de la primera semana ya trae las renovaciones y el ritmo ago-oct las traía repartidas en todo el mes ($17.95M). Cola de mantenimientos supuesta $0.35M (como octubre) y mantenimiento mensual ago-sep supuesto igual a octubre ($1.1M): este ajuste no está backtesteado. Subrogación: Real $1.54M en 9 días (ya iguala a octubre, paquetes grandes) + 50% del promedio ago-oct por los días restantes (+$0.44M; al 100% serían +$0.88M). Pesos de feriado y puente (CDMX sáb 14 = 0.40 y lun 16 = 0.7; GDL sáb 14 = 0.25 y lun 16 = 0.1). Días ponderados: lun–vie 1, sáb 0.55, dom 0.07. METEPEC: agenda de la Dra. bloqueada del 16 al 20-nov (4.7 días ponderados sin ritmo): Metepec $0.41M en vez de $0.52M. Escenarios: bajo $16.02M (sin más subrogación) y alto $16.90M (subrogación restante al promedio completo)."
    },
    "atenciones": {
      "hist": [
        2498,
        2295,
        2577,
        2522,
        2562,
        2331,
        2561,
        3106,
        3543,
        3147
      ],
      "actual": 983,
      "proy": 3049,
      "vsLM": -3,
      "vsU3M": -7,
      "nota": "Real al 9-nov: 983 líneas de cargo (CDMX 744, GDL 183, MTP 56; 163 son renovaciones de almacenamiento de gametos, concentradas en los primeros días). Proyección 3,049 (mezcla ritmo del mes / ritmo ago-oct con shrinkage k=10 SIN las líneas de almacenamiento + cola de ~55 líneas como octubre; backtest abr–oct error medio 7.5% y sin sesgo; Metepec sin los 5 días bloqueados 16–20 nov): -3% vs octubre (3,147). Ingreso por atención proyectado ~$5.4K vs ~$5.2K en octubre (el Real trae paquetes de subrogación)."
    },
    "pacientes": {
      "hist": [
        589,
        613,
        735,
        773,
        762,
        732,
        741,
        1000,
        1323,
        962
      ],
      "actual": 477,
      "proy": 1014,
      "vsLM": 5,
      "vsU3M": -7,
      "nota": "Real al 9-nov: 477 pacientes únicos (CDMX 354, GDL 88, MTP 35; suma por sede). Proyección 1,014 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +5% vs octubre (962)."
    },
    "consultas": {
      "hist": [
        168,
        167,
        235,
        220,
        225,
        271,
        255,
        316,
        320,
        278
      ],
      "real": 104,
      "agendado": 167,
      "proy": 271,
      "vsLM": -3,
      "vsU3M": -11,
      "nota": "Real al 9-nov: 104 consultas de primera vez terminadas (CDMX 62, GDL 30, MTP 12; grupo Primera Vez completo, misma definición del histórico). Proyección 271 con el modelo de Bru: terminadas 104 + agenda pendiente 10–30 nov (CDMX 68, GDL 42, MTP 27 citas) × show rate (CDMX 86%, GDL 79%, MTP 67%) = piso 214, + incremental por agendar (velocidad de agenda × decay del día × show rate) ≈ 57. Rango 260–283 (incremental ×0.8 / ×1.2). Metepec descuenta el bloqueo de agenda del 16–20-nov. Referencia cruzada por ritmo histórico (backtest abr–oct, MAPE 6.9%): 304; la brecha está en GDL (82 vs 108), que trae poca agenda hacia adelante. -3% vs octubre (278). No Show 15.4% (19 inasistencias sobre 123 citas de primera vez del 1 al 9-nov)."
    },
    "noshow": {
      "hist": [
        8.8,
        6.2,
        14,
        15.7,
        19.1,
        14.8,
        14.7,
        15.3,
        16.4,
        19.9
      ],
      "actual": 15.4,
      "prom": 14.5,
      "deltaPts": 0.9
    }
  },
  "sedes": {
    "CDMX": {
      "nombre": "Ciudad de México",
      "ingresos": {
        "hist": [
          10.2,
          9.8,
          10.3,
          10.5,
          10.2,
          9.3,
          10.0,
          12.4,
          13.3,
          13.8
        ],
        "actual": 5.48,
        "proy": 13.66,
        "vsLM": -1,
        "vsU3M": 4,
        "nota": "Real al 9-nov $5.48M; proyección $13.66M (-1% vs octubre, $13.80M). Incluye subrogación proyectada $1.98M (Real $1.54M + 50% del promedio ago-oct del resto del mes)."
      },
      "atenciones": {
        "hist": [
          2099,
          1795,
          1944,
          2018,
          1977,
          1717,
          1910,
          2069,
          2658,
          2394
        ],
        "actual": 744,
        "proy": 2292,
        "vsLM": -4,
        "vsU3M": -3
      },
      "pacientes": {
        "hist": [
          455,
          470,
          530,
          587,
          566,
          500,
          506,
          618,
          931,
          669
        ],
        "actual": 354,
        "proy": 709,
        "vsLM": 6,
        "vsU3M": -4
      },
      "consultas": {
        "hist": [
          127,
          105,
          144,
          145,
          133,
          169,
          141,
          137,
          145,
          145
        ],
        "real": 62,
        "agendado": 95,
        "proy": 157,
        "vsLM": 8,
        "vsU3M": 10,
        "top_cat": "Consulta primera vez",
        "top_n": 97
      },
      "noshow": {
        "hist": [
          7.4,
          7.9,
          11.2,
          14.2,
          19.9,
          10.2,
          13,
          11,
          13.7,
          14.7
        ],
        "actual": 11.4,
        "prom": 12.3,
        "deltaPts": -0.9
      }
    },
    "GDL": {
      "nombre": "Guadalajara",
      "ingresos": {
        "hist": [
          1.3,
          1.5,
          2.1,
          1.5,
          1.9,
          2.4,
          1.5,
          2.8,
          1.5,
          2.0
        ],
        "actual": 0.87,
        "proy": 2.38,
        "vsLM": 19,
        "vsU3M": 15,
        "nota": "Real al 9-nov $0.87M; proyección $2.38M (+19% vs octubre, $2.00M)."
      },
      "atenciones": {
        "hist": [
          261,
          311,
          420,
          326,
          416,
          507,
          428,
          751,
          660,
          555
        ],
        "actual": 183,
        "proy": 592,
        "vsLM": 7,
        "vsU3M": -10
      },
      "pacientes": {
        "hist": [
          103,
          98,
          158,
          136,
          163,
          195,
          175,
          287,
          299,
          226
        ],
        "actual": 88,
        "proy": 245,
        "vsLM": 8,
        "vsU3M": -9
      },
      "consultas": {
        "hist": [
          33,
          41,
          75,
          55,
          79,
          93,
          87,
          133,
          123,
          108
        ],
        "real": 30,
        "agendado": 52,
        "proy": 82,
        "vsLM": -24,
        "vsU3M": -32,
        "top_cat": "Check-up SOP",
        "top_n": 17
      },
      "noshow": {
        "hist": [
          13.2,
          2.4,
          15.7,
          17.9,
          16.8,
          19.1,
          17.1,
          14.2,
          15.8,
          23.4
        ],
        "actual": 11.8,
        "prom": 15.6,
        "deltaPts": -3.8
      }
    },
    "MTP": {
      "nombre": "Metepec",
      "ingresos": {
        "hist": [
          0.5,
          0.7,
          0.8,
          0.5,
          0.6,
          0.4,
          0.5,
          0.9,
          0.4,
          0.7
        ],
        "actual": 0.13,
        "proy": 0.414,
        "vsLM": -38,
        "vsU3M": -38,
        "nota": "Real al 9-nov $130.5K (56 líneas de cargo); proyección $414K (-38% vs octubre, $666K). Incluye el bloqueo de agenda de la Dra. del 16 al 20-nov (4.7 días ponderados sin ritmo): sin el bloqueo serían $523K."
      },
      "atenciones": {
        "hist": [
          138,
          189,
          213,
          178,
          169,
          107,
          223,
          286,
          225,
          198
        ],
        "actual": 56,
        "proy": 165,
        "vsLM": -17,
        "vsU3M": -30
      },
      "pacientes": {
        "hist": [
          31,
          45,
          47,
          50,
          33,
          37,
          60,
          95,
          93,
          67
        ],
        "actual": 35,
        "proy": 60,
        "vsLM": -10,
        "vsU3M": -29
      },
      "consultas": {
        "hist": [
          8,
          21,
          16,
          20,
          13,
          9,
          27,
          46,
          52,
          25
        ],
        "real": 12,
        "agendado": 20,
        "proy": 32,
        "vsLM": 28,
        "vsU3M": -22,
        "top_cat": "Consulta primera vez",
        "top_n": 24
      },
      "noshow": {
        "hist": [
          11.1,
          4.5,
          27.3,
          20,
          23.5,
          40,
          15.6,
          28.1,
          24.6,
          30.6
        ],
        "actual": 36.8,
        "prom": 22.5,
        "deltaPts": 14.3
      }
    }
  },
  "servicios": {
    "total": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 4.54,
        "vsLM": 2,
        "vsU3M": -2
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.34,
        "vsLM": 0,
        "vsU3M": 1
      },
      {
        "nombre": "Farmacia",
        "valor": 3.08,
        "vsLM": -13,
        "vsU3M": -2
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.53,
        "vsLM": -8,
        "vsU3M": -1
      },
      {
        "nombre": "Subrogación",
        "valor": 1.99,
        "vsLM": 25,
        "vsU3M": 51
      },
      {
        "nombre": "Consultas",
        "valor": 0.47,
        "vsLM": 21,
        "vsU3M": 4
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.37,
        "vsLM": 22,
        "vsU3M": 0
      },
      {
        "nombre": "Imágenes",
        "valor": 0.09,
        "vsLM": 32,
        "vsU3M": -1
      },
      {
        "nombre": "Wellness",
        "valor": 0.04,
        "vsLM": -27,
        "vsU3M": 1
      },
      {
        "nombre": "Otros",
        "valor": 0.02,
        "vsLM": 15,
        "vsU3M": 1
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 3.82,
        "vsLM": 4,
        "vsU3M": -2
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.62,
        "vsLM": -4,
        "vsU3M": -2
      },
      {
        "nombre": "Farmacia",
        "valor": 2.55,
        "vsLM": -11,
        "vsU3M": -2
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.05,
        "vsLM": -15,
        "vsU3M": -2
      },
      {
        "nombre": "Subrogación",
        "valor": 1.98,
        "vsLM": 25,
        "vsU3M": 51
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.3,
        "vsLM": 23,
        "vsU3M": -2
      },
      {
        "nombre": "Consultas",
        "valor": 0.22,
        "vsLM": 19,
        "vsU3M": -2
      },
      {
        "nombre": "Imágenes",
        "valor": 0.07,
        "vsLM": 40,
        "vsU3M": -2
      },
      {
        "nombre": "Wellness",
        "valor": 0.03,
        "vsLM": -30,
        "vsU3M": -2
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 144,
        "vsU3M": -2
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.66,
        "vsLM": 12,
        "vsU3M": 15
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.59,
        "vsLM": 41,
        "vsU3M": 15
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.41,
        "vsLM": 46,
        "vsU3M": 15
      },
      {
        "nombre": "Farmacia",
        "valor": 0.4,
        "vsLM": -8,
        "vsU3M": 15
      },
      {
        "nombre": "Consultas",
        "valor": 0.24,
        "vsLM": 25,
        "vsU3M": 15
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.06,
        "vsLM": 6,
        "vsU3M": 15
      },
      {
        "nombre": "Imágenes",
        "valor": 0.01,
        "vsLM": -12,
        "vsU3M": 15
      },
      {
        "nombre": "Wellness",
        "valor": 0.01,
        "vsLM": -15,
        "vsU3M": 15
      },
      {
        "nombre": "Subrogación",
        "valor": 0.01,
        "vsLM": 798,
        "vsU3M": 15
      },
      {
        "nombre": "Otros",
        "valor": 0.0,
        "vsLM": -62,
        "vsU3M": 15
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.13,
        "vsLM": -63,
        "vsU3M": -40
      },
      {
        "nombre": "Farmacia",
        "valor": 0.13,
        "vsLM": -41,
        "vsU3M": -40
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.07,
        "vsLM": 13,
        "vsU3M": -40
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.06,
        "vsLM": 292,
        "vsU3M": -20
      },
      {
        "nombre": "Consultas",
        "valor": 0.01,
        "vsLM": 4,
        "vsU3M": -40
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.01,
        "vsLM": null,
        "vsU3M": -40,
        "nuevo": true
      },
      {
        "nombre": "Imágenes",
        "valor": 0.0,
        "vsLM": 200,
        "vsU3M": -29
      },
      {
        "nombre": "Wellness",
        "valor": 0.0,
        "vsLM": -48,
        "vsU3M": -40
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre al corte del 9-nov: Real $6.47M (6.69 de 23.25 días ponderados). Proyección $16.46M (rango $16.02M–$16.90M): +0% vs octubre ($16.47M). CDMX aporta 83% ($13.66M), Guadalajara 14% ($2.38M) y Metepec 3% ($0.41M).",
      "Metepec con la agenda de la Dra. bloqueada del 16 al 20-nov. Efecto estimado: -$0.11M (Metepec $0.41M en vez de $0.52M; Atenciones MTP 165, Pacientes 60).",
      "El lunes 9-nov cerró en $2.03M: cuatro paquetes de subrogación en CDMX por $1.42M (Fresh Egg Donor $833K y $381K, dos Essentials de $105K) más FIV, congelación y farmacia. Semana 2–8 nov: $4.39M. Del Real de $6.47M, $1.54M son subrogación (paquetes de una sola vez) y $0.98M renovaciones de almacenamiento, cobradas al inicio del mes.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.54M, Congelación de Gametos $3.34M, Farmacia $3.08M, Laboratorio $2.53M, Subrogación $1.99M. De la subrogación ($1.99M), $1.54M ya están en el Real (paquetes del 3 y 9-nov).",
      "Atenciones proyectadas 3,049 (-3% vs octubre) y Pacientes 1,014 (+5%). Consultas de primera vez al 9-nov: 104 reales y proyección 271 (-3% vs octubre, rango 260–283); No Show 15.4%. HubSpot (Interesa2) al 9-nov: 526 leads y 116 citas agendadas (22% de conversión vs 25% en octubre; CDMX 39%, GDL 15%, MTP 19%)."
    ],
    "CDMX": [
      "CDMX lleva $5.48M al 9-nov y proyecta $13.66M (-1% vs octubre, +4% vs U3M): Tratamientos FIV/ICSI $3.82M, Congelación de Gametos $2.62M, Farmacia $2.55M, Laboratorio $2.05M, Subrogación $1.98M.",
      "744 atenciones y 354 pacientes al corte; proyección 2,292 atenciones (-4% vs octubre) y 709 pacientes (+6% vs octubre). Consultas de primera vez: 62 al corte, proyección 157 (+8% vs octubre); No Show 11.4%.",
      "HubSpot (Interesa2) al 9-nov: 178 leads y 69 citas agendadas (39% de conversión vs 30% en octubre, con 882 leads y 261 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "GDL": [
      "GDL lleva $0.87M al 9-nov y proyecta $2.38M (+19% vs octubre): Congelación de Gametos $0.66M, Tratamientos FIV/ICSI $0.59M, Laboratorio $0.41M, Farmacia $0.40M.",
      "183 atenciones y 88 pacientes al corte; proyección 592 atenciones y 245 pacientes. Consultas de primera vez: 30 al corte, proyección 82 (-24% vs octubre); No Show 11.8%.",
      "HubSpot (Interesa2) al 9-nov: 183 leads y 28 citas agendadas (15% de conversión vs 24% en octubre, con 654 leads y 154 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "MTP": [
      "Metepec lleva $130.5K al 9-nov (56 líneas) y proyecta $414K (-38% vs octubre). Ya incluye el bloqueo de la agenda de la Dra. del 16 al 20-nov (sin él: $523K); sigue siendo la sede con mayor incertidumbre.",
      "56 atenciones y 35 pacientes al corte; proyección 165 atenciones y 60 pacientes. Consultas de primera vez: 12 al corte, proyección 32 (+28% vs octubre; ya descuenta el bloqueo de agenda 16–20-nov); No Show 36.8%.",
      "HubSpot (Interesa2) al 9-nov: 42 leads y 8 citas agendadas (19% de conversión vs 32% en octubre, con 198 leads y 63 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ]
  },
  "consultas_ranking": {
    "total": [
      {
        "nombre": "Consulta primera vez",
        "valor": 137,
        "vsLM": 15
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 37,
        "vsLM": -7
      },
      {
        "nombre": "Check-up SOP",
        "valor": 21,
        "vsLM": -30
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 20,
        "vsLM": -39
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 16,
        "vsLM": 33
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 13,
        "vsLM": -19
      },
      {
        "nombre": "Check up Integral",
        "valor": 13,
        "vsLM": -7
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 5,
        "vsLM": 150
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 4,
        "vsLM": -20
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 2,
        "vsLM": -60
      },
      {
        "nombre": "Consulta obstetrica materno fetal",
        "valor": 1,
        "vsLM": 0
      }
    ],
    "CDMX": [
      {
        "nombre": "Consulta primera vez",
        "valor": 97,
        "vsLM": 20
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 23,
        "vsLM": -15
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 16,
        "vsLM": 33
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 6,
        "vsLM": -40
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 6,
        "vsLM": -14
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 3,
        "vsLM": 200
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Check-up SOP",
        "valor": 2,
        "vsLM": -33
      },
      {
        "nombre": "Check up Integral",
        "valor": 2,
        "vsLM": -33
      }
    ],
    "GDL": [
      {
        "nombre": "Check-up SOP",
        "valor": 17,
        "vsLM": -32
      },
      {
        "nombre": "Consulta primera vez",
        "valor": 16,
        "vsLM": -11
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 13,
        "vsLM": -48
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 12,
        "vsLM": 0
      },
      {
        "nombre": "Check up Integral",
        "valor": 11,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 4,
        "vsLM": -20
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 4,
        "vsLM": -20
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 2,
        "vsLM": -60
      },
      {
        "nombre": "Consulta obstetrica materno fetal",
        "valor": 1,
        "vsLM": 0
      }
    ],
    "MTP": [
      {
        "nombre": "Consulta primera vez",
        "valor": 24,
        "vsLM": 20
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 3,
        "vsLM": 200
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Check-up SOP",
        "valor": 2,
        "vsLM": 0
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 1,
        "vsLM": 0
      }
    ]
  },
  "hubspot": {
    "leads": {
      "hist": [
        833,
        1059,
        1020,
        999,
        1752,
        1435,
        1533,
        1921,
        2095,
        2057
      ],
      "actual": 526
    },
    "citas": {
      "hist": [
        188,
        230,
        318,
        328,
        367,
        315,
        418,
        501,
        468,
        514
      ],
      "actual": 116
    },
    "conversion_pct": {
      "hist": [
        23,
        22,
        31,
        33,
        21,
        22,
        27,
        26,
        22,
        25
      ],
      "actual": 22
    },
    "conversion_por_sede": {
      "CDMX": {
        "mensual": [
          26,
          27,
          38,
          41,
          21,
          25,
          33,
          24,
          23,
          30,
          39,
          null
        ],
        "total2026": 28,
        "leads": [
          481,
          482,
          473,
          513,
          922,
          686,
          657,
          788,
          1001,
          884,
          178,
          null
        ],
        "citas": [
          125,
          129,
          181,
          209,
          194,
          170,
          214,
          187,
          227,
          267,
          69,
          null
        ]
      },
      "GDL": {
        "mensual": [
          20,
          17,
          26,
          22,
          20,
          18,
          21,
          24,
          20,
          24,
          15,
          null
        ],
        "total2026": 21,
        "leads": [
          238,
          372,
          399,
          324,
          577,
          532,
          589,
          702,
          663,
          653,
          181,
          null
        ],
        "citas": [
          47,
          63,
          104,
          72,
          118,
          94,
          121,
          170,
          131,
          157,
          27,
          null
        ]
      },
      "MTP": {
        "mensual": [
          25,
          28,
          38,
          46,
          20,
          14,
          32,
          36,
          36,
          33,
          19,
          null
        ],
        "total2026": 32,
        "leads": [
          44,
          104,
          66,
          57,
          87,
          72,
          151,
          271,
          172,
          199,
          42,
          null
        ],
        "citas": [
          11,
          29,
          25,
          26,
          17,
          10,
          49,
          97,
          62,
          66,
          8,
          null
        ]
      }
    },
    "sede_detalle": {
      "coh": {
        "CDMX": [
          {
            "mes": "Ene-26",
            "leads": 481,
            "m0": 24,
            "m1": 2,
            "m2": 0,
            "sin": 74
          },
          {
            "mes": "Feb-26",
            "leads": 482,
            "m0": 24,
            "m1": 3,
            "m2": 0,
            "sin": 73
          },
          {
            "mes": "Mar-26",
            "leads": 473,
            "m0": 35,
            "m1": 2,
            "m2": 0,
            "sin": 63
          },
          {
            "mes": "Abr-26",
            "leads": 513,
            "m0": 38,
            "m1": 3,
            "m2": 0,
            "sin": 59
          },
          {
            "mes": "May-26",
            "leads": 922,
            "m0": 19,
            "m1": 0,
            "m2": 0,
            "sin": 81
          },
          {
            "mes": "Jun-26",
            "leads": 686,
            "m0": 24,
            "m1": 2,
            "m2": 0,
            "sin": 74
          },
          {
            "mes": "Jul-26",
            "leads": 657,
            "m0": 30,
            "m1": 1,
            "m2": 0,
            "sin": 69
          },
          {
            "mes": "Ago-26",
            "leads": 788,
            "m0": 22,
            "m1": 2,
            "m2": 1,
            "sin": 75
          },
          {
            "mes": "Sep-26",
            "leads": 1001,
            "m0": 21,
            "m1": 1,
            "m2": 0,
            "sin": 78
          },
          {
            "mes": "Oct-26",
            "leads": 884,
            "m0": 29,
            "m1": 0,
            "m2": 0,
            "sin": 71
          },
          {
            "mes": "Nov-26",
            "leads": 178,
            "m0": 35,
            "m1": 0,
            "m2": 0,
            "sin": 65
          }
        ],
        "GDL": [
          {
            "mes": "Ene-26",
            "leads": 238,
            "m0": 19,
            "m1": 1,
            "m2": 3,
            "sin": 77
          },
          {
            "mes": "Feb-26",
            "leads": 372,
            "m0": 16,
            "m1": 2,
            "m2": 1,
            "sin": 81
          },
          {
            "mes": "Mar-26",
            "leads": 399,
            "m0": 25,
            "m1": 0,
            "m2": 1,
            "sin": 74
          },
          {
            "mes": "Abr-26",
            "leads": 324,
            "m0": 22,
            "m1": 2,
            "m2": 2,
            "sin": 74
          },
          {
            "mes": "May-26",
            "leads": 577,
            "m0": 19,
            "m1": 1,
            "m2": 2,
            "sin": 78
          },
          {
            "mes": "Jun-26",
            "leads": 532,
            "m0": 15,
            "m1": 2,
            "m2": 1,
            "sin": 82
          },
          {
            "mes": "Jul-26",
            "leads": 589,
            "m0": 17,
            "m1": 3,
            "m2": 1,
            "sin": 79
          },
          {
            "mes": "Ago-26",
            "leads": 702,
            "m0": 20,
            "m1": 1,
            "m2": 1,
            "sin": 78
          },
          {
            "mes": "Sep-26",
            "leads": 663,
            "m0": 17,
            "m1": 3,
            "m2": 0,
            "sin": 80
          },
          {
            "mes": "Oct-26",
            "leads": 653,
            "m0": 19,
            "m1": 1,
            "m2": 0,
            "sin": 80
          },
          {
            "mes": "Nov-26",
            "leads": 181,
            "m0": 9,
            "m1": 0,
            "m2": 0,
            "sin": 91
          }
        ],
        "MTP": [
          {
            "mes": "Ene-26",
            "leads": 44,
            "m0": 25,
            "m1": 0,
            "m2": 2,
            "sin": 73
          },
          {
            "mes": "Feb-26",
            "leads": 104,
            "m0": 27,
            "m1": 4,
            "m2": 0,
            "sin": 69
          },
          {
            "mes": "Mar-26",
            "leads": 66,
            "m0": 29,
            "m1": 2,
            "m2": 3,
            "sin": 66
          },
          {
            "mes": "Abr-26",
            "leads": 57,
            "m0": 44,
            "m1": 4,
            "m2": 0,
            "sin": 52
          },
          {
            "mes": "May-26",
            "leads": 87,
            "m0": 16,
            "m1": 1,
            "m2": 2,
            "sin": 81
          },
          {
            "mes": "Jun-26",
            "leads": 72,
            "m0": 13,
            "m1": 1,
            "m2": 0,
            "sin": 86
          },
          {
            "mes": "Jul-26",
            "leads": 151,
            "m0": 32,
            "m1": 1,
            "m2": 0,
            "sin": 67
          },
          {
            "mes": "Ago-26",
            "leads": 271,
            "m0": 34,
            "m1": 2,
            "m2": 0,
            "sin": 64
          },
          {
            "mes": "Sep-26",
            "leads": 172,
            "m0": 33,
            "m1": 1,
            "m2": 0,
            "sin": 66
          },
          {
            "mes": "Oct-26",
            "leads": 199,
            "m0": 32,
            "m1": 1,
            "m2": 0,
            "sin": 67
          },
          {
            "mes": "Nov-26",
            "leads": 42,
            "m0": 17,
            "m1": 0,
            "m2": 0,
            "sin": 83
          }
        ]
      },
      "mecL": {
        "CDMX": {
          "WhatsApp ATOM": [
            120,
            63,
            61,
            82,
            396,
            296,
            236,
            225,
            298,
            280,
            51,
            0
          ],
          "WhatsApp ATOM bubble": [
            0,
            0,
            0,
            0,
            28,
            90,
            155,
            254,
            282,
            167,
            29,
            0
          ],
          "Typeform": [
            294,
            341,
            304,
            299,
            225,
            93,
            86,
            66,
            53,
            37,
            8,
            0
          ],
          "Partial typeform": [
            0,
            3,
            10,
            3,
            155,
            125,
            93,
            161,
            252,
            218,
            48,
            0
          ],
          "LunaCal": [
            50,
            49,
            83,
            101,
            97,
            56,
            53,
            68,
            87,
            136,
            28,
            0
          ],
          "Instagram DM": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            16,
            29,
            9,
            0
          ],
          "(Sin valor)": [
            17,
            26,
            15,
            28,
            21,
            22,
            33,
            6,
            7,
            12,
            2,
            0
          ],
          "Otros": [
            0,
            0,
            0,
            0,
            0,
            4,
            1,
            8,
            6,
            5,
            3,
            0
          ]
        },
        "GDL": {
          "WhatsApp ATOM": [
            41,
            44,
            28,
            49,
            261,
            241,
            183,
            156,
            182,
            212,
            69,
            0
          ],
          "WhatsApp ATOM bubble": [
            0,
            0,
            0,
            0,
            20,
            59,
            194,
            266,
            245,
            160,
            27,
            0
          ],
          "Typeform": [
            169,
            274,
            309,
            236,
            195,
            124,
            102,
            58,
            20,
            30,
            20,
            0
          ],
          "Partial typeform": [
            0,
            1,
            3,
            4,
            65,
            58,
            75,
            179,
            162,
            165,
            38,
            0
          ],
          "LunaCal": [
            19,
            38,
            42,
            27,
            19,
            25,
            27,
            26,
            33,
            28,
            6,
            0
          ],
          "Instagram DM": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            10,
            47,
            17,
            0
          ],
          "(Sin valor)": [
            9,
            15,
            17,
            8,
            17,
            25,
            8,
            17,
            10,
            8,
            4,
            0
          ],
          "Otros": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            3,
            0,
            0
          ]
        },
        "MTP": {
          "WhatsApp ATOM": [
            14,
            28,
            3,
            14,
            44,
            32,
            27,
            61,
            30,
            44,
            15,
            0
          ],
          "WhatsApp ATOM bubble": [
            0,
            0,
            0,
            0,
            2,
            14,
            26,
            70,
            47,
            40,
            9,
            0
          ],
          "Typeform": [
            22,
            58,
            48,
            28,
            23,
            11,
            27,
            18,
            8,
            5,
            1,
            0
          ],
          "Partial typeform": [
            0,
            0,
            1,
            2,
            15,
            11,
            57,
            87,
            54,
            56,
            9,
            0
          ],
          "LunaCal": [
            2,
            11,
            7,
            9,
            3,
            3,
            9,
            30,
            28,
            37,
            3,
            0
          ],
          "Instagram DM": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            12,
            3,
            0
          ],
          "(Sin valor)": [
            6,
            7,
            7,
            4,
            0,
            1,
            5,
            2,
            2,
            4,
            2,
            0
          ],
          "Otros": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            3,
            2,
            1,
            0,
            0
          ]
        }
      },
      "mecC": {
        "CDMX": {
          "WhatsApp ATOM": [
            55,
            33,
            32,
            51,
            55,
            69,
            79,
            53,
            52,
            53,
            18,
            0
          ],
          "WhatsApp ATOM bubble": [
            0,
            0,
            0,
            0,
            3,
            14,
            23,
            33,
            39,
            23,
            8,
            0
          ],
          "Typeform": [
            18,
            36,
            43,
            42,
            31,
            18,
            18,
            11,
            10,
            12,
            0,
            0
          ],
          "Partial typeform": [
            0,
            2,
            6,
            4,
            13,
            10,
            7,
            14,
            27,
            22,
            7,
            0
          ],
          "LunaCal": [
            35,
            35,
            84,
            84,
            71,
            36,
            53,
            63,
            86,
            140,
            29,
            0
          ],
          "Instagram DM": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            3,
            0
          ],
          "(Sin valor)": [
            17,
            23,
            16,
            28,
            21,
            21,
            33,
            5,
            7,
            11,
            1,
            0
          ],
          "Otros": [
            0,
            0,
            0,
            0,
            0,
            2,
            1,
            8,
            6,
            5,
            3,
            0
          ]
        },
        "GDL": {
          "WhatsApp ATOM": [
            16,
            17,
            14,
            23,
            52,
            35,
            43,
            47,
            33,
            44,
            7,
            0
          ],
          "WhatsApp ATOM bubble": [
            0,
            0,
            0,
            0,
            1,
            9,
            21,
            35,
            23,
            36,
            2,
            0
          ],
          "Typeform": [
            10,
            14,
            31,
            20,
            27,
            11,
            16,
            12,
            8,
            8,
            4,
            0
          ],
          "Partial typeform": [
            0,
            0,
            2,
            0,
            8,
            4,
            10,
            29,
            23,
            26,
            5,
            0
          ],
          "LunaCal": [
            13,
            17,
            41,
            22,
            16,
            21,
            22,
            31,
            33,
            29,
            6,
            0
          ],
          "Instagram DM": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            3,
            0,
            0
          ],
          "(Sin valor)": [
            8,
            15,
            16,
            7,
            14,
            14,
            9,
            16,
            9,
            9,
            3,
            0
          ],
          "Otros": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            2,
            0,
            0
          ]
        },
        "MTP": {
          "WhatsApp ATOM": [
            4,
            11,
            3,
            8,
            8,
            5,
            6,
            30,
            11,
            7,
            2,
            0
          ],
          "WhatsApp ATOM bubble": [
            0,
            0,
            0,
            0,
            0,
            1,
            12,
            20,
            14,
            13,
            0,
            0
          ],
          "Typeform": [
            3,
            4,
            6,
            5,
            4,
            1,
            10,
            4,
            2,
            1,
            1,
            0
          ],
          "Partial typeform": [
            0,
            0,
            0,
            0,
            1,
            1,
            6,
            10,
            4,
            3,
            0,
            0
          ],
          "LunaCal": [
            0,
            7,
            8,
            9,
            4,
            1,
            10,
            29,
            27,
            37,
            3,
            0
          ],
          "Instagram DM": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "(Sin valor)": [
            4,
            7,
            8,
            4,
            0,
            1,
            5,
            2,
            2,
            4,
            2,
            0
          ],
          "Otros": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            2,
            2,
            1,
            0,
            0
          ]
        }
      }
    },
    "cohortes": [
      {
        "mes": "Ene-26",
        "leads": 834,
        "m0": 21,
        "m1": 1,
        "m2": 0,
        "sin": 78
      },
      {
        "mes": "Feb-26",
        "leads": 1062,
        "m0": 20,
        "m1": 2,
        "m2": 0,
        "sin": 78
      },
      {
        "mes": "Mar-26",
        "leads": 1021,
        "m0": 28,
        "m1": 1,
        "m2": 0,
        "sin": 71
      },
      {
        "mes": "Abr-26",
        "leads": 1000,
        "m0": 31,
        "m1": 3,
        "m2": 0,
        "sin": 66
      },
      {
        "mes": "May-26",
        "leads": 1754,
        "m0": 19,
        "m1": 1,
        "m2": 1,
        "sin": 79
      },
      {
        "mes": "Jun-26",
        "leads": 1436,
        "m0": 20,
        "m1": 2,
        "m2": 0,
        "sin": 78
      },
      {
        "mes": "Jul-26",
        "leads": 1533,
        "m0": 24,
        "m1": 2,
        "m2": 0,
        "sin": 74
      },
      {
        "mes": "Ago-26",
        "leads": 1924,
        "m0": 24,
        "m1": 1,
        "m2": 0,
        "sin": 75
      },
      {
        "mes": "Sep-26",
        "leads": 2108,
        "m0": 20,
        "m1": 1,
        "m2": 0,
        "sin": 79
      },
      {
        "mes": "Oct-26",
        "leads": 2057,
        "m0": 22,
        "m1": 0,
        "m2": 0,
        "sin": 78
      },
      {
        "mes": "Nov-26",
        "leads": 526,
        "m0": 19,
        "m1": 0,
        "m2": 0,
        "sin": 81
      }
    ]
  },
  "subrogacion": {
    "total": {
      "labels": [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov"
      ],
      "hist": {
        "Valoración": [
          16,
          4,
          0,
          4,
          11,
          4,
          3,
          3,
          92,
          15,
          3
        ],
        "Programa Activo": [
          0,
          2,
          0,
          1,
          1,
          2,
          3,
          7,
          4,
          10,
          4
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 3,
          "ingreso": 4267.23,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 4,
          "ingreso": 1529021.63,
          "ticket": 382255.41
        }
      },
      "totalPacientesYTD": {
        "Valoración": 155,
        "Programa Activo": 34
      },
      "ingresoYTD": 7220974.42
    },
    "CDMX": {
      "labels": [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov"
      ],
      "hist": {
        "Valoración": [
          16,
          4,
          0,
          4,
          11,
          4,
          3,
          3,
          91,
          15,
          3
        ],
        "Programa Activo": [
          0,
          1,
          0,
          1,
          1,
          2,
          3,
          7,
          4,
          10,
          4
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 3,
          "ingreso": 4267.23,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 4,
          "ingreso": 1529021.63,
          "ticket": 382255.41
        }
      },
      "totalPacientesYTD": {
        "Valoración": 154,
        "Programa Activo": 33
      },
      "ingresoYTD": 7184767.53
    },
    "GDL": {
      "labels": [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov"
      ],
      "hist": {
        "Valoración": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0
        ],
        "Programa Activo": [
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 0,
          "ingreso": 0,
          "ticket": 0
        },
        "Programa Activo": {
          "pacientes": 0,
          "ingreso": 0,
          "ticket": 0
        }
      },
      "totalPacientesYTD": {
        "Valoración": 1,
        "Programa Activo": 1
      },
      "ingresoYTD": 36206.89
    },
    "MTP": {
      "labels": [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov"
      ],
      "hist": {
        "Valoración": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "Programa Activo": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 0,
          "ingreso": 0,
          "ticket": 0
        },
        "Programa Activo": {
          "pacientes": 0,
          "ingreso": 0,
          "ticket": 0
        }
      },
      "totalPacientesYTD": {
        "Valoración": 0,
        "Programa Activo": 0
      },
      "ingresoYTD": 0
    }
  },
  "conceptos": {}
};
