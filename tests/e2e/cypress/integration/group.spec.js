describe("group", ()=> {
    it('should be possible to create a group', function () {
        const user = cy.helper.makeUser()

        cy.registerAndLogin(user);

        cy.get('a').contains('Create group').click();

        cy.url().should('include', "/group/create");

        let groupId = cy.helper.makeRandomId();
        cy.get("input[name=groupName]").type(groupId)

        cy.get('button').contains('Create').click()

        cy.get('h1').contains(groupId);
        cy.get('li').contains(user.name)
    });


    it('should be possible to join a group', function () {
        const user = cy.helper.makeUser()

        cy.registerAndLogin(user);

        cy.get('a').contains('Create group').click();

        cy.url().should('include', "/group/create");

        let groupId = cy.helper.makeRandomId();
        cy.get("input[name=groupName]").type(groupId)

        cy.get('button').contains('Create').click()

        cy.get('button').contains("Go to admin").click()

        cy.url().should('include', '/admin')
        cy.get('button').contains('Create invitation').click()
    });
})