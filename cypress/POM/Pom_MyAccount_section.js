class myAccount_section {
  // Locators
  Myaccount_menuoptions() {
    return cy.get(
      "div[class='mt-20 flex grow flex-col space-y-8 pb-4 xl:mx-16'] div[class='grow']"
    );
  }
  validateMenuOptions() {
    this.Myaccount_menuoptions().should(($element) => {
      const elementText = $element.text();
      const textsToCheck = [
        "Edit Name & Age",
        "Edit Password",
        "Edit Address",
        "Manage Preferences",
      ];

      for (const text of textsToCheck) {
        expect(elementText).to.include(text);
      }
    });
  }
  LogoutOption() {
    return cy
      .get(".flex.cursor-pointer.items-center")
      .should("be.visible")
      .then(($element) => {
        const elementText = $element.text();
        expect(elementText).to.include("Log Out");
      });
  }
  DeleteAccountOption() {
    return cy
      .get(".cursor-pointer.font-medium.text-red")
      .should("be.visible")
      .then(($element) => {
        const elementText = $element.text();
        expect(elementText).to.include("Delete Account");
      });
  }
  EditNameAndAge_Title() {
    return cy
      .get(".mb-8.font-semibold")
      .should("be.visible")
      .then(($element) => {
        const elementText = $element.text();
        expect(elementText).to.include("Edit Name & Age");
      });
  }

  //edit name age section
  EditNameAndAge_Fields() {
    return cy
      .get("div[class='flex h-full flex-col pb-8'] div[class='grow']")
      .should(($element) => {
        const elementText = $element.text();
        const textsToCheck = [
          "Full Name",
          "Date of Birth",
          "Year of Birth",
          "Gender",
        ];

        for (const text of textsToCheck) {
          expect(elementText).to.include(text);
        }
      });
  }
  Fullname_field() {
    return cy.get("input[placeholder='Your full name']");
  }
  Fullname_field_validation() {
    return cy
      .get(".disclaimer.mt-2.text-red")
      .should("contain.text", "Full Name is incorrect");
  }
  DateOfBirth_field() {
    return cy.get("input[placeholder='MM/DD']");
  }
  field_validation_Dob() {
    return cy
      .get(".disclaimer.mt-2.text-red")
      .eq(1)
      .should("contain.text", "Date is incorrect");
  }
  Year_field() {
    return cy.get("input[placeholder='YYYY']");
  }
  Year_field_validation1() {
    return cy
      .get(".disclaimer.mt-2.text-red")
      .eq(2)
      .should("contain.text", "Field is required");
  }
  Year_field_validation() {
    return cy
      .get(".disclaimer.mt-2.text-red")
      .eq(2)
      .should("contain.text", "Must be in yyyy format");
  }
  genderField() {
    return cy.get("input[placeholder='Select a Gender']");
  }
  genderFieldList() {
    return cy
      .get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(4) > ul:nth-child(2)"
      )
      .as("list");
  }
  selectGenderByIndex() {
    this.genderFieldList()
      .find("li")
      .each(($element, index) => {
        console.log($element);

        // Click on the GENDER list item based on its index
        cy.get("@list")
          .find("li")
          .eq(index)
          .should("be.visible")
          .click({ force: true });
        cy.get("input[placeholder='Select a Gender']").click();
      });
  }
  SubmitButton() {
    return cy.get("button[type='submit']");
  }
  backButton() {
    return cy.get(".border-b-solid > .flex");
  }
  Sucess_message() {
    return cy.get("div[role='alert']");
  }
}

export default new myAccount_section();
