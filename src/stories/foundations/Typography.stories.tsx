import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
} from "@/components/typography"

const meta: Meta = {
  title: "2. Foundations/Typography",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}
export default meta

export const Scale: StoryObj = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <H1>The quick brown fox jumps</H1>
      <H2>Over the lazy dog</H2>
      <H3>Pack my box with five</H3>
      <H4>Dozen liquor jugs</H4>
      <Lead>
        A lead paragraph introduces a section with slightly larger, lighter
        text.
      </Lead>
      <P>
        Regular body text. The main font for reading content across the
        application.
      </P>
      <Large>Large text for emphasis without a heading.</Large>
      <Small>
        Small text for captions, labels, and secondary information.
      </Small>
      <Muted>
        Muted text for placeholder copy, helper text, and metadata.
      </Muted>
      <P>
        Inline code: <InlineCode>npm run storybook</InlineCode>
      </P>
    </div>
  ),
}

export const Hierarchy: StoryObj = {
  render: () => (
    <div className="space-y-3 max-w-xl">
      <H2>Campaign Summary</H2>
      <Lead>
        An overview of your campaign performance for the selected period.
      </Lead>
      <P>
        Total reach across all creator posts increased by 34% compared to the
        previous quarter. Engagement rate held steady at 4.2%, above the
        industry average of 2.8%.
      </P>
      <H3>Top Performing Creators</H3>
      <P>
        The following creators exceeded their deliverable targets by more than
        20%.
      </P>
      <Small>
        Last updated 23 Feb 2026 · Data refreshes every 6 hours
      </Small>
    </div>
  ),
}
