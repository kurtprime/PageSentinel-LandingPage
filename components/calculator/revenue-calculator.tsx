'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Minus, Plus, Settings2 } from 'lucide-react'
import Link from 'next/link'
import { SliderInput, CompareRow, PlanSelector, clamp, formatCurrency, formatCurrencyDec } from './shared'

const plans = [
  { name: 'Starter',  price: 29,  scans: 10000,  freq: 24,   freqLabel: 'Daily checks' },
  { name: 'Pro',      price: 59,  scans: 50000,  freq: 1,    freqLabel: 'Hourly checks' },
  { name: 'Business', price: 129, scans: 200000, freq: 0.5,  freqLabel: 'Every 30 min' },
  { name: 'Agency',   price: 249, scans: 500000, freq: 0.25, freqLabel: 'Every 15 min' },
]

export function RevenueCalculator() {
  const [pages, setPages] = useState(20)
  const [visitors, setVisitors] = useState(100)
  const [revPerVisitor, setRevPerVisitor] = useState(10) // cents (1 = $0.01)
  const [incidents, setIncidents] = useState(4)
  const [detectionHours, setDetectionHours] = useState(48)
  const [selectedPlan, setSelectedPlan] = useState('Pro')

  const [manualCheckHours, setManualCheckHours] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(35)

  const plan = plans.find((p) => p.name === selectedPlan)!

  const derived = useMemo(() => {
    const revPerVisitorDollars = revPerVisitor / 100

    // WITHOUT monitoring
    const withoutRevenueLost = visitors * revPerVisitorDollars * detectionHours
    const withoutAnnualLoss = pages * incidents * withoutRevenueLost
    const withoutLaborCost = manualCheckHours * hourlyRate * 52
    const withoutTotal = withoutAnnualLoss + withoutLaborCost

    // WITH selected plan
    const withDowntime = plan.freq
    const withLaborHours = manualCheckHours * 0.05
    const withRevenueLost = visitors * revPerVisitorDollars * withDowntime
    const withAnnualLoss = pages * incidents * withRevenueLost
    const withLaborCost = withLaborHours * hourlyRate * 52
    const withPlanCost = plan.price * 12
    const withTotal = withAnnualLoss + withLaborCost + withPlanCost

    // Savings
    const moneySaved = withoutTotal - withTotal
    const hoursSaved = (detectionHours - withDowntime) * incidents * pages
                     + (manualCheckHours - withLaborHours) * 52
    const roi = withPlanCost > 0 ? moneySaved / withPlanCost : 0

    return {
      revPerVisitorDollars,
      withoutRevenueLost,
      withoutAnnualLoss,
      withoutLaborCost,
      withoutTotal,
      withDowntime,
      withLaborHours,
      withRevenueLost,
      withAnnualLoss,
      withLaborCost,
      withPlanCost,
      withTotal,
      moneySaved,
      hoursSaved,
      roi,
    }
  }, [pages, visitors, revPerVisitor, incidents, detectionHours, manualCheckHours, hourlyRate, plan])

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

      {/* Input Column */}
      <div className="space-y-6">
        <SliderInput
          label="Pages monitored"
          value={pages}
          min={1}
          max={500}
          step={1}
          onChange={setPages}
        />

        <SliderInput
          label="Avg. visitors per hour (per page)"
          value={visitors}
          min={10}
          max={1000}
          step={10}
          onChange={setVisitors}
        />

        <div>
          <Label className="text-sm font-medium">Avg. revenue per visitor</Label>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              onClick={() => setRevPerVisitor(clamp(revPerVisitor - 1, 1, 500))}
              aria-label="Decrease revenue per visitor"
            >
              <Minus className="h-3 w-3" />
            </button>
            <Slider
              value={[revPerVisitor]}
              onValueChange={([v]) => setRevPerVisitor(v)}
              min={1}
              max={500}
              step={1}
              className="flex-1 [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-range]]:bg-emerald-500"
            />
            <Input
              type="number"
              value={formatCurrencyDec(revPerVisitor / 100)}
              onChange={(e) => {
                const v = Math.round(parseFloat(e.target.value) * 100)
                if (!isNaN(v)) setRevPerVisitor(clamp(v, 1, 500))
              }}
              onBlur={(e) => {
                const v = Math.round(parseFloat(e.target.value) * 100)
                if (!isNaN(v)) setRevPerVisitor(clamp(v, 1, 500))
              }}
              className="w-16 text-center text-sm font-mono"
              min={0.01}
              max={5}
              step={0.01}
            />
            <button
              type="button"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              onClick={() => setRevPerVisitor(clamp(revPerVisitor + 1, 1, 500))}
              aria-label="Increase revenue per visitor"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>$0.01</span>
            <span>$5.00</span>
          </div>
        </div>

        <SliderInput
          label="Breakages per page per year"
          value={incidents}
          min={1}
          max={24}
          step={1}
          onChange={setIncidents}
        />

        <SliderInput
          label="Current detection time (hours)"
          value={detectionHours}
          min={1}
          max={168}
          step={1}
          onChange={setDetectionHours}
        />

        <PlanSelector
          plans={plans}
          selected={selectedPlan}
          onSelect={setSelectedPlan}
          renderPlan={(p) => (
            <>
              <div className="text-sm font-semibold">{p.name}</div>
              <div className="mt-0.5 text-xs font-bold text-emerald-600">${p.price}/mo</div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">
                {(p.scans / 1000).toFixed(0)}K scans
              </div>
              <div className="text-[10px] text-muted-foreground">{p.freqLabel}</div>
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
                  label="Manual check hours per week"
                  value={manualCheckHours}
                  min={0}
                  max={40}
                  step={1}
                  onChange={setManualCheckHours}
                />
                <SliderInput
                  label="Effective hourly rate"
                  value={hourlyRate}
                  min={15}
                  max={150}
                  step={1}
                  onChange={setHourlyRate}
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
                  ${plan.price}/mo · {plan.freqLabel.toLowerCase()}
                </span>
              </span>
            </div>

            <div className="space-y-3">
              <CompareRow
                label="Detection"
                without={`${detectionHours} hrs`}
                with_={`${plan.freq} hrs`}
                improved
              />
              <CompareRow
                label="Revenue/incident"
                without={`$${formatCurrency(derived.withoutRevenueLost)}`}
                with_={`$${formatCurrency(derived.withRevenueLost)}`}
                improved
              />
              <CompareRow
                label="Annual revenue loss"
                without={`$${formatCurrency(derived.withoutAnnualLoss)}`}
                with_={`$${formatCurrency(derived.withAnnualLoss)}`}
                improved
              />
              <CompareRow
                label="Annual labor cost"
                without={`$${formatCurrency(derived.withoutLaborCost)}`}
                with_={`$${formatCurrency(derived.withLaborCost)}`}
                improved
              />
              <CompareRow
                label="Plan cost"
                without="$0"
                with_={`$${formatCurrency(derived.withPlanCost)}`}
              />
            </div>

            <div className="my-3 border-t" />
            <CompareRow
              label="TOTAL"
              without={`$${formatCurrency(derived.withoutTotal)}`}
              with_={`$${formatCurrency(derived.withTotal)}`}
              improved
              bold
            />

            <div className="mt-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  Save ${formatCurrency(derived.moneySaved)}/yr
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  {Math.round(derived.hoursSaved).toLocaleString()} hrs/yr saved
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  {derived.roi.toFixed(1)}x ROI
                </span>
              </div>
            </div>

            <Link href="/pricing" className="mt-4 block">
              <Button size="lg" className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                Save ${formatCurrency(derived.moneySaved)}/yr with {plan.name}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
