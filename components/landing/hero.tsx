'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, useReducedMotion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Eye, ScanEye, ShieldCheck, Zap } from 'lucide-react'

/* ──────────────────────────────────────────
   Animated Count-Up Hook
   ────────────────────────────────────────── */

function useCountUp(target: number, start: boolean, duration = 1500) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration])

  return count
}

/* ──────────────────────────────────────────
   Stat Item with Count-Up
   ────────────────────────────────────────── */

function StatItem({
  icon: Icon,
  value,
  target,
  suffix = '',
  formatter,
  label,
}: {
  icon: React.ElementType
  value?: string
  target?: number
  suffix?: string
  formatter?: (n: number) => string
  label: string
}) {
  const [inView, setInView] = useState(false)
  const count = useCountUp(target ?? 0, inView)

  const display = target != null
    ? formatter
      ? formatter(count)
      : `${Math.round(count)}${suffix}`
    : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      onViewportEnter={() => setInView(true)}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 px-4 py-2.5"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
        <Icon className="h-4 w-4 text-emerald-600" />
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">{display}</p>
        <p className="text-[11px] text-muted-foreground">{label}</p>
      </div>
    </motion.div>
)
}

const SCAN_POSITIONS = [
  { top: '12%', left: '6%' },
  { top: '48%', left: '32%' },
  { top: '22%', left: '58%' },
  { top: '58%', left: '16%' },
]

/* ──────────────────────────────────────────
   Hero Component
   ────────────────────────────────────────── */

