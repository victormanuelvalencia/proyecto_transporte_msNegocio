import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public static baseSchema = {
    name: schema.string({}, [
      rules.regex(/^[A-Za-z\s]+$/),
      rules.maxLength(255),
    ]),
    phoneNumber: schema.string({}, [
      rules.mobile(),
      rules.maxLength(15),
    ]),
    address: schema.string({}, [
      rules.maxLength(500),
    ]),
  };

  public static messages: CustomMessages = {
    'name.required': 'El campo nombre es obligatorio',
    'name.regex': 'El nombre solo puede contener letras y espacios',
    'phoneNumber.required': 'El número de teléfono es obligatorio',
    'phoneNumber.mobile': 'El número de teléfono debe ser un número de móvil válido',
    'address.required': 'La dirección es obligatoria',
  };
}
