import { render, screen } from "@testing-library/react"
import { Badge } from "./badge"
import { describe, it, expect } from "vitest"

describe("Badge", () => {
  it("renders without crashing", () => {
    render(<Badge>Status</Badge>)
    expect(screen.getByText("Status")).toBeInTheDocument()
  })

  it("applies variant classes", () => {
    render(<Badge variant="destructive">Error</Badge>)
    expect(screen.getByText("Error")).toHaveClass("bg-destructive")
  })

  it("renders default variant", () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText("Default")).toHaveClass("bg-primary")
  })
})
