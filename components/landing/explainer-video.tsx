// components/landing/explainer-video.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

export function ExplainerVideo() {
  const [playing, setPlaying] = useState(false)
  const videoId = 'kCZ3GfDnjtc'

  return (
    <section id="how-it-works" className="border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            See how PageSentinel catches breaks before your clients call
          </h2>
          {/* ALT: "Watch PageSentinel find a broken page in 2 minutes" */}
          <p className="mt-3 text-muted-foreground">
            A 2-minute walkthrough of the problem, the product, and how agencies stop panicked client calls for good.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-2xl shadow-emerald-900/5">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/50 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
            </div>
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title="What is PageSentinel?"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="aspect-video w-full"
              />
            ) : (
              <button onClick={() => setPlaying(true)} className="group relative aspect-video w-full cursor-pointer">
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Watch the PageSentinel explainer"
                  fill
                  sizes="(max-width: 56rem) 100vw, 56rem"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/90 shadow-lg group-hover:bg-emerald-600 group-hover:scale-105 transition-all">
                    <Play className="ml-1 h-6 w-6 text-white" />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}