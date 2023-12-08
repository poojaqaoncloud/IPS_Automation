// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-xpath";

Cypress.Commands.add("Launch_Handle_video", () => {
  cy.visit(
    "https://staging.run.app.scuti.store/?gameId=63fbec70-7156-4052-8540-b7cd1855e411"
  );
  cy.viewport(1500, 900); // Width, Height
  cy.wait(5000);
  cy.get("video").should("be.visible"); // Video
  cy.get('[href="/register"] > .rounded-full').should("be.enabled"); // Register now button
  cy.get(".mt-2 > .active").click({ force: true }); // Continue shopping button
});
Cypress.Commands.add("Handle_video", () => {
  cy.wait(5000);
  cy.get("video").should("be.visible"); // Video
  cy.get('[href="/register"] > .rounded-full').should("be.enabled"); // Register now button
  cy.get(".mt-2 > .active").click({ force: true }); // Continue shopping button
});

Cypress.Commands.add(
  "rightClickAndMoveElement",
  { prevSubject: true },
  (subject, deltaX, deltaY) => {
    cy.wrap(subject).eq(0).trigger("contextmenu"); // Right-click to initiate the drag
    cy.wrap(subject).eq(0).trigger("mousemove", { clientX: 200, clientY: 500 }); // Adjust the clientX and clientY values
    cy.wrap(subject).eq(0).trigger("mousedown", { button: 2 }); // 2 represents the right mouse button
    cy.wrap(subject)
      .eq(0)
      .trigger("mousemove", { clientX: 100 + deltaX, clientY: 100 + deltaY }); // Adjust the values as needed to move the element
    cy.wait(5000); // Add a wait to allow time for the drag to register
    cy.wrap(subject).eq(0).trigger("mouseup", { button: 2 }); // Release the right mouse button
  }
);
Cypress.Commands.add("check_SessionStorage", () => {
  cy.window()
    .its("sessionStorage")
    .then((sessionStorage) => {
      const welcomeVideoViewedValue =
        sessionStorage.getItem("welcomeVideoViewed");

      if (welcomeVideoViewedValue === "false") {
        cy.Handle_video();
      } else {
        cy.log("welcomeVideoViewed is not false");
      }
    });
});
// cypress/support/commands.js

Cypress.Commands.add("checkMenuItemAtIndex", (index, parentIndex) => {
  cy.get('[role="menu"]')
    .find("[role='menuitem']")
    .eq(index)
    .then((childElement) => {
      const isDisabled = childElement.attr("aria-disabled") === "true";

      // Now, you can use isDisabled in your assertions or any other logic
      if (isDisabled) {
        // Your code when the element is disabled
        cy.log(`Menu item at index ${index} is disabled`);
      } else {
        // Your code when the element is not disabled
        cy.get(childElement).scrollIntoView().should("be.visible").click();
        cy.get(".flex.w-full.space-x-4")
          .find(".w-1\\/3")
          .eq(parentIndex)
          .each(($element) => {
            // Click on the svg within each element
            cy.wrap($element).find("svg").click({ force: true });
          });
      }
    });
});
import "cypress-iframe";

Cypress.Commands.add(
  "iframe",
  { prevSubject: "element" },
  ($iframe, selector) => {
    return cy.wrap($iframe).within(() => cy.get(selector));
  }
);
Cypress.Commands.add("Login", (email, password) => {
  //email input
  cy.get(
    "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
  )
    .scrollIntoView()
    .should("be.visible")
    .type(email);
  cy.get(
    "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)"
  )
    .should("be.visible")
    .type(password);
  cy.get(
    "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > button:nth-child(2)"
  )
    .scrollIntoView()
    .should("be.visible")
    .click();
});
