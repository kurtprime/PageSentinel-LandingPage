'use client'

import dynamic from 'next/dynamic'

const CalendlyEmbedInner = dynamic(
  () => import('@/components/landing/calendly-embed').then((m) => ({ default: m.CalendlyEmbed })),
  { ssr: false, loading: () => <div className="h-96 border-t border-border/40" /> }
)

export function CalendlyEmbedLazy() {
  return <CalendlyEmbedInner />
}
