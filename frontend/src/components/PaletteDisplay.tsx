'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Paleta } from '@/src/types';

interface PaletteDisplayProps {
  paleta: Paleta;
  className?: string;
}

export function PaletteDisplay({ paleta, className }: PaletteDisplayProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className={cn('rounded-xl border border-border bg-card p-4 sm:p-6', className)}>
      <h4 className="mb-4 text-sm font-semibold text-card-foreground">{paleta.nombre}</h4>
      <div className="flex flex-wrap gap-3">
        {paleta.colores.map((color) => (
          <button
            key={color.hex}
            onClick={() => handleCopyColor(color.hex)}
            className="group flex flex-col items-center gap-2"
            title={`Copiar ${color.hex}`}
          >
            <div
              className="relative h-12 w-12 rounded-lg border border-border shadow-sm transition-transform group-hover:scale-105 sm:h-14 sm:w-14"
              style={{ backgroundColor: color.hex }}
            >
              {copiedColor === color.hex && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                  <Check className="h-5 w-5 text-white" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
                {copiedColor !== color.hex && <Copy className="h-4 w-4 text-white drop-shadow-md" />}
              </div>
            </div>
            <span className="max-w-[60px] truncate text-center text-xs text-muted-foreground">
              {color.nombre}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
