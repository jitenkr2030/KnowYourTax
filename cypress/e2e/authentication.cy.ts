describe('Authentication End-to-End Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display sign in form by default', () => {
    cy.contains('h2', 'Welcome to KYT.ai').should('be.visible')
    cy.contains('p', 'Sign in to access your tax dashboard').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('button', /sign in/i).should('be.visible')
  })

  it('should switch to sign up form', () => {
    cy.contains('button', /sign up/i).click()
    
    cy.contains('h2', 'Create Your Account').should('be.visible')
    cy.contains('p', 'Join KYT.ai and start tracking your taxes').should('be.visible')
    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="confirmPassword"]').should('be.visible')
    cy.contains('button', /create account/i).should('be.visible')
  })

  it('should handle successful registration', () => {
    // Mock API responses
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: {
        message: 'Account created successfully',
        user: { id: 'user123', name: 'John Doe', email: 'john@example.com' },
        account: { id: 'account1', name: 'John Doe', subscriptionPlan: 'free' }
      }
    }).as('register')

    // Mock successful login
    cy.intercept('POST', '/api/auth/signin', {
      statusCode: 200,
      body: {
        user: { id: 'user123', email: 'john@example.com', name: 'John Doe' }
      }
    }).as('signin')

    // Switch to sign up form
    cy.contains('button', /sign up/i).click()

    // Fill registration form
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="email"]').type('john@example.com')
    cy.get('input[name="phone"]').type('+1234567890')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('password123')

    // Submit form
    cy.contains('button', /create account/i).click()

    // Wait for API calls
    cy.wait('@register')
    cy.wait('@signin')

    // Verify successful registration (should redirect to dashboard)
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible', { timeout: 10000 })
  })

  it('should handle registration with existing email', () => {
    // Mock API response for existing user
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400,
      body: { error: 'User already exists with this email' }
    }).as('register')

    // Switch to sign up form
    cy.contains('button', /sign up/i).click()

    // Fill registration form with existing email
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="email"]').type('existing@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('password123')

    // Submit form
    cy.contains('button', /create account/i).click()

    // Wait for API call
    cy.wait('@register')

    // Should still be on registration page
    cy.contains('h2', 'Create Your Account').should('be.visible')
  })

  it('should handle password mismatch', () => {
    // Switch to sign up form
    cy.contains('button', /sign up/i).click()

    // Fill registration form with mismatched passwords
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="email"]').type('john@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('differentpassword')

    // Submit form
    cy.contains('button', /create account/i).click()

    // Should show alert for password mismatch
    cy.on('window:alert', (str) => {
      expect(str).to.include('Passwords do not match')
    })
  })

  it('should handle successful login', () => {
    // Mock successful login
    cy.intercept('POST', '/api/auth/signin', {
      statusCode: 200,
      body: {
        user: { id: 'user123', email: 'john@example.com', name: 'John Doe' }
      }
    }).as('signin')

    // Fill login form
    cy.get('input[type="email"]').type('john@example.com')
    cy.get('input[type="password"]').type('password123')

    // Submit form
    cy.contains('button', /sign in/i).click()

    // Wait for API call
    cy.wait('@signin')

    // Verify successful login (should redirect to dashboard)
    cy.contains('h2', 'Enhanced Dashboard').should('be.visible', { timeout: 10000 })
  })

  it('should handle failed login', () => {
    // Mock failed login
    cy.intercept('POST', '/api/auth/signin', {
      statusCode: 401,
      body: { error: 'Invalid credentials' }
    }).as('signin')

    // Fill login form with wrong credentials
    cy.get('input[type="email"]').type('wrong@example.com')
    cy.get('input[type="password"]').type('wrongpassword')

    // Submit form
    cy.contains('button', /sign in/i).click()

    // Wait for API call
    cy.wait('@signin')

    // Should still be on login page
    cy.contains('h2', 'Welcome to KYT.ai').should('be.visible')
  })

  it('should navigate to landing page', () => {
    cy.contains('a', 'Learn More').click()
    
    // Should navigate to landing page
    cy.url().should('include', '/landing')
  })
})