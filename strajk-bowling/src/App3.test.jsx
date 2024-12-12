import { describe, expect, it } from "vitest";
import App from "./App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("App", () => {
    it("should keep data saved in sessionstorage so booking stays in confirmation when navigating", async () => {
        render(<App />);
    
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-10' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Number of lanes/i), { target: { value: 2 } });
        fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), { target: { value: 4 } });
    
        const addShoeButton = screen.getByRole('button', { name: /\+/ });
        Array.from({ length: 4 }).forEach(() => fireEvent.click(addShoeButton));
    
        const shoeInputs = screen.getAllByRole('textbox');
        await waitFor(() => {
          expect(shoeInputs).toHaveLength(4);
        });
    
        shoeInputs.forEach((input, index) => fireEvent.change(input, { target: { value: (index + 22).toString() } }));
    
        await waitFor(() => {
          shoeInputs.forEach((input, index) => {
            expect(input).toHaveValue((index + 22).toString());
          });
        });
        fireEvent.click(screen.getByText("strIIIIIike!"));
    
        await waitFor(() => {
          expect(screen.getByText("Sweet, let's go!")).toBeInTheDocument();
        });
        await waitFor(() => {
          expect(screen.getByText("680 sek")).toBeInTheDocument();
        });

        const bookingLink = screen.getByText("Booking");
        fireEvent.click(bookingLink);

        await waitFor(() => {
          expect(screen.getByText("strIIIIIike!")).toBeInTheDocument();
        });
        const persistedBookingData = JSON.parse(sessionStorage.getItem("confirmation"));
        expect(persistedBookingData.when).toBe('2024-12-10T18:00');
        expect(persistedBookingData.lanes).toBe("2");
        expect(persistedBookingData.people).toBe("4");
        expect(persistedBookingData.shoes.length).toBe(4);

        const confirmationLink = screen.getByText('Confirmation');
        expect(confirmationLink).toBeInTheDocument()
        fireEvent.click(confirmationLink);

        await waitFor(() => {
          expect(screen.getByText("Sweet, let's go!")).toBeInTheDocument();
        });
        await waitFor(() => {
          expect(screen.getByText("680 sek")).toBeInTheDocument();
        });
        
      });
});