import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Upload,
  RotateCcw,
  Pause,
  Play,
  User,
  Image,
  FileText,
  CreditCard,
  Lock,
} from "lucide-react";
import type { ElementType } from "react";

const meta = {
  title: "Data/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Linear progress bar for showing completion status of tasks, uploads, or multi-step flows.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 60, className: "w-80" },
};

export const AllValues: Story = {
  name: "All Values",
  render: () => (
    <div className="w-80 space-y-4">
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{v === 0 ? "Not started" : v === 100 ? "Complete" : "In progress"}</span>
            <span className={v === 100 ? "text-emerald-500 font-medium" : ""}>{v}%</span>
          </div>
          <Progress
            value={v}
            className={v === 100 ? "[&>div]:bg-emerald-500" : ""}
          />
        </div>
      ))}
    </div>
  ),
};

export const Animated: Story = {
  name: "Animated (Auto-increment)",
  render: () => {
    const [progress, setProgress] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
      if (!running) return;
      if (progress >= 100) {
        setRunning(false);
        return;
      }
      const t = setTimeout(
        () => setProgress((p) => Math.min(p + Math.random() * 12, 100)),
        200
      );
      return () => clearTimeout(t);
    }, [running, progress]);

    const reset = () => {
      setProgress(0);
      setRunning(false);
    };

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {progress >= 100 ? "Complete!" : running ? "Processing…" : "Ready"}
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            className={progress >= 100 ? "[&>div]:bg-emerald-500" : ""}
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setRunning((r) => !r)}
            disabled={progress >= 100}
            className="flex-1"
          >
            {running ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {progress === 0 ? "Start" : "Resume"}
              </>
            )}
          </Button>
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
};

export const ProfileCompletion: Story = {
  name: "Real World — Profile Completion",
  render: () => {
    const steps: Array<{ icon: ElementType; label: string; done: boolean }> = [
      { icon: User, label: "Basic info", done: true },
      { icon: Image, label: "Profile photo", done: true },
      { icon: FileText, label: "Bio", done: true },
      { icon: CreditCard, label: "Payment method", done: false },
      { icon: Lock, label: "Enable 2FA", done: false },
    ];
    const completed = steps.filter((s) => s.done).length;
    const pct = Math.round((completed / steps.length) * 100);

    return (
      <div className="w-80 rounded-lg border bg-card p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Profile setup</p>
            <Badge
              variant="secondary"
              className={pct === 100 ? "bg-emerald-100 text-emerald-700" : ""}
            >
              {completed}/{steps.length} done
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Complete your profile to unlock all features
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span>{pct}% complete</span>
            {pct === 100 && (
              <span className="text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                All done!
              </span>
            )}
          </div>
          <Progress value={pct} className={pct === 100 ? "[&>div]:bg-emerald-500" : ""} />
        </div>
        <ul className="space-y-2">
          {steps.map(({ icon: Icon, label, done }) => (
            <li key={label} className="flex items-center gap-2.5 text-sm">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  done
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Icon className="h-3.5 w-3.5" />
                )}
              </div>
              <span className={done ? "line-through text-muted-foreground" : ""}>
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};

export const UploadProgress: Story = {
  name: "Real World — File Upload",
  render: () => {
    const files = [
      { name: "design-tokens.json", size: "12 KB", progress: 100, done: true },
      { name: "icon-set.svg", size: "340 KB", progress: 68, done: false },
      { name: "brand-guidelines.pdf", size: "2.4 MB", progress: 24, done: false },
    ];
    return (
      <div className="w-80 rounded-lg border bg-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Uploading files</p>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Cancel all
          </Button>
        </div>
        {files.map(({ name, size, progress, done }) => (
          <div key={name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <Upload className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <p className="text-sm truncate">{name}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 ml-2">
                {done ? size : `${progress}%`}
              </span>
            </div>
            <Progress
              value={progress}
              className={`h-1.5 ${done ? "[&>div]:bg-emerald-500" : ""}`}
            />
          </div>
        ))}
      </div>
    );
  },
};
