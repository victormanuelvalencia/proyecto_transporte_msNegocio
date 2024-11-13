import UserValidator from 'App/Validators/UserValidator';
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class OwnerValidator extends UserValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  // Extiende el esquema de validación base
  public schema = schema.create({
    ...this.schema.tree, // Extiende las reglas de la clase base
    license_number: schema.number([
      rules.unsigned(),
    ]),
  });

  public messages: CustomMessages = {
    ...this.messages, // Hereda los mensajes de la clase base
    'license_number.required': 'El ID del conductor es obligatorio',
    'license_number.unsigned': 'El ID del conductor debe ser un número positivo',
  };
}
