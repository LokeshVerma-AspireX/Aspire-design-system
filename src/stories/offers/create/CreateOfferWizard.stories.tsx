import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CreateOfferWizard } from "@/components/offers/create/CreateOfferWizard"
import { AppShell } from "@/components/layout/AppShell"

/**
 * # CreateOfferWizard
 *
 * Five-step multi-step wizard for creating a new offer. Manages form state across
 * Offer Basics, Configure Discount, Creator Earnings, Advance Config, and Review & Create.
 *
 * ## Components Used
 * - `CreationWizard` -- shared wizard shell with stepper sidebar, step content, and navigation footer
 * - `StepperSidebar` -- vertical step indicator with icons, labels, and active/completed states
 * - `OfferBasicsWizardStep` -- offer name, description, date range, image upload, promo code toggle
 * - `ConfigureDiscountWizardStep` -- offer type dropdown, discount value toggle ($ / %), SecureCodes, landing page
 * - `CreatorEarningsWizardStep` -- creator commission and earnings configuration
 * - `AdvanceConfigWizardStep` -- optional advanced settings (collapsible sections)
 * - `OfferReviewWizardStep` -- summary review of all entered data with "Create Offer" CTA
 * - `FormFooter` -- Back / Continue / Create Offer navigation buttons
 *
 * ## Data Requirements
 * - `initialStep` (number, optional) -- zero-indexed step to start on (default 0)
 * - Internal wizard state tracks: offerName, offerDescription, dateRangeFrom, dateRangeTo,
 *   generatePromoCodes, offerType, discountMode, discountValue, enableSecureCodes, enableLandingPage
 * - `onSubmit` callback receives the full form data object on completion
 * - `onClose` callback fires when the wizard is cancelled
 *
 * ## Customization
 * - Starting step is configurable via `initialStep`
 * - Step 4 (Advance Config) is marked optional and can be skipped
 * - Validation on step 1 requires a non-empty offer name
 * - Final step label ("Create Offer") is configurable via the wizard shell
 * - Wizard can be embedded inside AppShell or rendered standalone
 *
 * ```tsx
 * import { CreateOfferWizard } from "@/components/offers/create/CreateOfferWizard"
 * ```
 */
const meta = {
  title: "6. Pages/Offers/CreateOfferWizard",
  component: CreateOfferWizard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    initialStep: {
      control: { type: "number", min: 0, max: 4 },
      description: "Zero-indexed step the wizard opens on. 0 = Offer Basics, 4 = Review & Create.",
    },
    onClose: {
      action: "onClose",
      description: "Callback fired when the wizard cancel/close action is triggered.",
    },
    onSubmit: {
      action: "onSubmit",
      description: "Callback fired with the full form data when 'Create Offer' is clicked on the final step.",
    },
  },
} satisfies Meta<typeof CreateOfferWizard>

export default meta
type Story = StoryObj<typeof meta>

export const Step1OfferBasics: Story = {
  args: { initialStep: 0 },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateOfferWizard {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Step 1: Offer name, description, date range, image upload, and promo code toggle." } },
  },
}

export const Step2ConfigureDiscount: Story = {
  args: { initialStep: 1 },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateOfferWizard {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Step 2: Offer type dropdown, discount value toggle ($ / %), SecureCodes and landing page feature cards, collapsible advanced sections." } },
  },
}

export const Step3CreatorEarnings: Story = {
  args: { initialStep: 2 },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateOfferWizard {...args} />
    </div>
  ),
}

export const Step4AdvanceConfig: Story = {
  args: { initialStep: 3 },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateOfferWizard {...args} />
    </div>
  ),
}

export const Step5ReviewCreate: Story = {
  args: { initialStep: 4 },
  render: (args) => (
    <div className="h-screen bg-background">
      <CreateOfferWizard {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Step 5: Summary review of all entered data. 'Create Offer' CTA button in footer." } },
  },
}

export const WithSidebar: Story = {
  args: { initialStep: 0 },
  render: (args) => (
    <AppShell
      activeHref="/offers"
      user={{ name: "Jason Roh", initials: "JR" }}
      badgeCounts={{ messages: 2 }}
      defaultCollapsed
    >
      <div className="h-full overflow-hidden">
        <CreateOfferWizard {...args} />
      </div>
    </AppShell>
  ),
  parameters: {
    docs: { description: { story: "Wizard inside the full Aspire app frame with sidebar." } },
  },
}
