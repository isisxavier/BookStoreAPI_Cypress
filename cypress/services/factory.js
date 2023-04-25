import { faker } from '@faker-js/faker';

export default class gerarDados{

    /*----------- ACCOUNT/------------- */

    static criarUsuário(){
        return{
            "userName":faker.internet.userName(),
            "password":faker.internet.password(6)+'aP@1'  
        }
    }

    static criarUsuárioSemUserName(){
        return{
            "userName": "",
            "password":faker.internet.password(6)+'aP@1'  
        }
    }

    static criarUsuárioSemSenha(){
        return{
            "userName": faker.internet.userName(),
            "password":""
        }
    }

    static geraUserIDAleatorio(){
        return{
           "userID": faker.datatype.uuid(),
        }
    }

    //validar senha

    static criarSenhaSemNumero(){
        return{
            "userName": faker.internet.userName(),
            "password":"SenhaSen@"
        }
    }

    static criarSenhaSemLetraMaiuscula(){
        return{
            "userName": faker.internet.userName(),
            "password":"senhaa@01"
        }
    }

    static criarSenhaSemLetraMinuscula(){
        return{
            "userName": faker.internet.userName(),
            "password":"SENHAA@01"
        }
    }

    static criarSenhaSemCaractereEspc(){
        return{
            "userName": faker.internet.userName(),
            "password":"SenhaS01"
        }
    }

    static criarSenhaMenorOito(){
        return{
            "userName": faker.internet.userName(),
            "password":"Sen@01"
        }
    }

    
    /*----------- BOOKSTORE/------------- */
    
    static geraIsbnAleatorio(){
        return{
           "isbn": faker.datatype.number({ min: 10000000, max: 99999999 }),
        }
    }

}