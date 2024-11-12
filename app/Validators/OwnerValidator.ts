import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.regex(/^[A-Za-z\s]+$/), // Solo letras y espacios
      rules.maxLength(255),
    ]),
    phoneNumber: schema.string({}, [
      rules.mobile(),
      rules.maxLength(15),
    ]),
    address: schema.string({}, [
      rules.maxLength(500),
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'El campo nombre es obligatorio',
    'name.regex': 'El nombre solo puede contener letras y espacios',
    'phoneNumber.required': 'El número de teléfono es obligatorio',
    'phoneNumber.mobile': 'El número de teléfono debe ser un número de móvil válido',
    'address.required': 'La dirección es obligatoria',
  }
}  