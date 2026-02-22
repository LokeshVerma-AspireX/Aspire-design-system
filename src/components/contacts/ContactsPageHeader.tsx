import * as React from "react"
import { UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ContactsPageHeaderProps {
  onNewCreator?: () => void
  className?: string
}

function ContactsPageHeader({ onNewCreator, className }: ContactsPageHeaderProps) {
  return (
    <div
      data-slot="contacts-page-header"
      className={cn("flex items-center justify-between px-6 pt-5 pb-0", className)}
    >
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Contacts</h1>

      <Button
        onClick={onNewCreator}
        className="rounded-full bg-foreground text-background hover:bg-foreground/85 gap-1.5"
      >
        <UserPlus className="size-4" />
        New Creator
      </Button>
    </div>
  )
}

export { ContactsPageHeader, type ContactsPageHeaderProps }
