import * as React from "react"
import { Mail, Phone, Edit2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { PLATFORM_ICONS, type SocialPlatform } from "@/lib/constants/platforms"

interface TalentManager {
  name: string
  email: string
  phone?: string
}

interface SocialAccount {
  platform: SocialPlatform
  handle: string
  followers?: number
}

interface ContactDetailsCardProps {
  name: string
  email?: string
  phone?: string
  talentManagers?: TalentManager[]
  socialAccounts?: SocialAccount[]
  shippingAddress?: string
  className?: string
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  )
}

function ContactDetailsCard({
  name,
  email,
  phone,
  talentManagers,
  socialAccounts,
  shippingAddress,
  className,
}: ContactDetailsCardProps) {
  return (
    <div className={cn("flex flex-col divide-y divide-border rounded-xl border bg-card shadow-sm", className)}>
      {/* Contact details */}
      <div className="flex flex-col gap-3 p-4">
        <SectionLabel>Contact Details</SectionLabel>
        <p className="font-semibold text-foreground">{name}</p>
        {email && (
          <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
            <Mail className="size-3.5 shrink-0 text-muted-foreground" />
            {email}
          </a>
        )}
        {phone && (
          <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary">
            <Phone className="size-3.5 shrink-0 text-muted-foreground" />
            {phone}
          </a>
        )}
      </div>

      {/* Talent Managers */}
      {talentManagers && talentManagers.length > 0 && (
        <div className="flex flex-col gap-3 p-4">
          <SectionLabel>Talent Managers</SectionLabel>
          {talentManagers.map((mgr, i) => (
            <div key={i} className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-sm font-medium text-foreground">{mgr.name}</p>
                <a href={`mailto:${mgr.email}`} className="text-xs text-primary hover:underline truncate">
                  {mgr.email}
                </a>
                {mgr.phone && <p className="text-xs text-muted-foreground">{mgr.phone}</p>}
              </div>
              <button className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Edit2 className="size-3" />
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Social Accounts */}
      {socialAccounts && socialAccounts.length > 0 && (
        <div className="flex flex-col gap-3 p-4">
          <SectionLabel>Social Accounts</SectionLabel>
          {socialAccounts.map((acct, i) => {
            const icon = PLATFORM_ICONS[acct.platform]
            return (
              <div key={i} className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold",
                    icon.bg,
                    icon.text
                  )}
                >
                  {icon.label}
                </span>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{acct.handle}</p>
                  {acct.followers != null && (
                    <p className="text-xs text-muted-foreground">
                      {(acct.followers / 1000).toFixed(0)}K followers
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Shipping address */}
      {shippingAddress && (
        <div className="flex flex-col gap-2 p-4">
          <SectionLabel>Shipping Address</SectionLabel>
          <p className="text-sm text-foreground whitespace-pre-line">{shippingAddress}</p>
        </div>
      )}
    </div>
  )
}

export { ContactDetailsCard, type ContactDetailsCardProps, type TalentManager, type SocialAccount }
