import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ContractValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.string({}, [
      rules.regex(/^\d{4}-\d{2}-\d{2}$/), // Formato de fecha YYYY-MM-DD
    ]),
    end_date: schema.string({}, [
      rules.regex(/^\d{4}-\d{2}-\d{2}$/), // Formato de fecha YYYY-MM-DD
    ]),
    total_amount: schema.number(),
    customer_id: schema.number([
      rules.exists({ table: 'customers', column: 'id' }), // Verifica existencia en la tabla `customers`
    ]),
  });

  public messages: CustomMessages = {
    'start_date.regex': 'La fecha de inicio debe tener el formato YYYY-MM-DD.',
    'end_date.regex': 'La fecha de fin debe tener el formato YYYY-MM-DD.',
    'total_amount.number': 'El monto total debe ser un número.',
    'customer_id.exists': 'El cliente con el ID proporcionado no existe.',
  };
}