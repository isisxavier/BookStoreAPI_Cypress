
export default class ValidaBookstore {

    static validarSenhaSemNum(res){
        cy.contractValidation(res, 'account/post_account_user_undoc2', 400)
        expect(res.body.message).to.be.eq("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    }

    static validarSenhaSemMaiuscula(res){
        cy.contractValidation(res, 'account/post_account_user_undoc2', 400)
        expect(res.body.message).to.be.eq("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    }

    static validarSenhaSemMinuscula(res){
        cy.contractValidation(res, 'account/post_account_user_undoc2', 400)
        expect(res.body.message).to.be.eq("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    }

    static validarSenhaSemCaractere(res){
        cy.contractValidation(res, 'account/post_account_user_undoc2', 400)
        expect(res.body.message).to.be.eq("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    }

    static validarSenhaMenorOito(res){
        cy.contractValidation(res, 'account/post_account_user_undoc2', 400)
        expect(res.body.message).to.be.eq("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    }

}