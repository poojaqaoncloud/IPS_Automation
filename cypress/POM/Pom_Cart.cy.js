class Cart {
  login_button() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > a:nth-child(3)"
    );
  }
  product() {
    return cy.get(
      ":nth-child(1) > .w-full > .swiper > .swiper-wrapper > .swiper-slide-active > .cursor-pointer > a > .relative > .object-cover"
    );
  }
  add_to_cart() {
    return cy.get(
      "button[class='rounded-full bg-blue px-6 py-3 font-bold hover:bg-dark-blue disabled:bg-gray disabled:text-light-gray flex items-center justify-center text-white transition-all w-full md:w-72']"
    );
  }
  Productname() {
    return cy.get(".mb-10");
  }
  Productprize() {
    return cy.get(".space-x-4 > .flex > .font-bold");
  }
  productrewards() {
    return cy.get(".flex-row.justify-between > :nth-child(2) > .flex");
  }
  hamburgerMenuItems_authenticated() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)"
    );
  }
  myOrders_option() {
    return cy.get('[href="/order-history/active"]');
  }
  scuti_logo() {
    return cy.get("a[class='landscape:ml-4 lg:landscape:ml-0']");
  }
  hamburger() {
    return cy.get(
      ".bg-secondary-600.absolute.bottom-0.left-0.right-0.top-0.z-10.w-screen.opacity-20"
    );
  }
  Cart_Icon() {
    return cy.get(".relative.cursor-pointer.text-white");
  }
  Cart_empty_text() {
    return cy.get(".mb-4.mt-9.font-bold");
  }
  Cart_empty_text1() {
    return cy.get(".text-sm");
  }
  backButton() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1)"
    );
  }
  Start_shopping_button() {
    return cy.get(".flex-col > .rounded-full");
  }
  ProceedToCheckout() {
    return cy.get("a[href='/checkout']");
  }
  backButton_checkout() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1)"
    );
  }
  continue_shopping() {
    return cy.get(".flex.w-full.items-center.justify-center.py-2");
  }
  payWithScuites() {
    return cy.get(
      "button[class='rounded-full border-2 border-blue px-6 py-3 font-bold hover:border-dark-blue disabled:border-gray disabled:text-light-gray flex items-center justify-center text-white transition-all w-full']"
    );
  }
  validateHamburgerMenuContents() {
    this.hamburgerMenuItems_authenticated().should(($element) => {
      const elementText = $element.text();
      const textsToCheck = [
        "My Orders",
        "Scuti Wallet",
        "My Account",
        "About Scuti",
        "Legal",
        "Help Center",
        "App Version 1.09",
      ];

      for (const text of textsToCheck) {
        expect(elementText).to.include(text);
      }
    });
  }
}
export default new Cart();
