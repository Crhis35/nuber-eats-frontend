// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('assertLoggedIn', () => {
  cy.window()
    .its('localStorage')
    .invoke('getItem', 'nuber-token')
    .should('be.a', 'string');
});
Cypress.Commands.add('assertLoggedOut', () => {
  cy.window()
    .its('localStorage')
    .invoke('getItem', 'nuber-token')
    .should('be.null');
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  //@ts-ignore
  cy.assertLoggedOut();

  cy.findAllByPlaceholderText(/Email/i).type(email);

  cy.findAllByPlaceholderText(/password/i)
    .type(password)
    .get('.bg-lime-500')
    .should('not.have.class', 'pointers-events-none')
    .click();
  //@ts-ignore
  cy.assertLoggedIn();
});
