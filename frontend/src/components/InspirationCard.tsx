'use client';

import { Bookmark, BookmarkCheck, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { TarjetaInspiracion } from '@/src/types';

interface InspirationCardProps {
  tarjeta: TarjetaInspiracion;
  onToggleSave: (id: string) => void;
  className?: string;
}

export function InspirationCard({ tarjeta, onToggleSave, className }: InspirationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${tarjeta.titulo}\n\n${tarjeta.contenido}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      className={cn(
        'group relative rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-card-foreground">{tarjeta.titulo}</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={copied ? 'Copiado' : 'Copiar contenido'}
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={() => onToggleSave(tarjeta.id)}
            className={cn(
              'rounded-lg p-2 transition-colors',
              tarjeta.guardada
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
            aria-label={tarjeta.guardada ? 'Quitar de guardados' : 'Guardar en board'}
          >
            {tarjeta.guardada ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="leading-relaxed text-card-foreground/90">{tarjeta.contenido}</p>

      {/* Tags */}
      {tarjeta.tags && tarjeta.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tarjeta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Saved indicator */}
      {tarjeta.guardada && (
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary" />
      )}
    </article>
  );
}

// Variante más compacta para el board
export function InspirationCardCompact({
  tarjeta,
  onToggleSave,
  className,
}: InspirationCardProps) {
  return (
    <article
      className={cn(
        'group relative rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-card-foreground">{tarjeta.titulo}</h4>
          <p className="mt-1 line-clamp-2 text-sm text-card-foreground/80">
            {tarjeta.contenido}
          </p>
        </div>
        <button
          onClick={() => onToggleSave(tarjeta.id)}
          className="shrink-0 rounded-lg p-1.5 text-primary transition-colors hover:bg-primary/10"
          aria-label="Quitar de guardados"
        >
          <BookmarkCheck className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
