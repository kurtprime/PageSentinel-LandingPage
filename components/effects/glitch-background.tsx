'use client'

import { useReducedMotion } from 'framer-motion'

type Intensity = 'low' | 'medium' | 'high'

const intensityPresets: Record<
  Intensity,
  { baseFrequency: string; scale: number; opacity: number }
> = {
  low: { baseFrequency: '0.01 0.15', scale: 4, opacity: 0.06 },
  medium: { baseFrequency: '0.02 0.3', scale: 6, opacity: 0.10 },
  high: { baseFrequency: '0.04 0.5', scale: 10, opacity: 0.18 },
}

interface GlitchBackgroundProps {
  intensity?: Intensity
  className?: string
}

export function GlitchBackground({
  intensity = 'low',
  className,
}: GlitchBackgroundProps) {
  const prefersReduced = useReducedMotion()
  const preset = intensityPresets[intensity]

  return (
    <>
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="ps-bg-glitch"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency={preset.baseFrequency}
              numOctaves="2"
              seed="3"
              result="turbulence"
            >
              {!prefersReduced && (
                <animate
                  attributeName="seed"
                  values="1;200;45;150;5;80;1"
                  dur="0.4s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={prefersReduced ? 0 : preset.scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`absolute inset-0 pointer-events-none ${className ?? ''}`}
        style={{
          opacity: preset.opacity,
          filter: prefersReduced ? 'none' : 'url(#ps-bg-glitch)',
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.12) 3px, rgba(0,255,255,0.12) 4px, transparent 4px, transparent 7px, rgba(255,0,255,0.10) 7px, rgba(255,0,255,0.10) 8px, transparent 8px, transparent 10px)',
        }}
      />
    </>
  )
}
