# API Contract — Hoja en Blanco

Backend: FastAPI + Google Gemini 2.5 Flash  
Base URL (local): `http://localhost:8000`

---

## POST /api/v1/inspire

The single endpoint for all creative inspiration modes.

### Request

```
POST http://localhost:8000/api/v1/inspire
Content-Type: application/json
```

**Body**

| Field           | Type   | Required | Values |
|-----------------|--------|----------|--------|
| `creative_mode` | string | yes      | `"visual"`, `"opposites"`, `"musical"`, `"writer"` |
| `user_input`    | string | no       | Free-text prompt. For `"writer"` mode: empty string → "no tengo idea" flow, non-empty → "ya tengo una idea" flow |

```json
{
  "creative_mode": "visual",
  "user_input": "bosque melancólico al amanecer"
}
```

---

### Response envelope (all modes)

```json
{
  "source": "gemini",
  "mode": "visual",
  "data": { ... }
}
```

| Field    | Type   | Values |
|----------|--------|--------|
| `source` | string | `"gemini"` — live response. `"mock"` — fallback when Gemini times out (>15 s) or rate-limits (429) |
| `mode`   | string | Echoes back `creative_mode` |
| `data`   | object | Shape varies by mode — see below |

---

### Response `data` by Mode

#### `visual`

```json
{
  "resumen": "Una exploración visual que fusiona la melancolía del otoño con la arquitectura brutalista...",
  "temas": ["Decadencia urbana elegante", "Naturaleza reclamando espacios", "Monumentalidad íntima", "Texturas del tiempo"],
  "ideasCollage": [
    "Fotografías de fachadas brutalistas con plantas trepadoras",
    "Texturas de óxido y musgo sobre metal",
    "Paletas de colores terrosos con acentos de verde musgo",
    "Tipografía serif pesada sobre fondos texturizados"
  ],
  "composicion": [
    "Usar la regla de tercios para crear tensión entre elementos orgánicos e inorgánicos",
    "Explorar formatos verticales que enfaticen la monumentalidad",
    "Composiciones asimétricas que sugieran desequilibrio controlado"
  ],
  "paleta": {
    "nombre": "Otoño Brutalista",
    "colores": [
      { "nombre": "Concreto Cálido", "hex": "#A89F91" },
      { "nombre": "Óxido Profundo", "hex": "#8B4513" },
      { "nombre": "Musgo Oscuro",   "hex": "#4A5D23" },
      { "nombre": "Dorado Atardecer","hex": "#D4A574" },
      { "nombre": "Grafito Suave",  "hex": "#5C5C5C" }
    ]
  }
}
```

---

#### `opposites`

```json
{
  "conceptoOriginal": "Minimalismo tecnológico",
  "opuesto": "Maximalismo artesanal",
  "fusiones": [
    "Interfaz digital que simula bordados tradicionales",
    "Código fuente presentado como caligrafía manuscrita",
    "Circuitos electrónicos interpretados como patrones textiles"
  ],
  "direccionVisual": "Explora la tensión entre la precisión digital y la imperfección humana..."
}
```

---

#### `musical`

```json
{
  "resumen": "Una composición que captura la sensación de despertar lentamente en un día lluvioso...",
  "emocion": "Nostalgia contemplativa",
  "instrumento": "Piano",
  "referencias": [
    "Erik Satie - Gymnopédies (por su economía emocional)",
    "Nils Frahm - Says (por la construcción gradual)",
    "Ryuichi Sakamoto - Aqua (por la textura minimalista)"
  ],
  "tempoSugerido": "60-72 BPM - Andante sostenuto",
  "recursosMusicales": [
    "Acordes con novenas y oncenas para crear ambigüedad armónica",
    "Uso de pedal sostenido para crear halos de resonancia",
    "Melodías que respiran: frases cortas con silencios expresivos"
  ],
  "ejercicios": [
    "Improvisa usando solo teclas negras durante 5 minutos",
    "Toca una melodía simple y repítela añadiendo una nota cada vez",
    "Graba el sonido de la lluvia y compón sobre él"
  ],
  "restriccionesCreativas": [
    "Limítate a un rango de dos octavas",
    "No uses el acorde de tónica hasta el final de la pieza",
    "Cada frase debe terminar en una nota diferente"
  ]
}
```

