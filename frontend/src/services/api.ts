// =============================================================================
// SERVICIO DE API PARA HOJA EN BLANCO
// Este servicio encapsula todas las llamadas HTTP al backend FastAPI
// Actualmente usa datos mock, pero está preparado para conexión real
// =============================================================================

import type {
  ApiResponse,
  InspiracionVisual,
  InspiracionMusical,
  InspiracionEscrituraSinIdea,
  InspiracionEscrituraConIdea,
  ResultadoOpuestos,
  Modo,
  ModoEscritura,
} from '@/src/types';

import {
  mockInspiracionVisual,
  mockInspiracionMusical,
  mockEscrituraSinIdea,
  mockEscrituraConIdea,
  mockResultadoOpuestos,
  generarInspiracionVisualAleatoria,
  generarInspiracionMusicalAleatoria,
} from '@/src/data/mockData';

// =============================================================================
// CONFIGURACIÓN
// Cambiar USE_MOCK_DATA a false cuando el backend FastAPI esté listo
// =============================================================================

const USE_MOCK_DATA = true;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Simular latencia de red para una experiencia más realista
const MOCK_DELAY_MS = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =============================================================================
// FUNCIONES AUXILIARES
// =============================================================================

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

// =============================================================================
// API DE INSPIRACIÓN VISUAL
// Endpoints: POST /v1/inspiracion, POST /v1/opuestos, POST /v1/imagenes
// Backend usa: orquestador_visual, Gemini generateContent, structured output JSON
// =============================================================================

export async function generarInspiracionVisual(
  concepto: string
): Promise<ApiResponse<InspiracionVisual>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    // Simular variación en respuestas
    const resultado = concepto
      ? mockInspiracionVisual
      : generarInspiracionVisualAleatoria();
    return { success: true, data: resultado };
  }

  // TODO: Conectar con backend FastAPI
  // El backend llamará a:
  // - orquestador_visual para coordinar la generación
  // - Gemini generateContent con structured output JSON
  // - Posiblemente Imagen para generación de referencias visuales
  return fetchApi<InspiracionVisual>('/inspiracion', {
    method: 'POST',
    body: JSON.stringify({ modo: 'visual' as Modo, concepto }),
  });
}

export async function generarOpuestos(
  concepto: string
): Promise<ApiResponse<ResultadoOpuestos>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return {
      success: true,
      data: {
        ...mockResultadoOpuestos,
        conceptoOriginal: concepto,
      },
    };
  }

  // TODO: Conectar con backend FastAPI
  // El backend llamará a:
  // - orquestador_opuestos para generar el concepto opuesto
  // - Gemini generateContent para fusiones creativas
  return fetchApi<ResultadoOpuestos>('/opuestos', {
    method: 'POST',
    body: JSON.stringify({ concepto }),
  });
}

export async function generarImagenes(
  prompt: string
): Promise<ApiResponse<string[]>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    // Retornar URLs de placeholder
    return {
      success: true,
      data: [
        '/placeholder-visual-1.jpg',
        '/placeholder-visual-2.jpg',
        '/placeholder-visual-3.jpg',
      ],
    };
  }

  // TODO: Conectar con backend FastAPI
  // El backend llamará a:
  // - Modelo de generación de imágenes (Imagen u otro)
  // - Almacenamiento de assets en servicio de storage
  return fetchApi<string[]>('/imagenes', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
}

// =============================================================================
// API DE INSPIRACIÓN MUSICAL
// Endpoint: POST /v1/inspiracion
// Backend usa: orquestador_musica, Gemini generateContent, structured output JSON
// Nota: En fases futuras podría incluir análisis de audio
// =============================================================================

export async function generarInspiracionMusical(
  emocion: string,
  instrumento: string
): Promise<ApiResponse<InspiracionMusical>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return {
      success: true,
      data: generarInspiracionMusicalAleatoria(emocion, instrumento),
    };
  }

  // TODO: Conectar con backend FastAPI
  // El backend llamará a:
  // - orquestador_musica para coordinar la generación
  // - Gemini generateContent con structured output JSON
  // - Posible análisis de audio en fases futuras
  return fetchApi<InspiracionMusical>('/inspiracion', {
    method: 'POST',
    body: JSON.stringify({ modo: 'musica' as Modo, emocion, instrumento }),
  });
}

