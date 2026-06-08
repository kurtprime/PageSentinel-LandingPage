'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useCallback } from 'react'

type Intensity = 'low' | 'medium' | 'high'

const intensityPresets: Record<
  Intensity,
  {
    constantOpacity: number
    burstInterval: [number, number]
    burstDuration: [number, number]
    effectsPerFrame: [number, number]
    dispFreq: string
    dispScale: number
    scanlineOpacity: number
    staticNoiseOpacity: number
  }
> = {
  low: {
    constantOpacity: 0.12,
    burstInterval: [3000, 8000],
    burstDuration: [100, 200],
    effectsPerFrame: [1, 2],
    dispFreq: '0.012 0.18',
    dispScale: 5,
    scanlineOpacity: 0.06,
    staticNoiseOpacity: 0.07,
  },
  medium: {
    constantOpacity: 0.18,
    burstInterval: [2000, 5000],
    burstDuration: [150, 250],
    effectsPerFrame: [2, 3],
    dispFreq: '0.025 0.35',
    dispScale: 8,
    scanlineOpacity: 0.09,
    staticNoiseOpacity: 0.11,
  },
  high: {
    constantOpacity: 0.25,
    burstInterval: [1000, 3000],
    burstDuration: [200, 350],
    effectsPerFrame: [3, 5],
    dispFreq: '0.05 0.55',
    dispScale: 12,
    scanlineOpacity: 0.12,
    staticNoiseOpacity: 0.15,
  },
}

const GARBLED_CHARS = '◻◼▮▯▰▱▲△▼▽◆◇◈◉◊○◎●◐◑◒◓◔◕⬒⬓⬔⬕⌂⌃⌄⌅⌆⌇⌈⌉⌊⌋⌌⌍⌎⌏⌐⌑⌒⌓⌔⌕⚡⚠☠☢☣⬡⬢⬣⬤⬥⬦⬧⬨⬩⬪⬫⬬⬭⬮⬯'
const ERROR_TEXTS = [
  'Component failed to load',
  '404 Not Found',
  'ERR_CONNECTION_REFUSED',
  'TypeError: undefined is not a function',
  'Uncaught ReferenceError',
  '500 Internal Server Error',
  'Failed to fetch',
  'RESOURCE UNAVAILABLE',
]

interface BrokenBackgroundProps {
  className?: string
  intensity?: Intensity
  enabled?: boolean
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max + 1))
}

