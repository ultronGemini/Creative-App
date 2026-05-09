'use client';

import { useState } from 'react';
import { Music, Sparkles, Clock, Dumbbell, AlertTriangle } from 'lucide-react';
import { InspirationCard } from '@/src/components/InspirationCard';
import { LoadingCards } from '@/src/components/LoadingState';
import { ErrorState } from '@/src/components/ErrorState';
import { generarInspiracionMusical } from '@/src/services/api';
import { textos } from '@/src/config';
import type { InspiracionMusical, TarjetaInspiracion } from '@/src/types';

interface MusicaViewProps {
  tarjetasGuardadas: TarjetaInspiracion[];
  onToggleSave: (tarjeta: TarjetaInspiracion) => void;
}

const emocionesPreset = [
  'Nostalgia',
  'Alegría contenida',
  'Melancolía luminosa',
  'Tensión expectante',
  'Calma turbulenta',
  'Euforia silenciosa',
];

const instrumentosPreset = [
  'Piano',
  'Guitarra acústica',
  'Violín',
  'Sintetizador',
  'Voz',
  'Batería',
  'Bajo',
  'Flauta',
];

export function MusicaView({ tarjetasGuardadas, onToggleSave }: MusicaViewProps) {
  const [emocion, setEmocion] = useState('');
  const [instrumento, setInstrumento] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<InspiracionMusical | null>(null);

  // Merge saved state into result cards
  const tarjetasConEstado = resultado?.tarjetas.map((t) => ({
    ...t,
    guardada: tarjetasGuardadas.some((g) => g.id === t.id),
  }));

  const handleGenerar = async () => {
    if (!emocion.trim() || !instrumento.trim()) return;

    setIsLoading(true);
    setError(null);

    // TODO: Cuando el backend esté listo, esto llamará a:
    // POST /v1/inspiracion con { modo: 'musica', emocion, instrumento }
    // El backend usará:
    // - orquestador_musica para coordinar la generación
    // - Gemini generateContent con structured output JSON
    // - Posible análisis de audio en fases futuras
    const response = await generarInspiracionMusical(emocion, instrumento);

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
            <Music className="h-5 w-5" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {textos.musica.titulo}
          </h1>
        </div>
        <p className="text-muted-foreground">{textos.musica.descripcion}</p>
      </header>

      {/* Input Section */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="space-y-6">
          {/* Emoción */}
          <div>
            <label htmlFor="emocion" className="mb-2 block text-sm font-medium text-card-foreground">
              Emoción a explorar
            </label>
            <input
              id="emocion"
              type="text"
              value={emocion}
              onChange={(e) => setEmocion(e.target.value)}
              placeholder={textos.musica.placeholderEmocion}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {emocionesPreset.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmocion(e)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    emocion === e
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Instrumento */}
          <div>
            <label
              htmlFor="instrumento"
              className="mb-2 block text-sm font-medium text-card-foreground"
            >
              Tu instrumento
            </label>
            <input
              id="instrumento"
              type="text"
              value={instrumento}
              onChange={(e) => setInstrumento(e.target.value)}
              placeholder={textos.musica.placeholderInstrumento}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {instrumentosPreset.map((i) => (
                <button
                  key={i}
                  onClick={() => setInstrumento(i)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    instrumento === i
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleGenerar}
            disabled={isLoading || !emocion.trim() || !instrumento.trim()}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            {textos.musica.botonGenerar}
          </button>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && <LoadingCards count={2} />}

      {/* Error State */}
      {error && <ErrorState message={error} onRetry={handleGenerar} />}

      {/* Results */}
      {resultado && !isLoading && (
        <section className="space-y-6">
          {/* Summary */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">Dirección Musical</h2>
            <p className="leading-relaxed text-card-foreground/90">{resultado.resumen}</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
                <Music className="h-4 w-4 text-secondary-foreground" />
                <span className="text-sm font-medium text-secondary-foreground">
                  {resultado.instrumento}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
                <span className="text-sm font-medium text-primary">{resultado.emocion}</span>
              </div>
            </div>
          </div>

          {/* Tempo */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Tempo Sugerido
              </h3>
            </div>
            <p className="mt-3 text-lg font-medium text-card-foreground">{resultado.tempoSugerido}</p>
          </div>

          {/* References */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Referencias
            </h3>
            <ul className="space-y-2">
              {resultado.referencias.map((ref, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {ref}
                </li>
              ))}
            </ul>
          </div>

          {/* Musical Resources */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Recursos Musicales
            </h3>
            <ul className="space-y-2">
              {resultado.recursosMusicales.map((recurso, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {recurso}
                </li>
              ))}
            </ul>
          </div>

          {/* Exercises */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-secondary-foreground" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Ejercicios de Composición
              </h3>
            </div>
            <ul className="space-y-3">
              {resultado.ejercicios.map((ejercicio, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-border bg-muted/50 p-4 text-card-foreground/90"
                >
                  <span className="font-medium text-primary">#{i + 1}</span> {ejercicio}
                </li>
              ))}
            </ul>
          </div>

          {/* Creative Restrictions */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Restricciones Creativas
              </h3>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Las limitaciones generan creatividad. Intenta seguir estas restricciones:
            </p>
            <ul className="space-y-2">
              {resultado.restriccionesCreativas.map((restriccion, i) => (
                <li key={i} className="flex items-start gap-2 text-card-foreground/90">
                  <span className="mt-0.5 shrink-0 rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {restriccion}
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
