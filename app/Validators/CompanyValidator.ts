import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CompanyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/), // Solo letras y tildes
    ]),
    nit: schema.string({}, [
      rules.regex(/^\d+$/), // Solo números
      rules.maxLength(15), // Máximo de 15 caracteres (ajustar según necesidad)
    ]),
    contact: schema.string({}, [
      rules.regex(/^\d+$/), // Solo números telefónicos
    ]),
  });

  public messages: CustomMessages = {
    'name.regex': 'El nombre solo debe contener letras y tildes.',
    'nit.regex': 'El NIT debe contener solo números.',
    'nit.maxLength': 'El NIT no puede tener más de 15 caracteres.',
    'contact.regex': 'El contacto debe contener solo números telefónicos.',
  };
}