cy.helper = {
    makeRandomId: () => Math.random()
        .toString()
        .substr(2, 16),
    makeUser: () => {
        const randomId = () => Math.random()
            .toString()
            .substr(2, 16);

        function createUserData() {
            const name = randomId()
            const email = `${randomId()}@customemail.com`
            const password = randomId()
            return {name, email, password};
        }

        return createUserData()
    }
}