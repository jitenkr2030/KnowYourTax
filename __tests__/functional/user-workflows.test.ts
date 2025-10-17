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
      <button onClick={() => {}}>File Return</button>
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
      <button onClick={() => {}}>Add Payment</button>
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
      <button onClick={() => onAddToTracker({ id: 1, amount: 100 })}>Scan Bill</button>
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
      <button onClick={() => {}}>Calculate Tax</button>
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

// Mock fetch API
global.fetch = jest.fn()

describe('User Workflows - Functional Tests', () => {
  const mockUseSession = useSession as jest.MockedFunction<typeof useSession>
  const mockSignIn = signIn as jest.MockedFunction<typeof signIn>
  const mockSignOut = signOut as jest.MockedFunction<typeof signOut>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Complete User Registration and Login Workflow', () => {
    test('should handle complete registration process', async () => {
      // Setup unauthenticated state
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      })

      // Mock successful registration API call
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: 'Account created successfully',
          user: { id: 'user123', name: 'John Doe', email: 'john@example.com' },
          account: { id: 'account1', name: 'John Doe', subscriptionPlan: 'free' },
        }),
      })

      // Mock successful sign in
      mockSignIn.mockResolvedValueOnce({
        error: null,
        status: 200,
        ok: true,
        url: null,
      })

      render(<Home />)

      // Switch to sign up form
      const signUpButton = screen.getByRole('button', { name: /sign up/i })
      fireEvent.click(signUpButton)

      // Fill registration form
      const nameInput = screen.getByLabelText('Full Name')
      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const confirmPasswordInput = screen.getByLabelText('Confirm Password')
      const submitButton = screen.getByRole('button', { name: /create account/i })

      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })

      // Submit form
      fireEvent.click(submitButton)

      // Verify API call was made
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '',
            password: 'password123',
          }),
        })
      })

      // Verify sign in was called
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('credentials', {
          email: 'john@example.com',
          password: 'password123',
          redirect: false,
        })
      })
    })

    test('should handle login process', async () => {
      // Setup unauthenticated state
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      })

      // Mock successful sign in
      mockSignIn.mockResolvedValueOnce({
        error: null,
        status: 200,
        ok: true,
        url: null,
      })

      render(<Home />)

      // Fill login form
      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })

      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Submit form
      fireEvent.click(submitButton)

      // Verify sign in was called
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('credentials', {
          email: 'john@example.com',
          password: 'password123',
          redirect: false,
        })
      })
    })
  })

  describe('Tax Management Workflow', () => {
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

    test('should handle complete tax filing workflow', async () => {
      render(<Home />)

      // Start from dashboard
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()

      // Navigate to return filing
      const returnFilingButton = screen.getByText('Return Filing')
      fireEvent.click(returnFilingButton)

      // Verify return filing workflow is displayed
      expect(screen.getByTestId('return-filing-workflow')).toBeInTheDocument()

      // Simulate filing return
      const fileReturnButton = screen.getByText('File Return')
      fireEvent.click(fileReturnButton)

      // Verify the workflow continues (in real app, this would show progress)
      expect(screen.getByTestId('return-filing-workflow')).toBeInTheDocument()
    })

    test('should handle tax payment tracking workflow', async () => {
      render(<Home />)

      // Navigate to tax tracker
      const taxTrackerButton = screen.getByText('Tax Tracker')
      fireEvent.click(taxTrackerButton)

      // Verify tax tracker is displayed
      expect(screen.getByTestId('tax-payment-tracker')).toBeInTheDocument()

      // Simulate adding payment
      const addPaymentButton = screen.getByText('Add Payment')
      fireEvent.click(addPaymentButton)

      // Verify the tracker is still displayed (in real app, this would show form)
      expect(screen.getByTestId('tax-payment-tracker')).toBeInTheDocument()
    })

    test('should handle bill scanning workflow', async () => {
      render(<Home />)

      // Navigate to bill scanner
      const billScannerButton = screen.getByText('Bill Scanner')
      fireEvent.click(billScannerButton)

      // Verify bill scanner is displayed
      expect(screen.getByTestId('bill-scanner')).toBeInTheDocument()

      // Simulate scanning bill
      const scanBillButton = screen.getByText('Scan Bill')
      fireEvent.click(scanBillButton)

      // Verify the workflow continues (in real app, this would add to tracker)
      expect(screen.getByTestId('bill-scanner')).toBeInTheDocument()
    })

    test('should handle tax calculation workflow', async () => {
      render(<Home />)

      // Navigate to tax information
      const calculateTaxButton = screen.getByText('Calculate Tax')
      fireEvent.click(calculateTaxButton)

      // Verify tax information is displayed
      expect(screen.getByTestId('indian-tax-information')).toBeInTheDocument()

      // Simulate calculating tax
      const calculateButton = screen.getByText('Calculate Tax')
      fireEvent.click(calculateButton)

      // Verify the information is still displayed (in real app, this would show results)
      expect(screen.getByTestId('indian-tax-information')).toBeInTheDocument()
    })
  })

  describe('Navigation Workflow', () => {
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

    test('should handle navigation between different sections', async () => {
      render(<Home />)

      // Start from dashboard
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()

      // Navigate to return filing
      const returnFilingButton = screen.getByText('Return Filing')
      fireEvent.click(returnFilingButton)
      expect(screen.getByTestId('return-filing-workflow')).toBeInTheDocument()

      // Navigate back to dashboard
      const backButton = screen.getByText('Back')
      fireEvent.click(backButton)
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()

      // Navigate to tax tracker
      const taxTrackerButton = screen.getByText('Tax Tracker')
      fireEvent.click(taxTrackerButton)
      expect(screen.getByTestId('tax-payment-tracker')).toBeInTheDocument()

      // Navigate back to dashboard
      const backButton2 = screen.getByText('Back')
      fireEvent.click(backButton2)
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()

      // Navigate to bill scanner
      const billScannerButton = screen.getByText('Bill Scanner')
      fireEvent.click(billScannerButton)
      expect(screen.getByTestId('bill-scanner')).toBeInTheDocument()

      // Navigate back to dashboard
      const backButton3 = screen.getByText('Back')
      fireEvent.click(backButton3)
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()
    })

    test('should handle tab navigation', async () => {
      render(<Home />)

      // Check default tab is dashboard
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()

      // Navigate to payments tab
      const paymentsTab = screen.getByRole('tab', { name: /payments/i })
      fireEvent.click(paymentsTab)
      expect(screen.getByTestId('payment-processor')).toBeInTheDocument()

      // Navigate to notifications tab
      const notificationsTab = screen.getByRole('tab', { name: /notifications/i })
      fireEvent.click(notificationsTab)
      expect(screen.getByTestId('notifications-manager')).toBeInTheDocument()

      // Navigate to reports tab
      const reportsTab = screen.getByRole('tab', { name: /reports/i })
      fireEvent.click(reportsTab)
      expect(screen.getByTestId('advanced-reports')).toBeInTheDocument()

      // Navigate to integrations tab
      const integrationsTab = screen.getByRole('tab', { name: /integrations/i })
      fireEvent.click(integrationsTab)
      expect(screen.getByTestId('integrations-manager')).toBeInTheDocument()

      // Navigate back to dashboard tab
      const dashboardTab = screen.getByRole('tab', { name: /dashboard/i })
      fireEvent.click(dashboardTab)
      expect(screen.getByTestId('enhanced-dashboard')).toBeInTheDocument()
    })
  })

  describe('Error Handling Workflow', () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      })
    })

    test('should handle registration errors gracefully', async () => {
      // Mock failed registration API call
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'User already exists' }),
      })

      render(<Home />)

      // Switch to sign up form
      const signUpButton = screen.getByRole('button', { name: /sign up/i })
      fireEvent.click(signUpButton)

      // Fill registration form
      const nameInput = screen.getByLabelText('Full Name')
      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const confirmPasswordInput = screen.getByLabelText('Confirm Password')
      const submitButton = screen.getByRole('button', { name: /create account/i })

      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'existing@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })

      // Submit form
      fireEvent.click(submitButton)

      // Verify API call was made
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/auth/register', expect.any(Object))
      })

      // Verify sign in was not called due to error
      expect(mockSignIn).not.toHaveBeenCalled()
    })

    test('should handle login errors gracefully', async () => {
      // Mock failed login
      mockSignIn.mockResolvedValueOnce({
        error: 'Invalid credentials',
        status: 401,
        ok: false,
        url: null,
      })

      render(<Home />)

      // Fill login form
      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: /sign in/i })

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })

      // Submit form
      fireEvent.click(submitButton)

      // Verify sign in was called
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('credentials', {
          email: 'wrong@example.com',
          password: 'wrongpassword',
          redirect: false,
        })
      })
    })
  })
})