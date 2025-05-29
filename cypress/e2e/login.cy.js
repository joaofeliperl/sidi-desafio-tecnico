describe('Tests Suite to Login Page', () => {
    beforeEach(() => {

        cy.visit('https://front.serverest.dev/login')
    })

    it('', () => {
        cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
        cy.get('.todo-list li')
            .should('have.length', 3)
            .last()
            .should('have.text', newItem)
    })
})
