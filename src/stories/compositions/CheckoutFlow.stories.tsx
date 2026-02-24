import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userEvent, within, expect } from "storybook/test";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2,
  CreditCard,
  Lock,
  Truck,
  Package,
  ChevronRight,
} from "lucide-react";

// ─── Types & Data ─────────────────────────────────────────────────────────────

const CART_ITEMS = [
  { name: "Design Tokens Pro", desc: "Annual license · 5 seats", price: 299, qty: 1 },
  { name: "Component Library", desc: "One-time purchase", price: 149, qty: 1 },
];

const STEPS = [
  { id: "info", label: "Information" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "confirm", label: "Confirm" },
];

// ─── Step Components ──────────────────────────────────────────────────────────

function StepIndicator({ currentStep }: { currentStep: number }) {
  const pct = Math.round(((currentStep) / (STEPS.length - 1)) * 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        {STEPS.map((s, i) => (
          <span
            key={s.id}
            className={`text-xs font-medium ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}
          >
            {s.label}
          </span>
        ))}
      </div>
      <Progress value={pct} />
    </div>
  );
}

function OrderSummary() {
  const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.08);
  return (
    <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
      <p className="text-sm font-semibold">Order Summary</p>
      {CART_ITEMS.map(({ name, desc, price }) => (
        <div key={name} className="flex justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{name}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
          <span className="text-sm font-medium shrink-0">${price}</span>
        </div>
      ))}
      <Separator />
      <div className="space-y-1 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span><span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Tax (8%)</span><span>${tax}</span>
        </div>
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span><span>${subtotal + tax}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Full Checkout ─────────────────────────────────────────────────────────────

function CheckoutLayout({ startStep = 0 }: { startStep?: number }) {
  const [step, setStep] = useState(startStep);
  const [shipping, setShipping] = useState("standard");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));

  return (
    <div className="w-[560px] rounded-xl border bg-card overflow-hidden">
      <div className="border-b px-6 py-4 flex items-center gap-2">
        <Lock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">Secure Checkout</span>
        <Badge variant="outline" className="ml-auto text-xs gap-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />SSL encrypted
        </Badge>
      </div>

      <div className="p-6 space-y-6">
        <StepIndicator currentStep={step} />

        {/* Step 0 — Contact Info */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-semibold">Contact Information</h2>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-first">First name</Label>
                  <Input id="checkout-first" placeholder="Sarah" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-last">Last name</Label>
                  <Input id="checkout-last" placeholder="Johnson" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkout-email">Email</Label>
                <Input id="checkout-email" type="email" placeholder="sarah@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkout-company">Company (optional)</Label>
                <Input id="checkout-company" placeholder="Aspire Inc." />
              </div>
            </div>
            <OrderSummary />
            <Button className="w-full gap-2" onClick={next}>
              Continue to Shipping <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 1 — Shipping */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold">Shipping Method</h2>
            <RadioGroup value={shipping} onValueChange={setShipping} className="space-y-2">
              {[
                { value: "standard", icon: Package, label: "Standard", desc: "3-5 business days", price: "Free" },
                { value: "express", icon: Truck, label: "Express", desc: "1-2 business days", price: "$9.99" },
              ].map(({ value, icon: Icon, label, desc, price }) => (
                <label
                  key={value}
                  htmlFor={`ship-${value}`}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                    shipping === value ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
                  }`}
                >
                  <RadioGroupItem value={value} id={`ship-${value}`} />
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <span className="text-sm font-semibold">{price}</span>
                </label>
              ))}
            </RadioGroup>
            <OrderSummary />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>Back</Button>
              <Button className="flex-1 gap-2" onClick={next}>
                Continue to Payment <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold">Payment Details</h2>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="card-number">Card number</Label>
                <div className="relative">
                  <Input id="card-number" placeholder="1234 5678 9012 3456" className="pr-10" />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="card-expiry">Expiry</Label>
                  <Input id="card-expiry" placeholder="MM / YY" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="card-cvc">CVC</Label>
                  <Input id="card-cvc" placeholder="•••" />
                </div>
              </div>
            </div>
            <OrderSummary />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1 gap-2" onClick={next}>
                <Lock className="h-4 w-4" />Place Order
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div className="space-y-6 text-center py-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Order Confirmed!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Thank you for your purchase. A receipt has been sent to your email.
              </p>
            </div>
            <Alert className="text-left border-emerald-500/50 bg-emerald-50 text-emerald-800 [&>svg]:text-emerald-600">
              <Package className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Order #ASP-2024-1847 · Estimated delivery: 3-5 business days.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">View order</Button>
              <Button className="flex-1">Continue shopping</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * # CheckoutFlow
 *
 * Multi-step checkout flow demonstrating a real e-commerce purchase experience
 * with contact info, shipping selection, payment, and order confirmation.
 *
 * ## Components Used
 * - `Input` — contact info, card number, expiry, CVC fields
 * - `Label` — form field labels
 * - `Button` — navigation (back/next) and submit actions
 * - `RadioGroup`, `RadioGroupItem` — shipping method selection
 * - `Progress` — step progress indicator bar
 * - `Badge` — SSL encryption indicator
 * - `Alert`, `AlertDescription` — order confirmation notice
 * - `Separator` — order summary dividers
 * - Lucide icons: `CheckCircle2`, `CreditCard`, `Lock`, `Truck`, `Package`, `ChevronRight`
 *
 * ## Data Requirements
 * - `CART_ITEMS` — array of `{ name, desc, price, qty }` for the order summary
 * - `STEPS` — array of `{ id, label }` defining the checkout progression
 * - `startStep` (optional) — zero-indexed step to render initially
 *
 * ## Customization
 * - Number of steps is configurable via the `STEPS` array
 * - Order summary can display any number of line items
 * - Shipping options are configurable (add more carriers, change pricing)
 * - Payment fields can be extended with billing address
 * - Confirmation page can include tracking link, download receipt, etc.
 * - Tax rate is currently hardcoded at 8% but can be made configurable
 *
 * ```tsx
 * // This is an inline composition — not a standalone importable component.
 * // See source for the CheckoutLayout implementation pattern.
 * ```
 */
const meta = {
  title: "7. Patterns/CheckoutFlow",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Step 1: Contact information form with order summary. */
export const Step1ContactInfo: Story = {
  name: "Step 1 — Contact Info",
  render: () => <CheckoutLayout startStep={0} />,
};

/** Step 2: Shipping method selection with standard and express options. */
export const Step2Shipping: Story = {
  name: "Step 2 — Shipping",
  render: () => <CheckoutLayout startStep={1} />,
};

/** Step 3: Payment details form with card number, expiry, and CVC. */
export const Step3Payment: Story = {
  name: "Step 3 — Payment",
  render: () => <CheckoutLayout startStep={2} />,
};

/** Step 4: Order confirmation with success message and order number. */
export const Step4Confirmation: Story = {
  name: "Step 4 — Confirmation",
  render: () => <CheckoutLayout startStep={3} />,
};

/** Full interactive flow using play function to fill forms and advance through all steps. */
export const FullFlow: Story = {
  name: "Full Flow — Interactive (Play)",
  render: () => <CheckoutLayout startStep={0} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill in contact form
    const firstInput = canvas.getByPlaceholderText("Sarah");
    await userEvent.type(firstInput, "Jane", { delay: 40 });

    const emailInput = canvas.getByPlaceholderText("sarah@example.com");
    await userEvent.type(emailInput, "jane@aspire.io", { delay: 40 });

    // Proceed to shipping
    const continueBtn = canvas.getByRole("button", { name: /continue to shipping/i });
    await userEvent.click(continueBtn);

    // Verify shipping step
    await expect(canvas.getByText("Shipping Method")).toBeInTheDocument();

    // Select express shipping
    const expressOption = canvas.getByRole("radio", { name: /express/i });
    await userEvent.click(expressOption);

    // Proceed to payment
    const toPaymentBtn = canvas.getByRole("button", { name: /continue to payment/i });
    await userEvent.click(toPaymentBtn);

    await expect(canvas.getByText("Payment Details")).toBeInTheDocument();

    // Enter card details
    await userEvent.type(canvas.getByPlaceholderText("1234 5678 9012 3456"), "4242 4242 4242 4242", { delay: 30 });
    await userEvent.type(canvas.getByPlaceholderText("MM / YY"), "12/27", { delay: 50 });
    await userEvent.type(canvas.getByPlaceholderText("•••"), "123", { delay: 60 });

    // Place order
    const placeOrderBtn = canvas.getByRole("button", { name: /place order/i });
    await userEvent.click(placeOrderBtn);

    // Verify confirmation
    await expect(canvas.getByText("Order Confirmed!")).toBeInTheDocument();
  },
};
