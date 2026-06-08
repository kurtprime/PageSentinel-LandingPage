'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { X, Check, Frown, Smile, ArrowRight, ScanLine } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const leftItems = [
  'Log into each client site manually — every morning, before coffee',
  'Spot-check a handful of pages and pray the other 40 are fine',
  'Learn about a broken layout from a panicked client call — three days after it happened',
  'No snapshot of what the page looked like before — no way to prove what changed or when',
  'Spend evenings undoing damage you could have caught in seconds',
]

const rightItems = [
  'Automatic scans cover every page, around the clock — zero manual work',
  'Visual diffs catch layout breaks instantly, not just error codes',
  'Plain-English alerts tell you what changed, the moment it happens',
  'Timestamped audit trail proves exactly when and what changed — send it to the client',
  'Know before your customers do — even if it breaks at 3 AM',
]

const leftContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const rightContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const leftItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

const rightItemVariants = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

export function WhyExists() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <style>{`
        @keyframes we-drift1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(30px, -20px); opacity: 0.8; }
        }
        @keyframes we-drift2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(-25px, -15px); opacity: 0.7; }
        }
        @keyframes we-drift3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          50% { transform: translate(20px, 25px); opacity: 0.9; }
        }
        @keyframes we-drift4 {
          0%, 100% { transform: translate(0, 0); opacity: 0.35; }
          50% { transform: translate(-30px, 20px); opacity: 0.75; }
        }
        @keyframes we-drift5 {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(15px, -30px); opacity: 0.8; }
        }
        @keyframes we-drift6 {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(-20px, -25px); opacity: 0.7; }
        }
        @keyframes we-border-pulse {
          0%, 100% {
            border-color: rgba(5, 150, 105, 0.15);
            box-shadow: 0 0 8px rgba(5, 150, 105, 0.1);
          }
          50% {
            border-color: rgba(5, 150, 105, 0.4);
            box-shadow: 0 0 16px rgba(5, 150, 105, 0.25);
          }
        }
        @keyframes we-image-border-pulse {
          0%, 100% { border-color: rgba(5, 150, 105, 0); }
          50% { border-color: rgba(5, 150, 105, 0.25); }
        }
        @keyframes we-squigglevision {
          0%   { filter: url("#we-squiggle-1"); }
          25%  { filter: url("#we-squiggle-2"); }
          50%  { filter: url("#we-squiggle-3"); }
          75%  { filter: url("#we-squiggle-4"); }
          100% { filter: url("#we-squiggle-5"); }
        }
        @keyframes we-magnifier-sweep {
          0%   { left: -5%; top: 42%; transform: rotate(-3deg); opacity: 0; }
          2%   { opacity: 0.85; }
          25%  { top: 33%; transform: rotate(2deg); }
          50%  { top: 47%; transform: rotate(-1deg); }
          75%  { top: 38%; transform: rotate(1deg); }
          95%  { opacity: 0.85; }
          100% { left: 98%; top: 44%; transform: rotate(0deg); opacity: 0; }
        }
      `}</style>

      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="we-glitch" x="-10%" y="-10%" width="120%" height="120%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.02 0.3" numOctaves="2" seed="3"
                          result="turbulence">
              <animate attributeName="seed" values="1;200;45;150;5;80;1"
                       dur="0.4s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="6"
                               xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="we-squiggle-1" x="-10%" y="-10%" width="120%" height="120%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
                               xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="we-squiggle-2" x="-10%" y="-10%" width="120%" height="120%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
                               xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="we-squiggle-3" x="-10%" y="-10%" width="120%" height="120%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.020" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
                               xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="we-squiggle-4" x="-10%" y="-10%" width="120%" height="120%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
                               xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="we-squiggle-5" x="-10%" y="-10%" width="120%" height="120%"
                  colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
                                xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <symbol id="we-magnifier" viewBox="0 0 100 100">
            {/* Scan beam cone */}
            <polygon points="10,45 80,45 60,85 30,85" fill="url(#we-scan-gradient)" className="opacity-25" />
            {/* Handle */}
            <line x1="70" y1="70" x2="95" y2="95" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-emerald-500/45" />
            {/* Lens ring */}
            <circle cx="45" cy="45" r="35" fill="none" stroke="currentColor" strokeWidth="5" className="text-emerald-400/45" />
            {/* Lens glass */}
            <circle cx="45" cy="45" r="32" fill="currentColor" className="text-emerald-400/[0.06]" />
            {/* Glint highlight */}
            <ellipse cx="32" cy="26" rx="16" ry="10" fill="currentColor" className="text-white/12" transform="rotate(-35 32 26)" />
          </symbol>
          <linearGradient id="we-scan-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* A3: Badge eyebrow above heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-sm font-medium">
            <ScanLine className="h-3.5 w-3.5 text-emerald-600" />
            Before & After
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            You shouldn&apos;t be the last to know your pages broke
              {/* ALT: "Your client shouldn't be your alert system" */}
          </h2>
        </motion.div>

        {/* C4/C6: Image with scanning overlay + border pulse */}
        <div className="relative mx-auto mb-10 max-w-2xl overflow-hidden rounded-xl border border-border/40 shadow-sm">
          {/* C6: Image border pulse — thin emerald border that breathes opacity */}
          {!prefersReduced && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none z-10 border-2"
              style={{ animation: 'we-image-border-pulse 3s ease-in-out infinite' }}
            />
          )}
          <Image
            src="/assets/without-vs-with.png"
            alt="Side-by-side comparison: manual page checking vs. PageSentinel's automated scanning dashboard"
            width={672}
            height={378}
            className="w-full"
            priority={false}
          />
          {/* CRT scanline overlay on image */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none z-[5] opacity-[0.10] dark:opacity-[0.12]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 4px)',
            }}
          />
          {/* Squigglevision overlay — subtle continuous wobble */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none z-[9]"
            style={{
              animation: 'we-squigglevision 0.4s infinite alternate',
              opacity: 0.8,
              backgroundImage: 'linear-gradient(0deg, transparent 40%, rgba(0,255,255,0.15) 40%, rgba(0,255,255,0.15) 42%, transparent 42%, transparent 58%, rgba(255,0,255,0.12) 58%, rgba(255,0,255,0.12) 60%, transparent 60%)',
            }}
          />
          {/* C4: SVG glitch displacement filter on image — intermittent pixel distortion */}
          {!prefersReduced && (
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none z-10"
              style={{
                filter: 'url(#we-glitch)',
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.1) 3px, rgba(0,255,255,0.1) 4px, transparent 4px, transparent 7px, rgba(255,0,255,0.08) 7px, rgba(255,0,255,0.08) 8px, transparent 8px, transparent 10px)',
              }}
              animate={{ opacity: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>

        {/* A2: Grid wrapped in its own relative container for arrow positioning */}
        <div className="relative">
          {/* A1: Neural glow orbs — moved inside grid wrapper, tighter to cards */}
          {!prefersReduced ? (
            <>
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-red-100/50 blur-[100px] pointer-events-none -z-10"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-emerald-100/50 blur-[100px] pointer-events-none -z-10"
              />
            </>
          ) : (
            <>
              <div className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-red-100/50 blur-[100px] pointer-events-none -z-10" />
              <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-emerald-100/50 blur-[100px] pointer-events-none -z-10" />
            </>
          )}

          {/* C5: 6 subtle data-particle dots near the "With" card — CSS-only, pointer-events-none, hidden below sm */}
          {!prefersReduced && (
            <>
              <div className="absolute right-0 top-1/4 hidden sm:block pointer-events-none z-0">
                <div className="h-1 w-1 rounded-full bg-emerald-400/40" style={{ animation: 'we-drift1 6s ease-in-out infinite' }} />
              </div>
              <div className="absolute right-8 top-1/3 hidden sm:block pointer-events-none z-0">
                <div className="h-0.5 w-0.5 rounded-full bg-emerald-400/30" style={{ animation: 'we-drift2 7s ease-in-out infinite 0.5s' }} />
              </div>
              <div className="absolute right-4 top-2/3 hidden sm:block pointer-events-none z-0">
                <div className="h-1 w-1 rounded-full bg-emerald-400/35" style={{ animation: 'we-drift3 5s ease-in-out infinite 1s' }} />
              </div>
              <div className="absolute right-12 top-1/2 hidden sm:block pointer-events-none z-0">
                <div className="h-0.5 w-0.5 rounded-full bg-emerald-400/40" style={{ animation: 'we-drift4 8s ease-in-out infinite 0.7s' }} />
              </div>
              <div className="absolute right-6 top-3/4 hidden sm:block pointer-events-none z-0">
                <div className="h-1 w-1 rounded-full bg-emerald-400/30" style={{ animation: 'we-drift5 6.5s ease-in-out infinite 1.5s' }} />
              </div>
              <div className="absolute right-10 top-2/5 hidden sm:block pointer-events-none z-0">
                <div className="h-0.5 w-0.5 rounded-full bg-emerald-400/35" style={{ animation: 'we-drift6 7.5s ease-in-out infinite 2s' }} />
              </div>
            </>
          )}

          {/* B0: Scanning magnifying glass — sweeps left→right across the cards, behind content */}
          {!prefersReduced && (
            <div
              className="absolute pointer-events-none z-[-5] hidden sm:block"
              style={{
                width: 140,
                height: 140,
                animation: 'we-magnifier-sweep 14s ease-in-out infinite',
                filter: 'drop-shadow(0 0 16px rgba(5,150,105,0.35)) drop-shadow(0 0 32px rgba(5,150,105,0.15))',
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <use href="#we-magnifier" />
              </svg>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2">
            {/* LEFT: "Without" Card — STATIC, no ambient animation */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative rounded-xl border border-red-200 bg-red-50/40 p-6 sm:p-8"
            >
              <div className="absolute right-4 top-4 opacity-[0.06] pointer-events-none">
                <Frown className="h-20 w-20 text-red-600" />
              </div>
              {/* CRT scanlines */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none z-[5] opacity-[0.09] dark:opacity-[0.11]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 4px)',
                }}
              />
              <span className="text-sm font-semibold uppercase tracking-wider text-red-600/90">
                Without PageSentinel
              </span>
              {/* B1/B2: Staggered list — items slide in from left */}
              <motion.ul
                variants={leftContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="mt-5 space-y-4"
              >
                {leftItems.map((item, i) => (
                  <motion.li key={i} variants={leftItemVariants} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100/80">
                      <X className="h-3.5 w-3.5 text-red-500" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* RIGHT: "With" Card — ALIVE, active monitoring feel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="relative rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8"
              style={!prefersReduced ? { animation: 'we-border-pulse 3s ease-in-out infinite' } : undefined}
            >
              <div className="absolute right-4 top-4 opacity-[0.06] pointer-events-none">
                <Smile className="h-20 w-20 text-emerald-600" />
              </div>
              {/* CRT scanlines */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none z-[5] opacity-[0.09] dark:opacity-[0.11]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(5,150,105,0.20) 2px, rgba(5,150,105,0.20) 4px)',
                }}
              />

              {/* C3: LIVE/ACTIVE dot + label — matches Hero pattern, smaller scale */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                  With PageSentinel
                </span>
                {!prefersReduced && (
                  <div className="flex items-center gap-1.5 rounded-md bg-emerald-100/60 px-2 py-0.5">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                    />
                    <span className="text-[10px] font-medium text-emerald-700 font-mono">ACTIVE</span>
                  </div>
                )}
              </div>

              {/* B1/B2: Staggered list — items slide in from right */}
              <motion.ul
                variants={rightContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="mt-5 space-y-4"
              >
                {rightItems.map((item, i) => (
                  <motion.li key={i} variants={rightItemVariants} className="flex items-start gap-3">
                    {/* B3: Check icon pulses once on entry */}
                    <motion.div
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100/80"
                      initial={{ scale: 1 }}
                      whileInView={{ scale: [1, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.08 + 0.15 }}
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </motion.div>
                    <p className="text-sm font-medium leading-relaxed text-foreground">
                      {item}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          {/* B4: Bridge arrow — positioned inside the grid wrapper (fixed), with pulsing ring effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex z-10"
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              {/* Pulsing concentric rings — suggests energy/transformation */}
              {!prefersReduced && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-emerald-300/40"
                    animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-emerald-300/30"
                    animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-sm"
              >
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* D1/D2: Tagline badge — revised copy, check settles then badge fades in */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-3 rounded-full
            border border-emerald-200 bg-emerald-50/60 px-6 py-3 backdrop-blur-sm sm:mt-12"
        >
          <motion.div
            initial={{ scale: 1.3 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Check className="h-4 w-4 text-emerald-600" />
          </motion.div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            PageSentinel scans so you don&apos;t have to.{' '}
            <span className="font-semibold text-emerald-800 dark:text-emerald-200">Know what changed — before anyone asks</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
