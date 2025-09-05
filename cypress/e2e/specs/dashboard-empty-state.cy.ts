import { authPage } from '../pages/auth.page';
import { dashboardPage } from '../pages/dashboard.page';

describe('Dashboard | Empty State for New User', () => {
  beforeEach(() => {
    const userEmail = `test.user.${Date.now()}@example.com`;

    cy.visit('/');

   
    cy.get('.smallbutton').should('be.visible').and('be.enabled');
   
    cy.get('.smallbutton').click();

    authPage.clickSignupLink();
    authPage.signUp(userEmail, 'ValidPassword123!');
    cy.verifyUrl('/my/insurance');
  });

  it('should display all dashboard cards and static text correctly', () => {
  
  });

  it('should display correct articles when "Supplemental" card is clicked', () => {
    
  });

  it('should display correct articles when "Auto" card is clicked', () => {
    
  });

  it('should display correct articles when "Others" card is clicked', () => {
  
  });
});