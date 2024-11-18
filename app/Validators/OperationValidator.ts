import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class OperationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    date: schema.date(),
    operation_type: schema.string({}, [
      rules.regex(/^[a-zA-Z\s]+$/), // Solo letras y espacios
    ]),
    state: schema.boolean(),
    municipality_id: schema.number([
      rules.exists({ table: 'municipalities', column: 'id' }), // Verifica existencia en la tabla `municipalities`
    ]),
    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }), // Verifica existencia en la tabla `vehicles`
    ]),
  });

  public messages: CustomMessages = {
    'date.date': 'La fecha debe ser una fecha válida.',
    'operation_type.regex': 'El tipo de operación solo debe contener letras y espacios.',
    'municipality_id.exists': 'El ID del municipio no existe en la base de datos.',
    'vehicle_id.exists': 'El ID del vehículo no existe en la base de datos.',
  };
}