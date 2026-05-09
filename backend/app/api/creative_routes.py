import asyncio
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google.genai import errors as genai_errors
from app.infra.creative_agents import (
    get_visual_inspiration,
    get_visual_opposites,
    get_musical_mood,
    get_writer_sin_idea,
    get_writer_con_idea,
)

router = APIRouter(prefix="/api/v1")

_TIMEOUT = 15.0

_MOCKS = {
    "visual": {
        "resumen": "Una exploración visual que fusiona la melancolía del otoño con la arquitectura brutalista. Piensa en texturas de concreto erosionado, hojas secas atrapadas en grietas urbanas, y la luz dorada del atardecer filtrándose entre edificios monumentales.",
        "temas": [
            "Decadencia urbana elegante",
            "Naturaleza reclamando espacios",
            "Monumentalidad íntima",
            "Texturas del paso del tiempo",
        ],
        "ideasCollage": [
            "Fotografías de fachadas brutalistas con plantas trepadoras",
            "Texturas de óxido y musgo sobre metal",
            "Paletas de colores terrosos con acentos de verde musgo",
            "Tipografía serif pesada sobre fondos texturizados",
        ],
        "composicion": [
            "Usar la regla de tercios para crear tensión entre elementos orgánicos e inorgánicos",
            "Explorar formatos verticales que enfaticen la monumentalidad",
            "Composiciones asimétricas que sugieran desequilibrio controlado",
        ],
        "paleta": {
            "nombre": "Otoño Brutalista",
            "colores": [
                {"nombre": "Concreto Cálido", "hex": "#A89F91"},
                {"nombre": "Óxido Profundo", "hex": "#8B4513"},
                {"nombre": "Musgo Oscuro", "hex": "#4A5D23"},
                {"nombre": "Dorado Atardecer", "hex": "#D4A574"},
                {"nombre": "Grafito Suave", "hex": "#5C5C5C"},
            ],
        },
    },
    "opposites": {
        "conceptoOriginal": "Minimalismo tecnológico",
        "opuesto": "Maximalismo artesanal",
        "fusiones": [
            "Interfaz digital que simula bordados tradicionales",
            "Código fuente presentado como caligrafía manuscrita",
            "Circuitos electrónicos interpretados como patrones textiles",
        ],
        "direccionVisual": "Explora la tensión entre la precisión digital y la imperfección humana. Usa glitches intencionales junto con texturas orgánicas.",
    },
    "musical": {
        "resumen": "Una composición que captura la sensación de despertar lentamente en un día lluvioso. Melodías que emergen gradualmente de la niebla sonora, con momentos de claridad que aparecen como rayos de sol entre nubes.",
        "emocion": "Nostalgia contemplativa",
        "instrumento": "Piano",
        "referencias": [
            "Erik Satie - Gymnopédies (por su economía emocional)",
            "Nils Frahm - Says (por la construcción gradual)",
            "Ryuichi Sakamoto - Aqua (por la textura minimalista)",
        ],
        "tempoSugerido": "60-72 BPM - Andante sostenuto",
        "recursosMusicales": [
            "Acordes con novenas y oncenas para crear ambigüedad armónica",
            "Uso de pedal sostenido para crear halos de resonancia",
            "Melodías que respiran: frases cortas con silencios expresivos",
        ],
        "ejercicios": [
            "Improvisa usando solo teclas negras durante 5 minutos",
            "Toca una melodía simple y repítela añadiendo una nota cada vez",
            "Graba el sonido de la lluvia y compón sobre él",
        ],
        "restriccionesCreativas": [
            "Limítate a un rango de dos octavas",
            "No uses el acorde de tónica hasta el final de la pieza",
            "Cada frase debe terminar en una nota diferente",
        ],
    },
    "writer_sin_idea": {
        "premisa": "En un mundo donde los recuerdos pueden transferirse entre personas, una archivista descubre que alguien ha estado implantando recuerdos falsos de ella misma en desconocidos.",
        "tono": "Thriller psicológico con elementos de ciencia ficción íntima. Narración en primera persona, presente, con saltos temporales que reflejan la fragmentación de la memoria.",
        "personaje": {
            "nombre": "Elena Varga",
            "descripcion": "Archivista de memorias de 34 años, meticulosa hasta la obsesión. Viste siempre de gris porque los colores le distraen.",
            "conflictoInterno": "Su identidad está construida sobre recuerdos que ya no puede verificar como propios. ¿Quién es ella si sus memorias pueden ser fabricadas?",
        },
        "primeraEscena": "Elena está catalogando el recuerdo de un desconocido cuando reconoce su propia risa en el fondo. Ella nunca ha estado en esa fiesta. Ella nunca ha tenido esa risa.",
    },
    "writer_con_idea": {
        "worldbuilding": {
            "reglas": [
                "El don solo funciona con muertes violentas o traumáticas",
                "Cada visión le quita un recuerdo propio aleatorio",
                "No puede ver rostros, solo siluetas y emociones",
                "El efecto dura exactamente 47 segundos",
            ],
            "conflictos": [
                "Conflicto con el sistema judicial: sus visiones no son pruebas admisibles",
                "Tensión con su familia: ha olvidado momentos importantes con ellos",
                "Dilema ético: ¿vale la pena perder tu pasado para resolver el de otros?",
            ],
            "contradicciones": [
                "⚠️ Si no puede ver rostros, ¿cómo identifica a los asesinos?",
                "⚠️ Definir: ¿qué cuenta como 'muerte traumática'?",
            ],
        },
        "preguntasInvestigacion": [
            "¿Cómo funciona la memoria a largo plazo vs. corto plazo?",
            "¿Qué casos reales de sinestesia o habilidades perceptuales atípicas existen?",
            "¿Cuáles son los procedimientos forenses actuales para determinar causa de muerte?",
        ],
        "factCheckRequerido": [
            "📋 Procedimientos policiales para escenas del crimen",
            "📋 Efectos psicológicos del trauma vicario en investigadores",
            "📋 Límites legales del testimonio de testigos",
        ],
    },
}


class InspireRequest(BaseModel):
    creative_mode: str
    user_input: str = ""


@router.post("/inspire")
async def inspire(body: InspireRequest):
    mode = body.creative_mode.lower()

    if mode == "visual":
        coro = get_visual_inspiration(body.user_input)
        mock_key = "visual"
    elif mode == "opposites":
        coro = get_visual_opposites(body.user_input)
        mock_key = "opposites"
    elif mode == "musical":
        coro = get_musical_mood(body.user_input)
        mock_key = "musical"
    elif mode == "writer":
        if body.user_input.strip():
            coro = get_writer_con_idea(body.user_input)
            mock_key = "writer_con_idea"
        else:
            coro = get_writer_sin_idea()
            mock_key = "writer_sin_idea"
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid creative_mode '{mode}'. Use: visual, opposites, musical, writer.",
        )

    try:
        result = await asyncio.wait_for(coro, timeout=_TIMEOUT)
        return {"source": "gemini", "mode": mode, "data": result}
    except asyncio.TimeoutError:
        return {"source": "mock", "mode": mode, "data": _MOCKS[mock_key]}
    except genai_errors.ClientError as e:
        if e.code == 429:
            return {"source": "mock", "mode": mode, "data": _MOCKS[mock_key]}
        raise HTTPException(status_code=500, detail=f"Gemini error: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{type(e).__name__}: {e}")
