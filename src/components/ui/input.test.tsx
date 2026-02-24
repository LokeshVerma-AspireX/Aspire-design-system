import { render, screen } from "@testing-library/react"
import { Input } from "./input"
import { describe, it, expect } from "vitest"

describe("Input", () => {
  it("renders without crashing", () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("accepts type prop", () => {
    render(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email")
  })

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled()
  })
})
