'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Home, Play, CreditCard, Calculator, Newspaper, Info, ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'How It Works', href: '/#how-it-works', icon: Play },
  { label: 'Pricing', href: '/pricing', icon: CreditCard },
  { label: 'Calculator', href: '/calculator', icon: Calculator },
  { label: 'Blog', href: '/blog', icon: Newspaper },
  { label: 'About', href: '/about', icon: Info },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/assets/icon.svg"
            alt="PageSentinel"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Page<span className="text-emerald-600">Sentinel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-emerald-600 font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="https://app.pagesentinel.com/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold text-muted-foreground h-9 px-4 py-2 transition-colors hover:text-foreground hover:bg-muted">
            Log in
          </a>
          <a href="https://app.pagesentinel.com/signup?plan=Free-Trial">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold">
              Start free
            </Button>
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="relative">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-xs p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex h-full flex-col">
              {/* Brand header */}
              <div className="flex items-center gap-2.5 border-b border-border/40 px-5 py-4">
                <Image
                  src="/assets/icon.svg"
                  alt="PageSentinel"
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
                <span className="text-base font-bold tracking-tight text-foreground">
                  Page<span className="text-emerald-600">Sentinel</span>
                </span>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {navLinks.map((link) => {
                  const LinkIcon = link.icon
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all',
                        active
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : 'text-foreground hover:bg-muted'
                      )}
                    >
                      <LinkIcon className={cn(
                        'h-[18px] w-[18px] shrink-0 transition-colors',
                        active
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-muted-foreground group-hover:text-foreground'
                      )} />
                      <span className="flex-1">{link.label}</span>
                      {active && (
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* CTA buttons */}
              <div className="border-t border-border/40 px-5 py-5">
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://app.pagesentinel.com/"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background text-sm font-semibold h-11 px-4 py-2 w-full transition-colors hover:bg-muted"
                  >
                    Log in
                  </a>
                  <a href="https://app.pagesentinel.com/signup?plan=Free-Trial" onClick={() => setOpen(false)}>
                    <Button size="lg" className="w-full h-11 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-sm">
                      Start free
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  7-day free trial · No credit card
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
