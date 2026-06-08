'use client'

import type { ReactNode } from 'react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Minus, Plus } from 'lucide-react'

export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

export function formatCurrency(val: number) {
  return val.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

export function formatCurrencyDec(val: number) {
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  formatValue?: (value: number) => string
}) {
  const displayValue = formatValue ? formatValue(value) : value.toString()

  return (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={() => onChange(clamp(value - step, min, max))}
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-3 w-3" />
        </button>
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step}
          className="flex-1 [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-range]]:bg-emerald-500"
        />
        <Input
          type="number"
          value={displayValue}
          onChange={(e) => {
            const v = parseFloat(e.target.value)
            if (!isNaN(v)) onChange(clamp(v, min, max))
          }}
          onBlur={(e) => {
            const v = parseFloat(e.target.value)
            if (!isNaN(v)) onChange(clamp(v, min, max))
          }}
          className="w-16 text-center text-sm font-mono"
          min={min}
          max={max}
          step={step}
        />
        <button
          type="button"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={() => onChange(clamp(value + step, min, max))}
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  )
}

export function CompareRow({
  label,
  without,
  with_,
  improved,
  bold,
}: {
  label: string
  without: string
  with_: string
  improved?: boolean
  bold?: boolean
}) {
  return (
    <div className={`flex items-center gap-2 ${bold ? 'font-bold text-base' : 'text-sm'}`}>
      <span className="w-28 shrink-0 text-xs text-muted-foreground">{label}</span>
      <span className="flex-1 text-right">{without}</span>
      <ArrowRight className={`h-3 w-3 shrink-0 ${improved ? 'text-emerald-500' : 'text-muted-foreground'}`} />
      <span className={`flex-1 ${improved ? 'text-emerald-600 font-semibold' : ''}`}>{with_}</span>
    </div>
  )
}

export function PlanSelector<T extends { name: string }>({
  plans,
  selected,
  onSelect,
  renderPlan,
}: {
  plans: T[]
  selected: string
  onSelect: (name: string) => void
  renderPlan: (plan: T, isActive: boolean) => ReactNode
}) {
  return (
    <div>
      <Label className="text-sm font-medium">Select Plan</Label>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {plans.map((p) => {
          const isActive = p.name === selected
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => onSelect(p.name)}
              className={`rounded-xl border-2 p-3 text-left transition-all ${
                isActive
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-border hover:border-muted-foreground/30'
              }`}
            >
              {renderPlan(p, isActive)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