export function BrokenBackground({
  className,
  intensity = 'low',
  enabled = true,
}: BrokenBackgroundProps) {
  const prefersReduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const glitchUntilRef = useRef<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const preset = intensityPresets[intensity]

  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const w = parent.clientWidth
    const h = parent.clientHeight
    if (canvas.width === w && canvas.height === h) return
    canvas.width = w
    canvas.height = h
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
  }, [])

  useEffect(() => {
    if (!enabled || prefersReduced !== false) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setCanvasSize()

    const drawGlitchFrame = (w: number, h: number) => {
      const effectCount = randInt(
        preset.effectsPerFrame[0],
        preset.effectsPerFrame[1],
      )
      const effects: number[] = []
      for (let i = 0; i < effectCount; i++) {
        effects.push(randInt(0, 6))
      }

      for (const effect of effects) {
        switch (effect) {
          case 0: {
            const x = rand(0, w - 200)
            const y = rand(0, h - 80)
            const bw = rand(80, 300)
            const bh = rand(20, 60)
            const shiftX = rand(-30, 30)
            ctx.save()
            ctx.translate(shiftX, 0)
            ctx.fillStyle = 'rgba(255,0,0,0.08)'
            ctx.fillRect(x, y, bw, bh)
            ctx.strokeStyle = 'rgba(255,0,0,0.45)'
            ctx.lineWidth = 1
            ctx.setLineDash([4, 4])
            ctx.strokeRect(x, y, bw, bh)
            ctx.setLineDash([])
            ctx.restore()
            break
          }
          case 1: {
            const x = rand(0, w - 160)
            const y = rand(0, h - 30)
            ctx.font = '11px monospace'
            const text = ERROR_TEXTS[randInt(0, ERROR_TEXTS.length - 1)]
            const rgbOffset = rand(2, 5)
            ctx.fillStyle = '#f00'
            ctx.fillText(text, x - rgbOffset, y)
            ctx.fillStyle = '#0ff'
            ctx.fillText(text, x + rgbOffset, y)
            ctx.fillStyle = 'rgba(255,255,255,0.9)'
            ctx.fillText(text, x, y)
            break
          }
          case 2: {
            const x = rand(0, w - 120)
            const y = rand(0, h - 30)
            let garbled = ''
            const len = randInt(6, 20)
            for (let i = 0; i < len; i++) {
              garbled += GARBLED_CHARS[randInt(0, GARBLED_CHARS.length - 1)]
            }
            ctx.font = '12px monospace'
            ctx.fillStyle = 'rgba(255,255,255,0.45)'
            ctx.fillText(garbled, x, y)
            break
          }
          case 3: {
            const y = rand(0, h - 40)
            const bh = rand(2, 6)
            const shiftX = rand(-20, 20)
            ctx.save()
            ctx.translate(shiftX, 0)
            ctx.fillStyle = 'rgba(0,255,255,0.1)'
            ctx.fillRect(0, y, w, bh)
            ctx.fillStyle = 'rgba(255,0,255,0.08)'
            ctx.fillRect(0, y + bh, w, 1)
            ctx.restore()
            break
          }
          case 4: {
            ctx.fillStyle = `rgba(255,255,255,${rand(0.04, 0.08)})`
            ctx.fillRect(0, 0, w, h)
            break
          }
          case 5: {
            const x = rand(0, w - 120)
            const y = rand(0, h - 100)
            const bw = rand(60, 180)
            const bh = rand(30, 100)
            ctx.fillStyle = 'rgba(40,40,40,0.3)'
            ctx.fillRect(x, y, bw, bh)
            ctx.strokeStyle = 'rgba(255,100,100,0.5)'
            ctx.lineWidth = 1
            ctx.strokeRect(x, y, bw, bh)
            ctx.font = '9px monospace'
            ctx.fillStyle = 'rgba(255,100,100,0.6)'
            ctx.fillText('✕', x + bw - 14, y + 14)
            break
          }
          case 6: {
            const x1 = rand(0, w - 80)
            const y1 = rand(0, h - 20)
            const x2 = x1 + rand(20, 80)
            const y2 = y1 + rand(5, 15)
            ctx.strokeStyle = 'rgba(255,255,0,0.25)'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(x1, y1, 2, 0, Math.PI * 2)
            ctx.arc(x2, y2, 2, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(255,255,0,0.35)'
            ctx.fill()
            break
          }
        }
      }
    }

    const drawPerpetualStatic = (w: number, h: number) => {
      const dotsThisFrame = randInt(2, 5)
      for (let i = 0; i < dotsThisFrame; i++) {
        const sx = rand(0, w)
        const sy = rand(0, h)
        ctx.fillStyle = `rgba(255,255,255,${rand(0.08, 0.18)})`
        ctx.fillRect(sx, sy, 1, 1)
      }
    }

    const SKIP_IDLE = 2
    const FADE_EVERY = 4
    let frameCounter = 0
    let idleFadeCounter = 0

    const draw = () => {
      const now = performance.now()
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const glitching = now < glitchUntilRef.current

      frameCounter++

      if (glitching) {
        ctx.clearRect(0, 0, w, h)
        drawGlitchFrame(w, h)
        drawPerpetualStatic(w, h)
      } else {
        if (frameCounter % SKIP_IDLE !== 0) {
          rafRef.current = requestAnimationFrame(draw)
          return
        }
        idleFadeCounter++
        if (idleFadeCounter >= FADE_EVERY) {
          idleFadeCounter = 0
          ctx.fillStyle = 'rgba(0,0,0,0.4)'
          ctx.fillRect(0, 0, w, h)
        }
        drawPerpetualStatic(w, h)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const scheduleNextGlitch = () => {
      const delay = randInt(
        preset.burstInterval[0],
        preset.burstInterval[1],
      )
      timeoutRef.current = setTimeout(() => {
        const duration = randInt(
          preset.burstDuration[0],
          preset.burstDuration[1],
        )
        glitchUntilRef.current = performance.now() + duration
        timeoutRef.current = setTimeout(scheduleNextGlitch, duration + 50)
      }, delay)
    }

    scheduleNextGlitch()
    rafRef.current = requestAnimationFrame(draw)

    const observer = new ResizeObserver(() => {
      setCanvasSize()
    })
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      observer.disconnect()
    }
  }, [enabled, prefersReduced, intensity, preset, setCanvasSize])

  return (
    <>
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="ps-broken-displace"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency={preset.dispFreq}
              numOctaves="2"
              seed={intensity === 'high' ? 7 : intensity === 'medium' ? 4 : 1}
              result="turbulence"
            >
              {!prefersReduced && enabled && (
                <animate
                  attributeName="seed"
                  values="1;200;45;150;5;80;1"
                  dur="0.3s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={prefersReduced || !enabled ? 0 : preset.dispScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Displacement layer — distorted stripes, sits behind content at -z-10 */}
      <div
        className={`absolute inset-0 pointer-events-none ${className ?? ''}`}
        style={{
          opacity: prefersReduced || !enabled ? 0 : preset.constantOpacity,
          filter:
            prefersReduced || !enabled ? 'none' : 'url(#ps-broken-displace)',
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,0.15) 3px, rgba(255,0,0,0.15) 4px, transparent 4px, transparent 7px, rgba(0,0,255,0.18) 7px, rgba(0,0,255,0.18) 8px, transparent 8px, transparent 10px, rgba(255,0,255,0.12) 10px, rgba(255,0,255,0.12) 11px, transparent 11px, transparent 14px)',
        }}
      />

      {/* Scanline overlay — CRT horizontal lines on top of content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: prefersReduced || !enabled ? 0 : preset.scanlineOpacity,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
        }}
      />

      {/* Static chromatic noise strips — corrupted bands across the screen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: prefersReduced || !enabled ? 0 : preset.staticNoiseOpacity,
          backgroundImage: `
            linear-gradient(to right,
              transparent 120px,
              rgba(255,0,0,0.25) 120px, rgba(255,0,0,0.25) 121px,
              transparent 121px,
              transparent 340px,
              rgba(0,255,255,0.2) 340px, rgba(0,255,255,0.2) 342px,
              transparent 342px,
              transparent 500px,
              rgba(255,0,255,0.18) 500px, rgba(255,0,255,0.18) 503px,
              transparent 503px,
              transparent 680px,
              rgba(255,255,0,0.14) 680px, rgba(255,255,0,0.14) 682px,
              transparent 682px
            ),
            linear-gradient(to bottom,
              transparent 200px,
              rgba(0,255,255,0.14) 200px, rgba(0,255,255,0.14) 202px,
              transparent 202px,
              transparent 500px,
              rgba(255,0,0,0.16) 500px, rgba(255,0,0,0.16) 501px,
              transparent 501px
            )
          `,
          backgroundRepeat: 'no-repeat',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  )
}
