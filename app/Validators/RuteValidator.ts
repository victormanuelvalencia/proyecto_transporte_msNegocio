import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RuteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    distance: schema.number(),
    count_distribution_centers: schema.number([rules.unsigned()]), // Solo números positivos
    average_time: schema.number([rules.unsigned()]), // Solo números positivos
    // contract_id: schema.number([
    //   rules.exists({ table: 'contracts', column: 'id' }), // Verifica existencia en la tabla `contracts`
    // ]),
    // vehicle_id: schema.number([
    //   rules.exists({ table: 'vehicles', column: 'id' }), // Verifica existencia en la tabla `vehicles`
    // ]),
  });

  public messages: CustomMessages = {
    'distance.float': 'La distancia debe ser un número flotante.',
    'count_distribution_centers.unsigned': 'El número de centros de distribución debe ser un número positivo.',
    'average_time.unsigned': 'El tiempo promedio debe ser un número positivo.',
    // 'contract_id.exists': 'El ID del contrato no existe en la base de datos.',
    // 'vehicle_id.exists': 'El ID del vehículo no existe en la base de datos.',
  };
}

