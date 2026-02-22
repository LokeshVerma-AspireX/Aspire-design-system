import * as React from "react"
import { cn } from "@/lib/utils"
import { ContactDetailsCard, type TalentManager, type SocialAccount } from "./ContactDetailsCard"
import { ActivityFeed, type ActivityItemData } from "./ActivityFeed"
import { TagPillGroup, type Pill } from "@/components/shared/TagPillGroup"

interface OverviewTabProps {
  // Contact details
  name: string
  email?: string
  phone?: string
  talentManagers?: TalentManager[]
  socialAccounts?: SocialAccount[]
  shippingAddress?: string
  // Pills
  campaigns?: Pill[]
  groups?: Pill[]
  tags?: Pill[]
  // Activity
  activities?: ActivityItemData[]
  campaignFilterOptions?: Array<{ label: string; value: string }>
  activityTypeOptions?: Array<{ label: string; value: string }>
  onNewActivity?: () => void
  className?: string
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
      {title}
    </p>
  )
}

function OverviewTab({
  name,
  email,
  phone,
  talentManagers,
  socialAccounts,
  shippingAddress,
  campaigns = [],
  groups = [],
  tags = [],
  activities = [],
  campaignFilterOptions = [],
  activityTypeOptions = [],
  onNewActivity,
  className,
}: OverviewTabProps) {
  return (
    <div className={cn("grid grid-cols-5 gap-6 p-6", className)}>
      {/* LEFT column — contact details + pill sections */}
      <div className="col-span-2 flex flex-col gap-5">
        <ContactDetailsCard
          name={name}
          email={email}
          phone={phone}
          talentManagers={talentManagers}
          socialAccounts={socialAccounts}
          shippingAddress={shippingAddress}
        />

        {campaigns.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionHeader title="Campaigns" />
            <TagPillGroup pills={campaigns} />
          </div>
        )}

        {groups.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionHeader title="Groups" />
            <TagPillGroup pills={groups} />
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
            <SectionHeader title="Tags" />
            <TagPillGroup pills={tags} />
          </div>
        )}
      </div>

      {/* RIGHT column — activity feed */}
      <div className="col-span-3">
        <ActivityFeed
          activities={activities}
          campaignOptions={campaignFilterOptions}
          activityTypeOptions={activityTypeOptions}
          onNewActivity={onNewActivity}
        />
      </div>
    </div>
  )
}

export { OverviewTab, type OverviewTabProps }
