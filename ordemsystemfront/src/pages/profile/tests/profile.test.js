import React from "react";
import { render, fireEvent, screen } from '@testing-library/react'
import Profile from '../index'


describe('Handle inputs in page Profile correctly', () => {
  it('render Profile component without errors', () => {
    render(<Profile />)
  })

  it('handles field in page profile correctly', () => {
    render(<Profile />)

    const nameBarber = screen.getByTestId('nameBarber')
    const address = screen.getByTestId('address')
    const buttonChangePlan = screen.getByTestId('buttonChangePlan')

    expect(nameBarber).toBeTruthy()
    expect(address).toBeTruthy()
    expect(buttonChangePlan).toBeTruthy()
  })
})
