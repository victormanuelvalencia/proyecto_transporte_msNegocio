import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    
      street: schema.string({ trim: true }, [
        rules.alphaNum({ allow: ['space'] }) // Permite letras, números y espacios
      ]),
      street_number: schema.string({ trim: true }, [
        rules.alphaNum() // Permite letras y números sin espacios
      ]),
      reference_point: schema.string.optional({ trim: true }, [
        rules.alphaNum({ allow: ['space'] }) // Permite letras, números y espacios opcionalmente
      ]),
      municipality_id: schema.number([
        rules.unsigned(), // Solo acepta números positivos
        rules.exists({ table: 'municipalities', column: 'id' }) // Asegura que el municipio exista en la tabla
      ])
    
  })

 
  public messages: CustomMessages = {}
}
