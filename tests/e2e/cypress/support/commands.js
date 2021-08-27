/*eslint-disable */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registerAndLogin', ({name, email, password}) => {
    cy.visit(Cypress.env('CYPRESS_BASE_URL') || "http://localhost:3000");
    cy.get("button").contains('Register').click();
    cy.url().should("include", "/register");

    // Register
    cy.get('input[name=name]').type(name);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);

    cy.get('button').contains("Register").click()

    cy.url().should('include', '/login')

    // Login
    cy.get('h1').contains("Login")

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);

    cy.get('button').contains('Login').click()

    cy.url().should('include', '/dashboard')
    cy.get('h1').contains("Dashboard Page")
})
