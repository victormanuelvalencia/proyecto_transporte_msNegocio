import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class LotValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.number([
      rules.exists({ table: 'categories', column: 'id' }), // Verifica existencia en la tabla `categories`
    ]),
    products: schema.object().members({}), // Acepta cualquier objeto JSON
    total_products: schema.number([ 
      rules.unsigned(), // Solo números positivos
    ]),
    total_weight: schema.number([ 
      rules.unsigned(), // Solo números positivos
    ]),
    dir_list_order_id: schema.number([
      rules.exists({ table: 'dir_list_orders', column: 'id' }), // Verifica existencia en la tabla `dir_list_orders`
    ]),
    rute_id: schema.number([
      rules.exists({ table: 'rutes', column: 'id' }), // Verifica existencia en la tabla `rutes`
    ]),
  });

  public messages: CustomMessages = {
    'category_id.exists': 'El ID de la categoría no existe en la base de datos.',
    'products.object': 'Los productos deben ser un objeto JSON.',
    'total_products.unsigned': 'El número total de productos debe ser un número positivo.',
    'total_weight.unsigned': 'El peso total debe ser un número positivo.',
    'dir_list_order_id.exists': 'El ID de la orden de lista de direcciones no existe en la base de datos.',
    'rute_id.exists': 'El ID de la ruta no existe en la base de datos.',
  };
}