import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect, fn } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, Github, Loader2 } from "lucide-react";

// ─── Shared Sign-In Form ──────────────────────────────────────────────────────

function SignInForm({
  onSubmit,
  error,
  loading,
}: {
  onSubmit?: (email: string, password: string) => void;
  error?: string;
  loading?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  return (
    <div className="w-80 rounded-xl border bg-card p-6 shadow-sm space-y-5">
      <div className="text-center space-y-1">
        <div className="mx-auto h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">A</div>
        <h1 className="text-xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your account</p>
      </div>

      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="signin-email">Email</Label>
          <Input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password">Password</Label>
            <button type="button" className="text-xs text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="signin-password"
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
            Remember me for 30 days
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in…</>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
          or
        </span>
      </div>

      <Button variant="outline" className="w-full gap-2">
        <Github className="h-4 w-4" />
        Continue with GitHub
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <span className="text-primary cursor-pointer hover:underline">Sign up free</span>
      </p>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Compositions/Auth Pages",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Full-page auth flows combining multiple components: Input, Button, Label, Checkbox, Alert, Separator. Includes form validation and loading states.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const SignIn: Story = {
  name: "Sign In — Default",
  render: () => <SignInForm />,
};

export const SignInWithError: Story = {
  name: "Sign In — Validation Error",
  render: () => (
    <SignInForm error="Invalid email or password. Please try again." />
  ),
};

export const SignInLoading: Story = {
  name: "Sign In — Loading State",
  render: () => <SignInForm loading />,
};

export const SignInInteractive: Story = {
  name: "Sign In — Interactive (Play)",
  render: () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (email: string, password: string) => {
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }
      if (password.length < 8) {
        setError("Invalid email or password. Please try again.");
        return;
      }
      setError("");
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return <SignInForm onSubmit={handleSubmit} loading={loading} error={error} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type email
    const emailInput = canvas.getByPlaceholderText("you@example.com");
    await userEvent.type(emailInput, "test@aspire.io", { delay: 50 });

    // Type short password to trigger error
    const passwordInput = canvas.getByPlaceholderText("Enter your password");
    await userEvent.type(passwordInput, "short", { delay: 50 });

    // Submit
    const submitBtn = canvas.getByRole("button", { name: /sign in/i });
    await userEvent.click(submitBtn);

    // Verify error appeared
    await expect(canvas.getByRole("alert")).toBeInTheDocument();

    // Fix password
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "validpassword123", { delay: 40 });
    await userEvent.click(submitBtn);
  },
};

export const SignUp: Story = {
  name: "Sign Up — Registration Form",
  render: () => (
    <div className="w-80 rounded-xl border bg-card p-6 shadow-sm space-y-5">
      <div className="text-center space-y-1">
        <div className="mx-auto h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">A</div>
        <h1 className="text-xl font-bold">Create an account</h1>
        <p className="text-sm text-muted-foreground">Start your free 14-day trial</p>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="Sarah" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Johnson" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signup-email">Work email</Label>
          <Input id="signup-email" type="email" placeholder="you@company.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signup-password">Password</Label>
          <Input id="signup-password" type="password" placeholder="Min. 8 characters" />
          <div className="flex gap-1">
            {["bg-destructive", "bg-amber-400", "bg-emerald-500", "bg-muted"].map((c, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${c}`} />
            ))}
          </div>
          <p className="text-[10px] text-amber-600">Password strength: Fair</p>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox id="tos" className="mt-0.5" />
          <Label htmlFor="tos" className="text-xs font-normal cursor-pointer leading-relaxed">
            I agree to the{" "}
            <span className="text-primary hover:underline">Terms of Service</span> and{" "}
            <span className="text-primary hover:underline">Privacy Policy</span>
          </Label>
        </div>
        <Button className="w-full">Create account</Button>
      </div>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">or</span>
      </div>

      <Button variant="outline" className="w-full gap-2">
        <Github className="h-4 w-4" />
        Sign up with GitHub
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <span className="text-primary cursor-pointer hover:underline">Sign in</span>
      </p>
    </div>
  ),
};
