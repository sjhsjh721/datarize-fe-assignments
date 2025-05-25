import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { Loading } from './loading'

describe('Loading', () => {
  it('renders loading component', () => {
    render(<Loading />)
    expect(screen.getByText('데이터를 불러오는 중...')).toBeInTheDocument()
  })

  it('renders loading spinner', () => {
    const { container } = render(<Loading />)
    const spinner = container.querySelector('svg')
    expect(spinner).toBeInTheDocument()
  })

  it('applies correct classes', () => {
    render(<Loading />)
    const container = screen.getByText('데이터를 불러오는 중...').parentElement
    expect(container).toHaveClass('flex', 'items-center', 'gap-2')
  })
}) 