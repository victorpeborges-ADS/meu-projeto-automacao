import { authPage } from '../pages/auth.page';

describe('Auth | Authentication Flows', () => {
  context('API Login for Authenticated Routes', () => {
    beforeEach(() => {
      cy.loginByApi('test+dash+may16@email.com', 'Test1234!');
      cy.visit('/my/insurance');
    });

    it('should successfully log in via API and access a protected page', () => {
      cy.verifyUrl('/my/insurance');
      cy.get('h1').should('be.visible');
    });
  });

  context('UI Login for Error States', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('.smallbutton').click();
      authPage.getEmailField().should('be.visible');
    });

    it('should redirect to the sign-up page if the user does not exist', () => {
      authPage.login('a.new.user@example.com', 'somePassword');
      cy.verifyUrl('/signup');
      cy.contains('Create your Stride account').should('be.visible');
    });
  });
});