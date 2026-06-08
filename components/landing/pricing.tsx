'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, easeOut } from 'framer-motion'
import {
  Check,
  ArrowRight,
  Star,
  ShieldCheck,
  Zap,
  FileText,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Starter',
    price: 29,
    description: 'For freelancers and small teams getting started with automated monitoring.',
    scans: '10,000 scans / month',
    frequencies: 'Daily, Weekly, Monthly',
    features: [
      'Visual change detection with screenshot diffs',
      'Email & Slack alerts',
      'Layout break & content change monitoring',
      'Basic dashboard with site list',
      'Redirect & link change detection',
    ],
    cta: 'Start Starter',
    convertTo: 'starter',
    highlight: false,
    icon: Zap,
  },
  {
    name: 'Pro',
    price: 59,
    description: 'For growing agencies that need hourly coverage and client-ready proof of work.',
    scans: '50,000 scans / month',
    frequencies: 'Hourly, Daily, Weekly, Monthly',
    features: [
      'Everything in Starter, plus:',
      'Hourly monitoring across all sites',
      'Monthly Site Health Snapshots',
      'Priority Slack/Email notifications',
      'Plugin update tracking & changelog alerts',
    ],
    cta: 'Start Pro',
    convertTo: 'pro',
    highlight: true,
    icon: Star,
  },
  {
    name: 'Business',
    price: 129,
    description: 'For established agencies that need frequent scans and client-branded reporting.',
    scans: '200,000 scans / month',
    frequencies: 'Every 30m, Hourly, Daily, Weekly, Monthly',
    features: [
      'Everything in Pro, plus:',
      'Client-branded PDF reports',
      '90‑day visual diff archive',
      'Custom monitoring frequency per site',
      'API access for custom integrations',
    ],
    cta: 'Start Business',
    convertTo: 'business',
    highlight: false,
    icon: ShieldCheck,
  },
  {
    name: 'Agency',
    price: 249,
    description: 'For large agencies that want maximum coverage and branded monitoring as a revenue stream.',
    scans: '500,000 scans / month',
    frequencies: 'Every 15m, 30m, Hourly, Daily, Weekly, Monthly',
    features: [
      'Everything in Business, plus:',
      'White-label: your logo, your domain',
      'Automated client reports on your schedule',
      'Dedicated account manager',
      'SSO & team management',
    ],
    cta: 'Start Agency',
    convertTo: 'agency',
    highlight: false,
    icon: Star,
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
    transition: { duration: 0.4, ease: easeOut },
  },
}

export function Pricing() {
  return (
    <section id="pricing" className="relative border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-sm font-medium">
            <Users className="h-3.5 w-3.5 text-emerald-600" />
            Pricing per sites monitored
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            One plan covers every client site
          </h2>
          <p className="mt-4 text-muted-foreground">
            No per‑scan charges. No per‑domain pricing. Pick the tier that fits your agency.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mt-12 grid max-w-5xl gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
        >
          {plans.map((plan) => {
            const PlanIcon = plan.icon

            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                className={cn(
                  'relative flex flex-col rounded-xl border p-6 sm:p-7',
                  plan.highlight
                    ? 'border-emerald-600 bg-emerald-50/30 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-600/20'
                    : 'border-border bg-background shadow-sm'
                )}
              >
                {/* Most popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-600 text-white shadow-sm">
                      Most popular
                    </Badge>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg',
                    plan.highlight ? 'bg-emerald-100' : 'bg-muted'
                  )}>
                    <PlanIcon className={cn(
                      'h-4.5 w-4.5',
                      plan.highlight ? 'text-emerald-600' : 'text-muted-foreground'
                    )} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>

                {/* 7-day free trial badge */}
                <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  7‑day free trial
                </p>

                {/* Stats */}
                <div className="mt-4 space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">{plan.scans}</p>
                  <p className="text-xs text-muted-foreground">{plan.frequencies}</p>
                </div>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        plan.highlight ? 'text-emerald-600' : 'text-emerald-500'
                      )} />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-7">
                  <a href={`https://app.pagesentinel.com/signup?plan=Free-Trial&convert_to=${plan.convertTo}`}>
                    <Button
                      className={cn(
                        'w-full',
                        plan.highlight
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : ''
                      )}
                      variant={plan.highlight ? 'default' : 'outline'}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Risk Reversal */}
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

        {/* Upsell note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-center"
        >
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4 text-emerald-600" />
            Add proactive monitoring as a{' '}
            <span className="font-semibold text-foreground">$199/month line item</span> to your retainers.{' '}
            <span className="font-medium text-emerald-700">One client covers the entire cost.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
