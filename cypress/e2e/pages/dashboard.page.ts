class DashboardPage {
  getHealthCard() {
    return cy.get('.gap-11 > .grid > :nth-child(1) > .h-full');
  }

  getHealthCardCTA() {
    return cy.get(':nth-child(1) > .h-full > [data-testid="start-cta"]');
  }

  getDentalCardCTA() {
    return cy.get(':nth-child(2) > .h-full > [data-testid="start-cta"]');
  }

  getVisionCardCTA() {
    return cy.get(':nth-child(3) > .h-full > [data-testid="start-cta"]');
  }
}

export const dashboardPage = new DashboardPage();