export type Platform = "instagram" | "tiktok" | "youtube"

export type SocialPlatform = Platform | "pinterest" | "twitter"

export const PLATFORM_COLOR: Record<Platform, string> = {
  instagram: "bg-fuchsia-500 text-white",
  tiktok:    "bg-cyan-500 text-white",
  youtube:   "bg-red-500 text-white",
}

export const PLATFORM_TEXT_COLOR: Record<Platform, string> = {
  instagram: "text-fuchsia-500",
  tiktok:    "text-cyan-500",
  youtube:   "text-red-500",
}

export const PLATFORM_ICONS: Record<SocialPlatform, { label: string; bg: string; text: string }> = {
  instagram: { label: "IG",  bg: "bg-gradient-to-br from-pink-500 to-purple-600", text: "text-white" },
  tiktok:    { label: "TT",  bg: "bg-black",   text: "text-white" },
  youtube:   { label: "YT",  bg: "bg-red-600",  text: "text-white" },
  pinterest: { label: "PIN", bg: "bg-red-500",  text: "text-white" },
  twitter:   { label: "X",   bg: "bg-foreground", text: "text-background" },
}
