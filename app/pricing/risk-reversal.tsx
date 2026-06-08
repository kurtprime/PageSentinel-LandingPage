'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export function RiskReversal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="mx-auto mt-12 max-w-3xl sm:mt-16"
    >
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 px-5 py-5 text-center sm:px-8 sm:py-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            Our 30-Day Promise
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          If PageSentinel doesn&apos;t alert you about a layout break or redirect hack{' '}
          <span className="font-semibold text-foreground">before a client reports it</span>{' '}
          within your first 30 days, we&apos;ll personally audit your top 10 client sites by hand{' '}
          <span className="font-semibold text-emerald-700">and give you a year free.</span>
        </p>
      </div>
    </motion.div>
  )
}
