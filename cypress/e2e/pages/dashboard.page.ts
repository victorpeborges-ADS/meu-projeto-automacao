class DashboardPage {
  // --- CARDS PRINCIPAIS E CTAs ---
  getHealthCardCTA() {
    return cy.get('[data-testid="start-cta"]').first();
  }

  getDentalCardCTA() {
    return cy.get('[data-testid="start-cta"]').eq(1);
  }

  getVisionCardCTA() {
    return cy.get('[data-testid="start-cta"]').eq(2);
  }

  getHealthCard() {
    return cy.get('[data-testid="start-cta"]').first().parent().parent();
  }

  // --- ADDITIONAL CARD ELEMENTS ---
  getCardByIndex(index: number) {
    return cy.get('[data-testid="start-cta"]').eq(index - 1).parent().parent();
  }

  getCardCTAByIndex(index: number) {
    return cy.get('[data-testid="start-cta"]').eq(index - 1);
  }

  // --- UTILITY METHODS ---
  getMainGrid() {
    return cy.get('[data-testid="start-cta"]').first().parent().parent().parent();
  }

  getAllCards() {
    return cy.get('[data-testid="start-cta"]').parent().parent();
  }

  // --- MÉTODOS DE VERIFICAÇÃO ---
  verifyInitialCardsVisible() {
    this.getHealthCardCTA().should("be.visible");
    this.getDentalCardCTA().should("be.visible");
    this.getVisionCardCTA().should("be.visible");
    return this;
  }

  verifyAllCardsAreClickable() {
    cy.get('[data-testid="start-cta"]').should("have.length.at.least", 3);
    cy.get('[data-testid="start-cta"]').each(($cta) => {
      cy.wrap($cta).should("be.visible");
    });
    return this;
  }

  validateCardLinks() {
    cy.get('[data-testid="start-cta"]').each(($cta) => {
      cy.wrap($cta).should("be.visible");
      cy.wrap($cta).should("have.attr", "href").and("not.be.empty");
    });
    return this;
  }

  verifyPageStructure() {
    cy.get('[data-testid="start-cta"]').should("have.length.at.least", 3);
    cy.get('[data-testid="start-cta"]').should("be.visible");
    return this;
  }
}

export const dashboardPage = new DashboardPage();
