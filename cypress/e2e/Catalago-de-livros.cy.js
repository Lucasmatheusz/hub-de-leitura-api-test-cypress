/// <reference types="cypress"/>

let token

beforeEach(() => {
    cy.tokengerado('admin@biblioteca.com', 'admin123').then(tkn => {
        token = tkn
    })
});


describe(' GET Teste de Api - Catalago de Livros', () => {

    it('Deve listar livros com sucesso', () => {
        cy.api({
            method: 'GET',
            url: 'books'
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.books).to.be.an('array')
        })
    });

    it('Deve validar propriedades de um livro', () => {
        cy.api({
            method: 'GET',
            url: 'books'
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.books[0]).to.have.property('id')
            expect(response.body.books[0]).to.have.property('title')
            expect(response.body.books[0]).to.have.property('author')

        })
    });

});

it('Deve listar os livros usando filtros', () => {
    cy.api({
        method: 'GET',
        url: 'books',
        qs: {
            search: 'machado',
            category: 'Literatura',
            author: 'Machado',
        }
    }).should(response => {
        expect(response.status).to.equal(200)

    })

});

describe('POST - Teste de API Adicionar livro', () => {

    it('Deve adicionar livro com sucesso', () => {
        let tittle = `romance adolecente${Date.now()}`
        cy.api({
            method: 'POST',
            url: 'books',
            headers: { 'Authorization': token },
            body: {
                "title": tittle,
                "author": "lukeeeraa",
                "description": "realidade",
                "category": "Lit Braira",
                "isbn": "978-45-2550-1320-6",
                "editor": "Editora 43",
                "language": "Português",
                "publication_year": 2023,
                "pages": 31,
                "format": "Físico",
                "total_copies": 4,
                "available_copies": 4
            }
        }
        ).should(response => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Livro criado com sucesso.')
        })
    });

    it('Deve validar um livro já criado', () => {
        cy.api({
            method: 'POST',
            url: 'books',
            headers: { 'Authorization': token },
            body: {
                "title": "muiee confusa",
                "author": "lukraa",
                "description": "realidade",
                "category": "Lit Braira",
                "isbn": "978-45-2550-1320-6",
                "editor": "Editora 43",
                "language": "Português",
                "publication_year": 2023,
                "pages": 31,
                "format": "Físico",
                "total_copies": 4,
                "available_copies": 4
            },
            failOnStatusCode: false
        }
        ).should(response => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe um livro com este título e autor.')
        })

    });

    describe('PUT Teste de API Atualizar livro', () => {
        it('Deve atualizar um Livro com sucesso', () => {
            cy.api({
                method: 'PUT',
                url: 'books/10',
                headers: { 'Authorization': token },
                body: {
                    "title": "Nome livro atualizado",
                    "author": "Autor Atualizado",
                    "description": "Descrição atualizada do livro",
                    "category": "Categoria atualizada",
                    "editor": "Editora Atualizada",
                    "language": "Português",
                    "publication_year": 2000,
                    "pages": 300,
                    "format": "Físico",
                    "total_copies": 10,
                    "available_copies": 5
                }
            }).should(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Livro atualizado com sucesso.')
            })
        });

        it('Deve atualizar um livro com sucesso dinamicamente', () => {
            let tittle = `romance adolecente${Date.now()}`
            cy.Cadastrarlivros(tittle, 'lukeeeraa', 'realidade', 'Literatura', 'Editora21', 'Português', 'Físico').then(BookID => {
                cy.api({
                method: 'PUT',
                url: 'books/' + BookID,
                headers: { 'Authorization': token },
                body: {
                    "title": tittle,
                    "author": "Autor Atualizado",
                    "description": "Descrição atualizada do livro",
                    "category": "Categoria atualizada",
                    "editor": "Editora Atualizada",
                    "language": "Português",
                    "publication_year": 2000,
                    "pages": 300,
                    "format": "Físico",
                    "total_copies": 10,
                    "available_copies": 5
                }
            }).should(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Livro atualizado com sucesso.')
            })      
            })
             });
             });

});
        describe('Delete - Apagar livros', () => {
            it('Deve Deletar livro com sucesso', () => {
                cy.api({
                    method: 'DELETE',
                    url: 'books/8',
                    headers: { 'Authorization': token },

                }).should(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Livro deletado com sucesso.')
                })    
            });

            it.only('Deve deletar um livro dinamicamente', () => {
                cy.Cadastrarlivros('LivroDeletado', 'LukDelete', 'Apagar', 'naoexiste', 'Editora21', 'Português', 'Físico').then(BookID => {
                   cy.api({
                    method: 'DELETE',
                    url:'books/' + BookID,
                    headers: { 'Authorization': token },

                }).should(response => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Livro deletado com sucesso.')
                }) 
                })

                
            });
            
        });