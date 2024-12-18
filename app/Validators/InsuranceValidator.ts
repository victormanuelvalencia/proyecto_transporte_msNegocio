import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InsuranceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    policy_number: schema.string({}, [
      rules.maxLength(100),
    ]),
    expiration_date: schema.date({
      format: 'yyyy-MM-dd',
    }),
  });

  public messages: CustomMessages = {
    'policy_number.required': 'El número de póliza es obligatorio',
    'expiration_date.required': 'La fecha de vencimiento es obligatoria',
    'expiration_date.date': 'La fecha de vencimiento debe ser una fecha válida en el formato YYY-MM-DD',
  };
}  