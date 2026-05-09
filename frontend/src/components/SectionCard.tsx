'use client';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  accentColor?: 'primary' | 'secondary';
  className?: string;
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  onClick,
  accentColor = 'primary',
  className,
}: SectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex w-full flex-col items-start rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-all hover:shadow-lg sm:p-8',
        'hover:border-primary/30',
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
          accentColor === 'primary'
            ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
            : 'bg-secondary text-secondary-foreground group-hover:bg-secondary/80'
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold text-card-foreground">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {/* Action indicator */}
      <div className="mt-auto flex items-center gap-2 text-sm font-medium text-primary">
        <span>Explorar</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>

      {/* Hover accent */}
      <div
        className={cn(
          'absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl transition-all group-hover:w-full',
          accentColor === 'primary' ? 'bg-primary' : 'bg-secondary'
        )}
      />
    </button>
  );
}
