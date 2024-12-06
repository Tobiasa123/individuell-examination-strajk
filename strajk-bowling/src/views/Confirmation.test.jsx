import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Confirmation from "./Confirmation";
import { MemoryRouter } from "react-router-dom";


describe("Confirmation", () => {
    it("should render correctly", () => {
        render(
        <MemoryRouter><Confirmation/></MemoryRouter>)

        expect(screen.getByText("See you soon!")).toBeInTheDocument()
    })
})