import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { EmptyState } from './empty-state'

describe('EmptyState', () => {
  it('renders with default message', () => {
    render(<EmptyState />)
    expect(screen.getByText('데이터가 없습니다.')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<EmptyState message="No results found" />)
    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  it('renders empty icon', () => {
    const { container } = render(<EmptyState />)
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(<EmptyState />)
    const container = screen.getByText('데이터가 없습니다.').parentElement
    expect(container).toHaveClass('flex', 'items-center', 'gap-2')
  })

  it('has proper text color', () => {
    render(<EmptyState />)
    const container = screen.getByText('데이터가 없습니다.').parentElement
    expect(container).toHaveClass('text-gray-600')
  })
}) 