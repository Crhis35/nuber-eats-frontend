describe('Log In', () => {
  it('should see login page', () => {
    cy.visit('/').title().should('eq', 'Login | Nuber Eats');
  });

  it('can see email / password validation error', () => {
    cy.visit('/');
    cy.findAllByPlaceholderText(/Email/i)
      .type('test@test')
      .get('.text-red-500')
      .should('have.text', 'Please enter a valid email');

    cy.findAllByPlaceholderText(/Email/i)
      .clear()
      .get('.text-red-500')
      .should('have.text', 'Email is required');

    cy.findAllByPlaceholderText(/password/i)
      .type('123456')
      .get('.mb-6 > .text-red-500')
      .should('have.text', 'Password must be at least 8 characters');

    cy.findAllByPlaceholderText(/password/i)
      .clear()
      .get('.mb-6 > .text-red-500')
      .should('have.text', 'Password is required');
  });
  it('can fill out the form adn login', () => {
    // @ts-ignore
    cy.login('cristianjcj355@gmail.com', '123456789');
  });
});
