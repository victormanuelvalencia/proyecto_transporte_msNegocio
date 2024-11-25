import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipalityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string({}, [
      rules.regex(/^[A-Za-z\s]+$/), // Solo letras y espacios
    ]),
    startDate: schema.date(),
    endDate: schema.date()
  })

  public messages: CustomMessages = {
    'description.required': 'El campo descripción es obligatorio',
    'description.regex': 'La descripción solo puede contener letras y espacios',
    'startDate.date': 'El campo startDate debe de ser una fecha valida',
    'endDate.date': 'El campo endDate debe de ser una fecha valida',
  }
}
