import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'

interface PostCardProps {
  title: string
  excerpt: string
  slug: string
  date: string
  tags: string[]
  readingTime: string
  image: string
}

export function PostCard({ title, excerpt, slug, date, tags, readingTime, image }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="rounded-xl border border-border bg-background shadow-sm overflow-hidden transition-shadow hover:shadow-md">
        <div className="aspect-video bg-muted/20 flex items-center justify-center overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={400}
              height={225}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-muted-foreground">Featured image</span>
          )}
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
          <h2 className="text-base font-bold text-foreground group-hover:text-emerald-600 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
