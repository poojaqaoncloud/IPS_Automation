//TEST COVERAGE
//C397-Validates Skip for now button
//C1964-Validates Resend email button
//C1965-Validates Verify email button
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
import SignupPage from "../../../POM/Pom_Checkmail_page.cy";
describe("signup", () => {
  beforeEach(() => {
    //visiting scuti staging application
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
    SignupPage.clickHamburgermenu(); //Hamburger menu
    SignupPage.clickLoginButton(); //login
    SignupPage.clickCreateAccountButton_loginpage(); //create account button
    cy.contains("Welcome to Scuti"); //title
    cy.contains("Log In to the Shopping Experience");
  });
  it("check email page", () => {
    SignupPage.scrollIntoViewCreateAccountButton();
    SignupPage.inputFullName("suryak qaoncloud");
    SignupPage.inputRandomEmail();
    SignupPage.selectGender();
    SignupPage.inputYearOfBirth("2001");
    SignupPage.inputPassword("12345678");
    SignupPage.clickEyeIconOnPassword();
    SignupPage.inputConfirmPassword("12345678");

    // Positive scenario for promo codes
    SignupPage.inputPromoCode("QATEST2023");
    SignupPage.clickCreateAccountButton();
    cy.wait(5000);
    SignupPage.clickIVerifiedMyAccountButton();
    SignupPage.emailIsNotVerifiedCheck();
    SignupPage.clickResendEmailButton();
    SignupPage.clickSkipForNowButton();

    // Validate the URL pattern
    const urlPattern = /^https:\/\/staging\.run\.app\.scuti\.store\//;
    cy.url().should("match", urlPattern);
  });
});
