//TEST COVERAGE
//C1924-validate Logo and blue text Scuti
//C1925-validate scuti coin icon
//C1926-validate shopping cartt icon
//C1913- validate hamburger menu
import HeaderPage from "../../../POM/Pom_Header.cy";

Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
describe("Header scuti", () => {
  beforeEach(() => {
    //visiting scuti staging application
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
  });

  it("should handle the header cart", () => {
    //Scuti logo
    HeaderPage.scuti_logo();
    HeaderPage.clickCartIcon();
    cy.url().should("include", "https://staging.run.app.scuti.store/welcome");
    HeaderPage.Welcome_page_title();
    HeaderPage.click_continuetostore();
  });

  it("should handle the header Scuti wallet", () => {
    cy.wait(5000);
    HeaderPage.clickScutiWalletIcon();
    cy.url().should("include", "https://staging.run.app.scuti.store/welcome");
    HeaderPage.Welcome_page_title();
    HeaderPage.click_continuetostore();
  });

  it("should handle the header hamburger menu", () => {
    HeaderPage.clickHamburgerMenuIcon();
    HeaderPage.validateHamburgerMenuContents();
  });
});
