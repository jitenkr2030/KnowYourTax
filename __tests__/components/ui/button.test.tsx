import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  test('renders button with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
  })

  test('renders button with custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    
    const button = screen.getByRole('button', { name: /custom button/i })
    expect(button).toHaveClass('custom-class')
  })

  test('renders button with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    
    const button = screen.getByRole('button', { name: /delete/i })
    expect(button).toHaveClass('bg-destructive', 'text-white')
  })

  test('renders button with outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    
    const button = screen.getByRole('button', { name: /outline/i })
    expect(button).toHaveClass('border', 'bg-background')
  })

  test('renders button with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    
    const button = screen.getByRole('button', { name: /secondary/i })
    expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground')
  })

  test('renders button with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    
    const button = screen.getByRole('button', { name: /ghost/i })
    expect(button).toHaveClass('hover:bg-accent')
  })

  test('renders button with link variant', () => {
    render(<Button variant="link">Link</Button>)
    
    const button = screen.getByRole('button', { name: /link/i })
    expect(button).toHaveClass('text-primary', 'underline-offset-4')
  })

  test('renders button with small size', () => {
    render(<Button size="sm">Small</Button>)
    
    const button = screen.getByRole('button', { name: /small/i })
    expect(button).toHaveClass('h-8', 'rounded-md', 'gap-1.5', 'px-3')
  })

  test('renders button with large size', () => {
    render(<Button size="lg">Large</Button>)
    
    const button = screen.getByRole('button', { name: /large/i })
    expect(button).toHaveClass('h-10', 'rounded-md', 'px-6')
  })

  test('renders button with icon size', () => {
    render(<Button size="icon">🔍</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('size-9')
  })

  test('renders disabled button', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:pointer-events-none')
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not handle click events when disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByRole('button', { name: /disabled/i })
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('renders as child component when asChild is true', () => {
    const { container } = render(
      <Button asChild>
        <a href="https://example.com">Link Button</a>
      </Button>
    )
    
    const link = container.querySelector('a')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveTextContent('Link Button')
  })

  test('applies focus-visible styles', () => {
    render(<Button>Focus Test</Button>)
    
    const button = screen.getByRole('button', { name: /focus test/i })
    
    // Simulate focus-visible
    button.focus()
    expect(button).toHaveClass('focus-visible:border-ring', 'focus-visible:ring-ring/50')
  })

  test('applies aria-invalid styles', () => {
    render(<Button aria-invalid="true">Invalid</Button>)
    
    const button = screen.getByRole('button', { name: /invalid/i })
    expect(button).toHaveClass('aria-invalid:ring-destructive/20')
  })

  test('handles additional props', () => {
    render(
      <Button
        type="submit"
        aria-label="Submit form"
        data-testid="submit-button"
      >
        Submit
      </Button>
    )
    
    const button = screen.getByTestId('submit-button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('aria-label', 'Submit form')
  })
})