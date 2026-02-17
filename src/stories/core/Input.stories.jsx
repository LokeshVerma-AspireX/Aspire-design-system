import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Eye, EyeOff, Mail, User, Lock } from "lucide-react";

export default {
  title: "Core/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Flexible input field supporting all HTML input types with accessible label pairing.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export const Default = {
  args: { placeholder: "Enter text…", type: "text" },
};

export const Email = {
  args: { type: "email", placeholder: "you@example.com" },
};

export const Password = {
  args: { type: "password", placeholder: "••••••••" },
};

export const Disabled = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    defaultValue: "Cannot edit this",
  },
};

export const WithLabel = {
  name: "With Label",
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="email-label">Email address</Label>
      <Input id="email-label" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const WithError = {
  name: "With Validation Error",
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="username-err" className="text-destructive">
        Username
      </Label>
      <Input
        id="username-err"
        placeholder="Username"
        className="border-destructive focus-visible:ring-destructive"
        defaultValue="ab"
        aria-describedby="username-hint"
      />
      <p id="username-hint" className="text-sm text-destructive">
        Username must be at least 3 characters.
      </p>
    </div>
  ),
};

export const SearchBar = {
  name: "Search Bar",
  render: () => (
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="pl-9" placeholder="Search components…" type="search" />
    </div>
  ),
};

export const PasswordToggle = {
  name: "Password with Visibility Toggle",
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div className="relative w-72">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type={show ? "text" : "password"}
          placeholder="Enter password"
          className="pl-9 pr-10"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  },
};

export const LoginForm = {
  name: "Real World — Login Form",
  render: () => (
    <div className="w-80 space-y-4 rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Sign in</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to continue
        </p>
      </div>
      <div className="space-y-3">
        <div className="grid gap-1.5">
          <Label htmlFor="lf-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lf-email"
              type="email"
              placeholder="you@example.com"
              className="pl-9"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="lf-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lf-password"
              type="password"
              placeholder="••••••••"
              className="pl-9"
            />
          </div>
        </div>
        <Button className="w-full">Sign in</Button>
      </div>
    </div>
  ),
};

export const ProfileForm = {
  name: "Real World — Profile Fields",
  render: () => (
    <div className="w-80 space-y-3">
      <div className="grid gap-1.5">
        <Label htmlFor="pf-name">Full name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="pf-name"
            placeholder="John Doe"
            defaultValue="Sarah Johnson"
            className="pl-9"
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="pf-email">Email</Label>
        <Input
          id="pf-email"
          type="email"
          defaultValue="sarah@example.com"
          disabled
        />
        <p className="text-xs text-muted-foreground">
          Email cannot be changed
        </p>
      </div>
    </div>
  ),
};
