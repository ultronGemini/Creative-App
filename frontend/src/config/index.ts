// =============================================================================
// CONFIGURACIÓN GLOBAL DE HOJA EN BLANCO
// =============================================================================

import type { AppConfig } from '@/src/types';

export const appConfig: AppConfig = {
  // Cambiar a false cuando el backend FastAPI esté listo
  useMockData: true,
  
  // URL base del backend FastAPI
  // En desarrollo: http://localhost:8000
  // En producción: se configurará via variable de entorno
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
};

// =============================================================================
// PALETA DE COLORES - NIEBLA CARMESÍ LIGHT
// Centralizada para uso consistente en toda la aplicación
// =============================================================================

export const colors = {
  marfilNiebla: '#E3DFCE',
  azulNiebla: '#94B1C8',
  carmesiProfundo: '#4C050C',
  cafeVino: '#1A0905',
  blancoCalido: '#FFFDF5',
} as const;

// =============================================================================
// TEXTOS Y MICROCOPY
// Centralizados para facilitar internacionalización futura
// =============================================================================

export const textos = {
  app: {
    nombre: 'Hoja en Blanco',
    tagline: 'Motor de Ignición Creativa',
    descripcion: 'Convierte la hoja en blanco en tu primera decisión creativa.',
  },
  inicio: {
    titulo: 'Tu próxima obra comienza con una provocación',
    subtitulo: 'No somos un chatbot. Somos un sistema de provocaciones creativas diseñado para encender tu imaginación.',
    explicacion: 'Elige tu medio y deja que te guiemos hacia tu primera decisión creativa.',
  },
  visual: {
    titulo: 'Inspiración Visual',
    descripcion: 'Para artistas visuales, pintores, ilustradores y diseñadores.',
    placeholder: 'Escribe un concepto, tema o palabra clave...',
    botonGenerar: 'Generar Inspiración',
    botonOpuestos: 'Explorar Opuestos',
    botonAleatorio: 'Sorpréndeme',
  },
  musica: {
    titulo: 'Dirección Musical',
    descripcion: 'Para músicos que buscan inspiración para componer.',
    placeholderEmocion: '¿Qué emoción quieres explorar?',
    placeholderInstrumento: '¿Cuál es tu instrumento?',
    botonGenerar: 'Generar Dirección',
  },
  escritura: {
    titulo: 'Provocaciones para Escribir',
    descripcion: 'Para escritores que enfrentan la página en blanco.',
    modoSinIdea: 'No sé qué escribir',
    modoConIdea: 'Ya tengo una idea',
    placeholderIdea: 'Describe tu idea en una o dos oraciones...',
    botonGenerar: 'Generar Inspiración',
  },
  acciones: {
    guardar: 'Guardar en Board',
    guardado: 'Guardado',
    copiar: 'Copiar',
    copiado: 'Copiado',
    limpiar: 'Limpiar',
    volver: 'Volver',
  },
  estados: {
    cargando: 'Generando...',
    error: 'Algo salió mal. Intenta de nuevo.',
    vacio: 'Tu board está vacío. Genera inspiración y guarda lo que te resuene.',
  },
} as const;
