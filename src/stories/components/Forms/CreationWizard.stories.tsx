import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { FileText, Settings, ClipboardCheck, Users, Palette } from "lucide-react"
import {
  CreationWizard,
  type WizardStep,
  type WizardStepProps,
  DetailsStep,
  FeatureTogglesStep,
  ReviewStep,
} from "@/components/shared/wizard"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// ─── Generic step components for demo ────────────────────────────────────────

function GenericInfoStep({ data, updateData, errors }: WizardStepProps) {
  return (
    <DetailsStep
      data={data}
      updateData={updateData}
      errors={errors}
      config={{
        title: "Basic Information",
        description: "Provide the core details for your item.",
        fields: {
          name: { label: "Item Name", placeholder: "Enter a name..." },
          description: { label: "Description", placeholder: "What is this about?" },
          dateRange: { label: "Duration" },
          image: false,
          budget: false,
        },
      }}
    />
  )
}

function GenericFeaturesStep({ data, updateData, errors }: WizardStepProps) {
  return (
    <FeatureTogglesStep
      data={data}
      updateData={updateData}
      errors={errors}
      config={{
        title: "Features",
        description: "Enable or disable optional features.",
        features: [
          {
            id: "enableNotifications",
            icon: <Settings className="size-4" />,
            title: "Enable Notifications",
            description: "Send email notifications to participants when important events occur.",
            recommended: true,
          },
          {
            id: "enableTracking",
            icon: <Palette className="size-4" />,
            title: "Enable Analytics Tracking",
            description: "Track performance metrics and generate reports automatically.",
          },
          {
            id: "enableBranding",
            icon: <FileText className="size-4" />,
            title: "Custom Branding",
            description: "Apply your brand colors and logo throughout the experience.",
          },
        ],
      }}
    />
  )
}

function GenericReviewStep({ data, updateData, errors }: WizardStepProps) {
  return (
    <ReviewStep
      data={data}
      updateData={updateData}
      errors={errors}
      config={{
        title: "Review & Confirm",
        description: "Check everything looks correct before proceeding.",
        sections: (d) => [
          {
            id: "basics",
            title: "Basic Information",
            stepIndex: 0,
            rows: [
              { label: "Name", value: d.name || "—" },
              { label: "Description", value: d.description || "—" },
              {
                label: "Duration",
                value: d.startDate ? `${d.startDate} → ${d.endDate ?? "TBD"}` : "—",
              },
            ],
          },
          {
            id: "features",
            title: "Features",
            stepIndex: 1,
            rows: [
              { label: "Notifications", value: d.enableNotifications ? "Enabled" : "Disabled" },
              { label: "Tracking", value: d.enableTracking ? "Enabled" : "Disabled" },
              { label: "Branding", value: d.enableBranding ? "Enabled" : "Disabled" },
            ],
          },
        ],
      }}
    />
  )
}

// ─── 3-step wizard steps ─────────────────────────────────────────────────────

const THREE_STEPS: WizardStep[] = [
  {
    id: "info",
    label: "Information",
    icon: FileText,
    component: GenericInfoStep,
    validation: (data) => {
      if (!data.name?.trim()) return "Name is required"
      return true
    },
  },
  {
    id: "features",
    label: "Features",
    icon: Settings,
    component: GenericFeaturesStep,
    optional: true,
  },
  {
    id: "review",
    label: "Review",
    icon: ClipboardCheck,
    component: GenericReviewStep,
  },
]

// ─── 5-step wizard steps ─────────────────────────────────────────────────────

function CustomStep1({ data, updateData, errors }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Project Details</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Basic project information.</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="project-name">Project Name</Label>
        <Input
          id="project-name"
          placeholder="My New Project"
          value={data.projectName ?? ""}
          onChange={(e) => updateData("projectName", e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="project-desc">Description</Label>
        <Textarea
          id="project-desc"
          placeholder="Describe your project..."
          value={data.projectDescription ?? ""}
          onChange={(e) => updateData("projectDescription", e.target.value)}
          className="resize-none"
          rows={3}
        />
      </div>
    </div>
  )
}

function CustomStep2({ data, updateData }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Team Setup</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Configure your team structure.</p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Team configuration UI would go here
      </div>
    </div>
  )
}

function CustomStep3({ data, updateData }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Integrations</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Connect external tools.</p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Integration settings would go here
      </div>
    </div>
  )
}

const FIVE_STEPS: WizardStep[] = [
  {
    id: "project",
    label: "Project Details",
    icon: FileText,
    component: CustomStep1,
    validation: (data) => (!data.projectName?.trim() ? "Project name is required" : true),
  },
  {
    id: "team",
    label: "Team Setup",
    icon: Users,
    component: CustomStep2,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Settings,
    component: CustomStep3,
    optional: true,
  },
  {
    id: "features",
    label: "Features",
    icon: Palette,
    component: GenericFeaturesStep,
    optional: true,
  },
  {
    id: "review",
    label: "Review",
    icon: ClipboardCheck,
    component: GenericReviewStep,
  },
]

