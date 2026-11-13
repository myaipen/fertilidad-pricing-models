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

// ACTUALIZADO 13-nov-2026: CORTE 12-NOV-2026 (noviembre, 12 días de Real: 1 al 12 nov). Proyección de noviembre $16.76M (ajustada el 10-nov por mantenimientos y subrogación; antes $17.95M) con la agenda de Metepec bloqueada del 16 al 20-nov. Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Ingresos, Atenciones, Pacientes, Servicios y Subrogación al 12-nov (cargos de vRepro; el Drive de Cargos llega al 31-oct).
// Consultas (primera vez), No Show y ranking de consultas actualizados al 12-nov (vRepro, Primera Vez Terminada / No Asiste). HubSpot (leads, citas, cohortes, mecanismos) también al 12-nov. Conversión (data_conv.js) se refresca por separado.
window.DATA = {
  "corte": "12-nov-2026",
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
      "actual": 8.77,
      "proy": 16.76,
      "vsLM": 2,
      "vsU3M": 5,
      "nota": "NOVIEMBRE AL CORTE DEL 12-NOV (9.69 de 23.25 días ponderados; Real = $8,766,740: CDMX $7.54M, Guadalajara $1.08M y Metepec $0.15M). Proyección $16.76M (rango $16.40M–$17.13M): +2% vs octubre ($16.47M) y +5% vs el promedio ago-oct. Método (igual que el corte del 9-nov): Real + días ponderados restantes × ritmo base + cola de mantenimientos + subrogación restante. El ritmo base es 49% el de los primeros 12 días y 51% el promedio ago-oct (mezcla con k=10; base del backtest abr–oct, error medio ~7%), SIN los almacenamientos/renovaciones de gametos ($1.03M al día 12, cobrados sobre todo al inicio del mes; ~$1.1M al mes) y SIN la subrogación. Cola de mantenimientos supuesta $0.35M (como octubre). Subrogación: Real $2.38M en 12 días (ya supera cualquier mes de 2026, incluido el paquete Fresh Egg Donor de $833K del 12-nov) + 50% del promedio ago-oct por los días restantes (+$0.36M; al 100% serían +$0.72M). Pesos de feriado y puente (CDMX sáb 14 = 0.40 y lun 16 = 0.7; GDL sáb 14 = 0.25 y lun 16 = 0.1). Días ponderados: lun–vie 1, sáb 0.55, dom 0.07. METEPEC: agenda de la Dra. bloqueada del 16 al 20-nov (4.7 días ponderados sin ritmo): Metepec $0.33M en vez de $0.43M. Escenarios: bajo $16.40M (sin más subrogación) y alto $17.13M (subrogación restante al promedio completo)."
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
      "actual": 1380,
      "proy": 3092,
      "vsLM": -2,
      "vsU3M": -5,
      "nota": "Real al 12-nov: 1,380 líneas de cargo (CDMX 1,056, GDL 251, MTP 73; 171 son renovaciones de almacenamiento de gametos, concentradas en los primeros días). Proyección 3,092 (mezcla ritmo del mes / ritmo ago-oct con shrinkage k=10 SIN las líneas de almacenamiento + cola de líneas de almacenamiento por llegar; backtest abr–oct error medio 7.5% y sin sesgo; Metepec sin los 5 días bloqueados 16–20 nov): -2% vs octubre (3,147). Ingreso por atención proyectado ~$5.4K vs ~$5.2K en octubre (el Real trae paquetes de subrogación)."
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
      "actual": 584,
      "proy": 1026,
      "vsLM": 7,
      "vsU3M": -6,
      "nota": "Real al 12-nov: 584 pacientes únicos (CDMX 428, GDL 109, MTP 47; suma por sede). Proyección 1,026 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +7% vs octubre (962)."
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
      "real": 141,
      "agendado": 147,
      "proy": 288,
      "vsLM": 4,
      "vsU3M": -5,
      "nota": "Real al 12-nov: 141 consultas de primera vez terminadas (CDMX 84, GDL 39, MTP 18; grupo Primera Vez completo, misma definición del histórico). Proyección 288 con el modelo de Bru: terminadas 141 + agenda pendiente 13–30 nov (CDMX 60, GDL 47, MTP 22 citas) × show rate (CDMX 87%, GDL 79%, MTP 68%) = piso 245, + incremental por agendar ≈ 43. Rango 268–315 (incremental ×0.5 / ×1.6). Metepec descuenta el bloqueo de agenda del 16–20-nov. Referencia cruzada por ritmo histórico (backtest abr–oct, MAPE 6.9%): 303 (CDMX 170, GDL 102, MTP 31). +4% vs octubre (278). No Show 15.6% (26 inasistencias sobre 167 citas de primera vez del 1 al 12-nov)."
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
      "actual": 15.6,
      "prom": 14.5,
      "deltaPts": 1.1
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
        "actual": 7.54,
        "proy": 14.17,
        "vsLM": 3,
        "vsU3M": 7,
        "nota": "Real al 12-nov $7.54M; proyección $14.17M (+3% vs octubre, $13.80M). Incluye subrogación proyectada $2.74M (Real $2.38M + 50% del promedio ago-oct del resto del mes)."
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
        "actual": 1056,
        "proy": 2356,
        "vsLM": -2,
        "vsU3M": -1
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
        "actual": 428,
        "proy": 729,
        "vsLM": 9,
        "vsU3M": -1
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
        "real": 84,
        "agendado": 77,
        "proy": 161,
        "vsLM": 11,
        "vsU3M": 13,
        "top_cat": "Consulta primera vez",
        "top_n": 101
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
        "actual": 10.6,
        "prom": 12.3,
        "deltaPts": -1.7
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
        "actual": 1.08,
        "proy": 2.27,
        "vsLM": 13,
        "vsU3M": 9,
        "nota": "Real al 12-nov $1.08M; proyección $2.27M (+13% vs octubre, $2.00M)."
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
        "actual": 251,
        "proy": 584,
        "vsLM": 5,
        "vsU3M": -11
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
        "actual": 109,
        "proy": 242,
        "vsLM": 7,
        "vsU3M": -11
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
        "real": 39,
        "agendado": 54,
        "proy": 93,
        "vsLM": -14,
        "vsU3M": -23,
        "top_cat": "Check-up SOP",
        "top_n": 19
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
        "actual": 15.2,
        "prom": 15.6,
        "deltaPts": -0.4
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
        "actual": 0.146,
        "proy": 0.332,
        "vsLM": -50,
        "vsU3M": -50,
        "nota": "Real al 12-nov $145.6K (73 líneas de cargo); proyección $332K (-50% vs octubre, $666K). Incluye el bloqueo de agenda de la Dra. del 16 al 20-nov (4.7 días ponderados sin ritmo): sin el bloqueo serían $430K."
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
        "actual": 73,
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
        "actual": 47,
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
        "real": 18,
        "agendado": 16,
        "proy": 34,
        "vsLM": 36,
        "vsU3M": -17,
        "top_cat": "Consulta primera vez",
        "top_n": 27
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
        "valor": 4.39,
        "vsLM": -1,
        "vsU3M": -5
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.25,
        "vsLM": -2,
        "vsU3M": -2
      },
      {
        "nombre": "Farmacia",
        "valor": 2.97,
        "vsLM": -16,
        "vsU3M": -6
      },
      {
        "nombre": "Subrogación",
        "valor": 2.75,
        "vsLM": 74,
        "vsU3M": 109
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.44,
        "vsLM": -11,
        "vsU3M": -4
      },
      {
        "nombre": "Consultas",
        "valor": 0.45,
        "vsLM": 17,
        "vsU3M": 1
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.36,
        "vsLM": 18,
        "vsU3M": -3
      },
      {
        "nombre": "Imágenes",
        "valor": 0.08,
        "vsLM": 29,
        "vsU3M": -4
      },
      {
        "nombre": "Wellness",
        "valor": 0.04,
        "vsLM": -29,
        "vsU3M": -2
      },
      {
        "nombre": "Otros",
        "valor": 0.02,
        "vsLM": 12,
        "vsU3M": -1
      }
    ],
    "CDMX": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 3.74,
        "vsLM": 2,
        "vsU3M": -4
      },
      {
        "nombre": "Subrogación",
        "valor": 2.74,
        "vsLM": 73,
        "vsU3M": 109
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.56,
        "vsLM": -6,
        "vsU3M": -4
      },
      {
        "nombre": "Farmacia",
        "valor": 2.5,
        "vsLM": -13,
        "vsU3M": -4
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.0,
        "vsLM": -17,
        "vsU3M": -4
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.3,
        "vsLM": 21,
        "vsU3M": -4
      },
      {
        "nombre": "Consultas",
        "valor": 0.21,
        "vsLM": 16,
        "vsU3M": -4
      },
      {
        "nombre": "Imágenes",
        "valor": 0.07,
        "vsLM": 37,
        "vsU3M": -4
      },
      {
        "nombre": "Wellness",
        "valor": 0.03,
        "vsLM": -31,
        "vsU3M": -4
      },
      {
        "nombre": "Otros",
        "valor": 0.01,
        "vsLM": 139,
        "vsU3M": -4
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.62,
        "vsLM": 6,
        "vsU3M": 9
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.56,
        "vsLM": 34,
        "vsU3M": 9
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.39,
        "vsLM": 39,
        "vsU3M": 9
      },
      {
        "nombre": "Farmacia",
        "valor": 0.38,
        "vsLM": -13,
        "vsU3M": 9
      },
      {
        "nombre": "Consultas",
        "valor": 0.23,
        "vsLM": 19,
        "vsU3M": 9
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.06,
        "vsLM": 1,
        "vsU3M": 9
      },
      {
        "nombre": "Imágenes",
        "valor": 0.01,
        "vsLM": -16,
        "vsU3M": 9
      },
      {
        "nombre": "Wellness",
        "valor": 0.01,
        "vsLM": -20,
        "vsU3M": 9
      },
      {
        "nombre": "Subrogación",
        "valor": 0.01,
        "vsLM": 753,
        "vsU3M": 9
      },
      {
        "nombre": "Otros",
        "valor": 0.0,
        "vsLM": -64,
        "vsU3M": 9
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.1,
        "vsLM": -72,
        "vsU3M": -55
      },
      {
        "nombre": "Farmacia",
        "valor": 0.1,
        "vsLM": -56,
        "vsU3M": -55
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
        "vsLM": -15,
        "vsU3M": -55
      },
      {
        "nombre": "Consultas",
        "valor": 0.01,
        "vsLM": 6,
        "vsU3M": -39
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.0,
        "vsLM": null,
        "vsU3M": -55,
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
        "vsU3M": -55
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre al corte del 12-nov: Real $8.77M (9.69 de 23.25 días ponderados). Proyección $16.76M (rango $16.40M–$17.13M): +2% vs octubre ($16.47M); el corte del 9-nov decía $16.46M. CDMX aporta 84% ($14.17M), Guadalajara 14% ($2.27M) y Metepec 2% ($0.33M).",
      "Metepec con la agenda de la Dra. bloqueada del 16 al 20-nov. Efecto estimado: -$0.10M (Metepec $0.33M en vez de $0.43M; Atenciones MTP 152, Pacientes 55).",
      "Del 10 al 12-nov: $0.48M, $0.43M y $1.39M. El jueves 12 sumó otro paquete Fresh Egg Donor de subrogación en CDMX ($833K), con lo que la subrogación del mes ya es $2.38M (6 paquetes). Sin subrogación ni renovaciones de almacenamiento ($1.03M), el ritmo diario base de CDMX va en $438K por día ponderado vs $450K del promedio ago-oct.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.39M, Congelación de Gametos $3.25M, Farmacia $2.97M, Subrogación $2.75M, Laboratorio $2.44M. Subrogación $2.75M: $2.38M ya están en el Real (paquetes del 3, 9 y 12-nov) y el resto es la mitad del promedio ago-oct.",
      "Atenciones proyectadas 3,092 (-2% vs octubre) y Pacientes 1,026 (+7%). Consultas de primera vez al 12-nov: 141 reales y proyección 288 (+4% vs octubre, rango 268–315); No Show 15.6%. HubSpot (Interesa2) al 12-nov: 708 leads y 167 citas agendadas (24% de conversión vs 25% en octubre; CDMX 37%, GDL 21%, MTP 20%)."
    ],
    "CDMX": [
      "CDMX lleva $7.54M al 12-nov y proyecta $14.17M (+3% vs octubre, +7% vs U3M): Tratamientos FIV/ICSI $3.74M, Subrogación $2.74M, Congelación de Gametos $2.56M, Farmacia $2.50M, Laboratorio $2.00M.",
      "1,056 atenciones y 428 pacientes al corte; proyección 2,356 atenciones (-2% vs octubre) y 729 pacientes (+9% vs octubre). Consultas de primera vez: 84 al corte, proyección 161 (+11% vs octubre); No Show 10.6%.",
      "HubSpot (Interesa2) al 12-nov: 245 leads y 90 citas agendadas (37% de conversión vs 30% en octubre, con 882 leads y 261 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "GDL": [
      "GDL lleva $1.08M al 12-nov y proyecta $2.27M (+13% vs octubre): Congelación de Gametos $0.62M, Tratamientos FIV/ICSI $0.56M, Laboratorio $0.39M, Farmacia $0.38M.",
      "251 atenciones y 109 pacientes al corte; proyección 584 atenciones y 242 pacientes. Consultas de primera vez: 39 al corte, proyección 93 (-14% vs octubre); No Show 15.2%.",
      "HubSpot (Interesa2) al 12-nov: 231 leads y 48 citas agendadas (21% de conversión vs 24% en octubre, con 654 leads y 154 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "MTP": [
      "Metepec lleva $145.6K al 12-nov (73 líneas) y proyecta $332K (-50% vs octubre). Ya incluye el bloqueo de la agenda de la Dra. del 16 al 20-nov (sin él: $430K); sigue siendo la sede con mayor incertidumbre (error de backtest ~30%).",
      "73 atenciones y 47 pacientes al corte; proyección 152 atenciones y 55 pacientes. Consultas de primera vez: 18 al corte, proyección 34 (+36% vs octubre; ya descuenta el bloqueo de agenda 16–20-nov); No Show 33.3%.",
      "HubSpot (Interesa2) al 12-nov: 55 leads y 11 citas agendadas (20% de conversión vs 32% en octubre, con 198 leads y 63 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ]
  },
  "consultas_ranking": {
    "total": [
      {
        "nombre": "Consulta primera vez",
        "valor": 145,
        "vsLM": 22
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 39,
        "vsLM": -3
      },
      {
        "nombre": "Check-up SOP",
        "valor": 23,
        "vsLM": -23
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 23,
        "vsLM": -30
      },
      {
        "nombre": "Check up Integral",
        "valor": 15,
        "vsLM": 7
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 15,
        "vsLM": 25
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 13,
        "vsLM": -19
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 6,
        "vsLM": 20
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
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 2,
        "vsLM": 100
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
        "valor": 101,
        "vsLM": 25
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 23,
        "vsLM": -15
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 15,
        "vsLM": 25
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 7,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 6,
        "vsLM": -40
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
        "nombre": "Check-up SOP",
        "valor": 19,
        "vsLM": -24
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
        "nombre": "Consulta ginecológica",
        "valor": 6,
        "vsLM": 20
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 4,
        "vsLM": -20
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
        "valor": 27,
        "vsLM": 35
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
        "valor": 1,
        "vsLM": -50
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
      "actual": 708
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
      "actual": 167
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
      "actual": 24
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
          37,
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
          245,
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
          90,
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
          231,
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
          48,
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
          20,
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
          55,
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
          11,
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
        "leads": 708,
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
          8
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
          "pacientes": 8,
          "ingreso": 11379.28,
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
        "Programa Activo": 35
      },
      "ingresoYTD": 8060758.88
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
          8
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
          "pacientes": 8,
          "ingreso": 11379.28,
          "ticket": 1422.41
        },
        "Programa Activo": {
          "pacientes": 5,
          "ingreso": 2361694.04,
          "ticket": 472338.81
        }
      },
      "totalPacientesYTD": {
        "Valoración": 159,
        "Programa Activo": 34
      },
      "ingresoYTD": 8024551.99
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
