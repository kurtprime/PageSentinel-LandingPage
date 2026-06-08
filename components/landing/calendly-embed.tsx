'use client'

import Script from 'next/script'

export function CalendlyEmbed() {
  return (
    <section id="book-demo" className="border-t border-border/40">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            See how PageSentinel fits your workflow
          </h2>
          <p className="mt-3 text-muted-foreground">
            Book a 20‑minute call. We&apos;ll walk through your current monitoring setup and show you what you&apos;re missing.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="/pricing"
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Or start a 7-day free trial →
            </a>
          </div>
        </div>
        <div
          className="calendly-inline-widget rounded-xl border border-border/60 overflow-hidden shadow-lg"
          data-url="https://calendly.com/kurtquejada/new-meeting"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  )
}
