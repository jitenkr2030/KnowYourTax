describe('Navigation End-to-End Tests', () => {
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

  it('should navigate to return filing workflow', () => {
    cy.contains('button', 'Return Filing').click()
    
    cy.contains('h2', 'Return Filing Workflow').should('be.visible')
    cy.contains('button', 'Back').should('be.visible')
  })

  it('should navigate to tax payment tracker', () => {
    cy.contains('button', 'Tax Tracker').click()
    
    cy.contains('h2', 'Tax Payment Tracker').should('be.visible')
    cy.contains('button', 'Back').should('be.visible')
  })

  it('should navigate to bill scanner', () => {
    cy.contains('button', 'Bill Scanner').click()
    
    cy.contains('h2', 'Bill Scanner').should('be.visible')
    cy.contains('button', 'Back').should('be.visible')
  })

  it('should navigate to indian tax information', () => {
    cy.contains('button', 'Calculate Tax').click()
    
    cy.contains('h2', 'Indian Tax Information').should('be.visible')
    cy.contains('button', 'Back').should('be.visible')
  })

  it('should navigate using tabs', () => {
    // Navigate to payments tab
    cy.contains('button', 'Payments').click()
    cy.contains('h2', 'Payment Processor').should('be.visible')
    
    // Navigate to notifications tab
    cy.contains('button', 'Notifications').click()
    cy.contains('h2', 'Notifications Manager').should('be.visible')
    
    // Navigate to reports tab
    cy.contains('button', 'Reports').click()
    cy.contains('h2', 'Advanced Reports').should('be.visible')
    
    // Navigate to integrations tab
    cy.contains('button', 'Integrations').click()
    cy.contains('h2', 'Integrations Manager').should('be.visible')
    
    // Navigate back to dashboard tab
    cy.contains('button', 'Dashboard').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
  })

  it('should handle back navigation', () => {
    // Navigate to return filing
    cy.contains('button', 'Return Filing').click()
    cy.contains('h2', 'Return Filing Workflow').should('be.visible')
    
    // Navigate back to dashboard
    cy.contains('button', 'Back').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
    
    // Navigate to tax tracker
    cy.contains('button', 'Tax Tracker').click()
    cy.contains('h2', 'Tax Payment Tracker').should('be.visible')
    
    // Navigate back to dashboard
    cy.contains('button', 'Back').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
  })

  it('should maintain navigation state', () => {
    // Navigate to different sections
    cy.contains('button', 'Return Filing').click()
    cy.contains('h2', 'Return Filing Workflow').should('be.visible')
    
    cy.contains('button', 'Back').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
    
    // Navigate to payments tab
    cy.contains('button', 'Payments').click()
    cy.contains('h2', 'Payment Processor').should('be.visible')
    
    // Navigate back to dashboard tab
    cy.contains('button', 'Dashboard').click()
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible')
    
    // Should still be able to navigate to other sections
    cy.contains('button', 'Tax Tracker').click()
    cy.contains('h2', 'Tax Payment Tracker').should('be.visible')
  })
})