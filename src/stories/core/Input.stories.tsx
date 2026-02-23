import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Search,
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  Link2,
  DollarSign,
  AtSign,
} from "lucide-react"

/**
 * # Input
 *
 * A styled wrapper around the native HTML `<input>` element. It provides
 * consistent Aspire Design System styling, focus rings, and built-in support
 * for `aria-invalid` error states.
 *
 * ## When to Use
 * - Single-line text entry (names, emails, passwords, numbers)
 * - Search fields with icon adornments
 * - File upload inputs
 * - Any form field that accepts a short text value
 *
 * ## When NOT to Use
 * - Multi-line text — use **Textarea** instead
 * - Selecting from a predefined list — use **Select** or **Combobox**
 * - Boolean toggles — use **Switch** or **Checkbox**
 * - Rich text editing — use a dedicated rich-text editor
 *
 * ## Accessibility
 * - Always pair with a `<Label>` using matching `htmlFor` / `id` attributes
 * - Use `aria-describedby` to link helper or error text
 * - Use `aria-invalid="true"` to signal validation errors (built-in styling)
 * - Disabled inputs are removed from the tab order automatically
 * - Focus ring is visible on keyboard navigation
 *
 * ## Import
 * ```tsx
 * import { Input } from '@/components/ui/input'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Input type="email" placeholder="creator@aspire.io" />
 * ```
 */
const meta: Meta<typeof Input> = {
  title: "3. Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Styled HTML input wrapper supporting all native input types, focus rings, and aria-invalid error states.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "search",
        "tel",
        "url",
        "file",
        "date",
      ],
      description:
        "The HTML input type. Controls browser behaviour, keyboard on mobile, and built-in validation.",
      table: {
        type: {
          summary:
            '"text" | "email" | "password" | "number" | "search" | "tel" | "url" | "file" | "date"',
        },
        defaultValue: { summary: "text" },
        category: "Core",
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when the input is empty.",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },
    disabled: {
      control: "boolean",
      description:
        "Disables the input, preventing interaction and reducing opacity to 50%.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    readOnly: {
      control: "boolean",
      description:
        "Makes the input read-only. The value is still submitted with the form but cannot be edited.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    defaultValue: {
      control: "text",
      description: "The initial uncontrolled value of the input.",
      table: {
        type: { summary: "string | number" },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged via `cn()` utility.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    onChange: {
      action: "changed",
      description: "Fires when the input value changes.",
      table: {
        type: { summary: "(e: ChangeEvent<HTMLInputElement>) => void" },
        category: "Events",
      },
    },
    onFocus: {
      action: "focused",
      description: "Fires when the input receives focus.",
      table: {
        type: { summary: "(e: FocusEvent<HTMLInputElement>) => void" },
        category: "Events",
      },
    },
    onBlur: {
      action: "blurred",
      description: "Fires when the input loses focus.",
      table: {
        type: { summary: "(e: FocusEvent<HTMLInputElement>) => void" },
        category: "Events",
      },
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Input>

// ─── INPUT TYPES ──────────────────────────────────

/**
 * Default text input. The most common type in forms.
 *
 * ```tsx
 * <Input type="text" placeholder="Campaign name" />
 * ```
 */
export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Campaign name",
  },
}

/**
 * Email input with browser-level email validation on submit.
 *
 * ```tsx
 * <Input type="email" placeholder="creator@aspire.io" />
 * ```
 */
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "creator@aspire.io",
  },
}

/**
 * Password input with masked characters.
 *
 * ```tsx
 * <Input type="password" placeholder="Enter your password" />
 * ```
 */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
}

/**
 * Number input with increment/decrement controls in most browsers.
 *
 * ```tsx
 * <Input type="number" placeholder="0" min={0} max={100} />
 * ```
 */
export const Number: Story = {
  args: {
    type: "number",
    placeholder: "0",
    min: 0,
    max: 100,
  },
}

/**
 * Search input. Some browsers show a clear button automatically.
 *
 * ```tsx
 * <Input type="search" placeholder="Search creators..." />
 * ```
 */
export const SearchType: Story = {
  name: "Search",
  args: {
    type: "search",
    placeholder: "Search creators...",
  },
}

/**
 * File input. The component styles the file selector button consistently.
 *
 * ```tsx
 * <Input type="file" accept="image/*" />
 * ```
 */
export const File: Story = {
  args: {
    type: "file",
    accept: "image/*",
  },
}

// ─── STATES ───────────────────────────────────────

/**
 * Input with a pre-filled value.
 *
 * ```tsx
 * <Input defaultValue="Summer Glow Campaign" />
 * ```
 */
export const WithValue: Story = {
  name: "With Value",
  args: {
    type: "text",
    defaultValue: "Summer Glow Campaign",
  },
}

