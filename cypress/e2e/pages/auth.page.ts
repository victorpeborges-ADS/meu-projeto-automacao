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
    return cy.element('signup-link');
  }

  getForgotPasswordLink() {
    return cy.element('forgot-password-link');
  }

  getErrorMessage() {
    return cy.element('error-message');
  }

  typeEmail(email: string) {
    this.getEmailField().type(email);
  }

  typePassword(password: string) {
    this.getPasswordField().type(password);
  }

  clickLoginButton() {
    this.getLoginButton().click();
  }

  login(email: string, password: string) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickLoginButton();
  }

  assertErrorMessage(message: string) {
    this.getErrorMessage().should('be.visible').and('contain.text', message);
  }
}

export const authPage = new AuthPage();