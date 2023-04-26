<h1 align="center">Automação com Cypress - BookStoreAPI</h1>
Olá! Este é o repositório do projeto que desenvolvi com o objetivo de automatizar testes back-end da API Bookstore (https://bookstore.toolsqa.com/swagger/) para estudo de cypress e verificar o comportamento da aplicação em relação a uma variedade de cenários e entradas de dados. Eles cobrem os principais endpoints da API e testam a validação dos dados de entrada e saída usando o AJV. 
<br>
<br>
A API Bookstore é uma aplicação de demonstração fornecida pela ToolsQA, que oferece endpoints para cadastrar usuário, e endpoints que engloba o gerenciamento dos cadastros dos livros no "carrinho" desses usuários.
<br>
<br>
<strong>Neste projeto os testes não estão cobertos 100%, a automação foi feita de acordo com as prioridades que separei relacionada ao fluxo principal da aplicaçao.</strong>
<br>
<br>
No mapa mental abaixo as rotas que se encontram à direita são consideradas de prioridade alta, ou seja, são indispensáveis para o funcionamento do fluxo principal da API:
<br>
<p align="center">
<img width="712" alt="2023-04-25 03_07_14-Book Store API" src="https://user-images.githubusercontent.com/71040642/234188661-9b174170-986d-44db-b950-902ce2128f25.png">
</p>
<br>
<br>

## 📝Pré-requisitos
### Será necessário:

* VsCode: https://code.visualstudio.com/download <br>
* NodeJS: https://nodejs.org/en/download/ <br>
* Git: https://git-scm.com

## 🔒Instalaçao
Será preciso instalar o cypress:
> A pasta node_modules estará no .gitignore, este comando abaixo fará a pasta aparecer.
```
npm install cypress --save-dev
```

Será preciso instalar o faker:
```
npm install @faker-js/faker --save-dev
```

## 🎲Executar os testes
### Os testes são executados no ambiente de produção. 
Para ser executado será necessário abrir um terminal e rodar o comando:
```
npm run cy:open
```

## A tela gráfica do cypress será aberta:
<img width="627" alt="abrircypress" src="https://user-images.githubusercontent.com/71040642/232140210-a9ed78c2-e96d-42ee-a083-9a335df9b8f6.png">
<br>
* Nessa aba mostrada acima, após clicar em E2E testing, deve escolher um navegador. Para os meus testes usei o Chrome.
<br>
<br>
* Quando um navegador for escolhido será aberto outra tela, possuindo as especs dos testes:
<br>
<img width="680" alt="2023-04-25 03_14_29-APIBookStore" src="https://user-images.githubusercontent.com/71040642/234190042-5c85b0be-7e2b-462f-82c1-da0f36459c1b.png">
<br>
* É só selecionar a spec desejada que o teste será rodado com sucesso.

## ⚙️Tecnologias

* VsCode
* Node.JS
* Cypress
* Faker
* Cypress
* JavaScript
* Faker
* AJV

## ✏️Autora

* Desenvolvedora e tester -> Isis Xavier
