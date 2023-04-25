import ValidaBookstore from '../services/validacao'


describe('Casos de teste sobre a rota GET /BookStore/v1/Books da API Book Store', () => {


    describe('Casos positivos de sucesso.', () => {
  
      it('Busca todos os livros', () => {
        cy.buscaLivros().then(res => {
            ValidaBookstore.validaBuscaDeLivros(res)
        })
      })
    })

})


describe('Casos de teste sobre a rota POST /BookStore/v1/Books da API Book Store', () => {


  describe('Casos positivos de sucesso.', () => {

    before('Criar usuário', () => {
      cy.geraUserParaToken().then((user) => {
        cy.geraToken(user.userName, user.password).then(() =>{
          cy.geraAutorização(user.userName, user.password).then(res => {
            ValidaBookstore.validarGerarAutorizationTrue(res)
          })
        })
      })
    })
      
    it('Deve colocar com sucesso um livro no carrinho do usuário', () => {
      cy.buscaLivros().then(isbn => {
          cy.colocaLivroCarrinho(isbn).then(res => {
            ValidaBookstore.validaCadastroLivroCarrinho(res)
          })
      })
    })

    after('Busca dado do usuário para confirmar se o livro foi cadastrado', () => {
      cy.buscaDetalhesUser().then(res => {
        ValidaBookstore.validaBuscaUserComLivro(res)
      })
    })

  })

  describe('Casos positivos de erro.', () => {

    context('Tentar cadastrar livro em um user sem autorização', () => {
      
      before('Criar usuário sem autorização', () => {
        cy.geraUserParaToken().then((user) => {
          cy.geraAutorização(user.userName, user.password).then(res => {
            ValidaBookstore.validarGerarAutorizationFalse(res)
          })
        })
      })
      
      it('Deve retornar erro ao tentar colocar livro no carrinho de usuário sem autorização', () => {
        cy.buscaLivros().then(isbn => {
          cy.colocaLivroCarrinhoSemAuth(isbn).then(res => {
            ValidaBookstore.validaNaoCadastroLivrosNoCarrinho(res)
          })
        })
      })

      after('Busca dado do usuário para confirmar se o livro não foi cadastrado', () => {
        cy.buscaDetalhesUserSemAuth().then(res => {
          ValidaBookstore.validaBuscaUserInvalidoComLivro(res)
        })
      })
    })

    context('Tentar cadastrar livro inválido', () => {
      
      before('Criar usuário', () => {
        cy.geraUserParaToken().then((user) => {
          cy.geraToken(user.userName, user.password).then(() =>{
            cy.geraAutorização(user.userName, user.password).then(res => {
              ValidaBookstore.validarGerarAutorizationTrue(res)
            })
          })
        })
      })
      
      it('Deve retornar erro ao tentar cadastrar livro inválido no carrinho de usuário válido', () => {
          cy.colocaLivrosIsbnInvalido().then(res => {
            ValidaBookstore.validaIsbnInvalido(res)
          })
      })

      after('Busca dado do usuário para confirmar se o livro não foi cadastrado', () => {
        cy.buscaDetalhesUser().then(res => {
          ValidaBookstore.validaBuscaUser(res)
        })
      })

    })

    context('Tentar cadastrar livro em usuário inválido', () => {
      
      before('Cria userId inválido + cria token válido', () => {
        cy.geraUserIDInvalido().then(user => {
          cy.geraToken(user.userName, user.password).then(() =>{
                cy.buscaDetalhesUser().then(res => {
                    ValidaBookstore.validaBuscaUserIDInvalido(res)
                  })
          })
        })
      })
      
      it('Deve retornar erro ao tentar cadastrar livro válido no carrinho de usuário inválido', () => {
        cy.buscaLivros().then(isbn => {
          cy.colocaLivroCarrinho(isbn).then(res => {
            ValidaBookstore.validaCadastroLivrosUserInvalido(res)
          })
        })
      })
      
    })
  })
})


describe('Casos de teste sobre a rota DELETE /BookStore/v1/Book da API Book Store', () => {


  describe('Casos positivos de sucesso.', () => {

    before('Criar usuário e cadastra livro', () => {
      cy.geraUserParaToken().then((user) => {
        cy.geraToken(user.userName, user.password).then(() =>{
          cy.geraAutorização(user.userName, user.password).then(res => {
            ValidaBookstore.validarGerarAutorizationTrue(res)
          })
        })
      })
      cy.buscaLivros().then(isbn => {
        cy.colocaLivroCarrinho(isbn).then(res => {
          ValidaBookstore.validaCadastroLivroCarrinho(res)
        })
    })

    })

    it('Deve deletar livro com sucesso', () => {
      cy.deletaLivroCarrinho().then(res => {
        ValidaBookstore.validaDeletarLivro(res)
      })
    })
  })

  describe('Casos positivos de erro.', () => {

    context('Tentar deletar livro em um user sem autorização', () => {
      
      before('Criar usuário sem autorização', () => {
        cy.geraUserParaToken().then((user) => {
          cy.geraAutorização(user.userName, user.password).then(res => {
            ValidaBookstore.validarGerarAutorizationFalse(res)
          })
        })
        cy.buscaLivros().then(isbn => {
          cy.colocaLivroCarrinhoSemAuth(isbn).then(res => {
            ValidaBookstore.validaNaoCadastroLivrosNoCarrinho(res)
          })
        })
      })
      
      it('Deve retornar erro ao tentar deletar livro de user sem autorização', () => {
        cy.deletaLivroCarrinhoSemAuth().then(res => {
          ValidaBookstore.validaDeletarLivroSemAuth(res)
        })
      })

    })

    context('Tentar deletar livro de user inválido', () => {
      
      before('Cria userId inválido + cria token válido', () => {
        cy.geraUserIDInvalido().then(user => {
          cy.geraToken(user.userName, user.password).then(() =>{
            cy.buscaDetalhesUser().then(res => {
              ValidaBookstore.validaBuscaUserIDInvalido(res)
            })
          })
        })
        cy.buscaLivros().then(isbn => {
          cy.colocaLivroCarrinho(isbn).then(res => {
            ValidaBookstore.validaCadastroLivrosUserInvalido(res)
          })
        })
      })
      
      it('Deve retornar erro ao tentar deletar livro válido no carrinho de usuário inválido', () => {
        cy.deletaLivroCarrinho().then(res => {
          ValidaBookstore.validaDeletarLivroUserInvalido(res)
        }) 
      })

    })

    context('Tentar deletar livro que não está no carrinho do User', () => {
      
      before('Cria userId inválido + cria token válido', () => {
        cy.geraUserParaToken().then((user) => {
          cy.geraToken(user.userName, user.password).then(() =>{
            cy.geraAutorização(user.userName, user.password).then(res => {
              ValidaBookstore.validarGerarAutorizationTrue(res)
            })
          })
        })
        cy.buscaLivros().then(isbn => {
          cy.colocaLivroCarrinho(isbn).then(res => {
            ValidaBookstore.validaCadastroLivroCarrinho(res)
          })
      })
      })
      
      it('Deve retornar erro ao tentar deletar livro que não está no carrinho do usuário.', () => {
        cy.deletaLivroCarrinhoIsbnInvalido().then(res => {
          ValidaBookstore.validaDeletarLivroInvalido(res)
        })
      })
      
    })
  })

})
