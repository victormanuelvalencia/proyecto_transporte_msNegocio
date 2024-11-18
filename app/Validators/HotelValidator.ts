import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_name: schema.string({}, [
      rules.regex(/^[a-zA-Z\s]+$/), // Solo letras
    ]),
    location: schema.string({}, [
      rules.regex(/^[a-zA-Z\s]+$/), // Solo letras
    ]),
    description: schema.string({}, [
      rules.regex(/^[a-zA-Z\s]+$/), // Solo letras
    ]),
    total_amount: schema.number([ 
      rules.unsigned(), // Solo números positivos
    ]),
    total_nights: schema.number([ 
      rules.range(1, 99), // Número entre 1 y 99
    ]),
    room_type: schema.string(),
  });

  public messages: CustomMessages = {
    'service_name.regex': 'El nombre del servicio solo debe contener letras.',
    'location.regex': 'La ubicación solo debe contener letras.',
    'description.regex': 'La descripción solo debe contener letras.',
    'total_amount.unsigned': 'El monto total debe ser un número positivo.',
    'total_nights.range': 'El número de noches debe ser un valor entre 1 y 99.',
  };
}