"use client"

import * as React from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AstraButton } from "@/components/layout/AstraButton"

interface ProfileTypeOption {
  label: string
  value: string
}

interface ContactDetailHeaderProps {
  name: string
  avatarUrl?: string
  initials?: string
  profileType?: string
  profileTypeOptions?: ProfileTypeOption[]
  onProfileTypeChange?: (value: string) => void
  onBack?: () => void
  backLabel?: string
  actionItems?: Array<{ label: string; onClick: () => void; variant?: "default" | "destructive" }>
  className?: string
}

function ContactDetailHeader({
  name,
  avatarUrl,
  initials,
  profileType = "Personal Profile",
  profileTypeOptions = [],
  onProfileTypeChange,
  onBack,
  backLabel = "Back to Contacts",
  actionItems = [],
  className,
}: ContactDetailHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 border-b border-border bg-background px-6 pt-4 pb-0", className)}>
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        {backLabel}
      </button>

      {/* Profile row */}
      <div className="flex items-center justify-between gap-4 pb-4">
        {/* Left: avatar + name + profile type */}
        <div className="flex items-center gap-4 min-w-0">
          <Avatar className="size-16 shrink-0">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className="text-xl font-bold">
              {initials ?? name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground truncate">{name}</h1>

            {/* Profile type dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex w-fit items-center gap-1 rounded-md border border-input bg-background px-2.5 py-1 text-sm text-foreground hover:bg-muted transition-colors">
                  {profileType}
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              {profileTypeOptions.length > 0 && (
                <DropdownMenuContent align="start">
                  {profileTypeOptions.map((opt) => (
                    <DropdownMenuItem
                      key={opt.value}
                      onClick={() => onProfileTypeChange?.(opt.value)}
                    >
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>

        {/* Right: Actions + Astra */}
        <div className="flex shrink-0 items-center gap-2">
          {actionItems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-9 gap-1.5 bg-foreground text-background hover:bg-foreground/85">
                  Actions
                  <ChevronDown className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actionItems.map((item, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={item.onClick}
                    variant={item.variant === "destructive" ? "destructive" : "default"}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <AstraButton />
        </div>
      </div>
    </div>
  )
}

export { ContactDetailHeader, type ContactDetailHeaderProps, type ProfileTypeOption }