export function Hero() {
  const prefersReduced = useReducedMotion()
  const reticleControls = useAnimation()
  const reticleIndexRef = useRef(0)
  const loopAbortRef = useRef(false)

  const runReticleLoop = useCallback(async (controls: ReturnType<typeof useAnimation>) => {
    // eslint-disable-next-line no-constant-condition
    while (!loopAbortRef.current) {
      const pos = SCAN_POSITIONS[reticleIndexRef.current]
      reticleIndexRef.current = (reticleIndexRef.current + 1) % SCAN_POSITIONS.length

      if (loopAbortRef.current) return
      await controls.start({
        opacity: 1,
        top: pos.top,
        left: pos.left,
        borderColor: 'rgba(5, 150, 105, 0.5)',
        transition: { duration: 0.5, ease: 'easeOut' },
      })

      if (loopAbortRef.current) return
      await new Promise((r) => setTimeout(r, 2000))

      if (loopAbortRef.current) return
      await controls.start({
        scale: 1.05,
        borderColor: 'rgba(5, 150, 105, 0.85)',
        transition: { duration: 0.25 },
      })
      if (loopAbortRef.current) return
      await controls.start({
        scale: 1,
        borderColor: 'rgba(5, 150, 105, 0.3)',
        transition: { duration: 0.25 },
      })

      if (loopAbortRef.current) return
      await controls.start({
        opacity: 0,
        transition: { duration: 0.3 },
      })
    }
  }, [])

  useEffect(() => {
    if (prefersReduced) return
    loopAbortRef.current = false
    runReticleLoop(reticleControls)
    return () => {
      loopAbortRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced])

  return (
    <section className="relative overflow-hidden border-b border-border/40">
      {/* 1. Aurora Orbs */}
      {prefersReduced ? (
        <>
          <div className="absolute top-0 -left-1/4 h-[600px] w-[600px] bg-gradient-to-br from-emerald-200/40 via-teal-300/20 to-transparent rounded-full blur-[120px] -z-10" />
          <div className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] bg-gradient-to-tl from-teal-200/30 via-emerald-100/25 to-transparent rounded-full blur-[100px] -z-10" />
        </>
      ) : (
        <>
          <motion.div
            animate={{ x: ["-15%", "15%", "-15%"], y: ["-5%", "10%", "-5%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 -left-1/4 h-[600px] w-[600px] bg-gradient-to-br from-emerald-200/40 via-teal-300/20 to-transparent rounded-full blur-[120px] -z-10"
          />
          <motion.div
            animate={{ x: ["15%", "-10%", "15%"], y: ["10%", "-15%", "10%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] bg-gradient-to-tl from-teal-200/30 via-emerald-100/25 to-transparent rounded-full blur-[100px] -z-10"
          />
        </>
      )}

      {/* 2. Thin-line Grid */}
      <div
        className="absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_2px,transparent_2px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_2px,transparent_2px)]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_2px,transparent_2px)]
          bg-[size:64px_64px]
          [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]"
      />

      {/* 3. Noise Texture */}
      <div className="absolute inset-0 -z-10 opacity-[0.008] dark:opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />

      {/* 4. Scanning Beam */}
      {!prefersReduced && (
        <motion.div
          className="absolute left-0 right-0 h-px z-0 pointer-events-none bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent shadow-[0_0_30px_6px_rgba(5,150,105,0.35)]"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20 md:pt-28 md:pb-24">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12 lg:gap-16">

          {/* AI Bot Illustration — visible on all screens, above text on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-8 md:mb-0 md:justify-start shrink-0 w-64 lg:w-72 xl:w-80"
          >
            <div className="w-full">
              <Image
                src="/assets/ai-image.webp"
                alt="AI bot holding a magnifying glass — PageSentinel monitors your website so you don't have to"
                width={320}
                height={320}
                className="h-auto w-full"
                priority
              />
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left md:pt-4">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1 text-sm font-medium">
                <Eye className="h-3.5 w-3.5 text-emerald-600" />
                Website Change Monitoring
              </Badge>
              {/* ALT badge: "Know before your customers do" */}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.2rem]"
            >
              Stop finding broken pages after your customers do{' '}
              <span className="text-emerald-600">— finally know what changed and why.</span>
              {/* ALT: "Your pages broke. Your customer noticed first. Let's change that." */}
              {/* ALT: "Know what changed — before your phone lights up with another panicked client." */}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
            >
              Catch broken layouts, defacement, and unauthorized content changes on any public URL. Get a plain-English summary of exactly what happened — not just a raw diff. Stop finding out from your customers.
              {/* ALT: "Monitor any public URL from the outside. Get human-readable alerts with visual diffs. Your team knows first — every time." */}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:justify-start"
            >
              <Link href="/pricing" aria-label="Start free trial">
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  Start for free
                </Button>
              </Link>
              <a href="#book-demo" aria-label="Book a demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 text-lg font-semibold border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 shadow-sm transition-all hover:scale-105"
                >
                  <Calendar className="h-5 w-5" />
                  Book a demo
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 flex flex-col items-center gap-2 md:items-start"
            >
              <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                 7-day free trial · No credit card · Monitor up to 20 pages
                {/* ALT: "Add unlimited pages during trial · No credit card required" */}
              </p>
            </motion.div>

          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mx-auto mt-10 max-w-5xl md:mt-14"
        >
          {/* Browser Mockup with Live Indicator */}
          <div className="group overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-2xl shadow-emerald-900/10 transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/50 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                <motion.div
                  animate={prefersReduced ? { scale: 1, opacity: 1 } : { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="h-2 w-2 rounded-full bg-emerald-500"
                />
                LIVE — Monitoring 48 pages now
              </div>
            </div>
            <div className="relative">
              {/* Simulated Website — shows the types of issues PageSentinel detects */}
              <div
                className="w-full aspect-[16/9] bg-[#f4f5f7] text-left select-none overflow-hidden"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {/* Navbar */}
                <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-sm bg-emerald-500 shrink-0" />
                      <div className="h-2.5 w-12 sm:w-16 bg-gray-800 rounded-sm" />
                    </div>
                    <div className="hidden sm:flex gap-2 ml-2">
                      <div className="h-2 w-6 bg-gray-300 rounded-sm" />
                      <div className="h-2 w-8 bg-gray-200 rounded-sm" />
                      <div className="h-2 w-7 bg-gray-200 rounded-sm" />
                      <div className="h-2 w-10 bg-gray-200 rounded-sm" />
                    </div>
                  </div>
                  <div className="h-3 w-12 sm:w-16 bg-emerald-500 rounded-sm" />
                </div>

                {/* Page body */}
                <div className="px-4 pt-3 pb-1">
                  <div className="h-4 sm:h-5 w-1/2 bg-gray-800 rounded-sm mb-1" />
                  <div className="h-2.5 sm:h-3 w-1/3 bg-gray-300 rounded-sm mb-3" />

                  {/* Two-column: main (2/3) + sidebar (1/3) */}
                  <div className="grid grid-cols-[2fr_1fr] gap-3">
                    {/* ----- MAIN COLUMN ----- */}
                    <div className="space-y-2.5">
                      {/* ISSUE #1 — Broken Layout (reticle top:12%, left:6%) */}
                      <div className="relative p-2 bg-white rounded border border-red-200">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="h-2.5 sm:h-3 w-2/3 bg-gray-800 rounded-sm mb-1.5" />
                            <div className="h-1.5 sm:h-2 w-full bg-gray-100 rounded-sm mb-1" />
                            <div className="h-1.5 sm:h-2 w-5/6 bg-gray-100 rounded-sm" />
                          </div>
                          <div className="shrink-0 mt-1 p-1 sm:p-1.5 bg-red-100 rounded border border-red-300 relative -right-1">
                            <div className="h-1.5 sm:h-2 w-6 bg-red-300 rounded-sm mb-0.5" />
                            <div className="h-1 sm:h-1.5 w-8 bg-red-200 rounded-sm" />
                          </div>
                        </div>
                        <div className="absolute -top-2 left-2 bg-red-500 text-white text-[8px] sm:text-[9px] font-bold rounded-sm px-1.5 py-px leading-tight whitespace-nowrap">
                          BROKEN LAYOUT
                        </div>
                      </div>

                      {/* Normal card pair */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-white rounded border border-gray-200">
                          <div className="h-2 sm:h-2.5 w-3/4 bg-gray-300 rounded-sm mb-1" />
                          <div className="h-1.5 sm:h-2 w-full bg-gray-100 rounded-sm mb-0.5" />
                          <div className="h-1.5 sm:h-2 w-2/3 bg-gray-100 rounded-sm" />
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200">
                          <div className="h-2 sm:h-2.5 w-2/3 bg-gray-300 rounded-sm mb-1" />
                          <div className="h-1.5 sm:h-2 w-full bg-gray-100 rounded-sm mb-0.5" />
                          <div className="h-1.5 sm:h-2 w-3/4 bg-gray-100 rounded-sm" />
                        </div>
                      </div>

                      {/* ISSUE #3 — Content Changed (reticle top:48%, left:32%) */}
                      <div className="relative p-2 bg-white rounded border border-amber-300">
                        <div className="h-2 sm:h-2.5 w-1/2 bg-gray-800 rounded-sm mb-1.5" />
                        <div className="flex gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="h-1.5 sm:h-2 w-full bg-gray-100 rounded-sm mb-1" />
                            <div className="h-1.5 sm:h-2 w-5/6 bg-gray-100 rounded-sm mb-1" />
                            <div className="h-1.5 sm:h-2 w-4/6 bg-gray-100 rounded-sm" />
                          </div>
                          <div className="h-8 w-12 shrink-0 bg-amber-50 border border-amber-200 rounded flex items-center justify-center">
                            <span className="text-[8px] sm:text-[9px] text-amber-600 font-medium leading-tight text-center">
                              47%<br />DIFF
                            </span>
                          </div>
                        </div>
                        <div className="absolute -top-2 left-2 bg-amber-500 text-white text-[8px] sm:text-[9px] font-bold rounded-sm px-1.5 py-px leading-tight whitespace-nowrap">
                          CONTENT CHANGED
                        </div>
                      </div>

                      {/* ISSUE #4 — Broken Image (reticle top:58%, left:16%) */}
                      <div className="relative p-2 bg-white rounded border border-gray-200">
                        <div className="h-2 sm:h-2.5 w-1/3 bg-gray-300 rounded-sm mb-1.5" />
                        <div className="flex gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="h-1.5 sm:h-2 w-full bg-gray-100 rounded-sm mb-1" />
                            <div className="h-1.5 sm:h-2 w-3/4 bg-gray-100 rounded-sm mb-1" />
                            <div className="h-1 sm:h-1.5 w-1/2 bg-red-100 rounded-sm" />
                          </div>
                          <div className="h-10 w-14 shrink-0 bg-gray-200 rounded border border-red-300 flex items-center justify-center">
                            <span className="text-sm sm:text-base text-red-400">&#x1F5BC;</span>
                          </div>
                        </div>
                        <div className="absolute -bottom-2 left-2 bg-red-500 text-white text-[8px] sm:text-[9px] font-bold rounded-sm px-1.5 py-px leading-tight whitespace-nowrap">
                          BROKEN IMAGE
                        </div>
                      </div>
                    </div>

                    {/* ----- SIDEBAR ----- */}
                    <div className="space-y-3">
                      {/* ISSUE #2 — Defacement (reticle top:22%, left:58%) */}
                      <div className="relative p-2 bg-red-50 border-2 border-red-300 rounded shadow-sm">
                        <div className="text-[9px] sm:text-[10px] font-bold text-red-700 mb-1 leading-tight">
                          DEFACEMENT DETECTED
                        </div>
                        <div className="h-1.5 w-full bg-red-200 rounded-sm mb-1" />
                        <div className="text-[8px] sm:text-[9px] text-red-600 mb-1 leading-tight">
                          Unauthorized content injected by third party.
                        </div>
                        <div className="h-1.5 w-2/3 bg-red-200 rounded-sm" />
                        <div className="absolute -top-2 -right-1 bg-red-600 text-white text-[7px] sm:text-[8px] font-bold rounded-full px-1.5 py-0.5 leading-none whitespace-nowrap">
                          CRITICAL
                        </div>
                      </div>

                      {/* Normal sidebar widgets */}
                      <div className="p-2 bg-white rounded border border-gray-200">
                        <div className="h-2 sm:h-2.5 w-1/2 bg-gray-400 rounded-sm mb-1.5" />
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full shrink-0 bg-emerald-400" />
                            <div className="h-1.5 sm:h-2 w-full bg-gray-100 rounded-sm" />
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full shrink-0 bg-emerald-400" />
                            <div className="h-1.5 sm:h-2 w-4/5 bg-gray-100 rounded-sm" />
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full shrink-0 bg-gray-300" />
                            <div className="h-1.5 sm:h-2 w-3/5 bg-gray-100 rounded-sm" />
                          </div>
                        </div>
                      </div>

                      <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                        <div className="h-2 sm:h-2.5 w-2/3 bg-emerald-700/50 rounded-sm mb-1" />
                        <div className="h-1.5 sm:h-2 w-full bg-emerald-200 rounded-sm mb-1" />
                        <div className="h-1.5 sm:h-2 w-5/6 bg-emerald-200 rounded-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 mt-3 px-4 py-2 flex items-center justify-between">
                  <div className="flex gap-2 sm:gap-3">
                    <div className="h-1.5 sm:h-2 w-8 sm:w-10 bg-gray-200 rounded-sm" />
                    <div className="h-1.5 sm:h-2 w-7 sm:w-9 bg-gray-200 rounded-sm" />
                    <div className="h-1.5 sm:h-2 w-10 sm:w-12 bg-gray-200 rounded-sm" />
                  </div>
                  <div className="h-1.5 sm:h-2 w-12 sm:w-16 bg-gray-200 rounded-sm" />
                </div>
              </div>

              {/* CRT scanline overlay — covers entire mockup */}
              <div
                className="absolute top-[52px] bottom-0 left-0 right-0 pointer-events-none z-[6] opacity-[0.09] dark:opacity-[0.12]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 4px)',
                }}
              />

              {/* Scanning Reticle */}
              {!prefersReduced && (
                <motion.div
                  animate={reticleControls}
                  initial={{ opacity: 0 }}
                  className="absolute z-10 pointer-events-none"
                  style={{ width: 120, height: 80 }}
                >
                   <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-inherit rounded-tl-sm" />
                   <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-inherit rounded-tr-sm" />
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-inherit rounded-bl-sm" />
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-inherit rounded-br-sm" />
                   <div className="absolute inset-0 bg-emerald-400/[0.06]" />
                   <span className="absolute -top-5 left-0 text-[11px] text-emerald-500/90 font-mono tracking-wider">
                     Scanning...
                   </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Left-side floating scan card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -left-2 top-16 z-10 hidden rounded-lg border border-border bg-background/90 p-3 shadow-lg backdrop-blur sm:block lg:left-4"
          >
            <p className="text-[11px] font-semibold text-muted-foreground mb-2">Currently Monitoring</p>
            {[
              { name: 'homepage', status: 'healthy' },
              { name: 'pricing', status: 'healthy' },
              { name: 'blog', status: 'scanning' },
            ].map((site) => (
              <div key={site.name} className="flex items-center gap-2 py-1">
                {site.status === 'healthy' ? (
                  <motion.div
                    animate={prefersReduced ? { scale: 1, opacity: 1 } : { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
                <span className="text-[11px] text-foreground">{site.name}</span>
                {site.status === 'scanning' && (
                  <span className="ml-auto text-[10px] text-amber-600 font-medium">scanning...</span>
                )}
              </div>
            ))}
          </motion.div>

          {/* Alert Bubble (right side) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -right-2 top-16 z-10 hidden rounded-lg border border-red-200 bg-background p-3 shadow-lg sm:block md:block lg:right-4"
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100">
                <span className="text-sm">🚨</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-red-700">Human Review Required</p>
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-px leading-tight">Critical</Badge>
                </div>
                <p className="mt-0.5 text-[11px] text-red-600/80">Detected 502 error — Change Detected (32%)</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">2 min ago</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mx-auto mt-6 max-w-5xl rounded-xl border border-border/60 bg-muted/30"
        >
          <div className="grid grid-cols-2 divide-x divide-border/40 sm:grid-cols-4">
            <StatItem
              icon={ScanEye}
              target={10}
              suffix="M+"
              label="Pages Scanned"
            />
            <StatItem
              icon={ShieldCheck}
              target={99.7}
              formatter={(n) => `${n.toFixed(1)}%`}
              label="Detection Rate"
            />
            <StatItem
              icon={Zap}
              value="On-demand"
              label="Scan Frequency"
            />
            <StatItem
              icon={Clock}
              value="24/7"
              label="Continuous Monitoring"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
