import type { Metadata, Viewport } from 'next';
import { Roboto, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hoja en Blanco — Motor de Ignición Creativa',
  description:
    'Supera el bloqueo creativo con provocaciones diseñadas para artistas visuales, músicos y escritores. No somos un chatbot, somos tu chispa creativa.',
  keywords: [
    'creatividad',
    'bloqueo creativo',
    'inspiración',
    'arte',
    'música',
    'escritura',
    'prompts creativos',
  ],
  authors: [{ name: 'Hoja en Blanco' }],
  openGraph: {
    title: 'Hoja en Blanco — Motor de Ignición Creativa',
    description:
      'Convierte la hoja en blanco en tu primera decisión creativa. Provocaciones para artistas, músicos y escritores.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoja en Blanco — Motor de Ignición Creativa',
    description:
      'Supera el bloqueo creativo con provocaciones diseñadas para artistas visuales, músicos y escritores.',
  },
};

export const viewport: Viewport = {
  themeColor: '#E3DFCE',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
