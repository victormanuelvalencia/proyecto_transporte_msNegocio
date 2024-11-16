import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    driver_id: schema.number([
      rules.exists({ table: 'drivers', column: 'id' }),
    ]),
    rating: schema.number([
      rules.range(0, 10), // Validación de número en el rango de 0 a 10
    ]),
  });
  
  public messages: CustomMessages = {
    'user_id.required': 'El campo user_id es obligatorio',
    'user_id.exists': 'El user_id debe existir en la tabla de usuarios',
    'driver_id.required': 'El ID del conductor es obligatorio',
    'driver_id.exists': 'El driver_id debe existir en la tabla de conductores',
    'rating.required': 'El campo rating es obligatorio',
    'rating.range': 'El rating debe ser un número entre 0 y 10',
  };
}