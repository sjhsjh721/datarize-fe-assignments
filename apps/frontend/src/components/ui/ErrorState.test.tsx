import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { ErrorState } from './error-state'

describe('ErrorState', () => {
  it('renders with default message', () => {
    render(<ErrorState />)
    expect(screen.getByText('데이터를 불러오는데 실패했습니다.')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<ErrorState message="Custom error message" />)
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('renders error icon', () => {
    const { container } = render(<ErrorState />)
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(<ErrorState />)
    const container = screen.getByText('데이터를 불러오는데 실패했습니다.').parentElement
    expect(container).toHaveClass('flex', 'items-center', 'gap-2')
  })
}) 