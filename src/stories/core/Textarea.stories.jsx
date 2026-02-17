import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

export default {
  title: "Core/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-line text input for longer content like messages, descriptions, and bios.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: { type: "number", min: 2, max: 20 } },
  },
};

export const Default = {
  args: { placeholder: "Enter your message…" },
};

export const WithRows = {
  name: "Custom Row Count",
  args: { placeholder: "Tall textarea…", rows: 8 },
};

export const Disabled = {
  args: {
    disabled: true,
    defaultValue: "This field is read-only.",
    rows: 3,
  },
};

export const WithLabel = {
  name: "With Label",
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        placeholder="Tell us a bit about yourself…"
        rows={4}
      />
    </div>
  ),
};

export const WithError = {
  name: "With Validation Error",
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="ta-err" className="text-destructive">
        Description
      </Label>
      <Textarea
        id="ta-err"
        className="border-destructive focus-visible:ring-destructive"
        placeholder="Required field"
        rows={4}
        aria-describedby="ta-err-msg"
      />
      <p id="ta-err-msg" className="text-sm text-destructive">
        Description is required.
      </p>
    </div>
  ),
};

export const WithCharLimit = {
  name: "With Character Counter",
  render: () => {
    const MAX = 280;
    const [value, setValue] = useState("");
    const remaining = MAX - value.length;
    return (
      <div className="grid w-80 gap-1.5">
        <Label htmlFor="tweet">Post</Label>
        <Textarea
          id="tweet"
          placeholder="What's on your mind?"
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={MAX}
          className={remaining < 20 ? "border-amber-400 focus-visible:ring-amber-400" : ""}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{value.length > 0 ? `${value.split(/\s+/).filter(Boolean).length} words` : "Start typing…"}</span>
          <span className={remaining < 20 ? "text-amber-500 font-medium" : ""}>
            {remaining} remaining
          </span>
        </div>
      </div>
    );
  },
};

export const CommentBox = {
  name: "Real World — Comment Box",
  render: () => {
    const [comment, setComment] = useState("");
    return (
      <div className="w-96 space-y-3 rounded-lg border bg-card p-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" alt="You" />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment…"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setComment("")}
                disabled={!comment}
              >
                Cancel
              </Button>
              <Button size="sm" disabled={!comment.trim()}>
                <Send className="mr-2 h-3 w-3" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const FeedbackForm = {
  name: "Real World — Feedback Form",
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h3 className="font-semibold">Send feedback</h3>
        <p className="text-sm text-muted-foreground">
          Help us improve your experience
        </p>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fb-subject">Subject</Label>
        <input
          id="fb-subject"
          className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm"
          placeholder="Brief summary of your feedback"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="fb-body">Message</Label>
        <Textarea
          id="fb-body"
          placeholder="Describe your experience in detail…"
          rows={5}
          className="resize-none"
        />
      </div>
      <Button className="w-full">Submit Feedback</Button>
    </div>
  ),
};
