import * as React from "react"
import { cn } from "@/lib/utils"

interface MutedProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Muted = React.forwardRef<HTMLParagraphElement, MutedProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
Muted.displayName = "Muted"

export { Muted }
