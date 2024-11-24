import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class NaturalPersonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    document_type: schema.string(),
    document_number: schema.string({}, [
      rules.regex(/^\d{1,15}$/), // Solo números con un máximo de 15 dígitos
    ]),
    // company_id: schema.number([
    //   rules.exists({ table: 'companies', column: 'id' }), // Verifica existencia en la tabla `companies`
    // ]),
    user_id: schema.string(), // Validación manual al integrarse con el MS de seguridad
  });

  public messages: CustomMessages = {
    'document_number.regex': 'El número de documento debe ser numérico y tener hasta 15 dígitos.',
    //'company_id.exists': 'El ID de la empresa no existe en la base de datos.',
  };
}
