import json
from google import genai
from google.genai import types
from app.core.config import settings

_client = genai.Client(api_key=settings.GEMINI_API_KEY)
_MODEL = "gemini-2.5-flash"
_JSON_CONFIG = types.GenerateContentConfig(response_mime_type="application/json")


async def get_visual_inspiration(topic: str) -> dict:
    prompt = f"""
    You are a professional visual artist and color theorist working with a Spanish-speaking creative team.
    Given the topic "{topic}", return a JSON object with exactly these keys (all text values in Spanish):
    - "resumen": a rich one-paragraph visual direction summary
    - "temas": array of exactly 4 short theme strings
    - "ideasCollage": array of exactly 4 concrete collage/moodboard ideas
    - "composicion": array of exactly 3 composition tips
    - "paleta": object with:
        - "nombre": creative name for this color palette
        - "colores": array of exactly 5 objects, each with "nombre" (color name) and "hex" (HEX code like "#A3C4BC")
    Return only valid JSON, no extra text.
    """
    response = await _client.aio.models.generate_content(
        model=_MODEL, contents=prompt, config=_JSON_CONFIG
    )
    return json.loads(response.text)


async def get_visual_opposites(concept: str) -> dict:
    prompt = f"""
    You are a creative director specializing in conceptual contrasts (working in Spanish).
    Given the concept "{concept}", return a JSON object with exactly these keys (all text values in Spanish):
    - "conceptoOriginal": the original concept as provided
    - "opuesto": the conceptual opposite as one short phrase
    - "fusiones": array of exactly 3 creative fusion ideas between the concept and its opposite
    - "direccionVisual": one paragraph describing how to visually explore this tension
    Return only valid JSON, no extra text.
    """
    response = await _client.aio.models.generate_content(
        model=_MODEL, contents=prompt, config=_JSON_CONFIG
    )
    return json.loads(response.text)


async def get_musical_mood(emotion_and_instrument: str) -> dict:
    prompt = f"""
    You are a music composer and producer working with a Spanish-speaking creative team.
    Given "{emotion_and_instrument}", return a JSON object with exactly these keys (all text values in Spanish):
    - "resumen": a rich one-paragraph description of the musical direction
    - "emocion": the core emotion being expressed
    - "instrumento": the primary instrument mentioned or implied
    - "referencias": array of exactly 3 music references as strings like "Artist - Song (reason)"
    - "tempoSugerido": BPM range and musical tempo term (e.g. "60-72 BPM - Andante sostenuto")
    - "recursosMusicales": array of exactly 3 musical technique tips
    - "ejercicios": array of exactly 3 creative exercises
    - "restriccionesCreativas": array of exactly 3 creative constraints
    Return only valid JSON, no extra text.
    """
    response = await _client.aio.models.generate_content(
        model=_MODEL, contents=prompt, config=_JSON_CONFIG
    )
    return json.loads(response.text)


async def get_writer_sin_idea() -> dict:
    prompt = """
    You are a creative writing coach specializing in narrative unblocking (working in Spanish).
    Generate a complete writing inspiration package to help a blocked writer start a new story.
    Return a JSON object with exactly these keys (all text values in Spanish):
    - "premisa": a compelling one-paragraph story premise
    - "tono": description of narrative tone, voice and style
    - "personaje": object with:
        - "nombre": character name
        - "descripcion": one-paragraph character description
        - "conflictoInterno": the character's internal conflict
    - "primeraEscena": a vivid description of the opening scene
    Return only valid JSON, no extra text.
    """
    response = await _client.aio.models.generate_content(
        model=_MODEL, contents=prompt, config=_JSON_CONFIG
    )
    return json.loads(response.text)


async def get_writer_con_idea(idea: str) -> dict:
    prompt = f"""
    You are a creative writing coach specializing in worldbuilding and narrative development (working in Spanish).
    Given the story idea "{idea}", return a JSON object with exactly these keys (all text values in Spanish):
    - "worldbuilding": object with:
        - "reglas": array of exactly 4 world rules or constraints
        - "conflictos": array of exactly 3 narrative conflicts
        - "contradicciones": array of exactly 2 contradictions to resolve (start each with "⚠️ ")
    - "preguntasInvestigacion": array of exactly 3 research questions
    - "factCheckRequerido": array of exactly 3 items needing verification (start each with "📋 ")
    Return only valid JSON, no extra text.
    """
    response = await _client.aio.models.generate_content(
        model=_MODEL, contents=prompt, config=_JSON_CONFIG
    )
    return json.loads(response.text)
