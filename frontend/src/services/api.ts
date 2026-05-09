import type {
  ApiResponse,
  InspiracionVisual,
  InspiracionMusical,
  InspiracionEscrituraSinIdea,
  InspiracionEscrituraConIdea,
  ResultadoOpuestos,
  TarjetaInspiracion,
  Modo,
} from '@/src/types';

import {
  mockInspiracionVisual,
  mockEscrituraSinIdea,
  mockEscrituraConIdea,
  mockResultadoOpuestos,
  generarInspiracionVisualAleatoria,
  generarInspiracionMusicalAleatoria,
} from '@/src/data/mockData';

// Set to true to bypass the backend and use local mock data instead
const USE_MOCK_DATA = false;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const MOCK_DELAY_MS = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =============================================================================
// INTERNAL HELPERS
// =============================================================================

function makeTarjeta(
  id: string,
  tipo: Modo,
  titulo: string,
  contenido: string,
  tags: string[] = []
): TarjetaInspiracion {
  return { id, tipo, titulo, contenido, tags, guardada: false, fechaCreacion: new Date() };
}

interface BackendEnvelope<T> {
  source: 'gemini' | 'mock';
  mode: string;
  data: T;
}

async function callInspire<T>(creative_mode: string, user_input: string): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}/inspire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creative_mode, user_input }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { detail?: string }).detail ?? `HTTP ${res.status}`);
    }
    const json: BackendEnvelope<T> = await res.json();
    return { success: true, data: json.data };
  } catch (error) {
    console.error(`API Error [${creative_mode}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

// =============================================================================
// VISUAL
// =============================================================================

export async function generarInspiracionVisual(
  concepto: string
): Promise<ApiResponse<InspiracionVisual>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return { success: true, data: concepto ? mockInspiracionVisual : generarInspiracionVisualAleatoria() };
  }

  type BackendVisual = Omit<InspiracionVisual, 'tarjetas'>;
  const result = await callInspire<BackendVisual>('visual', concepto);
  if (!result.success || !result.data) return result as ApiResponse<InspiracionVisual>;

  const d = result.data;
  return {
    success: true,
    data: {
      ...d,
      tarjetas: [
        makeTarjeta('vis-1', 'visual', 'Dirección Principal', d.resumen, d.temas.slice(0, 2)),
        makeTarjeta('vis-2', 'visual', 'Paleta Sugerida', d.paleta.nombre, ['color', 'paleta']),
      ],
    },
  };
}

export async function generarOpuestos(
  concepto: string
): Promise<ApiResponse<ResultadoOpuestos>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return { success: true, data: { ...mockResultadoOpuestos, conceptoOriginal: concepto } };
  }

  return callInspire<ResultadoOpuestos>('opposites', concepto);
}

// Image generation is not yet implemented in the backend — returns placeholders
export async function generarImagenes(
  _prompt: string
): Promise<ApiResponse<string[]>> {
  await delay(MOCK_DELAY_MS);
  return { success: true, data: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'] };
}

// =============================================================================
// MUSICAL
// =============================================================================

export async function generarInspiracionMusical(
  emocion: string,
  instrumento: string
): Promise<ApiResponse<InspiracionMusical>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return { success: true, data: generarInspiracionMusicalAleatoria(emocion, instrumento) };
  }

  type BackendMusical = Omit<InspiracionMusical, 'tarjetas'>;
  const result = await callInspire<BackendMusical>('musical', `${emocion} con ${instrumento}`);
  if (!result.success || !result.data) return result as ApiResponse<InspiracionMusical>;

  const d = result.data;
  return {
    success: true,
    data: {
      ...d,
      tarjetas: [
        makeTarjeta('mus-1', 'musica', 'Dirección Emocional', d.resumen, ['emoción', 'atmósfera']),
        makeTarjeta('mus-2', 'musica', 'Restricción Creativa', d.restriccionesCreativas[0] ?? '', ['restricción']),
      ],
    },
  };
}

// =============================================================================
// ESCRITURA
// =============================================================================

export async function generarInspiracionEscrituraSinIdea(): Promise<
  ApiResponse<InspiracionEscrituraSinIdea>
> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return { success: true, data: mockEscrituraSinIdea };
  }

  // Empty user_input signals "sin idea" mode to the backend
  type BackendSinIdea = Omit<InspiracionEscrituraSinIdea, 'tarjetas'>;
  const result = await callInspire<BackendSinIdea>('writer', '');
  if (!result.success || !result.data) return result as ApiResponse<InspiracionEscrituraSinIdea>;

  const d = result.data;
  return {
    success: true,
    data: {
      ...d,
      tarjetas: [
        makeTarjeta('esc-1', 'escritura', 'Premisa Central', d.premisa, ['premisa']),
        makeTarjeta('esc-2', 'escritura', 'Primera Escena', d.primeraEscena, ['apertura', 'gancho']),
      ],
    },
  };
}

export async function generarInspiracionEscrituraConIdea(
  idea: string
): Promise<ApiResponse<InspiracionEscrituraConIdea>> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_DELAY_MS);
    return { success: true, data: { ...mockEscrituraConIdea, ideaOriginal: idea } };
  }

  // Non-empty user_input signals "con idea" mode to the backend
  type BackendConIdea = Omit<InspiracionEscrituraConIdea, 'tarjetas' | 'ideaOriginal'>;
  const result = await callInspire<BackendConIdea>('writer', idea);
  if (!result.success || !result.data) return result as ApiResponse<InspiracionEscrituraConIdea>;

  const d = result.data;
  return {
    success: true,
    data: {
      ...d,
      ideaOriginal: idea,
      tarjetas: [
        makeTarjeta('esc-3', 'escritura', 'Reglas del Mundo', d.worldbuilding.reglas[0] ?? '', ['worldbuilding']),
        makeTarjeta('esc-4', 'escritura', 'Contradicciones', d.worldbuilding.contradicciones[0] ?? '', ['revisión']),
      ],
    },
  };
}

// =============================================================================
// NOT YET IMPLEMENTED IN BACKEND — returns mock data
// =============================================================================

export async function verificarFactCheck(
  items: string[]
): Promise<ApiResponse<Record<string, boolean>>> {
  await delay(MOCK_DELAY_MS);
  const resultados: Record<string, boolean> = {};
  items.forEach((item) => { resultados[item] = Math.random() > 0.3; });
  return { success: true, data: resultados };
}

export async function buscarInvestigacion(
  query: string
): Promise<ApiResponse<string[]>> {
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

export async function guardarProyecto(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _proyecto: any
): Promise<ApiResponse<{ id: string }>> {
  await delay(MOCK_DELAY_MS);
  return { success: true, data: { id: `proyecto-${Date.now()}` } };
}
