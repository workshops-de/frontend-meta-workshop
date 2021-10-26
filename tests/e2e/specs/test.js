// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Checks the navigation item legth', () => {
    cy.visit('/');
    cy.get('.navbar-nav').children('.nav-item').should('have.length', 4);
  });

  it('Checks if notes link is showing the notes view', () => {
    cy.visit('/');
    cy.get('.navbar-nav').children('.nav-item').eq(1).click();

    cy.get('section.notes').should('exist');
  });
});
