import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({/*
    user_id: schema.number([
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    license_number: schema.string({}, [
      rules.regex(/^\d+$/), // Solo permite números
      rules.maxLength(20),
    ]),
    license_expity: schema.string({}, [
      rules.regex(/^\d{4}-\d{2}-\d{2}$/), // Validación de fecha en formato YYYY-MM-DD
    ]),*/
  });
  
  public messages: CustomMessages = {/*
    'user_id.required': 'El campo user_id es obligatorio',
    'user_id.exists': 'El user_id debe existir en la tabla de usuarios',
    'license_number.required': 'El ID del conductor es obligatorio',
    'license_number.unsigned': 'El ID del conductor debe ser un número positivo',
    'license_number.maxLength': 'El número de licencia no puede tener más de 20 caracteres',
    'license_expity.required': 'El campo fecha de vencimiento de la licencia es obligatorio',
    'license_expity.regex': 'La fecha de vencimiento de la licencia debe tener el formato YYYY-MM-DD',
  */};
}