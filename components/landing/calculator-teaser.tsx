'use client'

import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/shared/section-header'
import { motion } from 'framer-motion'
import { TrendingDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CalculatorTeaser() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* ALT title: "See what undetected changes are costing you" */}
        <SectionHeader
          badge="Revenue at Risk"
          badgeIcon={TrendingDown}
          title="See what undetected changes are really costing you"
          description="A conservative estimate for a small team. Adjust the numbers to see your actual exposure."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-10 max-w-lg"
        >
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6 text-center">
            <p className="text-sm font-medium text-red-700">
              20 pages monitored &times; 3 incidents/year &times; $500 lost per incident
            </p>
            <p className="mt-3 text-4xl font-extrabold text-red-700">
              $30,000<span className="text-lg font-semibold">/year at risk</span>
            </p>
            <p className="mt-2 text-xs text-red-600/70">
              That&apos;s for a small setup. Undetected changes add up fast.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/calculator?tab=agency">
              <Button size="lg" className="h-12 px-8 text-base font-semibold bg-emerald-600 text-white hover:bg-emerald-700">
                Calculate your real number
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
