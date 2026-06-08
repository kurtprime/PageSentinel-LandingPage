'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Play,
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'

/* ──────────────────────────────────────────
   Interactive Demo
   ────────────────────────────────────────── */

type DemoStage =
  | 'idle'
  | 'updating'
  | 'broken'
  | 'detecting'
  | 'alerted'

export function InteractiveDemo() {
  const [stage, setStage] = useState<DemoStage>('idle')
  const [progress, setProgress] = useState(0)
  const [scanningSites, setScanningSites] = useState(0)

  const runDemo = useCallback(() => {
    setStage('updating')
    setProgress(0)

    const t1 = setTimeout(() => setStage('broken'), 2000)
    const t2 = setTimeout(() => setStage('detecting'), 4000)
    const t3 = setTimeout(() => setStage('alerted'), 5500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  useEffect(() => {
    if (stage === 'updating' || stage === 'broken') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 40)
      return () => clearInterval(interval)
    } else if (stage === 'detecting') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'detecting') {
      const t1 = setTimeout(() => setScanningSites(1), 500)
      const t2 = setTimeout(() => setScanningSites(2), 1000)
      const t3 = setTimeout(() => setScanningSites(3), 1500)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
  }, [stage])

  const resetDemo = () => {
    setStage('idle')
    setProgress(0)
    setScanningSites(0)
  }

  const progressColor =
    stage === 'detecting' ? 'bg-amber-500' : 'bg-emerald-500'

  const stageLabel =
    stage === 'detecting' ? 'Scanning for changes...' : 'Updating plugin...'

  return (
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-xl border border-border bg-background shadow-lg"
      >
        {/* Demo toolbar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-amber-400/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground border border-border/60">
              bakersfield-dental.com/wp-admin
            </div>
          </div>

          <div className="flex items-center gap-2">
            {stage === 'idle' && (
              <Button
                onClick={runDemo}
                size="sm"
                className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Play className="h-3.5 w-3.5" />
                Simulate Elementor Update
              </Button>
            )}
            {stage === 'alerted' && (
              <Button onClick={resetDemo} size="sm" variant="outline">
                Run again
              </Button>
            )}
          </div>
        </div>

        {/* Demo content */}
        <div className="relative min-h-[320px] sm:min-h-[420px]">
          {/* Progress bar with stage label */}
          <AnimatePresence>
            {(stage === 'updating' || stage === 'detecting') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between px-4 pt-3 pb-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {stageLabel}
                  </span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted">
                  <motion.div
                    className={`h-full ${progressColor}`}
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage content */}
          <AnimatePresence mode="wait">
            {stage === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative flex flex-col items-center justify-center px-6 py-16 text-center sm:py-24"
              >
                {/* Ghost preview of before/after */}
                <div className="absolute inset-0 opacity-[0.04] blur-sm pointer-events-none flex">
                  <div className="w-1/2 h-full relative">
                    <Image
                      src="/images/demo-before.png"
                      alt=""
                      width={1152}
                      height={864}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 h-full relative">
                    <Image
                      src="/images/demo-after.png"
                      alt=""
                      width={1152}
                      height={864}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100"
                >
                  <Play className="h-6 w-6 text-emerald-600" />
                </motion.div>
                <h3 className="relative mt-4 text-lg font-semibold text-foreground">
                  Watch PageSentinel catch a broken page in seconds
                </h3>
                <p className="relative mt-2 max-w-md text-sm text-muted-foreground">
                  Click &quot;Simulate Elementor Update&quot; to watch a plugin update break a client&apos;s homepage — and see PageSentinel detect it before anyone notices.
                </p>
              </motion.div>
            )}

            {(stage === 'updating' || stage === 'broken') && (
              <motion.div
                key="updating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                {/* Before/After Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="relative border-r border-border/40">
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant="secondary" className="text-xs">Before</Badge>
                    </div>
                    <Image
                      src="/images/demo-before.png"
                      alt="Website before update"
                      width={1152}
                      height={864}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant="destructive" className="text-xs">After Update</Badge>
                    </div>
                    <Image
                      src="/images/demo-after.png"
                      alt="Website after broken update"
                      width={1152}
                      height={864}
                      className="h-auto w-full object-cover"
                    />
                    {stage === 'broken' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.15, 0] }}
                        transition={{ repeat: 3, duration: 0.6 }}
                        className="absolute inset-0 bg-red-500 pointer-events-none"
                      />
                    )}
                  </div>
                </div>

                {/* Vertical sliding divider on broken reveal */}
                {stage === 'broken' && (
                  <motion.div
                    initial={{ left: '5%' }}
                    animate={{ left: '50%' }}
                    transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.1 }}
                    className="absolute inset-y-0 w-0.5 z-20 pointer-events-none bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  />
                )}

                {/* Status overlay */}
                <AnimatePresence>
                  {stage === 'updating' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2"
                    >
                      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 shadow-lg">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        >
                          <Sparkles className="h-4 w-4 text-amber-600" />
                        </motion.div>
                        <span className="text-sm font-medium text-amber-800">
                          Simulating Elementor 3.21 update...
                        </span>
                      </div>
                    </motion.div>
                  )}
                  {stage === 'broken' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2"
                    >
                      <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 shadow-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">
                          Homepage layout broken! Scanning all monitored sites...
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Detecting state */}
            {stage === 'detecting' && (
              <motion.div
                key="detecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center px-6 py-12 text-center sm:py-16"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100"
                >
                  <Shield className="h-6 w-6 text-emerald-600" />
                </motion.div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  PageSentinel is analyzing changes...
                </h3>

                <div className="mt-5 w-full max-w-sm space-y-2.5 text-left">
                  {scanningSites >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </motion.div>
                      <span className="text-sm text-foreground/90">
                        Scanning site 1/3: bakersfield-dental.com
                      </span>
                    </motion.div>
                  )}
                  {scanningSites >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </motion.div>
                      <span className="text-sm text-foreground/90">
                        Scanning site 2/3: pacific-dentistry.com
                      </span>
                    </motion.div>
                  )}
                  {scanningSites >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                      >
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </motion.div>
                      <span className="text-sm text-amber-800">
                        Scanning site 3/3: dr-smiles-family.com — broken!
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Alerted state */}
            {stage === 'alerted' && (
              <motion.div
                key="alerted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center px-6 py-12 text-center sm:py-16"
              >
                {/* Alert Card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="w-full max-w-lg rounded-xl border border-red-200 bg-white p-5 shadow-xl sm:p-6"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-red-800">
                        🚨 CRITICAL: Layout Break Detected
                      </p>
                      <p className="mt-1 text-sm text-red-700/80">
                        bakersfield-dental.com — Hero section layout destroyed after Elementor update
                      </p>
                    </div>
                  </div>

                  {/* Visual diff thumbnail */}
                  <div className="mt-4 overflow-hidden rounded-lg border border-border/50">
                    <div className="grid grid-cols-2 divide-x divide-border/50">
                      <div className="relative">
                        <div className="absolute top-1.5 left-1.5 z-10">
                          <Badge variant="secondary" className="text-[9px] px-1.5 py-0 leading-snug">
                            Before
                          </Badge>
                        </div>
                        <Image
                          src="/images/demo-before.png"
                          alt="Site before"
                          width={1152}
                          height={864}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute top-1.5 left-1.5 z-10">
                          <Badge variant="destructive" className="text-[9px] px-1.5 py-0 leading-snug">
                            After
                          </Badge>
                        </div>
                        <Image
                          src="/images/demo-after.png"
                          alt="Site after"
                          width={1152}
                          height={864}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg bg-muted/50 px-3 py-2">
                      <Clock className="mx-auto h-4 w-4 text-muted-foreground" />
                      <p className="mt-1 text-xs font-semibold text-foreground">~3 sec</p>
                      <p className="text-[10px] text-muted-foreground">Detection time</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 px-3 py-2">
                      <AlertTriangle className="mx-auto h-4 w-4 text-amber-500" />
                      <p className="mt-1 text-xs font-semibold text-foreground">Hero + Nav</p>
                      <p className="text-[10px] text-muted-foreground">Components affected</p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 px-3 py-2">
                      <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-600" />
                      <p className="mt-1 text-xs font-semibold text-emerald-700">Visual Diff</p>
                      <p className="text-[10px] text-emerald-600/80">Proof attached</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-left">
                    <p className="text-xs font-medium text-emerald-800">
                      ✅ Slack notification sent to #agency-ops
                    </p>
                    <p className="mt-0.5 text-xs text-emerald-700/70">
                      Visual diff image attached · 3 other sites checked — all clean
                    </p>
                  </div>
                </motion.div>

                {/* Post-demo CTA */}
                <div className="mt-6">
                  <a href="https://app.pagesentinel.com/signup?plan=Free-Trial">
                    <Button
                      size="lg"
                      className="h-12 px-8 text-base font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Start 7-day free trial
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </a>
                  <p className="mt-3 text-xs text-muted-foreground">
                    No credit card &middot; Add unlimited pages during trial &middot; Cancel anytime
                  </p>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-emerald-600">Your team knew in 3 seconds.</span> The client never found out.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

/* ──────────────────────────────────────────
   Testimonials
   ────────────────────────────────────────── */

const testimonials = [
  {
    quote:
      "We manage 67 WordPress sites for local businesses. After a major Elementor update, 14 client homepages lost their hero sections. PageSentinel caught all 14 within 30 minutes, with screenshot proof. We rolled back before a single client noticed.",
    name: 'David L.',
    role: 'Agency Ops Lead',
    rating: 5,
  },
  {
    quote:
      "A client's site got injected with pharma spam links via a vulnerable plugin. PageSentinel detected the new outbound links and alerted us. We cleaned it the same morning. The client still doesn't know it happened — that's the value.",
    name: 'Maria G.',
    role: 'WordPress Agency Owner',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:mt-16 sm:grid-cols-2">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="rounded-xl border border-border bg-background p-5 shadow-sm sm:p-6"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: t.rating }).map((_, j) => (
              <svg
                key={j}
                className="h-4 w-4 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90 sm:text-[15px]">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────
   Founder Note
   ────────────────────────────────────────── */

export function FounderNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="mx-auto mt-14 max-w-2xl text-center sm:mt-16"
    >
      <div className="rounded-xl border border-border bg-muted/30 px-5 py-5 sm:px-8 sm:py-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Built by a former agency developer</span>{' '}
          who spent too many weekends firefighting client sites. PageSentinel exists because no agency
          should learn about a broken client site from the client themselves.
        </p>
      </div>
    </motion.div>
  )
}
