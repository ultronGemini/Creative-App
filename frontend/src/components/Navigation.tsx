'use client';

import { Paintbrush, Music, Pen, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Modo } from '@/src/types';

interface NavigationProps {
  currentSection: 'inicio' | Modo;
  onNavigate: (section: 'inicio' | Modo) => void;
}

const navItems = [
  { id: 'inicio' as const, label: 'Inicio', icon: Home },
  { id: 'visual' as const, label: 'Visual', icon: Paintbrush },
  { id: 'musica' as const, label: 'Música', icon: Music },
  { id: 'escritura' as const, label: 'Escritura', icon: Pen },
];

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">PB</span>
            </div>
            <span className="hidden font-serif text-lg font-semibold text-foreground sm:block">
              Primer Boceto
            </span>
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-1 md:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'flex items-center justify-center rounded-lg p-2 transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
