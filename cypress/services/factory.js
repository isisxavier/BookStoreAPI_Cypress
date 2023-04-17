import { faker } from '@faker-js/faker';

export default class gerarDados{

    static criarUsuário(){
        return{
            "userName":faker.internet.userName(),
            "password":faker.internet.password(6)+'aP@1'  
        }
    }

    static criarUsuárioSemUserName(){
        return{
            "userName": "",
            "password":faker.internet.password(6)+'@01'  
        }
    }

    static criarUsuárioSemSenha(){
        return{
            "userName": faker.internet.userName(),
            "password":""
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

    

    

}