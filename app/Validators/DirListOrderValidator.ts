import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DirListOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    origin: schema.string({}, [
      rules.regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/), // Solo letras y tildes
    ]),
    destination: schema.string({}, [
      rules.regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/), // Solo letras y tildes
    ]),
    rute_id: schema.number([
      rules.exists({ table: 'rutes', column: 'id' }), // Verifica existencia en la tabla `rutes`
    ]),
    sec_address_id: schema.number([
      rules.exists({ table: 'sec_addresses', column: 'id' }), // Verifica existencia en la tabla `addresses`
    ]),
  });

  public messages: CustomMessages = {
    'origin.regex': 'El origen solo debe contener letras y tildes.',
    'destination.regex': 'El destino solo debe contener letras y tildes.',
    'rute_id.exists': 'El ID de la ruta proporcionado no existe.',
    'sec_address_id.exists': 'El ID de la dirección proporcionado no existe.',
  };
}