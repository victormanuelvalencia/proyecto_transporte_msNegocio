import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    license_plate: schema.string(),
    type_vehicle: schema.string(),
  });

  public messages: CustomMessages = {
    'license_plate.string': 'La placa del vehículo debe ser una cadena de texto.',
    'type_vehicle.string': 'El tipo de vehículo debe ser una cadena de texto.',
  };
}
