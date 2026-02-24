import { render, screen } from "@testing-library/react"
import { Card, CardHeader, CardTitle, CardContent } from "./card"
import { describe, it, expect } from "vitest"

describe("Card", () => {
  it("renders without crashing", () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId("card")).toBeInTheDocument()
  })

  it("renders with header and content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    )
    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Body")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<Card data-testid="card" className="custom-class">Content</Card>)
    expect(screen.getByTestId("card")).toHaveClass("custom-class")
  })
})
