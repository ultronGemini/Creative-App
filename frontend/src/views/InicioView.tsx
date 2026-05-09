'use client';

import { Paintbrush, Music, Pen, Sparkles, Lightbulb, Zap } from 'lucide-react';
import { SectionCard } from '@/src/components/SectionCard';
import { textos } from '@/src/config';
import type { Modo } from '@/src/types';

interface InicioViewProps {
  onNavigate: (section: Modo) => void;
}

const secciones = [
  {
    id: 'visual' as Modo,
    titulo: 'Visual',
    descripcion:
      'Para artistas visuales, pintores, ilustradores y diseñadores. Genera direcciones visuales, paletas y conceptos para tu próxima obra.',
    icon: Paintbrush,
  },
  {
    id: 'musica' as Modo,
    titulo: 'Música',
    descripcion:
      'Para músicos que buscan inspiración para componer. Explora emociones, tempo, restricciones creativas y ejercicios.',
    icon: Music,
  },
  {
    id: 'escritura' as Modo,
    titulo: 'Escritura',
    descripcion:
      'Para escritores que enfrentan la página en blanco. Genera premisas, personajes, worldbuilding y más.',
    icon: Pen,
  },
];

const caracteristicas = [
  {
    icon: Sparkles,
    titulo: 'Provocaciones, no respuestas',
    descripcion:
      'No te decimos qué crear. Te provocamos para que descubras tu propia dirección.',
  },
  {
    icon: Lightbulb,
    titulo: 'Primera decisión creativa',
    descripcion:
      'Convertimos la parálisis de la hoja en blanco en un punto de partida concreto.',
  },
  {
    icon: Zap,
    titulo: 'Motor de ignición',
    descripcion:
      'Una vez que arrancas, el momentum creativo toma el control. Nosotros solo encendemos la chispa.',
  },
];

export function InicioView({ onNavigate }: InicioViewProps) {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-balance font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {textos.inicio.titulo}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {textos.inicio.subtitulo}
        </p>
      </section>

      {/* Section Cards */}
      <section>
        <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {textos.inicio.explicacion}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {secciones.map((seccion) => (
            <SectionCard
              key={seccion.id}
              title={seccion.titulo}
              description={seccion.descripcion}
              icon={seccion.icon}
              onClick={() => onNavigate(seccion.id)}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="rounded-2xl border border-border bg-card p-8 sm:p-12">
        <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-card-foreground">
          No somos un chatbot
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {caracteristicas.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.titulo} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">{feat.titulo}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feat.descripcion}</p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
