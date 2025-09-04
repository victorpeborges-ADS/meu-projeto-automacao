import { authPage } from '../pages/auth.page';

describe('Auth | Authentication Flows', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.smallbutton').click();
    authPage.getEmailField().should('be.visible').and('be.enabled');
  });

  it('should successfully log in with valid credentials', () => {
    authPage.login('test+dash+may16@email.com', 'Test1234!');
    cy.verifyUrl('/my/insurance');
  });

  it('should display an error message with invalid credentials', () => {
    authPage.login('invalid.user@example.com', 'wrongPassword');

    cy.get('body').invoke('html').then((html) => {
      cy.log('HTML of the page at the moment of error:', html);
    });
  });
});

