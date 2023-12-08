//TEST COVERAGE
//C1917-validates opening legal section through hamburger menu
//C1918-validates privacy policy menu option
//C1919-validates Terms and conditon menu option
//C1920-validates back button
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
import legalPage from "../../../POM/Pom_Legal.cy";
describe("example test suite", { testIsolation: false }, () => {
  before(() => {
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
  });

  it("Handle legal section - Terms & Conditions", () => {
    legalPage.clickHamburgerMenu();
    legalPage.clickTermsAndConditionsLink();
    cy.contains("Terms & Conditions");
    cy.url().should(
      "contain",
      "https://staging.run.app.scuti.store/legal/terms-and-conditions"
    );
    //+ mark to maximize
    legalPage
      .maximizeIcon_TermsandCondition()
      .find("svg")
      .each((svg) => {
        cy.get(svg).click();
      });
    cy.wait(5000);
    //- mark to minimize
    legalPage
      .minimizeIcon_TermsandCondition()
      .find("svg")
      .each((svg) => {
        cy.get(svg).click();
      });
  });

  it("Handle legal section - Privacy Policy", () => {
    legalPage.clickPrivacyPolicyLink(); // Change to clickPrivacyPolicyLink if needed
    cy.contains("Privacy & Policy"); // title

    //url validation
    cy.url().should(
      "contain",
      "https://staging.run.app.scuti.store/legal/privacy-policy"
    );

    //+ mark to maximize
    legalPage
      .maximize_Icon_privacyPolicy()
      .find("svg")
      .each((svg) => {
        cy.get(svg).click();
      });
    cy.wait(5000);
    //- mark to minimize
    legalPage
      .minimize_Icon_privacyPolicy()
      .find("svg")
      .each((svg) => {
        cy.get(svg).scrollIntoView().click();
      });
    //back button
    legalPage.back_button().click();
  });
});
