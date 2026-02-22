import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Star,
} from "lucide-react";

const meta = {
  title: "Core/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A two-state button that can be toggled on or off. Built on Radix UI Toggle.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    pressed: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  name: "With Text",
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold" variant="outline">
        <Bold className="h-4 w-4 mr-1.5" />
        Bold
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <Italic className="h-4 w-4 mr-1.5" />
        Italic
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Small">
        <Bold className="h-3.5 w-3.5" />
      </Toggle>
      <Toggle size="default" aria-label="Default">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <Bold className="h-5 w-5" />
      </Toggle>
    </div>
  ),
};

export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Default variant" defaultPressed>
        <Star className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Outline variant" defaultPressed>
        <Star className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

export const TextEditor: Story = {
  name: "Real World — Text Editor Toolbar",
  render: () => {
    const [formatting, setFormatting] = useState<Record<string, boolean>>({
      bold: false,
      italic: false,
      underline: false,
    });
    const [align, setAlign] = useState("left");

    const toggleFormat = (key: string) =>
      setFormatting((f) => ({ ...f, [key]: !f[key] }));

    const alignOptions = [
      { value: "left", icon: AlignLeft },
      { value: "center", icon: AlignCenter },
      { value: "right", icon: AlignRight },
      { value: "justify", icon: AlignJustify },
    ];

    return (
      <div className="w-96 rounded-lg border bg-card overflow-hidden">
        <div className="flex items-center gap-1 border-b px-2 py-1.5">
          {[
            { key: "bold", icon: Bold, label: "Bold" },
            { key: "italic", icon: Italic, label: "Italic" },
            { key: "underline", icon: Underline, label: "Underline" },
          ].map(({ key, icon: Icon, label }) => (
            <Toggle
              key={key}
              size="sm"
              pressed={formatting[key]}
              onPressedChange={() => toggleFormat(key)}
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </Toggle>
          ))}
          <div className="mx-1 h-5 w-px bg-border" />
          {alignOptions.map(({ value, icon: Icon }) => (
            <Toggle
              key={value}
              size="sm"
              pressed={align === value}
              onPressedChange={() => setAlign(value)}
              aria-label={`Align ${value}`}
            >
              <Icon className="h-4 w-4" />
            </Toggle>
          ))}
        </div>
        <div
          className={`p-4 min-h-[80px] text-sm text-muted-foreground ${
            formatting.bold ? "font-bold" : ""
          } ${formatting.italic ? "italic" : ""} ${
            formatting.underline ? "underline" : ""
          } text-${align}`}
        >
          Sample text. Toggle the buttons above to apply formatting.
        </div>
      </div>
    );
  },
};

export const MediaControls: Story = {
  name: "Real World — Media Call Controls",
  render: () => {
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);

    return (
      <div className="flex items-center gap-3 rounded-xl border bg-card px-6 py-4">
        <Toggle
          variant="outline"
          pressed={!micOn}
          onPressedChange={() => setMicOn((v) => !v)}
          aria-label="Toggle microphone"
          className={!micOn ? "border-destructive text-destructive hover:text-destructive" : ""}
        >
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Toggle>
        <Toggle
          variant="outline"
          pressed={!videoOn}
          onPressedChange={() => setVideoOn((v) => !v)}
          aria-label="Toggle camera"
          className={!videoOn ? "border-destructive text-destructive hover:text-destructive" : ""}
        >
          {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Toggle>
        <span className="text-sm text-muted-foreground ml-2">
          {micOn ? "Mic on" : "Muted"} · {videoOn ? "Camera on" : "Camera off"}
        </span>
      </div>
    );
  },
};
