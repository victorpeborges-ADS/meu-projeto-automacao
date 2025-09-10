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

    it("should display supplemental articles and validate their links", () => {
      // O clique em "Health Coverage" foi removido daqui
      dashboardPage.getSupplementalFilter().should("be.visible").click();
      cy.wait("@graphqlRequest", { timeout: 10000 });
      dashboardPage.verifySupplementalCardsVisible();
      dashboardPage.validateInsuranceCardLinks();
    });

    it("should display auto articles and validate their links", () => {
      cy.intercept("POST", "**/graphql").as("graphqlRequest");
      dashboardPage.getAutoFilter().should("be.visible").click();
      cy.wait("@graphqlRequest", { timeout: 10000 });
      dashboardPage.validateArticleLinks();
    });

    it("should display others articles and validate their links", () => {
      cy.intercept("POST", "**/graphql").as("graphqlRequest");
      dashboardPage.getOthersFilter().click();
      cy.wait("@graphqlRequest");
      dashboardPage.getArticlesContainer().should("be.visible");
      dashboardPage
        .getArticlesContainer()
        .find("a")
        .each(($link) => {
          cy.wrap($link).should("have.attr", "href").and("not.be.empty");
        });
    });

    it("should handle navigation between different filters", () => {
      cy.intercept("POST", "**/graphql").as("graphqlRequest");
      dashboardPage.getSupplementalFilter().should("be.visible").click();
      cy.wait("@graphqlRequest", { timeout: 10000 });
      dashboardPage.verifySupplementalCardsVisible();

      cy.intercept("POST", "**/graphql").as("graphqlRequest");
      dashboardPage.getAutoFilter().should("be.visible").click();
      cy.wait("@graphqlRequest", { timeout: 10000 });
      dashboardPage.getArticlesContainer().should("be.visible");

      cy.reload();
      
      cy.intercept("POST", "**/graphql").as("graphqlRequest");
      dashboardPage.verifyInitialCardsVisible();
    });
  }
);