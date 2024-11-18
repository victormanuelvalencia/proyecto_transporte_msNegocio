import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class FeeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contract_id: schema.number([
      rules.exists({ table: 'contracts', column: 'id' }), // Verifica existencia en la tabla `contracts`
    ]),
    amount: schema.number([ 
      rules.unsigned(), // Solo números positivos
    ]),
    due_date: schema.date(),
  });

  public messages: CustomMessages = {
    'contract_id.exists': 'El ID del contrato no existe en la base de datos.',
    'amount.unsigned': 'El monto debe ser un número positivo.',
    'due_date.date': 'La fecha de vencimiento debe ser una fecha válida.',
  };
}
