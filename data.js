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

// ACTUALIZADO 3-nov-2026: CORTE 2-NOV-2026 (noviembre, 2 días de Real: 1 y 2 nov). Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Conversión (data_conv.js) actualizada al corte del 2-nov (cohortes cerradas hasta oct-2026).
window.DATA = {
  "corte": "2-nov-2026",
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
      "actual": 0.75,
      "proy": 13.95,
      "vsLM": -15,
      "vsU3M": -12,
      "nota": "NOVIEMBRE AL CORTE DEL 2-NOV (1.07 de 23.25 días ponderados; Real = $750,800: CDMX $570,217, Guadalajara $178,859 y Metepec $1,724). Proyección central $13.95M (rango $12.93M–$15.33M): -15% vs octubre ($16.47M) y -12% vs el promedio ago-oct. Método: ritmo por día hábil ponderado (lun–vie 1, sáb 0.55, dom 0.07, feriados según su efecto observado; lun 16-nov = 0.7) con peso por recencia; confianza baja con solo 2 días de datos. Ya incluye el feriado del lun 16-nov (peso 0.7 de un día hábil, ≈ -$0.18M)."
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
      "actual": 155,
      "proy": 2952,
      "vsLM": -6,
      "vsU3M": -10,
      "nota": "Real al 2-nov: 155 líneas de cargo (CDMX 123, GDL 28, MTP 4). Proyección 2,952 (curva de ritmo por sede): -6% vs octubre (3,147). Ingreso por atención proyectado ~$4.7K vs ~$5.2K en octubre (menos peso de subrogación)."
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
      "actual": 73,
      "proy": 985,
      "vsLM": 2,
      "vsU3M": -10,
      "nota": "Real al 2-nov: 73 pacientes únicos (CDMX 55, GDL 15, MTP 3). Proyección 985 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +2% vs octubre (962)."
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
      "nota": "Real al 2-nov: 20 consultas de primera vez terminadas (CDMX 11, GDL 7, MTP 2; el 1-nov, domingo, sin consultas). Proyección 299 por ritmo (shows ~83% de lo agendado; rango 284–318): +8% vs octubre (278). Sin lectura de agenda: es ritmo, no agenda. No Show al corte 16.7% (4 inasistencias sobre 24 citas del 2-nov)."
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
        "actual": 0.57,
        "proy": 11.55,
        "vsLM": -16,
        "vsU3M": -12,
        "nota": "Real al 2-nov $570,217; proyección $11.55M (-16% vs octubre, $13.80M)."
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
        "actual": 123,
        "proy": 2184,
        "vsLM": -9,
        "vsU3M": -8
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
        "actual": 55,
        "proy": 676,
        "vsLM": 1,
        "vsU3M": -9
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
        "actual": 0.18,
        "proy": 1.82,
        "vsLM": -9,
        "vsU3M": -12,
        "nota": "Real al 2-nov $178,859 (incluye el domingo 1-nov: $61.8K); proyección $1.82M (-9% vs octubre, $2.00M)."
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
        "actual": 28,
        "proy": 607,
        "vsLM": 9,
        "vsU3M": -7
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
        "actual": 15,
        "proy": 251,
        "vsLM": 11,
        "vsU3M": -7
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
        "actual": 0.002,
        "proy": 0.58,
        "vsLM": -13,
        "vsU3M": -12,
        "nota": "Real al 2-nov $1,724; proyección $582K (-13% vs octubre, $666K). Sede chica: pocas líneas por día."
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
        "actual": 4,
        "proy": 161,
        "vsLM": -19,
        "vsU3M": -32
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
        "actual": 3,
        "proy": 58,
        "vsLM": -13,
        "vsU3M": -32
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
        "valor": 4.05,
        "vsLM": -9,
        "vsU3M": -12
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.91,
        "vsLM": -13,
        "vsU3M": -12
      },
      {
        "nombre": "Farmacia",
        "valor": 2.76,
        "vsLM": -22,
        "vsU3M": -12
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.24,
        "vsLM": -19,
        "vsU3M": -12
      },
      {
        "nombre": "Subrogación",
        "valor": 1.15,
        "vsLM": -27,
        "vsU3M": -12
      },
      {
        "nombre": "Consultas",
        "valor": 0.39,
        "vsLM": 2,
        "vsU3M": -12
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.33,
        "vsLM": 7,
        "vsU3M": -12
      },
      {
        "nombre": "Imágenes",
        "valor": 0.08,
        "vsLM": 17,
        "vsU3M": -12
      },
      {
        "nombre": "Wellness",
        "valor": 0.04,
        "vsLM": -37,
        "vsU3M": -12
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 0,
        "vsU3M": -12
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 3.4,
        "vsLM": -8,
        "vsU3M": -12
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.33,
        "vsLM": -14,
        "vsU3M": -12
      },
      {
        "nombre": "Farmacia",
        "valor": 2.27,
        "vsLM": -21,
        "vsU3M": -12
      },
      {
        "nombre": "Laboratorio",
        "valor": 1.82,
        "vsLM": -24,
        "vsU3M": -12
      },
      {
        "nombre": "Subrogación",
        "valor": 1.15,
        "vsLM": -28,
        "vsU3M": -12
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.27,
        "vsLM": 10,
        "vsU3M": -12
      },
      {
        "nombre": "Consultas",
        "valor": 0.19,
        "vsLM": 6,
        "vsU3M": -12
      },
      {
        "nombre": "Imágenes",
        "valor": 0.06,
        "vsLM": 25,
        "vsU3M": -12
      },
      {
        "nombre": "Wellness",
        "valor": 0.03,
        "vsLM": -37,
        "vsU3M": -12
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 118,
        "vsU3M": -12
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.5,
        "vsLM": -15,
        "vsU3M": -12
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.45,
        "vsLM": 7,
        "vsU3M": -12
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.31,
        "vsLM": 11,
        "vsU3M": -12
      },
      {
        "nombre": "Farmacia",
        "valor": 0.3,
        "vsLM": -30,
        "vsU3M": -12
      },
      {
        "nombre": "Consultas",
        "valor": 0.18,
        "vsLM": -5,
        "vsU3M": -12
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.05,
        "vsLM": -19,
        "vsU3M": -12
      },
      {
        "nombre": "Imágenes",
        "valor": 0.01,
        "vsLM": -33,
        "vsU3M": -12
      },
      {
        "nombre": "Wellness",
        "valor": 0.01,
        "vsLM": -35,
        "vsU3M": -12
      },
      {
        "nombre": "Subrogación",
        "valor": 0.01,
        "vsLM": 586,
        "vsU3M": -12
      },
      {
        "nombre": "Otros",
        "valor": 0.0,
        "vsLM": -71,
        "vsU3M": -12
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.19,
        "vsLM": -46,
        "vsU3M": -12
      },
      {
        "nombre": "Farmacia",
        "valor": 0.19,
        "vsLM": -14,
        "vsU3M": -12
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.1,
        "vsLM": 66,
        "vsU3M": -12
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.07,
        "vsLM": 329,
        "vsU3M": -12
      },
      {
        "nombre": "Consultas",
        "valor": 0.02,
        "vsLM": 53,
        "vsU3M": -12
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.01,
        "vsLM": null,
        "vsU3M": -12,
        "nuevo": true
      },
      {
        "nombre": "Imágenes",
        "valor": 0.0,
        "vsLM": 270,
        "vsU3M": -12
      },
      {
        "nombre": "Wellness",
        "valor": 0.0,
        "vsLM": -24,
        "vsU3M": -12
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre arranca con $0.75M de Real al corte del 2-nov (1.07 de 23.25 días ponderados). Proyección central $13.95M, rango $12.93M (mediana mar–oct) a $15.33M (ritmo U3M): -15% vs octubre ($16.47M) y -12% vs el promedio ago-oct. CDMX aporta 83% ($11.55M), Guadalajara 13% ($1.82M) y Metepec 4% ($0.58M).",
      "Solo hay dos días de datos: el domingo 1-nov facturó $61.8K (únicamente Guadalajara: captura y vitrificación de ovocitos, sedación y Ovodonors) y el lunes 2-nov $0.69M (CDMX $0.57M, 152 atenciones, 71 pacientes), por encima del ritmo central de ~$588K por día ponderado. La confianza de la proyección es baja y se recalibra con cada corte.",
      "Método: ritmo por día hábil ponderado (lun–vie 1, sáb 0.55, dom 0.07, feriados según su efecto observado; lun 16-nov = 0.7) con peso por recencia (decaimiento 0.8). Se cambió de la mediana mar–oct porque subproyectó octubre ~19% (el ritmo de ago–oct, $645–668K por día ponderado, está muy arriba de la mediana, $549K). La mezcla por servicio usa la distribución U3M de cada sede.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.05M, Congelación de Gametos $2.91M, Farmacia $2.76M, Laboratorio $2.24M y Subrogación $1.15M (-27% vs octubre, que tuvo paquetes grandes de subrogación); al corte solo hay 1 valoración de subrogación en CDMX ($862).",
      "Atenciones proyectadas 2,952 (-6% vs octubre) y Pacientes 985 (+2%): el ingreso por atención baja a ~$4.7K (vs ~$5.2K en octubre) por menos subrogación. Consultas de primera vez: 20 al corte y 299 proyectadas por ritmo (+8% vs octubre, 278); No Show al corte 16.7%.",
      "HubSpot (Interesa2) al 2-nov: 103 leads y 27 citas agendadas (26% de conversión, muestra muy chica). Cohorte de octubre: M0 22% y M1 aún 0%; las cohortes de agosto y septiembre siguen madurando.",
      "Nota de datos: 4 líneas de cargo sin médico asignado. Se agregaron a ConceptosHier 13 conceptos que faltaban (donantes Ovodonors, semen congelado Genevity/Laffer, Subsecuente Ginecología/SOMP, etc.), con clasificación provisional por confirmar. La vista por médico YTD se actualiza en el siguiente corte."
    ],
    "CDMX": [
      "CDMX lleva $0.57M al 2-nov (todo del lunes 2-nov) y proyecta $11.55M (-16% vs octubre, -12% vs U3M): FIV/ICSI $3.40M, Congelación $2.33M, Farmacia $2.27M, Laboratorio $1.82M y Subrogación $1.15M.",
      "123 atenciones y 55 pacientes al corte; proyección 2,184 atenciones (-9%) y 676 pacientes (+1% vs octubre). No Show de primera vez al corte 15.4%."
    ],
    "GDL": [
      "GDL lleva $0.18M al 2-nov (domingo 1-nov $61.8K + lunes 2-nov $117.0K) y proyecta $1.82M (-9% vs octubre): Congelación $0.50M, FIV/ICSI $0.45M, Laboratorio $0.31M y Farmacia $0.30M.",
      "28 atenciones y 15 pacientes al corte; proyección 607 atenciones (+9%) y 251 pacientes (+11%). 7 consultas de primera vez al corte, No Show 12.5%."
    ],
    "MTP": [
      "Metepec solo registra $1.7K al 2-nov (1 línea de Laboratorio); la proyección de $582K (-13% vs octubre) viene del ritmo U3M, no del Real, así que tiene la mayor incertidumbre de la red.",
      "4 atenciones y 3 pacientes al corte; proyección 161 atenciones y 58 pacientes. 2 consultas de primera vez al corte y No Show 33.3% (1 inasistencia sobre 3 citas)."
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
          1
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
          0
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 1,
          "ingreso": 862.07,
          "ticket": 862.07
        },
        "Programa Activo": {
          "pacientes": 0,
          "ingreso": 0,
          "ticket": 0
        }
      },
      "totalPacientesYTD": {
        "Valoración": 153,
        "Programa Activo": 30
      },
      "ingresoYTD": 5688547.63
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
          1
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
          0
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 1,
          "ingreso": 862.07,
          "ticket": 862.07
        },
        "Programa Activo": {
          "pacientes": 0,
          "ingreso": 0,
          "ticket": 0
        }
      },
      "totalPacientesYTD": {
        "Valoración": 152,
        "Programa Activo": 29
      },
      "ingresoYTD": 5652340.74
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
