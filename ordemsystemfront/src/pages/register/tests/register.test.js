import React from "react";
import { render, fireEvent, screen } from '@testing-library/react'
import Register from "../index";


describe('Render page Register correctly', () => {
  it('handles email, password and button login and register correctly', () => {
    render(<Register />)

    const username = screen.getByTestId('username')
    const inputEmail = screen.getByTestId('inputPassword')
    const inputPassword = screen.getByTestId('inputPassword')
    const buttonRegister = screen.getByTestId("buttonRegister")
    const linkToLogin = screen.getByTestId('linkToLogin')

    expect(username).toBeTruthy()
    expect(inputEmail).toBeTruthy()
    expect(inputPassword).toBeTruthy()
    expect(buttonRegister).toBeTruthy()
    expect(linkToLogin).toBeTruthy()
  })

  it("navigates to the login page when the Login link is clicked", () => {
    render(
      <Register />
    );

    const loginLink = screen.getByTestId("linkToLogin");

    fireEvent.click(loginLink);

    expect(window.location.pathname).toBe("/");
  })
})
