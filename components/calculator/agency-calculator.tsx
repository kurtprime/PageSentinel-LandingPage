'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { SliderInput, CompareRow, PlanSelector, clamp, formatCurrency } from './shared'

const agencyPlans = [
  { name: 'Starter',  price: 29,  label: 'Up to 20 sites' },
  { name: 'Pro',      price: 59,  label: 'Up to 50 sites' },
  { name: 'Business', price: 129, label: 'Up to 200 sites' },
  { name: 'Agency',   price: 249, label: '200+ sites' },
]

export function AgencyCalculator() {
  const [clients, setClients] = useState(30)
  const [retainer, setRetainer] = useState(1500)
  const [lifetime, setLifetime] = useState(24)
  const [churnRate, setChurnRate] = useState(20)
  const [selectedPlan, setSelectedPlan] = useState('Pro')
  const [acquisitionCost, setAcquisitionCost] = useState(1200)

  const plan = agencyPlans.find((p) => p.name === selectedPlan)!

  const derived = useMemo(() => {
    const churnFraction = churnRate / 100
    const LTV = retainer * lifetime

    const clientsLostWithout = Math.round(clients * churnFraction)
    const revenueLostWithout = clientsLostWithout * LTV
    const acquisitionWithout = clientsLostWithout * acquisitionCost
    const totalWithout = revenueLostWithout + acquisitionWithout

    const clientsLostWith = Math.round(clients * churnFraction * 0.1)
    const revenueLostWith = clientsLostWith * LTV
    const acquisitionWith = clientsLostWith * acquisitionCost
    const planCost = plan.price * 12
    const totalWith = revenueLostWith + acquisitionWith + planCost

    const savings = totalWithout - totalWith
    const clientsSaved = clientsLostWithout - clientsLostWith
    const roi = planCost > 0 ? savings / planCost : 0
    const ltvProtected = clientsSaved * LTV

    return {
      LTV,
      clientsLostWithout,
      revenueLostWithout,
      acquisitionWithout,
      totalWithout,
      clientsLostWith,
      revenueLostWith,
      acquisitionWith,
      planCost,
      totalWith,
      savings,
      clientsSaved,
      roi,
      ltvProtected,
    }
  }, [clients, retainer, lifetime, churnRate, plan, acquisitionCost])

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Input Column */}
      <div className="space-y-6">
        <SliderInput
          label="Active clients"
          value={clients}
          min={1}
          max={200}
          step={1}
          onChange={setClients}
        />

        <SliderInput
          label="Avg monthly retainer"
          value={retainer}
          min={500}
          max={5000}
          step={100}
          onChange={setRetainer}
          formatValue={(v) => `$${formatCurrency(v)}`}
        />

        <SliderInput
          label="Avg client lifetime (months)"
          value={lifetime}
          min={6}
          max={60}
          step={1}
          onChange={setLifetime}
        />

        <SliderInput
          label="Churn from undetected breaks (annual %)"
          value={churnRate}
          min={5}
          max={50}
          step={1}
          onChange={setChurnRate}
          formatValue={(v) => `${v}%`}
        />

        <PlanSelector
          plans={agencyPlans}
          selected={selectedPlan}
          onSelect={setSelectedPlan}
          renderPlan={(p) => (
            <>
              <div className="text-sm font-semibold">{p.name}</div>
              <div className="mt-0.5 text-xs font-bold text-emerald-600">${p.price}/mo</div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">{p.label}</div>
            </>
          )}
        />

        <Accordion type="single" collapsible>
          <AccordionItem value="advanced" className="rounded-xl border px-3">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                Advanced
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <SliderInput
                  label="Client acquisition cost"
                  value={acquisitionCost}
                  min={0}
                  max={5000}
                  step={100}
                  onChange={setAcquisitionCost}
                  formatValue={(v) => `$${formatCurrency(v)}`}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Results Column */}
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPlan}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border bg-card p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center">
              <span className="flex-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Without Monitoring</span>
              <span className="w-8 shrink-0" />
              <span className="flex-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                With {plan.name}
                <span className="block text-[10px] font-normal normal-case text-muted-foreground">
                  ${plan.price}/mo
                </span>
              </span>
            </div>

            <div className="space-y-3">
              <CompareRow
                label="Clients lost/yr"
                without={String(derived.clientsLostWithout)}
                with_={String(derived.clientsLostWith)}
                improved
              />
              <CompareRow
                label="Revenue lost"
                without={`$${formatCurrency(derived.revenueLostWithout)}`}
                with_={`$${formatCurrency(derived.revenueLostWith)}`}
                improved
              />
              <CompareRow
                label="Acquisition cost"
                without={`$${formatCurrency(derived.acquisitionWithout)}`}
                with_={`$${formatCurrency(derived.acquisitionWith)}`}
                improved
              />
              <CompareRow
                label="Plan cost"
                without="$0"
                with_={`$${formatCurrency(derived.planCost)}`}
              />
            </div>

            <div className="my-3 border-t" />
            <CompareRow
              label="TOTAL"
              without={`$${formatCurrency(derived.totalWithout)}`}
              with_={`$${formatCurrency(derived.totalWith)}`}
              improved
              bold
            />

            <div className="mt-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  Save ${formatCurrency(derived.savings)}/yr
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  {derived.clientsSaved} clients retained
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  {derived.roi.toFixed(0)}x ROI
                </span>
              </div>
              <div className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                ${formatCurrency(derived.ltvProtected)} in client LTV protected
              </div>
            </div>

            <Link href="/pricing" className="mt-4 block">
              <Button size="lg" className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                Protect ${formatCurrency(derived.ltvProtected)} in client LTV
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
