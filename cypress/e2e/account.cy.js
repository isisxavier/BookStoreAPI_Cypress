import ValidaBookstore from '../services/validacao'


describe('Casos de teste sobre a rota /account/v1/Users da API Book Store', () => {


    describe('Casos positivos de sucesso.', () => {
  
      it('Cria usuário', () => {
        cy.geraUser().then(res => {
            cy.contractValidation(res, 'account/post_account_user', 201)
        })
      })
    })


  
    describe('Casos positivos de erro', () => {
  
      it('Não deve ser possível tentar gerar usuário ja existente', () => {
        cy.geraUserExistente().then(res => {
            cy.contractValidation(res, 'account/post_account_user', 406)
            expect(res.body.message).to.be.eq('User exists!')
        })
      })



    })



    describe('Casos de erros não documentados', () => {
  
        it('Deve retornar erro se o campo USERNAME estiver em branco', () => {
          cy.geraUserSemUserName().then(res => {
              cy.contractValidation(res, 'account/post_account_user_undoc', 400)
              expect(res.body.message).to.be.eq('UserName and Password required.')
            })
        })
        
        it('Deve retornar erro se o campo PASSWORD estiver em branco', () => {
            cy.geraUserSemSenha().then(res => {
                cy.contractValidation(res, 'account/post_account_user_undoc', 400)
                expect(res.body.message).to.be.eq('UserName and Password required.')
            })
        })

        context('Validando senhas', () => {

            it('Deve retornar erro se a senha não possuir número', () => {
            cy.gerarSenhaSemNúmero().then(res => {
                ValidaBookstore.validarSenhaSemNum(res)
                })
            })

            it('Deve retornar erro se a senha não possuir letra maiúscula', () => {
            cy.gerarSenhaSemLetraMaiuscula().then(res => {
                ValidaBookstore.validarSenhaSemMaiuscula(res)
                })
            })

            it('Deve retornar erro se a senha não possuir letra minúscula', () => {
                cy.gerarSenhaSemLetraMinuscula().then(res => {
                    ValidaBookstore.validarSenhaSemMinuscula(res)
                    })
                })

            it('Deve retornar erro se a senha não possuir caractere especial', () => {
            cy.gerarSenhaSemCaractereEspc().then(res => {
                ValidaBookstore.validarSenhaSemCaractere(res)
                })
            })  

            it('Deve retornar erro se a senha for menor que 8 caracteres', () => {
            cy.gerarSenhaMenorOito().then(res => {
                ValidaBookstore.validarSenhaMenorOito(res)
                })
            })
        })

        
  
  
    })
  
  
  
  })