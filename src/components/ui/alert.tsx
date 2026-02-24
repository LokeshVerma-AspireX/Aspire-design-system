import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Terminal, AlertTriangle, CheckCircle2,
  Info, AlertCircle, Bell, Megaphone, X, ShieldAlert,
} from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200 [&>svg]:text-blue-500",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-200 [&>svg]:text-green-600",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 [&>svg]:text-yellow-600",
        error:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200 [&>svg]:text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert"
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-title"
    className={cn(
      "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn(
      "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

// ─────────────────────────────────────────────────────────────────────────────
// AspireAlert — props-based Alert component built on shadcn primitives
//
// Architecture:
//   AspireAlert            ← your props API (message, type, showIcon, action…)
//   └── <Alert>            ← shadcn primitive  (color, border via CSS vars)
//       ├── <AlertTitle>   ← shadcn primitive  (font-medium, spacing)
//       ├── <AlertDescription> ← shadcn primitive  (text-sm, muted)
//       └── <Button>       ← shadcn primitive  (action + close button)
//
// All colors, radius, typography, and spacing inherit from your design tokens.
// ─────────────────────────────────────────────────────────────────────────────

export type AlertType = "default" | "info" | "success" | "warning" | "error"

export type AlertIconOption =
  | "auto" | "none" | "terminal" | "info" | "check"
  | "warning" | "error" | "bell" | "megaphone" | "shield"

export interface AspireAlertProps {
  /** Primary text of the alert — rendered as the title */
  message: string
  /** Supporting detail below the message. Omit for compact single-line alerts. */
  description?: string
  /** Visual intent — drives color scheme and default icon */
  type?: AlertType
  /** Show an icon matching the alert type */
  showIcon?: boolean
  /** Override the auto icon. "auto" = matches type, "none" = no icon. Pass a Lucide component directly for a custom icon. */
  icon?: AlertIconOption | React.ComponentType<{ className?: string }>
  /** Action content — pass a <Button> or any ReactNode */
  action?: React.ReactNode
  /** Place the action below the description instead of inline */
  subAction?: boolean
  /** Render as a full-width page banner (removes border-radius, forces showIcon) */
  banner?: boolean
  /** Show a dismiss control */
  closable?: boolean
  /** Style of the dismiss control */
  closeIcon?: "x-icon" | "text"
  /** Text shown when closeIcon is "text" */
  closeText?: string
  /** Called immediately when the dismiss control is activated */
  onClose?: () => void
  /** Called immediately after the alert is hidden (synchronously) */
  afterClose?: () => void
  className?: string
}

const ASPIRE_TYPE_TO_VARIANT: Record<AlertType, VariantProps<typeof alertVariants>["variant"]> = {
  default: "default",
  info:    "info",
  success: "success",
  warning: "warning",
  error:   "error",
}

const ASPIRE_TYPE_TO_ICON: Record<AlertType, React.ElementType> = {
  default: Terminal,
  info:    Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error:   AlertCircle,
}

const ASPIRE_ICON_MAP: Record<AlertIconOption, React.ElementType | null> = {
  auto:      null,
  none:      null,
  terminal:  Terminal,
  info:      Info,
  check:     CheckCircle2,
  warning:   AlertTriangle,
  error:     AlertCircle,
  bell:      Bell,
  megaphone: Megaphone,
  shield:    ShieldAlert,
}

const AspireAlert = React.forwardRef<HTMLDivElement, AspireAlertProps>(
  (
    {
      message,
      description,
      action,
      subAction = false,
      type = "default",
      showIcon = false,
      icon = "auto",
      banner = false,
      closable = false,
      closeIcon = "x-icon",
      closeText = "Close",
      onClose,
      afterClose,
      className,
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true)

    if (!visible) return null

    // Resolve icon component
    const effectiveShowIcon = banner ? true : showIcon
    let IconComponent: React.ElementType | null = null
    if (effectiveShowIcon) {
      if (icon === "none") {
        IconComponent = null
      } else if (icon === "auto") {
        IconComponent = ASPIRE_TYPE_TO_ICON[type]
      } else if (typeof icon === "string") {
        IconComponent = ASPIRE_ICON_MAP[icon as AlertIconOption] ?? null
      } else {
        IconComponent = icon
      }
    }

    const variant = ASPIRE_TYPE_TO_VARIANT[type]
    const hasDescription  = !!description
    const hasInlineAction = !subAction && !!action
    const hasControls     = hasInlineAction || closable

    const handleClose = () => {
      onClose?.()
      setVisible(false)
      afterClose?.()
    }

    const closeControl = closable ? (
      closeIcon === "text" ? (
        <button
          type="button"
          className="text-xs underline opacity-70 hover:opacity-100 shrink-0 whitespace-nowrap"
          onClick={handleClose}
        >
          {closeText || "Close"}
        </button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 rounded-full opacity-60 hover:opacity-100"
          onClick={handleClose}
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )
    ) : null

    return (
      <Alert
        ref={ref}
        variant={variant}
        className={cn(banner && "rounded-none border-x-0", className)}
      >
        {IconComponent && <IconComponent className="h-4 w-4" />}
        <div
          className={cn(
            "col-start-2 flex w-full gap-3",
            hasDescription ? "items-start" : "items-center"
          )}
        >
          <div className="flex-1 min-w-0">
            {message && (
              <AlertTitle className={cn(!hasDescription && !subAction && "mb-0")}>
                {message}
              </AlertTitle>
            )}
            {description && (
              <AlertDescription>{description}</AlertDescription>
            )}
            {subAction && action && (
              <div className="mt-2">{action}</div>
            )}
          </div>
          {hasControls && (
            <div className="flex shrink-0 items-center gap-1.5">
              {hasInlineAction && action}
              {closeControl}
            </div>
          )}
        </div>
      </Alert>
    )
  }
)

AspireAlert.displayName = "AspireAlert"

export { AspireAlert }
