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

let token

beforeEach(() => {
    cy.tokengerado('admin@biblioteca.com', 'admin123').then(tkn => {
        token = tkn
    })
});



Cypress.Commands.add('tokengerado', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: { 
            email: email,
            password: password,
        }
    }).then((response) => {
       expect(response.status).to.equal(200)
       return response.body.token 
    })

 })
Cypress.Commands.add('Cadastrarlivros',(tittle, author, description, category, isbn, editor, language, format) =>{
     cy.api({
            method: 'POST',
            url: 'books',
            headers: { 'Authorization': token },
            body: {
                "title": tittle,
                "author": author,
                "description": description,
                "category": category,
                "isbn": isbn,
                "editor": editor,
                "language": language,
                "publication_year": 2023,
                "pages": 31,
                "format": format,
                "total_copies": 4,
                "available_copies": 4
            }
        }).then(response => {
            expect(response.status).to.equal(201)
            return response.body.book.id
        })
})