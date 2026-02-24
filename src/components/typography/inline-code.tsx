import * as React from "react"
import { cn } from "@/lib/utils"

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {}

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
        className
      )}
      {...props}
    />
  )
)
InlineCode.displayName = "InlineCode"

export { InlineCode }
