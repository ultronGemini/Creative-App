import type {
  InspiracionVisual,
  InspiracionMusical,
  InspiracionEscrituraSinIdea,
  InspiracionEscrituraConIdea,
  ResultadoOpuestos,
  Paleta,
  TarjetaInspiracion,
} from '@/src/types';

// =============================================================================
// PALETA NIEBLA CARMESÍ LIGHT
// =============================================================================

export const paletaNieblaCarmesi: Paleta = {
  nombre: 'Niebla Carmesí Light',
  colores: [
    { nombre: 'Marfil Niebla', hex: '#E3DFCE' },
    { nombre: 'Azul Niebla', hex: '#94B1C8' },
    { nombre: 'Carmesí Profundo', hex: '#4C050C' },
    { nombre: 'Café Vino', hex: '#1A0905' },
    { nombre: 'Blanco Cálido', hex: '#FFFDF5' },
  ],
};

// =============================================================================
// DATOS MOCK PARA SECCIÓN VISUAL
// =============================================================================

export const mockInspiracionVisual: InspiracionVisual = {
  resumen:
    'Una exploración visual que fusiona la melancolía del otoño con la arquitectura brutalista. Piensa en texturas de concreto erosionado, hojas secas atrapadas en grietas urbanas, y la luz dorada del atardecer filtrándose entre edificios monumentales.',
  temas: [
    'Decadencia urbana elegante',
    'Naturaleza reclamando espacios',
    'Monumentalidad íntima',
    'Texturas del paso del tiempo',
  ],
  ideasCollage: [
    'Fotografías de fachadas brutalistas con plantas trepadoras',
    'Texturas de óxido y musgo sobre metal',
    'Paletas de colores terrosos con acentos de verde musgo',
    'Tipografía serif pesada sobre fondos texturizados',
  ],
  composicion: [
    'Usar la regla de tercios para crear tensión entre elementos orgánicos e inorgánicos',
    'Explorar formatos verticales que enfaticen la monumentalidad',
    'Considerar composiciones asimétricas que sugieran desequilibrio controlado',
  ],
  paleta: {
    nombre: 'Otoño Brutalista',
    colores: [
      { nombre: 'Concreto Cálido', hex: '#A89F91' },
      { nombre: 'Óxido Profundo', hex: '#8B4513' },
      { nombre: 'Musgo Oscuro', hex: '#4A5D23' },
      { nombre: 'Dorado Atardecer', hex: '#D4A574' },
      { nombre: 'Grafito Suave', hex: '#5C5C5C' },
    ],
  },
  tarjetas: [
    {
      id: 'vis-1',
      tipo: 'visual',
      titulo: 'Dirección Principal',
      contenido:
        'Fusión de brutalismo arquitectónico con elementos orgánicos en decadencia. La belleza en lo monumental que se rinde ante el tiempo.',
      tags: ['brutalismo', 'naturaleza', 'texturas'],
      guardada: false,
      fechaCreacion: new Date(),
    },
    {
      id: 'vis-2',
      tipo: 'visual',
      titulo: 'Paleta Sugerida',
      contenido:
        'Tonos terrosos con acentos oxidados. Evita blancos puros; prefiere cremas y grises cálidos que sugieran pátina.',
      tags: ['color', 'paleta'],
      guardada: false,
      fechaCreacion: new Date(),
    },
  ],
};

export const mockResultadoOpuestos: ResultadoOpuestos = {
  conceptoOriginal: 'Minimalismo tecnológico',
  opuesto: 'Maximalismo artesanal',
  fusiones: [
    'Interfaz digital que simula bordados tradicionales',
    'Código fuente presentado como caligrafía manuscrita',
    'Circuitos electrónicos interpretados como patrones textiles',
  ],
  direccionVisual:
    'Explora la tensión entre la precisión digital y la imperfección humana. Usa glitches intencionales junto con texturas orgánicas.',
};

// =============================================================================
// DATOS MOCK PARA SECCIÓN MÚSICA
// =============================================================================

