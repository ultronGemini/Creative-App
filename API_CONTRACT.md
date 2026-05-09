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

| Field           | Type   | Required | Values                        |
|-----------------|--------|----------|-------------------------------|
| `creative_mode` | string | yes      | `"visual"`, `"musical"`, `"writer"` |
| `user_input`    | string | yes      | Free-text prompt from the user |

```json
{
  "creative_mode": "visual",
  "user_input": "melancholy forest at dawn"
}
```

---

### Response

All modes share the same envelope:

```json
{
  "source": "gemini",
  "mode": "visual",
  "data": { ... }
}
```

| Field    | Type   | Values               |
|----------|--------|----------------------|
| `source` | string | `"gemini"` or `"mock"` (fallback when Gemini times out or rate-limits) |
| `mode`   | string | Echoes back `creative_mode` from the request |
| `data`   | object | Shape varies by mode — see below |

---

### Response `data` by Mode

#### Visual

```json
{
  "source": "gemini",
  "mode": "visual",
  "data": {
    "palette": ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#F5A623"],
    "composition_tip": "Use rule of thirds with high contrast between warm and cool tones.",
    "opposite_prompt": "A volcanic eruption at sunset, molten lava flowing over black rock."
  }
}
```

| Field             | Type            | Description |
|-------------------|-----------------|-------------|
| `palette`         | string[]        | 5 hex color codes |
| `composition_tip` | string          | Visual composition advice |
| `opposite_prompt` | string          | Contrasting concept prompt |

---

#### Musical

```json
{
  "source": "gemini",
  "mode": "musical",
  "data": {
    "tempo": 92,
    "key": "D minor",
    "instruments": ["cello", "synthesizer pad", "sparse piano", "ambient guitar"],
    "mood_description": "A melancholic yet hopeful atmosphere, like rain clearing after a storm."
  }
}
```

| Field              | Type     | Description |
|--------------------|----------|-------------|
| `tempo`            | number   | BPM |
| `key`              | string   | Musical key (e.g. `"D minor"`) |
| `instruments`      | string[] | 3–5 suggested instruments |
| `mood_description` | string   | Narrative mood description |

---

#### Writer

```json
{
  "source": "gemini",
  "mode": "writer",
  "data": {
    "questions": [
      {
        "id": 1,
        "question": "Would you rather your protagonist lose their memory or their voice?",
        "option_a": "Lose their memory",
        "option_b": "Lose their voice"
      },
      {
        "id": 2,
        "question": "Would you rather the story end in sacrifice or in exile?",
        "option_a": "Sacrifice",
        "option_b": "Exile"
      },
      {
        "id": 3,
        "question": "Would you rather reveal the villain in act one or the final page?",
        "option_a": "Act one",
        "option_b": "Final page"
      }
    ]
  }
}
```

| Field                  | Type     | Description |
|------------------------|----------|-------------|
| `questions`            | object[] | Array of 3 "Would You Rather" prompts |
| `questions[n].id`      | number   | 1-based index |
| `questions[n].question`| string   | The full question |
| `questions[n].option_a`| string   | First choice label |
| `questions[n].option_b`| string   | Second choice label |

---

### Error Responses

| Status | When |
|--------|------|
| `400`  | `creative_mode` is not `visual`, `musical`, or `writer` |
| `500`  | Unexpected Gemini or server error |

```json
{ "detail": "Invalid creative_mode 'foo'. Use: visual, musical, writer." }
```

> **Note:** Gemini timeouts (>5 s) and rate-limit errors (HTTP 429) do **not** return an error — the backend silently falls back to mock data and returns `"source": "mock"`.

---

## React Usage Example

```tsx
const API_BASE = "http://localhost:8000/api/v1";

interface InspireResponse<T> {
  source: "gemini" | "mock";
  mode: string;
  data: T;
}

function useInspire() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InspireResponse<unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function inspire(mode: "visual" | "musical" | "writer", input: string) {
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

      setResult(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return { inspire, loading, result, error };
}
```

**Usage in a component:**

```tsx
const { inspire, loading, result, error } = useInspire();

// Gemini responses can take 3–5 s — show a loading state
if (loading) return <LoadingState />;
if (error)   return <ErrorState message={error} />;

// Check source to distinguish live vs. fallback data
if (result?.source === "mock") {
  console.warn("Displaying mock data — Gemini unavailable");
}
```

---

## Running Locally

```bash
# Backend (port 8000)
cd backend
uvicorn app.main:app --reload

# Frontend (port 3000)
cd frontend
pnpm install   # first time only
pnpm dev
```

Set `USE_MOCK_DATA = false` in `frontend/src/services/api.ts` to connect to the live backend.
