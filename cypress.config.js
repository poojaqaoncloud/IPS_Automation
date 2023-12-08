const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "cgsf5f",
  video: true,
  reporter: "cypress-mochawesome-reporter",
  mochawesome: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    video: true, // Ensure this is set to true
  },
  e2e: {
    chromeWebSecurity: false,
    experimentalOriginDependencies: false,

    specPattern: [
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS001_Product_page.cy.js",
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS002_About_section.cy.js",
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS003_legal.cy.js",
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS004_Header_menu.cy.js",
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS005_Homepage.cy.js",
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS006_Signup.cy.js",
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS007_Signup_ExistingUser.cy.js",
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS008_Url.cy.js",
      "cypress/e2e/Scuti_Automaton/Unauthenticated_scuti/TS009_Checkmail_page.cy.js",
      "cypress/e2e/Scuti_Automaton/Authenticated_scuti/Cart_TS010.cy.js",
      "cypress/e2e/Scuti_Automaton/Authenticated_scuti/TS016_Myorders.cy.js",
      // "cypress/e2e/Scuti_Automaton/Authenticated_scuti/TS017_Scuti_wallet.cy.js",
      "cypress/e2e/Scuti_Automaton/Authenticated_scuti/TS018_Myaccount_section.cy.js",
      "cypress/e2e/Scuti_Automaton/Authenticated_scuti/TS019_Checkout_section.cy.js",
    ],
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
