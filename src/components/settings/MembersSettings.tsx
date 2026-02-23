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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  UserPlus,
  MoreHorizontal,
  Mail,
  ShieldCheck,
  ChevronDown,
  Check,
  X,
} from "lucide-react"

type Role = "Owner" | "Admin" | "Manager" | "Member"
type Status = "Active" | "Pending" | "Inactive"

interface TeamMember {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  lastActive: string
  avatarUrl: string
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "you@aspire.io",
    role: "Owner",
    status: "Active",
    lastActive: "Just now",
    avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png",
  },
  {
    id: "2",
    name: "James Wilson",
    email: "james.wilson@aspire.io",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png",
  },
  {
    id: "3",
    name: "Sophia Chen",
    email: "sophia.chen@aspire.io",
    role: "Manager",
    status: "Active",
    lastActive: "1 day ago",
    avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png",
  },
  {
    id: "4",
    name: "Marcus Rivera",
    email: "marcus.rivera@aspire.io",
    role: "Manager",
    status: "Inactive",
    lastActive: "2 weeks ago",
    avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png",
  },
  {
    id: "5",
    name: "Emily Nakamura",
    email: "emily.nakamura@aspire.io",
    role: "Member",
    status: "Active",
    lastActive: "5 hours ago",
    avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png",
  },
  {
    id: "6",
    name: "Daniel Okafor",
    email: "daniel.okafor@aspire.io",
    role: "Member",
    status: "Pending",
    lastActive: "Invited 3 days ago",
    avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png",
  },
]

const roleBadgeClasses: Record<Role, string> = {
  Owner: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  Admin: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Manager: "bg-teal-100 text-teal-700 hover:bg-teal-100",
  Member: "bg-muted text-muted-foreground hover:bg-muted",
}

const permissions = [
  "Manage campaigns",
  "Invite members",
  "View analytics",
  "Manage billing",
  "Edit brand kit",
  "Access API keys",
] as const

const permissionsMatrix: Record<string, Record<Role, boolean>> = {
  "Manage campaigns": { Owner: true, Admin: true, Manager: true, Member: false },
  "Invite members": { Owner: true, Admin: true, Manager: false, Member: false },
  "View analytics": { Owner: true, Admin: true, Manager: true, Member: true },
  "Manage billing": { Owner: true, Admin: false, Manager: false, Member: false },
  "Edit brand kit": { Owner: true, Admin: true, Manager: true, Member: false },
  "Access API keys": { Owner: true, Admin: true, Manager: false, Member: false },
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function StatusIndicator({ status }: { status: Status }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn("inline-block size-2 rounded-full", {
          "bg-green-500": status === "Active",
          "bg-orange-400": status === "Pending",
          "bg-gray-400": status === "Inactive",
        })}
      />
      <span className="text-sm">{status}</span>
      {status === "Pending" && (
        <button className="text-xs text-primary hover:underline font-medium">
          Resend
        </button>
      )}
    </div>
  )
}

function MembersSettings() {
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState<string>("Member")
  const [inviteMessage, setInviteMessage] = React.useState("")
  const [permissionsExpanded, setPermissionsExpanded] = React.useState(false)

  const handleSendInvitation = () => {
    setInviteEmail("")
    setInviteRole("Member")
    setInviteMessage("")
    setInviteOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Team Members</h2>
          <Badge variant="secondary" className="rounded-md">
            {teamMembers.length}
          </Badge>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="size-4" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to add a new member to your team.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="invite-email">
                  <Mail className="size-4" />
                  Email address
                </Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="invite-role">
                  <ShieldCheck className="size-4" />
                  Role
                </Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="invite-message">Message (optional)</Label>
                <Textarea
                  id="invite-message"
                  placeholder="Add a personal note to the invitation..."
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendInvitation}>
                <Mail className="size-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      {/* Members Table */}
      <Card className="bg-card rounded-xl border p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-tight">
                          {member.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "border-transparent",
                        roleBadgeClasses[member.role]
                      )}
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusIndicator status={member.status} />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {member.lastActive}
                    </span>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ShieldCheck className="size-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <X className="size-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Permissions Card */}
      <Card className="bg-card rounded-xl border p-6">
        <button
          onClick={() => setPermissionsExpanded(!permissionsExpanded)}
          className="flex w-full items-center justify-between"
        >
          <CardTitle className="text-base">Role Permissions</CardTitle>
          <ChevronDown
            className={cn(
              "size-5 text-muted-foreground transition-transform duration-200",
              permissionsExpanded && "rotate-180"
            )}
          />
        </button>
        {permissionsExpanded && (
          <div className="mt-6">
            <Separator className="mb-6" />
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Permission</TableHead>
                    <TableHead className="text-center">Owner</TableHead>
                    <TableHead className="text-center">Admin</TableHead>
                    <TableHead className="text-center">Manager</TableHead>
                    <TableHead className="text-center">Member</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((permission) => (
                    <TableRow key={permission}>
                      <TableCell className="text-sm font-medium">
                        {permission}
                      </TableCell>
                      {(["Owner", "Admin", "Manager", "Member"] as Role[]).map(
                        (role) => (
                          <TableCell key={role} className="text-center">
                            {permissionsMatrix[permission][role] ? (
                              <Check className="mx-auto size-4 text-green-600" />
                            ) : (
                              <X className="mx-auto size-4 text-muted-foreground" />
                            )}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export { MembersSettings }
