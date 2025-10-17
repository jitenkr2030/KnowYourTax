import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Home from '@/app/page'

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// Mock components
jest.mock('@/components/EnhancedDashboard', () => ({
  __esModule: true,
  default: ({ totalTaxPaid, monthlyData, taxBreakdown, onAddTaxEntry, onCalculateTax, onPropertyTax, onTaxTracker, onBillScanner, onReturnFiling }: any) => (
    <div data-testid="enhanced-dashboard">
      <h2>Enhanced Dashboard</h2>
      <p>Total Tax Paid: {totalTaxPaid}</p>
      <button onClick={onAddTaxEntry}>Add Tax Entry</button>
      <button onClick={onCalculateTax}>Calculate Tax</button>
      <button onClick={onPropertyTax}>Property Tax</button>
      <button onClick={onTaxTracker}>Tax Tracker</button>
      <button onClick={onBillScanner}>Bill Scanner</button>
      <button onClick={onReturnFiling}>Return Filing</button>
    </div>
  ),
}))

jest.mock('@/components/ReturnFilingWorkflow', () => ({
  __esModule: true,
  default: ({ userId, onBack }: any) => (
    <div data-testid="return-filing-workflow">
      <h2>Return Filing Workflow</h2>
      <p>User ID: {userId}</p>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}))

jest.mock('@/components/TaxPaymentTracker', () => ({
  __esModule: true,
  default: ({ userId, onBack }: any) => (
    <div data-testid="tax-payment-tracker">
      <h2>Tax Payment Tracker</h2>
      <p>User ID: {userId}</p>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}))

jest.mock('@/components/BillScanner', () => ({
  __esModule: true,
  default: ({ userId, onBack, onAddToTracker }: any) => (
    <div data-testid="bill-scanner">
      <h2>Bill Scanner</h2>
      <p>User ID: {userId}</p>
      <button onClick={onBack}>Back</button>
      <button onClick={() => onAddToTracker({ id: 1, amount: 100 })}>Add to Tracker</button>
    </div>
  ),
}))

jest.mock('@/components/IndianTaxInformation', () => ({
  __esModule: true,
  default: ({ userId, onBack }: any) => (
    <div data-testid="indian-tax-information">
      <h2>Indian Tax Information</h2>
      <p>User ID: {userId}</p>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}))

jest.mock('@/components/PaymentProcessor', () => ({
  __esModule: true,
  default: () => <div data-testid="payment-processor">Payment Processor</div>,
}))

jest.mock('@/components/NotificationsManager', () => ({
  __esModule: true,
  default: () => <div data-testid="notifications-manager">Notifications Manager</div>,
}))

jest.mock('@/components/AdvancedReports', () => ({
  __esModule: true,
  default: () => <div data-testid="advanced-reports">Advanced Reports</div>,
}))

jest.mock('@/components/IntegrationsManager', () => ({
  __esModule: true,
  default: () => <div data-testid="integrations-manager">Integrations Manager</div>,
}))

describe('Home Page Navigation', () => {
  const mockUseSession = useSession as jest.MockedFunction<typeof useSession>
  const mockSignIn = signIn as jest.MockedFunction<typeof signIn>
  const mockSignOut = signOut as jest.MockedFunction<typeof signOut>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Unauthenticated State', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      })
    })

    test('should show sign in form by default', () => {
      render(<Home />)
      
      expect(screen.getByText('Welcome to KYT.ai')).toBeInTheDocument()
      expect(screen.getByText('Sign in to access your tax dashboard')).toBeInTheDocument()
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    test('should switch to sign up form when sign up button is clicked', () => {
      render(<Home />)
      
      const signUpButton = screen.getByRole('button', { name: /sign up/i })
      fireEvent.click(signUpButton)
      
      expect(screen.getByText('Create Your Account')).toBeInTheDocument()
      expect(screen.getByText('Join KYT.ai and start tracking your taxes')).toBeInTheDocument()
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    })

    test('should handle sign in form submission', async () => {
      render(<Home />)
      
      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)
      
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      })
    })

    test('should handle sign up form submission', async () => {
      render(<Home />)
      
      // Switch to sign up
      const signUpButton = screen.getByRole('button', { name: /sign up/i })
      fireEvent.click(signUpButton)
      
      // Fill form
      const nameInput = screen.getByLabelText('Full Name')
      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const confirmPasswordInput = screen.getByLabelText('Confirm Password')
      const submitButton = screen.getByRole('button', { name: /create account/i })
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
      fireEvent.click(submitButton)
      
      // Should show alert for password mismatch if passwords don't match
      // But in this case they match, so it should proceed with API call
    })

    test('should show link to landing page', () => {
      render(<Home />)
      
      const learnMoreLink = screen.getByText('Learn More')
      expect(learnMoreLink).toBeInTheDocument()
      expect(learnMoreLink).toHaveAttribute('href', '/landing')
    })
  })

  describe('Loading State', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'loading',
      })
    })

    test('should show loading spinner', () => {
      render(<Home />)
      
      expect(screen.getByText('Loading KYT.ai...')).toBeInTheDocument()
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })

  describe('Authenticated State', () => {
    const mockSession = {
      user: {
        id: 'user123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        accountId: 'account1',
      },
      expires: '2024-01-01',
    }

    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        status: 'authenticated',
      })
    })

    test('should show dashboard by default', () => {
      render(<Home />)
      
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()
      expect(screen.getByText('Enhanced Dashboard')).toBeInTheDocument()
    })

    test('should navigate to return filing workflow', () => {
      render(<Home />)
      
      const returnFilingButton = screen.getByText('Return Filing')
      fireEvent.click(returnFilingButton)
      
      expect(screen.getByTestId('return-filing-workflow')).toBeInTheDocument()
      expect(screen.getByText('Return Filing Workflow')).toBeInTheDocument()
      expect(screen.getByText('User ID: user123')).toBeInTheDocument()
    })

    test('should navigate to tax payment tracker', () => {
      render(<Home />)
      
      const taxTrackerButton = screen.getByText('Tax Tracker')
      fireEvent.click(taxTrackerButton)
      
      expect(screen.getByTestId('tax-payment-tracker')).toBeInTheDocument()
      expect(screen.getByText('Tax Payment Tracker')).toBeInTheDocument()
    })

    test('should navigate to bill scanner', () => {
      render(<Home />)
      
      const billScannerButton = screen.getByText('Bill Scanner')
      fireEvent.click(billScannerButton)
      
      expect(screen.getByTestId('bill-scanner')).toBeInTheDocument()
      expect(screen.getByText('Bill Scanner')).toBeInTheDocument()
    })

    test('should navigate to indian tax information', () => {
      render(<Home />)
      
      const calculateTaxButton = screen.getByText('Calculate Tax')
      fireEvent.click(calculateTaxButton)
      
      expect(screen.getByTestId('indian-tax-information')).toBeInTheDocument()
      expect(screen.getByText('Indian Tax Information')).toBeInTheDocument()
    })

    test('should navigate to payment processor', () => {
      render(<Home />)
      
      // Find and click the payments tab
      const paymentsTab = screen.getByRole('tab', { name: /payments/i })
      fireEvent.click(paymentsTab)
      
      expect(screen.getByTestId('payment-processor')).toBeInTheDocument()
    })

    test('should navigate to notifications manager', () => {
      render(<Home />)
      
      // Find and click the notifications tab
      const notificationsTab = screen.getByRole('tab', { name: /notifications/i })
      fireEvent.click(notificationsTab)
      
      expect(screen.getByTestId('notifications-manager')).toBeInTheDocument()
    })

    test('should navigate to advanced reports', () => {
      render(<Home />)
      
      // Find and click the reports tab
      const reportsTab = screen.getByRole('tab', { name: /reports/i })
      fireEvent.click(reportsTab)
      
      expect(screen.getByTestId('advanced-reports')).toBeInTheDocument()
    })

    test('should navigate to integrations manager', () => {
      render(<Home />)
      
      // Find and click the integrations tab
      const integrationsTab = screen.getByRole('tab', { name: /integrations/i })
      fireEvent.click(integrationsTab)
      
      expect(screen.getByTestId('integrations-manager')).toBeInTheDocument()
    })

    test('should handle back navigation from components', () => {
      render(<Home />)
      
      // Navigate to return filing
      const returnFilingButton = screen.getByText('Return Filing')
      fireEvent.click(returnFilingButton)
      
      expect(screen.getByTestId('return-filing-workflow')).toBeInTheDocument()
      
      // Click back button
      const backButton = screen.getByText('Back')
      fireEvent.click(backButton)
      
      // Should return to dashboard
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()
    })

    test('should handle add to tracker from bill scanner', () => {
      render(<Home />)
      
      // Navigate to bill scanner
      const billScannerButton = screen.getByText('Bill Scanner')
      fireEvent.click(billScannerButton)
      
      expect(screen.getByTestId('bill-scanner')).toBeInTheDocument()
      
      // Click add to tracker
      const addToTrackerButton = screen.getByText('Add to Tracker')
      fireEvent.click(addToTrackerButton)
      
      // Should navigate to tax tracker
      expect(screen.getByTestId('tax-payment-tracker')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      })
    })

    test('should handle form validation errors', () => {
      // Mock window.alert
      const alertMock = jest.fn()
      window.alert = alertMock
      
      render(<Home />)
      
      // Switch to sign up
      const signUpButton = screen.getByRole('button', { name: /sign up/i })
      fireEvent.click(signUpButton)
      
      // Submit with mismatched passwords
      const passwordInput = screen.getByLabelText('Password')
      const confirmPasswordInput = screen.getByLabelText('Confirm Password')
      const submitButton = screen.getByRole('button', { name: /create account/i })
      
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } })
      fireEvent.click(submitButton)
      
      // Should show alert
      expect(alertMock).toHaveBeenCalledWith('Passwords do not match')
    })
  })
})