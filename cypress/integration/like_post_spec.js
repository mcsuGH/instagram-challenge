describe("Like", () => {
  it("A user can like a post made by someone else", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone8@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // already existing image from previous unit test
    cy.get('div[class="posts"]').first().find(".postimage").click()
    cy.get('.likebtn').click();

    // length 1 to see if the post made in this current test has been deleted
    cy.contains("liked by 1 people");
  });
});
