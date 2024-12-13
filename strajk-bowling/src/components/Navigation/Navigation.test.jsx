import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";
import { MemoryRouter, useNavigate } from "react-router-dom";


vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useNavigate: vi.fn(), 
    };
});

describe("Navigation", () => {
  it("should display correct navigation info", () => {

    render(
    <MemoryRouter>
        <Navigation/>
    </MemoryRouter>
    )
    expect(screen.getByText("Booking")).toBeInTheDocument()
    expect(screen.getByText("Confirmation")).toBeInTheDocument()
  });

  it("should toggle navigation correctly", () => {
    render(
    <MemoryRouter>
        <Navigation/>
    </MemoryRouter>
    )
    const bookingLink = screen.getByText("Booking");
    const confirmationLink = screen.getByText("Confirmation");
    expect(bookingLink).toBeInTheDocument();
    expect(confirmationLink).toBeInTheDocument();
    expect(bookingLink).toHaveClass("hide");
    expect(confirmationLink).toHaveClass("hide")

    fireEvent.click(screen.getByRole("img"));

    expect(bookingLink).not.toHaveClass("hide");
    expect(confirmationLink).not.toHaveClass("hide")

    fireEvent.click(screen.getByRole("img"));

    expect(bookingLink).toHaveClass("hide");
    expect(confirmationLink).toHaveClass("hide")
  });
  it("should navigate to the correct paths when links are clicked", () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("img"));

    const bookingLink = screen.getByText("Booking");
    const confirmationLink = screen.getByText("Confirmation");

    fireEvent.click(bookingLink);
    expect(navigate).toHaveBeenCalledWith("/");

    fireEvent.click(confirmationLink);
    expect(navigate).toHaveBeenCalledWith("/confirmation")
  });
});