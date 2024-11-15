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
    // Campo 'email' con validación de formato y longitud
    email: schema.string({}, [
      rules.email(),
      rules.maxLength(255),
    ]),
    password: schema.string({}, [
      rules.minLength(8),
    ]),
    user_type: schema.enum(['owner', 'driver', 'naturalPerson', 'administrator'] as const),
  });

  public messages: CustomMessages = {
    'name.required': 'El campo nombre es obligatorio',
    'name.regex': 'El nombre solo puede contener letras y espacios',
    'email.required': 'El campo correo electrónico es obligatorio',
    'email.email': 'El correo electrónico debe ser una dirección válida',
    'password.required': 'El campo contraseña es obligatorio',
    'password.minLength': 'La contraseña debe tener al menos 8 caracteres',
    'user_type.required': 'El campo tipo de usuario es obligatorio',
    'user_type.enum': 'El tipo de usuario debe ser uno de los siguientes: owner, driver, naturalPerson o administrator',
  };
}
