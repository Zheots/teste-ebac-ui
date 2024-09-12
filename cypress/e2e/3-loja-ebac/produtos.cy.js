///<reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Produtos', () => {
    
    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve selecionar produto da lista ', () => {
        cy.get('.product-block > .caption > .meta > .infor > .name > a')
            //.first()
            //.last()
            //.eq(2)
            .contains('Aero Daily Fitness Tee')
            .click()
        cy.get('#tab-title-description > a').should('contain' , 'Descrição')
    });
});