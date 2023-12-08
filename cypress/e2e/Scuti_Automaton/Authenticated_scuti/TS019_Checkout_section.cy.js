import HeaderPage from "../../../POM/Pom_Header.cy";
import Cart from "../../../POM/Pom_Cart.cy";
let elementText;
let maxValueNumber;

Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
describe("Check cart ", () => {
  beforeEach(() => {
    cy.viewport(1500, 900); // Width, Height

    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
    HeaderPage.clickHamburgerMenuIcon();

    //login option
    Cart.login_button().scrollIntoView().should("be.visible").click();
    cy.Login();
  });
  it("buttons at checkout section", () => {
    //click a product to validate cart
    Cart.product().should("be.visible").click({ force: true });
    //Add to cart button
    Cart.add_to_cart().scrollIntoView().should("be.visible").click();
    //Proceed to check out button
    Cart.ProceedToCheckout().should("be.visible").click();
    //check url to checkout section
    cy.url().should("include", "https://staging.run.app.scuti.store/checkout");
    //Back button inside checkout section
    Cart.backButton_checkout().should("be.visible").click();

    //CONTINUE SHOPPING BUTTON
    Cart.continue_shopping().should("be.visible").click();
  });
  it.only("buttons at checkout section", () => {
    //click a product to validate cart
    Cart.product().should("be.visible").click({ force: true });
    //Add to cart button
    Cart.add_to_cart().scrollIntoView().should("be.visible").click();
    //Proceed to check out button
    Cart.ProceedToCheckout().should("be.visible").click();
    cy.wait(5000);
    //check url to checkout section
    cy.url().should("include", "https://staging.run.app.scuti.store/checkout");
    //complete order button
    cy.get(
      "button[class='rounded-full bg-blue px-6 py-3 font-bold hover:bg-dark-blue disabled:bg-gray disabled:text-light-gray flex items-center justify-center text-white transition-all w-full']"
    )
      .should("be.visible")
      .click();
    //check url of paymenr section
    cy.url().should("include", "https://staging.run.app.scuti.store/payment");
    //check back button in stripe section
    cy.get(".border-b-solid > .flex").should("be.visible").click();
  });
  it("pay with scuites flow", () => {
    HeaderPage.cartIcon().should("be.visible").click();

    //pay with scuties button
    Cart.payWithScuites().should("be.visible").click();
    cy.wait(5000);
    //check url to checkout section
    cy.url().should("include", "/payment/with-scutis");

    //check pay with scuties slider
    //cy.get(".rc-slider-handle").click({ multiple: true, force: true });
    // Press right arrow two times
    //cy.get(".rc-slider-handle").type("{rightarrow}{rightarrow}");

    //slider function using sliding
    cy.get(".rc-slider-handle")
      .invoke("attr", "aria-valuemax")
      .then((maxValue) => {
        // Convert the max value to a number
        maxValueNumber = parseFloat(maxValue / 2);
        cy.log(`Extracted aria-valuemax: ${maxValue}`);

        // Calculate the percentage for half of the scuties present
        const halfPercentage = (50 / maxValueNumber) * 100;

        // Set the width of the slider track
        cy.get(".rc-slider-track").invoke(
          "attr",
          "style",
          `width:${halfPercentage}%`
        );

        // Set the left position of the slider handle
        cy.get(".rc-slider-handle").invoke(
          "attr",
          "style",
          `left:${halfPercentage}%`
        );

        // Set the aria-valuenow attribute to half of the max value
        cy.get(".rc-slider-handle").invoke(
          "attr",
          "aria-valuenow",
          `${maxValueNumber}`
        );

        // Click on the slider step (if needed)
        cy.get(".rc-slider-step").click({ force: true });

        // No need to wait here, continue with subsequent assertions
      });

    cy.get("div[class='mt-8 text-2xl font-semibold lg:mt-16 ']")
      .invoke("text")
      .then((text) => {
        elementText = text.trim(); // Trim any leading or trailing whitespace
        cy.log(`Text of the element: ${elementText}`);
      });
    cy.log(maxValueNumber);
    // Apply scuties button
    cy.get(
      "button[class='rounded-full bg-blue px-6 py-3 font-bold hover:bg-dark-blue disabled:bg-gray disabled:text-light-gray flex items-center justify-center text-white transition-all w-full']"
    )
      .should("be.visible")
      .click();

    // // Order details sucties used
    // cy.get(".w-full.space-y-4 > :nth-child(5)").should(
    //   "contain",
    //   `${elementText}`
    // );
    cy.get(
      "button[class='rounded-full bg-blue px-6 py-3 font-bold hover:bg-dark-blue disabled:bg-gray disabled:text-light-gray flex items-center justify-center text-white transition-all flex flex-row items-center space-x-2 rounded-full bg-dark-gray px-[10px] py-[6px] text-[9px] hover:bg-darker-gray']"
    )
      .should("be.visible")
      .click();
    cy.url().should("contain", "/checkout/address");
    //back button
    cy.get(".border-b-solid > .flex").should("be.visible").click();
    //order details minimize
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > button:nth-child(1)"
    )
      .should("be.visible")
      .click();

    //order details maximize
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > button:nth-child(1)"
    )
      .find("svg")
      .should("be.visible")
      .click();

    //order details should be visible after maximize
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2)"
    ).should("be.visible");
  });
});
