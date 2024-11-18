import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DistributionCenterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/), // Solo letras y tildes
    ]),
    vehicles: schema.string({}, [
      rules.regex(/^\d+$/), // Solo números
    ]),
    municipality_id: schema.number([ 
      rules.exists({ table: 'municipalities', column: 'id' }), // Verifica existencia en la tabla `municipalities`
    ]),
  });

  public messages: CustomMessages = {
    'name.regex': 'El nombre solo debe contener letras y tildes.',
    'vehicles.regex': 'El campo de vehículos solo debe contener números.',
    'municipality_id.exists': 'El ID del municipio no existe en la base de datos.',
  };
}