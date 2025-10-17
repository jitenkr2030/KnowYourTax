describe('Tax Management Workflow End-to-End Tests', () => {
  beforeEach(() => {
    // Mock successful login
    cy.intercept('POST', '/api/auth/signin', {
      statusCode: 200,
      body: {
        user: { id: 'user123', email: 'john@example.com', name: 'John Doe' }
      }
    }).as('signin')

    // Mock session
    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        user: { id: 'user123', email: 'john@example.com', name: 'John Doe' }
      }
    }).as('session')

    // Mock tax entries API
    cy.intercept('GET', '/api/tax-entries*userId=user123', {
      statusCode: 200,
      body: {
        taxEntries: [
          {
            id: '1',
            userId: 'user123',
            taxType: 'Income Tax',
            amount: 5000,
            description: 'Monthly income tax',
            category: 'Income',
            date: '2024-01-15T00:00:00.000Z',
            financialYear: '2024-25',
            source: 'Manual',
            isVerified: false,
            verificationStatus: 'PENDING'
          }
        ]
      }
    }).as('getTaxEntries')

    // Mock tax entry creation
    cy.intercept('POST', '/api/tax-entries', {
      statusCode: 200,
      body: {
        taxEntry: {
          id: '2',
          userId: 'user123',
          taxType: 'GST',
          amount: 1200,
          description: 'GST payment',
          category: 'GST',
          date: '2024-01-20T00:00:00.000Z',
          financialYear: '2024-25',
          source: 'Manual',
          isVerified: false,
          verificationStatus: 'PENDING'
        }
      }
    }).as('createTaxEntry')

    // Login
    cy.visit('/')
    cy.get('input[type="email"]').type('john@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', /sign in/i).click()
    
    // Wait for login
    cy.wait('@signin')
    
    // Verify dashboard is loaded
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible', { timeout: 10000 })
  })

  it('should handle complete tax filing workflow', () => {
    // Navigate to return filing
    cy.contains('button', 'Return Filing').click()
    cy.contains('h2', 'Return Filing Workflow').should('be.visible')
    
    // Simulate filing return (this would be more complex in real app)
    cy.contains('button', 'File Return').click()
    
    // Verify workflow continues
    cy.contains('h2', 'Return Filing Workflow').should('be.visible')
    
    // Navigate back to dashboard
    cy.contains('button', 'Back').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
  })

  it('should handle tax payment tracking workflow', () => {
    // Navigate to tax tracker
    cy.contains('button', 'Tax Tracker').click()
    cy.contains('h2', 'Tax Payment Tracker').should('be.visible')
    
    // Wait for tax entries to load
    cy.wait('@getTaxEntries')
    
    // Verify tax entries are displayed
    cy.contains('Income Tax').should('be.visible')
    cy.contains('5000').should('be.visible')
    
    // Simulate adding payment
    cy.contains('button', 'Add Payment').click()
    
    // Verify tracker is still displayed
    cy.contains('h2', 'Tax Payment Tracker').should('be.visible')
    
    // Navigate back to dashboard
    cy.contains('button', 'Back').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
  })

  it('should handle bill scanning workflow', () => {
    // Navigate to bill scanner
    cy.contains('button', 'Bill Scanner').click()
    cy.contains('h2', 'Bill Scanner').should('be.visible')
    
    // Simulate scanning bill
    cy.contains('button', 'Scan Bill').click()
    
    // Verify workflow continues
    cy.contains('h2', 'Bill Scanner').should('be.visible')
    
    // Navigate back to dashboard
    cy.contains('button', 'Back').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
  })

  it('should handle tax calculation workflow', () => {
    // Navigate to tax information
    cy.contains('button', 'Calculate Tax').click()
    cy.contains('h2', 'Indian Tax Information').should('be.visible')
    
    // Simulate calculating tax
    cy.contains('button', 'Calculate Tax').click()
    
    // Verify information is still displayed
    cy.contains('h2', 'Indian Tax Information').should('be.visible')
    
    // Navigate back to dashboard
    cy.contains('button', 'Back').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
  })

  it('should handle tax entry creation workflow', () => {
    // Navigate to tax tracker
    cy.contains('button', 'Tax Tracker').click()
    cy.contains('h2', 'Tax Payment Tracker').should('be.visible')
    
    // Wait for tax entries to load
    cy.wait('@getTaxEntries')
    
    // Simulate creating new tax entry
    cy.contains('button', 'Add Payment').click()
    
    // In a real app, this would open a form, but for testing we'll verify the API call
    cy.wait('@createTaxEntry')
    
    // Verify the new entry would be created
    cy.contains('h2', 'Tax Payment Tracker').should('be.visible')
    
    // Navigate back to dashboard
    cy.contains('button', 'Back').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
  })

  it('should handle complete tax management workflow', () => {
    // Start with tax calculation
    cy.contains('button', 'Calculate Tax').click()
    cy.contains('h2', 'Indian Tax Information').should('be.visible')
    cy.contains('button', 'Back').click()
    
    // Then go to bill scanning
    cy.contains('button', 'Bill Scanner').click()
    cy.contains('h2', 'Bill Scanner').should('be.visible')
    cy.contains('button', 'Back').click()
    
    // Then go to tax tracker
    cy.contains('button', 'Tax Tracker').click()
    cy.contains('h2', 'Tax Payment Tracker').should('be.visible')
    cy.wait('@getTaxEntries')
    cy.contains('button', 'Back').click()
    
    // Finally go to return filing
    cy.contains('button', 'Return Filing').click()
    cy.contains('h2', 'Return Filing Workflow').should('be.visible')
    cy.contains('button', 'Back').click()
    
    // Should end up back at dashboard
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
  })
})