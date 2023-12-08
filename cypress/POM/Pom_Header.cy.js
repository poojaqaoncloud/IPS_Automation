class HeaderPage {
  // Locators
  cartIcon() {
    return cy.get(".relative.cursor-pointer.text-white");
  }

  scutiWalletIcon() {
    return cy.get('[href="/wallet"] > .h-7');
  }

  hamburgerMenuIcon() {
    return cy.get(".align-center > .w-auto.cursor-pointer");
  }
  hamburgerMenuItems() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)"
    );
  }
  Scuti_wallet() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(3) > a:nth-child(2)"
    );
  }
  myAccount_section() {
    return cy.get("a[href='/account-settings/name-and-age']");
  }
  // Actions
  clickCartIcon() {
    this.cartIcon().should("be.visible").click({ force: true });
  }

  clickScutiWalletIcon() {
    this.scutiWalletIcon().should("be.visible").click();
  }

  clickHamburgerMenuIcon() {
    this.hamburgerMenuIcon()
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
  }

  // Additional methods for validations, if needed
  validateHamburgerMenuContents() {
    this.hamburgerMenuItems().should(($element) => {
      const elementText = $element.text();
      const textsToCheck = [
        "About Scuti",
        "Legal",
        "Help Center",
        "Log In",
        "InApp Version 1.09",
      ];

      for (const text of textsToCheck) {
        expect(elementText).to.include(text);
      }
    });
  }
  Welcome_page_title() {
    cy.get(
      "h2[class='mt-[50px] px-12 text-lg font-bold uppercase lg:text-xl']"
    ).should("have.text", "Sign Up and Earn Rewards");
  }
  click_continuetostore() {
    cy.get(".mt-8 > a").should("be.visible").click();
  }
  scuti_logo() {
    return cy
      .xpath(
        "(//*[name()='svg' and @class='w-auto h-5 w-auto shrink-0 cursor-pointer lg:h-8 '])[1]"
      )
      .should("be.visible")
      .click();
  }
}

export default new HeaderPage();
