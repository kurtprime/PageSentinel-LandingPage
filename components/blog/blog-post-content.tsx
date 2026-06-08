'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowUp, Calendar, Clock, Tag, User, ArrowRight, Share2, Check } from 'lucide-react'
import { formatDate } from '@/lib/date'

interface Heading {
  id: string
  text: string
  level: number
}

interface RelatedPost {
  slug: string
  title: string
  date: string
  readingTime: string
  image: string
}

interface BlogPostContentProps {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  date: string
  lastUpdated?: string
  author: string
  authorRole: string
  readingTime: string
  image: string
  headings: Heading[]
  formattedContent: string
  relatedPosts: RelatedPost[]
  articleStructuredData: object
  breadcrumbStructuredData: object
  faqStructuredData?: object | null
  howToStructuredData?: object | null
  softwareComparisonData?: object | null
}

export function BlogPostContent({
  slug,
  title,
  excerpt,
  tags,
  date,
  lastUpdated,
  author,
  authorRole,
  readingTime,
  image,
  headings,
  formattedContent,
  relatedPosts,
  articleStructuredData,
  breadcrumbStructuredData,
  faqStructuredData,
  howToStructuredData,
  softwareComparisonData,
}: BlogPostContentProps) {
  const [progress, setProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
      setShowBackToTop(scrollTop > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/blog/${slug}`
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [slug, title])

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 scroll-smooth">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      {howToStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
      )}
      {softwareComparisonData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareComparisonData) }}
        />
      )}

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-border/40 z-50">
        <motion.div
          className="h-full bg-emerald-600"
          style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
        />
      </div>

      {/* Back to blog */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-emerald-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blog
        </Link>
      </motion.div>

      {/* Meta */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap items-center gap-3 mb-4"
      >
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-base leading-relaxed text-muted-foreground"
      >
        {excerpt}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6"
      >
        <span className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{author}</span>
          <span>·</span>
          <span>{authorRole}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {lastUpdated
            ? `Updated ${formatDate(lastUpdated)}`
            : formatDate(date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {readingTime}
        </span>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
          aria-label="Share this article"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Share'}
        </button>
      </motion.div>

      {/* Featured Image */}
      {image && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 overflow-hidden rounded-xl border border-border/60"
        >
          <Image
            src={image}
            alt={title}
            width={800}
            height={450}
            className="w-full object-cover"
            priority
          />
        </motion.div>
      )}

      {/* Table of Contents */}
      {headings.length > 2 && (
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-8 rounded-xl border border-border/60 bg-muted/30 p-5"
          aria-label="Table of contents"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">Table of Contents</h2>
          <ul className="space-y-1.5">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors leading-relaxed"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 prose prose-zinc dark:prose-invert max-w-none"
      >
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
      </motion.div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-16 border-t border-border pt-12"
        >
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-6">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block rounded-xl border border-border bg-background shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-video bg-muted/30 flex items-center justify-center">
                  {related.image ? (
                    <Image
                      src={related.image}
                      alt={related.title}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Tag className="h-6 w-6 text-muted-foreground/40" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted-foreground">{formatDate(related.date)} · {related.readingTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 text-center"
      >
        <h2 className="font-bold text-emerald-800 dark:text-emerald-300">
          Stop losing revenue to broken client sites
        </h2>
        <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-400/80">
          Start your free 7-day trial — no credit card. Monitor all your client sites silently.
        </p>
        <a
          href="https://app.pagesentinel.com/signup?plan=Free-Trial"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          Start free trial
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </motion.div>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </article>
  )
}
