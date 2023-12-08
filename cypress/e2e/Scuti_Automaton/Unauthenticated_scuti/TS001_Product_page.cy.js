//TEST COVERAGE
//C1931-Checks for the size/colour dropdown menu
//C1932-Checks for the dropdown menu option
//C1934-Checks for the product image swipper
//C1938-Checks for the quantity increase/decrease
//C1942-Checks for the description text
let productname;
let productprice;
let productreward;

import Productpage from "../../../POM/Pom_Productpage.cy";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
  cy.log(err);
});

describe("Test product page", { testIsolation: false }, () => {
  before(() => {
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();

    //visiting scuti staging application
    const parentElementSelector = Productpage.producttile_homepage();

    cy.get(parentElementSelector).then(() => {
      // Use the class selector to find the element with the specified class
      Productpage.productname_homepage().then(($elementn) => {
        productname = $elementn;
        cy.log("p", productname);
      });

      Productpage.productprice_homepage().then(($elementp) => {
        productprice = $elementp;
        cy.log("p", productprice);
      });

      Productpage.productreward_homepage().then(($elementr) => {
        productreward = $elementr;
        cy.log("p", productreward);
      });
    });
    Productpage.product().should("be.visible").click({ force: true });
  });

  it("Check for the product_name", () => {
    //BRAND/PRODUCT NAME
    cy.viewport(1500, 900); // Width, Height

    cy.wait(5000);

    Productpage.Productname()
      .invoke("text")
      .then((text) => {
        // Assert that the element text includes the specified substring
        expect(text).to.include(productname);
      });
  });
  it("Check for the product_price/reward", () => {
    cy.viewport(1500, 900); // Width, Height

    //Product price
    Productpage.Productprize().should(($elements) => {
      const text = $elements.text();

      // Use regular expressions to match and extract numbers
      const numberMatch = text.match(/\d+/);

      // Ensure the matched number is greater than 0
      expect(productprice).to.include(text);
    });
  });

  it("Check for the share button", () => {
    cy.viewport(1500, 900); // Width, Height

    // Now, click the share button
    cy.get(
      "button[class='rounded-full border-2 border-blue px-6 py-3 font-bold hover:border-dark-blue disabled:border-gray disabled:text-light-gray flex items-center justify-center text-white transition-all hidden w-full md:flex md:w-72']"
    )
      .should("be.visible")
      .click();
    cy.wait(5000);
  });

  it("check for the increasing and decreasing of quantity", () => {
    // Reusable function to get and update quantity
    cy.viewport(1500, 900); // Width, Height

    const getAndUpdateQuantity = () => {
      Productpage.Quantity_parent()
        .invoke("text")
        .then((currentQuantity) => {
          // Parse the current quantity as an integer
          const parsedQuantity = parseInt(currentQuantity);

          // Increase the quantity by clicking the increase button
          Productpage.Quantity_increase()
            .find("svg")
            .eq(1) // Increase button
            .click();

          // Validate that the quantity increased by 1 after clicking
          Productpage.Quantity_text().should(
            "have.text",
            (parsedQuantity + 1).toString()
          );

          // Update the quantity after increase
          const updatedQuantityAfterIncrease = parsedQuantity + 1;

          // Decrease the quantity by clicking the decrease button
          Productpage.Quantity_decrease()
            .find("svg")
            .eq(0) // Decrease button
            .click();

          // Validate that the quantity decreased by 1 after clicking
          Productpage.Quantity_text().should(
            "have.text",
            (updatedQuantityAfterIncrease - 1).toString()
          );
          // Update the quantity after decrease
          const updatedQuantityAfterDecrease = updatedQuantityAfterIncrease - 1;

          // You can use updatedQuantityAfterDecrease in further validations if needed
          cy.log(
            `Updated Quantity After Decrease: ${updatedQuantityAfterDecrease}`
          );
        });
    };

    // Use the reusable function to get and update quantity
    getAndUpdateQuantity();
  });

  it("Check for the selection of product colour/size", () => {
    cy.viewport(1500, 900); // Width, Height

    // Get the list of elements
    const elements = Productpage.Colour_size_parent().find(".w-1\\/3");

    // Iterate over the elements
    elements.each(($element, parentIndex) => {
      // Log the total number of elements
      cy.log(elements.length);

      // Check if the SVG element is present
      const svgElement = $element.find("svg");

      if (svgElement.length > 0) {
        // Click on the SVG within the current element
        cy.wrap(svgElement).click({ force: true });

        // Wait for the menu items to be visible
        cy.get('[role="menu"]').should("be.visible");

        // Iterate over the menu items
        cy.get('[role="menu"] [role="menuitem"]').each(
          (menuElement, menuIndex) => {
            cy.checkMenuItemAtIndex(menuIndex, parentIndex);

            // Add a wait after each menu item interaction if needed
            cy.wait(1000); // Adjust the wait time as needed
          }
        );

        // Click on the element with class 'flex-1'
        cy.get(".flex-1").click();

        // Add a wait after the first .w-1\\/3 element interaction if needed
        cy.wait(1000); // Adjust the wait time as needed
      } else {
        // Log a message if there are no variations
        cy.log("No variations");
      }
    });
  });

  it("Check for the Product_image_swipe", () => {
    cy.viewport(1500, 900); // Width, Height

    cy.get(".swiper-slide-active > .relative > .object-cover").as(
      "imageContainer"
    );

    // Swipe from left to right
    cy.get("@imageContainer")
      .trigger("mousedown", { clientX: 10, clientY: 100 })
      .trigger("mousemove", { clientX: 20, clientY: 100 })
      .trigger("mouseup", { force: true });

    // Add a delay after the first swipe
    cy.wait(1000); // Adjust the wait time as needed

    // Swipe from right to left
    cy.get("@imageContainer")
      .trigger("mousedown", { clientX: 20, clientY: 100 })
      .trigger("mousemove", { clientX: 10, clientY: 100 })
      .trigger("mouseup", { force: true });

    // Add a delay after the second swipe
    cy.wait(1000); // Adjust the wait time as needed
  });

  it("check for the image_swipper_button", () => {
    cy.viewport(1500, 900); // Width, Height

    //image swipper dots
    Productpage.Imageswiper().then(($swipper) => {
      // Find all child elements within the swiper container
      const children = $swipper.find("*");
      console.log(children);
      console.log(children.length);
      if (children.length > 1) {
        for (let i = 0; i < children.length; i++) {
          cy.get(children[i]).click(); // Click each child element

          Productpage.Product_images()
            .scrollIntoView()
            .wait(5000)
            .should("be.visible");
        }
      }
    });
  });
  it("Check minimize and maximize of product_description/recomended product", () => {
    cy.viewport(1500, 900); // Width, Height

    Productpage.Minimize_product_description()
      .find("svg")
      .scrollIntoView() //- button
      .click();

    cy.scrollTo("bottom", { ensureScrollable: false });
    //+ button
    Productpage.Maximize_product_description()
      .find("svg")
      .scrollIntoView()
      .click();

    // to ensure description is maximized checking the description is visible or not
    Productpage.product_description().scrollIntoView().should("be.visible");

    //- minimize icon recomended product
    Productpage.Minimize_Recomendedproduct()
      .scrollIntoView()
      .find("svg")
      .should("be.visible")
      .click();

    Productpage.Maximize_Recomendedproduct()
      .scrollIntoView() // + maximize icon recomended product
      .find("svg")
      .should("be.visible")
      .click();
    Productpage.RecomendedProduct_grid().scrollIntoView().should("be.visible"); //recomended product grid
    Productpage.RecomendedProduct_Product()
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
  });
});
