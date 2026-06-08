'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingDown } from 'lucide-react'
import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Stop finding out from your customers. First week is free.
          </h2>
          {/* ALT: "Start monitoring your pages today. First week is free." */}
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Know what changed, when it changed, and whether it needs action — before your clients find it first.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/pricing">
              <Button
                size="lg"
                className="h-12 bg-emerald-600 px-8 text-base font-semibold text-white hover:bg-emerald-700"
              >
                Start 7-day free trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/calculator"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <TrendingDown className="h-4 w-4 text-emerald-600" />
              Calculate your revenue at risk
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card · Add unlimited pages during trial · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}
