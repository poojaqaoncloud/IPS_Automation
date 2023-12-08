class SignupPage {
  // Locators
  createAccountButton() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > button:nth-child(2)"
    );
  }

  fullNameInput() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)"
    );
  }

  emailInput() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)"
    );
  }

  genderField() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)"
    );
  }
  genderField_values() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(2)"
    );
  }
  genderField_svg() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)"
    );
  }
  yearOfBirthInput() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2)"
    );
  }

  passwordInput() {
    return cy
      .get("div.relative.flex.w-full.flex-grow.flex-row.items-center")
      .eq(4);
  }

  eyeIconOnPasswordField() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2)"
    );
  }

  confirmPasswordInput() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > input:nth-child(1)"
    );
  }

  promoCodeInput() {
    return cy.get('input[name="input-Promo Code"]').first();
  }

  iVerifiedMyAccountButton() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > button:nth-child(1)"
    );
  }
  emailIsNotVerified() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    );
  }
  resendEmailButton() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > button:nth-child(2)"
    );
  }

  skipForNowButton() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > a:nth-child(3)"
    );
  }

  // Methods for performing actions
  scrollIntoViewCreateAccountButton() {
    this.createAccountButton()
      .scrollIntoView()
      .should("be.visible")
      .should("have.attr", "disabled");
  }

  inputFullName(fullName) {
    this.fullNameInput().scrollIntoView().should("be.visible").type(fullName);
  }

  inputRandomEmail() {
    const randomEmail = `use_${Math.floor(Math.random() * 1000)}@example.com`;
    this.emailInput().should("be.visible").type(randomEmail);
  }

  selectGender() {
    this.genderField().should("be.visible").click();
    this.genderField_values().as("list");
    cy.get("@list")
      .find("li")
      .each(($element, index) => {
        console.log($element);

        // Click on the GENDER list item based on its index
        cy.get("@list").find("li").eq(index).click({ force: true });
        this.genderField().click();
      });
    this.genderField_svg().should("be.visible").click();
  }

  inputYearOfBirth(yearOfBirth) {
    this.yearOfBirthInput().should("be.visible").type(yearOfBirth);
  }

  inputPassword(password) {
    this.passwordInput().should("be.visible").click().type(password);
  }

  clickEyeIconOnPassword() {
    this.eyeIconOnPasswordField().find("svg").should("be.visible").click();
  }

  inputConfirmPassword(password) {
    this.confirmPasswordInput().should("be.visible").type(password);
  }

  inputPromoCode(promoCode) {
    this.promoCodeInput().should("be.visible").first().clear().type(promoCode);
  }

  clickCreateAccountButton() {
    this.createAccountButton().should("be.visible").click();
  }

  clickIVerifiedMyAccountButton() {
    this.iVerifiedMyAccountButton().should("be.visible").click();
    cy.wait(5000);
  }
  emailIsNotVerifiedCheck() {
    this.emailIsNotVerified().should("contain", "email is not verified");
  }
  clickResendEmailButton() {
    this.resendEmailButton().should("be.visible").click();
  }

  clickSkipForNowButton() {
    this.skipForNowButton().should("be.visible").click();
  }

  // Additional methods for validations
  clickHamburgermenu() {
    cy.get(".align-center > .w-auto.cursor-pointer")
      .should("be.visible")
      .click(); //hamburger menu
  }
  clickLoginButton() {
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > a:nth-child(3)"
    )
      .should("be.visible")
      .click();
  }
  clickCreateAccountButton_loginpage() {
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(2)"
    )
      .should("be.visible")
      .click();
  }
}

export default new SignupPage();
