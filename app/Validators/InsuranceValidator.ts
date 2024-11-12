import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InsuranceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    policyNumber: schema.string({}, [
      rules.maxLength(100),
    ]),
    provider: schema.string({}, [
      rules.maxLength(255),
    ]),
    expirationDate: schema.date({
      format: 'yyyy-MM-dd',
    }),
    vehicleId: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'policyNumber.required': 'El número de póliza es obligatorio',
    'provider.required': 'El proveedor es obligatorio',
    'expirationDate.required': 'La fecha de vencimiento es obligatoria',
    'expirationDate.date': 'La fecha de vencimiento debe ser una fecha válida en el formato yyyy-MM-dd',
    'vehicleId.required': 'El ID del vehículo es obligatorio',
    'vehicleId.exists': 'El ID del vehículo especificado no existe',
  }
}  