class DashboardPage {
  // --- CARDS PRINCIPAIS E CTAs ---
  getHealthCardCTA() {
    return cy.get(':nth-child(1) > .h-full > [data-testid="start-cta"]');
  }

  getDentalCardCTA() {
    return cy.get(':nth-child(2) > .h-full > [data-testid="start-cta"]');
  }

  getVisionCardCTA() {
    return cy.get(':nth-child(3) > .h-full > [data-testid="start-cta"]');
  }

  getHealthCard() {
    return cy.get('.gap-11 > .grid > :nth-child(1) > .h-full');
  }

  // --- FILTROS ---
  getSupplementalFilter() {
    return cy.get('nav > :nth-child(2)');
  }

  getAutoFilter() {
    return cy.get('nav > :nth-child(3)');
  }

  getOthersFilter() {
    return cy.get('nav > :nth-child(4)');
  }
  
  // --- ARTIGOS / CONTEÚDO PÓS-FILTRO ---
  getLifeInsuranceCardButton() {
    return cy.get(':nth-child(1) > .h-full > .justify-center');
  }

  getDisabilityInsuranceCardButton() {
    return cy.get(':nth-child(2) > .h-full > .justify-center');
  }

  getArticlesContainer() {
    return cy.get('.gap-11 > .grid');
  }

  // --- MÉTODOS DE VERIFICAÇÃO ---
  verifyInitialCardsVisible() {
    this.getHealthCardCTA().should('be.visible');
    this.getDentalCardCTA().should('be.visible');
    this.getVisionCardCTA().should('be.visible');
    return this;
  }

  verifySupplementalCardsVisible() {
    this.getLifeInsuranceCardButton().should('be.visible');
    this.getDisabilityInsuranceCardButton().should('be.visible');
    return this;
  }

  validateArticleLinks() {
    this.getArticlesContainer().find('a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href').and('not.be.empty');
    });
    return this;
  }

  validateInsuranceCardLinks() {
    this.getLifeInsuranceCardButton()
      .parents('a')
      .should('have.attr', 'href')
      .and('not.be.empty');
    
    this.getDisabilityInsuranceCardButton()
      .parents('a')
      .should('have.attr', 'href')
      .and('not.be.empty');
    
    return this;
  }
}

export const dashboardPage = new DashboardPage();