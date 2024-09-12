///<reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta/')
    });
    
   // afterEach(() => {
    //    cy.screenshot()
    //});

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('zhu.teste@teste.com')
        cy.get('#password').type('Senhateste123!@#')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, zhu.teste (não é zhu.teste? Sair)')
    });

    it('Deve exibir menssagem de usuario invalido', () => {
        cy.get('#username').type('erroooou@teste.com')
        cy.get('#password').type('Senhateste123!@#')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('exist')
        cy.get('.woocommerce-error > li').should('contain' , 'Endereço de e-mail desconhecido.')

    });

    it('Deve exibir menssagem de senha invalida', () => {
        cy.get('#username').type('zhu.teste@teste.com')
        cy.get('#password').type('errooo123!@#')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail zhu.teste@teste.com está incorreta.') 
    });

    it('Deve fazer login com sucesso usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, zhu.teste (não é zhu.teste? Sair)')
    });

    it('Deve fazer login com sucesso usando fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuario , {log: false})
            cy.get('#password').type(dados.senha , {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, zhu.teste (não é zhu.teste? Sair)')
        })
    });

    it('Deve fazer login com Comandos customizados ', () => {
        cy.login(perfil.usuario , perfil.senha)
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, zhu.teste (não é zhu.teste? Sair)')
    });

});