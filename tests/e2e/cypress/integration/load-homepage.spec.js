/*eslint-disable */

describe('Home page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') || "http://localhost:3000");
    })

    it('should load', function () {
        cy.get('h1').contains("Rawpotion Mealplanner")
    });

    it('should be possible to click on login', function () {
        cy.get("button").contains('Login').click()

        cy.url().should("include","/login")
    });

    it('should be possible to click on Register', function () {
        cy.get("button").contains('Register').click()

        cy.url().should("include","/register")
    });
})