import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ExpenseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({/*
    amount: schema.number([ 
      rules.unsigned(), // Solo números positivos
    ]),
    description: schema.string(),
    status: schema.string({}, [
      rules.regex(/^(pendiente|pagado|cancelado)$/), // Estructura de estado
    ]),
    driver_id: schema.number([
      rules.exists({ table: 'drivers', column: 'id' }), // Verifica existencia en la tabla `drivers`
    ]),
  */});

  public messages: CustomMessages = {/*
    'amount.unsigned': 'El monto debe ser un número positivo.',
    'description.string': 'La descripción debe ser una cadena de texto.',
    'status.regex': 'El estado debe ser uno de los siguientes: pendiente, pagado, cancelado.',
    'driver_id.exists': 'El ID del conductor no existe en la base de datos.',*/
  };
}