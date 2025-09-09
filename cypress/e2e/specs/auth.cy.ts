import { authPage } from '../pages/auth.page';

describe('Auth | Authentication Flows', () => {
  context('Successful Login', () => {
    it('should allow a user to log in via API and access the dashboard', () => {
      cy.loginByApi('YOUR_VALID_EMAIL_HERE', 'YOUR_VALID_PASSWORD_HERE');
      cy.visit('/my/insurance');
      cy.verifyUrl('/my/insurance');
    });
  });

  context('Failed Login & Redirection', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait(1000);
      cy.get('.smallbutton').should('be.visible').click();
    });

    it('should redirect to the sign-up page if the user does not exist', () => {
      authPage.login('non.existent.user@example.com', 'somePassword');
      cy.verifyUrl('/signup');
      cy.contains('Create your Stride account').should('be.visible');
    });
  });
});