import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';

export default class AdministratorValidator {
  public schema = schema.create({/*
    phone_number: schema.string({}, [
      rules.regex(/^\d+$/), // Solo permite números
    ]),
    active: schema.boolean(),
    hotel_id: schema.number([
      rules.exists({ table: 'hotels', column: 'id' }), // Verifica existencia en la tabla `hotels`
    ]),
    restaurant_id: schema.number([
      rules.exists({ table: 'restaurants', column: 'id' }), // Verifica existencia en la tabla `restaurants`
    ]),
    user_id: schema.string(), // Debe validarse manualmente al integrarse con el microservicio de seguridad*/
  });

  public messages: CustomMessages = {/*
    'phone_number.regex': 'El número de teléfono solo debe contener números.',
    'active.boolean': 'El campo "active" debe ser un valor booleano.',
    'hotel_id.exists': 'El hotel con el ID proporcionado no existe.',
    'restaurant_id.exists': 'El restaurante con el ID proporcionado no existe.',*/
  };
}

