//TEST COVERAGE
//C1958-C1960- validates secanrios for signup field
import SignUpPage from "../../../POM/Pom_Signuppage.cy";
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});

describe("signup already registerd mail", () => {
  beforeEach(() => {
    //visiting scuti staging application
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
    SignUpPage.Hamburger_menu().should("be.visible").click(); //Hamburger menu
    SignUpPage.Enter_loginpage().click(); //login
    SignUpPage.CreateAccount_link().should("be.visible").click(); //create account button
    cy.contains("Welcome to Scuti"); //title
    cy.contains("Log In to the Shopping Experience");
  });
  it("signup_page_positive_cases", () => {
    // Load fixture data
    cy.fixture("Singup_page").then((userData) => {
      // CREATE ACCOUNT BUTTON
      SignUpPage.createAccountButton()
        .scrollIntoView()
        .should("be.visible")
        .should("have.attr", "disabled");

      // FULL NAME BUTTON
      SignUpPage.fullNameField().type(userData.fullName);

      //Used Email to sign in

      SignUpPage.emailField().type(userData.usedEmail);

      // GENDER FIELD
      SignUpPage.genderField().click();
      SignUpPage.selectGenderByIndex();
      SignUpPage.genderField().click();

      // YEAR OF BIRTH FIELD
      SignUpPage.yearOfBirth().type(userData.yearOfBirth);

      // PASSWORD FIELD
      SignUpPage.passwordField().click().type(userData.password);

      // EYE ICON ON PASSWORD FIELD
      SignUpPage.passwordFieldEye().click();
      cy.wait(5000);
      SignUpPage.passwordFieldValue().should("be.visible");

      // CONFIRM PASSWORD FIELD
      SignUpPage.confirmPassword().type(userData.password);

      // CHECK FOR PROMO CODES
      // Promo code field - Invalid
      SignUpPage.PromoCodeField()
        .should("be.visible")
        .first()
        .type(userData.promoCodeInvalid);

      // CREATE ACCOUNT BUTTON
      SignUpPage.createAccountButton().click();

      // ALERT MESSAGE FOR INVALID PROMO CODE
      SignUpPage.Alertmessage().should("have.text", "user already exists");

      // Positive scenario for promo codes
      SignUpPage.PromoCodeField()
        .should("be.visible")
        .first()
        .clear()
        .type(userData.promoCodeValid);

      SignUpPage.createAccountButton().click();
    });
  });
  it("other links in signup page", () => {
    cy.contains("a", "View Policy")
      .scrollIntoView()
      .should("be.visible")

      .click(); //view policy
    cy.url().should(
      "contain",
      "https://staging.run.app.scuti.store/legal/terms-and-conditions"
    );
    SignUpPage.backButton().should("be.visible").click(); //BackBuuton

    SignUpPage.backButton_signup_page().should("be.visible").click();
    cy.url().should("contain", "https://staging.run.app.scuti.store/welcome");
  });
});
