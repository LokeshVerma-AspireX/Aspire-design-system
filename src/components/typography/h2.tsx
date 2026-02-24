import * as React from "react"
import { cn } from "@/lib/utils"

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
)
H2.displayName = "H2"

export { H2 }
