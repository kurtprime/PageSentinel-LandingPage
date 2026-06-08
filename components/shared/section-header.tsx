import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  badge?: string
  badgeIcon?: LucideIcon
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ badge, badgeIcon: BadgeIcon, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {badge && (
        <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-sm font-medium">
          {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 text-emerald-600" />}
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
