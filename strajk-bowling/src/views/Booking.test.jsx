import { describe, expect, it, vi } from "vitest";
import Booking from "./Booking";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

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


        expect(screen.getByLabelText(/Number of lanes/i)).toHaveValue(2)
    
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

    it("should be able to remove a shoe by pressing - button", async () => {
      const navigate = vi.fn();
      useNavigate.mockReturnValue(navigate);
  
      render(
        <MemoryRouter>
          <Booking />
        </MemoryRouter>
      );
  
      const addShoeButton = screen.getByRole('button', { name: /\+/ });
      fireEvent.click(addShoeButton);
      
  
      const shoeInput = screen.getAllByRole('textbox')[0];
  
      fireEvent.change(shoeInput, { target: { value: 40 } }).toString();

      
      expect(shoeInput).toHaveValue((40).toString());

      const removeShoeButton = screen.getByRole('button', { name: /\-/ });

      await waitFor(() => {
        expect(screen.queryByRole('textbox')).toBeInTheDocument();
      });

      fireEvent.click(removeShoeButton)


      await waitFor(() => {
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      });
  });

    it("should allow the user to select a date", async () => {
      render(<Booking />);

      const dateInput = screen.getByLabelText(/date/i);
      fireEvent.change(dateInput, { target: { value: '2024-12-10' } });

      await waitFor(() => {
        expect(dateInput).toHaveValue('2024-12-10');
      });
    });

    it("should allow the user to select a time", async () => {
      render(<Booking />);

      const timeInput = screen.getByLabelText(/time/i);
      fireEvent.change(timeInput, { target: { value: '18:00' } });

      await waitFor(() => {
        expect(timeInput).toHaveValue('18:00');
      });
    });

    it("should allow the user to select the number of players by clicking + button and entering value to select shoe size ", async () => {
      render(<Booking />);
      fireEvent.click(screen.getByRole('button', { name: /\+/i }));
    
      const playerInput = screen.getAllByRole('textbox')[0]; 
    
      fireEvent.change(playerInput, { target: { value: '3' } });
    
      await waitFor(() => {
        expect(playerInput).toHaveValue('3');
      });
    });
})