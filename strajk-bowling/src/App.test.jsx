import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

//Användaren ska kunna navigera från bokningsvyn till bekräftelsevyn när bokningen är klar.
//Användaren ska kunna slutföra bokningen genom att klicka på en "slutför bokning"-knapp.
//Systemet ska generera ett bokningsnummer och visa detta till användaren efter att bokningen är slutförd.
//Systemet ska beräkna och visa den totala summan för bokningen baserat på antalet spelare (120 kr per person) samt antalet reserverade banor (100 kr per bana).
//Användaren ska kunna ta bort ett tidigare valt fält för skostorlek genom att klicka på en "-"-knapp vid varje spelare.
//Användaren ska kunna ändra skostorlek för varje spelare.
//Användaren ska kunna ange skostorlek för varje spelare.
//Det ska vara möjligt att välja skostorlek för alla spelare som ingår i bokningen.
// ??? Systemet ska visa en översikt där användaren kan kontrollera de valda skostorlekarna för varje spelare innan bokningen slutförs.
//Användaren ska kunna välja ett datum och en tid från ett kalender- och tidvalssystem.
//anvädaren ska kunna ange antal spelare (minst 1 spelare).
//Användaren ska kunna reservera ett eller flera banor beroende på antal spelare.

describe("App", () => {

  it("should show confirmation page with correct details after booking", async () => {
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

    //temp test move somewhere else
    const removeShoeButton = screen.getAllByRole('button', { name: /\-/ })[0];
    fireEvent.click(removeShoeButton);

    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), { target: { value: 3 } });

    await waitFor(() => {
      shoeInputs.forEach((input, index) => {
        expect(input).toHaveValue((index + 22).toString());
      });
    });
    fireEvent.click(screen.getByText("strIIIIIike!"));

    await waitFor(() => {
      expect(screen.getByText("Sweet, let's go!")).toBeInTheDocument();
    });
 
      expect(screen.getByText("See you soon!")).toBeInTheDocument();
      expect(screen.getByText("560 sek")).toBeInTheDocument();
      expect(screen.getByDisplayValue("BLA454SFAS")).toBeInTheDocument();
      expect(screen.getByDisplayValue("2024-12-10 18:00")).toBeInTheDocument();
      expect(screen.getByDisplayValue("3")).toBeInTheDocument();
      expect(screen.getByDisplayValue("2")).toBeInTheDocument();

  });
});
