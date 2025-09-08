declare namespace Cypress {
  interface Chainable {
    element(value: string): Chainable<JQuery<HTMLElement>>;
    verifyUrl(value: string): void;
    loginByApi(email: string, password: string): void;
  }
}

Cypress.Commands.add('element', (value: string) => {
  return cy.get(`[data-testid='${value}']`);
});

Cypress.Commands.add('verifyUrl', (path: string) => {
  return cy.url().should('include', path);
});

Cypress.Commands.add('loginByApi', (email, password) => {
  cy.session([email, password], () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      body: { email, password },
    });
  });
});