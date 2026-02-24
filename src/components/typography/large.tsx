import * as React from "react"
import { cn } from "@/lib/utils"

interface LargeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Large = React.forwardRef<HTMLDivElement, LargeProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
)
Large.displayName = "Large"

export { Large }
