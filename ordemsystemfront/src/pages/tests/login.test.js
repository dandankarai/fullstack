import React from "react";
import { render, fireEvent, screen } from '@testing-library/react'
import Login from '../index'


describe('login page', () => {
  it('render Login component without errors', () => {
    render(<Login />)
  })

  it('handles email, password and button login and register correctly', () => {
    render(<Login />)

    const emailInput = screen.getByTestId('inputEmail')
    const passwordInput = screen.getByTestId('inputPassword')
    const loginButton = screen.getByTestId('buttonLogin')
    const registerLink = screen.getByTestId("buttonRegister")

    expect(emailInput).toBeTruthy()
    expect(passwordInput).toBeTruthy()
    expect(loginButton).toBeTruthy()
    expect(registerLink).toBeTruthy()
  })
})
