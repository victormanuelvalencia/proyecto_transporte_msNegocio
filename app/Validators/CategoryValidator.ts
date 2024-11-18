import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/), // Solo letras y tildes
    ]),
    description: schema.string({}, [
      rules.regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/), // Solo letras y tildes
    ]),
    parent_id: schema.number.optional([
      rules.exists({ table: 'categories', column: 'id' }), // Verifica existencia en la tabla `categories`
    ]),
  });

  public messages: CustomMessages = {
    'name.regex': 'El nombre solo debe contener letras y tildes.',
    'description.regex': 'La descripción solo debe contener letras y tildes.',
    'parent_id.exists': 'El parent_id proporcionado no existe en la tabla de categorías.',
  };
}