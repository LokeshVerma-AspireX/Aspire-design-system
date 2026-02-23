"use client"

import * as React from "react"
import { Link2, ShieldCheck, QrCode, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"
import { CollapsibleSection } from "@/components/shared/CollapsibleSection"
import type { WizardStepProps } from "@/components/shared/wizard"

function CampaignAdvancedStep({ data, updateData }: WizardStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-base font-semibold text-foreground">Advanced Settings</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Configure tracking, automation, and additional campaign features.
        </p>
      </div>

      {/* Feature Toggle Cards */}
      <div className="space-y-3">
        <FeatureToggleCard
          icon={<Link2 className="size-4" />}
          title="Enable Affiliate Tracking"
          description="Generate unique tracking links for each creator to measure conversions and attribute sales."
          recommended
          checked={data.enableAffiliateTracking ?? false}
          onCheckedChange={(checked) => updateData("enableAffiliateTracking", checked)}
          checklistItems={[
            "Unique link per creator",
            "Real-time conversion tracking",
            "Automatic commission calculation",
          ]}
        />

        <FeatureToggleCard
          icon={<ShieldCheck className="size-4" />}
          title="Auto-approve Content"
          description="Skip manual content review and automatically approve creator submissions."
          checked={data.autoApproveContent ?? false}
          onCheckedChange={(checked) => updateData("autoApproveContent", checked)}
        />

        <FeatureToggleCard
          icon={<QrCode className="size-4" />}
          title="Enable SecureCodes™"
          description="Generate fraud-protected promo codes that are unique and non-transferable for each creator."
          recommended
          checked={data.enableSecureCodes ?? false}
          onCheckedChange={(checked) => updateData("enableSecureCodes", checked)}
          checklistItems={[
            "Tamper-proof codes per creator",
            "Fraud detection & prevention",
            "Usage analytics dashboard",
          ]}
          footerLink={{ label: "How SecureCodes™ Work?", onClick: () => {} }}
        />

        <FeatureToggleCard
          icon={<Globe className="size-4" />}
          title="Create Landing Page"
          description="Generate a branded campaign landing page where creators can learn about and join your campaign."
          checked={data.createLandingPage ?? false}
          onCheckedChange={(checked) => updateData("createLandingPage", checked)}
        />
      </div>

      {/* Collapsible sections */}
      <div className="space-y-3">
        <CollapsibleSection title="Approval Workflow">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Configure the review stages for creator content submissions.</p>
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="font-medium text-foreground">Default workflow:</p>
              <ol className="mt-1 list-inside list-decimal space-y-0.5 text-xs">
                <li>Creator submits content</li>
                <li>Brand manager reviews</li>
                <li>Content approved or revision requested</li>
                <li>Creator publishes approved content</li>
              </ol>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Notification Preferences">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Choose what email notifications creators receive.</p>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-xs space-y-1">
              <p>• Campaign invitation</p>
              <p>• Content submission reminders (3 days before deadline)</p>
              <p>• Approval/revision notifications</p>
              <p>• Payment confirmation</p>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Custom Fields">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Add campaign-specific data fields to collect additional information from creators.
            </p>
            <div className="rounded-md border border-dashed border-border bg-muted/20 p-6 text-center text-xs">
              No custom fields configured yet.
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}

export { CampaignAdvancedStep }
