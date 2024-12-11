import { render,screen} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorMessage from "./ErrorMessage";


describe("ErrorMessage", () => {
    it("should render message as defined in prop", () => {
        const errorMessage  = 'invalid blabla'

        render(<ErrorMessage message ={errorMessage}/>)

        expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
})