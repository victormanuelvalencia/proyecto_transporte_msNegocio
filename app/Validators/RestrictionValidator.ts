import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestrictionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({
      format: 'yyyy-MM-dd',
    }),
    end_date: schema.date({
      format: 'yyyy-MM-dd',
    }),
    description: schema.string({}, [
      rules.regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/), // Solo letras y tildes
    ]),
  })

  public messages: CustomMessages = {
    'start_date.required': 'La fecha de vencimiento es obligatoria',
    'start_date.date': 'La fecha de vencimiento debe ser una fecha válida en el formato YYY-MM-DD',
    'end_date.required': 'La fecha de vencimiento es obligatoria',
    'end_date.date': 'La fecha de vencimiento debe ser una fecha válida en el formato YYY-MM-DD',
    'description.regex': 'La descripción solo debe contener letras y tildes.',
  }
}