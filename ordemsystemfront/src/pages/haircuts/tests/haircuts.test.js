import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Haircuts from "../index";

const haircutList = [
  { id: 1, name: "Modelo 1", price: 20, isActive: true },
  { id: 2, name: "Modelo 2", price: 30, isActive: false },
];

describe("Page haircut models", () => {
  it("renderiza a página de Modelos de Cortes de Cabelo sem erros", () => {
    render(<Haircuts haircutList={haircutList} />);
  });

  it("change filter active/disable", () => {
    render(<Haircuts haircutList={haircutList} />);

    const checkbox = screen.getByRole("checkbox");
    const activeItems = screen.getAllByText("Active");
    const inactiveItems = screen.getAllByText("disable");

    expect(activeItems).toHaveLength(2);
    expect(inactiveItems).toHaveLength(1);

    fireEvent.click(checkbox);

    expect(activeItems).toHaveLength(1);
    expect(inactiveItems).toHaveLength(0);
  });
});
