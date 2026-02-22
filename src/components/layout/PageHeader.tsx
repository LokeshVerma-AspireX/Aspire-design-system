import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AstraButton } from "./AstraButton"

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  actions?: React.ReactNode
  showAstra?: boolean
  className?: string
}

function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  showAstra = true,
  className,
}: PageHeaderProps) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border px-6 py-4",
        className
      )}
    >
      {/* Left: breadcrumbs + title + description */}
      <div className="flex min-w-0 flex-col gap-0.5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors truncate"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground truncate">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-xl font-semibold tracking-tight text-foreground truncate">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Right: actions + Astra */}
      {(actions || showAstra) && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
          {showAstra && <AstraButton />}
        </div>
      )}
    </header>
  )
}

export { PageHeader, type PageHeaderProps, type Breadcrumb }
