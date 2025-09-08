class AuthPage {
  getEmailField() {
    return cy.get('#email');
  }

  getPasswordField() {
    return cy.get('#password');
  }

  getLoginButton() {
    return cy.get('button[type="submit"]').contains('Log In');
  }

  getSignupLink() {
    return cy.contains('a', `Don't have an account?`);
  }

  getSignupButton() {
    return cy.contains('button', 'Sign Up');
  }

  getErrorMessage() {
    return cy.contains('Failed to login. Please try again.');
  }

  typeEmail(email: string) {
    this.getEmailField().type(email, { force: true });
  }

  typePassword(password: string) {
    this.getPasswordField().type(password, { force: true });
  }

  clickLoginButton() {
    this.getLoginButton().click({ force: true });
  }

  clickSignupLink() {
    this.getSignupLink().click();
  }

  clickSignupButton() {
    this.getSignupButton().click({ force: true });
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