import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RestaurantValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_name: schema.string(),
    location: schema.string(),
    description: schema.string(),
    total_ammount: schema.number([rules.unsigned()]), // Solo números positivos
    meal_type: schema.string(),
  });

  public messages: CustomMessages = {
    'service_name.string': 'El nombre del servicio debe ser una cadena de texto.',
    'location.string': 'La ubicación debe ser una cadena de texto.',
    'description.string': 'La descripción debe ser una cadena de texto.',
    'total_ammount.unsigned': 'El monto total debe ser un número positivo.',
    'meal_type.string': 'El tipo de comida debe ser una cadena de texto.',
  };
}
