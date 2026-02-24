import * as React from "react"
import { cn } from "@/lib/utils"

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const P = React.forwardRef<HTMLParagraphElement, PProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("leading-7", className)}
      {...props}
    />
  )
)
P.displayName = "P"

export { P }
