import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../index";
import Register from "../index";

describe("Login dashboard page", () => {
  it("render Login component without errors", () => {
    render(<Register />);
  });

  it("handle button register correctly", () => {
    render(<Register />);

    const linkButtonRegister = screen.getByTestId("linkToRegister");

    expect(linkButtonRegister).toBeTruthy();
  });
});
