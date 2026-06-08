import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Hero } from '@/components/landing/hero'
import { WhyExists } from '@/components/landing/why-exists'
import { ProblemCategories } from '@/components/landing/problem-categories'
import { FeaturesExplained } from '@/components/landing/features-explained'
import { BeforeAfter } from '@/components/landing/before-after'
import { ExplainerVideo } from '@/components/landing/explainer-video'
import { HowItWorks } from '@/components/landing/how-it-works'
import { UseCases } from '@/components/landing/use-cases'
import { CalculatorTeaser } from '@/components/landing/calculator-teaser'
import { HomeFAQ } from '@/components/landing/home-faq'
import { FinalCTA } from '@/components/landing/final-cta'
import { CalendlyEmbedLazy } from '@/components/landing/calendly-embed-lazy'

const DemoSection = dynamic(
  () => import('@/components/landing/demo-section').then((m) => ({ default: m.DemoSection })),
  { ssr: true, loading: () => <div className="h-96 rounded-xl bg-muted/20 animate-pulse" /> }
)

export default function Home() {
  return (
    <div className="relative z-0">
      {/* Shared dot-grid matrix background — entire page */}
      <div
        className="absolute inset-0 pointer-events-none -z-10
          bg-[radial-gradient(circle,rgba(0,0,0,0.09)_1px,transparent_1px)]
          dark:bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)]
          bg-[length:18px_18px]"
      />
      {/* Noise texture (subtle film grain) — entire page */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />

      <Hero />
      <WhyExists />
      <ProblemCategories />
      <FeaturesExplained />
      <BeforeAfter />
      <ExplainerVideo />
      <Suspense fallback={<div className="h-96 rounded-xl bg-muted/20 animate-pulse" />}>
        <DemoSection />
      </Suspense>
      <HowItWorks />
      <UseCases />
      <CalculatorTeaser />
      <CalendlyEmbedLazy />
      <HomeFAQ />
      <FinalCTA />
    </div>
  )
}
