import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogClose 
} from './dialog'

describe('Dialog Components', () => {
  it('renders Dialog with trigger and content', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    
    // Initially dialog content should not be visible
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
    
    // Click trigger to open dialog
    await user.click(screen.getByText('Open Dialog'))
    
    // Dialog content should now be visible
    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
  })

  it('renders DialogHeader with title and description', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Title</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders DialogFooter', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
          <DialogFooter>Footer Content</DialogFooter>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('closes dialog when close button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    
    // Open dialog
    await user.click(screen.getByText('Open Dialog'))
    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
    
    // Find and click close button (X icon)
    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)
    
    // Dialog should be closed
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
  })

  it('renders DialogClose component', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
          <DialogClose>Custom Close</DialogClose>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    expect(screen.getByText('Custom Close')).toBeInTheDocument()
    
    // Click custom close button
    await user.click(screen.getByText('Custom Close'))
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
  })

  it('applies custom className to DialogContent', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="custom-dialog">
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    
    const dialogContent = screen.getByText('Title').closest('[role="dialog"]')
    expect(dialogContent).toHaveClass('custom-dialog')
  })

  it('applies DialogHeader classes', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader className="custom-header">
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    
    const header = screen.getByText('Title').parentElement
    expect(header).toHaveClass('flex', 'flex-col', 'gap-2', 'text-center', 'sm:text-left', 'custom-header')
  })

  it('applies DialogTitle classes', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle className="custom-title">Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    
    const title = screen.getByText('Title')
    expect(title).toHaveClass('text-lg', 'leading-none', 'font-semibold', 'custom-title')
  })

  it('applies DialogDescription classes', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription className="custom-desc">Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    
    const desc = screen.getByText('Description')
    expect(desc).toHaveClass('text-gray-600', 'text-sm', 'custom-desc')
  })

  it('applies DialogFooter classes', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
          <DialogFooter className="custom-footer">Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    
    const footer = screen.getByText('Footer')
    expect(footer).toHaveClass('flex', 'flex-col-reverse', 'gap-2', 'sm:flex-row', 'sm:justify-end', 'custom-footer')
  })

  it('handles controlled dialog state', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>Controlled description</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    
    // Dialog should be open
    expect(screen.getByText('Controlled Dialog')).toBeInTheDocument()
  })

  it('handles DialogContent structure', async () => {
    const user = userEvent.setup()
    
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByText('Open'))
    const dialogContent = screen.getByRole('dialog')
    expect(dialogContent).toBeInTheDocument()
  })
}) 