export const mockInspiracionMusical: InspiracionMusical = {
  resumen:
    'Una composición que captura la sensación de despertar lentamente en un día lluvioso. Melodías que emergen gradualmente de la niebla sonora, con momentos de claridad que aparecen como rayos de sol entre nubes.',
  emocion: 'Nostalgia contemplativa',
  instrumento: 'Piano',
  referencias: [
    'Erik Satie - Gymnopédies (por su economía emocional)',
    'Nils Frahm - Says (por la construcción gradual)',
    'Ryuichi Sakamoto - Aqua (por la textura minimalista)',
  ],
  tempoSugerido: '60-72 BPM - Andante sostenuto',
  recursosMusicales: [
    'Acordes con novenas y oncenas para crear ambigüedad armónica',
    'Uso de pedal sostenido para crear halos de resonancia',
    'Melodías que respiran: frases cortas con silencios expresivos',
  ],
  ejercicios: [
    'Improvisa usando solo teclas negras durante 5 minutos',
    'Toca una melodía simple y repítela añadiendo una nota cada vez',
    'Graba el sonido de la lluvia y compón sobre él',
  ],
  restriccionesCreativas: [
    'Limítate a un rango de dos octavas',
    'No uses el acorde de tónica hasta el final de la pieza',
    'Cada frase debe terminar en una nota diferente',
  ],
  tarjetas: [
    {
      id: 'mus-1',
      tipo: 'musica',
      titulo: 'Dirección Emocional',
      contenido:
        'Nostalgia contemplativa que emerge gradualmente. Como despertar en un día lluvioso donde cada sonido se siente más presente.',
      tags: ['emoción', 'atmósfera'],
      guardada: false,
      fechaCreacion: new Date(),
    },
    {
      id: 'mus-2',
      tipo: 'musica',
      titulo: 'Restricción Creativa',
      contenido:
        'Limítate a un rango de dos octavas y evita el acorde de tónica hasta el final. La limitación generará soluciones inesperadas.',
      tags: ['restricción', 'ejercicio'],
      guardada: false,
      fechaCreacion: new Date(),
    },
  ],
};

// =============================================================================
// DATOS MOCK PARA SECCIÓN ESCRITURA
// =============================================================================

export const mockEscrituraSinIdea: InspiracionEscrituraSinIdea = {
  premisa:
    'En un mundo donde los recuerdos pueden transferirse entre personas, una archivista de memorias descubre que alguien ha estado implantando recuerdos falsos de ella misma en desconocidos.',
  tono: 'Thriller psicológico con elementos de ciencia ficción íntima. Narración en primera persona, presente, con saltos temporales que reflejan la fragmentación de la memoria.',
  personaje: {
    nombre: 'Elena Varga',
    descripcion:
      'Archivista de memorias de 34 años, meticulosa hasta la obsesión. Viste siempre de gris porque los colores le distraen. Tiene una memoria eidética que considera más maldición que don.',
    conflictoInterno:
      'Su identidad está construida sobre recuerdos que ya no puede verificar como propios. ¿Quién es ella si sus memorias pueden ser fabricadas?',
  },
  primeraEscena:
    'Elena está catalogando el recuerdo de un desconocido —un cumpleaños infantil genérico— cuando reconoce su propia risa en el fondo. Ella nunca ha estado en esa fiesta. Ella nunca ha tenido esa risa.',
  tarjetas: [
    {
      id: 'esc-1',
      tipo: 'escritura',
      titulo: 'Premisa Central',
      contenido:
        'Transferencia de memorias + archivista que encuentra recuerdos falsos de sí misma. El misterio: ¿quién planta esos recuerdos y por qué?',
      tags: ['premisa', 'sci-fi'],
      guardada: false,
      fechaCreacion: new Date(),
    },
    {
      id: 'esc-2',
      tipo: 'escritura',
      titulo: 'Primera Escena',
      contenido:
        'Abre con el momento de reconocimiento: su risa en un recuerdo ajeno. Inmediatamente establece las reglas del mundo y el conflicto.',
      tags: ['apertura', 'gancho'],
      guardada: false,
      fechaCreacion: new Date(),
    },
  ],
};

