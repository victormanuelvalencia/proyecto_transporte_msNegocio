import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.alphaNum({
        allow: ['space']
      })
    ]),
    zip_code: schema.number(),
  })

  public messages: CustomMessages = {
    'name.required': 'El campo name es obligatorio',
    'name.regex': 'El name solo puede contener letras y espacios',
    'zip_code.required': 'El código postal es obligatorio',
    'zip_code.number': 'El código postal debe ser un número',
  }
}
