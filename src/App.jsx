import React, { useState, useEffect } from 'react';
import { PLATFORM_FEATURES } from './constants/features';
import FeatureCard from './components/FeatureCard';
import Button from './components/Button';
import Modal from './components/Modal';
import EmotionWheel from './components/EmotionWheel';

const REFLECTION_THEMES_BY_EMOTION = {
 agobio: {
    title: 'Agobio',
    color: '#B1D4E5',
    description: 'Es la sensación de estar desbordado cuando la cantidad de exigencias académicas (tareas, plazos, responsabilidades) supera lo que sientes que puedes manejar en el momento, generando una sensación de "no darte a abasto".',
    themes: {
      entregas_cruzadas: {
        title: 'Entregas cruzadas',
        message: 'Hola! Veo que has seleccionado que en estos momentos sientes agobio por tener varias entregas al mismo tiempo. Que todo se junte no significa que no puedas con ello, solo necesitas ordenar por dónde empezar y avanzar de a un paso. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        ),
        activities: [
          {
            title: 'Matriz de prioridades 4x4',
            time: '5 min',
            tool: 'Hoja / Plantilla de la app',
            objective: 'Organización y reducción del caos',
            steps: [
              'Abre una hoja o usa la plantilla dentro de la app y dibuja un cuadro dividido en 4 secciones: muy importante, importante, poco importante, nada importante.',
              'Escribe cada pendiente en un post-it o línea dentro del cuadrante que le corresponda.',
              'Empieza por el cuadrante muy importante: elige solo una tarea de ahí para comenzar de inmediato.',
              'Revisa el cuadrante nada importante: si algo puede eliminarse o posponerse sin consecuencia, táchalo.'
            ]
          },
          {
            title: 'Regla de los 2 minutos',
            time: '2 min',
            tool: 'Temporizador',
            objective: 'Liberar carga mental inmediata',
            steps: [
              'Mira tu lista de pendientes y busca tareas que sepas que toman menos de 2 minutos (responder un correo corto, subir un archivo, enviar un mensaje).',
              'Pon un temporizador de 2 minutos.',
              'Hazla de inmediato, sin pasarla a la lista de "pendientes importantes".',
              'Repite con la siguiente tarea corta que encuentres, hasta un máximo de 3 tareas seguidas para no perder el foco en lo grande.'
            ]
          },
          {
            title: 'Respiración 4-7-8',
            time: '3 min',
            tool: 'Ninguna',
            objective: 'Bajar la activación fisiológica',
            steps: [
              'Siéntate con la espalda recta y los pies apoyados en el piso.',
              'Inhala por la nariz contando mentalmente hasta 4.',
              'Sostén el aire contando hasta 7.',
              'Exhala lentamente por la boca contando hasta 8.',
              'Repite el ciclo 4 veces antes de comenzar a organizar tus entregas.'
            ]
          }
        ]
      },
      estudios_responsabilidades: {
        title: 'Estudios y otras responsabilidades',
        message: 'Hola! Veo que has seleccionado que sientes agobio por combinar tus estudios con otras responsabilidades. No es que te falte capacidad, es que tu tiempo también tiene límites, y está bien reconocerlo para organizarte mejor. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        activities: [
          {
            title: 'Time blocking simple',
            time: '10 min',
            tool: 'Calendario (papel o digital)',
            objective: 'Planificación visual equilibrada',
            steps: [
              'Toma tu calendario del día (papel o digital).',
              'Anota tus responsabilidades fijas primero (clases, trabajo, comidas).',
              'Asigna bloques de 45-60 minutos a cada actividad pendiente, dejando al menos un bloque de descanso entre tareas distintas.',
              'Escribe solo UNA tarea por bloque; si algo no cabe hoy, muévelo directamente a mañana en vez de amontonarlo.'
            ]
          },
          {
            title: 'Pomodoro adaptado 25/5',
            time: '30 min',
            tool: 'Temporizador',
            objective: 'Evitar la sensación de desborde',
            steps: [
              'Elige una sola tarea para este ciclo.',
              'Pon un temporizador de 25 minutos y trabaja solo en esa tarea, sin revisar el celular.',
              'Cuando suene la alarma, detente aunque no hayas terminado.',
              'Descansa 5 minutos completos: levántate, estira o toma agua (evita el celular en este descanso).',
              'Repite el ciclo si necesitas continuar.'
            ]
          },
          {
            title: 'Journaling de descarga',
            time: '5-7 min',
            tool: 'Hoja o libreta de notas',
            objective: 'Ganar perspectiva mental',
            steps: [
              'Consigue una hoja o abre una nota en blanco.',
              'Escribe todo lo que ronda tu cabeza sin filtrar ni ordenar: pendientes, preocupaciones, ideas sueltas.',
              'No te detengas a corregir ni organizar, solo saca todo durante el tiempo que dure el ejercicio.',
              'Al terminar, subraya 1 o 2 cosas que realmente requieran acción hoy; el resto puede quedar solo como descarga mental.'
            ]
          }
        ]
      },
      retomar_imprevisto: {
        title: 'Retomar tras un imprevisto',
        message: 'Hola! Veo que has seleccionado que sientes agobio por retomar tus actividades después de un imprevisto. No necesitas recuperar todo de golpe, solo enfocarte en el siguiente paso, sin exigirte volver al ritmo anterior de inmediato. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.27 15C20.25 18.25 17 21 12 21" />
          </svg>
        ),
        activities: [
          {
            title: 'Próximo paso mínimo',
            time: '2 min',
            tool: 'Ninguna',
            objective: 'Retomar el ritmo sin abrumarse',
            steps: [
              "Detente un momento y pregúntate: '¿cuál es la acción más pequeña que puedo hacer ahora mismo?'",
              'Escríbela en una sola línea, evitando pensar en todo lo que falta.',
              'Hazla de inmediato, sin planificar el resto del día todavía.',
              'Una vez hecha, decide si sigues con otro paso pequeño o haces una pausa.'
            ]
          },
          {
            title: 'Recalendarización del día',
            time: '8 min',
            tool: 'Calendario (Vista diaria)',
            objective: 'Evitar sobrecarga de planificación',
            steps: [
              'Abre solo la vista de HOY en tu calendario (no la semana completa).',
              'Marca qué actividades planificadas ya no son posibles por el imprevisto.',
              'Reordena únicamente las tareas de hoy, moviendo lo que no alcance a mañana.',
              'Deja como máximo 3 prioridades para el resto del día.'
            ]
          },
          {
            title: 'Frase de autocompasión',
            time: '1 min',
            tool: 'Ninguna',
            objective: 'Reducir la tensión y reencuadrar',
            steps: [
              'Haz una pausa y respira profundo una vez.',
              "Repite en voz alta o mentalmente: 'los imprevistos son parte del proceso, puedo ajustarme'.",
              'Nota si tu cuerpo baja un poco la tensión al decirlo.',
              'Continúa con tu próximo paso mínimo.'
            ]
          }
        ]
      }
    }
  },
  ansiedad: {
    title: 'Ansiedad',
    color: '#FCB995',
    description: 'Es la preocupación que sientes por no saber si podrás cumplir con tus propias expectativas. Aparece sobre todo antes de exámenes y está ligada a la duda sobre su propia capacidad.',
    themes: {
      semana_examenes: {
        title: 'Semana de exámenes',
        message: 'Hola! Veo que has seleccionado que sientes ansiedad por la semana de exámenes. Tu mente puede estar anticipando más de lo que realmente vas a enfrentar, y eso también se puede regular. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      },
      sustentacion_proyecto: {
        title: 'Sustentación de proyecto final',
        message: 'Hola! Veo que has seleccionado que sientes ansiedad por tu sustentación de algún proyecto final. La incertidumbre suele ser más grande que la situación en sí misma, sobre todo cuando ya te has preparado para ella. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        )
      },
      evaluaciones_sorpresa: {
        title: 'Evaluaciones sorpresa',
        message: 'Hola! Veo que has seleccionado que sientes ansiedad por una evaluación inesperada. No saber cuándo llegará el examen no significa que no estés preparado, tu estudio constante también cuenta. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        )
      }
    }
  },
  frustracion: {
    title: 'Frustración',
    color: '#C0F0BD',
    description: 'Es lo que sientes cuando algo te impide avanzar (mucha carga de tareas, poco tiempo) y percibes que ya no tienes control sobre la situación.',
    themes: {
      sobrecarga_tareas: {
        title: 'Sobrecarga de tareas',
        message: 'Hola! Veo que has seleccionado que sientes frustración por la carga de trabajos. Cuando todo se acumula, es normal sentir que pierdes el control del tiempo, pero eso puede reorganizarse paso a paso. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      },
      coordinacion_grupal: {
        title: 'Problemas de coordinación grupal',
        message: 'Hola! Veo que has seleccionado que sientes frustración por tu trabajo en equipo. Depender del ritmo de otros puede generar una sensación de impotencia, aunque no refleja lo que tú sí puedes aportar. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      bajo_rendimiento: {
        title: 'Bajo rendimiento pese al esfuerzo',
        message: 'Hola! Veo que has seleccionado que sientes frustración por tus resultados. El esfuerzo no siempre se refleja de inmediato en la nota, y eso no invalida el trabajo que ya hiciste. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        )
      }
    }
  },
  miedo_fracaso: {
    title: 'Miedo al fracaso',
    color: '#DA9FEE',
    description: 'Es la preocupación constante que sientes por fallar, ya sea decepcionando a otras personas o a ti mismo. Brindas demasiada importancia al resultado final.',
    themes: {
      curso_dificil: {
        title: 'Curso difícil',
        message: 'Hola! Veo que has seleccionado que sientes miedo al fracaso por un curso difícil. La fama de un curso no define lo que tú eres capaz de lograr en él, cada avance cuenta a tu favor. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      },
      presion_beca: {
        title: 'Presión familiar o por beca',
        message: 'Hola! Veo que has seleccionado que sientes miedo al fracaso por la presión de cumplir expectativas. Cargar con las expectativas de otros puede pesar más que el reto académico en sí, y mereces espacio para tus propios tiempos. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      presentacion_jurados: {
        title: 'Presentación ante jurados',
        message: 'Hola! Veo que has seleccionado que sientes miedo al fracaso por tu presentación final. Un jurado evalúa un momento puntual, no todo el esfuerzo y el aprendizaje que hay detrás de tu trabajo. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.553.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      }
    }
  },
  desesperanza: {
    title: 'Desesperanza',
    color: '#FF9389',
    description: 'Es sentir que ya no hay nada que hacer porque la situación académica supera lo que puedes manejar. Te genera una sensación de impotencia o de rendirte.',
    themes: {
      repetir_curso: {
        title: 'Repetir un curso',
        message: 'Hola! Veo que has seleccionado que sientes desesperanza por repetir un curso. Volver a intentarlo no es un retroceso, es otra oportunidad con más experiencia de la que tenías antes. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.27 15C20.25 18.25 17 21 12 21" />
          </svg>
        )
      },
      atraso_malla: {
        title: 'Atraso en la malla curricular',
        message: 'Hola! Veo que has seleccionado que sientes desesperanza por sentirte atrasado. Tu ritmo no tiene que compararse con el de los demás para tener valor, cada avance sigue siendo un avance. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      },
      esfuerzo_sin_resultados: {
        title: 'Esfuerzo sin resultados visibles',
        message: 'Hola! Veo que has seleccionado que sientes desesperanza por sentir que nada cambia. A veces los resultados tardan más en notarse de lo que esperamos, pero eso no significa que no estén ocurriendo. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 01-12.728 0m12.728 0L5.636 18.364m12.728-12.728L5.636 5.636m12.728 12.728a9 9 0 01-12.728 0" />
          </svg>
        )
      }
    }
  }
};

const MOOD_OPTIONS = [
  { label: 'Excelente', emoji: '😁', value: 'Exc' },
  { label: 'Bien', emoji: '😊', value: 'Bin' },
  { label: 'Regular', emoji: '😐', value: 'Reg' },
  { label: 'Mal', emoji: '😔', value: 'Mal' },
  { label: 'Crítico', emoji: '😫', value: 'Cri' },
];

const ACTIVITIES_BY_EMOTION = {
  agobio: {
    tiempo: '5 - 30 min',
    herramienta: 'Lápiz y papel / Cronómetro',
    objetivo: 'Organización y Enfoque',
    activities: [
      {
        title: 'Vaciado mental y priorización',
        description: 'Descarga todo lo pendiente fuera de tu mente, clasifica por urgencia y enfócate solo en lo que necesitas resolver hoy.',
        steps: [
          'Toma una hoja o abre una nota y escribe, sin orden, TODO lo que tienes pendiente (académico y no académico).',
          'Una vez que ya no se te ocurra nada más, revisa la lista completa.',
          'Marca con un color lo urgente (próximas 48 horas), con otro lo importante pero no urgente, y con otro lo que puede esperar.',
          'Elige únicamente las 2-3 tareas urgentes para hoy; el resto queda "guardado" en la lista, fuera de tu mente.',
          'Guarda la lista en un lugar visible para no tener que recordarla mentalmente.'
        ]
      },
      {
        title: 'Técnica de "una cosa a la vez"',
        description: 'Elimina las distracciones y trabaja en bloques enfocados de 25-30 minutos en una sola tarea.',
        steps: [
          'De tu lista priorizada, elige solo la primera tarea.',
          'Oculta o cierra todo lo demás (otras pestañas, apuntes de otros cursos, notificaciones del celular).',
          'Trabaja en esa única tarea durante 25-30 minutos (temporizador).',
          'Al sonar la alarma, tómate un descanso corto de 5 minutos antes de decidir si continúas con la misma tarea o pasas a la siguiente.',
          'Evita revisar la lista completa mientras trabajas; solo enfócate en el paso actual.'
        ]
      },
      {
        title: 'Pausa de "reseteo" sensorial',
        description: 'Un microdescanso de 3 a 5 minutos para estirar, respirar y reajustar tu atención antes de continuar.',
        steps: [
          'Detente por completo durante 3-5 minutos, aunque sientas que "no tienes tiempo".',
          'Cierra los ojos y respira profundamente 5 veces.',
          'Estira el cuerpo (cuello, hombros, espalda) lentamente.',
          'Bebe un vaso de agua con calma, prestando atención a la sensación.',
          'Antes de retomar, recuerda cuál es la única tarea siguiente (no todas las pendientes).'
        ]
      }
    ]
  },
  ansiedad: {
    tiempo: '2 - 5 min',
    herramienta: 'Ninguna / Cuaderno',
    objetivo: 'Calma física y mental',
    activities: [
      {
        title: 'Grounding 5-4-3-2-1',
        description: 'Ejercicio de atención plena para anclarte en el presente conectando con tus 5 sentidos.',
        steps: [
          'Observa a tu alrededor y nombra (en voz alta o mentalmente) 5 cosas que puedes ver.',
          'Identifica 4 cosas que puedes tocar y detente en la textura de cada una.',
          'Escucha con atención y reconoce 3 sonidos distintos en tu entorno.',
          'Reconoce 2 olores (si no hay ninguno presente, piensa en dos que te gusten).',
          'Identifica 1 sabor que puedas percibir en tu boca en ese momento (o recuerda uno agradable).',
          'Al terminar, respira profundo una vez más y continúa con tu actividad.'
        ]
      },
      {
        title: 'Descarga cognitiva escrita',
        description: 'Saca todas tus preocupaciones al papel y sepáralas entre las que puedes accionar y las que debes soltar.',
        steps: [
          'Toma una hoja o abre una nota en el celular.',
          'Escribe, sin filtrar, todas las preocupaciones que tengas en ese momento (una por línea).',
          'Al lado de cada preocupación, escribe una acción concreta que puedas hacer al respecto (aunque sea pequeña).',
          'Si alguna preocupación no tiene acción posible ahora, escribe "no depende de mí en este momento" y déjala ahí.',
          'Guarda o rompe la hoja como símbolo de haber "soltado" esas ideas de tu mente.'
        ]
      },
      {
        title: 'Respiración 4-7-8',
        description: 'Técnica de control de respiración que calma el sistema nervioso en menos de dos minutos.',
        steps: [
          'Siéntate cómodamente con la espalda recta.',
          'Coloca la punta de la lengua detrás de los dientes superiores (opcional, técnica original).',
          'Exhala completamente el aire por la boca.',
          'Inhala por la nariz contando hasta 4.',
          'Sostén el aire contando hasta 7.',
          'Exhala por la boca, haciendo un sonido suave, contando hasta 8.',
          'Repite el ciclo 4 veces.'
        ]
      }
    ]
  },
  frustracion: {
    tiempo: '5 - 10 min',
    herramienta: 'Ninguna / Espacio físico',
    objetivo: 'Resetear el humor y romper el bloqueo',
    activities: [
      {
        title: 'Pausa activa de 5-10 minutos',
        description: 'Aléjate temporalmente de la pantalla o apuntes para reducir la tensión física y mental sin usar el celular.',
        steps: [
          'En cuanto notes la frustración (tensión, ganas de abandonar la tarea), detente por completo.',
          'Aléjate físicamente del lugar de estudio si es posible.',
          'Haz algo distinto por unos minutos: caminar, tomar agua, mirar por la ventana.',
          'Evita revisar el celular o redes sociales durante la pausa, ya que no ayuda a bajar la activación.',
          'Antes de volver, respira profundo 3 veces y pregúntate: "¿con qué parte más pequeña puedo empezar de nuevo?"'
        ]
      },
      {
        title: 'Reformulación escrita del problema',
        description: 'Identifica con precisión qué te frustra y aíslate únicamente en la pequeña parte que sí puedes controlar.',
        steps: [
          'Escribe en una hoja: "¿Qué es exactamente lo que me está frustrando?"',
          'Debajo, escribe: "¿Qué de esto puedo controlar ahora mismo?" y "¿Qué no depende de mí?"',
          'Marca con un color lo que sí puedes controlar.',
          'Elige solo una acción de esa lista para hacer a continuación (no todas a la vez).',
          'Empieza únicamente por esa acción.'
        ]
      },
      {
        title: 'Relajación muscular progresiva (versión breve)',
        description: 'Libera la tensión acumulada en el cuerpo tensando y soltando diferentes grupos musculares de golpe.',
        steps: [
          'Siéntate o acuéstate en un lugar tranquilo.',
          'Tensa los músculos de las manos (haz puños) durante 5 segundos y suelta de golpe.',
          'Repite con los brazos, luego los hombros (súbelos hacia las orejas), luego el rostro (frunce todo).',
          'Continúa con el abdomen y las piernas, tensando y soltando cada grupo.',
          'Al terminar, queda unos segundos notando la diferencia entre tensión y relajación.'
        ]
      }
    ]
  },
  miedo_fracaso: {
    tiempo: '5 min',
    herramienta: 'Notas digitales o papel',
    objetivo: 'Autoconfianza y Realismo',
    activities: [
      {
        title: 'Registro de logros',
        description: 'Un recordatorio objetivo de tus capacidades mediante el registro de 3 cosas que hiciste bien en el día.',
        steps: [
          'Al final del día o la semana, toma una libreta o nota digital.',
          'Escribe 3 cosas concretas que hiciste bien, por pequeñas que parezcan (ej. "entregué el avance a tiempo").',
          'Evita minimizarlas con frases como "pero pude hacerlo mejor".',
          'Relee la lista antes de una evaluación importante, como recordatorio de tu capacidad.'
        ]
      },
      {
        title: 'Diálogo interno correctivo',
        description: 'Desafía los pensamientos negativos catastrofistas y cámbialos por interpretaciones realistas y objetivas.',
        steps: [
          'Identifica el pensamiento negativo exacto (ej. "si fallo, voy a decepcionar a todos").',
          'Pregúntate: "¿esto es un hecho o una interpretación?"',
          'Busca una evidencia en contra (ej. "ya he aprobado otros retos similares antes").',
          'Reformula el pensamiento de forma más realista (ej. "voy a hacer mi mejor esfuerzo; el resultado no define todo mi valor").',
          'Repite la nueva frase un par de veces antes de la tarea.'
        ]
      },
      {
        title: 'Definir el "éxito mínimo aceptable"',
        description: 'Reduce la presión del perfeccionismo definiendo un resultado suficiente como meta real para hoy.',
        steps: [
          'Antes de la tarea, escribe cuál sería el resultado ideal.',
          'Luego escribe cuál sería un resultado "suficiente" o aceptable, aunque no sea perfecto.',
          'Enfócate en ese segundo objetivo como meta real para hoy.',
          'Al terminar, evalúa tu desempeño según esa meta mínima, no según la ideal.'
        ]
      }
    ]
  },
  desesperanza: {
    tiempo: '5 - 10 min',
    herramienta: 'Teléfono / Notas',
    objetivo: 'Activación conductual y Red de apoyo',
    activities: [
      {
        title: 'Dividir la tarea en pasos pequeños',
        description: 'Convierte un objetivo gigante y abrumador en 4 o 5 microtareas fáciles de digerir.',
        steps: [
          'Escribe la tarea completa que sientes abrumadora.',
          'Divídela en 4 o 5 pasos pequeños y concretos.',
          'Tapa o ignora mentalmente todos los pasos excepto el primero.',
          'Enfócate solo en completar ese primer paso, sin pensar en los demás todavía.',
          'Al terminarlo, recién mira el siguiente paso.'
        ]
      },
      {
        title: 'Buscar apoyo social o académico',
        description: 'Guía rápida para comunicarte con personas de confianza o servicios universitarios en menos de 24 horas.',
        steps: [
          'Identifica a una persona de confianza (compañero, tutor, familiar o docente) o un servicio de la universidad (bienestar estudiantil).',
          'Escribe brevemente qué te gustaría contarle o preguntarle.',
          'Contacta a esa persona o servicio en las próximas 24 horas (no lo postergues más).',
          'Durante la conversación, enfócate en describir la situación concreta, no solo en cómo te sientes.'
        ]
      },
      {
        title: 'Ejercicio de logros pasados',
        description: 'Recuerda tus herramientas y estrategias de éxito previas para aplicarlas a la dificultad actual.',
        steps: [
          'Recuerda una situación académica difícil que hayas superado antes (un curso complicado, un examen que temías).',
          'Escribe cómo la enfrentaste y qué recursos usaste (organización, ayuda de otros, constancia).',
          'Identifica qué de eso puedes aplicar a la situación actual.',
          'Cierra el ejercicio con la frase: "si lo logré antes, tengo recursos para intentarlo de nuevo".'
        ]
      }
    ]
  }
};

// Estructura de Datos para las preguntas frecuentes de image_8072b1.jpg
const FAQ_ITEMS = [
  {
    id: 'anonimo',
    question: '¿Mis respuestas son anónimas?',
    answer: 'Sí, absolutamente. Toda la información y autoevaluaciones que realizas se procesan de forma local en tu navegador. MindCampus no almacena ni comparte tus respuestas con terceros o entidades universitarias.'
  },
  {
    id: 'psicologo',
    question: '¿Esto reemplaza a un psicólogo?',
    answer: 'No. Esta plataforma es una herramienta de apoyo, primer contacto y gestión de autoconocimiento emocional. No sustituye de ninguna manera un tratamiento, terapia clínica o el diagnóstico de un profesional de la salud mental.'
  },
  {
    id: 'costo',
    question: '¿Tiene algún costo?',
    answer: 'No, la plataforma es 100% gratuita y de acceso libre para la comunidad estudiantil como parte de las iniciativas de bienestar universitario.'
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('welcome');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('entregas_cruzadas');
  const [currentView, setCurrentView] = useState('inicio');
  const [unlockedFeatures, setUnlockedFeatures] = useState(false);

  const [todayMood, setTodayMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const [activeActivity, setActiveActivity] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Estado para controlar qué acordeón de FAQ está expandido
  const [openFaq, setOpenFaq] = useState(null);

  // Estados para el formulario de sugerencias
  const [feedbackForm, setFeedbackForm] = useState({ name: '', career: '', message: '' });

  // local
  const STORAGE_KEY = "mindcampus-data";
  const loadData = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const saveData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };


  const getThemeKey = (emotionName) => {
    if (!emotionName) return 'agobio';
    if (emotionName === 'Miedo al fracaso') return 'miedo_fracaso';
    return emotionName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'inicio';

      if ((hash === 'actividades' || hash === 'registro') && !unlockedFeatures) {
        window.location.hash = 'inicio';
        setCurrentView('inicio');
      } else {
        setCurrentView(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [unlockedFeatures]);

  useEffect(() => {
    const data = loadData();

    if (!data) return;

    setTodayMood(data.todayMood || null);
    setMoodHistory(data.moodHistory || []);
    setUnlockedFeatures(data.unlockedFeatures || false);
    setSelectedEmotion(data.selectedEmotion || null);
    setSelectedTheme(data.selectedTheme || "entregas_cruzadas");
  }, []);

  useEffect(() => {
    saveData({
      todayMood,
      moodHistory,
      unlockedFeatures,
      selectedEmotion,
      selectedTheme
    });
  }, [
    todayMood,
    moodHistory,
    unlockedFeatures,
    selectedEmotion,
    selectedTheme
  ]);


  const openModal = () => {
    setModalStep('welcome');
    setIsModalOpen(true);
  };

  const closeModal = (keepSelection = false) => {
    setIsModalOpen(false);
    if (!keepSelection) {
      setSelectedEmotion(null);
      setSelectedTheme('entregas_cruzadas');
    }
  };

  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleConfirmEmotion = () => {
    if (selectedEmotion) {
      const emotionKey = getThemeKey(selectedEmotion);
      const emotionData = REFLECTION_THEMES_BY_EMOTION[emotionKey];
      if (emotionData && emotionData.themes) {
        const firstThemeKey = Object.keys(emotionData.themes)[0];
        setSelectedTheme(firstThemeKey);
      }
    }
    setModalStep('reflection');
  };

  const handleFinishReflection = () => {
    setUnlockedFeatures(true);
    closeModal(true);
    setTimeout(() => {
      window.location.hash = 'actividades';
    }, 50);
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback enviado:', feedbackForm);
    alert('¡Gracias por tus comentarios! Nos ayudan a mejorar MindCampus.');
    setFeedbackForm({ name: '', career: '', message: '' });
  };

  const currentEmotionKey = getThemeKey(selectedEmotion);
  const currentEmotionData = REFLECTION_THEMES_BY_EMOTION[currentEmotionKey] || REFLECTION_THEMES_BY_EMOTION['agobio'];
  const themesToDisplay = currentEmotionData.themes;
  const activeThemeData = themesToDisplay[selectedTheme] || Object.values(themesToDisplay)[0];
  const currentActivitiesData = ACTIVITIES_BY_EMOTION[currentEmotionKey] || ACTIVITIES_BY_EMOTION['agobio'];

  const moodToY = {
    Exc: 40,
    Bin: 75,
    Reg: 110,
    Mal: 145,
    Cri: 180,
  };

  const dayFormatter = new Intl.DateTimeFormat("es-PE", {
    weekday: "short",
  });

  const visibleHistory = [...moodHistory]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7);

  const points = visibleHistory
    .map((item, index) => `${55 + index * 60},${moodToY[item.mood]}`)
    .join(" ");



  return (
    <div className="min-h-screen bg-[#f3f3f3] text-neutral-800 font-sans p-4 md:p-8 flex flex-col justify-between antialiased">

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto bg-white border-2 border-black px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 font-bold tracking-wider text-lg uppercase select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className="w-9 h-10 text-black"
            fill="none"
          >
            {/* LADO IZQUIERDO: CEREBRO */}
            <g stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 230,90 C 180,90 140,120 140,170 C 100,180 90,230 100,270 C 90,320 120,370 160,390 C 160,420 200,450 240,430" />
              <path d="M 230,140 C 190,140 180,180 200,200" />
              <path d="M 150,220 C 150,180 190,180 210,210" />
              <path d="M 180,250 C 140,260 160,310 200,300" />
              <path d="M 230,260 C 200,260 190,290 220,320" />
              <path d="M 155,330 C 135,360 185,410 210,370" />
              <path d="M 215,350 C 195,380 230,410 235,370" />

              {/* Eje central */}
              <path d="M 245,110 L 245,150" strokeWidth="10" />
              <path d="M 245,210 L 245,240" strokeWidth="10" />
              <path d="M 245,300 L 245,340" strokeWidth="10" />
            </g>

            {/* LADO DERECHO: ENJAMBRE DE MARIPOSAS */}
            <g fill="currentColor">
              {/* 1. Mariposas Grandes */}
              <g transform="translate(260, 350) rotate(-10) scale(1.4)">
                <path d="M18,22 Q15,10 10,5 M19,22 Q22,10 27,5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="18.5" cy="25" rx="2" ry="7" />
                <path d="M17,23 C10,15 -5,10 2,30 C6,42 14,35 17,27" />
                <path d="M17,27 C10,32 2,38 8,46 C14,52 18,40 17,31" />
                <path d="M20,23 C27,15 42,10 35,30 C31,42 23,35 20,27" />
                <path d="M20,27 C27,32 35,38 29,46 C23,52 19,40 20,31" />
              </g>

              <g transform="translate(320, 240) rotate(15) scale(1.1)">
                <path d="M18,22 Q14,11 8,7 M19,22 Q23,11 29,7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="18.5" cy="25" rx="1.8" ry="6" />
                <path d="M17,23 C11,16 -3,11 3,29 C7,40 14,34 17,26 M17,26 C11,31 4,37 9,44 C14,50 18,39 17,30" />
                <path d="M20,23 C26,16 40,11 34,29 C30,40 23,34 20,26 M20,26 C26,31 33,37 28,44 C23,50 19,39 20,30" />
              </g>

              <g transform="translate(370, 260) rotate(-5) scale(1.05)">
                <ellipse cx="18.5" cy="25" rx="1.7" ry="5.5" />
                <path d="M17,23 C11,16 -3,11 3,29 C7,40 14,34 17,26 M17,26 C11,31 4,37 9,44 C14,50 18,39 17,30" />
                <path d="M20,23 C26,16 40,11 34,29 C30,40 23,34 20,26 M20,26 C26,31 33,37 28,44 C23,50 19,39 20,30" />
              </g>

              <g transform="translate(340, 130) rotate(-25) scale(0.95)">
                <path d="M18,22 Q14,11 8,7 M19,22 Q23,11 29,7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <ellipse cx="18.5" cy="25" rx="1.5" ry="5" />
                <path d="M17,23 C11,15 -4,9 2,28 C6,39 14,33 17,25 M17,25 C11,30 3,36 8,43 C13,49 17,38 17,29" />
                <path d="M20,23 C26,15 41,9 35,28 C31,39 23,33 20,25 M20,25 C26,30 34,36 29,43 C24,49 20,38 20,29" />
              </g>

              {/* 2. Mariposas Medianas */}
              <g transform="translate(410, 195) rotate(35) scale(0.8)">
                <ellipse cx="18.5" cy="25" rx="1.5" ry="5" />
                <path d="M17,23 C11,15 -4,9 2,28 C6,39 14,33 17,25 M17,25 C11,30 3,36 8,43 C13,49 17,38 17,29" />
                <path d="M20,23 C26,15 41,9 35,28 C31,39 23,33 20,25 M20,25 C26,30 34,36 29,43 C24,49 20,38 20,29" />
              </g>

              <g transform="translate(295, 120) rotate(-15) scale(0.75)">
                <ellipse cx="18.5" cy="25" rx="1.3" ry="4.5" />
                <path d="M17,23 C11,15 -4,9 2,28 C6,39 14,33 17,25 M17,25 C11,30 3,36 8,43" />
                <path d="M20,23 C26,15 41,9 35,28 C31,39 23,33 20,25 M20,25 C26,30 34,36 29,43" />
              </g>

              <g transform="translate(275, 260) rotate(-45) scale(0.75)">
                <path d="M17,23 C11,15 -4,9 2,28 C6,39 14,33 17,25 M20,23 C26,15 41,9 35,28 C31,39 23,33 20,25" />
              </g>

              {/* 3. Siluetas de Transición */}
              <g transform="translate(285, 190) rotate(-40) scale(0.68)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(345, 195) rotate(10) scale(0.65)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(320, 70) rotate(-15) scale(0.55)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(435, 145) rotate(20) scale(0.52)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(430, 245) rotate(45) scale(0.55)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(390, 320) rotate(10) scale(0.6)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(290, 325) rotate(-20) scale(0.5)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(370, 45) rotate(-50) scale(0.42)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>

              {/* 4. Estela de Micro-partículas */}
              <path d="M395,35 L401,31 L403,37 L399,39 Z" />
              <path d="M420,55 L424,50 L428,54 L423,58 Z" />
              <path d="M455,95 L462,92 L461,99 L454,98 Z" />
              <path d="M465,120 L469,115 L472,121 L467,123 Z" />
              <path d="M360,95 L364,91 L367,96 L362,98 Z" />
              <path d="M395,115 L399,110 L402,116 L397,118 Z" />
              <path d="M340,180 L345,176 L347,182 L341,184 Z" />
              <path d="M380,165 L384,160 L387,166 L382,168 Z" />
              <path d="M460,180 L465,176 L468,181 L462,183 Z" />
              <path d="M450,225 L456,221 L458,227 L451,229 Z" />
              <path d="M425,295 L429,290 L432,296 L427,298 Z" />
            </g>
          </svg>
          MINDCAMPUS
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-500">
          <a href="#inicio" className={`pb-0.5 transition-all ${currentView === 'inicio' ? 'text-black border-b-2 border-black' : 'hover:text-black'}`}>INICIO</a>

          {unlockedFeatures && (
            <>
              <a href="#actividades" className={`pb-0.5 transition-all ${currentView === 'actividades' ? 'text-black border-b-2 border-black' : 'hover:text-black'}`}>ACTIVIDADES</a>
              <a href="#registro" className={`pb-0.5 transition-all ${currentView === 'registro' ? 'text-black border-b-2 border-black' : 'hover:text-black'}`}>REGISTRO</a>
            </>
          )}

          <a href="#ayuda" className={`pb-0.5 transition-all ${currentView === 'ayuda' ? 'text-black border-b-2 border-black' : 'hover:text-black'}`}>AYUDA</a>
        </nav>
      </header>

      {/* Main Content Areas */}
      <main className="w-full max-w-7xl mx-auto flex-1 relative mb-8">

        {/* VISTA: INICIO */}
        {currentView === 'inicio' && (
          <div className="border-2 border-neutral-300 p-6 md:p-12 lg:p-16 flex items-center bg-[#fdfdfd]/40 rounded-sm relative w-full h-full">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              <div className="lg:col-span-7 space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
                  Tu espacio seguro <br /> de gestión <br /> emocional
                </h1>
                <p className="text-neutral-500 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                  Una plataforma web diseñada exclusivamente para universitarios. Totalmente gratuita, instantánea, confidencial y sin necesidad de descargas.
                </p>
                <div className="pt-2">
                  <Button variant="primary" onClick={openModal}>
                    EVALUAR CÓMO ME SIENTO HOY <span className="text-base font-normal -mt-0.5">→</span>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PLATFORM_FEATURES.map((feature) => (
                  <div key={feature.id} className="p-6 border rounded-2xl flex flex-col gap-4">
                    {/* Contenedor del ícono con el fondo de color redondo */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${feature.bgColor}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <p className="text-sm text-neutral-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VISTA: ACTIVIDADES */}
        {currentView === 'actividades' && unlockedFeatures && (
          <div className="space-y-8 py-4 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
                Actividades sugeridas para ti
              </h1>
              <p className="text-xs text-neutral-500 font-medium">Recomendaciones personalizadas basadas en tu autoevaluación actual.</p>
            </div>

            {/* Ficha de Enfoque */}
            <div className="bg-white border-2 border-black p-5 md:p-6 rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Estado de Ánimo</span>
                <span className="text-sm font-black text-black uppercase">{currentEmotionData.title}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Tiempo Estimado</span>
                <span className="text-sm font-bold text-neutral-700">{currentActivitiesData.tiempo}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Herramienta</span>
                <span className="text-sm font-bold text-neutral-700">{currentActivitiesData.herramienta}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Objetivo Principal</span>
                <span className="text-sm font-bold text-neutral-700">{currentActivitiesData.objetivo}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentActivitiesData.activities.map((act, index) => (
                <div key={index} className="bg-white border-2 border-neutral-300 p-6 flex flex-col justify-between min-h-[300px] rounded-sm relative group hover:border-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                  <div className="space-y-4">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-black">{index + 1}</div>
                    <h3 className="font-black text-sm uppercase tracking-wider text-black">{act.title}</h3>
                    <p className="text-neutral-500 text-xs font-medium leading-relaxed">{act.description}</p>
                  </div>
                  <button
                    onClick={() => setActiveActivity(act)}
                    className="w-full mt-8 bg-black text-white text-xs font-bold uppercase py-3 rounded-full flex items-center justify-center gap-2 hover:bg-neutral-900 transition-colors active:scale-[0.98]"
                  >
                    <span>➤</span> Iniciar Guía
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA: REGISTRO */}
        {currentView === 'registro' && unlockedFeatures && (
          <div className="space-y-8 py-4 animate-in fade-in duration-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
              Mi registro personal
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-6 bg-white border-2 border-neutral-300 p-6 md:p-8 rounded-sm relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)]">
                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-extrabold text-neutral-900">¿Como valoras tu día?</h3>
                  <p className="text-neutral-400 text-xs font-medium">Añade tu estado de hoy para ver tu evolución en tiempo real.</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {MOOD_OPTIONS.map((mood) => {
                    const isSelected = todayMood === mood.value;
                    return (
                      <button
                        key={mood.value}
                        onClick={() => {

                          const today = new Date().toISOString().split("T")[0];

                          let history = [...moodHistory];

                          const index = history.findIndex(item => item.date === today);

                          if (index >= 0) {

                            history[index].mood = mood.value;

                          } else {

                            history.push({
                              date: today,
                              mood: mood.value
                            });

                          }

                          setMoodHistory(history);
                          setTodayMood(mood.value);

                        }}
                        className={`flex flex-col items-center justify-center p-4 border-2 border-black rounded-2xl transition-all duration-150 ${isSelected ? 'bg-black text-white scale-[0.98]' : 'bg-white text-neutral-800 hover:bg-neutral-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                          }`}
                      >
                        <span className="text-3xl mb-2 select-none">{mood.emoji}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wide">{mood.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-6 bg-white border-2 border-neutral-300 p-6 md:p-8 rounded-[2rem] space-y-6">

                <div>
                  <h3 className="text-lg font-extrabold text-neutral-900">
                    Mi historial emocional
                  </h3>

                  <p className="text-xs text-neutral-400 font-medium">
                    Tu progreso se construye con cada registro diario.
                  </p>
                </div>

                {visibleHistory.length === 0 ? (

                  <div className="flex flex-col items-center justify-center py-20 text-center">

                    <div className="text-6xl mb-4">
                      😊
                    </div>

                    <h4 className="font-bold text-neutral-800">
                      Aún no tienes registros
                    </h4>

                    <p className="text-xs text-neutral-500 mt-2">
                      Registra cómo te sientes hoy para comenzar tu historial.
                    </p>

                  </div>

                ) : (

                  <div className="w-full overflow-x-auto">

                    <svg
                      viewBox="0 0 500 220"
                      className="w-full min-w-[400px] h-auto"
                    >

                      {[40, 75, 110, 145, 180].map((y, index) => (
                        <line
                          key={index}
                          x1="45"
                          y1={y}
                          x2="475"
                          y2={y}
                          stroke="#e5e5e5"
                          strokeWidth="1"
                        />
                      ))}

                      <text x="15" y="44" className="text-[11px] font-bold fill-neutral-400">Exc</text>
                      <text x="15" y="79" className="text-[11px] font-bold fill-neutral-400">Bin</text>
                      <text x="15" y="114" className="text-[11px] font-bold fill-neutral-400">Reg</text>
                      <text x="15" y="149" className="text-[11px] font-bold fill-neutral-400">Mal</text>
                      <text x="15" y="184" className="text-[11px] font-bold fill-neutral-400">Cri</text>

                      {visibleHistory.length > 1 && (
                        <polyline
                          fill="none"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points}
                        />
                      )}

                      {visibleHistory.map((item, index) => {

                        const x = 55 + (index * 60);
                        const y = moodToY[item.mood];

                        return (
                          <g key={item.date}>

                            <circle
                              cx={x}
                              cy={y}
                              r="5"
                              fill="#000"
                            />

                            <text
                              x={x}
                              y="205"
                              textAnchor="middle"
                              className="text-[10px] font-bold fill-neutral-400 uppercase"
                            >
                              {dayFormatter.format(new Date(item.date))}
                            </text>

                          </g>
                        )

                      })}

                    </svg>

                  </div>

                )}

              </div>
            </div>
          </div>
        )}

        {/* VISTA: AYUDA (Fiel a la estructura e interactividad de image_8072b1.jpg) */}
        {currentView === 'ayuda' && (
          <div className="space-y-8 py-4 animate-in fade-in duration-200">
            {/* Título Principal */}
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
              Soporte y preguntas frecuentes
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">

              {/* Bloque Izquierdo: Acordeón de FAQs Neo-brutalistas */}
              <div className="lg:col-span-6 border-2 border-neutral-300 bg-white p-6 md:p-8 rounded-sm relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.01)] min-h-[340px]">
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black"></div>
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black"></div>

                <div className="flex flex-col gap-4">
                  {FAQ_ITEMS.map((item) => {
                    const isOpen = openFaq === item.id;
                    return (
                      <div key={item.id} className="w-full transition-all duration-200">
                        <button
                          onClick={() => toggleFaq(item.id)}
                          className="w-full bg-black text-white px-6 py-4 rounded-full flex items-center justify-between text-left font-bold transition-transform active:scale-[0.99]"
                        >
                          <span className="text-xs md:text-sm uppercase tracking-wide">{item.question}</span>
                          <svg
                            className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Contenido colapsable */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                            }`}
                        >
                          <div className="px-6 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs font-medium text-neutral-600 leading-relaxed shadow-sm">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bloque Derecho: Formulario Premium de Sugerencia */}
              <div className="lg:col-span-6 bg-[#e9e9e9]/70 border-2 border-neutral-300 p-6 md:p-8 rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="flex items-center gap-2.5 text-neutral-900 font-extrabold text-sm uppercase tracking-wide mb-2">
                    <svg className="w-4 h-4 text-black transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Envianos un mensaje de sugerencia
                  </div>

                  {/* Fila de Inputs: Nombre y Carrera */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                      className="w-full bg-[#f4f4f4] border border-neutral-400 rounded-full px-5 py-2.5 text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Tu carrera"
                      required
                      value={feedbackForm.career}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, career: e.target.value })}
                      className="w-full bg-[#f4f4f4] border border-neutral-400 rounded-full px-5 py-2.5 text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Cuadro de Mensaje */}
                  <div>
                    <textarea
                      rows="4"
                      placeholder="¿Como crees que podemos mejorar MindCampus?"
                      required
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                      className="w-full bg-[#f4f4f4] border border-neutral-400 rounded-3xl px-5 py-4 text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black resize-none transition-colors"
                    ></textarea>
                  </div>

                  {/* Botón de Envío */}
                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-900 text-white text-xs font-bold uppercase py-3.5 rounded-full tracking-wider transition-colors shadow-sm active:scale-[0.995]"
                  >
                    Enviar Comentarios
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
        <div>@MINDCAMPUS</div>
        <div>PAGE 1</div>
      </footer>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalStep === 'welcome' && (
          <div className="space-y-4 max-w-md mx-auto py-4">
            <h2 className="text-xl font-extrabold text-neutral-900 uppercase tracking-tight">¿Cómo te sientes hoy?</h2>
            <p className="text-xs text-neutral-500 leading-relaxed font-medium">Selecciona una opción para iniciar tu autoevaluación guiada.</p>
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="primary" onClick={() => setModalStep('wheel')}>Iniciar Rueda Interactiva</Button>
              <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
            </div>
          </div>
        )}

        {modalStep === 'wheel' && (
          <div className="relative border-2 border-neutral-200 p-6 md:p-10 flex items-center justify-center bg-white rounded-xl">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
              <div className="lg:col-span-6 flex justify-center items-center relative py-4">
                <EmotionWheel onSelectEmotion={handleSelectEmotion} selectedEmotion={selectedEmotion} />
              </div>
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">¿Cómo me <br className="hidden lg:block" /> siento hoy?</h2>
                  <p className="text-neutral-500 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto lg:mx-0">Haz click en la rueda emocional para descubrir cómo procesar ese sentimiento.</p>
                </div>
                {selectedEmotion && (
                  <div className="p-4 border-2 border-black bg-neutral-50 rounded-2xl animate-in slide-in-from-bottom-2 duration-200">
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Has seleccionado</p>
                    <p className="text-lg font-black text-black uppercase tracking-tight mb-2">{selectedEmotion}</p>
                    <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-4">
                      {REFLECTION_THEMES_BY_EMOTION[getThemeKey(selectedEmotion)]?.description}
                    </p>
                    <div className="mt-3 flex gap-2 justify-center lg:justify-start">
                      <Button variant="primary" className="py-2 px-4 text-[10px]" onClick={handleConfirmEmotion}>
                        Confirmar y Continuar
                      </Button>
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <button onClick={() => setModalStep('welcome')} className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors">← Volver atrás</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalStep === 'reflection' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 mb-1">Conversemos un momento</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Emoción seleccionada:</span>
                <span
                  style={{ backgroundColor: REFLECTION_THEMES_BY_EMOTION[getThemeKey(selectedEmotion)]?.color }}
                  className="px-3 py-1 text-black text-[10px] font-black uppercase rounded-full tracking-wider border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                >
                  {currentEmotionData.title}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
              {/* COLUMNA IZQUIERDA: BOTONES DINÁMICOS */}
              <div className="md:col-span-6 space-y-4">
                <p className="text-[11px] font-black tracking-widest text-neutral-400 uppercase">Temas de reflexión</p>
                <div className="relative border border-neutral-300 p-4 rounded-sm bg-neutral-50/40">
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-black"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black"></div>
                  <div className="flex flex-col gap-3">
                    {Object.keys(themesToDisplay).map((key) => {
                      const theme = themesToDisplay[key];
                      const isCurrent = selectedTheme === key;

                      // Extraemos el color de la emoción activa
                      const emotionColor = REFLECTION_THEMES_BY_EMOTION[getThemeKey(selectedEmotion)]?.color || '#ffffff';

                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedTheme(key)}
                          style={{
                            backgroundColor: isCurrent ? '#000000' : emotionColor
                          }}
                          className={`w-full flex items-center gap-4 px-5 py-4 rounded-full border-2 border-black text-left font-bold transition-all duration-150 group ${isCurrent
                              ? 'text-white shadow-none translate-x-0.5 translate-y-0.5'
                              : 'text-black hover:brightness-95 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                            }`}
                        >
                          <div className={`p-2 rounded-full border transition-colors duration-150 ${isCurrent ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-black'
                            }`}>
                            {theme.icon}
                          </div>
                          <span className="text-xs md:text-sm uppercase tracking-wide">{theme.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-2">
                  <button onClick={() => setModalStep('wheel')} className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors focus:outline-none">← Cambiar Emoción</button>
                </div>
              </div>

              {/* COLUMNA DERECHA: BURBUJA DE CONVERSACIÓN */}
              <div className="md:col-span-6">
                <div className="w-full min-h-[260px] bg-neutral-200/70 border-2 border-black rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                  <div className="bg-white border border-neutral-400 rounded-2xl p-4 text-xs md:text-sm font-medium text-neutral-700 leading-relaxed relative shadow-sm">
                    {activeThemeData.message}
                    {/* Flecha corregida a fondo blanco para igualar su contenedor */}
                    <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b border-r border-neutral-400 transform rotate-45"></div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button variant="primary" className="text-xs py-2 px-6" onClick={handleFinishReflection}>
                      Terminar Reflexión
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL: Guía Paso a Paso */}
      {activeActivity && (() => {
        const totalSteps = activeActivity.steps.length;
        const isLast = activeStep >= totalSteps;
        const progress = isLast ? 100 : Math.round(((activeStep) / totalSteps) * 100);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
              onClick={() => { setActiveActivity(null); setActiveStep(0); }}
            />
            <div className="bg-white border-2 border-black rounded-3xl max-w-md w-full relative z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="p-6 border-b-2 border-neutral-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">Guía paso a paso</p>
                    <h2 className="text-base font-extrabold text-neutral-900 uppercase tracking-tight leading-tight">{activeActivity.title}</h2>
                  </div>
                  <button
                    onClick={() => { setActiveActivity(null); setActiveStep(0); }}
                    className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-black hover:text-black transition-all text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
                {/* Barra de progreso */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">
                    <span>{isLast ? 'Completado' : `Paso ${activeStep + 1} de ${totalSteps}`}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Contenido del paso */}
              <div className="p-6 min-h-[200px] flex flex-col justify-center">
                {isLast ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-neutral-900 uppercase tracking-tight mb-2">¡Actividad completada!</h3>
                    <p className="text-xs font-medium text-neutral-500 leading-relaxed max-w-xs mx-auto">
                      Has terminado todos los pasos de esta guía. ¡Buen trabajo tomando acción por tu bienestar!
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black border-2 border-black flex items-center justify-center text-white text-sm font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]">
                      {String(activeStep + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm font-medium text-neutral-800 leading-relaxed pt-2">
                      {activeActivity.steps[activeStep]}
                    </p>
                  </div>
                )}
              </div>

              {/* Miniaturas de todos los pasos */}
              {!isLast && (
                <div className="px-6 pb-2 flex gap-1.5 flex-wrap">
                  {activeActivity.steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? 'w-6 bg-black' : i < activeStep ? 'w-3 bg-neutral-400' : 'w-3 bg-neutral-200'
                        }`}
                    />
                  ))}
                </div>
              )}

              {/* Footer Navegación */}
              <div className="p-6 pt-4 flex gap-3">
                {!isLast && activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(s => s - 1)}
                    className="flex-1 border-2 border-black text-black text-xs font-bold uppercase py-3 rounded-full hover:bg-neutral-50 transition-colors active:scale-[0.98]"
                  >
                    ← Anterior
                  </button>
                )}
                {isLast ? (
                  <button
                    onClick={() => { setActiveActivity(null); setActiveStep(0); }}
                    className="flex-1 bg-black text-white text-xs font-bold uppercase py-3 rounded-full hover:bg-neutral-900 transition-colors active:scale-[0.98]"
                  >
                    Cerrar guía
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveStep(s => s + 1)}
                    className="flex-1 bg-black text-white text-xs font-bold uppercase py-3 rounded-full hover:bg-neutral-900 transition-colors active:scale-[0.98]"
                  >
                    {activeStep === totalSteps - 1 ? 'Finalizar ✓' : 'Siguiente →'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}