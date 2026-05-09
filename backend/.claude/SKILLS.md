# Claude Skills — Change Log

Registro de cambios realizados por Claude en este proyecto.
Formato: fecha · archivos afectados · acción brevísima.

---

## 2026-05-09 (sesión 2 — pivot web + wiring frontend-backend)

### [FEAT] CORS middleware
- **Modificado**: `app/main.py` — añadido `CORSMiddleware` con orígenes localhost:3000 y localhost:5173. Soporta orígenes de producción via variable de entorno `ALLOWED_ORIGINS`.

### [REFACTOR] Agentes Gemini — prompts enriquecidos
- **Modificado**: `app/infra/creative_agents.py` — reescritura completa con 5 funciones:
  - `get_visual_inspiration` (sustituye `get_visual_palette`) — devuelve `resumen`, `temas`, `ideasCollage`, `composicion`, `paleta` para coincidir con los tipos del frontend.
  - `get_visual_opposites` (nuevo) — devuelve `conceptoOriginal`, `opuesto`, `fusiones`, `direccionVisual`.
  - `get_musical_mood` — enriquecido con `resumen`, `referencias`, `tempoSugerido`, `recursosMusicales`, `ejercicios`, `restriccionesCreativas`.
  - `get_writer_sin_idea` (sustituye `get_writer_quiz`) — devuelve `premisa`, `tono`, `personaje`, `primeraEscena`.
  - `get_writer_con_idea` (nuevo) — devuelve `worldbuilding`, `preguntasInvestigacion`, `factCheckRequerido`.
  - Todos los textos generados en español.

### [FEAT] Rutas — modo `opposites` + split writer
- **Modificado**: `app/api/creative_routes.py` — nuevo `creative_mode: "opposites"`; modo `"writer"` ahora bifurca entre `sin_idea` (user_input vacío) y `con_idea` (user_input con texto). Timeout subido a 15s. Mocks actualizados para coincidir con las nuevas formas de respuesta.

### [FIX] URL del backend en frontend
- **Modificado**: `frontend/src/services/api.ts` — corregido `API_BASE_URL` de `/v1` a `/api/v1` (el prefijo `/api` faltaba). `USE_MOCK_DATA` puesto en `false`.

### [FEAT] Wiring completo frontend → backend
- **Modificado**: `frontend/src/services/api.ts` — reescritura completa. Todas las funciones ahora llaman `POST /api/v1/inspire` con el `creative_mode` correcto. Las `tarjetas` se construyen en el cliente a partir de la respuesta del backend. `generarImagenes`, `verificarFactCheck`, `buscarInvestigacion` y `guardarProyecto` mantienen mock hasta que el backend los implemente.

### [DEPLOY] Archivos de despliegue
- **Agregado**: `backend/Procfile` — `uvicorn app.main:app --host 0.0.0.0 --port $PORT` para Railway/Render.
- **Agregado**: `.gitignore` (raíz del proyecto) — Python, Node, IDE, OS.
- **Acción**: `git init` en la raíz del proyecto.

### [DOCS] API_CONTRACT.md actualizado
- **Modificado**: `API_CONTRACT.md` — actualizado con las 4 `creative_mode` nuevas, todas las formas de respuesta enriquecidas, tabla de variables de entorno para producción.

---

## 2026-05-09

### [FIX] 429 quota fallback
- **Modificado**: `app/api/creative_routes.py` — captura `ClientError` 429 de Gemini y cae al mock automáticamente (demo-safe).

### [FIX] SDK migration + pydantic extra fields
- **Modificado**: `app/infra/creative_agents.py` — migrado de `google.generativeai` (deprecado) a `google.genai` con `_client.aio.models.generate_content`.
- **Modificado**: `app/core/config.py` — añadido `"extra": "ignore"` para tolerar campos extra en `.env`.
- **Modificado**: `requirements.txt` — reemplazado `google-generativeai` por `google-genai`.

### [APP] main.py
- **Agregado**: `app/main.py` — FastAPI app con `include_router` de creative_routes.

### [TEST] test_agents.py
- **Agregado**: `test_agents.py` — script manual con `requests` para probar los 3 modos contra el server local.

### [API] Creative Routes
- **Agregado**: `app/api/creative_routes.py` — `POST /api/v1/inspire` con routing por `creative_mode`, timeout 5s y mocks de fallback por modo.

### [INFRA] Creative Agents
- **Agregado**: `app/infra/creative_agents.py` — 3 funciones async (`get_visual_palette`, `get_musical_mood`, `get_writer_quiz`) con Gemini `gemini-3.1-flash-lite` y `response_mime_type=application/json`.

### [CORE] Config + Requirements
- **Agregado**: `app/core/config.py` — `Settings` con `GEMINI_API_KEY` via pydantic-settings + dotenv.
- **Modificado**: `requirements.txt` — fastapi, uvicorn[standard], python-dotenv, google-generativeai, pydantic-settings.

### [SKILL] Caveman
- **Agregado**: `app/skills/caveman.py` — skill `CAVEMAN_INSTRUCTIONS` (artista cavernícola, lenguaje primitivo).
- **Agregado**: `app/skills/__init__.py` — módulo de skills con export de Caveman.

### [INIT]
- **Agregado**: `.claude/SKILLS.md` — creación de este archivo de seguimiento de cambios.

---
<!-- Nuevas entradas van ARRIBA de esta línea, dentro de su fecha correspondiente -->
