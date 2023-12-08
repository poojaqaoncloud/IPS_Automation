class SignUpPage {
  Hamburger_menu() {
    return cy.get(".align-center > .w-auto.cursor-pointer");
  }
  Enter_loginpage() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > a:nth-child(3)"
    );
  }
  CreateAccount_link() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(2)"
    );
  }
  createAccountButton() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > button:nth-child(2)"
    );
  }
  fullNameField() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)"
    );
  }
  fullNameField_Error_message() {
    cy.get(".disclaimer.mt-2.text-red");
  }
  emailField() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(1)"
    );
  }
  emailField_warning() {
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)"
    );
  }
  genderField() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)"
    );
  }
  genderFieldList() {
    return cy
      .get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > ul:nth-child(2)"
      )
      .as("list");
  }
  yearOfBirth() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2)"
    );
  }
  warning_message() {
    return cy.get("p.disclaimer.mt-2.text-red");
  }
  passwordField() {
    return cy
      .get("div.relative.flex.w-full.flex-grow.flex-row.items-center")
      .eq(4);
  }
  passwordFieldEye() {
    return cy
      .get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2)"
      )
      .find("svg");
  }
  passwordFieldValue() {
    return cy.get("input[placeholder='Your Password'][value='12345678']");
  }
  confirmPassword() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > input:nth-child(1)"
    );
  }
  PromoCodeField() {
    return cy.get('input[name="input-Promo Code"]');
  }
  Alertmessage() {
    return cy.get("div[role='alert']");
  }
  backButton() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > button:nth-child(1) > span:nth-child(2)"
    );
  }
  backButton_signup_page() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1)"
    );
  }

  //to interact with gender field list
  selectGenderByIndex() {
    this.genderFieldList()
      .find("li")
      .each(($element, index) => {
        console.log($element);

        // Click on the GENDER list item based on its index
        cy.get("@list").find("li").eq(index).click({ force: true });
        cy.get(
          "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)"
        ).click();
      });
  }
}
export default new SignUpPage();
