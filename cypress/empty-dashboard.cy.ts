describe('Dashboard in Empty State Validation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display main cards with correct text and attributes', () => {
    cy.get('[data-cy="container-vazio"]').should('be.visible');
    cy.get('[data-cy="texto-principal-vazio"]').should('be.visible');
    cy.get('[data-cy="texto-principal-vazio"]').should('have.text', "Welcome back! Let's get you logged in.");
    cy.get('[data-cy="link-plano-premium"]').should('have.attr', 'href');
    cy.get('[data-cy="link-plano-premium"]').click();
    cy.url().should('include', '/artigos/plano-premium');
  });
});