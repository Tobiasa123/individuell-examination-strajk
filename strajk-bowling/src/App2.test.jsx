import { describe, expect, it } from "vitest";
import App from "./App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("App", () => {
    it("should display 'Inga bokning gjord!' when navigating to confirmation without having a booking",  async () => {
        render(<App/>);
        const confirmationLink = screen.getByText('Confirmation');

        expect(confirmationLink).toBeInTheDocument()
        fireEvent.click(confirmationLink);

        await waitFor(() =>{
            expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument()
        })
    });
});