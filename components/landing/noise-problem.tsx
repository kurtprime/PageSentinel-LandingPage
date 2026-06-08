'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Zap, ShieldCheck } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { cn } from '@/lib/utils'

const comparisons = [
  {
    name: 'Uptime Monitors',
    description: '"Site is up" — even when CSS is destroyed and the homepage is unreadable.',
    icon: AlertTriangle,
    iconBg: 'bg-red-100/80',
    iconColor: 'text-red-500',
    borderColor: 'border-red-200',
    bg: 'bg-red-50/30',
    problem: 'False Negatives',
  },
  {
    name: 'Visual Diff Tools',
    description: '"Changes detected" — but every minor theme update or content edit triggers an alert.',
    icon: AlertTriangle,
    iconBg: 'bg-amber-100/80',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-200',
    bg: 'bg-amber-50/30',
    problem: 'False Positives',
  },
  {
    name: 'PageSentinel AI',
    description: '"Hero section layout broken — 3 other sites OK — here\'s the diff image." Only the real issues. Never the noise.',
    icon: ShieldCheck,
    iconBg: 'bg-emerald-100/80',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-600',
    bg: 'bg-emerald-50/30',
    problem: null,
  },
]

export function NoiseProblem() {
  return (
    <section className="relative border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <SectionHeader
          badge="Why PageSentinel"
          title="Most monitoring tools cry wolf. Ours doesn't."
          description="The #1 complaint from agencies is too many false alarms. Here's what makes our AI different."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-3"
        >
          {comparisons.map((item, i) => {
            const Icon = item.icon
            const isPageSentinel = item.name === 'PageSentinel AI'

            return (
              <div
                key={item.name}
                className={cn(
                  'relative flex flex-col rounded-xl border p-6 sm:p-8',
                  isPageSentinel
                    ? 'border-emerald-600 bg-emerald-50/30 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-600/20'
                    : `${item.borderColor} ${item.bg} shadow-sm`
                )}
              >
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', item.iconBg)}>
                  <Icon className={cn('h-5 w-5', item.iconColor)} />
                </div>

                <h3 className={cn(
                  'mt-4 text-base font-bold',
                  isPageSentinel ? 'text-emerald-800' : 'text-foreground'
                )}>
                  {item.name}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.problem && (
                  <div className={cn(
                    'mt-4 rounded-md px-3 py-1.5 text-xs font-semibold inline-flex self-start',
                    item.problem === 'False Negatives'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  )}>
                    {item.problem}
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-[15px]"
        >
          Our AI is trained on thousands of WordPress themes and plugins. It knows a real CSS break from a benign font size change.{' '}
          <span className="font-semibold text-foreground">You only get pinged when it matters.</span>
        </motion.p>
      </div>
    </section>
  )
}
