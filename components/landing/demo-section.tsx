'use client'

import { Play } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { InteractiveDemo, Testimonials, FounderNote } from './interactive-demo'

export function DemoSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <SectionHeader
          badge="Interactive Demo"
          badgeIcon={Play}
          title="See PageSentinel catch a broken page — right now"
          description="Human-readable summaries, visual diffs, page history, and alerts that only fire when something actually changed."
          className="mb-12"
        />
        <InteractiveDemo />
        <Testimonials />
        <FounderNote />
      </div>
    </section>
  )
}
