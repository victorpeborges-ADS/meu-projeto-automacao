
class AuthPage {
  getEmailField() {
    return cy.get('#email');
  }

  getPasswordField() {
    return cy.get('#password');
  }

  getLoginButton() {
    return cy.element('login-button');
  }

  getSignupLink() {

    return cy.contains('a', `Don't have an account?`);
  }

  getSignupButton() {
   
    return cy.element('signup-button');
  }

  getForgotPasswordLink() {
    return cy.element('forgot-password-link');
  }

  getErrorMessage() {
    return cy.contains('Failed to login. Please try again.');
  }

  typeEmail(email: string) {
    this.getEmailField().type(email, { delay: 50 });
  }

  typePassword(password: string) {
    this.getPasswordField().type(password, { delay: 50 });
  }

  clickLoginButton() {
    this.getLoginButton().click();
  }

  clickSignupLink() {
    this.getSignupLink().click();
  }

  clickSignupButton() {
    this.getSignupButton().click();
  }

  login(email: string, password: string) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickLoginButton();
  }
  signUp(email: string, password: string) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignupButton();
  }

  assertErrorMessage(message: string) {
    this.getErrorMessage().should('be.visible').and('contain.text', message);
  }
}

export const authPage = new AuthPage();