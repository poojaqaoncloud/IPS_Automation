let productPrice;
let productText;
let productRewards;
import HeaderPage from "../../../POM/Pom_Header.cy";
import Cart from "../../../POM/Pom_Cart.cy";
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
    cy.Login("surya+200@qaoncloud.com", "12345678");
  });
  it("Check hamburger menu items", () => {
    HeaderPage.clickHamburgerMenuIcon();
    Cart.validateHamburgerMenuContents();
    //to close the hamburger menu click again
    Cart.hamburger().click();
  });
  it("validate scuti logo", () => {
    cy.viewport(1500, 900); // Width, Height
    Cart.product().should("be.visible").click({ force: true });
    Cart.scuti_logo().should("be.visible").click({ force: true });
  });
  it("validate cart when it is empty", () => {
    cy.viewport(1500, 900); // Width, Height
    Cart.Cart_Icon().should("be.visible").click({ force: true });
    Cart.Cart_empty_text().should("contain.text", "Your Cart is Empty");
    Cart.Cart_empty_text1().should(
      "contain.text",
      "Looks like you haven’t added any products to your Cart"
    );
    Cart.Start_shopping_button().should("be.visible").click({ force: true });
  });
  it.only("adding product to cart", () => {
    cy.viewport(1500, 900); // Width, Height
    //click a product to validate cart
    Cart.product().should("be.visible").click({ force: true });
    Cart.Productname()
      .invoke("text")
      .then((text) => {
        productText = text;
      });
    Cart.Productprize()
      .invoke("text")
      .then((text) => {
        productPrice = text;
      });
    Cart.productrewards()
      .invoke("text")
      .then((text) => {
        productRewards = text;
      });
    //Add to cart button
    Cart.add_to_cart().scrollIntoView().should("be.visible").click();
    //VALIDATING THE TEXT SUCH AS NAME PRICE REWARD EARNED
    //CART ICON
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > a:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    )
      .invoke("text")
      .should("eq", "1");

    //PRODCUT NAME
    cy.get(":nth-child(1) > .flex > p.text-white")
      .invoke("text")
      .then((text) => {
        expect(text).to.include(productText);
      });

    //PRODUCT PRICE
    cy.get(".mt-2")
      .invoke("text")
      .then((text) => {
        expect(text).to.include(productPrice);
      });

    //PRODUCT REWARDS
    cy.get(".w-full > .flex > span")
      .invoke("text")
      .then((text) => {
        expect(productRewards).to.include(text);
      });
    //increase product quantity
    cy.get(
      ".flex.flex-row.items-center.justify-between.space-x-2.rounded-full.border-2.border-blue.px-4.py-3"
    )
      .find("svg")
      .eq(1)
      .should("be.visible")
      .click();
    //increase product quantity
    cy.get(
      ".flex.flex-row.items-center.justify-between.space-x-2.rounded-full.border-2.border-blue.px-4.py-3"
    )
      .find("svg")
      .eq(0)
      .should("be.visible")
      .click();
    //Add promo code
    cy.get("input[placeholder='Enter Promo Code']").type("QACART2023");
    //click add promocode button
    cy.get(
      "button[class='rounded-full bg-blue px-6 py-3 font-bold hover:bg-dark-blue disabled:bg-gray disabled:text-light-gray flex items-center justify-center text-white transition-all inline h-10']"
    )
      .should("be.visible")
      .click();
    //sucess message after adding promo code
    cy.get("div[role='alert']").should("be.visible");
    //delete button in cart
    cy.get("div[class='flex w-full justify-between']")
      .find("svg")
      .should("be.visible")
      .click();
    Cart.backButton().should("be.visible").click({ force: true });
  });
});
