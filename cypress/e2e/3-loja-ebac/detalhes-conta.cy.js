/// <reference types="cypress" />

describe('Funcionalidade: Detalhes da conta', () => {
    beforeEach(() => {
        cy.visit('minha-conta/edit-account/')
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario , login.senha) 
        })
    });

    it('Deve completar detalhes da conta com sucesso', () => {
        cy.detalhesConta('Zhu' , 'Ze Feng' , 'Zhu.QA')
        cy.get('.woocommerce-message').should('exist')
    });
});