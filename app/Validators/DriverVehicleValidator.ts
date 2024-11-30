import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverVehicleValidator {
  // constructor(protected ctx: HttpContextContract) {}

  // public schema = schema.create({
  //   driver_id: schema.number([
  //     rules.exists({ table: 'drivers', column: 'id' }),
  //   ]),
  //   vehicle_id: schema.number([
  //     rules.exists({ table: 'vehicles', column: 'id' }),
  //   ]),
  // });

  // public messages: CustomMessages = {
  //   'owner_id.required': 'El ID del dueño es obligatorio',
  //   'owner_id.exists': 'El ID del dueño especificado no existe',
  //   'vehicle_id.required': 'El ID del vehículo es obligatorio',
  //   'vehicle_id.exists': 'El ID del vehículo especificado no existe',
  // };
}  