'use strict'

Http.onStart = function () {

    const Validator = use('Adonis/Addons/Validator')
    Validator.extend('when', (data, field, message, args, get) => {
  
      return new Promise((resolve, reject) => {
        const fieldValue = get(data, field)
        if (fieldValue == ">" || fieldValue == "<" || fieldValue == "=") {
          resolve('Allowed')
          return
        }
        reject(message)
      })
  
    }, 'When need be ">", "<" or "="')
  
  }