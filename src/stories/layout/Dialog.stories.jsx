import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, AlertTriangle, Edit, UserPlus } from "lucide-react";

export default {
  title: "Layout/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal dialog for confirmations, forms, and alerts that require user attention.",
      },
    },
  },
};

export const Simple = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simple Dialog</DialogTitle>
          <DialogDescription>
            This is a basic dialog with a title and description.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmDelete = {
  name: "Real World — Confirm Delete",
  render: () => {
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleDelete = () => {
      setDeleted(true);
      setOpen(false);
    };

    return (
      <div className="text-center">
        {deleted ? (
          <div className="text-sm text-muted-foreground">
            Project deleted.{" "}
            <button
              className="text-primary underline"
              onClick={() => setDeleted(false)}
            >
              Undo
            </button>
          </div>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <DialogTitle>Delete project?</DialogTitle>
                    <DialogDescription className="mt-0.5">
                      "Aspire Design System" will be permanently deleted.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. All project data, including
                components, stories, and settings, will be lost.
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  },
};

export const EditProfile = {
  name: "Real World — Edit Profile Form",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your personal information. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="ep-first">First name</Label>
              <Input id="ep-first" defaultValue="Sarah" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ep-last">Last name</Label>
              <Input id="ep-last" defaultValue="Johnson" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ep-username">Username</Label>
            <Input id="ep-username" defaultValue="@sarahj" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ep-role">Role</Label>
            <Select defaultValue="designer">
              <SelectTrigger id="ep-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="product">Product Manager</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ep-bio">Bio</Label>
            <Textarea
              id="ep-bio"
              defaultValue="Lead Product Designer at Aspire. Passionate about design systems."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const InviteTeamMember = {
  name: "Real World — Invite Team Member",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
          <DialogDescription>
            Send an invitation to join your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="inv-email">Email address</Label>
            <Input
              id="inv-email"
              type="email"
              placeholder="colleague@company.com"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="inv-role">Role</Label>
            <Select defaultValue="viewer">
              <SelectTrigger id="inv-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin — Full access</SelectItem>
                <SelectItem value="editor">Editor — Can edit</SelectItem>
                <SelectItem value="viewer">Viewer — Read only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="inv-msg">Personal message (optional)</Label>
            <Textarea
              id="inv-msg"
              placeholder="Hey, I'd like to invite you to collaborate on…"
              rows={3}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full">Send invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