---

#### `writer` — sin idea (`user_input: ""`)

```json
{
  "premisa": "En un mundo donde los recuerdos pueden transferirse entre personas...",
  "tono": "Thriller psicológico con elementos de ciencia ficción íntima...",
  "personaje": {
    "nombre": "Elena Varga",
    "descripcion": "Archivista de memorias de 34 años, meticulosa hasta la obsesión...",
    "conflictoInterno": "Su identidad está construida sobre recuerdos que ya no puede verificar como propios..."
  },
  "primeraEscena": "Elena está catalogando el recuerdo de un desconocido cuando reconoce su propia risa en el fondo..."
}
```

#### `writer` — con idea (`user_input: "<tu idea>"`)

```json
{
  "worldbuilding": {
    "reglas": [
      "El don solo funciona con muertes violentas o traumáticas",
      "Cada visión le quita un recuerdo propio aleatorio",
      "No puede ver rostros, solo siluetas y emociones",
      "El efecto dura exactamente 47 segundos"
    ],
    "conflictos": [
      "Conflicto con el sistema judicial: sus visiones no son pruebas admisibles",
      "Tensión con su familia: ha olvidado momentos importantes con ellos",
      "Dilema ético: ¿vale la pena perder tu pasado para resolver el de otros?"
    ],
    "contradicciones": [
      "⚠️ Si no puede ver rostros, ¿cómo identifica a los asesinos?",
      "⚠️ Definir: ¿qué cuenta como 'muerte traumática'?"
    ]
  },
  "preguntasInvestigacion": [
    "¿Cómo funciona la memoria a largo plazo vs. corto plazo?",
    "¿Qué casos reales de sinestesia o habilidades perceptuales atípicas existen?",
    "¿Cuáles son los procedimientos forenses actuales para determinar causa de muerte?"
  ],
  "factCheckRequerido": [
    "📋 Procedimientos policiales para escenas del crimen",
    "📋 Efectos psicológicos del trauma vicario en investigadores",
    "📋 Límites legales del testimonio de testigos"
  ]
}
```

---

### Error Responses

| Status | When |
|--------|------|
| `400`  | `creative_mode` is not one of the four valid values |
| `500`  | Unexpected Gemini or server error |

```json
{ "detail": "Invalid creative_mode 'foo'. Use: visual, opposites, musical, writer." }
```

> Gemini timeouts and 429 rate-limit errors are handled silently — the backend returns `"source": "mock"` with pre-written fallback data instead of an error.

---

## React Usage Example

```tsx
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

interface InspireEnvelope<T> {
  source: "gemini" | "mock";
  mode: string;
  data: T;
}

function useInspire<T>() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function inspire(mode: string, input: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/inspire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creative_mode: mode, user_input: input }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? `HTTP ${res.status}`);
      }

      const json: InspireEnvelope<T> = await res.json();
      if (json.source === "mock") console.warn("Backend returned mock data");
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return { inspire, loading, result, error };
}
```

**Usage:**
```tsx
// Gemini can take 5–15 s on the first request — always show a loading state
if (loading) return <LoadingState />;
if (error)   return <ErrorState message={error} />;
```

---

## Running Locally

```bash
# Terminal 1 — Backend (port 8000)
cd backend
uvicorn app.main:app --reload

# Terminal 2 — Frontend (port 3000)
cd frontend
pnpm install    # first time only
pnpm dev
```

**Environment variables:**

| Var | Where | Value |
|-----|-------|-------|
| `GEMINI_API_KEY` | `backend/.env` | Your Google AI Studio key |
| `NEXT_PUBLIC_API_URL` | Vercel dashboard / `.env.local` | Your deployed backend URL (e.g. `https://creativeapp.railway.app/api/v1`) |
| `ALLOWED_ORIGINS` | Railway/Render env vars | Your deployed frontend URL (e.g. `https://creativeapp.vercel.app`) |

`USE_MOCK_DATA` in `frontend/src/services/api.ts` is now set to `false` — the frontend will hit the real backend.
