import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  // Cambiar a 'public' para que Adonis pueda acceder sin problemas
  public schema = schema.create({
    name: schema.string({}, [
      rules.regex(/^[A-Za-z\s]+$/),
      rules.maxLength(255),
    ]),
    phone_number: schema.string({}, [
      rules.mobile(),
      rules.maxLength(15),
    ]),
    address: schema.string({}, [
      rules.maxLength(500),
    ]),
  });

  public messages: CustomMessages = {
    'name.required': 'El campo nombre es obligatorio',
    'name.regex': 'El nombre solo puede contener letras y espacios',
    'phone_number.required': 'El número de teléfono es obligatorio',
    'phone_number.mobile': 'El número de teléfono debe ser un número de móvil válido',
    'address.required': 'La dirección es obligatoria',
  };
}
