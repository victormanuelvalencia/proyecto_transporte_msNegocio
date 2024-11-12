import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from './UserValidator'

export default class OwnerValidator extends UserValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    ...UserValidator.baseSchema, // Hereda las validaciones de Usuario
  });

  public messages: CustomMessages = {
    ...UserValidator.messages, // Hereda los mensajes de Usuario
  };
}