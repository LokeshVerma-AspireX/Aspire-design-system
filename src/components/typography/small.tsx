import * as React from "react"
import { cn } from "@/lib/utils"

interface SmallProps extends React.HTMLAttributes<HTMLElement> {}

const Small = React.forwardRef<HTMLElement, SmallProps>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
)
Small.displayName = "Small"

export { Small }
