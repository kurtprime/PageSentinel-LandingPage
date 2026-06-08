'use client'

import { motion } from 'framer-motion'
import { Building2, Globe, ShoppingCart, Shield } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'

const useCases = [
  {
    icon: Building2,
    title: 'Agencies',
    description: 'You manage dozens of client sites. A plugin update breaks 14 homepages on a Tuesday. PageSentinel catches every one before a single client picks up the phone.',
    alert: 'Homepage changed: "Added redirect rule" — Header modified, CTA button text updated, Body OK.',
  },
  {
    icon: Globe,
    title: 'WordPress Owners',
    description: 'Your site runs on plugins that update automatically. One bad update and your layout is gone, your redirects are hijacked, and you won\'t notice until a customer tells you.',
    alert: 'Checkout page changed: "Header layout broken" — Elementor 3.21 update caused CSS conflict.',
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce',
    description: 'Every hour your checkout or pricing page is broken is revenue you never get back. Catch layout shifts, price changes, and broken forms before they cost you sales.',
    alert: 'Pricing table changed: "Monthly price updated" — $29 → $19 detected on /pricing page.',
  },
  {
    icon: Shield,
    title: 'Compliance & Reputation',
    description: 'Terms of service, privacy policies, regulatory pages — if these change without your knowledge, the liability is yours. Keep an audit trail for every edit, every time.',
    alert: 'Terms page changed: "Refund policy updated" — Paragraph removed, new section added.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export function UseCases() {
  return (
    <section className="relative border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* ALT title: "Built for anyone who depends on their website" */}
        <SectionHeader
          title="Built for anyone whose revenue depends on their pages"
          description="Same monitoring engine, different problems. Here's how real teams use PageSentinel to stop finding out from their customers."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2"
        >
          {useCases.map(({ icon: Icon, title, description, alert }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="relative flex flex-col rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-3">
                <p className="text-xs font-medium text-foreground">Example alert:</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground font-mono">
                  {alert}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
