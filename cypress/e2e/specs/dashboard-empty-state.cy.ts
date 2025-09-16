import { authPage } from "../pages/auth.page";
import { dashboardPage } from "../pages/dashboard.page";

describe(
  "Dashboard | Empty State for New User",
  { testIsolation: false },
  () => {
    before(() => {
      const randomNumber = Math.floor(Math.random() * 1000000);
      const userEmail = `test.user.${randomNumber}@example.com`;
      const userPassword = "ValidPassword12-!";

      cy.intercept("POST", "**/graphql").as("graphqlRequest");

      cy.visit("/");
      cy.wait(1000);

      cy.get(".smallbutton").should("be.visible").and("be.enabled").click();
      authPage.clickSignupLink();

      cy.wait(500);
      authPage.typeEmail(userEmail);
      authPage.getEmailField().should("have.value", userEmail);

      authPage.typePassword(userPassword);

      authPage.clickSignupButton();

      cy.wait("@graphqlRequest");
      cy.verifyUrl("/my/insurance");
    });

    it("should display initial benefit cards correctly", () => {
      dashboardPage.verifyInitialCardsVisible();
    });

    it("should display health card and validate its functionality", () => {
      dashboardPage.getHealthCardCTA().should("be.visible");
      dashboardPage.getHealthCard().should("be.visible");
    });

    it("should display dental card and validate its functionality", () => {
      dashboardPage.getDentalCardCTA().should("be.visible");
    });

    it("should display vision card and validate its functionality", () => {
      dashboardPage.getVisionCardCTA().should("be.visible");
    });

    it("should validate all initial cards are present and functional", () => {
      dashboardPage.verifyInitialCardsVisible();
      dashboardPage.verifyPageStructure();
      dashboardPage.verifyAllCardsAreClickable();
    });

    it("should validate card links and navigation", () => {
      dashboardPage.validateCardLinks();
    });
  }
);