// =============================================================================
// API DE INSPIRACIÓN ESCRITURA
// Endpoints: POST /v1/inspiracion, POST /v1/fact-check, POST /v1/research
// Backend usa: orquestador_escritura, Gemini generateContent, structured output JSON
// También: búsqueda externa, fuentes verificadas, Postgres para proyectos
// =============================================================================

export async function generarInspiracionEscrituraSinIdea(): Promise<
  ApiResponse<InspiracionEscrituraSinIdea>
> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return { success: true, data: mockEscrituraSinIdea };
  }

  // TODO: Conectar con backend FastAPI
  // El backend llamará a:
  // - orquestador_escritura con modo "sin-idea"
  // - Gemini generateContent para premisa, tono, personaje, escena
  return fetchApi<InspiracionEscrituraSinIdea>('/inspiracion', {
    method: 'POST',
    body: JSON.stringify({
      modo: 'escritura' as Modo,
      modoEscritura: 'no-se-que-escribir' as ModoEscritura,
    }),
  });
}

export async function generarInspiracionEscrituraConIdea(
  idea: string
): Promise<ApiResponse<InspiracionEscrituraConIdea>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return {
      success: true,
      data: {
        ...mockEscrituraConIdea,
        ideaOriginal: idea,
      },
    };
  }

  // TODO: Conectar con backend FastAPI
  // El backend llamará a:
  // - orquestador_escritura con modo "con-idea"
  // - Gemini generateContent para worldbuilding
  // - Detección de contradicciones
  // - Generación de preguntas de investigación
  return fetchApi<InspiracionEscrituraConIdea>('/inspiracion', {
    method: 'POST',
    body: JSON.stringify({
      modo: 'escritura' as Modo,
      modoEscritura: 'ya-tengo-idea' as ModoEscritura,
      idea,
    }),
  });
}

export async function verificarFactCheck(
  items: string[]
): Promise<ApiResponse<Record<string, boolean>>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    // Simular resultados de verificación
    const resultados: Record<string, boolean> = {};
    items.forEach((item) => {
      resultados[item] = Math.random() > 0.3; // 70% verificados
    });
    return { success: true, data: resultados };
  }

  // TODO: Conectar con backend FastAPI
  // El backend llamará a:
  // - Búsqueda externa en fuentes verificadas
  // - Validación contra bases de conocimiento
  return fetchApi<Record<string, boolean>>('/fact-check', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}

export async function buscarInvestigacion(
  query: string
): Promise<ApiResponse<string[]>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return {
      success: true,
      data: [
        `Resultado de investigación para: "${query}"`,
        'Artículo relacionado encontrado en fuentes académicas',
        'Referencia histórica relevante identificada',
      ],
    };
  }

  // TODO: Conectar con backend FastAPI
  // El backend llamará a:
  // - orquestador_research
  // - Búsqueda en fuentes verificadas
  // - Agregación de resultados relevantes
  return fetchApi<string[]>('/research', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
}

// =============================================================================
// API DE PROYECTOS
// Endpoint: POST /v1/proyectos
// Backend usa: Postgres para persistencia
// Nota: No se implementa autenticación en esta versión
// =============================================================================

export async function guardarProyecto(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  proyecto: any
): Promise<ApiResponse<{ id: string }>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return {
      success: true,
      data: { id: `proyecto-${Date.now()}` },
    };
  }

  // TODO: Conectar con backend FastAPI
  // El backend:
  // - Validará el proyecto
  // - Guardará en Postgres
  // - Retornará el ID generado
  return fetchApi<{ id: string }>('/proyectos', {
    method: 'POST',
    body: JSON.stringify(proyecto),
  });
}
