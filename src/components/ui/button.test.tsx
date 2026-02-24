import { render, screen } from "@testing-library/react"
import { Button } from "./button"
import { describe, it, expect } from "vitest"

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-destructive")
  })

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })
})