// ─── Meta ────────────────────────────────────────────────────────────────────

/**
 * # CreationWizard
 *
 * Reusable multi-step creation wizard with configurable steps, validation,
 * stepper sidebar, and keyboard shortcuts. Powers campaign, offer, and any
 * multi-step creation flow in the application.
 *
 * ## Components Used
 * - `CreationWizard` — main wizard shell orchestrating navigation and state
 * - `WizardStepper` — vertical step indicator sidebar with active/completed/error states
 * - `WizardHeader` — title bar with step counter (`Step X of Y`) and close button
 * - `WizardFooter` — action bar with Back / Next / Complete buttons
 * - `DetailsStep` — configurable details form step (name, description, dates, image, budget)
 * - `FeatureTogglesStep` — toggle card list for enabling/disabling features
 * - `ReviewStep` — summary view with grouped key-value rows and edit links
 * - `Label`, `Input`, `Textarea` — form primitives used within step components
 * - Lucide icons: `FileText`, `Settings`, `ClipboardCheck`, `Users`, `Palette`
 *
 * ## Data Requirements
 * - `title: string` — wizard title shown in the header
 * - `steps: WizardStep[]` — array defining each step:
 *   - `id: string` — unique step identifier
 *   - `label: string` — display name in the stepper
 *   - `icon?: ComponentType` — Lucide icon for the stepper
 *   - `description?: string` — optional subtitle
 *   - `component: ComponentType<WizardStepProps>` — the step's form component
 *   - `validation?: (data) => boolean | string` — returns `true` or error message
 *   - `optional?: boolean` — marks step as skippable in the stepper
 * - `onComplete: (data: Record<string, any>) => void` — called when wizard finishes
 * - `onCancel: () => void` — called when wizard is closed/cancelled
 * - `initialData?: Record<string, any>` — pre-filled form data
 * - `initialStep?: number` — zero-indexed starting step
 * - `completeLabel?: string` — final button text (default: "Complete")
 *
 * ## Customization
 * - Add or remove steps by modifying the `steps` array
 * - Each step component receives `{ data, updateData, errors }` and can render any form layout
 * - Validation is per-step and supports both boolean and string error returns
 * - `DetailsStep`, `FeatureTogglesStep`, and `ReviewStep` are reusable building blocks with config objects
 * - Stepper sidebar shows icons, labels, optional badges, and error indicators
 * - The wizard enforces forward-only navigation (users can go back but not skip ahead)
 * - `completeLabel` customizes the final CTA (e.g., "Create Campaign", "Publish Offer")
 *
 * ```tsx
 * import { CreationWizard } from "@/components/shared/wizard/CreationWizard"
 * ```
 */
const meta = {
  title: "4. Components/Forms/CreationWizard",
  component: CreationWizard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CreationWizard>

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default 3-step wizard with Information, Features, and Review steps. */
export const ThreeSteps: Story = {
  args: {
    title: "Create New Item",
    steps: THREE_STEPS,
    onComplete: (data) => console.log("Completed:", data),
    onCancel: () => console.log("Cancelled"),
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreationWizard {...args} />
    </div>
  ),
}

/** 5-step wizard demonstrating a more complex flow similar to campaign/offer creation. */
export const FiveSteps: Story = {
  args: {
    title: "Create New Project",
    steps: FIVE_STEPS,
    onComplete: (data) => console.log("Completed:", data),
    onCancel: () => console.log("Cancelled"),
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreationWizard {...args} />
    </div>
  ),
}

/** Wizard with validation — click "Next" without entering a name to see error state. */
export const WithValidationErrors: Story = {
  args: {
    title: "Create New Item",
    steps: THREE_STEPS,
    onComplete: (data) => console.log("Completed:", data),
    onCancel: () => console.log("Cancelled"),
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreationWizard {...args} />
    </div>
  ),
}

/** Wizard pre-filled and starting on the Review step showing all data summarized. */
export const OnReviewStep: Story = {
  args: {
    title: "Create New Item",
    steps: THREE_STEPS,
    initialStep: 2,
    initialData: {
      name: "My Amazing Project",
      description: "A comprehensive project covering all the bases.",
      startDate: "2026-03-01",
      endDate: "2026-06-30",
      enableNotifications: true,
      enableTracking: true,
      enableBranding: false,
    },
    onComplete: (data) => console.log("Completed:", data),
    onCancel: () => console.log("Cancelled"),
  },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreationWizard {...args} />
    </div>
  ),
}
