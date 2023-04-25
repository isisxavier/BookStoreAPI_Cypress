import gerarDados from "../services/factory"


import Ajv from 'ajv'
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

const URL_ACCOUNT = "/Account/v1"
const URL_BOOKSTORE = "/BookStore/v1"



/*----------- CONTRATO ------------- */
Cypress.Commands.add('contractValidation', (res, schema, status) => {

    cy.log('Contrato sendo validado pra ' + schema + ' tendo status ' + status)
    cy.fixture(`schemas/${schema}/${status}.json`).then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        
        if(!valid){
            var errors = ''
            for(let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`
            } 
            throw new Error('Erros encontrados na validação de contrato, por favor verifique: '+ errors) 
        }
        return true
    })
})


/*------------------------ ACCOUNT -------------------------- */

/*----------- ACCOUNT/USERS ------------- */

Cypress.Commands.add('geraUser', () => {
    let criaUser = gerarDados.criarUsuário()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: criaUser
    })
})

Cypress.Commands.add('geraUserParaToken', () => {
    let criaUser = gerarDados.criarUsuário()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: criaUser,
        
    }).then(res => {
        const userID = res.body.userID;
        Cypress.env('userID', userID)
        return{
            userName: criaUser.userName,
            password: criaUser.password,
        }
    })
})

Cypress.Commands.add('geraUserIDInvalido', () => {
    let criaUser = gerarDados.criarUsuário()
    let criaUserID = gerarDados.geraUserIDAleatorio()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: criaUser,
        
    }).then(() => {
        const userID = criaUserID.userID;
        Cypress.env('userID', userID)
        return{
            userName: criaUser.userName,
            password: criaUser.password,
        }
    })
})

Cypress.Commands.add('geraUserExistente', () => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: {
            userName: "Isis",
            password: "Senha@01"
        }
    })
})

Cypress.Commands.add('geraUserSemUserName', () => {

    let semUser = gerarDados.criarUsuárioSemUserName()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: semUser
    })
})

Cypress.Commands.add('geraUserSemSenha', () => {

    let semSenha = gerarDados.criarUsuárioSemSenha()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: semSenha
    })
})

// -Validando senhas
Cypress.Commands.add('gerarSenhaSemNúmero', () => {

    let senhaSemNum = gerarDados.criarSenhaSemNumero()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: senhaSemNum
    })
})

Cypress.Commands.add('gerarSenhaSemLetraMaiuscula', () => {

    let senhaSemLetraMa = gerarDados.criarSenhaSemLetraMaiuscula()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: senhaSemLetraMa
    })
})

Cypress.Commands.add('gerarSenhaSemLetraMinuscula', () => {

    let senhaSemLetraMi = gerarDados.criarSenhaSemLetraMinuscula()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: senhaSemLetraMi
    })
})

Cypress.Commands.add('gerarSenhaSemCaractereEspc', () => {

    let senhaSemCaractere = gerarDados.criarSenhaSemCaractereEspc()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: senhaSemCaractere
    })
})

Cypress.Commands.add('gerarSenhaMenorOito', () => {

    let senhaMenorOito = gerarDados.criarSenhaMenorOito()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: senhaMenorOito
    })
})

Cypress.Commands.add('salvarUserId', () => {
    const userID = Cypress.env('userID')
    return userID
})

/*----------- ACCOUNT/GENERATETOKEN ------------- */

Cypress.Commands.add('salvarToken', () => {
    const token = Cypress.env('token')
    return token
})

Cypress.Commands.add('geraToken', (userName, password) => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/GenerateToken',
        failOnStatusCode: false,
        body: {
            "userName": userName,
            "password": password
        }
    }).then(res => {
        const token = res.body.token;
        Cypress.env('token', token)
    })
})

Cypress.Commands.add('geraTokenUserErrado', () => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/GenerateToken',
        failOnStatusCode: false,
        body: {
            userName: "IsisUserErrado",
            password: "Senha@01"
        }
    })
})

Cypress.Commands.add('geraTokenSenhaErrada', () => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/GenerateToken',
        failOnStatusCode: false,
        body: {
            userName: "Isis",
            password: "SenhaErrada@01"
        }
    })
})


//Nesses dois, coloquei o dado de usuário que já existe
Cypress.Commands.add('geraTokenUserEmBranco', () => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/GenerateToken',
        failOnStatusCode: false,
        body: {
            userName: "",
            password: "Senha@01"
        }
    })
})

Cypress.Commands.add('geraTokenSenhaEmBranco', () => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/GenerateToken',
        failOnStatusCode: false,
        body: {
            userName: "Isis",
            password: ""
        }
    })
})

/*----------- ACCOUNT/AUTHORISATION ------------- */

Cypress.Commands.add('geraAutorização', (userName, password) => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/Authorized',
        failOnStatusCode: false,
        headers: {
            'Accept': 'application/json'
        },
        body: {
            "userName": userName,
            "password": password
        }
    })
})

Cypress.Commands.add('geraAutorizaçãoSemUser', (password) => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/Authorized',
        failOnStatusCode: false,
        headers: {
            'Accept': 'application/json'
        },
        body: {
            "userName": "",
            "password": password
        }
    })
})

Cypress.Commands.add('geraAutorizaçãoSemSenha', (userName) => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/Authorized',
        failOnStatusCode: false,
        headers: {
            'Accept': 'application/json'
        },
        body: {
            "userName": userName,
            "password": ""
        }
    })
})

Cypress.Commands.add('geraAutorizationUserInexistente', () => {
    let criaUser = gerarDados.criarUsuário()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/Authorized',
        failOnStatusCode: false,
        body: criaUser
    })
})

/*----------- ACCOUNT/USER/UUID ------------- */

Cypress.Commands.add('buscaDetalhesUser', () =>{

    cy.salvarUserId().then(userID => {
        return cy.request({
            method: 'GET',
            url: URL_ACCOUNT + '/User/' + userID,
            failOnStatusCode: false,
            auth:{
                bearer: Cypress.env('token')
            }
        })
    })
    
})

Cypress.Commands.add('buscaDetalhesUserSemAuth', () =>{

    cy.salvarUserId().then(userID => {
        return cy.request({
            method: 'GET',
            url: URL_ACCOUNT + '/User/' + userID,
            failOnStatusCode: false,
        })
    })
    
})

Cypress.Commands.add('buscaDetalhesUserSemToken', () =>{

    cy.salvarUserId().then(userID => {
        return cy.request({
            method: 'GET',
            url: URL_ACCOUNT + '/User/' + userID,
            failOnStatusCode: false
        })
    })
    
})

/*------------------------ BOOKSTORE -------------------------- */

/*----------- BOOKSTORE/BOOKS ------------- */
Cypress.Commands.add('salvarISBN', () => {
    const isbn = Cypress.env('isbn')
    return isbn
})

Cypress.Commands.add('buscaLivros', () => {

    
    return cy.request({
        method: 'GET',
        url: URL_BOOKSTORE + '/Books',
        failOnStatusCode: false

    }).then(res => {
        const books = res.body.books;
        const livroAleatorio = Math.floor(Math.random() * books.length);
        const isbn = books[livroAleatorio].isbn;
        Cypress.env('isbn', isbn)
    })
})

Cypress.Commands.add('colocaLivroCarrinho', () => {

    return cy.request({
        method: 'POST',
        url: URL_BOOKSTORE + '/Books',
        failOnStatusCode: false,
        auth:{
            bearer: Cypress.env('token')
        },
        body:{
            userId: Cypress.env('userID'),
            collectionOfIsbns: [
              {
                isbn: Cypress.env('isbn')
              }
            ]
          }
    })
})

Cypress.Commands.add('colocaLivroCarrinhoSemAuth', () => {
    let criaUserID = gerarDados.geraUserIDAleatorio()

    return cy.request({
        method: 'POST',
        url: URL_BOOKSTORE + '/Books',
        failOnStatusCode: false,
        body:{
            userId: criaUserID,
            collectionOfIsbns: [
              {
                isbn: Cypress.env('isbn')
              }
            ]
          }
    })
})

Cypress.Commands.add('colocaLivrosIsbnInvalido', () => {
    let criaISBN = gerarDados.geraIsbnAleatorio()
    
    return cy.request({
        method: 'POST',
        url: URL_BOOKSTORE + '/Books',
        failOnStatusCode: false,
        auth:{
            bearer: Cypress.env('token')
        },
        body:{
            userId: Cypress.env('userID'),
            collectionOfIsbns: [
              {
                isbn: criaISBN
              }
            ]
          }
    })
})



/*----------- BOOKSTORE/BOOK ------------- */

Cypress.Commands.add('deletaLivroCarrinho', () => {

    return cy.request({
        method: 'DELETE',
        url: URL_BOOKSTORE + '/Book',
        failOnStatusCode: false,
        auth:{
            bearer: Cypress.env('token')
        },
        body:{
            isbn: Cypress.env('isbn'),
            userId: Cypress.env('userID'),
          }
    })
})

Cypress.Commands.add('deletaLivroCarrinhoIsbnInvalido', () => {
    return cy.request({
        method: 'DELETE',
        url: URL_BOOKSTORE + '/Book',
        failOnStatusCode: false,
        auth:{
            bearer: Cypress.env('token')
        },
        body:{
            isbn: '9087898676',
            userId: Cypress.env('userID'),
          }
    })
})


Cypress.Commands.add('deletaLivroCarrinhoSemAuth', () => {

    return cy.request({
        method: 'DELETE',
        url: URL_BOOKSTORE + '/Book',
        failOnStatusCode: false,
        body:{
            isbn: Cypress.env('isbn'),
            userId: Cypress.env('userID'),
          }
    })
})
