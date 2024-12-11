import { describe, expect, it, vi } from "vitest";
import Booking from "./Booking";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

//VG - Ifall användaren inte fyller i något av ovanstående så ska ett felmeddelande visas
//VG - Om det inte finns tillräckligt med lediga banor för det angivna antalet spelare, ska användaren få ett felmeddelande.
//VG - Om användaren försöker slutföra bokningen utan att ange skostorlek för en spelare som har valt att boka skor, ska systemet visa ett felmeddelande och be om att skostorleken anges.
//VG - Om antalet personer och skor inte matchas ska ett felmeddelande visas

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useNavigate: vi.fn(), 
    };
  });
  
describe("Booking", () => {

    it("should display error message if no fields are filled", async () => {
        render(<Booking />);
        
        fireEvent.click(screen.getByText("strIIIIIike!"));

        await waitFor(() =>{
          expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeInTheDocument()
        })
    })

    it("should display error message if users are above the limit for lanes selected (4 per lane)", async () => {
        render(<Booking/>);

        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-10' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Number of lanes/i), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), { target: { value: 5 } });
    
        const addShoeButton = screen.getByRole('button', { name: /\+/ });
        Array.from({ length: 5 }).forEach(() => fireEvent.click(addShoeButton));
        
    
        const shoeInputs = screen.getAllByRole('textbox');
        await waitFor(() => {
            expect(shoeInputs).toHaveLength(5);
          });

        shoeInputs.forEach((input, index) => fireEvent.change(input, { target: { value: (index + 22).toString() } }));

        await waitFor(() => {
            shoeInputs.forEach((input, index) => {
              expect(input).toHaveValue((index + 22).toString());
            });
          });
        
        fireEvent.click(screen.getByText("strIIIIIike!"));

        await waitFor(() =>{
          expect(screen.getByText("Det får max vara 4 spelare per bana")).toBeInTheDocument()
        })
    })

    it("should display error message if number of people and shoes amount dont match", async () => {

        render(<Booking/>);

        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-10' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Number of lanes/i), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), { target: { value: 4 } });
    
        const addShoeButton = screen.getByRole('button', { name: /\+/ });
        Array.from({ length: 3 }).forEach(() => fireEvent.click(addShoeButton));
        
    
        const shoeInputs = screen.getAllByRole('textbox');
        await waitFor(() => {
            expect(shoeInputs).toHaveLength(3);
          });

          shoeInputs.forEach((input, index) => fireEvent.change(input, { target: { value: (index + 22).toString() } }));

        await waitFor(() => {
            shoeInputs.forEach((input, index) => {
              expect(input).toHaveValue((index + 22).toString());
            });
          });
        
        fireEvent.click(screen.getByText("strIIIIIike!"));

        await waitFor(() =>{
          expect(screen.getByText("Antalet skor måste stämma överens med antal spelare")).toBeInTheDocument()
        })
    })
    it("should display error message if shoe sizes arent specified for people", async () => {

        render(<Booking/>);
        
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-10' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Number of lanes/i), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), { target: { value: 4 } });
    
        const addShoeButton = screen.getByRole('button', { name: /\+/ });
        Array.from({ length: 4 }).forEach(() => fireEvent.click(addShoeButton));
      
        fireEvent.click(screen.getByText("strIIIIIike!"));

        await waitFor(() =>{
          expect(screen.getByText("Alla skor måste vara ifyllda")).toBeInTheDocument()
        })
    })

    it("should be able to book one or more lanes based on the amount of players", async () => {
        const navigate = vi.fn();
        useNavigate.mockReturnValue(navigate);
    
        render(
          <MemoryRouter>
            <Booking />
          </MemoryRouter>
        );
    
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
          expect(navigate).toHaveBeenCalledWith("/confirmation", {
            state: expect.objectContaining({ confirmationDetails: expect.any(Object) }),
          });
        });
    });
})