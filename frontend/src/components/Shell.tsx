'use client';

import { Navigation } from './Navigation';
import type { Modo } from '@/src/types';

interface ShellProps {
  children: React.ReactNode;
  currentSection: 'inicio' | Modo;
  onNavigate: (section: 'inicio' | Modo) => void;
}

export function Shell({ children, currentSection, onNavigate }: ShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentSection={currentSection} onNavigate={onNavigate} />
      <main className="mx-auto max-w-6xl border-t border-[#1e1b5e] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {children}
      </main>
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Primer Boceto — Motor de Ignición Creativa
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            No somos un chatbot. Somos provocaciones para tu creatividad.
          </p>
        </div>
      </footer>
    </div>
  );
}
