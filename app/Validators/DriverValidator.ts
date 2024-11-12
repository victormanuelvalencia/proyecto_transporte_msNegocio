import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.regex(/^[A-Za-z\s]+$/), // Solo letras y espacios
      rules.maxLength(255),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.maxLength(255),
    ]),
    phoneNumber: schema.string({}, [
      rules.mobile(),
      rules.maxLength(15),
    ]),
    address: schema.string({}, [
      rules.maxLength(500),
    ]),
    licenseNumber: schema.string({}, [
      rules.minLength(5),
      rules.maxLength(20),
    ]),
  });

  public messages: CustomMessages = {
    'name.required': 'El campo nombre es obligatorio',
    'name.regex': 'El nombre solo puede contener letras y espacios',
    'phoneNumber.required': 'El número de teléfono es obligatorio',
    'phoneNumber.mobile': 'El número de teléfono debe ser un número de móvil válido',
    'address.required': 'La dirección es obligatoria',
    'licenseNumber.required': 'El número de licencia es obligatorio',
    'licenseNumber.minLength': 'El número de licencia debe tener al menos 5 caracteres',
    'licenseNumber.maxLength': 'El número de licencia no puede exceder los 20 caracteres',
  };
}