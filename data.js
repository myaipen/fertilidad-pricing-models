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

// ACTUALIZADO 9-nov-2026: CORTE 8-NOV-2026 (noviembre, 8 días de Real: 1 al 8 nov). Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Ingresos, Atenciones, Pacientes, Servicios y Subrogación al 8-nov (cargos de vRepro; el Drive de Cargos llega al 31-oct).
// Consultas (primera vez), No Show, HubSpot y ranking de consultas permanecen en el corte del 2-nov (pendientes de refrescar). Conversión (data_conv.js) sin cambios (corte 2-nov).
window.DATA = {
  "corte": "8-nov-2026",
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
      "actual": 4.45,
      "proy": 14.9,
      "vsLM": -10,
      "vsU3M": -6,
      "nota": "NOVIEMBRE AL CORTE DEL 8-NOV (5.69 de 23.25 días ponderados; Real = $4,447,737: CDMX $3,599,411, Guadalajara $806,660 y Metepec $41,666). Proyección central $14.90M (rango $14.09M–$15.99M): -10% vs octubre ($16.47M) y -6% vs el promedio ago-oct. Método: ritmo por día hábil ponderado (lun–vie 1, sáb 0.55, dom 0.07, feriados según su efecto observado; lun 16-nov = 0.7) con peso por recencia. El Real corre arriba del ritmo central ($782K vs $595K por día ponderado): la curva histórica de avance sugiere hasta $17.4M y la versión conservadora (máximo histórico de avance) $14.2M; se mantiene la central. Incluye el feriado del lun 16-nov (≈ -$0.18M)."
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
      "actual": 845,
      "proy": 3230,
      "vsLM": 3,
      "vsU3M": -1,
      "nota": "Real al 8-nov: 845 líneas de cargo (CDMX 646, GDL 164, MTP 35). Proyección 3,230 (curva de ritmo por sede): +3% vs octubre (3,147). Ingreso por atención proyectado ~$4.6K vs ~$5.2K en octubre (menos peso de subrogación y de paquetes grandes)."
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
      "actual": 437,
      "proy": 1079,
      "vsLM": 12,
      "vsU3M": -1,
      "nota": "Real al 8-nov: 437 pacientes únicos (CDMX 328, GDL 83, MTP 26; suma por sede). Proyección 1,079 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +12% vs octubre (962)."
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
      "nota": "Consultas y No Show siguen al corte del 2-nov (no se refrescaron al 8-nov): 20 consultas de primera vez terminadas (CDMX 11, GDL 7, MTP 2) y proyección 299 por ritmo (rango 284–318). No Show 16.7% (4 inasistencias sobre 24 citas del 2-nov). Pendiente de refrescar con la agenda de vRepro."
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
        "actual": 3.6,
        "proy": 12.33,
        "vsLM": -11,
        "vsU3M": -6,
        "nota": "Real al 8-nov $3.60M; proyección $12.33M (-11% vs octubre, $13.80M)."
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
        "actual": 646,
        "proy": 2400,
        "vsLM": 0,
        "vsU3M": 1
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
        "actual": 328,
        "proy": 743,
        "vsLM": 11,
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
        "actual": 0.81,
        "proy": 1.95,
        "vsLM": -3,
        "vsU3M": -6,
        "nota": "Real al 8-nov $0.81M; proyección $1.95M (-3% vs octubre, $2.00M)."
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
        "actual": 164,
        "proy": 668,
        "vsLM": 20,
        "vsU3M": 2
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
        "actual": 83,
        "proy": 277,
        "vsLM": 23,
        "vsU3M": 2
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
        "actual": 0.042,
        "proy": 0.62,
        "vsLM": -7,
        "vsU3M": -6,
        "nota": "Real al 8-nov $41.7K (35 líneas de cargo); proyección $622K (-7% vs octubre, $666K). Sede chica: el Real va ~25% abajo de su ritmo U3M."
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
        "actual": 35,
        "proy": 162,
        "vsLM": -18,
        "vsU3M": -31
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
        "actual": 26,
        "proy": 59,
        "vsLM": -12,
        "vsU3M": -31
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
        "valor": 4.32,
        "vsLM": -3,
        "vsU3M": -6
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.1,
        "vsLM": -7,
        "vsU3M": -6
      },
      {
        "nombre": "Farmacia",
        "valor": 2.95,
        "vsLM": -16,
        "vsU3M": -6
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.39,
        "vsLM": -13,
        "vsU3M": -6
      },
      {
        "nombre": "Subrogación",
        "valor": 1.23,
        "vsLM": -22,
        "vsU3M": -6
      },
      {
        "nombre": "Consultas",
        "valor": 0.42,
        "vsLM": 9,
        "vsU3M": -6
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.35,
        "vsLM": 14,
        "vsU3M": -6
      },
      {
        "nombre": "Imágenes",
        "valor": 0.08,
        "vsLM": 25,
        "vsU3M": -6
      },
      {
        "nombre": "Wellness",
        "valor": 0.04,
        "vsLM": -32,
        "vsU3M": -6
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 7,
        "vsU3M": -6
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 3.63,
        "vsLM": -1,
        "vsU3M": -6
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.49,
        "vsLM": -8,
        "vsU3M": -6
      },
      {
        "nombre": "Farmacia",
        "valor": 2.43,
        "vsLM": -16,
        "vsU3M": -6
      },
      {
        "nombre": "Laboratorio",
        "valor": 1.95,
        "vsLM": -19,
        "vsU3M": -6
      },
      {
        "nombre": "Subrogación",
        "valor": 1.22,
        "vsLM": -23,
        "vsU3M": -6
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.29,
        "vsLM": 17,
        "vsU3M": -6
      },
      {
        "nombre": "Consultas",
        "valor": 0.21,
        "vsLM": 13,
        "vsU3M": -6
      },
      {
        "nombre": "Imágenes",
        "valor": 0.07,
        "vsLM": 33,
        "vsU3M": -6
      },
      {
        "nombre": "Wellness",
        "valor": 0.03,
        "vsLM": -33,
        "vsU3M": -6
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 132,
        "vsU3M": -6
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.54,
        "vsLM": -9,
        "vsU3M": -6
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.48,
        "vsLM": 15,
        "vsU3M": -6
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.33,
        "vsLM": 19,
        "vsU3M": -6
      },
      {
        "nombre": "Farmacia",
        "valor": 0.32,
        "vsLM": -25,
        "vsU3M": -6
      },
      {
        "nombre": "Consultas",
        "valor": 0.2,
        "vsLM": 2,
        "vsU3M": -6
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.05,
        "vsLM": -13,
        "vsU3M": -6
      },
      {
        "nombre": "Imágenes",
        "valor": 0.01,
        "vsLM": -28,
        "vsU3M": -6
      },
      {
        "nombre": "Wellness",
        "valor": 0.01,
        "vsLM": -31,
        "vsU3M": -6
      },
      {
        "nombre": "Subrogación",
        "valor": 0.01,
        "vsLM": 633,
        "vsU3M": -6
      },
      {
        "nombre": "Otros",
        "valor": 0.0,
        "vsLM": -69,
        "vsU3M": -6
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.21,
        "vsLM": -42,
        "vsU3M": -6
      },
      {
        "nombre": "Farmacia",
        "valor": 0.2,
        "vsLM": -8,
        "vsU3M": -6
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.11,
        "vsLM": 77,
        "vsU3M": -6
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.07,
        "vsLM": 358,
        "vsU3M": -6
      },
      {
        "nombre": "Consultas",
        "valor": 0.02,
        "vsLM": 63,
        "vsU3M": -6
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.01,
        "vsLM": null,
        "vsU3M": -6,
        "nuevo": true
      },
      {
        "nombre": "Imágenes",
        "valor": 0.01,
        "vsLM": 295,
        "vsU3M": -6
      },
      {
        "nombre": "Wellness",
        "valor": 0.0,
        "vsLM": -19,
        "vsU3M": -6
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre al corte del 8-nov: Real $4.45M (5.69 de 23.25 días ponderados). Proyección central $14.90M, rango $14.09M (mediana mar–oct) a $15.99M (ritmo U3M): -10% vs octubre ($16.47M) y -6% vs el promedio ago-oct. CDMX aporta 83% ($12.33M), Guadalajara 13% ($1.95M) y Metepec 4% ($0.62M). Subió $0.95M vs el corte del 2-nov ($13.95M).",
      "La semana del 2 al 8 de noviembre cerró en $4.39M: lun 2 $0.69M, mar 3 $0.76M, mié 4 $0.54M, jue 5 $0.91M, vie 6 $0.76M, sáb 7 $0.69M (incluye un PGT-A de 15 embriones por $194K en CDMX y dos paquetes FIV de Guadalajara) y dom 8 $0.04M. El Real corre ~31% arriba del ritmo central por día ponderado ($782K vs $595K); parte son paquetes grandes de una sola vez, por eso no se extrapola.",
      "Cruce de métodos al 8-nov: central $14.90M (cifra oficial), conservadora por curva de avance máxima $14.2M, y pacing con la curva mediana $17.4M. El rango de escenarios del Sheet es $14.09M–$15.99M; el potencial al alza depende de que no se repita la caída de octubre en las últimas semanas del mes.",
      "Método: ritmo por día hábil ponderado (lun–vie 1, sáb 0.55, dom 0.07, feriados según su efecto observado; lun 16-nov = 0.7) con peso por recencia (decaimiento 0.8). La mezcla por servicio usa la distribución ago–oct de cada sede.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.32M, Congelación de Gametos $3.10M, Farmacia $2.95M, Laboratorio $2.39M, Subrogación $1.23M (Subrogación -22% vs octubre, que tuvo paquetes grandes; al corte hay 1 paquete Essentials en CDMX por $105K y 3 valoraciones).",
      "Atenciones proyectadas 3,230 (+3% vs octubre) y Pacientes 1,079 (+12%): el ingreso por atención baja a ~$4.6K (vs ~$5.2K en octubre). Consultas de primera vez, No Show y HubSpot siguen al corte del 2-nov (pendientes de refrescar al 8-nov).",
      "Nota de datos: el archivo de Cargos del Drive llega al 31-oct; noviembre sale de vRepro (cargos del 1 al 8 nov, 845 líneas). Clasificación provisional por confirmar en ConceptosHier: Laffer semen congelado y traslado (Tratamientos), 4 pruebas de laboratorio nuevas (Laboratorio), Evaluación Integral de Subrogada GDL (Subrogación) y Ultrasonido - Seguimiento (Imágenes). La vista por médico YTD se actualiza en el siguiente corte."
    ],
    "CDMX": [
      "CDMX lleva $3.60M al 8-nov y proyecta $12.33M (-11% vs octubre, -7% vs U3M): Tratamientos FIV/ICSI $3.63M, Congelación de Gametos $2.49M, Farmacia $2.43M, Laboratorio $1.95M, Subrogación $1.22M.",
      "646 atenciones y 328 pacientes al corte; proyección 2,400 atenciones (+0% vs octubre) y 743 pacientes (+11% vs octubre). Consultas y No Show al corte del 2-nov (No Show 15.4%)."
    ],
    "GDL": [
      "GDL lleva $0.81M al 8-nov y proyecta $1.95M (-3% vs octubre): Congelación de Gametos $0.54M, Tratamientos FIV/ICSI $0.48M, Laboratorio $0.33M, Farmacia $0.32M. Incluye el sábado 7-nov con dos paquetes FIV de 3 transferencias y la captura/vitrificación del 7 y 8-nov.",
      "164 atenciones y 83 pacientes al corte; proyección 668 atenciones y 277 pacientes. Consultas (7 al 2-nov) y No Show 12.5% al corte del 2-nov."
    ],
    "MTP": [
      "Metepec lleva $41.7K al 8-nov (35 líneas: Farmacia $8.4K, Laboratorio $14.4K, Consultas $9.0K, Congelación $6.0K); la proyección de $622K (-7% vs octubre) viene del ritmo U3M, así que tiene la mayor incertidumbre de la red y hoy va abajo de ese ritmo.",
      "35 atenciones y 26 pacientes al corte; proyección 162 atenciones y 59 pacientes. Consultas (2) y No Show 33.3% al corte del 2-nov."
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
          1
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 3,
          "ingreso": 4267.23,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 1,
          "ingreso": 105172.41,
          "ticket": 105172.41
        }
      },
      "totalPacientesYTD": {
        "Valoración": 155,
        "Programa Activo": 31
      },
      "ingresoYTD": 5797125.2
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
          1
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 3,
          "ingreso": 4267.23,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 1,
          "ingreso": 105172.41,
          "ticket": 105172.41
        }
      },
      "totalPacientesYTD": {
        "Valoración": 154,
        "Programa Activo": 30
      },
      "ingresoYTD": 5760918.31
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
