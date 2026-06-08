'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Shield, AlertTriangle, FileText } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'

const problems = [
  {
    icon: Shield,
    image: '/assets/guardian-bot.png',
    title: 'Defacement',
    description: 'Hackers inject spam links, redirects, or malicious scripts into your pages. Every hour it sits undetected, your reputation erodes.',
    accentColor: 'red',
  },
  {
    icon: AlertTriangle,
    image: '/assets/mistake-alert.png',
    title: 'Mistakes',
    description: 'A plugin update, a wrong click — suddenly your layout is broken, content is missing, or your checkout form stopped working.',
    accentColor: 'amber',
  },
  {
    icon: FileText,
    image: '/assets/silent-changes.png',
    title: 'Silent changes',
    description: 'Pricing tables shift, policy pages get edited, and redirects appear with no warning. These are the changes your clients notice first.',
    accentColor: 'blue',
  },
]

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

const colorMap = {
  red: {
    iconBg: 'bg-red-100',
    iconText: 'text-red-600',
    borderHover: 'hover:border-red-200',
  },
  amber: {
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
    borderHover: 'hover:border-amber-200',
  },
  blue: {
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    borderHover: 'hover:border-blue-200',
  },
}

function ProblemCard({
  icon: Icon,
  image,
  title,
  description,
  accentColor,
  index,
  className,
}: (typeof problems)[number] & { index: number; className?: string }) {
  const colors = colorMap[accentColor as keyof typeof colorMap]

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className={`group relative flex flex-col rounded-xl border border-border bg-background p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${colors.borderHover} sm:p-8 ${className ?? ''}`}
    >
      <div className="relative mx-auto mb-6 w-full overflow-hidden rounded-lg border border-border/60 aspect-[16/9]">
        <Image
          src={image}
          alt={`${title} illustration`}
          width={1672}
          height={941}
          className="h-full w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
        />
        <div className="pointer-events-none absolute left-2.5 top-2.5 flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-400/70" />
          <div className="h-2 w-2 rounded-full bg-amber-400/70" />
          <div className="h-2 w-2 rounded-full bg-emerald-400/70" />
        </div>
      </div>

      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg} mx-auto mb-4 transition-colors`}
      >
        <Icon className={`h-6 w-6 ${colors.iconText}`} />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  )
}

const NOISE_SVG =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'

export function ProblemCategories() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative border-b border-border/40">
      {/* Noise texture — matches page-wide film grain in page.tsx */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.008] dark:opacity-[0.015]"
        style={{
          backgroundImage: NOISE_SVG,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ── Full-viewport SVG overlay: monitoring network ── */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
        {/* ── Hub browser window (monitoring center) ── */}
        <motion.g
          animate={prefersReduced ? { opacity: 0.85 } : { opacity: [0.6, 1, 0.6] }}
          transition={prefersReduced ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x={450} y={30} width={100} height={70} rx={8}
            className="stroke-emerald-500/40 fill-emerald-500/[0.06]" strokeWidth={2} />
          <circle cx={468} cy={41} r={2.5} className="fill-red-400/90" />
          <circle cx={479} cy={41} r={2.5} className="fill-amber-400/90" />
          <circle cx={490} cy={41} r={2.5} className="fill-emerald-400/90" />
          {/* Pulse dot */}
          <motion.circle r={4} className="fill-emerald-400/80"
            animate={prefersReduced
              ? { opacity: 0.9, scale: 1 }
              : { opacity: [0.5, 1, 0.5], scale: [0.75, 1.25, 0.75] }
            }
            style={{ transformOrigin: '500px 72px' }}
            transition={prefersReduced ? {} : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            cx={500} cy={72}
          />
        </motion.g>

        {/* ── Hub → Endpoint connecting lines ── */}
        <line x1="500" y1="100" x2="180" y2="250" className="stroke-emerald-500/20" strokeWidth={2} />
        <line x1="500" y1="100" x2="820" y2="250" className="stroke-emerald-500/20" strokeWidth={2} />
        <line x1="500" y1="100" x2="500" y2="520" className="stroke-emerald-500/15" strokeWidth={2} />

        {/* ── Browser-window endpoints (pages under watch) ── */}
        {[
          { x: 140, y: 250, delay: 0 },
          { x: 780, y: 250, delay: 0.7 },
          { x: 460, y: 520, delay: 1.4 },
        ].map((node, i) => (
          <motion.g key={i}
            animate={prefersReduced ? { opacity: 0.75 } : { opacity: [0.55, 1, 0.55] }}
            transition={prefersReduced ? {} : { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
          >
            <rect x={node.x} y={node.y} width={80} height={55} rx={6}
              className="stroke-emerald-500/40 fill-emerald-500/[0.06]" strokeWidth={2} />
            <circle cx={node.x + 14} cy={node.y + 11} r={2.5} className="fill-red-400/90" />
            <circle cx={node.x + 24} cy={node.y + 11} r={2.5} className="fill-amber-400/90" />
            <circle cx={node.x + 34} cy={node.y + 11} r={2.5} className="fill-emerald-400/90" />
          </motion.g>
        ))}

        {/* ── Scanning beams (horizontal sweep) ── */}
        {!prefersReduced && (
          <>
            <motion.line x1="50" x2="950" strokeWidth={2}
              className="stroke-emerald-500/30"
              animate={{ y1: [0, 700], y2: [0, 700] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />
            <motion.line x1="50" x2="950" strokeWidth={2}
              className="stroke-emerald-500/18"
              animate={{ y1: [700, 0], y2: [700, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 3.5 }}
            />
          </>
        )}

        {/* ── Animated dots (network traffic) ── */}
        {!prefersReduced && (
          <>
            {/* Hub → Top-left */}
            <motion.circle r="5" className="fill-emerald-400/80"
              animate={{ cx: [180, 500], cy: [250, 100] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
            <motion.circle r="3.5" className="fill-emerald-400/55"
              animate={{ cx: [500, 180], cy: [100, 250] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
            />

            {/* Hub → Top-right */}
            <motion.circle r="5" className="fill-amber-400/70"
              animate={{ cx: [820, 500], cy: [250, 100] }}
              transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.circle r="3.5" className="fill-amber-400/50"
              animate={{ cx: [500, 820], cy: [100, 250] }}
              transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2.75 }}
            />

            {/* Hub → Bottom-center */}
            <motion.circle r="5" className="fill-blue-400/70"
              animate={{ cy: [140, 520] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 }}
              cx={500}
            />
            <motion.circle r="3.5" className="fill-blue-400/50"
              animate={{ cy: [520, 140] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 3.5 }}
              cx={500}
            />
          </>
        )}
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">

        <div className="relative z-10">
          <SectionHeader
            title="Every day your pages go unchecked is a day something breaks"
            description="Defacement, update mistakes, and unauthorized edits don't announce themselves. Here's what you're up against — and what PageSentinel catches."
          />
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative z-10 mt-12 sm:mt-16"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {problems.slice(0, 2).map((p, i) => (
              <ProblemCard key={p.title} {...p} index={i} />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <div className="w-full sm:max-w-lg">
              <ProblemCard {...problems[2]} index={2} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
