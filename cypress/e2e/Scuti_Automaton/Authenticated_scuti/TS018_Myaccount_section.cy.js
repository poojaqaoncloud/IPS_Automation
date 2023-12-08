import HeaderPage from "../../../POM/Pom_Header.cy";
import Cart from "../../../POM/Pom_Cart.cy";
import myAccount_section from "../../../POM/Pom_MyAccount_section";
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
describe("Check My Account Section", { testIsolation: false }, () => {
  before(() => {
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
    HeaderPage.clickHamburgerMenuIcon();

    //login option
    Cart.login_button().scrollIntoView().should("be.visible").click();
    cy.Login("surya@qaoncloud.com", "Test@123");
  });
  it("Check My Account Section_options", () => {
    HeaderPage.clickHamburgerMenuIcon();
    HeaderPage.myAccount_section().should("be.visible").click({ force: true });
    myAccount_section.Myaccount_menuoptions().should("be.visible");
    myAccount_section.validateMenuOptions();
    myAccount_section.LogoutOption();
    myAccount_section.DeleteAccountOption();
  });
  it("Check edit name and age negative ", () => {
    cy.viewport(1500, 900); // Width, Height
    myAccount_section.EditNameAndAge_Title();
    myAccount_section.EditNameAndAge_Fields();
    //this secenario is for checking empty first name and last name
    myAccount_section.Fullname_field().should("be.visible").clear();
    myAccount_section.Fullname_field_validation().should("be.visible");
    //this secenario is for checking first name and last name
    myAccount_section.Fullname_field().clear().type("suryatesting");
    myAccount_section.Fullname_field_validation().should("be.visible");
    myAccount_section
      .DateOfBirth_field()
      .should("be.visible")
      .clear()
      .type("30/");
    myAccount_section.field_validation_Dob().should("be.visible");
    myAccount_section.Year_field().should("be.visible").clear();
    myAccount_section.Year_field_validation1();
    myAccount_section.Year_field().should("be.visible").type("1939");
    myAccount_section.Year_field_validation();
    myAccount_section.Year_field().should("be.visible").type("1939");
    myAccount_section.Year_field_validation();
    myAccount_section.SubmitButton().should("have.attr", "disabled");
  });
  it("Check edit name and age positive ", () => {
    cy.viewport(1500, 900); // Width, Height

    myAccount_section.Fullname_field().clear().type("surya testing");
    myAccount_section
      .DateOfBirth_field()
      .should("be.visible")
      .clear()
      .type("12/07");
    //regular expression to check date format
    const validDateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
    myAccount_section
      .DateOfBirth_field()
      .invoke("val")
      .should("match", validDateFormat);
    myAccount_section.Year_field().should("be.visible").clear().type("2000");
    myAccount_section.genderField().should("be.visible").click();
    myAccount_section.selectGenderByIndex();
    myAccount_section.genderField().click();
    myAccount_section.SubmitButton().should("be.visible").click();
    cy.wait(1000);
    myAccount_section.Sucess_message().should("be.visible");
    myAccount_section.backButton().should("be.visible").click();
  });
});
