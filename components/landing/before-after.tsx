'use client'

import { motion, easeOut } from 'framer-motion'
import { MessageSquare, Monitor, ShieldCheck, FileText, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const comparisons = [
  {
    before: {
      icon: MessageSquare,
      text: "Client WhatsApp at 11 p.m.: \"Our homepage looks weird\"",
      tone: 'negative',
    },
    after: {
      icon: Monitor,
      text: "Slack alert at 11:01 p.m.: \"3 sites affected by plugin CSS break — visual diffs attached for each\"",
      tone: 'positive',
    },
  },
  {
    before: {
      icon: Monitor,
      text: "Manual spot-checks on 40+ sites hoping nothing broke — and missing half the issues anyway",
      tone: 'negative',
    },
    after: {
      icon: Monitor,
      text: "One dashboard. Every client domain covered. Changes caught as they happen, not when someone complains.",
      tone: 'positive',
    },
  },
  {
    before: {
      icon: X,
      text: "Rebuilding trust after a defacement went unnoticed for 48 hours",
      tone: 'negative',
    },
    after: {
      icon: ShieldCheck,
      text: "Defacement caught in minutes, client never saw it, you look proactive instead of reactive.",
      tone: 'positive',
    },
  },
  {
    before: {
      icon: FileText,
      text: "Charging clients a retainer with no proof of the proactive work you actually do",
      tone: 'negative',
    },
    after: {
      icon: FileText,
      text: "Monthly Site Health Snapshots show every client exactly what you monitor and what you caught — retainer justified.",
      tone: 'positive',
    },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
} as const;

export function BeforeAfter() {
  return (
    <section id="features" className="relative border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            What changes when you catch breaks before your clients do
          </h2>
          {/* ALT: "The difference between firefighting and fire prevention" */}
          <p className="mt-4 text-muted-foreground">
            Every row below is a real agency scenario. See the difference PageSentinel makes.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 overflow-hidden rounded-xl border border-border bg-background shadow-sm sm:mt-16"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-b border-border bg-red-50/50 px-5 py-3.5 sm:border-r">
              <span className="text-sm font-semibold uppercase tracking-wider text-red-600/90">
                Before PageSentinel
              </span>
            </div>
            <div className="border-b border-border bg-emerald-50/50 px-5 py-3.5">
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                After PageSentinel
              </span>
            </div>
          </div>

          {/* Table Rows */}
          {comparisons.map((comparison, index) => {
            const BeforeIcon = comparison.before.icon
            const AfterIcon = comparison.after.icon
            const isLast = index === comparisons.length - 1

            return (
              <motion.div
                key={index}
                variants={rowVariants}
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2',
                  !isLast && 'border-b border-border'
                )}
              >
                {/* Before */}
                <div className={cn(
                  'flex items-start gap-3 px-5 py-4 sm:border-r sm:py-5',
                  !isLast && 'border-b border-border sm:border-b-0'
                )}>
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100/80">
                    <BeforeIcon className="h-3.5 w-3.5 text-red-500" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {comparison.before.text}
                  </p>
                </div>

                {/* After */}
                <div className="flex items-start gap-3 px-5 py-4 sm:py-5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100/80">
                    <AfterIcon className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-foreground">
                    {comparison.after.text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}