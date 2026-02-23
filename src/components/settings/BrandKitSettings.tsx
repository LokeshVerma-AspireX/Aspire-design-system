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
import {
  Palette,
  Upload,
  Image,
  Type,
  MessageCircle,
  Check,
  Sun,
  Moon,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BrandColor {
  label: string
  hex: string
}

type FontFamily = "Inter" | "Plus Jakarta Sans" | "DM Sans"
type VoiceTone = "professional" | "friendly" | "casual"

const voiceMeta: Record<
  VoiceTone,
  { title: string; description: string; sample: string }
> = {
  professional: {
    title: "Professional",
    description: "Clear, authoritative, data-driven communication",
    sample:
      "Dear prospective partner, I wanted to share a brief overview of our latest performance metrics and explore how a strategic collaboration could drive measurable results for both parties.",
  },
  friendly: {
    title: "Friendly",
    description: "Warm, approachable, collaborative tone",
    sample:
      "Hi there! I came across your brand and really love what you're doing. I think we'd make a great team — would you be open to chatting about a fun collab?",
  },
  casual: {
    title: "Casual",
    description: "Relaxed, fun, emoji-friendly messaging",
    sample:
      "Hey! Big fan of your content — it totally vibes with our brand. We'd love to team up on something cool. Let me know if you're down!",
  },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function BrandKitSettings() {
  /* ---- state ---- */
  const [colors, setColors] = React.useState<BrandColor[]>([
    { label: "Primary", hex: "#e3f1bb" },
    { label: "Secondary", hex: "#1a1a2e" },
    { label: "Accent", hex: "#6366f1" },
  ])

  const [selectedFont, setSelectedFont] =
    React.useState<FontFamily>("Inter")

  const [selectedVoice, setSelectedVoice] =
    React.useState<VoiceTone>("professional")

  /* ---- helpers ---- */
  const handleColorChange = (index: number, hex: string) => {
    setColors((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], hex }
      return next
    })
  }

  /* ---- font‑family CSS values ---- */
  const fontFamilyCSS: Record<FontFamily, string> = {
    Inter: "'Inter', sans-serif",
    "Plus Jakarta Sans": "'Plus Jakarta Sans', sans-serif",
    "DM Sans": "'DM Sans', sans-serif",
  }

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <div className="flex flex-col gap-6">
      {/* ---------------------------------------------------------- */}
      {/*  1. Brand Logo                                              */}
      {/* ---------------------------------------------------------- */}
      <Card className="bg-card rounded-xl border p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Image className="size-5 text-muted-foreground" />
            Brand Logo
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-6">
          {/* light / dark previews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* light preview */}
            <div className="relative rounded-lg border bg-white p-6 flex flex-col items-center justify-center gap-3">
              <Sun className="absolute top-3 right-3 size-4 text-muted-foreground/50" />
              <div className="flex size-28 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <Upload className="size-6" />
                  <span className="text-xs font-medium">Upload Logo</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                Light Background
              </span>
            </div>

            {/* dark preview */}
            <div className="relative rounded-lg border bg-zinc-900 p-6 flex flex-col items-center justify-center gap-3">
              <Moon className="absolute top-3 right-3 size-4 text-zinc-500" />
              <div className="flex size-28 items-center justify-center rounded-lg border-2 border-dashed border-zinc-600">
                <div className="flex flex-col items-center gap-1 text-zinc-400">
                  <Upload className="size-6" />
                  <span className="text-xs font-medium">Upload Logo</span>
                </div>
              </div>
              <span className="text-xs text-zinc-500">Dark Background</span>
            </div>
          </div>

          <Separator />

          {/* logo variants */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Logo Variants
            </Label>

            <div className="grid grid-cols-3 gap-3">
              {["Full Logo", "Icon Only", "Wordmark"].map((variant) => (
                <div
                  key={variant}
                  className="flex flex-col items-center gap-2 rounded-lg border bg-muted/40 p-4"
                >
                  <div className="flex size-14 items-center justify-center rounded-md border border-dashed border-muted-foreground/30">
                    <Upload className="size-4 text-muted-foreground/60" />
                  </div>
                  <span className="text-xs font-medium">{variant}</span>
                  <Button variant="outline" size="xs">
                    Upload
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full sm:w-auto">
            <Upload className="size-4" />
            Replace Logo
          </Button>
        </CardContent>
      </Card>

      {/* ---------------------------------------------------------- */}
      {/*  2. Brand Colors                                            */}
      {/* ---------------------------------------------------------- */}
      <Card className="bg-card rounded-xl border p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Palette className="size-5 text-muted-foreground" />
            Brand Colors
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-6">
          {/* swatches */}
          <div className="grid grid-cols-3 gap-6">
            {colors.map((color, idx) => (
              <div
                key={color.label}
                className="flex flex-col items-center gap-2"
              >
                <button
                  type="button"
                  className="group relative size-16 rounded-full border shadow-sm transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none"
                  style={{ backgroundColor: color.hex }}
                  title={`Edit ${color.label}`}
                >
                  <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 group-hover:bg-black/10 transition-colors">
                    <Palette className="size-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                  </span>
                </button>

                <Input
                  value={color.hex}
                  onChange={(e) => handleColorChange(idx, e.target.value)}
                  className="h-7 w-24 text-center text-xs font-mono"
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {color.label}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          {/* live preview */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Live Preview
            </Label>

            <div className="rounded-lg border bg-muted/30 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-lg"
                  style={{ backgroundColor: colors[0].hex }}
                />
                <div className="space-y-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: colors[1].hex }}
                  >
                    Campaign Performance
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days overview
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="text-xs"
                  style={{
                    backgroundColor: colors[2].hex,
                    color: "#ffffff",
                  }}
                >
                  View Report
                </Button>
                <Badge
                  className="text-[10px]"
                  style={{
                    backgroundColor: colors[0].hex,
                    color: colors[1].hex,
                  }}
                >
                  +24% growth
                </Badge>
              </div>

              <p className="text-xs" style={{ color: colors[1].hex }}>
                Your influencer outreach is trending upward with a{" "}
                <span
                  className="font-semibold"
                  style={{ color: colors[2].hex }}
                >
                  24% increase
                </span>{" "}
                in engagement this month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---------------------------------------------------------- */}
      {/*  3. Typography                                              */}
      {/* ---------------------------------------------------------- */}
      <Card className="bg-card rounded-xl border p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Type className="size-5 text-muted-foreground" />
            Typography
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-6">
          {/* font selector */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Font Family
            </Label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                ["Inter", "Plus Jakarta Sans", "DM Sans"] as FontFamily[]
              ).map((font) => {
                const isSelected = selectedFont === font
                return (
                  <button
                    key={font}
                    type="button"
                    onClick={() => setSelectedFont(font)}
                    className={cn(
                      "relative flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/30 hover:bg-muted/40"
                    )}
                  >
                    {isSelected && (
                      <Check className="absolute top-3 right-3 size-4 text-primary" />
                    )}
                    <span
                      className="text-base font-semibold"
                      style={{ fontFamily: fontFamilyCSS[font] }}
                    >
                      {font}
                    </span>
                    <span
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: fontFamilyCSS[font] }}
                    >
                      The quick brown fox jumps
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* type scale */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Type Scale Preview
            </Label>

            <div
              className="space-y-4 rounded-lg border bg-muted/30 p-5"
              style={{ fontFamily: fontFamilyCSS[selectedFont] }}
            >
              {(
                [
                  {
                    label: "H1",
                    className: "text-3xl font-bold",
                  },
                  {
                    label: "H2",
                    className: "text-2xl font-semibold",
                  },
                  {
                    label: "H3",
                    className: "text-xl font-semibold",
                  },
                  {
                    label: "Body",
                    className: "text-base",
                  },
                  {
                    label: "Caption",
                    className: "text-xs text-muted-foreground",
                  },
                ] as const
              ).map(({ label, className }) => (
                <div key={label} className="flex items-baseline gap-4">
                  <span className="w-16 shrink-0 text-xs font-mono text-muted-foreground">
                    {label}
                  </span>
                  <span className={className}>
                    Brand Kit Typography Preview
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---------------------------------------------------------- */}
      {/*  4. Brand Voice                                             */}
      {/* ---------------------------------------------------------- */}
      <Card className="bg-card rounded-xl border p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="size-5 text-muted-foreground" />
            Brand Voice
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-6">
          {/* tone selector */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Tone of Voice
            </Label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                ["professional", "friendly", "casual"] as VoiceTone[]
              ).map((tone) => {
                const meta = voiceMeta[tone]
                const isSelected = selectedVoice === tone
                return (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setSelectedVoice(tone)}
                    className={cn(
                      "relative flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/30 hover:bg-muted/40"
                    )}
                  >
                    {isSelected && (
                      <Check className="absolute top-3 right-3 size-4 text-primary" />
                    )}
                    <span className="text-sm font-semibold">
                      {meta.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {meta.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* sample outreach */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Sample Outreach
            </Label>

            <div className="rounded-lg border bg-muted/30 p-5">
              <p className="text-sm leading-relaxed text-foreground/90">
                {voiceMeta[selectedVoice].sample}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { BrandKitSettings }
