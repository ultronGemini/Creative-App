'use client';

import { useState, useCallback } from 'react';
import { Shell } from '@/src/components/Shell';
import { SavedBoard } from '@/src/components/SavedBoard';
import { InicioView } from '@/src/views/InicioView';
import { VisualView } from '@/src/views/VisualView';
import { MusicaView } from '@/src/views/MusicaView';
import { EscrituraView } from '@/src/views/EscrituraView';
import type { Modo, TarjetaInspiracion } from '@/src/types';

type Section = 'inicio' | Modo;

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState<Section>('inicio');
  const [tarjetasGuardadas, setTarjetasGuardadas] = useState<TarjetaInspiracion[]>([]);

  const handleNavigate = useCallback((section: Section) => {
    setCurrentSection(section);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleSave = useCallback((tarjeta: TarjetaInspiracion) => {
    setTarjetasGuardadas((prev) => {
      const exists = prev.some((t) => t.id === tarjeta.id);
      if (exists) {
        // Remove from saved
        return prev.filter((t) => t.id !== tarjeta.id);
      } else {
        // Add to saved
        return [...prev, { ...tarjeta, guardada: true }];
      }
    });
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'inicio':
        return <InicioView onNavigate={handleNavigate} />;
      case 'visual':
        return (
          <VisualView
            tarjetasGuardadas={tarjetasGuardadas}
            onToggleSave={handleToggleSave}
          />
        );
      case 'musica':
        return (
          <MusicaView
            tarjetasGuardadas={tarjetasGuardadas}
            onToggleSave={handleToggleSave}
          />
        );
      case 'escritura':
        return (
          <EscrituraView
            tarjetasGuardadas={tarjetasGuardadas}
            onToggleSave={handleToggleSave}
          />
        );
      default:
        return <InicioView onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Shell currentSection={currentSection} onNavigate={handleNavigate}>
        {renderSection()}
      </Shell>
      <SavedBoard tarjetas={tarjetasGuardadas} onToggleSave={handleToggleSave} />
    </>
  );
}
