'use client';

import { useState } from 'react';
import { Pen, Sparkles, HelpCircle, Lightbulb, AlertTriangle, Search, CheckCircle } from 'lucide-react';
import { InspirationCard } from '@/src/components/InspirationCard';
import { ChipSelect } from '@/src/components/ChipSelect';
import { LoadingCards } from '@/src/components/LoadingState';
import { ErrorState } from '@/src/components/ErrorState';
import {
  generarInspiracionEscrituraSinIdea,
  generarInspiracionEscrituraConIdea,
} from '@/src/services/api';
import { textos } from '@/src/config';
import type {
  InspiracionEscrituraSinIdea,
  InspiracionEscrituraConIdea,
  TarjetaInspiracion,
  ModoEscritura,
} from '@/src/types';

interface EscrituraViewProps {
  tarjetasGuardadas: TarjetaInspiracion[];
  onToggleSave: (tarjeta: TarjetaInspiracion) => void;
}

const modoOptions = [
  { value: 'no-se-que-escribir', label: textos.escritura.modoSinIdea },
  { value: 'ya-tengo-idea', label: textos.escritura.modoConIdea },
];

export function EscrituraView({ tarjetasGuardadas, onToggleSave }: EscrituraViewProps) {
  const [modo, setModo] = useState<ModoEscritura>('no-se-que-escribir');
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultadoSinIdea, setResultadoSinIdea] = useState<InspiracionEscrituraSinIdea | null>(null);
  const [resultadoConIdea, setResultadoConIdea] = useState<InspiracionEscrituraConIdea | null>(null);

  // Get current tarjetas based on mode
  const currentTarjetas = modo === 'no-se-que-escribir' ? resultadoSinIdea?.tarjetas : resultadoConIdea?.tarjetas;
  
  // Merge saved state
  const tarjetasConEstado = currentTarjetas?.map((t) => ({
    ...t,
    guardada: tarjetasGuardadas.some((g) => g.id === t.id),
  }));

  const handleGenerarSinIdea = async () => {
    setIsLoading(true);
    setError(null);
    setResultadoConIdea(null);

    // TODO: Cuando el backend esté listo, esto llamará a:
    // POST /v1/inspiracion con { modo: 'escritura', modoEscritura: 'no-se-que-escribir' }
    // El backend usará:
    // - orquestador_escritura con modo "sin-idea"
    // - Gemini generateContent para premisa, tono, personaje, escena
    // - structured output JSON
    const response = await generarInspiracionEscrituraSinIdea();

    setIsLoading(false);
    if (response.success && response.data) {
      setResultadoSinIdea(response.data);
    } else {
      setError(response.error || textos.estados.error);
    }
  };

  const handleGenerarConIdea = async () => {
    if (!idea.trim()) return;

    setIsLoading(true);
    setError(null);
    setResultadoSinIdea(null);

    // TODO: Cuando el backend esté listo, esto llamará a:
    // POST /v1/inspiracion con { modo: 'escritura', modoEscritura: 'ya-tengo-idea', idea }
    // El backend usará:
    // - orquestador_escritura con modo "con-idea"
    // - Gemini generateContent para worldbuilding
    // - Detección de contradicciones
    // - Generación de preguntas de investigación
    // - POST /v1/fact-check para elementos que requieren verificación
    // - POST /v1/research para preguntas de investigación
    // - Postgres para guardar proyectos y sesiones
    const response = await generarInspiracionEscrituraConIdea(idea);

    setIsLoading(false);
    if (response.success && response.data) {
      setResultadoConIdea(response.data);
    } else {
      setError(response.error || textos.estados.error);
    }
  };

  const handleGenerar = () => {
    if (modo === 'no-se-que-escribir') {
      handleGenerarSinIdea();
    } else {
      handleGenerarConIdea();
    }
  };

  const handleToggleSave = (id: string) => {
    const tarjetas = modo === 'no-se-que-escribir' ? resultadoSinIdea?.tarjetas : resultadoConIdea?.tarjetas;
    const tarjeta = tarjetas?.find((t) => t.id === id);
    if (tarjeta) {
      onToggleSave({
        ...tarjeta,
        guardada: !tarjetasGuardadas.some((g) => g.id === id),
      });
    }
  };

  const handleModoChange = (value: string) => {
    setModo(value as ModoEscritura);
    setResultadoSinIdea(null);
    setResultadoConIdea(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Pen className="h-5 w-5" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {textos.escritura.titulo}
          </h1>
        </div>
        <p className="text-muted-foreground">{textos.escritura.descripcion}</p>
      </header>

      {/* Mode Selection */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          ¿En qué punto estás?
        </h2>
        <ChipSelect options={modoOptions} value={modo} onChange={handleModoChange} />
      </section>

      {/* Input Section - Sin Idea */}
      {modo === 'no-se-que-escribir' && (
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-card-foreground">
                Modo: No sé qué escribir
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Te generaremos una premisa, un tono, un personaje y una primera escena para arrancar.
              </p>
              <button
                onClick={handleGenerar}
                disabled={isLoading}
                className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                {textos.escritura.botonGenerar}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Input Section - Con Idea */}
      {modo === 'ya-tengo-idea' && (
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Modo: Ya tengo una idea
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Desarrollaremos tu idea con worldbuilding, conflictos, y detectaremos posibles contradicciones.
                </p>
              </div>
              <div>
                <label htmlFor="idea" className="mb-2 block text-sm font-medium text-card-foreground">
                  Tu idea
                </label>
                <textarea
                  id="idea"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder={textos.escritura.placeholderIdea}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                onClick={handleGenerar}
                disabled={isLoading || !idea.trim()}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                {textos.escritura.botonGenerar}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && <LoadingCards count={2} />}

      {/* Error State */}
      {error && <ErrorState message={error} onRetry={handleGenerar} />}

      {/* Results - Sin Idea */}
      {resultadoSinIdea && !isLoading && (
        <section className="space-y-6">
          {/* Premisa */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Premisa</h2>
            <p className="text-lg leading-relaxed text-card-foreground/90">{resultadoSinIdea.premisa}</p>
          </div>

          {/* Tono */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tono Narrativo
            </h3>
            <p className="leading-relaxed text-card-foreground/90">{resultadoSinIdea.tono}</p>
          </div>

          {/* Personaje */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tu Protagonista
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Nombre</p>
                <p className="mt-1 text-lg font-semibold text-card-foreground">
                  {resultadoSinIdea.personaje.nombre}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Descripción
                </p>
                <p className="mt-1 leading-relaxed text-card-foreground/90">
                  {resultadoSinIdea.personaje.descripcion}
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  Conflicto Interno
                </p>
                <p className="mt-1 leading-relaxed text-card-foreground/90">
                  {resultadoSinIdea.personaje.conflictoInterno}
                </p>
              </div>
            </div>
          </div>

          {/* Primera Escena */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Primera Escena
            </h3>
            <p className="text-lg italic leading-relaxed text-card-foreground/90">
              {resultadoSinIdea.primeraEscena}
            </p>
          </div>

          {/* Cards */}
          {tarjetasConEstado && tarjetasConEstado.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {tarjetasConEstado.map((tarjeta) => (
                <InspirationCard
                  key={tarjeta.id}
                  tarjeta={tarjeta}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Results - Con Idea */}
      {resultadoConIdea && !isLoading && (
        <section className="space-y-6">
          {/* Idea Original */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Tu Idea</h2>
            <p className="leading-relaxed text-card-foreground/90">{resultadoConIdea.ideaOriginal}</p>
          </div>

          {/* Worldbuilding - Reglas */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Reglas del Mundo
            </h3>
            <ul className="space-y-2">
              {resultadoConIdea.worldbuilding.reglas.map((regla, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-0.5 shrink-0 rounded bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">
                    {i + 1}
                  </span>
                  {regla}
                </li>
              ))}
            </ul>
          </div>

          {/* Worldbuilding - Conflictos */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Conflictos Potenciales
            </h3>
            <ul className="space-y-2">
              {resultadoConIdea.worldbuilding.conflictos.map((conflicto, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {conflicto}
                </li>
              ))}
            </ul>
          </div>

          {/* Contradicciones */}
          {resultadoConIdea.worldbuilding.contradicciones.length > 0 && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-destructive">
                  Posibles Contradicciones
                </h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Detectamos elementos que podrían generar inconsistencias. Resuélvelas antes de avanzar:
              </p>
              <ul className="space-y-2">
                {resultadoConIdea.worldbuilding.contradicciones.map((contradiccion, i) => (
                  <li key={i} className="text-card-foreground/90">
                    {contradiccion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preguntas de Investigación */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-secondary-foreground" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Preguntas de Investigación
              </h3>
            </div>
            <ul className="space-y-2">
              {resultadoConIdea.preguntasInvestigacion.map((pregunta, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {pregunta}
                </li>
              ))}
            </ul>
          </div>

          {/* Fact Check Requerido */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Requiere Fact-Check
              </h3>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Estos elementos deberían verificarse con fuentes reales:
            </p>
            <ul className="space-y-2">
              {resultadoConIdea.factCheckRequerido.map((item, i) => (
                <li key={i} className="text-card-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Cards */}
          {tarjetasConEstado && tarjetasConEstado.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {tarjetasConEstado.map((tarjeta) => (
                <InspirationCard
                  key={tarjeta.id}
                  tarjeta={tarjeta}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
