///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
import produtosPage from '../../support/page-objects/produtos.page';


describe('Funcionalidade: Produtos', () => {
    
    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve selecionar produto da lista ', () => {
        produtosPage.buscarProdutoLista('Aero Daily Fitness Tee')
        cy.get('.product_title').should('exist')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Abominable Hoodie'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain' , produto)
    });

    it('Deve visitar a pagina do produto', () => {
        let produto = 'Apollo Running Short'
        produtosPage.visitarProduto(produto)
        cy.get('.product_title').should('contain' , produto)
    });

    it('Deve adicionar produto ao carrinho', () => {
        let produto = 'Abominable Hoodie'
        let tamanho = 'L'
        let cor = 'Blue'
        let quantidade = 2
        produtosPage.buscarProduto(produto)
        produtosPage.addProdutoCarrinho(tamanho , cor , quantidade)
        cy.get('.woocommerce-message').should('contain' , quantidade + ' × “' + produto)
    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {   
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[1].nomeProduto)
            produtosPage.addProdutoCarrinho(dados[1].tamanho, dados[1].cor , dados[1].quantidade)
            cy.get('.woocommerce-message').should('contain' , dados[1].quantidade + ' × “' + dados[1].nomeProduto)
        })
        
    });
});