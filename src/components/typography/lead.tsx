import * as React from "react"
import { cn } from "@/lib/utils"

interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xl text-muted-foreground", className)}
      {...props}
    />
  )
)
Lead.displayName = "Lead"

export { Lead }
