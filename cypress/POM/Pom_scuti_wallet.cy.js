class ScutiWallet {
  X_icon() {
    return cy.get(".absolute > .h-6");
  }
  transaction_Icon() {
    return cy.get("a[href='/transactions']");
  }
}
export default new ScutiWallet();
