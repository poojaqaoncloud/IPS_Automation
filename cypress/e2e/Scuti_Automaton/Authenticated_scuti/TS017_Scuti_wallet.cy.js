import HeaderPage from "../../../POM/Pom_Header.cy";
import Cart from "../../../POM/Pom_Cart.cy";
import ScutiWallet from "../../../POM/Pom_scuti_wallet.cy";
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
describe("Check cart ", { testIsolation: false }, () => {
  before(() => {
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
    HeaderPage.clickHamburgerMenuIcon();

    //login option
    Cart.login_button().scrollIntoView().should("be.visible").click();
    cy.Login();
  });
  it("Scuti wallet section", () => {
    HeaderPage.clickHamburgerMenuIcon();
    HeaderPage.Scuti_wallet().should("be.visible").click();
    cy.wait(20000);
    cy.viewport(1500, 900); // Width, Height
    ScutiWallet.X_icon().should("be.visible").click({ force: true }); //x icon for add
    ScutiWallet.transaction_Icon().should("be.visible").click({ force: true }); // transactions icon
    cy.url().should(
      "contain",
      "https://staging.run.app.scuti.store/transactions"
    );
    Cart.scuti_logo().should("be.visible").click({ force: true });
  });
  it("Access scuti store through header menu", () => {
    cy.viewport(1500, 900); // Width, Height
    HeaderPage.clickScutiWalletIcon();
    //here we do not close the ad to check whether it closes automatically
    cy.wait(32000);
    ScutiWallet.transaction_Icon().should("be.visible");
  });
});
