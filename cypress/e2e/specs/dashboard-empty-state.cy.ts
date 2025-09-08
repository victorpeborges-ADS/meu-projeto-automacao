import { authPage } from '../pages/auth.page';
import { dashboardPage } from '../pages/dashboard.page';

describe('Dashboard | Empty State for New User', () => {
  beforeEach(() => {
    const userEmail = `test.user.${Date.now()}@example.com`;
    const userPassword = 'ValidPassword12-!';

    cy.intercept('POST', '**/graphql').as('graphqlRequest');
    
    cy.visit('/');
    cy.wait(1000); 
    cy.get('.smallbutton').should('be.visible').and('be.enabled').click();

    authPage.clickSignupLink();
    
  
    authPage.typeEmail(userEmail);
    authPage.getEmailField().should('have.value', userEmail); 

    authPage.typePassword(userPassword);
    
    authPage.clickSignupButton();
    
    cy.wait('@graphqlRequest');
    cy.verifyUrl('/my/insurance');
  });

  it('should display all dashboard cards correctly', () => {
    dashboardPage.getHealthCardCTA().should('be.visible');
    dashboardPage.getDentalCardCTA().should('be.visible');
    dashboardPage.getVisionCardCTA().should('be.visible');
  });

  it('should display correct articles when Health Coverage card is clicked', () => {
    dashboardPage.getHealthCard().click();
  });
});