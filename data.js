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

// ACTUALIZADO 23-nov-2026: CORTE 22-NOV-2026 (noviembre, 22 días de Real: 1 al 22 nov). Proyección de noviembre $18.40M (ajustada el 10-nov por mantenimientos y subrogación; antes $17.95M) con el bloqueo de agenda de Metepec (16 al 20-nov) ya terminado. Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Ingresos, Atenciones, Pacientes, Servicios y Subrogación al 18-nov (cargos de vRepro; el Drive de Cargos llega al 31-oct).
// Consultas (primera vez), No Show y ranking de consultas actualizados al 18-nov (vRepro, Primera Vez Terminada / No Asiste). HubSpot (leads, citas, cohortes, mecanismos) también al 18-nov. Conversión (data_conv.js) se refresca por separado.
window.DATA = {
  "corte": "22-nov-2026",
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
      "actual": 13.91,
      "proy": 18.4,
      "vsLM": 12,
      "vsU3M": 15,
      "nota": "NOVIEMBRE AL CORTE DEL 22-NOV (16.63 de 23.25 días ponderados; Real = $13,913,830: CDMX $12.00M, Guadalajara $1.72M y Metepec $0.19M). Proyección $18.40M (rango $18.22M–$18.57M): +12% vs octubre ($16.47M) y +15% vs el promedio ago-oct. Método (igual que los cortes del 12, 16 y 18-nov): Real + días ponderados restantes × ritmo base + cola de mantenimientos + subrogación restante. El ritmo base es 62% el de los primeros 22 días y 38% el promedio ago-oct (mezcla con k=10), SIN los almacenamientos/renovaciones de gametos (~$1.1M al mes, cobrados sobre todo al inicio) y SIN la subrogación. Cola de mantenimientos supuesta $0.35M (como octubre). Subrogación: Real $2.68M en 22 días (ya supera cualquier mes de 2026) + 50% del promedio ago-oct por los días restantes (+$0.18M; al 100% serían +$0.36M). Pesos de días: lun–vie 1, sáb 0.55, dom 0.07; lun 16-nov (feriado de la Revolución) 0.7; GDL sáb 14 = 0.25 y lun 16 = 0.1. Quedan 6.62 días ponderados (23 al 30-nov). Los cargos de GDL en días hábiles recientes fueron bajos (17-nov $57K, 18-nov $42K y 20-nov $43K): si hubo captura tardía en vRepro, el Real de GDL subirá en el próximo corte. METEPEC: la agenda de la Dra. estuvo bloqueada del 16 al 20-nov (esos días pesan 0 en el ritmo); el bloqueo ya terminó, por lo que no se descuenta ningún día restante. Escenarios: bajo $18.22M (sin más subrogación) y alto $18.57M (subrogación restante al promedio completo)."
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
      "actual": 2436,
      "proy": 3424,
      "vsLM": 9,
      "vsU3M": 5,
      "nota": "Real al 22-nov: 2,436 líneas de cargo (CDMX 1,853, GDL 475, MTP 108; 181 son renovaciones de almacenamiento de gametos, concentradas en los primeros días). Proyección 3,424 (mezcla ritmo del mes / ritmo ago-oct con shrinkage k=10 SIN las líneas de almacenamiento + cola de líneas de almacenamiento por llegar): +9% vs octubre (3,147). Ingreso por atención proyectado ~$5.4K vs ~$5.2K en octubre (el Real trae paquetes de subrogación)."
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
      "actual": 850,
      "proy": 1140,
      "vsLM": 19,
      "vsU3M": 4,
      "nota": "Real al 22-nov: 850 pacientes únicos (CDMX 594, GDL 198, MTP 58; suma por sede). Proyección 1,140 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +19% vs octubre (962)."
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
      "real": 244,
      "agendado": 103,
      "proy": 347,
      "vsLM": 25,
      "vsU3M": 14,
      "nota": "Real al 22-nov: 244 consultas de primera vez terminadas (CDMX 137, GDL 83, MTP 24; grupo Primera Vez completo, misma definición del histórico). Proyección 347 con el modelo de Bru: terminadas 244 + agenda pendiente 23–30 nov (CDMX 66, GDL 35, MTP 14 citas) × show rate (CDMX 86%, GDL 81%, MTP 68%) = piso 339, + incremental por agendar ≈ 8. Rango 343–352 (incremental ×0.5 / ×1.6). Referencia cruzada por ritmo histórico (backtest abr–oct, MAPE 6.9%): 327 (CDMX 179, GDL 115, MTP 33). +25% vs octubre (278). No Show 16.2% (47 inasistencias sobre 291 citas de primera vez del 1 al 22-nov). La agenda del 23-nov es aproximada (más de 1,000 registros en vRepro, la mayoría anulados; se leyó solo la primera página)."
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
      "actual": 16.2,
      "prom": 14.5,
      "deltaPts": 1.7
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
        "actual": 12.0,
        "proy": 15.68,
        "vsLM": 14,
        "vsU3M": 19,
        "nota": "Real al 22-nov $12.00M; proyección $15.68M (+14% vs octubre, $13.80M). Incluye subrogación proyectada $2.86M (Real $2.68M + 50% del promedio ago-oct del resto del mes)."
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
        "actual": 1853,
        "proy": 2569,
        "vsLM": 7,
        "vsU3M": 8
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
        "actual": 594,
        "proy": 795,
        "vsLM": 19,
        "vsU3M": 8
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
        "real": 137,
        "agendado": 61,
        "proy": 198,
        "vsLM": 37,
        "vsU3M": 39,
        "top_cat": "Consulta primera vez",
        "top_n": 128
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
        "actual": 13.8,
        "prom": 12.3,
        "deltaPts": 1.5
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
        "actual": 1.72,
        "proy": 2.38,
        "vsLM": 19,
        "vsU3M": 14,
        "nota": "Real al 22-nov $1.72M; proyección $2.38M (+19% vs octubre, $2.00M). Los cargos de los días hábiles 17, 18 y 20-nov ($57K, $42K y $43K) fueron bajos: posible captura tardía."
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
        "actual": 475,
        "proy": 682,
        "vsLM": 23,
        "vsU3M": 4
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
        "actual": 198,
        "proy": 282,
        "vsLM": 25,
        "vsU3M": 4
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
        "real": 83,
        "agendado": 32,
        "proy": 115,
        "vsLM": 6,
        "vsU3M": -5,
        "top_cat": "Check up Ginecologico",
        "top_n": 26
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
        "actual": 13.5,
        "prom": 15.6,
        "deltaPts": -2.1
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
        "actual": 0.194,
        "proy": 0.334,
        "vsLM": -50,
        "vsU3M": -50,
        "nota": "Real al 22-nov $193.7K (108 líneas de cargo); proyección $334K (-50% vs octubre, $666K). El bloqueo de agenda de la Dra. (16 al 20-nov) ya terminó: no se descuenta ningún día restante."
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
        "actual": 108,
        "proy": 173,
        "vsLM": -13,
        "vsU3M": -27
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
        "actual": 58,
        "proy": 63,
        "vsLM": -6,
        "vsU3M": -26
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
        "agendado": 10,
        "proy": 34,
        "vsLM": 36,
        "vsU3M": -17,
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
        "valor": 4.87,
        "vsLM": 9,
        "vsU3M": 6
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.59,
        "vsLM": 8,
        "vsU3M": 8
      },
      {
        "nombre": "Farmacia",
        "valor": 3.29,
        "vsLM": -7,
        "vsU3M": 4
      },
      {
        "nombre": "Subrogación",
        "valor": 2.88,
        "vsLM": 82,
        "vsU3M": 119
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.71,
        "vsLM": -2,
        "vsU3M": 6
      },
      {
        "nombre": "Consultas",
        "valor": 0.49,
        "vsLM": 28,
        "vsU3M": 10
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.4,
        "vsLM": 31,
        "vsU3M": 7
      },
      {
        "nombre": "Imágenes",
        "valor": 0.09,
        "vsLM": 42,
        "vsU3M": 6
      },
      {
        "nombre": "Wellness",
        "valor": 0.04,
        "vsLM": -21,
        "vsU3M": 9
      },
      {
        "nombre": "Otros",
        "valor": 0.02,
        "vsLM": 24,
        "vsU3M": 9
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 4.19,
        "vsLM": 14,
        "vsU3M": 8
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.88,
        "vsLM": 6,
        "vsU3M": 8
      },
      {
        "nombre": "Subrogación",
        "valor": 2.86,
        "vsLM": 81,
        "vsU3M": 119
      },
      {
        "nombre": "Farmacia",
        "valor": 2.8,
        "vsLM": -3,
        "vsU3M": 8
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.25,
        "vsLM": -7,
        "vsU3M": 8
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.33,
        "vsLM": 35,
        "vsU3M": 8
      },
      {
        "nombre": "Consultas",
        "valor": 0.24,
        "vsLM": 30,
        "vsU3M": 8
      },
      {
        "nombre": "Imágenes",
        "valor": 0.08,
        "vsLM": 54,
        "vsU3M": 8
      },
      {
        "nombre": "Wellness",
        "valor": 0.03,
        "vsLM": -23,
        "vsU3M": 8
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 168,
        "vsU3M": 8
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.65,
        "vsLM": 11,
        "vsU3M": 14
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.58,
        "vsLM": 40,
        "vsU3M": 14
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.41,
        "vsLM": 45,
        "vsU3M": 14
      },
      {
        "nombre": "Farmacia",
        "valor": 0.39,
        "vsLM": -9,
        "vsU3M": 14
      },
      {
        "nombre": "Consultas",
        "valor": 0.24,
        "vsLM": 24,
        "vsU3M": 14
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.06,
        "vsLM": 6,
        "vsU3M": 14
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
        "vsLM": -12,
        "vsU3M": 14
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
        "vsLM": -62,
        "vsU3M": 14
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
      "Noviembre al corte del 22-nov: Real $13.91M (16.63 de 23.25 días ponderados). Proyección $18.40M (rango $18.22M–$18.57M): +12% vs octubre ($16.47M); el corte del 18-nov decía $17.35M. CDMX aporta 85% ($15.68M), Guadalajara 13% ($2.38M) y Metepec 2% ($0.33M).",
      "Metepec salió del bloqueo de agenda de la Dra. (16 al 20-nov): Real $0.19M y proyección $0.33M (Atenciones MTP 173, Pacientes 63). Sigue siendo la sede con mayor incertidumbre; la proyección ya no descuenta días de bloqueo.",
      "Del 19 al 22-nov se agregaron $2.45M: jueves 19 $1.32M, viernes 20 $0.77M, sábado 21 $0.33M y domingo 22 $0.02M. El jueves 19 concentra cargos grandes en CDMX (incluye subrogación). Sin subrogación ni renovaciones de almacenamiento, el ritmo diario base de CDMX va en $501K por día ponderado vs $450K del promedio ago-oct. La subrogación del mes suma $2.68M en el Real.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.87M, Congelación de Gametos $3.59M, Farmacia $3.29M, Subrogación $2.88M, Laboratorio $2.71M. Subrogación $2.88M: $2.68M ya están en el Real y el resto es la mitad del promedio ago-oct.",
      "Atenciones proyectadas 3,424 (+9% vs octubre) y Pacientes 1,140 (+19%). Consultas de primera vez al 22-nov: 244 reales y proyección 347 (+25% vs octubre, rango 343–352); No Show 16.2%. HubSpot (Interesa2) al 22-nov: 1,273 leads y 316 citas agendadas (25% de conversión vs 25% en octubre; sedes con GDL = Guadalajara + Puerto Vallarta + Sahuayo y CDMX = Ciudad de México + Benito Juárez: CDMX 32%, GDL 21%, MTP 21%)."
    ],
    "CDMX": [
      "CDMX lleva $12.00M al 22-nov y proyecta $15.68M (+14% vs octubre, +19% vs U3M): Tratamientos FIV/ICSI $4.19M, Congelación de Gametos $2.88M, Subrogación $2.86M, Farmacia $2.80M, Laboratorio $2.25M.",
      "1,853 atenciones y 594 pacientes al corte; proyección 2,569 atenciones (+7% vs octubre) y 795 pacientes (+19% vs octubre). Consultas de primera vez: 137 al corte, proyección 198 (+37% vs octubre); No Show 13.8%.",
      "HubSpot (Interesa2) al 22-nov (Ciudad de México + Benito Juárez): 551 leads y 177 citas agendadas (32% de conversión vs 30% en octubre, con 908 leads y 269 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "GDL": [
      "GDL lleva $1.72M al 22-nov y proyecta $2.38M (+19% vs octubre): Congelación de Gametos $0.65M, Tratamientos FIV/ICSI $0.58M, Laboratorio $0.41M, Farmacia $0.39M. Ojo: los cargos de los días hábiles 17, 18 y 20-nov ($57K, $42K y $43K) fueron bajos; si fue captura tardía, el Real de GDL subirá.",
      "475 atenciones y 198 pacientes al corte; proyección 682 atenciones y 282 pacientes. Consultas de primera vez: 83 al corte, proyección 115 (+6% vs octubre); No Show 13.5%.",
      "HubSpot (Interesa2) al 22-nov (Guadalajara + Puerto Vallarta + Sahuayo): 457 leads y 95 citas agendadas (21% de conversión vs 23% en octubre, con 717 leads y 164 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "MTP": [
      "Metepec lleva $193.7K al 22-nov (108 líneas) y proyecta $334K (-50% vs octubre). La agenda de la Dra. estuvo bloqueada del 16 al 20-nov (ya terminó; no se descuenta nada); sigue siendo la sede con mayor incertidumbre (error de backtest ~30%).",
      "108 atenciones y 58 pacientes al corte; proyección 173 atenciones y 63 pacientes. Consultas de primera vez: 24 al corte, proyección 34 (+36% vs octubre); No Show 33.3%.",
      "HubSpot (Interesa2) al 22-nov: 76 leads y 16 citas agendadas (21% de conversión vs 34% en octubre, con 200 leads y 67 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ]
  },
  "consultas_ranking": {
    "total": [
      {
        "nombre": "Consulta primera vez",
        "valor": 173,
        "vsLM": 45
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 43,
        "vsLM": 7
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 35,
        "vsLM": 6
      },
      {
        "nombre": "Check-up SOP",
        "valor": 29,
        "vsLM": -3
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 21,
        "vsLM": 31
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 15,
        "vsLM": 25
      },
      {
        "nombre": "Check up Integral",
        "valor": 13,
        "vsLM": -7
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 7,
        "vsLM": 40
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 5,
        "vsLM": 400
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 3,
        "vsLM": 50
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 3,
        "vsLM": -40
      }
    ],
    "CDMX": [
      {
        "nombre": "Consulta primera vez",
        "valor": 128,
        "vsLM": 58
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 27,
        "vsLM": 0
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 15,
        "vsLM": 25
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 9,
        "vsLM": -10
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 7,
        "vsLM": 0
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 4,
        "vsLM": 300
      },
      {
        "nombre": "Check-up SOP",
        "valor": 4,
        "vsLM": 33
      },
      {
        "nombre": "Check up Integral",
        "valor": 2,
        "vsLM": -33
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 2,
        "vsLM": 100
      }
    ],
    "GDL": [
      {
        "nombre": "Check up Ginecologico",
        "valor": 26,
        "vsLM": 4
      },
      {
        "nombre": "Check-up SOP",
        "valor": 24,
        "vsLM": -4
      },
      {
        "nombre": "Consulta primera vez",
        "valor": 20,
        "vsLM": 11
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 13,
        "vsLM": 8
      },
      {
        "nombre": "Check up Integral",
        "valor": 11,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 9,
        "vsLM": 80
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 7,
        "vsLM": 40
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 3,
        "vsLM": -40
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 1,
        "vsLM": null,
        "nuevo": true
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
        "nombre": "Fertility Check up Parejas",
        "valor": 3,
        "vsLM": 200
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 3,
        "vsLM": 200
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
      "actual": 1273
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
      "actual": 316
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
          551,
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
          177,
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
          457,
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
          95,
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
          21,
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
          76,
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
          16,
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
        "leads": 2090,
        "m0": 21,
        "m1": 1,
        "m2": 0,
        "sin": 78
      },
      {
        "mes": "Oct-26",
        "leads": 2052,
        "m0": 23,
        "m1": 1,
        "m2": 0,
        "sin": 76
      },
      {
        "mes": "Nov-26",
        "leads": 1273,
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
          13
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
          7
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 13,
          "ingreso": 36465.47,
          "ticket": 2805.04
        },
        "Programa Activo": {
          "pacientes": 7,
          "ingreso": 2656952.76,
          "ticket": 379564.68
        }
      },
      "totalPacientesYTD": {
        "Valoración": 165,
        "Programa Activo": 37
      },
      "ingresoYTD": 8381103.79
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
          12
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
          7
        ]
      },
      "actual": {
        "Valoración": {
          "pacientes": 12,
          "ingreso": 17068.92,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 7,
          "ingreso": 2656952.76,
          "ticket": 379564.68
        }
      },
      "totalPacientesYTD": {
        "Valoración": 163,
        "Programa Activo": 36
      },
      "ingresoYTD": 8325500.35
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
