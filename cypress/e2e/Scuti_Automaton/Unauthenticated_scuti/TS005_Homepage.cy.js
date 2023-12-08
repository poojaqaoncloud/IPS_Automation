//TEST COVERAGE
//C1927- validate Interactive text
//C1928- validate see all title
//C1929- validate leftarrows on the sides of the category tiles
//C1930- validate rightarrows on the sides of the category tiles
//C1912- validate productgrid
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error message to the console
  console.error("Uncaught Exception:", err.message);

  // Prevent the test from failing
  return false;
});
import HomePage from "../../../POM/Pom_Homepgae.cy";
describe("homepage", () => {
  beforeEach(() => {
    //visiting scuti staging application
    cy.clearCookies();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.Launch_Handle_video();
  });

  it("should navigate to product info", () => {
    //click a product from home page
    HomePage.clickProductImage();
    // Define the regular expression pattern
    const urlPattern =
      /^https:\/\/staging\.run\.app\.scuti\.store\/product-offer\/[a-fA-F0-9-]+$/;

    // Use cy.url() to get the current URL and assert it against the pattern
    cy.url().should("match", urlPattern);
  });

  it("Home page category text ", () => {
    HomePage.categoryText()
      .as("categorys")
      .then(($spans) => {
        const len = $spans.length;
        const textArray = [];

        for (let i = 1; i <= len; i++) {
          const selector = `:nth-child(${i}) > .py-4`;

          cy.get(selector)
            .invoke("text")
            .then((text) => {
              const splitText = text.split("S");
              textArray.push(splitText);

              // Log the text for each category
              cy.log(`Category Text ${i}: ${text}`);

              cy.wait(5000);
              cy.get(selector).scrollIntoView().should("be.visible").click();
              cy.wait(5000);

              // Check the category switcher
              HomePage.categorySwitcher()
                .invoke("text")
                .should("include", splitText[0]);
            });

          // Click the back button for each category
          HomePage.clickBackButton();
          cy.window()
            .its("sessionStorage")
            .then((sessionStorage) => {
              // Check if the session storage has a specific key and value
              const welcomeVideoViewedValue =
                sessionStorage.getItem("welcomeVideoViewed");

              if (welcomeVideoViewedValue === "false") {
                // Execute your function when the value is "false"
                cy.log(
                  "Executing function because welcomeVideoViewed is false"
                );

                cy.Handle_video();
              } else {
                // Log a message if the value is not "false"
                cy.log("welcomeVideoViewed is not false");
              }
            });
        }

        // Log the entire textArray after processing all categories
        cy.log(textArray);
      });
  });

  it("Homepage_seeall_text", () => {
    const clickSeeAllElements = (index, $list) => {
      if (index < $list.length) {
        // Get the span elements again
        HomePage.SeeAll_text()
          .find("span:contains('See All')")
          .eq(index) // Select the next element
          .click({ force: true })
          .wait(2000); // Introduce a delay (adjust the time as needed)

        // After clicking, navigate back
        HomePage.clickBackButton();

        // Wait for the page to stabilize (adjust the time as needed)
        cy.wait(5000);

        // Recursively click the next element
        clickSeeAllElements(index + 1, $list);
      }
    };

    HomePage.SeeAll_text()
      .find("span:contains('See All')")
      .then(($list) => {
        clickSeeAllElements(0, $list);
      });
  });

  it("Homepage_swipper_button", () => {
    //getting the number of catgeory in homepage to click all the swiper button
    cy.get('span[class="text-sm uppercase text-white"]')
      .as("categorys")
      .then(($spans) => {
        const len1 = $spans.length;
        for (let i = 0; i <= len1 - 1; i++) {
          cy.get(`#swiper-button-next-${i}`).should("be.visible").click(); //swiper button right
          cy.get(`#swiper-button-prev-${i}`).should("be.visible").click(); //swiper button left
        }
      });
  });
  it("banner/ad", () => {
    cy.get("#alt-iframe-TCO95DIS7D2HLC4IMPE3M58QSS").then(($iframe) => {
      const $body = $iframe.contents().find("body");

      // Now you can interact with elements inside the iframe
      cy.get($body).click({ multiple: true });
    });
  });
});
