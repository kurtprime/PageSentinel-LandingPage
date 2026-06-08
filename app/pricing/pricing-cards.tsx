'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, easeOut } from 'framer-motion'
import { Check, ArrowRight, Clock, Zap, TrendingUp, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Starter',
    price: 29,
    description: 'For freelancers and small teams getting started with website change monitoring.',
    scans: '10,000 scans/month',
    frequencies: ['Daily', 'Weekly', 'Monthly'],
    features: [
      'Visual, content, and structural change detection',
      'Email alerts',
      'Audit trail with change history',
      'Baseline + before/after evidence',
      'Noise reduction to cut false alarms',
    ],
    cta: 'Start 7-day free trial',
    highlight: false,
    icon: Zap,
  },
  {
    name: 'Pro',
    price: 59,
    description: 'For growing teams that need faster detection and more scan coverage.',
    scans: '50,000 scans/month',
    frequencies: ['Hourly', 'Daily', 'Weekly', 'Monthly'],
    features: [
      'Everything in Starter, plus:',
      'Slack and webhook alerts',
      'Faster scan cadences',
      '60-day change history retention',
      'Priority email support',
    ],
    cta: 'Start 7-day free trial',
    highlight: true,
    icon: TrendingUp,
  },
  {
    name: 'Business',
    price: 129,
    description: 'For agencies and teams managing multiple client sites or high-value pages.',
    scans: '200,000 scans/month',
    frequencies: ['Every 30m', 'Hourly', 'Daily', 'Weekly', 'Monthly'],
    features: [
      'Everything in Pro, plus:',
      'SMS alerts',
      '120-day change history retention',
      'AI review for significant changes',
      'Custom frequency per URL',
    ],
    cta: 'Start 7-day free trial',
    highlight: false,
    icon: Building2,
  },
  {
    name: 'Agency',
    price: 249,
    description: 'For large agencies and enterprises that need maximum coverage and white-label options.',
    scans: '500,000 scans/month',
    frequencies: ['Every 15m', 'Every 30m', 'Hourly', 'Daily', 'Weekly', 'Monthly'],
    features: [
      'Everything in Business, plus:',
      '180-day change history retention',
      'White-label reporting (coming soon)',
      'API access for custom integrations',
      'Dedicated account manager',
      'SSO and team management',
    ],
    cta: 'Start 7-day free trial',
    highlight: false,
    icon: Zap,
  },
]

const everyPlanFeatures = [
  'Audit trail + alert history',
  'Baseline + before/after evidence',
  'Visual, content, and structural change detection',
  'Noise reduction to cut false alarms',
  'Daily checks included',
  'Faster cadences by plan',
  'Retention by plan (30–180 days)',
  'AI review when change is significant',
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

export function PricingCards() {
  return (
    <>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mx-auto mt-12 grid max-w-6xl gap-5 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6"
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
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-emerald-600 text-white shadow-sm">Most popular</Badge>
                </div>
              )}

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

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                  ${plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-foreground">{plan.scans}</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {plan.frequencies.map((freq) => (
                  <Badge key={freq} variant="outline" className="text-xs gap-1">
                    <Clock className="h-3 w-3" />
                    {freq}
                  </Badge>
                ))}
              </div>

              <ul className="mt-5 flex-1 space-y-2.5">
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

              <div className="mt-7">
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
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="mt-20 mx-auto max-w-3xl">
        <h3 className="text-xl font-bold text-center mb-8">What you get in every plan</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {everyPlanFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-3">
              <Check className="h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
