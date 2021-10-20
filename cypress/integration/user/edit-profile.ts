describe('Edit Profile', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login('test@test.com', '123456789');
  });

  it('can go to /edit-profile using the header', () => {
    cy.get('a[href="/edit-profile"]').click();
    cy.title().should('eq', 'Edit Profile | Nuber Eats');
  });

  it('can change email', () => {
    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === 'EditProfile') {
        // @ts-ignore
        req.body?.variables?.input?.email = 'test@test.com';
      }
    });
    cy.visit('/edit-profile').get('#email').clear().type('test2@test.com');
    cy.get('.bg-lime-500').click();
  });
});
