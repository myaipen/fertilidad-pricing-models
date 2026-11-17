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

// ACTUALIZADO 17-nov-2026: CORTE 16-NOV-2026 (noviembre, 16 días de Real: 1 al 16 nov). Proyección de noviembre $17.38M (ajustada el 10-nov por mantenimientos y subrogación; antes $17.95M) con la agenda de Metepec bloqueada del 16 al 20-nov. Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Ingresos, Atenciones, Pacientes, Servicios y Subrogación al 16-nov (cargos de vRepro; el Drive de Cargos llega al 31-oct).
// Consultas (primera vez), No Show y ranking de consultas actualizados al 16-nov (vRepro, Primera Vez Terminada / No Asiste). HubSpot (leads, citas, cohortes, mecanismos) también al 16-nov. Conversión (data_conv.js) se refresca por separado.
window.DATA = {
  "corte": "16-nov-2026",
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
      "actual": 10.36,
      "proy": 17.38,
      "vsLM": 6,
      "vsU3M": 9,
      "nota": "NOVIEMBRE AL CORTE DEL 16-NOV (12.01 de 23.25 días ponderados; Real = $10,364,821: CDMX $8.89M, Guadalajara $1.31M y Metepec $0.16M). Proyección $17.38M (rango $17.08M–$17.69M): +6% vs octubre ($16.47M) y +9% vs el promedio ago-oct. Método (igual que el corte del 12-nov): Real + días ponderados restantes × ritmo base + cola de mantenimientos + subrogación restante. El ritmo base es 55% el de los primeros 16 días y 45% el promedio ago-oct (mezcla con k=10), SIN los almacenamientos/renovaciones de gametos (~$1.1M al mes, cobrados sobre todo al inicio) y SIN la subrogación. Cola de mantenimientos supuesta $0.35M (como octubre). Subrogación: Real $2.38M en 16 días (ya supera cualquier mes de 2026) + 50% del promedio ago-oct por los días restantes (+$0.30M; al 100% serían +$0.60M). Pesos de días: lun–vie 1, sáb 0.55, dom 0.07; lun 16-nov (feriado de la Revolución) 0.7, promedio de los feriados de lunes observados (2-feb y 16-mar); GDL sáb 14 = 0.25 y lun 16 = 0.1. Los cargos del sábado 14 y del lunes 16 se capturaron casi solo en CDMX: GDL y Metepec no suman real después del 14. METEPEC: agenda de la Dra. bloqueada del 17 al 20-nov (4 días ponderados sin ritmo; el 16 ya está en el Real): Metepec $0.31M en vez de $0.39M. Escenarios: bajo $17.08M (sin más subrogación) y alto $17.69M (subrogación restante al promedio completo)."
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
      "actual": 1711,
      "proy": 3209,
      "vsLM": 2,
      "vsU3M": -2,
      "nota": "Real al 16-nov: 1,711 líneas de cargo (CDMX 1,328, GDL 300, MTP 83; 174 son renovaciones de almacenamiento de gametos, concentradas en los primeros días). Proyección 3,209 (mezcla ritmo del mes / ritmo ago-oct con shrinkage k=10 SIN las líneas de almacenamiento + cola de líneas de almacenamiento por llegar; Metepec sin los 4 días bloqueados 17–20 nov): +2% vs octubre (3,147). Ingreso por atención proyectado ~$5.4K vs ~$5.2K en octubre (el Real trae paquetes de subrogación)."
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
      "actual": 667,
      "proy": 1064,
      "vsLM": 11,
      "vsU3M": -3,
      "nota": "Real al 16-nov: 667 pacientes únicos (CDMX 487, GDL 129, MTP 51; suma por sede). Proyección 1,064 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +11% vs octubre (962)."
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
      "real": 157,
      "agendado": 143,
      "proy": 300,
      "vsLM": 8,
      "vsU3M": -2,
      "nota": "Real al 16-nov: 157 consultas de primera vez terminadas (CDMX 93, GDL 44, MTP 20; grupo Primera Vez completo, misma definición del histórico). Proyección 300 con el modelo de Bru: terminadas 157 + agenda pendiente 17–30 nov (CDMX 78, GDL 51, MTP 17 citas) × show rate (CDMX 87%, GDL 78%, MTP 67%) = piso 276, + incremental por agendar ≈ 24. Rango 288–315 (incremental ×0.5 / ×1.6). Metepec descuenta el bloqueo de agenda del 17–20-nov. Referencia cruzada por ritmo histórico (backtest abr–oct, MAPE 6.9%): 289 (CDMX 163, GDL 95, MTP 31). +8% vs octubre (278). No Show 17.8% (34 inasistencias sobre 191 citas de primera vez del 1 al 16-nov)."
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
      "actual": 17.8,
      "prom": 14.5,
      "deltaPts": 3.3
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
        "actual": 8.89,
        "proy": 14.66,
        "vsLM": 6,
        "vsU3M": 11,
        "nota": "Real al 16-nov $8.89M; proyección $14.66M (+6% vs octubre, $13.80M). Incluye subrogación proyectada $2.68M (Real $2.38M + 50% del promedio ago-oct del resto del mes)."
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
        "actual": 1328,
        "proy": 2457,
        "vsLM": 3,
        "vsU3M": 4
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
        "actual": 487,
        "proy": 760,
        "vsLM": 14,
        "vsU3M": 3
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
        "real": 93,
        "agendado": 81,
        "proy": 174,
        "vsLM": 20,
        "vsU3M": 22,
        "top_cat": "Consulta primera vez",
        "top_n": 109
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
        "actual": 1.31,
        "proy": 2.42,
        "vsLM": 21,
        "vsU3M": 16,
        "nota": "Real al 16-nov $1.31M; proyección $2.42M (+21% vs octubre, $2.00M)."
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
        "actual": 300,
        "proy": 605,
        "vsLM": 9,
        "vsU3M": -8
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
        "actual": 129,
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
        "real": 44,
        "agendado": 50,
        "proy": 94,
        "vsLM": -13,
        "vsU3M": -23,
        "top_cat": "Check-up SOP",
        "top_n": 22
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
        "actual": 20.0,
        "prom": 15.6,
        "deltaPts": 4.4
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
        "actual": 0.16,
        "proy": 0.306,
        "vsLM": -54,
        "vsU3M": -54,
        "nota": "Real al 16-nov $160.0K (83 líneas de cargo); proyección $306K (-54% vs octubre, $666K). Incluye el bloqueo de agenda de la Dra. del 17 al 20-nov (4 días ponderados sin ritmo): sin el bloqueo serían $386K."
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
        "actual": 83,
        "proy": 147,
        "vsLM": -26,
        "vsU3M": -38
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
        "actual": 51,
        "proy": 53,
        "vsLM": -21,
        "vsU3M": -38
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
        "real": 20,
        "agendado": 12,
        "proy": 32,
        "vsLM": 28,
        "vsU3M": -22,
        "top_cat": "Consulta primera vez",
        "top_n": 25
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
        "actual": 35.5,
        "prom": 22.5,
        "deltaPts": 13.0
      }
    }
  },
  "servicios": {
    "total": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 4.6,
        "vsLM": 3,
        "vsU3M": 0
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.41,
        "vsLM": 3,
        "vsU3M": 3
      },
      {
        "nombre": "Farmacia",
        "valor": 3.1,
        "vsLM": -12,
        "vsU3M": -2
      },
      {
        "nombre": "Subrogación",
        "valor": 2.7,
        "vsLM": 71,
        "vsU3M": 105
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.56,
        "vsLM": -7,
        "vsU3M": 0
      },
      {
        "nombre": "Consultas",
        "valor": 0.48,
        "vsLM": 24,
        "vsU3M": 6
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.38,
        "vsLM": 24,
        "vsU3M": 2
      },
      {
        "nombre": "Imágenes",
        "valor": 0.09,
        "vsLM": 35,
        "vsU3M": 1
      },
      {
        "nombre": "Wellness",
        "valor": 0.04,
        "vsLM": -26,
        "vsU3M": 3
      },
      {
        "nombre": "Otros",
        "valor": 0.02,
        "vsLM": 18,
        "vsU3M": 4
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 3.92,
        "vsLM": 6,
        "vsU3M": 1
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.69,
        "vsLM": -1,
        "vsU3M": 1
      },
      {
        "nombre": "Subrogación",
        "valor": 2.68,
        "vsLM": 70,
        "vsU3M": 105
      },
      {
        "nombre": "Farmacia",
        "valor": 2.62,
        "vsLM": -9,
        "vsU3M": 1
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.1,
        "vsLM": -13,
        "vsU3M": 1
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.31,
        "vsLM": 26,
        "vsU3M": 1
      },
      {
        "nombre": "Consultas",
        "valor": 0.22,
        "vsLM": 22,
        "vsU3M": 1
      },
      {
        "nombre": "Imágenes",
        "valor": 0.07,
        "vsLM": 44,
        "vsU3M": 1
      },
      {
        "nombre": "Wellness",
        "valor": 0.03,
        "vsLM": -28,
        "vsU3M": 1
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 150,
        "vsU3M": 1
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.66,
        "vsLM": 13,
        "vsU3M": 16
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.59,
        "vsLM": 42,
        "vsU3M": 16
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.41,
        "vsLM": 47,
        "vsU3M": 16
      },
      {
        "nombre": "Farmacia",
        "valor": 0.4,
        "vsLM": -7,
        "vsU3M": 16
      },
      {
        "nombre": "Consultas",
        "valor": 0.24,
        "vsLM": 26,
        "vsU3M": 16
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.06,
        "vsLM": 8,
        "vsU3M": 16
      },
      {
        "nombre": "Subrogación",
        "valor": 0.02,
        "vsLM": 2150,
        "vsU3M": 187
      },
      {
        "nombre": "Imágenes",
        "valor": 0.01,
        "vsLM": -11,
        "vsU3M": 16
      },
      {
        "nombre": "Wellness",
        "valor": 0.01,
        "vsLM": -14,
        "vsU3M": 16
      },
      {
        "nombre": "Otros",
        "valor": 0.0,
        "vsLM": -61,
        "vsU3M": 16
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.09,
        "vsLM": -75,
        "vsU3M": -60
      },
      {
        "nombre": "Farmacia",
        "valor": 0.09,
        "vsLM": -60,
        "vsU3M": -60
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.06,
        "vsLM": 292,
        "vsU3M": -20
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.05,
        "vsLM": -23,
        "vsU3M": -60
      },
      {
        "nombre": "Consultas",
        "valor": 0.01,
        "vsLM": 6,
        "vsU3M": -39
      },
      {
        "nombre": "Imágenes",
        "valor": 0.0,
        "vsLM": 200,
        "vsU3M": -29
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.0,
        "vsLM": null,
        "vsU3M": -60,
        "nuevo": true
      },
      {
        "nombre": "Wellness",
        "valor": 0.0,
        "vsLM": -65,
        "vsU3M": -60
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre al corte del 16-nov: Real $10.36M (12.01 de 23.25 días ponderados). Proyección $17.38M (rango $17.08M–$17.69M): +6% vs octubre ($16.47M); el corte del 12-nov decía $16.76M. CDMX aporta 84% ($14.66M), Guadalajara 14% ($2.42M) y Metepec 2% ($0.31M).",
      "Metepec con la agenda de la Dra. bloqueada del 17 al 20-nov (el 16 ya está en el Real). Efecto estimado: -$0.08M (Metepec $0.31M en vez de $0.39M; Atenciones MTP 147, Pacientes 53).",
      "Del 13 al 16-nov: $0.58M el viernes 13, $0.57M el sábado 14, sin cargos el domingo 15 y $0.45M el lunes 16 (feriado, casi solo CDMX). Sin subrogación ni renovaciones de almacenamiento, el ritmo diario base de CDMX va en $464K por día ponderado vs $450K del promedio ago-oct. La subrogación del mes suma $2.38M en el Real.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.60M, Congelación de Gametos $3.41M, Farmacia $3.10M, Subrogación $2.70M, Laboratorio $2.56M. Subrogación $2.70M: $2.38M ya están en el Real y el resto es la mitad del promedio ago-oct.",
      "Atenciones proyectadas 3,209 (+2% vs octubre) y Pacientes 1,064 (+11%). Consultas de primera vez al 16-nov: 157 reales y proyección 300 (+8% vs octubre, rango 288–315); No Show 17.8%. HubSpot (Interesa2) al 16-nov: 927 leads y 217 citas agendadas (23% de conversión vs 25% en octubre; CDMX 35%, GDL 21%, MTP 19%)."
    ],
    "CDMX": [
      "CDMX lleva $8.89M al 16-nov y proyecta $14.66M (+6% vs octubre, +11% vs U3M): Tratamientos FIV/ICSI $3.92M, Congelación de Gametos $2.69M, Subrogación $2.68M, Farmacia $2.62M, Laboratorio $2.10M.",
      "1,328 atenciones y 487 pacientes al corte; proyección 2,457 atenciones (+3% vs octubre) y 760 pacientes (+14% vs octubre). Consultas de primera vez: 93 al corte, proyección 174 (+20% vs octubre); No Show 11.4%.",
      "HubSpot (Interesa2) al 16-nov: 321 leads y 112 citas agendadas (35% de conversión vs 30% en octubre, con 882 leads y 261 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "GDL": [
      "GDL lleva $1.31M al 16-nov y proyecta $2.42M (+21% vs octubre): Congelación de Gametos $0.66M, Tratamientos FIV/ICSI $0.59M, Laboratorio $0.41M, Farmacia $0.40M.",
      "300 atenciones y 129 pacientes al corte; proyección 605 atenciones y 251 pacientes. Consultas de primera vez: 44 al corte, proyección 94 (-13% vs octubre); No Show 20.0%.",
      "HubSpot (Interesa2) al 16-nov: 295 leads y 63 citas agendadas (21% de conversión vs 24% en octubre, con 654 leads y 154 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "MTP": [
      "Metepec lleva $160.0K al 16-nov (83 líneas) y proyecta $306K (-54% vs octubre). Ya incluye el bloqueo de la agenda de la Dra. del 17 al 20-nov (sin él: $386K); sigue siendo la sede con mayor incertidumbre (error de backtest ~30%).",
      "83 atenciones y 51 pacientes al corte; proyección 147 atenciones y 53 pacientes. Consultas de primera vez: 20 al corte, proyección 32 (+28% vs octubre; ya descuenta el bloqueo de agenda 17–20-nov); No Show 35.5%.",
      "HubSpot (Interesa2) al 16-nov: 63 leads y 12 citas agendadas (19% de conversión vs 32% en octubre, con 198 leads y 63 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ]
  },
  "consultas_ranking": {
    "total": [
      {
        "nombre": "Consulta primera vez",
        "valor": 151,
        "vsLM": 27
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 42,
        "vsLM": 5
      },
      {
        "nombre": "Check-up SOP",
        "valor": 26,
        "vsLM": -13
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 24,
        "vsLM": -27
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 16,
        "vsLM": 33
      },
      {
        "nombre": "Check up Integral",
        "valor": 15,
        "vsLM": 7
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 14,
        "vsLM": -12
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
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 2,
        "vsLM": -60
      }
    ],
    "CDMX": [
      {
        "nombre": "Consulta primera vez",
        "valor": 109,
        "vsLM": 35
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 26,
        "vsLM": -4
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 16,
        "vsLM": 33
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 7,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 7,
        "vsLM": -30
      },
      {
        "nombre": "Check-up SOP",
        "valor": 3,
        "vsLM": 0
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 2,
        "vsLM": 100
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
        "valor": 22,
        "vsLM": -12
      },
      {
        "nombre": "Consulta primera vez",
        "valor": 17,
        "vsLM": -6
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 15,
        "vsLM": -40
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 14,
        "vsLM": 17
      },
      {
        "nombre": "Check up Integral",
        "valor": 13,
        "vsLM": 18
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
        "nombre": "Consulta Obstetricia",
        "valor": 2,
        "vsLM": -60
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 1,
        "vsLM": 0
      }
    ],
    "MTP": [
      {
        "nombre": "Consulta primera vez",
        "valor": 25,
        "vsLM": 25
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Check-up SOP",
        "valor": 1,
        "vsLM": -50
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
      "actual": 927
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
      "actual": 217
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
      "actual": 23
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
          35,
          null
        ],
        "total2026": 28,
        "leads": [
          482,
          482,
          474,
          513,
          923,
          687,
          656,
          786,
          1002,
          882,
          321,
          null
        ],
        "citas": [
          125,
          129,
          181,
          209,
          194,
          170,
          212,
          187,
          215,
          261,
          112,
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
          20,
          24,
          19,
          24,
          21,
          null
        ],
        "total2026": 21,
        "leads": [
          238,
          373,
          399,
          325,
          577,
          532,
          589,
          703,
          667,
          654,
          295,
          null
        ],
        "citas": [
          47,
          63,
          104,
          73,
          118,
          94,
          119,
          171,
          129,
          154,
          63,
          null
        ]
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
          19,
          null
        ],
        "total2026": 31,
        "leads": [
          45,
          104,
          66,
          57,
          88,
          72,
          151,
          271,
          171,
          198,
          63,
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
          58,
          63,
          12,
          null
        ]
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
        "m1": 1,
        "m2": 0,
        "sin": 77
      },
      {
        "mes": "Nov-26",
        "leads": 927,
        "m0": 20,
        "m1": 0,
        "m2": 0,
        "sin": 80
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
          9
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
          5
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 9,
          "ingreso": 12801.69,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 5,
          "ingreso": 2361694.04,
          "ticket": 472338.81
        }
      },
      "totalPacientesYTD": {
        "Valoración": 161,
        "Programa Activo": 35
      },
      "ingresoYTD": 8062181.29
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
          9
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
          5
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 9,
          "ingreso": 12801.69,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 5,
          "ingreso": 2361694.04,
          "ticket": 472338.81
        }
      },
      "totalPacientesYTD": {
        "Valoración": 160,
        "Programa Activo": 34
      },
      "ingresoYTD": 8025974.4
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
