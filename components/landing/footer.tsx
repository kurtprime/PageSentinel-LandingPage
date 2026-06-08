'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Shield, Heart, Mail, Globe } from 'lucide-react'
import { NewsletterForm } from '@/components/shared/newsletter-form'

const footerLinks = {
  Product: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Calculator', href: '/calculator' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: 'mailto:hello@pagesentinel.io' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs text-center sm:text-left">
            <Link href="/" className="flex items-center justify-center gap-2.5 sm:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <Shield className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Page<span className="text-emerald-600">Sentinel</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Website change monitoring for agencies, site owners, and teams. Know what changed — before your customers do.
            </p>
            <div className="mt-3 flex items-center justify-center gap-1.5 sm:justify-start">
              <Globe className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Monitors any public website
              </span>
            </div>

            <div className="mt-5 max-w-xs">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Website monitoring tips &amp; product updates</p>
              <NewsletterForm />
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Heart className="h-3 w-3 text-red-400" />
            &copy; {new Date().getFullYear()} PageSentinel. All rights reserved.
          </p>
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              We personally onboard every agency
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
