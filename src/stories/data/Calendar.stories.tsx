import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import type { DateRange } from "react-day-picker";

const meta = {
  title: "Data/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date picker built on react-day-picker. Supports single, multiple, and range selection modes.",
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  name: "Single Date",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="space-y-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {date && (
          <p className="text-center text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString("en-US", { dateStyle: "long" })}
          </p>
        )}
      </div>
    );
  },
};

export const Range: Story = {
  name: "Date Range",
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return (
      <div className="space-y-3">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          className="rounded-md border"
        />
        {range?.from && range?.to && (
          <p className="text-center text-sm text-muted-foreground">
            {range.from.toLocaleDateString()} → {range.to.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  name: "Disabled Dates",
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: today }}
        className="rounded-md border"
      />
    );
  },
};

export const DatePicker: Story = {
  name: "Real World — Date Picker Popover",
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const [open, setOpen] = useState(false);

    return (
      <div className="w-72 space-y-3 rounded-lg border bg-card p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Schedule a meeting</p>
          <p className="text-xs text-muted-foreground">Pick a date for your demo call.</p>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              {date ? (
                date.toLocaleDateString("en-US", { dateStyle: "medium" })
              ) : (
                <span className="text-muted-foreground">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setOpen(false);
              }}
              disabled={{ before: new Date() }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {date && (
          <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
            <span className="text-xs text-muted-foreground">Selected date</span>
            <Badge variant="secondary" className="text-xs">
              {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </Badge>
          </div>
        )}
      </div>
    );
  },
};
