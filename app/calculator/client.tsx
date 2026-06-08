'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Building2, Globe } from 'lucide-react'
import { AgencyCalculator } from '@/components/calculator/agency-calculator'
import { RevenueCalculator } from '@/components/calculator/revenue-calculator'

export function CalculatorPageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get('tab') || 'agency'
  const isAgency = tab !== 'owner'

  const setTab = (newTab: string) => {
    router.push(`/calculator?tab=${newTab}`, { scroll: false })
  }

  return (
    <>
      {/* No-spinner styles moved to <style> tag: removed temporarily for debugging */}

      {/* Tab Bar */}
      <div className="sticky top-16 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 mt-12 sm:mt-16">
        <div className="bg-background/80 backdrop-blur py-4 border-b border-border/40">
          <div className="mx-auto max-w-sm flex rounded-xl bg-muted p-1">
            <button
              type="button"
              onClick={() => setTab('agency')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                isAgency
                  ? 'bg-emerald-600 text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Agency
            </button>
            <button
              type="button"
              onClick={() => setTab('owner')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                !isAgency
                  ? 'bg-emerald-600 text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe className="h-4 w-4" />
              Site Owner
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Description */}
      <div className="mt-6 mx-auto max-w-2xl text-center">
        <p className="text-muted-foreground">
          {isAgency
            ? 'Every client who finds a broken page before you do costs more than a retainer. See how PageSentinel protects your client LTV.'
            : 'Slide the inputs to match your setup. See how much undetected changes cost — and what PageSentinel saves.'}
        </p>
      </div>

      {/* Calculator */}
      <div className="mt-8">
        {isAgency ? <AgencyCalculator /> : <RevenueCalculator />}
      </div>
    </>
  )
}
