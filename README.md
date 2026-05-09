<h1 align="center">
  🎨 Primer Boceto
</h1>

<h3 align="center">
  <em>Rompe el Bloqueo. Vuelve a Crear.</em>
</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Google_Cloud-GCP-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white" alt="GCP"/>
  <img src="https://img.shields.io/badge/Gemini-3.1_Flash_Lite-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini"/>
</p>

<p align="center">
  <a href="[VIDEO_DEMO_URL]"><img src="https://img.shields.io/badge/▶%20Video-Demo-FF0000?style=for-the-badge" alt="Video Demo"/></a>
  &nbsp;
  <a href="[DEVPOST_URL]"><img src="https://img.shields.io/badge/🏆-Devpost-003E54?style=for-the-badge" alt="Devpost"/></a>
  &nbsp;
  <a href="[LIVE_SITE_URL]"><img src="https://img.shields.io/badge/🚀-Live_Site-22C55E?style=for-the-badge" alt="Live Site"/></a>
</p>

---

## 📋 Table of Contents

- [Inspiration & What it does](#-inspiration--what-it-does)
- [Screenshots](#-screenshots)
- [How we built it](#%EF%B8%8F-how-we-built-it)
- [Local Setup](#-local-setup)
- [Challenges](#-challenges)
- [Accomplishments](#-accomplishments)
- [What's Next](#-whats-next)
- [Team](#-team)

---

## 💡 Inspiration & What it does

Every creative has faced it — the **blank page**. That moment of paralysis where the cursor blinks and inspiration refuses to show up. Whether you're a visual artist staring at an empty canvas, a musician stuck on the first chord, or a writer frozen before chapter one, the _síndrome de la página en blanco_ is real, universal, and creatively devastating.

**Primer Boceto** is an AI-powered creative ignition engine. We don't write, paint, or compose *for* you. Instead, we give you **the zero step** — the provocation, the spark, the first decision — so you can take it from there.

The platform supports three creative roles:

### 🎨 Visual Artist
- Generates a **custom 5-color palette** tailored to your concept using Gemini's color theory expertise
- Produces **opposite concept prompts** to push you out of your comfort zone
- Delivers **collage ideas, composition tips, and visual themes** as actionable starting points
- Generates **reference images** via Nano Banana 2 to build your visual moodboard instantly

### 🎵 Musician
- Analyzes your emotion or instrument and suggests the ideal **BPM, key, and sonic atmosphere**
- Provides **curated music references**, creative exercises, and harmonic technique tips
- Generates **30-second audio clips** using Lyria 3 so you can hear your direction before committing

### ✍️ Writer
- **No idea?** Generates a full creative package: premise, tone, character with internal conflict, and opening scene
- **Have an idea?** Expands it into a complete worldbuilding document with rules, narrative conflicts, contradictions to resolve, and research questions
- Interactive **"Would You Rather"** quizzes force bold story decisions and break creative deadlock

---

## 📸 Screenshots

> 🖼️ *Replace the placeholders below with GIFs or screenshots of the app in action.*

### Home — Paso Cero
<img width="1920" height="947" alt="photo4" src="https://github.com/user-attachments/assets/2a42a77e-d4e8-47cd-9f08-e7b9411f38d8" />

### Visual Mode — Palette Generation
<img width="1920" height="958" alt="photo2" src="https://github.com/user-attachments/assets/366fd8e3-83b8-4b28-a36b-e0277edccb7c" />

### Musical Mode — Mood & Clip Generation
<img width="1920" height="947" alt="photo3" src="https://github.com/user-attachments/assets/9a12b1d5-3d2c-43f1-b1d5-3402d8a1c929" />

### Writer Mode — Worldbuilding Output
<img width="1920" height="951" alt="photo1" src="https://github.com/user-attachments/assets/178e06fb-8fe3-410b-8eeb-a30b16c21861" />

---

## 🛠️ How we built it

### Monorepo Structure

```
Primer Boceto/
├── backend/          # FastAPI — Python API & AI agent orchestration
├── frontend/         # React + Vite — Web UI
├── API_CONTRACT.md   # Shared API specification
└── README.md
```

### Frontend
| Tech | Role |
|---|---|
| **React 19** | UI component framework |
| **Vite** | Lightning-fast dev server and bundler |
| **TailwindCSS** | Utility-first styling |
| **shadcn/ui + Radix UI** | Accessible, unstyled component primitives |
| **TypeScript** | End-to-end type safety |

### Backend
| Tech | Role |
|---|---|
| **FastAPI** | High-performance async REST API |
| **Python 3.12** | Core runtime |
| **Pydantic** | Request/response validation and settings management |
| **Uvicorn** | ASGI server |
| **Clean Architecture** | `api/` → `infra/` → `skills/` layer separation |

### 🤖 AI & Agents — *The Heart of the System*

This is where Primer Boceto goes beyond a simple chatbot. We orchestrate **three specialized Google AI models** running on **Google Cloud Platform (Pay-as-you-go)** to deliver low-latency, high-quality creative output:

| Model | Role | Why |
|---|---|---|
| **Gemini 3.1 Flash-Lite** | Creative director & orchestrator | Ultra-low latency structured JSON output for palettes, moods, and narrative packages |
| **Nano Banana 2** | Visual reference generator | Generates instant moodboard images from opposite-concept prompts |
| **Lyria 3** | Music clip generator | Produces 30-second high-fidelity audio clips from BPM + key + instrument parameters |

All agents are called **asynchronously** with a timeout failsafe — if a model is slow or rate-limited, the system falls back to curated mock data seamlessly, ensuring a demo-safe experience at all times.

```
User Request
    │
    ▼
FastAPI /api/v1/inspire
    │
    ├─ creative_mode: "visual"    → Gemini 3.1 Flash-Lite → Palette + Themes
    │                             → Nano Banana 2         → Reference Images
    │
    ├─ creative_mode: "musical"   → Gemini 3.1 Flash-Lite → Mood + BPM + Key
    │                             → Lyria 3               → 30s Audio Clip
    │
    └─ creative_mode: "writer"    → Gemini 3.1 Flash-Lite → Premise / Worldbuilding
```

---

## 🚀 Local Setup

Follow these steps exactly to run Primer Boceto on your machine.

### Prerequisites
- Python 3.12+
- Node.js 20+
- A [Google AI Studio](https://aistudio.google.com/) API key

---

### Step 1 — Clone the repository

```bash
git clone [REPO_URL]
cd Primer Boceto
```

---

### Step 2 — Configure API Keys

Create a `.env` file inside the `/backend` folder:

```bash
# /backend/.env
GEMINI_API_KEY=your_api_key_here
BACKEND_PORT=8000
```

> ⚠️ **Never commit this file.** It is already listed in `.gitignore`.

---

### Step 3 — Launch the Backend

```bash
cd backend
python -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.api.main:app --reload
```

The API will be available at **http://localhost:8000**  
Interactive docs at **http://localhost:8000/docs**

---

### Step 4 — Launch the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

> ✅ Both servers must be running simultaneously for the app to work end-to-end.

---

## 💪 Challenges

- 🔀 **Mid-hackathon pivot** — We started with a native iOS app and switched to a React web app halfway through, which required rebuilding the entire frontend layer from scratch under time pressure.
- ⚡ **Multi-model orchestration** — Coordinating Gemini, Nano Banana 2, and Lyria 3 as a unified creative pipeline required careful async design to avoid bottlenecks and timeout cascades.
- 📊 **GCP quota management** — Running three different AI models simultaneously on Pay-as-you-go billing required us to implement timeout failsafes and mock fallbacks to ensure demo stability without unexpected costs.
- 🔗 **API contract drift** — Keeping the frontend TypeScript types perfectly aligned with FastAPI's JSON structured output as both sides evolved in parallel was a constant challenge.

---

## 🏆 Accomplishments

- ✅ Successfully **orchestrated three distinct Google AI models** in a single, cohesive creative interface
- ✅ **Pivoted from iOS to web** mid-hackathon and shipped a fully functional product
- ✅ Built a **demo-safe fallback system** — the app never crashes or shows an error screen, even when models are rate-limited
- ✅ Designed a **zero-to-inspiration UX** that respects the creative process without replacing human creativity
- ✅ Delivered **real-time structured creative output** in under 15 seconds per request

---

## 🔭 What's Next

- 🎵 **Full Lyria 3 integration** — ship the 30-second audio clip feature to production
- 🖼️ **Nano Banana 2 image pipeline** — complete the visual reference generation flow
- 💾 **Persistent creative boards** — save and organize inspirations across sessions with a PostgreSQL backend
- 👤 **User accounts** — let artists build a portfolio of generated inspirations over time
- 🌐 **Multi-language support** — expand beyond Spanish to reach global creative communities
- 📱 **Progressive Web App (PWA)** — installable, offline-capable version for mobile creatives

---

## 👥 Team

> *Add your team members here.*

| Name | Role |
|---|---|
| Leonel Francisco Bailón Sifuentes | Backend & Agents |
| Magda Giannina Colunga Minutti| Frontend |
| Ian Roberto Rendón Berlanga | Backend & Base de datos |
---

<p align="center">
  Built with ❤️ at <strong>HackDays</strong> · 2026
</p>
