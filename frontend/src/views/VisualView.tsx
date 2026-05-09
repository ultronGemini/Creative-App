'use client';

import { useState } from 'react';
import { Sparkles, Shuffle, ArrowLeftRight, Paintbrush } from 'lucide-react';
import { InspirationCard } from '@/src/components/InspirationCard';
import { PaletteDisplay } from '@/src/components/PaletteDisplay';
import { LoadingCards } from '@/src/components/LoadingState';
import { ErrorState } from '@/src/components/ErrorState';
import { generarInspiracionVisual, generarOpuestos } from '@/src/services/api';
import { paletaNieblaCarmesi } from '@/src/data/mockData';
import { textos } from '@/src/config';
import type { InspiracionVisual, ResultadoOpuestos, TarjetaInspiracion } from '@/src/types';

interface VisualViewProps {
  tarjetasGuardadas: TarjetaInspiracion[];
  onToggleSave: (tarjeta: TarjetaInspiracion) => void;
}

export function VisualView({ tarjetasGuardadas, onToggleSave }: VisualViewProps) {
  const [concepto, setConcepto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<InspiracionVisual | null>(null);
  const [opuestos, setOpuestos] = useState<ResultadoOpuestos | null>(null);

  // Merge saved state into result cards
  const tarjetasConEstado = resultado?.tarjetas.map((t) => ({
    ...t,
    guardada: tarjetasGuardadas.some((g) => g.id === t.id),
  }));

  const handleGenerar = async () => {
    setIsLoading(true);
    setError(null);
    setOpuestos(null);

    // TODO: Cuando el backend esté listo, esto llamará a:
    // POST /v1/inspiracion con { modo: 'visual', concepto }
    // El backend usará orquestador_visual + Gemini generateContent
    const response = await generarInspiracionVisual(concepto);

    setIsLoading(false);
    if (response.success && response.data) {
      setResultado(response.data);
    } else {
      setError(response.error || textos.estados.error);
    }
  };

  const handleOpuestos = async () => {
    if (!concepto.trim()) return;

    setIsLoading(true);
    setError(null);
    setResultado(null);

    // TODO: Cuando el backend esté listo, esto llamará a:
    // POST /v1/opuestos con { concepto }
    // El backend usará orquestador_opuestos + Gemini
    const response = await generarOpuestos(concepto);

    setIsLoading(false);
    if (response.success && response.data) {
      setOpuestos(response.data);
    } else {
      setError(response.error || textos.estados.error);
    }
  };

  const handleAleatorio = async () => {
    setConcepto('');
    setIsLoading(true);
    setError(null);
    setOpuestos(null);

    const response = await generarInspiracionVisual('');
    setIsLoading(false);
    if (response.success && response.data) {
      setResultado(response.data);
    } else {
      setError(response.error || textos.estados.error);
    }
  };

  const handleToggleSave = (id: string) => {
    const tarjeta = resultado?.tarjetas.find((t) => t.id === id);
    if (tarjeta) {
      onToggleSave({
        ...tarjeta,
        guardada: !tarjetasGuardadas.some((g) => g.id === id),
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Paintbrush className="h-5 w-5" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {textos.visual.titulo}
          </h1>
        </div>
        <p className="text-muted-foreground">{textos.visual.descripcion}</p>
      </header>

      {/* Input Section */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="concepto" className="mb-2 block text-sm font-medium text-card-foreground">
              Concepto inicial
            </label>
            <input
              id="concepto"
              type="text"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder={textos.visual.placeholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleGenerar}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              {textos.visual.botonGenerar}
            </button>
            <button
              onClick={handleOpuestos}
              disabled={isLoading || !concepto.trim()}
              className="flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
            >
              <ArrowLeftRight className="h-4 w-4" />
              {textos.visual.botonOpuestos}
            </button>
            <button
              onClick={handleAleatorio}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              <Shuffle className="h-4 w-4" />
              {textos.visual.botonAleatorio}
            </button>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && <LoadingCards count={2} />}

      {/* Error State */}
      {error && <ErrorState message={error} onRetry={handleGenerar} />}

      {/* Results - Inspiración Visual */}
      {resultado && !isLoading && (
        <section className="space-y-6">
          {/* Summary */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Dirección Visual</h2>
            <p className="leading-relaxed text-card-foreground/90">{resultado.resumen}</p>
          </div>

          {/* Themes */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Temas Sugeridos
            </h3>
            <div className="flex flex-wrap gap-2">
              {resultado.temas.map((tema) => (
                <span
                  key={tema}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
                >
                  {tema}
                </span>
              ))}
            </div>
          </div>

          {/* Collage Ideas */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Ideas para Collage
            </h3>
            <ul className="space-y-2">
              {resultado.ideasCollage.map((idea, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {idea}
                </li>
              ))}
            </ul>
          </div>

          {/* Composition */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Composición
            </h3>
            <ul className="space-y-2">
              {resultado.composicion.map((comp, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {comp}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Palette */}
          <PaletteDisplay paleta={resultado.paleta} />

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

      {/* Results - Opuestos */}
      {opuestos && !isLoading && (
        <section className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Exploración de Opuestos</h2>
            <div className="flex items-center gap-4 text-center">
              <div className="flex-1 rounded-lg bg-muted p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Original
                </p>
                <p className="mt-1 font-semibold text-foreground">{opuestos.conceptoOriginal}</p>
              </div>
              <ArrowLeftRight className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div className="flex-1 rounded-lg bg-primary/10 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Opuesto</p>
                <p className="mt-1 font-semibold text-foreground">{opuestos.opuesto}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Fusiones Posibles
            </h3>
            <ul className="space-y-2">
              {opuestos.fusiones.map((fusion, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {fusion}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Dirección Visual Sugerida
            </h3>
            <p className="leading-relaxed text-card-foreground/90">{opuestos.direccionVisual}</p>
          </div>
        </section>
      )}

      {/* Reference Palette */}
      <section className="pt-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Paleta de Referencia
        </h3>
        <PaletteDisplay paleta={paletaNieblaCarmesi} />
      </section>
    </div>
  );
}
