// Custom Cypress commands

// Custom command for login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/')
    cy.get('[data-testid="auth-mode-signup"]').click()
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirmPassword"]').type(password)
    cy.get('button[type="submit"]').click()
    
    // Wait for successful registration and login
    cy.url().should('not.include', '/auth')
  })
})

// Custom command for logout
Cypress.Commands.add('logout', () => {
  cy.visit('/')
  cy.contains('button', /sign out/i).click()
})

// Custom command for navigation
Cypress.Commands.add('navigateTo', (section: string) => {
  cy.contains('button', new RegExp(section, 'i')).click()
})

// Custom command for API mocking
Cypress.Commands.add('mockAPI', (endpoint: string, response: any) => {
  cy.intercept('GET', `**/${endpoint}`, response).as(`get-${endpoint}`)
  cy.intercept('POST', `**/${endpoint}`, response).as(`post-${endpoint}`)
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
      navigateTo(section: string): Chainable<void>
      mockAPI(endpoint: string, response: any): Chainable<void>
    }
  }
}