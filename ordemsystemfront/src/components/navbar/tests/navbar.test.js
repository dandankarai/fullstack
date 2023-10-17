import { render, screen } from '@testing-library/react'
import NavBar from '..'

describe('Testing navbar link', () => {
  test('render navbar links', () => {
    render(<NavBar />)

    const scheduleLink = screen.getByTestId('Schedule-link')
    const haircutLink = screen.getByTestId('Haircut-link')
    const accountLink = screen.getByTestId('MyAccount-link')

    expect(scheduleLink).toBeTruthy()
    expect(haircutLink).toBeTruthy()
    expect(accountLink).toBeTruthy()
  })
})
