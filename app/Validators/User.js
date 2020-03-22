'use strict'

class cnpj {
  get rules () {
    return {
      name: 'required',
      lastName: 'required',
      cpf: 'cpf'
    }
  }

  get messages(){
    return{
      'name.required': 'name is required',
      'cpf.cpf': 'Verifique o CPF informado'
    }
  }

}

module.exports = cnpj
