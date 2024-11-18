import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    license_number: schema.string({}, [
      rules.regex(/^\d{1,15}$/), // Número de licencia de hasta 15 dígitos
    ]),
    rating: schema.number([
      rules.range(0, 10), // Validación de número en el rango de 0 a 10
    ]),
    license_expiry: schema.date(),
    user_id: schema.string(), // Debe validarse manualmente al integrarse con el microservicio de seguridad
  });

  public messages: CustomMessages = {
    'license_number.regex': 'El número de licencia debe ser numérico y de hasta 10 dígitos.',
    'license_expiry.date': 'La fecha de expiración de la licencia debe ser una fecha válida.',
    'user_id.string': 'El ID de usuario debe ser una cadena de texto.',
    'rating.required': 'El campo rating es obligatorio',
    'rating.range': 'El rating debe ser un número entre 0 y 10',
  };
}
