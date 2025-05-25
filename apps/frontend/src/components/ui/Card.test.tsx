import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription, CardAction } from './card'

describe('Card Components', () => {
  it('renders Card with content', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies custom className to Card', () => {
    render(<Card className="custom-card">Content</Card>)
    const card = screen.getByText('Content')
    expect(card.closest('div')).toHaveClass('custom-card')
  })

  it('applies default Card classes', () => {
    render(<Card>Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card).toHaveClass('bg-card', 'text-card-foreground', 'flex', 'flex-col', 'gap-6', 'rounded-xl', 'border', 'py-6', 'shadow-sm')
  })

  it('renders CardHeader with title', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('applies CardHeader classes', () => {
    render(
      <Card>
        <CardHeader className="custom-header">Header</CardHeader>
      </Card>
    )
    const header = screen.getByText('Header')
    expect(header).toHaveClass('grid', 'auto-rows-min', 'grid-rows-[auto_auto]', 'items-start', 'gap-1.5', 'px-6', 'custom-header')
  })

  it('applies CardTitle classes', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle className="custom-title">Title</CardTitle>
        </CardHeader>
      </Card>
    )
    const title = screen.getByText('Title')
    expect(title).toHaveClass('leading-none', 'font-semibold', 'custom-title')
  })

  it('renders CardDescription', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Test description</CardDescription>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('applies CardDescription classes', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription className="custom-desc">Description</CardDescription>
        </CardHeader>
      </Card>
    )
    const desc = screen.getByText('Description')
    expect(desc).toHaveClass('text-muted-foreground', 'text-sm', 'custom-desc')
  })

  it('renders CardAction', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardAction>Action Button</CardAction>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('Action Button')).toBeInTheDocument()
  })

  it('applies CardAction classes', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardAction className="custom-action">Action</CardAction>
        </CardHeader>
      </Card>
    )
    const action = screen.getByText('Action')
    expect(action).toHaveClass('col-start-2', 'row-span-2', 'row-start-1', 'self-start', 'justify-self-end', 'custom-action')
  })

  it('renders CardHeader with grid layout when CardAction is present', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardAction>Action</CardAction>
        </CardHeader>
      </Card>
    )
    const header = screen.getByText('Title').parentElement
    expect(header).toHaveClass('has-data-[slot=card-action]:grid-cols-[1fr_auto]')
  })

  it('renders CardContent', () => {
    render(
      <Card>
        <CardContent>Card body content</CardContent>
      </Card>
    )
    expect(screen.getByText('Card body content')).toBeInTheDocument()
  })

  it('applies CardContent classes', () => {
    render(
      <Card>
        <CardContent className="custom-content">Content</CardContent>
      </Card>
    )
    const content = screen.getByText('Content')
    expect(content).toHaveClass('px-6', 'custom-content')
  })

  it('renders CardFooter', () => {
    render(
      <Card>
        <CardFooter>Footer content</CardFooter>
      </Card>
    )
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies CardFooter classes', () => {
    render(
      <Card>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    )
    const footer = screen.getByText('Footer')
    expect(footer).toHaveClass('flex', 'items-center', 'px-6', 'custom-footer')
  })

  it('renders complete card structure with action', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('renders complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('handles Card component structure', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild
    expect(card).toBeInstanceOf(HTMLDivElement)
  })

  it('handles CardHeader component structure', () => {
    const { container } = render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    )
    const header = container.querySelector('[data-slot="card-header"]') || screen.getByText('Header')
    expect(header).toBeInTheDocument()
  })

  it('handles CardAction component structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardAction>Action</CardAction>
        </CardHeader>
      </Card>
    )
    const action = screen.getByText('Action')
    expect(action).toBeInTheDocument()
    expect(action).toHaveAttribute('data-slot', 'card-action')
  })

  it('handles CardTitle component structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    )
    const title = screen.getByText('Title')
    expect(title).toBeInTheDocument()
    expect(title.tagName.toLowerCase()).toBe('div')
  })
}) 