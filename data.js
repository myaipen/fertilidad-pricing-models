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

// ACTUALIZADO 23-nov-2026: CORTE 22-NOV-2026 (noviembre, 22 días de Real: 1 al 22 nov). Proyección de noviembre $17.10M (ajustada el 10-nov por mantenimientos y subrogación; antes $17.95M) con el bloqueo de agenda de Metepec (16 al 20-nov) ya terminado. Octubre ya cerrado e incluido en "hist".
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
      "actual": 12.68,
      "proy": 17.1,
      "vsLM": 4,
      "vsU3M": 7,
      "nota": "NOVIEMBRE AL CORTE DEL 22-NOV (16.63 de 23.25 días ponderados; Real = $12,677,196: CDMX $10.78M, Guadalajara $1.77M y Metepec $0.14M). Proyección $17.10M (rango $16.93M–$17.28M): +4% vs octubre ($16.47M) y +7% vs el promedio ago-oct. Método (igual que los cortes del 12, 16 y 18-nov): Real + días ponderados restantes × ritmo base + cola de mantenimientos + subrogación restante. El ritmo base es 62% el de los primeros 22 días y 38% el promedio ago-oct (mezcla con k=10), SIN los almacenamientos/renovaciones de gametos (~$1.1M al mes, cobrados sobre todo al inicio) y SIN la subrogación. Cola de mantenimientos supuesta $0.35M (como octubre). Subrogación: Real $1.75M en 22 días (ya supera cualquier mes de 2026) + 50% del promedio ago-oct por los días restantes (+$0.18M; al 100% serían +$0.36M). Pesos de días: lun–vie 1, sáb 0.55, dom 0.07; lun 16-nov (feriado de la Revolución) 0.7; GDL sáb 14 = 0.25 y lun 16 = 0.1. Quedan 6.62 días ponderados (23 al 30-nov). Los cargos de GDL en días hábiles recientes fueron bajos (17-nov $57K, 18-nov $42K y 20-nov $43K): si hubo captura tardía en vRepro, el Real de GDL subirá en el próximo corte. METEPEC: la agenda de la Dra. estuvo bloqueada del 16 al 20-nov (esos días pesan 0 en el ritmo); el bloqueo ya terminó, por lo que no se descuenta ningún día restante. Escenarios: bajo $16.93M (sin más subrogación) y alto $17.28M (subrogación restante al promedio completo)."
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
      "actual": 2421,
      "proy": 3421,
      "vsLM": 9,
      "vsU3M": 5,
      "nota": "Real al 22-nov: 2,421 líneas de cargo (CDMX 1,834, GDL 480, MTP 107; 168 son renovaciones de almacenamiento de gametos, concentradas en los primeros días). Proyección 3,421 (mezcla ritmo del mes / ritmo ago-oct con shrinkage k=10 SIN las líneas de almacenamiento + cola de líneas de almacenamiento por llegar): +9% vs octubre (3,147). Ingreso por atención proyectado ~$5.0K vs ~$5.2K en octubre (el Real trae paquetes de subrogación)."
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
      "actual": 835,
      "proy": 1139,
      "vsLM": 18,
      "vsU3M": 4,
      "nota": "Real al 22-nov: 835 pacientes únicos (CDMX 580, GDL 198, MTP 57; suma por sede). Proyección 1,139 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +18% vs octubre (962)."
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
        "actual": 10.78,
        "proy": 14.41,
        "vsLM": 4,
        "vsU3M": 9,
        "nota": "Real al 22-nov $10.78M; proyección $14.41M (+4% vs octubre, $13.80M). Incluye subrogación proyectada $1.92M (Real $1.75M + 50% del promedio ago-oct del resto del mes)."
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
        "actual": 1834,
        "proy": 2560,
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
        "actual": 580,
        "proy": 792,
        "vsLM": 18,
        "vsU3M": 7
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
        "actual": 1.77,
        "proy": 2.44,
        "vsLM": 22,
        "vsU3M": 17,
        "nota": "Real al 22-nov $1.77M; proyección $2.44M (+22% vs octubre, $2.00M). Los cargos de los días hábiles 17, 18 y 20-nov ($57K, $42K y $43K) fueron bajos: posible captura tardía."
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
        "actual": 480,
        "proy": 689,
        "vsLM": 24,
        "vsU3M": 5
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
        "proy": 285,
        "vsLM": 26,
        "vsU3M": 5
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
        "actual": 0.136,
        "proy": 0.258,
        "vsLM": -61,
        "vsU3M": -61,
        "nota": "Real al 22-nov $135.5K (107 líneas de cargo); proyección $258K (-61% vs octubre, $666K). El bloqueo de agenda de la Dra. (16 al 20-nov) ya terminó: no se descuenta ningún día restante."
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
        "actual": 107,
        "proy": 172,
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
        "actual": 57,
        "proy": 62,
        "vsLM": -7,
        "vsU3M": -27
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
        "valor": 4.76,
        "vsLM": 7,
        "vsU3M": 3
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.5,
        "vsLM": 5,
        "vsU3M": 5
      },
      {
        "nombre": "Farmacia",
        "valor": 3.21,
        "vsLM": -9,
        "vsU3M": 2
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.65,
        "vsLM": -4,
        "vsU3M": 4
      },
      {
        "nombre": "Subrogación",
        "valor": 1.94,
        "vsLM": 23,
        "vsU3M": 48
      },
      {
        "nombre": "Consultas",
        "valor": 0.49,
        "vsLM": 28,
        "vsU3M": 10
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.39,
        "vsLM": 28,
        "vsU3M": 5
      },
      {
        "nombre": "Imágenes",
        "valor": 0.09,
        "vsLM": 40,
        "vsU3M": 4
      },
      {
        "nombre": "Wellness",
        "valor": 0.04,
        "vsLM": -23,
        "vsU3M": 6
      },
      {
        "nombre": "Otros",
        "valor": 0.02,
        "vsLM": 22,
        "vsU3M": 7
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 4.08,
        "vsLM": 11,
        "vsU3M": 5
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.8,
        "vsLM": 3,
        "vsU3M": 5
      },
      {
        "nombre": "Farmacia",
        "valor": 2.73,
        "vsLM": -5,
        "vsU3M": 5
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.19,
        "vsLM": -9,
        "vsU3M": 5
      },
      {
        "nombre": "Subrogación",
        "valor": 1.92,
        "vsLM": 22,
        "vsU3M": 47
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.32,
        "vsLM": 32,
        "vsU3M": 5
      },
      {
        "nombre": "Consultas",
        "valor": 0.23,
        "vsLM": 27,
        "vsU3M": 5
      },
      {
        "nombre": "Imágenes",
        "valor": 0.07,
        "vsLM": 50,
        "vsU3M": 5
      },
      {
        "nombre": "Wellness",
        "valor": 0.03,
        "vsLM": -25,
        "vsU3M": 5
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 161,
        "vsU3M": 5
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.67,
        "vsLM": 14,
        "vsU3M": 17
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.6,
        "vsLM": 43,
        "vsU3M": 17
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.42,
        "vsLM": 48,
        "vsU3M": 17
      },
      {
        "nombre": "Farmacia",
        "valor": 0.4,
        "vsLM": -6,
        "vsU3M": 17
      },
      {
        "nombre": "Consultas",
        "valor": 0.24,
        "vsLM": 27,
        "vsU3M": 17
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.06,
        "vsLM": 8,
        "vsU3M": 17
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
        "vsLM": -10,
        "vsU3M": 17
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
        "vsLM": -61,
        "vsU3M": 17
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.08,
        "vsLM": -77,
        "vsU3M": -63
      },
      {
        "nombre": "Farmacia",
        "valor": 0.08,
        "vsLM": -64,
        "vsU3M": -63
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.04,
        "vsLM": -30,
        "vsU3M": -63
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.03,
        "vsLM": 82,
        "vsU3M": -63
      },
      {
        "nombre": "Consultas",
        "valor": 0.02,
        "vsLM": 50,
        "vsU3M": -14
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
        "vsU3M": -63,
        "nuevo": true
      },
      {
        "nombre": "Wellness",
        "valor": 0.0,
        "vsLM": -68,
        "vsU3M": -63
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre al corte del 22-nov: Real $12.68M (16.63 de 23.25 días ponderados). Proyección $17.10M (rango $16.93M–$17.28M): +4% vs octubre ($16.47M); el corte del 18-nov decía $17.35M. CDMX aporta 84% ($14.41M), Guadalajara 14% ($2.44M) y Metepec 2% ($0.26M).",
      "Metepec salió del bloqueo de agenda de la Dra. (16 al 20-nov): Real $0.14M y proyección $0.26M (Atenciones MTP 172, Pacientes 62). Sigue siendo la sede con mayor incertidumbre; la proyección ya no descuenta días de bloqueo.",
      "Del 19 al 22-nov se agregaron $2.44M: jueves 19 $1.32M, viernes 20 $0.77M, sábado 21 $0.33M y domingo 22 $0.02M. El jueves 19 concentra cargos grandes en CDMX (incluye subrogación). Sin subrogación ni renovaciones de almacenamiento, el ritmo diario base de CDMX va en $489K por día ponderado vs $450K del promedio ago-oct. La subrogación del mes suma $1.75M en el Real.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.76M, Congelación de Gametos $3.50M, Farmacia $3.21M, Laboratorio $2.65M, Subrogación $1.94M. Subrogación $1.94M: $1.75M ya están en el Real y el resto es la mitad del promedio ago-oct.",
      "Atenciones proyectadas 3,421 (+9% vs octubre) y Pacientes 1,139 (+18%). Consultas de primera vez al 22-nov: 244 reales y proyección 347 (+25% vs octubre, rango 343–352); No Show 16.2%. HubSpot (Interesa2) al 22-nov: 1,273 leads y 316 citas agendadas (25% de conversión vs 25% en octubre; sedes con GDL = Guadalajara + Puerto Vallarta + Sahuayo y CDMX = Ciudad de México + Benito Juárez: CDMX 32%, GDL 21%, MTP 21%)."
    ],
    "CDMX": [
      "CDMX lleva $10.78M al 22-nov y proyecta $14.41M (+4% vs octubre, +9% vs U3M): Tratamientos FIV/ICSI $4.08M, Congelación de Gametos $2.80M, Farmacia $2.73M, Laboratorio $2.19M, Subrogación $1.92M.",
      "1,834 atenciones y 580 pacientes al corte; proyección 2,560 atenciones (+7% vs octubre) y 792 pacientes (+18% vs octubre). Consultas de primera vez: 137 al corte, proyección 198 (+37% vs octubre); No Show 13.8%.",
      "HubSpot (Interesa2) al 22-nov (Ciudad de México + Benito Juárez): 551 leads y 177 citas agendadas (32% de conversión vs 30% en octubre, con 908 leads y 269 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "GDL": [
      "GDL lleva $1.77M al 22-nov y proyecta $2.44M (+22% vs octubre): Congelación de Gametos $0.67M, Tratamientos FIV/ICSI $0.60M, Laboratorio $0.42M, Farmacia $0.40M. Ojo: los cargos de los días hábiles 17, 18 y 20-nov ($57K, $42K y $43K) fueron bajos; si fue captura tardía, el Real de GDL subirá.",
      "480 atenciones y 198 pacientes al corte; proyección 689 atenciones y 285 pacientes. Consultas de primera vez: 83 al corte, proyección 115 (+6% vs octubre); No Show 13.5%.",
      "HubSpot (Interesa2) al 22-nov (Guadalajara + Puerto Vallarta + Sahuayo): 457 leads y 95 citas agendadas (21% de conversión vs 23% en octubre, con 717 leads y 164 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "MTP": [
      "Metepec lleva $135.5K al 22-nov (107 líneas) y proyecta $258K (-61% vs octubre). La agenda de la Dra. estuvo bloqueada del 16 al 20-nov (ya terminó; no se descuenta nada); sigue siendo la sede con mayor incertidumbre (error de backtest ~30%).",
      "107 atenciones y 57 pacientes al corte; proyección 172 atenciones y 62 pacientes. Consultas de primera vez: 24 al corte, proyección 34 (+36% vs octubre); No Show 33.3%.",
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
