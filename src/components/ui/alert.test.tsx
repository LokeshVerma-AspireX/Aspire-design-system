import { render, screen } from "@testing-library/react"
import { Alert, AlertTitle, AlertDescription } from "./alert"
import { describe, it, expect } from "vitest"

describe("Alert", () => {
  it("renders without crashing", () => {
    render(<Alert>Alert content</Alert>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders with title and description", () => {
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something happened</AlertDescription>
      </Alert>
    )
    expect(screen.getByText("Warning")).toBeInTheDocument()
    expect(screen.getByText("Something happened")).toBeInTheDocument()
  })

  it("applies destructive variant", () => {
    render(<Alert variant="destructive">Error</Alert>)
    expect(screen.getByRole("alert")).toHaveClass("text-destructive")
  })
})
