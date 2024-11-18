import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string(), // Validación manual al integrarse con el MS de seguridad
    license_number: schema.string({}, [
      rules.regex(/^\d+$/), // Solo permite números
      rules.maxLength(20),
    ]),
    license_expiry: schema.string({}, [
      rules.regex(/^\d{4}-\d{2}-\d{2}$/), // Validación de fecha en formato YYYY-MM-DD
    ]),
  });

  public messages: CustomMessages = {
    'user_id.required': 'El campo user_id es obligatorio.',
    'license_number.required': 'El número de licencia es obligatorio.',
    'license_number.regex': 'El número de licencia solo debe contener números.',
    'license_number.maxLength': 'El número de licencia no puede tener más de 20 caracteres.',
    'license_expiry.required': 'La fecha de vencimiento de la licencia es obligatoria.',
    'license_expiry.regex': 'La fecha de vencimiento debe tener el formato YYYY-MM-DD.',
  };
}