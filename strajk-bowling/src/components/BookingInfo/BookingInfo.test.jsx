import { describe, expect, it, vi } from "vitest";
import BookingInfo from "./BookingInfo";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Booking", () => {

    it("should render inputs with correct attributes for them", () =>{

        const mockUpdateBookingDetails = vi.fn()

        render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails}/>)

        const dateInput = screen.getByLabelText(/date/i);
        expect(dateInput).toBeInTheDocument();
        expect(dateInput).toHaveAttribute('type', 'date');

        const timeInput = screen.getByLabelText(/time/i);
        expect(timeInput).toBeInTheDocument();
        expect(timeInput).toHaveAttribute('type', 'time');

        const numberOfGuestsInput = screen.getByLabelText(/Number of awesome bowlers/i);
        expect(numberOfGuestsInput).toBeInTheDocument();
        expect(numberOfGuestsInput).toHaveAttribute('type', 'number');

        const numberOfLanesInput = screen.getByLabelText(/Number of lanes/i);
        expect(numberOfLanesInput).toBeInTheDocument();
        expect(numberOfLanesInput).toHaveAttribute('type', 'number');
    })
    it("should correctly get the date input value from props", () => {

        const mockUpdateBookingDetails = vi.fn();
        
        render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);
        
        const dateInput = screen.getByLabelText(/date/i);
        fireEvent.click(dateInput)

        const testDate = "2024-06-15";
        fireEvent.change(dateInput, { target: { value: testDate } });
        
        expect(dateInput).toHaveValue(testDate);
        
        expect(mockUpdateBookingDetails).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              name: "when",
              value: testDate
            })
          })
        );

        
    });
    it("should correctly get the time input value from props", () => {
        
        const mockUpdateBookingDetails = vi.fn();
        
        render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);
        
        const timeInput = screen.getByLabelText(/time/i);
        
        const testTime = "14:30";
        fireEvent.change(timeInput, { target: { value: testTime } });
        
        expect(timeInput).toHaveValue(testTime);
        
        expect(mockUpdateBookingDetails).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              name: "time",
              value: testTime
            })
          })
        );
    });
    it("should correctly get the number of players input value from props", () => {
        
        const mockUpdateBookingDetails = vi.fn();
        
        render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);
        
        const guestInput = screen.getByLabelText(/Number of awesome bowlers/i);

        fireEvent.change(guestInput, { target: { value: 3 } });

        expect(guestInput.value).toBe("3")
        
        
        expect(mockUpdateBookingDetails).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              name: "people",
              value: "3"
            })
          })
        );
    });
    it("should correctly get the number of lanes input value from props", () => {
        
      const mockUpdateBookingDetails = vi.fn();
      
      render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);
      
      const laneInput = screen.getByLabelText(/Number of lanes/i);

      fireEvent.change(laneInput, { target: { value: 3 } });

      expect(laneInput.value).toBe("3")
      
      
      expect(mockUpdateBookingDetails).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            name: "lanes",
            value: "3"
          })
        })
      );
  });
})