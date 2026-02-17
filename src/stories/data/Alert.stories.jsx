import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  Info as InfoIcon,
  AlertTriangle,
  Terminal,
  X,
  Wifi,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

export default {
  title: "Data/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Banner-style notification with icon, title, and description. Use for inline page messages.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export const Default = {
  render: () => (
    <Alert className="w-96">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const Success = {
  render: () => (
    <Alert className="w-96 border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400 [&>svg]:text-emerald-600">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning = {
  render: () => (
    <Alert className="w-96 border-amber-500/50 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-400 [&>svg]:text-amber-600">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your subscription will expire in 3 days. Renew now to avoid interruption.
      </AlertDescription>
    </Alert>
  ),
};

export const Info = {
  render: () => (
    <Alert className="w-96 border-blue-500/50 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-blue-400 [&>svg]:text-blue-600">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>New feature available</AlertTitle>
      <AlertDescription>
        Dark mode is now available. Toggle it in Settings → Appearance.
      </AlertDescription>
    </Alert>
  ),
};

export const Dismissible = {
  name: "Dismissible Alert",
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div className="w-96">
        {visible ? (
          <Alert className="border-blue-500/50 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-blue-400 [&>svg]:text-blue-600">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle className="flex items-start justify-between">
              Update available
              <button
                onClick={() => setVisible(false)}
                className="ml-4 shrink-0 text-blue-600 hover:text-blue-800"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </AlertTitle>
            <AlertDescription>
              Storybook 10.3 is available. Run{" "}
              <code className="rounded bg-blue-100 px-1 text-xs">
                npx storybook@latest upgrade
              </code>{" "}
              to update.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            Alert dismissed.{" "}
            <button
              className="ml-1 text-primary underline"
              onClick={() => setVisible(true)}
            >
              Show again
            </button>
          </div>
        )}
      </div>
    );
  },
};

export const FormValidation = {
  name: "Real World — Form Validation Errors",
  render: () => (
    <div className="w-96 space-y-4 rounded-lg border bg-card p-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Fix the following errors</AlertTitle>
        <AlertDescription>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
            <li>Email address is not valid</li>
            <li>Password must be at least 8 characters</li>
            <li>Terms of service must be accepted</li>
          </ul>
        </AlertDescription>
      </Alert>
      <div className="space-y-2">
        <div className="h-9 rounded-md border border-destructive bg-background px-3 flex items-center">
          <span className="text-sm text-muted-foreground">invalid-email</span>
        </div>
        <div className="h-9 rounded-md border border-destructive bg-background px-3 flex items-center">
          <span className="text-sm text-muted-foreground">•••••</span>
        </div>
      </div>
      <Button className="w-full">Try Again</Button>
    </div>
  ),
};

export const SystemAlerts = {
  name: "Real World — System Status Alerts",
  render: () => (
    <div className="w-[520px] space-y-3">
      <Alert className="border-amber-500/50 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-400 [&>svg]:text-amber-600">
        <Wifi className="h-4 w-4" />
        <AlertTitle>Degraded performance</AlertTitle>
        <AlertDescription>
          We're experiencing increased latency in the EU region. Our team is
          investigating.{" "}
          <span className="cursor-pointer font-medium underline">
            Check status page
          </span>
        </AlertDescription>
      </Alert>
      <Alert className="border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400 [&>svg]:text-emerald-600">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>All systems operational</AlertTitle>
        <AlertDescription>
          API, dashboard, and webhooks are running normally.
        </AlertDescription>
      </Alert>
      <Alert className="border-blue-500/50 bg-blue-50 text-blue-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-blue-400 [&>svg]:text-blue-600">
        <CreditCard className="h-4 w-4" />
        <AlertTitle>Payment method expiring soon</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>Your Visa ending in 4242 expires this month.</span>
          <Button size="sm" variant="outline" className="ml-3 shrink-0 h-7 text-blue-800 border-blue-300">
            Update
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  ),
};
