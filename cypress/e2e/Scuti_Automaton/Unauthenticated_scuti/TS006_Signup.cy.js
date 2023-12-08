//TEST COVERAGE
//C1943-validates Sign Up section remains greyed out and unresponsive without filling mandatory field
//C1944- validates full name field(negative)
//C1945- validates full name field(positive)
//C1946- validates Your Email" field(negative)
//C1947- validates Your Email" field(postive)
//C1948- validates Selecting a Gender
//C1950-C1957-validates other sign up fields
//C1961-C1963-validates other sign up fields
import SignUpPage from "../../../POM/Pom_Signuppage.cy";
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
describe("signup", () => {
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

      //Generating a random Email to sign in
      const randomEmail = `user_${Math.floor(
        Math.random() * 1000
      )}@example.com`;
      SignUpPage.emailField().type(randomEmail);

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
      SignUpPage.Alertmessage().should("have.text", "invalid promo code");

      // Positive scenario for promo codes
      SignUpPage.PromoCodeField()
        .should("be.visible")
        .first()
        .clear()
        .type(userData.promoCodeValid);

      SignUpPage.createAccountButton().click();
    });
  });
  it("signup_page_negative_cases", () => {
    SignUpPage.fullNameField().type("suryak"); // full name field

    //WARNING WHILE ENTERNING INVALID NAME
    SignUpPage.warning_message()
      .eq(0)
      .click()
      .should("have.text", "Full name is not correct");

    //WARNING WHILE ENTERNING INVALID MAIL

    SignUpPage.emailField().type("suryaqacloud.com"); //email field
    SignUpPage.warning_message()
      .eq(1)
      .click()
      .should("have.text", "Email is incorrect"); //email warning message

    //WARNING WHILE ENTERNING INVALID YEAR
    SignUpPage.yearOfBirth().type(1930);
    SignUpPage.warning_message()
      .eq(2)
      .click()
      .should("have.text", "Must be in yyyy format"); //year field validation
    SignUpPage.yearOfBirth().type(2010);
    SignUpPage.warning_message()
      .eq(2)
      .click()
      .should("have.text", "Must be in yyyy format"); //year field validation

    //WARNING WHILE PASSWORD ARE NOT MATCHING

    SignUpPage.passwordField().click().type(1234);
    SignUpPage.warning_message()
      .eq(3)
      .click()
      .should("have.text", "Password must have 8 or more characters"); //passwprd field validation

    SignUpPage.confirmPassword().type(12345678); //confirm password
    SignUpPage.warning_message()
      .eq(4)
      .click()
      .should("have.text", "Password must match");
    SignUpPage.createAccountButton().should("have.attr", "disabled");
  });
});
