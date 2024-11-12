import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerVehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ownerId: schema.number([
      rules.exists({ table: 'owners', column: 'id' }),
    ]),
    vehicleId: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }),
    ]),
    ownershipDate: schema.date({
      format: 'yyyy-MM-dd',
    }),
  })

  public messages: CustomMessages = {
    'ownerId.required': 'El ID del dueño es obligatorio',
    'ownerId.exists': 'El ID del dueño especificado no existe',
    'vehicleId.required': 'El ID del vehículo es obligatorio',
    'vehicleId.exists': 'El ID del vehículo especificado no existe',
    'ownershipDate.required': 'La fecha de propiedad es obligatoria',
    'ownershipDate.date': 'La fecha de propiedad debe ser una fecha válida en el formato yyyy-MM-dd',
  }
}  