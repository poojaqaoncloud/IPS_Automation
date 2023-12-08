import HeaderPage from "../../../POM/Pom_Header.cy";
import Cart from "../../../POM/Pom_Cart.cy";
import myOrder from "../../../POM/Pom_Myorders.cy";
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
    cy.Login("surya@qaoncloud.com", "Test@123");
  });
  it("My orders section-Active orders", () => {
    HeaderPage.clickHamburgerMenuIcon();

    Cart.myOrders_option().should("be.visible").click();
    cy.get(".flex.grow.flex-col.overflow-y-auto")
      .find("*") // This Checks whther it has any active ordrs or not
      .then((childElement) => {
        cy.log(childElement);
        // Perform actions on each child element
        if (
          childElement.hasClass("mt-4 flex flex-col items-center space-y-2")
        ) {
          cy.log("Active order exists!");
          cy.get(
            "body div div div div div div div:nth-child(1) div:nth-child(2) div:nth-child(3) div:nth-child(2) a:nth-child(1) button:nth-child(1)"
          )
            .eq(0)
            .should("be.visible")
            .click();
          // myOrder.Order_details().should("be.visible");
          myOrder.validateTrackingnumber();
          myOrder.validateOrderTotal();
          myOrder.validateDeliveryAddress();
          myOrder.Back_button().should("be.visible").click();
        } else {
          cy.log("No active orders");
          cy.get(".flex.flex-col.items-center");
          cy.get(".mb-4.mt-9.font-bold").should(
            "contain",
            "Your Don’t Have Pending Orders"
          );
        }
      });
  });
  it("My orders section-past orders section", () => {
    cy.viewport(1500, 900); // Width, Height
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(2)"
    )
      .should("be.visible")
      .click({ force: true });
    cy.wait(5000);

    cy.get(".flex.grow.flex-col.overflow-y-auto")
      .find("*") // This selects all direct children of the parent element
      .then((childElement) => {
        cy.log(childElement);
        // Perform actions on each child element
        if (
          childElement.hasClass("mt-4 flex flex-col items-center space-y-2")
        ) {
          cy.log("Active order exists!");
          cy.get(
            "body div div div div div div div:nth-child(1) div:nth-child(2) div:nth-child(3) div:nth-child(2) a:nth-child(1) button:nth-child(1)"
          )
            .eq(0)
            .should("be.visible")
            .click();
        } else {
          cy.log("No active orders");
          cy.get(".flex.flex-col.items-center");
          cy.get(".mb-4.mt-9.font-bold").should(
            "contain",
            "Your Don’t Have Pending Orders"
          );
        }
      });
    //Back button
    cy.get(".border-b-solid > .flex").should("be.visible").click();
  });
});
