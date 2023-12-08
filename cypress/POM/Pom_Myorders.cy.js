class myOrder {
  Tracking_number() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)"
    );
  }
  Order_Total() {
    return cy.get(".mt-6 > :nth-child(2) > .text-white");
  }
  Delivery_Address() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
    );
  }
  Back_button() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1)"
    );
  }
  validateTrackingnumber() {
    this.Tracking_number().should(($element) => {
      const elementText = $element.text();
      expect(elementText).to.include("Tracking Number");
    });
  }
  validateOrderTotal() {
    this.Order_Total().should(($element) => {
      const elementText = $element.text();
      expect(elementText).to.include("Order Total");
    });
  }
  validateDeliveryAddress() {
    this.Delivery_Address().should(($element) => {
      const elementText = $element.text();
      expect(elementText).to.include("Shipping Information");
    });
  }
}
export default new myOrder();
