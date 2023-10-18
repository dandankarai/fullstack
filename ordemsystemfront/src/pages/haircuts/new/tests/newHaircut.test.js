import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import New from "../index";

describe("Render page newhaircut page inputs", () => {
  it("render Login component without errors", () => {
    render(<New />);
  });

  it("handle inputs to register new haircut", () => {
    render(<New />);

    const nameHaircutInput = screen.getByTestId("nameHaircutInput");
    const priceHaircut = screen.getByTestId("priceHaircut");

    expect(nameHaircutInput).toBeInTheDocument();
    expect(priceHaircut).toBeInTheDocument();

    fireEvent.change(nameHaircutInput, { target: { value: "Sample Haircut" } });
    fireEvent.change(priceHaircut, { target: { value: "20" } });

    expect(nameHaircutInput.value).toBe("Sample Haircut");
    expect(priceHaircut.value).toBe("20");
  });

  it("navigates to the registration page when 'Register' link is clicked", () => {
    render(<Register schedule={[]} />);

    const linkToRegister = screen.getByTestId("linkToRegister");
    fireEvent.click(linkToRegister);

    expect(window.location.pathname).toBe("/new");
  });
});
