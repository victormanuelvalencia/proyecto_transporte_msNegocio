import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
<<<<<<< HEAD
    // license_plate: schema.string(),
    // type_vehicle: schema.string(),
    // max_load_capacity: schema.number(),
  });

  public messages: CustomMessages = {
    // 'license_plate.string': 'La placa del vehículo debe ser una cadena de texto.',
    // 'type_vehicle.string': 'El tipo de vehículo debe ser una cadena de texto.',
    // 'max_load_capacity.float': 'La capacidad máxima de carga debe ser un número flotante.',
=======
    license_plate: schema.string(),
    type_vehicle: schema.string(),
  });

  public messages: CustomMessages = {
    'license_plate.string': 'La placa del vehículo debe ser una cadena de texto.',
    'type_vehicle.string': 'El tipo de vehículo debe ser una cadena de texto.',
>>>>>>> 7404468652f59efbf4a2ef9de8c00f2e4ed02acc
  };
}
