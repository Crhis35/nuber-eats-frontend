describe('Create Account', () => {
  it('Should see email / password validation errors', () => {
    cy.visit('/').get('.text-blue-500').click();
    cy.get('#email')
      .type('test@tes')
      .get('.text-red-500')
      .should('have.text', 'Please enter a valid email')
      .get('#password')
      .type('test')
      .get('.mb-6 > .text-red-500')
      .should('have.text', 'Password must be at least 8 characters');
  });
  it('should be able to create account and login', () => {
    cy.intercept('http://localhost:4000/graphql', (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === 'CreateAccountMutation') {
        req.reply((res) => {
          res.send({
            fixture: 'auth/create-account.json',
          });
        });
      }
    });
    cy.visit('/create-account')
      .get('#email')
      .type('test@test.com')
      .get('#password')
      .type('123456789')
      .get('.bg-lime-500')
      .click();
    cy.wait(1000);

    cy.title().should('eq', 'Log In | Nuber Eats');

    // @ts-ignore
    cy.login('test@test.com', '123456789');
    // @ts-ignore
    cy.assertLoggedIn();
  });
});
