declare namespace Cypress {
  interface Chainable {
    element(value: string): Chainable<JQuery<HTMLElement>>;
    verifyText(value: string): void;
    verifyUrl(value: string): void;
    checkInputFieldValueAndRetypeIfNeeded(value: string): Chainable<any>;
    apiAuth(email: string, password: string): void;
  }
}

Cypress.Commands.add('element', (value: string) => {
  return cy.get(`[data-testid='${value}']`);
});

Cypress.Commands.add('verifyText', (text: string) => {
  return cy.contains(text).should('be.visible');
});

Cypress.Commands.add('verifyUrl', (path: string) => {
  return cy.url().should('include', path);
});

Cypress.Commands.add('checkInputFieldValueAndRetypeIfNeeded', { prevSubject: 'element' }, (subject, value) => {
  cy.wrap(subject)
    .invoke('attr', 'value')
    .then((attrValue) => {
      if (attrValue !== value) {
        cy.wrap(subject).clear().type(value);
        cy.wrap(subject)
          .invoke('attr', 'value')
          .then((newAttrValue) => {
            expect(newAttrValue).to.equal(value);
          });
      } else {
        expect(attrValue).to.equal(value);
      }
    });
});

Cypress.Commands.add('apiAuth', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}/auth/login`,
    body: {
      email: email,
      password: password,
    },
  }).its('status').should('eq', 200);
});