/**
 * Disabled input. Pointer events are blocked and opacity is reduced.
 *
 * ```tsx
 * <Input disabled defaultValue="Cannot edit this" />
 * ```
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Cannot edit this",
    placeholder: "Disabled input",
  },
}

/**
 * Read-only input. Value is visible and selectable but not editable.
 *
 * ```tsx
 * <Input readOnly defaultValue="aspire.io/c/summer-glow" />
 * ```
 */
export const ReadOnly: Story = {
  name: "Read Only",
  args: {
    readOnly: true,
    defaultValue: "aspire.io/c/summer-glow",
  },
}

/**
 * Error state using `aria-invalid`. The component has built-in destructive
 * ring and border styling when `aria-invalid="true"` is present.
 *
 * ```tsx
 * <Input aria-invalid="true" defaultValue="ab" placeholder="Username" />
 * ```
 */
export const ErrorState: Story = {
  name: "Error State (aria-invalid)",
  args: {
    "aria-invalid": "true",
    defaultValue: "ab",
    placeholder: "Username",
  },
}

// ─── ALL TYPES GALLERY ────────────────────────────

/** Side-by-side comparison of all common input types. */
export const AllTypes: Story = {
  name: "All Types",
  render: () => (
    <div className="grid w-80 gap-3">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
      <Input type="search" placeholder="Search" />
      <Input type="tel" placeholder="Telephone" />
      <Input type="url" placeholder="URL" />
      <Input type="date" />
      <Input type="file" />
    </div>
  ),
}

// ─── COMPOSITIONS ─────────────────────────────────

/**
 * Input paired with a Label. The `htmlFor` / `id` link ensures clicking
 * the label focuses the input.
 *
 * ```tsx
 * <div className="grid w-72 gap-1.5">
 *   <Label htmlFor="creator-email">Email address</Label>
 *   <Input id="creator-email" type="email" placeholder="creator@aspire.io" />
 * </div>
 * ```
 */
export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="creator-email">Email address</Label>
      <Input
        id="creator-email"
        type="email"
        placeholder="creator@aspire.io"
      />
    </div>
  ),
}

/**
 * Input with Label and helper text linked via `aria-describedby`.
 *
 * ```tsx
 * <div className="grid w-72 gap-1.5">
 *   <Label htmlFor="handle">Creator handle</Label>
 *   <Input id="handle" placeholder="@janedoe" aria-describedby="handle-hint" />
 *   <p id="handle-hint" className="text-xs text-muted-foreground">
 *     Letters, numbers, and underscores only.
 *   </p>
 * </div>
 * ```
 */
export const WithLabelAndHelper: Story = {
  name: "With Label + Helper Text",
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="handle">Creator handle</Label>
      <Input
        id="handle"
        placeholder="@janedoe"
        aria-describedby="handle-hint"
      />
      <p id="handle-hint" className="text-xs text-muted-foreground">
        Letters, numbers, and underscores only.
      </p>
    </div>
  ),
}

/**
 * Validation error pattern with `aria-invalid`, destructive label, and
 * error helper text.
 *
 * ```tsx
 * <div className="grid w-72 gap-1.5">
 *   <Label htmlFor="username-err" className="text-destructive">Username</Label>
 *   <Input
 *     id="username-err"
 *     aria-invalid="true"
 *     defaultValue="ab"
 *     aria-describedby="username-hint"
 *   />
 *   <p id="username-hint" className="text-sm text-destructive">
 *     Username must be at least 3 characters.
 *   </p>
 * </div>
 * ```
 */
export const WithError: Story = {
  name: "With Validation Error",
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="username-err" className="text-destructive">
        Username
      </Label>
      <Input
        id="username-err"
        aria-invalid="true"
        defaultValue="ab"
        aria-describedby="username-hint"
      />
      <p id="username-hint" className="text-sm text-destructive">
        Username must be at least 3 characters.
      </p>
    </div>
  ),
}

/**
 * Search input with a leading icon. The icon is positioned absolutely
 * inside a relative container, and `pl-9` offsets the text.
 *
 * ```tsx
 * <div className="relative w-80">
 *   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
 *   <Input className="pl-9" placeholder="Search creators..." type="search" />
 * </div>
 * ```
 */
export const SearchBar: Story = {
  name: "Search Bar with Icon",
  render: () => (
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder="Search creators..."
        type="search"
      />
    </div>
  ),
}

/**
 * Password input with a visibility toggle button.
 *
 * ```tsx
 * const [show, setShow] = useState(false)
 * <div className="relative w-72">
 *   <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
 *   <Input type={show ? "text" : "password"} placeholder="Enter password" className="pl-9 pr-10" />
 *   <button onClick={() => setShow(s => !s)} aria-label={show ? "Hide password" : "Show password"} />
 * </div>
 * ```
 */
export const PasswordToggle: Story = {
  name: "Password with Visibility Toggle",
  render: () => {
    const [show, setShow] = useState(false)
    return (
      <div className="relative w-72">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type={show ? "text" : "password"}
          placeholder="Enter password"
          className="pl-9 pr-10"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    )
  },
}

