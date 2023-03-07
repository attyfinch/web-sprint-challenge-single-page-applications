describe("order pizza", () => {
  beforeEach(() => {
      cy.visit("http://localhost:3000/")
  })

  it("sanity check", () => {
      expect(1+2).to.equal(3);
      expect(2+2).not.equal(5)
  })

  const formVisit = () => cy.visit("http://localhost:3000/pizza");
  const nameInput = () => cy.get("input[name=name]");
  const sizeInput = () => cy.get("select[name=size]");
  const pepperoni = () => cy.get("input[type=checkbox][name=pepperoni]")
  const mushrooms = () => cy.get("input[type=checkbox][name=mushrooms]")
  const olives = () => cy.get("input[type=checkbox][name=olives]")
  const onions = () => cy.get("input[type=checkbox][name=onions]")
  const instructionsInput = () => cy.get("input[name=instructions]");
  const order = () => cy.get("button")


  it("pizza form page resolves at correct url", () => {
    formVisit();
  })

  it("pizza form elements exist", () => {
    formVisit();
    nameInput().should("exist");
    sizeInput().should("exist");
    pepperoni().should("exist");
    mushrooms().should("exist");
    olives().should("exist");
    onions().should("exist");
    instructionsInput().should("exist");
    order();
  })

  it("name input works", () => {
    formVisit();
    nameInput()
     .should("have.value", "")
     .type("Brad Morris")
     .should("have.value", "Brad Morris")
  })

  it("all toppings can be selected", () => {
    formVisit();
    pepperoni().click().should("be.checked");
    mushrooms().click().should("be.checked");
    olives().click().should("be.checked");
    onions().click().should("be.checked");
  })

  it("form can be submitted", () => {
    formVisit();

    order().should("be.disabled")

    nameInput()
     .type("Brad Morris")
     .should("have.value", "Brad Morris")

     sizeInput().select("Large")

     pepperoni().click();
     mushrooms().click();
     olives().click();
     onions().click();

    instructionsInput()
     .type("I'm hungry")
     .should("have.value", "I'm hungry")

    order().not("[disabled]")

    order().click();

  })

})