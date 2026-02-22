import type { Meta, StoryObj } from "@storybook/react"
import { CreateOfferWizard } from "@/components/offers/create/CreateOfferWizard"
import { PageShell } from "@/components/layout/PageShell"

const meta = {
  title: "Offers/Create/CreateOfferWizard",
  component: CreateOfferWizard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "5-step multi-step wizard for creating a new offer. Manages form state across Offer Basics → Configure Discount → Creator Earnings → Advance Config → Review & Create.",
      },
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
    docs: { description: { story: "Step 2: Offer type dropdown, discount value toggle ($ / %), SecureCodes™ and landing page feature cards, collapsible advanced sections." } },
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
    <PageShell
      activeHref="/offers"
      user={{ name: "Jason Roh", initials: "JR" }}
      badgeCounts={{ messages: 2 }}
      defaultCollapsed
    >
      <div className="h-full overflow-hidden">
        <CreateOfferWizard {...args} />
      </div>
    </PageShell>
  ),
  parameters: {
    docs: { description: { story: "Wizard inside the full Aspire app frame with sidebar." } },
  },
}
