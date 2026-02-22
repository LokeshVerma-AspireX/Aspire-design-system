import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const meta = {
  title: "Data/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A carousel with motion and swipe built using Embla Carousel. Supports looping, autoplay, and various item sizes.",
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{i + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const MultipleItems: Story = {
  name: "Multiple Visible Items",
  render: () => (
    <Carousel
      opts={{ align: "start" }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="-ml-2">
        {Array.from({ length: 8 }, (_, i) => (
          <CarouselItem key={i} className="pl-2 basis-1/3">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-2">
                <span className="text-2xl font-semibold">{i + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Testimonials: Story = {
  name: "Real World — Testimonial Carousel",
  render: () => {
    const testimonials = [
      {
        name: "Sarah Johnson",
        role: "Lead Designer",
        initials: "SJ",
        rating: 5,
        text: "The design system has dramatically improved our team's consistency and speed. We ship features 3x faster now.",
      },
      {
        name: "Mike Chen",
        role: "Frontend Engineer",
        initials: "MC",
        rating: 5,
        text: "Finally, a design system that developers actually enjoy using. The TypeScript support is excellent.",
      },
      {
        name: "Emma Wilson",
        role: "Product Manager",
        initials: "EW",
        rating: 5,
        text: "Onboarding new designers is so much easier with a well-documented design system. Highly recommend.",
      },
      {
        name: "Alex Rivera",
        role: "Design Systems Lead",
        initials: "AR",
        rating: 5,
        text: "The accessibility standards are built-in from day one. This is how every design system should work.",
      },
    ];

    return (
      <Carousel opts={{ loop: true }} className="w-80">
        <CarouselContent>
          {testimonials.map(({ name, role, initials, rating, text }) => (
            <CarouselItem key={name}>
              <Card className="mx-1">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }, (_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{text}&rdquo;</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
};

export const ComponentShowcase: Story = {
  name: "Real World — Product Feature Carousel",
  render: () => {
    const features = [
      { title: "Design Tokens", desc: "Consistent colors, spacing, and typography across your entire product.", badge: "Foundation" },
      { title: "Accessibility", desc: "WCAG 2.1 AA compliant components with full keyboard navigation.", badge: "Built-in" },
      { title: "Dark Mode", desc: "Automatic dark mode support with a single CSS class toggle.", badge: "Ready" },
      { title: "TypeScript", desc: "Full type safety with autocomplete for all component props.", badge: "v5" },
    ];

    return (
      <Carousel opts={{ loop: true }} className="w-72">
        <CarouselContent>
          {features.map(({ title, desc, badge }) => (
            <CarouselItem key={title}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-start gap-3 p-6">
                    <Badge variant="secondary">{badge}</Badge>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
};
