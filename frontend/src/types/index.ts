// =============================================================================
// TIPOS Y MODELOS PARA HOJA EN BLANCO
// Estos tipos están preparados para coincidir con los modelos del backend FastAPI
// =============================================================================

export type Modo = 'visual' | 'musica' | 'escritura';

export interface Paleta {
  nombre: string;
  colores: {
    nombre: string;
    hex: string;
  }[];
}

export interface TarjetaInspiracion {
  id: string;
  tipo: Modo;
  titulo: string;
  contenido: string;
  tags?: string[];
  guardada: boolean;
  fechaCreacion: Date;
  // Campos específicos según el tipo
  metadata?: Record<string, unknown>;
}

// =============================================================================
// TIPOS PARA SECCIÓN VISUAL
// =============================================================================

export interface InspiracionVisual {
  resumen: string;
  temas: string[];
  ideasCollage: string[];
  composicion: string[];
  paleta: Paleta;
  tarjetas: TarjetaInspiracion[];
}

export interface ResultadoOpuestos {
  conceptoOriginal: string;
  opuesto: string;
  fusiones: string[];
  direccionVisual: string;
}

// =============================================================================
// TIPOS PARA SECCIÓN MÚSICA
// =============================================================================

export interface InspiracionMusical {
  resumen: string;
  emocion: string;
  instrumento: string;
  referencias: string[];
  tempoSugerido: string;
  recursosMusicales: string[];
  ejercicios: string[];
  restriccionesCreativas: string[];
  tarjetas: TarjetaInspiracion[];
}

// =============================================================================
// TIPOS PARA SECCIÓN ESCRITURA
// =============================================================================

export type ModoEscritura = 'no-se-que-escribir' | 'ya-tengo-idea';

export interface InspiracionEscrituraSinIdea {
  premisa: string;
  tono: string;
  personaje: {
    nombre: string;
    descripcion: string;
    conflictoInterno: string;
  };
  primeraEscena: string;
  tarjetas: TarjetaInspiracion[];
}

export interface InspiracionEscrituraConIdea {
  ideaOriginal: string;
  worldbuilding: {
    reglas: string[];
    conflictos: string[];
    contradicciones: string[];
  };
  preguntasInvestigacion: string[];
  factCheckRequerido: string[];
  tarjetas: TarjetaInspiracion[];
}

export type InspiracionEscritura = InspiracionEscrituraSinIdea | InspiracionEscrituraConIdea;

// =============================================================================
// TIPOS PARA PROYECTOS Y SESIONES
// Preparado para cuando se conecte con Postgres
// =============================================================================

export interface Proyecto {
  id: string;
  nombre: string;
  modo: Modo;
  tarjetasGuardadas: TarjetaInspiracion[];
  fechaCreacion: Date;
  fechaActualizacion: Date;
  // TODO: Añadir userId cuando se implemente autenticación
}

// =============================================================================
// TIPOS PARA API RESPONSES
// Estos tipos coinciden con los structured outputs esperados de Gemini
// =============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface InspiracionRequest {
  modo: Modo;
  concepto?: string;
  emocion?: string;
  instrumento?: string;
  idea?: string;
  modoEscritura?: ModoEscritura;
}

// =============================================================================
// CONFIGURACIÓN
// =============================================================================

export interface AppConfig {
  useMockData: boolean;
  apiBaseUrl: string;
}
