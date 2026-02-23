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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Shield,
  KeyRound,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  RefreshCw,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react"

// --- Sample Data ---

const activeSessions = [
  {
    id: "1",
    device: "MacBook Pro",
    deviceIcon: "monitor" as const,
    browser: "Chrome 120",
    location: "San Francisco, US",
    ip: "192.168.1.42",
    lastActive: "Now",
    isCurrent: true,
  },
  {
    id: "2",
    device: "iPhone 15",
    deviceIcon: "smartphone" as const,
    browser: "Safari 17",
    location: "San Francisco, US",
    ip: "192.168.1.55",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
  {
    id: "3",
    device: "Windows Desktop",
    deviceIcon: "monitor" as const,
    browser: "Firefox 121",
    location: "New York, US",
    ip: "10.0.0.87",
    lastActive: "1 day ago",
    isCurrent: false,
  },
  {
    id: "4",
    device: "iPad Air",
    deviceIcon: "smartphone" as const,
    browser: "Safari 17",
    location: "London, UK",
    ip: "172.16.0.12",
    lastActive: "3 days ago",
    isCurrent: false,
  },
]

const loginHistory = [
  {
    id: "1",
    dateTime: "Feb 23, 2026 10:32 AM",
    location: "San Francisco, US",
    device: "MacBook Pro - Chrome",
    status: "success" as const,
  },
  {
    id: "2",
    dateTime: "Feb 23, 2026 08:15 AM",
    location: "San Francisco, US",
    device: "iPhone 15 - Safari",
    status: "success" as const,
  },
  {
    id: "3",
    dateTime: "Feb 22, 2026 11:47 PM",
    location: "Unknown",
    device: "Unknown - Chrome",
    status: "failed" as const,
  },
  {
    id: "4",
    dateTime: "Feb 22, 2026 06:20 PM",
    location: "New York, US",
    device: "Windows Desktop - Firefox",
    status: "success" as const,
  },
  {
    id: "5",
    dateTime: "Feb 21, 2026 02:05 PM",
    location: "San Francisco, US",
    device: "MacBook Pro - Chrome",
    status: "success" as const,
  },
  {
    id: "6",
    dateTime: "Feb 20, 2026 09:30 AM",
    location: "Unknown",
    device: "Unknown - Firefox",
    status: "failed" as const,
  },
  {
    id: "7",
    dateTime: "Feb 19, 2026 04:12 PM",
    location: "London, UK",
    device: "iPad Air - Safari",
    status: "success" as const,
  },
  {
    id: "8",
    dateTime: "Feb 18, 2026 11:00 AM",
    location: "San Francisco, US",
    device: "MacBook Pro - Chrome",
    status: "success" as const,
  },
]

const recoveryCodes = [
  "XXXX-XXXX-1234",
  "XXXX-XXXX-5678",
  "XXXX-XXXX-9012",
  "XXXX-XXXX-3456",
  "XXXX-XXXX-7890",
  "XXXX-XXXX-2345",
]

// --- Helper: Device Icon ---

function DeviceIcon({
  type,
  className,
}: {
  type: "monitor" | "smartphone"
  className?: string
}) {
  if (type === "smartphone") {
    return <Smartphone className={cn("size-4 text-muted-foreground", className)} />
  }
  return <Monitor className={cn("size-4 text-muted-foreground", className)} />
}

// --- Helper: Password Strength ---

function getPasswordStrength(password: string) {
  const length = password.length
  if (length === 0) return { value: 0, label: "", color: "" }
  if (length < 6)
    return { value: 20, label: "Weak", color: "bg-red-500" }
  if (length < 10)
    return { value: 45, label: "Fair", color: "bg-amber-500" }
  if (length < 14)
    return { value: 75, label: "Strong", color: "bg-green-500" }
  return { value: 100, label: "Very Strong", color: "bg-emerald-500" }
}

// --- Password Card ---

function PasswordCard() {
  const [showForm, setShowForm] = React.useState(false)
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showCurrent, setShowCurrent] = React.useState(false)
  const [showNew, setShowNew] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)

  const strength = getPasswordStrength(newPassword)

  function handleCancel() {
    setShowForm(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setShowCurrent(false)
    setShowNew(false)
    setShowConfirm(false)
  }

  return (
    <Card className="bg-card rounded-xl border p-6">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <KeyRound className="size-5 text-foreground" />
            </div>
            <CardTitle className="text-lg">Password</CardTitle>
          </div>
          {!showForm && (
            <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
              Change Password
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Last changed: 3 months ago
          </span>
          <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/25">
            <AlertTriangle className="size-3" />
            Update recommended
          </Badge>
        </div>

        {showForm && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4 max-w-md">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCurrent ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNew ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {newPassword.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Password strength
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          strength.value <= 20 && "text-red-500",
                          strength.value === 45 && "text-amber-500",
                          strength.value === 75 && "text-green-500",
                          strength.value === 100 && "text-emerald-500"
                        )}
                      >
                        {strength.label}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={strength.value}
                        className="h-2 bg-muted"
                      />
                      {/* Overlay the indicator color */}
                      <div
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-full transition-all",
                          strength.color
                        )}
                        style={{ width: `${strength.value}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button size="sm" onClick={handleCancel}>
                  Save Password
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// --- Two-Factor Authentication Card ---

function TwoFactorCard() {
  const [enabled, setEnabled] = React.useState(true)
  const [showSetup, setShowSetup] = React.useState(false)
  const [verificationCode, setVerificationCode] = React.useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ])

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  function handleCodeChange(index: number, value: string) {
    if (value.length > 1) {
      value = value.slice(-1)
    }
    if (value && !/^\d$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleCodeKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <Card className="bg-card rounded-xl border p-6">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Smartphone className="size-5 text-foreground" />
            </div>
            <CardTitle className="text-lg">
              Two-Factor Authentication
            </CardTitle>
          </div>
          {enabled ? (
            <Badge className="bg-green-500/15 text-green-600 border-green-500/25">
              <CheckCircle2 className="size-3" />
              Enabled
            </Badge>
          ) : (
            <Badge className="bg-orange-500/15 text-orange-600 border-orange-500/25">
              <AlertTriangle className="size-3" />
              Not Enabled
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {enabled ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Two-factor authentication is active. Your account is protected
              with an additional layer of security.
            </p>

            <Separator />

            {/* Recovery Codes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Recovery Codes</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Store these codes securely. Each code can only be used once.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {recoveryCodes.map((code, index) => (
                  <div
                    key={index}
                    className="rounded-md border bg-muted/50 px-3 py-2 text-center font-mono text-sm"
                  >
                    {code}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="size-4" />
                  Download Codes
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="size-4" />
                  Regenerate
                </Button>
              </div>
            </div>

            <Separator />

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setEnabled(false)}
            >
              Disable 2FA
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account by enabling
              two-factor authentication.
            </p>

            {!showSetup ? (
              <Button size="sm" onClick={() => setShowSetup(true)}>
                <Shield className="size-4" />
                Enable 2FA
              </Button>
            ) : (
              <>
                <Separator />
                <div className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      Scan QR Code
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Scan this QR code with your authenticator app (e.g.
                      Google Authenticator, Authy).
                    </p>
                  </div>

                  {/* Placeholder QR Code */}
                  <div className="flex size-48 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30">
                    <span className="text-sm font-medium text-muted-foreground">
                      QR Code
                    </span>
                  </div>

                  {/* Verification Code Input */}
                  <div className="space-y-2">
                    <Label>Verification Code</Label>
                    <p className="text-xs text-muted-foreground">
                      Enter the 6-digit code from your authenticator app.
                    </p>
                    <div className="flex items-center gap-2">
                      {verificationCode.map((digit, index) => (
                        <Input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleCodeChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleCodeKeyDown(index, e)}
                          className="size-10 text-center font-mono text-lg p-0"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      onClick={() => {
                        setEnabled(true)
                        setShowSetup(false)
                        setVerificationCode(["", "", "", "", "", ""])
                      }}
                    >
                      Verify
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowSetup(false)
                        setVerificationCode(["", "", "", "", "", ""])
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// --- Active Sessions Card ---

function ActiveSessionsCard() {
  const [sessions, setSessions] = React.useState(activeSessions)

  function handleSignOut(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  function handleSignOutAll() {
    setSessions((prev) => prev.filter((s) => s.isCurrent))
  }

  return (
    <Card className="bg-card rounded-xl border p-6">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Monitor className="size-5 text-foreground" />
          </div>
          <CardTitle className="text-lg">Active Sessions</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Browser</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DeviceIcon type={session.deviceIcon} />
                    <span className="font-medium">{session.device}</span>
                    {session.isCurrent && (
                      <Badge className="bg-green-500/15 text-green-600 border-green-500/25 text-[10px] px-1.5 py-0">
                        This device
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {session.browser}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Globe className="size-3.5" />
                    {session.location}
                  </div>
                </TableCell>
                <TableCell>
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    {session.ip}
                  </code>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {session.lastActive}
                </TableCell>
                <TableCell className="text-right">
                  {!session.isCurrent && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleSignOut(session.id)}
                    >
                      <LogOut className="size-3" />
                      Sign Out
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sessions.filter((s) => !s.isCurrent).length > 0 && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleSignOutAll}
            >
              <LogOut className="size-4" />
              Sign Out All Other Devices
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// --- Login History Card ---

function LoginHistoryCard() {
  return (
    <Card className="bg-card rounded-xl border p-6">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Clock className="size-5 text-foreground" />
          </div>
          <CardTitle className="text-lg">Login History</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date / Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loginHistory.map((entry) => (
              <TableRow
                key={entry.id}
                className={cn(
                  entry.status === "failed" && "bg-red-500/5"
                )}
              >
                <TableCell className="font-medium">
                  {entry.dateTime}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Globe className="size-3.5" />
                    {entry.location}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {entry.device}
                </TableCell>
                <TableCell>
                  {entry.status === "success" ? (
                    <Badge className="bg-green-500/15 text-green-600 border-green-500/25">
                      <CheckCircle2 className="size-3" />
                      Success
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/15 text-red-600 border-red-500/25">
                      <AlertTriangle className="size-3" />
                      Failed
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// --- Main Component ---

function SecuritySettings({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3">
        <Shield className="size-6 text-foreground" />
        <div>
          <h2 className="text-xl font-semibold">Security Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account security, sessions, and authentication
            preferences.
          </p>
        </div>
      </div>

      <PasswordCard />
      <TwoFactorCard />
      <ActiveSessionsCard />
      <LoginHistoryCard />
    </div>
  )
}

export { SecuritySettings }
