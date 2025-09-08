class AuthPage {
  getEmailField() {
    return cy.get('#email');
  }

  getPasswordField() {
    return cy.get('#password');
  }

  getSignupLink() {
    return cy.contains('a', `Don't have an account?`);
  }

  getSignupButton() {
    return cy.contains('button', 'Sign Up');
  }

  typeEmail(email: string) {
    this.getEmailField().type(email, { force: true });
  }

  typePassword(password: string) {
    this.getPasswordField().type(password, { force: true });
  }
  
  clickSignupLink() {
    this.getSignupLink().click();
  }

  clickSignupButton() {
    this.getSignupButton().click({ force: true });
  }
}

export const authPage = new AuthPage();