/**
 * Input with a leading icon and trailing text adornment.
 *
 * ```tsx
 * <div className="relative w-72">
 *   <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
 *   <Input type="number" placeholder="0.00" className="pl-9 pr-14" />
 *   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USD</span>
 * </div>
 * ```
 */
export const WithAdornments: Story = {
  name: "With Icon + Suffix Adornment",
  render: () => (
    <div className="relative w-72">
      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="number" placeholder="0.00" className="pl-9 pr-14" />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        USD
      </span>
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Login form composition using Input with icons and labels.
 *
 * ```tsx
 * <div className="w-80 space-y-4 rounded-lg border bg-card p-6 shadow-sm">
 *   <h2 className="text-xl font-semibold">Sign in to Aspire</h2>
 *   <div className="grid gap-1.5">
 *     <Label htmlFor="lf-email">Email</Label>
 *     <Input id="lf-email" type="email" placeholder="you@brand.com" />
 *   </div>
 *   ...
 * </div>
 * ```
 */
export const LoginForm: Story = {
  name: "Real World — Login Form",
  render: () => (
    <div className="w-80 space-y-4 rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Sign in to Aspire</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to continue
        </p>
      </div>
      <div className="space-y-3">
        <div className="grid gap-1.5">
          <Label htmlFor="lf-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lf-email"
              type="email"
              placeholder="you@brand.com"
              className="pl-9"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="lf-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lf-password"
              type="password"
              placeholder="••••••••"
              className="pl-9"
            />
          </div>
        </div>
        <Button className="w-full">Sign in</Button>
      </div>
    </div>
  ),
}

/**
 * Creator profile form with editable and disabled fields.
 *
 * ```tsx
 * <div className="w-80 space-y-3">
 *   <div className="grid gap-1.5">
 *     <Label htmlFor="pf-name">Creator name</Label>
 *     <Input id="pf-name" defaultValue="Emma Rodriguez" />
 *   </div>
 *   <div className="grid gap-1.5">
 *     <Label htmlFor="pf-email">Email</Label>
 *     <Input id="pf-email" type="email" defaultValue="emma@aspire.io" disabled />
 *   </div>
 * </div>
 * ```
 */
export const ProfileForm: Story = {
  name: "Real World — Creator Profile",
  render: () => (
    <div className="w-80 space-y-3">
      <div className="grid gap-1.5">
        <Label htmlFor="pf-name">Creator name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="pf-name"
            placeholder="Full name"
            defaultValue="Emma Rodriguez"
            className="pl-9"
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pf-email">Email</Label>
        <div className="relative">
          <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="pf-email"
            type="email"
            defaultValue="emma@aspire.io"
            disabled
            className="pl-9"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Email cannot be changed after account creation.
        </p>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pf-link">Portfolio URL</Label>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="pf-link"
            type="url"
            placeholder="https://yourportfolio.com"
            className="pl-9"
          />
        </div>
      </div>
    </div>
  ),
}

/**
 * Campaign creation form with required and optional fields.
 */
export const CampaignForm: Story = {
  name: "Real World — Campaign Fields",
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border bg-card p-6">
      <h3 className="font-semibold">New Campaign</h3>
      <div className="grid gap-1.5">
        <Label htmlFor="cf-name">
          Campaign name <span className="text-destructive">*</span>
        </Label>
        <Input id="cf-name" placeholder="e.g. Summer Glow 2025" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="cf-budget">Budget</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="cf-budget"
              type="number"
              placeholder="5000"
              className="pl-9"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-date">Start date</Label>
          <Input id="cf-date" type="date" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline">Cancel</Button>
        <Button>Create Campaign</Button>
      </div>
    </div>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that typing into the input updates the value and fires onChange.
 */
export const TypingTest: Story = {
  name: "Test: Typing fires onChange",
  args: {
    placeholder: "Type here...",
    type: "text",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Type here...")
    await userEvent.click(input)
    await userEvent.type(input, "Aspire Campaign")
    await expect(input).toHaveValue("Aspire Campaign")
    await expect(args.onChange).toHaveBeenCalled()
  },
}

/**
 * Verifies that focusing and blurring the input fires onFocus and onBlur.
 */
export const FocusBlurTest: Story = {
  name: "Test: Focus and Blur events",
  args: {
    placeholder: "Focus me...",
    type: "text",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Focus me...")
    await userEvent.click(input)
    await expect(args.onFocus).toHaveBeenCalledTimes(1)
    await userEvent.tab()
    await expect(args.onBlur).toHaveBeenCalledTimes(1)
  },
}

/**
 * Verifies that a disabled input cannot be typed into.
 */
export const DisabledInteractionTest: Story = {
  name: "Test: Disabled prevents input",
  args: {
    placeholder: "Disabled input",
    disabled: true,
    type: "text",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Disabled input")
    await expect(input).toBeDisabled()
  },
}
