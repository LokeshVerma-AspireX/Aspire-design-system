import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

const meta = {
  title: "Data/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays content within a chosen aspect ratio. Uses native CSS aspect-ratio under the hood via Radix UI.",
      },
    },
  },
  argTypes: {
    ratio: {
      control: { type: "number", min: 0.1, max: 4, step: 0.1 },
      description: "Width ÷ Height (e.g. 16/9 ≈ 1.78)",
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
  name: "16/9 Widescreen",
  render: () => (
    <div className="w-72">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=600&auto=format&fit=crop"
          alt="Design workspace"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  name: "1/1 Square",
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={1} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=400&auto=format&fit=crop"
          alt="Design workspace"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  name: "3/4 Portrait",
  render: () => (
    <div className="w-40">
      <AspectRatio ratio={3 / 4} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=300&auto=format&fit=crop"
          alt="Design workspace"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const WithPlaceholder: Story = {
  name: "With Placeholder",
  render: () => (
    <div className="w-72">
      <AspectRatio ratio={16 / 9} className="rounded-md border bg-muted/50 flex items-center justify-center">
        <div className="text-center space-y-2 text-muted-foreground">
          <div className="text-2xl font-bold">16:9</div>
          <p className="text-xs">Placeholder content</p>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const VideoCard: Story = {
  name: "Real World — Video Thumbnail",
  render: () => (
    <div className="w-80 space-y-2 rounded-lg overflow-hidden border bg-card">
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=700&auto=format&fit=crop"
            alt="Design tokens tutorial"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
              <Play className="h-5 w-5 ml-0.5" />
            </div>
          </div>
          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">
            12:34
          </Badge>
        </AspectRatio>
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm font-semibold leading-tight">
          Building a Design System from Scratch with Tailwind CSS
        </p>
        <p className="text-xs text-muted-foreground">Aspire Design · 42K views</p>
      </div>
    </div>
  ),
};

export const ImageGrid: Story = {
  name: "Real World — Image Grid",
  render: () => {
    const images = [
      { ratio: 1, label: "Square", w: "w-32" },
      { ratio: 16 / 9, label: "Widescreen", w: "w-48" },
      { ratio: 4 / 3, label: "Standard", w: "w-40" },
      { ratio: 9 / 16, label: "Portrait", w: "w-24" },
    ];

    return (
      <div className="flex flex-wrap gap-4 items-end">
        {images.map(({ ratio, label, w }) => (
          <div key={label} className={`${w} space-y-1`}>
            <AspectRatio ratio={ratio} className="rounded-md bg-muted/50 border" />
            <p className="text-xs text-center text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    );
  },
};
