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

// ACTUALIZADO 24-nov-2026: CORTE 23-NOV-2026 (noviembre, 23 días de Real: 1 al 23 nov). Proyección de noviembre $17.36M (ajustada el 10-nov por mantenimientos y subrogación; antes $17.95M) con el bloqueo de agenda de Metepec (16 al 20-nov) ya terminado. Octubre ya cerrado e incluido en "hist".
// Este archivo es el RESPALDO ESTÁTICO si el fetch en vivo (data-live.js) falla. Proyección central de ingresos = Base!F del Sheet
// (ritmo por día hábil ponderado con peso por recencia); Atenciones/Pacientes por curva de ritmo por sede; Consultas por ritmo (sin agenda).
// Highlights manuales. Ingresos, Atenciones, Pacientes, Servicios y Subrogación al 18-nov (cargos de vRepro; el Drive de Cargos llega al 31-oct).
// Consultas (primera vez), No Show y ranking de consultas actualizados al 18-nov (vRepro, Primera Vez Terminada / No Asiste). HubSpot (leads, citas, cohortes, mecanismos) también al 18-nov. Conversión (data_conv.js) se refresca por separado.
window.DATA = {
  "corte": "23-nov-2026",
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
      "actual": 13.5,
      "proy": 17.36,
      "vsLM": 5,
      "vsU3M": 9,
      "nota": "NOVIEMBRE AL CORTE DEL 23-NOV (17.63 de 23.25 días ponderados; Real = $13,502,023: CDMX $11.55M, Guadalajara $1.81M y Metepec $0.15M). Proyección $17.36M (rango $17.20M–$17.51M): +5% vs octubre ($16.47M) y +9% vs el promedio ago-oct. Método (igual que los cortes del 12, 16, 18 y 22-nov): Real + días ponderados restantes × ritmo base + cola de mantenimientos + subrogación restante. El ritmo base es 64% el de los primeros 23 días y 36% el promedio ago-oct (mezcla con k=10), SIN los almacenamientos/renovaciones de gametos (~$1.1M al mes, cobrados sobre todo al inicio) y SIN la subrogación. Cola de mantenimientos supuesta $0.35M (como octubre). Subrogación: Real $1.75M en 23 días (ya supera cualquier mes de 2026) + 50% del promedio ago-oct por los días restantes (+$0.15M; al 100% serían +$0.30M). Pesos de días: lun–vie 1, sáb 0.55, dom 0.07; lun 16-nov (feriado de la Revolución) 0.7; GDL sáb 14 = 0.25 y lun 16 = 0.1. Quedan 5.62 días ponderados (24 al 30-nov). Los cargos de GDL en días hábiles recientes fueron bajos (17-nov $57K, 18-nov $42K, 20-nov $43K y 23-nov $39K): si hubo captura tardía en vRepro, el Real de GDL subirá en el próximo corte. METEPEC: la agenda de la Dra. estuvo bloqueada del 16 al 20-nov (esos días pesan 0 en el ritmo); el bloqueo ya terminó, por lo que no se descuenta ningún día restante. Escenarios: bajo $17.20M (sin más subrogación) y alto $17.51M (subrogación restante al promedio completo)."
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
      "actual": 2610,
      "proy": 3489,
      "vsLM": 11,
      "vsU3M": 7,
      "nota": "Real al 23-nov: 2,610 líneas de cargo (CDMX 1,988, GDL 505, MTP 117; 170 son renovaciones de almacenamiento de gametos, concentradas en los primeros días). Proyección 3,489 (mezcla ritmo del mes / ritmo ago-oct con shrinkage k=10 SIN las líneas de almacenamiento + cola de líneas de almacenamiento por llegar): +11% vs octubre (3,147). Ingreso por atención proyectado ~$5.0K vs ~$5.2K en octubre (el Real trae paquetes de subrogación)."
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
      "actual": 863,
      "proy": 1161,
      "vsLM": 21,
      "vsU3M": 6,
      "nota": "Real al 23-nov: 863 pacientes únicos (CDMX 603, GDL 202, MTP 58; suma por sede). Proyección 1,161 = atenciones proyectadas × razón pacientes/atención por sede (CDMX 0.31, GDL 0.41, MTP 0.36): +21% vs octubre (962)."
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
      "real": 250,
      "agendado": 101,
      "proy": 351,
      "vsLM": 26,
      "vsU3M": 15,
      "nota": "Real al 23-nov: 250 consultas de primera vez terminadas (CDMX 142, GDL 84, MTP 24; grupo Primera Vez completo en vRepro). Proyección 351 con el modelo v2 (factor de llenado de agenda + flujo de deals): terminadas 250 + agenda pendiente 24–30 nov (CDMX 55, GDL 34, MTP 16 citas) × factor de llenado por horizonte (observado en los cortes 12, 16, 18 y 22-nov, incluye no show y agendamientos tardíos) ajustado por el flujo de citas nuevas de HubSpot (CDMX ×0.92, GDL ×1.05, MTP ×1.22). Piso 334 (agenda × show rate de CDMX 85%, GDL 77%, MTP 66%). Rango 340–364 (±12% del remanente, error observado en backtest). Backtest previo sobre las consultas de los días posteriores a los cortes 12, 16 y 18-nov: error medio 3.2 por sede vs 4.1 del modelo anterior y 5.6 de agenda × show rate. Referencia por ritmo histórico (MAPE 6.9%): 320. +26% vs octubre (278). No Show 20.4% (64 inasistencias únicas sobre 313 pacientes únicos de primera vez del 1 al 23-nov; GDL sin duplicados: 83 pacientes únicos y 24 inasistencias únicas; CDMX 26 y MTP 14). Los deals de HubSpot mantienen el ritmo: 14 citas nuevas por día (17–23 nov) vs 14.5 en 12–23 nov y 61 leads por día, sin aceleración ni caída."
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
      "actual": 20.4,
      "prom": 14.5,
      "deltaPts": 5.9
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
        "actual": 11.55,
        "proy": 14.74,
        "vsLM": 7,
        "vsU3M": 12,
        "nota": "Real al 23-nov $11.55M; proyección $14.74M (+7% vs octubre, $13.80M). Incluye subrogación proyectada $1.90M (Real $1.75M + 50% del promedio ago-oct del resto del mes)."
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
        "actual": 1988,
        "proy": 2629,
        "vsLM": 10,
        "vsU3M": 11
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
        "actual": 603,
        "proy": 814,
        "vsLM": 22,
        "vsU3M": 10
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
        "real": 142,
        "agendado": 53,
        "proy": 195,
        "vsLM": 34,
        "vsU3M": 37,
        "top_cat": "Consulta primera vez",
        "top_n": 126
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
        "actual": 15.5,
        "prom": 12.3,
        "deltaPts": 3.2
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
        "actual": 1.81,
        "proy": 2.37,
        "vsLM": 18,
        "vsU3M": 14,
        "nota": "Real al 23-nov $1.81M; proyección $2.37M (+18% vs octubre, $2.00M). Los cargos de los días hábiles 17, 18, 20 y 23-nov ($57K, $42K, $43K y $39K) fueron bajos: posible captura tardía."
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
        "actual": 505,
        "proy": 687,
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
        "actual": 202,
        "proy": 284,
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
        "real": 84,
        "agendado": 36,
        "proy": 120,
        "vsLM": 11,
        "vsU3M": -1,
        "top_cat": "Check up Ginecologico",
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
        "actual": 22.4,
        "prom": 15.6,
        "deltaPts": 6.8
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
        "actual": 0.145,
        "proy": 0.247,
        "vsLM": -63,
        "vsU3M": -63,
        "nota": "Real al 23-nov $145.1K (117 líneas de cargo); proyección $247K (-63% vs octubre, $666K). El bloqueo de agenda de la Dra. (16 al 20-nov) ya terminó: no se descuenta ningún día restante."
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
        "actual": 117,
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
        "agendado": 12,
        "proy": 36,
        "vsLM": 44,
        "vsU3M": -12,
        "top_cat": "Consulta primera vez",
        "top_n": 26
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
        "valor": 4.15,
        "vsLM": 15,
        "vsU3M": 5
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 3.55,
        "vsLM": 7,
        "vsU3M": 7
      },
      {
        "nombre": "Farmacia",
        "valor": 3.27,
        "vsLM": -7,
        "vsU3M": 4
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.69,
        "vsLM": -2,
        "vsU3M": 6
      },
      {
        "nombre": "Subrogación",
        "valor": 1.92,
        "vsLM": 21,
        "vsU3M": 46
      },
      {
        "nombre": "Donación",
        "valor": 0.73,
        "vsLM": -12,
        "vsU3M": 9
      },
      {
        "nombre": "Consultas",
        "valor": 0.49,
        "vsLM": 27,
        "vsU3M": 9
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.4,
        "vsLM": 30,
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
        "valor": 3.58,
        "vsLM": 16,
        "vsU3M": 8
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 2.88,
        "vsLM": 6,
        "vsU3M": 8
      },
      {
        "nombre": "Farmacia",
        "valor": 2.81,
        "vsLM": -2,
        "vsU3M": 8
      },
      {
        "nombre": "Laboratorio",
        "valor": 2.25,
        "vsLM": -7,
        "vsU3M": 8
      },
      {
        "nombre": "Subrogación",
        "valor": 1.9,
        "vsLM": 20,
        "vsU3M": 45
      },
      {
        "nombre": "Donación",
        "valor": 0.62,
        "vsLM": 6,
        "vsU3M": 8
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.33,
        "vsLM": 36,
        "vsU3M": 8
      },
      {
        "nombre": "Consultas",
        "valor": 0.24,
        "vsLM": 31,
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
        "vsLM": 169,
        "vsU3M": 8
      }
    ],
    "GDL": [
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.64,
        "vsLM": 9,
        "vsU3M": 12
      },
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.5,
        "vsLM": 189,
        "vsU3M": 20
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.4,
        "vsLM": 42,
        "vsU3M": 12
      },
      {
        "nombre": "Farmacia",
        "valor": 0.39,
        "vsLM": -10,
        "vsU3M": 12
      },
      {
        "nombre": "Consultas",
        "valor": 0.23,
        "vsLM": 22,
        "vsU3M": 12
      },
      {
        "nombre": "Donación",
        "valor": 0.11,
        "vsLM": -56,
        "vsU3M": 12
      },
      {
        "nombre": "Procedimientos / Quirúrgicos",
        "valor": 0.06,
        "vsLM": 4,
        "vsU3M": 12
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
        "vsLM": -14,
        "vsU3M": 12
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
        "vsU3M": 12
      }
    ],
    "MTP": [
      {
        "nombre": "Tratamientos FIV/ICSI",
        "valor": 0.08,
        "vsLM": -78,
        "vsU3M": -65
      },
      {
        "nombre": "Farmacia",
        "valor": 0.07,
        "vsLM": -66,
        "vsU3M": -65
      },
      {
        "nombre": "Laboratorio",
        "valor": 0.04,
        "vsLM": -28,
        "vsU3M": -62
      },
      {
        "nombre": "Congelación de Gametos",
        "valor": 0.03,
        "vsLM": 70,
        "vsU3M": -65
      },
      {
        "nombre": "Consultas",
        "valor": 0.02,
        "vsLM": 59,
        "vsU3M": -9
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
        "vsU3M": -65,
        "nuevo": true
      },
      {
        "nombre": "Wellness",
        "valor": 0.0,
        "vsLM": -70,
        "vsU3M": -65
      }
    ]
  },
  "highlights": {
    "total": [
      "Noviembre al corte del 23-nov: Real $13.50M (17.63 de 23.25 días ponderados). Proyección $17.36M (rango $17.20M–$17.51M): +5% vs octubre ($16.47M); el corte del 22-nov decía $17.10M. CDMX aporta 85% ($14.74M), Guadalajara 14% ($2.37M) y Metepec 1% ($0.25M).",
      "Metepec salió del bloqueo de agenda de la Dra. (16 al 20-nov): Real $0.15M y proyección $0.25M (Atenciones MTP 173, Pacientes 63). Sigue siendo la sede con mayor incertidumbre; la proyección ya no descuenta días de bloqueo.",
      "El lunes 23-nov se agregaron $0.82M (CDMX $0.78M, GDL $0.04M y MTP $0.01M), con subrogación sin cambios. Sin subrogación ni renovaciones de almacenamiento, el ritmo diario base de CDMX va en $504K por día ponderado vs $450K del promedio ago-oct. La subrogación del mes suma $1.75M en el Real.",
      "Por servicio (proyectado): Tratamientos FIV/ICSI $4.15M, Congelación de Gametos $3.55M, Farmacia $3.27M, Laboratorio $2.69M, Subrogación $1.92M. Subrogación $1.92M: $1.75M ya están en el Real y el resto es la mitad del promedio ago-oct. Donación ($0.73M proyectados) ahora es línea propia: antes estaba dentro de Tratamientos FIV/ICSI y Congelación; el total no cambia.",
      "Atenciones proyectadas 3,489 (+11% vs octubre) y Pacientes 1,161 (+21%). Consultas de primera vez al 23-nov: 250 reales y proyección 351 (+26% vs octubre, rango 340–364); No Show 20.4%. HubSpot (Interesa2) al 23-nov: 1,351 leads y 333 citas agendadas (25% de conversión vs 26% en octubre; sedes con GDL = Guadalajara + Puerto Vallarta + Sahuayo y CDMX = Ciudad de México + Benito Juárez: CDMX 32%, GDL 20%, MTP 22%)."
    ],
    "CDMX": [
      "CDMX lleva $11.55M al 23-nov y proyecta $14.74M (+7% vs octubre, +12% vs U3M): Tratamientos FIV/ICSI $3.58M, Congelación de Gametos $2.88M, Farmacia $2.81M, Laboratorio $2.25M, Subrogación $1.90M.",
      "1,988 atenciones y 603 pacientes al corte; proyección 2,629 atenciones (+10% vs octubre) y 814 pacientes (+22% vs octubre). Consultas de primera vez: 142 al corte, proyección 195 (+34% vs octubre); No Show 15.5%.",
      "HubSpot (Interesa2) al 23-nov (Ciudad de México + Benito Juárez): 583 leads y 186 citas agendadas (32% de conversión vs 30% en octubre, con 909 leads y 270 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "GDL": [
      "GDL lleva $1.81M al 23-nov y proyecta $2.37M (+18% vs octubre): Congelación de Gametos $0.64M, Tratamientos FIV/ICSI $0.50M, Laboratorio $0.40M, Farmacia $0.39M. Ojo: los cargos de los días hábiles 17, 18, 20 y 23-nov ($57K, $42K, $43K y $39K) fueron bajos; si fue captura tardía, el Real de GDL subirá.",
      "505 atenciones y 202 pacientes al corte; proyección 687 atenciones y 284 pacientes. Consultas de primera vez: 84 al corte, proyección 120 (+11% vs octubre); No Show 22.4%.",
      "HubSpot (Interesa2) al 23-nov (Guadalajara + Puerto Vallarta + Sahuayo): 486 leads y 99 citas agendadas (20% de conversión vs 23% en octubre, con 717 leads y 165 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
    ],
    "MTP": [
      "Metepec lleva $145.1K al 23-nov (117 líneas) y proyecta $247K (-63% vs octubre). La agenda de la Dra. estuvo bloqueada del 16 al 20-nov (ya terminó; no se descuenta nada); sigue siendo la sede con mayor incertidumbre (error de backtest ~30%).",
      "117 atenciones y 58 pacientes al corte; proyección 173 atenciones y 63 pacientes. Consultas de primera vez: 24 al corte, proyección 36 (+44% vs octubre); No Show 36.8%.",
      "HubSpot (Interesa2) al 23-nov: 83 leads y 18 citas agendadas (22% de conversión vs 34% en octubre, con 200 leads y 67 citas). El mes en curso es parcial: los deals recientes aún no completan su ventana para agendar."
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
        "valor": 44,
        "vsLM": 10
      },
      {
        "nombre": "Check up Ginecologico",
        "valor": 36,
        "vsLM": 9
      },
      {
        "nombre": "Check-up SOP",
        "valor": 29,
        "vsLM": -3
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 20,
        "vsLM": 25
      },
      {
        "nombre": "Check up Integral",
        "valor": 14,
        "vsLM": 0
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 14,
        "vsLM": 17
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 7,
        "vsLM": 40
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 5,
        "vsLM": 150
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 4,
        "vsLM": 300
      }
    ],
    "CDMX": [
      {
        "nombre": "Consulta primera vez",
        "valor": 126,
        "vsLM": 56
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 26,
        "vsLM": -4
      },
      {
        "nombre": "Consulta de Primera Vez IP's",
        "valor": 14,
        "vsLM": 17
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
        "nombre": "Fertility Check up Hombres",
        "valor": 4,
        "vsLM": 300
      },
      {
        "nombre": "Check-up SOP",
        "valor": 4,
        "vsLM": 33
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 3,
        "vsLM": 200
      },
      {
        "nombre": "Check up Integral",
        "valor": 2,
        "vsLM": -33
      }
    ],
    "GDL": [
      {
        "nombre": "Check up Ginecologico",
        "valor": 27,
        "vsLM": 8
      },
      {
        "nombre": "Check-up SOP",
        "valor": 24,
        "vsLM": -4
      },
      {
        "nombre": "Consulta primera vez",
        "valor": 21,
        "vsLM": 17
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 14,
        "vsLM": 17
      },
      {
        "nombre": "Check up Integral",
        "valor": 12,
        "vsLM": 9
      },
      {
        "nombre": "Fertility Check up Parejas",
        "valor": 8,
        "vsLM": 60
      },
      {
        "nombre": "Consulta ginecológica",
        "valor": 7,
        "vsLM": 40
      },
      {
        "nombre": "Consulta Obstetricia",
        "valor": 5,
        "vsLM": 0
      },
      {
        "nombre": "Fertility Check up Hombres",
        "valor": 1,
        "vsLM": 0
      },
      {
        "nombre": "Asesoria catalogos",
        "valor": 1,
        "vsLM": null,
        "nuevo": true
      }
    ],
    "MTP": [
      {
        "nombre": "Consulta primera vez",
        "valor": 26,
        "vsLM": 30
      },
      {
        "nombre": "Fertility Check up Mujeres",
        "valor": 4,
        "vsLM": 300
      },
      {
        "nombre": "Fertility Check up Parejas",
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
        832,
        1059,
        1020,
        999,
        1752,
        1435,
        1533,
        1921,
        2090,
        2052
      ],
      "actual": 1351
    },
    "citas": {
      "hist": [
        188,
        230,
        318,
        328,
        367,
        315,
        419,
        501,
        471,
        528
      ],
      "actual": 333
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
        23,
        26
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
          909,
          583,
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
          270,
          186,
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
          20,
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
          708,
          717,
          486,
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
          165,
          99,
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
          22,
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
          83,
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
          18,
          null
        ]
      }
    },
    "cohortes": [
      {
        "mes": "Ene-26",
        "leads": 832,
        "m0": 21,
        "m1": 1,
        "m2": 0,
        "sin": 78
      },
      {
        "mes": "Feb-26",
        "leads": 1059,
        "m0": 20,
        "m1": 2,
        "m2": 0,
        "sin": 78
      },
      {
        "mes": "Mar-26",
        "leads": 1020,
        "m0": 28,
        "m1": 1,
        "m2": 0,
        "sin": 71
      },
      {
        "mes": "Abr-26",
        "leads": 999,
        "m0": 31,
        "m1": 3,
        "m2": 0,
        "sin": 66
      },
      {
        "mes": "May-26",
        "leads": 1752,
        "m0": 19,
        "m1": 1,
        "m2": 1,
        "sin": 79
      },
      {
        "mes": "Jun-26",
        "leads": 1435,
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
        "leads": 1921,
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
        "leads": 1351,
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
