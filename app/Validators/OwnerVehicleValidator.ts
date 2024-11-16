import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerVehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    owner_id: schema.number([
      rules.exists({ table: 'owners', column: 'id' }),
    ]),
    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }),
    ]),
    ownership_date: schema.date({
      format: 'yyyy-MM-dd',
    }),
  });

  public messages: CustomMessages = {
    'owner_id.required': 'El ID del dueño es obligatorio',
    'owner_id.exists': 'El ID del dueño especificado no existe',
    'vehicle_id.required': 'El ID del vehículo es obligatorio',
    'vehicle_id.exists': 'El ID del vehículo especificado no existe',
    'ownership_date.required': 'La fecha de propiedad es obligatoria',
    'ownership_date.date': 'La fecha de propiedad debe ser una fecha válida en el formato yyyy-MM-dd',
  };
}  