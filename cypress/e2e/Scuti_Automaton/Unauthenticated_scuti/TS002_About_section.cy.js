//Test coverge
//C3132-Validates the welcome video
//C1914-Validates the register now button
//C1915-Validates the back button
//C1916-Validates the register now button redirect

Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
import AboutPage from "../../../POM/Pom_AboutScuti_page.cy";
describe("About scuti", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
    //Entering about section using hamburger menu
    AboutPage.clickHamburgermenu();
    //about Scuti
    AboutPage.clickAboutScuti();

    //TITLE VALIDATION
    cy.contains("About Scuti");

    //SUB TITLE VALIDATION
    cy.contains(
      "Click the button below to create an account today and start earning rewards from any Scuti-partnered video games you play."
    );
  });

  it("Validate Register Now button", () => {
    AboutPage.clickRegisterNowButton();
    // Validations for page url and title of register page
    cy.url().should("eq", "https://staging.run.app.scuti.store/register");
    AboutPage.Register_page_title();
  });

  it("Validate Create Account link", () => {
    AboutPage.clickCreateAccountLink();
    // Validations for page url and title of register page
    cy.url().should("eq", "https://staging.run.app.scuti.store/register");
    AboutPage.Register_page_title();
  });
});
