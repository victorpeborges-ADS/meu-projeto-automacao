declare namespace Cypress {
  interface Chainable {
    element(value: string): Chainable<JQuery<HTMLElement>>;
    verifyUrl(value: string): void;
  }
}

Cypress.Commands.add('element', (value: string) => {
  return cy.get(`[data-testid='${value}']`);
});

Cypress.Commands.add('verifyUrl', (path: string) => {
  return cy.url().should('include', path);
});