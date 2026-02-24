import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      ref={ref as React.Ref<HTMLButtonElement>}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }

// ─────────────────────────────────────────────────────────────────────────────
// AspireButton — props-based wrapper around shadcn <Button>
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonType = "primary" | "default" | "dashed" | "link" | "text"
export type ButtonSize = "large" | "middle" | "small"
export type ButtonShape = "default" | "round" | "circle"
export type ButtonHtmlType = "button" | "submit" | "reset"

export interface AspireButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Semantic type — drives the visual variant */
  type?: ButtonType
  /** Button size — also controls icon size automatically */
  size?: ButtonSize
  /** Apply danger / destructive styling */
  danger?: boolean
  /** Transparent background, inverted text and border */
  ghost?: boolean
  /** Stretch button to fill its parent container width */
  block?: boolean
  /**
   * Show a loading spinner and disable interaction.
   * Pass `{ delay: ms }` to delay the spinner for fast operations.
   */
  loading?: boolean | { delay?: number }
  /**
   * Icon rendered BEFORE the label.
   * Pass a raw icon component — no className needed, size is automatic.
   * @example startIcon={<Download />}
   */
  startIcon?: React.ReactNode
  /**
   * Icon rendered AFTER the label.
   * Pass a raw icon component — no className needed, size is automatic.
   * @example endIcon={<ArrowRight />}
   */
  endIcon?: React.ReactNode
  /** Button corner shape */
  shape?: ButtonShape
  /** Render as an anchor link */
  href?: string
  /** Anchor target — only applies when href is set */
  target?: string
  /** Native HTML button type (for form usage) */
  htmlType?: ButtonHtmlType
  children?: React.ReactNode
  className?: string
}

// ── Icon size per button size ─────────────────────────────────────────────────

const ICON_SIZE_CLASS: Record<ButtonSize, string> = {
  large:  "h-5 w-5",
  middle: "h-4 w-4",
  small:  "h-3.5 w-3.5",
}

// ── Internal: wraps an icon and forces the correct size via CSS ───────────────

function IconWrapper({
  children,
  size,
}: {
  children: React.ReactNode
  size: ButtonSize
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full",
        ICON_SIZE_CLASS[size]
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

// ── Variant mapping ───────────────────────────────────────────────────────────

type ShadcnVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

const TYPE_TO_VARIANT: Record<ButtonType, ShadcnVariant> = {
  primary: "default",
  default: "outline",
  dashed:  "outline",
  link:    "link",
  text:    "ghost",
}

type ShadcnSize = "default" | "sm" | "lg" | "icon"

const SIZE_MAP: Record<ButtonSize, ShadcnSize> = {
  large:  "lg",
  middle: "default",
  small:  "sm",
}

// ── Component ─────────────────────────────────────────────────────────────────

const AspireButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, AspireButtonProps>(
  (
    {
      type = "default",
      size = "middle",
      danger = false,
      ghost = false,
      block = false,
      loading = false,
      startIcon,
      endIcon,
      shape = "default",
      href,
      target,
      htmlType = "button",
      children,
      className,
      disabled,
      onClick,
      ...rest
    },
    ref
  ) => {
    // ── Loading delay ────────────────────────────────────────────────────────
    const [showSpinner, setShowSpinner] = React.useState(
      loading === true || (typeof loading === "object" && !loading.delay)
    )

    React.useEffect(() => {
      if (!loading) {
        setShowSpinner(false)
        return
      }
      const delay = typeof loading === "object" && loading.delay ? loading.delay : 0
      const timer = setTimeout(() => setShowSpinner(true), delay)
      return () => clearTimeout(timer)
    }, [loading])

    const isDisabled = disabled || !!loading

    // ── Variant ──────────────────────────────────────────────────────────────
    // Set base variant from type, then apply danger (takes precedence), then ghost only if !danger
    let variant: ShadcnVariant = TYPE_TO_VARIANT[type]
    if (danger && type !== "link" && type !== "text") variant = "destructive"
    if (ghost && !danger) variant = "outline"

    // ── Danger styling for link and text types ──────────────────────────────
    // When danger is true for "link" or "text", apply destructive text color
    const dangerClass = danger && (type === "link" || type === "text") ? "text-destructive" : ""

    // ── Shape ────────────────────────────────────────────────────────────────
    const shapeClass =
      shape === "circle" ? "rounded-full px-0 aspect-square"
      : shape === "round" ? "rounded-full"
      : ""

    const modifierClasses = cn(
      block && "w-full",
      type === "dashed" && "border-dashed",
      ghost && "bg-transparent border",
      dangerClass,
      shapeClass
    )

    // ── Resolve icons (spinner replaces startIcon when loading) ──────────────
    const resolvedStartIcon = showSpinner ? (
      <IconWrapper size={size}>
        <Loader2 className="animate-spin" />
      </IconWrapper>
    ) : startIcon ? (
      <IconWrapper size={size}>{startIcon}</IconWrapper>
    ) : null

    const resolvedEndIcon = endIcon ? (
      <IconWrapper size={size}>{endIcon}</IconWrapper>
    ) : null

    // ── Icon-only detection ───────────────────────────────────────────────────
    const shadcnSize: ShadcnSize = !children ? "icon" : SIZE_MAP[size]

    const content = (
      <>
        {resolvedStartIcon}
        {children}
        {resolvedEndIcon}
      </>
    )

    // ── Render as <a> when href provided ─────────────────────────────────────
    if (href && !isDisabled) {
      const rel = target === "_blank" ? "noopener noreferrer" : undefined
      return (
        <Button
          ref={ref as React.Ref<HTMLAnchorElement>}
          variant={variant}
          size={shadcnSize}
          className={cn(modifierClasses, className)}
          asChild
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          <a href={href} target={target} rel={rel} onClick={onClick}>{content}</a>
        </Button>
      )
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={shadcnSize}
        type={htmlType}
        disabled={isDisabled}
        className={cn(modifierClasses, className)}
        onClick={onClick}
        {...rest}
      >
        {content}
      </Button>
    )
  }
)

AspireButton.displayName = "AspireButton"

export { AspireButton }
