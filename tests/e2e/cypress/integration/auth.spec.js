/*eslint-disable */

const randomId = () => Math.random()
    .toString()
    .substr(2, 16);

function createUserData() {
    const name = randomId()
    const email = `${randomId()}@customemail.com`
    const password = randomId()
    return {name, email, password};
}

function register() {
    const {name, email, password} = createUserData();

    cy.get('input[name=name]').type(name);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);

    cy.get('button').contains("Register").click()

    cy.url().should('include', '/login')
    cy.get('h1').contains("Login")
    return {email, password};
}

function registerAndLogin() {
    const {email, password} = register();

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);

    cy.get('button').contains('Login').click()

    cy.url().should('include', '/dashboard')
    cy.get('h1').contains("Dashboard Page")
}

describe('Auth', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CYPRESS_BASE_URL') ?? "http://localhost:3000");
        cy.get("button").contains('Register').click();
        cy.url().should("include", "/register");
    })

    it('should be able to register', function () {
        const {name, email, password} = createUserData();

        cy.get('input[name=name]').type(name);
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button').contains("Register").click()

        cy.url().should('include', '/login')
        cy.get('h1').contains("Login")
    });


    it('should be able to login', function () {
        const {email, password} = register();

        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);

        cy.get('button').contains('Login').click()

        cy.url().should('include', '/dashboard')
        cy.get('h1').contains("Dashboard Page")
    });


    it('should be able to sign out', function () {
        registerAndLogin();

        cy.get('button').contains("Sign out").click()

        cy.get('h2').contains("Easily share your meals with friends and family")
    });
})