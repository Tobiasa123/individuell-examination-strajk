import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Shoes from "./Shoes";

describe("Shoes", () => {
  it("should call updatesize to change shoe size for players", () => {
    const mockUpdateSize = vi.fn();
    const mockAddShoe = vi.fn();
    const mockRemoveShoe = vi.fn();

    const shoes = [
      { id: "1", size: "10" },
      { id: "2", size: "50" },
    ];

    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={shoes}
      />
    );

    const shoeInputs = screen.getAllByRole("textbox");
    expect(shoeInputs).toHaveLength(2);

    fireEvent.change(shoeInputs[0], { target: { value: "42" } });
    expect(mockUpdateSize).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "1", 
          value: "42", 
        }),
      })
    );
    fireEvent.change(shoeInputs[1], { target: { value: "38" } });
    expect(mockUpdateSize).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "2", 
          value: "38",
        }),
      })
    );
  });

  it("should allow clicking + and - buttons and call correct functions", async () => {
    const mockUpdateSize = vi.fn();
    const mockAddShoe = vi.fn();
    const mockRemoveShoe = vi.fn();

    const shoes = [{ id: "1", size: "30" }];

    render(
      <Shoes
        updateSize={mockUpdateSize}
        addShoe={mockAddShoe}
        removeShoe={mockRemoveShoe}
        shoes={shoes}
      />
    );

    expect(screen.getByText("+")).toBeInTheDocument()
  
    const addBtn = screen.getByText("+")
    fireEvent.click(addBtn);
    expect(mockAddShoe).toHaveBeenCalled();

    

    expect(screen.getByText("-")).toBeInTheDocument()
    const deleteBtn = screen.getByText("-")
    fireEvent.click(deleteBtn);
    expect(mockRemoveShoe).toHaveBeenCalledWith("1");

  });
});