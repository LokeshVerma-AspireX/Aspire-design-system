import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Bell, Globe } from "lucide-react";
import type { ElementType } from "react";

const meta = {
  title: "Data/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Collapsible sections. Use 'single' to allow one open at a time, 'multiple' for independent toggle.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Single: Story = {
  name: "Single (one open at a time)",
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="a">
        <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
        <AccordionContent>
          shadcn/ui is a collection of re-usable components built on Radix UI
          and styled with Tailwind CSS. Not a component library — you own the code.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. All components follow WAI-ARIA design patterns and are tested with
          screen readers and keyboard navigation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Can I use it with TypeScript?</AccordionTrigger>
        <AccordionContent>
          Absolutely. Components are available in both JSX and TSX formats.
          Type safety is fully supported.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  name: "Multiple (independent toggle)",
  render: () => (
    <Accordion type="multiple" defaultValue={["a", "c"]} className="w-80">
      <AccordionItem value="a">
        <AccordionTrigger>Section 1 (open by default)</AccordionTrigger>
        <AccordionContent>
          This section starts open. Multiple sections can be open simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Toggle this section independently of others.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Section 3 (open by default)</AccordionTrigger>
        <AccordionContent>
          Both Section 1 and 3 start open because of <code>defaultValue</code>.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  name: "Real World — FAQ Section",
  render: () => {
    const faqs = [
      {
        q: "How do I add components to my project?",
        a: "Run `npx shadcn@latest add [component]` in your project directory. The component files will be added to your `components/ui/` folder, ready for customization.",
      },
      {
        q: "Do I need to install Tailwind CSS?",
        a: "Yes. shadcn/ui components are styled with Tailwind CSS utilities. Make sure Tailwind is configured in your project before adding components.",
      },
      {
        q: "Can I customize the components?",
        a: "Since you own the source code, you can modify components directly. Change colors, sizes, animations — anything. The components are yours.",
      },
      {
        q: "Is there a dark mode?",
        a: "Yes. Components support dark mode via Tailwind's dark variant and CSS custom properties. Use next-themes or a similar library to toggle the theme class.",
      },
      {
        q: "What about TypeScript support?",
        a: "Full TypeScript support is available. Choose between .tsx and .jsx variants when adding components. All props are properly typed.",
      },
    ];
    return (
      <div className="w-[560px]">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <p className="mt-1 text-muted-foreground">
            Everything you need to know about our design system.
          </p>
        </div>
        <Accordion type="single" collapsible>
          {faqs.map(({ q, a }, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-6 rounded-lg border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <span className="font-medium text-foreground cursor-pointer hover:underline">
              Contact support →
            </span>
          </p>
        </div>
      </div>
    );
  },
};

export const SettingsAccordion: Story = {
  name: "Real World — Settings Sections",
  render: () => {
    const sections: Array<{
      id: string;
      icon: ElementType;
      title: string;
      badge: string | null;
      content: Array<{ label: string; enabled: boolean }>;
    }> = [
      {
        id: "security",
        icon: ShieldCheck,
        title: "Security",
        badge: null,
        content: [
          { label: "Two-factor authentication", enabled: true },
          { label: "Login alerts", enabled: true },
          { label: "Session timeout (30 min)", enabled: false },
        ],
      },
      {
        id: "notifications",
        icon: Bell,
        title: "Notifications",
        badge: "3 new",
        content: [
          { label: "Email digests", enabled: true },
          { label: "Push notifications", enabled: false },
          { label: "Browser alerts", enabled: true },
        ],
      },
      {
        id: "privacy",
        icon: Globe,
        title: "Privacy",
        badge: null,
        content: [
          { label: "Public profile", enabled: false },
          { label: "Analytics tracking", enabled: true },
          { label: "Share usage data", enabled: false },
        ],
      },
    ];
    return (
      <div className="w-96">
        <Accordion type="single" collapsible defaultValue="security">
          {sections.map(({ id, icon: Icon, title, badge, content }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {title}
                  {badge && (
                    <Badge variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-1">
                  {content.map(({ label, enabled }) => (
                    <div key={label} className="flex items-center justify-between">
                      <p className="text-sm">{label}</p>
                      <Switch defaultChecked={enabled} />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  },
};
