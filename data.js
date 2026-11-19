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

// ACTUALIZADO 19-nov-2026: CORTE 18-NOV-2026 (noviembre, 18 días de Real: 1 al 18 nov). Proyección de noviembre $17.35M (ajustada el 10-nov por mantenimientos y subrogación; antes $17.95M) con la agenda de Metepec bloqueada del 17 al 20-nov. Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Ingresos, Atenciones, Pacientes, Servicios y Subrogación al 18-nov (cargos de vRepro; el Drive de Cargos llega al 31-oct).
// Consultas (primera vez), No Show y ranking de consultas actualizados al 18-nov (vRepro, Primera Vez Terminada / No Asiste). HubSpot (leads, citas, cohortes, mecanismos) también al 18-nov. Conversión (data_conv.js) se refresca por separado.
window.DATA = {
  "corte": "18-nov-2026",
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
      "actual": 11.52,
      "proy": 17.35,
      "vsLM": 5,
      "vsU3M": 9,
      "nota": "NOVIEMBRE AL CORTE DEL 18-NOV (14.01 de 23.25 días ponderados; Real = $11,518,086: CDMX $9.93M, Guadalajara $1.41M y Metepec $0.18M). Proyección $17.35M (rango $17.10M–$17.60M): +5% vs octubre ($16.47M) y +9% vs el promedio ago-oct. Método (igual que los cortes del 12 y 16-nov): Real + días ponderados restantes × ritmo base + cola de mantenimientos + subrogación restante. El ritmo base es 58% el de los primeros 18 días y 42% el promedio ago-oct (mezcla con k=10), SIN los almacenamientos/renovaciones de gametos (~$1.1M al mes, cobrados sobre todo al inicio) y SIN la subrogación. Cola de mantenimientos supuesta $0.35M (como octubre). Subrogación: Real $2.49M en 18 días (ya supera cualquier mes de 2026) + 50% del promedio ago-oct por los días restantes (+$0.25M; al 100% serían +$0.50M). Pesos de días: lun–vie 1, sáb 0.55, dom 0.07; lun 16-nov (feriado de la Revolución) 0.7; GDL sáb 14 = 0.25 y lun 16 = 0.1. Los cargos de GDL del 17 y 18-nov son bajos para días hábiles ($57K y $42K): si fue captura tardía en vRepro, el Real de GDL subirá en el próximo corte. METEPEC: agenda de la Dra. bloqueada del 17 al 20-nov (el 17 y 18 ya están en el Real; quedan 2 días ponderados sin ritmo, 19 y 20): Metepec $0.33M en vez de $0.38M. Escenarios: bajo $17.10M (sin más subrogación) y alto $17.60M (subrogación restante al promedio completo)."
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
      "actual": 2008,
      "proy": 3294,
      "vsLM": 5,
      "vsU3M": 1,
      "nota": "Real al 18-nov: 2,008 líneas de cargo (CDMX 1,539, GDL 373, MTP 96; 174 son renovaciones de almacenamiento de gametos, concentradas en los primeros días). Proyección 3,294 (mezcla ritmo del mes / ritmo ago-oct con shrinkage k=10 SIN las líneas de almacenamiento + cola de líneas de almacenamiento por llegar; Metepec sin los días bloqueados 19–20 nov): +5% vs octubre (3,147). Ingreso por atención proyectado ~$5.3K vs ~$5.2K en octubre (el Real trae paquetes de subrogación)."
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
      "actual": 748,
      "proy": 1096,
      "vsLM": 14,
      "vsU3M": 0,
      "nota": "Real al 18-nov: 748 pacientes únicos (CDMX 538, GDL 154, MTP 56; suma por sede). Proyección 1,096 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +14% vs octubre (962)."
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
      "real": 193,
      "agendado": 134,
      "proy": 327,
      "vsLM": 18,
      "vsU3M": 7,
      "nota": "Real al 18-nov: 193 consultas de primera vez terminadas (CDMX 110, GDL 59, MTP 24; grupo Primera Vez completo, misma definición del histórico). Proyección 327 con el modelo de Bru: terminadas 193 + agenda pendiente 19–30 nov (CDMX 75, GDL 52, MTP 12 citas) × show rate (CDMX 86%, GDL 79%, MTP 68%) = piso 307, + incremental por agendar ≈ 20. Rango 316–338 (incremental ×0.5 / ×1.6). Metepec descuenta el bloqueo de agenda del 19–20-nov. Referencia cruzada por ritmo histórico (backtest abr–oct, MAPE 6.9%): 305 (CDMX 168, GDL 102, MTP 35). +18% vs octubre (278). No Show 16.8% (39 inasistencias sobre 232 citas de primera vez del 1 al 18-nov). La agenda del 23-nov es aproximada (más de 200 citas en vRepro, la mayoría anuladas)."
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
      "actual": 16.8,
      "prom": 14.5,
      "deltaPts": 2.3
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
        "actual": 9.93,
        "proy": 14.72,
        "vsLM": 7,
        "vsU3M": 12,
        "nota": "Real al 18-nov $9.93M; proyección $14.72M (+7% vs octubre, $13.80M). Incluye subrogación proyectada $2.74M (Real $2.49M + 50% del promedio ago-oct del resto del mes)."
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
        "actual": 1539,
        "proy": 2490,
        "vsLM": 4,
        "vsU3M": 5
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
        "actual": 538,
        "proy": 771,
        "vsLM": 15,
        "vsU3M": 4
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
        "real": 110,
        "agendado": 76,
        "proy": 186,
        "vsLM": 28,
        "vsU3M": 31,
        "top_cat": "Consulta primera vez",
        "top_n": 117
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
        "actual": 12.0,
        "prom": 12.3,
        "deltaPts": -0.3
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
        "actual": 1.41,
        "proy": 2.29,
        "vsLM": 14,
        "vsU3M": 10,
        "nota": "Real al 18-nov $1.41M; proyección $2.29M (+14% vs octubre, $2.00M). Los cargos del 17 y 18-nov ($57K y $42K) son bajos: posible captura tardía."
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
        "actual": 373,
        "proy": 639,
        "vsLM": 15,
        "vsU3M": -2
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
        "actual": 154,
        "proy": 265,
        "vsLM": 17,
        "vsU3M": -2
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
        "real": 59,
        "agendado": 49,
        "proy": 108,
        "vsLM": 0,
        "vsU3M": -11,
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
        "actual": 16.9,
        "prom": 15.6,
        "deltaPts": 1.3
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
        "actual": 0.181,
        "proy": 0.334,
        "vsLM": -50,
        "vsU3M": -50,
        "nota": "Real al 18-nov $180.6K (96 líneas de cargo); proyección $334K (-50% vs octubre, $666K). Incluye el bloqueo de agenda de la Dra. del 19 al 20-nov (2 días ponderados sin ritmo; el 17 y 18 ya están en el Real): sin el bloqueo serían $376K."
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
        "actual": 96,
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
        "actual": 56,
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
        "real": 24,
        "agendado": 9,
        "proy": 33,
        "vsLM": 32,
        "vsU3M": -20,
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
        "valor": 4.58,
        "vsLM": 3,
        "vsU3M": -1
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.38,
        "vsLM": 2,
        "vsU3M": 2
      },
      {
        "nombre": "Farmacia",
        "valor": 3.09,
        "vsLM": -12,
        "vsU3M": -2
      },
      {
        "nombre": "Subrogación",
        "valor": 2.76,
        "vsLM": 74,
        "vsU3M": 110
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.54,
        "vsLM": -8,
        "vsU3M": 0
      },
      {
        "nombre": "Consultas",
        "valor": 0.47,
        "vsLM": 22,
        "vsU3M": 4
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
        "vsLM": -25,
        "vsU3M": 3
      },
      {
        "nombre": "Otros",
        "valor": 0.02,
        "vsLM": 17,
        "vsU3M": 2
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 3.92,
        "vsLM": 7,
        "vsU3M": 1
      },
      {
        "nombre": "Subrogación",
        "valor": 2.74,
        "vsLM": 73,
        "vsU3M": 109
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.69,
        "vsLM": -1,
        "vsU3M": 1
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
        "vsLM": 27,
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
        "vsLM": 151,
        "vsU3M": 1
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.63,
        "vsLM": 7,
        "vsU3M": 10
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.56,
        "vsLM": 34,
        "vsU3M": 10
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.39,
        "vsLM": 39,
        "vsU3M": 10
      },
      {
        "nombre": "Farmacia",
        "valor": 0.38,
        "vsLM": -12,
        "vsU3M": 10
      },
      {
        "nombre": "Consultas",
        "valor": 0.23,
        "vsLM": 20,
        "vsU3M": 10
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.06,
        "vsLM": 2,
        "vsU3M": 10
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
        "vsLM": -16,
        "vsU3M": 10
      },
      {
        "nombre": "Wellness",
        "valor": 0.01,
        "vsLM": -14,
        "vsU3M": 17
      },
      {
        "nombre": "Otros",
        "valor": 0.0,
        "vsLM": -63,
        "vsU3M": 10
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.1,
        "vsLM": -72,
        "vsU3M": -56
      },
      {
        "nombre": "Farmacia",
        "valor": 0.1,
        "vsLM": -56,
        "vsU3M": -56
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
        "vsLM": -16,
        "vsU3M": -56
      },
      {
        "nombre": "Consultas",
        "valor": 0.02,
        "vsLM": 50,
        "vsU3M": -14
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.0,
        "vsLM": null,
        "vsU3M": -56,
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
        "vsLM": -61,
        "vsU3M": -56
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre al corte del 18-nov: Real $11.52M (14.01 de 23.25 días ponderados). Proyección $17.35M (rango $17.10M–$17.60M): +5% vs octubre ($16.47M); el corte del 16-nov decía $17.38M. CDMX aporta 85% ($14.72M), Guadalajara 13% ($2.29M) y Metepec 2% ($0.33M).",
      "Metepec con la agenda de la Dra. bloqueada del 17 al 20-nov (17 y 18 ya en el Real; faltan 19 y 20). Efecto estimado: -$0.04M (Metepec $0.33M en vez de $0.38M; Atenciones MTP 165, Pacientes 60).",
      "Martes 17: $0.44M y miércoles 18: $0.72M (GDL solo $57K y $42K: posible captura tardía). Sin subrogación ni renovaciones de almacenamiento, el ritmo diario base de CDMX va en $464K por día ponderado vs $450K del promedio ago-oct. La subrogación del mes suma $2.49M en el Real.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.58M, Congelación de Gametos $3.38M, Farmacia $3.09M, Subrogación $2.76M, Laboratorio $2.54M. Subrogación $2.76M: $2.49M ya están en el Real y el resto es la mitad del promedio ago-oct.",
      "Atenciones proyectadas 3,294 (+5% vs octubre) y Pacientes 1,096 (+14%). Consultas de primera vez al 18-nov: 193 reales y proyección 327 (+18% vs octubre, rango 316–338); No Show 16.8%. HubSpot (Interesa2) al 18-nov: 1,055 leads y 263 citas agendadas (25% de conversión vs 25% en octubre; sedes con GDL = Guadalajara + Puerto Vallarta + Sahuayo y CDMX = Ciudad de México + Benito Juárez: CDMX 32%, GDL 21%, MTP 20%)."
    ],
    "CDMX": [
      "CDMX lleva $9.93M al 18-nov y proyecta $14.72M (+7% vs octubre, +12% vs U3M): Tratamientos FIV/ICSI $3.92M, Subrogación $2.74M, Congelación de Gametos $2.69M, Farmacia $2.62M, Laboratorio $2.10M.",
      "1,539 atenciones y 538 pacientes al corte; proyección 2,490 atenciones (+4% vs octubre) y 771 pacientes (+15% vs octubre). Consultas de primera vez: 110 al corte, proyección 186 (+28% vs octubre); No Show 12.0%.",
      "HubSpot (Interesa2) al 18-nov (Ciudad de México + Benito Juárez): 457 leads y 147 citas agendadas (32% de conversión vs 30% en octubre, con 908 leads y 269 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "GDL": [
      "GDL lleva $1.41M al 18-nov y proyecta $2.29M (+14% vs octubre): Congelación de Gametos $0.63M, Tratamientos FIV/ICSI $0.56M, Laboratorio $0.39M, Farmacia $0.38M. Ojo: los cargos del 17 y 18-nov ($57K y $42K) son bajos para días hábiles; si fue captura tardía, el Real de GDL subirá.",
      "373 atenciones y 154 pacientes al corte; proyección 639 atenciones y 265 pacientes. Consultas de primera vez: 59 al corte, proyección 108 (+0% vs octubre); No Show 16.9%.",
      "HubSpot (Interesa2) al 18-nov (Guadalajara + Puerto Vallarta + Sahuayo): 371 leads y 79 citas agendadas (21% de conversión vs 23% en octubre, con 717 leads y 164 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "MTP": [
      "Metepec lleva $180.6K al 18-nov (96 líneas) y proyecta $334K (-50% vs octubre). Ya incluye el bloqueo de la agenda de la Dra. del 17 al 20-nov (sin él: $376K); sigue siendo la sede con mayor incertidumbre (error de backtest ~30%).",
      "96 atenciones y 56 pacientes al corte; proyección 165 atenciones y 60 pacientes. Consultas de primera vez: 24 al corte, proyección 33 (+32% vs octubre; ya descuenta el bloqueo de agenda 19–20-nov); No Show 33.3%.",
      "HubSpot (Interesa2) al 18-nov: 70 leads y 14 citas agendadas (20% de conversión vs 34% en octubre, con 200 leads y 67 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ]
  },
  "consultas_ranking": {
    "total": [
      {
        "nombre": "Consulta primera vez",
        "valor": 159,
        "vsLM": 34
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 44,
        "vsLM": 10
      },
      {
        "nombre": "Check-up SOP",
        "valor": 31,
        "vsLM": 3
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 27,
        "vsLM": -18
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 17,
        "vsLM": 6
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 16,
        "vsLM": 33
      },
      {
        "nombre": "Check up Integral",
        "valor": 16,
        "vsLM": 14
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 4,
        "vsLM": 300
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 4,
        "vsLM": 100
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 3,
        "vsLM": -40
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
        "valor": 117,
        "vsLM": 44
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
        "valor": 8,
        "vsLM": 14
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 7,
        "vsLM": -30
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 4,
        "vsLM": 300
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
      }
    ],
    "GDL": [
      {
        "nombre": "Check-up SOP",
        "valor": 27,
        "vsLM": 8
      },
      {
        "nombre": "Consulta primera vez",
        "valor": 18,
        "vsLM": 0
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 17,
        "vsLM": -32
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
        "valor": 8,
        "vsLM": 60
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 3,
        "vsLM": -40
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 2,
        "vsLM": 100
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
        "nombre": "Fertility Check up Mujeres",
        "valor": 4,
        "vsLM": 300
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 2,
        "vsLM": 100
      },
      {
        "nombre": "Check up Ginecologico",
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
      "actual": 1055
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
      "actual": 263
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
      "actual": 25
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
          32,
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
          1000,
          908,
          457,
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
          269,
          147,
          null
        ]
      },
      "GDL": {
        "mensual": [
          19,
          16,
          26,
          21,
          20,
          17,
          20,
          25,
          19,
          23,
          21,
          null
        ],
        "total2026": 21,
        "leads": [
          245,
          387,
          406,
          337,
          615,
          569,
          619,
          732,
          707,
          717,
          371,
          null
        ],
        "citas": [
          47,
          63,
          107,
          72,
          122,
          99,
          125,
          181,
          135,
          164,
          79,
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
          34,
          20,
          null
        ],
        "total2026": 31,
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
          200,
          70,
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
          67,
          14,
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
        "leads": 1055,
        "m0": 21,
        "m1": 0,
        "m2": 0,
        "sin": 79
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
          12
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
          6
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 12,
          "ingreso": 35043.06,
          "ticket": 2920.25
        },
        "Programa Activo": {
          "pacientes": 6,
          "ingreso": 2466866.45,
          "ticket": 411144.41
        }
      },
      "totalPacientesYTD": {
        "Valoración": 164,
        "Programa Activo": 36
      },
      "ingresoYTD": 8189595.07
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
          11
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
          6
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 11,
          "ingreso": 15646.51,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 6,
          "ingreso": 2466866.45,
          "ticket": 411144.41
        }
      },
      "totalPacientesYTD": {
        "Valoración": 162,
        "Programa Activo": 35
      },
      "ingresoYTD": 8133991.63
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
          1
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
          "pacientes": 1,
          "ingreso": 19396.55,
          "ticket": 19396.55
        },
        "Programa Activo": {
          "pacientes": 0,
          "ingreso": 0,
          "ticket": 0
        }
      },
      "totalPacientesYTD": {
        "Valoración": 2,
        "Programa Activo": 1
      },
      "ingresoYTD": 55603.44
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
