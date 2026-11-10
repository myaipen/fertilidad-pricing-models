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

// ACTUALIZADO 10-nov-2026: CORTE 9-NOV-2026 (noviembre, 9 días de Real: 1 al 9 nov). Proyección de noviembre con la agenda de Metepec bloqueada del 16 al 20-nov. Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Ingresos, Atenciones, Pacientes, Servicios y Subrogación al 9-nov (cargos de vRepro; el Drive de Cargos llega al 31-oct).
// Consultas (primera vez), No Show, HubSpot y ranking de consultas permanecen en el corte del 2-nov (pendientes de refrescar). Conversión (data_conv.js) sin cambios (corte 2-nov).
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
      "proy": 16.21,
      "vsLM": -2,
      "vsU3M": 2,
      "nota": "NOVIEMBRE AL CORTE DEL 9-NOV (6.69 de 23.25 días ponderados; Real = $6,473,677: CDMX $5.48M, Guadalajara $0.87M y Metepec $0.13M). Proyección central $16.21M (rango $15.46M–$17.23M): -2% vs octubre ($16.47M) y +2% vs el promedio ago-oct. Método: ritmo por día hábil ponderado (lun–vie 1, sáb 0.55, dom 0.07, feriados según su efecto observado; lun 16-nov = 0.7) con peso por recencia, aplicado por sede. METEPEC: la agenda de la Dra. está bloqueada del 16 al 20 de noviembre, así que esos 5 días (4.7 días ponderados) no suman ritmo en Metepec (efecto -$0.12M en la proyección total; Metepec $0.43M en vez de $0.54M). El Real corre muy arriba del ritmo central ($968K vs $595K por día ponderado) por paquetes de subrogación del lun 9-nov ($1.42M en 4 paquetes, CDMX): la curva histórica de avance sugiere $22.3M (mediana) y $19.5M (conservadora, máximo histórico de avance); se mantiene la central porque esos paquetes son de una sola vez."
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
      "proy": 3167,
      "vsLM": 1,
      "vsU3M": -3,
      "nota": "Real al 9-nov: 983 líneas de cargo (CDMX 744, GDL 183, MTP 56). Proyección 3,167 (curva de ritmo por sede; Metepec sin los 5 días bloqueados 16–20 nov): +1% vs octubre (3,147). Ingreso por atención proyectado ~$5.1K vs ~$5.2K en octubre."
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
      "proy": 1054,
      "vsLM": 10,
      "vsU3M": -4,
      "nota": "Real al 9-nov: 477 pacientes únicos (CDMX 354, GDL 88, MTP 35; suma por sede). Proyección 1,054 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +10% vs octubre (962)."
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
      "real": 20,
      "agendado": 279,
      "proy": 299,
      "vsLM": 8,
      "vsU3M": -2,
      "nota": "Consultas y No Show siguen al corte del 2-nov (no se refrescaron al 9-nov): 20 consultas de primera vez terminadas (CDMX 11, GDL 7, MTP 2) y proyección 299 por ritmo (rango 284–318). No Show 16.7% (4 inasistencias sobre 24 citas del 2-nov). Pendiente de refrescar con la agenda de vRepro."
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
      "actual": 16.7,
      "prom": 14.5,
      "deltaPts": 2.2
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
        "proy": 13.63,
        "vsLM": -1,
        "vsU3M": 3,
        "nota": "Real al 9-nov $5.48M; proyección $13.63M (-1% vs octubre, $13.80M)."
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
        "proy": 2382,
        "vsLM": -1,
        "vsU3M": 0
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
        "proy": 737,
        "vsLM": 10,
        "vsU3M": 0
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
        "real": 11,
        "agendado": 130,
        "proy": 141,
        "vsLM": -3,
        "vsU3M": -1,
        "top_cat": "Consulta primera vez",
        "top_n": 81
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
        "actual": 15.4,
        "prom": 12.3,
        "deltaPts": 3.1
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
        "proy": 2.15,
        "vsLM": 7,
        "vsU3M": 4,
        "nota": "Real al 9-nov $0.87M; proyección $2.15M (+7% vs octubre, $2.00M)."
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
        "proy": 633,
        "vsLM": 14,
        "vsU3M": -3
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
        "proy": 262,
        "vsLM": 16,
        "vsU3M": -3
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
        "real": 7,
        "agendado": 111,
        "proy": 118,
        "vsLM": 9,
        "vsU3M": -3,
        "top_cat": "Check-up SOP",
        "top_n": 27
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
        "actual": 12.5,
        "prom": 15.6,
        "deltaPts": -3.1
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
        "proy": 0.43,
        "vsLM": -36,
        "vsU3M": -36,
        "nota": "Real al 9-nov $130.5K (56 líneas de cargo); proyección $425K (-36% vs octubre, $666K). Incluye el bloqueo de agenda de la Dra. del 16 al 20-nov (4.7 días ponderados sin ritmo): sin el bloqueo serían $542K."
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
        "proy": 152,
        "vsLM": -23,
        "vsU3M": -36
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
        "proy": 55,
        "vsLM": -18,
        "vsU3M": -35
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
        "real": 2,
        "agendado": 38,
        "proy": 40,
        "vsLM": 60,
        "vsU3M": -2,
        "top_cat": "Consulta primera vez",
        "top_n": 33
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
        "actual": 33.3,
        "prom": 22.5,
        "deltaPts": 10.8
      }
    }
  },
  "servicios": {
    "total": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 4.62,
        "vsLM": 4,
        "vsU3M": 0
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.37,
        "vsLM": 1,
        "vsU3M": 2
      },
      {
        "nombre": "Farmacia",
        "valor": 3.13,
        "vsLM": -11,
        "vsU3M": -1
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.56,
        "vsLM": -7,
        "vsU3M": 0
      },
      {
        "nombre": "Subrogación",
        "valor": 1.55,
        "vsLM": -2,
        "vsU3M": 17
      },
      {
        "nombre": "Consultas",
        "valor": 0.45,
        "vsLM": 18,
        "vsU3M": 1
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.38,
        "vsLM": 23,
        "vsU3M": 1
      },
      {
        "nombre": "Imágenes",
        "valor": 0.09,
        "vsLM": 34,
        "vsU3M": 0
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
        "vsLM": 16,
        "vsU3M": 2
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 3.96,
        "vsLM": 8,
        "vsU3M": 2
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.71,
        "vsLM": 0,
        "vsU3M": 2
      },
      {
        "nombre": "Farmacia",
        "valor": 2.64,
        "vsLM": -8,
        "vsU3M": 2
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.12,
        "vsLM": -12,
        "vsU3M": 2
      },
      {
        "nombre": "Subrogación",
        "valor": 1.54,
        "vsLM": -3,
        "vsU3M": 17
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.31,
        "vsLM": 28,
        "vsU3M": 2
      },
      {
        "nombre": "Consultas",
        "valor": 0.23,
        "vsLM": 23,
        "vsU3M": 2
      },
      {
        "nombre": "Imágenes",
        "valor": 0.07,
        "vsLM": 45,
        "vsU3M": 2
      },
      {
        "nombre": "Wellness",
        "valor": 0.03,
        "vsLM": -27,
        "vsU3M": 2
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 153,
        "vsU3M": 2
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.59,
        "vsLM": 1,
        "vsU3M": 4
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.53,
        "vsLM": 27,
        "vsU3M": 4
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.37,
        "vsLM": 32,
        "vsU3M": 4
      },
      {
        "nombre": "Farmacia",
        "valor": 0.36,
        "vsLM": -17,
        "vsU3M": 4
      },
      {
        "nombre": "Consultas",
        "valor": 0.22,
        "vsLM": 13,
        "vsU3M": 4
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.06,
        "vsLM": -4,
        "vsU3M": 4
      },
      {
        "nombre": "Imágenes",
        "valor": 0.01,
        "vsLM": -20,
        "vsU3M": 4
      },
      {
        "nombre": "Wellness",
        "valor": 0.01,
        "vsLM": -24,
        "vsU3M": 4
      },
      {
        "nombre": "Subrogación",
        "valor": 0.01,
        "vsLM": 711,
        "vsU3M": 4
      },
      {
        "nombre": "Otros",
        "valor": 0.0,
        "vsLM": -65,
        "vsU3M": 4
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.14,
        "vsLM": -62,
        "vsU3M": -38
      },
      {
        "nombre": "Farmacia",
        "valor": 0.13,
        "vsLM": -40,
        "vsU3M": -38
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.07,
        "vsLM": 17,
        "vsU3M": -38
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
        "vsLM": 8,
        "vsU3M": -38
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.01,
        "vsLM": null,
        "vsU3M": -38,
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
        "vsLM": -47,
        "vsU3M": -38
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre al corte del 9-nov: Real $6.47M (6.69 de 23.25 días ponderados). Proyección central $16.21M, rango $15.46M a $17.23M: -2% vs octubre ($16.47M). CDMX aporta 84% ($13.63M), Guadalajara 13% ($2.15M) y Metepec 3% ($0.43M). Subió $1.31M vs el corte del 8-nov ($14.90M).",
      "Metepec con agenda bloqueada del 16 al 20-nov: se quitan 4.7 días ponderados (lun 16 feriado 0.7 + mar 17 a vie 20) del ritmo de Metepec. Efecto: -$0.12M en la proyección total (Metepec $0.43M en vez de $0.54M; Atenciones MTP 152, Pacientes 55). CDMX y GDL no cambian de calendario.",
      "El lunes 9-nov cerró en $2.03M: cuatro paquetes de subrogación en CDMX por $1.42M (Fresh Egg Donor $833K y $381K, dos Essentials de $105K) más FIV, congelación y farmacia. Semana 2–8 nov: $4.39M. El Real corre ~63% arriba del ritmo central por día ponderado ($968K vs $595K); como son paquetes de una sola vez, no se extrapolan.",
      "Cruce de métodos al 9-nov: central $16.21M (cifra oficial), curva de avance mediana $22.3M y curva conservadora (máximo histórico de avance) $19.5M; ambas quedan arriba de la central porque históricamente al día 9 se lleva entre 19% y 33% del mes (hoy el Real va en 40% de la central). El rango de escenarios del Sheet es $15.46M–$17.23M; el potencial al alza depende de que los paquetes grandes se repitan.",
      "Método: ritmo por día hábil ponderado (lun–vie 1, sáb 0.55, dom 0.07, feriados según su efecto observado; lun 16-nov = 0.7) con peso por recencia (decaimiento 0.8), aplicado por sede (el ritmo total se reparte con la mezcla ago-oct de cada sede). La mezcla por servicio usa la distribución ago–oct de cada sede.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.62M, Congelación de Gametos $3.37M, Farmacia $3.13M, Laboratorio $2.56M, Subrogación $1.55M. Subrogación $1.55M ya está casi toda en el Real (4 paquetes del 3 y 9-nov).",
      "Atenciones proyectadas 3,167 (+1% vs octubre) y Pacientes 1,054 (+10%). Consultas de primera vez, No Show y HubSpot siguen al corte del 2-nov (pendientes de refrescar).",
      "Nota de datos: el archivo de Cargos del Drive llega al 31-oct; noviembre sale de vRepro (cargos del 1 al 9 nov, 983 líneas). Clasificación provisional por confirmar en ConceptosHier: Laffer semen congelado y traslado (Tratamientos), pruebas de laboratorio nuevas y Perfil Seguimiento SOMP (Laboratorio), Evaluación Integral de Subrogada GDL (Subrogación), Ultrasonido - Seguimiento (Imágenes); 'asesoria catalogos' ($517) queda en Sin clasificar."
    ],
    "CDMX": [
      "CDMX lleva $5.48M al 9-nov y proyecta $13.63M (-1% vs octubre, +3% vs U3M): Tratamientos FIV/ICSI $3.96M, Congelación de Gametos $2.71M, Farmacia $2.64M, Laboratorio $2.12M, Subrogación $1.54M.",
      "744 atenciones y 354 pacientes al corte; proyección 2,382 atenciones (-1% vs octubre) y 737 pacientes (+10% vs octubre). Consultas y No Show al corte del 2-nov (No Show 15.4%)."
    ],
    "GDL": [
      "GDL lleva $0.87M al 9-nov y proyecta $2.15M (+7% vs octubre): Congelación de Gametos $0.59M, Tratamientos FIV/ICSI $0.53M, Laboratorio $0.37M, Farmacia $0.36M.",
      "183 atenciones y 88 pacientes al corte; proyección 633 atenciones y 262 pacientes. Consultas (7 al 2-nov) y No Show 12.5% al corte del 2-nov."
    ],
    "MTP": [
      "Metepec lleva $130.5K al 9-nov (56 líneas) y proyecta $425K (-36% vs octubre). Ya incluye el bloqueo de la agenda de la Dra. del 16 al 20-nov (sin él: $542K, -$117K de efecto); sigue siendo la sede con mayor incertidumbre.",
      "56 atenciones y 35 pacientes al corte; proyección 152 atenciones y 55 pacientes (curva de avance ajustada a 18.55 días ponderados disponibles). Consultas (2) y No Show 33.3% al corte del 2-nov."
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
        "valor": 39,
        "vsLM": -3
      },
      {
        "nombre": "Check-up SOP",
        "valor": 33,
        "vsLM": 10
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 33,
        "vsLM": 0
      },
      {
        "nombre": "Check up Integral",
        "valor": 15,
        "vsLM": 7
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 15,
        "vsLM": -6
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 12,
        "vsLM": 0
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 3,
        "vsLM": 50
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 1,
        "vsLM": 0
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
        "valor": 81,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 24,
        "vsLM": -11
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 12,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 9,
        "vsLM": -10
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 6,
        "vsLM": -14
      },
      {
        "nombre": "Check up Integral",
        "valor": 3,
        "vsLM": 0
      },
      {
        "nombre": "Check-up SOP",
        "valor": 3,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 1,
        "vsLM": 0
      }
    ],
    "GDL": [
      {
        "nombre": "Check-up SOP",
        "valor": 27,
        "vsLM": 8
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 26,
        "vsLM": 4
      },
      {
        "nombre": "Consulta primera vez",
        "valor": 23,
        "vsLM": 28
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 13,
        "vsLM": 8
      },
      {
        "nombre": "Check up Integral",
        "valor": 12,
        "vsLM": 9
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 1,
        "vsLM": 0
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
        "valor": 33,
        "vsLM": 65
      },
      {
        "nombre": "Check-up SOP",
        "valor": 3,
        "vsLM": 50
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 1,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Parejas",
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
      "actual": 103
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
      "actual": 27
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
      "actual": 26
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
          32,
          24,
          21,
          30,
          47,
          null
        ],
        "total2026": 27
      },
      "GDL": {
        "mensual": [
          20,
          17,
          26,
          22,
          20,
          18,
          20,
          24,
          19,
          24,
          21,
          null
        ],
        "total2026": 21
      },
      "MTP": {
        "mensual": [
          24,
          28,
          38,
          46,
          19,
          14,
          32,
          36,
          34,
          32,
          13,
          null
        ],
        "total2026": 31
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
        "leads": 103,
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
