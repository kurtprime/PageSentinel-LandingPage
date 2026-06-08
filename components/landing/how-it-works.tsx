'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Plus, Check, Play, AlertCircle, X } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { cn } from '@/lib/utils'

/* ─── Step 1: Add URLs interactive widget ─── */

function AddUrlWidget() {
  const [input, setInput] = useState('')
  const [urls, setUrls] = useState<string[]>([
    'client-site.com',
    'my-agency.com',
  ])
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    const clean = input.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')
    if (!clean || urls.includes(clean)) return
    setUrls((prev) => [clean, ...prev])
    setInput('')
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="w-full space-y-2.5">
      <div className="flex gap-1.5">
        <div className="relative flex-1">
          <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste a URL..."
            className="w-full h-8 rounded-md border border-border bg-muted/40 pl-7 pr-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className={cn(
            'flex shrink-0 items-center gap-1 rounded-md px-2.5 h-8 text-xs font-medium transition-all',
            input.trim()
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-muted text-muted-foreground cursor-not-allowed',
          )}
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      <div className="space-y-1">
        <AnimatePresence>
          {urls.map((url, i) => (
            <motion.div
              key={`${url}-${i}`}
              initial={i === 0 && added ? { opacity: 0, scale: 0.95, y: -4 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 rounded-md bg-muted/30 border border-border/40 px-2.5 py-1"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs text-foreground truncate flex-1">{url}</span>
              {i === 0 && added && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[10px] text-emerald-600 font-medium"
                >
                  Added!
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Step 2: Choose frequency interactive widget ─── */

const FREQUENCIES = [
  { label: '5m', value: 'every 5 min' },
  { label: '15m', value: 'every 15 min' },
  { label: '1h', value: 'every hour' },
  { label: '6h', value: 'every 6 hours' },
  { label: '24h', value: 'daily' },
]

function FrequencyWidget() {
  const [selected, setSelected] = useState(1)
  const [pressed, setPressed] = useState(false)

  const handleSelect = (index: number) => {
    setSelected(index)
    setPressed(true)
    setTimeout(() => setPressed(false), 600)
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap gap-1 justify-center">
        {FREQUENCIES.map((freq, i) => (
          <button
            key={freq.value}
            onClick={() => handleSelect(i)}
            className={cn(
              'rounded-md px-2 py-1 text-[11px] font-medium transition-all border',
              selected === i
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-muted/40 text-muted-foreground border-border/60 hover:border-emerald-300 hover:text-foreground',
            )}
          >
            {freq.label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {pressed && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-1.5"
          >
            <Check className="h-3 w-3 text-emerald-500" />
            <span className="text-[11px] text-emerald-600 font-medium">
              Scanning {FREQUENCIES[selected].value}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Step 3: Get alerted interactive widget ─── */

function AlertWidget() {
  const [triggered, setTriggered] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const handleTrigger = () => {
    setDismissed(false)
    setTriggered(true)
  }

  return (
    <div className="w-full space-y-2">
      {!triggered ? (
        <button
          onClick={handleTrigger}
          className="w-full flex items-center justify-center gap-1.5 rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground hover:border-emerald-300 hover:text-foreground transition-colors"
        >
          <Play className="h-3 w-3" />
          Simulate alert
        </button>
      ) : (
        <AnimatePresence>
          {!dismissed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative rounded-lg border border-red-200 bg-red-50/60 p-2.5"
            >
              <button
                onClick={() => setDismissed(true)}
                className="absolute top-1 right-1 p-0.5 rounded-sm hover:bg-red-100 transition-colors"
              >
                <X className="h-3 w-3 text-red-400" />
              </button>
              <div className="flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 mt-0.5">
                  <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-red-800">
                    Layout break on homepage
                  </p>
                  <p className="mt-0.5 text-[10px] text-red-600/80 leading-relaxed">
                    client-site.com — hero section destroyed. Slack alert sent to #agency-ops.
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-700">
                    <Check className="h-3 w-3" />
                    Visual diff attached
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {dismissed && (
        <button
          onClick={() => {
            setTriggered(false)
            setDismissed(false)
          }}
          className="w-full text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset &amp; try again
        </button>
      )}
    </div>
  )
}

/* ─── Step definitions ─── */

const steps = [
  {
    number: '1',
    title: 'Add URLs',
    description:
      'Paste the pages you care about. Group by client or project. No plugins, no access — monitoring starts from the outside.',
    widget: AddUrlWidget,
  },
  {
    number: '2',
    title: 'Choose frequency',
    description:
      'Set a default cadence, then give critical pages more frequent scans. Run on demand when you need an answer now.',
    widget: FrequencyWidget,
  },
  {
    number: '3',
    title: 'Get alerted',
    description:
      'Dashboard, Slack, webhook, or SMS. Know what changed the moment it happens — with a plain-English summary and visual diff.',
    widget: AlertWidget,
  },
]

/* ─── Animation variants ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

/* ─── Component ─── */

export function HowItWorks() {
  return (
    <section className="relative border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <SectionHeader
          title="Start monitoring in 3 minutes"
          description="Paste your URLs, pick a scan frequency, and catch changes before your customers do — all from one dashboard."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-3"
        >
          {steps.map((step) => {
            const StepWidget = step.widget
            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                className="relative flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center shadow-sm sm:p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 mb-4">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Interactive widget */}
                <div className="mt-4 w-full max-w-[260px]">
                  <StepWidget />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Add your first URLs and see a change report in minutes — no setup, no plugins.
        </p>
      </div>
    </section>
  )
}
