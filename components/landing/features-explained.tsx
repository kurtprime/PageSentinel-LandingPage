'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Eye, FileText, Code, History } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'

const features = [
  {
    icon: Eye,
    image: '/assets/feature-visual-monitoring.png',
    title: 'Visual website monitoring',
    description: 'Catch broken layouts, hidden sections, and corrupted page designs before they cost you a client. Screenshot diffs show exactly what shifted.',
    imageAlt: 'Before and after comparison showing a broken website layout detected and corrected',
  },
  {
    icon: FileText,
    image: '/assets/feature-content-monitoring.png',
    title: 'Website content monitoring',
    description: 'Know the moment text, pricing, or policies change — without manually checking pages. Catch edits that affect revenue before anyone notices.',
    imageAlt: 'Pricing table with a highlighted content change detected on a website page',
  },
  {
    icon: Code,
    image: '/assets/feature-structural-detection.png',
    title: 'Structural change detection',
    description: 'Spot HTML changes, redirect injections, and broken scripts that silently kill your forms and conversion paths. See the exact code that changed.',
    imageAlt: 'Code diff view showing injected redirect code detected on a checkout page',
  },
  {
    icon: History,
    image: '/assets/feature-audit-trail.png',
    title: 'Audit trail and alerts',
    description: 'Prove exactly what changed and when — with timestamped history and visual diffs. Send the report to your client and look like a hero.',
    imageAlt: 'Timeline dashboard showing detected website changes with severity badges',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function FeaturesExplained() {
  return (
    <section className="relative border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* ALT title: "See every change. Understand it instantly. Act before it costs you." */}
        <SectionHeader
          title="Everything you need to catch changes before your customers do"
          description="PageSentinel monitors your site from the outside — no plugins, no scripts, no access needed. Every detected change comes with a plain-English summary and a visual diff."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2"
        >
          {features.map(({ icon: Icon, image, imageAlt, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative flex flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200 sm:p-8"
            >
              {/* Feature illustration */}
              <div className="relative mx-auto mb-6 w-full overflow-hidden rounded-lg border border-border/60 aspect-[16/9]">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                />
                {/* Browser chrome dots */}
                <div className="pointer-events-none absolute left-2.5 top-2.5 flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-400/70" />
                  <div className="h-2 w-2 rounded-full bg-amber-400/70" />
                  <div className="h-2 w-2 rounded-full bg-emerald-400/70" />
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 mb-4 transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
