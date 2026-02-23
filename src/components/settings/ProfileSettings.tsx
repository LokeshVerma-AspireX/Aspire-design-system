"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Camera,
  Check,
  Globe,
  Languages,
  Trash2,
  ExternalLink,
  User,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Sample data                                                               */
/* -------------------------------------------------------------------------- */

const SAMPLE_USER = {
  firstName: "Alexandra",
  lastName: "Chen",
  email: "alexandra.chen@company.io",
  phone: "+1 (415) 555-0198",
  avatarUrl: "",
  initials: "AC",
  bio: "",
  timezone: "US/Pacific",
  language: "en",
}

const CONNECTED_ACCOUNTS = [
  {
    id: "google",
    name: "Google",
    letter: "G",
    color: "bg-red-500",
    connected: true,
    email: "alexandra.chen@gmail.com",
  },
  {
    id: "slack",
    name: "Slack",
    letter: "S",
    color: "bg-purple-500",
    connected: true,
    email: "alexandra.chen@company.slack.com",
  },
  {
    id: "github",
    name: "GitHub",
    letter: "H",
    color: "bg-gray-800 dark:bg-gray-200 dark:text-gray-800",
    connected: false,
    email: "",
  },
]

const TIMEZONES = [
  { value: "US/Eastern", label: "US/Eastern (EST)" },
  { value: "US/Central", label: "US/Central (CST)" },
  { value: "US/Pacific", label: "US/Pacific (PST)" },
  { value: "Europe/London", label: "Europe/London (GMT)" },
  { value: "Europe/Berlin", label: "Europe/Berlin (CET)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Asia/Shanghai (CST)" },
  { value: "Australia/Sydney", label: "Australia/Sydney (AEST)" },
]

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
  { value: "pt", label: "Portuguese" },
]

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function ProfileSettings({ className }: { className?: string }) {
  const [firstName, setFirstName] = React.useState(SAMPLE_USER.firstName)
  const [lastName, setLastName] = React.useState(SAMPLE_USER.lastName)
  const [email] = React.useState(SAMPLE_USER.email)
  const [phone, setPhone] = React.useState(SAMPLE_USER.phone)
  const [bio, setBio] = React.useState(SAMPLE_USER.bio)
  const [timezone, setTimezone] = React.useState(SAMPLE_USER.timezone)
  const [language, setLanguage] = React.useState(SAMPLE_USER.language)
  const [accounts, setAccounts] = React.useState(CONNECTED_ACCOUNTS)

  const BIO_MAX = 280

  /* Derive whether anything has changed from the initial sample data */
  const hasChanges =
    firstName !== SAMPLE_USER.firstName ||
    lastName !== SAMPLE_USER.lastName ||
    phone !== SAMPLE_USER.phone ||
    bio !== SAMPLE_USER.bio ||
    timezone !== SAMPLE_USER.timezone ||
    language !== SAMPLE_USER.language

  function handleDiscard() {
    setFirstName(SAMPLE_USER.firstName)
    setLastName(SAMPLE_USER.lastName)
    setPhone(SAMPLE_USER.phone)
    setBio(SAMPLE_USER.bio)
    setTimezone(SAMPLE_USER.timezone)
    setLanguage(SAMPLE_USER.language)
  }

  function handleSave() {
    // In a real app this would persist the changes.
    // For now we just acknowledge.
  }

  function toggleAccount(id: string) {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, connected: !a.connected } : a
      )
    )
  }

  return (
    <div className={cn("relative mx-auto w-full max-w-2xl space-y-6", className)}>
      {/* ------------------------------------------------------------------ */}
      {/*  Unsaved Changes Bar                                               */}
      {/* ------------------------------------------------------------------ */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          hasChanges
            ? "max-h-20 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        )}
      >
        <div className="flex items-center justify-between rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-700 dark:bg-amber-950/40">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            You have unsaved changes
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDiscard}>
              Discard
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="size-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Avatar Section                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col items-center gap-3">
        <div className="group relative">
          <Avatar className="size-24 text-2xl">
            {SAMPLE_USER.avatarUrl ? (
              <AvatarImage
                src={SAMPLE_USER.avatarUrl}
                alt={`${firstName} ${lastName}`}
              />
            ) : null}
            <AvatarFallback className="text-2xl font-semibold">
              {SAMPLE_USER.initials}
            </AvatarFallback>
          </Avatar>

          {/* Hover overlay */}
          <div
            className={cn(
              "absolute inset-0 flex cursor-pointer flex-col items-center justify-center",
              "rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200",
              "group-hover:opacity-100"
            )}
          >
            <Camera className="size-5" />
            <span className="mt-1 text-[10px] font-medium leading-tight">
              Change Photo
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-base font-semibold">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Profile Form Card                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border border-border bg-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="size-4 text-muted-foreground" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* First / Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-10 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-10 rounded-lg"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-0">
                <Check className="size-3" />
                Verified
              </Badge>
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              readOnly
              className="h-10 rounded-lg bg-muted/40 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-10 rounded-lg"
            />
          </div>

          <Separator />

          {/* Timezone */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              <Globe className="size-4 text-muted-foreground" />
              Timezone
            </Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="h-10 w-full rounded-lg">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              <Languages className="size-4 text-muted-foreground" />
              Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-10 w-full rounded-lg">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Bio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bio" className="text-sm font-medium">
                Bio
              </Label>
              <span className="text-xs text-muted-foreground">
                {bio.length}/{BIO_MAX}
              </span>
            </div>
            <Textarea
              id="bio"
              placeholder="Write a short bio about yourself..."
              value={bio}
              maxLength={BIO_MAX}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[100px] rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/*  Connected Accounts Card                                           */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border border-border bg-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ExternalLink className="size-4 text-muted-foreground" />
            Connected Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {accounts.map((account, index) => (
            <React.Fragment key={account.id}>
              {index > 0 && <Separator className="my-3" />}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  {/* Service icon placeholder */}
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-sm font-bold text-white",
                      account.color
                    )}
                  >
                    {account.letter}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{account.name}</p>
                    {account.connected && account.email ? (
                      <p className="text-xs text-muted-foreground">
                        {account.email}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Not connected
                      </p>
                    )}
                  </div>
                </div>

                {account.connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => toggleAccount(account.id)}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => toggleAccount(account.id)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </React.Fragment>
          ))}
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/*  Danger Zone Card                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border border-red-300 bg-card rounded-xl dark:border-red-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
              <Trash2 className="size-5" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                Delete Account
              </h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { ProfileSettings }
