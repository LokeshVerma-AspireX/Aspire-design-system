import type { Meta, StoryObj } from "@storybook/react"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"

/**
 * Utility hooks for responsive behaviour and layout decisions.
 * Import from `@/hooks/use-breakpoint` or `@/hooks/use-mobile`.
 */
const meta: Meta = {
  title: "2. Foundations/Hooks",
  parameters: { layout: "padded" },
}
export default meta

function BreakpointDemo() {
  const isSm = useBreakpoint("sm")
  const isMd = useBreakpoint("md")
  const isLg = useBreakpoint("lg")
  const isXl = useBreakpoint("xl")
  const isMobile = useIsMobile()

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Resize the window to see values change.
      </p>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "sm (>=640px)", active: isSm },
          { label: "md (>=768px)", active: isMd },
          { label: "lg (>=1024px)", active: isLg },
          { label: "xl (>=1280px)", active: isXl },
        ].map(({ label, active }) => (
          <Badge key={label} variant={active ? "default" : "outline"}>
            {label}
          </Badge>
        ))}
      </div>
      <p className="text-sm">
        <span className="font-medium">useIsMobile():</span>{" "}
        <Badge variant={isMobile ? "destructive" : "secondary"}>
          {isMobile ? "mobile" : "desktop"}
        </Badge>
      </p>
    </div>
  )
}

export const Breakpoints: StoryObj = { render: () => <BreakpointDemo /> }
