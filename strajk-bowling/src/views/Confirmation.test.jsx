import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Confirmation from "./Confirmation";
import { MemoryRouter } from "react-router-dom";


describe("Confirmation", () => {
    it("should render confirmation correctly if no data is provided", () => {
        render(
        <MemoryRouter><Confirmation/></MemoryRouter>)

        expect(screen.getByText("See you soon!")).toBeInTheDocument()
        expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument()
    })

    it("should render confirmation correctly if sessionStorage data is provided", () => {

        const mockConfirmation = {
            when: "2024-12-10T18:00",
            people: 3,
            lanes: 2,
            id: "BLA454SFAS",
            price: 680
        };
        sessionStorage.setItem("confirmation", JSON.stringify(mockConfirmation));

        render(
            <MemoryRouter>
                <Confirmation />
            </MemoryRouter>
        );

        expect(screen.getByText("See you soon!")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2024-12-10 18:00")).toBeInTheDocument();
        expect(screen.getByDisplayValue("3")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2")).toBeInTheDocument();
        expect(screen.getByDisplayValue("BLA454SFAS")).toBeInTheDocument();
        expect(screen.getByText("680 sek")).toBeInTheDocument();

    });
})