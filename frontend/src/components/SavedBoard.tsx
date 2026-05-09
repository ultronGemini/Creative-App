'use client';

import { Layers, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InspirationCardCompact } from './InspirationCard';
import type { TarjetaInspiracion } from '@/src/types';

interface SavedBoardProps {
  tarjetas: TarjetaInspiracion[];
  onToggleSave: (id: string) => void;
}

export function SavedBoard({ tarjetas, onToggleSave }: SavedBoardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const savedCount = tarjetas.filter((t) => t.guardada).length;

  if (savedCount === 0) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <Layers className="h-5 w-5" />
        <span>Board ({savedCount})</span>
      </button>

      {/* Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div
            className={cn(
              'fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-hidden bg-card shadow-2xl',
              'animate-in slide-in-from-right duration-300'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-card-foreground">
                  Tu Board de Sesión
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Cerrar board"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="h-[calc(100vh-73px)] overflow-y-auto p-6">
              <p className="mb-4 text-sm text-muted-foreground">
                Las tarjetas guardadas permanecen solo durante esta sesión.
              </p>
              <div className="flex flex-col gap-3">
                {tarjetas
                  .filter((t) => t.guardada)
                  .map((tarjeta) => (
                    <InspirationCardCompact
                      key={tarjeta.id}
                      tarjeta={tarjeta}
                      onToggleSave={onToggleSave}
                    />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