export const mockEscrituraConIdea: InspiracionEscrituraConIdea = {
  ideaOriginal: 'Una detective que puede ver los últimos momentos de los muertos',
  worldbuilding: {
    reglas: [
      'El don solo funciona con muertes violentas o traumáticas',
      'Cada visión le quita un recuerdo propio aleatorio',
      'No puede ver rostros, solo siluetas y emociones',
      'El efecto dura exactamente 47 segundos',
    ],
    conflictos: [
      'Conflicto con el sistema judicial: sus visiones no son pruebas admisibles',
      'Tensión con su familia: ha olvidado momentos importantes con ellos',
      'Dilema ético: ¿vale la pena perder tu pasado para resolver el de otros?',
    ],
    contradicciones: [
      '⚠️ Si no puede ver rostros, ¿cómo identifica a los asesinos?',
      '⚠️ Definir: ¿qué cuenta como "muerte traumática"?',
    ],
  },
  preguntasInvestigacion: [
    '¿Cómo funciona la memoria a largo plazo vs. corto plazo?',
    '¿Qué casos reales de sinestesia o habilidades perceptuales atípicas existen?',
    '¿Cuáles son los procedimientos forenses actuales para determinar causa de muerte?',
  ],
  factCheckRequerido: [
    '📋 Procedimientos policiales para escenas del crimen',
    '📋 Efectos psicológicos del trauma vicario en investigadores',
    '📋 Límites legales del testimonio de testigos',
  ],
  tarjetas: [
    {
      id: 'esc-3',
      tipo: 'escritura',
      titulo: 'Reglas del Mundo',
      contenido:
        '47 segundos de visión, sin rostros, pierde un recuerdo propio por cada uso. Las limitaciones crean drama.',
      tags: ['worldbuilding', 'reglas'],
      guardada: false,
      fechaCreacion: new Date(),
    },
    {
      id: 'esc-4',
      tipo: 'escritura',
      titulo: 'Contradicciones a Resolver',
      contenido:
        'Si no ve rostros, ¿cómo resuelve casos? Necesitas un mecanismo alternativo: ¿contexto? ¿objetos? ¿emociones que delatan?',
      tags: ['contradicción', 'revisión'],
      guardada: false,
      fechaCreacion: new Date(),
    },
  ],
};

// =============================================================================
// GENERADORES DE DATOS ALEATORIOS
// Para simular respuestas variadas del backend
// =============================================================================

const temasVisualesAleatorios = [
  ['Surrealismo digital', 'Glitch art orgánico', 'Naturaleza pixelada'],
  ['Art Nouveau industrial', 'Curvas mecánicas', 'Ornamento funcional'],
  ['Fotografía estenopeica', 'Bordes difusos', 'Tiempo capturado'],
  ['Collage documental', 'Fragmentos de realidad', 'Narrativa visual'],
];

const emocionesAleatorias = [
  'Alegría contenida',
  'Melancolía luminosa',
  'Tensión expectante',
  'Calma turbulenta',
  'Euforia silenciosa',
];

export function generarInspiracionVisualAleatoria(): InspiracionVisual {
  const temas = temasVisualesAleatorios[Math.floor(Math.random() * temasVisualesAleatorios.length)];
  return {
    ...mockInspiracionVisual,
    temas,
    resumen: `Exploración visual centrada en ${temas[0].toLowerCase()}. Una dirección que invita a experimentar con ${temas[1].toLowerCase()} y ${temas[2].toLowerCase()}.`,
  };
}

export function generarInspiracionMusicalAleatoria(emocion: string, instrumento: string): InspiracionMusical {
  return {
    ...mockInspiracionMusical,
    emocion,
    instrumento,
    resumen: `Una composición para ${instrumento.toLowerCase()} que captura la esencia de ${emocion.toLowerCase()}. Explora texturas sonoras que evocan esta emoción sin recurrir a clichés.`,
  };
}

export function generarEmocionAleatoria(): string {
  return emocionesAleatorias[Math.floor(Math.random() * emocionesAleatorias.length)];
}
