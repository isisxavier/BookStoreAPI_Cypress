import gerarDados from "../services/factory"


import Ajv from 'ajv'
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

const URL_ACCOUNT = "/Account/v1"


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



/*----------- ACCOUNT ------------- */

Cypress.Commands.add('geraUser', () => {
    let criaUser = gerarDados.criarUsuário()

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: criaUser
    })
})

Cypress.Commands.add('geraUserExistente', () => {

    return cy.request({
        method: 'POST',
        url: URL_ACCOUNT + '/User',
        failOnStatusCode: false,
        body: {
            "userName": "Isis",
            "password": "Senha@01"
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

// -------------- Validando senhas
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