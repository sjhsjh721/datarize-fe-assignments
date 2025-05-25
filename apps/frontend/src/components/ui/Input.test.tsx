import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Test input" />)
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument()
  })

  it('accepts value prop', () => {
    render(<Input value="test value" readOnly />)
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    
    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" placeholder="test" />)
    const input = screen.getByPlaceholderText('test')
    expect(input).toHaveClass('custom-input')
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder="disabled input" />)
    const input = screen.getByPlaceholderText('disabled input')
    expect(input).toBeDisabled()
  })

  it('supports different input types', () => {
    render(<Input type="email" placeholder="email" />)
    const input = screen.getByPlaceholderText('email')
    expect(input).toHaveAttribute('type', 'email')
  })
}) 