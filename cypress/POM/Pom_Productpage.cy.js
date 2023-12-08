class Productpage {
  product() {
    return cy.get(
      ":nth-child(1) > .w-full > .swiper > .swiper-wrapper > .swiper-slide-active > .cursor-pointer > a > .relative > .object-cover"
    );
  }
  producttile_homepage() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    );
  }
  productname_homepage() {
    return cy
      .get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
      )
      .invoke("text");
  }
  productprice_homepage() {
    return cy
      .get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)"
      )
      .invoke("text");
  }
  productreward_homepage() {
    return cy
      .get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)"
      )
      .invoke("text");
  }
  Productname() {
    return cy.get(".mb-10");
  }
  Productprize() {
    return cy.get(".space-x-4 > .flex > .font-bold");
  }
  Sharebutton() {
    return cy.get(
      "button[class='rounded-full border-2 border-blue px-6 py-3 font-bold hover:border-dark-blue disabled:border-gray disabled:text-light-gray flex items-center justify-center text-white transition-all hidden w-full md:flex md:w-72']"
    );
  }
  Colour_size_parent() {
    return cy.get(".flex.w-full.space-x-4");
  }
  Product_images() {
    return cy.get(".swiper-slide-active > .relative > .object-cover");
  }
  Quantity_parent() {
    return cy.get(".selector.w-9.text-center.text-white");
  }
  Quantity_increase() {
    return cy.get(
      ".flex.flex-row.items-center.justify-between.space-x-2.rounded-full.border-2.border-blue.px-4.py-3"
    );
  }
  Quantity_text() {
    return cy.get(".selector.w-9.text-center.text-white");
  }
  Quantity_decrease() {
    return cy.get(
      ".flex.flex-row.items-center.justify-between.space-x-2.rounded-full.border-2.border-blue.px-4.py-3"
    );
  }
  Imageswiper() {
    return cy.get(
      ".swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal.swiper-pagination-bullets-dynamic"
    );
  }
  Minimize_product_description() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(2)"
    );
  }
  Maximize_product_description() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > button:nth-child(2)"
    );
  }
  product_description() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(3)"
    );
  }
  Minimize_Recomendedproduct() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(4) > button:nth-child(1)"
    );
  }
  Maximize_Recomendedproduct() {
    return cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(4) > button:nth-child(1) > div:nth-child(1)"
    );
  }
  RecomendedProduct_grid() {
    return cy.get(
      ".swiper.swiper-initialized.swiper-horizontal.swiper-free-mode.swiper-backface-hidden"
    );
  }
  RecomendedProduct_Product() {
    return cy.get(
      "a[href='/product-offer/7c835d8b-9082-4edf-9cd8-a1e5772075a5']"
    );
  }
}
export default new Productpage();
